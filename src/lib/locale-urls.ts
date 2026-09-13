import { LOCALES, type Locale, type NonEnLocale } from "@/i18n/routing";

const BASE = "https://lifesimgrid.org";

/**
 * Single source of truth for localized URL construction, hreflang alternates,
 * and OpenGraph locale tags. `localePrefix: "as-needed"` means English lives
 * at the root (no /en/ prefix) — that rule is encoded here exactly once.
 *
 * RULE (AGENTS.md): every `alternates.languages` block, JSON-LD `inLanguage`
 * list and OpenGraph locale tag in the app derives from LOCALES via this
 * module. Never hand-write a locale list again — appending a code to LOCALES
 * propagates everywhere, and the missing pieces (meta maps, OG locale
 * entries) fail to compile.
 */

/** hreflang map shape accepted by Next.js `alternates.languages`. */
type LanguageMapping = Record<string, string>;

/** URL of a page in a locale: English at the root, others prefixed. `path === ""` → homepage. */
export function localizedUrl(locale: Locale, path: string): string {
  if (path === "") return locale === "en" ? BASE : `${BASE}/${locale}`;
  return locale === "en" ? `${BASE}/${path}` : `${BASE}/${locale}/${path}`;
}

/**
 * hreflang alternates for a page, derived from LOCALES (en first), with
 * "x-default" pointing at the English URL. `xDefaultFirst` preserves the
 * emission order of the hand-written blocks this replaced: tool pages put
 * x-default first, info pages and homepages put it last (Next emits `<link>`
 * tags in object insertion order, so order is part of the output bytes).
 * Note: Next normalizes the homepage English URL to bare BASE in output,
 * so both homepage source styles (`${BASE}/` and `BASE`) emit identically.
 */
export function languageAlternates(
  path: string,
  opts?: { xDefaultFirst?: boolean },
): LanguageMapping {
  const map: LanguageMapping = {};
  if (opts?.xDefaultFirst) map["x-default"] = localizedUrl("en", path);
  for (const locale of LOCALES) map[locale] = localizedUrl(locale, path);
  if (!opts?.xDefaultFirst) map["x-default"] = localizedUrl("en", path);
  return map;
}

/**
 * og:locale for localized homepages (`/[locale]`). Values preserved verbatim
 * from the hand-written ternary chain this replaced, INCLUDING its quirks:
 * `ja` falls through to raw "ja" (not ja_JP) and pt maps to pt_BR. Do not
 * "fix" these without an SEO review — the emitted bytes are the baseline.
 */
export const OG_LOCALE_PAGE: Record<Locale, string> = {
  en: "en",
  "zh-Hant": "zh_TW",
  "zh-CN": "zh_CN",
  ja: "ja",
  es: "es_ES",
  fr: "fr_FR",
  ko: "ko_KR",
  de: "de_DE",
  it: "it_IT",
  nl: "nl_NL",
  ru: "ru_RU",
  pt: "pt_BR",
};

/**
 * og:locale:alternate values for the root layout's fallback OpenGraph block
 * (emitted on 404/_not-found//en pages). NOTE: pt maps to pt_PT here but
 * pt_BR in OG_LOCALE_PAGE — a pre-existing divergence between the two sites,
 * deliberately kept as-is.
 */
export const OG_LOCALE_ALTERNATES: Record<NonEnLocale, string> = {
  "zh-Hant": "zh_TW",
  "zh-CN": "zh_CN",
  ja: "ja_JP",
  es: "es_ES",
  fr: "fr_FR",
  ko: "ko_KR",
  de: "de_DE",
  it: "it_IT",
  nl: "nl_NL",
  ru: "ru_RU",
  pt: "pt_PT",
};

/** All locales except en, in LOCALES order (for the layout's alternateLocale list). */
export function nonEnLocales(): readonly NonEnLocale[] {
  return LOCALES.filter((l): l is NonEnLocale => l !== "en");
}
