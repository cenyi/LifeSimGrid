import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale, type NonEnLocale } from "@/i18n/routing";
import TomodachiLifePersonalityQuizPage from "@/components/TomodachiLifePersonalityQuizPage";
import type { Metadata } from "next";
import { languageAlternates, localizedUrl } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** Hand-written per-locale meta (en excluded — served by root fallback). */
const PAGE_TITLES: Record<NonEnLocale, string> = {
  "zh-Hant": "朋友聚會性格測驗",
  ja: "トモダチ性格クイズ",
  es: "Quiz Personalidad Tomodachi",
  fr: "Quiz Personnalité Tomodachi",
  ko: "Tomodachi Life 성격 퀴즈",
  de: "Tomodachi Life Charakterquiz",
  it: "Quiz Carattere Tomodachi Life",
  nl: "Tomodachi Life persoonlijkheidstest",
  "zh-CN": "朋友聚会性格测验",
  ru: "Квиз на характер Tomodachi",
  pt: "Quiz de Personalidade Tomodachi",
};

const PAGE_DESCS: Record<NonEnLocale, string> = {
  "zh-Hant": "免費性格測驗，8 題找出你的 Mii 遊戲內性格、MBTI 代碼與群組。純瀏覽器處理，免註冊。",
  ja: "無料の性格クイズ。8 問でゲーム内の性格タイプ、MBTI コード、グループを判明。ブラウザ内完結、登録不要。",
  es: "Quiz de personalidad gratis de Tomodachi Life. 8 preguntas revelan tu tipo, MBTI y grupo. 100% en tu navegador, sin registro.",
  fr: "Quiz de personnalité Tomodachi Life gratuit. 8 questions révèlent ton type, MBTI et groupe. 100% client, sans inscription.",
  ko: "무료 Tomodachi Life 성격 퀴즈. 8문제로 게임 내 성격 유형, MBTI 코드, 그룹 확인. 브라우저에서 처리.",
  de: "Gratis Tomodachi Life Charakterquiz. 8 Fragen decken deinen Typ, MBTI-Code und Gruppe auf. 100% im Browser, ohne Anmeldung.",
  it: "Quiz di personalità Tomodachi Life gratuito. 8 domande rivelano il tuo tipo, MBTI e gruppo. 100% nel browser, senza registrazione.",
  nl: "Gratis Tomodachi Life persoonlijkheidsquiz. 8 vragen onthullen je type, MBTI en groep. 100% in je browser, zonder registratie.",
  "zh-CN": "免费性格测验，8 题找出你的 Mii 游戏内性格、MBTI 代码与群组。纯浏览器处理，免注册。",
  ru: "Бесплатный квиз на характер Tomodachi Life. 8 вопросов раскрывают твой тип, MBTI и группу. 100% в браузере, без регистрации.",
  pt: "Quiz de personalidade gratuito de Tomodachi Life. 8 perguntas revelam o teu tipo, MBTI e grupo. 100% no navegador, sem registo.",
};

const FALLBACK_TITLE = "Tomodachi Life Personality Quiz";
const FALLBACK_DESC =
  "Free Tomodachi Life personality quiz. 8 questions reveal your in-game personality type, MBTI code & group. 100% in your browser.";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "tomodachi-life-personality-quiz";
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
          url: `${BASE}/og/tomodachi-life-personality-quiz.svg`,
          width: 1200,
          height: 630,
          alt: PAGE_TITLES[locale as NonEnLocale] || FALLBACK_TITLE,
        },
      ],
    },
  };
}

export default async function LocalePersonalityQuizPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiLifePersonalityQuizPage />;
}
