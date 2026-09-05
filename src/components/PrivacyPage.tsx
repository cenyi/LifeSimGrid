"use client";

import { useTranslations } from "next-intl";
import { useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  const t = useTranslations("Privacy");

  const sections = [
    { title: t("corePrinciple"), text: t("corePrincipleText") },
    { title: t("localStorage"), text: t("localStorageText") },
    { title: t("cookies"), text: t("cookiesText") },
    { title: t("googleAdsense"), text: t("googleAdsenseText") },
    { title: t("euConsent"), text: t("euConsentText") },
    { title: t("thirdParty"), text: t("thirdPartyText") },
    { title: t("children"), text: t("childrenText") },
    { title: t("gdpr"), text: t("gdprText") },
    { title: t("security"), text: t("securityText") },
  ];

  const reopenConsent = useCallback(() => {
    window.dispatchEvent(new CustomEvent("lifesimgrid-reopen-consent"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section aria-labelledby="privacy-heading" className="mx-auto max-w-6xl px-4 py-12">
          <h1 id="privacy-heading" className="mb-2 font-mono text-3xl font-bold text-gray-900 sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mb-2 text-sm text-gray-400">{t("lastUpdated")}</p>
          <p className="mb-8 text-lg leading-relaxed text-gray-600">
            {t("intro")}
          </p>

          <div className="space-y-6">
            {sections.map((section, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <h2 className="mb-3 font-mono text-lg font-bold text-gray-900">
                  {section.title}
                </h2>
                <p className="leading-relaxed text-gray-600">{section.text}</p>
              </div>
            ))}
          </div>

          {/* Cookie consent management button */}
          <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-6">
            <h2 className="mb-2 font-mono text-lg font-bold text-amber-800">
              {t("cookieManageTitle")}
            </h2>
            <p className="mb-4 leading-relaxed text-amber-700">
              {t("cookieManageText")}
            </p>
            <button
              onClick={reopenConsent}
              className="inline-block rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-amber-600 active:scale-95"
            >
              {t("cookieManageButton")}
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
