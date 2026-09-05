import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import TomodachiLifeMbtiDetailPage from "@/components/TomodachiLifeMbtiDetailPage";
import { MBTI_MAP, PERSONALITIES, MBTI_SLUGS } from "@/lib/types";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

const FALLBACK_TITLE = "in Tomodachi Life";
const FALLBACK_DESC =
  "See slider settings, compatibility, and fan insights for this MBTI type in Tomodachi Life: Living the Dream.";

const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "{mbti}在朋友聚會：新生活的性格對應與滑桿設定詳解指南",
  ja: "トモダチの{mbti}性格対応とスライダー設定値の詳解",
  es: "{mbti} en Tomodachi Life: Personalidad, Sliders y Compat.",
  fr: "{mbti} dans Tomodachi Life: Personnalité, Curseurs et Compat",
  ko: "Tomodachi Life에서 {mbti}의 성격 매핑과 슬라이더 설정",
  de: "{mbti} in Tomodachi Life: Persönlichkeit, Slider und Kompat",
  it: "{mbti} in Tomodachi Life: Personalità, Cursori, Compatibilità",
  nl: "{mbti} in Tomodachi Life: Persoonlijkheid, Schuifregelaars",
  "zh-CN": "{mbti}在朋友聚会：新生活的性格对应与滑杆设置详解指南",
  ru: "{mbti} в Tomodachi Life: Личность и Ползунки",
  pt: "{mbti} em Tomodachi Life: Personalidade, Sliders e Compat",
};

const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "查看{mbti}在朋友聚會：新生活中的性格對應、滑桿設定值、與其他性格的相容性以及玩家心得。完整的MBTI性格分析，幫助你全面深入地了解此性格類型的特徵與表現方式。",
  ja: "トモダチコレクション 新生活における{mbti}の性格対応、スライダー設定値、他の性格との相性、ファンインサイトを確認。完全なMBTI性格分析を提供し、全体像を把握できます。",
  es: "Consulta la personalidad correspondiente a {mbti} en Tomodachi Life: ajustes de sliders, compatibilidad con otras personalidades y análisis de los fans.",
  fr: "Consultez la personnalité correspondant à {mbti} dans Tomodachi Life: réglages des curseurs, compatibilité avec d'autres personnalités et analyses des fans.",
  ko: "Tomodachi Life: Living the Dream에서 {mbti}에 해당하는 성격, 슬라이더 설정값, 다른 성격과의 호환성 및 팬 인사이트를 확인하세요. 완전한 MBTI 성격 분석.",
  de: "Slider-Einstellungen, Kompatibilität und Fan-Einblicke für {mbti} in Tomodachi Life. Vollständige MBTI-Persönlichkeitsanalyse.",
  it: "Impostazioni slider, compatibilità e approfondimenti dei fan per {mbti} in Tomodachi Life. Analisi completa della personalità MBTI.",
  nl: "Slider-instellingen, compatibiliteit en fan-inzichten voor {mbti} in Tomodachi Life. Volledige MBTI-persoonlijkheidsanalyse.",
  "zh-CN": "查看{mbti}在朋友聚会：新生活中的性格对应、滑杆设置值、与其他性格的兼容性以及玩家心得。完整的MBTI性格分析，帮助你全面深入地了解此性格类型的特征与表现方式。",
  ru: "Настройки ползунков, совместимость и информация от фанатов для {mbti} в Tomodachi Life. Полный анализ личности MBTI. Полный разбор.",
  pt: "Configurações dos sliders, compatibilidade e informações dos fãs para {mbti} em Tomodachi Life. Análise completa da personalidade MBTI.",
};

export function generateStaticParams() {
  const result: { locale: string; type: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of MBTI_SLUGS) {
      result.push({ locale, type: slug });
    }
  }
  return result;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; type: string }>;
}): Promise<Metadata> {
  const { locale, type } = await params;
  const mbti = type.toUpperCase();
  const personality = PERSONALITIES.find((p) => MBTI_MAP[p] === mbti);
  const path = `tomodachi-life-mbti/${type}`;

  const titleTemplate = PAGE_TITLES[locale];
  const descTemplate = PAGE_DESCS[locale];
  const title = titleTemplate
    ? titleTemplate.replace("{mbti}", mbti)
    : `${mbti} ${FALLBACK_TITLE}`;
  const description = descTemplate
    ? descTemplate.replace("{mbti}", mbti)
    : FALLBACK_DESC;

  return {
    title,
    description,
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
      title,
      description,
      url: locale === "en" ? `${BASE}/${path}` : `${BASE}/${locale}/${path}`,
      siteName: "LifeSimGrid",
      type: "website",
    },
  };
}

export default async function LocaleMbtiDetailPage({
  params,
}: {
  params: Promise<{ locale: string; type: string }>;
}) {
  const { locale, type } = await params;

  if (!routing.locales.includes(locale as "en" | "zh-Hant" | "ja" | "es" | "fr" | "ko" | "de" | "it" | "nl" | "zh-CN" | "ru" | "pt")) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiLifeMbtiDetailPage mbtiSlug={type} />;
}
