import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiLifeMbtiDetailPage from "@/components/TomodachiLifeMbtiDetailPage";
import { MBTI_MAP, PERSONALITIES, MBTI_SLUGS } from "@/lib/types";
import { languageAlternates } from "@/lib/locale-urls";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

export function generateStaticParams() {
  return MBTI_SLUGS.map((slug) => ({ type: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const mbti = type.toUpperCase();
  const personality = PERSONALITIES.find((p) => MBTI_MAP[p] === mbti);

  const gamePersonality = personality ? personality.split("_")[1] : "";
  const titleText = gamePersonality
    ? `${mbti} in Tomodachi Life — ${gamePersonality} Personality Mapping | LifeSimGrid`
    : `${mbti} in Tomodachi Life — Personality & Mapping | LifeSimGrid`;

  return {
    title: { absolute: titleText },
    description: `${mbti} in Tomodachi Life${gamePersonality ? ` maps to the ${gamePersonality} personality` : ""}. See slider settings, MBTI compatibility, and fan insights for ${mbti} in the original and Living the Dream.`,
    alternates: {
      canonical: `${BASE}/tomodachi-life-mbti/${type}`,
      languages: languageAlternates(`tomodachi-life-mbti/${type}`, { xDefaultFirst: true }),
    },
    openGraph: {
      title: `${mbti} in Tomodachi Life`,
      description: `${mbti} maps to a Tomodachi Life personality. See slider settings, compatibility, and fan insights.`,
      url: `${BASE}/tomodachi-life-mbti/${type}`,
      siteName: "LifeSimGrid",
      type: "website",
    },
  };
}

export default async function RootMbtiDetailPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <TomodachiLifeMbtiDetailPage mbtiSlug={type} />
    </NextIntlClientProvider>
  );
}
