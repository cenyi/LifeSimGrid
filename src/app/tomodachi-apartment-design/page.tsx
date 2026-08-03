import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiApartmentDesignPage from "@/components/TomodachiApartmentDesignPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** Root-level Apartment Design page metadata (English default). */
export const metadata: Metadata = {
  title: { absolute: "Tomodachi Life Apartment Design Guide | LifeSimGrid" },
  description:
    "Free Tomodachi Life apartment design tool: interactive room layout grid, furniture placement, theme templates, and design guide. 100% client-side.",
  keywords: [],
  alternates: {
    canonical: `${BASE}/tomodachi-apartment-design`,
    languages: {
      "x-default": `${BASE}/tomodachi-apartment-design`,
      en: `${BASE}/tomodachi-apartment-design`,
      "zh-Hant": `${BASE}/zh-Hant/tomodachi-apartment-design`,
      ja: `${BASE}/ja/tomodachi-apartment-design`,
      es: `${BASE}/es/tomodachi-apartment-design`,
      fr: `${BASE}/fr/tomodachi-apartment-design`,
      ko: `${BASE}/ko/tomodachi-apartment-design`,
      de: `${BASE}/de/tomodachi-apartment-design`,
      it: `${BASE}/it/tomodachi-apartment-design`,
      nl: `${BASE}/nl/tomodachi-apartment-design`,
      "zh-CN": `${BASE}/zh-CN/tomodachi-apartment-design`,
      ru: `${BASE}/ru/tomodachi-apartment-design`,
      pt: `${BASE}/pt/tomodachi-apartment-design`,
    },
  },
  openGraph: {
    title: "Tomodachi Life Apartment Design Guide",
    description:
      "Free Tomodachi Life apartment design tool: interactive room layout grid, furniture placement, theme templates, and design guide. 100% client-side.",
    url: `${BASE}/tomodachi-apartment-design`,
    siteName: "LifeSimGrid",
    type: "website",
    images: [
      {
        url: `${BASE}/og/tomodachi-apartment-design.svg`,
        width: 1200,
        height: 630,
        alt: "Tomodachi Life Apartment Design Guide - Interactive Room Layout Tool",
      },
    ],
  },
};

/** Root-level Apartment Design page component, rendered at /tomodachi-apartment-design (English default). */
export default function RootTomodachiApartmentDesignPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <TomodachiApartmentDesignPage />
    </NextIntlClientProvider>
  );
}
