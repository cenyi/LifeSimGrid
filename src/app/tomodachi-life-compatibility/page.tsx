import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiCompatibilityPage from "@/components/TomodachiCompatibilityPage";
import type { Metadata } from "next";
import { languageAlternates } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** Root Tomodachi Life Compatibility page metadata (English default). */
export const metadata: Metadata = {
  title: { absolute: "Tomodachi Life Compatibility Calculator | LifeSimGrid" },
  description:
    "Free Tomodachi Life compatibility calculator. Combine zodiac + 16 MBTI types to score romance & friendship for any two Mii. 100% in your browser.",
  alternates: {
    canonical: `${BASE}/tomodachi-life-compatibility`,
    languages: languageAlternates("tomodachi-life-compatibility", { xDefaultFirst: true }),
  },
  openGraph: {
    title: "Tomodachi Life Compatibility Calculator",
    description:
      "Free Tomodachi Life compatibility calculator. Combine zodiac signs and 16 personality (MBTI) types to compute romance and friendship scores for any two Mii.",
    url: `${BASE}/tomodachi-life-compatibility`,
    siteName: "LifeSimGrid",
    type: "website",
    images: [
      {
        url: `${BASE}/og/tomodachi-life-mbti.svg`,
        width: 1200,
        height: 630,
        alt: "Tomodachi Life Compatibility Calculator - Romance and Friendship Scores",
      },
    ],
  },
};

/** Root-level Tomodachi Life Compatibility page component, rendered at /tomodachi-life-compatibility (English default). */
export default function RootTomodachiCompatibilityPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <TomodachiCompatibilityPage />
    </NextIntlClientProvider>
  );
}
