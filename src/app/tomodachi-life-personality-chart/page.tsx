import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiLifePersonalityChartPage from "@/components/TomodachiLifePersonalityChartPage";
import type { Metadata } from "next";
import { languageAlternates } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

export const metadata: Metadata = {
  title: { absolute: "Tomodachi Life Personality Chart - 16 Types | LifeSimGrid" },
  description:
    "Complete Tomodachi Life personality chart with all 16 types. See group, MBTI mapping, traits, and house colors for every personality in Living the Dream.",
  alternates: {
    canonical: `${BASE}/tomodachi-life-personality-chart`,
    languages: languageAlternates("tomodachi-life-personality-chart", { xDefaultFirst: true }),
  },
  openGraph: {
    title: "Tomodachi Life Personality Chart - 16 Types",
    description:
      "Complete Tomodachi Life personality chart with all 16 types. See group, MBTI mapping, traits, and house colors for every personality in Living the Dream.",
    url: `${BASE}/tomodachi-life-personality-chart`,
    siteName: "LifeSimGrid",
    type: "website",
    images: [
      {
        url: `${BASE}/og/tomodachi-life-personality-chart.svg`,
        width: 1200,
        height: 630,
        alt: "Tomodachi Life Personality Chart - 16 Types",
      },
    ],
  },
};

export default function RootTomodachiLifePersonalityChartPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <TomodachiLifePersonalityChartPage />
    </NextIntlClientProvider>
  );
}
