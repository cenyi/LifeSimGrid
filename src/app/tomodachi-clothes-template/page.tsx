import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiClothesTemplatePage from "@/components/TomodachiClothesTemplatePage";
import type { Metadata } from "next";
import { languageAlternates } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** Root-level Clothes Template page metadata (English default). */
export const metadata: Metadata = {
  title: { absolute: "Tomodachi Life Clothes Template Designer | LifeSimGrid" },
  description:
    "Free Tomodachi Life clothes template designer: pixel art grid, color palette, pre-made clothing templates, and export. 100% client-side.",
  keywords: [],
  alternates: {
    canonical: `${BASE}/tomodachi-clothes-template`,
    languages: languageAlternates("tomodachi-clothes-template", { xDefaultFirst: true }),
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
