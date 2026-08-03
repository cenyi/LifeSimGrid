import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiCharacterIdeasPage from "@/components/TomodachiCharacterIdeasPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** Root-level Character Ideas page metadata (English default). */
export const metadata: Metadata = {
  title: { absolute: "Tomodachi Life Character Ideas Generator | LifeSimGrid" },
  description:
    "Free Tomodachi Life character idea generator: random Mii personalities, voice settings, appearance hints, and archetype suggestions. 100% client-side.",
  keywords: [],
  alternates: {
    canonical: `${BASE}/tomodachi-character-ideas`,
    languages: {
      "x-default": `${BASE}/tomodachi-character-ideas`,
      en: `${BASE}/tomodachi-character-ideas`,
      "zh-Hant": `${BASE}/zh-Hant/tomodachi-character-ideas`,
      ja: `${BASE}/ja/tomodachi-character-ideas`,
      es: `${BASE}/es/tomodachi-character-ideas`,
      fr: `${BASE}/fr/tomodachi-character-ideas`,
      ko: `${BASE}/ko/tomodachi-character-ideas`,
      de: `${BASE}/de/tomodachi-character-ideas`,
      it: `${BASE}/it/tomodachi-character-ideas`,
      nl: `${BASE}/nl/tomodachi-character-ideas`,
      "zh-CN": `${BASE}/zh-CN/tomodachi-character-ideas`,
      ru: `${BASE}/ru/tomodachi-character-ideas`,
      pt: `${BASE}/pt/tomodachi-character-ideas`,
    },
  },
  openGraph: {
    title: "Tomodachi Life Character Ideas Generator",
    description:
      "Free Tomodachi Life character idea generator: random Mii personalities, voice settings, appearance hints, and archetype suggestions. 100% client-side.",
    url: `${BASE}/tomodachi-character-ideas`,
    siteName: "LifeSimGrid",
    type: "website",
    images: [
      {
        url: `${BASE}/og/tomodachi-character-ideas.svg`,
        width: 1200,
        height: 630,
        alt: "Tomodachi Life Character Ideas Generator - Random Mii Personality & Appearance",
      },
    ],
  },
};

/** Root-level Character Ideas page component, rendered at /tomodachi-character-ideas (English default). */
export default function RootTomodachiCharacterIdeasPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <TomodachiCharacterIdeasPage />
    </NextIntlClientProvider>
  );
}
