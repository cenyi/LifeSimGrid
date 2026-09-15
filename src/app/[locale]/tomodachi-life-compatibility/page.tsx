import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale, type NonEnLocale } from "@/i18n/routing";
import TomodachiCompatibilityPage from "@/components/TomodachiCompatibilityPage";
import type { Metadata } from "next";
import { languageAlternates, localizedUrl } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

const PAGE_TITLES: Record<NonEnLocale, string> = {
  "zh-Hant": "朋友聚會配對計算機",
  ja: "トモダチ相性計算機",
  es: "Calculadora Compat. Tomodachi",
  fr: "Calc. Compat. Tomodachi Life",
  ko: "Tomodachi Life 궁합 계산기",
  de: "Tomodachi Life Kompat.rechner",
  it: "Calc. Compat. Tomodachi Life",
  nl: "Compat.calc. Tomodachi Life",
  "zh-CN": "朋友聚会配对计算器",
  ru: "Калькулятор совместимости Tomodachi",
  pt: "Calculadora Compat. Tomodachi",
};

const PAGE_DESCS: Record<NonEnLocale, string> = {
  "zh-Hant": "朋友聚會配對計算機。星座與 16 性格（MBTI）計算戀愛與友情分數。100% 純前端，免註冊。",
  ja: "トモダチライフ相性計算機。星座と16性格（MBTI）で恋愛・友情スコアを計算。100%ブラウザベース、登録不要。",
  es: "Calculadora de compatibilidad Tomodachi Life. Signos + 16 personalidades (MBTI) para scores de romance y amistad. 100% en el navegador, sin registro.",
  fr: "Calculateur de compatibilité Tomodachi Life. Signes + 16 personnalités (MBTI) pour les scores amour et amitié. 100% client, sans inscription.",
  ko: "Tomodachi Life 궁합 계산기. 별자리와 MBTI 16가지로 Mii 두 명간 연애/우정 점수 확인. 브라우저 처리.",
  de: "Kostenloser Tomodachi-Life-Kompatibilitätsrechner. Kombiniere Sternzeichen + MBTI für Romantik- & Freundschaftswerte. Im Browser.",
  it: "Calcolatore di compatibilità Tomodachi Life. Segni + 16 personalità (MBTI) per punteggi romance e amicizia. 100% lato client, senza registrazione.",
  nl: "Gratis Tomodachi Life compatibiliteitsrekenmachine. Combineer sterrenbeelden + MBTI voor romance- en vriendschapscores. 100% in je browser.",
  "zh-CN": "朋友聚会配对计算器。星座与 16 性格（MBTI）计算恋爱与友情分数。100% 纯前端，免注册。",
  ru: "Калькулятор совместимости Tomodachi Life. Звёздные знаки + 16 личностей (MBTI) для оценок романтики и дружбы. 100% в браузере, без регистрации.",
  pt: "Calculadora de compatibilidade Tomodachi Life. Signos + 16 personalidades (MBTI) para pontuações de romance e amizade. 100% no navegador, sem registo.",
};

const FALLBACK_TITLE = "Tomodachi Life Compatibility Calculator";
const FALLBACK_DESC =
  "Free Tomodachi Life compatibility calculator. Combine zodiac signs and 16 personality (MBTI) types to compute romance and friendship scores for any two Mii. 100% browser-based, no sign-up.";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "tomodachi-life-compatibility";
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

export default async function LocaleTomodachiCompatibilityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiCompatibilityPage />;
}
