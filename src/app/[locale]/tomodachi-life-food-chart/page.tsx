import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale, type NonEnLocale } from "@/i18n/routing";
import TomodachiLifeFoodChartPage from "@/components/TomodachiLifeFoodChartPage";
import type { Metadata } from "next";
import { languageAlternates, localizedUrl } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

const PAGE_TITLES: Record<NonEnLocale, string> = {
  "zh-Hant": "朋友聚會食物圖表與追蹤器",
  ja: "トモダチ食品チャートとトラッカー",
  es: "Tabla y rastreador de comida",
  fr: "Tableau et suivi des aliments",
  ko: "Tomodachi Life 음식 차트와 트래커",
  de: "Tomodachi Life Essenschart + Tracker",
  it: "Tabella e tracker degli alimenti",
  nl: "Eetkaart en tracker Tomodachi Life",
  "zh-CN": "朋友聚会食物图表与追踪器",
  ru: "Диаграмма еды и трекер Tomodachi",
  pt: "Gráfico de comida e tracker Tomodachi",
};

const PAGE_DESCS: Record<NonEnLocale, string> = {
  "zh-Hant": "Tomodachi Life 食物資料庫，附反應圖表與食物追蹤器。預測 Mii 會愛上或討厭哪些食物。純瀏覽器處理，無資料上傳。",
  ja: "Tomodachi Life 食品DBと反応チャート、食品トラッカー付き。Miiの好物・嫌いな食べ物を予測します。ブラウザ内完結、データ送信なし。",
  es: "Base de datos de comida de Tomodachi Life con gráfico de reacciones y rastreador. Predice qué comida ama u odia tu Mii. 100% en tu navegador.",
  fr: "Base d'aliments Tomodachi Life avec tableau des réactions et suivi. Prédit quel aliment ton Mii adore ou déteste. 100% dans ton navigateur.",
  ko: "Tomodachi Life 음식 DB와 반응 차트, 음식 트래커. Mii가 좋아하는 음식을 예측합니다. 브라우저 처리, 전송 없음.",
  de: "Tomodachi Life Essens-Datenbank mit Reaktionschart und Tracker. Sagt dir, welches Essen dein Mii liebt oder hasst. 100% im Browser.",
  it: "Database di alimenti Tomodachi Life con grafico delle reazioni e tracker. Predice quali cibi ama o odia il tuo Mii. 100% nel browser.",
  nl: "Eetdatabase Tomodachi Life met reactiechart en tracker. Voorspelt welke etenswaren je Mii liefheeft of haat. 100% in je browser.",
  "zh-CN": "Tomodachi Life 食物数据库，附反应图表与食物追踪器。预测 Mii 会爱上或讨厌哪些食物。纯浏览器处理，无数据上传。",
  ru: "База данных еды Tomodachi Life с графиком реакций и трекером. Предсказывает, какую еду любит или не любит ваш Mii. В браузере.",
  pt: "Base de dados de comida do Tomodachi Life com gráfico de reações e tracker. Prediz quais comidas o Mii adora ou odeia. 100% no navegador.",
};

const FALLBACK_TITLE = "Tomodachi Life Food Chart & Tracker";
const FALLBACK_DESC =
  "Tomodachi Life food database with reaction chart and a localStorage food tracker. Predict which foods your Mii will love or dislike. 100% client-side, no data leaves your browser.";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "tomodachi-life-food-chart";
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

export default async function LocaleTomodachiLifeFoodChartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiLifeFoodChartPage />;
}
