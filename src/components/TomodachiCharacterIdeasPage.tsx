"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  ChevronDown, Dice5, RefreshCw, Sparkles, Star, Shield,
  Plus,
} from "lucide-react";
// VoiceLab namespace provides zodiac translations
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import { useState, useCallback, useMemo } from "react";
import {
  getPersonalityGroup,
  getMbtiCode,
  type Zodiac,
} from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BASE = "https://lifesimgrid.org";

const PERSONALITIES = [
  "outgoing_leader", "outgoing_entertainer", "outgoing_trendsetter", "outgoing_optimist",
  "confident_designer", "confident_adventurer", "confident_goGetter", "confident_charmer",
  "independent_artist", "independent_freeSpirit", "independent_thinker", "independent_loneWolf",
  "easygoing_dreamer", "easygoing_sweetheart", "easygoing_softie", "easygoing_buddy",
] as const;

const ZODIACS: Zodiac[] = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
];

const VOICE_PITCHES = ["high", "medium", "low"] as const;
const VOICE_SPEEDS = ["fast", "normal", "slow"] as const;

const ARCHETYPE_KEYS = [
  "archetype_hero", "archetype_rival", "archetype_mentor", "archetype_trickster",
  "archetype_caregiver", "archetype_rebel", "archetype_sage", "archetype_creator",
  "archetype_explorer", "archetype_entertainer", "archetype_guardian", "archetype_dreamer",
] as const;

const APPEARANCE_KEYS = [
  "appearance_0", "appearance_1", "appearance_2", "appearance_3", "appearance_4",
  "appearance_5", "appearance_6", "appearance_7", "appearance_8", "appearance_9",
] as const;

interface CharacterIdea {
  personality: string;
  zodiac: Zodiac;
  voicePitch: string;
  voiceSpeed: string;
  nameEn: string;
  archetypeKey: string;
  appearanceKey: string;
}

/* ------------------------------------------------------------------ */
/*  Name pools for generation                                          */
/* ------------------------------------------------------------------ */

