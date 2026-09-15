/**
 * LifeSimGrid — Quest Party Builder
 *
 * Community-estimate team synergy model for Tomodachi Life
 * Quest parties (4 Mii slots: leader / support / scout / wildcard).
 *
 * IMPORTANT: Fan-made approximation, NOT official Nintendo data.
 * UI must carry a disclaimer.
 */

import {
  PERSONALITIES,
  getPersonalityGroup,
  getMbtiCode,
  type PersonalityGroup,
} from "@/lib/types";

export type QuestRole = "leader" | "support" | "scout" | "wildcard";
export const QUEST_ROLES: QuestRole[] = ["leader", "support", "scout", "wildcard"];

/* ------------------------------------------------------------------ */
/*  Role affinity matrix (0-100)                                        */
/* ------------------------------------------------------------------ */

/** How well each personality group fits each quest role. */
const roleAffinity: Record<QuestRole, Record<PersonalityGroup, number>> = {
  leader:   { outgoing: 90, confident: 85, independent: 55, easygoing: 50 },
  support:  { outgoing: 75, confident: 60, independent: 60, easygoing: 90 },
  scout:    { outgoing: 80, confident: 70, independent: 90, easygoing: 55 },
  wildcard: { outgoing: 55, confident: 55, independent: 85, easygoing: 85 },
};

/* ------------------------------------------------------------------ */
/*  Same-group harmony bonus                                            */
/* ------------------------------------------------------------------ */

const SAME_GROUP_BONUS = 5;
const COMPLEMENTARY_BONUS = 5;

/* ------------------------------------------------------------------ */
/*  Team evaluation                                                     */
/* ------------------------------------------------------------------ */

export interface TeamResult {
  /** Overall synergy 0-100 (mean of 4 role scores). */
  synergy: number;
  /** Per-role score 0-100. */
  roleScores: Record<QuestRole, number>;
  /** Harmony bonus applied (0-10). */
  harmonyBonus: number;
  /** Best role assignment given the 4 chosen personalities. */
  bestAssignment: Record<string, QuestRole>;
  /** Model marker. */
  model: "LifeSimGrid fan-made";
}

function isComplementary(a: PersonalityGroup, b: PersonalityGroup): boolean {
  return (
    (a === "outgoing" && b === "independent") ||
    (a === "independent" && b === "outgoing") ||
    (a === "confident" && b === "easygoing") ||
    (a === "easygoing" && b === "confident")
  );
}

/**
 * Greedy role assignment: repeatedly pair the unassigned personality
 * with the role it fits best.
 */
function bestAssign(personalities: string[]): Record<string, QuestRole> {
  const remaining = new Set(personalities);
  const result: Record<string, QuestRole> = {};
  const used = new Set<QuestRole>();

  for (const role of QUEST_ROLES) {
    let bestP: string | null = null;
    let bestScore = -1;
    for (const p of remaining) {
      const s = roleAffinity[role][getPersonalityGroup(p)];
      if (s > bestScore) { bestScore = s; bestP = p; }
    }
    if (bestP !== null) {
      result[bestP] = role;
      remaining.delete(bestP);
      used.add(role);
    }
  }
  return result;
}

export function evaluateTeam(team: [string, string, string, string]): TeamResult {
  const assignment = bestAssign(team);
  const roleScores = {} as Record<QuestRole, number>;
  let total = 0;

  for (const p of team) {
    const role = assignment[p];
    const s = roleAffinity[role][getPersonalityGroup(p)];
    roleScores[role] = s;
    total += s;
  }

  const base = Math.round(total / Math.max(team.length, 1));

  let harmonyBonus = 0;
  for (let i = 0; i < team.length; i++) {
    for (let j = i + 1; j < team.length; j++) {
      const ga = getPersonalityGroup(team[i]);
      const gb = getPersonalityGroup(team[j]);
      if (ga === gb) harmonyBonus += SAME_GROUP_BONUS;
      else if (isComplementary(ga, gb)) harmonyBonus += COMPLEMENTARY_BONUS;
    }
  }
  harmonyBonus = Math.min(harmonyBonus, 10);

  return {
    synergy: Math.max(0, Math.min(100, base + harmonyBonus)),
    roleScores,
    harmonyBonus,
    bestAssignment: assignment,
    model: "LifeSimGrid fan-made",
  };
}

/* ------------------------------------------------------------------ */
/*  Random team                                                         */
/* ------------------------------------------------------------------ */

export function randomTeam(size = 4): string[] {
  const pool = [...PERSONALITIES];
  const out: string[] = [];
  for (let i = 0; i < size && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(idx, 1)[0]);
  }
  return out;
}

/* ------------------------------------------------------------------ */
/*  Re-exports                                                          */
/* ------------------------------------------------------------------ */

export { PERSONALITIES, getPersonalityGroup, getMbtiCode };
