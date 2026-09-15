/**
 * LifeSimGrid — Tomodachi Life Mii Creator Data (community-estimate model)
 *
 * IMPORTANT: Tomodachi Life does not publish official slider ranges or a
 * name database. The data below is a community heuristic:
 *   - Appearance parameters approximate the visual range players observe
 *     in the Mii Maker editor (face shape, hair style, hair color, skin tone).
 *   - Personality prediction maps 4 slider values (Movement, Speech, Energy,
 *     Thinking) to the in-game 16 personality groups using a community-
 *     observed threshold model. NOT an official Nintendo algorithm.
 *   - Name suggestions are a fan-made pool per personality group.
 * UI must carry a clear "community-estimate / fan-made model" disclaimer.
 */

import {
  PERSONALITIES,
  getPersonalityGroup,
  getMbtiCode,
  MBTI_MAP,
  type PersonalityGroup,
} from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  Appearance parameters (community-estimate visual ranges)            */
/* ------------------------------------------------------------------ */

export type FaceShape =
  | "round"
  | "oval"
  | "heart"
  | "square"
  | "diamond";

export const FACE_SHAPES: FaceShape[] = [
  "round",
  "oval",
  "heart",
  "square",
  "diamond",
];

export type HairStyle =
  | "short"
  | "medium"
  | "long"
  | "bun"
  | "afro"
  | "spiky"
  | "curly"
  | "bald";

export const HAIR_STYLES: HairStyle[] = [
  "short",
  "medium",
  "long",
  "bun",
  "afro",
  "spiky",
  "curly",
  "bald",
];

/** Community-observed skin-tone palette (hex) used in the Mii editor. */
export const SKIN_TONES: string[] = [
  "#f6e4d3", // porcelain
  "#f2d4b3", // light
  "#e3b98f", // medium
  "#c98d5c", // tan
  "#a05f3a", // brown
  "#6f3f24", // deep
];

/** Community-observed hair-color palette (hex). */
export const HAIR_COLORS: string[] = [
  "#2b2b2b", // black
  "#5b3a29", // brown
  "#8b5a2b", // auburn
  "#c98a3d", // blonde
  "#e8d3a0", // platinum
  "#b03a48", // red
  "#4a6fa5", // blue
  "#7b5ea7", // purple
  "#d14d8a", // pink
  "#9b9b9b", // gray
];

export interface MiiAppearance {
  faceShape: FaceShape;
  hairStyle: HairStyle;
  hairColor: string; // hex
  skinTone: string; // hex
  gender: "male" | "female";
}

/* ------------------------------------------------------------------ */
/*  Personality prediction (4 slider values → 16 in-game personality)   */
/*                                                                      */
/*  Community threshold model. Each of the 4 sliders is 0-100. The     */
/*  resulting 4-bit "personality vector" maps to one of 16 types:      */
/*    - Movement (M): high = expressive                                  */
/*    - Speech     (S): high = talkative                                 */
/*    - Energy     (E): high = active                                    */
/*    - Thinking   (T): high = introverted / deep                       */
/*                                                                      */
/*  The mapping below approximates how in-game personality emerges from  */
/*  the four sliders, based on player observation (fan-estimate, NOT   */
/*  official).                                                          */
/* ------------------------------------------------------------------ */

export interface SliderValues {
  movement: number; // 0-100
  speech: number; // 0-100
  energy: number; // 0-100
  thinking: number; // 0-100
}

export const SLIDER_KEYS = ["movement", "speech", "energy", "thinking"] as const;
export type SliderKey = (typeof SLIDER_KEYS)[number];

export const SLIDER_DEFAULTS: Record<SliderKey, number> = {
  movement: 50,
  speech: 50,
  energy: 50,
  thinking: 50,
};

/**
 * Predicts the in-game personality key from 4 slider values.
 *
 * Model (community-estimate, not official):
 *   1. Compute a 4-element "trait vector" from the sliders (high/low bits).
 *   2. Map to one of the 16 canonical personality keys via a lookup.
 *
 * The mapping approximates how Tomodachi Life's personality emerges from
 * Movement / Speech / Energy / Thinking. Because the in-game algorithm is
 * not public, this is a heuristic, not a guarantee.
 */
export function predictPersonality(sliders: SliderValues): string {
  // Quantize each slider into 2 bands (low/high) → 2 bits × 4 = 8 bit mask.
  // We use 3-band quantization (low / mid / high) → 3×3×3×3 = 81 cells,
  // then map each cell to one of 16 personality keys by nearest-group logic.
  const band = (v: number) => (v < 34 ? 0 : v < 67 ? 1 : 2);
  const bM = band(sliders.movement);
  const bS = band(sliders.speech);
  const bE = band(sliders.energy);
  const bT = band(sliders.thinking);

  // Determine dominant group (outgoing / confident / independent / easygoing)
  // from the dominant axis.
  let group: PersonalityGroup;
  const active = bM + bS + bE; // outgoing-ish signal (high 3 = very social)
  const intro = bT; // high thinking = independent / reserved
  if (intro >= 2 && active <= 2) group = "independent";
  else if (active >= 4) group = bS >= 2 ? "outgoing" : "confident";
  else if (active >= 2) group = bM >= 2 ? "outgoing" : "easygoing";
  else group = "easygoing";

  // Within-group sub-type: pick by secondary axes.
  const sub = pickSubType(group, bM, bS, bE, bT);
  return sub;
}

