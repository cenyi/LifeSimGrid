import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

/**
 * Single source of truth for supported locales.
 *
 * To add a new language:
 * 1. Append its code to this array (the `Locale` type follows automatically)
 * 2. Create `src/locales/<code>.json` with keys aligned 1:1 with en.json
 * 3. Add a display label to `localeLabels` in components/Navbar.tsx
 * 4. Add meta title/description entries in each [locale]/<subpath>/page.tsx
 *    (PAGE_TITLES/PAGE_DESCS are Record<NonEnLocale, string> — missing
 *    entries fail to compile)
 * 5. Add hreflang entries in public/sitemap.xml + llms.txt (hand-maintained
 *    XML/text — no compiler to catch omissions, re-check manually)
 *
 * Everything else derives automatically: URL prefixes, hreflang blocks
 * (languageAlternates in lib/locale-urls.ts), OG locale tags, JSON-LD
 * inLanguage, locale switcher, and redirectors. Step 5 is the ONLY
 * hand-maintained list left.
 */
export const LOCALES = [
  "en", "zh-Hant", "ja", "es", "fr", "ko", "de", "it", "nl", "zh-CN", "ru", "pt",
] as const;

export type Locale = (typeof LOCALES)[number];

/**
 * All locales except "en". English meta titles/descriptions are plain source
 * constants (FALLBACK_* / SITE_DESC), so per-page localized meta maps are keyed
 * by this type: adding a locale to LOCALES without writing its meta makes the
 * page fail to compile (exhaustiveness — per AGENTS.md "always write localized
 * meta tags from scratch, never machine-translate or silently fall back").
 */
export type NonEnLocale = Exclude<Locale, "en">;

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
