"use client";

import { useTranslations } from "next-intl";
import { useState, useRef, useCallback } from "react";
import { type VoiceHistoryData, type VoicePreset } from "@/lib/history-db";
import { useHistory } from "@/hooks/useHistory";
import HistoryPanel from "@/components/HistoryPanel";
import { type Zodiac } from "@/lib/compatibility";

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

export default function VoiceLab() {
  const t = useTranslations("VoiceLab");
  const [voicePreset, setVoicePreset] = useState<VoicePreset>("adultMale");
  const [pitch, setPitch] = useState(300);
  const [speed, setSpeed] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [ttsText, setTtsText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const ttsAbortRef = useRef(false);
  const ttsTimeoutRef = useRef<number>(0);

  const { entries: historyEntries, loading: historyLoading, addEntry: addHistoryEntry, deleteEntry: deleteHistoryEntry, clearAll: clearHistory } = useHistory<VoiceHistoryData>("voice");

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
      /* Close the AudioContext to immediately stop all scheduled audio */
      audioCtxRef.current?.close();
      audioCtxRef.current = null;
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
      /* Close the AudioContext to immediately stop all scheduled audio */
      ttsAbortRef.current = true;
      audioCtxRef.current?.close();
      audioCtxRef.current = null;
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
    const ttsId = Date.now();
    ttsTimeoutRef.current = ttsId;
    setTimeout(() => {
      if (!ttsAbortRef.current && ttsTimeoutRef.current === ttsId) {
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
                  {t(`zodiacs.${d.zodiacA as Zodiac}`)} & {t(`zodiacs.${d.zodiacB as Zodiac}`)}
                </p>
              </div>
            );
          }
          return (
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {(d as { ttsText?: string }).ttsText
                  ? `🔊 "${((d as { ttsText?: string }).ttsText?.length ?? 0) > 20 ? ((d as { ttsText?: string }).ttsText ?? "").slice(0, 20) + "…" : (d as { ttsText?: string }).ttsText ?? ""}"`
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
