"use client";

import { useEffect, useRef } from "react";

const STORAGE_KEY = "lifesimgrid-locale";

const SUPPORTED_LOCALES = [
  "en", "zh-Hant", "ja", "es", "fr", "ko", "de", "it", "nl", "zh-CN", "ru", "pt",
] as const;

/**
 * Returns true when the pathname already starts with a locale segment
 * (e.g. `/zh-Hant/...` or `/ja`). This prevents the redirector from
 * firing on pages that are already localized.
 */
function isAlreadyLocalized(pathname: string): boolean {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return false;
  return (SUPPORTED_LOCALES as readonly string[]).includes(segments[0]);
}

/**
 * Maps a browser language string to a supported locale.
 * Returns undefined when no match is found (falls back to "en").
 */
function detectLocale(userLang: string): string | undefined {
  const lower = userLang.toLowerCase();

  // Chinese: zh-TW, zh-HK, zh-Hant → zh-Hant; zh-CN, zh-Hans → zh-CN
  if (lower.includes("zh")) {
    if (lower.includes("cn") || lower.includes("hans") || lower.includes("sg")) {
      return "zh-CN";
    }
    return "zh-Hant";
  }
  if (lower.startsWith("ja") || lower.includes("jp")) return "ja";
  if (lower.startsWith("ko") || lower.includes("kr")) return "ko";
  if (lower.startsWith("ru")) return "ru";
  if (lower.startsWith("pt")) return "pt";
  if (lower.startsWith("es")) return "es";
  if (lower.startsWith("fr")) return "fr";
  if (lower.startsWith("de")) return "de";
  if (lower.startsWith("it")) return "it";
  if (lower.startsWith("nl")) return "nl";

  return undefined;
}

/**
 * Detects browser language on first visit and redirects to the appropriate
 * locale version of the current page. Works on any root-level (English) page
 * to ensure users arriving at a sub-page via external links also get
 * redirected to their preferred language.
 *
 * Uses `window.location.replace` so the redirect doesn't create a
 * back-button trap and works correctly with `localePrefix: "as-needed"`.
 */
export default function LocaleRedirector() {
  const redirected = useRef(false);

  useEffect(() => {
    if (redirected.current) return;

    // Skip if the current page is already a localized URL (e.g. /zh-Hant/...).
    // This lets LocaleRedirector live safely in the root layout without
    // causing double-redirects on locale pages.
    if (isAlreadyLocalized(window.location.pathname)) return;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return;

    const userLang =
      navigator.language ||
      (navigator as unknown as Record<string, unknown>).userLanguage ||
      "en";

    const detected = detectLocale(String(userLang));

    if (detected && detected !== "en") {
      redirected.current = true;
      localStorage.setItem(STORAGE_KEY, detected);

      // Preserve the current pathname when redirecting so users on a
      // sub-page (e.g. /acnh-pixel-studio) land on the localized version.
      const pathname = window.location.pathname;
      const search = window.location.search;
      const hash = window.location.hash;
      window.location.replace(`/${detected}${pathname}${search}${hash}`);
    } else {
      localStorage.setItem(STORAGE_KEY, "en");
    }
  }, []);

  return null;
}
