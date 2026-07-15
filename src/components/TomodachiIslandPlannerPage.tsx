"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  ChevronDown, MapPin, Layout, Users, Download, Upload, Trash2, Plus, X,
  Grid3x3, Home, Building2, Coffee, ShoppingBag, Trees, Sparkles, UtensilsCrossed,
  Binoculars, Waves, Anchor, Flower, Eraser, Crown, Heart, Star, Save, Shield,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  calculateCompatibility,
  getPersonalityGroup,
  getMbtiCode,
  type Zodiac,
} from "@/lib/compatibility";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BASE = "https://lifesimgrid.org";

type BuildingType =
  | "empty" | "house" | "apartment" | "cafe" | "shop" | "park"
  | "fountain" | "restaurant" | "tower" | "beach" | "bridge" | "tree" | "flower";

interface BuildingDef {
  type: BuildingType;
  icon: typeof Home;
  color: string;
  labelKey: string;
  isDecoration: boolean;
}

const BUILDINGS: BuildingDef[] = [
  { type: "house", icon: Home, color: "#f59e0b", labelKey: "buildingHouse", isDecoration: false },
  { type: "apartment", icon: Building2, color: "#6366f1", labelKey: "buildingApartment", isDecoration: false },
  { type: "cafe", icon: Coffee, color: "#a16207", labelKey: "buildingCafe", isDecoration: false },
  { type: "shop", icon: ShoppingBag, color: "#ec4899", labelKey: "buildingShop", isDecoration: false },
  { type: "restaurant", icon: UtensilsCrossed, color: "#dc2626", labelKey: "buildingRestaurant", isDecoration: false },
  { type: "tower", icon: Binoculars, color: "#7c3aed", labelKey: "buildingTower", isDecoration: false },
  { type: "park", icon: Trees, color: "#22c55e", labelKey: "buildingPark", isDecoration: true },
  { type: "fountain", icon: Sparkles, color: "#06b6d4", labelKey: "buildingFountain", isDecoration: true },
  { type: "beach", icon: Waves, color: "#fbbf24", labelKey: "buildingBeach", isDecoration: true },
  { type: "bridge", icon: Anchor, color: "#92400e", labelKey: "buildingBridge", isDecoration: true },
  { type: "tree", icon: Trees, color: "#15803d", labelKey: "buildingTree", isDecoration: true },
  { type: "flower", icon: Flower, color: "#e11d48", labelKey: "buildingFlower", isDecoration: true },
  { type: "empty", icon: Eraser, color: "#d1d5db", labelKey: "buildingEmpty", isDecoration: false },
];

const BUILDING_MAP: Record<string, BuildingDef> = Object.fromEntries(
  BUILDINGS.map((b) => [b.type, b])
);

const PERSONALITIES = [
  "outgoing_leader", "outgoing_entertainer", "outgoing_trendsetter", "outgoing_optimist",
  "confident_designer", "confident_adventurer", "confident_goGetter", "confident_charmer",
  "independent_artist", "independent_freeSpirit", "independent_thinker", "independent_loneWolf",
  "easygoing_dreamer", "easygoing_sweetheart", "easygoing_softie", "easygoing_buddy",
] as const;

const ZODIACS: Zodiac[] = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
];

const STORAGE_KEY = "lifesimgrid-island-planner";
const RESIDENTS_KEY = "lifesimgrid-island-residents";
const MAX_RESIDENTS = 15;

const CANVAS_CELL_SIZE = 28;
const CANVAS_BG = "#f8fafc";
const CANVAS_GRID_LINE = "#e2e8f0";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface GridCell {
  type: BuildingType;
  residentName?: string;
  residentPersonality?: string;
}

interface OptimizerResident {
  id: string;
  name: string;
  zodiac: Zodiac;
  personality: string;
}

interface OptimizationPair {
  a: OptimizerResident;
  b: OptimizerResident;
  romance: number;
  friendship: number;
}

/* ------------------------------------------------------------------ */
/*  Templates                                                          */
/* ------------------------------------------------------------------ */

