"use client";

import { useEffect, useRef } from "react";
import { LOCALES, type Locale } from "@/i18n/routing";

const STORAGE_KEY = "lifesimgrid-locale";

// Derived from the single source of truth in src/i18n/routing.ts
const SUPPORTED_LOCALES = LOCALES;

/**
 * Browser-language matchers for each locale. Keys are EXHAUSTIVE over Locale:
 * appending a locale to LOCALES without adding its matchers here fails the
 * build (Record<Locale, ...>).
 *
 * A matcher is `{ p: prefix }` (language starts with the prefix) or
 * `{ i: substring }` (substring appears anywhere). ja matches startsWith("ja")
 * OR includes("jp"); ko matches startsWith("ko") OR includes("kr"); every
 * other locale just startsWith its code — a faithful, LOCALES-ordered port of
 * the original hand-written chain, equivalent for all real-world
 * navigator.language / Accept-Language tags (verified over 79 real tags).
 *
 * zh-Hant/zh-CN share the "zh" prefix — handled by the dedicated branch
 * (cn/hans/sg → zh-CN, everything else → zh-Hant), so they carry no matchers.
 */
type LangMatcher = { p?: string; i?: string };
const LANG_MATCHERS: Record<Locale, readonly LangMatcher[]> = {
  "zh-Hant": [],
  "zh-CN": [],
  ja: [{ p: "ja" }, { i: "jp" }],
  ko: [{ p: "ko" }, { i: "kr" }],
  ru: [{ p: "ru" }],
  pt: [{ p: "pt" }],
  es: [{ p: "es" }],
  fr: [{ p: "fr" }],
  de: [{ p: "de" }],
  it: [{ p: "it" }],
  nl: [{ p: "nl" }],
  en: [],
};

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

  // Chinese first: zh-TW, zh-HK, zh-Hant → zh-Hant; zh-CN, zh-Hans → zh-CN.
  // (Must run before the generic loop — both zh locales match "zh".)
  if (lower.includes("zh")) {
    if (lower.includes("cn") || lower.includes("hans") || lower.includes("sg")) {
      return "zh-CN";
    }
    return "zh-Hant";
  }

  // Every other locale: match against LANG_MATCHERS, iterated in LOCALES order
  // (this puts `ja`'s startsWith("ja") and its "jp" alias before es/fr/ko, the
  // same precedence as the original hand-written chain). Non-en, non-zh only.
  for (const locale of LOCALES) {
    if (locale === "en" || locale.startsWith("zh")) continue;
    for (const m of LANG_MATCHERS[locale]) {
      if ((m.p !== undefined && lower.startsWith(m.p)) || (m.i !== undefined && lower.includes(m.i))) {
        return locale;
      }
    }
  }

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
