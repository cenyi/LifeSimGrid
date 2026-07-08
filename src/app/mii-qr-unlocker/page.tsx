import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import MiiQrUnlockerPage from "@/components/MiiQrUnlockerPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** Metadata for the root-level Mii QR Unlocker page (English default). */
export const metadata: Metadata = {
  title: { absolute: "Mii QR Unlocker — Fix Edit Error Online | LifeSimGrid" },
  description:
    "Free Mii QR unlocker for Tomodachi Life: Living the Dream Mii sharing via local wireless. Fix edit errors on 3DS, Wii U & Switch. 100% browser-based.",
  alternates: {
    canonical: `${BASE}/mii-qr-unlocker`,
    languages: {
        "x-default": `${BASE}/mii-qr-unlocker`,
        en: `${BASE}/mii-qr-unlocker`,
      "zh-Hant": `${BASE}/zh-Hant/mii-qr-unlocker`,
      ja: `${BASE}/ja/mii-qr-unlocker`,
      es: `${BASE}/es/mii-qr-unlocker`,
      fr: `${BASE}/fr/mii-qr-unlocker`,
      ko: `${BASE}/ko/mii-qr-unlocker`,
      de: `${BASE}/de/mii-qr-unlocker`,
      it: `${BASE}/it/mii-qr-unlocker`,
      nl: `${BASE}/nl/mii-qr-unlocker`,
      "zh-CN": `${BASE}/zh-CN/mii-qr-unlocker`,
      ru: `${BASE}/ru/mii-qr-unlocker`,
      pt: `${BASE}/pt/mii-qr-unlocker`,
    },
  },
  openGraph: {
    title: "Mii QR Unlocker — Fix Edit Error Online",
    description:
      "Free Mii QR unlocker for Tomodachi Life: Living the Dream Mii sharing. Fix edit errors on 3DS, Wii U & Switch. 100% browser-based.",
    url: `${BASE}/mii-qr-unlocker`,
    siteName: "LifeSimGrid",
    type: "website",
    images: [
      {
        url: `${BASE}/og/mii-qr-unlocker.svg`,
        width: 1200,
        height: 630,
        alt: "Mii QR Unlocker - Fix Edit Error Online",
      },
    ],
  },
};

/** Root-level Mii QR Unlocker page rendered at /mii-qr-unlocker (English default). */
export default function RootMiiQrUnlockerPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <MiiQrUnlockerPage />
    </NextIntlClientProvider>
  );
}
