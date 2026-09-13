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

  return {
    title: { absolute: `${mbti} in Tomodachi Life — Personality & Mapping | LifeSimGrid` },
    description: `${mbti} maps to ${personality ? personality.split("_")[1] : "a Tomodachi Life personality"}. See slider settings, compatibility, and fan insights for ${mbti} in Tomodachi Life: Living the Dream.`,
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
