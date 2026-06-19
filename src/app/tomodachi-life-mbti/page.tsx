import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiLifeMbtiPage from "@/components/TomodachiLifeMbtiPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

export const metadata: Metadata = {
  title: "Tomodachi Life MBTI Mapping - 16-Personality Converter - LifeSimGrid",
  description:
    "Convert 16 Tomodachi Life Mii personality types to MBTI. Interactive tool with Myers-Briggs compatibility calculator.",
  alternates: {
    canonical: `${BASE}/tomodachi-life-mbti`,
    languages: {
      "x-default": `${BASE}/tomodachi-life-mbti`,
      en: `${BASE}/tomodachi-life-mbti`,
      "zh-Hant": `${BASE}/zh-Hant/tomodachi-life-mbti`,
      ja: `${BASE}/ja/tomodachi-life-mbti`,
      es: `${BASE}/es/tomodachi-life-mbti`,
      fr: `${BASE}/fr/tomodachi-life-mbti`,
      ko: `${BASE}/ko/tomodachi-life-mbti`,
      de: `${BASE}/de/tomodachi-life-mbti`,
      it: `${BASE}/it/tomodachi-life-mbti`,
      nl: `${BASE}/nl/tomodachi-life-mbti`,
      "zh-CN": `${BASE}/zh-CN/tomodachi-life-mbti`,
    },
  },
  openGraph: {
    title: "Tomodachi Life MBTI Mapping - 16-Personality Converter",
    description:
      "Convert 16 Tomodachi Life Mii personality types to MBTI. Interactive tool with Myers-Briggs compatibility calculator.",
    url: `${BASE}/tomodachi-life-mbti`,
    siteName: "LifeSimGrid",
    type: "website",
    images: [
      {
        url: `${BASE}/og/tomodachi-life-mbti.svg`,
        width: 1200,
        height: 630,
        alt: "Tomodachi Life MBTI Mapping - 16-Personality Type Converter",
      },
    ],
  },
};

export default function RootTomodachiLifeMbtiPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <TomodachiLifeMbtiPage />
    </NextIntlClientProvider>
  );
}