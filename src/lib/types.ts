/**
 * LifeSimGrid — Unified Type Definitions
 *
 * Single source of truth for all domain entities.
 * Every tool (MBTI page, Island Planner, Character Planner, etc.)
 * must import from here instead of declaring local interfaces.
 */

/* ------------------------------------------------------------------ */
/*  Zodiac                                                             */
/* ------------------------------------------------------------------ */

export type Zodiac =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

export const ZODIAC_ORDER: Zodiac[] = [
  "aries", "taurus", "gemini", "cancer",
  "leo", "virgo", "libra", "scorpio",
  "sagittarius", "capricorn", "aquarius", "pisces",
];

/* ------------------------------------------------------------------ */
/*  Personality                                                       */
/* ------------------------------------------------------------------ */

export type PersonalityGroup = "outgoing" | "confident" | "independent" | "easygoing";

/**
 * Canonical list of all 16 in-game personality keys.
 * The key format is `{group}_{subType}` (camelCase boundary).
 */
export const PERSONALITIES = [
  "outgoing_leader", "outgoing_entertainer", "outgoing_trendsetter", "outgoing_optimist",
  "confident_designer", "confident_adventurer", "confident_goGetter", "confident_charmer",
  "independent_artist", "independent_freeSpirit", "independent_thinker", "independent_loneWolf",
  "easygoing_dreamer", "easygoing_sweetheart", "easygoing_softie", "easygoing_buddy",
] as const;

export type PersonalityKey = (typeof PERSONALITIES)[number];

/**
 * Community-interpreted MBTI mapping for each in-game personality.
 * NOT an official Nintendo classification — fan-made interpretation.
 */
export const MBTI_MAP: Record<string, string> = {
  "outgoing_leader": "ESTJ",
  "outgoing_entertainer": "ESFP",
  "outgoing_trendsetter": "ENFP",
  "outgoing_optimist": "ESFJ",
  "confident_designer": "INTJ",
  "confident_adventurer": "ESTP",
  "confident_goGetter": "ENTJ",
  "confident_charmer": "ENTP",
  "independent_artist": "INFP",
  "independent_freeSpirit": "INTP",
  "independent_thinker": "ISTP",
  "independent_loneWolf": "ISTJ",
  "easygoing_dreamer": "INFJ",
  "easygoing_sweetheart": "ISFJ",
  "easygoing_softie": "INFP",
  "easygoing_buddy": "ISFP",
};

export type MbtiType =
  | "ESTJ" | "ESFP" | "ENFP" | "ESFJ"
  | "INTJ" | "ESTP" | "ENTJ" | "ENTP"
  | "INFP" | "INTP" | "ISTP" | "ISTJ"
  | "INFJ" | "ISFJ" | "ISFP";

/** Extracts the personality group from a full personality key. */
export function getPersonalityGroup(personality: string): PersonalityGroup {
  if (personality.startsWith("outgoing")) return "outgoing";
  if (personality.startsWith("confident")) return "confident";
  if (personality.startsWith("independent")) return "independent";
  return "easygoing";
}

/** Maps a personality key to its community-interpreted MBTI 4-letter type. */
export function getMbtiCode(personality: string): string {
  return MBTI_MAP[personality] ?? "INFP";
}

/** Extracts the sub-type slug from a full personality key (e.g. "outgoing_leader" → "leader"). */
export function getPersonalitySlug(personality: string): string {
  const parts = personality.split("_");
  return parts.length >= 2 ? parts[1] : personality;
}

/** Finds the full personality key from a slug (e.g. "leader" → "outgoing_leader"). */
export function getPersonalityFromSlug(slug: string): string | undefined {
  return PERSONALITIES.find((p) => getPersonalitySlug(p) === slug);
}

/** All valid MBTI types (lowercase slugs). */
export const MBTI_SLUGS: string[] = Object.values(MBTI_MAP).map((m) => m.toLowerCase());

