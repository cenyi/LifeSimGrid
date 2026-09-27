/**
 * LifeSimGrid — Personality Deep-Dive Insights (type definitions)
 *
 * Per-personality deep-dive content rendered on the [type] detail pages
 * (both /tomodachi-life-personality/[type] and /tomodachi-life-mbti/[type]).
 *
 * Content is fully self-contained per locale: each content-<locale>.ts file
 * carries BOTH the UI strings and the personality content, so no i18n JSON
 * key-parity burden is introduced. Locales without a content file fall back
 * to English wholesale (see personality-insights.ts).
 *
 * All content is community-estimate / fan-interpretation material consistent
 * with the site's data models (food affinity presets, voice presets,
 * compatibility matrix). Never present it as official Nintendo data.
 */

export interface InsightItem {
  /** Item or interior concept name. */
  name: string;
  /** One-line rationale: why this fits the personality. */
  why: string;
}

export interface InsightPairing {
  /** Partner personality display name (must match the localized personality label). */
  partner: string;
  /** 1–2 sentence explanation of the dynamic. */
  why: string;
}

export interface PersonalityInsight {
  /**
   * Block 1 — In-game behavior profile.
   * Two paragraphs: how this personality acts, speaks, moves, and what
   * events/interactions players typically observe.
   */
  behavior: [string, string];

  /** Block 2 — Apartment setup guide. */
  apartmentIntro: string;
  apartmentItems: [InsightItem, InsightItem, InsightItem];

  /** Block 3 — Feeding strategy (grounded in the community food-affinity model). */
  foodIntro: string;
  foodTestFirst: string[];
  foodDeprioritize: string[];
  foodTip: string;

  /** Block 4 — Voice Lab recipe (concrete Web Audio parameters). */
  voicePreset: string;
  voicePitchHz: number;
  voiceSpeed: number;
  voiceTip: string;

  /** Block 5 — Social pairing spotlight. */
  romance: InsightPairing;
  friend: InsightPairing;
  friction: InsightPairing;
}

/** UI chrome strings for the insights section (localized per content file). */
export interface InsightUiStrings {
  sectionEyebrow: string;
  behaviorTitle: string;
  apartmentTitle: string;
  foodTitle: string;
  foodTestFirstLabel: string;
  foodDeprioritizeLabel: string;
  voiceTitle: string;
  voicePresetLabel: string;
  voicePitchLabel: string;
  voiceSpeedLabel: string;
  pairingsTitle: string;
  romanceLabel: string;
  friendLabel: string;
  frictionLabel: string;
  /** Shown when the content falls back to English on a non-EN page. */
  englishFallbackNote: string;
  /** Small disclaimer under the food block. */
  foodDisclaimer: string;
}

export interface InsightLocaleContent {
  ui: InsightUiStrings;
  personalities: Record<string, PersonalityInsight>;
}
