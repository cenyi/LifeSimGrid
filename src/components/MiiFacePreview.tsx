/**
 * Mii SVG preview for the Mii Creator page.
 * Renders face shape + hair style + hair color + skin tone.
 * Pure client-side, deterministic from MiiAppearance.
 */
import type { MiiAppearance } from "@/lib/mii-creator-data";
import type { ReactElement } from "react";

const FACE_SHAPES: Record<string, { rx: number; ry: number; cx: number; cy: number }> = {
  round:   { rx: 78, ry: 84, cx: 100, cy: 100 },
  oval:    { rx: 64, ry: 88, cx: 100, cy: 100 },
  heart:   { rx: 74, ry: 80, cx: 100, cy: 104 },
  square:  { rx: 76, ry: 80, cx: 100, cy: 100 },
  diamond: { rx: 62, ry: 88, cx: 100, cy: 100 },
};

function hairLayer(style: string, color: string): ReactElement | null {
  switch (style) {
    case "short":
      return (
        <path
          d="M 30 70 Q 40 18 100 16 Q 160 18 170 70 Q 140 52 100 50 Q 60 52 30 70 Z"
          fill={color}
        />
      );
    case "medium":
      return (
        <g>
          <path
            d="M 24 84 Q 28 14 100 12 Q 172 14 176 84 Q 140 58 100 56 Q 60 58 24 84 Z"
            fill={color}
          />
          <path d="M 24 84 L 24 132 L 40 132 L 40 96 Z" fill={color} opacity="0.9" />
          <path d="M 176 84 L 176 132 L 160 132 L 160 96 Z" fill={color} opacity="0.9" />
        </g>
      );
    case "long":
      return (
        <g>
          <path
            d="M 18 96 Q 20 10 100 8 Q 180 10 182 96 L 182 188 L 160 188 L 160 110 L 40 110 L 40 188 L 18 188 Z"
            fill={color}
          />
          <path d="M 34 100 Q 100 70 166 100" stroke="rgba(0,0,0,0.18)" strokeWidth="3" fill="none" />
        </g>
      );
    case "bun":
      return (
        <g>
          <path
            d="M 30 74 Q 40 18 100 16 Q 160 18 170 74 Q 140 54 100 52 Q 60 54 30 74 Z"
            fill={color}
          />
          <circle cx="100" cy="22" r="20" fill={color} />
        </g>
      );
    case "afro":
      return (
        <g>
          <ellipse cx="100" cy="64" rx="84" ry="58" fill={color} />
          <ellipse cx="100" cy="64" rx="62" ry="44" fill="rgba(0,0,0,0.14)" />
        </g>
      );
    case "spiky":
      return (
        <g>
          <path
            d="M 26 78 L 36 30 L 54 66 L 70 22 L 88 62 L 104 18 L 120 60 L 138 26 L 154 66 L 170 34 L 174 78 Q 140 56 100 54 Q 60 56 26 78 Z"
            fill={color}
          />
        </g>
      );
    case "curly":
      return (
        <g>
          <path
            d="M 28 86 Q 28 20 100 18 Q 172 20 172 86 Q 148 64 100 62 Q 52 64 28 86 Z"
            fill={color}
          />
          {[36, 58, 80, 100, 120, 142, 164].map((x, i) => (
            <circle key={i} cx={x} cy={48 - (i % 3) * 6} r="12" fill={color} />
          ))}
        </g>
      );
    case "bald":
      return null;
    default:
      return null;
  }
}

export default function MiiFacePreview({ appearance }: { appearance: MiiAppearance }) {
  const shape = FACE_SHAPES[appearance.faceShape] ?? FACE_SHAPES.round;
  const hair = hairLayer(appearance.hairStyle, appearance.hairColor);

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[260px] drop-shadow-md">
      {/* background */}
      <rect x="0" y="0" width="200" height="200" rx="16" fill="#f8fafc" />
      {/* back hair for long styles (behind face) */}
      {appearance.hairStyle === "long" && (
        <g>
          <path
            d="M 18 96 Q 20 10 100 8 Q 180 10 182 96 L 182 188 L 160 188 L 160 110 L 40 110 L 40 188 L 18 188 Z"
            fill={appearance.hairColor}
          />
        </g>
      )}
      {/* face */}
      <ellipse cx={shape.cx} cy={shape.cy} rx={shape.rx} ry={shape.ry} fill={appearance.skinTone} stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
      {/* ears */}
      <ellipse cx={shape.cx - shape.rx - 4} cy={shape.cy + 6} rx="10" ry="14" fill={appearance.skinTone} stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />
      <ellipse cx={shape.cx + shape.rx + 4} cy={shape.cy + 6} rx="10" ry="14" fill={appearance.skinTone} stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />
      {/* eyes */}
      <ellipse cx="72" cy="96" rx="10" ry="13" fill="white" stroke="#1e293b" strokeWidth="2" />
      <ellipse cx="128" cy="96" rx="10" ry="13" fill="white" stroke="#1e293b" strokeWidth="2" />
      <circle cx="73" cy="98" r="6" fill="#2b3a55" />
      <circle cx="127" cy="98" r="6" fill="#2b3a55" />
      <circle cx="75" cy="95" r="1.6" fill="white" />
      <circle cx="129" cy="95" r="1.6" fill="white" />
      {/* eyebrows */}
      <path d="M 62 78 Q 72 72 84 78" stroke="#5b3a29" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 116 78 Q 128 72 140 78" stroke="#5b3a29" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* nose */}
      <path d="M 100 104 Q 96 112 100 114" stroke="rgba(0,0,0,0.3)" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* mouth */}
      <path d="M 84 132 Q 100 144 116 132" stroke="#7a3b2e" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* front hair */}
      {hair}
      {/* blush */}
      <ellipse cx="56" cy="118" rx="10" ry="5" fill="rgba(255,120,120,0.35)" />
      <ellipse cx="144" cy="118" rx="10" ry="5" fill="rgba(255,120,120,0.35)" />
    </svg>
  );
}
