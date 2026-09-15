"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useMemo, useCallback } from "react";
import {
  Sparkles, ChevronRight, RotateCcw, Share2,
  Users, Shield, ArrowRight, Lightbulb,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import {
  QUIZ_QUESTIONS,
  type QuizOptionKey,
  computeQuizResult,
} from "@/lib/personality-quiz-data";
import { getGroupColor } from "@/lib/personality-data";

const OPTION_KEYS: QuizOptionKey[] = ["A", "B", "C", "D"];

export default function TomodachiLifePersonalityQuizPage() {
  const t = useTranslations("TomodachiLifePersonalityQuizPage");
  const tMbti = useTranslations("TomodachiLifeMbtiPage");
  const locale = useLocale();

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, QuizOptionKey>>({});
  const [done, setDone] = useState(false);

  const total = QUIZ_QUESTIONS.length;
  const progress = done ? 100 : Math.round(((current) / total) * 100);

  const result = useMemo(() => computeQuizResult(answers), [answers]);

  const choose = useCallback(
    (opt: QuizOptionKey) => {
      setAnswers((a) => ({ ...a, [current]: opt }));
      if (current < total - 1) {
        setCurrent((c) => c + 1);
      } else {
        setDone(true);
      }
    },
    [current, total]
  );

  const reset = useCallback(() => {
    setAnswers({});
    setCurrent(0);
    setDone(false);
  }, []);

  const share = useCallback(() => {
    const text = `I took the Tomodachi Life personality quiz and got ${result.mbti} (${result.personality})! Try it: https://lifesimgrid.org/tomodachi-life-personality-quiz`;
    navigator.clipboard?.writeText(text).catch(() => {});
  }, [result]);

  /* JSON-LD */
  const base = "https://lifesimgrid.org";
  const prefix = locale === "en" ? "" : `/${locale}`;
  const pageUrl = `${base}${prefix}/tomodachi-life-personality-quiz`;
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
    name: "Tomodachi Life Personality Quiz",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: t("metaDesc"),
    url: pageUrl,
  };
  const quizJsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: "Tomodachi Life Personality Quiz",
    description: t("metaDesc"),
    url: pageUrl,
    numberOfQuestions: total,
    educationalAlignment: "Community-estimate personality mapping (fan-made, not official Nintendo)",
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

  const groupColor = getGroupColor(result.group);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/<\/script/g, "<\\/script") }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd).replace(/<\/script/g, "<\\/script") }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizJsonLd).replace(/<\/script/g, "<\\/script") }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/<\/script/g, "<\\/script") }} />

        {/* HERO */}
        <section aria-labelledby="quiz-hero" className="mx-auto max-w-6xl px-4 pt-8 pb-4 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-1.5 text-xs font-medium text-violet-700">
            <Sparkles className="h-3.5 w-3.5" />
            {t("heroBadge")}
          </div>
          <h1 id="quiz-hero" className="font-mono text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
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

        {/* QUIZ / RESULT */}
        <section aria-labelledby="quiz-body" className="mx-auto max-w-3xl px-4 py-4 sm:py-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="quiz-body" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
              {done ? t("resultTitle") : t("quizTitle")}
            </h2>

            {/* Progress */}
            <div className="mb-4">
              <div className="mb-1 flex items-center justify-between text-xs font-medium text-gray-500">
                <span>{t("progressLabel")}</span>
                <span>
                  {done ? total : current + 1} / {total}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-violet-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Active question */}
            {!done && (
              <div>
                <p className="mb-4 text-base font-semibold text-gray-800 leading-relaxed">
                  {t(QUIZ_QUESTIONS[current].qKey as "q1")}
                </p>
                <div className="space-y-2">
                  {OPTION_KEYS.map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => choose(k)}
                      className="group flex w-full items-center gap-3 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-3 text-left text-sm transition-all hover:border-violet-300 hover:bg-violet-50 active:scale-[0.99]"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-bold text-violet-600 shadow-sm">
                        {k}
                      </span>
                      <span className="text-gray-700 group-hover:text-gray-900">
                        {t(QUIZ_QUESTIONS[current].options[k])}
                      </span>
                      <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-gray-300 group-hover:text-violet-500" />
                    </button>
                  ))}
                </div>
                {/* Back button */}
                {current > 0 && (
                  <button
                    type="button"
                    onClick={() => setCurrent((c) => c - 1)}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700"
                  >
                    <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                    {t("backLabel")}
                  </button>
                )}
              </div>
            )}

            {/* Result card */}
            {done && (
              <div>
                <div
                  className="rounded-2xl border-2 p-6 text-center"
                  style={{
                    backgroundColor: `${groupColor}15`,
                    borderColor: groupColor,
                  }}
                >
                  <div className="mb-2 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md">
                    <Users className="h-7 w-7" style={{ color: groupColor }} />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {t("yourTypeLabel")}
                  </p>
                  <p className="my-2 font-mono text-4xl font-extrabold" style={{ color: groupColor }}>
                    {result.mbti}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {tMbti(result.personalityLabelKey as never)}
                  </p>
                  <p className="mt-1 text-xs font-medium text-gray-500">
                    {tMbti(`group${result.group.charAt(0).toUpperCase()}${result.group.slice(1)}` as never)}{" "}
                    {t("groupSuffix")}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                    {["movement", "speech", "energy", "thinking"].map((axis) => (
                      <div key={axis} className="rounded-lg bg-white/70 px-2.5 py-1 text-xs font-medium text-gray-600">
                        {t(`axis${axis.charAt(0).toUpperCase()}${axis.slice(1)}` as never)}{" "}
                        <span className="font-mono font-bold text-gray-800">{result.sliders[axis as keyof typeof result.sliders]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white border border-gray-200 px-3 py-2.5 text-xs font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    {t("retakeBtn")}
                  </button>
                  <button
                    type="button"
                    onClick={share}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-violet-500 px-3 py-2.5 text-xs font-semibold text-white transition-all hover:bg-violet-600 active:scale-95"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    {t("shareBtn")}
                  </button>
                </div>

                {/* Cross-links */}
                <div className="mt-4">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                    <Lightbulb className="h-3.5 w-3.5" />
                    {t("exploreLabel")}
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <Link
                      href={`/tomodachi-life-personality/${result.personality.split("_")[1]}`}
                      className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3 text-sm font-medium text-gray-800 transition-all hover:border-violet-200 hover:bg-violet-50"
                    >
                      {t("explorePersonality")}
                      <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
                    </Link>
                    <Link
                      href="/tomodachi-life-mbti"
                      className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3 text-sm font-medium text-gray-800 transition-all hover:border-violet-200 hover:bg-violet-50"
                    >
                      {t("exploreMbti")}
                      <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
                    </Link>
                    <Link
                      href="/tomodachi-life-compatibility"
                      className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3 text-sm font-medium text-gray-800 transition-all hover:border-violet-200 hover:bg-violet-50"
                    >
                      {t("exploreCompat")}
                      <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
                    </Link>
                    <Link
                      href="/tomodachi-life-personality-chart"
                      className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3 text-sm font-medium text-gray-800 transition-all hover:border-violet-200 hover:bg-violet-50"
                    >
                      {t("exploreChart")}
                      <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section aria-labelledby="quiz-how" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="rounded-2xl bg-violet-50 p-4 sm:p-6">
            <h2 id="quiz-how" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
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
        <section aria-labelledby="quiz-faq" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="quiz-faq" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
              {t("faqTitle")}
            </h2>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <details key={i} className="group rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
                  <summary className="flex cursor-pointer items-center justify-between p-3 sm:p-4 hover:bg-gray-100 transition-colors">
                    <h4 className="pr-4 text-sm font-semibold text-gray-800">{t(`faq${i}Q` as "faq1Q")}</h4>
                    <ChevronRight className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-open:rotate-90" />
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
      </main>
      <Footer />
    </>
  );
}
