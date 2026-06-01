"use client";

import { useTranslations } from "next-intl";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  calculateCompatibility,
  zodiacOrder,
  getPersonalityGroup,
  type Zodiac,
  type PersonalityGroup,
} from "@/lib/compatibility";
import { type VoiceHistoryData, type VoicePreset } from "@/lib/history-db";
import { useHistory } from "@/hooks/useHistory";
import HistoryPanel from "@/components/HistoryPanel";

interface VoiceConfig {
  waveType: OscillatorType;
  baseFreq: number;
  filterFreq: number;
  gain: number;
  vibrato: boolean;
  vibratoRate: number;
  vibratoDepth: number;
  attackTime: number;
  releaseTime: number;
}

const VOICE_PRESETS: Record<VoicePreset, VoiceConfig> = {
  adultMale: {
    waveType: "sawtooth",
    baseFreq: 180,
    filterFreq: 1200,
    gain: 0.3,
    vibrato: false,
    vibratoRate: 0,
    vibratoDepth: 0,
    attackTime: 0.02,
    releaseTime: 0.05,
  },
  adultFemale: {
    waveType: "sawtooth",
    baseFreq: 350,
    filterFreq: 1800,
    gain: 0.25,
    vibrato: false,
    vibratoRate: 0,
    vibratoDepth: 0,
    attackTime: 0.02,
    releaseTime: 0.04,
  },
  elder: {
    waveType: "sawtooth",
    baseFreq: 120,
    filterFreq: 900,
    gain: 0.3,
    vibrato: true,
    vibratoRate: 5,
    vibratoDepth: 15,
    attackTime: 0.04,
    releaseTime: 0.08,
  },
  child: {
    waveType: "sawtooth",
    baseFreq: 600,
    filterFreq: 2500,
    gain: 0.2,
    vibrato: false,
    vibratoRate: 0,
    vibratoDepth: 0,
    attackTime: 0.01,
    releaseTime: 0.03,
  },
  robot: {
    waveType: "square",
    baseFreq: 250,
    filterFreq: 1500,
    gain: 0.25,
    vibrato: false,
    vibratoRate: 0,
    vibratoDepth: 0,
    attackTime: 0,
    releaseTime: 0,
  },
};

const PERSONALITIES = [
  "outgoing_leader",
  "outgoing_entertainer",
  "outgoing_trendsetter",
  "outgoing_optimist",
  "confident_designer",
  "confident_adventurer",
  "confident_goGetter",
  "confident_charmer",
  "independent_artist",
  "independent_freeSpirit",
  "independent_thinker",
  "independent_loneWolf",
  "easygoing_dreamer",
  "easygoing_sweetheart",
  "easygoing_softie",
  "easygoing_buddy",
] as const;

interface CompatibilityResult {
  romance: number;
  friendship: number;
}

interface Resident {
  id: string;
  name: string;
  zodiac: Zodiac;
  personality: string;
}

interface PairingResult {
  residentA: Resident;
  residentB: Resident;
  romance: number;
  friendship: number;
}

const STORAGE_KEY = "lifesimgrid-residents";
const MAX_RESIDENTS = 15;

