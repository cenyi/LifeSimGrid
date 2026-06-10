import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import TomodachiVoiceLabPage from "@/components/TomodachiVoiceLabPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** Localized page titles for Tomodachi Voice Lab (template appends " - LifeSimGrid"). */
const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "Tomodachi 聲音計算器與相容性檢查",
  ja: "トモダチコレクション 声計算機＆相性チェッカー",
  es: "Calculadora de voz Tomodachi Life",
  fr: "Calculateur de voix Tomodachi Life",
  ko: "Tomodachi Life 음성 계산기",
  de: "Tomodachi Life Sprachrechner",
  it: "Calcolatore voce Tomodachi Life",
  nl: "Tomodachi Life stemcalculator",
  "zh-CN": "Tomodachi 声音计算器与相性检查",
};

/** Localized page descriptions for Tomodachi Voice Lab. */
const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "免費線上工具：8-bit 語音合成器、性格矩陣指南與相容性計算器。計算 Mii 之間的戀愛與友誼評分。",
  ja: "無料オンラインツール：8ビット音声合成、パーソナリティマトリクスガイド、相性チェッカー。Mii間の恋愛・友情度を計算。",
  es: "Herramientas gratuitas: sintetizador de voz 8-bit, guía de matriz de personalidad y calculadora de compatibilidad.",
  fr: "Outils gratuits : synthétiseur vocal 8-bit, guide de matrice de personnalité et calculateur de compatibilité.",
  ko: "무료 도구: 8비트 음성 합성기, 성격 매트릭스 가이드 및 궁합 계산기. Mii 간 로맨스 및 우정 평가.",
  de: "Kostenlose Tools: 8-Bit-Sprachsynthesizer, Persönlichkeitsmatrix-Leitfaden und Kompatibilitätsrechner.",
  it: "Strumenti gratuiti: sintetizzatore vocale 8-bit, guida alla matrice di personalità e calcolatore di compatibilità.",
  nl: "Gratis tools: 8-bit stemsynthesizer, persoonlijkheidsmatrixgids en compatibiliteitscalculator.",
  "zh-CN": "免费在线工具：8-bit 语音合成器、性格矩阵指南与相性计算器。计算 Mii 之间的恋爱与友谊评分。",
};

const FALLBACK_TITLE = "Tomodachi Life Voice Calculator";
const FALLBACK_DESC =
  "Free online Tomodachi Life tools: 8-bit voice synthesizer, personality matrix guide, and compatibility calculator. Calculate romance and friendship ratings between Miis.";

/** Generate metadata for the localized Tomodachi Voice Lab page. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "tomodachi-voice-lab";
  return {
    title: PAGE_TITLES[locale] || FALLBACK_TITLE,
    description: PAGE_DESCS[locale] || FALLBACK_DESC,
    alternates: {
      canonical: locale === "en" ? `${BASE}/${path}` : `${BASE}/${locale}/${path}`,
      languages: {
        "x-default": `${BASE}/${path}`,
        en: `${BASE}/${path}`,
        "zh-Hant": `${BASE}/zh-Hant/${path}`,
        ja: `${BASE}/ja/${path}`,
        es: `${BASE}/es/${path}`,
        fr: `${BASE}/fr/${path}`,
        ko: `${BASE}/ko/${path}`,
        de: `${BASE}/de/${path}`,
        it: `${BASE}/it/${path}`,
        nl: `${BASE}/nl/${path}`,
        "zh-CN": `${BASE}/zh-CN/${path}`,
      },
    },
  };
}

/** Locale-level Tomodachi Voice Lab page rendered at /{locale}/tomodachi-voice-lab. */
export default async function LocaleTomodachiVoiceLabPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "zh-Hant" | "ja" | "es" | "fr" | "ko" | "de" | "it" | "nl" | "zh-CN")) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiVoiceLabPage />;
}
