import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import AcnhPixelStudioPage from "@/components/AcnhPixelStudioPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** Localized page titles for ACNH Pixel Studio (template appends " - LifeSimGrid"). */
const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "動森我的設計像素工作室 — 免費",
  ja: "あつ森マイデザイン変換 — 無料",
  es: "ACNH Pixel Studio — Custom Designs",
  fr: "ACNH Pixel Studio — Custom Designs",
  ko: "모동숲커스텀디자인 — 무료",
  de: "ACNH Pixel-Studio — Custom Designs",
  it: "ACNH Studio Pixel — Custom Designs",
  nl: "ACNH Pixelstudio — Custom Designs",
  "zh-CN": "动森我的设计像素工作室 — 免费",
  ru: "ACNH Pixel Studio — Custom Designs",
  pt: "ACNH Pixel Studio — Custom Designs",
};

/** Localized page descriptions for ACNH Pixel Studio. */
const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "免費動森我的設計像素轉換器。32×32/64×64、FFL匯出、8-bit調色盤。100%純前端。",
  ja: "画像をマイデザイン変換。32×32/64×64、FFL出力、8-bitパレット。100%クライアント処理。",
  es: "Convierte imágenes en Custom Designs ACNH. 32×32/64×64, FFL, escalado smart. 100% cliente.",
  fr: "Convertissez images en Custom Designs ACNH. 32×32/64×64, FFL, échelle auto. 100% client.",
  ko: "이미지를 커스텀디자인으로 변환. 32×32/64×64, FFL, 8-bit팔레트. 100% 클라이언트.",
  de: "Bilder in ACNH-Pixelmuster. 32×32/64×64, FFL-Export, smarte Skalierung. 100% clientseitig.",
  it: "Converti immagini in Custom Designs ACNH. 32×32/64×64, FFL, ridim. smart. 100% lato client.",
  nl: "Afbeeldingen naar ACNH-pixelpatronen. 32×32/64×64, FFL-export, slimme schaling. 100% clientzijde.",
  "zh-CN": "免费动森我的设计像素转换器。32×32/64×64、FFL导出、8-bit调色盘。100%纯前端。",
  ru: "Конвертер ACNH Custom Designs. 32×32/64×64, FFL, 8-bit палитра. 100% клиент.",
  pt: "Converter imagens em ACNH Custom Designs. 32×32/64×64, FFL. 100% cliente.",
};

const FALLBACK_TITLE = "ACNH Custom Design Converter";
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
          url: `${BASE}/og/${path}.svg`,
          width: 1200,
          height: 630,
          alt: PAGE_TITLES[locale] || FALLBACK_TITLE,
        },
      ],
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

  if (!routing.locales.includes(locale as "en" | "zh-Hant" | "ja" | "es" | "fr" | "ko" | "de" | "it" | "nl" | "zh-CN" | "ru" | "pt")) {
    notFound();
  }

  setRequestLocale(locale);

  return <AcnhPixelStudioPage />;
}
