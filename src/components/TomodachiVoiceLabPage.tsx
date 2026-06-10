"use client";

import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VoiceLab from "@/components/VoiceLab";
import { Link } from "@/i18n/routing";

/** Tomodachi Voice Lab sub-page with dedicated SEO content */
export default function TomodachiVoiceLabPage() {
  const t = useTranslations("TomodachiVoiceLabPage");

  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
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
              name: "Tomodachi Life Voice Lab & Compatibility Calculator",
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
          <Link href="/" className="mb-4 inline-block text-sm font-medium text-island-blue hover:underline">
            {t("backToHome")}
          </Link>
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
            <VoiceLab />
          </div>
        </section>

        {/* Personality Matrix */}
        <section aria-labelledby="personality-title" className="mx-auto max-w-6xl px-4 py-8">
          <h2 id="personality-title" className="mb-6 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">
            {t("personalityMatrixTitle")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { key: "groupOutgoing", bg: "bg-amber-50 border-amber-200" },
              { key: "groupConfident", bg: "bg-red-50 border-red-200" },
              { key: "groupIndependent", bg: "bg-purple-50 border-purple-200" },
              { key: "groupEasygoing", bg: "bg-green-50 border-green-200" },
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl border p-5 shadow-sm ${item.bg}`}>
                <h3 className="font-mono text-lg font-bold text-gray-900">{t(item.key)}</h3>
              </div>
            ))}
          </div>
          <p className="mt-4 leading-relaxed text-gray-600">{t("personalityDetail")}</p>
        </section>

        {/* Voice Guide */}
        <section aria-labelledby="voice-guide-title" className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-3xl bg-amber-50 p-6 sm:p-8">
            <h2 id="voice-guide-title" className="mb-6 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">
              {t("voiceGuideTitle")}
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>{t("voiceGuideStep1")}</li>
              <li>{t("voiceGuideStep2")}</li>
              <li>{t("voiceGuideStep3")}</li>
              <li>{t("voiceGuideStep4")}</li>
              <li>{t("voiceGuideStep5")}</li>
            </ol>
          </div>
        </section>

        {/* Share */}
        <section aria-labelledby="share-title" className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-3xl bg-green-50 p-6 sm:p-8">
            <h2 id="share-title" className="mb-4 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">
              {t("shareTitle")}
            </h2>
            <p className="leading-relaxed text-gray-700">{t("shareText")}</p>
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
        <section aria-labelledby="explore-title" className="mx-auto max-w-6xl px-4 py-8">
          <h2 id="explore-title" className="mb-4 font-mono text-xl font-bold text-gray-900">{t("exploreOtherTools")}</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/acnh-pixel-studio" className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:shadow-md">
              {t("exploreAcnh")}
            </Link>
            <Link href="/mii-qr-unlocker" className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:shadow-md">
              {t("exploreQr")}
            </Link>
            <Link href="/pixel-grid-studio" className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:shadow-md">
              {t("explorePixelGrid")}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
