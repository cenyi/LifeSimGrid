import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiLifePersonalityDetailPage from "@/components/TomodachiLifePersonalityDetailPage";
import { PERSONALITIES, getMbtiCode, getPersonalitySlug } from "@/lib/types";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

export function generateStaticParams() {
  return PERSONALITIES.map((p) => ({
    type: getPersonalitySlug(p),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const personality = PERSONALITIES.find((p) => getPersonalitySlug(p) === type);
  const mbti = personality ? getMbtiCode(personality) : "INFP";
  const slug = type;
  const displayName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return {
    title: { absolute: `${displayName} Personality (${mbti}) — Tomodachi Life | LifeSimGrid` },
    description: `${displayName} is a ${mbti} personality type in Tomodachi Life: Living the Dream. Learn its group, traits, slider settings, and compatibility info.`,
    alternates: {
      canonical: `${BASE}/tomodachi-life-personality/${slug}`,
      languages: {
        "x-default": `${BASE}/tomodachi-life-personality/${slug}`,
        en: `${BASE}/tomodachi-life-personality/${slug}`,
        "zh-Hant": `${BASE}/zh-Hant/tomodachi-life-personality/${slug}`,
        ja: `${BASE}/ja/tomodachi-life-personality/${slug}`,
        es: `${BASE}/es/tomodachi-life-personality/${slug}`,
        fr: `${BASE}/fr/tomodachi-life-personality/${slug}`,
        ko: `${BASE}/ko/tomodachi-life-personality/${slug}`,
        de: `${BASE}/de/tomodachi-life-personality/${slug}`,
        it: `${BASE}/it/tomodachi-life-personality/${slug}`,
        nl: `${BASE}/nl/tomodachi-life-personality/${slug}`,
        "zh-CN": `${BASE}/zh-CN/tomodachi-life-personality/${slug}`,
        ru: `${BASE}/ru/tomodachi-life-personality/${slug}`,
        pt: `${BASE}/pt/tomodachi-life-personality/${slug}`,
      },
    },
    openGraph: {
      title: `${displayName} Personality (${mbti}) — Tomodachi Life`,
      description: `${displayName} is a ${mbti} personality type in Tomodachi Life: Living the Dream.`,
      url: `${BASE}/tomodachi-life-personality/${slug}`,
      siteName: "LifeSimGrid",
      type: "website",
    },
  };
}

export default async function RootPersonalityDetailPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <TomodachiLifePersonalityDetailPage personalitySlug={type} />
    </NextIntlClientProvider>
  );
}
