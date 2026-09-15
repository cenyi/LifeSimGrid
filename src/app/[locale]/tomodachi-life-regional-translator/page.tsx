import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale, type NonEnLocale } from "@/i18n/routing";
import TomodachiLifeRegionalTranslatorPage from "@/components/TomodachiLifeRegionalTranslatorPage";
import type { Metadata } from "next";
import { languageAlternates, localizedUrl } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** Hand-written per-locale meta (en excluded — served by root fallback). */
const PAGE_TITLES: Record<NonEnLocale, string> = {
  "zh-Hant": "朋友聚會區域名字翻譯器",
  ja: "トモダチ地域名翻訳ツール",
  es: "Traductor nombres regionales",
  fr: "Traducteur de noms régionaux",
  ko: "토모다치 지역 이름 번역기",
  de: "Regionaler Namenübersetzer",
  it: "Traduttore nomi regionali",
  nl: "Regionale namenvertaler",
  "zh-CN": "朋友聚会区域名字翻译器",
  ru: "Переводчик имён Tomodachi",
  pt: "Tradutor de nomes regionais",
};

const PAGE_DESCS: Record<NonEnLocale, string> = {
  "zh-Hant": "跨區翻譯朋友聚會 Mii 名字。輸入名字與來源地區，即可查看日本、北美、歐洲、韓國與中國的對應名字，亦可產生符合當地習慣的新名字。",
  ja: "トモダチの Mii 名を地域翻訳。日本・北米・欧・韓・中での対応名前を見たり、地域らしい新しい名前を生成できる。",
  es: "Traduce nombres de Mii entre regiones de Tomodachi Life: equivalentes en Japón, América, Europa, Corea y China, más generador de nombres.",
  fr: "Traduisez les noms Mii entre régions Tomodachi Life : équivalents au Japon, en Amérique du Nord, en Europe, en Corée et en Chine.",
  ko: "토모다치 라이프 지역 간 Mii 이름 번역: 일본, 북미, 유럽, 한국, 중국 대응 이름과 지역 이름 생성기.",
  de: "Mii-Namen zwischen Tomodachi-Life-Regionen übersetzen: Entsprechungen in Japan, Nordamerika, Europa, Korea, China plus Generator.",
  it: "Traduci nomi Mii tra regioni Tomodachi Life: equivalenti in Giappone, Nord America, Europa, Corea e Cina, più un generatore di nomi.",
  nl: "Vertaal Mii-namen tussen Tomodachi Life-regio's: equivalenten in Japan, Noord-Amerika, Europa, Korea en China, plus een naamgenerator.",
  "zh-CN": "跨区域翻译朋友聚会 Mii 名字。输入名字与来源地区，即可查看日本、北美、欧洲、韩国与中国的对应名字，亦可生成符合当地习惯的新名字。",
  ru: "Переводите имена Mii между регионами Tomodachi Life: соответствия в Японии, Северной Америке, Европе, Корее и Китае, плюс генератор региональных имён.",
  pt: "Traduza nomes de Mii entre regiões do Tomodachi Life: equivalentes no Japão, América do Norte, Europa, Coreia e China, mais um gerador de nomes regionais.",
};

const FALLBACK_TITLE = "Tomodachi Life Regional Name Translator";
const FALLBACK_DESC =
  "Translate Mii names across Tomodachi Life regions: equivalents in Japan, North America, Europe, Korea and China, plus a region-authentic name generator. 100% in your browser.";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "tomodachi-life-regional-translator";
  return {
    title: PAGE_TITLES[locale as NonEnLocale] || FALLBACK_TITLE,
    description: PAGE_DESCS[locale as NonEnLocale] || FALLBACK_DESC,
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
          url: `${BASE}/og/tomodachi-life-regional-translator.svg`,
          width: 1200,
          height: 630,
          alt: PAGE_TITLES[locale as NonEnLocale] || FALLBACK_TITLE,
        },
      ],
    },
  };
}

export default async function LocaleRegionalTranslatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiLifeRegionalTranslatorPage />;
}
