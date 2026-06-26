import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiLifeMbtiPage from "@/components/TomodachiLifeMbtiPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** 根级 Tomodachi Life MBTI 页面的元数据（英文默认版本）。 */
export const metadata: Metadata = {
  title: { absolute: "Tomodachi Life MBTI & Personality Chart | LifeSimGrid" },
  description:
    "Free Tomodachi Life MBTI & personality chart for Living the Dream. Compatibility calculator with zodiac synergy. 100% client-side.",
  alternates: {
    canonical: `${BASE}/tomodachi-life-mbti`,
    languages: {
      "x-default": `${BASE}/tomodachi-life-mbti`,
      en: `${BASE}/tomodachi-life-mbti`,
      "zh-Hant": `${BASE}/zh-Hant/tomodachi-life-mbti`,
      ja: `${BASE}/ja/tomodachi-life-mbti`,
      es: `${BASE}/es/tomodachi-life-mbti`,
      fr: `${BASE}/fr/tomodachi-life-mbti`,
      ko: `${BASE}/ko/tomodachi-life-mbti`,
      de: `${BASE}/de/tomodachi-life-mbti`,
      it: `${BASE}/it/tomodachi-life-mbti`,
      nl: `${BASE}/nl/tomodachi-life-mbti`,
      "zh-CN": `${BASE}/zh-CN/tomodachi-life-mbti`,
    },
  },
  openGraph: {
    title: "Tomodachi Life MBTI & Personality Chart",
    description:
      "Free Tomodachi Life MBTI & personality chart for Living the Dream. Compatibility calculator with zodiac synergy. 100% client-side.",
    url: `${BASE}/tomodachi-life-mbti`,
    siteName: "LifeSimGrid",
    type: "website",
    images: [
      {
        url: `${BASE}/og/tomodachi-life-mbti.svg`,
        width: 1200,
        height: 630,
        alt: "Tomodachi Life MBTI Mapping - 16-Personality Type Converter",
      },
    ],
  },
};

/** 根级 Tomodachi Life MBTI 页面组件，渲染于 /tomodachi-life-mbti 路径（英文默认版本）。 */
export default function RootTomodachiLifeMbtiPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <TomodachiLifeMbtiPage />
    </NextIntlClientProvider>
  );
}