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
};

/** Localized page descriptions for Tomodachi Voice Lab. */
const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "免費Tomodachi語音合成器。5種預設、音高語速控制、8-bit匯出。100%純前端。",
  ja: "無料トモダチ音声合成。5プリセット、ピッチ調整、8bitエクスポート。100%クライアント処理。",
  es: "Sintetizador voz 8-Bit Tomodachi. 5 presets, control tono/velocidad, TTS. Web Audio API, export WAV. 100% cliente, sin servidor.",
  fr: "Synthétiseur vocal 8-Bit Tomodachi. 5 préréglages, contrôle hauteur/vitesse, TTS. Web Audio API, export WAV. 100% client, sans serveur.",
  ko: "Tomodachi 8-bit음성합성기. 5종파형, 피치/속도조절, TTS. Web Audio API. 100% 클라이언트.",
  de: "8-Bit-Sprachsynth. Tomodachi. 5 Presets, Tonhöhe/Tempo, TTS. Web Audio API, WAV-Export. 100% clientseitig, kein Server.",
  it: "Sintetizzatore vocale 8-Bit Tomodachi. 5 preset, controllo tono/velocità, TTS. Web Audio API, export WAV. 100% lato client, nessun server.",
  nl: "8-Bit-stemsynth. Tomodachi. 5 voorinstellingen, toonhoogte-/snelheidsregeling, TTS. Web Audio API, WAV-export. 100% clientzijde, geen server.",
  "zh-CN": "免费Tomodachi 8-bit语音合成器。5种复古波形、音高语速控制、WAV导出。Web Audio API驱动。100%纯前端。",
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

  if (!routing.locales.includes(locale as "en" | "zh-Hant" | "ja" | "es" | "fr" | "ko" | "de" | "it" | "nl" | "zh-CN")) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiVoiceLabPage />;
}
