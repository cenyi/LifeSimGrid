import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiLifeRomanceMatcherPage from "@/components/TomodachiLifeRomanceMatcherPage";
import type { Metadata } from "next";
import { languageAlternates } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** Root-level Tomodachi Life Romance Matcher page metadata (English default). */
export const metadata: Metadata = {
  title: { absolute: "Tomodachi Life Romance Matcher | LifeSimGrid" },
  description:
    "Free Tomodachi Life romance matcher. Pick two Miis for a romance score, friendship bonus & best-couple explorer. 100% in your browser.",
  alternates: {
    canonical: `${BASE}/tomodachi-life-romance-matcher`,
    languages: languageAlternates("tomodachi-life-romance-matcher", { xDefaultFirst: true }),
  },
  openGraph: {
    title: "Tomodachi Life Romance Matcher",
    description:
      "Pick two Miis to get a romance score, friendship bonus and best-couple explorer. 100% in your browser.",
    url: `${BASE}/tomodachi-life-romance-matcher`,
    siteName: "LifeSimGrid",
    type: "website",
    images: [
      {
        url: `${BASE}/og/tomodachi-life-romance-matcher.svg`,
        width: 1200,
        height: 630,
        alt: "Tomodachi Life Romance Matcher - Find Your Best Couple",
      },
    ],
  },
};

export default function RootRomanceMatcherPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <TomodachiLifeRomanceMatcherPage />
    </NextIntlClientProvider>
  );
}
