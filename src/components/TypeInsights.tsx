"use client";

/**
 * LifeSimGrid — Personality Deep-Dive Insights renderer
 *
 * Renders the five-block deep-dive (behavior, apartment, food, voice,
 * pairings) on the [type] detail pages:
 *   - /tomodachi-life-mbti/[type]        (via primary personality)
 *   - /tomodachi-life-personality/[type]
 *
 * All strings come from the self-contained per-locale insight bundles
 * (src/lib/insights/*), NOT from the locale JSONs. Locales without a
 * bundle fall back to English and show a small note.
 *
 * UI titles carry a "{name}" placeholder replaced at render time with the
 * already-localized personality display name passed by the host page.
 */

import { useLocale } from "next-intl";
import {
  Zap, Home, UtensilsCrossed, Music, Heart, Users, Swords, Sparkles, Lightbulb,
} from "lucide-react";
import {
  getInsight,
  getInsightUi,
  hasInsightLocale,
} from "@/lib/personality-insights";

export default function TypeInsights({
  personalityKey,
  personalityName,
  accentColor = "#6366f1",
}: {
  personalityKey: string;
  personalityName: string;
  accentColor?: string;
}) {
  const locale = useLocale();
  const insight = getInsight(personalityKey, locale);
  const ui = getInsightUi(locale);

  if (!insight) return null;

  const title = (s: string) => s.replace("{name}", personalityName);
  const showFallbackNote = locale !== "en" && !hasInsightLocale(locale);
  const idBase = `insights-${personalityKey}`;

  return (
    <>
      {/* Eyebrow */}
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 flex-shrink-0" style={{ color: accentColor }} />
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: accentColor }}
          >
            {ui.sectionEyebrow}
          </span>
        </div>
        {showFallbackNote && (
          <p className="mt-2 text-xs text-gray-400">{ui.englishFallbackNote}</p>
        )}
      </div>

      {/* Block 1 — In-game behavior profile */}
      <section
        aria-labelledby={`${idBase}-behavior-title`}
        className="mx-auto max-w-6xl px-4 py-6"
      >
        <h2
          id={`${idBase}-behavior-title`}
          className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 sm:text-2xl"
        >
          <Zap className="h-5 w-5 flex-shrink-0" style={{ color: accentColor }} />
          {title(ui.behaviorTitle)}
        </h2>
        <div className="space-y-3 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm leading-relaxed text-gray-600">{insight.behavior[0]}</p>
          <p className="text-sm leading-relaxed text-gray-600">{insight.behavior[1]}</p>
        </div>
      </section>

      {/* Block 2 — Apartment setup */}
      <section
        aria-labelledby={`${idBase}-apartment-title`}
        className="mx-auto max-w-6xl px-4 py-6"
      >
        <h2
          id={`${idBase}-apartment-title`}
          className="mb-2 flex items-center gap-2 text-xl font-bold text-gray-900 sm:text-2xl"
        >
          <Home className="h-5 w-5 flex-shrink-0" style={{ color: accentColor }} />
          {title(ui.apartmentTitle)}
        </h2>
        <p className="mb-4 text-sm text-gray-600">{insight.apartmentIntro}</p>
        <ul className="grid gap-4 sm:grid-cols-3">
          {insight.apartmentItems.map((item) => (
            <li
              key={item.name}
              className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <h3 className="mb-1 text-sm font-semibold text-gray-900">{item.name}</h3>
              <p className="text-xs leading-relaxed text-gray-600">{item.why}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Block 3 — Feeding strategy */}
      <section
        aria-labelledby={`${idBase}-food-title`}
        className="mx-auto max-w-6xl px-4 py-6"
      >
        <h2
          id={`${idBase}-food-title`}
          className="mb-2 flex items-center gap-2 text-xl font-bold text-gray-900 sm:text-2xl"
        >
          <UtensilsCrossed className="h-5 w-5 flex-shrink-0" style={{ color: accentColor }} />
          {title(ui.foodTitle)}
        </h2>
        <p className="mb-4 text-sm text-gray-600">{insight.foodIntro}</p>
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-green-100 bg-green-50 p-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-green-900">
              {ui.foodTestFirstLabel}
            </h3>
            <div className="flex flex-wrap gap-2">
              {insight.foodTestFirst.map((food) => (
                <span
                  key={food}
                  className="rounded-lg border border-green-100 bg-white px-2.5 py-1 text-xs font-medium text-green-700"
                >
                  {food}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              {ui.foodDeprioritizeLabel}
            </h3>
            <div className="flex flex-wrap gap-2">
              {insight.foodDeprioritize.map((food) => (
                <span
                  key={food}
                  className="rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-500"
                >
                  {food}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-2 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
          <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
          <p className="text-xs leading-relaxed text-amber-900">{insight.foodTip}</p>
        </div>
        <p className="text-xs text-gray-400">{ui.foodDisclaimer}</p>
      </section>

      {/* Block 4 — Voice Lab recipe */}
      <section
        aria-labelledby={`${idBase}-voice-title`}
        className="mx-auto max-w-6xl px-4 py-6"
      >
        <h2
          id={`${idBase}-voice-title`}
          className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 sm:text-2xl"
        >
          <Music className="h-5 w-5 flex-shrink-0" style={{ color: accentColor }} />
          {title(ui.voiceTitle)}
        </h2>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 grid gap-4 sm:grid-cols-3">
            <div>
              <div className="mb-1 text-xs text-gray-500">{ui.voicePresetLabel}</div>
              <div className="font-mono text-sm font-bold text-gray-900">
                {insight.voicePreset}
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs text-gray-500">{ui.voicePitchLabel}</div>
              <div className="font-mono text-sm font-bold" style={{ color: accentColor }}>
                {insight.voicePitchHz} Hz
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs text-gray-500">{ui.voiceSpeedLabel}</div>
              <div className="font-mono text-sm font-bold text-gray-900">
                {insight.voiceSpeed}×
              </div>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-gray-600">{insight.voiceTip}</p>
        </div>
      </section>

      {/* Block 5 — Pairing spotlight */}
      <section
        aria-labelledby={`${idBase}-pairings-title`}
        className="mx-auto max-w-6xl px-4 py-6"
      >
        <h2
          id={`${idBase}-pairings-title`}
          className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 sm:text-2xl"
        >
          <Users className="h-5 w-5 flex-shrink-0" style={{ color: accentColor }} />
          {title(ui.pairingsTitle)}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-red-100 bg-red-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <h3 className="text-xs font-semibold uppercase tracking-wide text-red-900">
                {ui.romanceLabel}
              </h3>
            </div>
            <div className="mb-1 text-sm font-bold text-gray-900">
              {insight.romance.partner}
            </div>
            <p className="text-xs leading-relaxed text-gray-600">{insight.romance.why}</p>
          </div>
          <div className="rounded-xl border border-green-100 bg-green-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Users className="h-4 w-4 text-green-500" />
              <h3 className="text-xs font-semibold uppercase tracking-wide text-green-900">
                {ui.friendLabel}
              </h3>
            </div>
            <div className="mb-1 text-sm font-bold text-gray-900">
              {insight.friend.partner}
            </div>
            <p className="text-xs leading-relaxed text-gray-600">{insight.friend.why}</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Swords className="h-4 w-4 text-amber-600" />
              <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-900">
                {ui.frictionLabel}
              </h3>
            </div>
            <div className="mb-1 text-sm font-bold text-gray-900">
              {insight.friction.partner}
            </div>
            <p className="text-xs leading-relaxed text-gray-600">{insight.friction.why}</p>
          </div>
        </div>
      </section>
    </>
  );
}