/** Reads the resident roster from localStorage */
function loadResidents(): Resident[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Persists the resident roster to localStorage */
function saveResidents(residents: Resident[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(residents));
}

/** Generates a unique ID for a new resident */
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/** Maps personality group to coordinate position on the 2x2 matrix */
function getGroupPosition(group: PersonalityGroup): { x: number; y: number } {
  switch (group) {
    case "outgoing":
      return { x: 75, y: 25 };
    case "confident":
      return { x: 75, y: 75 };
    case "independent":
      return { x: 25, y: 75 };
    case "easygoing":
      return { x: 25, y: 25 };
  }
}

/** Gets the color associated with a personality group */
function getGroupColor(group: PersonalityGroup): string {
  switch (group) {
    case "outgoing":
      return "#f59e0b";
    case "confident":
      return "#ef4444";
    case "independent":
      return "#8b5cf6";
    case "easygoing":
      return "#22c55e";
  }
}

export default function VoiceLab() {
  const t = useTranslations("VoiceLab");
  const [voicePreset, setVoicePreset] = useState<VoicePreset>("adultMale");
  const [pitch, setPitch] = useState(300);
  const [speed, setSpeed] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  const [ttsText, setTtsText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const ttsAbortRef = useRef(false);

  const [zodiacA, setZodiacA] = useState<Zodiac>("aries");
  const [personalityA, setPersonalityA] = useState<string>("outgoing_leader");
  const [zodiacB, setZodiacB] = useState<Zodiac>("taurus");
  const [personalityB, setPersonalityB] = useState<string>("easygoing_buddy");
  const [result, setResult] = useState<CompatibilityResult | null>(null);

  const [residents, setResidents] = useState<Resident[]>([]);
  const [newResidentName, setNewResidentName] = useState("");
  const [newResidentZodiac, setNewResidentZodiac] = useState<Zodiac>("aries");
  const [newResidentPersonality, setNewResidentPersonality] = useState<string>("outgoing_leader");
  const [pairingResults, setPairingResults] = useState<PairingResult[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const { entries: historyEntries, loading: historyLoading, addEntry: addHistoryEntry, deleteEntry: deleteHistoryEntry, clearAll: clearHistory } = useHistory<VoiceHistoryData>("voice");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Loading resident roster from localStorage on mount requires state initialization
    setResidents(loadResidents());
  }, []);

  useEffect(() => {
    if (residents.length > 0) {
      saveResidents(residents);
    }
  }, [residents]);

  /** Creates an AudioContext and plays a single syllable beep with the given voice config */
  function playSyllable(
    ctx: AudioContext,
    freq: number,
    startTime: number,
    duration: number,
    config: VoiceConfig
  ) {
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = config.waveType;
    osc.frequency.value = freq;

    if (config.vibrato) {
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = config.vibratoRate;
      lfoGain.gain.value = config.vibratoDepth;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start(startTime);
      lfo.stop(startTime + duration);
    }

    filter.type = "lowpass";
    filter.frequency.value = config.filterFreq;

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(config.gain, startTime + config.attackTime);
    gain.gain.setValueAtTime(config.gain, startTime + duration - config.releaseTime);
    gain.gain.linearRampToValueAtTime(0, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  /** Plays a synthesized 8-bit style tone using the selected voice preset and saves to history */
  const playVoice = useCallback(() => {
    if (isPlaying) {
      oscillatorRef.current?.stop();
      oscillatorRef.current = null;
      setIsPlaying(false);
      return;
    }

    const config = VOICE_PRESETS[voicePreset];
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const effectiveFreq = voicePreset === "child" ? Math.max(pitch, 500) : pitch;

    playSyllable(ctx, effectiveFreq, ctx.currentTime, 0.5 / speed, config);

    setIsPlaying(true);
    setTimeout(() => {
      oscillatorRef.current = null;
      setIsPlaying(false);
    }, 500 / speed + 50);

    addHistoryEntry({
      action: "voice",
      voicePreset,
      pitch,
      speed,
      ttsText: "",
    });
  }, [pitch, speed, voicePreset, isPlaying, addHistoryEntry]);

  /** Plays custom TTS text character-by-character using the selected voice preset and saves to history */
  async function handleTTS() {
    if (!ttsText.trim()) return;

    if (isSpeaking) {
      ttsAbortRef.current = true;
      setIsSpeaking(false);
      return;
    }

    ttsAbortRef.current = false;
    setIsSpeaking(true);

    const config = VOICE_PRESETS[voicePreset];
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const chars = ttsText.trim().split("");
    const charDuration = 0.08 / speed;
    const gapDuration = 0.03 / speed;
    const spaceDuration = 0.12 / speed;

    let currentTime = ctx.currentTime + 0.05;

    for (let i = 0; i < chars.length; i++) {
      if (ttsAbortRef.current) break;

      const ch = chars[i];

      if (ch === " ") {
        currentTime += spaceDuration;
        continue;
      }

      const charCode = ch.charCodeAt(0);
      const freqVariation = ((charCode % 20) - 10) * 3;
      const baseFreq = voicePreset === "child" ? Math.max(pitch, 500) : pitch;
      const freq = baseFreq + freqVariation;

      playSyllable(ctx, freq, currentTime, charDuration, config);
      currentTime += charDuration + gapDuration;

      if (i % 5 === 4) {
        currentTime += gapDuration * 2;
      }
    }

    const totalDuration = (currentTime - ctx.currentTime) * 1000 + 100;
    setTimeout(() => {
      if (!ttsAbortRef.current) {
        setIsSpeaking(false);
      }
    }, totalDuration);

    addHistoryEntry({
      action: "voice",
      voicePreset,
      pitch,
      speed,
      ttsText,
    });
  }

  /** Calculates and displays the compatibility result, then saves to history */
  function handleCalculate() {
    const res = calculateCompatibility(zodiacA, zodiacB, personalityA, personalityB);
    setResult(res);
    addHistoryEntry({
      action: "compatibility",
      voicePreset,
      pitch,
      speed,
      zodiacA,
      zodiacB,
      personalityA,
      personalityB,
      romance: res.romance,
      friendship: res.friendship,
    });
  }

  /** Returns the appropriate comment based on the score level */
  function getComment(type: "love" | "friend", score: number): string {
    const key = type === "love" ? "loveComments" : "friendComments";
    if (score >= 70) return t(`${key}.high`);
    if (score >= 40) return t(`${key}.medium`);
    return t(`${key}.low`);
  }

  /** Adds a new resident to the roster */
  function handleAddResident() {
    if (!newResidentName.trim()) return;
    if (residents.length >= MAX_RESIDENTS) return;

    const newResident: Resident = {
      id: generateId(),
      name: newResidentName.trim(),
      zodiac: newResidentZodiac,
      personality: newResidentPersonality,
    };

    const updated = [...residents, newResident];
    setResidents(updated);
    saveResidents(updated);
    setNewResidentName("");
    setPairingResults([]);
    setShowLeaderboard(false);
  }

  /** Removes a resident from the roster by ID */
  function handleRemoveResident(id: string) {
    const updated = residents.filter((r) => r.id !== id);
    setResidents(updated);
    saveResidents(updated);
    setPairingResults([]);
    setShowLeaderboard(false);
  }

  /** Clears all residents from the roster */
  function handleClearAll() {
    setResidents([]);
    setPairingResults([]);
    setShowLeaderboard(false);
    localStorage.removeItem(STORAGE_KEY);
  }

  /** Calculates all pairings among residents and shows the leaderboard */
  function handleCalculateAll() {
    if (residents.length < 2) return;

    const results: PairingResult[] = [];

    for (let i = 0; i < residents.length; i++) {
      for (let j = i + 1; j < residents.length; j++) {
        const compat = calculateCompatibility(
          residents[i].zodiac,
          residents[j].zodiac,
          residents[i].personality,
          residents[j].personality
        );
        results.push({
          residentA: residents[i],
          residentB: residents[j],
          romance: compat.romance,
          friendship: compat.friendship,
        });
      }
    }

    setPairingResults(results);
    setShowLeaderboard(true);
  }

  /** Renders the personality coordinate matrix SVG */
  function renderPersonalityGrid() {
    const currentPersonality = personalityA;
    const group = getPersonalityGroup(currentPersonality);
    const pos = getGroupPosition(group);
    const color = getGroupColor(group);

    const groups: PersonalityGroup[] = ["outgoing", "confident", "independent", "easygoing"];
    const groupLabels: Record<PersonalityGroup, string> = {
      outgoing: t("gridOutgoing"),
      confident: t("gridConfident"),
      independent: t("gridIndependent"),
      easygoing: t("gridEasygoing"),
    };
    const groupPositions: Record<PersonalityGroup, { x: number; y: number }> = {
      outgoing: { x: 75, y: 25 },
      confident: { x: 75, y: 75 },
      independent: { x: 25, y: 75 },
      easygoing: { x: 25, y: 25 },
    };

    return (
      <div className="mt-4 flex justify-center">
        <svg viewBox="0 0 150 150" className="h-48 w-48 sm:h-56 sm:w-56">
          <line x1="75" y1="10" x2="75" y2="140" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="10" y1="75" x2="140" y2="75" stroke="#e5e7eb" strokeWidth="1" />

          <text x="75" y="8" textAnchor="middle" className="text-[6px] fill-gray-400" fontSize="6">
            ↕
          </text>
          <text x="142" y="78" textAnchor="start" className="text-[6px] fill-gray-400" fontSize="6">
            →
          </text>

          {groups.map((g) => {
            const gp = groupPositions[g];
            const isCurrent = g === group;
            return (
              <g key={g}>
                <rect
                  x={g === "outgoing" || g === "confident" ? 76 : 10}
                  y={g === "outgoing" || g === "easygoing" ? 11 : 76}
                  width="64"
                  height="64"
                  fill={isCurrent ? color : "#f9fafb"}
                  fillOpacity={isCurrent ? 0.15 : 1}
                  rx="4"
                  stroke={isCurrent ? color : "#e5e7eb"}
                  strokeWidth={isCurrent ? 1.5 : 0.5}
                />
                <text
                  x={gp.x}
                  y={gp.y - 8}
                  textAnchor="middle"
                  fontSize="7"
                  fontWeight={isCurrent ? "bold" : "normal"}
                  fill={isCurrent ? color : "#9ca3af"}
                >
                  {groupLabels[g]}
                </text>
              </g>
            );
          })}

          <circle cx={pos.x} cy={pos.y} r="6" fill={color} stroke="white" strokeWidth="2" />
          <circle cx={pos.x} cy={pos.y} r="10" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.4">
            <animate attributeName="r" from="8" to="16" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" from="0.4" to="0" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    );
  }

  /** Renders the relationship leaderboard section */
  function renderLeaderboard() {
    if (residents.length < 2) {
      return (
        <p className="py-6 text-center text-sm text-gray-400">
          {t("noPairings")}
        </p>
      );
    }

    if (!showLeaderboard || pairingResults.length === 0) {
      return (
        <div className="py-4 text-center">
          <button
            onClick={handleCalculateAll}
            className="rounded-2xl bg-sunshine px-8 py-3 font-mono text-base font-bold text-gray-900 shadow-sm transition-all hover:shadow-md active:scale-95"
          >
            {t("calculateAll")}
          </button>
        </div>
      );
    }

    const sortedByRomance = [...pairingResults].sort((a, b) => b.romance - a.romance);
    const sortedByClash = [...pairingResults].sort((a, b) => a.romance - b.romance);

    const topSoulmates = sortedByRomance.slice(0, 3);
    const topRivals = sortedByClash.slice(0, 3);

    return (
      <div className="space-y-5">
        <div>
          <h4 className="mb-3 font-mono text-sm font-bold text-pink-600">
            {t("topSoulmates")}
          </h4>
          <div className="space-y-2">
            {topSoulmates.map((pair, idx) => (
              <div
                key={`soul-${idx}`}
                className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 p-3"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-400 text-xs font-bold text-white">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-gray-800">
                    {pair.residentA.name} & {pair.residentB.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-sm font-bold text-pink-500">
                    ❤️ {pair.romance}%
                  </span>
                  <span className="ml-2 font-mono text-xs text-blue-500">
                    🤝 {pair.friendship}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-3 font-mono text-sm font-bold text-red-600">
            {t("topRivals")}
          </h4>
          <div className="space-y-2">
            {topRivals.map((pair, idx) => (
              <div
                key={`rival-${idx}`}
                className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-red-50 to-orange-50 p-3"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-400 text-xs font-bold text-white">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-gray-800">
                    {pair.residentA.name} & {pair.residentB.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-sm font-bold text-red-500">
                    💔 {pair.romance}%
                  </span>
                  <span className="ml-2 font-mono text-xs text-blue-500">
                    🤝 {pair.friendship}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleCalculateAll}
          className="w-full rounded-xl bg-gray-100 py-2 text-sm font-semibold text-gray-600 transition-all hover:bg-gray-200 active:scale-95"
        >
          {t("calculateAll")}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 font-mono text-xl font-bold text-gray-900 sm:text-2xl">
        {t("title")}
      </h2>

      <section className="mb-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="mb-4 font-mono text-base font-bold text-gray-900">
          {t("voiceSection")}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              🎤 {t("voicePreset")}
            </label>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["adultMale", t("presetAdultMale")],
                  ["adultFemale", t("presetAdultFemale")],
                  ["elder", t("presetElder")],
                  ["child", t("presetChild")],
                  ["robot", t("presetRobot")],
                ] as [VoicePreset, string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setVoicePreset(key)}
                  className={`rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                    voicePreset === key
                      ? "border-island-blue bg-island-blue/10 text-gray-900 shadow-sm"
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                {t("pitch")}
              </label>
              <span className="font-mono text-xs text-gray-500">{pitch}Hz</span>
            </div>
            <input
              type="range"
              min="100"
              max="800"
              value={pitch}
              onChange={(e) => setPitch(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                {t("speed")}
              </label>
              <span className="font-mono text-xs text-gray-500">{speed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="5"
              max="20"
              value={Math.round(speed * 10)}
              onChange={(e) => setSpeed(Number(e.target.value) / 10)}
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <button
            onClick={playVoice}
            className={`flex h-16 w-16 items-center justify-center rounded-full font-mono text-lg font-bold shadow-md transition-all active:scale-95 ${
              isPlaying
                ? "bg-red-400 text-white"
                : "bg-sunshine text-gray-900 hover:shadow-lg"
            }`}
          >
            {isPlaying ? "⏹" : "▶"}
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-gray-500">
          {isPlaying ? t("stopBtn") : t("playBtn")}
        </p>
      </section>

      <section className="mb-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="mb-4 font-mono text-base font-bold text-gray-900">
          {t("ttsSection")}
        </h3>

        <div className="space-y-3">
          <input
            type="text"
            value={ttsText}
            onChange={(e) => setTtsText(e.target.value)}
            placeholder={t("ttsInput")}
            maxLength={100}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-island-blue"
          />
          <button
            onClick={handleTTS}
            disabled={!ttsText.trim()}
            className={`w-full rounded-xl py-2.5 text-sm font-semibold shadow-sm transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${
              isSpeaking
                ? "bg-red-400 text-white"
                : "bg-island-blue text-white hover:shadow-md"
            }`}
          >
            {isSpeaking ? t("ttsStop") : t("ttsSpeak")}
          </button>
        </div>
      </section>

      <section className="mb-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="mb-4 font-mono text-base font-bold text-gray-900">
          {t("calcSection")}
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <p className="mb-3 font-mono text-sm font-bold text-gray-800">
              {t("residentA")}
            </p>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  {t("selectZodiac")}
                </label>
                <select
                  value={zodiacA}
                  onChange={(e) => setZodiacA(e.target.value as Zodiac)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-island-blue"
                >
                  {zodiacOrder.map((z) => (
                    <option key={z} value={z}>
                      {t(`zodiacs.${z}`)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  {t("selectPersonality")}
                </label>
                <select
                  value={personalityA}
                  onChange={(e) => setPersonalityA(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-island-blue"
                >
                  {PERSONALITIES.map((p) => (
                    <option key={p} value={p}>
                      {t(`personalities.${p}`)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <p className="mb-3 font-mono text-sm font-bold text-gray-800">
              {t("residentB")}
            </p>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  {t("selectZodiac")}
                </label>
                <select
                  value={zodiacB}
                  onChange={(e) => setZodiacB(e.target.value as Zodiac)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-island-blue"
                >
                  {zodiacOrder.map((z) => (
                    <option key={z} value={z}>
                      {t(`zodiacs.${z}`)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  {t("selectPersonality")}
                </label>
                <select
                  value={personalityB}
                  onChange={(e) => setPersonalityB(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-island-blue"
                >
                  {PERSONALITIES.map((p) => (
                    <option key={p} value={p}>
                      {t(`personalities.${p}`)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <button
            onClick={handleCalculate}
            className="rounded-2xl bg-sunshine px-8 py-3 font-mono text-base font-bold text-gray-900 shadow-sm transition-all hover:shadow-md active:scale-95"
          >
            {t("calcBtn")}
          </button>
        </div>

        {result && (
          <div className="mt-6 space-y-4">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900">
                  {t("loveIndex")}
                </span>
                <span className="font-mono text-lg font-bold text-pink-500">
                  {result.romance}%
                </span>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-pink-400 to-pink-500 transition-all duration-700"
                  style={{ width: `${result.romance}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {getComment("love", result.romance)}
              </p>
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900">
                  {t("friendIndex")}
                </span>
                <span className="font-mono text-lg font-bold text-island-blue">
                  {result.friendship}%
                </span>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-island-blue to-blue-400 transition-all duration-700"
                  style={{ width: `${result.friendship}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {getComment("friend", result.friendship)}
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="mb-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="mb-4 font-mono text-base font-bold text-gray-900">
          {t("personalityGrid")}
        </h3>

        <div className="mb-3">
          <select
            value={personalityA}
            onChange={(e) => setPersonalityA(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-island-blue"
          >
            {PERSONALITIES.map((p) => (
              <option key={p} value={p}>
                {t(`personalities.${p}`)}
              </option>
            ))}
          </select>
        </div>

        {renderPersonalityGrid()}

        <div className="mt-3 flex flex-wrap justify-center gap-3">
          {(["outgoing", "confident", "independent", "easygoing"] as PersonalityGroup[]).map((g) => (
            <div key={g} className="flex items-center gap-1.5">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: getGroupColor(g) }}
              />
              <span className="text-xs text-gray-600">
                {t(`grid${g.charAt(0).toUpperCase() + g.slice(1)}` as "gridOutgoing" | "gridConfident" | "gridIndependent" | "gridEasygoing")}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="mb-4 font-mono text-base font-bold text-gray-900">
          {t("leaderboard")}
        </h3>

        <div className="mb-4 space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={newResidentName}
              onChange={(e) => setNewResidentName(e.target.value)}
              placeholder={t("residentNamePlaceholder")}
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-island-blue"
            />
            <select
              value={newResidentZodiac}
              onChange={(e) => setNewResidentZodiac(e.target.value as Zodiac)}
              className="rounded-lg border border-gray-200 bg-white px-2 py-2 text-sm outline-none focus:border-island-blue"
            >
              {zodiacOrder.map((z) => (
                <option key={z} value={z}>
                  {t(`zodiacs.${z}`)}
                </option>
              ))}
            </select>
            <select
              value={newResidentPersonality}
              onChange={(e) => setNewResidentPersonality(e.target.value)}
              className="hidden rounded-lg border border-gray-200 bg-white px-2 py-2 text-sm outline-none focus:border-island-blue sm:block"
            >
              {PERSONALITIES.map((p) => (
                <option key={p} value={p}>
                  {t(`personalities.${p}`)}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:hidden">
            <select
              value={newResidentPersonality}
              onChange={(e) => setNewResidentPersonality(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-island-blue"
            >
              {PERSONALITIES.map((p) => (
                <option key={p} value={p}>
                  {t(`personalities.${p}`)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddResident}
              disabled={!newResidentName.trim() || residents.length >= MAX_RESIDENTS}
              className="flex-1 rounded-xl bg-island-blue py-2 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t("addResident")} ({residents.length}/{MAX_RESIDENTS})
            </button>
            {residents.length > 0 && (
              <button
                onClick={handleClearAll}
                className="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-500 transition-all hover:bg-red-100 active:scale-95"
              >
                {t("clearAll")}
              </button>
            )}
          </div>
        </div>

        {residents.length > 0 && (
          <div className="mb-4 max-h-72 space-y-2 overflow-y-auto">
            {residents.map((r) => {
              const group = getPersonalityGroup(r.personality);
              const groupColor = getGroupColor(group);
              return (
                <div
                  key={r.id}
                  className="flex items-center gap-3 rounded-xl bg-gray-50 p-3"
                >
                  <span
                    className="h-3 w-3 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: groupColor }}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-gray-800">{r.name}</span>
                    <span className="ml-2 text-xs text-gray-400">
                      {t(`zodiacs.${r.zodiac}`)} · {t(`personalities.${r.personality}`)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveResident(r.id)}
                    className="flex-shrink-0 rounded-lg px-2 py-1 text-xs text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    {t("removeResident")}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {renderLeaderboard()}
      </section>

      <HistoryPanel
        entries={historyEntries}
        loading={historyLoading}
        onDelete={deleteHistoryEntry}
        onClearAll={clearHistory}
        renderEntry={(entry) => {
          const d = entry.data;
          if (d.action === "compatibility") {
            return (
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  ❤️ {d.romance}% · 🤝 {d.friendship}%
                </p>
                <p className="text-xs text-gray-500">
                  {t(`zodiacs.${d.zodiacA as Zodiac}`)} & {t(`zodiacs.${d.zodiacB as Zodiac}`)} · {d.pitch}Hz · {d.speed.toFixed(1)}x
                </p>
              </div>
            );
          }
          return (
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {d.ttsText
                  ? `🔊 "${d.ttsText.length > 20 ? d.ttsText.slice(0, 20) + "…" : d.ttsText}"`
                  : "🔊 " + t("voiceSection")}
              </p>
              <p className="text-xs text-gray-500">
                {t(`preset${d.voicePreset.charAt(0).toUpperCase() + d.voicePreset.slice(1)}` as "presetAdultMale" | "presetAdultFemale" | "presetElder" | "presetChild" | "presetRobot")} · {d.pitch}Hz · {d.speed.toFixed(1)}x
              </p>
            </div>
          );
        }}
      />
    </div>
  );
}
