"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const t = useTranslations("About");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 py-12">
          <h1 className="mb-4 font-mono text-3xl font-bold text-gray-900 sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-gray-600">
            {t("intro")}
          </p>

          <div className="space-y-8">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-3 font-mono text-xl font-bold text-gray-900">
                🎯 {t("coreMission")}
              </h2>
              <p className="mb-4 leading-relaxed text-gray-600">
                {t("coreMissionText")}
              </p>
              <div className="space-y-4">
                <div className="rounded-xl bg-sunshine/10 p-4">
                  <h3 className="mb-1 font-mono text-base font-bold text-gray-900">
                    🎨 <Link href="/acnh-pixel-studio" className="hover:text-island-blue transition-colors">{t("feature1Title")}</Link>
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {t("feature1")}
                  </p>
                </div>
                <div className="rounded-xl bg-island-blue/10 p-4">
                  <h3 className="mb-1 font-mono text-base font-bold text-gray-900">
                    🔓 <Link href="/mii-qr-unlocker" className="hover:text-island-blue transition-colors">{t("feature2Title")}</Link>
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {t("feature2")}
                  </p>
                </div>
                <div className="rounded-xl bg-island-pink/20 p-4">
                  <h3 className="mb-1 font-mono text-base font-bold text-gray-900">
                    🎵 <Link href="/tomodachi-voice-lab" className="hover:text-island-blue transition-colors">{t("feature3Title")}</Link>
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {t("feature3")}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-green-100 bg-green-50 p-6">
              <h2 className="mb-3 font-mono text-xl font-bold text-green-800">
                📖 {t("openSource")}
              </h2>
              <p className="leading-relaxed text-green-700">
                {t("openSourceText")}
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <h2 className="mb-3 font-mono text-xl font-bold text-blue-800">
                ⚙️ {t("techStack")}
              </h2>
              <p className="leading-relaxed text-blue-700">
                {t("techStackText")}
              </p>
            </div>

            <div className="rounded-2xl border border-purple-100 bg-purple-50 p-6">
              <h2 className="mb-3 font-mono text-xl font-bold text-purple-800">
                🔒 {t("privacyFirst")}
              </h2>
              <p className="leading-relaxed text-purple-700">
                {t("privacyFirstText")}
              </p>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
              <h2 className="mb-3 font-mono text-xl font-bold text-amber-800">
                🤝 {t("community")}
              </h2>
              <p className="leading-relaxed text-amber-700">
                {t("communityText")}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
