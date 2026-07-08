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
  "zh-Hant": "動森工具箱：像素・QR・語音・MBTI",
  ja: "どうぶつの森：ピクセル・QR・音声・MBTI",
  es: "ACNH: Pixel, QR, Voz, MBTI — Gratis",
  fr: "ACNH: Pixel, QR, Voix, MBTI — Gratuit",
  ko: "동물의숲：픽셀・QR・음성・MBTI도구",
  de: "ACNH: Pixel, QR, Sprache, MBTI — Gratis",
  it: "ACNH: Pixel, QR, Voce, MBTI — Gratis",
  nl: "ACNH: Pixel, QR, Stem, MBTI — Gratis",
  "zh-CN": "动森工具箱：像素・QR・语音・MBTI",
  ru: "ACNH: Пиксель, QR, Голос, MBTI — Бесплатно",
  pt: "ACNH: Pixel, QR, Voz, MBTI — Grátis",
};

const LOCALE_DESCS: Record<string, string> = {
  "zh-Hant": "免費像素工作室、QR碼解鎖器、語音合成器與MBTI配對計算機。100%純前端處理，無需上傳數據，無需伺服器。支援動森我的設計、Mii QR碼、Tomodachi Life語音與性格配對。",
  ja: "無料ピクセルスタジオ、QR解除、ボイスシミュ・MBTI相性計算機。100%クライアント処理、アップロード不要、サーバー不要。マイデザイン・Mii QR・トモダチ音声・性格相性に対応。",
  es: "Pixel studio, desbloqueador QR, simulador voz y calc. MBTI. 100% cliente, sin servidor. Tools gratis ACNH Custom Designs, Mii y Tomodachi con análisis de compatibilidad.",
  fr: "Studio pixel, débloqueur QR, simulateur voix et calculateur MBTI. 100% client, sans serveur. Outils gratuits Custom Designs ACNH, Mii et Tomodachi avec analyse de compatibilité.",
  ko: "무료 픽셀 스튜디오, QR 언록, 음성 시뮬레이터 및 MBTI 궁합 계산기. 100% 클라이언트 처리, 업로드 불필요, 서버 불필요. 커스텀 디자인, Mii QR, Tomodachi 음성 및 성격 궁합 분석.",
  de: "Pixel-Studio, QR-Entsperrer, Sprachsimulator und MBTI-Rechner. 100% clientseitig, kein Server. Gratis Tools für ACNH Custom Designs, Mii und Tomodachi mit Kompatibilitätsanalyse.",
  it: "Studio pixel, sblocca QR, simulatore voce e calcolatore MBTI. 100% lato client, senza server. Strumenti gratuiti Custom Designs ACNH, Mii e Tomodachi con analisi di compatibilità.",
  nl: "Pixelstudio, QR-ontgrendelaar, stemsimulator en MBTI-calc. 100% clientzijde, geen server. Gratis tools voor ACNH Custom Designs, Mii en Tomodachi met compatibiliteitsanalyse.",
  "zh-CN": "免费像素工作室、QR码解锁器、语音合成器与MBTI配对计算器。100%纯前端处理，无需上传数据，无需服务器。支持动森我的设计、Mii二维码、Tomodachi Life语音与性格配对。",
  ru: "Пиксель-студия, QR-разблокировщик, синтез голоса и калькулятор MBTI. 100% в браузере, без сервера. Бесплатные инструменты ACNH Custom Designs, Mii и Tomodachi с анализом совместимости.",
  pt: "Pixel studio, desbloqueador QR, sintetizador de voz e calc. MBTI. 100% no navegador, sem servidor. Ferramentas grátis ACNH Custom Designs, Mii e Tomodachi com análise de compatibilidade.",
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
    title: { absolute: LOCALE_TITLES[locale] || "LifeSimGrid - Custom Island Companion Toolset" },
    description: LOCALE_DESCS[locale] || "",
    alternates: {
      canonical: `${BASE}/${path}`,
      languages: {
        en: BASE,
        "zh-Hant": `${BASE}/zh-Hant`,
        ja: `${BASE}/ja`,
        es: `${BASE}/es`,
        fr: `${BASE}/fr`,
        ko: `${BASE}/ko`,
        de: `${BASE}/de`,
        it: `${BASE}/it`,
        nl: `${BASE}/nl`,
        "zh-CN": `${BASE}/zh-CN`,
        ru: `${BASE}/ru`,
        pt: `${BASE}/pt`,
        "x-default": BASE,
      },
    },
    openGraph: {
      title: LOCALE_TITLES[locale] || "LifeSimGrid",
      description: LOCALE_DESCS[locale] || "",
      url: `${BASE}/${path}`,
      siteName: "LifeSimGrid",
      type: "website",
      locale: locale === "zh-Hant" ? "zh_TW" : locale === "zh-CN" ? "zh_CN" : locale === "es" ? "es_ES" : locale === "fr" ? "fr_FR" : locale === "ko" ? "ko_KR" : locale === "de" ? "de_DE" : locale === "it" ? "it_IT" : locale === "nl" ? "nl_NL" : locale === "ru" ? "ru_RU" : locale === "pt" ? "pt_BR" : locale,
    },
  };
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "zh-Hant" | "ja" | "es" | "fr" | "ko" | "de" | "it" | "nl" | "zh-CN" | "ru" | "pt")) {
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
