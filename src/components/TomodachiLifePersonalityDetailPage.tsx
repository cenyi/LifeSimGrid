"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  Shield, ArrowRight, Star, Heart, Users, Sparkles, Dice5,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import {
  PERSONALITIES,
  getPersonalityGroup,
  getMbtiCode,
} from "@/lib/types";
import {
  getGroupColor,
  getPersonalityLabelKey,
} from "@/lib/personality-data";

const BASE = "https://lifesimgrid.org";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Extracts the sub-type slug from a full personality key. */
export function getPersonalitySlug(personality: string): string {
  const parts = personality.split("_");
  return parts.length >= 2 ? parts[1] : personality;
}

/** Finds the full personality key from a slug (e.g. "leader" → "outgoing_leader"). */
export function getPersonalityFromSlug(slug: string): string | undefined {
  return PERSONALITIES.find((p) => getPersonalitySlug(p) === slug);
}

/** Gets the slider tendency for a personality (reverse-engineered from sliderToMbti). */
function getSliderTendency(personality: string): {
  movement: string;
  speech: string;
  energy: string;
  thinking: string;
} {
  const mbti = getMbtiCode(personality);
  return {
    movement: mbti[0] === "E" ? "Fast (E)" : "Slow (I)",
    speech: mbti[2] === "T" ? "Direct (T)" : "Gentle (F)",
    energy: mbti[1] === "S" ? "Practical (S)" : "Imaginative (N)",
    thinking: mbti[3] === "J" ? "Structured (J)" : "Flexible (P)",
  };
}

