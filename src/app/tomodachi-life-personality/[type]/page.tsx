import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import TomodachiLifePersonalityDetailPage from "@/components/TomodachiLifePersonalityDetailPage";
import { PERSONALITIES, getMbtiCode, getPersonalitySlug } from "@/lib/types";
import { languageAlternates } from "@/lib/locale-urls";
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
      languages: languageAlternates(`tomodachi-life-personality/${slug}`, { xDefaultFirst: true }),
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
