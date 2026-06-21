"use client";

import { useTranslations, useLocale } from "next-intl";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PixelStudio from "@/components/PixelStudio";
import { Link } from "@/i18n/routing";

/** Pixel Grid Studio sub-page with dedicated SEO content */
export default function PixelGridStudioPage() {
  const t = useTranslations("PixelGridStudio");
  const locale = useLocale();
  const BASE = "https://lifesimgrid.org";

  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
    { q: t("faq5Q"), a: t("faq5A") },
    { q: t("faq6Q"), a: t("faq6A") },
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
        {/* HowTo JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              name: t("turnPhotoTitle"),
              step: [
                { "@type": "HowToStep", text: t("howItWorks1") },
                { "@type": "HowToStep", text: t("howItWorks2") },
                { "@type": "HowToStep", text: t("howItWorks3") },
                { "@type": "HowToStep", text: t("howItWorks4") },
              ],
            }).replace(/<\/script/g, "<\\/script"),
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
                { "@type": "ListItem", position: 2, name: "Pixel Grid Studio", item: `${BASE}${locale === "en" ? "/pixel-grid-studio" : `/${locale}/pixel-grid-studio`}` },
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
              name: "Universal Pixel Grid Studio",
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
        <section aria-labelledby="pixel-hero-title" className="mx-auto max-w-6xl px-4 pt-10 pb-6 text-center">
          <h1 id="pixel-hero-title" className="font-mono text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            {t("subtitle")}
          </p>
        </section>

        {/* 1-Minute Overview */}
        <section aria-labelledby="pixel-overview-title" className="mx-auto max-w-6xl px-4 py-6">
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-orange-50 to-amber-50 p-4 sm:p-6 shadow-sm">
            <h2 id="pixel-overview-title" className="mb-3 font-mono text-xl font-bold text-gray-900 sm:text-2xl">{t("oneMinTitle")}</h2>
            <p className="leading-relaxed text-gray-700">{t("oneMinDesc")}</p>
          </div>
        </section>

        {/* Tool */}
        <section aria-labelledby="pixel-tool-title" className="mx-auto max-w-6xl px-4 py-6">
          <h2 id="pixel-tool-title" className="sr-only">Pixel Grid Converter Tool</h2>
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

        {/* Why Choose */}
        <section aria-labelledby="pixel-why-choose-title" className="mx-auto max-w-6xl px-4 py-8">
          <h2 id="pixel-why-choose-title" className="mb-6 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">{t("whyChooseTitle")}</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { title: t("whyChoose1Title"), desc: t("whyChoose1") },
              { title: t("whyChoose2Title"), desc: t("whyChoose2") },
              { title: t("whyChoose3Title"), desc: t("whyChoose3") },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
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
                <p className="px-5 pb-4 leading-relaxed text-gray-600" dangerouslySetInnerHTML={{ __html: renderTechDesc(faq.a) }} />
              </details>
            ))}
          </div>
        </section>

        {/* Related Tools - SEO Section */}
        <section aria-labelledby="explore-title" className="mx-auto max-w-6xl px-4 py-8 print:hidden">
          <h2 id="explore-title" className="mb-6 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">{t("relatedTitle")}</h2>
          <p className="mb-6 leading-relaxed text-gray-600">{t("relatedDesc")}</p>
          <div className="grid gap-6 sm:grid-cols-3">
            <Link href="/acnh-pixel-studio" className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">{t("relatedAcnhTitle")}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{t("relatedAcnhDesc")}</p>
            </Link>
            <Link href="/mii-qr-unlocker" className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">{t("relatedQrTitle")}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{t("relatedQrDesc")}</p>
            </Link>
            <Link href="/tomodachi-voice-lab" className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">{t("relatedVoiceTitle")}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{t("relatedVoiceDesc")}</p>
            </Link>
          </div>
        </section>
      </main>
      <div className="print:hidden"><Footer /></div>
    </div>
  );
}
