<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:lifesimgrid-project-rules -->
# LifeSimGrid Project Rules

## Architecture: Topic Clusters SEO Strategy
- Homepage = "aircraft carrier" (aggregates brand authority)
- 5 sub-pages = "destroyers" (target vertical keywords):
  - `/acnh-pixel-studio` — ACNH Custom Designs
  - `/mii-qr-unlocker` — Mii QR Code editing
  - `/tomodachi-voice-lab` — Tomodachi Life voice synthesis
  - `/tomodachi-life-mbti` — Tomodachi Life MBTI 16-personality mapping & compatibility
  - `/pixel-grid-studio` — General-purpose pixel grid conversion
- Each sub-page has its own dedicated page component (AcnhPixelStudioPage, MiiQrUnlockerPage, TomodachiVoiceLabPage, TomodachiLifeMbtiPage, PixelGridStudioPage) and shares tool components (PixelStudio, AvatarEditor, VoiceLab) with homepage tabs

## Routing & i18n
- `next-intl` v4 with `localePrefix: "as-needed"` (en has no prefix)
- Root-level pages (`/acnh-pixel-studio`) serve English with `setRequestLocale("en")`
- Locale-level pages (`/[locale]/acnh-pixel-studio`) use `generateMetadata` with per-locale titles
- Canonical URL: `locale === "en"` → canonical points to root-level URL (no `/en/` prefix)
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

## JSON-LD Structured Data Rules
- **WebApplication** (NOT SoftwareApplication): All 5 sub-pages use `WebApplication` schema type
- **FAQPage**: All sub-pages include FAQ with `<details>`/`<summary>` markup + FAQPage JSON-LD
- **BreadcrumbList**: MUST dynamically generate URLs based on current locale (`locale === "en"` → no prefix, others → `/${locale}/...`)
- **HowTo**: Used by sub-pages with step-by-step guides (e.g., tomodachi-life-mbti compatibility calculator steps)
- **OG Images**: SVG format at `/og/{sub-page-slug}.svg` (1200×630), referenced in `openGraph.images`

## GEO (Generative Engine Optimization) Content Rules
- FAQ answers: First sentence MUST state the conclusion directly (主谓宾清晰)
- Use specific numbers, technical terms, and causal relationships for AI citability
- Algorithm transparency: Declare formula components explicitly (e.g., "Base Score (25) + Personality (25) + Zodiac (25) + Friendship (25)")
- Avoid absolute claims ("perfectly", "authentic", "unlock") — use measured language ("closely", "characteristic", "explore")
- Include complete mapping declarations (e.g., "16 MBTI types fully mapped to Tomodachi Life personalities")
- MBTI and Nintendo are registered trademarks — MUST include disclaimer in privacy/footnote sections

## Meta Title & Description Length Limits (Google SERP Pixel-based)
Google truncates based on pixel width (Desktop Title ~600px, Description ~920px). Character limits vary by script type. ALWAYS write localized meta tags from scratch — NEVER machine-translate from English (translation typically inflates 20%+ causing truncation).

### Keywords Meta Tag Policy
- `keywords` in metadata MUST be set to an empty array `[]` — Google does NOT use the keywords meta tag for ranking (official since 2009); populating it wastes bytes and can expose SEO strategy to competitors
- All pages inherit `keywords: []` from `layout.tsx`; do NOT override in sub-pages

| Locale | Title Max (Desktop) | Description Max (Mobile/Desktop) | Script Group |
|--------|---------------------|----------------------------------|-------------|
| en | 55–60 chars | 120 / 155 chars | Standard Latin |
| zh-Hant | 25–28 字 | 60 字 / 75 字 | Fullwidth (CJK) |
| zh-CN | 25–28 字 | 60 字 / 75 字 | Fullwidth (CJK) |
| ja | 25–28 字 | 60 字 / 75 字 | Fullwidth (CJK) |
| ko | 25–28 字 | 60 字 / 75 字 | Fullwidth (CJK) |
| de | 40–45 chars | 100 / 135 chars | Long-word Latin |
| es | 50–55 chars | 115 / 150 chars | Standard Latin |
| fr | 50–55 chars | 115 / 150 chars | Standard Latin |
| it | 50–55 chars | 115 / 150 chars | Standard Latin |
| nl | 50–55 chars | 115 / 150 chars | Standard Latin |

### Three Golden Rules for Cross-locale Meta Tags
1. **Never machine-translate Meta tags**: A 60-char English Title will typically inflate 20%+ in de/es/fr, causing truncation. Always rewrite for each locale within limits.
2. **Uppercase trap**: In Western languages, ALL-CAPS letters consume ~1.5× pixel width of lowercase. Avoid ALL-CAPS in Titles.
3. **Punctuation counts**: ¿? ¡! guillemets «», smart quotes, spaces — all consume pixels. Account for them when counting.

## Tab Content Rendering
- Sub-page tabs use CSS `hidden` class (NOT React conditional rendering) to ensure Google crawls all tab content
- Public sections (How It Works, FAQ) are placed outside tabs as fixed page sections
- Tab navigation uses `justify-center` for center alignment

## Technical Term Rendering
- Use `renderCodeTerms()` function pattern: regex-replace technical terms (FFL, 0x04, HTML5 Canvas API, Web Audio API, NookLink, NookPhone, Byte Mode, etc.) with `<code>` tags
- Rendered via `dangerouslySetInnerHTML={{ __html: renderCodeTerms(text) }}` on translated strings
- Currently used in AcnhPixelStudioPage.tsx; extend to other sub-pages when technical terms appear in i18n strings
<!-- END:lifesimgrid-project-rules -->
