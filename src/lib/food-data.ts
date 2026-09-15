/**
 * LifeSimGrid — Tomodachi Life Food Database (community-estimate model)
 *
 * IMPORTANT: Tomodachi Life does not publish an official "food reaction
 * matrix". Each Mii has a randomly-generated favorite food and a randomly-
 * generated disliked food. Feeding the favorite food produces a strong
 * positive reaction; feeding the disliked food produces a negative one.
 *
 * The category-affinity data below is a community heuristic (based on
 * player observation and fan chart sites) used for *prediction* when the
 * user does not yet know a specific Mii's favorite/disliked food. It is
 * NOT official Nintendo data. UI must carry a clear disclaimer.
 */

export type FoodCategory =
  | "drink"
  | "dessert"
  | "candy"
  | "snack"
  | "main"
  | "fruit"
  | "vegetable"
  | "other";

export const FOOD_CATEGORIES: FoodCategory[] = [
  "drink", "dessert", "candy", "snack", "main", "fruit", "vegetable", "other",
];

export type MiiReaction = "love" | "like" | "neutral" | "dislike" | "hate";

export const MII_REACTIONS: MiiReaction[] = ["love", "like", "neutral", "dislike", "hate"];

export interface FoodItem {
  /** Stable id for the checklist (localStorage key). */
  id: string;
  /** Display name (English base; localized in i18n where useful). */
  name: string;
  category: FoodCategory;
  /**
   * Community-heuristic affinity per personality group.
   * Values: 0-100 (0 = strongly disliked, 100 = strongly liked).
   * Used to PREDICT reaction when the Mii's actual favorite is unknown.
   */
  affinity: Record<string, number>;
  /** Whether this food can be "locked" / is a common favorite in the game. */
  commonFavorite: boolean;
}

/**
 * Affinity heuristics per personality group (community observation).
 * - outgoing: energetic, party-oriented → strong for sweets/drinks
 * - confident: status-oriented → strong for "fancy" / restaurant foods
 * - independent: individualistic → strong for unusual / niche items
 * - easygoing: gentle, home-oriented → strong for home-style / comfort foods
 */
const AFFINITY_PRESETS: Record<string, Record<string, number>> = {
  // category → per-group baseline (0-100). Values tuned so each group
  // shows a distinct ranking across categories (useful for "which food
  // to try first" recommendations).
  drink:     { outgoing: 90, confident: 70, independent: 60, easygoing: 75 },
  dessert:   { outgoing: 85, confident: 65, independent: 70, easygoing: 80 },
  candy:     { outgoing: 95, confident: 55, independent: 60, easygoing: 75 },
  snack:     { outgoing: 80, confident: 75, independent: 70, easygoing: 85 },
  main:      { outgoing: 65, confident: 90, independent: 60, easygoing: 90 },
  fruit:     { outgoing: 75, confident: 70, independent: 75, easygoing: 80 },
  vegetable: { outgoing: 60, confident: 65, independent: 80, easygoing: 85 },
  other:     { outgoing: 70, confident: 60, independent: 85, easygoing: 70 },
};

function makeFood(
  id: string,
  name: string,
  category: FoodCategory,
  commonFavorite: boolean
): FoodItem {
  return {
    id,
    name,
    category,
    affinity: { ...AFFINITY_PRESETS[category] },
    commonFavorite,
  };
}

/**
 * The food database. ~40 entries based on Tomodachi Life (DS) and
 * Living the Dream (Switch) food items observed in the game.
 */
export const FOODS: FoodItem[] = [
  // Drinks
  makeFood("coke", "Cola", "drink", true),
  makeFood("juice", "Juice", "drink", true),
  makeFood("soda", "Soda", "drink", true),
  makeFood("coffee", "Coffee", "drink", false),
  makeFood("tea", "Tea", "drink", false),
  makeFood("milk", "Milk", "drink", false),
  makeFood("water", "Water", "drink", false),
  makeFood("beer", "Beer", "drink", false),
  makeFood("sake", "Sake", "drink", false),
  // Desserts
  makeFood("cake", "Cake", "dessert", true),
  makeFood("icecream", "Ice Cream", "dessert", true),
  makeFood("donut", "Donut", "dessert", true),
  makeFood("cookie", "Cookie", "dessert", true),
  makeFood("pie", "Pie", "dessert", false),
  makeFood("waffle", "Waffle", "dessert", false),
  makeFood("brownie", "Brownie", "dessert", false),
  makeFood("pudding", "Pudding", "dessert", false),
  // Candy
  makeFood("chocolate", "Chocolate", "candy", true),
  makeFood("gum", "Gum", "candy", false),
  makeFood("caramel", "Caramel", "candy", false),
  makeFood("licorice", "Licorice", "candy", false),
  makeFood("candy", "Candy", "candy", true),
  // Snacks
  makeFood("chips", "Chips", "snack", true),
  makeFood("popcorn", "Popcorn", "snack", true),
  makeFood("noodles", "Noodles", "snack", false),
  makeFood("crackers", "Crackers", "snack", false),
  makeFood("pretzel", "Pretzel", "snack", false),
  // Main dishes
  makeFood("pizza", "Pizza", "main", true),
  makeFood("burger", "Hamburger", "main", true),
  makeFood("sushi", "Sushi", "main", true),
  makeFood("noodlesMain", "Noodle Soup", "main", false),
  makeFood("ramen", "Ramen", "main", false),
  makeFood("curry", "Curry", "main", true),
  makeFood("spaghetti", "Spaghetti", "main", false),
  makeFood("rice", "Rice", "main", false),
  makeFood("sashimi", "Sashimi", "main", false),
  makeFood("steak", "Steak", "main", false),
  // Fruits
  makeFood("apple", "Apple", "fruit", true),
  makeFood("banana", "Banana", "fruit", false),
  makeFood("grape", "Grape", "fruit", false),
  makeFood("melon", "Melon", "fruit", false),
  makeFood("strawberry", "Strawberry", "fruit", false),
  // Vegetables
  makeFood("carrot", "Carrot", "vegetable", false),
  makeFood("broccoli", "Broccoli", "vegetable", false),
  makeFood("salad", "Salad", "vegetable", false),
  makeFood("cucumber", "Cucumber", "vegetable", false),
  // Other
  makeFood("boba", "Boba Tea", "other", false),
  makeFood("sundae", "Sundae", "other", false),
];

/**
 * Maps a 0-100 affinity value to a discrete Mii reaction band.
 * Community heuristic (not official):
 *   90+ love, 75+ like, 40-74 neutral, 25-39 dislike, <25 hate
 */
export function affinityToReaction(value: number): MiiReaction {
  if (value >= 90) return "love";
  if (value >= 75) return "like";
  if (value >= 40) return "neutral";
  if (value >= 25) return "dislike";
  return "hate";
}

/**
 * Predicts the reaction band of a Mii with the given personality group
 * toward a specific food, using the community-affinity heuristic.
 */
export function predictReaction(food: FoodItem, group: string): MiiReaction {
  const value = food.affinity[group] ?? 50;
  return affinityToReaction(value);
}

/**
 * For a Mii whose actual favorite food is known, returns "love" for that
 * food regardless of heuristic (the game's real behavior).
 */
export function reactionForKnownFavorite(
  food: FoodItem,
  group: string,
  favoriteFoodId: string | null,
  dislikedFoodId: string | null
): MiiReaction {
  if (food.id === favoriteFoodId) return "love";
  if (food.id === dislikedFoodId) return "hate";
  return predictReaction(food, group);
}
