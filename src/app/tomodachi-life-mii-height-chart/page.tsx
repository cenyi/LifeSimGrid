import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiMiiHeightChartPage from "@/components/TomodachiMiiHeightChartPage";
import type { Metadata } from "next";
import { languageAlternates } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** Root-level Mii Height Chart page metadata (English default). */
export const metadata: Metadata = {
  title: { absolute: "Mii Height Chart & Calculator | LifeSimGrid" },
  description:
    "Mii height chart for Tomodachi Life. Convert the 3-step Mii Maker slider to cm / ft-in, with age reference and real-world comparison. 100% client-side.",
  alternates: {
    canonical: `${BASE}/tomodachi-life-mii-height-chart`,
    languages: languageAlternates("tomodachi-life-mii-height-chart", { xDefaultFirst: true }),
  },
  openGraph: {
    title: "Mii Height Chart & Calculator",
    description:
      "Mii height chart for Tomodachi Life. Convert the 3-step Mii Maker height slider to cm and ft-in, with age reference and real-world comparison.",
    url: `${BASE}/tomodachi-life-mii-height-chart`,
    siteName: "LifeSimGrid",
    type: "website",
    images: [
      {
        url: `${BASE}/og/tomodachi-life-mbti.svg`,
        width: 1200,
        height: 630,
        alt: "Mii Height Chart - cm / ft-in Conversion for Tomodachi Life",
      },
    ],
  },
};

/** Root-level Mii Height Chart component, rendered at /tomodachi-life-mii-height-chart (English default). */
export default function RootMiiHeightChartPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <TomodachiMiiHeightChartPage />
    </NextIntlClientProvider>
  );
}
