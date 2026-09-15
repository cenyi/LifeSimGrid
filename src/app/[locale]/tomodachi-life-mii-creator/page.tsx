import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale, type NonEnLocale } from "@/i18n/routing";
import TomodachiLifeMiiCreatorPage from "@/components/TomodachiLifeMiiCreatorPage";
import type { Metadata } from "next";
import { languageAlternates, localizedUrl } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** Hand-written per-locale meta (en excluded — served by root fallback). */
const PAGE_TITLES: Record<NonEnLocale, string> = {
  "zh-Hant": "朋友聚會 Mii 造人 & 角色規劃",
  ja: "Mii クリエイター & キャラ計画",
  es: "Creador Mii & Planificador",
  fr: "Créateur Mii & Planificateur",
  ko: "Mii 크리에이터 & 캐릭터 플래너",
  de: "Mii-Ersteller & Charakterplaner",
  it: "Creatore Mii & Pianificatore",
  nl: "Mii-creëer- & karakters planner",
  "zh-CN": "朋友聚会 Mii 造人 & 角色规划",
  ru: "Создатель Mii и планировщик",
  pt: "Criador Mii & Planeador",
};

const PAGE_DESCS: Record<NonEnLocale, string> = {
  "zh-Hant": "免費 Mii 造人工具。設計 Mii 臉型、由 4 滑桿預測性格與 MBTI、產生名字。100% 純前端，免註冊。",
  ja: "無料で Mii を作成できるツール。Mii の顔をデザインし、4 つのスライダーから性格と MBTI を予測、名前も生成。ブラウザ内完結。",
  es: "Creador de Mii gratis para Tomodachi Life. Diseña su rostro, predice personalidad y MBTI con 4 sliders y genera nombres. 100% en el navegador.",
  fr: "Créateur de Mii gratuit pour Tomodachi Life. Dessine son visage, prédit personnalité et MBTI via 4 sliders et génère des prénoms. 100% client.",
  ko: "무료 Mii 크리에이터 도구. Mii 얼굴 디자인, 4개 슬라이더로 성격과 MBTI 예측, 이름 생성. 100% 브라우저에서 처리.",
  de: "Gratis Mii-Ersteller. Gestalte Gesichter, sage Persönlichkeit & MBTI per 4 Slidern voraus, generiere Namen. Im Browser.",
  it: "Creatore di Mii gratuito per Tomodachi Life. Disegna il volto, predice personalità e MBTI con 4 slider e genera nomi. 100% nel browser.",
  nl: "Gratis Mii-maker voor Tomodachi Life. Ontwerp het gezicht, voorspel persoonlijkheid & MBTI met 4 sliders en genereer namen. 100% in je browser.",
  "zh-CN": "免费 Mii 造人工具。设计 Mii 脸型、由 4 滑杆预测性格与 MBTI、产生名字。100% 纯前端，免注册。",
  ru: "Бесплатный создатель Mii для Tomodachi Life. Спроектируй лицо Mii, предскажи черту характера и MBTI по 4 слайдерам, сгенерируй имя. В браузере.",
  pt: "Criador de Mii gratuito para Tomodachi Life. Desenha o rosto, prevê a personalidade e o MBTI com 4 sliders e gera nomes. 100% no navegador.",
};

const FALLBACK_TITLE = "Tomodachi Life Mii Creator & Character Planner";
const FALLBACK_DESC =
  "Free Tomodachi Life Mii Creator. Design a Mii face, predict personality & MBTI from 4 sliders, and generate names. 100% in your browser.";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "tomodachi-life-mii-creator";
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
          url: `${BASE}/og/tomodachi-life-mii-creator.svg`,
          width: 1200,
          height: 630,
          alt: PAGE_TITLES[locale as NonEnLocale] || FALLBACK_TITLE,
        },
      ],
    },
  };
}

export default async function LocaleMiiCreatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <TomodachiLifeMiiCreatorPage />;
}
