import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import TomodachiLifeMbtiPage from "@/components/TomodachiLifeMbtiPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "Tomodachi Life MBTI 性格對照表 - 16型人格轉換工具",
  ja: "トモダチコレクション MBTI性格対照表 - 16性格タイプ変換",
  es: "Tomodachi Life MBTI Mapping - Conversor 16 Tipos de Personalidad",
  fr: "Tomodachi Life MBTI Mapping - Convertisseur 16 Types de Personnalité",
  ko: "Tomodachi Life MBTI 맵핑 - 16-성격 유형 변환 도구",
  de: "Tomodachi Life MBTI Mapping - 16-Persönlichkeits-Typ-Konverter",
  it: "Tomodachi Life MBTI Mapping - Convertitore 16 Tipi di Personalità",
  nl: "Tomodachi Life MBTI Mapping - 16-Persoonlijkheidstype-converter",
  "zh-CN": "Tomodachi Life MBTI 性格对照表 - 16型人格转换工具",
};

const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "將16種Mii性格類型轉換為MBTI（邁爾斯-布里格斯）。互動工具可查找角色的MBTI類型與社交相容性。",
  ja: "16種類のMii性格タイプをMBTI（マイヤーズ＝布里ッグス）に変換。キャラクターのMBTIタイプと社会的互換性を見つけるインタラクティブツール。",
  es: "Convierte 16 tipos de personalidad Mii a MBTI (Myers-Briggs). Herramienta interactiva para encontrar el tipo MBTI de tu personaje.",
  fr: "Convertissez 16 types de personnalité Mii en MBTI (Myers-Briggs). Outil interactif pour trouver le type MBTI de votre personnage.",
  ko: "16가지 Mii 성격 유형을 MBTI(마이어스-브리그스)로 변환합니다. 캐릭터의 MBTI 유형을 찾는 대화형 도구.",
  de: "Konvertieren Sie 16 Mii-Persönlichkeitstypen in MBTI (Myers-Briggs). Interaktives Tool zum Finden des MBTI-Typs Ihres Charakters.",
  it: "Converti 16 tipi di personalità Mii in MBTI (Myers-Briggs). Strumento interattivo per trovare il tipo MBTI del tuo personaggio.",
  nl: "Converteer 16 Mii-persoonlijkheidstypen naar MBTI (Myers-Briggs). Interactief hulpmiddel om het MBTI-type van uw personage te vinden.",
  "zh-CN": "将16种Mii性格类型转换为MBTI（迈尔斯-布里格斯）。互动工具可查找角色的MBTI类型与社交相容性。",
};

const FALLBACK_TITLE = "Tomodachi Life MBTI Mapping - 16-Personality Converter";
const FALLBACK_DESC =
  "Convert 16 Tomodachi Life Mii personality types to MBTI. Interactive tool with Myers-Briggs compatibility calculator.";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "tomodachi-life-mbti";
  return {
    title: PAGE_TITLES[locale] || FALLBACK_TITLE,
    description: PAGE_DESCS[locale] || FALLBACK_DESC,
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
          url: `${BASE}/og/tomodachi-life-mbti.svg`,
          width: 1200,
          height: 630,
          alt: PAGE_TITLES[locale] || FALLBACK_TITLE,
        },
      ],
    },
  };
}

export default async function LocaleTomodachiLifeMbtiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "zh-Hant" | "ja" | "es" | "fr" | "ko" | "de" | "it" | "nl" | "zh-CN")) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiLifeMbtiPage />;
}