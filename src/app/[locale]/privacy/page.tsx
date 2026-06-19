import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import PrivacyPage from "@/components/PrivacyPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "隱私政策 - LifeSimGrid",
  ja: "プライバシーポリシー - LifeSimGrid",
  es: "Política de privacidad - LifeSimGrid",
  fr: "Politique de confidentialité - LifeSimGrid",
  ko: "개인정보 보호정책 - LifeSimGrid",
  de: "Datenschutzerklärung - LifeSimGrid",
  it: "Informativa sulla privacy - LifeSimGrid",
  nl: "Privacybeleid - LifeSimGrid",
  "zh-CN": "隐私政策 - LifeSimGrid",
};

const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "LifeSimGrid 隱私政策：100% 純前端處理，不收集數據，無後端伺服器。",
  ja: "LifeSimGridプライバシーポリシー：100%クライアントサイド処理、データ収集なし、バックエンドサーバーなし。",
  es: "Política de privacidad de LifeSimGrid: procesamiento 100% del lado del cliente, sin recopilación de datos, sin servidores backend.",
  fr: "Politique de confidentialité de LifeSimGrid : traitement 100% côté client, aucune collecte de données, aucun serveur backend.",
  ko: "LifeSimGrid 개인정보 보호정책: 100% 클라이언트 사이드 처리, 데이터 수집 없음, 백엔드 서버 없음.",
  de: "LifeSimGrid Datenschutzerklärung: 100% clientseitige Verarbeitung, keine Datenerfassung, kein Backend-Server.",
  it: "Informativa sulla privacy di LifeSimGrid: elaborazione 100% lato client, nessuna raccolta di dati, nessun server backend.",
  nl: "LifeSimGrid privacybeleid: 100% verwerking aan de clientzijde, geen gegevensverzameling, geen backend-server.",
  "zh-CN": "LifeSimGrid 隐私政策：100%纯前端处理，不收集数据，无后端服务器。",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
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
      },
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
