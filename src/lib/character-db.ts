/**
 * LifeSimGrid — Unified Character Storage Layer
 *
 * Provides a single IndexedDB-backed CRUD interface for MiiCharacter
 * entities, replacing the fragmented localStorage usage across
 * TomodachiLifeMbtiPage and TomodachiIslandPlannerPage.
 *
 * Migration: On first open, any legacy localStorage data under
 * "lifesimgrid-residents-mbti" or "lifesimgrid-island-residents"
 * is automatically imported into the characters store.
 */

import {
  type MiiCharacter,
  LEGACY_STORAGE_KEYS,
  MAX_CHARACTERS,
} from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const DB_NAME = "lifesimgrid-characters";
const DB_VERSION = 1;
const STORE_NAME = "characters";

/* ------------------------------------------------------------------ */
/*  ID Generation                                                      */
/* ------------------------------------------------------------------ */

/** Generates a unique ID for a character, with fallback for older browsers. */
function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/* ------------------------------------------------------------------ */
/*  Database                                                            */
/* ------------------------------------------------------------------ */

/** Opens the IndexedDB database, creating the store on first use. */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB not available"));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("createdAt", "createdAt", { unique: false });
        store.createIndex("updatedAt", "updatedAt", { unique: false });
      }
    };
  });
}

/* ------------------------------------------------------------------ */
/*  Legacy Migration                                                    */
/* ------------------------------------------------------------------ */

/** Shape of the old Resident object stored in localStorage. */
interface LegacyResident {
  id: string;
  name: string;
  zodiac: string;
  personality: string;
}

/**
 * Migrates any legacy localStorage Resident data into the IndexedDB
 * characters store. Runs once on first DB open; is idempotent.
 */
async function migrateLegacyData(db: IDBDatabase): Promise<void> {
  if (typeof window === "undefined") return;

  const legacyKeys = [
    LEGACY_STORAGE_KEYS.mbtiResidents,
    LEGACY_STORAGE_KEYS.islandResidents,
  ];

  for (const key of legacyKeys) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;

      const residents = JSON.parse(raw) as LegacyResident[];
      if (!Array.isArray(residents) || residents.length === 0) continue;

      // Check if migration already happened (avoid duplicates)
      const existing = await getAllFromDB(db);
      const existingIds = new Set(existing.map((c) => c.id));
      const existingNames = new Set(
        existing.map((c) => c.name + "|" + c.personality)
      );

      const toMigrate: MiiCharacter[] = [];
      const now = Date.now();

      for (const r of residents) {
        // Skip if ID already exists
        if (existingIds.has(r.id)) continue;
        // Skip if name+personality already exists (dedup across legacy sources)
        const dedupKey = r.name + "|" + r.personality;
        if (existingNames.has(dedupKey)) continue;
        existingNames.add(dedupKey);

        toMigrate.push({
          id: r.id || generateId(),
          name: r.name,
          personality: r.personality,
          zodiac: r.zodiac as MiiCharacter["zodiac"],
          createdAt: now,
          updatedAt: now,
        });
      }

      if (toMigrate.length > 0) {
        await new Promise<void>((resolve, reject) => {
          const tx = db.transaction(STORE_NAME, "readwrite");
          const store = tx.objectStore(STORE_NAME);
          for (const char of toMigrate) {
            store.add(char);
          }
          tx.oncomplete = () => resolve();
          tx.onerror = () => reject(tx.error);
        });
      }
    } catch {
      // Silently skip corrupt localStorage entries
    }
  }
}

/** Reads all characters from the DB (internal helper for migration logic). */
function getAllFromDB(db: IDBDatabase): Promise<MiiCharacter[]> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result as MiiCharacter[]);
    request.onerror = () => reject(request.error);
  });
}

/* ------------------------------------------------------------------ */
/*  CRUD — Public API                                                  */
/* ------------------------------------------------------------------ */

