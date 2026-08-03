import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiMiiEyesPage from "@/components/TomodachiMiiEyesPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** Root-level Mii Eyes Design Guide page metadata (English default). */
export const metadata: Metadata = {
  title: { absolute: "Mii Eyes Design Guide for Tomodachi Life | LifeSimGrid" },
  description:
    "Free Mii eyes design guide for Tomodachi Life: interactive parameter sliders, style gallery, and cheat sheet for all eye shapes. 100% client-side.",
  keywords: [],
  alternates: {
    canonical: `${BASE}/mii-eyes`,
    languages: {
      "x-default": `${BASE}/mii-eyes`,
      en: `${BASE}/mii-eyes`,
      "zh-Hant": `${BASE}/zh-Hant/mii-eyes`,
      ja: `${BASE}/ja/mii-eyes`,
      es: `${BASE}/es/mii-eyes`,
      fr: `${BASE}/fr/mii-eyes`,
      ko: `${BASE}/ko/mii-eyes`,
      de: `${BASE}/de/mii-eyes`,
      it: `${BASE}/it/mii-eyes`,
      nl: `${BASE}/nl/mii-eyes`,
      "zh-CN": `${BASE}/zh-CN/mii-eyes`,
      ru: `${BASE}/ru/mii-eyes`,
      pt: `${BASE}/pt/mii-eyes`,
    },
  },
  openGraph: {
    title: "Mii Eyes Design Guide for Tomodachi Life",
    description:
      "Free Mii eyes design guide for Tomodachi Life: interactive parameter sliders, style gallery, and cheat sheet for all eye shapes. 100% client-side.",
    url: `${BASE}/mii-eyes`,
    siteName: "LifeSimGrid",
    type: "website",
    images: [
      {
        url: `${BASE}/og/mii-eyes.svg`,
        width: 1200,
        height: 630,
        alt: "Mii Eyes Design Guide for Tomodachi Life - Interactive Parameter Sliders",
      },
    ],
  },
};

/** Root-level Mii Eyes Design Guide page component, rendered at /mii-eyes (English default). */
export default function RootMiiEyesPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <TomodachiMiiEyesPage />
    </NextIntlClientProvider>
  );
}
