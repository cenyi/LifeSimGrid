/**
 * LifeSimGrid — Blog registry (ru)
 *
 * Import = publish. Posts live under ./posts/ru/.
 */
import type { BlogPost } from "./types";
import { postMbtiMapping } from "./posts/ru/tomodachi-life-mbti-mapping-explained";
import { postVoiceSynthesis } from "./posts/ru/tomodachi-life-voice-synthesis-guide";
import { postFoodFavorites } from "./posts/ru/tomodachi-life-food-favorites-guide";

export const POSTS: BlogPost[] = [
  postMbtiMapping,
  postVoiceSynthesis,
  postFoodFavorites,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
