"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  ChevronDown, Eye, Shield, BookOpen, RefreshCw, Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import { useState, useCallback, useMemo } from "react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BASE = "https://lifesimgrid.org";

const EYE_COLORS = ["#1e293b", "#78350f", "#2563eb", "#16a34a", "#6b7280", "#92400e"];

const SHAPE_COUNT = 8;
const SIZE_COUNT = 3;
const HEIGHT_COUNT = 3;
const SPACING_COUNT = 3;
const ANGLE_COUNT = 3;

interface EyeParams {
  shape: number;
  size: number;
  height: number;
  spacing: number;
  angle: number;
  color: number;
}

const DEFAULT_PARAMS: EyeParams = {
  shape: 0,
  size: 1,
  height: 1,
  spacing: 1,
  angle: 1,
  color: 0,
};

const GALLERY_STYLES: EyeParams[] = [
  { shape: 0, size: 1, height: 1, spacing: 1, angle: 1, color: 0 },
  { shape: 3, size: 1, height: 1, spacing: 1, angle: 2, color: 0 },
  { shape: 6, size: 2, height: 0, spacing: 1, angle: 0, color: 2 },
  { shape: 4, size: 2, height: 2, spacing: 1, angle: 1, color: 1 },
  { shape: 5, size: 0, height: 1, spacing: 0, angle: 1, color: 4 },
  { shape: 7, size: 1, height: 1, spacing: 1, angle: 2, color: 3 },
];

/* ------------------------------------------------------------------ */
/*  Eye Preview Component (SVG)                                       */
/* ------------------------------------------------------------------ */

