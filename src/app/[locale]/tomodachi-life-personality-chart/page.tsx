import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import TomodachiLifePersonalityChartPage from "@/components/TomodachiLifePersonalityChartPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "朋友聚會性格一覽表：16種性格完整對照表與MBTI",
  ja: "トモダチコレクション 新生活 性格一覧表：16種類とMBTI対応",
  es: "Tabla de Personalidades Tomodachi Life: 16 Tipos y MBTI",
  fr: "Tableau des Personnalités Tomodachi Life: 16 Types et MBTI",
  ko: "Tomodachi Life 성격 차트: 16종류와 MBTI 매핑",
  de: "Tomodachi Persönlichkeitsübersicht: Alle 16 Typen und MBTI",
  it: "Tabella Personalità Tomodachi Life: 16 Tipi e Mappatura MBTI",
  nl: "Tomodachi Persoonlijkheidsoverzicht: Alle 16 Typen en MBTI",
  "zh-CN": "朋友聚会性格一览表：16种性格完整对照表与MBTI",
  ru: "Личности Tomodachi Life: 16 типов и MBTI",
  pt: "Tabela de Personalidades Tomodachi Life: 16 Tipos e MBTI",
};

const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "朋友聚會：新生活16種性格完整一覽表。查看每種性格的群組分類、MBTI對應關係、性格特徵描述與房屋顏色。本表涵蓋全部性格類型，幫助你快速找到所需資訊，是規劃島嶼居民的必備參考。",
  ja: "トモダチコレクション 新生活の全16種類の性格を完全一覧。各性格のグループ分類、MBTI対応、特徴、家の色を確認でき、すべての性格タイプを総合的に理解できます。",
  es: "Tabla con las 16 personalidades de Tomodachi Life. Consulta grupo, MBTI, rasgos y color de casa de cada personalidad.",
  fr: "Tableau des 16 personnalités de Tomodachi Life. Consultez groupe, MBTI, traits et couleur de maison de chaque personnalité.",
  ko: "Tomodachi Life 16종류 성격 완전 차트. 각 성격의 그룹, MBTI 매핑, 특징, 집 색상을 확인하여 모든 성격 유형을 종합적으로 이해하세요.",
  de: "Komplette Übersicht aller 16 Tomodachi Persönlichkeiten. Gruppe, MBTI-Zuordnung, Merkmale und Hausfarben für jeden Persönlichkeitstyp auf einen Blick.",
  it: "Tabella completa con 16 personalità di Tomodachi Life. Consulta gruppo, mappatura MBTI, tratti e colore della casa per ogni personalità.",
  nl: "Volledig overzicht van alle 16 Tomodachi persoonlijkheden. Bekijk groep, MBTI-toewijzing, kenmerken en huis kleuren voor elk persoonlijkheidstype.",
  "zh-CN": "朋友聚会：新生活16种性格完整一览表。查看每种性格的群组分类、MBTI对应关系、性格特征描述与房屋颜色。本表涵盖全部性格类型，帮助你快速找到所需信息，是规划岛屿居民的必备参考。",
  ru: "Полная таблица всех 16 личностей Tomodachi Life. Узнайте группу, соответствие MBTI, черты и цвет дома для каждого типа личности.",
  pt: "Tabela completa com as 16 personalidades de Tomodachi Life. Consulta o grupo, a correspondência MBTI, os traços e a cor da casa de cada personalidade.",
};

const FALLBACK_TITLE = "Tomodachi Life Personality Chart - 16 Types";
const FALLBACK_DESC =
  "Complete Tomodachi Life personality chart with all 16 types. See group, MBTI mapping, traits, and house colors for every personality in Living the Dream.";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "tomodachi-life-personality-chart";
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
          url: `${BASE}/og/tomodachi-life-personality-chart.svg`,
          width: 1200,
          height: 630,
          alt: "Tomodachi Life Personality Chart - 16 Types",
        },
      ],
    },
  };
}

export default async function LocaleTomodachiLifePersonalityChartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "zh-Hant" | "ja" | "es" | "fr" | "ko" | "de" | "it" | "nl" | "zh-CN" | "ru" | "pt")) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiLifePersonalityChartPage />;
}
