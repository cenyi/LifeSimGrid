import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import AboutPage from "@/components/AboutPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** 根级 About 页面的元数据（英文默认版本）。 */
export const metadata: Metadata = {
  title: { absolute: "About LifeSimGrid — Open-Source ACNH & Mii Tools" },
  description:
    "LifeSimGrid: open-source toolkit for pixel art, avatar config & 8-bit voice. Free ACNH, Mii & Tomodachi Life tools. 100% client-side.",
  alternates: {
    canonical: `${BASE}/about`,
    languages: {
      en: `${BASE}/about`,
      "zh-Hant": `${BASE}/zh-Hant/about`,
      ja: `${BASE}/ja/about`,
      es: `${BASE}/es/about`,
      fr: `${BASE}/fr/about`,
      ko: `${BASE}/ko/about`,
      de: `${BASE}/de/about`,
      it: `${BASE}/it/about`,
      nl: `${BASE}/nl/about`,
      "zh-CN": `${BASE}/zh-CN/about`,
      "x-default": `${BASE}/about`,
    },
  },
  openGraph: {
    title: "About LifeSimGrid — Open-Source ACNH & Mii Tools",
    description:
      "LifeSimGrid: open-source toolkit for pixel art, avatar config & 8-bit voice. Free ACNH, Mii & Tomodachi Life tools.",
    url: `${BASE}/about`,
    siteName: "LifeSimGrid",
    type: "website",
  },
};

/** 根级 About 页面组件，渲染于 /about 路径（英文默认版本）。 */
export default function RootAboutPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <AboutPage />
    </NextIntlClientProvider>
  );
}
