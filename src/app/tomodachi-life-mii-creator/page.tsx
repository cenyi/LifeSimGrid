import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiLifeMiiCreatorPage from "@/components/TomodachiLifeMiiCreatorPage";
import type { Metadata } from "next";
import { languageAlternates } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** Root-level Tomodachi Life Mii Creator page metadata (English default). */
export const metadata: Metadata = {
  title: { absolute: "Tomodachi Life Mii Creator & Character Planner | LifeSimGrid" },
  description:
    "Free Tomodachi Life Mii Creator. Design a Mii face, predict personality & MBTI from 4 sliders, and generate names. 100% in your browser.",
  alternates: {
    canonical: `${BASE}/tomodachi-life-mii-creator`,
    languages: languageAlternates("tomodachi-life-mii-creator", { xDefaultFirst: true }),
  },
  openGraph: {
    title: "Tomodachi Life Mii Creator & Character Planner",
    description:
      "Design a Mii face, predict personality and MBTI from 4 sliders, and generate Mii names. 100% in your browser.",
    url: `${BASE}/tomodachi-life-mii-creator`,
    siteName: "LifeSimGrid",
    type: "website",
    images: [
      {
        url: `${BASE}/og/tomodachi-life-mii-creator.svg`,
        width: 1200,
        height: 630,
        alt: "Tomodachi Life Mii Creator - Face, Personality & Name Generator",
      },
    ],
  },
};

/** Root-level Tomodachi Life Mii Creator page component, rendered at /tomodachi-life-mii-creator (English default). */
export default function RootMiiCreatorPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <TomodachiLifeMiiCreatorPage />
    </NextIntlClientProvider>
  );
}
