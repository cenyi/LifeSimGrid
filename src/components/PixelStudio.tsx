"use client";

import { useTranslations } from "next-intl";
import { useState, useRef, useCallback, useEffect } from "react";
import { useHistory } from "@/hooks/useHistory";
import { canvasToThumbnail, type PixelHistoryData, type CanvasPreset, type PixelDensity } from "@/lib/history-db";
import HistoryPanel, { ThumbnailImg } from "@/components/HistoryPanel";

interface PresetConfig {
  w: number;
  h: number;
}

const PRESET_DIMS: Record<CanvasPreset, PresetConfig> = {
  square: { w: 1, h: 1 },
  book: { w: 2, h: 3 },
  wide: { w: 16, h: 9 },
};

const DENSITY_BRUSH: Record<PixelDensity, number> = {
  256: 1,
  85: 3,
  64: 4,
  32: 7,
};

const MAX_PALETTE_COLORS = 24;
const COLOR_QUANT_BUCKETS = 6;

const RETRO_PALETTE: [number, number, number, string][] = [
  [0, 0, 0, "Void Black"],
  [34, 32, 52, "Deep Night"],
  [69, 40, 60, "Dark Plum"],
  [102, 57, 49, "Rust Brown"],
  [143, 86, 59, "Warm Sienna"],
  [223, 113, 38, "Neon Orange"],
  [217, 87, 99, "Retro Rose"],
  [215, 123, 186, "Soft Magenta"],
  [95, 87, 79, "Stone Gray"],
  [194, 195, 199, "Silver Mist"],
  [255, 255, 255, "Pure White"],
  [255, 241, 232, "Warm Cream"],
  [0, 71, 119, "Deep Ocean"],
  [39, 125, 143, "Vintage Teal"],
  [77, 166, 114, "Retro Green"],
  [163, 206, 39, "Neon Lime"],
  [255, 234, 0, "Neon Yellow"],
  [255, 163, 0, "Amber Glow"],
  [255, 0, 77, "Retro Red"],
  [255, 101, 101, "Coral Pink"],
  [131, 118, 156, "Lavender"],
  [190, 80, 70, "Classic Brick"],
  [48, 96, 130, "Classic Blue"],
  [65, 150, 175, "Sky Cyan"],
  [29, 43, 83, "Midnight Blue"],
  [126, 37, 83, "Berry Purple"],
  [0, 135, 81, "Forest Emerald"],
  [171, 82, 54, "Copper"],
  [109, 170, 44, "Sap Green"],
  [255, 204, 170, "Peach"],
  [255, 181, 181, "Blush"],
  [200, 200, 200, "Cool Gray"],
];

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")
  );
}

function quantizeColor(r: number, g: number, b: number): string {
  const step = Math.floor(256 / COLOR_QUANT_BUCKETS);
  const qr = Math.min(Math.floor(r / step) * step, 255);
  const qg = Math.min(Math.floor(g / step) * step, 255);
  const qb = Math.min(Math.floor(b / step) * step, 255);
  return rgbToHex(qr, qg, qb);
}

/** Finds the nearest color in the retro palette using Euclidean distance */
function nearestRetroColor(r: number, g: number, b: number): string {
  let minDist = Infinity;
  let bestHex = rgbToHex(r, g, b);

  for (const [pr, pg, pb] of RETRO_PALETTE) {
    const dr = r - pr;
    const dg = g - pg;
    const db = b - pb;
    const dist = dr * dr + dg * dg + db * db;
    if (dist < minDist) {
      minDist = dist;
      bestHex = rgbToHex(pr, pg, pb);
    }
  }

  return bestHex;
}

function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 128 ? "#000000" : "#ffffff";
}

