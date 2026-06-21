import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import TomodachiLifeMbtiPage from "@/components/TomodachiLifeMbtiPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "朋友聚會MBTI 16型配對",
  ja: "トモダチMBTI 16型相性計算",
  es: "Tomodachi Life MBTI — Calc. Compat.",
  fr: "Tomodachi Life MBTI — Calc. Compat.",
  ko: "Tomodachi Life MBTI 16궁합",
  de: "Tomodachi Life MBTI — Kompat.rechner",
  it: "Tomodachi Life MBTI — Calc. Compat.",
  nl: "Tomodachi Life MBTI — Compat.calc",
  "zh-CN": "朋友聚会MBTI 16型配对",
};

const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "朋友聚會16種Mii性格轉MBTI，互動式配對計算機。性格+星座公式。100%純前端。",
  ja: "トモダチ16種Mii性格をMBTIに変換、相性計算機。性格+星座の公式。100%クライアント。",
  es: "16 tipos Mii a MBTI en Tomodachi Life. Calc. compatibilidad, sinergia zodiacal. 100% cliente.",
  fr: "16 types Mii en MBTI dans Tomodachi Life. Calc. compatibilité, synergie zodiacale. 100% client.",
  ko: "Tomodachi Life 16가지 Mii성격 MBTI변환. 궁합계산기, 별자리시너지. 100% 클라이언트.",
  de: "16 Mii-Typen in MBTI in Tomodachi Life. Kompat.rechner, Tierkreis-Synergie. 100% clientseitig.",
  it: "16 tipi Mii in MBTI in Tomodachi Life. Calc. compat., sinergia zodiacale. 100% lato client.",
  nl: "16 Mii-typen naar MBTI in Tomodachi Life. Compat.calc., dierenriemsynergie. 100% clientzijde.",
  "zh-CN": "朋友聚会16种Mii性格转MBTI，互动式配对计算器。性格+星座公式。100%纯前端。",
};

const FALLBACK_TITLE = "Tomodachi Life MBTI Mapping - 16-Personality Converter";
const FALLBACK_DESC =
  "Convert 16 Tomodachi Life Mii personality types to MBTI. Interactive tool with Myers-Briggs compatibility calculator.";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "tomodachi-life-mbti";
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
          url: `${BASE}/og/tomodachi-life-mbti.svg`,
          width: 1200,
          height: 630,
          alt: PAGE_TITLES[locale] || FALLBACK_TITLE,
        },
      ],
    },
  };
}

export default async function LocaleTomodachiLifeMbtiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "zh-Hant" | "ja" | "es" | "fr" | "ko" | "de" | "it" | "nl" | "zh-CN")) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiLifeMbtiPage />;
}