/** Generate a template layout on a 16×16 grid */
function generateTemplate(id: number, size: number): GridCell[][] {
  const grid: GridCell[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ type: "empty" as BuildingType }))
  );

  const set = (r: number, c: number, type: BuildingType) => {
    if (r >= 0 && r < size && c >= 0 && c < size) grid[r][c] = { type };
  };

  switch (id) {
    case 1: // Romance District — houses around fountain
      set(Math.floor(size / 2), Math.floor(size / 2), "fountain");
      for (let i = -2; i <= 2; i++) {
        set(Math.floor(size / 2) - 3, Math.floor(size / 2) + i, "house");
        set(Math.floor(size / 2) + 3, Math.floor(size / 2) + i, "house");
        set(Math.floor(size / 2) + i, Math.floor(size / 2) - 3, "house");
        set(Math.floor(size / 2) + i, Math.floor(size / 2) + 3, "house");
      }
      set(1, 1, "park");
      set(size - 2, size - 2, "cafe");
      break;

    case 2: // Friendship Plaza — central park + shops
      for (let r = Math.floor(size / 2) - 2; r <= Math.floor(size / 2) + 2; r++)
        for (let c = Math.floor(size / 2) - 2; c <= Math.floor(size / 2) + 2; c++)
          set(r, c, "park");
      set(Math.floor(size / 2), Math.floor(size / 2), "fountain");
      for (let i = 0; i < 4; i++) {
        set(2 + i * 3, 1, "cafe");
        set(2 + i * 3, size - 2, "shop");
        set(1, 2 + i * 3, "house");
        set(size - 2, 2 + i * 3, "house");
      }
      break;

    case 3: // Balanced Community
      set(Math.floor(size / 4), Math.floor(size / 4), "house");
      set(Math.floor(size / 4), Math.floor(3 * size / 4), "apartment");
      set(Math.floor(3 * size / 4), Math.floor(size / 4), "shop");
      set(Math.floor(3 * size / 4), Math.floor(3 * size / 4), "cafe");
      set(Math.floor(size / 2), Math.floor(size / 2), "fountain");
      set(Math.floor(size / 2) - 1, Math.floor(size / 2), "park");
      set(Math.floor(size / 2) + 1, Math.floor(size / 2), "restaurant");
      for (let i = 1; i < size - 1; i += 3) {
        set(0, i, "tree");
        set(size - 1, i, "tree");
        set(i, 0, "flower");
        set(i, size - 1, "flower");
      }
      break;

    case 4: // Creative Quarter
      set(2, 2, "tower");
      set(2, 3, "house");
      set(3, 2, "house");
      set(3, 3, "apartment");
      set(size - 3, size - 3, "cafe");
      set(size - 3, size - 4, "restaurant");
      set(size - 4, size - 3, "shop");
      set(Math.floor(size / 2), Math.floor(size / 2), "park");
      for (let i = 5; i < size - 5; i += 2) set(Math.floor(size / 2), i, "flower");
      break;

    case 5: // Social Hub
      for (let r = Math.floor(size / 2) - 1; r <= Math.floor(size / 2) + 1; r++)
        for (let c = Math.floor(size / 2) - 2; c <= Math.floor(size / 2) + 2; c++)
          set(r, c, "shop");
      set(Math.floor(size / 2) - 3, Math.floor(size / 2), "restaurant");
      set(Math.floor(size / 2) + 3, Math.floor(size / 2), "cafe");
      set(Math.floor(size / 2), Math.floor(size / 2), "fountain");
      for (let i = 1; i < size - 1; i += 4) {
        set(1, i, "house");
        set(size - 2, i, "house");
      }
      break;

    case 6: // Nature Retreat
      for (let i = 1; i < size - 1; i += 2) {
        set(1, i, "tree");
        set(size - 2, i, "tree");
        if (i % 4 === 1) set(i, 1, "flower");
        if (i % 4 === 3) set(i, size - 2, "flower");
      }
      set(Math.floor(size / 2), Math.floor(size / 2), "park");
      set(Math.floor(size / 2), 2, "beach");
      set(Math.floor(size / 2), size - 3, "beach");
      set(2, Math.floor(size / 2), "cafe");
      set(size - 3, Math.floor(size / 2), "house");
      break;
  }
  return grid;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function loadGrid(): { size: number; cells: GridCell[][] } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveGrid(size: number, cells: GridCell[][]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ size, cells }));
}

function loadOptimizerResidents(): OptimizerResident[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RESIDENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveOptimizerResidents(residents: OptimizerResident[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(RESIDENTS_KEY, JSON.stringify(residents));
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function createEmptyGrid(size: number): GridCell[][] {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ type: "empty" as BuildingType }))
  );
}

