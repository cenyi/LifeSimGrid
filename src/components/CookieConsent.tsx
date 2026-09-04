"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "lifesimgrid-consent";

type ConsentValue = "granted" | "denied";

interface ConsentPreferences {
  ad_storage: ConsentValue;
  ad_user_data: ConsentValue;
  ad_personalization: ConsentValue;
  analytics_storage: ConsentValue;
}

interface ConsentStrings {
  message: string;
  accept: string;
  reject: string;
  privacy: string;
  manage: string;
  savePreferences: string;
  advertising: string;
  analytics: string;
  advertisingDesc: string;
  analyticsDesc: string;
  back: string;
}

const TRANSLATIONS: Record<string, ConsentStrings> = {
  en: {
    message:
      "We use cookies for analytics and advertising. See our Privacy Policy for details.",
    accept: "Accept all",
    reject: "Reject all",
    privacy: "Privacy Policy",
    manage: "Manage preferences",
    savePreferences: "Save preferences",
    advertising: "Advertising",
    analytics: "Analytics",
    advertisingDesc: "Cookies used by Google AdSense to serve personalized ads based on your interests.",
    analyticsDesc: "Cookies used by Google Analytics and Microsoft Clarity to measure site performance.",
    back: "Back",
  },
  "zh-Hant": {
    message: "我們使用 Cookie 進行分析和廣告。詳見隱私政策。",
    accept: "全部接受",
    reject: "全部拒絕",
    privacy: "隱私政策",
    manage: "管理偏好",
    savePreferences: "儲存偏好",
    advertising: "廣告",
    analytics: "分析",
    advertisingDesc: "Google AdSense 使用 Cookie 來根據您的興趣投放個人化廣告。",
    analyticsDesc: "Google Analytics 和 Microsoft Clarity 使用 Cookie 來衡量網站效能。",
    back: "返回",
  },
  "zh-CN": {
    message: "我们使用 Cookie 进行分析和广告。详见隐私政策。",
    accept: "全部接受",
    reject: "全部拒绝",
    privacy: "隐私政策",
    manage: "管理偏好",
    savePreferences: "保存偏好",
    advertising: "广告",
    analytics: "分析",
    advertisingDesc: "Google AdSense 使用 Cookie 来根据您的兴趣投放个性化广告。",
    analyticsDesc: "Google Analytics 和 Microsoft Clarity 使用 Cookie 来衡量网站性能。",
    back: "返回",
  },
  ja: {
    message:
      "分析と広告のために Cookie を使用します。詳細はプライバシーポリシーをご覧ください。",
    accept: "すべて受け入れる",
    reject: "すべて拒否",
    privacy: "プライバシーポリシー",
    manage: "設定を管理",
    savePreferences: "設定を保存",
    advertising: "広告",
    analytics: "分析",
    advertisingDesc: "Google AdSense は興味に基づいたパーソナライズド広告を配信するために Cookie を使用します。",
    analyticsDesc: "Google Analytics と Microsoft Clarity はサイトパフォーマンスを測定するために Cookie を使用します。",
    back: "戻る",
  },
  ko: {
    message:
      "분석 및 광고를 위해 쿠키를 사용합니다. 자세한 내용은 개인정보처리방침을 참조하세요.",
    accept: "모두 수락",
    reject: "모두 거부",
    privacy: "개인정보처리방침",
    manage: "환경설정 관리",
    savePreferences: "환경설정 저장",
    advertising: "광고",
    analytics: "분석",
    advertisingDesc: "Google AdSense는 관심사 기반 맞춤 광고를 제공하기 위해 쿠키를 사용합니다.",
    analyticsDesc: "Google Analytics 및 Microsoft Clarity는 사이트 성능을 측정하기 위해 쿠키를 사용합니다.",
    back: "뒤로",
  },
  es: {
    message:
      "Usamos cookies para análisis y publicidad. Consulta nuestra Política de Privacidad para más detalles.",
    accept: "Aceptar todo",
    reject: "Rechazar todo",
    privacy: "Política de Privacidad",
    manage: "Gestionar preferencias",
    savePreferences: "Guardar preferencias",
    advertising: "Publicidad",
    analytics: "Análisis",
    advertisingDesc: "Google AdSense usa cookies para mostrar anuncios personalizados según tus intereses.",
    analyticsDesc: "Google Analytics y Microsoft Clarity usan cookies para medir el rendimiento del sitio.",
    back: "Atrás",
  },
  fr: {
    message:
      "Nous utilisons des cookies à des fins d'analyse et de publicité. Consultez notre Politique de Confidentialité pour plus de détails.",
    accept: "Tout accepter",
    reject: "Tout refuser",
    privacy: "Politique de Confidentialité",
    manage: "Gérer les préférences",
    savePreferences: "Enregistrer les préférences",
    advertising: "Publicité",
    analytics: "Analyse",
    advertisingDesc: "Google AdSense utilise des cookies pour diffuser des annonces personnalisées selon vos centres d'intérêt.",
    analyticsDesc: "Google Analytics et Microsoft Clarity utilisent des cookies pour mesurer les performances du site.",
    back: "Retour",
  },
  de: {
    message:
      "Wir verwenden Cookies für Analyse und Werbung. Siehe unsere Datenschutzerklärung für Details.",
    accept: "Alle akzeptieren",
    reject: "Alle ablehnen",
    privacy: "Datenschutzerklärung",
    manage: "Einstellungen verwalten",
    savePreferences: "Einstellungen speichern",
    advertising: "Werbung",
    analytics: "Analyse",
    advertisingDesc: "Google AdSense verwendet Cookies, um personalisierte Werbung basierend auf Ihren Interessen zu schalten.",
    analyticsDesc: "Google Analytics und Microsoft Clarity verwenden Cookies zur Messung der Website-Leistung.",
    back: "Zurück",
  },
  it: {
    message:
      "Utilizziamo cookie per analisi e pubblicità. Consulta la nostra Informativa sulla Privacy per i dettagli.",
    accept: "Accetta tutto",
    reject: "Rifiuta tutto",
    privacy: "Informativa sulla Privacy",
    manage: "Gestisci preferenze",
    savePreferences: "Salva preferenze",
    advertising: "Pubblicità",
    analytics: "Analisi",
    advertisingDesc: "Google AdSense utilizza cookie per mostrare annunci personalizzati in base ai tuoi interessi.",
    analyticsDesc: "Google Analytics e Microsoft Clarity utilizzano cookie per misurare le prestazioni del sito.",
    back: "Indietro",
  },
  nl: {
    message:
      "We gebruiken cookies voor analyse en advertenties. Zie ons Privacybeleid voor details.",
    accept: "Alles accepteren",
    reject: "Alles weigeren",
    privacy: "Privacybeleid",
    manage: "Voorkeuren beheren",
    savePreferences: "Voorkeuren opslaan",
    advertising: "Advertenties",
    analytics: "Analyse",
    advertisingDesc: "Google AdSense gebruikt cookies om gepersonaliseerde advertenties te tonen op basis van uw interesses.",
    analyticsDesc: "Google Analytics en Microsoft Clarity gebruiken cookies om siteprestaties te meten.",
    back: "Terug",
  },
  ru: {
    message:
      "Мы используем файлы cookie для аналитики и рекламы. Подробности см. в Политике конфиденциальности.",
    accept: "Принять все",
    reject: "Отклонить все",
    privacy: "Политика конфиденциальности",
    manage: "Управление настройками",
    savePreferences: "Сохранить настройки",
    advertising: "Реклама",
    analytics: "Аналитика",
    advertisingDesc: "Google AdSense использует файлы cookie для показа персонализированной рекламы на основе ваших интересов.",
    analyticsDesc: "Google Analytics и Microsoft Clarity используют файлы cookie для измерения производительности сайта.",
    back: "Назад",
  },
  pt: {
    message:
      "Usamos cookies para análise e publicidade. Consulte nossa Política de Privacidade para detalhes.",
    accept: "Aceitar tudo",
    reject: "Rejeitar tudo",
    privacy: "Política de Privacidade",
    manage: "Gerir preferências",
    savePreferences: "Guardar preferências",
    advertising: "Publicidade",
    analytics: "Análise",
    advertisingDesc: "Google AdSense usa cookies para exibir anúncios personalizados com base nos seus interesses.",
    analyticsDesc: "Google Analytics e Microsoft Clarity usam cookies para medir o desempenho do site.",
    back: "Voltar",
  },
};

