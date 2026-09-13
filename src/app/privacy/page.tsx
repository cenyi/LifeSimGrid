import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import PrivacyPage from "@/components/PrivacyPage";
import type { Metadata } from "next";
import { languageAlternates } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** 根级 Privacy 页面的元数据（英文默认版本）。 */
export const metadata: Metadata = {
  title: { absolute: "LifeSimGrid Privacy — No Data Collection, No Tracking" },
  description:
    "LifeSimGrid privacy: 100% client-side, no data collection, no backend, no tracking. Your data never leaves your device. Free ACNH, Mii & Tomodachi tools.",
  alternates: {
    canonical: `${BASE}/privacy`,
    languages: languageAlternates("privacy"),
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
