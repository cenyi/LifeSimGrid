import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import AboutPage from "@/components/AboutPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.com";

const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "關於我們 - LifeSimGrid",
  ja: "私たちについて - LifeSimGrid",
  es: "Sobre nosotros - LifeSimGrid",
  fr: "À propos - LifeSimGrid",
  ko: "소개 - LifeSimGrid",
  de: "Über uns - LifeSimGrid",
  it: "Chi siamo - LifeSimGrid",
  nl: "Over ons - LifeSimGrid",
  "zh-CN": "关于我们 - LifeSimGrid",
};

const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "了解 LifeSimGrid — 獨立開源的像素畫、化身數據配置與 8-bit 語音合成工具箱。",
  ja: "LifeSimGridについて — ピクセルアート、アバターデータ設定、8ビット音声合成の独立したオープンソースツールキット。",
  es: "Conoce LifeSimGrid — Un kit de herramientas independiente y de código abierto para arte de píxeles, configuración de datos de avatares y síntesis de voz 8-bit.",
  fr: "Découvrez LifeSimGrid — Une boîte à outils indépendante et open source pour l'art pixel, la configuration de données d'avatars et la synthèse vocale 8-bit.",
  ko: "LifeSimGrid 소개 — 픽셀 아트, 아바타 데이터 설정 및 8비트 음성 합성을 위한 독립 오픈소스 툴킷.",
  de: "Lerne LifeSimGrid kennen — Ein unabhängiges Open-Source-Toolkit für Pixel-Art, Avatar-Datenkonfiguration und 8-Bit-Sprachsynthese.",
  it: "Scopri LifeSimGrid — Un toolkit indipendente e open source per pixel art, configurazione dati avatar e sintesi vocale 8-bit.",
  nl: "Maak kennis met LifeSimGrid — Een onafhankelijke open-source toolkit voor pixelkunst, avatar-dataconfiguratie en 8-bit spraaksynthese.",
  "zh-CN": "了解 LifeSimGrid — 独立开源的像素画、虚拟化身数据配置与 8-bit 语音合成工具箱。",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: PAGE_TITLES[locale] || "About Us - LifeSimGrid",
    description: PAGE_DESCS[locale] || "",
    alternates: {
      canonical: `${BASE}/${locale}/about`,
      languages: {
        en: `${BASE}/about`,
        "zh-Hant": `${BASE}/zh-Hant/about`,
        ja: `${BASE}/ja/about`,
        es: `${BASE}/es/about`,
        fr: `${BASE}/fr/about`,
        ko: `${BASE}/ko/about`,
        de: `${BASE}/de/about`,
        it: `${BASE}/it/about`,
        nl: `${BASE}/nl/about`,
        "zh-CN": `${BASE}/zh-CN/about`,
      },
    },
  };
}

export default async function LocaleAboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <AboutPage />
    </NextIntlClientProvider>
  );
}
