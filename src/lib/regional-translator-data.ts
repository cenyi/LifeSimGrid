/**
 * LifeSimGrid — Tomodachi Life Regional Name Translator (community-estimate model)
 *
 * IMPORTANT: Tomodachi Life does not ship an official "name translation
 * table" between regions. Each regional version of the game (JP, NA, EU, KR,
 * CN) draws its own pool of suggested Mii names when a player creates a Mii,
 * and the pools overlap only partly.
 *
 * The group mapping below is a community heuristic: names that fill the same
 * cultural role (a popular given name of a given era, or a name sharing a
 * meaning such as "bright" / "strong" / "peace") are placed in one group so
 * that a player can see "what a Mii called X in Japan would likely be called
 * in North America". It is a *suggestion engine*, not a Nintendo lookup.
 *
 * UI must carry a clear disclaimer.
 */

/* ------------------------------------------------------------------ */
/*  Regions                                                             */
/* ------------------------------------------------------------------ */

export type Region = "jp" | "na" | "eu" | "kr" | "cn";

export const REGIONS: Region[] = ["jp", "na", "eu", "kr", "cn"];

/** Short regional labels used in the UI dropdowns. */
export const REGION_LABELS: Record<Region, string> = {
  jp: "Japan (JP)",
  na: "North America (NA)",
  eu: "Europe (EU)",
  kr: "Korea (KR)",
  cn: "China (CN)",
};

/** Compact 2-letter codes used inside compact tables. */
export const REGION_CODES: Record<Region, string> = {
  jp: "JP",
  na: "NA",
  eu: "EU",
  kr: "KR",
  cn: "CN",
};

/** Script each region's names are written in. */
export const REGION_SCRIPTS: Record<Region, string> = {
  jp: "Kanji / Kana (Latin)",
  na: "Latin",
  eu: "Latin",
  kr: "Hangul (Latin)",
  cn: "Hanzi (Latin)",
};

/** One-line naming-convention note per region. */
export const REGION_NOTES: Record<Region, string> = {
  jp: "Names often carry a meaning written in kanji; the same reading can map to many spellings.",
  na: "English-language names drawn from US popularity charts across several decades.",
  eu: "A blended pool reflecting French, German, Italian, Spanish and Dutch traditions.",
  kr: "Hangul names with a family name first; the given name is usually two syllables.",
  cn: "Hanzi names with a family name first; meaning is chosen character by character.",
};

/* ------------------------------------------------------------------ */
/*  Name groups                                                         */
/* ------------------------------------------------------------------ */

/**
 * A group of names that fill the same cultural role across regions.
 * `hintKey` is the i18n key for the shared meaning/role — it is shown in the
 * translator result so the mapping stays auditable rather than magical.
 * `groupKey` is the i18n key for the group's display name.
 */
export interface NameGroup {
  id: string;
  groupKey: string;
  hintKey: string;
  names: Record<Region, string>;
}

function makeGroup(
  id: string,
  groupKey: string,
  hintKey: string,
  names: Record<Region, string>
): NameGroup {
  return { id, groupKey, hintKey, names };
}

/**
 * The regional name database. 36 groups covering the most common Mii name
 * roles observed across the five regional pools.
 */
