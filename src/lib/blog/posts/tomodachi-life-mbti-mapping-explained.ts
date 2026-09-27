/**
 * LifeSimGrid — Blog post: Tomodachi Life MBTI mapping, explained
 *
 * Grounded in the site's own model:
 *   - src/lib/types.ts               (PERSONALITIES, MBTI_MAP)
 *   - src/lib/mii-creator-data.ts    (predictPersonality band model)
 *   - src/lib/compatibility.ts       (romance/friendship formula)
 */

import type { BlogPost } from "../types";

export const postMbtiMapping: BlogPost = {
  slug: "tomodachi-life-mbti-mapping-explained",
  title: "How Tomodachi Life's 16 Personalities Map to MBTI",
  description:
    "The full methodology behind our Tomodachi Life MBTI mapping: slider bands, group logic, letter-by-letter derivation, and the INFP anomaly explained.",
  publishedAt: "2026-09-27",
  tags: ["Tomodachi Life", "MBTI", "Personality", "Guides"],
  blocks: [
    {
      type: "p",
      text: "Tomodachi Life gives every Mii one of 16 personalities, and it decides which one through four hidden sliders in the Mii editor. Our [MBTI mapping](/tomodachi-life-mbti) is a community-estimate model that converts those four sliders into a Myers-Briggs-style four-letter code. This guide explains the whole pipeline exactly as it runs on this site — the band thresholds, the group-selection logic, the letter derivation, and the one case where the mapping produces a surprising collision. Every number below comes from the same model that powers our [personality calculator](/tomodachi-life-personality-calculator) and the [16-type chart](/tomodachi-life-personality-chart), so you can reproduce any result by hand.",
    },
    { type: "h2", text: "The four sliders that decide everything" },
    {
      type: "p",
      text: "When you register a Mii, the game lets you fine-tune four personality axes. Different fan communities give them slightly different names; on this site we call them **Movement**, **Speech**, **Energy**, and **Thinking**, and each one is a continuous value from `0` to `100`. None of the 16 personalities is reachable through a single slider alone — the personality is a *pattern* across all four, which is why two Miis can feel completely different while sharing a single slider value.",
    },
    {
      type: "p",
      text: "**Movement** runs from slow to fast. A Mii with high Movement crosses the island in visibly fewer steps, initiates door-knocks, and tends to appear first in group scenes. **Speech** runs from gentle to direct. Direct Miis give blunt answers, confess feelings early, and land harder lines during quarrels. **Energy** runs from practical to imaginative — practical Miis deal in what is in front of them, imaginative Miis daydream, suggest new activities, and react strongly to novelty. **Thinking** runs from flexible to structured: structured Miis keep routines, keep opinions tidy, and keep score.",
    },
    {
      type: "p",
      text: "The four axes were not chosen at random. Each one corresponds to exactly one letter of the MBTI code, which is what makes a clean 16-way mapping possible at all. Before we get there, though, the model has to collapse four continuous values into one of 16 discrete personalities — and it does that in three passes: bands, group, then sub-type.",
    },
    { type: "h2", text: "Pass 1: every slider becomes one of three bands" },
    {
      type: "p",
      text: "The first pass quantizes each slider into a low, mid, or high band. The thresholds are fixed for all four sliders:",
    },
    {
      type: "table",
      headers: ["Band", "Slider value", "Meaning"],
      rows: [
        ["Low", "`0 – 33`", "The left end of the axis (slow, gentle, practical, flexible)"],
        ["Mid", "`34 – 66`", "No strong pull either way"],
        ["High", "`67 – 100`", "The right end of the axis (fast, direct, imaginative, structured)"],
      ],
    },
    {
      type: "p",
      text: "Three bands per slider across four sliders gives `3 × 3 × 3 × 3 = 81` possible slider cells. That is comfortably more than the 16 personalities the game actually offers, which is why a second pass is needed to merge similar cells — and why several different slider combinations can land on the same personality. If you have ever sworn that two of your Miis had different slider positions but the same personality, this is the reason: the game's 16 outcomes are coarser than its slider inputs.",
    },
    { type: "h2", text: "Pass 2: the bands pick one of four groups" },
    {
      type: "p",
      text: "The 16 personalities are organized into four groups of four: **Outgoing**, **Confident**, **Independent**, and **Easygoing**. The second pass decides the group by reading the bands as signals. Two derived values do the work:",
    },
    {
      type: "ul",
      items: [
        "**Active signal** — the sum of the Movement, Speech, and Energy bands (a number from `0` to `6`). High values mean the Mii leans social and energetic.",
        "**Intro signal** — the Thinking band alone, read with reversed polarity: a *high* Thinking band means the Mii leans reserved and inward.",
      ],
    },
    {
      type: "p",
      text: "The rules then cascade in order. If the intro signal is high while the active signal is low, the Mii lands in the **Independent** group — the home of the Artist, Free Spirit, Thinker, and Lone Wolf. If the active signal is very high (`4` or more), the Mii is social: it becomes **Outgoing** when Speech is also in the high band, and **Confident** otherwise. A middling active signal splits by Movement — high Movement keeps the Mii **Outgoing**, anything else slides to **Easygoing**. And when the active signal is low without a strong intro signal, the Mii settles into **Easygoing** by default. The cascade order matters: an introverted-but-energetic Mii resolves by the first matching rule, not by averaging.",
    },
    {
      type: "p",
      text: "The two social groups and the two reserved groups are not arbitrary buckets — they feed directly into the site's compatibility model, where Outgoing pairs naturally with Independent and Confident with Easygoing. More on that below.",
    },
    { type: "h2", text: "Pass 3: a second read picks the sub-type" },
    {
      type: "p",
      text: "Once the group is fixed, a second pass over the same bands selects one of its four members. Each group has its own tie-breakers. In the Outgoing group, for example, high Energy together with high Speech produces the **Entertainer**; high Movement with at least mid Speech gives the **Trendsetter**; a mid-or-higher Thinking band steers toward the **Leader**; and everything else becomes the **Optimist**. The other three groups follow the same pattern with different priority axes, which is what gives each sub-type its recognizable silhouette.",
    },
    {
      type: "p",
      text: "The full table below lists all 16 personalities with their group, their MBTI code, and their slider signature — the four-axis reading implied by the code:",
    },
    {
      type: "table",
      headers: ["Personality", "Group", "MBTI", "Slider signature"],
      rows: [
        ["Leader", "Outgoing", "ESTJ", "Fast · Direct · Practical · Structured"],
        ["Entertainer", "Outgoing", "ESFP", "Fast · Gentle · Practical · Flexible"],
        ["Trendsetter", "Outgoing", "ENFP", "Fast · Gentle · Imaginative · Flexible"],
        ["Optimist", "Outgoing", "ESFJ", "Fast · Gentle · Practical · Structured"],
        ["Designer", "Confident", "INTJ", "Slow · Direct · Imaginative · Structured"],
        ["Adventurer", "Confident", "ESTP", "Fast · Direct · Practical · Flexible"],
        ["Go-Getter", "Confident", "ENTJ", "Fast · Direct · Imaginative · Structured"],
        ["Charmer", "Confident", "ENTP", "Fast · Direct · Imaginative · Flexible"],
        ["Artist", "Independent", "INFP", "Slow · Gentle · Imaginative · Flexible"],
        ["Free Spirit", "Independent", "INTP", "Slow · Direct · Imaginative · Flexible"],
        ["Thinker", "Independent", "ISTP", "Slow · Direct · Practical · Flexible"],
        ["Lone Wolf", "Independent", "ISTJ", "Slow · Direct · Practical · Structured"],
        ["Dreamer", "Easygoing", "INFJ", "Slow · Gentle · Imaginative · Structured"],
        ["Sweetheart", "Easygoing", "ISFJ", "Slow · Gentle · Practical · Structured"],
        ["Softie", "Easygoing", "INFP", "Slow · Gentle · Imaginative · Flexible"],
        ["Buddy", "Easygoing", "ISFP", "Slow · Gentle · Practical · Flexible"],
      ],
    },
    { type: "h2", text: "How each MBTI letter is derived" },
    {
      type: "p",
      text: "Because each slider axis was assigned to one MBTI dimension, deriving the four-letter code is a direct read of the slider signature. Letter by letter:",
    },
    {
      type: "ol",
      items: [
        "**E or I ← Movement.** A fast Mii is extraverted (E); a slow Mii is introverted (I). Movement is the only axis that decides the first letter, which matches what players observe: walk speed is the most visible personality tell in the game.",
        "**S or N ← Energy.** A practical Mii is sensing (S); an imaginative Mii is intuitive (N). This axis governs how the Mii reacts to new items, events, and residents.",
        "**T or F ← Speech.** A direct Mii is thinking (T); a gentle Mii is feeling (F). The same slider that makes quarrels sharp or soft is the one that decides the third letter.",
        "**J or P ← Thinking.** A structured Mii is judging (J); a flexible Mii is perceiving (P). Routine-loving Miis carry the J, improvisers carry the P.",
      ],
    },
    {
      type: "p",
      text: "Notice that the code is fully determined by the four-axis signature — Movement speed, Energy style, Speech style, and Thinking structure — and *not* by the group. The group is a fifth piece of information, and the mapping needs it, as the next section shows.",
    },
    { type: "h2", text: "The INFP anomaly: 16 personalities, 15 codes" },
    {
      type: "p",
      text: "Count the MBTI column in the table above and you will find only 15 unique codes. Two personalities — the **Artist** and the **Softie** — both map to [INFP](/tomodachi-life-mbti/infp). This is not a typo; it is a structural property of any 16-to-16 mapping that routes through four axes.",
    },
    {
      type: "p",
      text: "The Artist and the Softie share the exact same slider signature: slow, gentle, imaginative, and flexible. What separates them is their group. The Artist lives in the Independent group, where the model reads that signature as a private, inner-world dreamer. The Softie lives in the Easygoing group, where the identical signature becomes a mellow, openly affectionate resident. In game terms you can think of them as the same four axis readings wearing two different social costumes — one keeps its distance, the other leans in.",
    },
    {
      type: "p",
      text: "The practical consequence: MBTI alone cannot distinguish an [Artist](/tomodachi-life-personality/artist) from a [Softie](/tomodachi-life-personality/softie). If you are planning an island roster by MBTI codes, remember that INFP is ambiguous, and check the group (or the personality page) to see which of the two a given Mii actually is. Every other code in the table maps to exactly one personality.",
    },
    { type: "h2", text: "How the compatibility model uses the same groups" },
    {
      type: "p",
      text: "The mapping does not stop at labeling — the same group structure drives our [compatibility calculator](/tomodachi-life-compatibility). The model scores a pair on two scales, romance and friendship, and both scales are built from the same ingredients so the arithmetic stays inspectable:",
    },
    {
      type: "ul",
      items: [
        "**Zodiac term (50%).** A symmetric 12 × 12 zodiac matrix supplies a base chemistry score between `40` and `90` for any pair of signs. Same-sign and classic element pairs sit at the top of that range.",
        "**Base term (50%).** A flat `50` representing the model's neutral starting point before personality is considered.",
        "**Personality modifiers.** Complementary groups (Outgoing with Independent, or Confident with Easygoing) add `+20` to romance. Two Miis from the same group lose `10` romance but gain `+20` friendship. Two Miis of the *exact same* personality lose a further `5` romance and gain a further `+10` friendship.",
      ],
    },
    {
      type: "p",
      text: "The final score is the sum of the two terms plus the modifier, rounded and clamped to `0 – 100`. The formula is deliberately simple, and it is the same one our [romance matcher](/tomodachi-life-romance-matcher) uses: `romance = zodiacScore × 0.5 + 50 × 0.5 + romanceModifier`. The transparency is the point — a number you cannot decompose is a number you cannot trust, and every score the site shows comes with its breakdown.",
    },
    {
      type: "callout",
      text: "The group-complementarity bonus encodes the community's most consistent observation about Tomodachi Life relationships: opposite-temperament pairs (fast with slow, direct with gentle) generate the most romance events, while same-group pairs generate the most stable friendships. It is a modeling choice, not an in-game constant.",
    },
    { type: "h2", text: "Try the model yourself" },
    {
      type: "p",
      text: "The fastest way to internalize the pipeline is to push sliders around and watch the outputs change:",
    },
    {
      type: "ul",
      items: [
        "[Personality Calculator](/tomodachi-life-personality-calculator) — set the four sliders directly and see the predicted personality, group, and MBTI code.",
        "[Personality Chart](/tomodachi-life-personality-chart) — the full 16-type reference with color-coded groups.",
        "[MBTI Mapping](/tomodachi-life-mbti) — browse from the MBTI side, one page per type with slider tendencies and compatibility chips.",
        "[Compatibility Calculator](/tomodachi-life-compatibility) — pair two Miis and decompose the romance and friendship scores.",
      ],
    },
    { type: "h2", text: "Limits of the model (read this part)" },
    {
      type: "p",
      text: "Nintendo has never published the game's actual personality algorithm, so every claim in this guide — the band thresholds, the group cascade, the letter assignments — is a community estimate reverse-engineered from player observation, not extracted from the game's code. The model approximates the in-game outcomes closely enough to be useful for roster planning, but it is a model, and like all models it is wrong about something.",
    },
    {
      type: "p",
      text: "Three caveats worth keeping in mind. First, mid-band sliders (`34 – 66`) are the model's soft spot: small changes near the thresholds can flip a band and change the predicted personality, so treat borderline results as tentative. Second, the INFP collision described above means MBTI-based planning loses information that personality-based planning keeps. Third, in-game outcomes also depend on factors this model does not touch — island events, gift history, and the random seed behind each Mii's reactions — so compatibility scores are starting points for stories, not guarantees of them.",
    },
    {
      type: "callout",
      text: "MBTI and Nintendo are registered trademarks of their respective owners. This mapping is a fan-made interpretation for entertainment and planning purposes and is not affiliated with or endorsed by Nintendo or the Myers-Briggs Company.",
    },
  ],
};
