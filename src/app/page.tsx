import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import HomePageContent from "@/components/HomePageContent";
import LocaleRedirector from "@/components/LocaleRedirector";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

export const metadata: Metadata = {
  title: { absolute: "LifeSimGrid — Free ACNH, Mii & Tomodachi Tools" },
  description:
    "Free ACNH, Mii & Tomodachi Life toolkit: Pixel Studio, QR Unlocker, Voice Lab & MBTI Calc. 100% client-side, no server.",
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
      "x-default": `${BASE}/`,
    },
  },
  openGraph: {
    title: "LifeSimGrid — Free ACNH, Mii & Tomodachi Tools",
    description:
      "Free ACNH, Mii & Tomodachi Life toolkit: Pixel Studio, QR Unlocker, Voice Lab & MBTI Calc. 100% client-side.",
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
