"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
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

        <SEOSection />
      </main>

      <Footer />
    </div>
  );
}
