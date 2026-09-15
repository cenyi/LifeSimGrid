/**
 * LifeSimGrid — Tomodachi Life Gift & Item Database (community-estimate model)
 *
 * IMPORTANT: Tomodachi Life does not publish an official "gift affinity
 * matrix". Each Mii has a randomly-generated list of liked and disliked
 * items; a gift that matches the Mii's hidden preferences produces a strong
 * positive reaction, and a mismatch produces a negative one.
 *
 * The category-affinity data below is a community heuristic (based on player
 * observation and fan chart sites) used for *suggestions* when the user does
 * not yet know a specific Mii's preferences. It is NOT official Nintendo
 * data. UI must carry a clear disclaimer.
 */

import { PERSONALITIES, getPersonalityGroup } from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  Gift categories                                                     */
/* ------------------------------------------------------------------ */

export type GiftCategory =
  | "toy"
  | "clothing"
  | "accessory"
  | "food"
  | "drink"
  | "book"
  | "furniture"
  | "electronics"
  | "hobby"
  | "plant"
  | "sports"
  | "music";

export const GIFT_CATEGORIES: GiftCategory[] = [
  "toy",
  "clothing",
  "accessory",
  "food",
  "drink",
  "book",
  "furniture",
  "electronics",
  "hobby",
  "plant",
  "sports",
  "music",
];

/* ------------------------------------------------------------------ */
/*  Gift affinity heuristics per personality group                      */
/* ------------------------------------------------------------------ */

/**
 * Community-heuristic baseline affinity (0-100) for each gift category
 * per personality group.
 *
 * - outgoing: energetic, social, novelty-seeking → high for toys, clothes,
 *   accessories, music, sports
 * - confident: status, trend, luxury-oriented → high for clothing,
 *   accessories, furniture, electronics
 * - independent: individualistic, niche interests → high for books,
 *   hobby, plants, music (unusual), furniture
 * - easygoing: gentle, home, comfort-oriented → high for food, drink,
 *   plants, furniture, books
 */
const CATEGORY_AFFINITY: Record<GiftCategory, Record<string, number>> = {
  toy:        { outgoing: 90, confident: 60, independent: 75, easygoing: 55 },
  clothing:   { outgoing: 85, confident: 90, independent: 65, easygoing: 70 },
  accessory:  { outgoing: 80, confident: 85, independent: 70, easygoing: 75 },
  food:       { outgoing: 75, confident: 65, independent: 60, easygoing: 90 },
  drink:      { outgoing: 85, confident: 70, independent: 55, easygoing: 80 },
  book:       { outgoing: 50, confident: 60, independent: 85, easygoing: 75 },
  furniture:  { outgoing: 55, confident: 80, independent: 75, easygoing: 85 },
  electronics:{ outgoing: 70, confident: 85, independent: 70, easygoing: 50 },
  hobby:      { outgoing: 75, confident: 65, independent: 90, easygoing: 70 },
  plant:      { outgoing: 60, confident: 55, independent: 80, easygoing: 85 },
  sports:     { outgoing: 90, confident: 70, independent: 60, easygoing: 65 },
  music:      { outgoing: 85, confident: 65, independent: 85, easygoing: 60 },
};

/* ------------------------------------------------------------------ */
/*  Items                                                               */
/* ------------------------------------------------------------------ */

export interface GiftItem {
  /** Stable id for the wishlist (localStorage key). */
  id: string;
  /** Display name (English base; localized via i18n where needed). */
  name: string;
  category: GiftCategory;
  /**
   * Community-heuristic affinity per personality group (0-100).
   * Used to SUGGEST which personality is most likely to like this item
   * when the user does not yet know the Mii's hidden preferences.
   */
  affinity: Record<string, number>;
  /** Whether this gift is a common/repeatable choice in the game. */
  commonGift: boolean;
}

function makeGift(
  id: string,
  name: string,
  category: GiftCategory,
  commonGift: boolean
): GiftItem {
  return {
    id,
    name,
    category,
    affinity: { ...CATEGORY_AFFINITY[category] },
    commonGift,
  };
}

/**
 * The gift / item database. ~40 entries based on Tomodachi Life (DS) and
 * Living the Dream (Switch) gifts and items observed in the game.
 */
