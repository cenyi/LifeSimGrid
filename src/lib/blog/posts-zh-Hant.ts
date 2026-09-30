/**
 * LifeSimGrid — Blog registry (zh-Hant)
 *
 * Import = publish. Posts live under ./posts/zh-Hant/.
 */
import type { BlogPost } from "./types";
import { postMiiQrFormat } from "./posts/zh-Hant/mii-qr-code-format-explained";
import { postMbtiMapping } from "./posts/zh-Hant/tomodachi-life-mbti-mapping-explained";
import { postVoiceSynthesis } from "./posts/zh-Hant/tomodachi-life-voice-synthesis-guide";
import { postFoodFavorites } from "./posts/zh-Hant/tomodachi-life-food-favorites-guide";

export const POSTS: BlogPost[] = [
  postMiiQrFormat,
  postMbtiMapping,
  postVoiceSynthesis,
  postFoodFavorites,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
