"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  ChevronDown, Home, Grid3x3, Palette, Download, Upload,
  Trash2, Eye, Shield, Layers,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import { useState, useCallback, useMemo, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BASE = "https://lifesimgrid.org";

const FURNITURE_TYPES = [
  "bed", "sofa", "table", "lamp", "plant", "rug", "tv", "bookshelf",
  "window", "door", "wall", "empty",
] as const;

const FURNITURE_ICONS: Record<string, string> = {
  bed: "🛏️", sofa: "🛋️", table: "🪑", lamp: "💡", plant: "🪴",
  rug: "🟫", tv: "📺", bookshelf: "📚", window: "🪟", door: "🚪",
  wall: "🧱", empty: "",
};

const FURNITURE_COLORS: Record<string, string> = {
  bed: "bg-indigo-200", sofa: "bg-amber-200", table: "bg-green-200",
  lamp: "bg-yellow-200", plant: "bg-emerald-200", rug: "bg-orange-200",
  tv: "bg-gray-300", bookshelf: "bg-purple-200", window: "bg-sky-200",
  door: "bg-stone-200", wall: "bg-gray-400", empty: "",
};

const GRID_SIZES = [
  { key: "small", size: 8 },
  { key: "medium", size: 10 },
  { key: "large", size: 12 },
] as const;

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function TomodachiApartmentDesignPage() {
  const t = useTranslations("TomodachiApartmentDesignPage");
  const locale = useLocale();

  const [activeTab, setActiveTab] = useState<"designer" | "templates" | "themes" | "guide">("designer");
  const [gridSize, setGridSize] = useState<number>(10);
  const [selectedFurniture, setSelectedFurniture] = useState<string>("bed");
  const [grid, setGrid] = useState<string[][]>(() =>
    Array.from({ length: 10 }, () => Array(10).fill("empty"))
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ---- Grid operations ---- */
  const handleCellClick = useCallback((row: number, col: number) => {
    setGrid((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] = selectedFurniture;
      return next;
    });
  }, [selectedFurniture]);

  const handleCellRightClick = useCallback((row: number, col: number, e: React.MouseEvent) => {
    e.preventDefault();
    setGrid((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] = "empty";
      return next;
    });
  }, []);

  const handleGridSizeChange = useCallback((size: number) => {
    setGridSize(size);
    setGrid(Array.from({ length: size }, () => Array(size).fill("empty")));
  }, []);

  const handleClearRoom = useCallback(() => {
    setGrid(Array.from({ length: gridSize }, () => Array(gridSize).fill("empty")));
  }, [gridSize]);

  const loadTemplate = useCallback((template: string[][]) => {
    const size = template.length;
    setGridSize(size);
    setGrid(template);
    setActiveTab("designer");
  }, []);

  /* ---- Export/Import ---- */
  const handleExportPNG = useCallback(() => {
    const cellSize = 30;
    const canvas = document.createElement("canvas");
    canvas.width = gridSize * cellSize;
    canvas.height = gridSize * cellSize;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const cell = grid[r][c];
        if (cell !== "empty") {
          const colorMap: Record<string, string> = {
            bed: "#818cf8", sofa: "#fbbf24", table: "#4ade80", lamp: "#facc15",
            plant: "#22c55e", rug: "#fb923c", tv: "#94a3b8", bookshelf: "#a78bfa",
            window: "#7dd3fc", door: "#d6d3d1", wall: "#6b7280",
          };
          ctx.fillStyle = colorMap[cell] || "#e2e8f0";
          ctx.fillRect(c * cellSize + 2, r * cellSize + 2, cellSize - 4, cellSize - 4);
          ctx.fillStyle = "#1e293b";
          ctx.font = "16px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(FURNITURE_ICONS[cell] || "", c * cellSize + cellSize / 2, r * cellSize + cellSize / 2);
        }
      }
    }
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "apartment-design.png";
      a.click();
      URL.revokeObjectURL(url);
    });
  }, [grid, gridSize]);

  const handleExportJSON = useCallback(() => {
    const data = JSON.stringify({ gridSize, grid }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "apartment-design.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [grid, gridSize]);

  const handleImportJSON = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (
          typeof data.gridSize === "number" &&
          data.gridSize > 0 &&
          Array.isArray(data.grid) &&
          data.grid.length === data.gridSize &&
          data.grid.every((row: unknown) => Array.isArray(row) && row.length === data.gridSize)
        ) {
          setGridSize(data.gridSize);
          setGrid(data.grid);
        }
      } catch {
        // Invalid JSON — silently ignore
      }
    };
    reader.readAsText(file);
  }, []);

  /* ---- Stats ---- */
  const stats = useMemo(() => {
    let furniture = 0;
    let decorations = 0;
    const furnitureTypes = new Set<string>();
    for (const row of grid) {
      for (const cell of row) {
        if (cell !== "empty") {
          if (["bed", "sofa", "table", "tv", "bookshelf"].includes(cell)) {
            furniture++;
          } else {
            decorations++;
          }
          furnitureTypes.add(cell);
        }
      }
    }
    const total = gridSize * gridSize;
    const coverage = total > 0 ? Math.round(((furniture + decorations) / total) * 100) : 0;
    return { furniture, decorations, coverage, variety: furnitureTypes.size };
  }, [grid, gridSize]);

  /* ---- Templates ---- */
  const templates = useMemo(() => {
    const make = (size: number, layout: [number, number, string][]) => {
      const g = Array.from({ length: size }, () => Array(size).fill("empty"));
      for (const [r, c, type] of layout) {
        if (r < size && c < size) g[r][c] = type;
      }
      return g;
    };
    return [
      // Cozy Bedroom (8x8)
      make(8, [[1,1,"bed"],[1,5,"lamp"],[5,1,"plant"],[5,5,"rug"],[3,3,"table"]]),
      // Living Room (10x10)
      make(10, [[2,2,"sofa"],[2,6,"tv"],[5,4,"table"],[7,2,"plant"],[7,7,"rug"]]),
      // Study Room (8x8)
      make(8, [[1,1,"bookshelf"],[3,3,"table"],[3,5,"lamp"],[5,1,"plant"],[5,6,"window"]]),
      // Studio Apartment (10x10)
      make(10, [[1,1,"bed"],[1,6,"sofa"],[3,3,"table"],[5,7,"tv"],[7,2,"plant"],[7,5,"rug"]]),
      // Luxury Suite (12x12)
      make(12, [[1,1,"bed"],[1,8,"sofa"],[2,5,"rug"],[5,3,"table"],[5,8,"tv"],[8,1,"bookshelf"],[8,9,"plant"],[10,5,"lamp"]]),
      // Minimalist Room (8x8)
      make(8, [[3,3,"table"],[1,1,"plant"],[5,5,"lamp"]]),
    ];
  }, []);

  /* ---- FAQ data ---- */
  const faqs = useMemo(() => [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
    { q: t("faq5Q"), a: t("faq5A") },
    { q: t("faq6Q"), a: t("faq6A") },
    { q: t("faq7Q"), a: t("faq7A") },
    { q: t("faq8Q"), a: t("faq8A") },
  ], [t]);

  const localePath = locale === "en" ? "" : `/${locale}`;

  const tabButtons = [
    { key: "designer" as const, label: t("tabDesigner"), icon: Grid3x3, color: "sky" },
    { key: "templates" as const, label: t("tabTemplates"), icon: Layers, color: "amber" },
    { key: "themes" as const, label: t("tabThemes"), icon: Palette, color: "purple" },
    { key: "guide" as const, label: t("tabGuide"), icon: Eye, color: "green" },
  ];

  const tabColors: Record<string, string> = {
    sky: "border-sky-500 bg-sky-50 text-sky-700",
    amber: "border-amber-500 bg-amber-50 text-amber-700",
    purple: "border-purple-500 bg-purple-50 text-purple-700",
    green: "border-green-500 bg-green-50 text-green-700",
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* ===== JSON-LD: WebApplication ===== */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Tomodachi Life Apartment Design Guide",
          applicationCategory: "GameUtilityApplication",
          operatingSystem: "Any (Browser-based)",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description: t("metaDescription"),
          url: `${BASE}${localePath}/tomodachi-apartment-design`,
        }).replace(/<\/script/g, "<\\/script") }} />
        {/* ===== JSON-LD: BreadcrumbList ===== */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "LifeSimGrid", item: `${BASE}${localePath || "/"}` },
            { "@type": "ListItem", position: 2, name: t("heroBadge"), item: `${BASE}${localePath}/tomodachi-apartment-design` },
          ],
        }).replace(/<\/script/g, "<\\/script") }} />
        {/* ===== JSON-LD: HowTo ===== */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: t("howToTitle"),
          step: [
            { "@type": "HowToStep", text: t("howToStep1") },
            { "@type": "HowToStep", text: t("howToStep2") },
            { "@type": "HowToStep", text: t("howToStep3") },
            { "@type": "HowToStep", text: t("howToStep4") },
            { "@type": "HowToStep", text: t("howToStep5") },
          ],
        }).replace(/<\/script/g, "<\\/script") }} />
        {/* ===== JSON-LD: FAQPage ===== */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }).replace(/<\/script/g, "<\\/script") }} />

        {/* ===== HERO ===== */}
        <section aria-labelledby="apt-hero" className="mx-auto max-w-6xl px-4 pt-8 pb-4 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-1.5 text-xs font-medium text-sky-700">
            <Home className="h-3.5 w-3.5" />
            {t("heroBadge")}
          </div>
          <h1 id="apt-hero" className="font-mono text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {t("heroTitle")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
            {t("heroSubtitle")}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">{t("heroTag1")}</span>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">{t("heroTag2")}</span>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">{t("heroTag3")}</span>
          </div>
        </section>

        {/* ===== Privacy Badge ===== */}
        <div className="mx-auto max-w-4xl px-4 pb-4">
          <div className="rounded-xl bg-sky-50 p-3 text-center text-xs text-sky-700 sm:text-sm">
            {t("privacyBadge")}
          </div>
        </div>

        {/* ===== Tab Navigation ===== */}
        <div className="mx-auto max-w-6xl px-4 pb-2">
          <div className="flex flex-wrap justify-center gap-2">
            {tabButtons.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 rounded-xl border-2 px-4 py-2 text-sm font-semibold transition-all ${
                    isActive ? tabColors[tab.color] : "border-gray-100 bg-white text-gray-500 hover:border-gray-200"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ===== DESIGNER TAB ===== */}
        <div className={activeTab !== "designer" ? "hidden" : ""}>
          <section aria-labelledby="apt-designer" className="mx-auto max-w-4xl px-4 py-4 sm:py-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
              <h2 id="apt-designer" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-2">{t("designerTitle")}</h2>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{t("designerDesc")}</p>

              {/* Grid Size Selector */}
              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold text-gray-500">{t("gridSize")}</p>
                <div className="flex flex-wrap gap-2">
                  {GRID_SIZES.map((gs) => (
                    <button
                      key={gs.key}
                      onClick={() => handleGridSizeChange(gs.size)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                        gridSize === gs.size
                          ? "border-sky-500 bg-sky-50 text-sky-700"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {t(`gridSize${gs.key.charAt(0).toUpperCase() + gs.key.slice(1)}` as never)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Furniture Palette */}
              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold text-gray-500">{t("furniturePalette")}</p>
                <div className="flex flex-wrap gap-2">
                  {FURNITURE_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedFurniture(type)}
                      className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                        selectedFurniture === type
                          ? "border-sky-500 bg-sky-50 text-sky-700"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <span>{FURNITURE_ICONS[type]}</span>
                      {t(`furniture${type.charAt(0).toUpperCase() + type.slice(1)}` as never)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid */}
              <div className="mb-4 overflow-x-auto">
                <div
                  className="mx-auto inline-grid gap-0.5 rounded-xl border-2 border-gray-200 bg-gray-50 p-1"
                  style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
                >
                  {grid.map((row, r) =>
                    row.map((cell, c) => (
                      <button
                        key={`${r}-${c}`}
                        onClick={() => handleCellClick(r, c)}
                        onContextMenu={(e) => handleCellRightClick(r, c, e)}
                        className={`flex h-8 w-8 items-center justify-center rounded text-sm transition-colors hover:opacity-70 sm:h-9 sm:w-9 ${
                          cell !== "empty" ? FURNITURE_COLORS[cell] : "bg-white"
                        }`}
                        title={cell !== "empty" ? t(`furniture${cell.charAt(0).toUpperCase() + cell.slice(1)}` as never) : ""}
                      >
                        {FURNITURE_ICONS[cell]}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="mb-4 grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-gray-50 p-3 text-center">
                  <p className="text-xs font-semibold text-gray-500">{t("statFurniture")}</p>
                  <p className="text-lg font-bold text-gray-900">{stats.furniture}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3 text-center">
                  <p className="text-xs font-semibold text-gray-500">{t("statDecorations")}</p>
                  <p className="text-lg font-bold text-gray-900">{stats.decorations}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3 text-center">
                  <p className="text-xs font-semibold text-gray-500">{t("statCoverage")}</p>
                  <p className="text-lg font-bold text-gray-900">{stats.coverage}%</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <button onClick={handleExportPNG} className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:shadow-md active:scale-95">
                  <Download className="h-4 w-4" /> {t("exportPng")}
                </button>
                <button onClick={handleExportJSON} className="flex items-center gap-1.5 rounded-xl bg-white border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-95">
                  <Download className="h-4 w-4" /> {t("exportJson")}
                </button>
                <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 rounded-xl bg-white border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-95">
                  <Upload className="h-4 w-4" /> {t("importJson")}
                </button>
                <input ref={fileInputRef} type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                <button onClick={handleClearRoom} className="flex items-center gap-1.5 rounded-xl bg-white border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all hover:bg-red-50 active:scale-95">
                  <Trash2 className="h-4 w-4" /> {t("clearRoom")}
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* ===== TEMPLATES TAB ===== */}
        <div className={activeTab !== "templates" ? "hidden" : ""}>
          <section aria-labelledby="apt-templates" className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
            <h2 id="apt-templates" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-2">{t("templatesTitle")}</h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{t("templatesDesc")}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-2">
                    <Home className="h-5 w-5 text-sky-500" />
                    <h3 className="font-mono text-sm font-bold text-gray-900">{t(`template${i}Name` as never)}</h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">{t(`template${i}Desc` as never)}</p>
                  <button
                    onClick={() => loadTemplate(templates[i - 1])}
                    className="rounded-lg bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-700 transition-all hover:bg-sky-100 active:scale-95"
                  >
                    {t("loadTemplate")}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ===== THEMES TAB ===== */}
        <div className={activeTab !== "themes" ? "hidden" : ""}>
          <section aria-labelledby="apt-themes" className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
            <h2 id="apt-themes" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-2">{t("themesTitle")}</h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{t("themesDesc")}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-2">
                    <Palette className="h-5 w-5 text-purple-500" />
                    <h3 className="font-mono text-sm font-bold text-gray-900">{t(`theme${i}Name` as never)}</h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{t(`theme${i}Desc` as never)}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ===== GUIDE TAB ===== */}
        <div className={activeTab !== "guide" ? "hidden" : ""}>
          <section aria-labelledby="apt-guide" className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
            <h2 id="apt-guide" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-2">{t("guideTitle")}</h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{t("guideDesc")}</p>
            <div className="space-y-4">
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="font-mono text-sm font-bold text-gray-900 mb-2">{t("guideIntroTitle")}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{t("guideIntroDesc")}</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="font-mono text-sm font-bold text-gray-900 mb-2">{t("guideFurnitureTitle")}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{t("guideFurnitureDesc")}</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="font-mono text-sm font-bold text-gray-900 mb-2">{t("guideThemeTitle")}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{t("guideThemeDesc")}</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="font-mono text-sm font-bold text-gray-900 mb-2">{t("guideSizeTitle")}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{t("guideSizeDesc")}</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="font-mono text-sm font-bold text-gray-900 mb-2">{t("guideExportTitle")}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{t("guideExportDesc")}</p>
              </div>
            </div>
          </section>
        </div>

        {/* ===== HOW TO USE ===== */}
        <section aria-labelledby="apt-how-to" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="rounded-2xl bg-sky-50 p-4 sm:p-6">
            <h2 id="apt-how-to" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">{t("howToTitle")}</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li className="leading-relaxed">{t("howToStep1")}</li>
              <li className="leading-relaxed">{t("howToStep2")}</li>
              <li className="leading-relaxed">{t("howToStep3")}</li>
              <li className="leading-relaxed">{t("howToStep4")}</li>
              <li className="leading-relaxed">{t("howToStep5")}</li>
            </ol>
          </div>
        </section>

        {/* ===== WHY CHOOSE ===== */}
        <section aria-labelledby="apt-why" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <h2 id="apt-why" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">{t("whyChooseTitle")}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600"><Grid3x3 className="h-4 w-4" /></div>
              <h3 className="font-mono text-sm font-bold text-gray-900 mb-1">{t("whyChoose1Title")}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{t("whyChoose1Desc")}</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Layers className="h-4 w-4" /></div>
              <h3 className="font-mono text-sm font-bold text-gray-900 mb-1">{t("whyChoose2Title")}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{t("whyChoose2Desc")}</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-600"><Shield className="h-4 w-4" /></div>
              <h3 className="font-mono text-sm font-bold text-gray-900 mb-1">{t("whyChoose3Title")}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{t("whyChoose3Desc")}</p>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section aria-labelledby="apt-faq" className="mx-auto max-w-6xl px-4 pb-6 sm:pb-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="apt-faq" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-4">{t("faqTitle")}</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="group rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
                  <summary className="flex cursor-pointer items-center justify-between p-3 sm:p-4 hover:bg-gray-100 transition-colors">
                    <h4 className="pr-4 text-sm font-semibold text-gray-800">{faq.q}</h4>
                    <ChevronDown className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Disclaimer ===== */}
        <section className="mx-auto max-w-6xl px-4 pb-4 sm:pb-6">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs leading-relaxed text-gray-500">{t("mbtiDisclaimer")}</p>
          </div>
        </section>

        {/* ===== Related Tools ===== */}
        <section aria-labelledby="apt-related" className="mx-auto max-w-6xl px-4 pb-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="apt-related" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-4">{t("relatedTitle")}</h2>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/tomodachi-life-mbti" className="rounded-xl bg-indigo-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-indigo-800 text-sm">{t("relatedMbti")}</h3>
              </Link>
              <Link href="/tomodachi-island-planner" className="rounded-xl bg-teal-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-teal-800 text-sm">{t("relatedIslandPlanner")}</h3>
              </Link>
              <Link href="/tomodachi-character-ideas" className="rounded-xl bg-purple-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-purple-800 text-sm">{t("relatedCharacterIdeas")}</h3>
              </Link>
              <Link href="/tomodachi-voice-lab" className="rounded-xl bg-pink-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-pink-800 text-sm">{t("relatedVoiceLab")}</h3>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
