"use client";

import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PixelStudio from "@/components/PixelStudio";
import { Link } from "@/i18n/routing";

/** Pixel Grid Studio sub-page with dedicated SEO content */
export default function PixelGridStudioPage() {
  const t = useTranslations("PixelGridStudio");

  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
  ];

  /** Wraps technical terms in <code> tags for SEO and visual emphasis */
  const renderTechDesc = (text: string) => {
    return text
      .replace(/(error-diffusion dithering)/gi, '<code class="rounded bg-gray-100 px-1 py-0.5 text-sm font-mono">$1</code>')
      .replace(/(Euclidean distance)/gi, '<code class="rounded bg-gray-100 px-1 py-0.5 text-sm font-mono">$1</code>');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="print:hidden"><Navbar /></div>
      <main className="flex-1">
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
        {/* SoftwareApplication JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Universal Pixel Grid Studio",
              applicationCategory: "UtilitiesApplication",
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
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-6 text-center">
          <h1 className="font-mono text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            {t("subtitle")}
          </p>
        </section>

        {/* Tool */}
        <section className="mx-auto max-w-6xl px-4 py-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-md sm:p-8">
            <PixelStudio mode="universal" />
          </div>
        </section>

        {/* Turn Photo */}
        <section aria-labelledby="turn-photo-title" className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-3xl bg-amber-50 p-6 sm:p-8">
            <h2 id="turn-photo-title" className="mb-6 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">
              {t("turnPhotoTitle")}
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">{t("turnPhotoIntro")}</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>{t("howItWorks1")}</li>
              <li>{t("howItWorks2")}</li>
              <li>{t("howItWorks3")}</li>
              <li>{t("howItWorks4")}</li>
            </ol>
          </div>
        </section>

        {/* Multi-Purpose */}
        <section aria-labelledby="multi-purpose-title" className="mx-auto max-w-6xl px-4 py-8">
          <h2 id="multi-purpose-title" className="mb-6 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">
            {t("multiPurposeTitle")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { desc: t("useCaseGamers") },
              { desc: t("useCaseCrafters") },
              { desc: t("useCaseArtists") },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-base mb-1">{item.desc}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Deep Dive: Dithering & Quantization */}
        <section aria-labelledby="tech-title" className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-3xl bg-blue-50 p-6 sm:p-8">
            <h2 id="tech-title" className="mb-6 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">
              {t("techTitle")}
            </h2>
            <div className="space-y-4">
              <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
                <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">{t("techDitheringTitle")}</h3>
                <p className="leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: renderTechDesc(t("techDitheringDesc")) }} />
              </div>
              <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
                <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">{t("techColorTitle")}</h3>
                <p className="leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: renderTechDesc(t("techColorDesc")) }} />
              </div>
            </div>
          </div>
        </section>

        {/* Print Optimization Tip */}
        <section aria-labelledby="print-title" className="mx-auto max-w-6xl px-4 py-6 print:hidden">
          <div className="rounded-2xl bg-amber-50 p-5 text-center">
            <h2 id="print-title" className="text-base font-semibold text-amber-700 sm:text-lg">
              {t("printTip")}
            </h2>
          </div>
        </section>

        {/* Privacy Badge */}
        <section aria-labelledby="privacy-title" className="mx-auto max-w-6xl px-4 py-6">
          <div className="rounded-2xl bg-green-50 p-5 text-center">
            <h2 id="privacy-title" className="text-base font-semibold text-green-700 sm:text-lg">
              {t("privacyBadge")}
            </h2>
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
                <p className="px-5 pb-4 leading-relaxed text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Explore Other Tools */}
        <section aria-labelledby="explore-title" className="mx-auto max-w-6xl px-4 py-8 print:hidden">
          <h2 id="explore-title" className="mb-4 font-mono text-xl font-bold text-gray-900">{t("exploreOtherTools")}</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/acnh-pixel-studio" className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:shadow-md">
              {t("exploreAcnh")}
            </Link>
            <Link href="/mii-qr-unlocker" className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:shadow-md">
              {t("exploreQr")}
            </Link>
            <Link href="/tomodachi-voice-lab" className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:shadow-md">
              {t("exploreVoice")}
            </Link>
          </div>
        </section>
      </main>
      <div className="print:hidden"><Footer /></div>
    </div>
  );
}
