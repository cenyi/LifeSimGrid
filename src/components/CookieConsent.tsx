"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "lifesimgrid-consent";

type ConsentStrings = {
  message: string;
  accept: string;
  reject: string;
  privacy: string;
};

const TRANSLATIONS: Record<string, ConsentStrings> = {
  en: {
    message:
      "We use cookies for analytics and advertising. See our Privacy Policy for details.",
    accept: "Accept",
    reject: "Reject",
    privacy: "Privacy Policy",
  },
  "zh-Hant": {
    message: "我們使用 Cookie 進行分析和廣告。詳見隱私政策。",
    accept: "接受",
    reject: "拒絕",
    privacy: "隱私政策",
  },
  "zh-CN": {
    message: "我们使用 Cookie 进行分析和广告。详见隐私政策。",
    accept: "接受",
    reject: "拒绝",
    privacy: "隐私政策",
  },
  ja: {
    message:
      "分析と広告のために Cookie を使用します。詳細はプライバシーポリシーをご覧ください。",
    accept: "受け入れる",
    reject: "拒否",
    privacy: "プライバシーポリシー",
  },
  ko: {
    message:
      "분석 및 광고를 위해 쿠키를 사용합니다. 자세한 내용은 개인정보처리방침을 참조하세요.",
    accept: "수락",
    reject: "거부",
    privacy: "개인정보처리방침",
  },
  es: {
    message:
      "Usamos cookies para análisis y publicidad. Consulta nuestra Política de Privacidad para más detalles.",
    accept: "Aceptar",
    reject: "Rechazar",
    privacy: "Política de Privacidad",
  },
  fr: {
    message:
      "Nous utilisons des cookies à des fins d'analyse et de publicité. Consultez notre Politique de Confidentialité pour plus de détails.",
    accept: "Accepter",
    reject: "Refuser",
    privacy: "Politique de Confidentialité",
  },
  de: {
    message:
      "Wir verwenden Cookies für Analyse und Werbung. Siehe unsere Datenschutzerklärung für Details.",
    accept: "Akzeptieren",
    reject: "Ablehnen",
    privacy: "Datenschutzerklärung",
  },
  it: {
    message:
      "Utilizziamo cookie per analisi e pubblicità. Consulta la nostra Informativa sulla Privacy per i dettagli.",
    accept: "Accetta",
    reject: "Rifiuta",
    privacy: "Informativa sulla Privacy",
  },
  nl: {
    message:
      "We gebruiken cookies voor analyse en advertenties. Zie ons Privacybeleid voor details.",
    accept: "Accepteren",
    reject: "Weigeren",
    privacy: "Privacybeleid",
  },
  ru: {
    message:
      "Мы используем файлы cookie для аналитики и рекламы. Подробности см. в Политике конфиденциальности.",
    accept: "Принять",
    reject: "Отклонить",
    privacy: "Политика конфиденциальности",
  },
  pt: {
    message:
      "Usamos cookies para análise e publicidade. Consulte nossa Política de Privacidade para detalhes.",
    accept: "Aceitar",
    reject: "Rejeitar",
    privacy: "Política de Privacidade",
  },
};

const SUPPORTED_LOCALES = [
  "zh-Hant",
  "zh-CN",
  "ja",
  "ko",
  "es",
  "fr",
  "de",
  "it",
  "nl",
  "ru",
  "pt",
];

function detectLocale(): string {
  if (typeof window === "undefined") return "en";
  const path = window.location.pathname;
  const segments = path.split("/").filter(Boolean);
  if (segments.length > 0 && SUPPORTED_LOCALES.includes(segments[0])) {
    return segments[0];
  }
  return "en";
}

function getPrivacyLink(locale: string): string {
  return locale === "en" ? "/privacy" : `/${locale}/privacy`;
}

/** Updates Google Consent Mode v2 and loads Clarity if consent is granted */
function grantConsent() {
  if (typeof window === "undefined") return;

  // Update Google Consent Mode v2
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") {
    w.gtag("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });
  }

  // Load Microsoft Clarity if configured
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  if (clarityId) {
    // Initialize Clarity command queue
    const cw = window as unknown as Record<
      string,
      ((...args: unknown[]) => void) & { q?: unknown[] }
    >;
    if (!cw.clarity) {
      cw.clarity = (...args: unknown[]) => {
        (cw.clarity.q = cw.clarity.q || []).push(args);
      };
    }
    // Inject Clarity script tag
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${clarityId}`;
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript?.parentNode?.insertBefore(script, firstScript);
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const detected = detectLocale();
    setLocale(detected);

    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // Brief delay to avoid layout shift during initial page render
      const timer = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(timer);
    }

    // Restore consent for returning users who previously accepted
    if (consent === "accepted") {
      grantConsent();
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    grantConsent();
  }

  function handleReject() {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setVisible(false);
    // Consent stays at default (denied) — no gtag update needed
  }

  if (!visible) return null;

  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-4 shadow-xl sm:p-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-gray-600">
            {t.message}{" "}
            <a
              href={getPrivacyLink(locale)}
              className="font-medium text-blue-600 hover:underline"
            >
              {t.privacy}
            </a>
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={handleReject}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50 active:scale-95"
            >
              {t.reject}
            </button>
            <button
              onClick={handleAccept}
              className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-amber-600 active:scale-95"
            >
              {t.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
