"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  ChevronDown, ArrowRight, Sparkles, Users, Heart, Star, Zap, Crown, Shield,
  Search, Info, Download, Upload, Trash2, Plus, Dice5, X, Save, RefreshCw,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  calculateCompatibility,
  type Zodiac,
  type PersonalityGroup,
} from "@/lib/compatibility";
import {
  PERSONALITIES,
  ZODIAC_ORDER,
  getPersonalityGroup,
  getMbtiCode,
  type MiiCharacter,
  LEGACY_STORAGE_KEYS,
} from "@/lib/types";
import {
  loadCharactersSync,
  saveCharactersSync,
} from "@/lib/character-db";
import {
  getGroupPosition,
  getGroupColor,
} from "@/lib/personality-data";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BASE = "https://lifesimgrid.org";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PersonalityType {
  id: string;
  gameName: string;
  mbti: string;
  traits: string;
  group: PersonalityGroup;
}

type CompatibilityResultNew = ReturnType<typeof calculateCompatibility>;

/** Uses the unified MiiCharacter type from lib/types.ts */
type Resident = MiiCharacter;

interface PairingResult {
  residentA: Resident;
  residentB: Resident;
  romance: number;
  friendship: number;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

// PERSONALITIES and MBTI mapping now imported from lib/types.ts
// Storage now handled by lib/character-db.ts (IndexedDB + localStorage fallback)
const MAX_RESIDENTS = 15;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Load residents from unified storage (localStorage sync fallback) */
function loadResidents(): Resident[] {
  return loadCharactersSync();
}

/** Save residents to unified storage (localStorage sync fallback) */
function saveResidents(residents: Resident[]) {
  saveCharactersSync(residents);
}

/** Generate unique ID */
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// getGroupPosition and getGroupColor now imported from lib/personality-data.ts

/** Convert 4-dimension sliders to MBTI result based on Living the Dream's system.
 *
 * Living the Dream uses 4 personality-determining dimensions:
 *   Movement, Speech, Energy, Thinking
 *
 * Each dimension maps to one MBTI axis (binary high/low = 2^4 = 16):
 *   Movement → E/I (high=E, low=I)  → determines outgoing vs independent group
 *   Energy   → S/N (high=S, low=N)  → distinguishes sub-types within group
 *   Speech   → T/F (high=T, low=F)  → determines confident vs easygoing pair
 *   Thinking → J/P (high=J, low=P)  → distinguishes sub-types within pair
 */
function sliderToMbti(sliders: { movement: number; speech: number; energy: number; thinking: number }) {
  const isE = sliders.movement > 50;        // E vs I
  const isS = sliders.energy > 50;          // S vs N
  const isT = sliders.speech > 50;          // T vs F
  const isJ = sliders.thinking > 50;        // J vs P

  let group: PersonalityGroup;
  let gamePersonality: string;

  // E + S + T + J → ESTJ → outgoing_leader
  // E + S + T + P → ESTP → confident_adventurer
  // E + S + F + J → ESFJ → outgoing_optimist
  // E + S + F + P → ESFP → outgoing_entertainer
  // E + N + T + J → ENTJ → confident_goGetter
  // E + N + T + P → ENTP → confident_charmer
  // E + N + F + J → ENFJ → (no direct match; closest: outgoing_trendsetter ENFP)
  // E + N + F + P → ENFP → outgoing_trendsetter
  // I + S + T + J → ISTJ → independent_loneWolf
  // I + S + T + P → ISTP → independent_thinker
  // I + S + F + J → ISFJ → easygoing_sweetheart
  // I + S + F + P → ISFP → easygoing_buddy
  // I + N + T + J → INTJ → confident_designer
  // I + N + T + P → INTP → independent_freeSpirit
  // I + N + F + J → INFJ → easygoing_dreamer
  // I + N + F + P → INFP → independent_artist (or easygoing_softie)

  if (isE && isS && isT && isJ) {
    group = "outgoing"; gamePersonality = "outgoing_leader";
  } else if (isE && isS && isT && !isJ) {
    group = "confident"; gamePersonality = "confident_adventurer";
  } else if (isE && isS && !isT && isJ) {
    group = "outgoing"; gamePersonality = "outgoing_optimist";
  } else if (isE && isS && !isT && !isJ) {
    group = "outgoing"; gamePersonality = "outgoing_entertainer";
  } else if (isE && !isS && isT && isJ) {
    group = "confident"; gamePersonality = "confident_goGetter";
  } else if (isE && !isS && isT && !isJ) {
    group = "confident"; gamePersonality = "confident_charmer";
  } else if (isE && !isS && !isT && isJ) {
    // ENFJ — not in MBTI_MAP; map to closest: outgoing_trendsetter (ENFP)
    group = "outgoing"; gamePersonality = "outgoing_trendsetter";
  } else if (isE && !isS && !isT && !isJ) {
    group = "outgoing"; gamePersonality = "outgoing_trendsetter";
  } else if (!isE && isS && isT && isJ) {
    group = "independent"; gamePersonality = "independent_loneWolf";
  } else if (!isE && isS && isT && !isJ) {
    group = "independent"; gamePersonality = "independent_thinker";
  } else if (!isE && isS && !isT && isJ) {
    group = "easygoing"; gamePersonality = "easygoing_sweetheart";
  } else if (!isE && isS && !isT && !isJ) {
    group = "easygoing"; gamePersonality = "easygoing_buddy";
  } else if (!isE && !isS && isT && isJ) {
    group = "confident"; gamePersonality = "confident_designer";
  } else if (!isE && !isS && isT && !isJ) {
    group = "independent"; gamePersonality = "independent_freeSpirit";
  } else if (!isE && !isS && !isT && isJ) {
    group = "easygoing"; gamePersonality = "easygoing_dreamer";
  } else {
    // !isE && !isS && !isT && !isJ → INFP → independent_artist
    group = "independent"; gamePersonality = "independent_artist";
  }

  return { mbti: getMbtiCode(gamePersonality), group, gamePersonality };
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function TomodachiLifeMbtiPage() {
  const t = useTranslations("TomodachiLifeMbtiPage");
  const tVoice = useTranslations("VoiceLab");
  const locale = useLocale();

  /* ---- Tab state ---- */
  const [activeTab, setActiveTab] = useState<"calc" | "chart" | "guide" | "tool" | "fan-map" | "roster">("calc");
  const [guideSelected, setGuideSelected] = useState<string>("outgoing_leader");

  /* ---- Compatibility Calculator state ---- */
  const [zodiacA, setZodiacA] = useState<Zodiac>("aries");
  const [personalityA, setPersonalityA] = useState<string>("outgoing_leader");
  const [zodiacB, setZodiacB] = useState<Zodiac>("taurus");
  const [personalityB, setPersonalityB] = useState<string>("easygoing_buddy");
  const [result, setResult] = useState<CompatibilityResultNew | null>(null);

  /* ---- Resident Roster state ---- */
  const [residents, setResidents] = useState<Resident[]>(loadResidents);
  const [newResidentName, setNewResidentName] = useState("");
  const [newResidentZodiac, setNewResidentZodiac] = useState<Zodiac>("aries");
  const [newResidentPersonality, setNewResidentPersonality] = useState<string>("outgoing_leader");
  const [pairingResults, setPairingResults] = useState<PairingResult[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResidentId, setSelectedResidentId] = useState<string | null>(null);
  const [editingResident, setEditingResident] = useState<Resident | null>(null);
  const importRef = useRef<HTMLInputElement>(null);
  const calcTabRef = useRef<HTMLDivElement>(null);

  /* ---- Slider state (4-dimension system for Living the Dream) ---- */
  const [sliders, setSliders] = useState({
    movement: 50, speech: 50, energy: 50, thinking: 50,
  });

  /* ---- Hero search state ---- */
  const [heroSearch, setHeroSearch] = useState("");
  const [searchError, setSearchError] = useState("");

  /* ---- Persist residents ---- */
  useEffect(() => {
    if (residents.length > 0) saveResidents(residents);
    else localStorage.removeItem(LEGACY_STORAGE_KEYS.mbtiResidents);
  }, [residents]);

  /* ---- Personality data ---- */
  const personalityData: PersonalityType[] = useMemo(() => [
    { id: "leader", gameName: t("personalityLeader"), mbti: "ESTJ", traits: t("traitsLeader"), group: "outgoing" },
    { id: "entertainer", gameName: t("personalityEntertainer"), mbti: "ESFP", traits: t("traitsEntertainer"), group: "outgoing" },
    { id: "trendsetter", gameName: t("personalityTrendsetter"), mbti: "ENFP", traits: t("traitsTrendsetter"), group: "outgoing" },
    { id: "optimist", gameName: t("personalityOptimist"), mbti: "ESFJ", traits: t("traitsOptimist"), group: "outgoing" },
    { id: "designer", gameName: t("personalityDesigner"), mbti: "INTJ", traits: t("traitsDesigner"), group: "confident" },
    { id: "adventurer", gameName: t("personalityAdventurer"), mbti: "ESTP", traits: t("traitsAdventurer"), group: "confident" },
    { id: "goGetter", gameName: t("personalityGoGetter"), mbti: "ENTJ", traits: t("traitsGoGetter"), group: "confident" },
    { id: "charmer", gameName: t("personalityCharmer"), mbti: "ENTP", traits: t("traitsCharmer"), group: "confident" },
    { id: "artist", gameName: t("personalityArtist"), mbti: "INFP", traits: t("traitsArtist"), group: "independent" },
    { id: "freeSpirit", gameName: t("personalityFreeSpirit"), mbti: "INTP", traits: t("traitsFreeSpirit"), group: "independent" },
    { id: "thinker", gameName: t("personalityThinker"), mbti: "ISTP", traits: t("traitsThinker"), group: "independent" },
    { id: "loneWolf", gameName: t("personalityLoneWolf"), mbti: "ISTJ", traits: t("traitsLoneWolf"), group: "independent" },
    { id: "dreamer", gameName: t("personalityDreamer"), mbti: "INFJ", traits: t("traitsDreamer"), group: "easygoing" },
    { id: "sweetheart", gameName: t("personalitySweetheart"), mbti: "ISFJ", traits: t("traitsSweetheart"), group: "easygoing" },
    { id: "softie", gameName: t("personalitySoftie"), mbti: "INFP", traits: t("traitsSoftie"), group: "easygoing" },
    { id: "buddy", gameName: t("personalityBuddy"), mbti: "ISFP", traits: t("traitsBuddy"), group: "easygoing" },
  ], [t]);

  /* ---- Fan popularity data ---- */
  const fanPopularity = useMemo(() => [
    { gamePersonality: t("personalityLeader"), mbti: "ESTJ", popularity: 88, reason: t("fanReasonLeader"), group: "outgoing" as PersonalityGroup },
    { gamePersonality: t("personalityDesigner"), mbti: "INTJ", popularity: 85, reason: t("fanReasonDesigner"), group: "confident" as PersonalityGroup },
    { gamePersonality: t("personalityDreamer"), mbti: "INFJ", popularity: 90, reason: t("fanReasonDreamer"), group: "easygoing" as PersonalityGroup },
    { gamePersonality: t("personalityArtist"), mbti: "INFP", popularity: 92, reason: t("fanReasonArtist"), group: "independent" as PersonalityGroup },
    { gamePersonality: t("personalityCharmer"), mbti: "ENTP", popularity: 78, reason: t("fanReasonCharmer"), group: "confident" as PersonalityGroup },
    { gamePersonality: t("personalityEntertainer"), mbti: "ESFP", popularity: 82, reason: t("fanReasonEntertainer"), group: "outgoing" as PersonalityGroup },
    { gamePersonality: t("personalitySweetheart"), mbti: "ISFJ", popularity: 86, reason: t("fanReasonSweetheart"), group: "easygoing" as PersonalityGroup },
    { gamePersonality: t("personalityThinker"), mbti: "ISTP", popularity: 65, reason: t("fanReasonThinker"), group: "independent" as PersonalityGroup },
    { gamePersonality: t("personalityTrendsetter"), mbti: "ENFP", popularity: 80, reason: t("fanReasonTrendsetter"), group: "outgoing" as PersonalityGroup },
    { gamePersonality: t("personalityGoGetter"), mbti: "ENTJ", popularity: 70, reason: t("fanReasonGoGetter"), group: "confident" as PersonalityGroup },
    { gamePersonality: t("personalityOptimist"), mbti: "ESFJ", popularity: 75, reason: t("fanReasonOptimist"), group: "outgoing" as PersonalityGroup },
    { gamePersonality: t("personalityLoneWolf"), mbti: "ISTJ", popularity: 60, reason: t("fanReasonLoneWolf"), group: "independent" as PersonalityGroup },
    { gamePersonality: t("personalityAdventurer"), mbti: "ESTP", popularity: 72, reason: t("fanReasonAdventurer"), group: "confident" as PersonalityGroup },
    { gamePersonality: t("personalityFreeSpirit"), mbti: "INTP", popularity: 76, reason: t("fanReasonFreeSpirit"), group: "independent" as PersonalityGroup },
    { gamePersonality: t("personalitySoftie"), mbti: "INFP", popularity: 83, reason: t("fanReasonSoftie"), group: "easygoing" as PersonalityGroup },
    { gamePersonality: t("personalityBuddy"), mbti: "ISFP", popularity: 68, reason: t("fanReasonBuddy"), group: "easygoing" as PersonalityGroup },
  ], [t]);

  /* ---- Derived state ---- */
  const sliderMbtiResult = useMemo(() => sliderToMbti(sliders), [sliders]);

  const filteredResidents = useMemo(() => {
    if (!searchQuery.trim()) return residents;
    const query = searchQuery.toLowerCase();
    return residents.filter(r =>
      r.name.toLowerCase().includes(query) ||
      tVoice(`zodiacs.${r.zodiac}`).toLowerCase().includes(query) ||
      tVoice(`personalities.${r.personality}`).toLowerCase().includes(query)
    );
  }, [residents, searchQuery, tVoice]);

  const selectedResident = useMemo(() =>
    residents.find(r => r.id === selectedResidentId) || null,
    [residents, selectedResidentId]
  );

  /* ---- Load resident personality to sliders ---- */
  const handleLoadResidentToSliders = useCallback((resident: Resident) => {
    const group = getPersonalityGroup(resident.personality);
    const mbti = getMbtiCode(resident.personality);
    /* Reverse-engineer slider values from MBTI type:
     *   Movement → E/I, Speech → T/F, Energy → S/N, Thinking → J/P
     */
    const movement = mbti[0] === "E" ? 70 + Math.floor(Math.random() * 26) : 10 + Math.floor(Math.random() * 26);
    const speech = mbti[2] === "T" ? 70 + Math.floor(Math.random() * 26) : 10 + Math.floor(Math.random() * 26);
    const energy = mbti[1] === "S" ? 70 + Math.floor(Math.random() * 26) : 10 + Math.floor(Math.random() * 26);
    const thinking = mbti[3] === "J" ? 70 + Math.floor(Math.random() * 26) : 10 + Math.floor(Math.random() * 26);

    setSliders({ movement, speech, energy, thinking });
    setActiveTab("tool");
  }, []);

  /* ---- Hero search handler ---- */
  const handleHeroSearch = useCallback(() => {
    const q = heroSearch.trim();
    if (!q) { setSearchError(""); return; }
    const qUpper = q.toUpperCase();
    const found = personalityData.find(p =>
      p.mbti === qUpper ||
      p.gameName.toLowerCase() === q.toLowerCase() ||
      p.id.toLowerCase() === q.toLowerCase()
    );
    if (found) {
      const personalityKey = PERSONALITIES.find(pp => pp.includes(found.id));
      if (personalityKey) {
        setPersonalityA(personalityKey);
        setActiveTab("calc");
        setSearchError("");
        setHeroSearch("");
        /* Scroll to calc tab after state update */
        setTimeout(() => calcTabRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    } else {
      setSearchError(t("searchNotFound"));
    }
  }, [heroSearch, personalityData, t]);

  /* ---- Compatibility Calculator handlers ---- */
  function handleCalculate() {
    const res = calculateCompatibility(zodiacA, zodiacB, personalityA, personalityB);
    setResult(res);
  }

  function getComment(type: "love" | "friend", score: number): string {
    const key = type === "love" ? "loveComments" : "friendComments";
    if (score >= 70) return tVoice(`${key}.high`);
    if (score >= 40) return tVoice(`${key}.medium`);
    return tVoice(`${key}.low`);
  }

  /* ---- Resident Roster handlers ---- */
  function handleAddResident() {
    if (!newResidentName.trim() || residents.length >= MAX_RESIDENTS) return;
    const newResident: Resident = { id: generateId(), name: newResidentName.trim(), zodiac: newResidentZodiac, personality: newResidentPersonality };
    setResidents([...residents, newResident]);
    setNewResidentName("");
    setPairingResults([]);
    setShowLeaderboard(false);
  }

  function handleRemoveResident(id: string) {
    setResidents(residents.filter((r) => r.id !== id));
    setPairingResults([]);
    setShowLeaderboard(false);
    if (selectedResidentId === id) { setSelectedResidentId(null); setEditingResident(null); }
  }

  function handleClearAll() {
    setResidents([]);
    setPairingResults([]);
    setShowLeaderboard(false);
    setSelectedResidentId(null);
    setEditingResident(null);
  }

  function handleRandomResident() {
    if (residents.length >= MAX_RESIDENTS) return;
    const randomNames = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Henry", "Ivy", "Jack", "Kate", "Leo", "Mia", "Noah", "Olivia"];
    const newResident: Resident = {
      id: generateId(),
      name: `${randomNames[Math.floor(Math.random() * randomNames.length)]}${residents.length + 1}`,
      zodiac: ZODIAC_ORDER[Math.floor(Math.random() * ZODIAC_ORDER.length)],
      personality: PERSONALITIES[Math.floor(Math.random() * PERSONALITIES.length)],
    };
    setResidents([...residents, newResident]);
    setPairingResults([]);
    setShowLeaderboard(false);
  }

  function handleExportResidents() {
    const blob = new Blob([JSON.stringify(residents, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `tomodachi-residents-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleImportResidents(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          const validZodiacs = new Set(ZODIAC_ORDER);
          const validPersonalities = new Set(PERSONALITIES);
          const validResidents = imported.filter(
            (r: unknown) => {
              const item = r as { name?: string; zodiac?: string; personality?: string };
              return item && typeof item.name === "string" && item.name.trim() &&
                validZodiacs.has(item.zodiac as Zodiac) && validPersonalities.has(item.personality as typeof PERSONALITIES[number]);
            }
          ).map((r: unknown) => {
            const item = r as { id?: string; name: string; zodiac: string; personality: string };
            return {
              id: item.id || generateId(),
              name: item.name,
              zodiac: item.zodiac as Zodiac,
              personality: item.personality,
            };
          }).slice(0, MAX_RESIDENTS);
          setResidents(validResidents);
          setPairingResults([]);
          setShowLeaderboard(false);
        }
      } catch { /* invalid file */ }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function handleCalculateAll() {
    if (residents.length < 2) return;
    const results: PairingResult[] = [];
    for (let i = 0; i < residents.length; i++) {
      for (let j = i + 1; j < residents.length; j++) {
        const compat = calculateCompatibility(residents[i].zodiac, residents[j].zodiac, residents[i].personality, residents[j].personality);
        results.push({ residentA: residents[i], residentB: residents[j], romance: compat.romance, friendship: compat.friendship });
      }
    }
    setPairingResults(results);
    setShowLeaderboard(true);
  }

  function handleSaveEdit() {
    if (!editingResident) return;
    setResidents(residents.map(r => r.id === editingResident.id ? editingResident : r));
    setEditingResident(null);
  }

  /* ---- Slider handlers ---- */
function handleResetSliders() {
setSliders({ movement: 50, speech: 50, energy: 50, thinking: 50 });
  }

  const handleRandomSliders = useCallback(() => {
    setSliders({
      movement: Math.floor(Math.random() * 101),
      speech: Math.floor(Math.random() * 101),
      energy: Math.floor(Math.random() * 101),
      thinking: Math.floor(Math.random() * 101),
    });
  }, []);

  /* ---- Add current slider result to roster ---- */
  function handleAddSliderToRoster() {
    if (residents.length >= MAX_RESIDENTS) return;
    const name = `${sliderMbtiResult.mbti}-${residents.length + 1}`;
    const newResident: Resident = {
      id: generateId(),
      name,
      zodiac: ZODIAC_ORDER[Math.floor(Math.random() * ZODIAC_ORDER.length)],
      personality: sliderMbtiResult.gamePersonality,
    };
    setResidents([...residents, newResident]);
  }

  /* ---- Color helpers ---- */
  const getGroupColorFn = (group: string) => {
    switch (group) {
      case "outgoing": return "bg-amber-50 border-amber-200 text-amber-700";
      case "confident": return "bg-red-50 border-red-200 text-red-700";
      case "independent": return "bg-purple-50 border-purple-200 text-purple-700";
      case "easygoing": return "bg-green-50 border-green-200 text-green-700";
      default: return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };

  const getGroupBadgeColorFn = (group: string) => {
    switch (group) {
      case "outgoing": return "bg-amber-100 text-amber-700";
      case "confident": return "bg-red-100 text-red-700";
      case "independent": return "bg-purple-100 text-purple-700";
      case "easygoing": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  /* ---- Personality Grid SVG ---- */
  function renderPersonalityGrid(group: PersonalityGroup) {
    const pos = getGroupPosition(group);
    const color = getGroupColor(group);
    const groups: PersonalityGroup[] = ["outgoing", "confident", "independent", "easygoing"];
    const groupLabels: Record<PersonalityGroup, string> = {
      outgoing: tVoice("gridOutgoing"), confident: tVoice("gridConfident"),
      independent: tVoice("gridIndependent"), easygoing: tVoice("gridEasygoing"),
    };
    const groupPositions: Record<PersonalityGroup, { x: number; y: number }> = {
      outgoing: { x: 75, y: 25 }, confident: { x: 75, y: 75 },
      independent: { x: 25, y: 75 }, easygoing: { x: 25, y: 25 },
    };

    return (
      <div className="mt-4 flex justify-center">
        <svg viewBox="0 0 150 150" className="h-40 w-40 sm:h-48 sm:w-48">
          <line x1="75" y1="10" x2="75" y2="140" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="10" y1="75" x2="140" y2="75" stroke="#e5e7eb" strokeWidth="1" />
          {groups.map((g) => {
            const gp = groupPositions[g];
            const isCurrent = g === group;
            return (
              <g key={g}>
                <rect x={g === "outgoing" || g === "confident" ? 76 : 10} y={g === "outgoing" || g === "easygoing" ? 11 : 76} width="64" height="64"
                  fill={isCurrent ? color : "#f9fafb"} fillOpacity={isCurrent ? 0.15 : 1} rx="4"
                  stroke={isCurrent ? color : "#e5e7eb"} strokeWidth={isCurrent ? 1.5 : 0.5} />
                <text x={gp.x} y={gp.y - 8} textAnchor="middle" fontSize="7" fontWeight={isCurrent ? "bold" : "normal"} fill={isCurrent ? color : "#9ca3af"}>
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

  /* ---- Leaderboard rendering ---- */
  function renderLeaderboard() {
    if (residents.length < 2) return <p className="py-6 text-center text-sm text-gray-400">{tVoice("noPairings")}</p>;
    if (!showLeaderboard || pairingResults.length === 0) {
      return (
        <div className="py-4 text-center">
          <button onClick={handleCalculateAll} className="rounded-2xl bg-sunshine px-8 py-3 font-mono text-base font-bold text-gray-900 shadow-sm transition-all hover:shadow-md active:scale-95">
            {tVoice("calculateAll")}
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
          <h3 className="mb-3 font-mono text-sm font-bold text-pink-600">{tVoice("topSoulmates")}</h3>
          <div className="space-y-2">
            {topSoulmates.map((pair, idx) => (
              <div key={`soul-${idx}`} className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 p-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pink-400 text-xs font-bold text-white">{idx + 1}</span>
                <div className="min-w-0 flex-1"><span className="text-sm font-semibold text-gray-800 truncate block">{pair.residentA.name} & {pair.residentB.name}</span></div>
                <div className="shrink-0 text-right">
                  <span className="font-mono text-sm font-bold text-pink-500">{pair.romance}%</span>
                  <span className="ml-1 font-mono text-xs text-blue-500">{pair.friendship}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-mono text-sm font-bold text-red-600">{tVoice("topRivals")}</h3>
          <div className="space-y-2">
            {topRivals.map((pair, idx) => (
              <div key={`rival-${idx}`} className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-red-50 to-orange-50 p-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-400 text-xs font-bold text-white">{idx + 1}</span>
                <div className="min-w-0 flex-1"><span className="text-sm font-semibold text-gray-800 truncate block">{pair.residentA.name} & {pair.residentB.name}</span></div>
                <div className="shrink-0 text-right">
                  <span className="font-mono text-sm font-bold text-red-500">{pair.romance}%</span>
                  <span className="ml-1 font-mono text-xs text-blue-500">{pair.friendship}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleCalculateAll} className="w-full rounded-xl bg-gray-100 py-2 text-sm font-semibold text-gray-600 transition-all hover:bg-gray-200 active:scale-95">
          {tVoice("calculateAll")}
        </button>
      </div>
    );
  }

  /* ---- Slider rendering helper ---- */
  function renderSlider(key: keyof typeof sliders, label: string, value: number, color: string, leftLabel: string, rightLabel: string, accent: string, accentRange: string) {
    return (
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <span className={`font-mono text-sm ${accent}`}>{value}</span>
        </div>
        <input type="range" min="0" max="100" value={value}
          onChange={(e) => setSliders({ ...sliders, [key]: parseInt(e.target.value, 10) })}
          className={`w-full h-2 ${color} rounded-lg appearance-none cursor-pointer ${accentRange}`} />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      </div>
    );
  }

  /** Wrap technical terms in <code> tags for semantic HTML */
  const wrapCodeTerms = (text: string): React.ReactNode => {
    const codeTerms = ["localStorage", "MBTI", "Next.js", "Web Audio API", "Client-side",
      "ESTJ", "ESFP", "ENFP", "ESFJ", "INTJ", "ESTP", "ENTJ", "ENTP",
      "INFP", "INTP", "ISTP", "ISTJ", "INFJ", "ISFJ", "ISFP"];
    let result: (string | React.ReactElement)[] = [text];
    for (const term of codeTerms) {
      const next: (string | React.ReactElement)[] = [];
      for (const node of result) {
        if (typeof node !== "string") { next.push(node); continue; }
        const parts = node.split(term);
        if (parts.length <= 1) { next.push(node); continue; }
        for (let i = 0; i < parts.length; i++) {
          if (parts[i]) next.push(parts[i]);
          if (i < parts.length - 1) next.push(<code key={`${term}-${i}`} className="rounded bg-gray-100 px-1 py-0.5 text-xs font-mono">{term}</code>);
        }
      }
      result = next;
    }
    return <>{result}</>;
  };

  /* ---- FAQ data ---- */
  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
    { q: t("faq5Q"), a: t("faq5A") },
    { q: t("faq6Q"), a: t("faq6A") },
    { q: t("faq7Q"), a: t("faq7A") },
    { q: t("faq8Q"), a: t("faq8A") },
    { q: t("faq9Q"), a: t("faq9A") },
    { q: t("faq10Q"), a: t("faq10A") },
    { q: t("faq11Q"), a: t("faq11A") },
    { q: t("faq12Q"), a: t("faq12A") },
  ];

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* JSON-LD structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}${locale === "en" ? "/" : `/${locale}/`}` },
            { "@type": "ListItem", position: 2, name: t("pageTitle"), item: `${BASE}${locale === "en" ? "/tomodachi-life-mbti" : `/${locale}/tomodachi-life-mbti`}` },
          ],
        }).replace(/<\/script/g, "<\\/script") }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
        }).replace(/<\/script/g, "<\\/script") }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "WebApplication",
          name: t("pageTitle"), applicationCategory: "GameUtilityApplication", operatingSystem: "Any (Browser-based)",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: t("metaDescription"),
        }).replace(/<\/script/g, "<\\/script") }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "HowTo",
          name: t("howToTitle"),
          step: [
            { "@type": "HowToStep", position: 1, name: t("howToStep1Name"), text: t("howToStep1Text") },
            { "@type": "HowToStep", position: 2, name: t("howToStep2Name"), text: t("howToStep2Text") },
            { "@type": "HowToStep", position: 3, name: t("howToStep3Name"), text: t("howToStep3Text") },
          ],
        }).replace(/<\/script/g, "<\\/script") }} />

        {/* ===== 1. HERO ===== */}
        <section aria-labelledby="mbti-hero-title" className="mx-auto max-w-6xl px-4 pt-8 pb-4 sm:pt-10 sm:pb-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FFCC00]/10 px-4 py-2 mb-4">
            <Sparkles className="h-4 w-4 text-[#E6B800]" />
            <span className="text-sm font-medium text-[#B8860B]">{t("heroBadge")}</span>
          </div>
          <h1 id="mbti-hero-title" className="font-mono text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">{t("heroTitle")}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base lg:text-lg">{t("heroSubtitle")}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-xs sm:text-sm text-amber-700"><Star className="h-3.5 w-3.5 sm:h-4 sm:w-4" />{t("heroTag1")}</span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-purple-50 px-3 py-1.5 text-xs sm:text-sm text-purple-700"><Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />{t("heroTag2")}</span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-1.5 text-xs sm:text-sm text-green-700"><Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />{t("heroTag3")}</span>
          </div>
          {/* Hero search bar */}
          <div className="mt-5 mx-auto max-w-md">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => { setHeroSearch(e.target.value); setSearchError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleHeroSearch()}
                  placeholder={t("heroSearchPlaceholder")}
                  className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm outline-none focus:border-island-blue focus:ring-1 focus:ring-island-blue/20"
                />
              </div>
              <button onClick={handleHeroSearch} className="shrink-0 rounded-xl bg-island-blue px-4 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95">
                {t("heroSearchBtn")}
              </button>
            </div>
            {searchError && (
              <p className="mt-2 text-xs text-red-500 text-center">{searchError}</p>
            )}
          </div>
        </section>

        {/* ===== 1-MINUTE OVERVIEW (SEO & GEO critical) ===== */}
        <section aria-labelledby="mbti-one-min" className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="mbti-one-min" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-3">{t("oneMinTitle")}</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{t("oneMinDesc")}</p>
          </div>
        </section>

        {/* ===== WHY CHOOSE (SEO & GEO critical) ===== */}
        <section aria-labelledby="mbti-why-choose" className="mx-auto max-w-6xl px-4 pb-4 sm:pb-6">
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-indigo-50 to-purple-50 p-4 sm:p-6 shadow-sm">
            <h2 id="mbti-why-choose" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-4">{t("whyChooseTitle")}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { title: t("whyChoose1Title"), desc: t("whyChoose1Desc"), icon: Star, color: "amber" },
                { title: t("whyChoose2Title"), desc: t("whyChoose2Desc"), icon: Heart, color: "pink" },
                { title: t("whyChoose3Title"), desc: t("whyChoose3Desc"), icon: Shield, color: "green" },
                { title: t("whyChoose4Title"), desc: t("whyChoose4Desc"), icon: Zap, color: "purple" },
              ].map((item, i) => {
                const colorClasses: Record<string, string> = {
                  amber: "bg-amber-50 border-amber-100 text-amber-600",
                  pink: "bg-pink-50 border-pink-100 text-pink-600",
                  green: "bg-green-50 border-green-100 text-green-600",
                  purple: "bg-purple-50 border-purple-100 text-purple-600",
                };
                const c = colorClasses[item.color];
                return (
                  <div key={i} className="flex gap-3 rounded-xl bg-white/80 p-3 sm:p-4 border border-gray-50">
                    <div className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-lg border ${c}`}>
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                      <p className="mt-0.5 text-xs sm:text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== TAB NAVIGATION ===== */}
        <section aria-labelledby="mbti-tab-nav" className="mx-auto max-w-7xl px-4">
          <h2 id="mbti-tab-nav" className="sr-only">{t("tabChart")}</h2>
          <div className="flex justify-center gap-2 overflow-x-auto rounded-2xl border border-gray-200 bg-white p-2 sm:p-2.5 shadow-sm scrollbar-hide">
            {[
              { key: "calc", label: tVoice("calcSection"), icon: Heart, color: "pink" },
              { key: "chart", label: t("tabChart"), icon: Star, color: "amber" },
              { key: "guide", label: t("tabGuide"), icon: Info, color: "teal" },
              { key: "tool", label: t("tabTool"), icon: Zap, color: "purple" },
              { key: "fan-map", label: t("tabFanMap"), icon: Users, color: "blue" },
              { key: "roster", label: tVoice("leaderboard"), icon: Crown, color: "emerald" },
            ].map((tab) => {
              const colorMap: Record<string, { active: string; hover: string; iconActive: string; iconInactive: string }> = {
                pink:    { active: "bg-pink-50 text-pink-700 border-pink-200", hover: "hover:bg-pink-50/50", iconActive: "text-pink-500", iconInactive: "text-pink-400" },
                amber:   { active: "bg-amber-50 text-amber-700 border-amber-200", hover: "hover:bg-amber-50/50", iconActive: "text-amber-500", iconInactive: "text-amber-400" },
                purple:  { active: "bg-purple-50 text-purple-700 border-purple-200", hover: "hover:bg-purple-50/50", iconActive: "text-purple-500", iconInactive: "text-purple-400" },
                blue:    { active: "bg-blue-50 text-blue-700 border-blue-200", hover: "hover:bg-blue-50/50", iconActive: "text-blue-500", iconInactive: "text-blue-400" },
                emerald: { active: "bg-emerald-50 text-emerald-700 border-emerald-200", hover: "hover:bg-emerald-50/50", iconActive: "text-emerald-500", iconInactive: "text-emerald-400" },
                teal:    { active: "bg-teal-50 text-teal-700 border-teal-200", hover: "hover:bg-teal-50/50", iconActive: "text-teal-500", iconInactive: "text-teal-400" },
              };
              const c = colorMap[tab.color];
              const isActive = activeTab === tab.key;
              return (
                <button key={tab.key} onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-all border ${
                    isActive
                      ? `${c.active} shadow-sm`
                      : `text-gray-500 border-transparent ${c.hover} hover:text-gray-700`
                  }`}
                >
                  <tab.icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isActive ? c.iconActive : c.iconInactive}`} />{tab.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* ===== TAB CONTENT ===== */}
        <section aria-labelledby="mbti-tab-content" className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
          <h2 id="mbti-tab-content" className="sr-only">{activeTab === "calc" ? tVoice("calcSection") : activeTab === "chart" ? t("tabChart") : activeTab === "guide" ? t("tabGuide") : activeTab === "tool" ? t("tabTool") : activeTab === "fan-map" ? t("tabFanMap") : tVoice("leaderboard")}</h2>

          {/* ===== 2. MBTI MAPPING CHART TAB ===== */}
          <div className={activeTab !== "chart" ? "hidden" : ""}>
            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 shadow-sm">
                <h3 className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-3">{t("chartIntroTitle")}</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{t("chartIntroDesc")}</p>
                <p className="mt-2 text-xs text-blue-600">{t("chartNoteInfp")}</p>
                {/* Internal links for SEO */}
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <Link href="/tomodachi-voice-lab" className="inline-flex items-center gap-1 rounded-lg bg-purple-100 px-3 py-1.5 text-purple-700 hover:bg-purple-200 transition-colors">
                    {t("relatedVoiceLab")} →                  </Link>
                  <Link href="/mii-qr-unlocker" className="inline-flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-1.5 text-blue-700 hover:bg-blue-200 transition-colors">
                    {t("relatedMiiQr")} →                  </Link>
                  <Link href="/acnh-pixel-studio" className="inline-flex items-center gap-1 rounded-lg bg-green-100 px-3 py-1.5 text-green-700 hover:bg-green-200 transition-colors">
                    {t("relatedPixelGrid")} →                  </Link>
                </div>
              </div>
              {/* 16 personality cards - 2 cols on mobile, 4 on desktop */}
              <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                {personalityData.map((p) => {
                  const mbtiSlug = p.mbti.toLowerCase();
                  const personalityKey = PERSONALITIES.find(pp => pp.includes(p.id));
                  return (
                    <Link key={p.id} href={`/tomodachi-life-mbti/${mbtiSlug}`}
                      className={`rounded-xl border p-3 sm:p-4 shadow-sm transition-all hover:shadow-md cursor-pointer block ${getGroupColorFn(p.group)}`}
                    >
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className="font-mono text-base sm:text-lg font-bold">{p.mbti}</span>
                        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-70" />
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-0.5 sm:mb-1">{p.gameName}</h4>
                      <p className="text-xs text-gray-600 line-clamp-2">{p.traits}</p>
                    </Link>
                  );
                })}
              </div>
              {/* Slider Guide */}
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
                <h3 className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-4">{t("sliderGuideTitle")}</h3>
                <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                  {[
                    { title: t("slider1Title"), desc: t("slider1Desc"), e: t("slider1E"), i: t("slider1I"), bg: "bg-amber-50", eColor: "text-amber-700", iColor: "text-purple-700" },
                    { title: t("slider2Title"), desc: t("slider2Desc"), e: t("slider2T"), i: t("slider2F"), bg: "bg-red-50", eColor: "text-red-700", iColor: "text-green-700" },
                    { title: t("slider3Title"), desc: t("slider3Desc"), e: t("slider3E"), i: t("slider3I"), bg: "bg-purple-50", eColor: "text-amber-700", iColor: "text-purple-700" },
                    { title: t("slider4Title"), desc: t("slider4Desc"), e: t("slider4J"), i: t("slider4P"), bg: "bg-green-50", eColor: "text-red-700", iColor: "text-green-700" },
                  ].map((s, i) => (
                    <div key={i} className={`rounded-xl ${s.bg} p-3 sm:p-4`}>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">{s.title}</h4>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{s.desc}</p>
                      <div className="flex flex-col gap-1">
                        <span className={`text-xs font-medium ${s.eColor}`}>{s.e}</span>
                        {s.i && <span className={`text-xs font-medium ${s.iColor}`}>{s.i}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Quick Reference Table */}
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm overflow-x-auto">
                <h3 className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-4">{t("quickRefTitle")}</h3>
                <table className="w-full text-sm min-w-[500px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700">{t("quickRefMbti")}</th>
                      <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700">{t("quickRefGame")}</th>
                      <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700">{t("quickRefGroup")}</th>
                      <th className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-700">{t("quickRefSliders")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personalityData.map((p, i) => (
                      <tr key={p.id} className={`border-b border-gray-100 hover:bg-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}>
                        <td className="px-3 sm:px-4 py-2.5 font-mono font-bold text-gray-900">{p.mbti}</td>
                        <td className="px-3 sm:px-4 py-2.5 font-medium text-gray-700">{p.gameName}</td>
                        <td className="px-3 sm:px-4 py-2.5">
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getGroupBadgeColorFn(p.group)}`}>
                            {t(`group${p.group.charAt(0).toUpperCase() + p.group.slice(1)}`)}
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 py-2.5 text-gray-600 text-xs">
                          {p.mbti.includes("E") ? t("sliderFastE") : t("sliderSlowI")} / {p.mbti.includes("T") ? t("sliderDirectT") : t("sliderGentleF")} / {p.mbti.includes("J") ? t("sliderConfidentJ") : t("sliderRelaxedP")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ===== 2-B. PERSONALITY GUIDE TAB ===== */}
          <div className={activeTab !== "guide" ? "hidden" : ""}>
            <div className="space-y-6">
              {/* Guide Intro */}
              <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-teal-50 to-cyan-50 p-4 sm:p-6 shadow-sm">
                <h3 className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-3">{t("guideIntroTitle")}</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{t("guideIntroDesc")}</p>
              </div>

              {/* Interactive 4x4 Personality Grid */}
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
                <h3 className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-2">{t("guideGridTitle")}</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{t("guideGridDesc")}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {personalityData.map((p) => {
                    const personalityKey = PERSONALITIES.find(pp => pp.includes(p.id)) || "";
                    const isSelected = guideSelected === personalityKey;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setGuideSelected(personalityKey)}
                        className={`rounded-xl border p-3 text-left transition-all hover:shadow-md ${isSelected ? "ring-2 ring-teal-400 shadow-md" : ""} ${getGroupColorFn(p.group)}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-sm sm:text-base font-bold">{p.mbti}</span>
                          <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${getGroupBadgeColorFn(p.group)}`}>
                            {t(`group${p.group.charAt(0).toUpperCase() + p.group.slice(1)}`)}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900">{p.gameName}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Personality Detail Card */}
              {(() => {
                const selectedData = personalityData.find(p => {
                  const key = PERSONALITIES.find(pp => pp.includes(p.id));
                  return key === guideSelected;
                });
                if (!selectedData) return null;
                const selectedKey = selectedData.id;
                return (
                  <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-2xl sm:text-3xl font-bold" style={{ color: getGroupColor(selectedData.group) }}>{selectedData.mbti}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-base sm:text-lg">{selectedData.gameName}</h4>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getGroupBadgeColorFn(selectedData.group)}`}>
                          {t(`group${selectedData.group.charAt(0).toUpperCase() + selectedData.group.slice(1)}`)}
                        </span>
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl bg-teal-50 p-3 sm:p-4">
                        <h5 className="font-semibold text-teal-800 text-sm mb-2">{t("guideBehaviorTitle")}</h5>
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{t(`guideBehavior_${selectedKey}` as never)}</p>
                      </div>
                      <div className="rounded-xl bg-amber-50 p-3 sm:p-4">
                        <h5 className="font-semibold text-amber-800 text-sm mb-2">{t("guideStrengthsTitle")}</h5>
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{t(`guideStrengths_${selectedKey}` as never)}</p>
                      </div>
                      <div className="rounded-xl bg-rose-50 p-3 sm:p-4">
                        <h5 className="font-semibold text-rose-800 text-sm mb-2">{t("guideWeaknessesTitle")}</h5>
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{t(`guideWeaknesses_${selectedKey}` as never)}</p>
                      </div>
                      <div className="rounded-xl bg-purple-50 p-3 sm:p-4">
                        <h5 className="font-semibold text-purple-800 text-sm mb-2">{t("guideInteractionsTitle")}</h5>
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{t(`guideInteractions_${selectedKey}` as never)}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Group Interaction Matrix */}
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm overflow-x-auto">
                <h3 className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-2">{t("guideMatrixTitle")}</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{t("guideMatrixDesc")}</p>
                <table className="w-full text-sm min-w-[500px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">{t("guideMatrixGroup")}</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">{t("groupOutgoing")}</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">{t("groupConfident")}</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">{t("groupIndependent")}</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">{t("groupEasygoing")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(["outgoing", "confident", "independent", "easygoing"] as const).map((rowGroup) => (
                      <tr key={rowGroup} className="border-b border-gray-100">
                        <td className="px-3 py-2.5">
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getGroupBadgeColorFn(rowGroup)}`}>
                            {t(`group${rowGroup.charAt(0).toUpperCase() + rowGroup.slice(1)}`)}
                          </span>
                        </td>
                        {(["outgoing", "confident", "independent", "easygoing"] as const).map((colGroup) => {
                          const matrixKey = `guideMatrix_${rowGroup}_${colGroup}`;
                          return (
                            <td key={colGroup} className="px-3 py-2.5 text-xs text-gray-600">
                              {t(matrixKey as never)}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Living the Dream Rename Comparison */}
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm overflow-x-auto">
                <h3 className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-2">{t("guideRenameTitle")}</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{t("guideRenameDesc")}</p>
                <table className="w-full text-sm min-w-[500px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">{t("guideRenameOriginal")}</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">{t("guideRenameLTD")}</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">{t("quickRefMbti")}</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">{t("guideRenameNote")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {([
                      { group: "outgoing", ltd: "Outgoing", note: t("guideRenameNoteUnchanged") },
                      { group: "confident", ltd: "Ambitious", note: t("guideRenameNoteRenamed") },
                      { group: "independent", ltd: "Reserved", note: t("guideRenameNoteRenamed") },
                      { group: "easygoing", ltd: "Considerate", note: t("guideRenameNoteRenamed") },
                    ]).map((row) => {
                      const groupPersonalities = personalityData.filter(p => p.group === row.group);
                      return (
                        <tr key={row.group} className="border-b border-gray-100">
                          <td className="px-3 py-2.5">
                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getGroupBadgeColorFn(row.group)}`}>
                              {t(`group${row.group.charAt(0).toUpperCase() + row.group.slice(1)}`)}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 font-medium text-gray-700">{row.ltd}</td>
                          <td className="px-3 py-2.5 text-xs text-gray-600">{groupPersonalities.map(p => p.mbti).join(", ")}</td>
                          <td className="px-3 py-2.5 text-xs text-gray-500">{row.note}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ===== 3. INTERACTIVE CONVERTER TAB ===== */}
          <div className={activeTab !== "tool" ? "hidden" : ""}>
            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 shadow-sm">
                <h3 className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-3">{t("toolIntroTitle")}</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{t("toolIntroDesc")}</p>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Left: Sliders */}
                <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{t("toolSelectTitle")}</h3>
                    <div className="flex gap-2">
                      <button onClick={handleResetSliders} className="rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-all hover:bg-gray-200">{t("resetBtn")}</button>
                      <button onClick={handleRandomSliders} className="rounded-lg bg-amber-100 px-2.5 py-1.5 text-xs font-medium text-amber-600 transition-all hover:bg-amber-200 flex items-center gap-1"><Dice5 className="h-3 w-3" />{t("randomBtn")}</button>
                    </div>
                  </div>
                  <div className="space-y-5">
{renderSlider("movement", t("slider1Title"), sliders.movement, "bg-amber-200", t("sliderSlowI"), t("sliderFastE"), "text-amber-600", "accent-amber-600")}
{renderSlider("speech", t("slider2Title"), sliders.speech, "bg-red-200", t("sliderGentleF"), t("sliderDirectT"), "text-red-600", "accent-red-600")}
{renderSlider("energy", t("slider3Title"), sliders.energy, "bg-purple-200", t("sliderCalmI"), t("sliderUpbeatE"), "text-purple-600", "accent-purple-600")}
{renderSlider("thinking", t("slider4Title"), sliders.thinking, "bg-green-200", t("sliderRelaxedP"), t("sliderConfidentJ"), "text-green-600", "accent-green-600")}
                  </div>
                </div>
                {/* Right: Result */}
                <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-4">{t("toolResultTitle")}</h3>
                  <div className="space-y-4">
                    <div className={`rounded-xl p-4 ${getGroupColorFn(sliderMbtiResult.group)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">{t("toolMbtiMatch")}</span>
                        <span className="font-mono text-2xl sm:text-3xl font-bold" style={{ color: getGroupColor(sliderMbtiResult.group) }}>
                          {sliderMbtiResult.mbti}
                        </span>
                      </div>
                      <div className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                        {tVoice(`personalities.${sliderMbtiResult.gamePersonality}`)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {tVoice(`grid${sliderMbtiResult.group.charAt(0).toUpperCase() + sliderMbtiResult.group.slice(1)}`)}
                      </div>
                    </div>
                    {/* Personality Grid */}
                    <div className="rounded-xl bg-gray-50 p-4">
                      <h3 className="font-medium text-gray-800 mb-2 text-sm">{t("personalityGrid")}</h3>
                      {renderPersonalityGrid(sliderMbtiResult.group)}
                      <div className="mt-3 flex flex-wrap justify-center gap-2 sm:gap-3">
                        {(["outgoing", "confident", "independent", "easygoing"] as PersonalityGroup[]).map((g) => (
                          <div key={g} className="flex items-center gap-1.5">
                            <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: getGroupColor(g) }} />
                            <span className="text-xs text-gray-600">{tVoice(`grid${g.charAt(0).toUpperCase() + g.slice(1)}`)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Compatibility Suggestions */}
                    <div className="rounded-xl bg-green-50 p-4">
                      <h3 className="font-medium text-green-800 mb-2 text-sm">{t("toolSuggestions")}</h3>
                      <ul className="space-y-2">
                        {sliderMbtiResult.mbti.includes("E") ? (
                          <>
                            <li className="flex items-start gap-2 text-sm text-green-700"><span className="text-green-500 shrink-0">•</span>{t("compatSuggestE1")}</li>
                            <li className="flex items-start gap-2 text-sm text-green-700"><span className="text-green-500 shrink-0">•</span>{t("compatSuggestE2")}</li>
                            <li className="flex items-start gap-2 text-sm text-green-700"><span className="text-green-500 shrink-0">•</span>{t("compatSuggestE3")}</li>
                          </>
                        ) : (
                          <>
                            <li className="flex items-start gap-2 text-sm text-green-700"><span className="text-green-500 shrink-0">•</span>{t("compatSuggestI1")}</li>
                            <li className="flex items-start gap-2 text-sm text-green-700"><span className="text-green-500 shrink-0">•</span>{t("compatSuggestI2")}</li>
                            <li className="flex items-start gap-2 text-sm text-green-700"><span className="text-green-500 shrink-0">•</span>{t("compatSuggestI3")}</li>
                          </>
                        )}
                      </ul>
                    </div>
                    {/* Add to roster button */}
                    <button onClick={handleAddSliderToRoster} className="w-full rounded-xl bg-island-blue/10 py-2.5 text-sm font-semibold text-island-blue transition-all hover:bg-island-blue/20 active:scale-95 flex items-center justify-center gap-2">
                      <Plus className="h-4 w-4" />{t("addToRoster")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== 6. FAN POPULARITY MAP TAB ===== */}
          <div className={activeTab !== "fan-map" ? "hidden" : ""}>
            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-pink-50 to-rose-50 p-4 sm:p-6 shadow-sm">
                <h3 className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-3">{t("fanMapTitle")}</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{t("fanMapDesc")}</p>
              </div>
              {/* Heat map cards - 2 cols on mobile, 4 on desktop */}
              <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                {fanPopularity.map((item, i) => {
                  const intensity = item.popularity / 100;
                  const groupColors: Record<string, string[]> = {
                    outgoing: ["#fef3c7", "#fde68a", "#fcd34d", "#fbbf24", "#f59e0b"],
                    confident: ["#fee2e2", "#fecaca", "#fca5a5", "#f87171", "#ef4444"],
                    independent: ["#f3e8ff", "#e9d5ff", "#d8b4fe", "#c084fc", "#8b5cf6"],
                    easygoing: ["#dcfce7", "#bbf7d0", "#86efac", "#4ade80", "#22c55e"],
                  };
                  const colors = groupColors[item.group] || groupColors.outgoing;
                  const colorIndex = Math.floor(intensity * (colors.length - 1));
                  return (
                    <div key={i} className="rounded-xl p-3 sm:p-4 shadow-sm transition-all hover:shadow-md"
                      style={{ backgroundColor: colors[colorIndex], border: `1px solid ${colors[Math.min(colorIndex + 1, colors.length - 1)]}` }}
                    >
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className={`inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full text-[10px] sm:text-xs font-bold ${
                          i === 0 ? "bg-yellow-400 text-yellow-900" :
                          i === 1 ? "bg-gray-300 text-gray-700" :
                          i === 2 ? "bg-amber-600 text-amber-100" :
                          "bg-white/50 text-gray-600"
                        }`}>{i + 1}</span>
                        <span className="font-mono text-base sm:text-lg font-bold text-gray-800">{item.mbti}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.gamePersonality}</h4>
                      <div className="flex items-center gap-2 mb-1 sm:mb-2">
                        <div className="flex-1 h-1.5 sm:h-2 bg-white/50 rounded-full overflow-hidden">
                          <div className="h-full bg-white/80 rounded-full" style={{ width: `${item.popularity}%` }} />
                        </div>
                        <span className="text-[10px] sm:text-xs font-medium text-gray-700">{item.popularity}%</span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed line-clamp-3">{item.reason}</p>
                    </div>
                  );
                })}
              </div>
              {/* Community insights */}
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="rounded-xl bg-amber-50 p-3 sm:p-4">
                  <h3 className="font-semibold text-amber-800 mb-1 text-sm">{t("communityInsight1Title")}</h3>
                  <p className="text-xs sm:text-sm text-amber-700">{t("communityInsight1Desc")}</p>
                </div>
                <div className="rounded-xl bg-purple-50 p-3 sm:p-4">
                  <h3 className="font-semibold text-purple-800 mb-1 text-sm">{t("communityInsight2Title")}</h3>
                  <p className="text-xs sm:text-sm text-purple-700">{t("communityInsight2Desc")}</p>
                </div>
                <div className="rounded-xl bg-green-50 p-3 sm:p-4">
                  <h3 className="font-semibold text-green-800 mb-1 text-sm">{t("communityInsight3Title")}</h3>
                  <p className="text-xs sm:text-sm text-green-700">{t("communityInsight3Desc")}</p>
                </div>
                <div className="rounded-xl bg-blue-50 p-3 sm:p-4">
                  <h3 className="font-semibold text-blue-800 mb-1 text-sm">{t("communityInsight4Title")}</h3>
                  <p className="text-xs sm:text-sm text-blue-700">{t("communityInsight4Desc")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ===== 1. COMPATIBILITY CALCULATOR TAB (default) ===== */}
          <div ref={calcTabRef} className={activeTab !== "calc" ? "hidden" : ""}>
            <div className="space-y-6">
              {/* CTA: Point to dedicated Personality Calculator page */}
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <p className="text-sm text-amber-800">{t("personalityCalculatorCta")}</p>
                </div>
                <Link href="/tomodachi-life-personality-calculator" className="shrink-0 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-amber-600">
                  {t("personalityCalculatorBtn")}
                </Link>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-pink-50 to-purple-50 p-4 sm:p-6 shadow-sm">
                <h3 className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-3">{tVoice("calcSection")}</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{tVoice("calcSectionDesc")}</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Resident A */}
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 sm:p-4">
                    <p className="mb-3 font-mono text-sm font-bold text-gray-800">{tVoice("residentA")}</p>
                    <div className="space-y-3">
                      <div>
                        <label className="mb-1 block text-xs text-gray-500">{tVoice("selectZodiac")}</label>
                        <select value={zodiacA} onChange={(e) => setZodiacA(e.target.value as Zodiac)}
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-island-blue"
                        >
                          {ZODIAC_ORDER.map((z) => <option key={z} value={z}>{tVoice(`zodiacs.${z}`)}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-gray-500">{tVoice("selectPersonality")}</label>
                        <select value={personalityA} onChange={(e) => setPersonalityA(e.target.value)}
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-island-blue"
                        >
                          {PERSONALITIES.map((p) => <option key={p} value={p}>{tVoice(`personalities.${p}`)} ({getMbtiCode(p)})</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* Resident B */}
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 sm:p-4">
                    <p className="mb-3 font-mono text-sm font-bold text-gray-800">{tVoice("residentB")}</p>
                    <div className="space-y-3">
                      <div>
                        <label className="mb-1 block text-xs text-gray-500">{tVoice("selectZodiac")}</label>
                        <select value={zodiacB} onChange={(e) => setZodiacB(e.target.value as Zodiac)}
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-island-blue"
                        >
                          {ZODIAC_ORDER.map((z) => <option key={z} value={z}>{tVoice(`zodiacs.${z}`)}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-gray-500">{tVoice("selectPersonality")}</label>
                        <select value={personalityB} onChange={(e) => setPersonalityB(e.target.value)}
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-island-blue"
                        >
                          {PERSONALITIES.map((p) => <option key={p} value={p}>{tVoice(`personalities.${p}`)} ({getMbtiCode(p)})</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex justify-center">
                  <button onClick={handleCalculate} className="rounded-2xl bg-sunshine px-6 sm:px-8 py-3 font-mono text-sm sm:text-base font-bold text-gray-900 shadow-sm transition-all hover:shadow-md active:scale-95">
                    {tVoice("calcBtn")}
                  </button>
                </div>
                {result && (
                  <div className="mt-6 space-y-4">
                    {/* Game Zodiac Score */}
                    <div className="rounded-xl border border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50 p-3 sm:p-4">
                      <h3 className="mb-2 font-mono text-sm font-bold text-amber-700">{t("gameZodiacTitle")}</h3>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-900">{tVoice("loveIndex")}</span>
                        <span className="font-mono text-lg font-bold text-amber-600">{result.zodiacScore}%</span>
                      </div>
                      <div className="h-3 sm:h-4 overflow-hidden rounded-full bg-amber-200">
                        <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-700" style={{ width: `${result.zodiacScore}%` }} />
                      </div>
                      <p className="mt-2 text-xs text-amber-700">
                        {result.zodiacScore >= 70 ? t("zodiacHigh") :
                         result.zodiacScore >= 40 ? t("zodiacMedium") : t("zodiacLow")}
                      </p>
                    </div>
                    {/* MBTI Theory Score */}
                    <div className="rounded-xl border border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4">
                      <h3 className="mb-2 font-mono text-sm font-bold text-blue-700">{t("mbtiTheoryTitle")}</h3>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-900">{tVoice("loveIndex")}</span>
                        <span className="font-mono text-lg font-bold text-blue-600">{result.romanceBreakdown.personality}%</span>
                      </div>
                      <div className="h-3 sm:h-4 overflow-hidden rounded-full bg-blue-200">
                        <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-700" style={{ width: `${result.romanceBreakdown.personality}%` }} />
                      </div>
                      <p className="mt-2 text-xs text-blue-700">
                        {result.romanceBreakdown.personality >= 70 ? t("mbtiHigh") :
                         result.romanceBreakdown.personality >= 40 ? t("mbtiMedium") : t("mbtiLow")}
                      </p>
                    </div>
                    {/* Combined Romance */}
                    <div className="rounded-xl border border-gray-100 bg-white p-3 sm:p-4">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-900">{tVoice("loveIndex")}</span>
                        <span className="font-mono text-lg font-bold text-pink-500">{result.romance}%</span>
                      </div>
                      <div className="h-3 sm:h-4 overflow-hidden rounded-full bg-gray-200">
                        <div className="h-full rounded-full bg-gradient-to-r from-pink-400 to-pink-500 transition-all duration-700" style={{ width: `${result.romance}%` }} />
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2 sm:gap-4 text-xs text-gray-500">
                        <span>{tVoice("zodiacContribution")}: {result.romanceBreakdown.zodiac}%</span>
                        <span>{tVoice("personalityContribution")}: {result.romanceBreakdown.personality}%</span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">{getComment("love", result.romance)}</p>
                    </div>
                    {/* Combined Friendship */}
                    <div className="rounded-xl border border-gray-100 bg-white p-3 sm:p-4">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-900">{tVoice("friendIndex")}</span>
                        <span className="font-mono text-lg font-bold text-island-blue">{result.friendship}%</span>
                      </div>
                      <div className="h-3 sm:h-4 overflow-hidden rounded-full bg-gray-200">
                        <div className="h-full rounded-full bg-gradient-to-r from-island-blue to-blue-400 transition-all duration-700" style={{ width: `${result.friendship}%` }} />
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2 sm:gap-4 text-xs text-gray-500">
                        <span>{tVoice("zodiacContribution")}: {result.friendshipBreakdown.zodiac}%</span>
                        <span>{tVoice("personalityContribution")}: {result.friendshipBreakdown.personality}%</span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">{getComment("friend", result.friendship)}</p>
                    </div>
                    {/* Compatibility model disclaimer */}
                    <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 flex items-start gap-2">
                      <Shield className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800">{t("compatibilityModelDisclaimer")}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ===== 4. RESIDENT ROSTER TAB ===== */}
          <div className={activeTab !== "roster" ? "hidden" : ""}>
            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 shadow-sm">
                <h3 className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-3">{tVoice("leaderboard")}</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{tVoice("leaderboardDesc")}</p>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Left: Resident List */}
                <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
                  {/* Add resident form */}
                  <div className="mb-4 space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text" value={newResidentName} onChange={(e) => setNewResidentName(e.target.value)}
                        placeholder={tVoice("residentNamePlaceholder")}
                        className="flex-1 min-w-0 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-island-blue"
                        onKeyDown={(e) => e.key === "Enter" && handleAddResident()}
                      />
                      <button onClick={handleAddResident} disabled={!newResidentName.trim() || residents.length >= MAX_RESIDENTS}
                        className="shrink-0 rounded-lg bg-island-blue px-3 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-40">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <select value={newResidentZodiac} onChange={(e) => setNewResidentZodiac(e.target.value as Zodiac)}
                        className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-island-blue">
                        {ZODIAC_ORDER.map((z) => <option key={z} value={z}>{tVoice(`zodiacs.${z}`)}</option>)}
                      </select>
                      <select value={newResidentPersonality} onChange={(e) => setNewResidentPersonality(e.target.value)}
                        className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-island-blue">
                        {PERSONALITIES.map((p) => <option key={p} value={p}>{tVoice(`personalities.${p}`)} ({getMbtiCode(p)})</option>)}
                      </select>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <button onClick={handleRandomResident} className="rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-700 transition-all hover:bg-amber-200 flex items-center gap-1">
                        <Dice5 className="h-3 w-3" />{tVoice("randomResident")}
                      </button>
                      <button onClick={handleExportResidents} disabled={residents.length === 0}
                        className="rounded-lg bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700 transition-all hover:bg-blue-200 flex items-center gap-1 disabled:opacity-40">
                        <Download className="h-3 w-3" />{tVoice("exportResidents")}
                      </button>
                      <button onClick={() => importRef.current?.click()}
                        className="rounded-lg bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700 transition-all hover:bg-green-200 flex items-center gap-1">
                        <Upload className="h-3 w-3" />{tVoice("importResidents")}
                      </button>
                      <input ref={importRef} type="file" accept=".json" onChange={handleImportResidents} className="hidden" />
                      <button onClick={handleClearAll} disabled={residents.length === 0}
                        className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 transition-all hover:bg-red-200 flex items-center gap-1 disabled:opacity-40">
                        <Trash2 className="h-3 w-3" />{tVoice("clearAll")}
                      </button>
                    </div>
                  </div>
                  {/* Search */}
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t("searchResidents")}
                      className="w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:border-island-blue"
                    />
                  </div>
                  {/* Resident list */}
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {filteredResidents.length === 0 ? (
                      <p className="py-4 text-center text-sm text-gray-400">{t("noResidents")}</p>
                    ) : (
                      filteredResidents.map((r) => (
                        <div key={r.id}
                          onClick={() => { setSelectedResidentId(r.id); setEditingResident({ ...r }); }}
                          className={`flex items-center gap-3 rounded-xl p-3 cursor-pointer transition-all ${
                            selectedResidentId === r.id ? "bg-island-blue/10 border border-island-blue/30" : "bg-gray-50 hover:bg-gray-100 border border-transparent"
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-gray-900 text-sm truncate">{r.name}</p>
                            <p className="text-xs text-gray-500 truncate">
                              {getMbtiCode(r.personality)} - {tVoice(`personalities.${r.personality}`)} - {tVoice(`zodiacs.${r.zodiac}`)}
                            </p>
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); handleRemoveResident(r.id); }}
                            className="shrink-0 rounded-lg p-1.5 text-gray-400 transition-all hover:bg-red-100 hover:text-red-500">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                  <p className="mt-2 text-xs text-gray-400 text-center">{residents.length}/{MAX_RESIDENTS}</p>
                </div>
                {/* Right: Selected Resident Detail / Edit */}
                <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
                  {editingResident ? (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 text-sm">{t("editResidentTitle")}</h3>
                      <div>
                        <label className="mb-1 block text-xs text-gray-500">{t("editNameLabel")}</label>
                        <input type="text" value={editingResident.name}
                          onChange={(e) => setEditingResident({ ...editingResident, name: e.target.value })}
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-island-blue" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-gray-500">{tVoice("selectZodiac")}</label>
                        <select value={editingResident.zodiac}
                          onChange={(e) => setEditingResident({ ...editingResident, zodiac: e.target.value as Zodiac })}
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-island-blue">
                          {ZODIAC_ORDER.map((z) => <option key={z} value={z}>{tVoice(`zodiacs.${z}`)}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-gray-500">{tVoice("selectPersonality")}</label>
                        <select value={editingResident.personality}
                          onChange={(e) => setEditingResident({ ...editingResident, personality: e.target.value })}
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-island-blue">
                          {PERSONALITIES.map((p) => <option key={p} value={p}>{tVoice(`personalities.${p}`)} ({getMbtiCode(p)})</option>)}
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={handleSaveEdit}
                          className="flex-1 rounded-lg bg-island-blue px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-1">
                          <Save className="h-3.5 w-3.5" />{t("saveEditBtn")}
                        </button>
                        <button onClick={() => { handleLoadResidentToSliders(editingResident); }}
                          className="flex-1 rounded-lg bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700 transition-all hover:bg-amber-200 active:scale-95 flex items-center justify-center gap-1">
                          <RefreshCw className="h-3.5 w-3.5" />{t("syncToSliders")}
                        </button>
                      </div>
                    </div>
                  ) : selectedResident ? (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 text-sm">{t("residentProfile")}</h3>
                      <div className="rounded-xl bg-gray-50 p-4">
                        <p className="font-semibold text-gray-900">{selectedResident.name}</p>
                        <p className="text-sm text-gray-600 mt-1">{tVoice("selectZodiac")}: {tVoice(`zodiacs.${selectedResident.zodiac}`)}</p>
                        <p className="text-sm text-gray-600">{t("toolMbtiMatch")}: {getMbtiCode(selectedResident.personality)}</p>
                        <p className="text-sm text-gray-600">{tVoice("selectPersonality")}: {tVoice(`personalities.${selectedResident.personality}`)}</p>
                      </div>
                      <button onClick={() => setEditingResident({ ...selectedResident })}
                        className="w-full rounded-lg bg-gray-100 py-2 text-sm font-semibold text-gray-600 transition-all hover:bg-gray-200 active:scale-95">
                        {t("editResidentTitle")}
                      </button>
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <Crown className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">{t("selectResidentHint")}</p>
                    </div>
                  )}
                  {/* Privacy note */}
                  <div className="mt-4 rounded-xl bg-blue-50 p-3">
                    <p className="text-xs text-blue-700">{t("privacyNote")}</p>
                  </div>
                </div>
              </div>
              {/* Leaderboard */}
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
                <h3 className="font-mono text-base sm:text-lg font-bold text-gray-900 mb-4">{tVoice("calculateAll")}</h3>
                {renderLeaderboard()}
              </div>
            </div>
          </div>
        </section>

        {/* ===== HOW TO USE (GEO-critical: numbered steps for AI extraction) ===== */}
        <section aria-labelledby="mbti-how-to" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-4 sm:p-6 shadow-sm">
            <h2 id="mbti-how-to" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-4">{t("howToTitle")}</h2>
            <ol className="space-y-4">
              {[
                { name: t("howToStep1Name"), text: t("howToStep1Text"), num: 1, color: "bg-blue-600 text-white" },
                { name: t("howToStep2Name"), text: t("howToStep2Text"), num: 2, color: "bg-indigo-600 text-white" },
                { name: t("howToStep3Name"), text: t("howToStep3Text"), num: 3, color: "bg-purple-600 text-white" },
              ].map((step) => (
                <li key={step.num} className="flex gap-4 rounded-xl bg-white/80 p-4 border border-gray-50">
                  <div className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${step.color}`}>{step.num}</div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{step.name}</h3>
                    <p className="mt-0.5 text-xs sm:text-sm text-gray-600 leading-relaxed">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ===== PUBLIC CONTENT: HOW IT WORKS (always visible) ===== */}
        <section aria-labelledby="mbti-how-it-works" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-indigo-50 to-blue-50 p-4 sm:p-6 shadow-sm">
            <h2 id="mbti-how-it-works" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-4">{t("howItWorksTitle")}</h2>
            {/* GEO-critical: Full-text 16-personality mapping declaration */}
            <div className="rounded-xl bg-white/90 p-4 mb-4 border border-indigo-100">
              <h3 className="font-semibold text-indigo-800 mb-2 text-sm">{t("mappingRefTitle")}</h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{t("mappingRefText")}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/70 p-4">
                <h3 className="font-semibold text-indigo-800 mb-2 text-sm">{t("algorithmCore")}</h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{t("algorithmCoreDesc")}</p>
              </div>
              <div className="rounded-xl bg-white/70 p-4">
                <h3 className="font-semibold text-indigo-800 mb-2 text-sm">{t("fourQuadrants")}</h3>
                <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-gray-700">
                  <li>{t("quadrantOutgoing")}</li>
                  <li>{t("quadrantEasygoing")}</li>
                  <li>{t("quadrantIndependent")}</li>
                  <li>{t("quadrantConfident")}</li>
                </ol>
              </div>
              <div className="rounded-xl bg-white/70 p-4">
                <h3 className="font-semibold text-indigo-800 mb-2 text-sm">{t("sliderMapping")}</h3>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-gray-700">
                  <li>{t("sliderMapping1")}</li>
                  <li>{t("sliderMapping2")}</li>
                  <li>{t("sliderMapping3")}</li>
                </ul>
              </div>
              <div className="rounded-xl bg-white/70 p-4">
                <h3 className="font-semibold text-indigo-800 mb-2 text-sm">{t("topPairingsTitle")}</h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{t("topPairingsRomance")}</p>
                <p className="mt-1.5 text-xs sm:text-sm text-gray-700 leading-relaxed">{t("topPairingsFriendship")}</p>
              </div>
              <div className="rounded-xl bg-white/70 p-4">
                <h3 className="font-semibold text-indigo-800 mb-2 text-sm">{t("formulaTitle")}</h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{t("formulaText")}</p>
              </div>
              <div className="rounded-xl bg-white/70 p-4">
                <h3 className="font-semibold text-indigo-800 mb-2 text-sm">{t("privacyTitle")}</h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{wrapCodeTerms(t("privacyDesc"))}</p>
              </div>
              <div className="rounded-xl bg-white/70 p-4">
                <h3 className="font-semibold text-indigo-800 mb-2 text-sm">MBTI Disclaimer</h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{t("mbtiDisclaimer")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PUBLIC CONTENT: FAQ (always visible) ===== */}
        <section aria-labelledby="mbti-faq" className="mx-auto max-w-6xl px-4 pb-6 sm:pb-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="mbti-faq" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-4">{t("faqTitle")}</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="group rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
                  <summary className="flex cursor-pointer items-center justify-between p-3 sm:p-4 hover:bg-gray-100 transition-colors">
                    <h4 className="pr-4 text-sm font-semibold text-gray-800">{faq.q}</h4>
                    <ChevronDown className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2">
                    {faq.a.split('\n').map((line, idx) => {
                      if (line.startsWith('• ')) {
                        return <div key={idx} className="flex items-start gap-2"><span className="text-blue-500">•</span><span>{line.substring(2)}</span></div>;
                      }
                      if (/^\d+\./.test(line)) {
                        return <div key={idx} className="font-medium text-gray-700">{line}</div>;
                      }
                      if (line.trim() === '') {
                        return <div key={idx} className="h-1" />;
                      }
                      return <p key={idx} className={line.startsWith('Reference:') || line.startsWith('Note:') || line.startsWith('Gameplay') || line.startsWith('Common') ? "italic text-gray-500 mt-2" : ""}>{wrapCodeTerms(line)}</p>;
                    })}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== MBTI MAPPING DISCLAIMER (always visible) ===== */}
        <section aria-labelledby="mbti-mapping-disclaimer-title" className="mx-auto max-w-6xl px-4 pb-4 sm:pb-6">
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
            <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 id="mbti-mapping-disclaimer-title" className="text-sm font-semibold text-amber-900 mb-1">{t("mbtiMappingDisclaimerTitle")}</h3>
              <p className="text-xs text-amber-800">{t("mbtiMappingDisclaimer")}</p>
            </div>
          </div>
        </section>

        {/* ===== PUBLIC CONTENT: RELATED TOOLS (always visible) ===== */}
        <section aria-labelledby="mbti-related-tools" className="mx-auto max-w-6xl px-4 pb-4 sm:pb-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="mbti-related-tools" className="font-mono text-lg sm:text-xl font-bold text-gray-900 mb-4">{t("relatedTitle")}</h2>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
              <Link href="/tomodachi-voice-lab" className="rounded-xl bg-purple-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-purple-800 text-sm">{t("relatedVoiceLab")}</h3>
              </Link>
              <Link href="/mii-qr-unlocker" className="rounded-xl bg-blue-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-blue-800 text-sm">{t("relatedMiiQr")}</h3>
              </Link>
              <Link href="/living-the-grid" className="rounded-xl bg-green-50 p-4 transition-all hover:shadow-md">
                <h3 className="font-semibold text-green-800 text-sm">{t("relatedPixelGrid")}</h3>
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-center">
              <Link href="/acnh-pixel-studio" className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700">
                {t("relatedAcnhLink")} →
              </Link>
              <Link href="/tomodachi-apartment-design" className="inline-flex items-center gap-1 text-sm font-medium text-sky-600 hover:text-sky-700">
                {t("relatedApartmentLink")} →
              </Link>
              <Link href="/tomodachi-clothes-template" className="inline-flex items-center gap-1 text-sm font-medium text-pink-600 hover:text-pink-700">
                {t("relatedClothesLink")} →
              </Link>
              <Link href="/mii-eyes" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                {t("relatedMiiEyesLink")} →
              </Link>
            </div>
          </div>
        </section>


      </main>
      <Footer />
    </div>
  );
}

