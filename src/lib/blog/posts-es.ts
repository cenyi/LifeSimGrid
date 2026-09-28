/**
 * LifeSimGrid — Blog registry (es)
 *
 * Import = publish. Posts live under ./posts/es/.
 */
import type { BlogPost } from "./types";
import { postMbtiMapping } from "./posts/es/tomodachi-life-mbti-mapping-explained";
import { postVoiceSynthesis } from "./posts/es/tomodachi-life-voice-synthesis-guide";
import { postFoodFavorites } from "./posts/es/tomodachi-life-food-favorites-guide";

export const POSTS: BlogPost[] = [
  postMbtiMapping,
  postVoiceSynthesis,
  postFoodFavorites,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
