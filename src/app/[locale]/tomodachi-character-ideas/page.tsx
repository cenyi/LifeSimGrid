import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale, type NonEnLocale } from "@/i18n/routing";
import TomodachiCharacterIdeasPage from "@/components/TomodachiCharacterIdeasPage";
import type { Metadata } from "next";
import { languageAlternates, localizedUrl } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

const PAGE_TITLES: Record<NonEnLocale, string> = {
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

const PAGE_DESCS: Record<NonEnLocale, string> = {
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
    title: PAGE_TITLES[locale as NonEnLocale] || FALLBACK_TITLE,
    description: PAGE_DESCS[locale as NonEnLocale] || FALLBACK_DESC,
    keywords: [],
    alternates: {
          canonical: localizedUrl(locale as Locale, path),
      languages: languageAlternates(path, { xDefaultFirst: true }),
    },
    openGraph: {
      title: PAGE_TITLES[locale as NonEnLocale] || FALLBACK_TITLE,
      description: PAGE_DESCS[locale as NonEnLocale] || FALLBACK_DESC,
        url: localizedUrl(locale as Locale, path),
      siteName: "LifeSimGrid",
      type: "website",
      images: [
        {
          url: `${BASE}/og/tomodachi-character-ideas.svg`,
          width: 1200,
          height: 630,
          alt: PAGE_TITLES[locale as NonEnLocale] || FALLBACK_TITLE,
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

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiCharacterIdeasPage />;
}
