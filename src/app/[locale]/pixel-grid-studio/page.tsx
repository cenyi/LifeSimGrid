import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import PixelGridStudioPage from "@/components/PixelGridStudioPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** Localized page titles for Pixel Grid Studio (template appends " - LifeSimGrid"). */
const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "圖片轉像素畫轉換器 - 免費線上像素格子生成器",
  ja: "画像ドット絵変換 - 無料オンラインピクセルグリッド生成",
  es: "Convertidor de imagen a pixel art",
  fr: "Convertisseur image en pixel art",
  ko: "이미지 픽셀아트 변환기",
  de: "Bild-zu-Pixel-Art-Konverter",
  it: "Convertitore da immagine a pixel art",
  nl: "Afbeelding naar pixelart converter",
  "zh-CN": "图片转像素画转换器 - 免费在线像素格子生成器",
};

/** Localized page descriptions for Pixel Grid Studio. */
const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "免費線上工具，將圖片轉換為像素畫格子圖案。適用於 Minecraft、拼豆、十字繡等。自訂格子大小從 16×16 到 128×128。",
  ja: "画像をピクセルアートグリッドパターンに変換する無料オンラインツール。Minecraft、ビーズ、クロスステッチに最適。16×16〜128×128のカスタムグリッド。",
  es: "Herramienta gratuita para convertir imágenes en patrones de pixel art. Ideal para Minecraft, Perler Beads y más. Tamaños de 16×16 a 128×128.",
  fr: "Outil gratuit pour convertir des images en grilles pixel art. Parfait pour Minecraft, Perler Beads et plus. Tailles de 16×16 a 128×128.",
  ko: "이미지를 픽셀아트 그리드 패턴으로 변환하는 무료 도구. 마인크래프트, 퍼들비드 등에 적합. 16×16~128×128 커스텀 그리드.",
  de: "Kostenloses Tool zur Umwandlung von Bildern in Pixel-Art-Raster. Perfekt für Minecraft, Perler Beads und mehr. Raster von 16×16 bis 128×128.",
  it: "Strumento gratuito per convertire immagini in griglie pixel art. Perfetto per Minecraft, Perler Beads e altro. Griglie da 16×16 a 128×128.",
  nl: "Gratis tool om afbeeldingen om te zetten in pixelart-rasterpatronen. Perfect voor Minecraft, Perler Beads en meer. Raster van 16×16 tot 128×128.",
  "zh-CN": "免费在线工具，将图片转换为像素画格子图案。适用于 Minecraft、拼豆、十字绣等。自定义格子大小从 16×16 到 128×128。",
};

const FALLBACK_TITLE = "Image to Pixel Art Converter";
const FALLBACK_DESC =
  "Free online tool to convert any image into pixel art grid patterns. Perfect for Minecraft, Perler Beads, Cross Stitch, and more. Custom grid sizes from 16×16 to 128×128.";

/** Generate metadata for the localized Pixel Grid Studio page. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "pixel-grid-studio";
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

/** Locale-level Pixel Grid Studio page rendered at /{locale}/pixel-grid-studio. */
export default async function LocalePixelGridStudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "zh-Hant" | "ja" | "es" | "fr" | "ko" | "de" | "it" | "nl" | "zh-CN")) {
    notFound();
  }

  setRequestLocale(locale);

  return <PixelGridStudioPage />;
}
