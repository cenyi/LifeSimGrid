/**
 * LifeSimGrid — Compatibility Calculator
 *
 * Calculates romance and friendship scores between two characters
 * based on zodiac signs and personality groups.
 *
 * IMPORTANT: This is a fan-made / community interpretation model,
 * NOT an official Nintendo algorithm. UI must display a disclaimer.
 */

import {
  type Zodiac,
  type PersonalityGroup,
  ZODIAC_ORDER,
  getPersonalityGroup,
  getMbtiCode,
} from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  Zodiac Compatibility Matrix (symmetric, values 0-100)            */
/* ------------------------------------------------------------------ */

const zodiacMatrix: number[][] = [
  [80, 55, 75, 45, 90, 60, 50, 65, 85, 55, 70, 60],
  [55, 80, 40, 90, 50, 85, 65, 75, 45, 90, 55, 70],
  [75, 40, 80, 55, 70, 45, 85, 60, 80, 50, 75, 55],
  [45, 90, 55, 80, 40, 70, 60, 90, 50, 75, 45, 85],
  [90, 50, 70, 40, 80, 55, 75, 45, 85, 60, 80, 50],
  [60, 85, 45, 70, 55, 80, 50, 75, 55, 90, 60, 70],
  [50, 65, 85, 60, 75, 50, 80, 55, 75, 45, 90, 60],
  [65, 75, 60, 90, 45, 75, 55, 80, 60, 70, 50, 85],
  [85, 45, 80, 50, 85, 55, 75, 60, 80, 55, 70, 45],
  [55, 90, 50, 75, 60, 90, 45, 70, 55, 80, 60, 75],
  [70, 55, 75, 45, 80, 60, 90, 50, 70, 60, 80, 55],
  [60, 70, 55, 85, 50, 70, 60, 85, 45, 75, 55, 80],
];

/* ------------------------------------------------------------------ */
/*  Personality Group Compatibility                                   */
/* ------------------------------------------------------------------ */

/** Complementary personality pairs for romance calculation. */
const complementaryPairs: [PersonalityGroup, PersonalityGroup][] = [
  ["outgoing", "independent"],
  ["confident", "easygoing"],
];

/** Checks if two personality groups are complementary. */
function isComplementary(a: PersonalityGroup, b: PersonalityGroup): boolean {
  return complementaryPairs.some(
    ([x, y]) => (x === a && y === b) || (x === b && y === a)
  );
}

/* ------------------------------------------------------------------ */
/*  Compatibility Result                                               */
/* ------------------------------------------------------------------ */

export interface CompatibilityResult {
  romance: number;
  friendship: number;
  zodiacScore: number;
  romanceBreakdown: { zodiac: number; personality: number };
  friendshipBreakdown: { zodiac: number; personality: number };
  /** Indicates this is a fan-made model, not official Nintendo. */
  model: "LifeSimGrid fan-made";
}

/* ------------------------------------------------------------------ */
/*  Calculate                                                          */
/* ------------------------------------------------------------------ */

/** Calculates compatibility between two characters based on zodiac and personality. */
export function calculateCompatibility(
  zodiacA: Zodiac | undefined,
  zodiacB: Zodiac | undefined,
  personalityA: string,
  personalityB: string
): CompatibilityResult {
  const safeZodiacA = zodiacA ?? "aries";
  const safeZodiacB = zodiacB ?? "aries";
  const idxA = ZODIAC_ORDER.indexOf(safeZodiacA);
  const idxB = ZODIAC_ORDER.indexOf(safeZodiacB);
  const zodiacScore = zodiacMatrix[idxA]?.[idxB] ?? 50;

  const groupA = getPersonalityGroup(personalityA);
  const groupB = getPersonalityGroup(personalityB);

  let romanceModifier = 0;
  let friendshipModifier = 0;

  if (isComplementary(groupA, groupB)) {
    romanceModifier += 20;
  }
  if (groupA === groupB) {
    romanceModifier -= 10;
    friendshipModifier += 20;
  }
  if (personalityA === personalityB) {
    romanceModifier -= 5;
    friendshipModifier += 10;
  }

  const romance = Math.max(0, Math.min(100, Math.round(zodiacScore * 0.5 + 50 * 0.5 + romanceModifier)));
  const friendship = Math.max(0, Math.min(100, Math.round(zodiacScore * 0.5 + 50 * 0.5 + friendshipModifier)));

  return {
    romance,
    friendship,
    zodiacScore,
    romanceBreakdown: {
      zodiac: Math.round(zodiacScore * 0.5),
      personality: Math.round(50 * 0.5 + romanceModifier),
    },
    friendshipBreakdown: {
      zodiac: Math.round(zodiacScore * 0.5),
      personality: Math.round(50 * 0.5 + friendshipModifier),
    },
    model: "LifeSimGrid fan-made",
  };
}

/* ------------------------------------------------------------------ */
/*  Re-exports (backward compatibility)                               */
/* ------------------------------------------------------------------ */

// Types are now imported from types.ts but re-exported for
// consumers that previously imported them from compatibility.ts.
export type { Zodiac, PersonalityGroup };
export { ZODIAC_ORDER, getPersonalityGroup, getMbtiCode };
