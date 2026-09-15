import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale, type NonEnLocale } from "@/i18n/routing";
import TomodachiLifeGiftItemDbPage from "@/components/TomodachiLifeGiftItemDbPage";
import type { Metadata } from "next";
import { languageAlternates, localizedUrl } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** Hand-written per-locale meta (en excluded — served by root fallback). */
const PAGE_TITLES: Record<NonEnLocale, string> = {
  "zh-Hant": "朋友聚會禮物資料庫",
  ja: "トモダチギフトDB",
  es: "Base de datos regalos Tomodachi",
  fr: "Base de données cadeaux Tomodachi",
  ko: "Tomodachi Life 선물 DB",
  de: "Geschenke-Datenbank Tomodachi",
  it: "Database regali Tomodachi",
  nl: "Cadeaudatabase Tomodachi",
  "zh-CN": "朋友聚会礼物数据库",
  ru: "База подарков Tomodachi",
  pt: "Base de dados de presentes",
};

const PAGE_DESCS: Record<NonEnLocale, string> = {
  "zh-Hant": "免費 Mii 禮物資料庫。按類別搜尋禮物、查性格親和分、建願望清單、隨機抽禮物。純瀏覽器處理，免註冊。",
  ja: "無料 Mii ギフトDB。カテゴリ検索、性格親和スコア、お気に入りリスト、ランダムギフト。ブラウザ内完結、登録不要。",
  es: "Base de datos de regalos de Tomodachi Life. Busca por categoría, afinidad por personalidad y lista de deseos. 100% en el navegador, sin registro.",
  fr: "Base de données de cadeaux Tomodachi Life. Recherche par catégorie, affinité par personnalité et liste de souhaits. 100% dans ton navigateur.",
  ko: "무료 Mii 선물 DB. 카테고리 검색, 성격 친화도, 찜 목록, 랜덤 선물. 브라우저에서 처리, 가입 불필요.",
  de: "Geschenke-Datenbank für Tomodachi Life. Suche nach Kategorie, Affinität nach Persönlichkeit und Wunschliste. Im Browser.",
  it: "Database regali di Tomodachi Life. Cerca per categoria, affinità per personalità e lista desideri. 100% nel browser, senza registrazione.",
  nl: "Cadeaudatabase voor Tomodachi Life. Zoek op categorie, affiniteit per persoonlijkheid en verlanglijstje. 100% in je browser, zonder registratie.",
  "zh-CN": "免费 Mii 礼物数据库。按类别搜索礼物、查性格亲和分、建愿望清单、随机抽礼物。纯浏览器处理，免注册。",
  ru: "База подарков и предметов Tomodachi Life. Поиск по категории, совместимость с личностями и список желаний. 100% в браузере, без регистрации.",
  pt: "Base de dados de presentes de Tomodachi Life. Procura por categoria, afinidade por personalidade e lista de desejos. 100% no navegador, sem registo.",
};

const FALLBACK_TITLE = "Tomodachi Life Gift & Item Database";
const FALLBACK_DESC =
  "Free Tomodachi Life gift finder and item database. Search gifts by category, get affinity scores for each personality, build a wishlist and a random gift picker. 100% in your browser.";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "tomodachi-life-gift-item-db";
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
          url: `${BASE}/og/tomodachi-life-gift-item-db.svg`,
          width: 1200,
          height: 630,
          alt: PAGE_TITLES[locale as NonEnLocale] || FALLBACK_TITLE,
        },
      ],
    },
  };
}

export default async function LocaleGiftItemDbPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiLifeGiftItemDbPage />;
}