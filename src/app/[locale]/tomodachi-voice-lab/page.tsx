import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import TomodachiVoiceLabPage from "@/components/TomodachiVoiceLabPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** Localized page titles for Tomodachi Voice Lab (template appends " - LifeSimGrid"). */
const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "Tomodachi 8-bit語音合成 — 免費",
  ja: "トモダチ8-bit音声合成 — 無料",
  es: "Sintetizador Voz 8-Bit — Gratis",
  fr: "Synthétiseur Vocal 8-Bit — Gratuit",
  ko: "Tomodachi 8-bit음성합성 — 무료",
  de: "8-Bit-Stimmensynth. — Gratis Tool",
  it: "Sintetizz. Vocale 8-Bit — Gratis",
  nl: "8-Bit-stemsynth. — Gratis Tool",
  "zh-CN": "Tomodachi 8-bit语音合成 — 免费",
  ru: "8-Bit Синтез Голоса — Бесплатно",
  pt: "Sintetizador Voz 8-Bit — Grátis",
};

/** Localized page descriptions for Tomodachi Voice Lab. */
const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "免費Tomodachi語音合成器。5種預設、音高語速控制、8-bit匯出。100%純前端。",
  ja: "トモダチ8-bit音声合成。5プリセット、ピッチ/速度調整、WAV出力。100%クライアント。",
  es: "Sintetizador voz 8-Bit Tomodachi. 5 presets, TTS, Web Audio API. 100% cliente.",
  fr: "Synthétiseur vocal 8-Bit Tomodachi. 5 préréglages, TTS, Web Audio API. 100% client.",
  ko: "Tomodachi 8-bit음성합성기. 5종파형, TTS, Web Audio API. 100% 클라이언트.",
  de: "8-Bit-Sprachsynth. Tomodachi. 5 Presets, TTS, Web Audio API. 100% clientseitig.",
  it: "Sintetizzatore vocale 8-Bit Tomodachi. 5 preset, TTS, Web Audio API. 100% lato client.",
  nl: "8-Bit-stemsynth. Tomodachi. 5 voorinstellingen, TTS, Web Audio API. 100% clientzijde.",
  "zh-CN": "免费Tomodachi 8-bit语音合成器。5种波形、TTS、Web Audio API。100%纯前端。",
  ru: "8-bit синтезатор голоса Tomodachi. 5 пресетов, TTS, Web Audio API. 100% клиент.",
  pt: "Sintetizador voz 8-Bit Tomodachi. 5 presets, TTS, Web Audio API. 100% cliente.",
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
        ru: `${BASE}/ru/${path}`,
        pt: `${BASE}/pt/${path}`,
      },
    },
    openGraph: {
      title: PAGE_TITLES[locale] || FALLBACK_TITLE,
      description: PAGE_DESCS[locale] || FALLBACK_DESC,
      url: locale === "en" ? `${BASE}/${path}` : `${BASE}/${locale}/${path}`,
      siteName: "LifeSimGrid",
      type: "website",
      images: [
        {
          url: `${BASE}/og/${path}.svg`,
          width: 1200,
          height: 630,
          alt: PAGE_TITLES[locale] || FALLBACK_TITLE,
        },
      ],
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

  if (!routing.locales.includes(locale as "en" | "zh-Hant" | "ja" | "es" | "fr" | "ko" | "de" | "it" | "nl" | "zh-CN" | "ru" | "pt")) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiVoiceLabPage />;
}
