import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import HomePageContent from "@/components/HomePageContent";
import { languageAlternates } from "@/lib/locale-urls";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

export const metadata: Metadata = {
  title: { absolute: "LifeSimGrid — Free ACNH, Mii & Tomodachi Tools" },
  description:
    "Free ACNH, Mii & Tomodachi Life toolkit: Pixel Studio, QR Unlocker, Voice Lab & MBTI Calc. 100% client-side, no server.",
  alternates: {
    canonical: `${BASE}/`,
    languages: languageAlternates(""),
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
      <HomePageContent />
    </NextIntlClientProvider>
  );
}
