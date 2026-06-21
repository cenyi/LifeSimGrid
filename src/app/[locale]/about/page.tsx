import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import AboutPage from "@/components/AboutPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** Localized page titles for About (template appends " - LifeSimGrid"). */
const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "關於LifeSimGrid — 免費像素畫工具箱",
  ja: "LifeSimGridとは — 無料ツールキット",
  es: "Sobre LifeSimGrid — Pixel Art Open Source",
  fr: "À propos LifeSimGrid — Outils Open Source",
  ko: "LifeSimGrid 소개 — 오픈소스 툴킷",
  de: "Über LifeSimGrid — Open-Source-Toolkit",
  it: "Chi siamo — LifeSimGrid Open Source",
  nl: "Over LifeSimGrid — Open-source Toolkit",
  "zh-CN": "关于LifeSimGrid — 免费像素画工具箱",
};

const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "開源像素畫、化身數據與語音合成工具箱。免費動森我的設計、Mii QR碼、MBTI配對工具。100%純前端。",
  ja: "ピクセルアート・アバターデータ・音声合成のオープンソースツールキット。マイデザイン・Mii QR・MBTI相性無料。100%クライアント処理。",
  es: "Kit open source para pixel art, avatares y síntesis de voz. Tools gratis ACNH Custom Designs, Mii y Tomodachi con MBTI. 100% cliente, sin servidor.",
  fr: "Boîte à outils open source pour pixel art, avatars et synthèse vocale. Outils gratuits Custom Designs ACNH, Mii et Tomodachi avec MBTI. 100% client.",
  ko: "픽셀 아트, 아바타 데이터 및 음성 합성 오픈소스 툴킷. 커스텀 디자인, Mii QR, MBTI 궁합 무료. 100% 클라이언트.",
  de: "Open-Source-Toolkit für Pixel-Art, Avatare und Sprachsynthese. Gratis Tools für ACNH, Mii und Tomodachi mit MBTI. 100% clientseitig.",
  it: "Toolkit open source per pixel art, dati avatar e sintesi vocale. Strumenti gratis Custom Designs ACNH, Mii e Tomodachi con MBTI. 100% lato client.",
  nl: "Open-source toolkit voor pixelart, avatar-data en spraak. Gratis tools voor ACNH Custom Designs, Mii en Tomodachi met MBTI. 100% clientzijde.",
  "zh-CN": "开源像素画、化身数据与语音合成工具箱。免费动森我的设计、Mii二维码、MBTI配对工具。100%纯前端。",","
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "about";
  return {
    title: PAGE_TITLES[locale] || "About Us",
    description: PAGE_DESCS[locale] || "",
    alternates: {
      canonical: locale === "en" ? `${BASE}/about` : `${BASE}/${locale}/about`,
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
        "x-default": `${BASE}/about`,
      },
    },
    openGraph: {
      title: PAGE_TITLES[locale] || "About Us",
      description: PAGE_DESCS[locale] || "",
      url: locale === "en" ? `${BASE}/${path}` : `${BASE}/${locale}/${path}`,
      siteName: "LifeSimGrid",
      type: "website",
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
