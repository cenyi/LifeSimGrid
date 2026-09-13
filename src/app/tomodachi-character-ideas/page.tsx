import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiCharacterIdeasPage from "@/components/TomodachiCharacterIdeasPage";
import type { Metadata } from "next";
import { languageAlternates } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** Root-level Character Ideas page metadata (English default). */
export const metadata: Metadata = {
  title: { absolute: "Tomodachi Life Character Ideas Generator | LifeSimGrid" },
  description:
    "Free Tomodachi Life character idea generator: random Mii personalities, voice settings, appearance hints, and archetype suggestions. 100% client-side.",
  keywords: [],
  alternates: {
    canonical: `${BASE}/tomodachi-character-ideas`,
    languages: languageAlternates("tomodachi-character-ideas", { xDefaultFirst: true }),
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
