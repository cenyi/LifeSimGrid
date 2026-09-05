import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiLifeMbtiDetailPage, { MBTI_SLUGS } from "@/components/TomodachiLifeMbtiDetailPage";
import { MBTI_MAP, PERSONALITIES } from "@/lib/types";
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
      languages: {
        "x-default": `${BASE}/tomodachi-life-mbti/${type}`,
        en: `${BASE}/tomodachi-life-mbti/${type}`,
        "zh-Hant": `${BASE}/zh-Hant/tomodachi-life-mbti/${type}`,
        ja: `${BASE}/ja/tomodachi-life-mbti/${type}`,
        es: `${BASE}/es/tomodachi-life-mbti/${type}`,
        fr: `${BASE}/fr/tomodachi-life-mbti/${type}`,
        ko: `${BASE}/ko/tomodachi-life-mbti/${type}`,
        de: `${BASE}/de/tomodachi-life-mbti/${type}`,
        it: `${BASE}/it/tomodachi-life-mbti/${type}`,
        nl: `${BASE}/nl/tomodachi-life-mbti/${type}`,
        "zh-CN": `${BASE}/zh-CN/tomodachi-life-mbti/${type}`,
        ru: `${BASE}/ru/tomodachi-life-mbti/${type}`,
        pt: `${BASE}/pt/tomodachi-life-mbti/${type}`,
      },
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
