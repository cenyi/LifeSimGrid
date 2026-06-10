import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import MiiQrUnlockerPage from "@/components/MiiQrUnlockerPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** Metadata for the root-level Mii QR Unlocker page (English default). */
export const metadata: Metadata = {
  title: { absolute: "Mii QR Code Unlocker - Fix 'Cannot be Edited' Error Online - LifeSimGrid" },
  description:
    "Free online tool to unlock Mii QR codes. Fix 'This Mii Cannot be Edited' and 'Copying Not Allowed' errors instantly. Supports 3DS, Wii U, and Switch Mii data.",
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
    },
  },
  openGraph: {
    title: "Mii QR Code Unlocker - Fix 'Cannot be Edited' Error Online",
    description:
      "Free online tool to unlock Mii QR codes. Fix 'This Mii Cannot be Edited' and 'Copying Not Allowed' errors instantly.",
    url: `${BASE}/mii-qr-unlocker`,
    siteName: "LifeSimGrid",
    type: "website",
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
