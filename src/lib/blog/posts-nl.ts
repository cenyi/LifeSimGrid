/**
 * LifeSimGrid — Blog registry (nl)
 *
 * Import = publish. Posts live under ./posts/nl/.
 */
import type { BlogPost } from "./types";
import { postMbtiMapping } from "./posts/nl/tomodachi-life-mbti-mapping-explained";
import { postVoiceSynthesis } from "./posts/nl/tomodachi-life-voice-synthesis-guide";
import { postFoodFavorites } from "./posts/nl/tomodachi-life-food-favorites-guide";

export const POSTS: BlogPost[] = [
  postMbtiMapping,
  postVoiceSynthesis,
  postFoodFavorites,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
