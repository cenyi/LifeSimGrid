"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  getEntriesByType,
  addEntry as dbAddEntry,
  deleteEntry as dbDeleteEntry,
  clearEntriesByType as dbClearEntriesByType,
  generateId,
  type HistoryType,
  type HistoryEntry,
} from "@/lib/history-db";

const DEBOUNCE_MS = 3000;

/** Provides CRUD operations and reactive state for history entries of a specific type, with debounce on addEntry */
export function useHistory<T>(type: HistoryType) {
  const [entries, setEntries] = useState<HistoryEntry<T>[]>([]);
  const [loading, setLoading] = useState(true);
  const lastAddRef = useRef<{ key: string; time: number } | null>(null);

  /** Reloads all entries of the current type from IndexedDB without resetting loading state */
  const refresh = useCallback(async () => {
    const result = await getEntriesByType<T>(type);
    setEntries(result);
  }, [type]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const result = await getEntriesByType<T>(type);
      if (!cancelled) {
        setEntries(result);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [type]);

  /** Adds a new history entry with debounce: skips if the same data key was added within DEBOUNCE_MS */
  const addEntry = useCallback(
    async (data: T) => {
      const key = JSON.stringify(data, (_, value) => {
        if (value instanceof Blob) return `[Blob:${value.size}]`;
        return value;
      });
      const now = Date.now();
      const last = lastAddRef.current;
      if (last && last.key === key && now - last.time < DEBOUNCE_MS) {
        return;
      }
      lastAddRef.current = { key, time: now };

      const entry: HistoryEntry<T> = {
        id: generateId(),
        type,
        createdAt: now,
        data,
      };
      await dbAddEntry(entry);
      await refresh();
    },
    [type, refresh]
  );

  /** Deletes a single history entry by ID and refreshes the list */
  const deleteEntry = useCallback(
    async (id: string) => {
      await dbDeleteEntry(id);
      await refresh();
    },
    [refresh]
  );

  /** Clears all history entries of the current type and refreshes the list */
  const clearAll = useCallback(async () => {
    await dbClearEntriesByType(type);
    await refresh();
  }, [type, refresh]);

  return { entries, loading, addEntry, deleteEntry, clearAll };
}
