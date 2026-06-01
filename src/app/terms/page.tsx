import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TermsPage from "@/components/TermsPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

export const metadata: Metadata = {
  title: "Terms of Service - LifeSimGrid",
  description:
    "LifeSimGrid terms of service: independent third-party tool, MIT licensed, no affiliation with any game console manufacturers.",
  alternates: {
    canonical: `${BASE}/terms`,
    languages: {
      en: `${BASE}/terms`,
      "zh-Hant": `${BASE}/zh-Hant/terms`,
      ja: `${BASE}/ja/terms`,
      es: `${BASE}/es/terms`,
      fr: `${BASE}/fr/terms`,
      ko: `${BASE}/ko/terms`,
      de: `${BASE}/de/terms`,
      it: `${BASE}/it/terms`,
      nl: `${BASE}/nl/terms`,
      "zh-CN": `${BASE}/zh-CN/terms`,
    },
  },
};

export default function RootTermsPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <TermsPage />
    </NextIntlClientProvider>
  );
}
