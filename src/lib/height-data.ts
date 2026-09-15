/**
 * LifeSimGrid — Mii Height Chart Data (community-estimate model)
 *
 * IMPORTANT: Tomodachi Life / Mii Maker does not expose a real
 * centimetre height value in the game. The numbers below are
 * community-consensus estimates based on Mii-chart sites and player
 * observation, used for comparison and planning only. They are NOT
 * official Nintendo data. UI must carry a clear disclaimer.
 */

/** Height step ids as shown in the Mii Maker / Tomodachi Life height slider. */
export type MiiHeightStep = "short" | "medium" | "tall";

export const MII_HEIGHT_STEPS: MiiHeightStep[] = ["short", "medium", "tall"];

/**
 * Community-estimate cm values per height step (adult Mii).
 * The Mii Maker height slider in Tomodachi Life (DS/Wii) has 3 positions.
 * These values approximate how players perceive each step in centimetres.
 */
export const MII_HEIGHT_CM: Record<MiiHeightStep, number> = {
  short: 148,
  medium: 165,
  tall: 182,
};

/**
 * Age modifier (cm) applied to the base height step. Younger Mii read
 * slightly shorter, elderly slightly shorter than the adult baseline.
 * Community observation: −6 cm for child, −3 cm for senior.
 */
export const MII_AGE_MODIFIER: Record<"child" | "adult" | "senior", number> = {
  child: -6,
  adult: 0,
  senior: -3,
};

export type MiiAge = "child" | "adult" | "senior";
export const MII_AGES: MiiAge[] = ["child", "adult", "senior"];

/** Real-world average human heights for comparison context (cm). */
export const REAL_WORLD_AVERAGES = {
  male: 171,
  female: 162,
} as const;

/**
 * Estimates the centimetre height of a Mii given its height step + age.
 * ft-in is derived from the *step baseline* (age-modified cm stays the
 * primary value; a Mii's body frame doesn't literally change between
 * life stages in the game, so the ft-in column shows the adult frame).
 * Returns { cm (age-adjusted), ft, inch (adult-step baseline) }.
 */
export function estimateMiiHeight(
  step: MiiHeightStep,
  age: MiiAge
): { cm: number; ft: number; inch: number } {
  const cm = Math.round(MII_HEIGHT_CM[step] + MII_AGE_MODIFIER[age]);
  const baseInches = Math.round(MII_HEIGHT_CM[step] / 2.54);
  const ft = Math.floor(baseInches / 12);
  const inch = baseInches % 12;
  return { cm, ft, inch };
}

/**
 * Builds a comparison row for each height step against the real-world
 * averages. Positive delta = Mii taller than the reference average.
 */
export function heightComparisonStep(
  step: MiiHeightStep,
  gender: keyof typeof REAL_WORLD_AVERAGES
) {
  const { cm } = estimateMiiHeight(step, "adult");
  const ref = REAL_WORLD_AVERAGES[gender];
  return { step, cm, reference: ref, delta: cm - ref };
}
