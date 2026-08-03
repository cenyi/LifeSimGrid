"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  ChevronDown, Shirt, Grid3x3, Palette, Download, Trash2,
  Undo2, Redo2, Pencil, PaintBucket, Eraser, Shield, Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import { useState, useCallback, useMemo } from "react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BASE = "https://lifesimgrid.org";

const PRESET_COLORS = [
  "#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff", "#ffff00",
  "#ff00ff", "#00ffff", "#808080", "#c0c0c0", "#800000", "#808000",
  "#008000", "#008080", "#000080", "#800080", "#ff9999", "#99ff99",
  "#9999ff", "#ffff99", "#ff99ff", "#99ffff", "#cc6600", "#663300",
  "#ff6600", "#ffcc00", "#66cc33", "#3399ff", "#6633cc", "#ff3399",
  "#333333", "#cccccc",
];

const GRID_SIZES = [
  { key: "16", size: 16 },
  { key: "24", size: 24 },
  { key: "32", size: 32 },
] as const;

type Tool = "pencil" | "fill" | "eraser";

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function TomodachiClothesTemplatePage() {
  const t = useTranslations("TomodachiClothesTemplatePage");
  const locale = useLocale();

  const [activeTab, setActiveTab] = useState<"designer" | "templates" | "gallery">("designer");
  const [gridSize, setGridSize] = useState<number>(32);
  const [pixels, setPixels] = useState<string[]>(() => Array(32 * 32).fill(""));
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [tool, setTool] = useState<Tool>("pencil");
  const [history, setHistory] = useState<string[][]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  /* ---- Grid operations ---- */
  const pushHistory = useCallback((newPixels: string[]) => {
    setHistory((prev) => {
      const next = prev.slice(0, historyIndex + 1);
      next.push([...newPixels]);
      return next.slice(-30);
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 29));
  }, [historyIndex]);

  const handleCellClick = useCallback((index: number) => {
    const newPixels = [...pixels];
    if (tool === "pencil") {
      newPixels[index] = selectedColor;
    } else if (tool === "eraser") {
      newPixels[index] = "";
    } else if (tool === "fill") {
      const targetColor = pixels[index];
      if (targetColor === selectedColor) return;
      const size = gridSize;
      const row = Math.floor(index / size);
      const col = index % size;
      const stack: [number, number][] = [[row, col]];
      const visited = new Set<number>();
      while (stack.length > 0) {
        const [r, c] = stack.pop()!;
        const idx = r * size + c;
        if (r < 0 || r >= size || c < 0 || c >= size || visited.has(idx)) continue;
        if (newPixels[idx] !== targetColor) continue;
        visited.add(idx);
        newPixels[idx] = selectedColor;
        stack.push([r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]);
      }
    }
    setPixels(newPixels);
    pushHistory(newPixels);
  }, [pixels, tool, selectedColor, gridSize, pushHistory]);

  const handleGridSizeChange = useCallback((size: number) => {
    setGridSize(size);
    setPixels(Array(size * size).fill(""));
    setHistory([]);
    setHistoryIndex(-1);
  }, []);

  const handleClearCanvas = useCallback(() => {
    const cleared = Array(gridSize * gridSize).fill("");
    setPixels(cleared);
    pushHistory(cleared);
  }, [gridSize, pushHistory]);

  const handleUndo = useCallback(() => {
    if (historyIndex <= 0) return;
    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    if (history[newIndex]) {
      setPixels([...history[newIndex]]);
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex >= history.length - 1) return;
    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    if (history[newIndex]) {
      setPixels([...history[newIndex]]);
    }
  }, [history, historyIndex]);

  const loadTemplate = useCallback((templatePixels: string[]) => {
    const templateSize = Math.sqrt(templatePixels.length);
    setGridSize(templateSize);
    setPixels(templatePixels);
    setHistory([templatePixels]);
    setHistoryIndex(0);
    setActiveTab("designer");
  }, []);

  /* ---- Export PNG ---- */
  const handleExportPNG = useCallback(() => {
    const cellSize = 12;
    const canvas = document.createElement("canvas");
    canvas.width = gridSize * cellSize;
    canvas.height = gridSize * cellSize;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < pixels.length; i++) {
      if (pixels[i]) {
        const r = Math.floor(i / gridSize);
        const c = i % gridSize;
        ctx.fillStyle = pixels[i];
        ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
      }
    }
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "clothes-template.png";
      a.click();
      URL.revokeObjectURL(url);
    });
  }, [pixels, gridSize]);

  /* ---- Templates ---- */
  const templates = useMemo(() => {
    const make = (size: number, fillFn: (r: number, c: number) => string) => {
      const arr = Array(size * size).fill("");
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const color = fillFn(r, c);
          if (color) arr[r * size + c] = color;
        }
      }
      return arr;
    };
    return [
      // Striped Shirt (32x32)
      make(32, (_r, c) => c % 4 < 2 ? "#3b82f6" : "#ffffff"),
      // Star Pattern (32x32)
      make(32, (r, c) => {
        const cr = 16, cc = 16;
        const dr = r - cr, dc = c - cc;
        const dist = Math.sqrt(dr * dr + dc * dc);
        return dist < 8 ? "#fbbf24" : (dist < 10 ? "#f59e0b" : "");
      }),
      // Checkered (32x32)
      make(32, (r, c) => (Math.floor(r / 4) + Math.floor(c / 4)) % 2 === 0 ? "#1e293b" : "#e2e8f0"),
      // Heart Design (32x32)
      make(32, (r, c) => {
        const x = (c - 16) / 8;
        const y = (16 - r) / 8;
        const val = Math.pow(x * x + y * y - 1, 3) - x * x * y * y * y;
        return val < 0 ? "#ef4444" : "";
      }),
      // Gradient Fade (32x32)
      make(32, (r, _c) => {
        const ratio = r / 31;
        const r2 = Math.round(59 + (239 - 59) * ratio);
        const g2 = Math.round(130 + (68 - 130) * ratio);
        const b2 = Math.round(246 + (68 - 246) * ratio);
        return `rgb(${r2},${g2},${b2})`;
      }),
      // Geometric (32x32)
      make(32, (r, c) => {
        if (r < 16 && c < 16) return "#8b5cf6";
        if (r < 16 && c >= 16) return "#f59e0b";
        if (r >= 16 && c < 16) return "#22c55e";
        return "#ec4899";
      }),
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
    { key: "designer" as const, label: t("tabDesigner"), icon: Grid3x3, color: "pink" },
    { key: "templates" as const, label: t("tabTemplates"), icon: Shirt, color: "amber" },
    { key: "gallery" as const, label: t("tabGallery"), icon: Palette, color: "purple" },
  ];

  const tabColors: Record<string, string> = {
    pink: "border-pink-500 bg-pink-50 text-pink-700",
    amber: "border-amber-500 bg-amber-50 text-amber-700",
    purple: "border-purple-500 bg-purple-50 text-purple-700",
  };

  const toolButtons = [
    { key: "pencil" as Tool, label: t("pencilMode"), icon: Pencil },
    { key: "fill" as Tool, label: t("fillMode"), icon: PaintBucket },
    { key: "eraser" as Tool, label: t("eraserMode"), icon: Eraser },
  ];

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* ===== JSON-LD: WebApplication ===== */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Tomodachi Life Clothes Template Designer",
          applicationCategory: "DesignApplication",
          operatingSystem: "Any (Browser-based)",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description: t("metaDescription"),
          url: `${BASE}${localePath}/tomodachi-clothes-template`,
        }).replace(/<\/script/g, "<\\/script") }} />
        {/* ===== JSON-LD: BreadcrumbList ===== */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "LifeSimGrid", item: `${BASE}${localePath || "/"}` },
            { "@type": "ListItem", position: 2, name: t("heroBadge"), item: `${BASE}${localePath}/tomodachi-clothes-template` },
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
        <section aria-labelledby="clothes-hero" className="mx-auto max-w-6xl px-4 pt-8 pb-4 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-100 bg-pink-50 px-4 py-1.5 text-xs font-medium text-pink-700">
            <Shirt className="h-3.5 w-3.5" />
            {t("heroBadge")}
          </div>
          <h1 id="clothes-hero" className="font-mono text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {t("heroTitle")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
            {t("heroSubtitle")}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-700">{t("heroTag1")}</span>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">{t("heroTag2")}</span>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">{t("heroTag3")}</span>
          </div>
        </section>

        {/* ===== Privacy Badge ===== */}
        <div className="mx-auto max-w-4xl px-4 pb-4">
          <div className="rounded-xl bg-pink-50 p-3 text-center text-xs text-pink-700 sm:text-sm">
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
          <section aria-labelledby="clothes-designer" className="mx-auto max-w-4xl px-4 py-4 sm:py-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
              <h2 id="clothes-designer" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-2">{t("designerTitle")}</h2>
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
                          ? "border-pink-500 bg-pink-50 text-pink-700"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {t(`gridSize${gs.key}` as never)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tool Selector */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {toolButtons.map((tb) => {
                    const Icon = tb.icon;
                    return (
                      <button
                        key={tb.key}
                        onClick={() => setTool(tb.key)}
                        className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                          tool === tb.key
                            ? "border-pink-500 bg-pink-50 text-pink-700"
                            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {tb.label}
                      </button>
                    );
                  })}
                  <button
                    onClick={handleUndo}
                    disabled={!canUndo}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition-all hover:border-gray-300 disabled:opacity-40"
                  >
                    <Undo2 className="h-3.5 w-3.5" /> {t("undoBtn")}
                  </button>
                  <button
                    onClick={handleRedo}
                    disabled={!canRedo}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition-all hover:border-gray-300 disabled:opacity-40"
                  >
                    <Redo2 className="h-3.5 w-3.5" /> {t("redoBtn")}
                  </button>
                </div>
              </div>

              {/* Color Palette */}
              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold text-gray-500">{t("colorPalette")}</p>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`h-7 w-7 rounded-md border-2 transition-all ${
                        selectedColor === color ? "border-pink-500 scale-110" : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                  <label className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-xs text-gray-400 hover:border-gray-400">
                    +
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="mt-2 text-xs text-gray-400">{t("customColor")}: <span className="font-mono">{selectedColor}</span></p>
              </div>

              {/* Pixel Grid */}
              <div className="mb-4 overflow-x-auto">
                <div
                  className="mx-auto inline-grid gap-0 rounded-lg border-2 border-gray-200 bg-white"
                  style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
                >
                  {pixels.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => handleCellClick(i)}
                      className="border border-gray-50 transition-colors hover:opacity-70"
                      style={{
                        backgroundColor: color || "transparent",
                        width: `${Math.max(8, Math.floor(320 / gridSize))}px`,
                        height: `${Math.max(8, Math.floor(320 / gridSize))}px`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <button onClick={handleExportPNG} className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:shadow-md active:scale-95">
                  <Download className="h-4 w-4" /> {t("exportPng")}
                </button>
                <button onClick={handleClearCanvas} className="flex items-center gap-1.5 rounded-xl bg-white border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all hover:bg-red-50 active:scale-95">
                  <Trash2 className="h-4 w-4" /> {t("clearCanvas")}
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* ===== TEMPLATES TAB ===== */}
        <div className={activeTab !== "templates" ? "hidden" : ""}>
          <section aria-labelledby="clothes-templates" className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
            <h2 id="clothes-templates" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-2">{t("templatesTitle")}</h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{t("templatesDesc")}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-2">
                    <Shirt className="h-5 w-5 text-pink-500" />
                    <h3 className="font-mono text-sm font-bold text-gray-900">{t(`template${i}Name` as never)}</h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">{t(`template${i}Desc` as never)}</p>
                  <button
                    onClick={() => loadTemplate(templates[i - 1])}
                    className="rounded-lg bg-pink-50 px-3 py-2 text-xs font-semibold text-pink-700 transition-all hover:bg-pink-100 active:scale-95"
                  >
                    {t("loadTemplate")}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ===== GALLERY TAB ===== */}
        <div className={activeTab !== "gallery" ? "hidden" : ""}>
          <section aria-labelledby="clothes-gallery" className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
            <h2 id="clothes-gallery" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-2">{t("galleryTitle")}</h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{t("galleryDesc")}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-500" />
                    <h3 className="font-mono text-sm font-bold text-gray-900">{t(`template${i}Name` as never)}</h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">{t(`template${i}Desc` as never)}</p>
                  {/* Mini preview */}
                  <div className="mb-3 overflow-hidden rounded-lg border border-gray-100">
                    <div className="grid" style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}>
                      {templates[i - 1].filter((_, idx) => idx % 2 === 0 && idx % 64 < 32).slice(0, 256).map((color, idx) => (
                        <div key={idx} style={{ backgroundColor: color || "#ffffff", aspectRatio: "1" }} />
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => loadTemplate(templates[i - 1])}
                    className="rounded-lg bg-purple-50 px-3 py-2 text-xs font-semibold text-purple-700 transition-all hover:bg-purple-100 active:scale-95"
                  >
                    {t("loadTemplate")}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ===== HOW TO USE ===== */}
        <section aria-labelledby="clothes-how-to" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="rounded-2xl bg-pink-50 p-4 sm:p-6">
            <h2 id="clothes-how-to" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">{t("howToTitle")}</h2>
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
        <section aria-labelledby="clothes-why" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <h2 id="clothes-why" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">{t("whyChooseTitle")}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-pink-50 text-pink-600"><Grid3x3 className="h-4 w-4" /></div>
              <h3 className="font-mono text-sm font-bold text-gray-900 mb-1">{t("whyChoose1Title")}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{t("whyChoose1Desc")}</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Palette className="h-4 w-4" /></div>
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
        <section aria-labelledby="clothes-faq" className="mx-auto max-w-6xl px-4 pb-6 sm:pb-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="clothes-faq" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-4">{t("faqTitle")}</h2>
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
        <section aria-labelledby="clothes-related" className="mx-auto max-w-6xl px-4 pb-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="clothes-related" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-4">{t("relatedTitle")}</h2>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/acnh-pixel-studio" className="rounded-xl bg-amber-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-amber-800 text-sm">{t("relatedAcnh")}</h3>
              </Link>
              <Link href="/mii-qr-unlocker" className="rounded-xl bg-blue-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-blue-800 text-sm">{t("relatedMiiQr")}</h3>
              </Link>
              <Link href="/tomodachi-life-mbti" className="rounded-xl bg-indigo-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-indigo-800 text-sm">{t("relatedMbti")}</h3>
              </Link>
              <Link href="/tomodachi-character-ideas" className="rounded-xl bg-purple-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-purple-800 text-sm">{t("relatedCharacterIdeas")}</h3>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
