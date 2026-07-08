import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import LivingTheGridPage from "@/components/LivingTheGridPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";
const PATH = "living-the-grid";

/** Localized page titles for Living the Grid (template appends " - LifeSimGrid"). */
const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "Living the Grid — 像素格子工具",
  ja: "Living the Grid — ピクセルグリッド",
  es: "Living the Grid — Pixel Grid",
  fr: "Living the Grid — Grille Pixel",
  ko: "Living the Grid — 픽셀그리드",
  de: "Living the Grid — Pixel-Raster",
  it: "Living the Grid — Griglia Pixel",
  nl: "Living the Grid — Pixelraster",
    "zh-CN": "Living the Grid — 像素格子工具",
  ru: "Living the Grid — Пиксельная сетка",
  pt: "Living the Grid — Grade Pixel",
};

/** Localized page descriptions for Living the Grid. */
const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "免費像素格子轉換工具 — Living the Grid 網頁替代方案。適用 Minecraft、拼豆、十字繡、朋友聚會 新生活。100% 瀏覽器執行。",
  ja: "無料ピクセルグリッド変換 — Living the Grid の Web 版代替。Minecraft・ビーズ・トモダチコレクション 新生活対応。100%ブラウザ処理。",
  es: "Convierte imágenes en pixel grid gratis — alternativa web a Living the Grid. Minecraft, Perler Beads, Tomodachi Life. HTML5 Canvas API. 100% cliente.",
  fr: "Convertissez images en grilles pixel gratis — alternative web à Living the Grid. Minecraft, Perler Beads, Tomodachi Life. HTML5 Canvas API. 100% client.",
  ko: "무료 픽셀그리드 변환 — Living the Grid 웹替代. 마인크래프트, 퍼들비드, Tomodachi Life. HTML5 Canvas API. 100% 클라이언트.",
  de: "Bilder in Pixel-Raster gratis — Web-Alternative zu Living the Grid. Minecraft, Perler Beads, Tomodachi Life. HTML5 Canvas API. 100% clientseitig.",
  it: "Converti immagini in griglie pixel gratis — alternativa web a Living the Grid. Minecraft, Perler Beads, Tomodachi Life. HTML5 Canvas API. 100% lato client.",
  nl: "Afbeeldingen naar pixelraster gratis — web-alternatief voor Living the Grid. Minecraft, Smeltkralen, Tomodachi Life. HTML5 Canvas API. 100% clientzijde.",
  "zh-CN": "免费像素格子转换工具 — Living the Grid 网页替代方案。适用 Minecraft、拼豆、十字绣、朋友聚会 新生活。HTML5 Canvas API。100% 纯前端。",
  ru: "Бесплатный конвертер пиксельных сеток — веб-альтернатива Living the Grid. Minecraft, Perler Beads, Tomodachi Life. HTML5 Canvas API. 100% клиент.",
  pt: "Converter imagens em grade pixel grátis — alternativa web a Living the Grid. Minecraft, Perler Beads, Tomodachi Life. HTML5 Canvas API. 100% cliente.",
};

const FALLBACK_TITLE = "Living the Grid";
const FALLBACK_DESC =
  "Free pixel grid converter — the web-based Living the Grid alternative. Convert any image into pixel art grid patterns for Minecraft, Perler Beads, Cross Stitch, and Tomodachi Life: Living the Dream. 64×64 grid for face paint & clothing reference. 100% browser-based.";

/** Generate metadata for the localized Living the Grid page. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: PAGE_TITLES[locale] || FALLBACK_TITLE,
    description: PAGE_DESCS[locale] || FALLBACK_DESC,
    alternates: {
      canonical: locale === "en" ? `${BASE}/${PATH}` : `${BASE}/${locale}/${PATH}`,
      languages: {
        "x-default": `${BASE}/${PATH}`,
        en: `${BASE}/${PATH}`,
        "zh-Hant": `${BASE}/zh-Hant/${PATH}`,
        ja: `${BASE}/ja/${PATH}`,
        es: `${BASE}/es/${PATH}`,
        fr: `${BASE}/fr/${PATH}`,
        ko: `${BASE}/ko/${PATH}`,
        de: `${BASE}/de/${PATH}`,
        it: `${BASE}/it/${PATH}`,
        nl: `${BASE}/nl/${PATH}`,
        "zh-CN": `${BASE}/zh-CN/${PATH}`,
        ru: `${BASE}/ru/${PATH}`,
        pt: `${BASE}/pt/${PATH}`,
      },
    },
    openGraph: {
      title: PAGE_TITLES[locale] || FALLBACK_TITLE,
      description: PAGE_DESCS[locale] || FALLBACK_DESC,
      url: locale === "en" ? `${BASE}/${PATH}` : `${BASE}/${locale}/${PATH}`,
      siteName: "LifeSimGrid",
      type: "website",
      images: [
        {
          url: `${BASE}/og/${PATH}.svg`,
          width: 1200,
          height: 630,
          alt: PAGE_TITLES[locale] || FALLBACK_TITLE,
        },
      ],
    },
  };
}

/** Locale-level Living the Grid page rendered at /{locale}/living-the-grid. */
export default async function LocaleLivingTheGridPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "zh-Hant" | "ja" | "es" | "fr" | "ko" | "de" | "it" | "nl" | "zh-CN" | "ru" | "pt")) {
    notFound();
  }

  setRequestLocale(locale);

  return <LivingTheGridPage />;
}