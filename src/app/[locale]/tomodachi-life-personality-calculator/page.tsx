import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import TomodachiLifePersonalityCalculatorPage from "@/components/TomodachiLifePersonalityCalculatorPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "朋友聚會性格計算機｜滑桿判定Mii性格與MBTI對應",
  ja: "トモダチ性格計算機｜スライダーでMii性格とMBTIを判定",
  es: "Calculadora Personalidad Tomodachi Life: Sliders MBTI",
  fr: "Calculateur Personnalité Tomodachi Life: Curseurs MBTI",
  ko: "Tomodachi Life 성격 계산기: 슬라이더로 MBTI 매핑",
  de: "Tomodachi Persönlichkeitsrechner: Slider MBTI",
  it: "Calcolatore Personalità Tomodachi Life: Cursori MBTI",
  nl: "Tomodachi Persoonlijkheidsberekening: Schuifregelaars",
  "zh-CN": "朋友聚会性格计算器｜滑杆判定Mii性格与MBTI对应",
  ru: "Калькулятор личности Tomodachi Life: ползунки MBTI",
  pt: "Calculadora Personalidade Tomodachi: Sliders MBTI",
};

const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "免費朋友聚會性格計算機，調整4個滑桿即可瞬間判定Mii性格類型與MBTI對應關係。基於MBTI四軸設計，100%純前端運算，無需上傳任何資料，隱私安全有保障，操作簡單快速。",
  ja: "無料のトモダチ性格計算機。4つのスライダーを調整してMiiの性格タイプとMBTIマッピングを瞬時に判定します。MBTI四軸に基づく設計、100%クライアント側で処理、データのアップロード不要。",
  es: "Calculadora de personalidad Tomodachi Life. Ajusta 4 deslizadores para obtener el tipo de tu Mii y su MBTI. 100% en el lado del cliente.",
  fr: "Calculateur de personnalité Tomodachi Life. Ajustez 4 curseurs pour obtenir le type de votre Mii et son MBTI. 100% côté client.",
  ko: "무료 Tomodachi Life 성격 계산기. 4개 슬라이더로 Mii 성격 유형과 MBTI 매핑을 즉시 확인하세요. 100% 클라이언트 처리, 안전합니다.",
  de: "Kostenloser Tomodachi Persönlichkeitsrechner. 4 Schieberegler bestimmen sofort Mii-Typ und MBTI. 100% clientseitig.",
  it: "Calcolatore di personalità Tomodachi Life. Regola 4 cursori per ottenere il tipo del tuo Mii e il suo MBTI. 100% lato client.",
  nl: "Tomodachi persoonlijkheidsberekening. Stel 4 schuifregelaars in voor het type van je Mii en MBTI. 100% aan de clientzijde.",
  "zh-CN": "免费朋友聚会性格计算器，调整4个滑杆即可瞬间判定Mii性格类型与MBTI对应关系。基于MBTI四轴设计，100%纯前端运算，无需上传任何数据，隐私安全有保障，操作简单快速。",
  ru: "Калькулятор личности Tomodachi Life. Настройте 4 ползунка для определения типа Mii и MBTI. 100% на стороне клиента.",
  pt: "Calculadora de personalidade Tomodachi Life. Ajusta 4 controlos para obter o tipo do teu Mii e seu MBTI. 100% no lado do cliente.",
};

const FALLBACK_TITLE = "Tomodachi Life Personality Calculator";
const FALLBACK_DESC =
  "Free Tomodachi Life personality calculator for Living the Dream. Adjust 4 sliders to get your Mii personality type and MBTI mapping.";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "tomodachi-life-personality-calculator";
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
        ru: `${BASE}/ru/${path}`,
        pt: `${BASE}/pt/${path}`,
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
          url: `${BASE}/og/tomodachi-life-personality-calculator.svg`,
          width: 1200,
          height: 630,
          alt: "Tomodachi Life Personality Calculator",
        },
      ],
    },
  };
}

export default async function LocaleTomodachiLifePersonalityCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "zh-Hant" | "ja" | "es" | "fr" | "ko" | "de" | "it" | "nl" | "zh-CN" | "ru" | "pt")) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiLifePersonalityCalculatorPage />;
}
