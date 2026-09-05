"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  ChevronDown, Sparkles, Users, Heart, Star, Shield, Dice5,
  ArrowRight, RefreshCw,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import { useState, useMemo, useCallback } from "react";
import {
  PERSONALITIES,
  ZODIAC_ORDER,
  getPersonalityGroup,
  getMbtiCode,
  type PersonalityGroup,
  type Zodiac,
} from "@/lib/types";
import {
  getGroupColor,
  getGroupPosition,
} from "@/lib/personality-data";

const BASE = "https://lifesimgrid.org";

/* ------------------------------------------------------------------ */
/*  Slider → MBTI (same logic as TomodachiLifeMbtiPage)               */
/* ------------------------------------------------------------------ */

function sliderToMbti(sliders: { movement: number; speech: number; energy: number; thinking: number }) {
  const isE = sliders.movement > 50;
  const isS = sliders.energy > 50;
  const isT = sliders.speech > 50;
  const isJ = sliders.thinking > 50;

  let group: PersonalityGroup;
  let gamePersonality: string;

  if (isE && isS && isT && isJ) { group = "outgoing"; gamePersonality = "outgoing_leader"; }
  else if (isE && isS && isT && !isJ) { group = "confident"; gamePersonality = "confident_adventurer"; }
  else if (isE && isS && !isT && isJ) { group = "outgoing"; gamePersonality = "outgoing_optimist"; }
  else if (isE && isS && !isT && !isJ) { group = "outgoing"; gamePersonality = "outgoing_entertainer"; }
  else if (isE && !isS && isT && isJ) { group = "confident"; gamePersonality = "confident_goGetter"; }
  else if (isE && !isS && isT && !isJ) { group = "confident"; gamePersonality = "confident_charmer"; }
  else if (isE && !isS && !isT && isJ) { group = "outgoing"; gamePersonality = "outgoing_trendsetter"; }
  else if (isE && !isS && !isT && !isJ) { group = "outgoing"; gamePersonality = "outgoing_trendsetter"; }
  else if (!isE && isS && isT && isJ) { group = "independent"; gamePersonality = "independent_loneWolf"; }
  else if (!isE && isS && isT && !isJ) { group = "independent"; gamePersonality = "independent_thinker"; }
  else if (!isE && isS && !isT && isJ) { group = "easygoing"; gamePersonality = "easygoing_sweetheart"; }
  else if (!isE && isS && !isT && !isJ) { group = "easygoing"; gamePersonality = "easygoing_buddy"; }
  else if (!isE && !isS && isT && isJ) { group = "confident"; gamePersonality = "confident_designer"; }
  else if (!isE && !isS && isT && !isJ) { group = "independent"; gamePersonality = "independent_freeSpirit"; }
  else if (!isE && !isS && !isT && isJ) { group = "easygoing"; gamePersonality = "easygoing_dreamer"; }
  else { group = "independent"; gamePersonality = "independent_artist"; }

  return { mbti: getMbtiCode(gamePersonality), group, gamePersonality };
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function TomodachiLifePersonalityCalculatorPage() {
  const t = useTranslations("TomodachiLifePersonalityCalculatorPage");
  const tVoice = useTranslations("VoiceLab");
  const locale = useLocale();

  const [sliders, setSliders] = useState({ movement: 50, speech: 50, energy: 50, thinking: 50 });

  const result = useMemo(() => sliderToMbti(sliders), [sliders]);

  const handleRandom = useCallback(() => {
    setSliders({
      movement: Math.floor(Math.random() * 101),
      speech: Math.floor(Math.random() * 101),
      energy: Math.floor(Math.random() * 101),
      thinking: Math.floor(Math.random() * 101),
    });
  }, []);

  const handleReset = useCallback(() => {
    setSliders({ movement: 50, speech: 50, energy: 50, thinking: 50 });
  }, []);

  function renderSlider(key: keyof typeof sliders, label: string, value: number, color: string, leftLabel: string, rightLabel: string, accent: string, accentRange: string) {
    return (
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <span className={`font-mono text-sm ${accent}`}>{value}</span>
        </div>
        <input type="range" min="0" max="100" value={value}
          onChange={(e) => setSliders({ ...sliders, [key]: parseInt(e.target.value, 10) })}
          className={`w-full h-2 ${color} rounded-lg appearance-none cursor-pointer ${accentRange}`} />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      </div>
    );
  }

  const groupColor = getGroupColor(result.group);

  /* JSON-LD */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Tomodachi Life Personality Calculator",
    url: `${BASE}/tomodachi-life-personality-calculator`,
    description: "Free Tomodachi Life personality calculator for Living the Dream. Adjust 4 sliders (Movement, Speech, Energy, Thinking) to get your Mii personality type and MBTI mapping.",
    applicationCategory: "GameApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: "LifeSimGrid" },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/<\/script/g, "<\\/script") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/<\/script/g, "<\\/script") }} />

      {/* Hero */}
      <section aria-labelledby="calculator-hero-title" className="mx-auto max-w-6xl px-4 pt-10 pb-6 text-center">
        <h1 id="calculator-hero-title" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          {t("heroTitle")}
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
          {t("heroDesc")}
        </p>
      </section>

      {/* Calculator Tool */}
      <section aria-labelledby="calculator-tool-title" className="mx-auto max-w-6xl px-4 py-6">
        <h2 id="calculator-tool-title" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          {t("toolTitle")}
        </h2>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Sliders */}
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{t("slidersTitle")}</h3>
              <div className="flex gap-2">
                <button onClick={handleRandom} className="rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-all hover:bg-gray-200 flex items-center gap-1">
                  <Dice5 className="w-3.5 h-3.5" /> {t("randomBtn")}
                </button>
                <button onClick={handleReset} className="rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-all hover:bg-gray-200 flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5" /> {t("resetBtn")}
                </button>
              </div>
            </div>
            <div className="space-y-5">
              {renderSlider("movement", t("slider1Title"), sliders.movement, "bg-amber-200", t("sliderSlowI"), t("sliderFastE"), "text-amber-600", "accent-amber-600")}
              {renderSlider("speech", t("slider2Title"), sliders.speech, "bg-red-200", t("sliderGentleF"), t("sliderDirectT"), "text-red-600", "accent-red-600")}
              {renderSlider("energy", t("slider3Title"), sliders.energy, "bg-purple-200", t("sliderImaginativeN"), t("sliderPracticalS"), "text-purple-600", "accent-purple-600")}
              {renderSlider("thinking", t("slider4Title"), sliders.thinking, "bg-green-200", t("sliderFlexibleP"), t("sliderStructuredJ"), "text-green-600", "accent-green-600")}
            </div>
          </div>

          {/* Result */}
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">{t("resultTitle")}</h3>
            <div className="rounded-xl p-6 text-center" style={{ backgroundColor: groupColor + "0a", borderColor: groupColor + "40" }}>
              <div className="mb-3">
                <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: groupColor + "20", color: groupColor }}>
                  {tVoice(`grid${result.group.charAt(0).toUpperCase() + result.group.slice(1)}`)}
                </span>
              </div>
              <div className="font-mono text-3xl sm:text-4xl font-bold mb-2" style={{ color: groupColor }}>
                {result.mbti}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {tVoice(`personalities.${result.gamePersonality}`)}
              </div>
              <div className="text-sm text-gray-500">
                {t("groupLabel")}: {tVoice(`grid${result.group.charAt(0).toUpperCase() + result.group.slice(1)}`)}
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Link href="/tomodachi-life-mbti" className="flex items-center justify-center gap-1 rounded-lg bg-gray-100 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200">
                <ArrowRight className="w-4 h-4" /> {t("ctaChart")}
              </Link>
              <Link href="/tomodachi-life-personality-chart" className="flex items-center justify-center gap-1 rounded-lg bg-gray-100 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200">
                <Users className="w-4 h-4" /> {t("ctaCompare")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section aria-labelledby="calculator-disclaimer-title" className="mx-auto max-w-6xl px-4 py-4">
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
          <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 id="calculator-disclaimer-title" className="text-sm font-semibold text-amber-900 mb-1">{t("disclaimerTitle")}</h3>
            <p className="text-xs text-amber-800">{t("disclaimerText")}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="calculator-faq-title" className="mx-auto max-w-6xl px-4 py-8">
        <h2 id="calculator-faq-title" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
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
