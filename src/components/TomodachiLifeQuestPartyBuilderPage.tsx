"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useMemo, useCallback } from "react";
import {
  Shield, ArrowRight, Dices, Share2, Users,
  Sparkles, Lightbulb, Swords,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import {
  PERSONALITIES,
  getPersonalityGroup,
  getMbtiCode,
} from "@/lib/types";
import { getGroupColor, getPersonalityLabelKey } from "@/lib/personality-data";
import {
  QUEST_ROLES,
  evaluateTeam,
  randomTeam,
  type QuestRole,
} from "@/lib/quest-party-data";

export default function TomodachiLifeQuestPartyBuilderPage() {
  const t = useTranslations("TomodachiLifeQuestPartyBuilderPage");
  const tMbti = useTranslations("TomodachiLifeMbtiPage");
  const locale = useLocale();

  const [team, setTeam] = useState<string[]>([]);

  const result = useMemo(
    () =>
      team.length >= 4 ? evaluateTeam(team.slice(0, 4) as [string, string, string, string]) : null,
    [team]
  );

  const personalityOptions = useMemo(
    () =>
      PERSONALITIES.map((p) => ({
        key: p,
        label: tMbti(getPersonalityLabelKey(p) as string),
        mbti: getMbtiCode(p),
        color: getGroupColor(getPersonalityGroup(p)),
        taken: team.includes(p),
      })),
    [tMbti, team]
  );

  const toggle = useCallback((p: string) => {
    setTeam((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : prev.length >= 4 ? prev : [...prev, p]
    );
  }, []);

  const randomize = useCallback(() => setTeam(randomTeam(4)), []);
  const clear = useCallback(() => setTeam([]), []);

  const share = useCallback(() => {
    if (!result) return;
    const names = team.map((p) => getMbtiCode(p)).join(", ");
    const text = `Tomodachi Life quest team: ${names} = ${result.synergy}% synergy. https://lifesimgrid.org/tomodachi-life-quest-party-builder`;
    navigator.clipboard?.writeText(text).catch(() => {});
  }, [team, result]);

  const band = result ? (result.synergy >= 70 ? "high" : result.synergy >= 45 ? "medium" : "low") : "low";
  const bandColor =
    band === "high" ? "text-green-600" : band === "medium" ? "text-amber-600" : "text-red-500";
  const bandBar =
    band === "high" ? "bg-green-500" : band === "medium" ? "bg-amber-500" : "bg-red-400";

  /* JSON-LD */
  const base = "https://lifesimgrid.org";
  const prefix = locale === "en" ? "" : `/${locale}`;
  const pageUrl = `${base}${prefix}/tomodachi-life-quest-party-builder`;
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
    name: "Tomodachi Life Quest Party Builder",
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
        <section aria-labelledby="quest-hero" className="mx-auto max-w-6xl px-4 pt-8 pb-4 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-4 py-1.5 text-xs font-medium text-purple-700">
            <Swords className="h-3.5 w-3.5" />
            {t("heroBadge")}
          </div>
          <h1 id="quest-hero" className="font-mono text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
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

        {/* BUILDER */}
        <section aria-labelledby="quest-builder" className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="quest-builder" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
              {t("builderTitle")}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-gray-600">{t("builderDesc")}</p>

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">
                {t("selectedLabel")}: {team.length}/4
              </span>
              {team.length === 4 && (
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                  band === "high" ? "bg-green-100 text-green-700" : band === "medium" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-600"
                }`}>
                  {result!.synergy}% {t("synergyLabel")}
                </span>
              )}
            </div>

            {/* 16 personality cards */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {personalityOptions.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => toggle(p.key)}
                  disabled={!p.taken && team.length >= 4}
                  className={`rounded-xl border-2 p-3 text-left transition-all ${
                    p.taken
                      ? "border-purple-400 bg-purple-50 shadow-md"
                      : "border-gray-100 bg-white hover:border-purple-200 hover:bg-purple-50/30"
                  } ${!p.taken && team.length >= 4 ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="text-xs font-bold text-gray-800">{p.label}</span>
                    <span className="ml-auto font-mono text-xs font-bold text-gray-400">{p.mbti}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {tMbti(`group${getPersonalityGroup(p.key).charAt(0).toUpperCase()}${getPersonalityGroup(p.key).slice(1)}` as string)}
                  </div>
                </button>
              ))}
            </div>

            {/* Action buttons */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={randomize} className="inline-flex items-center gap-1.5 rounded-lg bg-purple-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-purple-700 active:scale-95">
                <Dices className="h-3.5 w-3.5" />
                {t("randomBtn")}
              </button>
              <button type="button" onClick={clear} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition-all hover:bg-gray-50 active:scale-95">
                <Users className="h-3.5 w-3.5" />
                {t("clearBtn")}
              </button>
              <button type="button" onClick={share} disabled={!result} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition-all hover:bg-gray-50 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed">
                <Share2 className="h-3.5 w-3.5" />
                {t("shareBtn")}
              </button>
            </div>
          </div>
        </section>

        {/* TEAM PREVIEW */}
        {result && (
          <section aria-labelledby="quest-preview" className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
            <div className="rounded-2xl border-2 p-5 sm:p-6" style={{ borderColor: band === "high" ? "#22c55e" : band === "medium" ? "#f59e0b" : "#ef4444" }}>
              <div className="mb-3 flex items-center gap-2">
                <Swords className="h-5 w-5 text-purple-600" />
                <h2 id="quest-preview" className="font-mono text-lg font-bold text-gray-900">{t("teamTitle")}</h2>
              </div>

              <div className="mb-4 flex items-end gap-3">
                <span className={`font-mono text-5xl font-extrabold ${bandColor}`}>{result.synergy}%</span>
                <span className="text-sm font-medium text-gray-500">{t("synergyOf100")}</span>
              </div>

              <div className="mb-4 h-3 overflow-hidden rounded-full bg-gray-100">
                <div className={`h-full rounded-full ${bandBar} transition-all duration-500`} style={{ width: `${result.synergy}%` }} />
              </div>

              <div className="mb-4 text-xs text-gray-500">
                {t("harmonyLabel")} +{result.harmonyBonus} · {t("modelLabel")} fan-made
              </div>

              {/* Role rows */}
              <div className="grid gap-3 sm:grid-cols-2">
                {(QUEST_ROLES as QuestRole[]).map((role) => {
                  const p = team.find(
                    (x) => (result!.bestAssignment as Record<string, QuestRole>)[x] === role
                  );
                  if (!p) return null;
                  return (
                    <div key={role} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: getGroupColor(getPersonalityGroup(p)) }} />
                      <div className="flex-1">
                        <p className="text-xs font-bold text-gray-700">{t(`role${role.charAt(0).toUpperCase()}${role.slice(1)}` as "roleLeader")}</p>
                        <p className="text-sm font-medium text-gray-900">
                          {tMbti(getPersonalityLabelKey(p) as string)}
                          <span className="ml-1 font-mono text-xs text-gray-400">({getMbtiCode(p)})</span>
                        </p>
                      </div>
                      <span className={`font-mono text-sm font-bold ${
                        result.roleScores[role] >= 75 ? "text-green-600" : result.roleScores[role] >= 55 ? "text-amber-600" : "text-red-500"
                      }`}>
                        {result.roleScores[role]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* HOW IT WORKS */}
        <section aria-labelledby="quest-how" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="rounded-2xl bg-purple-50 p-4 sm:p-6">
            <h2 id="quest-how" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
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
        <section aria-labelledby="quest-faq" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="quest-faq" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
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
        <section aria-labelledby="quest-cta" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="quest-cta" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
              {t("ctaTitle")}
            </h2>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/tomodachi-life-mbti" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
                <Lightbulb className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium text-gray-900">{t("ctaMbti")}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
              </Link>
              <Link href="/tomodachi-life-compatibility" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
                <Users className="h-5 w-5 text-indigo-500" />
                <span className="text-sm font-medium text-gray-900">{t("ctaCompat")}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
              </Link>
              <Link href="/tomodachi-life-personality-quiz" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium text-gray-900">{t("ctaQuiz")}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
              </Link>
              <Link href="/tomodachi-life-personality-chart" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-gray-900">{t("ctaChart")}</span>
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
