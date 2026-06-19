import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import TermsPage from "@/components/TermsPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "服務條款 - LifeSimGrid",
  ja: "利用規約 - LifeSimGrid",
  es: "Términos de servicio - LifeSimGrid",
  fr: "Conditions d'utilisation - LifeSimGrid",
  ko: "이용약관 - LifeSimGrid",
  de: "Nutzungsbedingungen - LifeSimGrid",
  it: "Termini di servizio - LifeSimGrid",
  nl: "Gebruiksvoorwaarden - LifeSimGrid",
  "zh-CN": "服务条款 - LifeSimGrid",
};

const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "LifeSimGrid 服務條款：獨立第三方工具，MIT 開源協議，與任何遊戲主機製造商無關。",
  ja: "LifeSimGrid利用規約：独立したサードパーティツール、MITオープンソースライセンス、ゲーム機メーカーとは無関係。",
  es: "Términos de servicio de LifeSimGrid: herramienta de terceros independiente, licencia MIT de código abierto, no afiliada a ningún fabricante de consolas.",
  fr: "Conditions d'utilisation de LifeSimGrid : outil tiers indépendant, licence MIT open source, non affilié à aucun fabricant de consoles.",
  ko: "LifeSimGrid 이용약관: 독립적인 서드파티 도구, MIT 오픈소스 라이선스, 게임 콘솔 제조사와 무관.",
  de: "LifeSimGrid Nutzungsbedingungen: unabhängiges Drittanbieter-Tool, MIT-Open-Source-Lizenz, nicht verbunden mit Spielekonsolen-Herstellern.",
  it: "Termini di servizio di LifeSimGrid: strumento di terze parti indipendente, licenza MIT open source, non affiliato ad alcun produttore di console.",
  nl: "LifeSimGrid gebruiksvoorwaarden: onafhankelijke third-party tool, MIT open-source licentie, niet gelieerd aan enige consolefabrikant.",
  "zh-CN": "LifeSimGrid 服务条款：独立第三方工具，MIT 开源协议，与任何游戏主机制造商无关。",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
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
      },
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
