import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import TomodachiLifePersonalityDetailPage, { getPersonalitySlug } from "@/components/TomodachiLifePersonalityDetailPage";
import { PERSONALITIES, getMbtiCode } from "@/lib/types";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "{name}性格（{mbti}）— 朋友聚會性格詳解與相容性",
  ja: "{name}の性格（{mbti}）— 詳解と相性まとめ",
  es: "{name} ({mbti}) en Tomodachi Life: Rasgos y Compatibilidad",
  fr: "Personnalité {name} ({mbti}) dans Tomodachi Life: Traits",
  ko: "{name} 성격 ({mbti}) — 특징과 호환성",
  de: "{name}-Persönlichkeit ({mbti}) in Tomodachi Life: Merkmale",
  it: "Personalità {name} ({mbti}) in Tomodachi: Tratti e Compat",
  nl: "{name}-persoonlijkheid ({mbti}) in Tomodachi Life: Kenmerken",
  "zh-CN": "{name}性格（{mbti}）— 朋友聚会性格详解与兼容性",
  ru: "{name} ({mbti}) в Tomodachi Life: Черты",
  pt: "Personalidade {name} ({mbti}) em Tomodachi Life: Traços",
};

const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "{name}是朋友聚會：新生活中的{mbti}性格類型。了解其性格群組分類、詳細特徵描述、滑桿設定值與其他性格的相容性資訊，幫助你全面深入認識此一性格類型的特色。",
  ja: "{name}はトモダチコレクション 新生活における{mbti}性格タイプ。性格グループ、詳細な特徴、スライダー設定値、他の性格との相性情報を詳しく解説し、全体像を把握できます。",
  es: "{name} es personalidad {mbti} en Tomodachi Life. Conoce su grupo, rasgos, sliders y compatibilidad con otras personalidades.",
  fr: "{name} est une personnalité {mbti} dans Tomodachi Life. Découvrez son groupe, ses traits, ses curseurs et sa compatibilité avec d'autres personnalités.",
  ko: "{name}는 Tomodachi Life: Living the Dream의 {mbti} 성격 유형입니다. 성격 그룹, 상세 특징, 슬라이더 설정값 및 다른 성격과의 호환성 정보를 알아보세요.",
  de: "{name} ist ein {mbti}-Typ in Tomodachi Life. Erfahren Sie mehr über Gruppe, Merkmale, Slider-Einstellungen und Kompatibilität mit anderen Persönlichkeiten.",
  it: "{name} è una personalità {mbti} in Tomodachi Life. Scopri gruppo, tratti, impostazioni slider e compatibilità con altre personalità.",
  nl: "{name} is een {mbti}-persoonlijkheid in Tomodachi Life. Bekijk groep, kenmerken, slider-instellingen en compatibiliteit met andere persoonlijkheden.",
  "zh-CN": "{name}是朋友聚会：新生活中的{mbti}性格类型。了解其性格群组分类、详细特征描述、滑杆设置值与其他性格的兼容性信息，帮助你全面深入认识此一性格类型的特色。",
  ru: "{name} — тип личности {mbti} в Tomodachi Life. Узнайте группу, черты, настройки ползунков и совместимость с другими личностями.",
  pt: "{name} é personalidade {mbti} em Tomodachi Life. Veja grupo, traços, configurações dos sliders e compatibilidade com outras personalidades.",
};

export function generateStaticParams() {
  // Generate all locale × personality combinations
  const result: { locale: string; type: string }[] = [];
  for (const locale of routing.locales) {
    for (const personality of PERSONALITIES) {
      result.push({ locale, type: getPersonalitySlug(personality) });
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
  const personality = PERSONALITIES.find((p) => getPersonalitySlug(p) === type);
  const mbti = personality ? getMbtiCode(personality) : "INFP";
  const slug = type;
  const path = `tomodachi-life-personality/${slug}`;
  const displayName = slug.charAt(0).toUpperCase() + slug.slice(1);

  const titleTemplate = PAGE_TITLES[locale];
  const descTemplate = PAGE_DESCS[locale];
  const title = titleTemplate
    ? titleTemplate.replace("{name}", displayName).replace("{mbti}", mbti)
    : `${displayName} Personality (${mbti}) — Tomodachi Life`;
  const description = descTemplate
    ? descTemplate.replace("{name}", displayName).replace("{mbti}", mbti)
    : `${displayName} is a ${mbti} personality type in Tomodachi Life: Living the Dream. Learn its group, traits, slider settings, and compatibility info.`;

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

export default async function LocalePersonalityDetailPage({
  params,
}: {
  params: Promise<{ locale: string; type: string }>;
}) {
  const { locale, type } = await params;

  if (!routing.locales.includes(locale as "en" | "zh-Hant" | "ja" | "es" | "fr" | "ko" | "de" | "it" | "nl" | "zh-CN" | "ru" | "pt")) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiLifePersonalityDetailPage personalitySlug={type} />;
}
