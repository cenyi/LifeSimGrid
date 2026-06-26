"use client";

import { useTranslations, useLocale } from "next-intl";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PixelStudio from "@/components/PixelStudio";
import { Link } from "@/i18n/routing";

/** ACNH Pixel Studio sub-page with dedicated SEO content */
export default function AcnhPixelStudioPage() {
  const t = useTranslations("AcnhPixelStudio");
  const locale = useLocale();
  const BASE = "https://lifesimgrid.org";

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
    { q: t("faq10Q"), a: t("faq10A") },
    { q: t("faq11Q"), a: t("faq11A") },
  ];

  /** Render text with technical terms wrapped in <code> tags */
  const renderCodeTerms = (text: string) => {
    return text
      .replace(/(HTML5 Canvas API)/g, '<code class="rounded bg-gray-100 px-1 py-0.5 text-sm font-mono">$1</code>')
      .replace(/(NookLink)/g, '<code class="rounded bg-gray-100 px-1 py-0.5 text-sm font-mono">$1</code>')
      .replace(/(NookPhone)/g, '<code class="rounded bg-gray-100 px-1 py-0.5 text-sm font-mono">$1</code>')
      .replace(/(FFL)/g, '<code class="rounded bg-gray-100 px-1 py-0.5 text-sm font-mono">$1</code>')
      .replace(/(0x04)/g, '<code class="rounded bg-gray-100 px-1 py-0.5 text-sm font-mono">$1</code>')
      .replace(/(Web Audio API)/g, '<code class="rounded bg-gray-100 px-1 py-0.5 text-sm font-mono">$1</code>');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* HowTo JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "HowTo",
                name: t("howToImportTitle"),
                step: [
                  { "@type": "HowToStep", text: t("howToImportStep1") },
                  { "@type": "HowToStep", text: t("howToImportStep2") },
                  { "@type": "HowToStep", text: t("howToImportStep3") },
                  { "@type": "HowToStep", text: t("howToImportStep4") },
                  { "@type": "HowToStep", text: t("howToImportStep5") },
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "HowTo",
                name: t("howToLtdTitle"),
                step: [
                  { "@type": "HowToStep", text: t("howToLtdStep1") },
                  { "@type": "HowToStep", text: t("howToLtdStep2") },
                  { "@type": "HowToStep", text: t("howToLtdStep3") },
                  { "@type": "HowToStep", text: t("howToLtdStep4") },
                  { "@type": "HowToStep", text: t("howToLtdStep5") },
                ],
              },
            ]).replace(/<\/script/g, "<\\/script"),
          }}
        />
        {/* BreadcrumbList JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}${locale === "en" ? "/" : `/${locale}/`}` },
                { "@type": "ListItem", position: 2, name: "ACNH Pixel Studio", item: `${BASE}${locale === "en" ? "/acnh-pixel-studio" : `/${locale}/acnh-pixel-studio`}` },
              ],
            }).replace(/<\/script/g, "<\\/script"),
          }}
        />
        {/* FAQPage JSON-LD */}
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
        {/* WebApplication JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "ACNH Custom Design Pixel Studio",
              applicationCategory: "GameUtilityApplication",
              operatingSystem: "Any (Browser-based)",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              description: t("subtitle"),
            }).replace(/<\/script/g, "<\\/script"),
          }}
        />
        {/* Hero */}
        <section aria-labelledby="acnh-hero-title" className="mx-auto max-w-6xl px-4 pt-10 pb-6 text-center">
          <h1 id="acnh-hero-title" className="font-mono text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            {t("subtitle")}
          </p>
        </section>

        {/* 1-Minute Overview */}
        <section aria-labelledby="acnh-overview-title" className="mx-auto max-w-6xl px-4 py-6">
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 shadow-sm">
            <h2 id="acnh-overview-title" className="mb-3 font-mono text-xl font-bold text-gray-900 sm:text-2xl">{t("oneMinTitle")}</h2>
            <p className="leading-relaxed text-gray-700">{t("oneMinDesc")}</p>
          </div>
        </section>

        {/* Tool */}
        <section aria-labelledby="acnh-tool-title" className="mx-auto max-w-6xl px-4 py-6">
          <h2 id="acnh-tool-title" className="sr-only">ACNH Custom Design Tool</h2>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-md sm:p-8">
            <PixelStudio />
          </div>
        </section>

        {/* How to Import */}
        <section aria-labelledby="how-to-import-title" className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-3xl bg-amber-50 p-6 sm:p-8">
            <h2 id="how-to-import-title" className="mb-6 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">
              {t("howToImportTitle")}
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>{t("howToImportStep1")}</li>
              <li>{t("howToImportStep2")}</li>
              <li>{t("howToImportStep3")}</li>
              <li>{t("howToImportStep4")}</li>
              <li>{t("howToImportStep5")}</li>
            </ol>
          </div>
        </section>

        {/* How to Use for Living the Dream */}
        <section aria-labelledby="how-to-ltd-title" className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-3xl bg-amber-50 p-6 sm:p-8">
            <h2 id="how-to-ltd-title" className="mb-6 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">
              {t("howToLtdTitle")}
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>{t("howToLtdStep1")}</li>
              <li>{t("howToLtdStep2")}</li>
              <li>{t("howToLtdStep3")}</li>
              <li>{t("howToLtdStep4")}</li>
              <li>{t("howToLtdStep5")}</li>
            </ol>
          </div>
        </section>

        {/* Grid Size Reference Table */}
        <section aria-labelledby="grid-ref-title" className="mx-auto max-w-6xl px-4 py-8">
          <h2 id="grid-ref-title" className="mb-4 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">
            {t("gridRefTitle")}
          </h2>
          <p className="mb-6 leading-relaxed text-gray-600">{t("gridRefDesc")}</p>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 font-mono font-semibold text-gray-900">{t("gridRefGame")}</th>
                  <th className="px-4 py-3 font-mono font-semibold text-gray-900">{t("gridRefDesignType")}</th>
                  <th className="px-4 py-3 font-mono font-semibold text-gray-900">{t("gridRefSize")}</th>
                  <th className="px-4 py-3 font-mono font-semibold text-gray-900">{t("gridRefToolDensity")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 text-gray-700">{t("gridRefAcnhStandard")}</td>
                  <td className="px-4 py-3 text-gray-600">{t("gridRefAcnhStandardType")}</td>
                  <td className="px-4 py-3 font-mono text-gray-900">{t("gridRefAcnhStandardSize")}</td>
                  <td className="px-4 py-3 text-gray-600">{t("gridRefAcnhStandardDensity")}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">{t("gridRefAcnhPro")}</td>
                  <td className="px-4 py-3 text-gray-600">{t("gridRefAcnhProType")}</td>
                  <td className="px-4 py-3 font-mono text-gray-900">{t("gridRefAcnhProSize")}</td>
                  <td className="px-4 py-3 text-gray-600">{t("gridRefAcnhProDensity")}</td>
                </tr>
                <tr className="bg-amber-50/50">
                  <td className="px-4 py-3 text-gray-700">{t("gridRefLtdFacepaint")}</td>
                  <td className="px-4 py-3 text-gray-600">{t("gridRefLtdFacepaintType")}</td>
                  <td className="px-4 py-3 font-mono text-gray-900">{t("gridRefLtdFacepaintSize")}</td>
                  <td className="px-4 py-3 text-gray-600">{t("gridRefLtdFacepaintDensity")}</td>
                </tr>
                <tr className="bg-amber-50/50">
                  <td className="px-4 py-3 text-gray-700">{t("gridRefLtdClothing")}</td>
                  <td className="px-4 py-3 text-gray-600">{t("gridRefLtdClothingType")}</td>
                  <td className="px-4 py-3 font-mono text-gray-900">{t("gridRefLtdClothingSize")}</td>
                  <td className="px-4 py-3 text-gray-600">{t("gridRefLtdClothingDensity")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Why Use */}
        <section aria-labelledby="why-use-title" className="mx-auto max-w-6xl px-4 py-8">
          <h2 id="why-use-title" className="mb-6 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">
            {t("whyUseTitle")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { title: t("whyUseReason1Title"), desc: t("whyUseReason1") },
              { title: t("whyUseReason2Title"), desc: t("whyUseReason2") },
              { title: t("whyUseReason3Title"), desc: t("whyUseReason3") },
              { title: t("whyUseReason4Title"), desc: t("whyUseReason4") },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600" dangerouslySetInnerHTML={{ __html: renderCodeTerms(item.desc) }} />
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-title" className="mx-auto max-w-6xl px-4 py-8">
          <h2 id="faq-title" className="mb-6 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">
            {t("faqTitle")}
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md group">
                <summary className="flex w-full items-center justify-between px-5 py-4 text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <h4 className="pr-4 font-semibold text-gray-900">{faq.q}</h4>
                  <ChevronDown className="h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-4 leading-relaxed text-gray-600" dangerouslySetInnerHTML={{ __html: renderCodeTerms(faq.a) }} />
              </details>
            ))}
          </div>
        </section>

        {/* Privacy Badge */}
        <section aria-labelledby="privacy-title" className="mx-auto max-w-6xl px-4 py-6">
          <div className="rounded-2xl bg-green-50 p-5 text-center">
            <h2 id="privacy-title" className="text-base font-semibold text-green-700 sm:text-lg" dangerouslySetInnerHTML={{ __html: renderCodeTerms(t("privacyBadge")) }} />
          </div>
        </section>

        {/* Related Tools - SEO Section */}
        <section aria-labelledby="explore-title" className="mx-auto max-w-6xl px-4 py-8">
          <h2 id="explore-title" className="mb-6 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">{t("relatedTitle")}</h2>
          <p className="mb-6 leading-relaxed text-gray-600">{t("relatedDesc")}</p>
          <div className="grid gap-6 sm:grid-cols-3">
            <Link href="/mii-qr-unlocker" className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">{t("relatedQrTitle")}</h3>
              <p className="text-sm leading-relaxed text-gray-600" dangerouslySetInnerHTML={{ __html: renderCodeTerms(t("relatedQrDesc")) }} />
            </Link>
            <Link href="/tomodachi-voice-lab" className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">{t("relatedVoiceTitle")}</h3>
              <p className="text-sm leading-relaxed text-gray-600" dangerouslySetInnerHTML={{ __html: renderCodeTerms(t("relatedVoiceDesc")) }} />
            </Link>
            <Link href="/pixel-grid-studio" className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">{t("relatedPixelTitle")}</h3>
              <p className="text-sm leading-relaxed text-gray-600" dangerouslySetInnerHTML={{ __html: renderCodeTerms(t("relatedPixelDesc")) }} />
            </Link>
          </div>
          <div className="mt-6 text-center">
            <Link href="/tomodachi-life-mbti" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700">
              {t("relatedMbtiLink")} →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
