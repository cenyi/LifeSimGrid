/**
 * LifeSimGrid — Deep-Dive Insights: English (source of truth)
 *
 * Written from first-hand player observation of the Tomodachi Life
 * personality system (walk speed, speech style, mood, group dynamics)
 * and kept consistent with this site's community data models:
 *   - food affinity presets  → src/lib/food-data.ts
 *   - voice presets          → TomodachiVoiceLabPage (Web Audio parameters)
 *   - compatibility matrix   → personality group complement model
 *
 * Translators: create content-<locale>.ts mirroring this structure exactly.
 */

import type { InsightLocaleContent } from "./types";

export const en: InsightLocaleContent = {
  ui: {
    sectionEyebrow: "Deep Dive",
    behaviorTitle: "How the {name} Acts on Your Island",
    apartmentTitle: "Apartment Setup for the {name}",
    foodTitle: "Feeding Strategy for the {name}",
    foodTestFirstLabel: "Test these first",
    foodDeprioritizeLabel: "Lower priority",
    voiceTitle: "Voice Lab Recipe for the {name}",
    voicePresetLabel: "Waveform preset",
    voicePitchLabel: "Pitch",
    voiceSpeedLabel: "Speech speed",
    pairingsTitle: "Pairing Spotlight for the {name}",
    romanceLabel: "Best romance match",
    friendLabel: "Best friend match",
    frictionLabel: "Expect friction with",
    englishFallbackNote:
      "This in-depth section is currently available in English.",
    foodDisclaimer:
      "Favorite foods are randomized per Mii in-game. These picks are community-estimate starting points — confirm by testing.",
  },
  personalities: {
    outgoing_leader: {
      behavior: [
        "The Leader is the personality you will see moving before anyone else. Fast walk speed means this Mii crosses the apartment block in noticeably fewer steps than Easygoing residents, and the game's event scripts lean into it: Leaders frequently initiate group activities, volunteer to MC island events, and are among the first to knock on another resident's door. When a quarrel breaks out on the island, check who stepped in — it is usually a Leader either mediating or escalating.",
        "The direct speech style is the other tell. Leaders rarely hedge: greetings are short, requests are blunt, and during arguments their lines land harder than a Softie's would. That bluntness is also why Leaders are productive island citizens — they confess feelings early, propose marriage without endless hesitation, and give unusually clear answers in the questioning mini-events. If you want a Mii that drives stories forward instead of waiting for them, this is the one.",
      ],
      apartmentIntro:
        "A Leader's room should look like the island's de-facto headquarters. Three concepts that fit the archetype:",
      apartmentItems: [
        { name: "The command desk", why: "A tidy workspace with a lamp reads as 'mayor's office' — the visual anchor this personality deserves." },
        { name: "Award shelf", why: "Trophies and framed certificates reinforce the natural-authority vibe and give visitors something to admire." },
        { name: "World-map rug", why: "Bold, geometric floor patterns mirror the fast decisive energy of a Mii that never stands still." },
      ],
      foodIntro:
        "Outgoing personalities skew hard toward candy, drinks, and desserts in our community model, so start your favorite-food hunt in the sweet aisles before touching main dishes.",
      foodTestFirst: ["Chocolate", "Gum", "Cola", "Cake"],
      foodDeprioritize: ["Broccoli", "Salad", "Rice"],
      foodTip:
        "Feed one candy-category item per in-game day and record the reaction. Leaders have direct reactions, so a 'love' response is unmistakable — big jump, arms up, no ambiguity.",
      voicePreset: "Sawtooth — Adult Male",
      voicePitchHz: 200,
      voiceSpeed: 1.1,
      voiceTip:
        "Keep the pitch low-mid and push speed slightly above 1.0x. The slightly rushed delivery is what sells the 'busy boss' energy; a slow Leader voice reads as A Go-Getter instead.",
      romance: { partner: "Artist", why: "The classic Outgoing × Independent spark: the Artist's dreamy independence plays perfectly against the Leader's take-charge certainty, and their opposite walk speeds create constant 'crossing paths' moments." },
      friend: { partner: "Go-Getter", why: "Two doers with the same fast pace. They clash on who's in charge occasionally, but the shared 'get things done' attitude makes them the island's power duo." },
      friction: { partner: "Buddy", why: "The Buddy's drifting, no-plans lifestyle frustrates a Mii that schedules everything. Expect frequent one-sided lectures that the Buddy cheerfully ignores." },
    },

    outgoing_entertainer: {
      behavior: [
        "The Entertainer is the island's mood engine. Fast walk speed plus a relaxed expression means this Mii bounces between locations like a tour guide who loves their job — and the game rewards it, casting Entertainers in musicals, street performances, and comedy skits disproportionately often. When an idle afternoon needs an event, drag an Entertainer into it; the outcome is almost always the funny one.",
        "Their gentle speech style keeps them likable even at maximum volume. Entertainers are the personality most likely to defuse a fight with a joke rather than pick a side, and they adapt their tone to whoever they're with — bubbly with other Outgoing types, softer around Independent residents. Romantically they move fast but stay drama-light: confessions happen early, and rejections are shrugged off within a scene.",
      ],
      apartmentIntro:
        "Think green-room, not bedroom. The best Entertainer rooms feel like a backstage area five minutes before showtime:",
      apartmentItems: [
        { name: "Stage-lamp corner", why: "A bright spotlight-style floor lamp turns one corner into an instant 'stage' — perfect for a Mii that treats every room as a venue." },
        { name: "Vinyl and posters wall", why: "Music memorabilia communicates 'performer' at a glance and gives guests a conversation piece." },
        { name: "Snack bar cart", why: "Entertainers are natural hosts; a drinks-and-candy cart means the party is always technically in their room." },
      ],
      foodIntro:
        "Sweet and fizzy leads the Outgoing affinity chart, and no personality fits 'party food' better. Sweep the candy and drink categories first — this is the personality where Cola and Chocolate guesses pay off most often.",
      foodTestFirst: ["Candy", "Cola", "Ice Cream", "Popcorn"],
      foodDeprioritize: ["Cucumber", "Salad", "Sashimi"],
      foodTip:
        "Entertainers give theatrical reactions to everything, so don't trust volume alone — a 'love' is a full celebration, while a mere 'like' still looks enthusiastic. Save your notebook for the jumps with confetti.",
      voicePreset: "Sawtooth — bright high register",
      voicePitchHz: 420,
      voiceSpeed: 1.25,
      voiceTip:
        "Pitch high, speed high. The near-breathless delivery is the whole character: an Entertainer at 1.0x sounds like a Trendsetter, and at 420Hz+ with 1.25x speed the beep-speech practically laughs between words.",
      romance: { partner: "Free Spirit", why: "The Entertainer wants an audience; the Free Spirit refuses to be predictable. The result is the island's most surprising romance — constant improv, zero scripts." },
      friend: { partner: "Optimist", why: "Two relentlessly positive fast-walkers. Their hangouts rarely produce plot, but the friendship itself is unbreakable — good for stabilizing a chaotic roster." },
      friction: { partner: "Lone Wolf", why: "One wants a crowd, the other wants the door closed. The Entertainer keeps knocking; the Lone Wolf keeps not answering. It's funny exactly twice." },
    },

    outgoing_trendsetter: {
      behavior: [
        "The Trendsetter is the island's early adopter. Watch what this Mii wears, says, and does first — within a few in-game days, half the roster copies it. The game gives Trendsetters fast walk speed and a relaxed, expressive face, so they read as 'person with an idea' even in idle animations. They are disproportionately the ones suggesting new activities in group scenes.",
        "Their gentle-but-quick speech pattern makes them persuasive without the Leader's forcefulness: Trendsetters don't order people around, they make the new thing sound fun. Romantically they chase novelty — a Trendsetter who has been paired too long with a same-group friend may suddenly confess to the newest island arrival. Keep the roster fresh if you want a stable Trendsetter love story.",
      ],
      apartmentIntro:
        "A Trendsetter's room is a mood board. Whatever is 'now' should be visible from the doorway:",
      apartmentItems: [
        { name: "Gallery wall", why: "Rotating framed art or pattern tiles signal a curated, of-the-moment space — the visual language of a taste-maker." },
        { name: "Statement rug", why: "One bold geometric piece beats five safe ones; Trendsetters decorate in statements, not themes." },
        { name: "Mirror corner", why: "A tall mirror setup is both practical (constant outfit checks) and on-brand for the island's most-photographed resident." },
      ],
      foodIntro:
        "The Outgoing sweet-tooth applies, but a Trendsetter's best bets are the items that feel like a current obsession — novelty drinks and shareable snacks. Test what's 'trendy' before testing what's classic.",
      foodTestFirst: ["Boba Tea", "Candy", "Juice", "Donut"],
      foodDeprioritize: ["Carrot", "Rice", "Crackers"],
      foodTip:
        "Bob to the rule: Trendsetters seem to favor whatever other residents recently loved, so peek at your island's recent 'love' log and test the same item here next — you'll often skip three guesses.",
      voicePreset: "Sawtooth — Adult Female",
      voicePitchHz: 380,
      voiceSpeed: 1.15,
      voiceTip:
        "Bright and a touch quicker than conversational. The slight edge in speed makes opinions sound like breaking news — exactly how a Trendsetter delivers them.",
      romance: { partner: "Thinker", why: "The Trendsetter brings the new; the Thinker explains why it's interesting. One invents the craze, the other gives it a backstory — the island's most creative couple." },
      friend: { partner: "Charmer", why: "Charmer has the jokes, Trendsetter has the material. Together they run the island's social feed — expect rumor events featuring these two constantly." },
      friction: { partner: "Sweetheart", why: "The Sweetheart's 'we've always done it this way' warmth is kryptonite to a Mii allergic to tradition. Gentle, constant, low-stakes friction." },
    },

    outgoing_optimist: {
      behavior: [
        "The Optimist is the game's most reliable good-news machine. Fast walk speed, confident posture, and gentle speech combine into a Mii that treats every day like a decent one — rain events, lost-item events, even fight mediations get a bright spin. If your island's mood dips after a streak of quarrels, an Optimist is usually the one who flips it back.",
        "Mechanically, Optimists are the glue of Outgoing groups: they don't lead like the Leader or perform like the Entertainer, they check in. You'll see them initiate visits with residents who just lost a fight or got rejected, and their direct-ish but warm dialogue makes them safe confidants. Romantically they're sincere and quick to commit — and notably bad at hiding disappointment, which makes their love arcs oddly moving.",
      ],
      apartmentIntro:
        "An Optimist's room should feel like a good morning. Warm, open, nothing sharp:",
      apartmentItems: [
        { name: "Sunrise-color bedding", why: "Warm yellows and soft oranges make the room itself read as cheerful — the color palette of this personality's whole worldview." },
        { name: "Breakfast nook", why: "A tiny table-and-two-chairs setup invites the constant drop-in visits Optimists thrive on." },
        { name: "Window plant shelf", why: "Growing things in good light is peak Optimist energy: patient, warm, and quietly productive." },
      ],
      foodIntro:
        "Outgoing skew applies — sweets and drinks first — but Optimists have the widest 'like' band in the community model, so this is the personality where almost anything can land. Front-load variety: five different categories beats five desserts.",
      foodTestFirst: ["Cake", "Tea", "Strawberry", "Popcorn"],
      foodDeprioritize: ["Beer", "Sake", "Licorice"],
      foodTip:
        "Optimists react warmly to most foods, which makes 'love' harder to spot. Compare reactions side by side: a true favorite gets the full jump-and-spin, a polite 'like' is just a smile. Test Tea and Cake early — warm comfort items hit most often.",
      voicePreset: "Sawtooth — Adult Female",
      voicePitchHz: 350,
      voiceSpeed: 1.1,
      voiceTip:
        "The default warm setting works — mid-high pitch, just above conversational speed. Resist the urge to over-brighten; an Optimist should sound friendly, not manic. That's the Entertainer's job.",
      romance: { partner: "Dreamer", why: "Both are gentle idealists, but the Dreamer's depth gives the Optimist something to believe in, while the Optimist's energy keeps the Dreamer from drifting too far inward. Quietly the most stable cross-group pairing." },
      friend: { partner: "Leader", why: "The Optimist is the Leader's favorite deputy: loyal, fast, and genuinely pleased to help. The Leader sets the plan; the Optimist makes everyone happy about it." },
      friction: { partner: "Free Spirit", why: "The Optimist wants everyone to get along; the Free Spirit finds that exhausting. Watch for polite refusals of group activities, followed by the Optimist worrying about it for days." },
    },

    confident_designer: {
      behavior: [
        "The Designer is the island's slowest-burning personality and its best plot generator. Slow walk speed plus a confident expression reads as 'deliberate' — this Mii is never late, it simply refuses to rush. Designers spend long stretches in their own heads: expect to find them standing still on the beach or staring at a wall, and expect the game to use those moments for its strangest inner-monologue events.",
        "Their direct, structured speech makes Designers the island's most quotable residents — short declarative lines delivered with total certainty, even when the certainty is wrong. They plan confessions the way other personalities plan lunch, and their romantic arcs move in clear phases: observation, decision, execution. If a Designer has decided your island story needs a twist, it's already three steps ahead of the other Miis.",
      ],
      apartmentIntro:
        "A Designer's room is a manifesto — minimal, intentional, every object arguing for its place:",
      apartmentItems: [
        { name: "Drafting desk with task lamp", why: "The single non-negotiable piece: a workspace that says plans are being made here, whether or not anyone else sees them." },
        { name: "Monochrome palette with one accent", why: "Strict black/white/wood with a single bold color shows the design eye — restraint as a personality statement." },
        { name: "Solitary reading chair", why: "One perfect chair, angled away from the door. A Designer's room is for the Designer; guests are admitted, not hosted." },
      ],
      foodIntro:
        "Confident personalities favor proper meals over snacks — restaurant-course energy, not vending-machine energy. Skip the candy aisle entirely and test mains first; this is the personality where Steak and Sushi guesses earn their keep.",
      foodTestFirst: ["Steak", "Sushi", "Curry", "Coffee"],
      foodDeprioritize: ["Gum", "Licorice", "Candy"],
      foodTip:
        "Designers react to food the way they react to everything: briefly and with judgment. Watch for the rare unguarded moment — a genuine 'love' breaks the composed mask for a full second, which is how you know.",
      voicePreset: "Sawtooth — low register",
      voicePitchHz: 160,
      voiceSpeed: 0.95,
      voiceTip:
        "Low and unhurried, with speed slightly under 1.0x. The fractional slow-down is the trick: it sounds like someone who has decided the conversation will wait for them. Above 180Hz the whole illusion collapses.",
      romance: { partner: "Sweetheart", why: "The Confident × Easygoing complement at its purest: the Sweetheart's steady warmth disarms the Designer's control, and the Designer gives the Sweetheart a plan to believe in. Slow start, strongest finish on the island." },
      friend: { partner: "Lone Wolf", why: "Mutual respect between two Miis who both prefer quality over quantity in company. They meet rarely, speak briefly, and somehow understand each other completely." },
      friction: { partner: "Go-Getter", why: "Two strategists, one island. the Go-Getter wants speed and results; the Designer wants the right answer, eventually. Their arguments are quiet, frequent, and never actually resolved." },
    },

    confident_adventurer: {
      behavior: [
        "The Adventurer is the personality most likely to be somewhere they shouldn't be. Fast walk speed, direct speech, and a relaxed attitude produce a Mii that treats the island like an open-world map — they take the long route on purpose, wander into other residents' events uninvited, and volunteer for every outing, trip, and mystery the game offers.",
        "Adventurers are pragmatists, not philosophers: their dialogue is short, physical, and present-tense. They settle disputes with dares more than words and are the fastest personality to recover from a romantic rejection — usually by planning the next thing before the current thing ends. If your island stories feel stale, an Adventurer is the reset button: put them in a scene and the plot moves within seconds.",
      ],
      apartmentIntro:
        "An Adventurer's room should look like they're mid-departure. Gear visible, door reachable, no clutter:",
      apartmentItems: [
        { name: "Gear wall", why: "Backpack, hat, and boots on hooks by the door — the room equivalent of 'ask me where I've been'." },
        { name: "Topographic rug", why: "A map-pattern rug underfoot keeps the whole space pointed at the horizon, even indoors." },
        { name: "Souvenir shelf", why: "Rocks, souvenirs, and found objects from outings give the room a story and give guests a reason to ask questions." },
      ],
      foodIntro:
        "Confident-type main-dish bias applies, but Adventurers favor the foods you'd actually take on a trip — handheld, hearty, no ceremony. Test street-food-style mains and bold snacks before anything delicate.",
      foodTestFirst: ["Hamburger", "Ramen", "Chips", "Pretzel"],
      foodDeprioritize: ["Pudding", "Gum", "Water"],
      foodTip:
        "Adventurers eat like they travel: fast and without ceremony. Their 'love' reaction is the quickest of any personality — a punch of excitement, immediately over. If you blink you'll miss it, so keep the food chart open while feeding.",
      voicePreset: "Sawtooth — Adult Male",
      voicePitchHz: 240,
      voiceSpeed: 1.2,
      voiceTip:
        "Mid pitch, clearly above-normal speed. This is a voice that's already halfway to the next sentence — the audio equivalent of walking fast. Pair with the Robot preset at 250Hz for a hilarious deadpan explorer variant.",
      romance: { partner: "Buddy", why: "The Adventurer leads, the Buddy follows happily, and neither asks where they're going. It's the lowest-maintenance romance on the island — until the Buddy gets tired, which is basically never." },
      friend: { partner: "Charmer", why: "Charmer talks the plan; Adventurer is already executing it. Their group events tend to escalate — one dares, the other delivers, and the island talks about it for days." },
      friction: { partner: "Softie", why: "The Softie wants cozy and careful; the Adventurer wants the opposite of both. Every invitation gets a gentle no, and the Adventurer takes it personally for about one hour." },
    },

    confident_goGetter: {
      behavior: [
        "the Go-Getter is the island's engine. Fast walk speed, direct speech, and a confident expression make this Mii easy to mistake for the Leader — the difference is what happens after the plan is made: Leaders delegate, Go-Getters execute personally. They are first to volunteer, first to finish, and visibly impatient with anyone who isn't either.",
        "In group scenes the game leans on Go-Getters for momentum: they push stalled events forward, call out lazy friends, and treat mini-games like promotions. Their romantic arcs are efficient to a fault — A Go-Getter decides quickly, confesses quickly, and gets engaged in what other personalities would call 'early'. The comedy writes itself when you pair one with an Easygoing type who takes three weeks to answer a text.",
      ],
      apartmentIntro:
        "a Go-Getter's room is a home office that happens to have a bed. Everything optimized, nothing idle:",
      apartmentItems: [
        { name: "Standing desk setup", why: "The anti-lazy furniture statement — a desk that doesn't even offer sitting sets the tone before anyone speaks." },
        { name: "Progress board", why: "A wall of notes and checkboxes shows the plan, the backup plan, and the backup-backup plan. On-brand doesn't begin to cover it." },
        { name: "Minimal bed, sharp corners", why: "Clean lines, no throw pillows: sleep is a scheduled task, not an experience." },
      ],
      foodIntro:
        "Classic Confident profile — real meals, minimal snacking. Go-Getters favor efficient, high-output foods: protein-forward mains and coffee-adjacent drinks. Skip dessert entirely on the first pass.",
      foodTestFirst: ["Steak", "Coffee", "Curry", "Pizza"],
      foodDeprioritize: ["Gum", "Waffle", "Donut"],
      foodTip:
        "Feed A Go-Getter on a schedule — same category, same time, notes logged. Their reactions are consistent and readable, which makes them the best personality for calibrating your whole island's food-testing method.",
      voicePreset: "Sawtooth — Adult Male",
      voicePitchHz: 220,
      voiceSpeed: 1.25,
      voiceTip:
        "The fastest confident voice: 1.25x speed at a solid mid pitch. Every line lands like a status update — brief, certain, already moving on. At lower speeds the character reads as Leader, so keep the tempo up.",
      romance: { partner: "Dreamer", why: "Highest-drama Confident × Easygoing pair: the Go-Getter schedules everything, the Dreamer floats through time. They shouldn't work. That's exactly why players root for them." },
      friend: { partner: "Adventurer", why: "Same speed, different style. The Adventurer supplies adventures; the Go-Getter supplies logistics. Together they're the only two-island-expedition team you'll ever need." },
      friction: { partner: "Softie", why: "The Softie's pace is the Go-Getter's nightmare. Expect recurring 'why is everything so slow' monologues and a Softie who genuinely doesn't notice the problem." },
    },

    confident_charmer: {
      behavior: [
        "The Charmer is the island's wildcard with a script. Fast walk speed, direct speech, relaxed delivery — this Mii says the surprising thing confidently, which makes them the game's most reliable source of rumors, flirty one-liners, and unexpected alliances. Charmers get invited everywhere because they make every scene 20% more interesting.",
        "Underneath the performance is a genuinely curious mind: Charmers poke at other residents' secrets not to gossip but because they want to know how people work. They're the fastest personality to befriend the difficult ones — Lone Wolves, Designers — because they simply don't accept 'no' as a social answer. Romantically they collect admirers before choosing, and their choice is always the one the island least expected.",
      ],
      apartmentIntro:
        "A Charmer's room is a conversation trap — designed to make people stay twenty minutes longer than planned:",
      apartmentItems: [
        { name: "Curio cabinet", why: "Odd, interesting objects force questions, and questions are a Charmer's home field advantage." },
        { name: "Deep conversation corner", why: "Two low armchairs, one small table, warm light: an arena built for the line 'well, since you're asking...'." },
        { name: "Dim warm lighting", why: "Overhead lights off, lamps on. Nobody tells secrets under fluorescent lighting, and a Charmer knows it." },
      ],
      foodIntro:
        "Confident mains first, but Charmers favor foods with presentation — the ones that arrive like a statement. Restaurant-tier dishes and conversation-friendly drinks outperform grab-and-go snacks here.",
      foodTestFirst: ["Sushi", "Sake", "Spaghetti", "Coffee"],
      foodDeprioritize: ["Gum", "Crackers", "Water"],
      foodTip:
        "Charmers perform their reactions — every food gets a bit. The tell for a real favorite: the performance breaks and something genuine slips through. Watch for the moment the smirk disappears.",
      voicePreset: "Sawtooth — mid-bright register",
      voicePitchHz: 300,
      voiceSpeed: 1.15,
      voiceTip:
        "Mid-high with playful speed. The 300Hz range keeps it light while 1.15x adds the wink. Drop to 0.9x briefly for dramatic pauses — a Charmer's voice should sound like it's enjoying itself.",
      romance: { partner: "Sweetheart", why: "The Sweetheart sees through every line — and likes the Charmer anyway. Being genuinely known is the one thing a Charmer can't charm their way into, which makes this pairing quietly devastating." },
      friend: { partner: "Trendsetter", why: "The island's information economy: Trendsetter sets the topic, Charmer has the take. Their hangouts generate half the rumor events on any healthy island." },
      friction: { partner: "Thinker", why: "The Thinker fact-checks the bit. No audience survives that combination of charisma and corrections — expect debates that the Charmer wins on style and loses on points." },
    },

    independent_artist: {
      behavior: [
        "The Artist is the island's daydream made resident. Slow walk speed, gentle speech, and a relaxed expression produce a Mii that moves through the island like it's a gallery — pausing, observing, drifting. The game gives Artists the longest idle animations and the most wistful inner monologues; this is the personality staring at the sunset while a fight breaks out behind them.",
        "Artists feel everything at full volume but express it at half. Their confessions are hesitant and devastatingly sincere, their friendship is quiet but permanent, and their reactions to beauty — a new outfit, a song, a view — are the most animated they ever get. Pair an Artist with a fast Outgoing type and you get the game's best odd-couple arc: one rushing, one savoring, both confused and fascinated by the other.",
      ],
      apartmentIntro:
        "An Artist's room should feel like a studio at golden hour — soft, textured, work-in-progress everywhere:",
      apartmentItems: [
        { name: "Easel by the window", why: "North light and an unfinished canvas: the room announces its purpose without a word." },
        { name: "Mismatched vintage chairs", why: "Perfectly imperfect furniture is an aesthetic choice and a personality thesis — nothing matches, everything belongs." },
        { name: "String-lit inspiration wall", why: "Loose sketches and found paper under warm string lights: a private gallery that guests are honored to be shown." },
      ],
      foodIntro:
        "Independent personalities favor the unusual — the 'other' and vegetable categories lead our model, ahead of mainstream mains. For the Artist specifically, test the gentle, aesthetic foods first: teas, fruit, anything that looks like a painting.",
      foodTestFirst: ["Boba Tea", "Tea", "Strawberry", "Melon"],
      foodDeprioritize: ["Steak", "Hamburger", "Beer"],
      foodTip:
        "Artists have subtle reactions — a small smile, a held breath. Stand still and watch the full animation: real favorites get a dreamy two-second pause before the response, unique to this personality.",
      voicePreset: "Sawtooth — soft mid register",
      voicePitchHz: 320,
      voiceSpeed: 1.0,
      voiceTip:
        "Mid-soft with unhurried pace. 320Hz keeps it warm without going childlike; 1.0x lets the beep-speech breathe. This is the rare voice where adding silence — spaces between phrases — is the actual performance.",
      romance: { partner: "Leader", why: "The community's most-loved pairing: total opposites in speed, speech, and certainty, each offering exactly what the other lacks. The Leader charges ahead; the Artist makes the destination worth arriving at." },
      friend: { partner: "Free Spirit", why: "Two dreamers with different mediums. They coexist more than they converse, and it works — the island's calmest friendship, measured in comfortable silences." },
      friction: { partner: "Go-Getter", why: "the Go-Getter wants the Artist to hurry. The Artist wants the Go-Getter to mean something. Both are saying it louder each week, and neither is listening." },
    },

    independent_freeSpirit: {
      behavior: [
        "The Free Spirit is the island's question mark. Slow-walking but impossible to predict, this Mii follows curiosity wherever it points — into other residents' apartments, into conversations mid-sentence, into hobbies that change weekly. The game's random event pool loves a Free Spirit: half the strangest island stories start with 'and then the Free Spirit decided to...'",
        "Their direct speech surprises people expecting softness from the slow pace — Free Spirits say exactly what they're thinking, with no particular interest in whether it fits the mood. This makes them terrible at small talk and excellent at real talk. Romantically they resist structure: a Free Spirit matched with another Independent type produces the island's most private, hardest-to-read relationship — deep, wordless, and slightly out of frame.",
      ],
      apartmentIntro:
        "A Free Spirit's room obeys no theme, and that IS the theme. Curated chaos, comfortable contradictions:",
      apartmentItems: [
        { name: "Floor-cushion lounge", why: "No couch, no chairs, just cushions — furniture that refuses to commit is the correct choice here." },
        { name: "Rotating oddity table", why: "This week it's rocks; next week, spoons. The table's content changes but the curiosity never does." },
        { name: "Ceiling-hung decorations", why: "Mobiles and hangings put the interest where nobody else thinks to look — a Free Spirit's signature move." },
      ],
      foodIntro:
        "The Independent preference for unusual items applies at full strength: 'other' category and unexpected pairings lead the model. Forget safe mains — test the items other residents ignore, and expect surprises.",
      foodTestFirst: ["Boba Tea", "Sundae", "Licorice", "Cucumber"],
      foodDeprioritize: ["Pizza", "Hamburger", "Cola"],
      foodTip:
        "Free Spirits are the island's most likely 'weird favorite' holders — the residents who love Licorice or Cucumber against all group trends. If the standard guesses fail, go weirder, not safer.",
      voicePreset: "Square wave — quirky mid register",
      voicePitchHz: 260,
      voiceSpeed: 1.05,
      voiceTip:
        "Use the square wave — the timbre itself sounds 'wrong' in the right way. 260Hz with slight speed-up gives beep-speech that never quite resolves, which is the whole personality in audio form.",
      romance: { partner: "Entertainer", why: "One improvises loudly, one improvises quietly. Neither knows what the plan is and both prefer it that way — the island's most unpredictable and most fun romance to watch." },
      friend: { partner: "Artist", why: "Lowest-maintenance friendship on the island: no demands, no schedule, no performance. They simply appear near each other, and both consider that hanging out." },
      friction: { partner: "Optimist", why: "The Optimist keeps organizing group happiness; the Free Spirit keeps not attending. The Optimist takes every absence personally. The Free Spirit notices nothing." },
    },

    independent_thinker: {
      behavior: [
        "The Thinker is the island's quiet analyst. Slow walk, direct speech, relaxed face — a Mii that seems to be running background calculations about everything it sees. Thinkers rarely start events but end up at the center of them, usually saying the one sentence that reframes the whole situation. The game gives them the driest dialogue lines in the pool.",
        "Socially they're minimalists: a small number of friends, maintained efficiently. Thinkers don't do drama — they diagnose it. When two other residents are fighting, the Thinker is the one who explains the actual cause to whoever will listen, correctly, and then goes back to whatever they were doing. Their romantic arcs are slow and procedural, which makes the payoff — a Thinker finally admitting a feeling out loud — one of the game's best moments.",
      ],
      apartmentIntro:
        "A Thinker's room is a study disguised as an apartment. Everything calm, nothing accidental:",
      apartmentItems: [
        { name: "Full-wall bookshelf", why: "Floor-to-ceiling books say everything a Thinker wants said: knowledge lives here, and it's organized." },
        { name: "Single task lamp, no overheads", why: "One pool of light on one chair: a Thinker's room is lit for reading, not for ambience or company." },
        { name: "Whiteboard or chalk wall", why: "A surface for working things out — the apartment equivalent of thinking out loud, minus the out loud." },
      ],
      foodIntro:
        "Independent-taste profile: vegetables and unusual items over crowd-pleasers. For Thinkers, test the plain, honest foods — the model suggests they favor simple ingredients done well over elaborate dishes.",
      foodTestFirst: ["Salad", "Cucumber", "Tea", "Rice"],
      foodDeprioritize: ["Candy", "Cola", "Cake"],
      foodTip:
        "Thinker reactions are minimal by design — the difference between 'like' and 'love' is a half-second of eyebrow. Log reactions immediately; this is the personality where memory fails and notes save the run.",
      voicePreset: "Square wave — low register",
      voicePitchHz: 200,
      voiceSpeed: 0.9,
      voiceTip:
        "Square wave for deadpan timbre, dropped under 1.0x speed. The result sounds like a voice that finds most sentences optional. Add pitch 180–220Hz and let the silence between beeps do the talking.",
      romance: { partner: "Trendsetter", why: "The Trendsetter supplies novelty; the Thinker supplies analysis. One brings the phenomenon, the other explains it — the island's most intellectually compatible odd couple." },
      friend: { partner: "Lone Wolf", why: "Both prefer understanding over socializing. Their friendship is 90% parallel existence and 10% devastatingly accurate observations about the other residents." },
      friction: { partner: "Charmer", why: "The Charmer plays fast and loose with facts; the Thinker keeps receipts. Every charming story gets a correction, and the room gets 10% colder each time." },
    },

    independent_loneWolf: {
      behavior: [
        "The Lone Wolf is the island's most misunderstood resident. Slow walk, direct speech, confident posture — this Mii doesn't avoid people, it just doesn't need them, and the island never quite forgives it for that. Lone Wolves skip group events, decline invitations politely but firmly, and are somehow present at the exact moment something important happens, contributing one crucial line before leaving.",
        "Their loyalty, once earned, is the game's most durable. A Lone Wolf with one real friend is set for the entire save file: they defend that friend in fights, remember their birthday unprompted, and show up — always late, always when it matters. Romantically they move at their own private pace; the trick players learn is to stop pushing and let the arc develop, because a pressured Lone Wolf simply walks away.",
      ],
      apartmentIntro:
        "A Lone Wolf's room is a fortress of solitude with excellent taste. Private, functional, complete:",
      apartmentItems: [
        { name: "Solid reading chair, back to the wall", why: "The classic lone-wolf furniture: full view of the door, zero invitation to sit down. It's not unfriendly — it's architecture." },
        { name: "Practical gear shelf", why: "Tools, boots, essentials — everything a self-sufficient Mii needs, arranged for one person's use." },
        { name: "Blackout-adjacent curtains", why: "Control over who sees in mirrors control over who gets close. Also excellent for afternoon naps, which Lone Wolves defend fiercely." },
      ],
      foodIntro:
        "Independent tastes, self-sufficiency edition: Lone Wolves favor simple, no-ceremony foods they could theoretically prepare themselves. Test staples and strong simple flavors before anything elaborate.",
      foodTestFirst: ["Rice", "Sashimi", "Coffee", "Apple"],
      foodDeprioritize: ["Cake", "Sundae", "Boba Tea"],
      foodTip:
        "Lone Wolves eat like it's fuel, not event — reactions are short and unperformed. The reliable 'love' tell: they look around to check nobody saw them enjoy something. That's your answer.",
      voicePreset: "Sawtooth — low terse register",
      voicePitchHz: 140,
      voiceSpeed: 0.9,
      voiceTip:
        "Lowest pitch on the island, slightly slow. 140Hz sawtooth with 0.9x speed produces the audio of someone saving words. Every beep costs something, so nothing extra gets said.",
      romance: { partner: "Optimist", why: "The Optimist refuses to be discouraged by the Lone Wolf's distance, and the Lone Wolf secretly appreciates not having to perform. The island's slowest, most earned romance." },
      friend: { partner: "Thinker", why: "The only friendship where silence is the default language. They respect each other's space so thoroughly that their rare conversations are legendary for their directness." },
      friction: { partner: "Entertainer", why: "An unstoppable force of enthusiasm meeting an immovable object of disinterest. The Entertainer interprets every closed door as a challenge. The Lone Wolf disagrees, silently, at length." },
    },

    easygoing_dreamer: {
      behavior: [
        "The Dreamer is the island's quiet depth. Slow walk, gentle speech, confident expression — a Mii that seems to know something the rest of the island doesn't. The game assigns Dreamers the most poetic inner monologues and the strangest dreams (check the morning reports: theirs are always the ones worth screenshotting). They drift through the island like it's a metaphor.",
        "Don't mistake gentle for passive — Dreamers are the island's best judges of character. They predict which couples will last, which friendships are fake, and which resident is about to cause a problem, usually weeks early. Their social style is quiet observation followed by devastatingly precise insight, delivered softly at the exact right moment. Romantically they're slow, idealistic, and quietly intense; a Dreamer's confession has been considered for a very long time before anyone heard it.",
      ],
      apartmentIntro:
        "A Dreamer's room should feel like the moment just before sleep — soft edges, low light, meaning everywhere:",
      apartmentItems: [
        { name: "Canopy or layered bedding", why: "Soft draping fabric turns the bed into the room's centerpiece — the headquarters of a personality that does its best work asleep." },
        { name: "Moon-and-star decor", why: "Night-sky touches aren't a cliché here; they're a mission statement for the island's resident astronomer of feelings." },
        { name: "Journal corner", why: "A small table, a lamp, an open notebook: where the island's most accurate predictions get written down before they come true." },
      ],
      foodIntro:
        "Easygoing comfort-food profile with a dreamy tilt: warm, soft, nostalgic foods lead. Think 'what you'd eat during a quiet evening' — the model favors main dishes and gentle desserts for this group.",
      foodTestFirst: ["Noodle Soup", "Pudding", "Milk", "Melon"],
      foodDeprioritize: ["Beer", "Chips", "Sake"],
      foodTip:
        "Dreamers savor — their 'love' reaction is a slow, full-body happy shiver rather than a jump. Feed them in the evening in-game and watch the whole animation; it's the calmest 'love' on the island.",
      voicePreset: "Sawtooth — airy high register",
      voicePitchHz: 400,
      voiceSpeed: 0.95,
      voiceTip:
        "High pitch, slightly slow speed — the rare combination that sounds like floating. 400Hz at 0.95x produces beep-speech that seems to arrive from slightly elsewhere, which is exactly right.",
      romance: { partner: "Go-Getter", why: "The Confident × Easygoing contrast at maximum: motion meets stillness, schedules meet serenity. They shouldn't work — and their scenes are the ones players rewatch." },
      friend: { partner: "Softie", why: "Two gentle souls at the same slow frequency. Their friendship produces no drama and infinite comfort — the island's warmest corner, permanently occupied." },
      friction: { partner: "Adventurer", why: "The Adventurer's volume and velocity are a lot for a Mii built for stillness. Expect gentle, endless deflections of invitations the Adventurer keeps re-extending." },
    },

    easygoing_sweetheart: {
      behavior: [
        "The Sweetheart is the island's caretaker — the personality that notices when someone's missing from the table. Slow walk, gentle speech, confident warmth: this Mii maintains friendships the way other personalities maintain hobbies, deliberately and daily. The game gives Sweethearts the highest rate of comforting-other-residents events; they always arrive first when someone's crying on a bench.",
        "Their social gravity is real: Sweethearts quietly hold friend groups together across personality lines, and the island's most stable trios usually have one at the center. Romantically they're loyal, attentive, and quietly stubborn — a Sweetheart who has decided a relationship is worth keeping cannot be talked out of it, which produces both the island's best marriages and its longest-suffering ones. Give them someone worth their loyalty; it's the whole game.",
      ],
      apartmentIntro:
        "A Sweetheart's room is everyone's second-favorite room — warm, welcoming, cookies implied:",
      apartmentItems: [
        { name: "Round kitchen table", why: "No sharp corners, room for four: furniture that says 'sit down, I'll make something' before anyone says a word." },
        { name: "Fresh flowers, always", why: "A small vase that's never empty — the lowest-effort, highest-signal detail of a naturally caring resident." },
        { name: "Photo wall of friends", why: "Pictures of other residents where most would hang art: a Sweetheart's room is decorated with relationships." },
      ],
      foodIntro:
        "Classic Easygoing comfort profile: home-style mains, soft desserts, nothing aggressive. Sweethearts favor the foods you'd serve a guest — which conveniently is also the fastest way to find their favorite.",
      foodTestFirst: ["Noodle Soup", "Cookie", "Tea", "Pudding"],
      foodDeprioritize: ["Beer", "Sake", "Licorice"],
      foodTip:
        "Sweethearts like almost everything, so hunt the 'love' by testing comfort categories back-to-back: Noodle Soup, then Cookie, then Tea. Watch for the reaction where they close their eyes — that's the real one.",
      voicePreset: "Sawtooth — gentle mid-high register",
      voicePitchHz: 380,
      voiceSpeed: 1.0,
      voiceTip:
        "Warm mid-high at unhurried speed. 380Hz keeps it kind without going cartoonish; 1.0x lets every word land softly. The Elder preset at low pitch makes a wonderful grandmother-variant Sweetheart.",
      romance: { partner: "Designer", why: "The Sweetheart's patience is the one force that outlasts the Designer's walls. This is the island's slow-burn gold standard — plan the wedding venue early." },
      friend: { partner: "Optimist", why: "The island's two caretakers, maintaining everyone else in shifts. Their hangouts are gentle, supportive, and secretly how the whole roster stays functional." },
      friction: { partner: "Free Spirit", why: "The Sweetheart offers care; the Free Spirit evades it. Every thoughtful gesture gets a cheerful no-thank-you, and the Sweetheart's worry spiral is genuinely dramatic to watch." },
    },

    easygoing_softie: {
      behavior: [
        "The Softie is the island's gentle heart with the volume turned down. Slow walk, soft speech, relaxed everything — this Mii experiences the world at high sensitivity and low volume, and the game honors it: Softies get the most 'moved to tears by something small' events in the pool. A beautiful sunset isn't scenery to a Softie; it's an event.",
        "Their emotional honesty is disarming — Softies can't perform indifference, which makes them the island's truth detectors. When a Softie is uncomfortable, everyone knows; when a Softie is happy, the whole street feels softer. Romantically they're cautious and deeply sincere, the personality most likely to blush during their own confession. Protect them from the island's sharp edges, or better: watch them be braver than anyone expected.",
      ],
      apartmentIntro:
        "A Softie's room is a nest — soft everything, warm light, safety in texture form:",
      apartmentItems: [
        { name: "Plush overload", why: "Pillows, stuffed toys, soft throws: maximum tactile comfort for the resident with the most feelings per square meter." },
        { name: "Pastel palette", why: "Blush pinks and soft creams make the room itself gentle — an environment that never raises its voice." },
        { name: "Cozy reading nook", why: "A cushioned window seat with a small lamp: the softest possible answer to the question 'where do feelings go to be felt?'" },
      ],
      foodIntro:
        "Easygoing comfort profile, softest setting: gentle sweets and warm mild foods lead. Skip anything intense — bitter, fizzy, or spicy-adjacent items rarely land for this personality.",
      foodTestFirst: ["Pudding", "Milk", "Ice Cream", "Strawberry"],
      foodDeprioritize: ["Beer", "Coffee", "Licorice"],
      foodTip:
        "Softies have the island's most legible reactions — every feeling shows on their face immediately. This makes food testing easy and heartwarming: their 'love' reaction includes a little happy wiggle that no other personality gets.",
      voicePreset: "Sawtooth — delicate high register",
      voicePitchHz: 440,
      voiceSpeed: 0.95,
      voiceTip:
        "Highest gentle voice on the island: 440Hz with slightly slow delivery. The beep-speech sounds like it might apologize for itself, which is precisely the character. Keep speed under 1.0x — a rushed Softie is a contradiction.",
      romance: { partner: "Charmer", why: "The Charmer's confidence meets the Softie's sincerity and — surprisingly — sincerity wins. Being adored is nice; being actually seen is what a Softie has been waiting for." },
      friend: { partner: "Dreamer", why: "The island's two quietest feelers, sharing a bench and a sunset. No words needed; the friendship is the comfortable silence itself." },
      friction: { partner: "Go-Getter", why: "the Go-Getter's pace and pressure overwhelm the island's most sensitive resident. The Softie never complains, which somehow makes the Go-Getter push harder. Gently heartbreaking sub-plot." },
    },

    easygoing_buddy: {
      behavior: [
        "The Buddy is the island's favorite background character — the Mii everyone likes without quite knowing why. Slow walk, gentle speech, permanently relaxed: the Buddy's whole deal is pleasantness without agenda. They show up, they're happy to be there, they have no notes. The game loves casting them as the supportive friend in everyone else's story arcs.",
        "Their superpower is adaptability: Buddies fit into any group, any event, any drama — usually as the one keeping things light. They don't lead, don't compete, and don't hold grudges; island fights involving a Buddy resolve suspiciously fast. Romantically they're unhurried and easygoing about the whole business, which means a Buddy's love story only happens if someone else initiates — and once it starts, they're the most low-drama partner on the island.",
      ],
      apartmentIntro:
        "A Buddy's room is a hangout spot that happens to contain a bed. Maximum comfort, zero pretension:",
      apartmentItems: [
        { name: "Big soft couch", why: "The room's actual centerpiece — seating for whoever drops by, softness for whoever stays. A Buddy's couch is island infrastructure." },
        { name: "Snack drawer situation", why: "Chips within arm's reach of every seat: hospitality as furniture layout." },
        { name: "Laid-back plant corner", why: "A few easy plants that thrive on neglect — greenery without the pressure, very on-brand." },
      ],
      foodIntro:
        "Easygoing comfort profile, casual edition: Buddies favor relaxed, shareable, no-fuss foods. Snacks and simple mains over anything formal — test what you'd bring to a casual hangout.",
      foodTestFirst: ["Popcorn", "Ramen", "Chips", "Apple"],
      foodDeprioritize: ["Sake", "Sashimi", "Licorice"],
      foodTip:
        "Buddies react to food the way they react to life: pleased, mildly, consistently. Their 'love' is a happy little hum and a smile — easy to miss next to louder personalities. Watch closely; it's worth catching.",
      voicePreset: "Sawtooth — relaxed mid register",
      voicePitchHz: 300,
      voiceSpeed: 1.05,
      voiceTip:
        "Dead-center pitch, unhurried-but-not-slow speed. 300Hz at 1.05x is the most neutral-friendly voice possible — it sounds like it would help you move a couch, no questions asked.",
      romance: { partner: "Adventurer", why: "The Adventurer supplies the plans; the Buddy supplies the 'sure, sounds fun.' The island's easiest romance — zero friction, infinite hangouts, mutual delight." },
      friend: { partner: "Sweetheart", why: "The island's comfort duo: one makes everyone feel welcome, the other makes everyone feel cared for. Their hangouts emit a warmth aura detectable from the pier." },
      friction: { partner: "Leader", why: "The Leader keeps assigning plans; the Buddy keeps being fine with whatever. To a Leader, 'no preference' is maddening. The Buddy remains unbothered, which is worse." },
    },
  },
};
