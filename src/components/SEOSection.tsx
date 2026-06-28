"use client";

import { useTranslations } from "next-intl";
import { type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

const RICH_TAGS = {
  pixel: (chunks: ReactNode) => (
    <a href="#pixel-studio">{chunks}</a>
  ),
  qr: (chunks: ReactNode) => (
    <a href="#qr-configurator">{chunks}</a>
  ),
  voice: (chunks: ReactNode) => (
    <a href="#voice-lab">{chunks}</a>
  ),
};

function nodeToText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return nodeToText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

export default function SEOSection() {
  const seo = useTranslations("SEO");

  const faqCategories = [
    {
      label: seo("faqCatPrivacy"),
      items: [
        { q: seo("q1"), a: seo.rich("a1", RICH_TAGS) },
        { q: seo("q2"), a: seo.rich("a2", RICH_TAGS) },
        { q: seo("q3"), a: seo.rich("a3", RICH_TAGS) },
      ],
    },
    {
      label: seo("faqCatPixel"),
      items: [
        { q: seo("q4"), a: seo.rich("a4", RICH_TAGS) },
        { q: seo("q5"), a: seo.rich("a5", RICH_TAGS) },
        { q: seo("q13"), a: seo.rich("a13", RICH_TAGS) },
        { q: seo("q18"), a: seo.rich("a18", RICH_TAGS) },
      ],
    },
    {
      label: seo("faqCatQR"),
      items: [
        { q: seo("q6"), a: seo.rich("a6", RICH_TAGS) },
        { q: seo("q7"), a: seo.rich("a7", RICH_TAGS) },
        { q: seo("q10"), a: seo.rich("a10", RICH_TAGS) },
      ],
    },
    {
      label: seo("faqCatVoice"),
      items: [
        { q: seo("q8"), a: seo.rich("a8", RICH_TAGS) },
        { q: seo("q9"), a: seo.rich("a9", RICH_TAGS) },
        { q: seo("q11"), a: seo.rich("a11", RICH_TAGS) },
        { q: seo("q12"), a: seo.rich("a12", RICH_TAGS) },
        { q: seo("q14"), a: seo.rich("a14", RICH_TAGS) },
        { q: seo("q15"), a: seo.rich("a15", RICH_TAGS) },
        { q: seo("q16"), a: seo.rich("a16", RICH_TAGS) },
        { q: seo("q17"), a: seo.rich("a17", RICH_TAGS) },
      ],
    },
  ];

  const allFaqItems = faqCategories.flatMap((cat) => cat.items);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: nodeToText(item.a),
      },
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/<\/script/g, "<\\/script") }}
      />

      <div className="mb-8 rounded-2xl bg-green-50 p-5 text-center">
        <p className="text-base font-semibold text-green-700 sm:text-lg">
          {seo("privacyBadge")}
        </p>
      </div>

      <section aria-labelledby="manual-heading" className="mb-12">
        <h2 id="manual-heading" className="mb-8 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">
          {seo("manualTitle")}
        </h2>

        <div className="space-y-8">
          <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 font-mono text-lg font-bold text-gray-900">
              🎨 {seo("pixelGuideTitle")}
            </h3>
            <ol className="space-y-3 seo-text list-decimal list-inside">
              <li>{seo.rich("pixelStep1", RICH_TAGS)}</li>
              <li>{seo.rich("pixelStep2", RICH_TAGS)}</li>
              <li>{seo.rich("pixelStep3", RICH_TAGS)}</li>
              <li>{seo.rich("pixelStep4", RICH_TAGS)}</li>
              <li>{seo.rich("pixelStep5", RICH_TAGS)}</li>
              <li>{seo.rich("pixelStep6", RICH_TAGS)}</li>
              <li>{seo.rich("pixelStep7", RICH_TAGS)}</li>
            </ol>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 font-mono text-lg font-bold text-gray-900">
              🔓 {seo("qrGuideTitle")}
            </h3>
            <ol className="space-y-3 seo-text list-decimal list-inside">
              <li>{seo.rich("qrStep1", RICH_TAGS)}</li>
              <li>{seo.rich("qrStep2", RICH_TAGS)}</li>
              <li>{seo.rich("qrStep3", RICH_TAGS)}</li>
              <li>{seo.rich("qrStep4", RICH_TAGS)}</li>
              <li>{seo.rich("qrStep5", RICH_TAGS)}</li>
            </ol>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 font-mono text-lg font-bold text-gray-900">
              🔮 {seo("voiceGuideTitle")}
            </h3>
            <ol className="space-y-3 seo-text list-decimal list-inside">
              <li>{seo.rich("voiceStep1", RICH_TAGS)}</li>
              <li>{seo.rich("voiceStep2", RICH_TAGS)}</li>
              <li>{seo.rich("voiceStep3", RICH_TAGS)}</li>
              <li>{seo.rich("voiceStep4", RICH_TAGS)}</li>
              <li>{seo.rich("voiceStep5", RICH_TAGS)}</li>
            </ol>
            <div className="space-y-3 seo-text mt-3">
              <p className="pl-2">{seo.rich("voiceLove", RICH_TAGS)}</p>
              <p className="pl-2">{seo.rich("voiceFriend", RICH_TAGS)}</p>
            </div>
            <ol className="space-y-3 seo-text list-decimal list-inside mt-3" start={6}>
              <li>{seo.rich("voiceStep6", RICH_TAGS)}</li>
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="mb-8">
        <h2 id="faq-heading" className="mb-8 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">
          ❓ {seo("faqTitle")}
        </h2>

        <div className="space-y-6">
          {faqCategories.map((category, catIdx) => (
              <div key={catIdx}>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-400">
                  {category.label}
                </h3>
                <div>
                  {category.items.map((item, itemIdx) => (
                      <details key={itemIdx} className="border-b border-gray-200 last:border-0 group">
                        <summary className="flex w-full items-center justify-between py-3 text-left font-medium cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                          <h4 className="text-sm font-medium">{item.q}</h4>
                          <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
                        </summary>
                        <p className="pb-3 text-sm text-gray-600">{item.a}</p>
                      </details>
                  ))}
                </div>
              </div>
          ))}
        </div>
      </section>
    </div>
  );
}
