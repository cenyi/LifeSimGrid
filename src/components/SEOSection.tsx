"use client";

import { useTranslations } from "next-intl";
import { useState, type ReactNode } from "react";
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

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="pr-4 font-semibold text-gray-900">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-4 leading-relaxed text-gray-600 seo-text">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  function handleToggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-8 rounded-2xl bg-green-50 p-5 text-center">
        <p className="text-base font-semibold text-green-700 sm:text-lg">
          {seo("privacyBadge")}
        </p>
      </div>

      <section className="mb-12 rounded-3xl bg-gray-50 p-6 sm:p-8">
        <h2 className="mb-8 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">
          {seo("manualTitle")}
        </h2>

        <div className="space-y-8">
          <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 font-mono text-lg font-bold text-gray-900">
              🎨 {seo("pixelGuideTitle")}
            </h3>
            <div className="space-y-3 seo-text">
              <p>{seo.rich("pixelStep1", RICH_TAGS)}</p>
              <p>{seo.rich("pixelStep2", RICH_TAGS)}</p>
              <p>{seo.rich("pixelStep3", RICH_TAGS)}</p>
              <p>{seo.rich("pixelStep4", RICH_TAGS)}</p>
              <p>{seo.rich("pixelStep5", RICH_TAGS)}</p>
              <p>{seo.rich("pixelStep6", RICH_TAGS)}</p>
              <p>{seo.rich("pixelStep7", RICH_TAGS)}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 font-mono text-lg font-bold text-gray-900">
              🔓 {seo("qrGuideTitle")}
            </h3>
            <div className="space-y-3 seo-text">
              <p>{seo.rich("qrStep1", RICH_TAGS)}</p>
              <p>{seo.rich("qrStep2", RICH_TAGS)}</p>
              <p>{seo.rich("qrStep3", RICH_TAGS)}</p>
              <p>{seo.rich("qrStep4", RICH_TAGS)}</p>
              <p>{seo.rich("qrStep5", RICH_TAGS)}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 font-mono text-lg font-bold text-gray-900">
              🔮 {seo("voiceGuideTitle")}
            </h3>
            <div className="space-y-3 seo-text">
              <p>{seo.rich("voiceStep1", RICH_TAGS)}</p>
              <p>{seo.rich("voiceStep2", RICH_TAGS)}</p>
              <p>{seo.rich("voiceStep3", RICH_TAGS)}</p>
              <p>{seo.rich("voiceStep4", RICH_TAGS)}</p>
              <p>{seo.rich("voiceStep5", RICH_TAGS)}</p>
              <p className="pl-2">{seo.rich("voiceLove", RICH_TAGS)}</p>
              <p className="pl-2">{seo.rich("voiceFriend", RICH_TAGS)}</p>
              <p>{seo.rich("voiceStep6", RICH_TAGS)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-8 font-mono text-2xl font-bold text-gray-900 sm:text-3xl">
          ❓ {seo("faqTitle")}
        </h2>

        <div className="space-y-6">
          {faqCategories.map((category, catIdx) => {
            const baseIndex = faqCategories
              .slice(0, catIdx)
              .reduce((sum, c) => sum + c.items.length, 0);

            return (
              <div key={catIdx}>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-400">
                  {category.label}
                </h3>
                <div className="space-y-3">
                  {category.items.map((item, itemIdx) => {
                    const globalIdx = baseIndex + itemIdx;
                    return (
                      <AccordionItem
                        key={globalIdx}
                        question={item.q}
                        answer={item.a}
                        isOpen={openIndex === globalIdx}
                        onToggle={() => handleToggle(globalIdx)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
