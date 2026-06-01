import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import AboutPage from "@/components/AboutPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

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
      es: `${BASE}/es/about`,
      fr: `${BASE}/fr/about`,
      ko: `${BASE}/ko/about`,
      de: `${BASE}/de/about`,
      it: `${BASE}/it/about`,
      nl: `${BASE}/nl/about`,
      "zh-CN": `${BASE}/zh-CN/about`,
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
