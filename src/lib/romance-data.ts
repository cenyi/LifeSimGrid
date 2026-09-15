/**
 * LifeSimGrid — Romance Matcher Data & Helpers
 *
 * Extends the P0 compatibility engine with romance-specific features:
 *   - Best-couple explorer: 16x16 personality pairing matrix showing top
 *     romance pairings per group
 *   - Date picker hint: which weekday is "best" for a pair to date
 *   - Romance commentary bands (high / medium / low)
 *
 * IMPORTANT: All pairings and hints are a community-estimate / fan-made
 * model, NOT official Nintendo data. UI must carry a disclaimer.
 */

import {
  PERSONALITIES,
  ZODIAC_ORDER,
  getPersonalityGroup,
  getMbtiCode,
  type Zodiac,
  type PersonalityGroup,
} from "@/lib/types";
import { calculateCompatibility } from "@/lib/compatibility";

/* ------------------------------------------------------------------ */
/*  Best-couple explorer (16 × 16 matrix)                              */
/* ------------------------------------------------------------------ */

export interface PairingCell {
  a: string; // personality key A
  b: string; // personality key B
  romance: number;
  friendship: number;
  zodiac: Zodiac; // default zodiac for the pair (used for the matrix)
}

/**
 * Builds a full 16×16 romance pairing matrix using a fixed zodiac pair
 * (Aries × Taurus) as the baseline. The zodiac contribution is constant
 * so the matrix isolates the personality-group effects.
 *
 * Returns only the distinct pairings (upper triangle, including diagonal
 * = same-type pairs). Each row is one personality A; the matrix itself
 * is rendered as a grid by the component.
 */
export function buildPairingMatrix(zodiacA: Zodiac = "aries", zodiacB: Zodiac = "taurus"): PairingCell[] {
  const cells: PairingCell[] = [];
  for (let i = 0; i < PERSONALITIES.length; i++) {
    for (let j = i; j < PERSONALITIES.length; j++) {
      const a = PERSONALITIES[i];
      const b = PERSONALITIES[j];
      const result = calculateCompatibility(zodiacA, zodiacB, a, b);
      cells.push({
        a,
        b,
        romance: result.romance,
        friendship: result.friendship,
        zodiac: zodiacA,
      });
    }
  }
  return cells;
}

/**
 * Returns the top-N romance pairings from the full matrix.
 * N defaults to 12 (3 per group, symmetric).
 */
export function topRomancePairings(cells: PairingCell[], n = 12): PairingCell[] {
  // Deduplicate: for i < j, keep only the better of (i,j) and (j,i)
  // Since buildPairingMatrix already does i<=j, just sort and take top-n.
  const sorted = [...cells].sort((x, y) => y.romance - x.romance);
  return sorted.slice(0, n);
}

/* ------------------------------------------------------------------ */
/*  Date picker hint                                                   */
/* ------------------------------------------------------------------ */

/**
 * Day-of-week names (0=Sunday .. 6=Saturday) for the date picker hint.
 * In Tomodachi Life, each Mii has a "birthday" and the weekly
 * compatibility forecaster picks a "best day" for interaction.
 *
 * This heuristic maps the combined zodiac+personality score to a
 * weekday (0-6) via a deterministic hash, so the same pair always
 * gets the same recommended day.
 */
export function recommendedDate(
  zodiacA: Zodiac,
  zodiacB: Zodiac,
  personalityA: string,
  personalityB: string
): number {
  // Simple FNV-style hash → 0-6
  const s = `${zodiacA}|${zodiacB}|${personalityA}|${personalityB}`;
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h * 16777619) >>> 0;
  }
  return h % 7;
}

/** Day name i18n key (within TomodachiLifeRomanceMatcherPage namespace). */
export function dayNameKey(day: number): string {
  const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `day${names[day]}`;
}

/* ------------------------------------------------------------------ */
/*  Romance commentary bands                                           */
/* ------------------------------------------------------------------ */

export type RomanceBand = "high" | "medium" | "low";

export function romanceBand(score: number): RomanceBand {
  if (score >= 70) return "high";
  if (score >= 40) return "medium";
  return "low";
}

/**
 * Returns the i18n key for a romance commentary band within the
 * TomodachiLifeRomanceMatcherPage namespace.
 */
export function romanceCommentKey(band: RomanceBand): string {
  return `romanceComment${band.charAt(0).toUpperCase()}${band.slice(1)}`;
}

/* ------------------------------------------------------------------ */
/*  Best-couple data per group                                         */
/* ------------------------------------------------------------------ */

/**
 * Per-group best-couple highlight (community-estimate). Used by the
 * "best couples" section to show 4 group-level highlights.
 */
export function groupHighlights(cells: PairingCell[]): { group: PersonalityGroup; pairing: PairingCell }[] {
  const groups: PersonalityGroup[] = ["outgoing", "confident", "independent", "easygoing"];
  return groups.map((g) => {
    // Find the best pairing where BOTH types are in the same group
    const inGroup = cells.filter((c) => {
      const ga = getPersonalityGroup(c.a);
      const gb = getPersonalityGroup(c.b);
      return ga === g && gb === g && c.a !== c.b;
    });
    const best = inGroup.length ? inGroup.sort((x, y) => y.romance - x.romance)[0] : cells[0];
    return { group: g, pairing: best };
  });
}

/* Re-export for consumers */
export { PERSONALITIES, ZODIAC_ORDER, getPersonalityGroup, getMbtiCode };