const NAME_PREFIXES = ["Aki", "Bella", "Coco", "Daiki", "Emi", "Finn", "Gina", "Hiro", "Iris", "Jin", "Kira", "Leo", "Mika", "Nova", "Oli", "Pia", "Quinn", "Ren", "Sora", "Taro", "Uma", "Vex", "Wren", "Xio", "Yuki", "Zara"];
const NAME_SUFFIXES = ["-kun", "-chan", "", " the Brave", " Star", " Moon", " Heart", " Spirit", " Dream", " Cloud", " Wave", " Leaf"];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function randomFrom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateCharacterIdea(): CharacterIdea {
  return {
    personality: randomFrom(PERSONALITIES),
    zodiac: randomFrom(ZODIACS),
    voicePitch: randomFrom(VOICE_PITCHES),
    voiceSpeed: randomFrom(VOICE_SPEEDS),
    nameEn: randomFrom(NAME_PREFIXES) + randomFrom(NAME_SUFFIXES),
    archetypeKey: randomFrom(ARCHETYPE_KEYS),
    appearanceKey: randomFrom(APPEARANCE_KEYS),
  };
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function TomodachiCharacterIdeasPage() {
  const t = useTranslations("TomodachiCharacterIdeasPage");
  const tVoice = useTranslations("VoiceLab");
  const locale = useLocale();

  const [idea, setIdea] = useState<CharacterIdea>(() => generateCharacterIdea());
  const [saved, setSaved] = useState<CharacterIdea[]>([]);

  const handleGenerate = useCallback(() => {
    setIdea(generateCharacterIdea());
  }, []);

  const handleSave = useCallback(() => {
    setSaved((prev) => [...prev, idea].slice(-8));
  }, [idea]);

  const handleClearSaved = useCallback(() => {
    setSaved([]);
  }, []);

  /* ---- Personality display helpers ---- */
  const groupColors: Record<string, string> = {
    outgoing: "bg-amber-50 border-amber-200 text-amber-700",
    confident: "bg-red-50 border-red-200 text-red-700",
    independent: "bg-purple-50 border-purple-200 text-purple-700",
    easygoing: "bg-green-50 border-green-200 text-green-700",
  };
  const groupBadgeColors: Record<string, string> = {
    outgoing: "bg-amber-100 text-amber-700",
    confident: "bg-red-100 text-red-700",
    independent: "bg-purple-100 text-purple-700",
    easygoing: "bg-green-100 text-green-700",
  };
  const getGroupColor = (group: string) => groupColors[group] || groupColors.outgoing;
  const getGroupBadge = (group: string) => groupBadgeColors[group] || groupBadgeColors.outgoing;

  const currentGroup = getPersonalityGroup(idea.personality);
  const currentMbti = getMbtiCode(idea.personality);

  /* ---- FAQ data ---- */
  const faqs = useMemo(() => [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
    { q: t("faq5Q"), a: t("faq5A") },
    { q: t("faq6Q"), a: t("faq6A") },
    { q: t("faq7Q"), a: t("faq7A") },
    { q: t("faq8Q"), a: t("faq8A") },
  ], [t]);

  const localePath = locale === "en" ? "" : `/${locale}`;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* ===== JSON-LD: WebApplication ===== */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Tomodachi Life Character Ideas Generator",
          applicationCategory: "GameUtilityApplication",
          operatingSystem: "Any (Browser-based)",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description: t("metaDescription"),
          url: `${BASE}${localePath}/tomodachi-character-ideas`,
        }).replace(/<\/script/g, "<\\/script") }} />
        {/* ===== JSON-LD: BreadcrumbList ===== */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "LifeSimGrid", item: `${BASE}${localePath || "/"}` },
            { "@type": "ListItem", position: 2, name: t("heroBadge"), item: `${BASE}${localePath}/tomodachi-character-ideas` },
          ],
        }).replace(/<\/script/g, "<\\/script") }} />
        {/* ===== JSON-LD: HowTo ===== */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: t("howToTitle"),
          step: [
            { "@type": "HowToStep", text: t("howToStep1") },
            { "@type": "HowToStep", text: t("howToStep2") },
            { "@type": "HowToStep", text: t("howToStep3") },
            { "@type": "HowToStep", text: t("howToStep4") },
          ],
        }).replace(/<\/script/g, "<\\/script") }} />
        {/* ===== JSON-LD: FAQPage ===== */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }).replace(/<\/script/g, "<\\/script") }} />

        {/* ===== HERO ===== */}
        <section aria-labelledby="char-hero" className="mx-auto max-w-6xl px-4 pt-8 pb-4 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-4 py-1.5 text-xs font-medium text-purple-700">
            <Sparkles className="h-3.5 w-3.5" />
            {t("heroBadge")}
          </div>
          <h1 id="char-hero" className="font-mono text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {t("heroTitle")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
            {t("heroSubtitle")}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700"><Dice5 className="inline h-3 w-3 mr-1" />{t("heroTag1")}</span>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700"><Star className="inline h-3 w-3 mr-1" />{t("heroTag2")}</span>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"><Shield className="inline h-3 w-3 mr-1" />{t("heroTag3")}</span>
          </div>
        </section>

        {/* ===== Privacy Badge ===== */}
        <div className="mx-auto max-w-4xl px-4 pb-4">
          <div className="rounded-xl bg-purple-50 p-3 text-center text-xs text-purple-700 sm:text-sm">
            {t("privacyBadge")}
          </div>
        </div>

        {/* ===== CHARACTER GENERATOR TOOL ===== */}
        <section aria-labelledby="char-generator" className="mx-auto max-w-4xl px-4 py-4 sm:py-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="char-generator" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-2">{t("generatorTitle")}</h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{t("generatorDesc")}</p>

            {/* Generated Character Card */}
            <div className={`rounded-2xl border-2 p-5 sm:p-6 ${getGroupColor(currentGroup)}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="font-mono text-3xl sm:text-4xl font-bold" style={{ color: currentGroup === "outgoing" ? "#f59e0b" : currentGroup === "confident" ? "#ef4444" : currentGroup === "independent" ? "#8b5cf6" : "#22c55e" }}>{currentMbti}</span>
                  <h3 className="mt-1 font-semibold text-gray-900 text-base sm:text-lg">{t(`personality_${idea.personality.split("_")[1]}` as never)}</h3>
                  <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getGroupBadge(currentGroup)}`}>
                    {t(`group_${currentGroup}` as never)}
                  </span>
                </div>
                <span className="rounded-lg bg-white/80 px-3 py-1 text-xs font-medium text-gray-600">{t(idea.archetypeKey as never)}</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-white/70 p-3">
                  <p className="text-xs font-semibold text-gray-500 mb-1">{t("cardName")}</p>
                  <p className="text-sm font-medium text-gray-900">{idea.nameEn}</p>
                </div>
                <div className="rounded-xl bg-white/70 p-3">
                  <p className="text-xs font-semibold text-gray-500 mb-1">{t("cardZodiac")}</p>
                  <p className="text-sm font-medium text-gray-900">{tVoice(`zodiacs.${idea.zodiac}` as never)}</p>
                </div>
                <div className="rounded-xl bg-white/70 p-3">
                  <p className="text-xs font-semibold text-gray-500 mb-1">{t("cardVoice")}</p>
                  <p className="text-sm font-medium text-gray-900">{t(`voicePitch_${idea.voicePitch}` as never)} · {t(`voiceSpeed_${idea.voiceSpeed}` as never)}</p>
                </div>
                <div className="rounded-xl bg-white/70 p-3">
                  <p className="text-xs font-semibold text-gray-500 mb-1">{t("cardAppearance")}</p>
                  <p className="text-sm font-medium text-gray-900">{t(idea.appearanceKey as never)}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-wrap gap-2">
                <button onClick={handleGenerate} className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:shadow-md active:scale-95">
                  <RefreshCw className="h-4 w-4" /> {t("generateBtn")}
                </button>
                <button onClick={handleSave} className="flex items-center gap-1.5 rounded-xl bg-white/80 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-white active:scale-95">
                  <Plus className="h-4 w-4" /> {t("saveBtn")}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SAVED IDEAS ===== */}
        {saved.length > 0 && (
          <section aria-labelledby="char-saved" className="mx-auto max-w-4xl px-4 pb-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 id="char-saved" className="font-mono text-base sm:text-lg font-bold text-gray-900">{t("savedTitle")} ({saved.length})</h2>
                <button onClick={handleClearSaved} className="text-xs text-gray-400 hover:text-red-500 transition-colors">{t("clearSaved")}</button>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {saved.map((s, i) => {
                  const sGroup = getPersonalityGroup(s.personality);
                  const sMbti = getMbtiCode(s.personality);
                  return (
                    <div key={i} className={`flex items-center gap-3 rounded-xl border p-3 ${getGroupColor(sGroup)}`}>
                      <span className="font-mono text-sm font-bold">{sMbti}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{s.nameEn}</p>
                        <p className="text-xs text-gray-500 truncate">{tVoice(`zodiacs.${s.zodiac}` as never)} · {t(s.archetypeKey as never)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ===== HOW TO USE ===== */}
        <section aria-labelledby="char-how-to" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="rounded-2xl bg-purple-50 p-4 sm:p-6">
            <h2 id="char-how-to" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">{t("howToTitle")}</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li className="leading-relaxed">{t("howToStep1")}</li>
              <li className="leading-relaxed">{t("howToStep2")}</li>
              <li className="leading-relaxed">{t("howToStep3")}</li>
              <li className="leading-relaxed">{t("howToStep4")}</li>
            </ol>
          </div>
        </section>

        {/* ===== WHY CHOOSE ===== */}
        <section aria-labelledby="char-why" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <h2 id="char-why" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">{t("whyChooseTitle")}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600"><Dice5 className="h-4 w-4" /></div>
              <h3 className="font-mono text-sm font-bold text-gray-900 mb-1">{t("whyChoose1Title")}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{t("whyChoose1Desc")}</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Star className="h-4 w-4" /></div>
              <h3 className="font-mono text-sm font-bold text-gray-900 mb-1">{t("whyChoose2Title")}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{t("whyChoose2Desc")}</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-600"><Shield className="h-4 w-4" /></div>
              <h3 className="font-mono text-sm font-bold text-gray-900 mb-1">{t("whyChoose3Title")}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{t("whyChoose3Desc")}</p>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section aria-labelledby="char-faq" className="mx-auto max-w-6xl px-4 pb-6 sm:pb-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="char-faq" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-4">{t("faqTitle")}</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="group rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
                  <summary className="flex cursor-pointer items-center justify-between p-3 sm:p-4 hover:bg-gray-100 transition-colors">
                    <h4 className="pr-4 text-sm font-semibold text-gray-800">{faq.q}</h4>
                    <ChevronDown className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Disclaimer ===== */}
        <section className="mx-auto max-w-6xl px-4 pb-4 sm:pb-6">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs leading-relaxed text-gray-500">{t("mbtiDisclaimer")}</p>
          </div>
        </section>

        {/* ===== Related Tools ===== */}
        <section aria-labelledby="char-related" className="mx-auto max-w-6xl px-4 pb-4 sm:pb-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="char-related" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-4">{t("relatedTitle")}</h2>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <Link href="/tomodachi-life-mbti" className="rounded-xl bg-indigo-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-indigo-800 text-sm">{t("relatedMbti")}</h3>
              </Link>
              <Link href="/mii-qr-unlocker" className="rounded-xl bg-blue-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-blue-800 text-sm">{t("relatedMiiQr")}</h3>
              </Link>
              <Link href="/tomodachi-voice-lab" className="rounded-xl bg-purple-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-purple-800 text-sm">{t("relatedVoiceLab")}</h3>
              </Link>
              <Link href="/tomodachi-island-planner" className="rounded-xl bg-teal-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-teal-800 text-sm">{t("relatedIslandPlanner")}</h3>
              </Link>
              <Link href="/tomodachi-apartment-design" className="rounded-xl bg-sky-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-sky-800 text-sm">{t("relatedApartment")}</h3>
              </Link>
              <Link href="/tomodachi-clothes-template" className="rounded-xl bg-pink-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-pink-800 text-sm">{t("relatedClothes")}</h3>
              </Link>
              <Link href="/mii-eyes" className="rounded-xl bg-indigo-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-indigo-800 text-sm">{t("relatedMiiEyes")}</h3>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
