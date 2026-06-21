import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import PixelGridStudioPage from "@/components/PixelGridStudioPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** Metadata for the root-level Pixel Grid Studio page (English default). */
export const metadata: Metadata = {
  title: { absolute: "Image to Pixel Art — Free Grid Generator | LifeSimGrid" },
  description:
    "Free pixel art grid converter for Minecraft, Perler Beads & Cross Stitch. 16×16 to 128×128. 100% browser-based, no server.",
  alternates: {
    canonical: `${BASE}/pixel-grid-studio`,
    languages: {
        "x-default": `${BASE}/pixel-grid-studio`,
        en: `${BASE}/pixel-grid-studio`,
      "zh-Hant": `${BASE}/zh-Hant/pixel-grid-studio`,
      ja: `${BASE}/ja/pixel-grid-studio`,
      es: `${BASE}/es/pixel-grid-studio`,
      fr: `${BASE}/fr/pixel-grid-studio`,
      ko: `${BASE}/ko/pixel-grid-studio`,
      de: `${BASE}/de/pixel-grid-studio`,
      it: `${BASE}/it/pixel-grid-studio`,
      nl: `${BASE}/nl/pixel-grid-studio`,
      "zh-CN": `${BASE}/zh-CN/pixel-grid-studio`,
    },
  },
  openGraph: {
    title: "Image to Pixel Art — Free Grid Generator",
    description:
      "Free tool to convert images into pixel art grid patterns. Minecraft, Perler Beads, Cross Stitch & more. Grid 16×16 to 128×128. 100% browser-based.",
    url: `${BASE}/pixel-grid-studio`,
    siteName: "LifeSimGrid",
    type: "website",
    images: [
      {
        url: `${BASE}/og/pixel-grid-studio.svg`,
        width: 1200,
        height: 630,
        alt: "Pixel Grid Studio - Free Image to Pixel Art Converter",
      },
    ],
  },
};

/** Root-level Pixel Grid Studio page rendered at /pixel-grid-studio (English default). */
export default function RootPixelGridStudioPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <PixelGridStudioPage />
    </NextIntlClientProvider>
  );
}
