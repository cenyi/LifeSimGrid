"use client";

import { useTranslations, useLocale } from "next-intl";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VoiceLab from "@/components/VoiceLab";
import { Link } from "@/i18n/routing";

/** Tomodachi Voice Lab sub-page - voice synthesizer only */
export default function TomodachiVoiceLabPage() {
  const t = useTranslations("TomodachiVoiceLabPage");
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
      .replace(/(Web Audio API)/g, '<code class="rounded bg-gray-100 px-1 py-0.5 text-sm font-mono">$1</code>')
      .replace(/(Vibrato LFO)/g, '<code class="rounded bg-gray-100 px-1 py-0.5 text-sm font-mono">$1</code>');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* HowTo JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              name: t("voiceGuideTitle"),
              step: [
                { "@type": "HowToStep", text: t("voiceGuideStep1") },
                { "@type": "HowToStep", text: t("voiceGuideStep2") },
                { "@type": "HowToStep", text: t("voiceGuideStep3") },
                { "@type": "HowToStep", text: t("voiceGuideStep4") },
                { "@type": "HowToStep", text: t("voiceGuideStep5") },
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
                { "@type": "ListItem", position: 2, name: "Tomodachi Voice Lab", item: `${BASE}${locale === "en" ? "/tomodachi-voice-lab" : `/${locale}/tomodachi-voice-lab`}` },
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
              name: "Tomodachi Life Voice Lab - 8-Bit Mii Voice Synthesizer",
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
        <section aria-labelledby="voice-hero-title" className="mx-auto max-w-6xl px-4 pt-10 pb-6 text-center">
          <h1 id="voice-hero-title" className="font-mono text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            {t("subtitle")}
          </p>
        </section>

        {/* 1-Minute Overview */}
        <section aria-labelledby="voice-overview-title" className="mx-auto max-w-6xl px-4 py-6">
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 shadow-sm">
            <h2 id="voice-overview-title" className="mb-3 font-mono text-xl font-bold text-gray-900 sm:text-2xl">{t("oneMinTitle")}</h2>
            <p className="leading-relaxed text-gray-700">{t("oneMinDesc")}</p>
          </div>
        </section>

        {/* Tool */}
        <section aria-labelledby="voice-tool-title" className="mx-auto max-w-6xl px-4 py-6">
          <h2 id="voice-tool-title" className="sr-only">Voice Synthesizer Tool</h2>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-md sm:p-8">
            <VoiceLab />
          </div>
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

        {/* Technical Deep Dive */}
        <section aria-labelledby="tech-title" className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-3xl bg-blue-50 p-6 sm:p-8">
            <h2 id="tech-title" className="mb-6 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">
              {t("techTitle")}
            </h2>
            <div className="space-y-4">
              <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
                <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">{t("techAudioTitle")}</h3>
                <p className="leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: renderTechDesc(t("techAudioDesc")) }} />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose */}
        <section aria-labelledby="voice-why-choose-title" className="mx-auto max-w-6xl px-4 py-8">
          <h2 id="voice-why-choose-title" className="mb-6 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">{t("whyChooseTitle")}</h2>
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
        <section aria-labelledby="explore-title" className="mx-auto max-w-6xl px-4 py-8">
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
            <Link href="/pixel-grid-studio" className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">{t("relatedPixelTitle")}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{t("relatedPixelDesc")}</p>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
