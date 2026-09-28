/**
 * LifeSimGrid — Blog registry (locale-aware)
 *
 * Central lookup behind /blog (EN, root level) and /[locale]/blog pages.
 * Per-locale registries (posts-<locale>.ts) import the translated post
 * files from posts/<locale>/ and land in REGISTRY as translations are
 * added. A locale without a registered bundle simply has no blog pages:
 * generateStaticParams emits nothing, and there is NO English fallback
 * on /<locale>/ URLs (an EN article under a /de/ URL would be a
 * language-signal disaster for SEO).
 *
 * To register a translation set:
 *   1. Create src/lib/blog/posts/<locale>/<slug>.ts (mirror the EN post)
 *   2. Create src/lib/blog/posts-<locale>.ts importing them
 *   3. Import it below and add it to REGISTRY
 *   4. Run `node scripts/generate-sitemap.mjs`
 */

import type { Locale } from "@/i18n/routing";
import type { BlogPost } from "./types";
import { POSTS } from "./posts-en";
import { POSTS as POSTS_ZH_HANT } from "./posts-zh-Hant";
import { POSTS as POSTS_ZH_CN } from "./posts-zh-CN";
import { POSTS as POSTS_JA } from "./posts-ja";
import { POSTS as POSTS_KO } from "./posts-ko";
import { POSTS as POSTS_DE } from "./posts-de";
import { POSTS as POSTS_NL } from "./posts-nl";
import { POSTS as POSTS_PT } from "./posts-pt";
import { POSTS as POSTS_ES } from "./posts-es";
import { POSTS as POSTS_FR } from "./posts-fr";
import { POSTS as POSTS_IT } from "./posts-it";
import { POSTS as POSTS_RU } from "./posts-ru";

const REGISTRY: Partial<Record<Locale, BlogPost[]>> = {
  en: POSTS,
  "zh-Hant": POSTS_ZH_HANT,
  "zh-CN": POSTS_ZH_CN,
  ja: POSTS_JA,
  ko: POSTS_KO,
  de: POSTS_DE,
  nl: POSTS_NL,
  pt: POSTS_PT,
  es: POSTS_ES,
  fr: POSTS_FR,
  it: POSTS_IT,
  ru: POSTS_RU,
};

/** All posts available in a locale (newest first). Empty for unregistered locales. */
export function getBlogPosts(locale: string): BlogPost[] {
  return REGISTRY[locale as Locale] ?? [];
}

/** One post by slug in a locale, or undefined when it is not translated. */
export function getBlogPost(locale: string, slug: string): BlogPost | undefined {
  return getBlogPosts(locale).find((p) => p.slug === slug);
}

/**
 * Relative in-app URL of a blog page for a locale — English at the root,
 * others prefixed (same rule as localizedUrl, but for <a href> use).
 */
export function blogPath(locale: string, slug?: string): string {
  const base = locale === "en" ? "/blog" : `/${locale}/blog`;
  return slug ? `${base}/${slug}` : base;
}
