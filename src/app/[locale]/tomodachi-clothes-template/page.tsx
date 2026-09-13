import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale, type NonEnLocale } from "@/i18n/routing";
import TomodachiClothesTemplatePage from "@/components/TomodachiClothesTemplatePage";
import type { Metadata } from "next";
import { languageAlternates, localizedUrl } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

const PAGE_TITLES: Record<NonEnLocale, string> = {
  "zh-Hant": "朋友聚會服裝模板設計器",
  ja: "トモダチ服テンプレートデザイナー",
  es: "Diseñador Ropa Tomodachi Pixel",
  fr: "Designer Vêtements Tomodachi Pixel",
  ko: "Tomodachi Life 옷 템플릿 디자이너",
  de: "Tomodachi Kleidungs-Vorlagen Designer",
  it: "Designer Abiti Tomodachi Pixel",
  nl: "Tomodachi Kleding Sjabloon Ontwerper",
  "zh-CN": "朋友聚会服装模板设计器",
  ru: "Дизайнер одежды Tomodachi пиксель",
  pt: "Designer Roupas Tomodachi Pixel",
};

const PAGE_DESCS: Record<NonEnLocale, string> = {
  "zh-Hant": "免費朋友聚會服裝模板設計器，像素繪圖、調色色盤、預設服裝模板。100%純前端。",
  ja: "無料トモダチ服テンプレートデザイナー。ピクセルグリッド、カラーパレット。100%クライアント。",
  es: "Diseñador gratis ropa Tomodachi: rejilla de píxeles, paleta de colores, plantillas. 100% cliente.",
  fr: "Designer gratuit vêtements Tomodachi : grille pixel, palette de couleurs, modèles. 100% client.",
  ko: "무료 Tomodachi Life 옷 템플릿 디자이너. 픽셀 그리드, 색상 팔레트. 100% 클라이언트.",
  de: "Kostenloser Tomodachi Kleidungs-Vorlagen Designer: Pixel-Raster, Farbpalette, Vorlagen. 100% clientseitig.",
  it: "Designer gratis abiti Tomodachi: griglia pixel, tavolozza colori, modelli. 100% lato client.",
  nl: "Gratis Tomodachi kleding sjabloon ontwerper: pixelraster, kleurenpalet, sjablonen. 100% client-side.",
  "zh-CN": "免费朋友聚会服装模板设计器，像素绘图、调色盘、预设服装模板。100%纯前端。",
  ru: "Бесплатный дизайнер одежды Tomodachi: пиксельная сетка, палитра, шаблоны. 100% клиент.",
  pt: "Designer gratuito roupas Tomodachi: grade pixel, paleta de cores, modelos. 100% cliente.",
};

const FALLBACK_TITLE = "Tomodachi Life Clothes Template Designer";
const FALLBACK_DESC =
  "Free Tomodachi Life clothes template designer: pixel art grid, color palette, pre-made clothing templates, and export. 100% client-side.";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "tomodachi-clothes-template";
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
          url: `${BASE}/og/tomodachi-clothes-template.svg`,
          width: 1200,
          height: 630,
          alt: PAGE_TITLES[locale as NonEnLocale] || FALLBACK_TITLE,
        },
      ],
    },
  };
}

export default async function LocaleTomodachiClothesTemplatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiClothesTemplatePage />;
}
