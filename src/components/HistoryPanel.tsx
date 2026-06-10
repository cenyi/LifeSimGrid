"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { HistoryEntry } from "@/lib/history-db";

interface HistoryPanelProps<T> {
  entries: HistoryEntry<T>[];
  loading: boolean;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  renderEntry: (entry: HistoryEntry<T>) => React.ReactNode;
}

/** Renders an image from a Blob with proper ObjectURL lifecycle management */
export function ThumbnailImg({
  blob,
  alt,
  className,
}: {
  blob: Blob;
  alt: string;
  className?: string;
}) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const objectUrl = URL.createObjectURL(blob);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- ObjectURL must be created in effect for proper lifecycle management; no external subscription API available
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [blob]);

  if (!url) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${className || ""}`}
      >
        <span className="text-xs text-gray-400">...</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={url} alt={alt} className={className} />
  );
}

/** Formats a timestamp into a localized short date-time string */
function formatTimestamp(ts: number): string {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(ts));
}

/** Displays a collapsible history panel with entries, thumbnails, and management controls */
export default function HistoryPanel<T>({
  entries,
  loading,
  onDelete,
  onClearAll,
  renderEntry,
}: HistoryPanelProps<T>) {
  const t = useTranslations("History");
  const [expanded, setExpanded] = useState(false);
  const wasEmptyRef = useRef(true);

  useEffect(() => {
    if (wasEmptyRef.current && entries.length > 0) {
      wasEmptyRef.current = false;
      setExpanded(true);
    }
    if (entries.length === 0) {
      wasEmptyRef.current = true;
    }
  }, [entries.length]);

  if (loading) {
    return (
      <aside aria-label="History panel" className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <p aria-live="polite" className="text-center text-sm text-gray-400">{t("loading")}</p>
      </aside>
    );
  }

  return (
    <aside aria-label="History panel" className="mt-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between rounded-2xl p-5 transition-colors hover:bg-gray-50"
      >
        <span className="font-mono text-base font-bold text-gray-900">
          {t("title")} ({entries.length})
        </span>
        <span className="text-gray-400 transition-transform duration-200">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </span>
      </button>

      {expanded && (
        <div className="border-t border-gray-100 px-5 pb-5">
          {entries.length === 0 ? (
            <p aria-live="polite" className="py-6 text-center text-sm text-gray-400">
              {t("empty")}
            </p>
          ) : (
            <>
              <div className="max-h-80 space-y-2 overflow-y-auto">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-start gap-3 rounded-xl bg-gray-50 p-3"
                  >
                    <div className="min-w-0 flex-1">
                      {renderEntry(entry)}
                      <p className="mt-1 text-xs text-gray-400">
                        {formatTimestamp(entry.createdAt)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(entry.id);
                      }}
                      className="flex-shrink-0 rounded-lg px-2 py-1 text-xs text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      {t("delete")}
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  if (window.confirm(t("clearAllConfirm"))) {
                    onClearAll();
                  }
                }}
                className="mt-3 w-full rounded-xl bg-red-50 py-2 text-sm font-semibold text-red-500 transition-all hover:bg-red-100 active:scale-95"
              >
                {t("clearAll")}
              </button>
            </>
          )}
        </div>
      )}
    </aside>
  );
}
