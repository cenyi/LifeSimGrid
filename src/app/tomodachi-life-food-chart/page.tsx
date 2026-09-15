import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiLifeFoodChartPage from "@/components/TomodachiLifeFoodChartPage";
import type { Metadata } from "next";
import { languageAlternates } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** Root-level Tomodachi Life Food Chart page metadata (English default). */
export const metadata: Metadata = {
  title: { absolute: "Tomodachi Life Food Chart & Tracker | LifeSimGrid" },
  description:
    "Tomodachi Life food database with reaction chart and localStorage food tracker. Predict which foods your Mii will love or dislike. 100% in your browser.",
  alternates: {
    canonical: `${BASE}/tomodachi-life-food-chart`,
    languages: languageAlternates("tomodachi-life-food-chart", { xDefaultFirst: true }),
  },
  openGraph: {
    title: "Tomodachi Life Food Chart & Tracker",
    description:
      "Tomodachi Life food database with reaction chart and a food tracker. Predict which foods your Mii will love or dislike.",
    url: `${BASE}/tomodachi-life-food-chart`,
    siteName: "LifeSimGrid",
    type: "website",
    images: [
      {
        url: `${BASE}/og/tomodachi-life-mbti.svg`,
        width: 1200,
        height: 630,
        alt: "Tomodachi Life Food Chart - Food Reactions and Tracker",
      },
    ],
  },
};

/** Root-level Tomodachi Life Food Chart page component, rendered at /tomodachi-life-food-chart (English default). */
export default function RootTomodachiLifeFoodChartPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <TomodachiLifeFoodChartPage />
    </NextIntlClientProvider>
  );
}
