import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import LivingTheGridPage from "@/components/LivingTheGridPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";
const PATH = "living-the-grid";

/** Metadata for the root-level Living the Grid page (English default). */
export const metadata: Metadata = {
  title: { absolute: "Living the Grid | LifeSimGrid" },
  description:
    "Free pixel grid converter — the web-based Living the Grid alternative. 64×64 for Tomodachi Life: Living the Dream face paint & clothing reference. 100% browser-based, no download.",
  alternates: {
    canonical: `${BASE}/${PATH}`,
    languages: {
      "x-default": `${BASE}/${PATH}`,
      en: `${BASE}/${PATH}`,
      "zh-Hant": `${BASE}/zh-Hant/${PATH}`,
      ja: `${BASE}/ja/${PATH}`,
      es: `${BASE}/es/${PATH}`,
      fr: `${BASE}/fr/${PATH}`,
      ko: `${BASE}/ko/${PATH}`,
      de: `${BASE}/de/${PATH}`,
      it: `${BASE}/it/${PATH}`,
      nl: `${BASE}/nl/${PATH}`,
      "zh-CN": `${BASE}/zh-CN/${PATH}`,
      ru: `${BASE}/ru/${PATH}`,
      pt: `${BASE}/pt/${PATH}`,
    },
  },
  openGraph: {
    title: "Living the Grid | LifeSimGrid",
    description:
      "Free pixel grid converter — the web-based Living the Grid alternative. 64×64 for Tomodachi Life: Living the Dream face paint & clothing reference. 100% browser-based, no download.",
    url: `${BASE}/${PATH}`,
    siteName: "LifeSimGrid",
    type: "website",
    images: [
      {
        url: `${BASE}/og/${PATH}.svg`,
        width: 1200,
        height: 630,
        alt: "Living the Grid - Free Pixel Grid Converter",
      },
    ],
  },
};

/** Root-level Living the Grid page rendered at /living-the-grid (English default). */
export default function RootLivingTheGridPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <LivingTheGridPage />
    </NextIntlClientProvider>
  );
}