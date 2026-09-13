import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TermsPage from "@/components/TermsPage";
import type { Metadata } from "next";
import { languageAlternates } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** 根级 Terms 页面的元数据（英文默认版本）。 */
export const metadata: Metadata = {
  title: { absolute: "LifeSimGrid Terms — MIT Licensed, Independent Fan Tool" },
  description:
    "LifeSimGrid terms: independent tool, MIT licensed, no console-maker affiliation. Free ACNH, Mii, Tomodachi tools. No data collection, 100% client-side.",
  alternates: {
    canonical: `${BASE}/terms`,
    languages: languageAlternates("terms"),
  },
  openGraph: {
    title: "LifeSimGrid Terms — MIT Licensed, No Affiliation",
    description:
      "LifeSimGrid terms: independent tool, MIT licensed, no affiliation with console makers. Free ACNH, Mii & Tomodachi tools. No data collection.",
    url: `${BASE}/terms`,
    siteName: "LifeSimGrid",
    type: "website",
  },
};

/** 根级 Terms 页面组件，渲染于 /terms 路径（英文默认版本）。 */
export default function RootTermsPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <TermsPage />
    </NextIntlClientProvider>
  );
}
