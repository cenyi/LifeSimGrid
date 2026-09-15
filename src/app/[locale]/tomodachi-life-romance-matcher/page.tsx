import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale, type NonEnLocale } from "@/i18n/routing";
import TomodachiLifeRomanceMatcherPage from "@/components/TomodachiLifeRomanceMatcherPage";
import type { Metadata } from "next";
import { languageAlternates, localizedUrl } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** Hand-written per-locale meta (en excluded — served by root fallback). */
const PAGE_TITLES: Record<NonEnLocale, string> = {
  "zh-Hant": "朋友聚會戀愛配對器",
  ja: "トモダチ恋愛マッチャー",
  es: "Match. Romance Tomodachi",
  fr: "Match. Romance Tomodachi",
  ko: "Tomodachi Life 연애 매처",
  de: "Tomodachi Life Liebesmatch",
  it: "Match. Romance Tomodachi",
  nl: "Romance match. Tomodachi",
  "zh-CN": "朋友聚会恋爱配对器",
  ru: "Совместимость Tomodachi: любовь",
  pt: "Match. Romance Tomodachi",
};

const PAGE_DESCS: Record<NonEnLocale, string> = {
  "zh-Hant": "免費 Mii 戀愛配對器。選兩位 Mii（星座＋16 性格）算戀愛分、友情加成的最佳 pair。純瀏覽器處理，免註冊。",
  ja: "無料 Mii 恋愛マッチャー。2 人の Mii（星座＋16 性格）で恋愛スコア、友情ボーナス、ベストカップルを探す。ブラウザ内完結、登録不要。",
  es: "Matcher de romance de Tomodachi Life. Elige 2 Miis para puntuación de romance y amistad. 100% en tu navegador, sin registro.",
  fr: "Matchmaker de romance Tomodachi Life. Choisis 2 Miis pour un score d'amour et d'amitié. 100% dans ton navigateur, sans inscription.",
  ko: "무료 Mii 연애 매처. 두 Mii로 연애 점수, 우정 점수, 베스트 커플 확인. 브라우저에서 처리, 가입 불필요.",
  de: "Gratis Mii-Liebes-Matcher. Wähle 2 Miis für Romantik- und Freundschaftsscores und den Paar-Explorer. Im Browser, ohne Anmeldung.",
  it: "Matchmaker di romance per Tomodachi Life. Scegli 2 Mii per punteggio romance e amicizia. 100% nel browser, senza registrazione.",
  nl: "Gratis Mii romance matcher. Kies 2 Miis voor romance- en vriendschapscores. 100% in je browser, zonder registratie.",
  "zh-CN": "免费 Mii 恋爱配对器。选两位 Mii（星座＋16 性格）算恋爱分、友情加成的最佳 pair。纯浏览器处理，免注册。",
  ru: "Бесплатный Mii-матчер для Tomodachi Life. Выбери 2 Miis (знак + 16 личностей) для оценок романтики и дружбы. 100% в браузере, без регистрации.",
  pt: "Matchmaker de romance de Tomodachi Life. Escolhe 2 Miis para pontuação de romance e amizade. 100% no navegador, sem registo.",
};

const FALLBACK_TITLE = "Tomodachi Life Romance Matcher";
const FALLBACK_DESC =
  "Free Tomodachi Life romance matcher. Pick two Miis (zodiac + 16 personality) to get a romance score, friendship bonus and best-couple explorer. 100% in your browser.";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "tomodachi-life-romance-matcher";
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
          url: `${BASE}/og/tomodachi-life-romance-matcher.svg`,
          width: 1200,
          height: 630,
          alt: PAGE_TITLES[locale as NonEnLocale] || FALLBACK_TITLE,
        },
      ],
    },
  };
}

export default async function LocaleRomanceMatcherPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiLifeRomanceMatcherPage />;
}
