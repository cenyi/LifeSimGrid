/**
 * LifeSimGrid — Blog content model (EN-only)
 *
 * Blog articles are structured TS data (typed blocks) rendered by
 * BlogArticleRenderer. Keeping posts as typed data (not MDX) means:
 *   - zero new build dependencies,
 *   - the sitemap generator can parse slugs from source,
 *   - inline formatting is a tiny, XSS-safe parser (no raw HTML).
 *
 * Inline formatting supported inside any `text`/`items` string:
 *   **bold**         → <strong>
 *   `code`           → <code>
 *   [label](/path)   → internal <a>
 *   [label](https…)  → external <a> (noopener)
 */

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; text: string }
  | { type: "callout"; text: string }
  | { type: "table"; headers: string[]; rows: string[][] };

export interface BlogPost {
  /** URL slug: /blog/<slug>. Must be kebab-case, stable forever. */
  slug: string;
  /** Article H1 + OG title. Meta title = `${title} | LifeSimGrid` (keep title ≤ 60 chars). */
  title: string;
  /** Meta description + card excerpt. Keep ≤ 155 chars. */
  description: string;
  /** ISO date (YYYY-MM-DD) shown on the card and in Article JSON-LD. */
  publishedAt: string;
  /** Optional ISO date of the last substantive update. */
  updatedAt?: string;
  /** 2–4 topical tags (also fed to Article JSON-LD keywords). */
  tags: string[];
  blocks: BlogBlock[];
}