/** Creates a new character and persists it to IndexedDB. */
export async function createCharacter(
  char: Omit<MiiCharacter, "id" | "createdAt" | "updatedAt">
): Promise<MiiCharacter> {
  const now = Date.now();
  const character: MiiCharacter = {
    ...char,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };

  const db = await openDB();
  try {
    // Enforce maximum character count
    const existing = await getAllFromDB(db);
    if (existing.length >= MAX_CHARACTERS) {
      throw new Error(`Maximum of ${MAX_CHARACTERS} characters reached`);
    }

    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      store.add(character);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });

    return character;
  } finally {
    db.close();
  }
}

/** Retrieves a single character by ID. */
export async function getCharacter(id: string): Promise<MiiCharacter | null> {
  let db: IDBDatabase | null = null;
  try {
    db = await openDB();
    await migrateLegacyData(db);
    return await new Promise<MiiCharacter | null>((resolve, reject) => {
      const tx = db!.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(id);
      request.onsuccess = () =>
        resolve(request.result ?? null);
      request.onerror = () => reject(request.error);
    });
  } catch {
    return null;
  } finally {
    db?.close();
  }
}

/** Retrieves all characters, sorted newest first. */
export async function getAllCharacters(): Promise<MiiCharacter[]> {
  let db: IDBDatabase | null = null;
  try {
    db = await openDB();
    await migrateLegacyData(db);
    const results = await getAllFromDB(db);
    results.sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));
    return results;
  } catch {
    return [];
  } finally {
    db?.close();
  }
}

/** Updates an existing character by ID. */
export async function updateCharacter(
  id: string,
  updates: Partial<Omit<MiiCharacter, "id" | "createdAt">>
): Promise<void> {
  let db: IDBDatabase | null = null;
  try {
    db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db!.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const getRequest = store.get(id);
      getRequest.onsuccess = () => {
        const existing = getRequest.result as MiiCharacter | undefined;
        if (!existing) {
          reject(new Error(`Character ${id} not found`));
          return;
        }
        const updated: MiiCharacter = {
          ...existing,
          ...updates,
          id: existing.id,
          createdAt: existing.createdAt,
          updatedAt: Date.now(),
        };
        store.put(updated);
      };
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    // Silently fail if IndexedDB is not available
  } finally {
    db?.close();
  }
}

/** Deletes a character by ID. */
export async function deleteCharacter(id: string): Promise<void> {
  let db: IDBDatabase | null = null;
  try {
    db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db!.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      store.delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    // Silently fail
  } finally {
    db?.close();
  }
}

/** Deletes all characters. */
export async function clearAllCharacters(): Promise<void> {
  let db: IDBDatabase | null = null;
  try {
    db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db!.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      store.clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    // Silently fail
  } finally {
    db?.close();
  }
}

/* ------------------------------------------------------------------ */
/*  Synchronous localStorage Fallback                                  */
/* ------------------------------------------------------------------ */

/**
 * Provides a synchronous read path for components that need immediate
 * data on first render (before IndexedDB async completes).
 * Reads from the legacy localStorage key, so existing UI flows
 * continue to work during the migration period.
 */

/** Synchronously loads residents from localStorage (fallback / hydration). */
export function loadCharactersSync(): MiiCharacter[] {
  if (typeof window === "undefined") return [];
  try {
    // Try the legacy MBTI key first (most complete data)
    const raw = localStorage.getItem(LEGACY_STORAGE_KEYS.mbtiResidents);
    if (raw) {
      const residents = JSON.parse(raw) as LegacyResident[];
      return residents.map((r) => ({
        id: r.id,
        name: r.name,
        personality: r.personality,
        zodiac: r.zodiac as MiiCharacter["zodiac"],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }));
    }
  } catch {
    // Corrupt data — fall through
  }
  return [];
}

/** Synchronously saves residents to localStorage (fallback). */
export function saveCharactersSync(characters: MiiCharacter[]): void {
  if (typeof window === "undefined") return;
  try {
    // Write back in the legacy format so old code paths still read it
    const legacy = characters.map((c) => ({
      id: c.id,
      name: c.name,
      zodiac: c.zodiac ?? "aries",
      personality: c.personality,
    }));
    localStorage.setItem(
      LEGACY_STORAGE_KEYS.mbtiResidents,
      JSON.stringify(legacy)
    );
  } catch {
    // Quota exceeded or other storage error — silently fail
  }
}

export { generateId };