const ALL_GRANTED: ConsentPreferences = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
};

const ALL_DENIED: ConsentPreferences = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
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

/** Updates Google Consent Mode v2 with the given preferences */
function applyConsent(prefs: ConsentPreferences) {
  if (typeof window === "undefined") return;

  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") {
    w.gtag("consent", "update", {
      ad_storage: prefs.ad_storage,
      ad_user_data: prefs.ad_user_data,
      ad_personalization: prefs.ad_personalization,
      analytics_storage: prefs.analytics_storage,
    });
  }

  // Load Microsoft Clarity if analytics consent is granted (not removed on revoke — Consent Mode v2 handles deactivation)
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  if (clarityId && prefs.analytics_storage === "granted") {
    const cw = window as unknown as Record<
      string,
      ((...args: unknown[]) => void) & { q?: unknown[] }
    >;
    if (!cw.clarity) {
      cw.clarity = (...args: unknown[]) => {
        (cw.clarity.q = cw.clarity.q || []).push(args);
      };
    }
    if (!document.getElementById("clarity-script")) {
      const script = document.createElement("script");
      script.id = "clarity-script";
      script.async = true;
      script.src = `https://www.clarity.ms/tag/${clarityId}`;
      const firstScript = document.getElementsByTagName("script")[0];
      firstScript?.parentNode?.insertBefore(script, firstScript);
    }
  }
}

