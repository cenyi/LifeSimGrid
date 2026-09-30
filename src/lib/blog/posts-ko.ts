/**
 * LifeSimGrid — Blog registry (ko)
 *
 * Import = publish. Posts live under ./posts/ko/.
 */
import type { BlogPost } from "./types";
import { postMiiQrFormat } from "./posts/ko/mii-qr-code-format-explained";
import { postMbtiMapping } from "./posts/ko/tomodachi-life-mbti-mapping-explained";
import { postVoiceSynthesis } from "./posts/ko/tomodachi-life-voice-synthesis-guide";
import { postFoodFavorites } from "./posts/ko/tomodachi-life-food-favorites-guide";

export const POSTS: BlogPost[] = [
  postMiiQrFormat,
  postMbtiMapping,
  postVoiceSynthesis,
  postFoodFavorites,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
