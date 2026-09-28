/**
 * LifeSimGrid — Blog registry (fr)
 *
 * Import = publish. Posts live under ./posts/fr/.
 */
import type { BlogPost } from "./types";
import { postMbtiMapping } from "./posts/fr/tomodachi-life-mbti-mapping-explained";
import { postVoiceSynthesis } from "./posts/fr/tomodachi-life-voice-synthesis-guide";
import { postFoodFavorites } from "./posts/fr/tomodachi-life-food-favorites-guide";

export const POSTS: BlogPost[] = [
  postMbtiMapping,
  postVoiceSynthesis,
  postFoodFavorites,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
