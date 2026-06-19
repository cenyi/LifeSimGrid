type Zodiac =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

type PersonalityGroup = "outgoing" | "confident" | "independent" | "easygoing";

const zodiacOrder: Zodiac[] = [
  "aries", "taurus", "gemini", "cancer",
  "leo", "virgo", "libra", "scorpio",
  "sagittarius", "capricorn", "aquarius", "pisces",
];

/** 12x12 zodiac compatibility matrix (symmetric, values 0-100) */
const zodiacMatrix: number[][] = [
  [80, 55, 75, 45, 90, 60, 50, 65, 85, 55, 70, 60],
  [55, 80, 40, 90, 50, 85, 65, 75, 45, 90, 55, 70],
  [75, 40, 80, 55, 70, 45, 85, 60, 80, 50, 75, 55],
  [45, 90, 55, 80, 40, 70, 60, 90, 50, 75, 45, 85],
  [90, 50, 70, 40, 80, 55, 75, 45, 85, 60, 80, 50],
  [60, 85, 45, 70, 55, 80, 50, 75, 55, 90, 60, 70],
  [50, 65, 85, 60, 75, 50, 80, 55, 75, 45, 90, 60],
  [65, 75, 60, 90, 45, 75, 55, 80, 60, 70, 50, 85],
  [85, 45, 80, 50, 85, 55, 75, 60, 80, 55, 70, 45],
  [55, 90, 50, 75, 60, 90, 45, 70, 55, 80, 60, 75],
  [70, 55, 75, 45, 80, 60, 90, 50, 70, 60, 80, 55],
  [60, 70, 55, 85, 50, 70, 60, 85, 45, 75, 55, 80],
];

/** Extracts the personality group from a full personality key */
export function getPersonalityGroup(personality: string): PersonalityGroup {
  if (personality.startsWith("outgoing")) return "outgoing";
  if (personality.startsWith("confident")) return "confident";
  if (personality.startsWith("independent")) return "independent";
  return "easygoing";
}

/** Complete mapping from 16 in-game personality keys to MBTI 4-letter types */
const MBTI_MAP: Record<string, string> = {
  "outgoing_leader": "ESTJ",
  "outgoing_entertainer": "ESFP",
  "outgoing_trendsetter": "ENFP",
  "outgoing_optimist": "ESFJ",
  "confident_designer": "INTJ",
  "confident_adventurer": "ESTP",
  "confident_goGetter": "ENTJ",
  "confident_charmer": "ENTP",
  "independent_artist": "INFP",
  "independent_freeSpirit": "INTP",
  "independent_thinker": "ISTP",
  "independent_loneWolf": "ISTJ",
  "easygoing_dreamer": "INFJ",
  "easygoing_sweetheart": "ISFJ",
  "easygoing_softie": "INFP",
  "easygoing_buddy": "ISFP",
};

/** Maps a personality key to its full 4-letter MBTI type */
export function getMbtiCode(personality: string): string {
  return MBTI_MAP[personality] ?? "INFP";
}

/** Complementary personality pairs for romance calculation */
const complementaryPairs: [PersonalityGroup, PersonalityGroup][] = [
  ["outgoing", "independent"],
  ["confident", "easygoing"],
];

/** Checks if two personality groups are complementary */
function isComplementary(a: PersonalityGroup, b: PersonalityGroup): boolean {
  return complementaryPairs.some(
    ([x, y]) => (x === a && y === b) || (x === b && y === a)
  );
}

/** Calculates compatibility between two residents based on zodiac and personality */
export function calculateCompatibility(
  zodiacA: Zodiac,
  zodiacB: Zodiac,
  personalityA: string,
  personalityB: string
): { 
  romance: number; 
  friendship: number;
  zodiacScore: number;
  romanceBreakdown: { zodiac: number; personality: number };
  friendshipBreakdown: { zodiac: number; personality: number };
} {
  const idxA = zodiacOrder.indexOf(zodiacA);
  const idxB = zodiacOrder.indexOf(zodiacB);
  const zodiacScore = zodiacMatrix[idxA]?.[idxB] ?? 50;

  const groupA = getPersonalityGroup(personalityA);
  const groupB = getPersonalityGroup(personalityB);

  let romanceModifier = 0;
  let friendshipModifier = 0;

  if (isComplementary(groupA, groupB)) {
    romanceModifier += 20;
  }
  if (groupA === groupB) {
    romanceModifier -= 10;
    friendshipModifier += 20;
  }
  if (personalityA === personalityB) {
    romanceModifier -= 5;
    friendshipModifier += 10;
  }

  const romance = Math.max(0, Math.min(100, Math.round(zodiacScore * 0.5 + 50 * 0.5 + romanceModifier)));
  const friendship = Math.max(0, Math.min(100, Math.round(zodiacScore * 0.5 + 50 * 0.5 + friendshipModifier)));

  return { 
    romance, 
    friendship,
    zodiacScore,
    romanceBreakdown: { 
      zodiac: Math.round(zodiacScore * 0.5), 
      personality: Math.round(50 * 0.5 + romanceModifier) 
    },
    friendshipBreakdown: { 
      zodiac: Math.round(zodiacScore * 0.5), 
      personality: Math.round(50 * 0.5 + friendshipModifier) 
    },
  };
}

export type { Zodiac, PersonalityGroup };
export { zodiacOrder };
