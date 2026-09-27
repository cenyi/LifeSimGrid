/**
 * LifeSimGrid — Personality Deep-Dive Insights registry
 *
 * Central lookup for the per-personality deep-dive content rendered by
 * TypeInsights on the [type] detail pages. Content bundles are fully
 * self-contained per locale (UI strings + content, see insights/types.ts),
 * so no locale-JSON key parity is involved.
 *
 * Locales without a registered bundle — or with a bundle missing one
 * personality entry — fall back to English per item.
 *
 * To register a translation:
 *   1. Create src/lib/insights/content-<locale>.ts (mirror content-en.ts)
 *   2. Import it below and add it to CONTENT
 */

import type { Locale } from "@/i18n/routing";
import type {
  InsightLocaleContent,
  InsightUiStrings,
  PersonalityInsight,
} from "./insights/types";
import { en } from "./insights/content-en";
import { zhHant } from "./insights/content-zh-Hant";
import { zhCN } from "./insights/content-zh-CN";
import { ja } from "./insights/content-ja";
import { ko } from "./insights/content-ko";
import { es } from "./insights/content-es";
import { fr } from "./insights/content-fr";
import { de } from "./insights/content-de";

/**
 * Registered content bundles. English is always present as the fallback.
 * Locales land here as their content files are added.
 */
const CONTENT: Partial<Record<Locale, InsightLocaleContent>> = {
  en,
  "zh-Hant": zhHant,
  "zh-CN": zhCN,
  ja,
  ko,
  es,
  fr,
  de,
};

/** Returns the locale's content bundle, falling back to English wholesale. */
export function getInsightContent(locale: string): InsightLocaleContent {
  return CONTENT[locale as Locale] ?? en;
}

/** UI chrome strings for the deep-dive section (localized, EN fallback). */
export function getInsightUi(locale: string): InsightUiStrings {
  return getInsightContent(locale).ui;
}

/** Deep-dive content for one personality key (e.g. "outgoing_leader"). */
export function getInsight(
  personalityKey: string,
  locale: string,
): PersonalityInsight | undefined {
  const localized = CONTENT[locale as Locale]?.personalities[personalityKey];
  return localized ?? en.personalities[personalityKey];
}

/** True when a native (non-English) bundle is registered for the locale. */
export function hasInsightLocale(locale: string): boolean {
  return locale !== "en" && CONTENT[locale as Locale] !== undefined;
}
