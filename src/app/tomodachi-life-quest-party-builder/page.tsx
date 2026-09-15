import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiLifeQuestPartyBuilderPage from "@/components/TomodachiLifeQuestPartyBuilderPage";
import type { Metadata } from "next";
import { languageAlternates } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** Root-level Tomodachi Life Quest Party Builder page metadata (English default). */
export const metadata: Metadata = {
  title: { absolute: "Tomodachi Life Quest Party Builder | LifeSimGrid" },
  description:
    "Free Tomodachi Life quest team builder. Pick 4 Miis from 16 personality types for synergy score and roles. 100% in your browser.",
  alternates: {
    canonical: `${BASE}/tomodachi-life-quest-party-builder`,
    languages: languageAlternates("tomodachi-life-quest-party-builder", { xDefaultFirst: true }),
  },
  openGraph: {
    title: "Tomodachi Life Quest Party Builder",
    description:
      "Pick 4 Miis to build a quest team. Get synergy score, role assignments and a random team generator. 100% in your browser.",
    url: `${BASE}/tomodachi-life-quest-party-builder`,
    siteName: "LifeSimGrid",
    type: "website",
    images: [
      {
        url: `${BASE}/og/tomodachi-life-quest-party-builder.svg`,
        width: 1200,
        height: 630,
        alt: "Tomodachi Life Quest Party Builder - Build Your Best Quest Team",
      },
    ],
  },
};

export default function RootQuestPartyBuilderPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <TomodachiLifeQuestPartyBuilderPage />
    </NextIntlClientProvider>
  );
}
