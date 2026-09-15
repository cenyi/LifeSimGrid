import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale, type NonEnLocale } from "@/i18n/routing";
import TomodachiLifeQuestPartyBuilderPage from "@/components/TomodachiLifeQuestPartyBuilderPage";
import type { Metadata } from "next";
import { languageAlternates, localizedUrl } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** Hand-written per-locale meta (en excluded — served by root fallback). */
const PAGE_TITLES: Record<NonEnLocale, string> = {
  "zh-Hant": "朋友聚會任務隊伍組建器",
  ja: "トモダチクエストチームビルダー",
  es: "Builder Equipo Quest Tomodachi",
  fr: "Bâtisseur Équipe Quest Tomodachi",
  ko: "Tomodachi Life 퀘스트 팀 빌더",
  de: "Tomodachi Life Quest-Team-Baukasten",
  it: "Builder Squadra Quest Tomodachi",
  nl: "Quest-team builder Tomodachi",
  "zh-CN": "朋友聚会任务队伍组建器",
  ru: "Сборник отрядов Quest Tomodachi",
  pt: "Builder de equipa Quest Tomodachi",
};

const PAGE_DESCS: Record<NonEnLocale, string> = {
  "zh-Hant": "免費 Mii 任務隊伍組建器。從 16 性格選 4 隻 Mii，算協同分與角色分配（領隊／支援／探路／萬用）。純瀏覽器處理，免註冊。",
  ja: "無料 Mii クエストチームビルダー。16 性格から 4 人で協同スコアと役割を確認。ブラウザ内完結、登録不要。",
  es: "Constructor de equipo quest de Tomodachi Life. Elige 4 Miis de 16 personalidades para sinergia y roles. 100% en tu navegador, sin registro.",
  fr: "Bâtisseur d'équipe de quest Tomodachi Life. Choisis 4 Miis parmi 16 personnalités pour synergie et rôles. 100% dans ton navigateur.",
  ko: "무료 Mii 퀘스트 팀 빌더. 16성격에서 4명 선택해 시너지 점수와 역할 확인. 브라우저에서 처리, 가입 불필요.",
  de: "Gratis Mii-Quest-Team-Baukasten. Wähle 4 Miis für Synergie-Score und Rollen (Leader, Scout). Im Browser, ohne Anmeldung.",
  it: "Builder di squadra quest per Tomodachi Life. Scegli 4 Mii per punteggio di sinergia e ruoli. 100% nel browser, senza registrazione.",
  nl: "Gratis Mii quest-team builder. Kies 4 Miis voor synergie-score en rollen. 100% in je browser, zonder registratie.",
  "zh-CN": "免费 Mii 任务队伍组建器。从 16 性格选 4 只 Mii，算协同分与角色分配（领队／支援／探路／万能）。纯浏览器处理，免注册。",
  ru: "Бесплатный Mii-сборник отрядов Quest для Tomodachi Life. Выбери 4 Miis из 16 личностей для оценки синергии и ролей. 100% в браузере, без регистрации.",
  pt: "Builder de equipa de quest de Tomodachi Life. Escolhe 4 Miis para pontuação de sinergia e papéis. 100% no navegador, sem registo.",
};

const FALLBACK_TITLE = "Tomodachi Life Quest Party Builder";
const FALLBACK_DESC =
  "Free Tomodachi Life quest team builder. Pick 4 Miis from 16 personality types, get a synergy score with role assignments (leader, support, scout, wildcard). 100% in your browser.";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "tomodachi-life-quest-party-builder";
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
          url: `${BASE}/og/tomodachi-life-quest-party-builder.svg`,
          width: 1200,
          height: 630,
          alt: PAGE_TITLES[locale as NonEnLocale] || FALLBACK_TITLE,
        },
      ],
    },
  };
}

export default async function LocaleQuestPartyBuilderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiLifeQuestPartyBuilderPage />;
}
