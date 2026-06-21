import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import PixelGridStudioPage from "@/components/PixelGridStudioPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** Localized page titles for Pixel Grid Studio (template appends " - LifeSimGrid"). */
const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "圖片轉像素格子 — 免費工具",
  ja: "画像→ピクセルグリッド — 無料変換",
  es: "Imagen a Pixel Grid — Generador Gratis",
  fr: "Image en Grille Pixel — Générateur Gratuit",
  ko: "이미지→픽셀그리드 — 무료변환기",
  de: "Bild zu Pixel-Raster — Gratis Konverter",
  it: "Immagine in Griglia Pixel — Generatore Gratis",
  nl: "Afbeelding naar Pixelraster — Gratis Generator",
  "zh-CN": "图片转像素格子 — 免费工具",
};

/** Localized page descriptions for Pixel Grid Studio. */
const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "免費圖片轉像素格子工具。適用Minecraft、拼豆、十字繡。100%純前端，無需上傳。",
  ja: "画像をピクセルグリッドに変換。Minecraft・ビーズ向け。100%クライアント処理。",
  es: "Convierte imágenes en cuadrículas pixel. Minecraft, Perler Beads. HTML5 Canvas API. 100% cliente.",
  fr: "Convertissez images en grilles pixel. Minecraft, Perler Beads. HTML5 Canvas API. 100% client.",
  ko: "이미지를 픽셀그리드로 변환. 마인크래프트, 퍼들비드. HTML5 Canvas API. 100% 클라이언트.",
  de: "Bilder in Pixel-Raster. Minecraft, Perler Beads. HTML5 Canvas API. 100% clientseitig.",
  it: "Converti immagini in griglie pixel. Minecraft, Perler Beads. HTML5 Canvas API. 100% lato client.",
  nl: "Afbeeldingen naar pixelraster. Minecraft, Smeltkralen. HTML5 Canvas API. 100% clientzijde.",
  "zh-CN": "免费图片转像素格子工具。适用Minecraft、拼豆、十字绣。HTML5 Canvas API。100%纯前端。",
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
    openGraph: {
      title: PAGE_TITLES[locale] || FALLBACK_TITLE,
      description: PAGE_DESCS[locale] || FALLBACK_DESC,
      url: locale === "en" ? `${BASE}/${path}` : `${BASE}/${locale}/${path}`,
      siteName: "LifeSimGrid",
      type: "website",
      images: [
        {
          url: `${BASE}/og/${path}.svg`,
          width: 1200,
          height: 630,
          alt: PAGE_TITLES[locale] || FALLBACK_TITLE,
        },
      ],
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
