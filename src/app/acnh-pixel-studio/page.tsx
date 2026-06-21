import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import AcnhPixelStudioPage from "@/components/AcnhPixelStudioPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** Metadata for the root-level ACNH Pixel Studio page (English default). */
export const metadata: Metadata = {
  title: { absolute: "ACNH Pixel Studio — Free Custom Design Tool | LifeSimGrid" },
  description:
    "Free ACNH custom design pixel converter. 32×32 & 64×64, 15-color palette, FFL export, smart scaling. 100% browser-based, no server.",
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
    title: "ACNH Pixel Studio — Free Custom Design Tool",
    description:
      "Free online tool to convert images into ACNH custom design pixel patterns. 32×32 & 64×64, 15-color palette, FFL-compatible export. 100% browser-based.",
    url: `${BASE}/acnh-pixel-studio`,
    siteName: "LifeSimGrid",
    type: "website",
    images: [
      {
        url: `${BASE}/og/acnh-pixel-studio.svg`,
        width: 1200,
        height: 630,
        alt: "ACNH Pixel Studio - Free Custom Design Tool",
      },
    ],
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
