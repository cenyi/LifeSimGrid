/**
 * LifeSimGrid — Blog registry (zh-CN)
 *
 * Import = publish. Posts live under ./posts/zh-CN/.
 */
import type { BlogPost } from "./types";
import { postMbtiMapping } from "./posts/zh-CN/tomodachi-life-mbti-mapping-explained";
import { postVoiceSynthesis } from "./posts/zh-CN/tomodachi-life-voice-synthesis-guide";
import { postFoodFavorites } from "./posts/zh-CN/tomodachi-life-food-favorites-guide";

export const POSTS: BlogPost[] = [
  postMbtiMapping,
  postVoiceSynthesis,
  postFoodFavorites,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
