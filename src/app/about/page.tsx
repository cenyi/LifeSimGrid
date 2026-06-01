import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import AboutPage from "@/components/AboutPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.com";

export const metadata: Metadata = {
  title: "About Us - LifeSimGrid",
  description:
    "Learn about LifeSimGrid — an independent open-source toolkit for pixel art, avatar data configuration, and 8-bit voice synthesis.",
  alternates: {
    canonical: `${BASE}/about`,
    languages: {
      en: `${BASE}/about`,
      "zh-Hant": `${BASE}/zh-Hant/about`,
      ja: `${BASE}/ja/about`,
    },
  },
};

export default function RootAboutPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <AboutPage />
    </NextIntlClientProvider>
  );
}
