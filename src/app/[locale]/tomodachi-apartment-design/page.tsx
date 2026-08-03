import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import TomodachiApartmentDesignPage from "@/components/TomodachiApartmentDesignPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "朋友聚會公寓設計指南",
  ja: "トモダチアパートデザインガイド",
  es: "Guía Diseño Apartamento Tomodachi",
  fr: "Guide Design Appartement Tomodachi",
  ko: "Tomodachi Life 아파트 디자인",
  de: "Tomodachi Wohnung Design Guide",
  it: "Guida Design Appartamento Tomodachi",
  nl: "Tomodachi Appartement Ontwerp Gids",
  "zh-CN": "朋友聚会公寓设计指南",
  ru: "Гид по дизайну квартир Tomodachi",
  pt: "Guia Design Apartamento Tomodachi",
};

const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "免費朋友聚會公寓設計工具，互動房間佈局、傢俱配置、主題模板。100%純前端。",
  ja: "無料トモダチ公寓デザインツール。インタラクティブな部屋レイアウト、家具配置。100%クライアント。",
  es: "Herramienta gratis diseño apartamento Tomodachi: rejilla interactiva, muebles, plantillas. 100% cliente.",
  fr: "Outil gratuit design appartement Tomodachi : grille interactive, meubles, thèmes. 100% client.",
  ko: "무료 Tomodachi Life 아파트 디자인 도구. 인터랙티브 룸 레이아웃, 가구 배치. 100% 클라이언트.",
  de: "Kostenloser Tomodachi Wohnung Design Guide: interaktives Raster, Möbel, Vorlagen. 100% clientseitig.",
  it: "Strumento gratis design appartamento Tomodachi: griglia interattiva, mobili, modelli. 100% lato client.",
  nl: "Gratis Tomodachi appartement ontwerp tool: interactief raster, meubels, sjablonen. 100% client-side.",
  "zh-CN": "免费朋友聚会公寓设计工具，互动房间布局、家具配置、主题模板。100%纯前端。",
  ru: "Бесплатный гид по дизайну квартир Tomodachi: интерактивная сетка, мебель, шаблоны. 100% клиент.",
  pt: "Ferramenta gratuita design apartamento Tomodachi: grade interativa, móveis, modelos. 100% cliente.",
};

const FALLBACK_TITLE = "Tomodachi Life Apartment Design Guide";
const FALLBACK_DESC =
  "Free Tomodachi Life apartment design tool: interactive room layout grid, furniture placement, theme templates, and design guide. 100% client-side.";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "tomodachi-apartment-design";
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
          url: `${BASE}/og/tomodachi-apartment-design.svg`,
          width: 1200,
          height: 630,
          alt: PAGE_TITLES[locale] || FALLBACK_TITLE,
        },
      ],
    },
  };
}

export default async function LocaleTomodachiApartmentDesignPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "zh-Hant" | "ja" | "es" | "fr" | "ko" | "de" | "it" | "nl" | "zh-CN" | "ru" | "pt")) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiApartmentDesignPage />;
}