/* ------------------------------------------------------------------ */
/*  Voice                                                              */
/* ------------------------------------------------------------------ */

export type VoicePreset = "adultMale" | "adultFemale" | "elder" | "child" | "robot";

export interface VoiceProfile {
  preset: VoicePreset;
  pitch: number;
  speed: number;
}

/* ------------------------------------------------------------------ */
/*  Quirk                                                              */
/* ------------------------------------------------------------------ */

export type QuirkCategory = "voice" | "eating" | "sleep" | "movement" | "other";

export interface Quirk {
  id: string;
  category: QuirkCategory;
  labelKey: string;
}

/* ------------------------------------------------------------------ */
/*  Design (Palette House creations)                                   */
/* ------------------------------------------------------------------ */

export type DesignCategory =
  | "clothing"
  | "food"
  | "pet"
  | "house"
  | "ground"
  | "item";

export interface PaletteColor {
  hex: string;
  label?: string;
}

export interface Design {
  id: string;
  category: DesignCategory;
  width: number;
  height: number;
  pixels: number[][];
  palette: PaletteColor[];
  sourceImage?: string;
}

/* ------------------------------------------------------------------ */
/*  Building (Island Planner)                                          */
/* ------------------------------------------------------------------ */

export type BuildingCategory =
  | "empty"
  | "house"
  | "apartment"
  | "cafe"
  | "shop"
  | "park"
  | "fountain"
  | "restaurant"
  | "tower"
  | "beach"
  | "bridge"
  | "tree"
  | "flower";

export interface BuildingDefinition {
  id: string;
  name: string;
  category: BuildingCategory;
  width: number;
  height: number;
  entrance?: { row: number; col: number };
  zone?: string;
  unlockInfo?: string;
}

export interface MapCell {
  type: BuildingCategory;
  residentName?: string;
  residentPersonality?: string;
}

export interface Zone {
  id: string;
  name: string;
  cells: { row: number; col: number }[];
}

/* ------------------------------------------------------------------ */
/*  Character (core entity — unifies Resident + future fields)         */
/* ------------------------------------------------------------------ */

/**
 * MiiCharacter is the central domain entity.
 * It replaces the fragmented `Resident` interfaces that were
 * previously duplicated in TomodachiLifeMbtiPage and TomodachiIslandPlannerPage.
 */
export interface MiiCharacter {
  id: string;
  name: string;

  /** Birthday in ISO date format (e.g. "1995-03-21"), or null if unset. */
  birthday?: string;

  personality: PersonalityKey | string;
  mbti?: string;
  zodiac?: Zodiac;

  voice?: VoiceProfile;
  quirks?: Quirk[];

  /** Reference to a Design ID for clothing. */
  clothing?: string;
  /** Reference to a Design ID or house theme name. */
  house?: string;

  notes?: string;

  /** ISO timestamp of creation (auto-set by character-db; optional for legacy objects). */
  createdAt?: number;
  /** ISO timestamp of last update (auto-set by character-db; optional for legacy objects). */
  updatedAt?: number;
}

/* ------------------------------------------------------------------ */
/*  Island                                                             */
/* ------------------------------------------------------------------ */

export interface Island {
  id: string;
  name: string;

  /** Array of MiiCharacter IDs. */
  residents: string[];

  map: MapCell[][];
  buildings: BuildingDefinition[];
  zones: Zone[];
  designs: Design[];
}

/* ------------------------------------------------------------------ */
/*  Legacy localStorage keys (for migration)                          */
/* ------------------------------------------------------------------ */

/**
 * Previous storage keys used before the unified IndexedDB layer.
 * Kept here so the migration function in character-db.ts can reference them.
 */
export const LEGACY_STORAGE_KEYS = {
  mbtiResidents: "lifesimgrid-residents-mbti",
  islandGrid: "lifesimgrid-island-planner",
  islandResidents: "lifesimgrid-island-residents",
} as const;

/** Maximum number of characters a user can store. */
export const MAX_CHARACTERS = 100;
