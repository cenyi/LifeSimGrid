import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiLifeMbtiPage from "@/components/TomodachiLifeMbtiPage";
import type { Metadata } from "next";
import { languageAlternates } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** 根级 Tomodachi Life MBTI 页面的元数据（英文默认版本）。 */
export const metadata: Metadata = {
  title: { absolute: "Tomodachi Life Personality → MBTI Mapping | LifeSimGrid" },
  description:
    "Free Tomodachi Life personality to MBTI mapping chart for Living the Dream. 16 types, compatibility calculator with zodiac synergy. 100% client-side.",
  alternates: {
    canonical: `${BASE}/tomodachi-life-mbti`,
    languages: languageAlternates("tomodachi-life-mbti", { xDefaultFirst: true }),
  },
  openGraph: {
    title: "Tomodachi Life Personality → MBTI Mapping",
    description:
      "Free Tomodachi Life personality to MBTI mapping chart for Living the Dream. 16 types, compatibility calculator with zodiac synergy.",
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