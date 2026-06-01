import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import HomePageContent from "@/components/HomePageContent";
import EnRedirect from "@/components/EnRedirect";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

const LOCALE_TITLES: Record<string, string> = {
  "zh-Hant": "LifeSimGrid - 自訂島嶼助手工具箱",
  ja: "LifeSimGrid - カスタム島アシスタントツールキット",
  es: "LifeSimGrid - Kit de herramientas para tu isla personalizada",
  fr: "LifeSimGrid - Boîte à outils pour votre île personnalisée",
  ko: "LifeSimGrid - 맞춤형 섬 어시스턴트 툴킷",
  de: "LifeSimGrid - Werkzeugkasten für deine personalisierte Insel",
  it: "LifeSimGrid - Kit di strumenti per la tua isola personalizzata",
  nl: "LifeSimGrid - Toolkit voor je gepersonaliseerde eiland",
  "zh-CN": "LifeSimGrid - 自定义岛屿助手工具箱",
};

const LOCALE_DESCS: Record<string, string> = {
  "zh-Hant":
    "像素工作室、QR Code 解鎖器、語音模擬與相容性計算機。100% 純前端，免伺服器。島嶼生活模擬遊戲愛好者工具箱。",
  ja:
    "ピクセルスタジオ、QRコードロック解除、ボイスシミュレーター＆相性計算機。100%クライアントサイド、サーバー不要。",
  es:
    "Estudio de píxeles, desbloqueador de códigos QR, simulador de voz y calculadora de compatibilidad. 100% del lado del cliente, sin servidor.",
  fr:
    "Studio pixel, débloqueur de codes QR, simulateur vocal et calculateur de compatibilité. 100% côté client, sans serveur.",
  ko:
    "픽셀 스튜디오, QR 코드 언록, 음성 시뮬레이터 및 궁합 계산기. 100% 클라이언트 사이드, 서버 불필요.",
  de:
    "Pixel-Studio, QR-Code-Entsperrer, Sprachsimulator und Kompatibilitätsrechner. 100% clientseitig, kein Server.",
  it:
    "Studio pixel, sbloccatore di codici QR, simulatore vocale e calcolatore di compatibilità. 100% lato client, senza server.",
  nl:
    "Pixelstudio, QR-code ontgrendelaar, stemsimulator en compatibiliteitscalculator. 100% aan de clientzijde, geen server.",
  "zh-CN":
    "像素工作室、QR码解锁器、语音模拟与兼容性计算器。100%纯前端，免服务器。岛屿生活模拟游戏爱好者工具箱。",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "en") return {};

  const path = locale;
  return {
    title: LOCALE_TITLES[locale] || "LifeSimGrid",
    description: LOCALE_DESCS[locale] || "",
    alternates: {
      canonical: `${BASE}/${path}`,
      languages: {
        en: `${BASE}/`,
        "zh-Hant": `${BASE}/zh-Hant`,
        ja: `${BASE}/ja`,
        es: `${BASE}/es`,
        fr: `${BASE}/fr`,
        ko: `${BASE}/ko`,
        de: `${BASE}/de`,
        it: `${BASE}/it`,
        nl: `${BASE}/nl`,
        "zh-CN": `${BASE}/zh-CN`,
      },
    },
    openGraph: {
      title: LOCALE_TITLES[locale] || "LifeSimGrid",
      description: LOCALE_DESCS[locale] || "",
      url: `${BASE}/${path}`,
      siteName: "LifeSimGrid",
      type: "website",
      locale: locale === "zh-Hant" ? "zh_TW" : locale === "zh-CN" ? "zh_CN" : locale === "es" ? "es_ES" : locale === "fr" ? "fr_FR" : locale === "ko" ? "ko_KR" : locale === "de" ? "de_DE" : locale === "it" ? "it_IT" : locale === "nl" ? "nl_NL" : locale,
    },
  };
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "zh-Hant" | "ja" | "es" | "fr" | "ko" | "de" | "it" | "nl" | "zh-CN")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  if (locale === "en") {
    return <EnRedirect />;
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <HomePageContent />
    </NextIntlClientProvider>
  );
}
