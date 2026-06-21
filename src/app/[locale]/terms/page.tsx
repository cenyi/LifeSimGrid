import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import TermsPage from "@/components/TermsPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** Localized page titles for Terms (template appends " - LifeSimGrid"). */
const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "LifeSimGrid服務條款 — MIT開源獨立工具",
  ja: "LifeSimGrid利用規約 — MITライセンス",
  es: "LifeSimGrid Términos — MIT, Fan Tool",
  fr: "LifeSimGrid Conditions — MIT, Outil Fan",
  ko: "LifeSimGrid 이용약관 — MIT독립도구",
  de: "LifeSimGrid AGB — MIT, Fan-Tool",
  it: "LifeSimGrid Termini — MIT, Fan Tool",
  nl: "LifeSimGrid Voorwaarden — MIT, Fan-Tool",
  "zh-CN": "LifeSimGrid服务条款 — MIT开源独立工具",
};

const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "獨立第三方工具，MIT開源協議，與遊戲主機製造商無關。免費動森我的設計、Mii QR碼工具。純前端，無數據收集。",
  ja: "独立サードパーティ、MITライセンス、ゲーム機メーカー無関係。マイデザイン・Mii QR無料ツール。データ収集なし。",
  es: "Términos: herramienta independiente, licencia MIT. No afiliada a fabricantes. ACNH, Mii gratis.",
  fr: "Conditions : outil tiers indépendant, licence MIT. Non affilié consoles. Custom Designs, Mii gratuits.",
  ko: "독립 서드파티 도구, MIT 라이선스. 콘솔 제조사 무관. 커스텀 디자인, Mii QR 무료.",
  de: "AGB: unabhängiges Drittanbieter-Tool, MIT-Lizenz. Keine Verbindung zu Konsolen. ACNH, Mii.",
  it: "Termini: strumento indipendente, licenza MIT. Non affiliato console. Custom Designs, Mii gratis.",
  nl: "Voorwaarden: onafhankelijke tool, MIT-licentie. Niet gelieerd aan consolefabrikanten. ACNH, Mii.",
  "zh-CN": "独立第三方工具，MIT开源协议，与游戏主机制造商无关。免费动森我的设计、Mii二维码工具。纯前端，无数据收集。",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "terms";
  return {
    title: PAGE_TITLES[locale] || "Terms of Service",
    description: PAGE_DESCS[locale] || "",
    alternates: {
      canonical: locale === "en" ? `${BASE}/terms` : `${BASE}/${locale}/terms`,
      languages: {
        en: `${BASE}/terms`,
        "zh-Hant": `${BASE}/zh-Hant/terms`,
        ja: `${BASE}/ja/terms`,
        es: `${BASE}/es/terms`,
        fr: `${BASE}/fr/terms`,
        ko: `${BASE}/ko/terms`,
        de: `${BASE}/de/terms`,
        it: `${BASE}/it/terms`,
        nl: `${BASE}/nl/terms`,
        "zh-CN": `${BASE}/zh-CN/terms`,
        "x-default": `${BASE}/terms`,
      },
    },
    openGraph: {
      title: PAGE_TITLES[locale] || "Terms of Service",
      description: PAGE_DESCS[locale] || "",
      url: locale === "en" ? `${BASE}/${path}` : `${BASE}/${locale}/${path}`,
      siteName: "LifeSimGrid",
      type: "website",
    },
  };
}

export default async function LocaleTermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <TermsPage />
    </NextIntlClientProvider>
  );
}
