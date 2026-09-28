/**
 * LifeSimGrid — Blog registry (de)
 *
 * Import = publish. Posts live under ./posts/de/.
 */
import type { BlogPost } from "./types";
import { postMbtiMapping } from "./posts/de/tomodachi-life-mbti-mapping-explained";
import { postVoiceSynthesis } from "./posts/de/tomodachi-life-voice-synthesis-guide";
import { postFoodFavorites } from "./posts/de/tomodachi-life-food-favorites-guide";

export const POSTS: BlogPost[] = [
  postMbtiMapping,
  postVoiceSynthesis,
  postFoodFavorites,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
