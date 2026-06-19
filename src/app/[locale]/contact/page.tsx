import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ContactPage from "@/components/ContactPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "聯絡我們 - LifeSimGrid",
  ja: "お問い合わせ - LifeSimGrid",
  es: "Contáctanos - LifeSimGrid",
  fr: "Nous contacter - LifeSimGrid",
  ko: "문의하기 - LifeSimGrid",
  de: "Kontakt - LifeSimGrid",
  it: "Contattaci - LifeSimGrid",
  nl: "Contact - LifeSimGrid",
  "zh-CN": "联系我们 - LifeSimGrid",
};

const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "聯繫 LifeSimGrid 團隊：技術支援、錯誤回報或合規諮詢。",
  ja: "LifeSimGridチームへのお問い合わせ：テクニカルサポート、バグ報告、コンプライアンス相談。",
  es: "Contacta al equipo de LifeSimGrid: soporte técnico, reporte de errores o consultas de cumplimiento.",
  fr: "Contactez l'équipe LifeSimGrid : support technique, signalement de bugs ou questions de conformité.",
  ko: "LifeSimGrid 팀에 문의: 기술 지원, 버그 신고 또는 규정 준수 문의.",
  de: "Kontaktiere das LifeSimGrid-Team: technischer Support, Fehlerberichte oder Compliance-Anfragen.",
  it: "Contatta il team LifeSimGrid: supporto tecnico, segnalazione bug o richieste di conformità.",
  nl: "Neem contact op met het LifeSimGrid-team: technische ondersteuning, bugrapporten of compliance-vragen.",
  "zh-CN": "联系 LifeSimGrid 团队：技术支持、错误报告或合规咨询。",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: PAGE_TITLES[locale] || "Contact Us - LifeSimGrid",
    description: PAGE_DESCS[locale] || "",
    alternates: {
      canonical: locale === "en" ? `${BASE}/contact` : `${BASE}/${locale}/contact`,
      languages: {
        en: `${BASE}/contact`,
        "zh-Hant": `${BASE}/zh-Hant/contact`,
        ja: `${BASE}/ja/contact`,
        es: `${BASE}/es/contact`,
        fr: `${BASE}/fr/contact`,
        ko: `${BASE}/ko/contact`,
        de: `${BASE}/de/contact`,
        it: `${BASE}/it/contact`,
        nl: `${BASE}/nl/contact`,
        "zh-CN": `${BASE}/zh-CN/contact`,
      },
    },
  };
}

export default async function LocaleContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ContactPage />
    </NextIntlClientProvider>
  );
}
