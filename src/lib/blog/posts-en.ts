/**
 * LifeSimGrid — Blog registry (EN)
 *
 * Single source of truth for published blog posts. Each post lives in its
 * own file under ./posts/ and is imported here — the sitemap generator
 * scans ./posts/*.ts for `slug: "..."` literals, so a post that is written
 * but not imported here will still be ignored by both the router and the
 * sitemap (intentional: import = publish).
 *
 * To publish a new post:
 *   1. Create src/lib/blog/posts/<slug>.ts exporting `export const postXxx: BlogPost`
 *   2. Import it below and add it to POSTS
 *   3. Run `node scripts/generate-sitemap.mjs`
 */

import type { BlogPost } from "./types";
import { postMiiQrFormat } from "./posts/mii-qr-code-format-explained";
import { postMbtiMapping } from "./posts/tomodachi-life-mbti-mapping-explained";
import { postVoiceSynthesis } from "./posts/tomodachi-life-voice-synthesis-guide";
import { postFoodFavorites } from "./posts/tomodachi-life-food-favorites-guide";

/** All published posts, newest first. */
export const POSTS: BlogPost[] = [
  postMiiQrFormat,
  postMbtiMapping,
  postVoiceSynthesis,
  postFoodFavorites,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

/** Finds a post by slug. */
export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/** Collects all text from a post (for word counting). */
function postText(post: BlogPost): string {
  return post.blocks
    .map((b) => {
      switch (b.type) {
        case "p":
        case "h2":
        case "h3":
        case "code":
        case "callout":
          return b.text;
        case "ul":
        case "ol":
          return b.items.join(" ");
        case "table":
          return [...b.headers, ...b.rows.flat()].join(" ");
        default:
          return "";
      }
    })
    .join(" ");
}

/** Estimated word count of a post. */
export function wordCount(post: BlogPost): number {
  return postText(post).split(/\s+/).filter(Boolean).length;
}

/** Reading time estimate at ~220 wpm, minimum 1 minute. */
export function readingMinutes(post: BlogPost): number {
  return Math.max(1, Math.round(wordCount(post) / 220));
}

/** Formats an ISO date (YYYY-MM-DD) for display, e.g. "September 27, 2026". */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
