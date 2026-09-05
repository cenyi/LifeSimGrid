/**
 * LifeSimGrid — Personality Data & Display Configuration
 *
 * Centralises all personality-related display metadata so that
 * TomodachiLifeMbtiPage, TomodachiIslandPlannerPage, and any
 * future pages share a single source of truth.
 *
 * Core type/constant definitions (PERSONALITIES, MBTI_MAP,
 * getPersonalityGroup, getMbtiCode) live in types.ts;
 * this file adds display-layer metadata: group colors,
 * i18n key prefixes, grid positions, and helper arrays.
 */

import {
  PERSONALITIES,
  MBTI_MAP,
  getPersonalityGroup,
  getMbtiCode,
  type PersonalityGroup,
  type PersonalityKey,
} from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  Re-exports (so consumers can import from one place)               */
/* ------------------------------------------------------------------ */

export {
  PERSONALITIES,
  MBTI_MAP,
  getPersonalityGroup,
  getMbtiCode,
};

export type { PersonalityKey, PersonalityGroup };

/* ------------------------------------------------------------------ */
/*  Personality Groups                                                 */
/* ------------------------------------------------------------------ */

export const PERSONALITY_GROUPS: PersonalityGroup[] = [
  "outgoing",
  "confident",
  "independent",
  "easygoing",
];

/** Gets the i18n key prefix for a personality group. */
export function getGroupLabelKey(group: PersonalityGroup): string {
  return `group${group.charAt(0).toUpperCase()}${group.slice(1)}`;
}

/** Gets a display color for a personality group (used in UI cards and charts). */
export function getGroupColor(group: PersonalityGroup): string {
  switch (group) {
    case "outgoing": return "#f59e0b";
    case "confident": return "#ef4444";
    case "independent": return "#8b5cf6";
    case "easygoing": return "#22c55e";
  }
}

/** Gets a 2D grid position (0-100) for a personality group. */
export function getGroupPosition(group: PersonalityGroup): { x: number; y: number } {
  switch (group) {
    case "outgoing": return { x: 75, y: 25 };
    case "confident": return { x: 75, y: 75 };
    case "independent": return { x: 25, y: 75 };
    case "easygoing": return { x: 25, y: 25 };
  }
}

/* ------------------------------------------------------------------ */
/*  Personality → i18n Key Helpers                                    */
/* ------------------------------------------------------------------ */

/**
 * Builds the i18n key for a personality's display name.
 * Example: "outgoing_leader" → "personalityLeader"
 */
export function getPersonalityLabelKey(personality: string): string {
  // Split on underscore, take the second part (subType)
  const parts = personality.split("_");
  if (parts.length < 2) return "personality";
  const subType = parts[1];
  return `personality${subType.charAt(0).toUpperCase()}${subType.slice(1)}`;
}

/**
 * Builds the i18n key for a personality's "fan reason" text.
 * Example: "outgoing_leader" → "fanReasonLeader"
 */
export function getFanReasonKey(personality: string): string {
  const parts = personality.split("_");
  if (parts.length < 2) return "fanReason";
  const subType = parts[1];
  return `fanReason${subType.charAt(0).toUpperCase()}${subType.slice(1)}`;
}

/* ------------------------------------------------------------------ */
/*  Zodiac                                                             */
/* ------------------------------------------------------------------ */

export { ZODIAC_ORDER } from "@/lib/types";
