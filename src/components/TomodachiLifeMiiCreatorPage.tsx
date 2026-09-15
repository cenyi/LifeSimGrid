"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useMemo, useCallback } from "react";
import {
  Sparkles, RefreshCw, Download, Share2, User, Palette,
  Sliders, Heart, Users, Shield, ArrowRight, Dices,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import MiiFacePreview from "@/components/MiiFacePreview";
import {
  FACE_SHAPES,
  HAIR_STYLES,
  SKIN_TONES,
  HAIR_COLORS,
  SLIDER_KEYS,
  type SliderKey,
  type SliderValues,
  type MiiAppearance,
  predictFull,
  randomMii,
  suggestNames,
  exportMiiJson,
} from "@/lib/mii-creator-data";

/* ------------------------------------------------------------------ */
/*  Appearance state                                                   */
/* ------------------------------------------------------------------ */

const DEFAULT_APPEARANCE: MiiAppearance = {
  faceShape: "round",
  hairStyle: "medium",
  hairColor: HAIR_COLORS[1],
  skinTone: SKIN_TONES[2],
  gender: "male",
};

const DEFAULT_SLIDERS: SliderValues = {
  movement: 50,
  speech: 50,
  energy: 50,
  thinking: 50,
};

/* ------------------------------------------------------------------ */
/*  Small sub-components                                               */
/* ------------------------------------------------------------------ */

function SwatchRow({
  swatches,
  active,
  onSelect,
  labels,
}: {
  swatches: string[];
  active: string;
  onSelect: (v: string) => void;
  labels?: Record<string, string>;
}) {
  return (
    <div
      className="flex flex-wrap gap-2"
      style={{ columnCount: 1, gridTemplateColumns: undefined }}
    >
      {swatches.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onSelect(c)}
          title={labels?.[c] ?? c}
          aria-label={labels?.[c] ?? c}
          aria-pressed={active === c}
          className={`h-8 w-8 rounded-lg border-2 transition-all ${
            active === c
              ? "border-indigo-500 scale-110 shadow-md"
              : "border-gray-200 hover:border-gray-300"
          }`}
          style={{ backgroundColor: c }}
        />
      ))}
    </div>
  );
}

