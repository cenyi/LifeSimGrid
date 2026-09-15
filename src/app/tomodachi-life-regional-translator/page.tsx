import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiLifeRegionalTranslatorPage from "@/components/TomodachiLifeRegionalTranslatorPage";
import type { Metadata } from "next";
import { languageAlternates } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** Root-level Tomodachi Life Regional Name Translator metadata (English default). */
export const metadata: Metadata = {
  title: { absolute: "Tomodachi Life Regional Name Translator | LifeSimGrid" },
  description:
    "Translate Mii names across Tomodachi Life regions: equivalents in Japan, North America, Europe, Korea and China, plus a region-authentic name generator.",
  alternates: {
    canonical: `${BASE}/tomodachi-life-regional-translator`,
    languages: languageAlternates("tomodachi-life-regional-translator", { xDefaultFirst: true }),
  },
  openGraph: {
    title: "Tomodachi Life Regional Name Translator",
    description:
      "Mii name translator with regional equivalents, region comparison and a name generator for Tomodachi Life. 100% in your browser.",
    url: `${BASE}/tomodachi-life-regional-translator`,
    siteName: "LifeSimGrid",
    type: "website",
    images: [
      {
        url: `${BASE}/og/tomodachi-life-regional-translator.svg`,
        width: 1200,
        height: 630,
        alt: "Tomodachi Life Regional Name Translator - What Is Your Mii Called in Another Region?",
      },
    ],
  },
};

export default function RootRegionalTranslatorPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <TomodachiLifeRegionalTranslatorPage />
    </NextIntlClientProvider>
  );
}
