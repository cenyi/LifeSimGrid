"use client";

import { useTranslations } from "next-intl";
import { useState, useCallback, useRef } from "react";
import { decodeQRFromFile, generateAvatarQR } from "@/lib/qr-handler";
import { dataUrlToBlob, type QRHistoryData } from "@/lib/history-db";
import { useHistory } from "@/hooks/useHistory";
import HistoryPanel, { ThumbnailImg } from "@/components/HistoryPanel";
import JSZip from "jszip";

interface AvatarData {
  name: string;
  copying: boolean;
  sharing: boolean;
  gender: number;
  buffer: Uint8Array;
}

interface BatchItem {
  file: File;
  avatar: AvatarData | null;
  qrDataUrl: string | null;
  error: boolean;
}

export default function AvatarEditor() {
  const t = useTranslations("AvatarEditor");
  const [avatarData, setAvatarData] = useState<AvatarData | null>(null);
  const [unlockCopy, setUnlockCopy] = useState(true);
  const [unlockSharing, setUnlockSharing] = useState(true);
  const [newName, setNewName] = useState("");
  const [qrResult, setQrResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const [batchItems, setBatchItems] = useState<BatchItem[]>([]);
  const [batchProcessing, setBatchProcessing] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0 });
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);
  const [batchFailedCount, setBatchFailedCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { entries: historyEntries, loading: historyLoading, addEntry: addHistoryEntry, deleteEntry: deleteHistoryEntry, clearAll: clearHistory } = useHistory<QRHistoryData>("qr");

  const isBatchMode = batchItems.length > 0;

  /** Parses avatar binary data from a QR code and extracts basic properties */
  function parseAvatarFromBuffer(buffer: Uint8Array): AvatarData | null {
    try {
      const nameBytes = buffer.slice(2, 22);
      let name = "";
      for (let i = 0; i < nameBytes.length; i += 2) {
        const charCode = (nameBytes[i] << 8) | nameBytes[i + 1];
        if (charCode === 0) break;
        name += String.fromCharCode(charCode);
      }

      const sharingByte = buffer[0x04] ?? 0;
      const copying = (sharingByte & 0x01) !== 0;
      const sharing = (sharingByte & 0x02) !== 0;

      const genderByte = buffer[0x01] ?? 0;
      const gender = genderByte & 0x01;

      return { name, copying, sharing, gender, buffer };
    } catch {
      return null;
    }
  }

  /** Applies unlock flags and optional name change to a buffer, returns modified buffer */
  function applyUnlock(buffer: Uint8Array, copy: boolean, share: boolean, name?: string): Uint8Array {
    const newBuffer = new Uint8Array(buffer);

    if (copy || share) {
      let flags = newBuffer[0x04] ?? 0;
      if (copy) flags |= 0x01;
      if (share) flags |= 0x02;
      newBuffer[0x04] = flags;
    }

    if (name) {
      const nameBuffer = new Uint8Array(20);
      for (let i = 0; i < Math.min(name.length, 10); i++) {
        const code = name.charCodeAt(i);
        nameBuffer[i * 2] = (code >> 8) & 0xff;
        nameBuffer[i * 2 + 1] = code & 0xff;
      }
      newBuffer.set(nameBuffer, 2);
    }

    return newBuffer;
  }

  /** Resets all editor state for a fresh upload */
  function resetState() {
    setError(null);
    setQrResult(null);
    setAvatarData(null);
    setBatchItems([]);
    setZipBlob(null);
    setBatchFailedCount(0);
    setBatchProcessing(false);
  }

  /** Handles uploaded files — auto-detects single vs batch based on file count */
  const handleFiles = useCallback(async (files: File[]) => {
    if (files.length === 0) return;

    resetState();

    if (files.length === 1) {
      const binaryData = await decodeQRFromFile(files[0]);
      if (!binaryData) {
        setError("Failed to decode QR Code. Please upload a valid avatar QR Code image.");
        return;
      }

      const parsed = parseAvatarFromBuffer(binaryData);
      if (!parsed) {
        setError("Failed to parse avatar data from the QR Code.");
        return;
      }

      setAvatarData(parsed);
      setNewName(parsed.name);
    } else {
      const items: BatchItem[] = files.map((file) => ({
        file,
        avatar: null,
        qrDataUrl: null,
        error: false,
      }));

      const results = await Promise.all(
        files.map(async (file, idx) => {
          const binaryData = await decodeQRFromFile(file);
          if (!binaryData) {
            items[idx].error = true;
            return null;
          }
          const parsed = parseAvatarFromBuffer(binaryData);
          if (!parsed) {
            items[idx].error = true;
            return null;
          }
          items[idx].avatar = parsed;
          return parsed;
        })
      );

      const failedCount = results.filter((r) => r === null).length;
      setBatchFailedCount(failedCount);
      setBatchItems(items);
    }
  }, []);

  /** Processes drag-over event */
  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }

  /** Processes drag-leave event */
  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }

  /** Processes drop event and auto-detects single vs batch */
  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) handleFiles(files);
  }

  /** Handles file input change and auto-detects single vs batch */
  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) handleFiles(files);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  /** Generates a new QR code for single file mode and saves to history */
  async function handleGenerate() {
    if (!avatarData) return;

    const newBuffer = applyUnlock(
      avatarData.buffer,
      unlockCopy,
      unlockSharing,
      newName && newName !== avatarData.name ? newName : undefined
    );

    const dataUrl = await generateAvatarQR(newBuffer);
    if (dataUrl) {
      setQrResult(dataUrl);
      const thumbnail = dataUrlToBlob(dataUrl);
      addHistoryEntry({
        thumbnail,
        avatarName: avatarData.name,
        copying: unlockCopy,
        sharing: unlockSharing,
        gender: avatarData.gender,
        isBatch: false,
        fileCount: 1,
      });
    } else {
      setError("Failed to generate new QR Code.");
    }
  }

  /** Batch processes all uploaded files with Promise.all, then generates a ZIP and saves to history */
  async function handleBatchGenerate() {
    const validItems = batchItems.filter((item) => item.avatar !== null);
    if (validItems.length === 0) return;

    setBatchProcessing(true);
    setBatchProgress({ current: 0, total: validItems.length });

    const zip = new JSZip();
    let current = 0;

    const tasks = validItems.map(async (item) => {
      const unlockedBuffer = applyUnlock(item.avatar!.buffer, unlockCopy, unlockSharing);
      const dataUrl = await generateAvatarQR(unlockedBuffer);

      current++;
      setBatchProgress({ current, total: validItems.length });

      if (dataUrl) {
        const base64 = dataUrl.split(",")[1];
        const safeName = item.avatar!.name.replace(/[^a-zA-Z0-9_-]/g, "_") || "avatar";
        zip.file(`${safeName}-unlocked.png`, base64, { base64: true });
        item.qrDataUrl = dataUrl;
      } else {
        item.error = true;
      }

      return item;
    });

    await Promise.all(tasks);
    setBatchItems([...batchItems]);

    const blob = await zip.generateAsync({ type: "blob" });
    setZipBlob(blob);
    setBatchProcessing(false);

    const successCount = batchItems.filter((i) => i.qrDataUrl).length;
    const firstSuccess = batchItems.find((i) => i.qrDataUrl);
    if (firstSuccess?.qrDataUrl) {
      const thumbnail = dataUrlToBlob(firstSuccess.qrDataUrl);
      addHistoryEntry({
        thumbnail,
        avatarName: firstSuccess.avatar?.name || "Batch",
        copying: unlockCopy,
        sharing: unlockSharing,
        gender: firstSuccess.avatar?.gender ?? 0,
        isBatch: true,
        fileCount: successCount,
      });
    }
  }

  /** Downloads the single generated QR code image */
  function handleDownload() {
    if (!qrResult) return;
    const link = document.createElement("a");
    link.download = "avatar-unlocked-qr.png";
    link.href = qrResult;
    link.click();
  }

  /** Downloads the batch ZIP file */
  function handleDownloadZip() {
    if (!zipBlob) return;
    const link = document.createElement("a");
    link.download = "unlocked-avatars.zip";
    link.href = URL.createObjectURL(zipBlob);
    link.click();
    URL.revokeObjectURL(link.href);
  }

  return (
    <div>
      <h2 className="mb-2 font-mono text-xl font-bold text-gray-900 sm:text-2xl">
        {t("title")}
      </h2>
      <p className="mb-6 text-sm text-gray-500">
        {t("subtitle")}
      </p>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 transition-colors ${
          isDragOver
            ? "border-island-blue bg-island-blue/10"
            : "border-gray-300 bg-gray-50 hover:border-sunshine hover:bg-sunshine/5"
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <span className="text-3xl">📷</span>
        <p className="mt-2 text-center text-sm text-gray-500">
          {t("uploadHint")}
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>

      <div className="mt-3 rounded-xl bg-blue-50 p-3 text-xs leading-relaxed text-blue-700">
        {t("safetyNote")}
      </div>

      {error && (
        <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
          ⚠️ {error}
        </div>
      )}

      {!isBatchMode && avatarData && (
        <div
          className={`mt-6 rounded-2xl border-2 p-5 ${
            avatarData.gender === 0
              ? "border-island-blue/30 bg-island-blue/5"
              : "border-island-pink/30 bg-island-pink/5"
          }`}
        >
          <h3 className="mb-3 font-mono text-base font-bold text-gray-900">
            {t("avatarInfo")}
          </h3>
          <div className="mb-4 flex flex-wrap gap-4 text-sm">
            <span className="text-gray-600">
              {t("avatarName")}: <strong className="text-gray-900">{avatarData.name}</strong>
            </span>
            <span className="text-gray-600">
              {t("avatarGender")}:{" "}
              <strong className="text-gray-900">
                {avatarData.gender === 0 ? t("male") : t("female")}
              </strong>
            </span>
          </div>

          <div className="space-y-3">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-white p-3 shadow-sm transition-all hover:shadow-md">
              <input
                type="checkbox"
                checked={unlockCopy}
                onChange={(e) => setUnlockCopy(e.target.checked)}
                className="h-5 w-5 rounded accent-island-blue"
              />
              <span className="text-sm text-gray-700">🔓 {t("optionCopy")}</span>
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-white p-3 shadow-sm transition-all hover:shadow-md">
              <input
                type="checkbox"
                checked={unlockSharing}
                onChange={(e) => setUnlockSharing(e.target.checked)}
                className="h-5 w-5 rounded accent-island-blue"
              />
              <span className="text-sm text-gray-700">🔓 {t("optionSharing")}</span>
            </label>

            <div className="rounded-xl bg-white p-3 shadow-sm">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                ✍️ {t("inputName")}
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={t("inputNamePlaceholder")}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition-colors focus:border-island-blue"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="mt-5 w-full rounded-2xl bg-sunshine py-3 font-mono text-base font-bold text-gray-900 shadow-sm transition-all hover:shadow-md active:scale-95"
          >
            {t("submitBtn")}
          </button>
        </div>
      )}

      {!isBatchMode && qrResult && (
        <div className="mt-6 text-center">
          <div className="mb-3 rounded-xl bg-green-50 p-3 text-sm font-semibold text-green-700">
            ✅ {t("success")}
          </div>
          <div className="inline-block rounded-2xl border-2 border-black bg-white p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrResult}
              alt="Unlocked Avatar QR Code"
              width={256}
              height={256}
              className="block"
            />
          </div>
          <div className="mt-3">
            <button
              onClick={handleDownload}
              className="rounded-xl bg-island-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md active:scale-95"
            >
              {t("downloadBtn")}
            </button>
          </div>
        </div>
      )}

      {isBatchMode && (
        <div className="mt-6 rounded-2xl border-2 border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-mono text-base font-bold text-gray-900">
              {t("fileCount", { count: batchItems.length })}
            </h3>
            {batchFailedCount > 0 && (
              <span className="text-xs text-red-500">
                {t("parseFailed", { count: batchFailedCount })}
              </span>
            )}
          </div>

          <div className="mb-4 space-y-3">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-gray-50 p-3 shadow-sm transition-all hover:shadow-md">
              <input
                type="checkbox"
                checked={unlockCopy}
                onChange={(e) => setUnlockCopy(e.target.checked)}
                className="h-5 w-5 rounded accent-island-blue"
              />
              <span className="text-sm text-gray-700">🔓 {t("optionCopy")}</span>
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-gray-50 p-3 shadow-sm transition-all hover:shadow-md">
              <input
                type="checkbox"
                checked={unlockSharing}
                onChange={(e) => setUnlockSharing(e.target.checked)}
                className="h-5 w-5 rounded accent-island-blue"
              />
              <span className="text-sm text-gray-700">🔓 {t("optionSharing")}</span>
            </label>
          </div>

          <div className="mb-4 max-h-60 space-y-2 overflow-y-auto">
            {batchItems.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 rounded-xl p-3 text-sm ${
                  item.error
                    ? "bg-red-50 text-red-600"
                    : item.avatar
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-50 text-gray-500"
                }`}
              >
                <span className="text-lg">{item.error ? "❌" : item.avatar ? "✅" : "⏳"}</span>
                <span className="flex-1 truncate font-medium">
                  {item.avatar?.name || item.file.name}
                </span>
                {item.avatar && (
                  <span className="text-xs opacity-70">
                    {item.avatar.gender === 0 ? t("male") : t("female")}
                  </span>
                )}
              </div>
            ))}
          </div>

          {batchProcessing && (
            <div className="mb-4">
              <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
                <span>{t("processing", { current: batchProgress.current, total: batchProgress.total })}</span>
                <span>{Math.round((batchProgress.current / batchProgress.total) * 100)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-island-blue transition-all duration-300"
                  style={{ width: `${(batchProgress.current / batchProgress.total) * 100}%` }}
                />
              </div>
            </div>
          )}

          {!zipBlob && !batchProcessing && (
            <button
              onClick={handleBatchGenerate}
              disabled={batchItems.filter((i) => i.avatar).length === 0}
              className="w-full rounded-2xl bg-sunshine py-3 font-mono text-base font-bold text-gray-900 shadow-sm transition-all hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t("batchSubmitBtn")}
            </button>
          )}

          {zipBlob && (
            <div className="space-y-3">
              <div className="rounded-xl bg-green-50 p-3 text-center text-sm font-semibold text-green-700">
                ✅ {t("batchSuccess", { count: batchItems.filter((i) => i.qrDataUrl).length })}
              </div>
              <button
                onClick={handleDownloadZip}
                className="w-full rounded-2xl bg-island-blue py-3 font-mono text-base font-bold text-white shadow-sm transition-all hover:shadow-md active:scale-95"
              >
                {t("downloadZipBtn", { count: batchItems.filter((i) => i.qrDataUrl).length })}
              </button>
            </div>
          )}
        </div>
      )}

      <p className="mt-6 text-center text-xs text-gray-400">
        {t("privacyNote")}
      </p>

      <HistoryPanel
        entries={historyEntries}
        loading={historyLoading}
        onDelete={deleteHistoryEntry}
        onClearAll={clearHistory}
        renderEntry={(entry) => {
          const d = entry.data;
          const unlockParts: string[] = [];
          if (d.copying) unlockParts.push(t("optionCopy"));
          if (d.sharing) unlockParts.push(t("optionSharing"));
          return (
            <div className="flex items-center gap-3">
              <ThumbnailImg
                blob={d.thumbnail}
                alt="QR code preview"
                className="h-12 w-12 flex-shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-800">
                  {d.isBatch ? t("fileCount", { count: d.fileCount }) : d.avatarName}
                </p>
                <p className="text-xs text-gray-500">
                  {unlockParts.length > 0 ? `${unlockParts.join(" · ")} · ` : ""}{d.gender === 0 ? t("male") : t("female")}
                </p>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
