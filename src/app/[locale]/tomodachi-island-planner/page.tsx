import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import TomodachiIslandPlannerPage from "@/components/TomodachiIslandPlannerPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "朋友聚會島嶼規劃器",
  ja: "トモダチ島プランナー",
  es: "Planificador de Isla Tomodachi Life",
  fr: "Planificateur d'Île Tomodachi Life",
  ko: "Tomodachi Life 섬 플래너",
  de: "Tomodachi Insel-Planer",
  it: "Pianificatore Isola Tomodachi",
  nl: "Tomodachi Eiland Planner",
  "zh-CN": "朋友聚会岛屿规划器",
  ru: "Планировщик острова Tomodachi",
  pt: "Planeador de Ilha Tomodachi",
};

const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "免費朋友聚會島嶼規劃器，互動式網格佈局設計。拖放建築物，依MBTI相容性優化居民配置。100%純前端。",
  ja: "無料のトモダチ島プランナー。グリッドで建物配置、MBTI住民最適化、テンプレートエクスポート。100%クライアントサイド。",
  es: "Planificador gratuito de isla Tomodachi Life: cuadrícula interactiva, arrastrar edificios, MBTI, exportar. 100% cliente.",
  fr: "Planificateur gratuit d'île Tomodachi Life : grille interactive, glisser-déposer, MBTI, export. 100% client.",
  ko: "무료 Tomodachi Life 섬 플래너. 그리드 건물 배치, MBTI 주민 최적화, 템플릿 내보내기. 100% 클라이언트.",
  de: "Kostenloser Tomodachi Life Insel-Planer: interaktives Raster, Drag & Drop, MBTI-Optimierung. 100% clientseitig.",
  it: "Pianificatore gratuito isola Tomodachi Life: griglia interattiva, trascina edifici, MBTI, esporta. 100% lato client.",
  nl: "Gratis Tomodachi Life eilandplanner: interactief raster, gebouwen slepen, MBTI, exporteren. 100% client-side.",
  "zh-CN": "免费朋友聚会岛屿规划器，互动式网格布局设计。拖放建筑物，依MBTI兼容性优化居民配置。100%纯前端。",
  ru: "Бесплатный планировщик острова Tomodachi с интерактивной сеткой. Перетаскивайте здания, оптимизируйте размещение жителей по совместимости MBTI. 100% клиент.",
  pt: "Planeador gratuito de ilha Tomodachi com grelha interativa. Arraste edifícios, otimize colocação de residentes por compatibilidade MBTI. 100% cliente.",
};

const FALLBACK_TITLE = "Tomodachi Life Island Planner & Layout Designer";
const FALLBACK_DESC =
  "Free Tomodachi Life island planner: interactive grid, drag-and-drop buildings, MBTI resident optimization, export templates. 100% client-side.";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "tomodachi-island-planner";
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
          url: `${BASE}/og/tomodachi-island-planner.svg`,
          width: 1200,
          height: 630,
          alt: PAGE_TITLES[locale] || FALLBACK_TITLE,
        },
      ],
    },
  };
}

export default async function LocaleTomodachiIslandPlannerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "zh-Hant" | "ja" | "es" | "fr" | "ko" | "de" | "it" | "nl" | "zh-CN" | "ru" | "pt")) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiIslandPlannerPage />;
}
