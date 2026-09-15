"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useMemo, useCallback } from "react";
import {
  Shield, ArrowRight, Share2, Search, Globe,
  Sparkles, Lightbulb, Languages, Download,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import {
  REGIONS,
  REGION_LABELS,
  REGION_CODES,
  REGION_SCRIPTS,
  REGION_NOTES,
  NAME_GROUPS,
  translate,
  generateNames,
  searchName,
  type Region,
  type TranslatedName,
} from "@/lib/regional-translator-data";

export default function TomodachiLifeRegionalTranslatorPage() {
  const t = useTranslations("TomodachiLifeRegionalTranslatorPage");
  const locale = useLocale();

  const [input, setInput] = useState("");
  const [fromRegion, setFromRegion] = useState<Region>("jp");
  const [result, setResult] = useState<TranslatedName | null>(null);
  const [searchAll, setSearchAll] = useState< { region: Region; match: TranslatedName }[]>([]);
  const [genRegion, setGenRegion] = useState<Region>("jp");
  const [genCount, setGenCount] = useState(5);
  const [generated, setGenerated] = useState<string[]>([]);

  const doTranslate = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) {
      setResult(null);
      setSearchAll([]);
      return;
    }
    const tResult = translate(trimmed, fromRegion);
    setResult(tResult);
    setSearchAll(tResult ? [] : searchName(trimmed));
  }, [input, fromRegion]);

  const doGenerate = useCallback(() => {
    setGenerated(generateNames(genRegion, genCount));
  }, [genRegion, genCount]);

  const regionOptions = useMemo(
    () => REGIONS.map((r) => ({ region: r, label: REGION_LABELS[r], script: REGION_SCRIPTS[r] })),
    []
  );

  /* JSON-LD */
  const base = "https://lifesimgrid.org";
  const prefix = locale === "en" ? "" : `/${locale}`;
  const pageUrl = `${base}${prefix}/tomodachi-life-regional-translator`;
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
    name: "Tomodachi Life Regional Name Translator",
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
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/<\/script/g, "<\\/script") }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd).replace(/<\/script/g, "<\\/script") }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/<\/script/g, "<\\/script") }} />

        {/* HERO */}
        <section aria-labelledby="trans-hero" className="mx-auto max-w-6xl px-4 pt-8 pb-4 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-medium text-blue-700">
            <Languages className="h-3.5 w-3.5" />
            {t("heroBadge")}
          </div>
          <h1 id="trans-hero" className="font-mono text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
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

        {/* TRANSLATOR */}
        <section aria-labelledby="trans-tool" className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="trans-tool" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
              {t("toolTitle")}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-gray-600">{t("toolDesc")}</p>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {t("nameInputLabel")}
                </label>
                <input
                  type="text"
                  placeholder={t("nameInputPlaceholder")}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") doTranslate(); }}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {t("sourceRegionLabel")}
                </label>
                <select
                  value={fromRegion}
                  onChange={(e) => setFromRegion(e.target.value as Region)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
                >
                  {regionOptions.map((o) => (
                    <option key={o.region} value={o.region}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={doTranslate}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-blue-700 active:scale-95"
              >
                <Search className="h-3.5 w-3.5" />
                {t("translateBtn")}
              </button>
              <button
                type="button"
                onClick={() => { setInput(""); setResult(null); setSearchAll([]); }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition-all hover:bg-gray-50 active:scale-95"
              >
                <Globe className="h-3.5 w-3.5" />
                {t("resetBtn")}
              </button>
            </div>

            {/* Result */}
            {result && (
              <div className="mt-6 rounded-2xl border-2 border-blue-300 bg-blue-50 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Languages className="h-5 w-5 text-blue-600" />
                  <h3 className="font-mono text-lg font-bold text-gray-900">{t("resultTitle")}</h3>
                </div>
                <p className="mb-4 text-sm text-gray-700">
                  <span className="font-semibold">{t("matchedGroup")}:</span> {t(result.hintKey)}
                </p>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {REGIONS.map((r) => (
                    <div key={r} className={`rounded-xl p-3 ${r === fromRegion ? "bg-blue-100 ring-2 ring-blue-400" : "bg-white"}`}>
                      <p className="mb-1 text-xs font-semibold text-gray-500">{REGION_LABELS[r]}</p>
                      <p className="font-mono text-base font-bold text-gray-900">{result.names[r]}</p>
                      <p className="mt-1 text-xs text-gray-500">{REGION_SCRIPTS[r]}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const lines = [`${t("shareTitle")} "${result.name}" (${REGION_LABELS[result.fromRegion]})`, ""];
                      REGIONS.forEach((r) => lines.push(`${REGION_LABELS[r]}: ${result.names[r]}`));
                      lines.push("");
                      lines.push(t("shareHint"));
                      lines.push(pageUrl);
                      navigator.clipboard?.writeText(lines.join("\n")).catch(() => {});
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-blue-700 active:scale-95"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    {t("shareBtn")}
                  </button>
                </div>
              </div>
            )}

            {/* Did-you-mean (cross-region search) */}
            {!result && input.trim() && searchAll.length > 0 && (
              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <p className="mb-3 text-sm font-semibold text-amber-800">{t("foundLabel")}: {searchAll.length}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {searchAll.map((s) => (
                    <div key={s.region} className="rounded-xl bg-white p-3">
                      <p className="mb-1 text-xs font-semibold text-gray-500">{t("inRegion")} {REGION_LABELS[s.region]}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {REGIONS.map((r) => (
                          <div key={r} className="rounded bg-gray-50 px-2 py-1">
                            <span className="block text-gray-500">{REGION_CODES[r]}</span>
                            <span className="font-mono text-sm font-medium text-gray-800">{s.match.names[r]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!result && input.trim() && searchAll.length === 0 && (
              <p className="mt-4 text-sm text-gray-500 italic">{t("notFoundLabel")}</p>
            )}
          </div>
        </section>

        {/* NAME GENERATOR */}
        <section aria-labelledby="trans-gen" className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
              <h2 id="trans-gen" className="font-mono text-lg sm:text-xl font-bold text-gray-900">
                {t("genTitle")}
              </h2>
              <button
                type="button"
                onClick={doGenerate}
                className="inline-flex items-center gap-1.5 rounded-lg bg-purple-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-purple-700 active:scale-95"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {t("generateBtn")}
              </button>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-gray-600">{t("genDesc")}</p>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {t("genRegionLabel")}
                </label>
                <select
                  value={genRegion}
                  onChange={(e) => setGenRegion(e.target.value as Region)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-purple-400 focus:outline-none"
                >
                  {regionOptions.map((o) => (
                    <option key={o.region} value={o.region}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {t("genCountLabel")}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={genCount}
                    onChange={(e) => setGenCount(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-10 text-center font-mono font-bold text-gray-700">{genCount}</span>
                </div>
              </div>
            </div>

            {generated.length > 0 && (
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray-500">{t("genResultLabel")}</p>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard?.writeText(generated.join(", ")).catch(() => {})}
                    className="inline-flex items-center gap-1 text-xs text-purple-600 hover:underline"
                  >
                    <Download className="h-3.5 w-3.5" />
                    {t("copyBtn")}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {generated.map((n, i) => (
                    <span key={i} className="rounded-lg bg-purple-50 px-3 py-1.5 text-sm font-medium text-purple-800">{n}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* REGION COMPARISON */}
        <section aria-labelledby="trans-regions" className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="trans-regions" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
              {t("regionsTitle")}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-gray-600">{t("regionsDesc")}</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
                    <th className="px-3 py-2">{t("regionHeader")}</th>
                    <th className="px-3 py-2">{t("scriptHeader")}</th>
                    <th className="px-3 py-2">{t("namesHeader")}</th>
                  </tr>
                </thead>
                <tbody>
                  {regionOptions.map((o) => (
                    <tr key={o.region} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                      <td className="px-3 py-3 font-semibold text-gray-900">{o.label}</td>
                      <td className="px-3 py-3 text-gray-600">{o.script}</td>
                      <td className="px-3 py-3 text-gray-600">{REGION_NOTES[o.region]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* NAME GROUP BROWSER */}
        <section aria-labelledby="trans-groups" className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="trans-groups" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
              {t("groupsTitle")}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-gray-600">{t("groupsDesc")}</p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {NAME_GROUPS.map((g) => (
                <details key={g.id} className="group rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
                  <summary className="flex cursor-pointer items-center justify-between p-3 hover:bg-gray-100 transition-colors">
                    <h4 className="pr-4 text-sm font-semibold text-gray-800">{t(g.groupKey)}</h4>
                    <ArrowRight className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-3 pb-3">
                    <p className="mb-2 text-xs italic text-gray-500">{t(g.hintKey)}</p>
                    <div className="grid grid-cols-1 gap-1.5 text-xs">
                      {REGIONS.map((r) => (
                        <div key={r} className="flex items-center justify-between rounded bg-white px-2 py-1">
                          <span className="text-gray-500">{REGION_CODES[r]}</span>
                          <span className="font-mono text-sm font-medium text-gray-800">{g.names[r]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section aria-labelledby="trans-how" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="rounded-2xl bg-blue-50 p-4 sm:p-6">
            <h2 id="trans-how" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
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
        <section aria-labelledby="trans-faq" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="trans-faq" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
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
        <section aria-labelledby="trans-cta" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="trans-cta" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
              {t("ctaTitle")}
            </h2>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/tomodachi-life-mbti" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
                <Lightbulb className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium text-gray-900">{t("ctaMbti")}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
              </Link>
              <Link href="/tomodachi-life-compatibility" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
                <Globe className="h-5 w-5 text-indigo-500" />
                <span className="text-sm font-medium text-gray-900">{t("ctaCompat")}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
              </Link>
              <Link href="/tomodachi-life-personality-quiz" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium text-gray-900">{t("ctaQuiz")}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
              </Link>
              <Link href="/tomodachi-life-gift-item-db" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
                <Languages className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-900">{t("ctaGift")}</span>
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