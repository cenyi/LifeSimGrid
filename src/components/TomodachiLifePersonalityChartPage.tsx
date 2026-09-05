"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  Shield, ArrowRight, Users, Star, Heart,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import {
  PERSONALITIES,
  getPersonalityGroup,
  getMbtiCode,
  type PersonalityGroup,
} from "@/lib/types";
import {
  getGroupColor,
  PERSONALITY_GROUPS,
  getGroupLabelKey,
  getPersonalityLabelKey,
  getFanReasonKey,
} from "@/lib/personality-data";

const BASE = "https://lifesimgrid.org";

/* ------------------------------------------------------------------ */
/*  Helper: personality slug (e.g. "outgoing_leader" → "leader")      */
/* ------------------------------------------------------------------ */

function getPersonalitySlug(personality: string): string {
  const parts = personality.split("_");
  return parts.length >= 2 ? parts[1] : personality;
}

/* ------------------------------------------------------------------ */
/*  Group metadata                                                     */
/* ------------------------------------------------------------------ */

interface GroupMeta {
  key: PersonalityGroup;
  color: string;
  labelKey: string;
}

const GROUP_META: GroupMeta[] = PERSONALITY_GROUPS.map((g) => ({
  key: g,
  color: getGroupColor(g),
  labelKey: getGroupLabelKey(g),
}));

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function TomodachiLifePersonalityChartPage() {
  const t = useTranslations("TomodachiLifePersonalityChartPage");
  const tVoice = useTranslations("VoiceLab");
  const tMbti = useTranslations("TomodachiLifeMbtiPage");
  const locale = useLocale();

  /* ---- Build personality rows grouped by group ---- */
  const groupedPersonalities = GROUP_META.map((gm) => ({
    ...gm,
    personalities: PERSONALITIES.filter((p) => getPersonalityGroup(p) === gm.key),
  }));

  /* ---- JSON-LD: WebApplication ---- */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Tomodachi Life Personality Chart",
    url: `${BASE}/tomodachi-life-personality-chart`,
    description:
      "Complete Tomodachi Life personality chart with all 16 types. See group, MBTI mapping, traits, and house colors for every personality in Living the Dream.",
    applicationCategory: "GameApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: "LifeSimGrid" },
  };

  /* ---- JSON-LD: FAQPage ---- */
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

  /* ---- JSON-LD: BreadcrumbList ---- */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}${locale === "en" ? "/" : `/${locale}/`}` },
      { "@type": "ListItem", position: 2, name: t("pageTitle"), item: `${BASE}${locale === "en" ? "/tomodachi-life-personality-chart" : `/${locale}/tomodachi-life-personality-chart`}` },
    ],
  };

  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/<\/script/g, "<\\/script") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/<\/script/g, "<\\/script") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/<\/script/g, "<\\/script") }} />

      {/* Hero */}
      <section aria-labelledby="personality-chart-hero-title" className="mx-auto max-w-6xl px-4 pt-10 pb-6 text-center">
        <h1 id="personality-chart-hero-title" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          {t("heroTitle")}
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
          {t("heroDesc")}
        </p>
      </section>

      {/* Chart Table */}
      <section aria-labelledby="personality-chart-table-title" className="mx-auto max-w-6xl px-4 py-6">
        <h2 id="personality-chart-table-title" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          {t("tableTitle")}
        </h2>

        {/* Desktop table (hidden on mobile) */}
        <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">{t("colGroup")}</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">{t("colPersonality")}</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">{t("colMbti")}</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">{t("colTraits")}</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">{t("colAction")}</th>
              </tr>
            </thead>
            <tbody>
              {groupedPersonalities.map((grp) =>
                grp.personalities.map((p, idx) => {
                  const slug = getPersonalitySlug(p);
                  const mbti = getMbtiCode(p);
                  const labelKey = getPersonalityLabelKey(p);
                  const traitsKey = `traits${labelKey.replace("personality", "")}`;
                  const href = `/tomodachi-life-personality/${slug}`;
                  const isGroupStart = idx === 0;
                  return (
                    <tr key={p} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      {isGroupStart ? (
                        <td rowSpan={grp.personalities.length} className="px-4 py-3 align-top">
                          <span
                            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
                            style={{ backgroundColor: grp.color + "20", color: grp.color }}
                          >
                            {tMbti(`group${grp.key.charAt(0).toUpperCase() + grp.key.slice(1)}`)}
                          </span>
                        </td>
                      ) : null}
                      <td className="px-4 py-3 font-medium text-gray-900">{tMbti(labelKey)}</td>
                      <td className="px-4 py-3">
                        <span className="font-mono font-bold text-gray-700">{mbti}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{tMbti(traitsKey)}</td>
                      <td className="px-4 py-3">
                        <Link
                          href={href}
                          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800"
                        >
                          {t("viewDetail")} <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {groupedPersonalities.map((grp) => (
            <div key={grp.key} className="rounded-xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="px-4 py-2 text-sm font-semibold" style={{ backgroundColor: grp.color + "15", color: grp.color }}>
                {tMbti(`group${grp.key.charAt(0).toUpperCase() + grp.key.slice(1)}`)}
              </div>
              <div className="divide-y divide-gray-100">
                {grp.personalities.map((p) => {
                  const slug = getPersonalitySlug(p);
                  const mbti = getMbtiCode(p);
                  const labelKey = getPersonalityLabelKey(p);
                  const traitsKey = `traits${labelKey.replace("personality", "")}`;
                  const href = `/tomodachi-life-personality/${slug}`;
                  return (
                    <Link key={p} href={href} className="block px-4 py-3 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900 text-sm">{tMbti(labelKey)}</span>
                        <span className="font-mono font-bold text-gray-700 text-sm">{mbti}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{tMbti(traitsKey)}</p>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600">
                        {t("viewDetail")} <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Group Overview */}
      <section aria-labelledby="personality-chart-groups-title" className="mx-auto max-w-6xl px-4 py-6">
        <h2 id="personality-chart-groups-title" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          {t("groupsTitle")}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {groupedPersonalities.map((grp) => (
            <div key={grp.key} className="rounded-xl border border-gray-100 p-4 shadow-sm" style={{ borderColor: grp.color + "30" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: grp.color }} />
                <span className="font-semibold text-gray-900 text-sm">
                  {tMbti(`group${grp.key.charAt(0).toUpperCase() + grp.key.slice(1)}`)}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {t(`groupDesc_${grp.key}`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section aria-labelledby="personality-chart-disclaimer-title" className="mx-auto max-w-6xl px-4 py-4">
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
          <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 id="personality-chart-disclaimer-title" className="text-sm font-semibold text-amber-900 mb-1">{t("disclaimerTitle")}</h3>
            <p className="text-xs text-amber-800">{t("disclaimerText")}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="personality-chart-cta-title" className="mx-auto max-w-6xl px-4 py-6">
        <h2 id="personality-chart-cta-title" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          {t("ctaTitle")}
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link href="/tomodachi-life-personality-calculator" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
            <Star className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium text-gray-900">{t("ctaCalculator")}</span>
          </Link>
          <Link href="/tomodachi-life-mbti" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
            <Heart className="w-5 h-5 text-red-400" />
            <span className="text-sm font-medium text-gray-900">{t("ctaMbti")}</span>
          </Link>
          <Link href="/tomodachi-island-planner" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
            <Users className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-gray-900">{t("ctaIsland")}</span>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="personality-chart-faq-title" className="mx-auto max-w-6xl px-4 py-8">
        <h2 id="personality-chart-faq-title" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          {t("faqTitle")}
        </h2>
        <div className="space-y-3">
          {[
            { q: t("faq1Q"), a: t("faq1A") },
            { q: t("faq2Q"), a: t("faq2A") },
            { q: t("faq3Q"), a: t("faq3A") },
            { q: t("faq4Q"), a: t("faq4A") },
          ].map((faq, i) => (
            <details key={i} className="rounded-lg border border-gray-200 bg-white p-4">
              <summary className="cursor-pointer font-medium text-gray-900 text-sm">{faq.q}</summary>
              <p className="mt-2 text-sm text-gray-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
