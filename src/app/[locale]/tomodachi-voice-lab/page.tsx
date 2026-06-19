import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import TomodachiVoiceLabPage from "@/components/TomodachiVoiceLabPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** Localized page titles for Tomodachi Voice Lab (template appends " - LifeSimGrid"). */
const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "Tomodachi 聲音實驗室 - 8-bit Mii 語音合成器",
  ja: "トモダチコレクション 声ラボ - 8ビットMii音声シンセサイザー",
  es: "Tomodachi Life Voice Lab - Sintetizador de Voz Mii 8-Bit",
  fr: "Tomodachi Life Voice Lab - Synthétiseur Vocal Mii 8-Bit",
  ko: "Tomodachi Life 음성 실험실 - 8비트 Mii 음성 합성기",
  de: "Tomodachi Life Voice Lab - 8-Bit Mii-Sprachsynthesizer",
  it: "Tomodachi Life Voice Lab - Sintetizzatore Vocale Mii 8-Bit",
  nl: "Tomodachi Life Voice Lab - 8-Bit Mii-stemsynthesizer",
  "zh-CN": "Tomodachi 声音实验室 - 8-bit Mii 语音合成器",
};

/** Localized page descriptions for Tomodachi Voice Lab. */
const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "免費線上 Tomodachi Life 語音合成器。使用5種預設、自訂音高和語速控制，以及文字轉語音模擬來合成8-bit Mii語音。",
  ja: "無料オンライン トモダチコレクション 音声シンセサイザー。5つのプリセット、カスタムピッチとスピードコントロール、テキスト読み上げシミュレーションで8ビットMii音声を合成。",
  es: "Sintetizador de voz gratuito de Tomodachi Life. Sintetiza voces Mii 8-bit con 5 presets, controles de tono y velocidad, y simulación de texto a voz.",
  fr: "Synthétiseur vocal gratuit Tomodachi Life. Synthétisez des voix Mii 8-bit avec 5 préréglages, contrôles de hauteur et vitesse, et simulation texte-parole.",
  ko: "무료 Tomodachi Life 음성 합성기. 5가지 프리셋, 커스텀 피치 및 속도 제어, 텍스트 음성 변환 시뮬레이션으로 8비트 Mii 음성을 합성합니다.",
  de: "Kostenloser Tomodachi Life-Sprachsynthesizer. Synthetisieren Sie 8-Bit-Mii-Stimmen mit 5 Voreinstellungen, individueller Tonhöhen- und Geschwindigkeitssteuerung und Text-to-Speech-Simulation.",
  it: "Sintetizzatore vocale gratuito Tomodachi Life. Sintetizza voci Mii 8-bit con 5 preset, controlli di intonazione e velocità, e simulazione testo-parola.",
  nl: "Gratis Tomodachi Life-stemsynthesizer. Synthetiseer 8-bit Mii-stemmen met 5 voorinstellingen, aangepaste toonhoogte- en snelheidsregeling, en tekst-naar-spraak-simulatie.",
  "zh-CN": "免费在线 Tomodachi Life 语音合成器。使用5种预设、自定义音高和语速控制，以及文字转语音模拟来合成8-bit Mii语音。",
};

const FALLBACK_TITLE = "Tomodachi Life Voice Lab - 8-Bit Mii Voice Synthesizer";
const FALLBACK_DESC =
  "Free online Tomodachi Life voice synthesizer. Synthesize 8-bit Mii voices with 5 presets, custom pitch and speed controls, and text-to-speech simulation.";

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
