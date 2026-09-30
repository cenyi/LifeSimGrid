/**
 * LifeSimGrid — Blog post: Tomodachi Voice Lab 8-bit voice synthesis, explained
 *
 * Grounded in the site's own implementation:
 *   - src/components/VoiceLab.tsx              (VOICE_PRESETS, playSyllable, beep-TTS)
 *   - src/components/TomodachiVoiceLabPage.tsx (personality-voice reference table)
 *   - src/lib/history-db.ts                    (IndexedDB-backed voice history)
 */

import type { BlogPost } from "../types";

export const postVoiceSynthesis: BlogPost = {
  slug: "tomodachi-life-voice-synthesis-guide",
  title: "How Tomodachi Voice Lab Synthesizes 8-Bit Voices",
  description:
    "The full Web Audio API pipeline behind Tomodachi Voice Lab: oscillator nodes, waveforms, the 5 voice presets, and how each parameter shapes the sound.",
  publishedAt: "2026-09-27",
  tags: ["Tomodachi Life", "Web Audio API", "Voice Synthesis", "Guides"],
  blocks: [
    {
      type: "p",
      text: "Tomodachi Voice Lab builds its 8-bit Mii voices from a three-node Web Audio API graph: one `OscillatorNode` generates the tone, one `BiquadFilterNode` softens it, and one `GainNode` shapes its volume envelope. This guide dissects that pipeline exactly as it runs in [Tomodachi Voice Lab](/tomodachi-voice-lab) — every constant, every preset, and every scheduling decision — so you can understand, reproduce, or extend the beep-speech aesthetic that evokes Tomodachi Life: Living the Dream. Every number below is quoted from the site's source code, and where a value is a community estimate rather than something Nintendo documented, the text says so.",
    },
    { type: "h2", text: "Why Tomodachi voices speak in beeps" },
    {
      type: "p",
      text: "The signature quirk of Tomodachi Life's audio is beep-speech: instead of recorded dialogue, every Mii vocalizes in short synthesized tones that follow the rhythm of a sentence without ever forming real words. The approach dates back to the series' handheld origins, where cartridge size and sound hardware made full voice acting impractical, and it survived into Tomodachi Life: Living the Dream on Switch because the beeps became part of the series' identity. The result reads as speech because it copies human prosody — pitch movement, syllable timing, pauses — while staying deliberately non-lexical.",
    },
    {
      type: "p",
      text: "Nintendo has never published the game's actual synthesis method, so any browser reconstruction is a community estimate by definition. What the lab targets is the aesthetic rather than bit-exact reproduction, and three properties do most of the work. First, tones are short: envelopes open and close in tens of milliseconds, so every syllable starts and stops cleanly. Second, the waveform is harmonically rich: a buzzy timbre reads as 'chiptune' far more readily than a pure tone. Third, pitch is never static: small frequency offsets per syllable mimic the contour of natural speech. The rest of this guide shows how each of those properties maps to a concrete Web Audio API mechanism.",
    },
    { type: "h2", text: "The synthesis pipeline, node by node" },
    {
      type: "p",
      text: "Every sound the lab produces comes out of the same three-node graph — oscillator, filter, gain — on its way to your speakers. A fresh `AudioContext` is created per playback — the lab never keeps a global audio graph alive — and each syllable schedules its own set of nodes inside it:",
    },
    {
      type: "code",
      text: "OscillatorNode ──▶ BiquadFilterNode (lowpass) ──▶ GainNode ──▶ AudioContext.destination\n\n                        elder preset only:\n  LFO OscillatorNode (5 Hz) ──▶ GainNode (depth 15) ──▶ main osc.frequency",
    },
    {
      type: "p",
      text: "The `OscillatorNode` is the sound source. Its `type` comes from the selected preset (`sawtooth` for four of the five presets, `square` for the robot), and its `frequency` is set from the pitch slider. Because an oscillator is a bare waveform generator, it has no timbral controls of its own — everything that makes one preset sound different from another is downstream parameter scheduling.",
    },
    {
      type: "p",
      text: "The `BiquadFilterNode` is always configured as a `lowpass` filter, with its cutoff taken from the preset's `filterFreq` value (`900 – 2500 Hz` depending on preset). A lowpass filter attenuates harmonics above its cutoff, which is what turns a raw sawtooth's full-throttle buzz into something voice-adjacent: darker presets (elder at `900 Hz`) keep only the low harmonics, while brighter presets (child at `2500 Hz`) let through the sparkle that makes a voice read as small and young.",
    },
    {
      type: "p",
      text: "The `GainNode` is where the envelope lives, scheduled with four automation points. The gain starts at `0` at the syllable's start time, ramps linearly up to the preset's target (`0.2 – 0.3`) over the attack time, holds at that value until one release-duration before the end, then ramps linearly back to `0`. The calls are `setValueAtTime()` for the anchors and `linearRampToValueAtTime()` for the ramps — a plain attack/hold/release envelope with no exponential curves, which keeps the sound characteristically abrupt.",
    },
    {
      type: "p",
      text: "A fourth, optional node pair exists: vibrato. When a preset enables it, a second `OscillatorNode` acting as an LFO (low-frequency oscillator) runs at the preset's `vibratoRate` and feeds a `GainNode` set to the `vibratoDepth`, which is connected to the main oscillator's `frequency` parameter. This is classic frequency modulation — in the elder preset, a `5 Hz` LFO wobbles the pitch by `±15 Hz`, producing the wavering quality associated with aged voices. Only the elder preset turns it on; the other four leave vibrato disabled entirely.",
    },
    { type: "h2", text: "What each waveform sounds like (and when to pick it)" },
    {
      type: "p",
      text: "Waveform choice is the single biggest timbre decision in the whole pipeline, because it determines the harmonic content the filter and envelope subsequently shape. The Web Audio API's `OscillatorNode` offers four standard types, and each has a distinct character:",
    },
    {
      type: "table",
      headers: ["Waveform", "Harmonic content", "Character", "Used by presets"],
      rows: [
        ["`sine`", "Fundamental only", "Pure, flute-like, zero buzz", "None (available via `OscillatorType`)"],
        ["`square`", "Odd harmonics, strong", "Hollow, classic NES lead channel", "Robot"],
        ["`sawtooth`", "All harmonics, decaying", "Buzzy, reedy, closest to vocal richness", "Adult male, adult female, elder, child"],
        ["`triangle`", "Few odd harmonics, weak", "Soft, mellow, slightly muted", "None (available via `OscillatorType`)"],
      ],
    },
    {
      type: "p",
      text: "The lab's presets use only two of the four: `sawtooth` carries the four organic voices and `square` carries the robot. That split is deliberate. A sawtooth contains energy at every harmonic, which after lowpass filtering leaves a thick, voice-like core — the reason it approximates sung or spoken tones better than any other basic waveform. A square wave keeps only odd harmonics with more energy up high, giving the hollow, nasal, unmistakably electronic quality the robot preset wants. `sine` and `triangle` are not used by any current preset, but they remain one-line changes via the same `OscillatorType` field: sine suits pure sound effects like chimes, and triangle suits soft background blips where sawtooth would be too aggressive.",
    },
    { type: "h2", text: "The five voice presets, decoded" },
    {
      type: "p",
      text: "The five presets are five parameter bundles over the same three-node graph, and their differences are fully enumerable. Here is the complete table, quoted directly from the `VOICE_PRESETS` constant in the source:",
    },
    {
      type: "table",
      headers: ["Preset", "Waveform", "Base freq", "Lowpass cutoff", "Gain", "Vibrato", "Attack", "Release"],
      rows: [
        ["Adult Male", "`sawtooth`", "`180 Hz`", "`1200 Hz`", "`0.30`", "Off", "`0.02 s`", "`0.05 s`"],
        ["Adult Female", "`sawtooth`", "`350 Hz`", "`1800 Hz`", "`0.25`", "Off", "`0.02 s`", "`0.04 s`"],
        ["Elder", "`sawtooth`", "`120 Hz`", "`900 Hz`", "`0.30`", "`5 Hz`, `±15 Hz`", "`0.04 s`", "`0.08 s`"],
        ["Child", "`sawtooth`", "`600 Hz`", "`2500 Hz`", "`0.20`", "Off", "`0.01 s`", "`0.03 s`"],
        ["Robot", "`square`", "`250 Hz`", "`1500 Hz`", "`0.25`", "Off", "`0 s`", "`0 s`"],
      ],
    },
    {
      type: "p",
      text: "**Adult Male** anchors the set at a `180 Hz` base frequency, sitting at the low end of the typical adult male speaking range, with a `1200 Hz` lowpass that tames the sawtooth buzz into something rounded. **Adult Female** nearly doubles the base to `350 Hz`, opens the filter to `1800 Hz` for a brighter tone, and trims both the gain (`0.25`) and the release (`0.04 s`) for slightly crisper articulation.",
    },
    {
      type: "p",
      text: "**Elder** is the most heavily processed preset: the lowest register (`120 Hz`), the darkest filter (`900 Hz`), the only vibrato (`5 Hz` LFO at `±15 Hz` depth), and the slowest envelope (`0.04 s` attack, `0.08 s` release). Those last two values matter as much as the pitch — the sluggish attack softens each syllable's onset, and the long release lets tones bleed slightly into the next, evoking the less precise articulation the preset is aiming for.",
    },
    {
      type: "p",
      text: "**Child** inverts almost every elder decision: the highest base (`600 Hz`), the brightest filter (`2500 Hz`), the lowest gain (`0.20`), and the fastest envelope (`0.01 s` attack, `0.03 s` release). Fast envelopes on high pitches are the classic recipe for small-creature voicing — every syllable lands like a quick chirp. **Robot** is the odd one out on two axes: it is the only `square` wave, and it is the only preset with zero attack and zero release, meaning the gain snaps on and off instantly. Those abrupt edges produce the hard, gated, mechanical quality the preset wants — no ramp means no softness, by construction.",
    },
    { type: "h2", text: "How pitch and speed actually drive the oscillator" },
    {
      type: "p",
      text: "Two sliders control the graph in real time: pitch, spanning `100 – 800 Hz` with a default of `300 Hz`, and speed, spanning `0.5x – 2.0x` with a default of `1.0x`. Each preset also declares its own canonical `baseFreq` (the reference center listed in the table above), which documents where that voice type is designed to sit.",
    },
    {
      type: "p",
      text: "Pitch sets the oscillator frequency directly, with one guard rail: in the child preset the played frequency is `Math.max(pitch, 500)`, so dragging the slider below `500 Hz` in child mode does nothing — the oscillator never descends below that floor. This clamp protects the preset's character, since a child voice at `150 Hz` would simply read as a quiet adult male.",
    },
    {
      type: "p",
      text: "Speed controls time, not frequency. A single press of the play button produces one beep lasting `0.5 / speed` seconds — `1.0 s` at `0.5x`, `0.5 s` at `1.0x`, and `0.25 s` at `2.0x`. The same divisor applies to every timing constant in text mode, so a `2.0x` voice is genuinely twice as fast end to end rather than resampled, which would have shifted its pitch. Once playback ends, the interface resets its playing state after `500 / speed + 50` milliseconds, the beep length plus a `50 ms` guard.",
    },
    { type: "h2", text: "From text to speech, one beep per character" },
    {
      type: "p",
      text: "The lab's speak-text mode is not a speech engine — it is the same three-node oscillator pipeline scheduled once per character. When you type up to `100` characters and press speak, the input is split into individual characters, and each non-space character becomes one scheduled syllable beep with a pitch offset derived from its character code. The timing constants, all divided by speed:",
    },
    {
      type: "ul",
      items: [
        "**Character tone** — `0.08 / speed` seconds per character (`0.08 s` at `1.0x`).",
        "**Inter-character gap** — `0.03 / speed` seconds between consecutive characters.",
        "**Word gap** — a space character inserts `0.12 / speed` seconds of silence, roughly 1.5 character-lengths.",
        "**Phrase pause** — every 5th character (`i % 5 === 4`) adds an extra `gap × 2` pause, giving the output a cadence instead of a flat stream.",
        "**Lead-in** — scheduling starts at `currentTime + 0.05` seconds so the audio graph is ready before the first tone.",
      ],
    },
    {
      type: "p",
      text: "The pitch variation is the clever part. Each character's frequency offset is computed as `((charCode % 20) - 10) × 3`, which yields a deterministic spread between `-30 Hz` and `+27 Hz` around the base pitch. The determinism matters: the same word always produces the same melodic contour, so a given phrase becomes recognizable the way a Mii's voice is recognizable. Because the offsets come from character codes rather than phonetics, the output follows the rhythm of the text closely while remaining non-lexical gibberish — which is precisely the beep-speech effect the lab is approximating.",
    },
    { type: "h2", text: "Designing a voice for each personality group" },
    {
      type: "p",
      text: "A convincing personality voice is mostly a pitch-range decision: pick the preset the site's reference table assigns to your Mii's personality group, then park the pitch slider inside the recommended range. The full mapping used by the [voice lab's reference table](/tomodachi-voice-lab):",
    },
    {
      type: "table",
      headers: ["Group", "Representative personality", "MBTI", "Preset", "Pitch range"],
      rows: [
        ["Outgoing", "Leader", "ESTJ", "Adult Male", "`180 – 250 Hz`"],
        ["Confident", "Designer", "INTJ", "Adult Male", "`150 – 200 Hz`"],
        ["Independent", "Artist", "INFP", "Adult Female", "`280 – 380 Hz`"],
        ["Easygoing", "Dreamer", "INFJ", "Elder", "`120 – 180 Hz`"],
        ["Children", "Any", "Any", "Child", "`500 – 700 Hz`"],
        ["Robots", "Any", "Any", "Robot", "`200 – 300 Hz`"],
      ],
    },
    {
      type: "p",
      text: "Notice that the table maps groups, not all 16 personalities — the four personality groups from our [MBTI mapping](/tomodachi-life-mbti) each get one representative voice silhouette, and individual personalities are expressed by where inside the range you set the slider and how fast you run the speed control. The step-by-step recipe:",
    },
    {
      type: "ol",
      items: [
        "**Pick the preset from the group.** Outgoing and Confident Miis take Adult Male; Independent Miis take Adult Female; Easygoing Miis take Elder, whose `5 Hz` vibrato adds the relaxed, unhurried quality the group is known for. A Mii's group comes from its four personality sliders — see the [personality chart](/tomodachi-life-personality-chart) if you do not know it yet.",
        "**Set the pitch slider inside the group's range.** For a Confident Designer that means `150 – 200 Hz`; sliding toward `150 Hz` reads more imposing, toward `200 Hz` more energetic. The child preset's `500 Hz` floor means the `500 – 700 Hz` range enforces itself.",
        "**Choose speed to match speech style.** Fast-talking Entertainer types call for `1.4x – 2.0x`; a drowsy Dreamer sits naturally at `0.5x – 0.8x`. Speed changes only duration, so it never detunes the voice you chose in step 2.",
        "**Test with a short phrase.** Type `20 – 30` characters into the text field and listen for the phrase pause every 5th character — if the cadence feels wrong for the personality, adjust speed before touching pitch.",
        "**Iterate against your history.** Every playback — preset, pitch, speed, and up to `100` characters of text — is saved to a local `IndexedDB` history panel inside the tool, so you can A/B two settings without writing them down. Nothing leaves the browser.",
      ],
    },
    {
      type: "p",
      text: "The child and robot rows are intentionally outside the personality system: any Mii can be voiced as either, which is why their MBTI column reads Any. The robot's zero-length envelope makes it tempo-tolerant — at any speed it keeps the same gated stiffness, so it is the one voice where speed is purely a comedic control.",
    },
    { type: "h2", text: "Why there is no Web Speech API fallback" },
    {
      type: "p",
      text: "The lab deliberately avoids the browser's Web Speech API — there is no `speechSynthesis` call anywhere in its codebase, and the speak-text mode is pure oscillator scheduling. This is a design decision with a defensible rationale and a real trade-off, and it is worth spelling out both.",
    },
    {
      type: "p",
      text: "The rationale: `speechSynthesis` produces natural human voices, which is exactly what an 8-bit voice lab does not want. It also delegates voice selection to the operating system, so the same text can sound different across browsers and devices, and several browsers load voices lazily with noticeable first-utterance latency. The beep-per-character approach keeps every sound inside the same three-node graph the single-beep mode uses, guarantees identical timbre everywhere the Web Audio API works, and starts instantly because nothing needs to load.",
    },
    {
      type: "p",
      text: "The trade-off: the output is not intelligible speech. It follows the rhythm and contour of the text but produces no recognizable words, so it evokes the cadence of Tomodachi Life's beep-speech rather than its comprehensibility — and the game's gibberish is not comprehensible either, which is arguably the point. Stopping playback is brute-force and effective: the lab closes the entire `AudioContext` via `close()`, which immediately kills every scheduled node rather than fading out.",
    },
    { type: "h2", text: "Limitations, honestly stated" },
    {
      type: "p",
      text: "Three limitations bound what this synthesizer can honestly claim. First, it approximates an aesthetic, not the game's engine: Nintendo has never documented how Tomodachi Life generates its voices, so the preset values here are community estimates tuned to evoke the series' sound, not extracted constants. The voices are reminiscent of the game's, not replicas of them.",
    },
    {
      type: "p",
      text: "Second, the synthesis is monophonic and formant-free. Each syllable is a single oscillator shaped by one lowpass filter, whereas natural speech — and presumably the game's more sophisticated engine — carries formant structure from the vocal tract. This is why the output reads as chiptune voicing rather than sampled speech, and it is the gap most worth exploring if you extend the code: a second oscillator an octave up, or a filter with scheduled frequency movement, would push the result closer to vocal territory.",
    },
    {
      type: "p",
      text: "Third, everything depends on browser support. The Web Audio API used here — `AudioContext`, `OscillatorNode`, `BiquadFilterNode`, `GainNode` — is supported in all current major browsers, but its output character still varies slightly across device audio stacks, and browsers that block autoplay until a user gesture will require the play button press the lab already provides. On the privacy side, the tool is fully client-side: synthesis runs in the browser, and the only persistence is the local `IndexedDB` history — no audio or text is uploaded anywhere.",
    },
    { type: "h2", text: "Try the pipeline yourself" },
    {
      type: "p",
      text: "The fastest way to internalize the model is to move the two sliders and hear the graph respond in real time:",
    },
    {
      type: "ul",
      items: [
        "[Tomodachi Voice Lab](/tomodachi-voice-lab) — the synthesizer itself: five presets, the `100 – 800 Hz` pitch slider, speed control, and the beep-per-character text mode.",
        "[Tomodachi Life MBTI Mapping](/tomodachi-life-mbti) — how a Mii's four personality sliders produce its group, which decides its preset in the table above.",
        "[Personality Chart](/tomodachi-life-personality-chart) — the full 16-type reference for picking a representative personality to voice.",
        "[Mii QR Unlocker](/mii-qr-unlocker) — pair a designed voice with an edited Mii character for the complete island resident.",
      ],
    },
    {
      type: "callout",
      text: "Tomodachi Life and Nintendo are registered trademarks of their respective owners. This voice synthesizer is a fan-made interpretation for entertainment purposes and is not affiliated with or endorsed by Nintendo.",
    },
  ],
};
