import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import AcnhPixelStudioPage from "@/components/AcnhPixelStudioPage";
import type { Metadata } from "next";
import { languageAlternates } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** Metadata for the root-level ACNH Pixel Studio page (English default). */
export const metadata: Metadata = {
  title: { absolute: "ACNH Pixel Studio — Custom Designs & Pixel Art | LifeSimGrid" },
  description:
    "Free ACNH custom design & Tomodachi Life pixel art converter. 32×32 Standard & Pro Design grids, paint-by-numbers. 100% browser-based.",
  alternates: {
    canonical: `${BASE}/acnh-pixel-studio`,
    languages: languageAlternates("acnh-pixel-studio", { xDefaultFirst: true }),
  },
  openGraph: {
    title: "ACNH Pixel Studio — Custom Designs & Pixel Art",
    description:
      "Free online tool to convert images into ACNH custom design & Tomodachi Life pixel patterns. 32×32 Standard & Pro Design grids, paint-by-numbers. 100% browser-based.",
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
