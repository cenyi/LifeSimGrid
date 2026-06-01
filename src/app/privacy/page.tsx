import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import PrivacyPage from "@/components/PrivacyPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

export const metadata: Metadata = {
  title: "Privacy Policy - LifeSimGrid",
  description:
    "LifeSimGrid privacy policy: 100% client-side processing, no data collection, no backend servers. Your data never leaves your device.",
  alternates: {
    canonical: `${BASE}/privacy`,
    languages: {
      en: `${BASE}/privacy`,
      "zh-Hant": `${BASE}/zh-Hant/privacy`,
      ja: `${BASE}/ja/privacy`,
      es: `${BASE}/es/privacy`,
      fr: `${BASE}/fr/privacy`,
      ko: `${BASE}/ko/privacy`,
      de: `${BASE}/de/privacy`,
      it: `${BASE}/it/privacy`,
      nl: `${BASE}/nl/privacy`,
      "zh-CN": `${BASE}/zh-CN/privacy`,
    },
  },
};

export default function RootPrivacyPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <PrivacyPage />
    </NextIntlClientProvider>
  );
}
