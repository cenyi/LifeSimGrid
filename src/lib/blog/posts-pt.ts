/**
 * LifeSimGrid — Blog registry (pt)
 *
 * Import = publish. Posts live under ./posts/pt/.
 */
import type { BlogPost } from "./types";
import { postMiiQrFormat } from "./posts/pt/mii-qr-code-format-explained";
import { postMbtiMapping } from "./posts/pt/tomodachi-life-mbti-mapping-explained";
import { postVoiceSynthesis } from "./posts/pt/tomodachi-life-voice-synthesis-guide";
import { postFoodFavorites } from "./posts/pt/tomodachi-life-food-favorites-guide";

export const POSTS: BlogPost[] = [
  postMiiQrFormat,
  postMbtiMapping,
  postVoiceSynthesis,
  postFoodFavorites,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