export const NAME_GROUPS: NameGroup[] = [
  // --- strength / character groups ---
  makeGroup("strength", "groupStrength", "hintStrength", {
    jp: "Hiroshi",
    na: "James",
    eu: "Miguel",
    kr: "민수 (Minsu)",
    cn: "伟 (Wei)",
  }),
  makeGroup("bright", "groupBright", "hintBright", {
    jp: "Akira",
    na: "Liam",
    eu: "Luca",
    kr: "지훈 (Jihoon)",
    cn: "磊 (Lei)",
  }),
  makeGroup("wise", "groupWise", "hintWise", {
    jp: "Kenji",
    na: "Ethan",
    eu: "Thomas",
    kr: "서준 (Seojun)",
    cn: "智 (Zhi)",
  }),
  makeGroup("brave", "groupBrave", "hintBrave", {
    jp: "Takeshi",
    na: "William",
    eu: "Andrei",
    kr: "도현 (Dohyeon)",
    cn: "勇 (Yong)",
  }),
  makeGroup("calm", "groupCalm", "hintCalm", {
    jp: "Shizuka",
    na: "Noah",
    eu: "Jan",
    kr: "지우 (Jiwu)",
    cn: "安 (An)",
  }),
  makeGroup("sky", "groupSky", "hintSky", {
    jp: "Yuto",
    na: "Mason",
    eu: "Hans",
    kr: "준서 (Junseo)",
    cn: "天 (Tian)",
  }),

  // --- beauty / grace groups ---
  makeGroup("beautiful", "groupBeautiful", "hintBeautiful", {
    jp: "Yumi",
    na: "Olivia",
    eu: "Sofia",
    kr: "하은 (Haeun)",
    cn: "芳 (Fang)",
  }),
  makeGroup("blossom", "groupBlossom", "hintBlossom", {
    jp: "Sakura",
    na: "Ava",
    eu: "Anna",
    kr: "수빈 (Subin)",
    cn: "樱 (Ying)",
  }),
  makeGroup("love", "groupLove", "hintLove", {
    jp: "Ai",
    na: "Sophia",
    eu: "Marie",
    kr: "사랑 (Sarang)",
    cn: "爱 (Ai)",
  }),
  makeGroup("joy", "groupJoy", "hintJoy", {
    jp: "Emi",
    na: "Emma",
    eu: "Felicity",
    kr: "희진 (Heejin)",
    cn: "乐 (Le)",
  }),
  makeGroup("gentle", "groupGentle", "hintGentle", {
    jp: "Yae",
    na: "Charlotte",
    eu: "Giulia",
    kr: "서윤 (Seoyun)",
    cn: "淑 (Shu)",
  }),
  makeGroup("moon", "groupMoon", "hintMoon", {
    jp: "Tsuki",
    na: "Luna",
    eu: "Luna",
    kr: "달 (Dal)",
    cn: "月 (Yue)",
  }),

  // --- nature / season groups ---
  makeGroup("spring", "groupSpring", "hintSpring", {
    jp: "Haruka",
    na: "Alexander",
    eu: "Pierre",
    kr: "하윤 (Hayun)",
    cn: "春 (Chun)",
  }),
  makeGroup("summer", "groupSummer", "hintSummer", {
    jp: "Natsuki",
    na: "Benjamin",
    eu: "Paolo",
    kr: "은서 (Eunseo)",
    cn: "夏 (Xia)",
  }),
  makeGroup("ocean", "groupOcean", "hintOcean", {
    jp: "Kai",
    na: "Lucas",
    eu: "Lars",
    kr: "현우 (Hyunwoo)",
    cn: "海 (Hai)",
  }),
  makeGroup("forest", "groupForest", "hintForest", {
    jp: "Midori",
    na: "Oliver",
    eu: "Silvia",
    kr: "나연 (Nayeon)",
    cn: "林 (Lin)",
  }),
  makeGroup("wind", "groupWind", "hintWind", {
    jp: "Kaze",
    na: "Zephyr",
    eu: "Ventus",
    kr: "바람 (Baram)",
    cn: "风 (Feng)",
  }),
  makeGroup("star", "groupStar", "hintStar", {
    jp: "Hoshi",
    na: "Stella",
    eu: "Estelle",
    kr: "별 (Byeol)",
    cn: "星 (Xing)",
  }),

  // --- aspiration / virtue groups ---
  makeGroup("honor", "groupHonor", "hintHonor", {
    jp: "Takashi",
    na: "Henry",
    eu: "Honoré",
    kr: "성민 (Sungmin)",
    cn: "荣 (Rong)",
  }),
  makeGroup("truth", "groupTruth", "hintTruth", {
    jp: "Makoto",
    na: "Felix",
    eu: "Vera",
    kr: "진우 (Jinwoo)",
    cn: "诚 (Cheng)",
  }),
  makeGroup("hope", "groupHope", "hintHope", {
    jp: "Nozomi",
    na: "Hope",
    eu: "Esperanza",
    kr: "소영 (Soyoung)",
    cn: "望 (Wang)",
  }),
  makeGroup("dream", "groupDream", "hintDream", {
    jp: "Yume",
    na: "Dream",
    eu: "Sogno",
    kr: "꿈 (Kkum)",
    cn: "梦 (Meng)",
  }),
  makeGroup("grace", "groupGrace", "hintGrace", {
    jp: "Rei",
    na: "Grace",
    eu: "Grazia",
    kr: "은지 (Eunji)",
    cn: "雅 (Ya)",
  }),
  makeGroup("harmony", "groupHarmony", "hintHarmony", {
    jp: "Wa",
    na: "Concord",
    eu: "Armonia",
    kr: "화 (Hwa)",
    cn: "和 (He)",
  }),

  // --- modern / pop-culture groups ---
  makeGroup("modern-jp", "groupModernJp", "hintModernJp", {
    jp: "Ren",
    na: "Ryan",
    eu: "Enzo",
    kr: "민혁 (Minhyeok)",
    cn: "浩 (Hao)",
  }),
  makeGroup("modern-na", "groupModernNa", "hintModernNa", {
    jp: "Rin",
    na: "Aiden",
    eu: "Adam",
    kr: "도윤 (Doyoon)",
    cn: "宇 (Yu)",
  }),
  makeGroup("modern-eu", "groupModernEu", "hintModernEu", {
    jp: "Riku",
    na: "Leo",
    eu: "Matteo",
    kr: "시우 (Siu)",
    cn: "辰 (Chen)",
  }),
  makeGroup("modern-kr", "groupModernKr", "hintModernKr", {
    jp: "Himari",
    na: "Mia",
    eu: "Mia",
    kr: "하은 (Haeun)",
    cn: "欣 (Xin)",
  }),
  makeGroup("modern-cn", "groupModernCn", "hintModernCn", {
    jp: "Hinata",
    na: "Sunny",
    eu: "Soleil",
    kr: " sunshine (Sang-sun)",
    cn: "阳 (Yang)",
  }),
  makeGroup("unisex", "groupUnisex", "hintUnisex", {
    jp: "Yuki",
    na: "Jordan",
    eu: "Noa",
    kr: "서연 (Seoyeon)",
    cn: "晨 (Chen)",
  }),

  // --- classic / timeless groups ---
  makeGroup("classic-jp", "groupClassicJp", "hintClassicJp", {
    jp: "Taro",
    na: "Charles",
    eu: "Karl",
    kr: "철수 (Cheolsu)",
    cn: "建国 (Jianguo)",
  }),
  makeGroup("classic-na", "groupClassicNa", "hintClassicNa", {
    jp: "Jiro",
    na: "Robert",
    eu: "Roberto",
    kr: "영수 (Yeongsu)",
    cn: "建军 (Jianjun)",
  }),
  makeGroup("classic-eu", "groupClassicEu", "hintClassicEu", {
    jp: "Saburo",
    na: "Michael",
    eu: "Michel",
    kr: "준호 (Junho)",
    cn: "建华 (Jianhua)",
  }),
  makeGroup("classic-kr", "groupClassicKr", "hintClassicKr", {
    jp: "Hanako",
    na: "Margaret",
    eu: "Marguerite",
    kr: "영희 (Younghee)",
    cn: "秀英 (Xiuying)",
  }),
  makeGroup("classic-cn", "groupClassicCn", "hintClassicCn", {
    jp: "Kikuko",
    na: "Dorothy",
    eu: "Dorothea",
    kr: "순자 (Sunja)",
    cn: "桂英 (Guiying)",
  }),
  makeGroup("timeless", "groupTimeless", "hintTimeless", {
    jp: "Hikari",
    na: "Claire",
    eu: "Chiara",
    kr: "은혜 (Eunhye)",
    cn: "恩 (En)",
  }),
];

