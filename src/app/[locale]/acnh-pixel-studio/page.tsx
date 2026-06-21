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
};

/** Localized page descriptions for ACNH Pixel Studio. */
const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "免費動森我的設計像素轉換器。支援32×32/64×64密度、FFL匯出、智能縮放、8-bit復古調色盤。100%純前端，無需上傳。",
  ja: "画像をマイデザインに変換。32×32/64×64密度、FFLエクスポート、スマート縮小、8-bitレトロパレット対応。100%クライアント処理。",
  es: "Convierte imágenes en Custom Designs ACNH. 32×32 y 64×64, paleta 15 colores, export FFL, escalado inteligente. 100% cliente, sin servidor.",
  fr: "Convertissez images en Custom Designs ACNH. 32×32 et 64×64, palette 15 couleurs, export FFL, mise à l'échelle intelligente. 100% client, sans serveur.",
  ko: "이미지를 커스텀디자인으로 변환. 32×32/64×64, 15색팔레트, FFL, 스마트스케일링. 100% 클라이언트.",
  de: "Bilder in ACNH-Pixelmuster wandeln. 32×32/64×64, 15-Farben-Palette, FFL-Export, smarte Skalierung. 100% clientseitig, kein Server.",
  it: "Converti immagini in Custom Designs ACNH. 32×32/64×64, palette 15 colori, export FFL, ridim. intelligente. 100% lato client, nessun server.",
  nl: "Afbeeldingen omzetten naar ACNH-pixelpatronen. 32×32/64×64, 15-kleurenpalet, FFL-export, slimme schaling. 100% clientzijde, geen server.",
  "zh-CN": "免费动森我的设计像素转换器。支持32×32/64×64密度、FFL导出、智能缩放、8-bit复古调色盘。100%纯前端，无需上传。"
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

  if (!routing.locales.includes(locale as "en" | "zh-Hant" | "ja" | "es" | "fr" | "ko" | "de" | "it" | "nl" | "zh-CN")) {
    notFound();
  }

  setRequestLocale(locale);

  return <AcnhPixelStudioPage />;
}
