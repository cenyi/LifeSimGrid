/**
 * LifeSimGrid — Blog post: Tomodachi Life food favorites, a testing method
 *
 * Grounded in the site's own model:
 *   - src/lib/food-data.ts                       (FOODS, AFFINITY_PRESETS, reaction bands)
 *   - src/components/TomodachiLifeFoodChartPage.tsx  (tracker, recommendation panel)
 */

import type { BlogPost } from "../types";

export const postFoodFavorites: BlogPost = {
  slug: "tomodachi-life-food-favorites-guide",
  title: "Finding Every Mii's Favorite Food: A Testing Method",
  description:
    "A repeatable 7-step protocol for finding each Mii's favorite food in Tomodachi Life: 48 foods, 8 categories, and per-group affinity starting points.",
  publishedAt: "2026-09-27",
  tags: ["Tomodachi Life", "Food", "Personality", "Guides"],
  blocks: [
    {
      type: "p",
      text: "Every Mii in Tomodachi Life carries two hidden food assignments: a randomly generated favorite food and a randomly generated disliked food. Because the game never shows you either value, the only reliable way to know what a specific Mii loves is to feed it and watch the reaction — and the cheapest way to do that is to start with the foods its personality group favors. This guide turns that idea into a repeatable protocol: how the 48-food database behind our [food chart](/tomodachi-life-food-chart) is organized, how the five reaction levels work, what the community-estimate affinity model predicts for each of the four personality groups, and how a seven-step testing loop converts guesswork into a logged, reproducible search. Every number below comes from the site's own data files, so you can reproduce the whole method by hand.",
    },
    { type: "h2", text: "Why favorite foods matter on your island" },
    {
      type: "p",
      text: "Feeding a Mii its favorite food produces the strongest positive reaction in the game's food system, and that reaction is worth planning around. Community wikis and long-running player reports describe the favorite-food reaction as one of the most dramatic happy animations on the island: the Mii celebrates, its mood visibly jumps, and a satisfied resident tends to show up smiling in the social events that drive friendships, romance, and proposals. Feeding the disliked food does the opposite — a clearly negative reaction. Knowing both hidden assignments therefore does two jobs at once: it gives you a reliable daily happiness lever, and it keeps you from accidentally serving the one item that ruins the mood.",
    },
    {
      type: "p",
      text: "There is a second, less obvious reason to hunt favorites: food testing is one of the few island activities that produces clean, per-Mii information. Each feeding is a controlled experiment — one resident, one food, one observable reaction — and the reaction vocabulary is small enough to log in a single tap. Once a favorite is confirmed and written down, later decisions about that resident get easier: who gets the good stuff on your daily rounds, which reactions to expect when checking [compatibility](/tomodachi-life-compatibility), and which foods to keep away from the dinner table. The rest of this guide is about making that experiment cheap — fewer feedings per confirmed favorite, and zero lost notes.",
    },
    { type: "h2", text: "The search space: 8 categories, 48 foods, 16 common favorites" },
    {
      type: "p",
      text: "Your search space is exactly 48 foods organized into 8 categories — drink, dessert, candy, snack, main, fruit, vegetable, and other — and knowing its shape is what makes efficient testing possible. The database is the one behind the [food chart](/tomodachi-life-food-chart). Each entry carries three properties that matter for the protocol: a stable `id` that the tracker keys on, a category, and a `commonFavorite` flag marking the 16 items that most often land as favorites. The full breakdown:",
    },
    {
      type: "table",
      headers: ["Category", "Foods", "Common favorites", "Example items"],
      rows: [
        ["Drink", "9", "3", "Cola, Juice, Coffee, Sake"],
        ["Dessert", "8", "4", "Cake, Ice Cream, Donut, Pie"],
        ["Candy", "5", "2", "Chocolate, Candy, Licorice"],
        ["Snack", "5", "2", "Chips, Popcorn, Pretzel"],
        ["Main", "10", "4", "Pizza, Sushi, Curry, Steak"],
        ["Fruit", "5", "1", "Apple, Banana, Melon"],
        ["Vegetable", "4", "0", "Carrot, Broccoli, Salad"],
        ["Other", "2", "0", "Boba Tea, Sundae"],
        ["Total", "48", "16", "—"],
      ],
    },
    {
      type: "p",
      text: "Two structural details jump out of that table. First, the heavy categories are `main` (10 items) and `drink` (9 items), so a blind brute-force pass burns most of its feedings there — a protocol that can defer a heavy category saves real in-game days. Second, the 16 `commonFavorite` items cluster in the crowd-pleaser slots: Cola, Juice, and Soda among drinks; Cake, Ice Cream, Donut, and Cookie among desserts; Pizza, Hamburger, Sushi, and Curry among mains. Those flags make good early probes even before personality enters the picture. The two `other` items — Boba Tea and Sundae — are the niche tail of the list, and exactly where one personality group likes to look first.",
    },
    { type: "h2", text: "How reactions work: five levels and one hidden pair" },
    {
      type: "p",
      text: "Every feeding resolves to one of five reaction levels — `love`, `like`, `neutral`, `dislike`, or `hate` — and each level is a distinct, observable animation in the game. The five-level scale is also the vocabulary our tracker uses: every food row carries five compact logging buttons, one per level (♥ for love, ▲ for like, – for neutral, ▼ for dislike, ✕ for hate), so recording a result takes a single tap. The scale is deliberately coarse — fine enough to rank two positive foods against each other, coarse enough that you are never unsure which level you just watched.",
    },
    {
      type: "p",
      text: "Under the hood, the site's model attaches a `0–100` affinity score to every food for every personality group, and a fixed banding rule converts a score into a predicted level: `90` and above maps to `love`, `75–89` to `like`, `40–74` to `neutral`, `25–39` to `dislike`, and anything below `25` to `hate`. Those bands only power prediction. Once a Mii's actual favorite is confirmed, the model short-circuits: the favorite food is forced to `love` and the disliked food to `hate`, no matter what the heuristic says. That override mirrors the game's real behavior — the hidden assignment always beats personality, which is precisely why testing exists.",
    },
    { type: "h2", text: "What the model predicts for each personality group" },
    {
      type: "p",
      text: "The four personality groups — **Outgoing**, **Confident**, **Independent**, and **Easygoing** — each get a distinct ranking over the eight categories, and that ranking is your testing order. The matrix below is the complete community-estimate baseline from the site's data file; read a column top to bottom and you are reading that group's suggested menu:",
    },
    {
      type: "table",
      headers: ["Category", "Outgoing", "Confident", "Independent", "Easygoing"],
      rows: [
        ["Drink", "90", "70", "60", "75"],
        ["Dessert", "85", "65", "70", "80"],
        ["Candy", "95", "55", "60", "75"],
        ["Snack", "80", "75", "70", "85"],
        ["Main", "65", "90", "60", "90"],
        ["Fruit", "75", "70", "75", "80"],
        ["Vegetable", "60", "65", "80", "85"],
        ["Other", "70", "60", "85", "70"],
      ],
    },
    {
      type: "p",
      text: "Four clear menus emerge. **Outgoing** Miis — the Leader, Entertainer, Trendsetter, and Optimist — peak on candy (`95`), drinks (`90`), and desserts (`85`): an energetic, party-oriented sweet tooth. **Confident** Miis — Designer, Adventurer, Go-Getter, Charmer — peak on mains (`90`), the status-oriented restaurant end of the list. **Independent** Miis — Artist, Free Spirit, Thinker, Lone Wolf — are the interesting case: their top scores belong to the niche `other` items (`85`) and vegetables (`80`), which is why Boba Tea and Sundae earn a place in the database at all. **Easygoing** Miis — Dreamer, Sweetheart, Softie, Buddy — favor the home-style end: mains (`90`), snacks (`85`), and vegetables (`85`). The chart's reaction preview samples one resident per group — a Leader, a Go-Getter, a Thinker, and a Buddy — so you can compare all four menus side by side. For how a Mii lands in one of these groups in the first place, see our [MBTI mapping guide](/blog/tomodachi-life-mbti-mapping-explained).",
    },
    {
      type: "p",
      text: "One honest property of the matrix: every cell sits between `55` and `95`, which means the heuristic alone can only ever predict `love`, `like`, or `neutral`. The two negative levels are never produced by personality affinity. In practice, negatives come from the second hidden assignment — the disliked food, which is exactly as random as the favorite. Personality tells you where to start looking for the upside; nothing tells you where the downside hides except testing.",
    },
    { type: "h2", text: "The testing protocol: seven steps to a confirmed favorite" },
    {
      type: "p",
      text: "The protocol finds a favorite in as few feedings as possible by testing the group's strongest categories first, logging every result, and pruning categories as evidence arrives. You can run it entirely inside the [food chart's tracker](/tomodachi-life-food-chart), which remembers your checklist between sessions.",
    },
    {
      type: "ol",
      items: [
        "**Identify the Mii's personality group.** Look the resident up on the [personality chart](/tomodachi-life-personality-chart) or the [MBTI mapping](/tomodachi-life-mbti) and note the group: Outgoing, Confident, Independent, or Easygoing. Only the group matters for food — the sub-type (Optimist versus Trendsetter, for example) does not change the affinity matrix.",
        "**Pull the group's top-5 starting candidates.** The chart's recommendation panel sorts all 48 foods by the selected group's affinity and displays the five highest. For an Outgoing Mii that is all five candy items at `95`; for an Easygoing Mii the panel starts with mains at `90`. Those five foods are your first session.",
        "**Feed one candidate at a time, highest affinity first.** One food per feeding keeps the evidence clean — rapid-fire gifts blur which item caused which reaction. Watch the animation, grade it on the five-level scale, and only then move to the next candidate.",
        "**Log every result immediately.** Tap the matching reaction button on the food's row. The tracker persists the checklist in `localStorage` under the key `lifesimgrid-food-tracker`, so tested foods, their logged reactions, and the progress counter survive page reloads and browser restarts — no account, no sync, no lost notes.",
        "**Confirm the winner the moment you see the strongest reaction.** Mark that food `love` in the tracker and set it as the Mii's favorite in the picker at the top of the chart. From then on the chart forces `love` for that food regardless of what the heuristic would predict, and the favorite is settled.",
        "**If a category comes back flat, eliminate it and move to the group's next-strongest.** A run of `neutral` reactions across a category's items is evidence the favorite lives elsewhere. Keep any `like` results as fallbacks — a liked food is not the favorite, but it is still a dependable daily choice. Work down the affinity matrix category by category until the winner appears.",
        "**Log the disliked food opportunistically, and reset between Miis.** The disliked food surfaces as the strongest negative reaction during ordinary testing — record it the same way and pin it in the picker so the chart forces `hate` for it. When you switch residents, clear the tracker with one button (or use a separate browser profile), because the checklist is stored per browser, not per Mii.",
      ],
    },
    {
      type: "p",
      text: "The absolute bound on the protocol is 48 feedings — the entire database. The group-first ordering exists so you almost never approach it. Complete coverage of a group's two leading categories costs at most 15 feedings (mains and snacks hold 15 items combined for Easygoing and Confident Miis) and as few as 6 for an Independent Mii, whose preferred `other` and vegetable categories hold only 6 items between them. Those are starting-point expectations, not guarantees — the hidden assignment is random, and an unlucky resident can push you deeper into the matrix.",
    },
    { type: "h2", text: "Worked example: walking an Outgoing Mii through the loop" },
    {
      type: "p",
      text: "An Outgoing Mii — say a Trendsetter — should be probed with candy first, and the recommendation panel agrees: all five candy items at affinity `95`, with the nine drinks waiting at `90`. Here is a realistic session:",
    },
    {
      type: "ul",
      items: [
        "Feedings 1–5 — Chocolate, Gum, Caramel, Licorice, Candy: Chocolate lands a clear `like`, Candy another `like`, the rest `neutral`. No top-level reaction, so candy is out — and because the first session happens to cover the entire candy category, those five feedings eliminate it completely.",
        "Feedings 6–8 — Cola, Juice, Soda: all `neutral`. Three flat common-favorite drinks in a row is weak evidence against the whole 9-item drink category, so the player parks the six untested drinks (Coffee, Tea, Milk, Water, Beer, Sake) and jumps tiers rather than grinding them out.",
        "Feedings 9–10 — Cake, Ice Cream: Cake is `neutral`, and Ice Cream produces unmistakably the strongest positive reaction. That is the favorite.",
        "Confirmation — Ice Cream goes into the favorite picker, the chart now forces `love` for it, and the progress counter reads 10 of 48 foods tested — about 21% of the database for a confirmed winner.",
      ],
    },
    {
      type: "p",
      text: "Ten feedings produced a confirmed favorite, one fully eliminated category, one parked category, and two logged fallback foods the player can still serve on ordinary days. Notice what the protocol never touched: the 10-item `main` category and the 4-item `vegetable` category, an Outgoing Mii's two weakest affinities (`65` and `60`). The disliked food is still unknown — it is as random as the favorite — so during normal island days the player keeps an eye out for a strong negative reaction, and pins it as `hate` in the picker whenever it appears. Run the same loop on an Easygoing Mii and only the entry point moves: the panel would lead with mains and snacks instead of candy.",
    },
    { type: "h2", text: "Why favorites are random — and why fixed-answer guides fail" },
    {
      type: "p",
      text: "Any guide that prints a fixed favorite food for a given personality is describing one save file, not the game. The data file behind our chart states the situation plainly: Nintendo publishes no official food-reaction matrix for Tomodachi Life, and each Mii receives a randomly generated favorite food and a randomly generated disliked food. The randomization is per resident, not per personality — two Miis with an identical personality, name, and even editor sliders can carry different hidden favorites.",
    },
    {
      type: "p",
      text: "That single fact reshapes what a useful guide can be. A lookup table cannot work, because the answer is not a function of anything you can read off the Mii. What can work is a search strategy: an ordering that puts statistically likelier candidates first, a logging system that never loses a result, and an elimination rule that prunes categories as evidence arrives. That is exactly what the four-group affinity matrix provides — starting points, not answers — and it is why our [food chart](/tomodachi-life-food-chart) ships a persistent tracker instead of a table of claimed favorites. Treat any site promising fixed per-personality favorites the way you would treat a horoscope: entertaining, unfalsifiable, and no help with your actual island.",
    },
    { type: "h2", text: "Limits of the model (read this part)" },
    {
      type: "p",
      text: "The affinity numbers in this guide are a community estimate, not extracted game data — Nintendo has never published the food system's internals. The presets are explicitly tuned so each group shows a distinct ranking across the categories, because that distinctness is what makes a 'which food to try first' recommendation possible at all. That tuning is a modeling choice. It approximates community observation closely enough to be useful for ordering your tests, and like all models it is wrong about something.",
    },
    {
      type: "p",
      text: "Three caveats worth keeping in mind. First, the banding rule means the model can only predict down to `neutral` — every preset value sits at `55` or higher — so negative reactions are always surprises from the hidden disliked assignment, never forecasts. Second, the 48-item database is a curated subset of foods observed across the Tomodachi Life titles, not a complete in-game food list; if a feeding produces a reaction you cannot find in the chart, log the nearest equivalent and keep going. Third, the tracker stores a single checklist per browser under one `localStorage` key, so it holds one active Mii at a time — clear it between residents, or keep one browser profile per islander if you are hunting several in parallel. None of this changes the core deliverable: a per-Mii, evidence-based log of what each resident actually loves. The model decides where you start; your feedings decide what you believe.",
    },
    { type: "h2", text: "Try the protocol yourself" },
    {
      type: "ul",
      items: [
        "[Food Chart & Tracker](/tomodachi-life-food-chart) — the full 48-food database, the per-group recommendation panel, and the persistent tested-food checklist.",
        "[Personality Chart](/tomodachi-life-personality-chart) — the 16-type reference with color-coded groups, for step 1 of the protocol.",
        "[MBTI Mapping](/tomodachi-life-mbti) — browse residents by four-letter code if that is how you keep your roster.",
        "[Compatibility Calculator](/tomodachi-life-compatibility) — pair two residents and decompose the romance and friendship scores once their favorites are logged.",
      ],
    },
    {
      type: "callout",
      text: "MBTI and Nintendo are registered trademarks of their respective owners. This food guide is a fan-made interpretation for entertainment and planning purposes and is not affiliated with or endorsed by Nintendo or the Myers-Briggs Company.",
    },
  ],
};