/** Loads GA4 script dynamically (only after consent) */
function loadGA4() {
  if (typeof window === "undefined") return;
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!GA_ID || document.getElementById("ga4-script")) return;

  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  const initScript = document.createElement("script");
  initScript.id = "ga4-init-script";
  initScript.innerHTML = `gtag('js', new Date());gtag('config', '${GA_ID}', { 'anonymize_ip': true });`;
  document.head.appendChild(initScript);
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [locale, setLocale] = useState("en");

  // Granular preferences (local state for the toggle UI)
  const [adConsent, setAdConsent] = useState(true);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);

  useEffect(() => {
    const detected = detectLocale();
    setLocale(detected);

    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      // Brief delay to avoid layout shift during initial page render
      const timer = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(timer);
    }

    // Restore consent for returning users
    if (stored === "accepted") {
      applyConsent(ALL_GRANTED);
      loadGA4();
    } else if (stored === "rejected") {
      applyConsent(ALL_DENIED);
    } else if (stored === "partial") {
      // Restore partial preferences
      const storedPrefs = localStorage.getItem(`${CONSENT_KEY}-prefs`);
      if (storedPrefs) {
        try {
          const parsed = JSON.parse(storedPrefs) as ConsentPreferences;
          applyConsent(parsed);
          setAdConsent(parsed.ad_storage === "granted");
          setAnalyticsConsent(parsed.analytics_storage === "granted");
          if (parsed.analytics_storage === "granted") {
            loadGA4();
          }
        } catch {
          applyConsent(ALL_DENIED);
        }
      }
    }
  }, []);

  /** Re-open the consent banner (used by the "manage preferences" button on Privacy page) */
  useEffect(() => {
    function handleReopen() {
      setShowPreferences(true);
      setVisible(true);
    }
    window.addEventListener("lifesimgrid-reopen-consent", handleReopen);
    return () => window.removeEventListener("lifesimgrid-reopen-consent", handleReopen);
  }, []);

  function handleAcceptAll() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    localStorage.removeItem(`${CONSENT_KEY}-prefs`);
    setVisible(false);
    setShowPreferences(false);
    applyConsent(ALL_GRANTED);
    loadGA4();
  }

  function handleRejectAll() {
    localStorage.setItem(CONSENT_KEY, "rejected");
    localStorage.removeItem(`${CONSENT_KEY}-prefs`);
    setVisible(false);
    setShowPreferences(false);
    applyConsent(ALL_DENIED);
  }

  function handleSavePreferences() {
    const prefs: ConsentPreferences = {
      ad_storage: adConsent ? "granted" : "denied",
      ad_user_data: adConsent ? "granted" : "denied",
      ad_personalization: adConsent ? "granted" : "denied",
      analytics_storage: analyticsConsent ? "granted" : "denied",
    };

    const hasAny = adConsent || analyticsConsent;
    localStorage.setItem(CONSENT_KEY, hasAny ? "partial" : "rejected");
    localStorage.setItem(`${CONSENT_KEY}-prefs`, JSON.stringify(prefs));
    setVisible(false);
    setShowPreferences(false);
    applyConsent(prefs);
    if (analyticsConsent) {
      loadGA4();
    }
  }

  if (!visible) return null;

  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-4 shadow-xl sm:p-6">
        {!showPreferences ? (
          <>
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
                  onClick={handleRejectAll}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50 active:scale-95"
                >
                  {t.reject}
                </button>
                <button
                  onClick={() => setShowPreferences(true)}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50 active:scale-95"
                >
                  {t.manage}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-amber-600 active:scale-95"
                >
                  {t.accept}
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">{t.manage}</p>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-sm font-medium text-gray-500 transition-all hover:text-gray-900"
                >
                  {t.back}
                </button>
              </div>

              {/* Advertising toggle */}
              <label className="flex items-start gap-3 rounded-xl border border-gray-100 p-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={adConsent}
                  onChange={(e) => setAdConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-amber-500 focus:ring-amber-400"
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">{t.advertising}</span>
                  <span className="block text-xs leading-relaxed text-gray-500">{t.advertisingDesc}</span>
                </div>
              </label>

              {/* Analytics toggle */}
              <label className="flex items-start gap-3 rounded-xl border border-gray-100 p-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={analyticsConsent}
                  onChange={(e) => setAnalyticsConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-amber-500 focus:ring-amber-400"
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">{t.analytics}</span>
                  <span className="block text-xs leading-relaxed text-gray-500">{t.analyticsDesc}</span>
                </div>
              </label>

              <div className="flex justify-between gap-2">
                <button
                  onClick={handleRejectAll}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50 active:scale-95"
                >
                  {t.reject}
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-amber-600 active:scale-95"
                >
                  {t.savePreferences}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
