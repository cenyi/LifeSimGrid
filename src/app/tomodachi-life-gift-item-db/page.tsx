import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiLifeGiftItemDbPage from "@/components/TomodachiLifeGiftItemDbPage";
import type { Metadata } from "next";
import { languageAlternates } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** Root-level Tomodachi Life Gift & Item Database page metadata (English default). */
export const metadata: Metadata = {
  title: { absolute: "Tomodachi Life Gift & Item Database | LifeSimGrid" },
  description:
    "Free Tomodachi Life gift finder. Search gifts by category, check affinity per personality, build a wishlist or pick a random gift. 100% in your browser.",
  alternates: {
    canonical: `${BASE}/tomodachi-life-gift-item-db`,
    languages: languageAlternates("tomodachi-life-gift-item-db", { xDefaultFirst: true }),
  },
  openGraph: {
    title: "Tomodachi Life Gift & Item Database",
    description:
      "Gift finder, searchable item database, wishlist and random gift picker for Tomodachi Life. 100% in your browser.",
    url: `${BASE}/tomodachi-life-gift-item-db`,
    siteName: "LifeSimGrid",
    type: "website",
    images: [
      {
        url: `${BASE}/og/tomodachi-life-gift-item-db.svg`,
        width: 1200,
        height: 630,
        alt: "Tomodachi Life Gift & Item Database - Find the Best Gift for Your Mii",
      },
    ],
  },
};

export default function RootGiftItemDbPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <TomodachiLifeGiftItemDbPage />
    </NextIntlClientProvider>
  );
}