function getGroupColor(group: string): string {
  switch (group) {
    case "outgoing": return "#f59e0b";
    case "confident": return "#ef4444";
    case "independent": return "#8b5cf6";
    default: return "#22c55e";
  }
}

/* ------------------------------------------------------------------ */
/*  Canvas Grid Renderer                                              */
/* ------------------------------------------------------------------ */

function IslandCanvas({
  size,
  cells,
  onCellClick,
  onCellRightClick,
}: {
  size: number;
  cells: GridCell[][];
  onCellClick: (r: number, c: number) => void;
  onCellRightClick: (r: number, c: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cellPx = CANVAS_CELL_SIZE;
    canvas.width = size * cellPx;
    canvas.height = size * cellPx;

    // Background
    ctx.fillStyle = CANVAS_BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid lines
    ctx.strokeStyle = CANVAS_GRID_LINE;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= size; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellPx, 0);
      ctx.lineTo(i * cellPx, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellPx);
      ctx.lineTo(canvas.width, i * cellPx);
      ctx.stroke();
    }

    // Buildings
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const cell = cells[r]?.[c];
        if (!cell || cell.type === "empty") continue;

        const def = BUILDING_MAP[cell.type];
        if (!def) continue;

        const x = c * cellPx;
        const y = r * cellPx;

        // Fill cell with building color
        ctx.fillStyle = def.color;
        ctx.fillRect(x + 1, y + 1, cellPx - 2, cellPx - 2);

        // Draw building icon (simple shape representation)
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.font = `${Math.floor(cellPx * 0.5)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const icons: Record<string, string> = {
          house: "🏠", apartment: "🏢", cafe: "☕", shop: "🛒",
          park: "🌳", fountain: "⛲", restaurant: "🍽️", tower: "🗼",
          beach: "🏖️", bridge: "🌉", tree: "🌲", flower: "🌸",
        };
        ctx.fillText(icons[cell.type] || "?", x + cellPx / 2, y + cellPx / 2);

        // Resident label
        if (cell.residentName) {
          ctx.fillStyle = "rgba(0,0,0,0.7)";
          ctx.font = `bold ${Math.floor(cellPx * 0.28)}px sans-serif`;
          const name = cell.residentName.length > 5
            ? cell.residentName.slice(0, 4) + "…"
            : cell.residentName;
          ctx.fillText(name, x + cellPx / 2, y + cellPx - 5);
        }
      }
    }
  }, [size, cells]);

  useEffect(() => {
    draw();
  }, [draw]);

  function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const c = Math.floor(x / CANVAS_CELL_SIZE);
    const r = Math.floor(y / CANVAS_CELL_SIZE);
    if (r >= 0 && r < size && c >= 0 && c < size) {
      onCellClick(r, c);
    }
  }

  function handleContextMenu(e: React.MouseEvent<HTMLCanvasElement>) {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const c = Math.floor(x / CANVAS_CELL_SIZE);
    const r = Math.floor(y / CANVAS_CELL_SIZE);
    if (r >= 0 && r < size && c >= 0 && c < size) {
      onCellRightClick(r, c);
    }
  }

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      className="max-w-full rounded-xl border border-gray-200 bg-slate-50 cursor-crosshair touch-none"
      style={{ imageRendering: "pixelated" }}
      aria-label="Island layout grid"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function TomodachiIslandPlannerPage() {
  const t = useTranslations("TomodachiIslandPlannerPage");
  const locale = useLocale();

  /* ---- Tab state ---- */
  const [activeTab, setActiveTab] = useState<"planner" | "templates" | "optimizer">("planner");

  /* ---- Grid state ---- */
  const [gridSize, setGridSize] = useState(16);
  const [cells, setCells] = useState<GridCell[][]>(() => createEmptyGrid(16));
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingType>("house");
  const [hydrated, setHydrated] = useState(false);

  /* ---- Optimizer state ---- */
  const [optResidents, setOptResidents] = useState<OptimizerResident[]>([]);
  const [optName, setOptName] = useState("");
  const [optPersonality, setOptPersonality] = useState<string>("outgoing_leader");
  const [optZodiac, setOptZodiac] = useState<Zodiac>("aries");
  const [optResult, setOptResult] = useState<{ pairs: OptimizationPair[]; score: number } | null>(null);

  /* ---- Hydrate from localStorage ---- */
  useEffect(() => {
    const saved = loadGrid();
    if (saved && saved.cells.length === saved.size) {
      setGridSize(saved.size);
      setCells(saved.cells);
    }
    setOptResidents(loadOptimizerResidents());
    setHydrated(true);
  }, []);

  /* ---- Save grid to localStorage ---- */
  useEffect(() => {
    if (hydrated) saveGrid(gridSize, cells);
  }, [gridSize, cells, hydrated]);

  /* ---- Save optimizer residents ---- */
  useEffect(() => {
    if (hydrated) saveOptimizerResidents(optResidents);
  }, [optResidents, hydrated]);

  /* ---- Grid operations ---- */
  function handleCellClick(r: number, c: number) {
    setCells((prev) => {
      const next = prev.map((row) => row.map((cell) => ({ ...cell })));
      if (selectedBuilding === "empty") {
        next[r][c] = { type: "empty" };
      } else {
        next[r][c] = { type: selectedBuilding };
      }
      return next;
    });
  }

  function handleCellRightClick(r: number, c: number) {
    setCells((prev) => {
      const next = prev.map((row) => row.map((cell) => ({ ...cell })));
      next[r][c] = { type: "empty" };
      return next;
    });
  }

  function changeGridSize(newSize: number) {
    setGridSize(newSize);
    setCells(createEmptyGrid(newSize));
  }

  function clearGrid() {
    setCells(createEmptyGrid(gridSize));
  }

  function loadTemplate(id: number) {
    const template = generateTemplate(id, gridSize);
    setCells(template);
    setActiveTab("planner");
  }

  /* ---- Export / Import ---- */
  function exportPng() {
    const canvas = document.querySelector("canvas[aria-label='Island layout grid']") as HTMLCanvasElement;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "tomodachi-island-layout.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function exportJson() {
    const data = { size: gridSize, cells, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.download = "tomodachi-island-layout.json";
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function importJson(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (
          typeof data.size === "number" &&
          Array.isArray(data.cells) &&
          data.cells.length === data.size &&
          data.cells.every((row: unknown) => Array.isArray(row) && row.length === data.size)
        ) {
          setGridSize(data.size);
          setCells(data.cells as GridCell[][]);
        }
      } catch {
        // ignore parse errors
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  /* ---- Optimizer operations ---- */
  function addOptResident() {
    if (!optName.trim() || optResidents.length >= MAX_RESIDENTS) return;
    const newRes: OptimizerResident = {
      id: generateId(),
      name: optName.trim(),
      zodiac: optZodiac,
      personality: optPersonality,
    };
    setOptResidents((prev) => [...prev, newRes]);
    setOptName("");
  }

  function removeOptResident(id: string) {
    setOptResidents((prev) => prev.filter((r) => r.id !== id));
  }

  function runOptimization() {
    if (optResidents.length < 2) return;
    const pairs: OptimizationPair[] = [];
    let totalScore = 0;
    let pairCount = 0;

    for (let i = 0; i < optResidents.length; i++) {
      for (let j = i + 1; j < optResidents.length; j++) {
        const result = calculateCompatibility(
          optResidents[i].zodiac,
          optResidents[j].zodiac,
          optResidents[i].personality,
          optResidents[j].personality
        );
        pairs.push({
          a: optResidents[i],
          b: optResidents[j],
          romance: result.romance,
          friendship: result.friendship,
        });
        totalScore += (result.romance + result.friendship) / 2;
        pairCount++;
      }
    }

    pairs.sort((a, b) => (b.romance + b.friendship) - (a.romance + a.friendship));
    setOptResult({ pairs: pairs.slice(0, 8), score: Math.round(totalScore / pairCount) });
  }

  function applyOptimizationToGrid() {
    if (!optResult || optResult.pairs.length === 0) return;
    setCells((prev) => {
      const next = prev.map((row) => row.map((cell) => ({ ...cell })));
      const placed = new Set<string>();
      let row = 1;
      let col = 1;
      const placedPairs = optResult.pairs.slice(0, Math.floor(gridSize / 3));

      for (const pair of placedPairs) {
        // Place pair A
        if (!placed.has(pair.a.id) && row < gridSize - 1 && col < gridSize - 1) {
          next[row][col] = { type: "house", residentName: pair.a.name, residentPersonality: pair.a.personality };
          placed.add(pair.a.id);
          col++;
        }
        // Place pair B adjacent
        if (!placed.has(pair.b.id) && row < gridSize - 1 && col < gridSize - 1) {
          next[row][col] = { type: "house", residentName: pair.b.name, residentPersonality: pair.b.personality };
          placed.add(pair.b.id);
          col++;
        }
        if (col >= gridSize - 2) {
          col = 1;
          row += 2;
        }
      }
      return next;
    });
    setActiveTab("planner");
  }

  /* ---- Stats ---- */
  const stats = {
    buildings: 0,
    decorations: 0,
    residents: 0,
    coverage: 0,
  };
  for (const row of cells) {
    for (const cell of row) {
      if (cell.type === "empty") continue;
      const def = BUILDING_MAP[cell.type];
      if (def?.isDecoration) stats.decorations++;
      else stats.buildings++;
      if (cell.residentName) stats.residents++;
    }
  }
  stats.coverage = Math.round(
    ((stats.buildings + stats.decorations) / (gridSize * gridSize)) * 100
  );

  /* ---- FAQ data ---- */
  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
    { q: t("faq5Q"), a: t("faq5A") },
    { q: t("faq6Q"), a: t("faq6A") },
    { q: t("faq7Q"), a: t("faq7A") },
    { q: t("faq8Q"), a: t("faq8A") },
    { q: t("faq9Q"), a: t("faq9A") },
  ];

  const localePath = locale === "en" ? "" : `/${locale}`;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* ===== JSON-LD: WebApplication ===== */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Tomodachi Life Island Planner",
              applicationCategory: "GameUtilityApplication",
              operatingSystem: "Any (Browser-based)",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              description: t("metaDescription"),
              url: `${BASE}${localePath}/tomodachi-island-planner`,
            }).replace(/<\/script/g, "<\\/script"),
          }}
        />
        {/* ===== JSON-LD: BreadcrumbList ===== */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "LifeSimGrid", item: `${BASE}${localePath || "/"}` },
                { "@type": "ListItem", position: 2, name: t("heroBadge"), item: `${BASE}${localePath}/tomodachi-island-planner` },
              ],
            }).replace(/<\/script/g, "<\\/script"),
          }}
        />
        {/* ===== JSON-LD: HowTo ===== */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            }).replace(/<\/script/g, "<\\/script"),
          }}
        />
        {/* ===== JSON-LD: FAQPage ===== */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            }).replace(/<\/script/g, "<\\/script"),
          }}
        />

        {/* ===== Hero ===== */}
        <section aria-labelledby="island-hero" className="mx-auto max-w-6xl px-4 pt-8 pb-4 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-1.5 text-xs font-medium text-teal-700">
            <MapPin className="h-3.5 w-3.5" />
            {t("heroBadge")}
          </div>
          <h1 id="island-hero" className="font-mono text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {t("heroTitle")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
            {t("heroSubtitle")}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">🏝️ {t("heroTag1")}</span>
            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">🧠 {t("heroTag2")}</span>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">📤 {t("heroTag3")}</span>
          </div>
        </section>

        {/* ===== Privacy Badge ===== */}
        <div className="mx-auto max-w-4xl px-4 pb-4">
          <div className="rounded-xl bg-teal-50 p-3 text-center text-xs text-teal-700 sm:text-sm">
            {t("privacyBadge")}
          </div>
        </div>

        {/* ===== Tab Navigation ===== */}
        <section aria-labelledby="island-tab-nav" className="mx-auto max-w-7xl px-4">
          <h2 id="island-tab-nav" className="sr-only">{t("tabPlanner")}</h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {([
              { key: "planner", label: t("tabPlanner"), icon: Grid3x3, color: "teal" },
              { key: "templates", label: t("tabTemplates"), icon: Layout, color: "amber" },
              { key: "optimizer", label: t("tabOptimizer"), icon: Users, color: "purple" },
            ] as const).map((tab) => {
              const isActive = activeTab === tab.key;
              const colorClasses: Record<string, { active: string; inactive: string }> = {
                teal: { active: "bg-teal-500 text-white shadow-md", inactive: "bg-white text-gray-600 hover:bg-teal-50" },
                amber: { active: "bg-amber-500 text-white shadow-md", inactive: "bg-white text-gray-600 hover:bg-amber-50" },
                purple: { active: "bg-purple-500 text-white shadow-md", inactive: "bg-white text-gray-600 hover:bg-purple-50" },
              };
              const c = colorClasses[tab.color];
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-sm font-semibold transition-all active:scale-95 ${isActive ? c.active : c.inactive}`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* ===== Tab Content ===== */}
        <section aria-labelledby="island-tab-content" className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
          <h2 id="island-tab-content" className="sr-only">
            {activeTab === "planner" ? t("tabPlanner") : activeTab === "templates" ? t("tabTemplates") : t("tabOptimizer")}
          </h2>

          {/* ===== PLANNER TAB ===== */}
          <div className={activeTab !== "planner" ? "hidden" : ""}>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
              <h3 className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-2">{t("plannerTitle")}</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{t("plannerDesc")}</p>

              {/* Grid Size Selector */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-gray-700">{t("gridSize")}:</span>
                {([12, 16, 20] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => changeGridSize(s)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                      gridSize === s
                        ? "bg-teal-500 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-teal-50"
                    }`}
                  >
                    {s === 12 ? t("gridSizeSmall") : s === 16 ? t("gridSizeMedium") : t("gridSizeLarge")}
                  </button>
                ))}
              </div>

              {/* Building Palette */}
              <div className="mb-4">
                <p className="mb-2 text-sm font-medium text-gray-700">{t("buildingPalette")}:</p>
                <div className="flex flex-wrap gap-2">
                  {BUILDINGS.map((b) => {
                    const isSelected = selectedBuilding === b.type;
                    return (
                      <button
                        key={b.type}
                        onClick={() => setSelectedBuilding(b.type)}
                        className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all active:scale-95 ${
                          isSelected
                            ? "border-transparent text-white shadow-sm"
                            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                        }`}
                        style={isSelected ? { backgroundColor: b.color } : {}}
                        title={t(b.labelKey)}
                      >
                        <b.icon className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">{t(b.labelKey)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Canvas Grid */}
              <div className="mb-4 overflow-x-auto">
                <IslandCanvas
                  size={gridSize}
                  cells={cells}
                  onCellClick={handleCellClick}
                  onCellRightClick={handleCellRightClick}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <button onClick={exportPng} className="flex items-center gap-1.5 rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-600 active:scale-95">
                  <Download className="h-4 w-4" /> {t("exportPng")}
                </button>
                <button onClick={exportJson} className="flex items-center gap-1.5 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-600 active:scale-95">
                  <Save className="h-4 w-4" /> {t("exportJson")}
                </button>
                <label className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-200 active:scale-95">
                  <Upload className="h-4 w-4" /> {t("importJson")}
                  <input type="file" accept=".json" onChange={importJson} className="hidden" />
                </label>
                <button onClick={clearGrid} className="flex items-center gap-1.5 rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 shadow-sm transition-all hover:bg-red-100 active:scale-95">
                  <Trash2 className="h-4 w-4" /> {t("clearGrid")}
                </button>
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl bg-amber-50 p-3 text-center">
                  <Home className="mx-auto mb-1 h-5 w-5 text-amber-600" />
                  <p className="text-2xl font-bold text-gray-900">{stats.buildings}</p>
                  <p className="text-xs text-gray-500">{t("statBuildings")}</p>
                </div>
                <div className="rounded-xl bg-green-50 p-3 text-center">
                  <Trees className="mx-auto mb-1 h-5 w-5 text-green-600" />
                  <p className="text-2xl font-bold text-gray-900">{stats.decorations}</p>
                  <p className="text-xs text-gray-500">{t("statDecorations")}</p>
                </div>
                <div className="rounded-xl bg-purple-50 p-3 text-center">
                  <Users className="mx-auto mb-1 h-5 w-5 text-purple-600" />
                  <p className="text-2xl font-bold text-gray-900">{stats.residents}</p>
                  <p className="text-xs text-gray-500">{t("statResidents")}</p>
                </div>
                <div className="rounded-xl bg-teal-50 p-3 text-center">
                  <Grid3x3 className="mx-auto mb-1 h-5 w-5 text-teal-600" />
                  <p className="text-2xl font-bold text-gray-900">{stats.coverage}%</p>
                  <p className="text-xs text-gray-500">{t("statCoverage")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ===== TEMPLATES TAB ===== */}
          <div className={activeTab !== "templates" ? "hidden" : ""}>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
              <h3 className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-2">{t("templatesTitle")}</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{t("templatesDesc")}</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((id) => {
                  const icons: Record<number, React.ReactElement> = {
                    1: <Heart className="h-5 w-5 text-rose-500" />,
                    2: <Users className="h-5 w-5 text-blue-500" />,
                    3: <Grid3x3 className="h-5 w-5 text-teal-500" />,
                    4: <Star className="h-5 w-5 text-purple-500" />,
                    5: <ShoppingBag className="h-5 w-5 text-amber-500" />,
                    6: <Trees className="h-5 w-5 text-green-500" />,
                  };
                  return (
                    <div key={id} className="rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all hover:shadow-md">
                      <div className="mb-2 flex items-center gap-2">
                        {icons[id]}
                        <h4 className="font-mono text-sm font-bold text-gray-900">{t(`template${id}Name` as never)}</h4>
                      </div>
                      <p className="mb-3 text-xs leading-relaxed text-gray-600">{t(`template${id}Desc` as never)}</p>
                      <button
                        onClick={() => loadTemplate(id)}
                        className="w-full rounded-lg bg-teal-500 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-teal-600 active:scale-95"
                      >
                        {t("loadTemplate")}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ===== OPTIMIZER TAB ===== */}
          <div className={activeTab !== "optimizer" ? "hidden" : ""}>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
              <h3 className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-2">{t("optimizerTitle")}</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{t("optimizerDesc")}</p>

              {/* Add Resident Form */}
              <div className="mb-4 rounded-xl bg-purple-50 p-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">{t("addResidentName")}</label>
                    <input
                      type="text"
                      value={optName}
                      onChange={(e) => setOptName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addOptResident()}
                      maxLength={20}
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">{t("addResidentPersonality")}</label>
                    <select
                      value={optPersonality}
                      onChange={(e) => setOptPersonality(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-purple-400"
                    >
                      {PERSONALITIES.map((p) => {
                        const mbti = getMbtiCode(p);
                        const group = getPersonalityGroup(p);
                        return (
                          <option key={p} value={p}>
                            {mbti} — {group}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">{t("zodiacLabel")}</label>
                    <select
                      value={optZodiac}
                      onChange={(e) => setOptZodiac(e.target.value as Zodiac)}
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-purple-400"
                    >
                      {ZODIACS.map((z) => (
                        <option key={z} value={z}>
                          {z.charAt(0).toUpperCase() + z.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={addOptResident}
                  disabled={!optName.trim() || optResidents.length >= MAX_RESIDENTS}
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-purple-500 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-purple-600 active:scale-95 disabled:opacity-40 sm:w-auto"
                >
                  <Plus className="h-4 w-4" /> {t("addResidentBtn")}
                </button>
              </div>

              {/* Residents List */}
              <div className="mb-4">
                <h4 className="mb-2 font-mono text-sm font-bold text-gray-900">
                  {t("residentsList")} ({optResidents.length}/{MAX_RESIDENTS})
                </h4>
                {optResidents.length === 0 ? (
                  <p className="rounded-lg bg-gray-50 p-3 text-center text-sm text-gray-400">{t("noResidentsOptimizer")}</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {optResidents.map((r) => {
                      const group = getPersonalityGroup(r.personality);
                      const color = getGroupColor(group);
                      return (
                        <div
                          key={r.id}
                          className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm"
                          style={{ borderColor: color + "40", backgroundColor: color + "0a" }}
                        >
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                          <span className="font-medium text-gray-800">{r.name}</span>
                          <span className="text-xs text-gray-500">{getMbtiCode(r.personality)}</span>
                          <button
                            onClick={() => removeOptResident(r.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Optimize Button */}
              <button
                onClick={runOptimization}
                disabled={optResidents.length < 2}
                className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-teal-500 py-3 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg active:scale-95 disabled:opacity-40 sm:w-auto sm:px-8"
              >
                <Sparkles className="h-5 w-5" /> {t("optimizeBtn")}
              </button>

              {/* Optimization Result */}
              {optResult && (
                <div className="space-y-4">
                  <div className="rounded-xl bg-gradient-to-br from-purple-50 to-teal-50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-900">{t("optimizationScore")}</span>
                      <span className="font-mono text-3xl font-bold text-purple-600">{optResult.score}%</span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-teal-400 transition-all duration-700"
                        style={{ width: `${optResult.score}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 font-mono text-sm font-bold text-gray-900">{t("optimizationPairs")}</h4>
                    <div className="space-y-2">
                      {optResult.pairs.map((pair, i) => (
                        <div key={i} className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700">
                            {i + 1}
                          </span>
                          <div className="flex flex-1 items-center gap-2">
                            <span className="text-sm font-medium text-gray-800">{pair.a.name}</span>
                            <span className="text-gray-300">↔</span>
                            <span className="text-sm font-medium text-gray-800">{pair.b.name}</span>
                          </div>
                          <div className="flex gap-3 text-xs">
                            <span className="rounded bg-rose-50 px-2 py-0.5 font-medium text-rose-600">
                              {t("pairRomance")}: {pair.romance}%
                            </span>
                            <span className="rounded bg-blue-50 px-2 py-0.5 font-medium text-blue-600">
                              {t("pairFriendship")}: {pair.friendship}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={applyOptimizationToGrid}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-teal-600 active:scale-95 sm:w-auto sm:px-8"
                  >
                    <Grid3x3 className="h-5 w-5" /> {t("applyToGrid")}
                  </button>
                </div>
              )}

              {!optResult && optResidents.length < 2 && (
                <p className="text-center text-sm text-gray-400">{t("optimizationEmpty")}</p>
              )}
            </div>
          </div>
        </section>

        {/* ===== PUBLIC CONTENT: How It Works ===== */}
        <section aria-labelledby="island-how-to" className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-3xl bg-teal-50 p-6 sm:p-8">
            <h2 id="island-how-to" className="mb-6 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">
              {t("howToTitle")}
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              {[1, 2, 3, 4, 5].map((step) => (
                <li key={step} className="leading-relaxed">{t(`howToStep${step}` as never)}</li>
              ))}
            </ol>
          </div>
        </section>

        {/* ===== PUBLIC CONTENT: Why Choose ===== */}
        <section aria-labelledby="island-why-choose" className="mx-auto max-w-6xl px-4 py-8">
          <h2 id="island-why-choose" className="mb-6 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">
            {t("whyChooseTitle")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Crown, title: t("whyChoose1Title"), desc: t("whyChoose1Desc"), color: "purple" },
              { icon: Layout, title: t("whyChoose2Title"), desc: t("whyChoose2Desc"), color: "teal" },
              { icon: Shield, title: t("whyChoose3Title"), desc: t("whyChoose3Desc"), color: "green" },
            ].map((item, i) => {
              const colorClasses: Record<string, string> = {
                purple: "bg-purple-50 text-purple-600",
                teal: "bg-teal-50 text-teal-600",
                green: "bg-green-50 text-green-600",
              };
              return (
                <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${colorClasses[item.color]}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===== PUBLIC CONTENT: 1-Minute Guide ===== */}
        <section aria-labelledby="island-one-min" className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="island-one-min" className="mb-3 font-mono text-xl font-bold text-gray-900 sm:text-2xl">{t("oneMinTitle")}</h2>
            <p className="text-sm leading-relaxed text-gray-600">{t("oneMinDesc")}</p>
          </div>
        </section>

        {/* ===== PUBLIC CONTENT: FAQ ===== */}
        <section aria-labelledby="island-faq" className="mx-auto max-w-6xl px-4 pb-6 sm:pb-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="island-faq" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-4">{t("faqTitle")}</h2>
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

        {/* ===== PUBLIC CONTENT: MBTI Disclaimer ===== */}
        <section className="mx-auto max-w-6xl px-4 pb-4 sm:pb-6">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs leading-relaxed text-gray-500">{t("mbtiDisclaimer")}</p>
          </div>
        </section>

        {/* ===== PUBLIC CONTENT: Related Tools ===== */}
        <section aria-labelledby="island-related-tools" className="mx-auto max-w-6xl px-4 pb-4 sm:pb-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="island-related-tools" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-4">{t("relatedTitle")}</h2>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/tomodachi-life-mbti" className="rounded-xl bg-indigo-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-indigo-800 text-sm">{t("relatedMbti")}</h3>
              </Link>
              <Link href="/tomodachi-voice-lab" className="rounded-xl bg-purple-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-purple-800 text-sm">{t("relatedVoiceLab")}</h3>
              </Link>
              <Link href="/mii-qr-unlocker" className="rounded-xl bg-blue-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-blue-800 text-sm">{t("relatedMiiQr")}</h3>
              </Link>
              <Link href="/acnh-pixel-studio" className="rounded-xl bg-amber-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-amber-800 text-sm">{t("relatedAcnhLink")}</h3>
              </Link>
            </div>
            <div className="mt-4 text-center">
              <Link href="/living-the-grid" className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700">
                {t("relatedPixelGrid")} →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