/** Picks the in-game sub-type within a group using secondary axes. */
function pickSubType(
  group: PersonalityGroup,
  bM: number,
  bS: number,
  bE: number,
  bT: number
): string {
  switch (group) {
    case "outgoing":
      // outgoing: leader / entertainer / trendsetter / optimist
      if (bE >= 2 && bS >= 2) return "outgoing_entertainer";
      if (bM >= 2 && bS >= 1) return "outgoing_trendsetter";
      if (bT >= 1) return "outgoing_leader";
      return "outgoing_optimist";
    case "confident":
      // confident: designer / adventurer / goGetter / charmer
      if (bT >= 2) return "confident_designer";
      if (bE >= 2 && bM >= 2) return "confident_adventurer";
      if (bS >= 2) return "confident_charmer";
      return "confident_goGetter";
    case "independent":
      // independent: artist / freeSpirit / thinker / loneWolf
      if (bT >= 2 && bE <= 1) return "independent_thinker";
      if (bM >= 1 && bT >= 1) return "independent_artist";
      if (bE >= 2) return "independent_freeSpirit";
      return "independent_loneWolf";
    case "easygoing":
    default:
      // easygoing: dreamer / sweetheart / softie / buddy
      if (bT >= 2) return "easygoing_dreamer";
      if (bS >= 2) return "easygoing_sweetheart";
      if (bM >= 1 && bE >= 1) return "easygoing_buddy";
      return "easygoing_softie";
  }
}

/**
 * Returns the in-game personality key, its MBTI code, and group for a
 * set of slider values.
 */
export function predictFull(
  sliders: SliderValues
): { personality: string; mbti: string; group: PersonalityGroup } {
  const personality = predictPersonality(sliders);
  return {
    personality,
    mbti: getMbtiCode(personality),
    group: getPersonalityGroup(personality),
  };
}

/**
 * A fully random Mii appearance + sliders (for the "Randomize" button).
 */
export function randomMii(): {
  appearance: MiiAppearance;
  sliders: SliderValues;
} {
  const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
  const appearance: MiiAppearance = {
    faceShape: pick(FACE_SHAPES),
    hairStyle: pick(HAIR_STYLES),
    hairColor: pick(HAIR_COLORS),
    skinTone: pick(SKIN_TONES),
    gender: Math.random() < 0.5 ? "male" : "female",
  };
  const sliders: SliderValues = {
    movement: Math.floor(Math.random() * 101),
    speech: Math.floor(Math.random() * 101),
    energy: Math.floor(Math.random() * 101),
    thinking: Math.floor(Math.random() * 101),
  };
  return { appearance, sliders };
}

/* ------------------------------------------------------------------ */
/*  Name suggestion pool (fan-made, per personality group)             */
/* ------------------------------------------------------------------ */

/**
 * Community/fan-made Mii name pool keyed by personality group. These are
 * NOT official Nintendo character names. They are plausible, cute,
 * Mii-style names a player might give their resident.
 */
export const NAME_POOLS: Record<PersonalityGroup, string[]> = {
  outgoing: [
    "Sparky", "Bubbles", "Sunny", "Dash", "Poppy", "Coco",
    "Jazzy", "Fizz", "Momo", "Lumi",
  ],
  confident: [
    "Ace", "King", "Blaze", "Rex", "Nova", "Ace",
    "Ziggy", "Max", "Jax", "Blaze",
  ],
  independent: [
    "Nova", "Echo", "Sage", "Mika", "Orion", "Luna",
    "Sage", "Astra", "Onyx", "Wren",
  ],
  easygoing: [
    "Pip", "Milo", "Nori", "Honey", "Beau", "Peanut",
    "Mochi", "Willow", "Sunny", "Miso",
  ],
};

/**
 * Returns up to 8 candidate names for a personality group, seeded by a
 * simple hash of the personality key so the same personality always gets
 * the same pool ordering (deterministic, good for "share my Mii" links).
 */
export function suggestNames(group: PersonalityGroup, personality: string): string[] {
  const pool = [...(NAME_POOLS[group] ?? [])];
  // Rotate pool by hash of personality key for deterministic variation.
  const seed = personality.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const k = seed % pool.length;
  const rotated = pool.slice(k).concat(pool.slice(0, k));
  return rotated.slice(0, 8);
}

/**
 * Export the current Mii to a JSON string (for download / share).
 */
export function exportMiiJson(data: {
  appearance: MiiAppearance;
  sliders: SliderValues;
  name?: string;
  personality?: string;
  mbti?: string;
}): string {
  return JSON.stringify(data, null, 2);
}

/**
 * Re-export the canonical personality list for cross-linking.
 */
export { PERSONALITIES, MBTI_MAP };
