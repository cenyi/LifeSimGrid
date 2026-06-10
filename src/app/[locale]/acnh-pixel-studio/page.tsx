import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import AcnhPixelStudioPage from "@/components/AcnhPixelStudioPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** Localized page titles for ACNH Pixel Studio (template appends " - LifeSimGrid"). */
const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "動森自訂設計像素工作室",
  ja: "あつ森マイデザインピクセルスタジオ",
  es: "Estudio de Píxeles ACNH",
  fr: "Studio Pixel ACNH",
  ko: "ACNH 픽셀 스튜디오",
  de: "ACNH Pixel-Studio",
  it: "Studio Pixel ACNH",
  nl: "ACNH Pixelstudio",
  "zh-CN": "动森自定义设计像素工作室",
};

/** Localized page descriptions for ACNH Pixel Studio. */
const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "免費線上工具，將任何圖片轉換為動森自訂設計像素圖案。智慧縮放、多比例支援與 8-bit 復古調色盤。",
  ja: "あつ森マイデザインに画像をピクセルパターン変換する無料オンラインツール。スマートスケーリング、マルチ比率対応、8ビットレトロパレット。",
  es: "Herramienta gratuita para convertir imágenes en patrones de píxeles personalizados de ACNH. Escalado inteligente y paleta retro 8-bit.",
  fr: "Outil gratuit pour convertir des images en motifs pixel personnalisés ACNH. Mise à l'échelle intelligente et palette rétro 8-bit.",
  ko: "이미지를 동숲 커스텀 디자인 픽셀 패턴으로 변환하는 무료 온라인 도구. 스마트 스케일링, 8비트 레트로 팔레트.",
  de: "Kostenloses Online-Tool zur Umwandlung von Bildern in ACNH-Pixelmuster. Intelligentes Skalieren und 8-Bit-Retro-Palette.",
  it: "Strumento gratuito per convertire immagini in pattern pixel personalizzati ACNH. Ridimensionamento intelligente e tavolozza retro 8-bit.",
  nl: "Gratis online tool om afbeeldingen om te zetten in ACNH-pixelpatronen. Slim schalen en 8-bit retro-palet.",
  "zh-CN": "免费在线工具，将任何图片转换为动森自定义设计像素图案。智能缩放、多比例支持与 8-bit 复古调色盘。",
};

const FALLBACK_TITLE = "ACNH Custom Design Pixel Studio";
const FALLBACK_DESC =
  "Free online tool to convert any image into Animal Crossing: New Horizons custom design pixel patterns. Smart scaling, multi-ratio support, and 8-bit retro palette.";

/** Generate metadata for the localized ACNH Pixel Studio page. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "acnh-pixel-studio";
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
  };
}

/** Locale-level ACNH Pixel Studio page rendered at /{locale}/acnh-pixel-studio. */
export default async function LocaleAcnhPixelStudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "zh-Hant" | "ja" | "es" | "fr" | "ko" | "de" | "it" | "nl" | "zh-CN")) {
    notFound();
  }

  setRequestLocale(locale);

  return <AcnhPixelStudioPage />;
}