function FaceChip({
  shape,
  active,
  onSelect,
  label,
}: {
  shape: (typeof FACE_SHAPES)[number];
  active: boolean;
  onSelect: (s: (typeof FACE_SHAPES)[number]) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(shape)}
      aria-pressed={active}
      className={`rounded-xl border-2 px-3 py-2 text-xs font-semibold transition-all ${
        active
          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
          : "border-gray-100 bg-white text-gray-500 hover:border-gray-200"
      }`}
    >
      {label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function TomodachiLifeMiiCreatorPage() {
  const t = useTranslations("TomodachiLifeMiiCreatorPage");
  const tMbti = useTranslations("TomodachiLifeMbtiPage");
  const locale = useLocale();

  const [appearance, setAppearance] = useState<MiiAppearance>(DEFAULT_APPEARANCE);
  const [sliders, setSliders] = useState<SliderValues>(DEFAULT_SLIDERS);
  const [name, setName] = useState("");

  /* Derived: predicted personality (recomputed on each slider change). */
  const prediction = useMemo(() => predictFull(sliders), [sliders]);

  /* Candidate names keyed off predicted group (deterministic per personality). */
  const nameSuggestions = useMemo(
    () => suggestNames(prediction.group, prediction.personality),
    [prediction]
  );

  /* i18n key helpers */
  const faceLabelKey = useCallback(
    (s: string) =>
      `face${s.charAt(0).toUpperCase()}${s.slice(1)}`,
    []
  );
  const hairLabelKey = useCallback(
    (s: string) =>
      `hair${s.charAt(0).toUpperCase()}${s.slice(1)}`,
    []
  );
  const personalitySubKey = useCallback(
    (p: string) => `personality${p.split("_")[1].charAt(0).toUpperCase()}${p.split("_")[1].slice(1)}`,
    []
  );
  const sliderLabelKey = useCallback((k: SliderKey) => `slider${k.charAt(0).toUpperCase()}${k.slice(1)}`, []);

  /* Actions */
  const handleRandomize = useCallback(() => {
    const r = randomMii();
    setAppearance(r.appearance);
    setSliders(r.sliders);
  }, []);

  const handleReset = useCallback(() => {
    setAppearance(DEFAULT_APPEARANCE);
    setSliders(DEFAULT_SLIDERS);
    setName("");
  }, []);

  const handleDownload = useCallback(() => {
    const json = exportMiiJson({
      appearance,
      sliders,
      name: name || undefined,
      personality: prediction.personality,
      mbti: prediction.mbti,
    });
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lifesimgrid-mii-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [appearance, sliders, name, prediction]);

  const handleShare = useCallback(() => {
    const payload = exportMiiJson({
      appearance,
      sliders,
      name: name || undefined,
      personality: prediction.personality,
      mbti: prediction.mbti,
    });
    navigator.clipboard?.writeText(payload).catch(() => {
      /* ignore */
    });
  }, [appearance, sliders, name, prediction]);

  /* JSON-LD: BreadcrumbList + WebApplication + FAQPage */
  const base = "https://lifesimgrid.org";
  const prefix = locale === "en" ? "" : `/${locale}`;
  const pageUrl = `${base}${prefix}/tomodachi-life-mii-creator`;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("navHome"), item: `${base}${prefix}` },
      { "@type": "ListItem", position: 2, name: "Tomodachi Life Tools", item: `${base}${prefix}/tomodachi-life-mbti` },
      { "@type": "ListItem", position: 3, name: t("pageTitle"), item: pageUrl },
    ],
  };
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Tomodachi Life Mii Creator & Planner",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: t("metaDesc"),
    url: pageUrl,
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: t("faq1Q"), acceptedAnswer: { "@type": "Answer", text: t("faq1A") } },
      { "@type": "Question", name: t("faq2Q"), acceptedAnswer: { "@type": "Answer", text: t("faq2A") } },
      { "@type": "Question", name: t("faq3Q"), acceptedAnswer: { "@type": "Answer", text: t("faq3A") } },
      { "@type": "Question", name: t("faq4Q"), acceptedAnswer: { "@type": "Answer", text: t("faq4A") } },
    ],
  };

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* JSON-LD blocks */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/<\/script/g, "<\\/script") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd).replace(/<\/script/g, "<\\/script") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/<\/script/g, "<\\/script") }}
        />

        {/* ===== HERO ===== */}
        <section id="mii-creator-hero" aria-labelledby="mii-creator-hero" className="mx-auto max-w-6xl px-4 pt-8 pb-4 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-100 bg-pink-50 px-4 py-1.5 text-xs font-medium text-pink-700">
            <Sparkles className="h-3.5 w-3.5" />
            {t("heroBadge")}
          </div>
          <h1 className="font-mono text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {t("heroTitle")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
            {t("heroSubtitle")}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-700">{t("heroTag1")}</span>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">{t("heroTag2")}</span>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">{t("heroTag3")}</span>
          </div>
          <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-gray-500">
            <Shield className="h-3.5 w-3.5" />
            {t("privacyBadge")}
          </div>
        </section>

        {/* ===== BUILDER CARD ===== */}
        <section aria-labelledby="mii-creator-builder" className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="mii-creator-builder" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
              {t("builderTitle")}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-gray-600">{t("builderDesc")}</p>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* ---- Left: SVG preview + identity ---- */}
              <div className="space-y-4">
                <div className="rounded-2xl border border-pink-100 bg-pink-50/40 p-4">
                  <MiiFacePreview appearance={appearance} />
                </div>

                {/* Name */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t("nameLabel")}
                  </label>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("namePlaceholder")}
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-pink-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => nameSuggestions[0] && setName(nameSuggestions[0])}
                      className="rounded-lg bg-pink-50 px-3 py-2 text-xs font-semibold text-pink-700 transition-all hover:bg-pink-100 active:scale-95"
                    >
                      <Dices className="mr-1 inline h-3.5 w-3.5" />
                      {t("randomName")}
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {nameSuggestions.map((n, i) => (
                      <button
                        key={`${n}-${i}`}
                        type="button"
                        onClick={() => setName(n)}
                        className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
                          name === n
                            ? "bg-pink-500 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personality result */}
                <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4 text-indigo-600" />
                    <h3 className="font-mono text-sm font-bold text-gray-900">{t("personalityResult")}</h3>
                  </div>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-lg bg-white px-3 py-1 font-mono text-sm font-bold text-indigo-700">
                      {prediction.mbti}
                    </span>
                    <span className="text-sm text-gray-600">
                      {t("personalityLabel")}{" "}
                      <strong className="font-semibold text-gray-900">
                        {tMbti(personalitySubKey(prediction.personality))}
                      </strong>
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-gray-500">{t("personalityHint")}</p>
                  <div className="mt-3">
                    <Link
                      href={`/tomodachi-life-personality/${prediction.personality.split("_")[1]}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      {t("seePersonalityPage")}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* ---- Right: appearance controls ---- */}
              <div className="space-y-4">
                {/* Gender */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t("genderLabel")}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["male", "female"] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setAppearance((a) => ({ ...a, gender: g }))}
                        aria-pressed={appearance.gender === g}
                        className={`rounded-xl border-2 px-3 py-2 text-sm font-semibold transition-all ${
                          appearance.gender === g
                            ? "border-pink-500 bg-pink-50 text-pink-700"
                            : "border-gray-100 bg-white text-gray-500 hover:border-gray-200"
                        }`}
                      >
                        {t(g === "male" ? "genderMale" : "genderFemale")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Face shape */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t("faceLabel")}
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {FACE_SHAPES.map((s) => (
                      <FaceChip
                        key={s}
                        shape={s}
                        active={appearance.faceShape === s}
                        onSelect={(v) => setAppearance((a) => ({ ...a, faceShape: v }))}
                        label={t(faceLabelKey(s))}
                      />
                    ))}
                  </div>
                </div>

                {/* Hair style */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t("hairStyleLabel")}
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {HAIR_STYLES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setAppearance((a) => ({ ...a, hairStyle: s }))}
                        aria-pressed={appearance.hairStyle === s}
                        className={`rounded-xl border-2 px-3 py-1.5 text-xs font-semibold transition-all ${
                          appearance.hairStyle === s
                            ? "border-pink-500 bg-pink-50 text-pink-700"
                            : "border-gray-100 bg-white text-gray-500 hover:border-gray-200"
                        }`}
                      >
                        {t(hairLabelKey(s))}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hair color */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t("hairColorLabel")}
                  </label>
                  <SwatchRow
                    swatches={HAIR_COLORS}
                    active={appearance.hairColor}
                    onSelect={(c) => setAppearance((a) => ({ ...a, hairColor: c }))}
                  />
                </div>

                {/* Skin tone */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t("skinLabel")}
                  </label>
                  <SwatchRow
                    swatches={SKIN_TONES}
                    active={appearance.skinTone}
                    onSelect={(c) => setAppearance((a) => ({ ...a, skinTone: c }))}
                  />
                </div>

                {/* Slider values (4 sliders) */}
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Sliders className="h-4 w-4 text-gray-500" />
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {t("slidersLabel")}
                    </label>
                  </div>
                  <div className="space-y-3">
                    {SLIDER_KEYS.map((k) => (
                      <div key={k}>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-600">
                            {t(sliderLabelKey(k))}
                          </span>
                          <span className="font-mono text-xs font-bold text-indigo-600">
                            {sliders[k]}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={sliders[k]}
                          onChange={(e) =>
                            setSliders((s) => ({ ...s, [k]: Number(e.target.value) }))
                          }
                          className="w-full accent-indigo-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <button
                    type="button"
                    onClick={handleRandomize}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-pink-500 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-pink-600 active:scale-95"
                  >
                    <Dices className="h-3.5 w-3.5" />
                    {t("randomBtn")}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-white border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 transition-all hover:bg-gray-50 active:scale-95"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    {t("resetBtn")}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-indigo-500 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-indigo-600 active:scale-95"
                  >
                    <Download className="h-3.5 w-3.5" />
                    {t("downloadBtn")}
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-white border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 transition-all hover:bg-gray-50 active:scale-95"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    {t("shareBtn")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section aria-labelledby="mii-creator-how" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="rounded-2xl bg-pink-50 p-4 sm:p-6">
            <h2 id="mii-creator-how" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
              {t("howTitle")}
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li className="leading-relaxed">{t("howStep1")}</li>
              <li className="leading-relaxed">{t("howStep2")}</li>
              <li className="leading-relaxed">{t("howStep3")}</li>
              <li className="leading-relaxed">{t("howStep4")}</li>
            </ol>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section aria-labelledby="mii-creator-faq" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="mii-creator-faq" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
              {t("faqTitle")}
            </h2>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <details key={i} className="group rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
                  <summary className="flex cursor-pointer items-center justify-between p-3 sm:p-4 hover:bg-gray-100 transition-colors">
                    <h4 className="pr-4 text-sm font-semibold text-gray-800">{t(`faq${i}Q`)}</h4>
                    <ArrowRight className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {t(`faq${i}A`)}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Disclaimer ===== */}
        <section className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
          <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
              <div>
                <h3 className="mb-1 text-sm font-bold text-amber-800">{t("disclaimerTitle")}</h3>
                <p className="text-xs leading-relaxed text-amber-700">{t("modelDisclaimer")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Related tools ===== */}
        <section aria-labelledby="mii-creator-cta" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="mii-creator-cta" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
              {t("ctaTitle")}
            </h2>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/tomodachi-life-mbti" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
                <Users className="h-5 w-5 text-indigo-500" />
                <span className="text-sm font-medium text-gray-900">{t("ctaChart")}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
              </Link>
              <Link href="/mii-eyes" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
                <Palette className="h-5 w-5 text-pink-500" />
                <span className="text-sm font-medium text-gray-900">{t("ctaEyes")}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
              </Link>
              <Link href="/tomodachi-life-compatibility" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
                <Heart className="h-5 w-5 text-red-400" />
                <span className="text-sm font-medium text-gray-900">{t("ctaCompat")}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
              </Link>
              <Link href="/tomodachi-character-ideas" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
                <User className="h-5 w-5 text-teal-500" />
                <span className="text-sm font-medium text-gray-900">{t("ctaIdeas")}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
