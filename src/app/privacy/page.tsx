import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import PrivacyPage from "@/components/PrivacyPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** 根级 Privacy 页面的元数据（英文默认版本）。 */
export const metadata: Metadata = {
  title: { absolute: "LifeSimGrid Privacy — No Data Collection, No Tracking" },
  description:
    "LifeSimGrid privacy: 100% client-side, no data collection, no backend, no tracking. Your data never leaves your device. Free ACNH, Mii & Tomodachi tools.",
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
      "x-default": `${BASE}/privacy`,
    },
  },
  openGraph: {
    title: "LifeSimGrid Privacy — No Data Collection",
    description:
      "LifeSimGrid privacy: 100% client-side, no data collection, no backend, no tracking. Your data stays on your device. Free ACNH, Mii & Tomodachi tools.",
    url: `${BASE}/privacy`,
    siteName: "LifeSimGrid",
    type: "website",
  },
};

/** 根级 Privacy 页面组件，渲染于 /privacy 路径（英文默认版本）。 */
export default function RootPrivacyPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <PrivacyPage />
    </NextIntlClientProvider>
  );
}
