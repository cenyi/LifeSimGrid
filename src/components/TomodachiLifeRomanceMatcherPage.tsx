"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useMemo, useCallback } from "react";
import {
  Heart, Share2, RotateCcw, Users, Sparkles,
  Shield, ArrowRight, Calendar, Lightbulb,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import {
  PERSONALITIES,
  ZODIAC_ORDER,
  getPersonalityGroup,
  getMbtiCode,
  type Zodiac,
} from "@/lib/types";
import { getGroupColor, getPersonalityLabelKey } from "@/lib/personality-data";
import { calculateCompatibility } from "@/lib/compatibility";
import {
  buildPairingMatrix,
  topRomancePairings,
  groupHighlights,
  recommendedDate,
  romanceBand,
  romanceCommentKey,
  dayNameKey,
} from "@/lib/romance-data";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function TomodachiLifeRomanceMatcherPage() {
  const t = useTranslations("TomodachiLifeRomanceMatcherPage");
  const tMbti = useTranslations("TomodachiLifeMbtiPage");
  const tVoice = useTranslations("VoiceLab");
  const locale = useLocale();

  const [zodiacA, setZodiacA] = useState<Zodiac>("aries");
  const [zodiacB, setZodiacB] = useState<Zodiac>("taurus");
  const [personalityA, setPersonalityA] = useState("outgoing_leader");
  const [personalityB, setPersonalityB] = useState("easygoing_buddy");
  const [showMatrix, setShowMatrix] = useState(false);

  const result = useMemo(
    () => calculateCompatibility(zodiacA, zodiacB, personalityA, personalityB),
    [zodiacA, zodiacB, personalityA, personalityB]
  );

  const date = useMemo(
    () => recommendedDate(zodiacA, zodiacB, personalityA, personalityB),
    [zodiacA, zodiacB, personalityA, personalityB]
  );

  const cells = useMemo(() => buildPairingMatrix(), []);
  const topPairs = useMemo(() => topRomancePairings(cells, 12), [cells]);
  const highlights = useMemo(() => groupHighlights(cells), [cells]);

  const band = romanceBand(result.romance);
  const bandColor =
    band === "high" ? "text-green-600" : band === "medium" ? "text-amber-600" : "text-red-500";
  const bandBar =
    band === "high" ? "bg-green-500" : band === "medium" ? "bg-amber-500" : "bg-red-400";

  const personalityOptions = useMemo(
    () =>
      PERSONALITIES.map((p) => ({
        key: p,
        label: tMbti(getPersonalityLabelKey(p) as string),
        mbti: getMbtiCode(p),
        color: getGroupColor(getPersonalityGroup(p)),
      })),
    [tMbti]
  );

  const zodiacOptions = useMemo(
    () => ZODIAC_ORDER.map((z) => ({ key: z, label: tVoice(`zodiacs.${z}` as "zodiacs.aries") })),
    [tVoice]
  );

  const reset = useCallback(() => {
    setZodiacA("aries");
    setZodiacB("taurus");
    setPersonalityA("outgoing_leader");
    setPersonalityB("easygoing_buddy");
    setShowMatrix(false);
  }, []);

  const share = useCallback(() => {
    const text = `Tomodachi Life romance match: ${getMbtiCode(personalityA)} x ${getMbtiCode(personalityB)} = ${result.romance}% romance. Best day: ${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][date]}. https://lifesimgrid.org/tomodachi-life-romance-matcher`;
    navigator.clipboard?.writeText(text).catch(() => {});
  }, [personalityA, personalityB, result.romance, date]);

  /* JSON-LD */
  const base = "https://lifesimgrid.org";
  const prefix = locale === "en" ? "" : `/${locale}`;
  const pageUrl = `${base}${prefix}/tomodachi-life-romance-matcher`;
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
    name: "Tomodachi Life Romance Matcher",
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

  /* Group → i18n key helper */
  const groupLabelKey = (g: string) => `group${g.charAt(0).toUpperCase()}${g.slice(1)}`;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/<\/script/g, "<\\/script") }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd).replace(/<\/script/g, "<\\/script") }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/<\/script/g, "<\\/script") }} />

        {/* HERO */}
        <section aria-labelledby="romance-hero" className="mx-auto max-w-6xl px-4 pt-8 pb-4 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-1.5 text-xs font-medium text-red-700">
            <Heart className="h-3.5 w-3.5" />
            {t("heroBadge")}
          </div>
          <h1 id="romance-hero" className="font-mono text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {t("heroTitle")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
            {t("heroSubtitle")}
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-gray-500">
            <Shield className="h-3.5 w-3.5" />
            {t("privacyBadge")}
          </div>
        </section>

        {/* MATCHER */}
        <section aria-labelledby="romance-matcher" className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="romance-matcher" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
              {t("matcherTitle")}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-gray-600">{t("matcherDesc")}</p>

            {/* Two character inputs */}
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { label: t("charALabel"), zodiac: zodiacA, setZodiac: setZodiacA, pers: personalityA, setPers: setPersonalityA, slot: "A" },
                { label: t("charBLabel"), zodiac: zodiacB, setZodiac: setZodiacB, pers: personalityB, setPers: setPersonalityB, slot: "B" },
              ].map((c) => (
                <div key={c.slot} className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4">
                  <h3 className="mb-3 font-mono text-sm font-bold text-gray-800">{c.label}</h3>

                  <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t("zodiacLabel")}
                  </label>
                  <select
                    value={c.zodiac}
                    onChange={(e) => c.setZodiac(e.target.value as Zodiac)}
                    className="mb-3 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
                  >
                    {zodiacOptions.map((z) => (
                      <option key={z.key} value={z.key}>{z.label}</option>
                    ))}
                  </select>

                  <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t("personalityLabel")}
                  </label>
                  <select
                    value={c.pers}
                    onChange={(e) => c.setPers(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
                  >
                    {personalityOptions.map((p) => (
                      <option key={p.key} value={p.key}>
                        {p.label} ({p.mbti})
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Result card */}
            <div className="mt-6 rounded-2xl border-2 p-5 sm:p-6" style={{ borderColor: band === "high" ? "#22c55e" : band === "medium" ? "#f59e0b" : "#ef4444" }}>
              <div className="mb-3 flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                <h3 className="font-mono text-lg font-bold text-gray-900">{t("romanceScoreTitle")}</h3>
              </div>

              <div className="mb-4 flex items-end gap-3">
                <span className={`font-mono text-5xl font-extrabold ${bandColor}`}>{result.romance}%</span>
                <span className="text-sm font-medium text-gray-500">{t("romanceOf100")}</span>
              </div>

              {/* Progress bar */}
              <div className="mb-4 h-3 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full ${bandBar} transition-all duration-500`}
                  style={{ width: `${result.romance}%` }}
                />
              </div>

              {/* Breakdown */}
              <div className="mb-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
                <div className="rounded-lg bg-gray-50 p-2">
                  <p className="font-semibold text-gray-500">{t("zodiacScore")}</p>
                  <p className="font-mono text-base font-bold text-gray-800">{result.zodiacScore}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-2">
                  <p className="font-semibold text-gray-500">{t("romanceBreakdownLabel")}</p>
                  <p className="font-mono text-base font-bold text-gray-800">{result.romanceBreakdown.zodiac}+{result.romanceBreakdown.personality}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-2">
                  <p className="font-semibold text-gray-500">{t("friendshipScore")}</p>
                  <p className="font-mono text-base font-bold text-gray-800">{result.friendship}%</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-2">
                  <p className="font-semibold text-gray-500">{t("modelLabel")}</p>
                  <p className="font-mono text-base font-bold text-gray-800">fan-made</p>
                </div>
              </div>

              {/* Commentary */}
              <div className="mb-4 flex items-start gap-3">
                <span className={`mt-0.5 rounded-full px-3 py-1 text-xs font-bold ${
                  band === "high" ? "bg-green-100 text-green-700" : band === "medium" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-600"
                }`}>
                  {t(band === "high" ? "bandHigh" : band === "medium" ? "bandMedium" : "bandLow")}
                </span>
                <p className="text-sm leading-relaxed text-gray-600">
                  {t(romanceCommentKey(band))}
                </p>
              </div>

              {/* Best day */}
              <div className="mb-4 flex items-center gap-3 rounded-xl bg-pink-50 p-3">
                <Calendar className="h-5 w-5 text-pink-600" />
                <div>
                  <p className="text-xs font-semibold text-pink-700 uppercase tracking-wide">{t("bestDayLabel")}</p>
                  <p className="text-sm font-bold text-pink-900">
                    {t(dayNameKey(date) as "daySun")}
                  </p>
                </div>
              </div>

              {/* Personality summary */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {tMbti(getPersonalityLabelKey(personalityA) as string)}
                <span className="text-xs font-bold text-gray-400">×</span>
                {tMbti(getPersonalityLabelKey(personalityB) as string)}
                <span className="text-xs font-medium text-gray-500">
                  ({tMbti(groupLabelKey(getPersonalityGroup(personalityA)) as string)} × {tMbti(groupLabelKey(getPersonalityGroup(personalityB)) as string)})
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition-all hover:bg-gray-50 active:scale-95"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  {t("resetBtn")}
                </button>
                <button
                  type="button"
                  onClick={share}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-red-600 active:scale-95"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  {t("shareBtn")}
                </button>
                <button
                  type="button"
                  onClick={() => setShowMatrix((s) => !s)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition-all hover:bg-gray-50 active:scale-95"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {showMatrix ? t("hideMatrixBtn") : t("showMatrixBtn")}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* BEST-COUPLE EXPLORER */}
        {showMatrix && (
          <section aria-labelledby="romance-matrix" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
              <h2 id="romance-matrix" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
                {t("matrixTitle")}
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">{t("matrixDesc")}</p>

              {/* Top 12 pairings */}
              <h3 className="mb-3 font-mono text-sm font-bold text-gray-800">{t("topPairingsLabel")}</h3>
              <div className="mb-6 space-y-2">
                {topPairs.map((c, i) => {
                  const labelA = c.a === c.b
                    ? tMbti(getPersonalityLabelKey(c.a) as string)
                    : `${tMbti(getPersonalityLabelKey(c.a) as string)} × ${tMbti(getPersonalityLabelKey(c.b) as string)}`;
                  return (
                    <div key={i} className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-2.5">
                      <span className="w-6 text-center font-mono text-xs font-bold text-gray-400">{i + 1}.</span>
                      <span className="flex-1 text-sm font-medium text-gray-800">{labelA}</span>
                      <span className={`font-mono text-sm font-bold ${
                        c.romance >= 70 ? "text-green-600" : c.romance >= 40 ? "text-amber-600" : "text-red-500"
                      }`}>
                        {c.romance}%
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Group highlights */}
              <h3 className="mb-3 font-mono text-sm font-bold text-gray-800">{t("groupHighlightsLabel")}</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {highlights.map((h) => {
                  const pairingLabel = h.pairing.a === h.pairing.b
                    ? tMbti(getPersonalityLabelKey(h.pairing.a) as string)
                    : `${tMbti(getPersonalityLabelKey(h.pairing.a) as string)} × ${tMbti(getPersonalityLabelKey(h.pairing.b) as string)}`;
                  return (
                    <div key={h.group} className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                      <div className="mb-2 flex items-center gap-2">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: getGroupColor(h.group) }}
                        />
                        <span className="text-xs font-bold text-gray-700">
                          {tMbti(groupLabelKey(h.group) as string)}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-gray-600">{pairingLabel}</p>
                      <p className="mt-1 font-mono text-sm font-bold" style={{ color: getGroupColor(h.group) }}>
                        {h.pairing.romance}%
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* HOW IT WORKS */}
        <section aria-labelledby="romance-how" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="rounded-2xl bg-red-50 p-4 sm:p-6">
            <h2 id="romance-how" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
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

        {/* FAQ */}
        <section aria-labelledby="romance-faq" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="romance-faq" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
              {t("faqTitle")}
            </h2>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <details key={i} className="group rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
                  <summary className="flex cursor-pointer items-center justify-between p-3 sm:p-4 hover:bg-gray-100 transition-colors">
                    <h4 className="pr-4 text-sm font-semibold text-gray-800">{t(`faq${i}Q` as "faq1Q")}</h4>
                    <ArrowRight className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {t(`faq${i}A` as "faq1A")}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* DISCLAIMER */}
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

        {/* CTA */}
        <section aria-labelledby="romance-cta" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="romance-cta" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
              {t("ctaTitle")}
            </h2>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/tomodachi-life-compatibility" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
                <Users className="h-5 w-5 text-indigo-500" />
                <span className="text-sm font-medium text-gray-900">{t("ctaCompat")}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
              </Link>
              <Link href="/tomodachi-life-mbti" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
                <Lightbulb className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium text-gray-900">{t("ctaMbti")}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
              </Link>
              <Link href="/tomodachi-life-personality-chart" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
                <Heart className="h-5 w-5 text-red-400" />
                <span className="text-sm font-medium text-gray-900">{t("ctaChart")}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
              </Link>
              <Link href="/tomodachi-character-ideas" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
                <Sparkles className="h-5 w-5 text-amber-500" />
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
