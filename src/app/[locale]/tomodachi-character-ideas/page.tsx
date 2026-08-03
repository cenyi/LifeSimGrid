import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import TomodachiCharacterIdeasPage from "@/components/TomodachiCharacterIdeasPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "朋友聚會角色創意產生器",
  ja: "トモダチキャラアイデア生成",
  es: "Gen. Ideas de Personajes Tomodachi",
  fr: "Génér. Idées de Personnages Tomodachi",
  ko: "Tomodachi Life 캐릭터 아이디어",
  de: "Tomodachi Charakter-Ideen Generator",
  it: "Gen. Idee Personaggi Tomodachi",
  nl: "Tomodachi Karakter Ideeën Generator",
  "zh-CN": "朋友聚会角色创意生成器",
  ru: "Генератор идей персонажей Tomodachi",
  pt: "Gerador de Ideias de Personagens",
};

const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "免費朋友聚會角色創意產生器，隨機Mii性格、語音、外觀建議。100%純前端。",
  ja: "無料のトモダチキャラアイデア生成。ランダムMii性格、声、外観ヒント。100%クライアント。",
  es: "Gen. gratuito de ideas de personajes Tomodachi: personalidad, voz, apariencia. 100% cliente.",
  fr: "Génér. gratuit d'idées de personnages Tomodachi : personnalité, voix, apparence. 100% client.",
  ko: "무료 Tomodachi Life 캐릭터 아이디어 생성기. 랜덤 Mii성격, 음성, 외모 힌트. 100% 클라이언트.",
  de: "Kostenloser Tomodachi Charakter-Ideen Generator: Persönlichkeit, Stimme, Aussehen. 100% clientseitig.",
  it: "Gen. gratuito di idee personaggi Tomodachi: personalità, voce, aspetto. 100% lato client.",
  nl: "Gratis Tomodachi karakter ideeën generator: persoonlijkheid, stem, uiterlijk. 100% client-side.",
  "zh-CN": "免费朋友聚会角色创意生成器，随机Mii性格、语音、外观建议。100%纯前端。",
  ru: "Бесплатный генератор идей персонажей Tomodachi: личность, голос, внешность. 100% клиент.",
  pt: "Gerador gratuito de ideias de personagens Tomodachi: personalidade, voz, aparência. 100% cliente.",
};

const FALLBACK_TITLE = "Tomodachi Life Character Ideas Generator";
const FALLBACK_DESC =
  "Free Tomodachi Life character idea generator: random Mii personalities, voice settings, appearance hints, and archetype suggestions. 100% client-side.";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "tomodachi-character-ideas";
  return {
    title: PAGE_TITLES[locale] || FALLBACK_TITLE,
    description: PAGE_DESCS[locale] || FALLBACK_DESC,
    keywords: [],
    alternates: {
      canonical: locale === "en" ? `${BASE}/${path}` : `${BASE}/${locale}/${path}`,
      languages: {
        "x-default": `${BASE}/${path}`,
        en: `${BASE}/${path}`,
        "zh-Hant": `${BASE}/zh-Hant/${path}`,
        ja: `${BASE}/ja/${path}`,
        es: `${BASE}/es/${path}`,
        fr: `${BASE}/fr/${path}`,
        ko: `${BASE}/ko/${path}`,
        de: `${BASE}/de/${path}`,
        it: `${BASE}/it/${path}`,
        nl: `${BASE}/nl/${path}`,
        "zh-CN": `${BASE}/zh-CN/${path}`,
        ru: `${BASE}/ru/${path}`,
        pt: `${BASE}/pt/${path}`,
      },
    },
    openGraph: {
      title: PAGE_TITLES[locale] || FALLBACK_TITLE,
      description: PAGE_DESCS[locale] || FALLBACK_DESC,
      url: locale === "en" ? `${BASE}/${path}` : `${BASE}/${locale}/${path}`,
      siteName: "LifeSimGrid",
      type: "website",
      images: [
        {
          url: `${BASE}/og/tomodachi-character-ideas.svg`,
          width: 1200,
          height: 630,
          alt: PAGE_TITLES[locale] || FALLBACK_TITLE,
        },
      ],
    },
  };
}

export default async function LocaleTomodachiCharacterIdeasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "zh-Hant" | "ja" | "es" | "fr" | "ko" | "de" | "it" | "nl" | "zh-CN" | "ru" | "pt")) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiCharacterIdeasPage />;
}