function EyePreview({ params }: { params: EyeParams }) {
  const { shape, size, height, spacing, angle, color } = params;

  const sizeMap = [14, 20, 26];
  const heightMap = [110, 120, 130];
  const spacingMap = [70, 85, 100];
  const angleMap = [-8, 0, 8];
  const eyeR = sizeMap[size];
  const eyeY = heightMap[height];
  const eyeOffsetX = spacingMap[spacing];
  const eyeAngle = angleMap[angle];
  const eyeColor = EYE_COLORS[color];

  const cx1 = 150 - eyeOffsetX / 2;
  const cx2 = 150 + eyeOffsetX / 2;

  const shapes: Record<number, { rx: number; ry: number }> = {
    0: { rx: eyeR, ry: eyeR },           // Round
    1: { rx: eyeR * 0.85, ry: eyeR },    // Oval
    2: { rx: eyeR * 0.75, ry: eyeR * 0.95 }, // Almond
    3: { rx: eyeR * 0.7, ry: eyeR * 0.85 },  // Sharp
    4: { rx: eyeR * 1.1, ry: eyeR * 0.9 },   // Wide
    5: { rx: eyeR * 0.65, ry: eyeR * 0.7 },  // Narrow
    6: { rx: eyeR * 0.9, ry: eyeR * 1.05 },  // Droopy
    7: { rx: eyeR, ry: eyeR * 0.95 },        // Sparkly
  };

  const s = shapes[shape] || shapes[0];
  const irisR = s.rx * 0.6;

  return (
    <svg viewBox="0 0 300 240" className="w-full max-w-xs">
      {/* Face */}
      <ellipse cx="150" cy="120" rx="110" ry="100" fill="#fef3c7" stroke="#fde68a" strokeWidth="3" />
      {/* Eyebrows */}
      <rect x={cx1 - 20} y={eyeY - eyeR - 12} width="40" height="4" rx="2" fill="#92400e" transform={`rotate(${eyeAngle} ${cx1} ${eyeY})`} />
      <rect x={cx2 - 20} y={eyeY - eyeR - 12} width="40" height="4" rx="2" fill="#92400e" transform={`rotate(${eyeAngle} ${cx2} ${eyeY})`} />
      {/* Left eye */}
      <g transform={`rotate(${eyeAngle} ${cx1} ${eyeY})`}>
        <ellipse cx={cx1} cy={eyeY} rx={s.rx} ry={s.ry} fill="white" stroke="#1e293b" strokeWidth="2" />
        <circle cx={cx1} cy={eyeY + 2} r={irisR} fill={eyeColor} />
        <circle cx={cx1 + irisR * 0.3} cy={eyeY - irisR * 0.3} r={irisR * 0.3} fill="white" />
        {shape === 7 && (
          <>
            <path d={`M ${cx1 - s.rx * 0.8} ${eyeY - s.ry * 0.8} L ${cx1 - s.rx * 0.5} ${eyeY - s.ry * 0.8} L ${cx1 - s.rx * 0.65} ${eyeY - s.ry * 1.1} Z`} fill="#fbbf24" />
            <path d={`M ${cx1 + s.rx * 0.5} ${eyeY - s.ry * 0.8} L ${cx1 + s.rx * 0.8} ${eyeY - s.ry * 0.8} L ${cx1 + s.rx * 0.65} ${eyeY - s.ry * 1.1} Z`} fill="#fbbf24" />
          </>
        )}
      </g>
      {/* Right eye */}
      <g transform={`rotate(${eyeAngle} ${cx2} ${eyeY})`}>
        <ellipse cx={cx2} cy={eyeY} rx={s.rx} ry={s.ry} fill="white" stroke="#1e293b" strokeWidth="2" />
        <circle cx={cx2} cy={eyeY + 2} r={irisR} fill={eyeColor} />
        <circle cx={cx2 + irisR * 0.3} cy={eyeY - irisR * 0.3} r={irisR * 0.3} fill="white" />
        {shape === 7 && (
          <>
            <path d={`M ${cx2 - s.rx * 0.8} ${eyeY - s.ry * 0.8} L ${cx2 - s.rx * 0.5} ${eyeY - s.ry * 0.8} L ${cx2 - s.rx * 0.65} ${eyeY - s.ry * 1.1} Z`} fill="#fbbf24" />
            <path d={`M ${cx2 + s.rx * 0.5} ${eyeY - s.ry * 0.8} L ${cx2 + s.rx * 0.8} ${eyeY - s.ry * 0.8} L ${cx2 + s.rx * 0.65} ${eyeY - s.ry * 1.1} Z`} fill="#fbbf24" />
          </>
        )}
      </g>
      {/* Mouth */}
      <path d="M 130 170 Q 150 185 170 170" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Slider Component                                                  */
/* ------------------------------------------------------------------ */

function ParamSlider({
  label, value, max, onChange, labels,
}: {
  label: string; value: number; max: number; onChange: (v: number) => void; labels: string[];
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-600">{label}</span>
        <span className="text-xs font-medium text-indigo-600">{labels[value] || value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-indigo-500"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function TomodachiMiiEyesPage() {
  const t = useTranslations("TomodachiMiiEyesPage");
  const locale = useLocale();

  const [activeTab, setActiveTab] = useState<"designer" | "gallery" | "guide">("designer");
  const [params, setParams] = useState<EyeParams>(DEFAULT_PARAMS);

  const updateParam = useCallback((key: keyof EyeParams, value: number) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setParams(DEFAULT_PARAMS);
  }, []);

  const loadStyle = useCallback((style: EyeParams) => {
    setParams(style);
    setActiveTab("designer");
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
    { key: "designer" as const, label: t("tabDesigner"), icon: Eye, color: "indigo" },
    { key: "gallery" as const, label: t("tabGallery"), icon: Star, color: "amber" },
    { key: "guide" as const, label: t("tabGuide"), icon: BookOpen, color: "green" },
  ];

  const tabColors: Record<string, string> = {
    indigo: "border-indigo-500 bg-indigo-50 text-indigo-700",
    amber: "border-amber-500 bg-amber-50 text-amber-700",
    green: "border-green-500 bg-green-50 text-green-700",
  };

  const shapeLabels = Array.from({ length: SHAPE_COUNT }, (_, i) => t(`shape${i}` as never));
  const sizeLabels = [t("sizeSmall"), t("sizeMedium"), t("sizeLarge")];
  const heightLabels = [t("heightLow"), t("heightMid"), t("heightHigh")];
  const spacingLabels = [t("spacingClose"), t("spacingNormal"), t("spacingWide")];
  const angleLabels = [t("angleDown"), t("angleStraight"), t("angleUp")];
  const colorLabels = [t("colorBlack"), t("colorBrown"), t("colorBlue"), t("colorGreen"), t("colorGray"), t("colorHazel")];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* ===== JSON-LD: WebApplication ===== */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Mii Eyes Design Guide for Tomodachi Life",
          applicationCategory: "DesignApplication",
          operatingSystem: "Any (Browser-based)",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description: t("metaDescription"),
          url: `${BASE}${localePath}/mii-eyes`,
        }).replace(/<\/script/g, "<\\/script") }} />
        {/* ===== JSON-LD: BreadcrumbList ===== */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "LifeSimGrid", item: `${BASE}${localePath || "/"}` },
            { "@type": "ListItem", position: 2, name: t("heroBadge"), item: `${BASE}${localePath}/mii-eyes` },
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
        <section aria-labelledby="eyes-hero" className="mx-auto max-w-6xl px-4 pt-8 pb-4 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-xs font-medium text-indigo-700">
            <Eye className="h-3.5 w-3.5" />
            {t("heroBadge")}
          </div>
          <h1 id="eyes-hero" className="font-mono text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {t("heroTitle")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
            {t("heroSubtitle")}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">{t("heroTag1")}</span>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">{t("heroTag2")}</span>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">{t("heroTag3")}</span>
          </div>
        </section>

        {/* ===== Privacy Badge ===== */}
        <div className="mx-auto max-w-4xl px-4 pb-4">
          <div className="rounded-xl bg-indigo-50 p-3 text-center text-xs text-indigo-700 sm:text-sm">
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
          <section aria-labelledby="eyes-designer" className="mx-auto max-w-4xl px-4 py-4 sm:py-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
              <h2 id="eyes-designer" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-2">{t("designerTitle")}</h2>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{t("designerDesc")}</p>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Preview */}
                <div>
                  <h3 className="mb-2 font-mono text-sm font-bold text-gray-700">{t("previewTitle")}</h3>
                  <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
                    <EyePreview params={params} />
                  </div>
                  <button
                    onClick={handleReset}
                    className="mt-3 flex items-center gap-1.5 rounded-lg bg-white border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 transition-all hover:bg-gray-50 active:scale-95"
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> {t("resetBtn")}
                  </button>
                </div>

                {/* Sliders */}
                <div className="space-y-4">
                  <ParamSlider label={t("paramShape")} value={params.shape} max={SHAPE_COUNT - 1} onChange={(v) => updateParam("shape", v)} labels={shapeLabels} />
                  <ParamSlider label={t("paramSize")} value={params.size} max={SIZE_COUNT - 1} onChange={(v) => updateParam("size", v)} labels={sizeLabels} />
                  <ParamSlider label={t("paramHeight")} value={params.height} max={HEIGHT_COUNT - 1} onChange={(v) => updateParam("height", v)} labels={heightLabels} />
                  <ParamSlider label={t("paramSpacing")} value={params.spacing} max={SPACING_COUNT - 1} onChange={(v) => updateParam("spacing", v)} labels={spacingLabels} />
                  <ParamSlider label={t("paramAngle")} value={params.angle} max={ANGLE_COUNT - 1} onChange={(v) => updateParam("angle", v)} labels={angleLabels} />
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-600">{t("paramColor")}</span>
                      <span className="text-xs font-medium text-indigo-600">{colorLabels[params.color]}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {EYE_COLORS.map((c, i) => (
                        <button
                          key={c}
                          onClick={() => updateParam("color", i)}
                          className={`h-8 w-8 rounded-lg border-2 transition-all ${
                            params.color === i ? "border-indigo-500 scale-110" : "border-gray-200"
                          }`}
                          style={{ backgroundColor: c }}
                          title={colorLabels[i]}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ===== GALLERY TAB ===== */}
        <div className={activeTab !== "gallery" ? "hidden" : ""}>
          <section aria-labelledby="eyes-gallery" className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
            <h2 id="eyes-gallery" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-2">{t("galleryTitle")}</h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{t("galleryDesc")}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {GALLERY_STYLES.map((style, i) => (
                <div key={i} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-500" />
                    <h3 className="font-mono text-sm font-bold text-gray-900">{t(`gallery${i + 1}Name` as never)}</h3>
                  </div>
                  <div className="mb-3 rounded-xl bg-indigo-50 p-2">
                    <EyePreview params={style} />
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">{t(`gallery${i + 1}Desc` as never)}</p>
                  <button
                    onClick={() => loadStyle(style)}
                    className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 transition-all hover:bg-indigo-100 active:scale-95"
                  >
                    {t("loadStyle")}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ===== GUIDE TAB ===== */}
        <div className={activeTab !== "guide" ? "hidden" : ""}>
          <section aria-labelledby="eyes-guide" className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
            <h2 id="eyes-guide" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-2">{t("guideTitle")}</h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{t("guideDesc")}</p>
            <div className="space-y-4">
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="font-mono text-sm font-bold text-gray-900 mb-2">{t("guideIntroTitle")}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{t("guideIntroDesc")}</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="font-mono text-sm font-bold text-gray-900 mb-2">{t("guideParamsTitle")}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{t("guideParamsDesc")}</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="font-mono text-sm font-bold text-gray-900 mb-2">{t("guideTipsTitle")}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{t("guideTipsDesc")}</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="font-mono text-sm font-bold text-gray-900 mb-2">{t("guideGameTitle")}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{t("guideGameDesc")}</p>
              </div>
            </div>
          </section>
        </div>

        {/* ===== HOW TO USE ===== */}
        <section aria-labelledby="eyes-how-to" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="rounded-2xl bg-indigo-50 p-4 sm:p-6">
            <h2 id="eyes-how-to" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">{t("howToTitle")}</h2>
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
        <section aria-labelledby="eyes-why" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <h2 id="eyes-why" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">{t("whyChooseTitle")}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><Eye className="h-4 w-4" /></div>
              <h3 className="font-mono text-sm font-bold text-gray-900 mb-1">{t("whyChoose1Title")}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{t("whyChoose1Desc")}</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Star className="h-4 w-4" /></div>
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
        <section aria-labelledby="eyes-faq" className="mx-auto max-w-6xl px-4 pb-6 sm:pb-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="eyes-faq" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-4">{t("faqTitle")}</h2>
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
        <section aria-labelledby="eyes-related" className="mx-auto max-w-6xl px-4 pb-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="eyes-related" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-4">{t("relatedTitle")}</h2>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/mii-qr-unlocker" className="rounded-xl bg-blue-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-blue-800 text-sm">{t("relatedMiiQr")}</h3>
              </Link>
              <Link href="/tomodachi-life-mbti" className="rounded-xl bg-indigo-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-indigo-800 text-sm">{t("relatedMbti")}</h3>
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
