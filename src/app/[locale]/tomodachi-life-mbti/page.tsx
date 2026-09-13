import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale, type NonEnLocale } from "@/i18n/routing";
import TomodachiLifeMbtiPage from "@/components/TomodachiLifeMbtiPage";
import type { Metadata } from "next";
import { languageAlternates, localizedUrl } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

const PAGE_TITLES: Record<NonEnLocale, string> = {
  "zh-Hant": "朋友聚會MBTI 16型配對",
  ja: "トモダチMBTI 16型相性計算",
  es: "Tomodachi Life MBTI — Calc. Compat.",
  fr: "Tomodachi Life MBTI — Calc. Compat.",
  ko: "Tomodachi Life MBTI 16궁합",
  de: "Tomodachi Life MBTI — Kompat.rechner",
  it: "Tomodachi Life MBTI — Calc. Compat.",
  nl: "Tomodachi Life MBTI — Compat.calc",
  "zh-CN": "朋友聚会MBTI 16型配对",
  ru: "Tomodachi Life MBTI — Калькулятор",
  pt: "Tomodachi Life MBTI — Calc. Compat.",
};

const PAGE_DESCS: Record<NonEnLocale, string> = {
  "zh-Hant": "朋友聚會16種Mii性格轉MBTI，互動式配對計算機。性格+星座公式。100%純前端。",
  ja: "トモダチ16種Mii性格をMBTIに変換、相性計算機。性格+星座の公式。100%クライアント。",
  es: "16 tipos Mii a MBTI en Tomodachi Life. Calc. compatibilidad, sinergia zodiacal. 100% cliente.",
  fr: "16 types Mii en MBTI dans Tomodachi Life. Calc. compatibilité, synergie zodiacale. 100% client.",
  ko: "Tomodachi Life 16가지 Mii성격 MBTI변환. 궁합계산기, 별자리시너지. 100% 클라이언트.",
  de: "16 Mii-Typen in MBTI in Tomodachi Life. Kompat.rechner, Tierkreis-Synergie. 100% clientseitig.",
  it: "16 tipi Mii in MBTI in Tomodachi Life. Calc. compat., sinergia zodiacale. 100% lato client.",
  nl: "16 Mii-typen naar MBTI in Tomodachi Life. Compat.calc., dierenriemsynergie. 100% clientzijde.",
  "zh-CN": "朋友聚会16种Mii性格转MBTI，互动式配对计算器。性格+星座公式。100%纯前端。",
  ru: "16 типов Mii в MBTI в Tomodachi Life. Калькулятор совместимости, зодиак. 100% клиент.",
  pt: "16 tipos Mii em MBTI no Tomodachi Life. Calc. compat., sinergia zodiacal. 100% cliente.",
};

const FALLBACK_TITLE = "Tomodachi Life Personality → MBTI Mapping";
const FALLBACK_DESC =
  "Free Tomodachi Life personality to MBTI mapping chart for Living the Dream. 16 types, compatibility calculator with zodiac synergy. 100% client-side.";

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
          url: `${BASE}/og/tomodachi-life-mbti.svg`,
          width: 1200,
          height: 630,
          alt: PAGE_TITLES[locale as NonEnLocale] || FALLBACK_TITLE,
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

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiLifeMbtiPage />;
}
