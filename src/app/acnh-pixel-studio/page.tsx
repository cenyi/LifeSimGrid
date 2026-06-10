import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import AcnhPixelStudioPage from "@/components/AcnhPixelStudioPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** Metadata for the root-level ACNH Pixel Studio page (English default). */
export const metadata: Metadata = {
  title: { absolute: "ACNH Custom Design Pixel Studio - Convert Images to Animal Crossing Patterns - LifeSimGrid" },
  description:
    "Free online tool to convert any image into Animal Crossing: New Horizons custom design pixel patterns. Smart scaling, multi-ratio support, and 8-bit retro palette.",
  alternates: {
    canonical: `${BASE}/acnh-pixel-studio`,
    languages: {
        "x-default": `${BASE}/acnh-pixel-studio`,
        en: `${BASE}/acnh-pixel-studio`,
      "zh-Hant": `${BASE}/zh-Hant/acnh-pixel-studio`,
      ja: `${BASE}/ja/acnh-pixel-studio`,
      es: `${BASE}/es/acnh-pixel-studio`,
      fr: `${BASE}/fr/acnh-pixel-studio`,
      ko: `${BASE}/ko/acnh-pixel-studio`,
      de: `${BASE}/de/acnh-pixel-studio`,
      it: `${BASE}/it/acnh-pixel-studio`,
      nl: `${BASE}/nl/acnh-pixel-studio`,
      "zh-CN": `${BASE}/zh-CN/acnh-pixel-studio`,
    },
  },
  openGraph: {
    title: "ACNH Custom Design Pixel Studio - Convert Images to Animal Crossing Patterns",
    description:
      "Free online tool to convert any image into Animal Crossing: New Horizons custom design pixel patterns.",
    url: `${BASE}/acnh-pixel-studio`,
    siteName: "LifeSimGrid",
    type: "website",
  },
};

/** Root-level ACNH Pixel Studio page rendered at /acnh-pixel-studio (English default). */
export default function RootAcnhPixelStudioPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <AcnhPixelStudioPage />
    </NextIntlClientProvider>
  );
}
