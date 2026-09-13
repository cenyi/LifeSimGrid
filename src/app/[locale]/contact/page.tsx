import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ContactPage from "@/components/ContactPage";
import type { Metadata } from "next";
import type { Locale, NonEnLocale } from "@/i18n/routing";
import { languageAlternates, localizedUrl } from "@/lib/locale-urls";

const BASE = "https://lifesimgrid.org";

/** Localized page titles for Contact (template appends " - LifeSimGrid"). */
const PAGE_TITLES: Record<NonEnLocale, string> = {
  "zh-Hant": "聯絡LifeSimGrid — 技術支援",
  ja: "LifeSimGridお問い合わせ",
  es: "Contacto LifeSimGrid — Soporte",
  fr: "Contact LifeSimGrid — Support",
  ko: "LifeSimGrid 문의 — 기술지원",
  de: "LifeSimGrid Kontakt — Support",
  it: "Contatti LifeSimGrid — Supporto",
  nl: "Contact LifeSimGrid — Support",
  "zh-CN": "联系LifeSimGrid — 技术支持",
  ru: "Контакт LifeSimGrid — Поддержка",
  pt: "Contato LifeSimGrid — Suporte",
};

const PAGE_DESCS: Record<NonEnLocale, string> = {
  "zh-Hant": "技術支援、錯誤回報或合規諮詢。歡迎動森我的設計、Mii QR碼工具反饋。100%純前端。",
  ja: "テクニカルサポート、バグ報告。マイデザイン・Mii QRツールへのご意見歓迎。100%クライアント。",
  es: "Soporte técnico, reporte de bugs. Feedback sobre ACNH Custom Designs, Mii. 100% cliente.",
  fr: "Support technique, signalement de bugs. Feedback Custom Designs ACNH, Mii. 100% client.",
  ko: "기술 지원, 버그 신고. 커스텀 디자인, Mii QR 피드백 환영. 100% 클라이언트.",
  de: "Technischer Support, Fehlerberichte. Feedback zu ACNH, Mii. 100% clientseitig.",
  it: "Supporto tecnico, segnalazione bug. Feedback Custom Designs ACNH, Mii. 100% lato client.",
  nl: "Technische ondersteuning, bugrapporten. Feedback ACNH Custom Designs, Mii. 100% clientzijde.",
  "zh-CN": "技术支持、错误报告或合规咨询。欢迎动森我的设计、Mii二维码工具反馈。100%纯前端。",
  ru: "Техподдержка, отчёты об ошибках. ACNH Custom Designs, Mii. 100% клиент.",
  pt: "Suporte técnico, relatório de bugs. ACNH Custom Designs, Mii. 100% cliente.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "contact";
  return {
    title: PAGE_TITLES[locale as NonEnLocale] || "Contact Us",
    description: PAGE_DESCS[locale as NonEnLocale] || "",
    alternates: {
      canonical: localizedUrl(locale as Locale, path),
      languages: languageAlternates("contact"),
    },
    openGraph: {
      title: PAGE_TITLES[locale as NonEnLocale] || "Contact Us",
      description: PAGE_DESCS[locale as NonEnLocale] || "",
        url: localizedUrl(locale as Locale, path),
      siteName: "LifeSimGrid",
      type: "website",
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
