/**
 * LifeSimGrid — Personality Quiz Data & Scoring
 *
 * 8 multiple-choice questions mapping to the 4 in-game slider axes
 * (Movement / Speech / Energy / Thinking) and ultimately to one of the
 * 16 Tomodachi Life personality types + MBTI code.
 *
 * IMPORTANT: The quiz scoring model is a community-estimate heuristic,
 * not an official Nintendo algorithm. UI must carry a disclaimer.
 */

import { predictFull, type SliderValues } from "@/lib/mii-creator-data";
import { getMbtiCode, getPersonalityGroup, PERSONALITIES } from "@/lib/types";

export type QuizOptionKey = "A" | "B" | "C" | "D";

/**
 * Each question maps to one of the 4 slider axes. Picking an option adds
 * points to that axis (0-3 scale → 0-300 total, normalized to 0-100).
 *
 * Axis mapping (heuristic, community-estimate):
 *   - Movement:    how animated / expressive
 *   - Speech:      how talkative / words-per-minute
 *   - Energy:      how active / social
 *   - Thinking:    how reflective / introspective (inverted for outgoing)
 */
export interface QuizQuestion {
  /** i18n key for the question text (within TomodachiLifePersonalityQuizPage namespace). */
  qKey: string;
  /** i18n keys for the 4 options. */
  options: Record<QuizOptionKey, string>;
  /** Which axis this question influences. */
  axis: "movement" | "speech" | "energy" | "thinking";
  /** Points each option adds to the axis (0-100 scale directly). */
  scores: Record<QuizOptionKey, number>;
}

/**
 * 8 questions — 2 per axis. Option values are 0-100 contributions to the
 * axis total. Two questions per axis means each axis sums to 0-200,
 * divided by 2 → 0-100 per axis.
 */
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    qKey: "q1",
    options: {
      A: "optQ1A",
      B: "optQ1B",
      C: "optQ1C",
      D: "optQ1D",
    },
    axis: "movement",
    scores: { A: 95, B: 65, C: 30, D: 5 },
  },
  {
    qKey: "q2",
    options: {
      A: "optQ2A",
      B: "optQ2B",
      C: "optQ2C",
      D: "optQ2D",
    },
    axis: "speech",
    scores: { A: 90, B: 60, C: 25, D: 5 },
  },
  {
    qKey: "q3",
    options: {
      A: "optQ3A",
      B: "optQ3B",
      C: "optQ3C",
      D: "optQ3D",
    },
    axis: "energy",
    scores: { A: 95, B: 60, C: 30, D: 5 },
  },
  {
    qKey: "q4",
    options: {
      A: "optQ4A",
      B: "optQ4B",
      C: "optQ4C",
      D: "optQ4D",
    },
    axis: "thinking",
    scores: { A: 95, B: 60, C: 25, D: 5 },
  },
  {
    qKey: "q5",
    options: {
      A: "optQ5A",
      B: "optQ5B",
      C: "optQ5C",
      D: "optQ5D",
    },
    axis: "movement",
    scores: { A: 90, B: 55, C: 20, D: 0 },
  },
  {
    qKey: "q6",
    options: {
      A: "optQ6A",
      B: "optQ6B",
      C: "optQ6C",
      D: "optQ6D",
    },
    axis: "speech",
    scores: { A: 85, B: 55, C: 20, D: 0 },
  },
  {
    qKey: "q7",
    options: {
      A: "optQ7A",
      B: "optQ7B",
      C: "optQ7C",
      D: "optQ7D",
    },
    axis: "energy",
    scores: { A: 90, B: 55, C: 20, D: 0 },
  },
  {
    qKey: "q8",
    options: {
      A: "optQ8A",
      B: "optQ8B",
      C: "optQ8C",
      D: "optQ8D",
    },
    axis: "thinking",
    scores: { A: 90, B: 55, C: 20, D: 0 },
  },
];

/**
 * The 4 quiz axes correspond to the 4 sliders. Average of 2 questions
 * per axis → 0-100.
 */
export function computeSliders(
  answers: Record<number, QuizOptionKey>
): SliderValues {
  const sums: Record<string, number> = { movement: 0, speech: 0, energy: 0, thinking: 0 };
  const counts: Record<string, number> = { movement: 0, speech: 0, energy: 0, thinking: 0 };
  for (let i = 0; i < QUIZ_QUESTIONS.length; i++) {
    const q = QUIZ_QUESTIONS[i];
    const chosen = answers[i];
    if (chosen === undefined) continue;
    sums[q.axis] += q.scores[chosen];
    counts[q.axis] += 1;
  }
  return {
    movement: counts.movement ? Math.round(sums.movement / counts.movement) : 50,
    speech: counts.speech ? Math.round(sums.speech / counts.speech) : 50,
    energy: counts.energy ? Math.round(sums.energy / counts.energy) : 50,
    thinking: counts.thinking ? Math.round(sums.thinking / counts.thinking) : 50,
  };
}

export interface QuizResult {
  sliders: SliderValues;
  personality: string;
  mbti: string;
  group: ReturnType<typeof getPersonalityGroup>;
  personalityLabelKey: string;
}

export function computeQuizResult(
  answers: Record<number, QuizOptionKey>
): QuizResult {
  const sliders = computeSliders(answers);
  const { personality, mbti, group } = predictFull(sliders);
  // personality label key uses TomodachiLifeMbtiPage namespace
  const subType = personality.split("_")[1];
  const personalityLabelKey = `personality${subType.charAt(0).toUpperCase()}${subType.slice(1)}`;
  return { sliders, personality, mbti, group, personalityLabelKey };
}

/** All 16 personality keys re-exported for the result card cross-links. */
export { PERSONALITIES, getMbtiCode, getPersonalityGroup };
