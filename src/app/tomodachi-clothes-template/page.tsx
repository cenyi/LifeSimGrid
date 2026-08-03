import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiClothesTemplatePage from "@/components/TomodachiClothesTemplatePage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** Root-level Clothes Template page metadata (English default). */
export const metadata: Metadata = {
  title: { absolute: "Tomodachi Life Clothes Template Designer | LifeSimGrid" },
  description:
    "Free Tomodachi Life clothes template designer: pixel art grid, color palette, pre-made clothing templates, and export. 100% client-side.",
  keywords: [],
  alternates: {
    canonical: `${BASE}/tomodachi-clothes-template`,
    languages: {
      "x-default": `${BASE}/tomodachi-clothes-template`,
      en: `${BASE}/tomodachi-clothes-template`,
      "zh-Hant": `${BASE}/zh-Hant/tomodachi-clothes-template`,
      ja: `${BASE}/ja/tomodachi-clothes-template`,
      es: `${BASE}/es/tomodachi-clothes-template`,
      fr: `${BASE}/fr/tomodachi-clothes-template`,
      ko: `${BASE}/ko/tomodachi-clothes-template`,
      de: `${BASE}/de/tomodachi-clothes-template`,
      it: `${BASE}/it/tomodachi-clothes-template`,
      nl: `${BASE}/nl/tomodachi-clothes-template`,
      "zh-CN": `${BASE}/zh-CN/tomodachi-clothes-template`,
      ru: `${BASE}/ru/tomodachi-clothes-template`,
      pt: `${BASE}/pt/tomodachi-clothes-template`,
    },
  },
  openGraph: {
    title: "Tomodachi Life Clothes Template Designer",
    description:
      "Free Tomodachi Life clothes template designer: pixel art grid, color palette, pre-made clothing templates, and export. 100% client-side.",
    url: `${BASE}/tomodachi-clothes-template`,
    siteName: "LifeSimGrid",
    type: "website",
    images: [
      {
        url: `${BASE}/og/tomodachi-clothes-template.svg`,
        width: 1200,
        height: 630,
        alt: "Tomodachi Life Clothes Template Designer - Pixel Art Grid",
      },
    ],
  },
};

/** Root-level Clothes Template page component, rendered at /tomodachi-clothes-template (English default). */
export default function RootTomodachiClothesTemplatePage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <TomodachiClothesTemplatePage />
    </NextIntlClientProvider>
  );
}
