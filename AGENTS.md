<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:lifesimgrid-project-rules -->
# LifeSimGrid Project Rules

## Architecture: Topic Clusters SEO Strategy
- Homepage = "aircraft carrier" (aggregates brand authority)
- 4 sub-pages = "destroyers" (target vertical keywords):
  - `/acnh-pixel-studio` — ACNH Custom Designs
  - `/mii-qr-unlocker` — Mii QR Code editing
  - `/tomodachi-voice-lab` — Tomodachi Life voice synthesis
  - `/pixel-grid-studio` — General-purpose pixel grid conversion
- Each sub-page shares tool components (PixelStudio, AvatarEditor, VoiceLab) with homepage tabs

## Routing & i18n
- `next-intl` v4 with `localePrefix: "as-needed"` (en has no prefix)
- Root-level pages (`/acnh-pixel-studio`) serve English with `setRequestLocale("en")`
- Locale-level pages (`/[locale]/acnh-pixel-studio`) use `generateMetadata` with per-locale titles
- 10 locales: en, zh-Hant, zh-CN, ja, ko, es, fr, de, it, nl
- All pages use static export (`output: "export"`) — no server-side runtime

## HTML Semantic Structure (SEO-critical)
- Page titles: `<h1>`, section titles: `<h2>`, sub-sections: `<h3>`, FAQ questions: `<h4>`
- FAQ accordions: MUST use native `<details>` + `<summary>` (Google crawls hidden text)
- Step-by-step guides: MUST use `<ol>` + `<li>` (Google extracts for featured snippets)
- All `<section>` elements with headings: MUST have `aria-labelledby` + matching `id` on heading
- Technical terms (FFL, 0x04, Bytes): wrap in `<code>` tags
- CTA links: MUST use `<Link>` (renders as `<a>`), NEVER `<button onClick>`

## Game Terminology (SEO-critical — do NOT translate literally)
| Concept | en | ja | zh-Hant | zh-CN | ko |
|---------|-----|-----|---------|-------|-----|
| Custom Designs | Custom Designs | マイデザイン | 我的設計 | 我的设计 | 커스텀 디자인 |
| Pro Designs | Pro Designs | PROデザイン | 專業設計 | 专业设计 | 프로 디자인 |
| NookLink App | NookLink | タヌポータル | 狸端機入口站 | 狸端机入口站 | NookLink |
| Mii Maker | Mii Maker | Miiスタジオ | Mii工作室 | Mii工作室 | Mii 스튜디오 |
| Tomodachi Life | Tomodachi Life | トモダチコレクション 新生活 | 朋友聚會 新生活 | 朋友聚会 新生活 | Tomodachi Life |
| NookPhone | NookPhone | タヌフォン | 狸端機 | 狸端机 | 누크폰 |
| ACNH Full Title | Animal Crossing: New Horizons | どうぶつの森 新ホライズン | 集合啦！動物森友會 | 集合啦！动物森友会 | 모여봐요 동물의 숲 |

## Localization Quality Standards
- **European languages (de, es, fr, it, nl)**: ALL technical entity words MUST stay in English — HTML5 Canvas API, Web Audio API, jsQR, localStorage, IndexedDB, Promise.all, ArrayBuffer, qrcode, JSZip, Lucide Icons, Cloudflare Pages, Next.js 16 App Router, TypeScript, Tailwind CSS, next-intl, SSG, CDN, MIT License, ISC License, Google Analytics 4, GA4, Microsoft Clarity, Google AdSense, Carbon Ads, EthicalAds, COPPA, GDPR, CCPA, PII, HTTPS, MITM, DevTools, Network tab, FFL, 0x04, Byte Mode
- **Asian languages (ja, zh-Hant, zh-CN)**: Technical entity words stay in English; game terminology MUST use official in-game terms (see table above)
- **Korean (ko)**: Technical entity words stay in English; game terminology uses official Korean in-game terms (커스텀 디자인, 프로 디자인, 누크폰, Mii 스튜디오); "Tomodachi Life" stays in English (not released in Korean); ACNH full title uses 모여봐요 동물의 숲
- **All locales**: Must maintain 448 keys matching en.json exactly; information density must match en/de baselines; legal disclaimers (COPPA, GDPR, CCPA, PII, HTTPS, MITM) always in English

## next-intl Rich Text Tags
- `<pixel>`, `<qr>`, `<voice>` — internal cross-links in SEOSection
- `<email>` — renders as `<a href="mailto:...">` in ContactPage

## JSON-LD Security
- All `dangerouslySetInnerHTML` with `JSON.stringify` MUST append `.replace(/<\/script/g, "<\\/script")` to prevent XSS
<!-- END:lifesimgrid-project-rules -->
