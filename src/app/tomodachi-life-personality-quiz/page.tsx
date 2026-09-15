import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiLifePersonalityQuizPage from "@/components/TomodachiLifePersonalityQuizPage";
import type { Metadata } from "next";
import { languageAlternates } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** Root-level Tomodachi Life Personality Quiz page metadata (English default). */
export const metadata: Metadata = {
  title: { absolute: "Tomodachi Life Personality Quiz | LifeSimGrid" },
  description:
    "Free Tomodachi Life personality quiz. 8 questions reveal your in-game personality type, MBTI code & group. 100% in your browser.",
  alternates: {
    canonical: `${BASE}/tomodachi-life-personality-quiz`,
    languages: languageAlternates("tomodachi-life-personality-quiz", { xDefaultFirst: true }),
  },
  openGraph: {
    title: "Tomodachi Life Personality Quiz",
    description:
      "8 questions reveal your Tomodachi Life personality type, MBTI code & group. 100% in your browser.",
    url: `${BASE}/tomodachi-life-personality-quiz`,
    siteName: "LifeSimGrid",
    type: "website",
    images: [
      {
        url: `${BASE}/og/tomodachi-life-personality-quiz.svg`,
        width: 1200,
        height: 630,
        alt: "Tomodachi Life Personality Quiz - Find Your Mii Personality Type & MBTI",
      },
    ],
  },
};

export default function RootPersonalityQuizPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <TomodachiLifePersonalityQuizPage />
    </NextIntlClientProvider>
  );
}
