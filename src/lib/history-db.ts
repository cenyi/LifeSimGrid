const DB_NAME = "lifesimgrid-history";
const DB_VERSION = 1;
const STORE_NAME = "history";
const MAX_ENTRIES_PER_TYPE = 20;

export type HistoryType = "pixel" | "qr" | "voice";

export interface HistoryEntry<T> {
  id: string;
  type: HistoryType;
  createdAt: number;
  data: T;
}

export type CanvasPreset = "square" | "book" | "wide";
export type PixelDensity = 256 | 85 | 64 | 32;
export type VoicePreset = "adultMale" | "adultFemale" | "elder" | "child" | "robot";

export interface PixelHistoryData {
  thumbnail: Blob;
  fileName: string;
  preset: CanvasPreset;
  density: PixelDensity;
  retroMode: boolean;
  brightness: number;
  contrast: number;
}

export interface QRHistoryData {
  thumbnail: Blob;
  avatarName: string;
  copying: boolean;
  sharing: boolean;
  gender: number;
  isBatch: boolean;
  fileCount: number;
}

export type VoiceHistoryData =
  | { action: "voice"; voicePreset: VoicePreset; pitch: number; speed: number; ttsText: string }
  | { action: "compatibility"; voicePreset: VoicePreset; pitch: number; speed: number; zodiacA: string; zodiacB: string; personalityA: string; personalityB: string; romance: number; friendship: number };

/** Generates a unique ID for a history entry, with fallback for older browsers */
function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/** Opens the IndexedDB database and creates the object store on first use */
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
        store.createIndex("type", "type", { unique: false });
        store.createIndex("createdAt", "createdAt", { unique: false });
      }
    };
  });
}

/** Retrieves all history entries of a given type, sorted newest first */
export async function getEntriesByType<T>(type: HistoryType): Promise<HistoryEntry<T>[]> {
  let db: IDBDatabase | null = null;
  try {
    db = await openDB();
    return await new Promise<HistoryEntry<T>[]>((resolve, reject) => {
      const tx = db!.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const index = store.index("type");
      const request = index.getAll(type);
      request.onsuccess = () => {
        const results = request.result as HistoryEntry<T>[];
        results.sort((a, b) => b.createdAt - a.createdAt);
        resolve(results);
      };
      request.onerror = () => reject(request.error);
    });
  } catch {
    return [];
  } finally {
    db?.close();
  }
}

/** Adds a new history entry and evicts the oldest entries if the per-type limit is exceeded, all within a single transaction */
export async function addEntry<T>(entry: HistoryEntry<T>): Promise<void> {
  let db: IDBDatabase | null = null;
  try {
    db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db!.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      store.add(entry);

      const index = store.index("type");
      const allReq = index.getAll(entry.type);
      allReq.onsuccess = () => {
        const all = allReq.result as HistoryEntry<T>[];
        const excess = all.length - MAX_ENTRIES_PER_TYPE;
        if (excess > 0) {
          all.sort((a, b) => a.createdAt - b.createdAt);
          const toDelete = all.slice(0, excess);
          for (const item of toDelete) {
            store.delete(item.id);
          }
        }
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

/** Deletes a single history entry by its ID */
export async function deleteEntry(id: string): Promise<void> {
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

/** Deletes all history entries of a given type within a single readwrite transaction */
export async function clearEntriesByType(type: HistoryType): Promise<void> {
  let db: IDBDatabase | null = null;
  try {
    db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db!.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const index = store.index("type");
      const keysReq = index.getAllKeys(type);
      keysReq.onsuccess = () => {
        for (const key of keysReq.result) {
          store.delete(key);
        }
      };
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    // Silently fail
  } finally {
    db?.close();
  }
}

/** Converts a data URL string to a Blob object using pure JS (no fetch needed for broader compatibility) */
export function dataUrlToBlob(dataUrl: string): Blob {
  const [meta, base64] = dataUrl.split(",");
  const mime = meta.match(/:(.*?);/)?.[1] || "image/png";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
}

/** Creates a thumbnail Blob from a canvas element, preserving aspect ratio */
export function canvasToThumbnail(
  canvas: HTMLCanvasElement,
  maxSize = 128
): Promise<Blob | null> {
  const thumbCanvas = document.createElement("canvas");
  const ratio = canvas.width / canvas.height;
  if (ratio > 1) {
    thumbCanvas.width = maxSize;
    thumbCanvas.height = Math.round(maxSize / ratio);
  } else {
    thumbCanvas.height = maxSize;
    thumbCanvas.width = Math.round(maxSize * ratio);
  }
  const ctx = thumbCanvas.getContext("2d");
  if (!ctx) return Promise.resolve(null);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(canvas, 0, 0, thumbCanvas.width, thumbCanvas.height);
  return new Promise((resolve) => {
    thumbCanvas.toBlob(resolve, "image/png");
  });
}

export { generateId };
