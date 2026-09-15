"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useMemo } from "react";
import {
  Shield, ArrowRight, Heart, Users, Sparkles, Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import {
  PERSONALITIES,
  ZODIAC_ORDER,
  getMbtiCode,
  getPersonalityGroup,
  type Zodiac,
} from "@/lib/types";
import {
  getGroupColor,
  getPersonalityLabelKey,
} from "@/lib/personality-data";
import {
  calculateCompatibility,
  type CompatibilityResult,
} from "@/lib/compatibility";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Zodiac label i18n key (reuses the shared nested zodiac label set in VoiceLab). */
function zodiacLabelKey(z: Zodiac): string {
  return `zodiacs.${z}`;
}

/** Builds the 16 personality display rows with localized label + MBTI code. */
function buildPersonalityOptions(t: ReturnType<typeof useTranslations>) {
  return PERSONALITIES.map((p) => ({
    key: p,
    label: t(getPersonalityLabelKey(p)),
    mbti: getMbtiCode(p),
    color: getGroupColor(getPersonalityGroup(p)),
  }));
}

/** Builds the 12 zodiac option rows with localized labels. */
function buildZodiacOptions(t: ReturnType<typeof useTranslations>) {
  return ZODIAC_ORDER.map((z) => ({
    key: z,
    label: t(zodiacLabelKey(z)),
  }));
}

/** Fan-made model comment bands (reuse the VoiceLab comment namespace). */
function getComment(t: ReturnType<typeof useTranslations>, band: "high" | "medium" | "low", type: "love" | "friend"): string {
  const key = type === "love" ? "loveComments" : "friendComments";
  return t(`${key}.${band}`);
}

function bandOf(score: number): "high" | "medium" | "low" {
  if (score >= 70) return "high";
  if (score >= 40) return "medium";
  return "low";
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function TomodachiCompatibilityPage() {
  const t = useTranslations("TomodachiCompatibilityPage");
  const tMbti = useTranslations("TomodachiLifeMbtiPage");
  const tVoice = useTranslations("VoiceLab");
  const locale = useLocale();

  const [zodiacA, setZodiacA] = useState<Zodiac>("aries");
  const [personalityA, setPersonalityA] = useState<string>("outgoing_leader");
  const [zodiacB, setZodiacB] = useState<Zodiac>("taurus");
  const [personalityB, setPersonalityB] = useState<string>("easygoing_buddy");
  const [result, setResult] = useState<CompatibilityResult | null>(null);

  const personalityOptions = useMemo(() => buildPersonalityOptions(tMbti), [tMbti]);
  const zodiacOptions = useMemo(() => buildZodiacOptions(tVoice), [tVoice]);

  function handleCalculate() {
    setResult(calculateCompatibility(zodiacA, zodiacB, personalityA, personalityB));
  }

  /* JSON-LD: BreadcrumbList + WebApplication + FAQPage (3 blocks) */
  const base = "https://lifesimgrid.org";
  const prefix = locale === "en" ? "" : `/${locale}`;
  const url = `${base}${prefix}/tomodachi-life-compatibility`;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("navHome"), item: `${base}${prefix}` },
      { "@type": "ListItem", position: 2, name: "Tomodachi Life Tools", item: `${base}${prefix}/tomodachi-life-mbti` },
      { "@type": "ListItem", position: 3, name: t("pageTitle"), item: url },
    ],
  };
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Tomodachi Life Compatibility Calculator",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: t("metaDesc"),
    url,
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

        {/* Hero */}
        <section aria-labelledby="compat-hero-title" className="mx-auto max-w-6xl px-4 pt-10 pb-6 text-center">
          <nav aria-label="Breadcrumb" className="mb-3 flex justify-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-gray-600 transition-colors">{t("navHome")}</Link>
            <span>/</span>
            <span className="text-gray-600">{t("navCompat")}</span>
          </nav>
          <h1 id="compat-hero-title" className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            {t("pageTitle")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed">
            {t("subtitle")}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-100">
              <Shield className="h-3.5 w-3.5" /> {t("privacyBadge")}
            </span>
          </div>
        </section>

        {/* Calculator */}
        <section aria-labelledby="compat-calc-title" className="mx-auto max-w-3xl px-4 py-6">
          <h2 id="compat-calc-title" className="sr-only">{t("calcTitle")}</h2>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-md">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Character A */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 sm:p-4">
                <p className="mb-3 font-mono text-sm font-bold text-gray-800">{t("charA")}</p>
                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">{t("zodiacLabel")}</label>
                    <select
                      value={zodiacA}
                      onChange={(e) => setZodiacA(e.target.value as Zodiac)}
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-island-blue"
                    >
                      {zodiacOptions.map((z) => (
                        <option key={z.key} value={z.key}>{z.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">{t("personalityLabel")}</label>
                    <select
                      value={personalityA}
                      onChange={(e) => setPersonalityA(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-island-blue"
                    >
                      {personalityOptions.map((p) => (
                        <option key={p.key} value={p.key}>{p.label} ({p.mbti})</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {/* Character B */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 sm:p-4">
                <p className="mb-3 font-mono text-sm font-bold text-gray-800">{t("charB")}</p>
                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">{t("zodiacLabel")}</label>
                    <select
                      value={zodiacB}
                      onChange={(e) => setZodiacB(e.target.value as Zodiac)}
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-island-blue"
                    >
                      {zodiacOptions.map((z) => (
                        <option key={z.key} value={z.key}>{z.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">{t("personalityLabel")}</label>
                    <select
                      value={personalityB}
                      onChange={(e) => setPersonalityB(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-island-blue"
                    >
                      {personalityOptions.map((p) => (
                        <option key={p.key} value={p.key}>{p.label} ({p.mbti})</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <button
                onClick={handleCalculate}
                className="inline-flex items-center gap-2 rounded-2xl bg-sunshine px-8 py-3 font-mono text-base font-bold text-gray-900 shadow-sm transition-all hover:shadow-md active:scale-95"
              >
                <Sparkles className="h-5 w-5" />
                {t("calcBtn")}
              </button>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-6 space-y-4">
                {/* Romance score */}
                <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                      <Heart className="h-4 w-4 text-pink-500" /> {t("romanceLabel")}
                    </span>
                    <span className="font-mono text-2xl font-bold text-pink-500">{result.romance}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full rounded-full bg-gradient-to-r from-pink-400 to-pink-500 transition-all duration-700" style={{ width: `${result.romance}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">{getComment(tVoice, bandOf(result.romance), "love")}</p>
                </div>

                {/* Friendship score */}
                <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                      <Users className="h-4 w-4 text-island-blue" /> {t("friendshipLabel")}
                    </span>
                    <span className="font-mono text-2xl font-bold text-island-blue">{result.friendship}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-700" style={{ width: `${result.friendship}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">{getComment(tVoice, bandOf(result.friendship), "friend")}</p>
                </div>

                {/* Breakdown */}
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <h3 className="mb-2 text-sm font-semibold text-gray-700">{t("breakdownTitle")}</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-lg bg-white p-3 shadow-sm">
                      <div className="text-gray-500">{t("zodiacContribution")}</div>
                      <div className="mt-1 font-mono text-lg font-bold text-amber-600">{result.romanceBreakdown.zodiac}%</div>
                    </div>
                    <div className="rounded-lg bg-white p-3 shadow-sm">
                      <div className="text-gray-500">{t("personalityContribution")}</div>
                      <div className="mt-1 font-mono text-lg font-bold text-blue-600">{result.romanceBreakdown.personality}%</div>
                    </div>
                  </div>
                </div>

                {/* Model disclaimer */}
                <div className="rounded-xl border border-amber-100 bg-amber-50 p-3 text-xs text-amber-800">
                  <p className="flex items-start gap-2">
                    <Shield className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>{t("modelDisclaimer")}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* How It Works */}
        <section aria-labelledby="compat-how-title" className="mx-auto max-w-3xl px-4 py-6">
          <h2 id="compat-how-title" className="mb-4 text-xl sm:text-2xl font-bold text-gray-900">{t("howTitle")}</h2>
          <ol className="space-y-3">
            <li className="flex gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-sunshine font-mono text-sm font-bold text-gray-900">1</span>
              <p className="text-sm text-gray-600">{t("howStep1")}</p>
            </li>
            <li className="flex gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-sunshine font-mono text-sm font-bold text-gray-900">2</span>
              <p className="text-sm text-gray-600">{t("howStep2")}</p>
            </li>
            <li className="flex gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-sunshine font-mono text-sm font-bold text-gray-900">3</span>
              <p className="text-sm text-gray-600">{t("howStep3")}</p>
            </li>
          </ol>
        </section>

        {/* FAQ (native details/summary for Google crawlability) */}
        <section aria-labelledby="compat-faq-title" className="mx-auto max-w-3xl px-4 py-6">
          <h2 id="compat-faq-title" className="mb-4 text-xl sm:text-2xl font-bold text-gray-900">{t("faqTitle")}</h2>
          <div className="space-y-3">
            <details className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-semibold text-gray-900">{t("faq1Q")}</summary>
              <p className="mt-2 text-sm text-gray-600">{t("faq1A")}</p>
            </details>
            <details className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-semibold text-gray-900">{t("faq2Q")}</summary>
              <p className="mt-2 text-sm text-gray-600">{t("faq2A")}</p>
            </details>
            <details className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-semibold text-gray-900">{t("faq3Q")}</summary>
              <p className="mt-2 text-sm text-gray-600">{t("faq3A")}</p>
            </details>
            <details className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-semibold text-gray-900">{t("faq4Q")}</summary>
              <p className="mt-2 text-sm text-gray-600">{t("faq4A")}</p>
            </details>
          </div>
        </section>

        {/* CTA to related tools */}
        <section aria-labelledby="compat-cta-title" className="mx-auto max-w-3xl px-4 py-6">
          <h2 id="compat-cta-title" className="mb-4 text-xl sm:text-2xl font-bold text-gray-900">{t("ctaTitle")}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/tomodachi-life-personality-chart" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
              <Star className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-medium text-gray-900">{t("ctaChart")}</span>
              <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
            </Link>
            <Link href="/tomodachi-life-mbti" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
              <Heart className="h-5 w-5 text-red-400" />
              <span className="text-sm font-medium text-gray-900">{t("ctaMbti")}</span>
              <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
            </Link>
            <Link href="/tomodachi-life-personality-calculator" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium text-gray-900">{t("ctaCalculator")}</span>
              <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
            </Link>
            <Link href="/tomodachi-island-planner" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
              <Users className="h-5 w-5 text-teal-500" />
              <span className="text-sm font-medium text-gray-900">{t("ctaPlanner")}</span>
              <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
