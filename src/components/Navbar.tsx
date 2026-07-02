"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname, Link } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Palette, Unlock, Music, Sparkles, Grid3x3 } from "lucide-react";

const STORAGE_KEY = "lifesimgrid-locale";

const localeLabels: Record<string, string> = {
  en: "English",
  "zh-Hant": "繁體中文",
  ja: "日本語",
  es: "Español",
  fr: "Français",
  ko: "한국어",
  de: "Deutsch",
  it: "Italiano",
  nl: "Nederlands",
  "zh-CN": "简体中文",
};

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /** Switches the locale, saves preference to localStorage, and navigates */
  function handleLocaleChange(newLocale: string) {
    localStorage.setItem(STORAGE_KEY, newLocale);
    router.replace(pathname, { locale: newLocale as "en" | "zh-Hant" | "ja" | "es" | "fr" | "ko" | "de" | "it" | "nl" | "zh-CN" });
    setDropdownOpen(false);
  }

  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-mono text-xl font-bold tracking-tight text-gray-900 select-none">
            LifeSimGrid <span className="text-[#FFCC00]">🎮</span>
          </span>
        </Link>

        <div className="hidden items-center space-x-1 lg:flex">
          <Link href="/acnh-pixel-studio" title={t("toolAcnh")} className="flex items-center space-x-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-900 hover:shadow-md active:scale-95">
            <Palette className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">{t("toolAcnh")}</span>
          </Link>
          <Link href="/mii-qr-unlocker" title={t("toolMii")} className="flex items-center space-x-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-900 hover:shadow-md active:scale-95">
            <Unlock className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">{t("toolMii")}</span>
          </Link>
          <Link href="/tomodachi-voice-lab" title={t("toolVoice")} className="flex items-center space-x-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-900 hover:shadow-md active:scale-95">
            <Music className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">{t("toolVoice")}</span>
          </Link>
          <Link href="/tomodachi-life-mbti" title={t("toolMbti")} className="flex items-center space-x-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-900 hover:shadow-md active:scale-95">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">{t("toolMbti")}</span>
          </Link>
          <Link href="/living-the-grid" title={t("toolLivingTheGrid")} className="flex items-center space-x-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-900 hover:shadow-md active:scale-95">
            <Grid3x3 className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">{t("toolLivingTheGrid")}</span>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center space-x-2 rounded-xl border px-3 py-2 text-sm font-medium shadow-sm transition-all active:scale-95 ${
                dropdownOpen
                  ? "border-[#FFCC00]/40 bg-[#FFCC00]/5 text-gray-900 shadow-md"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md"
              }`}
            >
              <Globe className={`h-4 w-4 transition-colors ${dropdownOpen ? "text-[#E6B800]" : "text-gray-500"}`} />
              <span>{localeLabels[locale] || locale}</span>
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 origin-top-right animate-[dropdownIn_150ms_ease-out] rounded-2xl border border-gray-100 bg-white p-1.5 shadow-xl ring-1 ring-black/5">
                {routing.locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => handleLocaleChange(l)}
                    className={`flex w-full items-center rounded-xl px-3 py-2 text-left text-sm font-medium transition-all ${
                      locale === l
                        ? "bg-[#FFCC00] font-bold text-gray-900 shadow-sm"
                        : "text-gray-600 hover:bg-[#FFCC00]/10 hover:text-gray-900 hover:shadow-sm active:scale-[0.98]"
                    }`}
                  >
                    {localeLabels[l]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="https://github.com/cenyi/LifeSimGrid"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-900 active:scale-95"
            aria-label="GitHub"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
        </div>
      </div>
    </nav>
  );
}