/* ------------------------------------------------------------------ */
/*  Indexes                                                             */
/* ------------------------------------------------------------------ */

/**
 * Lookup table: normalised name → group.
 * Normalisation strips case, accents and parenthetical romanisation so that
 * "Hiroshi", "HIROSHI" and "hirosHi" all resolve, and so that a Korean name
 * entered as "Minsu" (romanised) or "민수" (Hangul) both resolve.
 */
const NAME_INDEX = new Map<string, NameGroup>();
const REGION_INDEX: Record<Region, Map<string, NameGroup>> = {
  jp: new Map(),
  na: new Map(),
  eu: new Map(),
  kr: new Map(),
  cn: new Map(),
};

function normalise(value: string): string {
  return value
    .toLowerCase()
    .replace(/[àáâãäå]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[^a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ一-鿿]/g, "")
    .trim();
}

function buildIndexes(): void {
  for (const group of NAME_GROUPS) {
    const key = normalise(group.id);
    if (key) NAME_INDEX.set(key, group);
    for (const region of REGIONS) {
      const parts = group.names[region].split(/[,\s/]+/);
      for (const part of parts) {
        const n = normalise(part);
        if (n) REGION_INDEX[region].set(n, group);
      }
    }
  }
}
buildIndexes();

/* ------------------------------------------------------------------ */
/*  Finders                                                             */
/* ------------------------------------------------------------------ */

/**
 * Looks up a name in a given source region and returns its group, if any.
 * Returns null when the name is not in the database.
 */
export function findGroup(name: string, fromRegion: Region): NameGroup | null {
  return REGION_INDEX[fromRegion].get(normalise(name)) ?? null;
}

export interface TranslatedName {
  name: string;
  fromRegion: Region;
  hintKey: string;
  groupKey: string;
  names: Record<Region, string>;
}

/**
 * Translates a name from its source region into every other region.
 * Returns `null` when the name cannot be matched.
 */
export function translate(name: string, fromRegion: Region): TranslatedName | null {
  const group = findGroup(name, fromRegion);
  if (!group) return null;
  const result = {} as Record<Region, string>;
  for (const region of REGIONS) {
    result[region] = group.names[region];
  }
  return { name, fromRegion, hintKey: group.hintKey, groupKey: group.groupKey, names: result };
}

/**
 * Picks a random name from a single region's pool.
 */
export function randomName(region: Region): string {
  const pool = NAME_GROUPS.map((g) => g.names[region]);
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Generates `count` distinct random names from a region's pool.
 * Falls back to allowing repeats once the pool is exhausted.
 */
export function generateNames(region: Region, count = 5): string[] {
  const pool = NAME_GROUPS.map((g) => g.names[region]);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const out = shuffled.slice(0, count);
  while (out.length < count) {
    out.push(randomName(region));
  }
  return out;
}

/**
 * Returns every region in which a given name appears, with the equivalent
 * names in the other regions. Useful when a player does not know which
 * region a name originally came from.
 */
export function searchName(name: string): { region: Region; match: TranslatedName }[] {
  const out: { region: Region; match: TranslatedName }[] = [];
  for (const region of REGIONS) {
    const t = translate(name, region);
    if (t) out.push({ region, match: t });
  }
  return out;
}