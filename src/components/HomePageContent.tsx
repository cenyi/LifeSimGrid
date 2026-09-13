"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Palette, Unlock, Music, Grid3x3, ShieldCheck, UserX, Code, ArrowRight, MapPin } from "lucide-react";
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

/**
 * The five tool CTA cards shown under the "Powerful Tools" heading.
 * Data-driven so the visual styling lives in one place; each entry maps a
 * card to its icon, accent color, and the i18n keys already defined in the
 * FeatureSection namespace (no new translations required).
 */
type FeatureCard = {
  href: string;
  titleKey: string;
  descKey: string;
  ctaKey: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  accent: string;
  focusRing: string;
};

const FEATURE_CARDS: FeatureCard[] = [
  {
    href: "/acnh-pixel-studio",
    titleKey: "pixelCardTitle",
    descKey: "pixelCardDesc",
    ctaKey: "pixelCardCta",
    icon: Palette,
    iconBg: "bg-gradient-to-br from-amber-50 to-amber-100",
    iconColor: "text-amber-600",
    accent: "text-amber-600 group-hover:text-amber-700",
    focusRing: "focus-visible:outline-amber-500",
  },
  {
    href: "/mii-qr-unlocker",
    titleKey: "qrCardTitle",
    descKey: "qrCardDesc",
    ctaKey: "qrCardCta",
    icon: Unlock,
    iconBg: "bg-gradient-to-br from-blue-50 to-blue-100",
    iconColor: "text-blue-600",
    accent: "text-blue-600 group-hover:text-blue-700",
    focusRing: "focus-visible:outline-blue-500",
  },
  {
    href: "/tomodachi-voice-lab",
    titleKey: "voiceCardTitle",
    descKey: "voiceCardDesc",
    ctaKey: "voiceCardCta",
    icon: Music,
    iconBg: "bg-gradient-to-br from-purple-50 to-purple-100",
    iconColor: "text-purple-600",
    accent: "text-purple-600 group-hover:text-purple-700",
    focusRing: "focus-visible:outline-purple-500",
  },
  {
    href: "/living-the-grid",
    titleKey: "pixelGridCardTitle",
    descKey: "pixelGridCardDesc",
    ctaKey: "pixelGridCardCta",
    icon: Grid3x3,
    iconBg: "bg-gradient-to-br from-green-50 to-green-100",
    iconColor: "text-green-600",
    accent: "text-green-600 group-hover:text-green-700",
    focusRing: "focus-visible:outline-green-500",
  },
  {
    href: "/tomodachi-island-planner",
    titleKey: "islandCardTitle",
    descKey: "islandCardDesc",
    ctaKey: "islandCardCta",
    icon: MapPin,
    iconBg: "bg-gradient-to-br from-teal-50 to-teal-100",
    iconColor: "text-teal-600",
    accent: "text-teal-600 group-hover:text-teal-700",
    focusRing: "focus-visible:outline-teal-500",
  },
];

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
        <section aria-labelledby="hero-title" className="mx-auto max-w-6xl px-4 pt-10 pb-6 text-center">
          <h1 id="hero-title" className="font-mono text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
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

        <section aria-labelledby="hero-tab-nav" className="mx-auto max-w-6xl px-4 pb-4">
          <h2 id="hero-tab-nav" className="sr-only">Tool Selection</h2>
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

        <section aria-labelledby="hero-tool-area" className="mx-auto max-w-6xl px-4 py-6">
          <h2 id="hero-tool-area" className="sr-only">Interactive Tools</h2>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-md sm:p-8">
            <div id="pixel-studio" className={activeTab !== "pixel" ? "hidden" : ""} style={{ scrollMarginTop: "65px" }}><PixelStudio /></div>
            <div id="qr-configurator" className={activeTab !== "qr" ? "hidden" : ""} style={{ scrollMarginTop: "65px" }}><AvatarEditor /></div>
            <div id="voice-lab" className={activeTab !== "voice" ? "hidden" : ""} style={{ scrollMarginTop: "65px" }}><VoiceLab /></div>
          </div>
        </section>

        {/* Feature Section - CTA Cards */}
        <section aria-labelledby="feature-title" className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-10 text-center">
            <h2 id="feature-title" className="font-mono text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {ft("title")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600">
              {ft("subtitle")}
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className={`group relative flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-200 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${card.focusRing}`}
                >
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconBg} transition-transform duration-200 group-hover:scale-110`}>
                    <Icon className={`h-6 w-6 ${card.iconColor}`} />
                  </div>
                  <h3 className="mb-2 font-sans text-lg font-bold tracking-tight text-gray-900">
                    {ft(card.titleKey)}
                  </h3>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-600">
                    {ft(card.descKey)}
                  </p>
                  <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${card.accent}`}>
                    {ft(card.ctaKey)}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
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