export default function PixelStudio() {
  const t = useTranslations("PixelStudio");
  const ht = useTranslations("History");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [fileName, setFileName] = useState<string>("");
  const [preset, setPreset] = useState<CanvasPreset>("square");
  const [density, setDensity] = useState<PixelDensity>(85);
  const [palette, setPalette] = useState<string[]>([]);
  const [highlightColor, setHighlightColor] = useState<string | null>(null);
  const [pixelGrid, setPixelGrid] = useState<string[][]>([]);
  const [retroMode, setRetroMode] = useState(false);
  const { entries: historyEntries, loading: historyLoading, addEntry: addHistoryEntry, deleteEntry: deleteHistoryEntry, clearAll: clearHistory } = useHistory<PixelHistoryData>("pixel");

  const canvasW = density;
  const canvasH = Math.round(
    (density * PRESET_DIMS[preset].h) / PRESET_DIMS[preset].w
  );
  const brushSize = DENSITY_BRUSH[density];
  const displayScale = Math.max(2, Math.min(4, Math.floor(400 / Math.max(canvasW, canvasH))));

  /** Renders the uploaded image onto the pixel grid canvas with current filter settings */
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvasW;
    canvas.height = canvasH;

    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
    ctx.imageSmoothingEnabled = false;

    const imgRatio = image.width / image.height;
    const canvasRatio = canvasW / canvasH;

    let sx = 0,
      sy = 0,
      sw = image.width,
      sh = image.height;
    if (imgRatio > canvasRatio) {
      sw = image.height * canvasRatio;
      sx = (image.width - sw) / 2;
    } else {
      sh = image.width / canvasRatio;
      sy = (image.height - sh) / 2;
    }

    ctx.drawImage(image, sx, sy, sw, sh, 0, 0, canvasW, canvasH);
    ctx.filter = "none";

    const imageData = ctx.getImageData(0, 0, canvasW, canvasH);
    const data = imageData.data;

    const colorMap = new Map<string, number>();
    const grid: string[][] = [];

    for (let y = 0; y < canvasH; y++) {
      const row: string[] = [];
      for (let x = 0; x < canvasW; x++) {
        const i = (y * canvasW + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        let hex: string;
        if (retroMode) {
          hex = nearestRetroColor(r, g, b);
        } else {
          hex = quantizeColor(r, g, b);
        }

        row.push(hex);
        colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
      }
      grid.push(row);
    }

    const sorted = [...colorMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, MAX_PALETTE_COLORS)
      .map(([c]) => c);

    setPalette(sorted);
    setPixelGrid(grid);
  }, [image, brightness, contrast, canvasW, canvasH, retroMode]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  /** Draws the highlight overlay on the overlay canvas */
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay || !highlightColor || pixelGrid.length === 0) {
      if (overlay) {
        const ctx = overlay.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, overlay.width, overlay.height);
      }
      return;
    }

    overlay.width = canvasW * brushSize;
    overlay.height = canvasH * brushSize;
    const ctx = overlay.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, overlay.width, overlay.height);

    const colorIndex = palette.indexOf(highlightColor) + 1;
    const label = String(colorIndex);

    for (let y = 0; y < canvasH; y++) {
      for (let x = 0; x < canvasW; x++) {
        if (pixelGrid[y]?.[x] === highlightColor) {
          const px = x * brushSize;
          const py = y * brushSize;

          ctx.strokeStyle = "#FFCC00";
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 2]);
          ctx.strokeRect(px + 0.5, py + 0.5, brushSize - 1, brushSize - 1);
          ctx.setLineDash([]);

          if (brushSize >= 3) {
            const fontSize = Math.max(6, brushSize - 2);
            ctx.font = `bold ${fontSize}px monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = getContrastColor(highlightColor);
            ctx.fillText(label, px + brushSize / 2, py + brushSize / 2);
          }
        }
      }
    }
  }, [highlightColor, pixelGrid, canvasW, canvasH, brushSize, palette]);

  /** Resets all image-related state to allow uploading a new image */
  function handleClear() {
    setImage(null);
    setFileName("");
    setHighlightColor(null);
    setPalette([]);
    setPixelGrid([]);
    setRetroMode(false);
    setBrightness(100);
    setContrast(100);
  }

  /** Handles file selection from input or drag-and-drop */
  function handleFileChange(file: File) {
    if (!file.type.startsWith("image/")) return;
    setFileName(file.name);
    setHighlightColor(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => setImage(img);
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  /** Processes the drag-over event to allow drop */
  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  /** Processes the drop event and extracts the image file */
  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  }

  /** Downloads the current canvas content as a PNG file and saves to history */
  async function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const exportCanvas = document.createElement("canvas");
    const scale = Math.max(1, Math.ceil(512 / Math.max(canvasW, canvasH)));
    exportCanvas.width = canvasW * scale;
    exportCanvas.height = canvasH * scale;
    const ctx = exportCanvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, 0, 0, exportCanvas.width, exportCanvas.height);

    const link = document.createElement("a");
    link.download = `pixel-art-${canvasW}x${canvasH}.png`;
    link.href = exportCanvas.toDataURL("image/png");
    link.click();

    const thumbnail = await canvasToThumbnail(canvas);
    if (thumbnail) {
      addHistoryEntry({
        thumbnail,
        fileName: fileName || "pixel-art",
        preset,
        density,
        retroMode,
        brightness,
        contrast,
      });
    }
  }

  /** Finds the retro palette name for a given hex color */
  function getRetroName(hex: string): string | null {
    if (!retroMode) return null;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    for (const [pr, pg, pb, name] of RETRO_PALETTE) {
      if (pr === r && pg === g && pb === b) return name;
    }
    return null;
  }

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-4 lg:items-start">
        <div className="w-full space-y-5 lg:w-[40%] lg:shrink-0">
          <h2 className="font-mono text-xl font-bold text-gray-900 sm:text-2xl">
            {t("title")}
          </h2>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 transition-colors hover:border-sunshine hover:bg-sunshine/5"
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) handleFileChange(file);
              };
              input.click();
            }}
          >
            <span className="text-3xl">📁</span>
            <p className="mt-2 text-center text-sm text-gray-500">
              {t("uploadBtn")}
            </p>
            {fileName && (
              <div className="mt-1 flex items-center gap-2">
                <p className="text-xs text-sunshine">{fileName}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="rounded-md bg-red-50 px-2 py-0.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-100"
                >
                  ✕ {t("clearBtn")}
                </button>
              </div>
            )}
          </div>

          <div className="rounded-xl bg-blue-50 p-3 text-xs leading-relaxed text-blue-700">
            {t("safetyNote")}
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                🖼️ {t("canvasPreset")}
              </label>
              <div className="flex gap-2">
                {(
                  [
                    ["square", t("presetSquare")],
                    ["book", t("presetBook")],
                    ["wide", t("presetWide")],
                  ] as [CanvasPreset, string][]
                ).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setPreset(key);
                      setHighlightColor(null);
                    }}
                    className={`flex-1 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                      preset === key
                        ? "border-sunshine bg-sunshine/10 text-gray-900 shadow-sm"
                        : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                🔍 {t("pixelDensity")}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    [256, t("density256")],
                    [85, t("density85")],
                    [64, t("density64")],
                    [32, t("density32")],
                  ] as [PixelDensity, string][]
                ).map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => {
                      setDensity(val);
                      setHighlightColor(null);
                    }}
                    className={`rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                      density === val
                        ? "border-island-blue bg-island-blue/10 text-gray-900 shadow-sm"
                        : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  💡 {t("brightness")}
                </label>
                <span className="font-mono text-xs text-gray-500">
                  {brightness}%
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="200"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  💡 {t("contrast")}
                </label>
                <span className="font-mono text-xs text-gray-500">
                  {contrast}%
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="200"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {t("retroPalette")}
                </span>
                <button
                  onClick={() => {
                    setRetroMode(!retroMode);
                    setHighlightColor(null);
                  }}
                  className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                    retroMode
                      ? "bg-island-blue text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {retroMode ? t("retroPaletteOn") : t("retroPaletteOff")}
                </button>
              </div>
              <p className="text-xs text-gray-400">
                {t("retroPaletteHint")}
              </p>
            </div>
          </div>

          <p className="rounded-xl bg-sunshine/10 p-3 text-xs leading-relaxed text-gray-600">
            💡 {t("hint")}
          </p>
        </div>

        <div className="flex min-w-0 flex-col items-center gap-3 p-3 lg:w-[60%] lg:self-start lg:p-4">
          <div className="relative border-2 border-black bg-white p-2">
            <canvas
              ref={canvasRef}
              width={canvasW}
              height={canvasH}
              className="pixelated block"
              style={{
                width: `${canvasW * displayScale}px`,
                height: `${canvasH * displayScale}px`,
              }}
            />
            <canvas
              ref={overlayRef}
              className="pointer-events-none absolute left-2 top-2"
              style={{
                width: `${canvasW * displayScale}px`,
                height: `${canvasH * displayScale}px`,
                imageRendering: "pixelated",
              }}
            />
          </div>

          <div className="text-center font-mono text-xs text-gray-400">
            {canvasW} × {canvasH} · {brushSize}px
            {retroMode && " · 🕹️ Retro"}
          </div>

          {image && (
            <button
              onClick={handleDownload}
              className="rounded-xl bg-island-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md active:scale-95"
            >
              {t("downloadBtn")}
            </button>
          )}

          {palette.length > 0 && (
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-700">
                  🎨 {t("colorPalette")}
                </span>
                {highlightColor && (
                  <button
                    onClick={() => setHighlightColor(null)}
                    className="rounded-lg bg-gray-100 px-2 py-1 text-xs text-gray-500 transition-colors hover:bg-gray-200"
                  >
                    {t("clearHighlight")}
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-400">{t("colorPaletteHint")}</p>
              <div className="flex flex-wrap gap-1.5">
                {palette.map((color, idx) => {
                  const retroName = getRetroName(color);
                  return (
                    <button
                      key={color}
                      onClick={() =>
                        setHighlightColor(
                          highlightColor === color ? null : color
                        )
                      }
                      className={`group relative flex items-center justify-center rounded-lg transition-all ${
                        highlightColor === color
                          ? "ring-2 ring-sunshine ring-offset-1 scale-110"
                          : "hover:scale-105"
                      }`}
                      style={{
                        width: "28px",
                        height: "28px",
                        backgroundColor: color,
                      }}
                      title={retroName || color}
                    >
                      <span
                        className="font-mono text-[9px] font-bold opacity-0 transition-opacity group-hover:opacity-100"
                        style={{ color: getContrastColor(color) }}
                      >
                        {idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
              {retroMode && highlightColor && getRetroName(highlightColor) && (
                <div className="rounded-lg bg-island-blue/5 px-3 py-1.5 text-center text-xs font-medium text-island-blue">
                  {getRetroName(highlightColor)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <HistoryPanel
        entries={historyEntries}
        loading={historyLoading}
        onDelete={deleteHistoryEntry}
        onClearAll={clearHistory}
        renderEntry={(entry) => {
          const d = entry.data;
          return (
            <div className="flex items-center gap-3">
              <ThumbnailImg
                blob={d.thumbnail}
                alt="Pixel art preview"
                className="h-12 w-12 flex-shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-800">
                  {d.fileName}
                </p>
                <p className="text-xs text-gray-500">
                  {d.preset} · {d.density} · {d.retroMode ? t("retroPaletteOn") : t("retroPaletteOff")} · {ht("brightnessShort")}:{d.brightness} {ht("contrastShort")}:{d.contrast}
                </p>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
