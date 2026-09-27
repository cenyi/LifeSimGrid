/**
 * LifeSimGrid — Sitemap Generator
 *
 * Regenerates public/sitemap.xml from the actual page structure:
 *   1. Static root pages  → scanned from src/app/[dir]/page.tsx
 *   2. Personality pages  → PERSONALITIES parsed from src/lib/types.ts
 *   3. MBTI pages         → MBTI_MAP unique values parsed from src/lib/types.ts
 *   4. Blog posts         → posts parsed from src/lib/blog/posts-en.ts (optional)
 *
 * Every language version (en root + 11 locale prefixes) is emitted as its own
 * <loc> entry with a full reciprocal hreflang cluster, per Google's
 * multilingual sitemap guidance.
 *
 * Run:  node scripts/generate-sitemap.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://lifesimgrid.org";
const OUT = path.join(ROOT, "public", "sitemap.xml");

/* ------------------------------------------------------------------ */
/*  Parse single sources of truth                                      */
/* ------------------------------------------------------------------ */

const routingSrc = fs.readFileSync(path.join(ROOT, "src/i18n/routing.ts"), "utf8");
const localesMatch = routingSrc.match(/export const LOCALES = \[([^\]]+)\]/);
if (!localesMatch) throw new Error("Could not parse LOCALES from routing.ts");
const LOCALES = [...localesMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
const NON_EN = LOCALES.filter((l) => l !== "en");

const typesSrc = fs.readFileSync(path.join(ROOT, "src/lib/types.ts"), "utf8");

const personalitiesMatch = typesSrc.match(/export const PERSONALITIES = \[([^\]]+)\]/);
if (!personalitiesMatch) throw new Error("Could not parse PERSONALITIES from types.ts");
const personalitySlugs = [...personalitiesMatch[1].matchAll(/"(\w+)_(\w+)"/g)].map((m) => m[2]);

const mbtiBlockMatch = typesSrc.match(/export const MBTI_MAP[^{]*\{([\s\S]*?)\};/);
if (!mbtiBlockMatch) throw new Error("Could not parse MBTI_MAP from types.ts");
const mbtiCodes = [...new Set([...mbtiBlockMatch[1].matchAll(/"[^"]+":\s*"(\w+)"/g)].map((m) => m[1]))];
const mbtiSlugs = [...new Set(mbtiCodes.map((c) => c.toLowerCase()))];

/* ------------------------------------------------------------------ */
/*  Static pages (scan app dir)                                        */
/* ------------------------------------------------------------------ */

const appDir = path.join(ROOT, "src/app");
const staticPages = fs
  .readdirSync(appDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith("[") && !d.name.startsWith("("))
  .filter((d) => fs.existsSync(path.join(appDir, d.name, "page.tsx")))
  .map((d) => d.name);

/* ------------------------------------------------------------------ */
/*  Blog posts (optional — skipped until posts dir exists)             */
/*                                                                     */
/*  The blog is EN-only: /blog pages exist solely at the root level,   */
/*  so blog URLs are emitted WITHOUT locale variants (a /<locale>/blog */
/*  path would 404).                                                   */
/* ------------------------------------------------------------------ */

let blogSlugs = [];
const postsDir = path.join(ROOT, "src/lib/blog/posts");
if (fs.existsSync(postsDir)) {
  blogSlugs = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".ts"))
    .flatMap((f) => {
      const src = fs.readFileSync(path.join(postsDir, f), "utf8");
      return [...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
    });
}

/* ------------------------------------------------------------------ */
/*  Build URL list                                                     */
/* ------------------------------------------------------------------ */

const canonicalPaths = [
  "", // homepage
  ...staticPages.map((p) => `/${p}`),
  ...personalitySlugs.map((s) => `/tomodachi-life-personality/${s}`),
  ...mbtiSlugs.map((s) => `/tomodachi-life-mbti/${s}`),
  ...blogSlugs.map((s) => `/blog/${s}`),
];

// NOTE: /blog itself is already covered by the static-page scan above
// (src/app/blog/page.tsx exists); only add the index explicitly when the
// scan somehow missed it (defensive, keeps the URL deduplicated).
if (blogSlugs.length > 0 && !staticPages.includes("blog")) {
  canonicalPaths.push("/blog");
}

/** Builds the localized URL for a canonical path + locale. */
function localeUrl(canonicalPath, locale) {
  return locale === "en" ? `${BASE}${canonicalPath}` : `${BASE}/${locale}${canonicalPath}`;
}

const today = new Date().toISOString().slice(0, 10);

const lines = [];
lines.push('<?xml version="1.0" encoding="UTF-8"?>');
lines.push('<urlset');
lines.push('  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
lines.push('  xmlns:xhtml="http://www.w3.org/1999/xhtml">');

for (const canonicalPath of canonicalPaths) {
  // Blog pages are EN-only: emit a single <loc> entry with no locale
  // variants and no hreflang cluster (no translated versions exist).
  const isBlog = canonicalPath === "/blog" || canonicalPath.startsWith("/blog/");
  if (isBlog) {
    lines.push("  <url>");
    lines.push(`    <loc>${BASE}${canonicalPath}</loc>`);
    lines.push(`    <lastmod>${today}</lastmod>`);
    lines.push("  </url>");
    continue;
  }

  // One <url> entry per language version, each carrying the full
  // reciprocal hreflang cluster (Google-recommended pattern).
  for (const locale of LOCALES) {
    lines.push("  <url>");
    lines.push(`    <loc>${localeUrl(canonicalPath, locale)}</loc>`);
    lines.push(`    <lastmod>${today}</lastmod>`);
    lines.push(
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${localeUrl(canonicalPath, "en")}"/>`
    );
    for (const l of LOCALES) {
      lines.push(
        `    <xhtml:link rel="alternate" hreflang="${l}" href="${localeUrl(canonicalPath, l)}"/>`
      );
    }
    lines.push("  </url>");
  }
}

lines.push("</urlset>");
lines.push("");

fs.writeFileSync(OUT, lines.join("\n"), "utf8");

const localeUrlCount = canonicalPaths.filter((p) => p !== "/blog" && !p.startsWith("/blog/")).length;
const blogUrlCount = canonicalPaths.length - localeUrlCount;
const urlCount = localeUrlCount * LOCALES.length + blogUrlCount;
console.log(`Sitemap written: ${OUT}`);
console.log(`  Canonical page sets : ${canonicalPaths.length}`);
console.log(`    static: ${staticPages.length + 1}, personality: ${personalitySlugs.length}, mbti: ${mbtiSlugs.length}, blog: ${blogSlugs.length} (EN-only)`);
console.log(`  Total <loc> entries : ${urlCount} (${localeUrlCount} x ${LOCALES.length} locales + ${blogUrlCount} EN-only blog)`);
