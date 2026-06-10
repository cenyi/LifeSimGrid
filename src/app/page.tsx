import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import HomePageContent from "@/components/HomePageContent";
import LocaleRedirector from "@/components/LocaleRedirector";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

export const metadata: Metadata = {
  title: "LifeSimGrid - Custom Island Companion Toolset",
  description:
    "Pixel Studio, Avatar QR Code Unlocker, Voice Simulator &amp; Compatibility Calculator. 100% client-side, no server needed.",
  alternates: {
    canonical: `${BASE}/`,
    languages: {
      en: `${BASE}/`,
      "zh-Hant": `${BASE}/zh-Hant`,
      ja: `${BASE}/ja`,
      es: `${BASE}/es`,
      fr: `${BASE}/fr`,
      ko: `${BASE}/ko`,
      de: `${BASE}/de`,
      it: `${BASE}/it`,
      nl: `${BASE}/nl`,
      "zh-CN": `${BASE}/zh-CN`,
    },
  },
  openGraph: {
    title: "LifeSimGrid - Custom Island Companion Toolset",
    description:
      "Pixel Studio, QR Unlocker, Voice Lab — all in one. 100% client-side fan tool.",
    url: BASE,
    siteName: "LifeSimGrid",
    type: "website",
  },
};

export default function RootPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <LocaleRedirector />
      <HomePageContent />
    </NextIntlClientProvider>
  );
}
