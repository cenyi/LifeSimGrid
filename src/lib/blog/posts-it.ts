/**
 * LifeSimGrid — Blog registry (it)
 *
 * Import = publish. Posts live under ./posts/it/.
 */
import type { BlogPost } from "./types";
import { postMiiQrFormat } from "./posts/it/mii-qr-code-format-explained";
import { postMbtiMapping } from "./posts/it/tomodachi-life-mbti-mapping-explained";
import { postVoiceSynthesis } from "./posts/it/tomodachi-life-voice-synthesis-guide";
import { postFoodFavorites } from "./posts/it/tomodachi-life-food-favorites-guide";

export const POSTS: BlogPost[] = [
  postMiiQrFormat,
  postMbtiMapping,
  postVoiceSynthesis,
  postFoodFavorites,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
