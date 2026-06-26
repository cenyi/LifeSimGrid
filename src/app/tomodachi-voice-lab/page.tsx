import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiVoiceLabPage from "@/components/TomodachiVoiceLabPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** Metadata for the root-level Tomodachi Voice Lab page (English default). */
export const metadata: Metadata = {
  title: { absolute: "Tomodachi Voice Lab — Living the Dream | LifeSimGrid" },
  description:
    "Free Tomodachi Life: Living the Dream 8-bit voice synthesizer. 5 presets, pitch/speed & TTS. 100% browser-based.",
  alternates: {
    canonical: `${BASE}/tomodachi-voice-lab`,
    languages: {
        "x-default": `${BASE}/tomodachi-voice-lab`,
        en: `${BASE}/tomodachi-voice-lab`,
      "zh-Hant": `${BASE}/zh-Hant/tomodachi-voice-lab`,
      ja: `${BASE}/ja/tomodachi-voice-lab`,
      es: `${BASE}/es/tomodachi-voice-lab`,
      fr: `${BASE}/fr/tomodachi-voice-lab`,
      ko: `${BASE}/ko/tomodachi-voice-lab`,
      de: `${BASE}/de/tomodachi-voice-lab`,
      it: `${BASE}/it/tomodachi-voice-lab`,
      nl: `${BASE}/nl/tomodachi-voice-lab`,
      "zh-CN": `${BASE}/zh-CN/tomodachi-voice-lab`,
    },
  },
  openGraph: {
    title: "Tomodachi Voice Lab — Living the Dream",
    description:
      "Free Tomodachi Life: Living the Dream 8-bit voice synthesizer. 5 presets, pitch/speed & TTS. 100% browser-based.",
    url: `${BASE}/tomodachi-voice-lab`,
    siteName: "LifeSimGrid",
    type: "website",
    images: [
      {
        url: `${BASE}/og/tomodachi-voice-lab.svg`,
        width: 1200,
        height: 630,
        alt: "Tomodachi Voice Lab - Free 8-Bit Mii Voice Synthesizer",
      },
    ],
  },
};

/** Root-level Tomodachi Voice Lab page rendered at /tomodachi-voice-lab (English default). */
export default function RootTomodachiVoiceLabPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <TomodachiVoiceLabPage />
    </NextIntlClientProvider>
  );
}
