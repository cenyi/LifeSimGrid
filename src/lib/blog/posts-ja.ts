/**
 * LifeSimGrid — Blog registry (ja)
 *
 * Import = publish. Posts live under ./posts/ja/.
 */
import type { BlogPost } from "./types";
import { postMiiQrFormat } from "./posts/ja/mii-qr-code-format-explained";
import { postMbtiMapping } from "./posts/ja/tomodachi-life-mbti-mapping-explained";
import { postVoiceSynthesis } from "./posts/ja/tomodachi-life-voice-synthesis-guide";
import { postFoodFavorites } from "./posts/ja/tomodachi-life-food-favorites-guide";

export const POSTS: BlogPost[] = [
  postMiiQrFormat,
  postMbtiMapping,
  postVoiceSynthesis,
  postFoodFavorites,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