export const GIFTS: GiftItem[] = [
  // Toys
  makeGift("teddy-bear", "Teddy Bear", "toy", true),
  makeGift("puzzle", "Jigsaw Puzzle", "toy", false),
  makeGift("rc-car", "Remote-Control Car", "toy", false),
  makeGift("doll", "Fashion Doll", "toy", true),
  makeGift("action-figure", "Action Figure", "toy", false),
  makeGift("board-game", "Board Game", "toy", false),

  // Clothing
  makeGift("t-shirt", "Graphic T-Shirt", "clothing", true),
  makeGift("hat", "Designer Hat", "clothing", true),
  makeGift("sweater", "Knit Sweater", "clothing", false),
  makeGift("scarf", "Silk Scarf", "clothing", false),
  makeGift("sneakers", "Designer Sneakers", "clothing", false),

  // Accessories
  makeGift("watch", "Wrist Watch", "accessory", false),
  makeGift("necklace", "Beaded Necklace", "accessory", false),
  makeGift("glasses", "Sunglasses", "accessory", true),
  makeGift("backpack", "Canvas Backpack", "accessory", false),

  // Food
  makeGift("cake", "Birthday Cake", "food", true),
  makeGift("cookie", "Cookie Tin", "food", true),
  makeGift("chocolate", "Chocolate Box", "food", true),
  makeGift("candy", "Candy Bag", "food", true),

  // Drinks
  makeGift("soda", "Soda Pack", "drink", true),
  makeGift("juice", "Fruit Juice", "drink", true),
  makeGift("coffee", "Coffee Set", "drink", false),

  // Books
  makeGift("novel", "Mystery Novel", "book", false),
  makeGift("cookbook", "Cookbook", "book", false),
  makeGift("comic", "Comic Book", "book", false),
  makeGift("diary", "Leather Diary", "book", false),

  // Furniture
  makeGift("lamp", "Table Lamp", "furniture", false),
  makeGift("clock", "Wall Clock", "furniture", false),
  makeGift("rug", "Area Rug", "furniture", false),
  makeGift("vase", "Decorative Vase", "furniture", false),

  // Electronics
  makeGift("camera", "Digital Camera", "electronics", false),
  makeGift("headphones", "Wireless Headphones", "electronics", false),
  makeGift("radio", "Portable Radio", "electronics", true),

  // Hobby
  makeGift("paint-set", "Paint Set", "hobby", false),
  makeGift("fishing-rod", "Fishing Rod", "hobby", false),
  makeGift("camera-kit", "Camera Kit", "hobby", false),

  // Plants
  makeGift("potted-plant", "Potted Plant", "plant", true),
  makeGift("bonsai", "Bonsai Tree", "plant", false),
  makeGift("flower-seeds", "Flower Seeds", "plant", true),

  // Sports
  makeGift("tennis-racket", "Tennis Racket", "sports", false),
  makeGift("soccer-ball", "Soccer Ball", "sports", true),
  makeGift("yoga-mat", "Yoga Mat", "sports", false),

  // Music
  makeGift("guitar", "Mini Guitar", "music", false),
  makeGift("cd", "Music CD", "music", true),
  makeGift("metronome", "Metronome", "music", false),
];

/* ------------------------------------------------------------------ */
/*  Finders                                                             */
/* ------------------------------------------------------------------ */

/**
 * Suggests the best gift category for a given personality type
 * (community-heuristic ranking). Returns sorted categories by affinity.
 */
export function bestCategoriesFor(personality: string): { category: GiftCategory; affinity: number }[] {
  const group = getPersonalityGroup(personality);
  return GIFT_CATEGORIES
    .map((c) => ({ category: c, affinity: CATEGORY_AFFINITY[c][group] }))
    .sort((a, b) => b.affinity - a.affinity);
}

/**
 * Suggests which personality types would like a given gift item most.
 * Returns the top 3 personalities ranked by affinity.
 */
export function topReceiversFor(itemId: string): { personality: string; affinity: number }[] {
  const item = GIFTS.find((g) => g.id === itemId);
  if (!item) return [];
  return PERSONALITIES
    .map((p) => ({ personality: p, affinity: item.affinity[getPersonalityGroup(p)] }))
    .sort((a, b) => b.affinity - a.affinity)
    .slice(0, 3);
}

/**
 * Returns a random gift from the pool.
 */
export function randomGift(): GiftItem {
  return GIFTS[Math.floor(Math.random() * GIFTS.length)];
}

/**
 * Computes the affinity score of a gift for a specific personality.
 */
export function affinityOf(itemId: string, personality: string): number | null {
  const item = GIFTS.find((g) => g.id === itemId);
  return item ? item.affinity[getPersonalityGroup(personality)] : null;
}

/**
 * Suggests the single best gift within a category for a given personality
 * (highest community-heuristic affinity). Ties broken by commonGift first,
 * then by stable id order.
 */
export function bestGiftInCategory(category: GiftCategory, personality: string): GiftItem | null {
  const group = getPersonalityGroup(personality);
  return GIFTS.filter((g) => g.category === category)
    .sort((a, b) => {
      const da = b.affinity[group] - a.affinity[group];
      if (da !== 0) return da;
      if (a.commonGift !== b.commonGift) return a.commonGift ? -1 : 1;
      return a.id.localeCompare(b.id);
    })[0] ?? null;
}

/* ------------------------------------------------------------------ */
/*  Re-exports                                                          */
/* ------------------------------------------------------------------ */

export { PERSONALITIES, getPersonalityGroup };