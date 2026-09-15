import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale, type NonEnLocale } from "@/i18n/routing";
import TomodachiMiiHeightChartPage from "@/components/TomodachiMiiHeightChartPage";
import type { Metadata } from "next";
import { languageAlternates, localizedUrl } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

const PAGE_TITLES: Record<NonEnLocale, string> = {
  "zh-Hant": "Mii 身高圖表與計算機",
  ja: "Mii身長チャートと計算機",
  es: "Carta y calc. altura Mii",
  fr: "Carte et calc. taille Mii",
  ko: "Mii 키 차트와 계산기",
  de: "Mii-Wuchsdiagramm + Rechner",
  it: "Carta e calc. altezza Mii",
  nl: "Mii-groeidiplann + calc.",
  "zh-CN": "Mii 身高图表与计算器",
  ru: "Диаграмма и калькулятор роста Mii",
  pt: "Gráfico e calc. altura Mii",
};

const PAGE_DESCS: Record<NonEnLocale, string> = {
  "zh-Hant": "朋友聚會 Mii 身高圖表。Mii Maker 3 段滑桿轉 cm・ft-in，含年齡參考與現實對照。100% 純前端，社群估算模型。",
  ja: "Mii Maker 3段階身長スライダーをcm・ft-inに変換。年齢参照と現実比較付き。100%ブラウザ内、コミュニティ推定モデル。",
  es: "Convierte el slider de 3 pasos de Mii Maker a cm y ft-in, con referencia por edad y comparación real. 100% en el navegador.",
  fr: "Convertit le slider 3 étapes de Mii Maker en cm et ft-in, avec référence par âge et comparaison réelle. 100% côté client.",
  ko: "Mii 키 슬라이더(cm/ft-in) 3단계 변환. 연령 참조와 실제 키 비교 포함. 100% 브라우저에서 처리.",
  de: "Wandelt den Mii-Maker-Höhen-Slider in 3 Stufen in cm und ft-in um. Mit Altersreferenz und Realvergleich. 100% im Browser.",
  it: "Carta dell'altezza Mii per Tomodachi Life. Converte il slider a 3 step in cm e ft-in con riferimento per età e confronto reale. 100% nel browser.",
  nl: "Mii-hoogtechart voor Tomodachi Life. Zet de 3-staps Mii Maker-slider om in cm en ft-in, met ouderedereferentie. 100% client.",
  "zh-CN": "朋友聚会 Mii 身高图表。Mii Maker 3 段滑杆转 cm・ft-in，含年龄参考与现实对照。100% 纯前端，社区估算模型。",
  ru: "Диаграмма роста Mii для Tomodachi Life. Перевод 3-ступенчатого слайдера в см и ft-in, с эталоном по возрасту и реальным сравнением. В браузере.",
  pt: "Converte o slider de 3 etapas do Mii Maker para cm e ft-in, com referência por idade e comparação real. 100% no navegador.",
};

const FALLBACK_TITLE = "Mii Height Chart & Calculator";
const FALLBACK_DESC =
  "Mii height chart for Tomodachi Life. Convert the 3-step Mii Maker height slider to cm and ft-in, with age reference and real-world comparison. 100% client-side, community-estimate model.";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "tomodachi-life-mii-height-chart";
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

export default async function LocaleMiiHeightChartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiMiiHeightChartPage />;
}
