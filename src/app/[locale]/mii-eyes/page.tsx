import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale, type NonEnLocale } from "@/i18n/routing";
import TomodachiMiiEyesPage from "@/components/TomodachiMiiEyesPage";
import type { Metadata } from "next";
import { languageAlternates, localizedUrl } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

const PAGE_TITLES: Record<NonEnLocale, string> = {
  "zh-Hant": "Mii眼睛設計指南",
  ja: "Miiスタジオ 目デザインガイド",
  es: "Guía Diseño Ojos Mii",
  fr: "Guide Design Yeux Mii",
  ko: "Mii 눈 디자인 가이드",
  de: "Mii Augen Design Guide",
  it: "Guida Design Occhi Mii",
  nl: "Mii Ogen Ontwerp Gids",
  "zh-CN": "Mii眼睛设计指南",
  ru: "Гид по дизайну глаз Mii",
  pt: "Guia Design Olhos Mii",
};

const PAGE_DESCS: Record<NonEnLocale, string> = {
  "zh-Hant": "免費Mii眼睛設計指南，互動參數滑桿、風格畫廊、所有眼型速查表。100%純前端。",
  ja: "無料Miiスタジオ目デザインガイド。インタラクティブスライダー、スタイルギャラリー。100%クライアント。",
  es: "Guía gratis diseño ojos Mii: sliders interactivos, galería de estilos. 100% cliente.",
  fr: "Guide gratuit design yeux Mii : sliders interactifs, galerie de styles. 100% client.",
  ko: "무료 Mii 눈 디자인 가이드. 인터랙티브 슬라이더, 스타일 갤러리. 100% 클라이언트.",
  de: "Kostenloser Mii Augen Design Guide: interaktive Slider, Stil-Galerie. 100% clientseitig.",
  it: "Guida gratis design occhi Mii: slider interattivi, galleria stili. 100% lato client.",
  nl: "Gratis Mii ogen ontwerp gids: interactieve sliders, stijlgalerij. 100% client-side.",
  "zh-CN": "免费Mii眼睛设计指南，互动参数滑杆、风格画廊、所有眼型速查表。100%纯前端。",
  ru: "Бесплатный гид по дизайну глаз Mii: интерактивные слайдеры, галерея стилей. 100% клиент.",
  pt: "Guia gratuito design olhos Mii: controles interativos, galeria de estilos. 100% cliente.",
};

const FALLBACK_TITLE = "Mii Eyes Design Guide for Tomodachi Life";
const FALLBACK_DESC =
  "Free Mii eyes design guide for Tomodachi Life: interactive parameter sliders, style gallery, and cheat sheet for all eye shapes. 100% client-side.";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "mii-eyes";
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
          url: `${BASE}/og/mii-eyes.svg`,
          width: 1200,
          height: 630,
          alt: PAGE_TITLES[locale as NonEnLocale] || FALLBACK_TITLE,
        },
      ],
    },
  };
}

export default async function LocaleMiiEyesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiMiiEyesPage />;
}
