import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiLifePersonalityCalculatorPage from "@/components/TomodachiLifePersonalityCalculatorPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

export const metadata: Metadata = {
  title: { absolute: "Tomodachi Life Personality Calculator & MBTI Mapping Tool" },
  description:
    "Free Tomodachi Life personality calculator. Adjust 4 sliders to get your Mii personality type and MBTI mapping. 100% client-side, no upload needed.",
  alternates: {
    canonical: `${BASE}/tomodachi-life-personality-calculator`,
    languages: {
      "x-default": `${BASE}/tomodachi-life-personality-calculator`,
      en: `${BASE}/tomodachi-life-personality-calculator`,
      "zh-Hant": `${BASE}/zh-Hant/tomodachi-life-personality-calculator`,
      ja: `${BASE}/ja/tomodachi-life-personality-calculator`,
      es: `${BASE}/es/tomodachi-life-personality-calculator`,
      fr: `${BASE}/fr/tomodachi-life-personality-calculator`,
      ko: `${BASE}/ko/tomodachi-life-personality-calculator`,
      de: `${BASE}/de/tomodachi-life-personality-calculator`,
      it: `${BASE}/it/tomodachi-life-personality-calculator`,
      nl: `${BASE}/nl/tomodachi-life-personality-calculator`,
      "zh-CN": `${BASE}/zh-CN/tomodachi-life-personality-calculator`,
      ru: `${BASE}/ru/tomodachi-life-personality-calculator`,
      pt: `${BASE}/pt/tomodachi-life-personality-calculator`,
    },
  },
  openGraph: {
    title: "Tomodachi Life Personality Calculator",
    description:
      "Free Tomodachi Life personality calculator for Living the Dream. Adjust 4 sliders to get your Mii personality type and MBTI mapping.",
    url: `${BASE}/tomodachi-life-personality-calculator`,
    siteName: "LifeSimGrid",
    type: "website",
    images: [
      {
        url: `${BASE}/og/tomodachi-life-personality-calculator.svg`,
        width: 1200,
        height: 630,
        alt: "Tomodachi Life Personality Calculator",
      },
    ],
  },
};

export default function RootTomodachiLifePersonalityCalculatorPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <TomodachiLifePersonalityCalculatorPage />
    </NextIntlClientProvider>
  );
}
