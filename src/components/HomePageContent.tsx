"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Palette, Unlock, Music, Grid3x3, ShieldCheck, UserX, Code } from "lucide-react";
import { Link } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PixelStudio from "@/components/PixelStudio";
import AvatarEditor from "@/components/AvatarEditor";
import VoiceLab from "@/components/VoiceLab";
import SEOSection from "@/components/SEOSection";

type TabKey = "pixel" | "qr" | "voice";

const HASH_TAB_MAP: Record<string, TabKey> = {
  "#pixel-studio": "pixel",
  "#qr-configurator": "qr",
  "#voice-lab": "voice",
};

const TAB_HASH_MAP: Record<TabKey, string> = {
  pixel: "#pixel-studio",
  qr: "#qr-configurator",
  voice: "#voice-lab",
};

export default function HomePageContent() {
  const t = useTranslations("Hero");
  const nt = useTranslations("Navbar");
  const ft = useTranslations("FeatureSection");
  const [activeTab, setActiveTab] = useState<TabKey>("pixel");

  const tabs: { key: TabKey; label: string }[] = [
    { key: "pixel", label: t("tabPixel") },
    { key: "qr", label: t("tabQR") },
    { key: "voice", label: t("tabVoice") },
  ];

  /** Listens for hash changes and auto-switches to the corresponding tab */
  useEffect(() => {
    function handleHash() {
      const hash = window.location.hash;
      const mapped = HASH_TAB_MAP[hash];
      if (mapped) {
        setActiveTab(mapped);
        setTimeout(() => {
          const el = document.getElementById(hash.slice(1));
          if (el) {
            const navHeight = document.querySelector("nav")?.offsetHeight ?? 65;
            const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 100);
      }
    }

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  /** Switches tab and updates the URL hash for anchor linking */
  function handleTabChange(key: TabKey) {
    setActiveTab(key);
    if (typeof window !== "undefined") {
      history.replaceState(null, "", TAB_HASH_MAP[key]);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-6 text-center">
          <h1 className="font-mono text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            {t("subtitle")}
          </p>
        </section>

        <div className="mx-auto max-w-4xl px-4 pb-4">
          <div className="flex items-center justify-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-xs font-medium text-green-700 sm:text-sm">
            <ShieldCheck className="h-4 w-4 shrink-0 text-green-600" />
            <span>{nt("privacyHint")}</span>
          </div>
        </div>

        <section className="mx-auto max-w-6xl px-4 pb-4">
          <div className="flex flex-wrap justify-center gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`h-12 min-w-[140px] rounded-2xl px-5 font-mono text-sm font-semibold shadow-sm transition-all active:scale-95 sm:text-base ${
                  activeTab === tab.key
                    ? "scale-105 bg-sunshine text-gray-900 shadow-md"
                    : "border border-gray-200 bg-white text-gray-600 hover:shadow-md"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-md sm:p-8">
            <div id="pixel-studio" style={{ scrollMarginTop: "65px" }}>{activeTab === "pixel" && <PixelStudio />}</div>
            <div id="qr-configurator" style={{ scrollMarginTop: "65px" }}>{activeTab === "qr" && <AvatarEditor />}</div>
            <div id="voice-lab" style={{ scrollMarginTop: "65px" }}>{activeTab === "voice" && <VoiceLab />}</div>
          </div>
        </section>

        {/* Feature Section - CTA Cards */}
        <section aria-labelledby="feature-title" className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-8 text-center">
            <h2 id="feature-title" className="font-mono text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {ft("title")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600">
              {ft("subtitle")}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group rounded-2xl border border-amber-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
                <Palette className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">{ft("pixelCardTitle")}</h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">{ft("pixelCardDesc")}</p>
              <Link href="/acnh-pixel-studio" className="inline-flex items-center text-sm font-semibold text-amber-600 transition-colors hover:text-amber-700">
                {ft("pixelCardCta")} →
              </Link>
            </div>
            <div className="group rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <Unlock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">{ft("qrCardTitle")}</h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">{ft("qrCardDesc")}</p>
              <Link href="/mii-qr-unlocker" className="inline-flex items-center text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700">
                {ft("qrCardCta")} →
              </Link>
            </div>
            <div className="group rounded-2xl border border-purple-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
                <Music className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">{ft("voiceCardTitle")}</h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">{ft("voiceCardDesc")}</p>
              <Link href="/tomodachi-voice-lab" className="inline-flex items-center text-sm font-semibold text-purple-600 transition-colors hover:text-purple-700">
                {ft("voiceCardCta")} →
              </Link>
            </div>
            <div className="group rounded-2xl border border-green-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                <Grid3x3 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">{ft("pixelGridCardTitle")}</h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">{ft("pixelGridCardDesc")}</p>
              <Link href="/pixel-grid-studio" className="inline-flex items-center text-sm font-semibold text-green-600 transition-colors hover:text-green-700">
                {ft("pixelGridCardCta")} →
              </Link>
            </div>
          </div>
        </section>

        {/* Trust & Privacy Section */}
        <section aria-labelledby="trust-title" className="mx-auto max-w-6xl px-4 py-10">
          <div className="rounded-3xl bg-green-50 p-6 sm:p-8">
            <div className="mb-6 text-center">
              <h2 id="trust-title" className="font-mono text-2xl font-bold text-gray-900 sm:text-3xl">
                🔒 {ft("trustTitle")}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600">
                {ft("trustDesc")}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="mb-1 font-mono text-base font-bold text-gray-900">{ft("trustFeature1")}</h3>
                <p className="text-sm text-gray-600">{ft("trustFeature1Desc")}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                  <UserX className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="mb-1 font-mono text-base font-bold text-gray-900">{ft("trustFeature2")}</h3>
                <p className="text-sm text-gray-600">{ft("trustFeature2Desc")}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                  <Code className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="mb-1 font-mono text-base font-bold text-gray-900">{ft("trustFeature3")}</h3>
                <p className="text-sm text-gray-600">{ft("trustFeature3Desc")}</p>
              </div>
            </div>
          </div>
        </section>

        <SEOSection />
      </main>

      <Footer />
    </div>
  );
}
