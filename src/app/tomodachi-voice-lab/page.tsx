import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiVoiceLabPage from "@/components/TomodachiVoiceLabPage";
import type { Metadata } from "next";
import { languageAlternates } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** Metadata for the root-level Tomodachi Voice Lab page (English default). */
export const metadata: Metadata = {
  title: { absolute: "Tomodachi Life Voice Generator — 8-Bit Mii TTS & Synthesizer | LifeSimGrid" },
  description:
    "Free Tomodachi Life voice generator with text-to-speech (TTS). Synthesize 8-bit Mii voices with 5 presets, pitch/speed controls — for the original and Living the Dream. 100% browser-based.",
  alternates: {
    canonical: `${BASE}/tomodachi-voice-lab`,
    languages: languageAlternates("tomodachi-voice-lab", { xDefaultFirst: true }),
  },
  openGraph: {
    title: "Tomodachi Life Voice Generator — 8-Bit Mii TTS & Synthesizer",
    description:
      "Free Tomodachi Life voice generator with text-to-speech (TTS). Synthesize 8-bit Mii voices with 5 presets, pitch/speed controls — for the original and Living the Dream. 100% browser-based.",
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
