"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import {
  Ruler, Users, Sparkles, Heart, Shield, ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import {
  MII_HEIGHT_STEPS,
  MII_AGES,
  MII_HEIGHT_CM,
  estimateMiiHeight,
  heightComparisonStep,
  type MiiHeightStep,
  type MiiAge,
} from "@/lib/height-data";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Step i18n key (community-estimate label). */
function stepLabelKey(s: MiiHeightStep): string {
  return `step${s.charAt(0).toUpperCase()}${s.slice(1)}`;
}

/** Age i18n key. */
function ageLabelKey(a: MiiAge): string {
  return `age${a.charAt(0).toUpperCase()}${a.slice(1)}`;
}

/** Gender i18n key. */
function genderKey(g: "male" | "female"): string {
  return g === "male" ? "genderMale" : "genderFemale";
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function TomodachiMiiHeightChartPage() {
  const t = useTranslations("TomodachiMiiHeightChartPage");
  const locale = useLocale();

  const [step, setStep] = useState<MiiHeightStep>("medium");
  const [age, setAge] = useState<MiiAge>("adult");
  const [gender, setGender] = useState<"male" | "female">("male");

  const estimate = estimateMiiHeight(step, age);
  const comparison = heightComparisonStep(step, gender);

  /* JSON-LD: BreadcrumbList + WebApplication + FAQPage (3 blocks) */
  const base = "https://lifesimgrid.org";
  const prefix = locale === "en" ? "" : `/${locale}`;
  const pageUrl = `${base}${prefix}/tomodachi-life-mii-height-chart`;
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
    name: "Mii Height Chart & Calculator",
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
        <section aria-labelledby="mii-height-hero-title" className="mx-auto max-w-6xl px-4 pt-10 pb-6 text-center">
          <nav aria-label="Breadcrumb" className="mb-3 flex justify-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-gray-600 transition-colors">{t("navHome")}</Link>
            <span>/</span>
            <span className="text-gray-600">{t("navHeight")}</span>
          </nav>
          <h1 id="mii-height-hero-title" className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
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
        <section aria-labelledby="mii-height-calc-title" className="mx-auto max-w-3xl px-4 py-6">
          <h2 id="mii-height-calc-title" className="sr-only">{t("calcTitle")}</h2>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-md">
            {/* Step selector */}
            <div className="mb-5">
              <label className="mb-2 block text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("stepLabel")}</label>
              <div className="grid grid-cols-3 gap-2">
                {MII_HEIGHT_STEPS.map((s) => {
                  const active = s === step;
                  const cm = MII_HEIGHT_CM[s];
                  return (
                    <button
                      key={s}
                      onClick={() => setStep(s)}
                      aria-pressed={active}
                      className={`rounded-xl border-2 p-3 text-center transition-all ${
                        active
                          ? "border-island-blue bg-blue-50"
                          : "border-gray-100 bg-gray-50 hover:border-gray-200"
                      }`}
                    >
                      <div className={`text-sm font-bold ${active ? "text-island-blue" : "text-gray-700"}`}>
                        {t(stepLabelKey(s))}
                      </div>
                      <div className="mt-1 font-mono text-xs text-gray-500">≈ {cm} cm</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Age selector */}
            <div className="mb-5">
              <label className="mb-2 block text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("ageLabel")}</label>
              <div className="grid grid-cols-3 gap-2">
                {MII_AGES.map((a) => {
                  const active = a === age;
                  return (
                    <button
                      key={a}
                      onClick={() => setAge(a)}
                      aria-pressed={active}
                      className={`rounded-xl border-2 p-3 text-center transition-all ${
                        active
                          ? "border-sunshine bg-amber-50"
                          : "border-gray-100 bg-gray-50 hover:border-gray-200"
                      }`}
                    >
                      <div className={`text-sm font-bold ${active ? "text-amber-700" : "text-gray-700"}`}>
                        {t(ageLabelKey(a))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Gender toggle (drives the real-world comparison reference) */}
            <div className="mb-5">
              <label className="mb-2 block text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("genderLabel")}</label>
              <div className="grid grid-cols-2 gap-2">
                {(["male", "female"] as const).map((g) => {
                  const active = g === gender;
                  return (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      aria-pressed={active}
                      className={`rounded-xl border-2 p-2 text-center transition-all ${
                        active
                          ? "border-island-blue bg-blue-50"
                          : "border-gray-100 bg-gray-50 hover:border-gray-200"
                      }`}
                    >
                      <div className={`text-sm font-bold ${active ? "text-island-blue" : "text-gray-700"}`}>
                        {t(g === "male" ? "genderMale" : "genderFemale")}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Result */}
            <div className="rounded-xl border border-gray-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 shadow-sm">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs text-gray-500 mb-1">{t("resultLabel")}</div>
                  <div className="font-mono text-4xl font-bold text-island-blue">{estimate.cm}<span className="text-lg text-gray-500"> cm</span></div>
                  <div className="mt-1 font-mono text-sm text-gray-600">
                    {estimate.ft}′ {estimate.inch}″
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1">{t("referenceLabel")}</div>
                  <div className="font-mono text-2xl font-bold text-gray-700">{comparison.reference} cm</div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Ruler className="h-4 w-4 text-island-blue" />
                <span className={`text-sm font-semibold ${comparison.delta >= 0 ? "text-green-600" : "text-amber-600"}`}>
                  {comparison.delta >= 0 ? "+" : ""}{comparison.delta} cm {t("deltaVs")} {t(genderKey(gender))}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Chart */}
        <section aria-labelledby="mii-height-compare-title" className="mx-auto max-w-3xl px-4 py-6">
          <h2 id="mii-height-compare-title" className="mb-4 text-xl sm:text-2xl font-bold text-gray-900">{t("compareTitle")}</h2>
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-x-2 border-b border-gray-100 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <span className="pr-2">{t("stepLabel")}</span>
              <span>≈ {t("cmCol")}</span>
              <span>{t("ftInCol")}</span>
              <span>{t("deltaCol")}</span>
            </div>
            {MII_HEIGHT_STEPS.map((s) => {
              const { cm, ft, inch } = estimateMiiHeight(s, "adult");
              const c = heightComparisonStep(s, gender);
              return (
                <div key={s} className={`grid grid-cols-[auto_1fr_1fr_1fr] gap-x-2 px-4 py-3 text-sm ${s === step ? "bg-blue-50" : "odd:bg-white even:bg-gray-50"}`}>
                  <span className="pr-2 font-semibold text-gray-900">{t(stepLabelKey(s))}</span>
                  <span className="font-mono text-gray-700">{cm} cm</span>
                  <span className="font-mono text-gray-700">{ft}′ {inch}″</span>
                  <span className={`font-mono ${c.delta >= 0 ? "text-green-600" : "text-amber-600"}`}>
                    {c.delta >= 0 ? "+" : ""}{c.delta} cm
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-gray-500">{t("genderNote")}</p>
        </section>

        {/* Age Reference Chart */}
        <section aria-labelledby="mii-height-age-title" className="mx-auto max-w-3xl px-4 py-6">
          <h2 id="mii-height-age-title" className="mb-4 text-xl sm:text-2xl font-bold text-gray-900">{t("ageChartTitle")}</h2>
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="grid grid-cols-[auto_1fr_1fr] gap-x-2 border-b border-gray-100 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <span className="pr-2">{t("ageLabel")}</span>
              <span>{t("modifierCol")}</span>
              <span>{t("noteCol")}</span>
            </div>
            {MII_AGES.map((a) => {
              const mod = a === "adult" ? 0 : a === "child" ? -6 : -3;
              const modText = mod === 0 ? "±0 cm" : mod > 0 ? `+${mod} cm` : `${mod} cm`;
              return (
                <div key={a} className={`grid grid-cols-[auto_1fr_1fr] gap-x-2 px-4 py-3 text-sm ${a === age ? "bg-amber-50" : "odd:bg-white even:bg-gray-50"}`}>
                  <span className="pr-2 font-semibold text-gray-900">{t(ageLabelKey(a))}</span>
                  <span className="font-mono text-gray-700">{modText}</span>
                  <span className="text-xs text-gray-500">
                    {a === "child" ? t("ageNoteChild") : a === "adult" ? t("ageNoteAdult") : t("ageNoteSenior")}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* How It Works */}
        <section aria-labelledby="mii-height-how-title" className="mx-auto max-w-3xl px-4 py-6">
          <h2 id="mii-height-how-title" className="mb-4 text-xl sm:text-2xl font-bold text-gray-900">{t("howTitle")}</h2>
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

        {/* FAQ */}
        <section aria-labelledby="mii-height-faq-title" className="mx-auto max-w-3xl px-4 py-6">
          <h2 id="mii-height-faq-title" className="mb-4 text-xl sm:text-2xl font-bold text-gray-900">{t("faqTitle")}</h2>
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

        {/* Model disclaimer */}
        <section aria-labelledby="mii-height-disclaimer-title" className="mx-auto max-w-3xl px-4 py-4">
          <h2 id="mii-height-disclaimer-title" className="sr-only">{t("disclaimerTitle")}</h2>
          <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 text-xs text-amber-800">
            <p className="flex items-start gap-2">
              <Shield className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{t("modelDisclaimer")}</span>
            </p>
          </div>
        </section>

        {/* CTA */}
        <section aria-labelledby="mii-height-cta-title" className="mx-auto max-w-3xl px-4 py-6">
          <h2 id="mii-height-cta-title" className="mb-4 text-xl sm:text-2xl font-bold text-gray-900">{t("ctaTitle")}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/tomodachi-life-mbti" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
              <Users className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-medium text-gray-900">{t("ctaMbti")}</span>
              <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
            </Link>
            <Link href="/tomodachi-life-personality-chart" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium text-gray-900">{t("ctaChart")}</span>
              <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
            </Link>
            <Link href="/tomodachi-life-compatibility" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
              <Heart className="h-5 w-5 text-red-400" />
              <span className="text-sm font-medium text-gray-900">{t("ctaCompat")}</span>
              <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
            </Link>
            <Link href="/tomodachi-character-ideas" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
              <Ruler className="h-5 w-5 text-teal-500" />
              <span className="text-sm font-medium text-gray-900">{t("ctaIdeas")}</span>
              <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