/** Gets compatible personality groups for romance and friendship. */
function getCompatibilityInfo(group: string): { romance: string[]; friendship: string[] } {
  const complementary: Record<string, string[]> = {
    outgoing: ["independent"],
    confident: ["easygoing"],
    independent: ["outgoing"],
    easygoing: ["confident"],
  };
  return {
    romance: complementary[group] || [],
    friendship: [group], // same group = best friendship
  };
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function TomodachiLifePersonalityDetailPage({
  personalitySlug,
}: {
  personalitySlug: string;
}) {
  const t = useTranslations("TomodachiLifePersonalityDetailPage");
  const tMbti = useTranslations("TomodachiLifeMbtiPage");
  const tVoice = useTranslations("VoiceLab");
  const locale = useLocale();

  const personality = getPersonalityFromSlug(personalitySlug);

  // Fallback to first personality if not found
  const validPersonality = personality ?? PERSONALITIES[0];
  const group = getPersonalityGroup(validPersonality);
  const mbti = getMbtiCode(validPersonality);
  const groupColor = getGroupColor(group);
  const labelKey = getPersonalityLabelKey(validPersonality);
  const traitsKey = `traits${labelKey.replace("personality", "")}`;
  const fanReasonKey = `fanReason${labelKey.replace("personality", "")}`;
  const slider = getSliderTendency(validPersonality);
  const compat = getCompatibilityInfo(group);
  const personalityName = tMbti(labelKey);
  const groupName = tMbti(`group${group.charAt(0).toUpperCase() + group.slice(1)}`);

  /* JSON-LD: FAQPage */
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

  /* JSON-LD: WebApplication */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${personalityName} — Tomodachi Life Personality`,
    url: `${BASE}${locale === "en" ? "" : `/${locale}`}/tomodachi-life-personality/${personalitySlug}`,
    description: `${personalityName} (${mbti}) personality type in Tomodachi Life: Living the Dream. Group: ${groupName}. Traits, slider settings, and compatibility info.`,
    applicationCategory: "GameApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: "LifeSimGrid" },
  };

  /* JSON-LD: BreadcrumbList */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}${locale === "en" ? "/" : `/${locale}/`}` },
      { "@type": "ListItem", position: 2, name: "Personality Chart", item: `${BASE}${locale === "en" ? "/tomodachi-life-personality-chart" : `/${locale}/tomodachi-life-personality-chart`}` },
      { "@type": "ListItem", position: 3, name: personalityName, item: `${BASE}${locale === "en" ? "" : `/${locale}`}/tomodachi-life-personality/${personalitySlug}` },
    ],
  };

  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/<\/script/g, "<\\/script") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/<\/script/g, "<\\/script") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/<\/script/g, "<\\/script") }} />

      {/* Hero */}
      <section aria-labelledby="personality-detail-hero-title" className="mx-auto max-w-6xl px-4 pt-10 pb-6">
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gray-700">{t("navHome")}</Link>
          <span>/</span>
          <Link href="/tomodachi-life-personality-chart" className="hover:text-gray-700">{t("navChart")}</Link>
          <span>/</span>
          <span className="text-gray-700">{personalityName}</span>
        </nav>
        <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: groupColor + "0a", borderColor: groupColor + "40" }}>
          <div className="mb-3">
            <span
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
              style={{ backgroundColor: groupColor + "20", color: groupColor }}
            >
              {groupName}
            </span>
          </div>
          <h1 id="personality-detail-hero-title" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {personalityName}
          </h1>
          <div className="font-mono text-2xl sm:text-3xl font-bold" style={{ color: groupColor }}>
            {mbti}
          </div>
          <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto">
            {tMbti(traitsKey)}
          </p>
        </div>
      </section>

      {/* Slider Tendency */}
      <section aria-labelledby="personality-detail-slider-title" className="mx-auto max-w-6xl px-4 py-6">
        <h2 id="personality-detail-slider-title" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          {t("sliderTitle")}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: t("sliderMovement"), value: slider.movement },
            { label: t("sliderSpeech"), value: slider.speech },
            { label: t("sliderEnergy"), value: slider.energy },
            { label: t("sliderThinking"), value: slider.thinking },
          ].map((s, i) => (
            <div key={i} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className="font-mono text-sm font-bold text-gray-900">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Compatibility Info */}
      <section aria-labelledby="personality-detail-compat-title" className="mx-auto max-w-6xl px-4 py-6">
        <h2 id="personality-detail-compat-title" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          {t("compatTitle")}
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-red-100 bg-red-50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-red-900 text-sm">{t("compatRomance")}</h3>
            </div>
            <p className="text-sm text-red-700">
              {compat.romance.length > 0
                ? t("compatRomanceDesc").replace("{group}", compat.romance.map((g) => tMbti(`group${g.charAt(0).toUpperCase() + g.slice(1)}`)).join(", "))
                : t("compatRomanceNone")}
            </p>
          </div>
          <div className="rounded-xl border border-green-100 bg-green-50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-green-500" />
              <h3 className="font-semibold text-green-900 text-sm">{t("compatFriendship")}</h3>
            </div>
            <p className="text-sm text-green-700">
              {t("compatFriendshipDesc").replace("{group}", compat.friendship.map((g) => tMbti(`group${g.charAt(0).toUpperCase() + g.slice(1)}`)).join(", "))}
            </p>
          </div>
        </div>
      </section>

      {/* Fan Reason */}
      <section aria-labelledby="personality-detail-fan-title" className="mx-auto max-w-6xl px-4 py-6">
        <h2 id="personality-detail-fan-title" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          {t("fanTitle")}
        </h2>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 text-sm mb-2">{t("fanReasonTitle")}</h3>
              <p className="text-sm text-gray-600">{tMbti(fanReasonKey)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section aria-labelledby="personality-detail-disclaimer-title" className="mx-auto max-w-6xl px-4 py-4">
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
          <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 id="personality-detail-disclaimer-title" className="text-sm font-semibold text-amber-900 mb-1">{t("disclaimerTitle")}</h3>
            <p className="text-xs text-amber-800">{t("disclaimerText")}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="personality-detail-faq-title" className="mx-auto max-w-6xl px-4 py-6">
        <h2 id="personality-detail-faq-title" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          {t("faqTitle")}
        </h2>
        <div className="space-y-3">
          {["faq1", "faq2", "faq3", "faq4"].map((key) => (
            <details key={key} className="rounded-lg border border-gray-200 bg-white p-4">
              <summary className="cursor-pointer list-item">
                <h4 className="inline text-sm font-semibold text-gray-900">{t(`${key}Q` as const)}</h4>
              </summary>
              <p className="mt-2 text-sm text-gray-600">{t(`${key}A` as const)}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="personality-detail-cta-title" className="mx-auto max-w-6xl px-4 py-6">
        <h2 id="personality-detail-cta-title" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          {t("ctaTitle")}
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link href="/tomodachi-life-personality-calculator" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
            <Star className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium text-gray-900">{t("ctaCalculator")}</span>
          </Link>
          <Link href="/tomodachi-life-personality-chart" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
            <ArrowRight className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-900">{t("ctaChart")}</span>
          </Link>
          <Link href="/tomodachi-life-mbti" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
            <Heart className="w-5 h-5 text-red-400" />
            <span className="text-sm font-medium text-gray-900">{t("ctaMbti")}</span>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
