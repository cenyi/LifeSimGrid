import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiIslandPlannerPage from "@/components/TomodachiIslandPlannerPage";
import type { Metadata } from "next";
import { languageAlternates } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** Root-level Tomodachi Island Planner page metadata (English default). */
export const metadata: Metadata = {
  title: { absolute: "Tomodachi Life Island Planner & Layout Designer | LifeSimGrid" },
  description:
    "Free Tomodachi Life island planner: interactive grid, drag-and-drop buildings, MBTI resident optimization, export templates. 100% client-side.",
  alternates: {
    canonical: `${BASE}/tomodachi-island-planner`,
    languages: languageAlternates("tomodachi-island-planner", { xDefaultFirst: true }),
  },
  openGraph: {
    title: "Tomodachi Life Island Planner & Layout Designer",
    description:
      "Free Tomodachi Life island planner: interactive grid, drag-and-drop buildings, MBTI resident optimization, export templates. 100% client-side.",
    url: `${BASE}/tomodachi-island-planner`,
    siteName: "LifeSimGrid",
    type: "website",
    images: [
      {
        url: `${BASE}/og/tomodachi-island-planner.svg`,
        width: 1200,
        height: 630,
        alt: "Tomodachi Life Island Planner - Interactive Grid Layout Designer",
      },
    ],
  },
};

/** Root-level Island Planner page component, rendered at /tomodachi-island-planner (English default). */
export default function RootTomodachiIslandPlannerPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <TomodachiIslandPlannerPage />
    </NextIntlClientProvider>
  );
}
