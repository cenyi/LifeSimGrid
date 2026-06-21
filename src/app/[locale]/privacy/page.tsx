import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import PrivacyPage from "@/components/PrivacyPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** Localized page titles for Privacy (template appends " - LifeSimGrid"). */
const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "LifeSimGrid隱私 — 純前端無數據收集",
  ja: "LifeSimGridプライバシー — データ収集なし",
  es: "LifeSimGrid Privacidad — 100% Cliente",
  fr: "LifeSimGrid Confidentialité — 100% Client",
  ko: "LifeSimGrid 개인정보 — 데이터수집없음",
  de: "LifeSimGrid Datenschutz — 100% Client",
  it: "LifeSimGrid Privacy — 100% Lato Client",
  nl: "LifeSimGrid Privacy — 100% Clientzijde",
  "zh-CN": "LifeSimGrid隐私 — 纯前端无数据收集",
};

const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "100%純前端處理，不收集數據，無追蹤。動森我的設計、Mii QR碼免費工具。無需上傳，無需註冊。",
  ja: "100%クライアント処理、データ収集なし、トラッキングなし。マイデザイン・Mii QR無料ツール。アカウント不要。",
  es: "Privacidad: 100% cliente, sin recopilación, sin rastreo. Tools gratis ACNH Custom Designs, Mii y Tomodachi. Sin cuenta.",
  fr: "Confidentialité : 100% client, aucune collecte, aucun suivi. Outils gratuits Custom Designs ACNH, Mii et Tomodachi. Sans inscription.",
  ko: "100% 클라이언트, 데이터 수집 없음, 추적 없음. 커스텀 디자인, Mii QR 무료. 계정 불필요.",
  de: "Datenschutz: 100% clientseitig, keine Datenerfassung, kein Tracking. Gratis ACNH, Mii und Tomodachi. Keine Registrierung.",
  it: "Privacy: 100% lato client, nessuna raccolta, nessun tracciamento. Strumenti gratis Custom Designs ACNH, Mii e Tomodachi. Senza registrazione.",
  nl: "Privacy: 100% clientzijde, geen verzameling, geen tracking. Gratis ACNH Custom Designs, Mii en Tomodachi. Zonder registratie.",
  "zh-CN": "100%纯前端处理，不收集数据，无追踪。动森我的设计、Mii二维码免费工具。无需上传，无需注册。",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "privacy";
  return {
    title: PAGE_TITLES[locale] || "Privacy Policy",
    description: PAGE_DESCS[locale] || "",
    alternates: {
      canonical: locale === "en" ? `${BASE}/privacy` : `${BASE}/${locale}/privacy`,
      languages: {
        en: `${BASE}/privacy`,
        "zh-Hant": `${BASE}/zh-Hant/privacy`,
        ja: `${BASE}/ja/privacy`,
        es: `${BASE}/es/privacy`,
        fr: `${BASE}/fr/privacy`,
        ko: `${BASE}/ko/privacy`,
        de: `${BASE}/de/privacy`,
        it: `${BASE}/it/privacy`,
        nl: `${BASE}/nl/privacy`,
        "zh-CN": `${BASE}/zh-CN/privacy`,
        "x-default": `${BASE}/privacy`,
      },
    },
    openGraph: {
      title: PAGE_TITLES[locale] || "Privacy Policy",
      description: PAGE_DESCS[locale] || "",
      url: locale === "en" ? `${BASE}/${path}` : `${BASE}/${locale}/${path}`,
      siteName: "LifeSimGrid",
      type: "website",
    },
  };
}

export default async function LocalePrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <PrivacyPage />
    </NextIntlClientProvider>
  );
}
