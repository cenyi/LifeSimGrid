<div align="center">

# 🏝️ LifeSimGrid

**Custom Avatar Grid & Life Sim Studio**

*An open-source, 100% serverless web utility suite designed for lifestyle and social simulation enthusiasts.*

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![100% Client-Side](https://img.shields.io/badge/Privacy-100%25_Client--Side-brightgreen)]()
[![Languages](https://img.shields.io/badge/i18n-10_Languages-blueviolet)]()
[![Docker Build](https://github.com/cenyi/LifeSimGrid/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/cenyi/LifeSimGrid/actions/workflows/docker-publish.yml)

🌐 **English** | [繁體中文](#繁體中文) | [日本語](#日本語) | [Español](#español) | [Français](#français) | [한국어](#한국어) | [Deutsch](#deutsch) | [Italiano](#italiano) | [Nederlands](#nederlands) | [简体中文](#简体中文)

**[🔗 Live Demo](https://lifesimgrid.org)** · **[🐛 Report Bug](https://github.com/cenyi/LifeSimGrid/issues)** · **[✨ Request Feature](https://github.com/cenyi/LifeSimGrid/issues)**

</div>

---

## English

### 🎯 What is LifeSimGrid?

**LifeSimGrid** is an advanced **unofficial Animal Crossing pattern tool** and an open-source, web-based **Mii QR code editor**. It serves as the ultimate 100% serverless **alternative to Living the Grid** for modern life simulation games. 

As a free, browser-based web toolkit, all binary cryptographic parsing, HTML5 Canvas sampling, and chiptune audio synthesis happen entirely on the client-side. This ensures absolute 100% data privacy and lightning-fast local performance — no cloud servers, no account sign-ups, and no database tracking required.

### 📸 Screenshots

> *Coming soon — community contributions and Pull Requests with live screenshots are highly welcome!*

### ✨ Topic Clusters Architecture & Dedicated Studios

LifeSimGrid uses a **Topic Clusters SEO strategy**: the homepage acts as an "aircraft carrier" aggregating brand authority, while 5 dedicated sub-pages serve as "destroyers" targeting specific vertical keywords for search-traffic acquisition.

#### 🎨 ACNH Pixel Studio (`/acnh-pixel-studio`)
*   Dedicated sub-page for **Animal Crossing Custom Designs** pattern conversion.
*   Features How-to-Import guide, Why-Use section, FAQ with JSON-LD structured data, and cross-links to other tools.
*   Targets vertical keywords like "ACNH custom design pixel studio", "animal crossing pattern converter".

#### 🔓 Mii QR Unlocker (`/mii-qr-unlocker`)
*   Dedicated sub-page for **Mii QR code** editing and FFL protocol permission unlocking.
*   Features How-to-Fix guide, Supported Consoles section, FFL Format technical deep-dive with `<code>` tag highlighting, and FAQ with JSON-LD.
*   Targets vertical keywords like "Mii QR code unlocker", "fix locked Mii QR codes", "FFL format".

#### 🔮 Tomodachi Voice Lab (`/tomodachi-voice-lab`)
*   Dedicated sub-page for **Tomodachi Life** voice synthesis and personality compatibility.
*   Features 16-Personality Matrix with color-coded groups (amber/red/purple/green), Voice Guide, Why Choose section, and FAQ with JSON-LD.
*   Targets vertical keywords like "Tomodachi Life voice calculator", "Tomodachi personality types".

#### 🔲 Pixel Grid Studio (`/pixel-grid-studio`)
*   Dedicated sub-page for **general-purpose pixel grid** conversion (cross-stitch, Perler beads, pixel art templates).
*   Features Turn-Photo guide, Why Choose section, print-optimized layout, and FAQ with JSON-LD.
*   Targets vertical keywords like "pixel art grid converter", "cross stitch pattern generator", "Perler beads template".

#### 🧠 Tomodachi Life MBTI (`/tomodachi-life-mbti`)
*   Dedicated sub-page for **Tomodachi Life MBTI** 16-personality mapping and compatibility calculator.
*   Features 5-tab layout (Compatibility Calculator, Personality Chart, Voice Tool, Fan Map, Character Roster), How It Works section, FAQ with JSON-LD, and BreadcrumbList/HowTo structured data.
*   Targets vertical keywords like "Tomodachi Life MBTI", "Tomodachi Life personality types", "Tomodachi Life compatibility".

#### 🏠 Homepage Hub
*   The homepage features tab-based tool switching for returning users and 5 CTA cards linking to sub-pages for new search-traffic users.
*   Trust & Privacy section reinforces the 100% client-side, zero-data-upload commitment.

### 🔒 Privacy-First Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            Your Client Browser Sandbox                      │
│                                                                             │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌─────────────────┐  │
│  │      HTML5 Canvas     │  │     jsQR + qrcode     │  │  Web Audio API  │  │
│  │  (Animal Crossing     │  │ (Mii FFL Cryptographic│  │ (Tomodachi Mii  │  │
│  │   Pattern Pixelator)  │  │   Buffer QR Codec)    │  │Procedural Synth)│  │
│  └──────────┬────────────┘  └───────────┬───────────┘  └────────┬────────┘  │
│             │                           │                       │           │
│             └───────────────────────────┼───────────────────────┘           │
│                                         ▼                                   │
│                            Browser localStorage & IndexedDB                 │
│                          (100% Living the Grid Serverless Alternative)      │
└─────────────────────────────────────────────────────────────────────────────┘
          ✕ No cloud backend     ✕ No database tracking     ✕ Zero data uploads
```

- **100% Client-Side Architecture** — Zero cloud servers, zero backend database tracking, and absolute zero outbound data uploads. A fully secure web alternative to legacy platforms like Living the Grid.
- **Local Sandbox Execution** — All custom image pixelation, Mii FFL binary cryptographic buffer parsing, and chiptune speech synthesis execute strictly inside your browser.
- **Privacy-First Data Flow** — Your Tomodachi island resident roster and settings are committed to local browser `localStorage` and `IndexedDB` only — your island's data never leaves your physical device.
- **100% Free & Open-Source** — Fully transparent data flows and auditable source code published on GitHub under the permissive MIT License.

### 🌍 Supported Communities & Languages (10)

`en` · `zh-Hant` · `ja` · `es` · `fr` · `ko` · `de` · `it` · `nl` · `zh-CN`

### 🛠️ Tech Stack & Architecture


| Category | High-Performance Technology & Implementation |
|----------|-----------|
| **Framework** | Next.js 16 (App Router Framework) + TypeScript (Strict Type Safety) |
| **Styling** | Tailwind CSS (Utility-first atomic styling) |
| **i18n Localization**| `next-intl` v4 (`localePrefix: "as-needed"` for optimized search engine multi-language indexing) |
| **QR Codec Matrix**  | `jsQR` (Local Mii binary matrix extraction) + `qrcode` (Version 3 Mii-compatible Byte Mode encoding) |
| **Client Archive**  | `JSZip` (High-performance parallel browser-side archival compilation and local multi-file ZIP generation) |
| **Audio Engine** | Native Web Audio API (Low-level `OscillatorNode` sawtooth/square wave procedural synthesis + `BiquadFilterNode`) |
| **Imaging Pipeline** | HTML5 Canvas API (`imageSmoothingEnabled: false` forced for nearest-neighbor crisp pixel grid rendering) |
| **Deployment** | Static Export Optimization (SSG) → Scaled globally on Cloudflare Pages global edge CDN network |

### 🚀 Getting Started

#### Prerequisites

- **Node.js** ≥ 18.17
- **npm** ≥ 9

#### Installation

```bash
# Clone the repository
git clone https://github.com/cenyi/LifeSimGrid.git
cd LifeSimGrid

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Production Build

```bash
# Generate static export
npm run build

# Preview the build locally
npx serve out
```

### 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [locale]/           # i18n locale routes (10 languages)
│   │   ├── page.tsx        # Home page (SSG)
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   ├── privacy/        # Privacy policy
│   │   ├── terms/          # Terms of service
│   │   ├── acnh-pixel-studio/    # ACNH Custom Designs sub-page
│   │   ├── mii-qr-unlocker/     # Mii QR Code sub-page
│   │   ├── tomodachi-voice-lab/ # Tomodachi Voice sub-page
│   │   ├── tomodachi-life-mbti/ # Tomodachi Life MBTI sub-page
│   │   └── pixel-grid-studio/   # Pixel Grid Studio sub-page
│   ├── acnh-pixel-studio/  # Root-level EN sub-page
│   ├── mii-qr-unlocker/   # Root-level EN sub-page
│   ├── tomodachi-voice-lab/ # Root-level EN sub-page
│   ├── tomodachi-life-mbti/ # Root-level EN sub-page
│   ├── pixel-grid-studio/  # Root-level EN sub-page
│   ├── layout.tsx          # Root layout + metadataBase
│   └── globals.css         # Global styles + anchor link CSS
├── components/             # React components
│   ├── HomePageContent.tsx # Tab switching, Feature & Trust sections
│   ├── AcnhPixelStudioPage.tsx  # ACNH sub-page component
│   ├── MiiQrUnlockerPage.tsx    # Mii QR sub-page component
│   ├── TomodachiVoiceLabPage.tsx # Voice Lab sub-page component
│   ├── TomodachiLifeMbtiPage.tsx # MBTI sub-page component
│   ├── PixelGridStudioPage.tsx  # Pixel Grid sub-page component
│   ├── AboutPage.tsx       # About page component
│   ├── ContactPage.tsx     # Contact page component
│   ├── PrivacyPage.tsx     # Privacy page component
│   ├── TermsPage.tsx       # Terms page component
│   ├── PixelStudio.tsx     # Pixel grid converter (shared tool)
│   ├── AvatarEditor.tsx    # Avatar QR configurator (shared tool)
│   ├── VoiceLab.tsx        # Voice synth & relationship lab (shared tool)
│   ├── SEOSection.tsx      # Guide, FAQ & JSON-LD (details/summary)
│   ├── HistoryPanel.tsx    # History panel (aside + aria-live)
│   ├── EnRedirect.tsx      # EN locale redirect handler
│   ├── Navbar.tsx          # Navigation with tool links & language switcher
│   └── Footer.tsx          # Footer with tool links & disclaimer
├── i18n/                   # next-intl configuration
│   ├── routing.ts          # Locale routing config
│   └── request.ts          # Server-side i18n setup
├── lib/                    # Core logic
│   ├── compatibility.ts    # Zodiac & personality algorithms
│   ├── qr-handler.ts       # QR decode/encode logic
│   └── history-db.ts       # History database (IndexedDB wrapper)
└── locales/                # Translation files (10 languages)
    ├── en.json             # English (American)
    ├── zh-Hant.json        # Traditional Chinese
    ├── ja.json             # Japanese
    ├── es.json             # Spanish
    ├── fr.json             # French
    ├── ko.json             # Korean
    ├── de.json             # German
    ├── it.json             # Italian
    ├── nl.json             # Dutch
    └── zh-CN.json          # Simplified Chinese
```

### 🚢 Deployment

This project uses Next.js static export (`output: 'export'`), making it compatible with any static hosting provider.

#### Cloudflare Pages

1. Fork or push this repo to GitHub
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages → Create a project
3. Connect your GitHub repo
4. Set build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
5. Deploy — done!

> **Note**: No environment variables are needed. The entire app is 100% static.

#### Docker

This project includes a multi-stage `Dockerfile` that builds the static export and serves it via nginx.

**Option A: Pull pre-built image from GHCR (recommended)**

```bash
# Pull the latest image
docker pull ghcr.io/cenyi/lifesimgrid:latest

# Run the container
docker run -d -p 8080:80 ghcr.io/cenyi/lifesimgrid:latest
```

To update to the latest version:

```bash
docker pull ghcr.io/cenyi/lifesimgrid:latest
docker compose up -d   # or restart your container
```

**Option B: Build from source**

```bash
# Build the Docker image
docker build -t lifesimgrid .

# Run the container
docker run -d -p 8080:80 lifesimgrid
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

**Docker Compose** (optional):

```yaml
services:
  lifesimgrid:
    image: ghcr.io/cenyi/lifesimgrid:latest
    # Or build from source: build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

```bash
# Start with Docker Compose
docker compose up -d
```

> **Note**: The Docker image uses nginx to serve the same static `out/` directory. This does not affect the Cloudflare Pages deployment — both methods serve identical static files.

### 🤝 Contributing

We love community contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

#### Ways to Contribute

- 🌐 **Translations** — Add or improve translations in `src/locales/`
- 🐛 **Bug Reports** — File issues at [GitHub Issues](https://github.com/cenyi/LifeSimGrid/issues)
- 🎨 **UI/UX** — Improve accessibility, mobile responsiveness, or design
- 📖 **Documentation** — Fix typos, add guides, improve README
- 🧪 **Testing** — Add unit tests or integration tests

#### Translation Guidelines

Each locale file (`src/locales/*.json`) must have exactly the same keys as `en.json`. When adding new keys:

1. Add the key to `en.json` first
2. Add the key to all other locale files
3. Use natural, native expressions — not machine translations
4. Keep `<pixel>`, `<qr>`, `<voice>`, `<email>` next-intl rich text tags as-is
5. Keep emoji prefixes, technical terms, and brand names as-is

### 🔒 Privacy & Copyright Disclaimer

*   **100% Browser-Local Computation**: This open-source repository operates on a strict zero-backend, zero-database paradigm. Every asset uploaded for grid quantization and every Mii FFL binary buffer byte stream decoded is compiled and processed in real-time exclusively within your local device's memory. No tracking data or personal content is ever cached, logged, or transmitted to any external cloud infrastructure.
*   **Nominative Fair Use & Technical Neutrality**: This repository stands as an entirely independent, third-party open-source development practice. It is designed solely to demonstrate the utility of modern frontend APIs (such as HTML5 Canvas and native Web Audio) for texturing tracing and structured byte data reconstruction. 
*   **Trademark Clarification**: LifeSimGrid has absolute zero commercial affiliation, operational partnership, official authorization, or sponsorship endorsement with Nintendo Co., Ltd., or any game console manufacturers, software developers, and publishers. Titles such as "Animal Crossing", "Tomodachi Life", and "Mii" are registered trademarks of their respective copyright holders, referenced here strictly under nominative fair use for platform compatibility and technological identification purposes only. All technical comparisons to legacy web tools like "Living the Grid" are positioned purely as an educational sandbox alternative demonstration.

### 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

### ⚖️ Legal Disclaimer

LifeSimGrid stands as an entirely independent, unofficial third-party community fan utility suite and an advanced web alternative to legacy toolsets. This project is not affiliated with, authorized, sponsored, or endorsed by any console manufacturers, software developers, or game publishers. All universal Mii FFL binary specifications, character format protocols, and grid specs mentioned across the repository are the sole properties of their respective trademark holders, referenced here strictly under nominative fair use for technological identification and compatibility purposes.

### 🛡️ Security Policy

We are deeply committed to data security and local privacy-first sandboxing. If you discover any potential security vulnerability, protocol parsing anomaly, or data flow exception within this toolkit, please **do not** open a public GitHub issue. 

Instead, report it responsibly via email to **hi@lifesimgrid.org**. Our core engineering volunteers take all technical security reports seriously and will investigate and respond within 48 hours.

### 📋 Project Roadmap

- [x] **Topic Clusters SEO Architecture**: 5 dedicated sub-pages targeting vertical keywords with JSON-LD structured data, semantic HTML, and internal link network.
- [x] **Semantic HTML & Accessibility**: `<details>`/`<summary>` FAQ accordions, `<ol>`/`<li>` step lists, `aria-labelledby` sections, `aria-live` loading states, print-optimized layouts.
- [x] **Official Game Terminology Alignment**: All 10 locales use correct in-game terms (マイデザイン, PROデザイン, タヌポータル, 我的設計, 朋友聚會 新生活, 커스텀 디자인, 프로 디자인, etc.).
- [x] **Full 10-Language Localization Quality Audit**: All 8 non-en/de locale files audited and corrected against en/de baselines — technical entity words kept in English (European languages), official game terminology enforced (Asian languages), information density parity achieved, legal disclaimers standardized (448 keys per file, all validated).
- [ ] **PWA Support**: Full Progressive Web App capability offering 100% offline functionality via custom Service Worker caching.
- [ ] **Dark Mode Toggle**: Fluid, system-adaptive dark theme implementation utilizing Tailwind CSS atomic styling.
- [ ] **Expanded Localization**: Additional i18n locale integrations covering `pt-BR`, `ru`, `th`, and `vi`.
- [ ] **Pixel Studio Upgrade**: Support for custom user-defined pixel grid canvas sizes beyond standard asset specifications.
- [ ] **Voice Lab Visualization**: Live HTML5 Canvas waveform audio visualization mirroring real-time Web Audio API frequency outputs.
- [ ] **Accessibility Optimization**: Comprehensive structural audit complying strictly with WCAG 2.1 AA international web standards.

---

## 繁體中文

### 🎯 LifeSimGrid 是什麼？

**LifeSimGrid** 是一款進階的**非官方 Animal Crossing 圖案工具**，同時也是一個開源、基於網頁的 **Mii QR code 編輯器**。它作為現代生活模擬遊戲的終極 100% 無伺服器 **Living the Grid 替代方案**。

作為一款免費的瀏覽器網頁工具套件，所有二進位密碼學解析、HTML5 Canvas 取樣與晶片音訊合成均在用戶端完整執行。這確保了絕對 100% 的資料隱私與閃電般的本機效能——無需雲端伺服器、無需帳號註冊、無需資料庫追蹤。

### ✨ 五大核心工作室

#### 🎨 像素工作室（Animal Crossing 自訂設計圖案工具）
*   **多比例網格畫布**：完美適配**沙盒社交模擬遊戲**中的進階紋理繪圖規範。原生支援正方形 1:1（標準圖案）、長方形 2:3（畫架肖像、專輯封面）與寬螢幕 16:9（大面積自訂室內牆壁壁紙）裁切比例。
*   **多密度筆刷取樣**：提供四種不同的像素密度等級以匹配復古主機網格尺寸——256×256（1px 超精細）、85×85（3px，標準 Pro Design 磁磚佈局）、64×64（4px 簡化畫布）與 32×32（7px 經典設計磁磚）。
*   **前處理影像濾鏡**：內建即時可調式亮度與對比度配置滑桿，大幅消除縮小複雜動漫藝術或遊戲圖形時的混濁色彩失真。
*   **數字填色高亮**：點擊 24 種量化色票中的任何一色，即可在畫布上即時隔離並高亮顯示對應的像素網格索引（以虛線邊框標示），讓你在掌上主機上輕鬆手動臨摹。

#### 🔓 QR 設定修改器（Mii QR Code 編輯器與 FFL 協議權限解鎖器）
*   **並行批次權限解鎖**：支援同時拖放多張 Mii QR code 圖片。透過 `Promise.all` 實現高效能前端異步串流，一鍵解除官方 Mii FFL 二進位協議格式中嵌入的「禁止複製」與「限制分享/編輯」校驗旗標。
*   **線上密碼學改名**：允許在瀏覽器沙盒中直接、安全地修改角色名稱。前端引擎自動覆寫十六進位位元組區段並即時修正二進位驗證校驗碼。
*   **本機用戶端 ZIP 封裝**：運用 `JSZip` 在瀏覽器記憶體中直接將完全解密與修改後的 QR code 資產打包為單一 `.zip` 套件匯出——免除逐一儲存檔案的繁瑣操作。

#### 🔮 語音與關係實驗室（Tomodachi Life 相容性計算器）
*   **8-Bit 語音模擬合成器**：採用底層 Web Audio API 架構（鋸齒波 + 低通濾波器節點）來合成與預覽復古掌機音效晶片的懷舊電子機器人語音。支援原生音高（Hz）與語速參數的完全自訂。
*   **Tomodachi 島嶼關係天梯榜**：具備完全本機自動化管理追蹤器。基於遊戲經典的 12 星座與 16 種核心行為性格群組（例如：獨行俠、自信行動派、外向領導者），使用者可建立最多 15 位居民的自訂島嶼名冊（透過 `localStorage` 安全儲存）。
*   **自動命定交叉演算**：數學引擎即時計算整個名冊的交叉配對，輸出你的島嶼網格終極相容性天梯榜——標示 Top 3 最佳靈魂伴侶（最高浪漫/友誼和諧度）對比 Top 3 最差配對（最可能產生虛擬戲劇衝突）。

#### 🧠 MBTI 人格對應工具（Tomodachi Life MBTI 16 人格映射與相容性計算器）
*   **16 種 MBTI 人格完整映射**：將 MBTI 16 種人格類型完整對應至 Tomodachi Life 遊戲中的性格分組，包含 INFP 雙映射（Sweet/Softie）的特殊處理。
*   **相容性計算器**：5 個分頁式佈局（相容性計算器、人格圖表、語音工具、粉絲地圖、角色名冊），搭配 How It Works 說明區塊與 FAQ，支援 BreadcrumbList/HowTo 結構化資料。
*   **演算法透明宣告**：明確標示公式組成——Base Score (25) + Personality (25) + Zodiac (25) + Friendship (25)，確保結果可追溯。

#### 🔲 像素網格工作室（通用像素網格轉換器）
*   **通用像素網格轉換**：將任何影像轉換為像素網格圖案，支援十字繡（cross-stitch）、Perler beads 拼豆、Minecraft 像素藝術與 Tomodachi Life 自訂設計模板。
*   **彈性網格尺寸與智慧色彩匹配**：提供 5 種網格尺寸（16×16 至 128×128），採用 Euclidean distance 色彩匹配演算法搭配 error-diffusion dithering，即使使用 32 色復古調色盤也能產出準確結果。
*   **照片轉換指南與列印優化佈局**：提供逐步照片轉像素藝術指南。支援原生瀏覽器列印（Ctrl+P），自動隱藏控制面板，輸出乾淨的編號紙本網格藍圖，完美適配十字繡臨摹與離線手工創作。
*   **100% 用戶端架構**：所有影像處理均透過 HTML5 Canvas API 在你的瀏覽器內執行，無需上傳，無資料庫追蹤。

### 🔒 隱私優先架構

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          你的用戶端瀏覽器沙盒                                │
│                                                                             │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌─────────────────┐  │
│  │      HTML5 Canvas     │  │     jsQR + qrcode     │  │  Web Audio API  │  │
│  │  (Animal Crossing     │  │ (Mii FFL 密碼學       │  │ (Tomodachi Mii  │  │
│  │   圖案像素化器)        │  │   緩衝區 QR 編解碼)    │  │ 程序化合成器)    │  │
│  └──────────┬────────────┘  └───────────┬───────────┘  └────────┬────────┘  │
│             │                           │                       │           │
│             └───────────────────────────┼───────────────────────┘           │
│                                         ▼                                   │
│                            瀏覽器 localStorage 與 IndexedDB                 │
│                       （100% Living the Grid 無伺服器替代方案）               │
└─────────────────────────────────────────────────────────────────────────────┘
          ✕ 無雲端後端     ✕ 無資料庫追蹤     ✕ 零數據上傳
```

- **100% 用戶端架構**——零雲端伺服器、零後端資料庫追蹤、絕對零對外數據上傳。相較於 Living the Grid 等傳統平台的完全安全網頁替代方案。
- **本機沙盒執行**——所有自訂圖像像素化、Mii FFL 二進位密碼學緩衝區解析與晶片音訊合成均嚴格在你的瀏覽器內執行。
- **隱私優先資料流**——你的 Tomodachi 島嶼居民名冊與設定僅提交至本機瀏覽器 `localStorage` 與 `IndexedDB`——你的島嶼資料絕不離開你的實體裝置。
- **100% 免費開源**——完全透明的資料流與可審計的原始碼，以寬鬆的 MIT License 發佈於 GitHub。

### 📸 截圖

> *即將推出——歡迎提交截圖 PR！*

### 🌍 支援語言（10 種）

`en` · `zh-Hant` · `ja` · `es` · `fr` · `ko` · `de` · `it` · `nl` · `zh-CN`

### 🛠️ 技術棧與架構


| 類別 | 高效能技術與實作 |
|------|-----------|
| **框架** | Next.js 16（App Router 框架）+ TypeScript（嚴格型別安全） |
| **樣式** | Tailwind CSS（Utility-first 原子化樣式） |
| **i18n 國際化**| `next-intl` v4（`localePrefix: "as-needed"` 最佳化搜尋引擎多語言索引） |
| **QR 編解碼矩陣**  | `jsQR`（本機 Mii 二進位矩陣擷取）+ `qrcode`（Version 3 Mii 相容 Byte Mode 編碼） |
| **用戶端封存**  | `JSZip`（高效能並行瀏覽器端封存編譯與本機多檔 ZIP 生成） |
| **音訊引擎** | 原生 Web Audio API（底層 `OscillatorNode` 鋸齒/方波程序化合成 + `BiquadFilterNode`） |
| **影像管線** | HTML5 Canvas API（`imageSmoothingEnabled: false` 強制最近鄰插值銳利像素網格渲染） |
| **部署** | 靜態匯出最佳化（SSG）→ Cloudflare Pages 全球邊緣 CDN 網路擴展 |

### 🚀 快速開始

#### 前置條件

- **Node.js** ≥ 18.17
- **npm** ≥ 9

#### 安裝

```bash
# 複製倉庫
git clone https://github.com/cenyi/LifeSimGrid.git
cd LifeSimGrid

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

在瀏覽器中開啟 [http://localhost:3000](http://localhost:3000)。

#### 生產建置

```bash
# 生成靜態匯出
npm run build

# 本地預覽建置結果
npx serve out
```

### 📁 專案結構

```
src/
├── app/                    # Next.js App Router 頁面
│   ├── [locale]/           # 國際化語言路由（10 種語言）
│   │   ├── page.tsx        # 首頁（SSG）
│   │   ├── about/          # 關於頁面
│   │   ├── contact/        # 聯絡頁面
│   │   ├── privacy/        # 隱私政策
│   │   ├── terms/          # 服務條款
│   │   ├── acnh-pixel-studio/    # ACNH 自訂設計子頁面
│   │   ├── mii-qr-unlocker/     # Mii QR Code 子頁面
│   │   ├── tomodachi-voice-lab/ # Tomodachi Voice 子頁面
│   │   ├── tomodachi-life-mbti/ # Tomodachi Life MBTI 子頁面
│   │   └── pixel-grid-studio/   # Pixel Grid Studio 子頁面
│   ├── acnh-pixel-studio/  # 根層級 EN 子頁面
│   ├── mii-qr-unlocker/   # 根層級 EN 子頁面
│   ├── tomodachi-voice-lab/ # 根層級 EN 子頁面
│   ├── tomodachi-life-mbti/ # 根層級 EN 子頁面
│   ├── pixel-grid-studio/  # 根層級 EN 子頁面
│   ├── layout.tsx          # 根佈局 + metadataBase
│   └── globals.css         # 全域樣式 + 錨點連結 CSS
├── components/             # React 元件
│   ├── HomePageContent.tsx # 分頁切換與 hash 導航
│   ├── AcnhPixelStudioPage.tsx  # ACNH 子頁面元件
│   ├── MiiQrUnlockerPage.tsx    # Mii QR 子頁面元件
│   ├── TomodachiVoiceLabPage.tsx # Voice Lab 子頁面元件
│   ├── TomodachiLifeMbtiPage.tsx # MBTI 子頁面元件
│   ├── PixelGridStudioPage.tsx  # Pixel Grid 子頁面元件
│   ├── AboutPage.tsx       # 關於頁面元件
│   ├── ContactPage.tsx     # 聯絡頁面元件
│   ├── PrivacyPage.tsx     # 隱私政策頁面元件
│   ├── TermsPage.tsx       # 服務條款頁面元件
│   ├── PixelStudio.tsx     # 像素網格轉換器
│   ├── AvatarEditor.tsx    # 角色 QR 設定修改器
│   ├── VoiceLab.tsx        # 語音合成與關係天梯榜
│   ├── SEOSection.tsx      # 指南、FAQ 與 JSON-LD
│   ├── HistoryPanel.tsx    # 歷史面板 (aside + aria-live)
│   ├── EnRedirect.tsx      # EN 語言重導向處理器
│   ├── Navbar.tsx          # 導航列與語言切換器
│   └── Footer.tsx          # 頁尾與免責聲明
├── i18n/                   # next-intl 設定
│   ├── routing.ts          # 語言路由設定
│   └── request.ts          # 伺服器端國際化設定
├── lib/                    # 核心邏輯
│   ├── compatibility.ts    # 星座與性格演算法
│   ├── qr-handler.ts       # QR 解碼/編碼邏輯
│   └── history-db.ts       # 歷史資料庫（IndexedDB 封裝）
└── locales/                # 翻譯檔案（10 種語言）
    ├── en.json             # 英文（美式）
    ├── zh-Hant.json        # 繁體中文
    ├── ja.json             # 日文
    ├── es.json             # 西班牙文
    ├── fr.json             # 法文
    ├── ko.json             # 韓文
    ├── de.json             # 德文
    ├── it.json             # 義大利文
    ├── nl.json             # 荷蘭文
    └── zh-CN.json          # 簡體中文
```

### 🚢 部署

本專案使用 Next.js 靜態匯出（`output: 'export'`），可部署至任何靜態託管服務。

#### Cloudflare Pages

1. Fork 或推送此倉庫至 GitHub
2. 前往 [Cloudflare 儀表板](https://dash.cloudflare.com/) → Pages → 建立專案
3. 連接你的 GitHub 倉庫
4. 設定建置參數：
   - **建置指令**：`npm run build`
   - **建置輸出目錄**：`out`
5. 部署——完成！

> **注意**：無需設定環境變數。整個應用程式為 100% 靜態。

#### Docker

本專案包含多階段 `Dockerfile`，可建置靜態匯出並透過 nginx 提供服務。

**方式 A：從 GHCR 拉取預建映像（推薦）**

```bash
# 拉取最新映像
docker pull ghcr.io/cenyi/lifesimgrid:latest

# 執行容器
docker run -d -p 8080:80 ghcr.io/cenyi/lifesimgrid:latest
```

更新至最新版本：

```bash
docker pull ghcr.io/cenyi/lifesimgrid:latest
docker compose up -d   # 或重新啟動容器
```

**方式 B：從原始碼建置**

```bash
# 建置 Docker 映像
docker build -t lifesimgrid .

# 執行容器
docker run -d -p 8080:80 lifesimgrid
```

在瀏覽器中開啟 [http://localhost:8080](http://localhost:8080)。

**Docker Compose**（選用）：

```yaml
services:
  lifesimgrid:
    image: ghcr.io/cenyi/lifesimgrid:latest
    # 或從原始碼建置：build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

```bash
# 使用 Docker Compose 啟動
docker compose up -d
```

> **注意**：Docker 映像使用 nginx 來提供相同的靜態 `out/` 目錄。這不會影響 Cloudflare Pages 部署——兩種方式提供完全相同的靜態檔案。

### 🔒 隱私與版權安全聲明

*   **100% 瀏覽器本機運算**：本開源專案運作於嚴格的零後端、零資料庫範式。每張上傳以進行網格量化的資產與每個解碼的 Mii FFL 二進位緩衝區位元組串流，均在你的本機裝置記憶體中即時編譯與處理。絕無任何追蹤資料或個人內容被快取、記錄或傳輸至任何外部雲端基礎設施。
*   **指示性合理使用與技術中立**：本專案為完全獨立的第三方開源開發實踐。其設計目的僅為展示現代前端 API（如 HTML5 Canvas 與原生 Web Audio）在紋理臨摹與結構化位元組資料重建方面的應用。
*   **商標聲明**：LifeSimGrid 與 Nintendo Co., Ltd. 或任何遊戲主機製造商、軟體開發商及發行商絕對零商業關聯、營運合作、官方授權或贊助背書。「Animal Crossing」、「Tomodachi Life」與「Mii」等名稱為其各自版權持有者的註冊商標，在此僅基於指示性合理使用，用於平台相容性與技術識別目的。所有對「Living the Grid」等傳統網頁工具的技術比較，純粹定位為教育沙盒替代方案示範。

### 🤝 參與貢獻

我們歡迎社群貢獻！以下是參與方式：

1. **Fork** 此倉庫
2. **建立**功能分支：`git checkout -b feature/amazing-feature`
3. **提交**變更：`git commit -m 'Add amazing feature'`
4. **推送**分支：`git push origin feature/amazing-feature`
5. **發起** Pull Request

#### 貢獻方式

- 🌐 **翻譯**——在 `src/locales/` 中新增或改善翻譯
- 🐛 **錯誤回報**——至 [GitHub Issues](https://github.com/cenyi/LifeSimGrid/issues) 提交問題
- 🎨 **UI/UX**——改善無障礙性、行動裝置響應式設計或視覺設計
- 📖 **文件**——修正錯字、新增指南、改善 README
- 🧪 **測試**——新增單元測試或整合測試

#### 翻譯指南

每個語言檔案（`src/locales/*.json`）必須與 `en.json` 擁有完全相同的鍵值。新增鍵值時：

1. 先將鍵值新增至 `en.json`
2. 將鍵值新增至所有其他語言檔案
3. 使用自然、道地的表達方式——而非機器翻譯
4. 保留 `<pixel>`、`<qr>`、`<voice>` 等 next-intl 富文本標籤不變
5. 保留表情符號前綴、技術術語與品牌名稱不變

### 📜 授權條款

本專案採用 **MIT License** 授權——詳見 [LICENSE](LICENSE) 檔案。

### ⚖️ 免責聲明

LifeSimGrid 為完全獨立的非官方第三方社群粉絲工具套件，以及傳統工具集的進階網頁替代方案。本專案不隸屬於、未經授權、未受贊助或認可於任何主機製造商、軟體開發商或遊戲發行商。本倉庫中提及的所有通用 Mii FFL 二進位規範、角色格式協議與網格規格，均為其各自商標持有者的專有財產，在此僅基於指示性合理使用，用於技術識別與相容性目的。

### 🛡️ 安全政策

我們深切致力於資料安全與本機隱私優先沙盒執行。如果您在本工具套件中發現任何潛在的安全漏洞、協議解析異常或資料流例外，請**不要**開啟公開的 GitHub Issue。

請改為透過電子郵件負責任地回報至 **hi@lifesimgrid.org**。我們的核心工程志工團隊嚴肅對待所有技術安全回報，並將在 48 小時內調查與回應。

### 📋 專案路線圖

- [ ] **PWA 支援**：完整的 Progressive Web App 功能，透過自訂 Service Worker 快取提供 100% 離線運作能力。
- [ ] **深色模式切換**：流暢的系統自適應深色主題實作，運用 Tailwind CSS 原子化樣式。
- [ ] **擴展國際化**：新增 `pt-BR`、`ru`、`th` 與 `vi` 等 i18n 語言整合。
- [ ] **像素工作室升級**：支援超越標準資產規範的自訂使用者定義像素網格畫布尺寸。
- [ ] **語音實驗室視覺化**：即時 HTML5 Canvas 波形音訊視覺化，鏡像即時 Web Audio API 頻率輸出。
- [ ] **無障礙最佳化**：嚴格遵循 WCAG 2.1 AA 國際網頁標準的全面結構審計。

---

## 日本語

### 🎯 LifeSimGrid とは？

**LifeSimGrid** は、高度な**非公式 Animal Crossing（どうぶつの森）マイデザインツール**であり、オープンソースのウェブベース **Mii QR コードエディター**でもあります。現代のライフシミュレーションゲーム向けの究極の 100% サーバーレス **Living the Grid 代替手段**として機能します。

無料のブラウザベースのウェブツールキットとして、すべてのバイナリ暗号解析、HTML5 Canvas サンプリング、チップチューン音声合成が完全にクライアントサイドで実行されます。これにより、絶対的な 100% のデータプライバシーと超高速のローカルパフォーマンスが保証されます——クラウドサーバーなし、アカウント登録なし、データベース追跡なし。

### ✨ 5つのコアスタジオ

#### 🎨 ピクセルスタジオ（Animal Crossing マイデザインツール）
*   **マルチ比率グリッドキャンバス**：**サンドボックスソーシャルシミュレーションゲーム**の高度なテクスチャ描画仕様に完全対応。正方形 1:1（標準マイデザイン）、長方形 2:3（イーゼル肖像画、アルバムカバー）、ワイドスクリーン 16:9（広範なカスタム室内壁紙）のクロップアスペクト比をネイティブサポート。
*   **マルチ密度ブラシサンプリング**：レトロコンソールのグリッドサイズに合わせた4つのピクセル密度ティアを提供——256×256（1px 超高精細）、85×85（3px、標準 Pro Design タイルレイアウト）、64×64（4px 簡易キャンバス）、32×32（7px クラシックデザインタイル）。
*   **前処理画像フィルター**：内蔵のリアルタイム調整可能な明るさ・コントラスト設定スライダーにより、複雑なアニメアートやゲームグラフィックスを縮小する際の濁った色歪みを大幅に解消。
*   **数字塗り絵ハイライト**：24の量子化カラースウォッチのいずれかをクリックすると、キャンバス上の対応するピクセルグリッドインデックスが破線ボーダーで即座に分離・ハイライトされ、携帯ゲーム機での手動トレースが容易に。

#### 🔓 QR コンフィギュレーター（Mii QR コードエディター ＆ FFL プロトコル権限アンロッカー）
*   **並列バッチ権限アンロック**：複数の Mii QR コード画像の同時ドラッグ＆ドロップに対応。`Promise.all` による高性能フロントエンド非同期ストリームを実装し、公式 Mii FFL バイナリプロトコル形式に埋め込まれた「コピー禁止」および「共有/編集制限」チェックサムフラグを一括解除。
*   **オンライン暗号リネーム**：ウェブブラウザサンドボックス内でキャラクター名を直接、安全に変更可能。フロントエンドエンジンが16進数バイトセグメントを自動上書きし、バイナリ検証チェックサムを即座に修正。
*   **ローカルクライアントサイド ZIP パッケージング**：`JSZip` を活用し、完全に復号・変更された QR コードアセットをブラウザメモリ内で直接単一の `.zip` パッケージとしてエクスポート——ファイルを一つずつ保存する手間を排除。

#### 🔮 ボイス＆リレーションシップラボ（Tomodachi Life 相性計算機）
*   **8-Bit ボイスシミュレーションシンセ**：低レベル Web Audio API アーキテクチャ（ノコギリ波＋ローパスフィルターノード）を採用し、レトロ携帯ゲーム機サウンドチップのノスタルジックな電子ロボット音声を合成・プレビュー。ネイティブ音声ピッチ（Hz）とスピードパラメータの完全カスタマイズに対応。
*   **Tomodachi 島リレーションシップリーダーボード**：完全にローカルな自動管理トラッカーを搭載。ゲームのクラシックな12星座と16のコア行動パーソナリティグループ（例：独立した一匹狼、自信に満ちた行動派、外向的リーダー）に基づき、最大15人の住民のカスタム島名簿を構築可能（`localStorage` で安全に保存）。
*   **自動運命交差演算**：数理エンジンが名簿全体の交差ペアリングを即座に計算し、島グリッドの決定的な相性ランキングを出力——Top 3 ベストソウルメイト（最高のロマンス/フレンドシップ調和）vs Top 3 ワーストマッチ（最もバーチャルドラマを起こしやすい組み合わせ）をハイライト。

#### 🧠 MBTI パーソナリティマッピング（Tomodachi Life MBTI 16性格マッピング＆相性計算機）
*   **16種MBTI完全マッピング**：MBTI 16種のパーソナリティタイプをTomodachi Lifeの性格グループに完全マッピング。INFPのデュアルマッピング（Sweet/Softie）も特別処理。
*   **相性計算機**：5タブレイアウト（相性計算機、パーソナリティチャート、ボイスツール、ファンマップ、キャラクターリスト）、How It Works セクション、FAQ、BreadcrumbList/HowTo 構造化データ対応。
*   **アルゴリズム透明性宣言**：公式構成要素を明示——Base Score (25) + Personality (25) + Zodiac (25) + Friendship (25)、結果のトレーサビリティを確保。

#### 🔲 ピクセルグリッドスタジオ（汎用ピクセルグリッドコンバーター）
*   **汎用ピクセルグリッド変換**：あらゆる画像をピクセルグリッドパターンに変換。クロスステッチ、Perler beads、Minecraftピクセルアート、Tomodachi Lifeのカスタムデザインテンプレートに対応。
*   **柔軟なグリッドサイズ＆スマートカラー matching**：5種類のグリッドサイズ（16×16〜128×128）を提供。Euclidean distance カラーマッチングと error-diffusion ditheringを採用し、32色レトロパレットでも正確な結果を生成。
*   **写真変換ガイド＆印刷最適化レイアウト**：写真をピクセルアートに変換するステップバイステップガイド。ネイティブブラウザ印刷（Ctrl+P）をサポートし、コントロールパネルを自動非表示してクリーンな番号付き紙グリッドブループリントを出力。クロスステッチのトレースやオフラインクラフトに最適。
*   **100%クライアントサイド**：すべての画像処理は HTML5 Canvas API でブラウザ内で実行。アップロード不要、データベース追跡なし。

### 🔒 プライバシーファースト設計

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          あなたのブラウザサンドボックス                        │
│                                                                             │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌─────────────────┐  │
│  │      HTML5 Canvas     │  │     jsQR + qrcode     │  │  Web Audio API  │  │
│  │  (Animal Crossing     │  │ (Mii FFL 暗号          │  │ (Tomodachi Mii  │  │
│  │   マイデザイン         │  │   バッファQRコーデック) │  │ 手続き的シンセ)  │  │
│  │   ピクセレーター)      │  │                       │  │                 │  │
│  └──────────┬────────────┘  └───────────┬───────────┘  └────────┬────────┘  │
│             │                           │                       │           │
│             └───────────────────────────┼───────────────────────┘           │
│                                         ▼                                   │
│                            ブラウザ localStorage ＆ IndexedDB               │
│                       （100% Living the Grid サーバーレス代替手段）           │
└─────────────────────────────────────────────────────────────────────────────┘
          ✕ クラウドバックエンドなし     ✕ データベース追跡なし     ✕ データアップロードゼロ
```

- **100% クライアントサイドアーキテクチャ**——ゼロのクラウドサーバー、ゼロのバックエンドデータベース追跡、絶対ゼロのアウトバウンドデータアップロード。Living the Grid のようなレガシープラットフォームに代わる完全に安全なウェブ代替手段。
- **ローカルサンドボックス実行**——すべてのカスタム画像ピクセレーション、Mii FFL バイナリ暗号バッファ解析、チップチューン音声合成は厳密にブラウザ内で実行。
- **プライバシーファーストデータフロー**——あなたの Tomodachi 島住民名簿と設定はローカルブラウザの `localStorage` と `IndexedDB` にのみコミット——あなたの島のデータは物理デバイスから一切送信されません。
- **100% 無料＆オープンソース**——完全に透明なデータフローと監査可能なソースコードを、寛容な MIT License で GitHub に公開。

### 📸 スクリーンショット

> *近日公開——スクリーンショットの PR も歓迎！*

### 🌍 対応言語（10言語）

`en` · `zh-Hant` · `ja` · `es` · `fr` · `ko` · `de` · `it` · `nl` · `zh-CN`

### 🛠️ 技術スタックとアーキテクチャ


| カテゴリ | 高性能技術と実装 |
|----------|-----------|
| **フレームワーク** | Next.js 16（App Router フレームワーク）+ TypeScript（厳格な型安全性） |
| **スタイリング** | Tailwind CSS（ユーティリティファースト原子スタイリング） |
| **i18n 国際化**| `next-intl` v4（`localePrefix: "as-needed"` 最適化された検索エンジン多言語インデックス用） |
| **QR コーデックマトリックス**  | `jsQR`（ローカル Mii バイナリマトリックス抽出）+ `qrcode`（Version 3 Mii 互換 Byte Mode エンコード） |
| **クライアントアーカイブ**  | `JSZip`（高性能並列ブラウザサイドアーカイブコンパイルとローカルマルチファイル ZIP 生成） |
| **オーディオエンジン** | ネイティブ Web Audio API（低レベル `OscillatorNode` ノコギリ/矩形波手続き的合成 + `BiquadFilterNode`） |
| **イメージングパイプライン** | HTML5 Canvas API（`imageSmoothingEnabled: false` 最近傍鮮明ピクセルグリッドレンダリングを強制） |
| **デプロイ** | 静的エクスポート最適化（SSG）→ Cloudflare Pages グローバルエッジ CDN ネットワークでスケーリング |

### 🚀 はじめに

#### 前提条件

- **Node.js** ≥ 18.17
- **npm** ≥ 9

#### インストール

```bash
# リポジトリをクローン
git clone https://github.com/cenyi/LifeSimGrid.git
cd LifeSimGrid

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

#### プロダクションビルド

```bash
# 静的エクスポートを生成
npm run build

# ビルド結果をローカルでプレビュー
npx serve out
```

### 📁 プロジェクト構成

```
src/
├── app/                    # Next.js App Router ページ
│   ├── [locale]/           # i18n ロケールルーティング（10言語）
│   │   ├── page.tsx        # ホームページ（SSG）
│   │   ├── about/          # About ページ
│   │   ├── contact/        # お問い合わせページ
│   │   ├── privacy/        # プライバシーポリシー
│   │   ├── terms/          # 利用規約
│   │   ├── acnh-pixel-studio/    # ACNH マイデザインサブページ
│   │   ├── mii-qr-unlocker/     # Mii QR Code サブページ
│   │   ├── tomodachi-voice-lab/ # Tomodachi Voice サブページ
│   │   ├── tomodachi-life-mbti/ # Tomodachi Life MBTI サブページ
│   │   └── pixel-grid-studio/   # Pixel Grid Studio サブページ
│   ├── acnh-pixel-studio/  # ルートレベル EN サブページ
│   ├── mii-qr-unlocker/   # ルートレベル EN サブページ
│   ├── tomodachi-voice-lab/ # ルートレベル EN サブページ
│   ├── tomodachi-life-mbti/ # ルートレベル EN サブページ
│   ├── pixel-grid-studio/  # ルートレベル EN サブページ
│   ├── layout.tsx          # ルートレイアウト + metadataBase
│   └── globals.css         # グローバルスタイル + アンカーリンク CSS
├── components/             # React コンポーネント
│   ├── HomePageContent.tsx # タブ切替 & ハッシュナビゲーション
│   ├── AcnhPixelStudioPage.tsx  # ACNH サブページコンポーネント
│   ├── MiiQrUnlockerPage.tsx    # Mii QR サブページコンポーネント
│   ├── TomodachiVoiceLabPage.tsx # Voice Lab サブページコンポーネント
│   ├── TomodachiLifeMbtiPage.tsx # MBTI サブページコンポーネント
│   ├── PixelGridStudioPage.tsx  # Pixel Grid サブページコンポーネント
│   ├── AboutPage.tsx        # About ページコンポーネント
│   ├── ContactPage.tsx      # お問い合わせページコンポーネント
│   ├── PrivacyPage.tsx      # プライバシーポリシーページコンポーネント
│   ├── TermsPage.tsx        # 利用規約ページコンポーネント
│   ├── PixelStudio.tsx     # ピクセルグリッドコンバーター
│   ├── AvatarEditor.tsx    # アバター QR コンフィギュレーター
│   ├── VoiceLab.tsx        # 音声合成 & 関係性ラボ
│   ├── SEOSection.tsx      # ガイド、FAQ & JSON-LD
│   ├── HistoryPanel.tsx    # 履歴パネル (aside + aria-live)
│   ├── EnRedirect.tsx      # EN ロケールリダイレクトハンドラー
│   ├── Navbar.tsx          # ナビゲーションと言語スイッチャー
│   └── Footer.tsx          # フッターと免責事項
├── i18n/                   # next-intl 設定
│   ├── routing.ts          # ロケールルーティング設定
│   └── request.ts          # サーバーサイド i18n セットアップ
├── lib/                    # コアロジック
│   ├── compatibility.ts    # 星座 & 性格アルゴリズム
│   ├── qr-handler.ts       # QR デコード/エンコードロジック
│   └── history-db.ts       # 履歴データベース（IndexedDB ラッパー）
└── locales/                # 翻訳ファイル（10言語）
    ├── en.json             # 英語（アメリカ）
    ├── zh-Hant.json        # 繁体字中国語
    ├── ja.json             # 日本語
    ├── es.json             # スペイン語
    ├── fr.json             # フランス語
    ├── ko.json             # 韓国語
    ├── de.json             # ドイツ語
    ├── it.json             # イタリア語
    ├── nl.json             # オランダ語
    └── zh-CN.json          # 簡体字中国語
```

### 🚢 デプロイ

本プロジェクトは Next.js 静的エクスポート（`output: 'export'`）を使用しており、任意の静的ホスティングプロバイダーに対応しています。

#### Cloudflare Pages

1. このリポジトリを Fork または GitHub にプッシュ
2. [Cloudflare ダッシュボード](https://dash.cloudflare.com/) → Pages → プロジェクトを作成
3. GitHub リポジトリを接続
4. ビルド設定を構成：
   - **ビルドコマンド**：`npm run build`
   - **ビルド出力ディレクトリ**：`out`
5. デプロイ——完了！

> **注意**：環境変数は不要です。アプリケーション全体が 100% 静的です。

#### Docker

本プロジェクトにはマルチステージ `Dockerfile` が含まれており、静的エクスポートをビルドして nginx で配信します。

**オプション A：GHCR からプレビルドイメージをプル（推奨）**

```bash
# 最新イメージをプル
docker pull ghcr.io/cenyi/lifesimgrid:latest

# コンテナを実行
docker run -d -p 8080:80 ghcr.io/cenyi/lifesimgrid:latest
```

最新バージョンに更新：

```bash
docker pull ghcr.io/cenyi/lifesimgrid:latest
docker compose up -d   # またはコンテナを再起動
```

**オプション B：ソースからビルド**

```bash
# Docker イメージをビルド
docker build -t lifesimgrid .

# コンテナを実行
docker run -d -p 8080:80 lifesimgrid
```

ブラウザで [http://localhost:8080](http://localhost:8080) を開いてください。

**Docker Compose**（オプション）：

```yaml
services:
  lifesimgrid:
    image: ghcr.io/cenyi/lifesimgrid:latest
    # またはソースからビルド：build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

```bash
# Docker Compose で起動
docker compose up -d
```

> **注意**：Docker イメージは nginx を使用して同じ静的 `out/` ディレクトリを配信します。これは Cloudflare Pages のデプロイに影響しません——両方の方法で同一の静的ファイルが配信されます。

### 🔒 プライバシーと著作権に関する声明

*   **100%ブラウザローカル計算**：本オープンソースプロジェクトは厳格なゼロバックエンド、ゼロデータベースパラダイムで運用されています。グリッド量子化のためにアップロードされたすべてのアセットと、デコードされたすべての Mii FFL バイナリバッファバイトストリームは、ローカルデバイスのメモリ内でのみリアルタイムにコンパイル・処理されます。追跡データや個人のコンテンツが外部のクラウドインフラにキャッシュ、記録、または送信されることは一切ありません。
*   **指示的フェアユースと技術的中立性**：本プロジェクトは完全に独立したサードパーティのオープンソース開発実践です。最新のフロントエンド API（HTML5 Canvas やネイティブ Web Audio など）を用いたテクスチャトレーシングと構造化バイトデータ再構築の有用性を実証することのみを目的として設計されています。
*   **商標に関する明確化**：LifeSimGrid は、任天堂株式会社またはいかなるゲームコンソールメーカー、ソフトウェア開発者、パブリッシャーとも、商業的提携、運営的パートナーシップ、公式認可、スポンサーシップ推薦が絶対にゼロです。「Animal Crossing（どうぶつの森）」、「Tomodachi Life（トモダチコレクション）」、「Mii」などの名称は、それぞれの著作権保有者の登録商標であり、ここではプラットフォーム互換性と技術的識別の目的でのみ、指示的フェアユースに基づいて言及しています。「Living the Grid」のようなレガシーウェブツールとの技術的比較は、純粋に教育的サンドボックス代替デモンストレーションとして位置づけられています。

### 🤝 コントリビュート

コミュニティからの貢献を歓迎します！参加方法：

1. リポジトリを **Fork**
2. フィーチャーブランチを作成：`git checkout -b feature/amazing-feature`
3. 変更をコミット：`git commit -m 'Add amazing feature'`
4. プッシュ：`git push origin feature/amazing-feature`
5. **Pull Request** を作成

#### 貢献方法

- 🌐 **翻訳**——`src/locales/` で翻訳の追加・改善
- 🐛 **バグ報告**——[GitHub Issues](https://github.com/cenyi/LifeSimGrid/issues) に報告
- 🎨 **UI/UX**——アクセシビリティ、モバイルレスポンシブ、デザインの改善
- 📖 **ドキュメント**——誤字修正、ガイド追加、README の改善
- 🧪 **テスト**——ユニットテストやインテグレーションテストの追加

#### 翻訳ガイドライン

各ロケールファイル（`src/locales/*.json`）は `en.json` と完全に同じキーを持つ必要があります。新しいキーを追加する際は：

1. まず `en.json` にキーを追加
2. 他のすべてのロケールファイルにキーを追加
3. 機械翻訳ではなく、自然でネイティブな表現を使用
4. `<pixel>`、`<qr>`、`<voice>` などの next-intl リッチテキストタグはそのまま保持
5. 絵文字プレフィックス、技術用語、ブランド名はそのまま保持

### 📜 ライセンス

MIT License — 詳細は [LICENSE](LICENSE) ファイルをご覧ください。

### ⚖️ 法的免責事項

LifeSimGrid は、完全に独立した非公式のサードパーティコミュニティファンユーティリティスイートであり、レガシツールセットに対する高度なウェブ代替手段です。本プロジェクトは、いかなるコンソールメーカー、ソフトウェア開発者、ゲームパブリッシャーとも提携、認可、スポンサー、または推奨関係にありません。本リポジトリで言及されているすべての汎用 Mii FFL バイナリ仕様、キャラクターフォーマットプロトコル、およびグリッド仕様は、それぞれの商標保有者の専有財産であり、ここでは技術的識別と互換性の目的でのみ、指示的フェアユースに基づいて言及されています。

### 🛡️ セキュリティポリシー

私たちはデータセキュリティとローカルプライバシーファーストサンドボックス実行に深く注力しています。本ツールキット内で潜在的なセキュリティ脆弱性、プロトコル解析異常、またはデータフロー例外を発見した場合は、公開 GitHub Issue を**開かずに**ください。

代わりに、**hi@lifesimgrid.org** まで責任を持ってメールでご報告ください。コアエンジニアリングボランティアチームは、すべての技術的セキュリティ報告を真摯に受け止め、48時間以内に調査・対応いたします。

### 📋 プロジェクトロードマップ

- [ ] **PWA サポート**：カスタム Service Worker キャッシュによる 100% オフライン機能を提供する完全な Progressive Web App 対応。
- [ ] **ダークモード切替**：Tailwind CSS 原子スタイリングを活用した、スムーズなシステムアダプティブダークテーマ実装。
- [ ] **拡張国際化**：`pt-BR`、`ru`、`th`、`vi` をカバーする追加 i18n ロケール統合。
- [ ] **ピクセルスタジオアップグレード**：標準アセット仕様を超えたカスタムユーザー定義ピクセルグリッドキャンバスサイズのサポート。
- [ ] **ボイスラブビジュアライゼーション**：リアルタイム Web Audio API 周波数出力をミラーリングするライブ HTML5 Canvas 波形オーディオビジュアライゼーション。
- [ ] **アクセシビリティ最適化**：WCAG 2.1 AA 国際ウェブ標準に厳格に準拠した包括的な構造監査。

---

## Español

### 🎯 ¿Qué es LifeSimGrid?

**LifeSimGrid** es una avanzada **herramienta no oficial de patrones de Animal Crossing** y un **editor de códigos QR de Mii** de código abierto basado en la web. Funciona como la **alternativa 100% sin servidor definitiva a Living the Grid** para los juegos modernos de simulación de vida.

Como kit de herramientas web gratuito basado en el navegador, todo el análisis criptográfico binario, el muestreo de HTML5 Canvas y la síntesis de audio chiptune se ejecutan completamente del lado del cliente. Esto garantiza una privacidad de datos absoluta del 100% y un rendimiento local ultrarrápido — sin servidores en la nube, sin registro de cuentas y sin seguimiento de bases de datos.

### ✨ Cinco Estudios Dedicados

#### 🎨 Estudio de Píxeles (Herramienta de Patrones de Diseño Personalizado de Animal Crossing)
*   **Lienzo de Cuadrícula Multi-Proporción**: Se adapta perfectamente a las especificaciones avanzadas de dibujo de texturas en **juegos de simulación social de sandbox**. Soporta nativamente las proporciones de recorte cuadrada 1:1 (patrones estándar), rectangular 2:3 (retratos de caballete, portadas de álbum) y panorámica 16:9 (papeles tapiz personalizados de pared interior).
*   **Muestreo de Pincel Multi-Densidad**: Ofrece cuatro niveles distintos de densidad de píxeles para coincidir con los tamaños de cuadrícula de consolas retro — 256×256 (1px ultrafino), 85×85 (3px, diseño de baldosa Pro Design estándar), 64×64 (4px lienzo simplificado) y 32×32 (7px baldosa de diseño clásico).
*   **Filtros de Imagen de Pre-Procesamiento**: Cuenta con controles deslizantes de brillo y contraste ajustables en tiempo real integrados para eliminar significativamente las distorsiones de color turbias al reducir arte de anime complejo o gráficos de juegos.
*   **Resaltado de Pintar por Números**: Haz clic en cualquiera de las 24 muestras de color cuantizadas para aislar y resaltar instantáneamente los índices de cuadrícula de píxeles correspondientes en el lienzo con bordes punteados para un trazado manual sin esfuerzo en tu consola portátil.

#### 🔓 Configurador QR (Editor de Códigos QR de Mii y Desbloqueador de Permisos del Protocolo FFL)
*   **Desbloqueo de Permisos por Lotes en Paralelo**: Soporta arrastrar y soltar múltiples imágenes de códigos QR de Mii simultáneamente. Implementa flujos asíncronos de frontend de alto rendimiento mediante `Promise.all` para levantar las banderas de checksum de «copia no permitida» y «compartir/edición restringida» incrustadas en el formato de protocolo binario FFL de Mii oficial.
*   **Renombrado Criptográfico en Línea**: Permite la modificación inmediata y segura de nombres de personajes directamente en el sandbox del navegador web. El motor de frontend sobrescribe automáticamente los segmentos de bytes hexadecimales y corrige instantáneamente el checksum de verificación binaria.
*   **Empaquetado ZIP del Lado del Cliente Local**: Aprovecha `JSZip` para agrupar tus activos de códigos QR completamente descifrados y modificados directamente dentro de la memoria del navegador como una única exportación de paquete `.zip` — eliminando la molestia de guardar archivos uno por uno.

#### 🔮 Lab de Voz y Relaciones (Calculadora de Compatibilidad de Tomodachi Life)
*   **Sintetizador de Simulación de Voz 8-Bit**: Emplea una arquitectura de Web Audio API de bajo nivel (onda de diente de sierra + nodos de filtro paso bajo) para sintetizar y previsualizar el habla robótica electrónica nostálgica de los chips de sonido retro de consolas portátiles. Permite la personalización completa de los parámetros nativos de tono de voz (Hz) y velocidad de habla.
*   **Tabla de Relaciones de la Isla Tomodachi**: Cuenta con un rastreador de gestión automatizada completamente local. Basado en los 12 signos zodiacales astrológicos clásicos del juego y los 16 grupos de personalidad conductual central (p. ej., Lobo Solitario Independiente, Líder Seguro y Decidido, Líder Extrovertido), los usuarios pueden construir una lista personalizada de isla de hasta 15 residentes (almacenados de forma segura a través de `localStorage`).
*   **Cálculo Cruzado de Destino Automatizado**: El motor matemático calcula instantáneamente las parejas cruzadas en toda tu lista, generando la tabla de compatibilidad definitiva de tu isla — destacando el Top 3 de Mejores Almas Gemelas (máxima armonía romántica/amistosa) frente al Top 3 de Peores Parejas (más propensas a conflictos con drama virtual).

#### 🧠 Mapeo MBTI (Tomodachi Life MBTI Mapeo de 16 personalidades y Calculadora de compatibilidad)
*   **Mapeo completo de los 16 MBTI**: Los 16 tipos de personalidad MBTI se mapean íntegramente a los grupos de personalidad de Tomodachi Life, incluyendo el mapeo dual de INFP (Sweet/Softie).
*   **Calculadora de compatibilidad**: Diseño de 5 pestañas (Calculadora de compatibilidad, Gráfico de personalidad, Herramienta de voz, Mapa de fans, Lista de personajes), sección How It Works, FAQ con datos estructurados BreadcrumbList/HowTo.
*   **Declaración de transparencia del algoritmo**: Componentes de la fórmula declarados explícitamente——Base Score (25) + Personality (25) + Zodiac (25) + Friendship (25), trazabilidad de resultados garantizada.

#### 🔲 Estudio de Cuadrícula de Píxeles (Convertidor Universal de Cuadrícula de Píxeles)
*   **Conversión de Propósito General**: Convierte cualquier imagen en patrones de cuadrícula de píxeles para cross-stitch, Perler beads, pixel art de Minecraft y diseños personalizados de Tomodachi Life.
*   **Tamaños de Cuadrícula Flexibles y Coincidencia de Color Inteligente**: Ofrece 5 tamaños de cuadrícula (16×16 a 128×128) con coincidencia de color Euclidean distance y error-diffusion dithering para resultados precisos.
*   **Guía de Conversión de Fotos y Diseño Optimizado para Impresión**: Guía paso a paso para transformar fotos en pixel art. Soporta impresión nativa del navegador (Ctrl+P) con ocultación automática de paneles, generando un blueprint en papel numerado ideal para manualidades offline.
*   **100% del Lado del Cliente**: Todo el procesamiento de imágenes se ejecuta en tu navegador mediante HTML5 Canvas API. Sin subidas, sin bases de datos.

### 🔒 Arquitectura Privacidad Primero

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Sandbox de Tu Navegador Cliente                      │
│                                                                             │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌─────────────────┐  │
│  │      HTML5 Canvas     │  │     jsQR + qrcode     │  │  Web Audio API  │  │
│  │  (Animal Crossing     │  │ (Códec QR de Búfer    │  │ (Sintetizador   │  │
│  │   Pixelador de        │  │  Criptográfico        │  │  Procedural de  │  │
│  │   Patrones)           │  │  Mii FFL)             │  │  Tomodachi Mii) │  │
│  └──────────┬────────────┘  └───────────┬───────────┘  └────────┬────────┘  │
│             │                           │                       │           │
│             └───────────────────────────┼───────────────────────┘           │
│                                         ▼                                   │
│                            localStorage e IndexedDB del Navegador           │
│                    (100% Alternativa Sin Servidor a Living the Grid)        │
└─────────────────────────────────────────────────────────────────────────────┘
          ✕ Sin backend en la nube     ✕ Sin seguimiento de bases de datos     ✕ Cero subidas de datos
```

- **Arquitectura 100% del Lado del Cliente** — Cero servidores en la nube, cero seguimiento de bases de datos backend y cero absoluto de subidas de datos salientes. Una alternativa web completamente segura a plataformas heredadas como Living the Grid.
- **Ejecución en Sandbox Local** — Toda la pixelación de imágenes personalizadas, el análisis de búfer criptográfico binario FFL de Mii y la síntesis de voz chiptune se ejecutan estrictamente dentro de tu navegador.
- **Flujo de Datos Privacidad Primero** — Tu lista de residentes de la isla Tomodachi y tu configuración se almacenan únicamente en `localStorage` e `IndexedDB` del navegador local — los datos de tu isla nunca salen de tu dispositivo físico.
- **100% Gratuito y de Código Abierto** — Flujos de datos completamente transparentes y código fuente auditable publicado en GitHub bajo la licencia MIT permisiva.

### 📸 Capturas de pantalla

> *Próximamente — ¡PRs con capturas de pantalla bienvenidos!*

### 🌍 Idiomas compatibles (10)

`en` · `zh-Hant` · `ja` · `es` · `fr` · `ko` · `de` · `it` · `nl` · `zh-CN`

### 🛠️ Stack Tecnológico y Arquitectura


| Categoría | Tecnología de Alto Rendimiento e Implementación |
|-----------|-----------|
| **Framework** | Next.js 16 (Framework App Router) + TypeScript (Seguridad de Tipos Estricta) |
| **Estilos** | Tailwind CSS (Estilado atómico utility-first) |
| **i18n Internacionalización**| `next-intl` v4 (`localePrefix: "as-needed"` para indexación multilingüe optimizada en motores de búsqueda) |
| **Matriz de Códec QR**  | `jsQR` (Extracción de matriz binaria Mii local) + `qrcode` (Codificación Byte Mode compatible con Mii Versión 3) |
| **Archivo de Cliente**  | `JSZip` (Compilación de archivo paralela de alto rendimiento del lado del navegador y generación de ZIP multi-archivo local) |
| **Motor de Audio** | Web Audio API Nativa (Síntesis procedural de onda diente de sierra/cuadrada de bajo nivel `OscillatorNode` + `BiquadFilterNode`) |
| **Pipeline de Imágenes** | HTML5 Canvas API (`imageSmoothingEnabled: false` forzado para renderizado nítido de cuadrícula de píxeles por vecino más cercano) |
| **Despliegue** | Optimización de Exportación Estática (SSG) → Escalado globalmente en la red CDN de borde global de Cloudflare Pages |

### 🚀 Primeros pasos

#### Requisitos previos

- **Node.js** ≥ 18.17
- **npm** ≥ 9

#### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/cenyi/LifeSimGrid.git
cd LifeSimGrid

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

#### Build de producción

```bash
# Generar exportación estática
npm run build

# Vista previa local del build
npx serve out
```

### 📁 Estructura del proyecto

```
src/
├── app/                    # Páginas Next.js App Router
│   ├── [locale]/           # Rutas i18n por locale (10 idiomas)
│   │   ├── page.tsx        # Página de inicio (SSG)
│   │   ├── about/          # Página Acerca de
│   │   ├── contact/        # Página de contacto
│   │   ├── privacy/        # Política de privacidad
│   │   ├── terms/          # Términos de servicio
│   │   ├── acnh-pixel-studio/    # Subpágina ACNH Custom Designs
│   │   ├── mii-qr-unlocker/     # Subpágina Mii QR Code
│   │   ├── tomodachi-voice-lab/ # Subpágina Tomodachi Voice
│   │   ├── tomodachi-life-mbti/ # Subpágina Tomodachi Life MBTI
│   │   └── pixel-grid-studio/   # Subpágina Pixel Grid Studio
│   ├── acnh-pixel-studio/  # Subpágina EN nivel raíz
│   ├── mii-qr-unlocker/   # Subpágina EN nivel raíz
│   ├── tomodachi-voice-lab/ # Subpágina EN nivel raíz
│   ├── tomodachi-life-mbti/ # Subpágina EN nivel raíz
│   ├── pixel-grid-studio/  # Subpágina EN nivel raíz
│   ├── layout.tsx          # Layout raíz + metadataBase
│   └── globals.css         # Estilos globales + CSS de enlace ancla
├── components/             # Componentes React
│   ├── HomePageContent.tsx # Cambio de pestañas y navegación hash
│   ├── AcnhPixelStudioPage.tsx  # Componente subpágina ACNH
│   ├── MiiQrUnlockerPage.tsx    # Componente subpágina Mii QR
│   ├── TomodachiVoiceLabPage.tsx # Componente subpágina Voice Lab
│   ├── TomodachiLifeMbtiPage.tsx # Componente subpágina MBTI
│   ├── PixelGridStudioPage.tsx  # Componente subpágina Pixel Grid
│   ├── AboutPage.tsx       # Componente página Acerca de
│   ├── ContactPage.tsx     # Componente página de contacto
│   ├── PrivacyPage.tsx     # Componente página de privacidad
│   ├── TermsPage.tsx       # Componente página de términos
│   ├── PixelStudio.tsx     # Convertidor de cuadrícula de píxeles
│   ├── AvatarEditor.tsx    # Configurador QR de avatar
│   ├── VoiceLab.tsx        # Síntesis de voz y lab de relaciones
│   ├── SEOSection.tsx      # Guía, FAQ y JSON-LD
│   ├── HistoryPanel.tsx    # Panel de historial (aside + aria-live)
│   ├── EnRedirect.tsx      # Manejador de redirección locale EN
│   ├── Navbar.tsx          # Navegación y selector de idioma
│   └── Footer.tsx          # Pie de página y descargo de responsabilidad
├── i18n/                   # Configuración next-intl
│   ├── routing.ts          # Configuración de routing por locale
│   └── request.ts          # Configuración i18n del lado del servidor
├── lib/                    # Lógica central
│   ├── compatibility.ts    # Algoritmos de zodiaco y personalidad
│   ├── qr-handler.ts       # Lógica de decodificación/codificación QR
│   └── history-db.ts       # Base de datos de historial（envoltorio IndexedDB）
└── locales/                # Archivos de traducción (10 idiomas)
    ├── en.json             # Inglés (Americano)
    ├── zh-Hant.json        # Chino tradicional
    ├── ja.json             # Japonés
    ├── es.json             # Español
    ├── fr.json             # Francés
    ├── ko.json             # Coreano
    ├── de.json             # Alemán
    ├── it.json             # Italiano
    ├── nl.json             # Neerlandés
    └── zh-CN.json          # Chino simplificado
```

### 🚢 Despliegue

Este proyecto utiliza exportación estática de Next.js (`output: 'export'`), compatible con cualquier proveedor de alojamiento estático.

#### Cloudflare Pages

1. Haz Fork o sube este repositorio a GitHub
2. Ve al [Panel de Cloudflare](https://dash.cloudflare.com/) → Pages → Crear un proyecto
3. Conecta tu repositorio de GitHub
4. Configura los ajustes de build:
   - **Comando de build**: `npm run build`
   - **Directorio de salida del build**: `out`
5. Despliega — ¡listo!

> **Nota**: No se necesitan variables de entorno. Toda la aplicación es 100% estática.

#### Docker

Este proyecto incluye un `Dockerfile` multi-etapa que construye la exportación estática y la sirve mediante nginx.

**Opción A: Extraer imagen preconstruida de GHCR (recomendado)**

```bash
# Extraer la última imagen
docker pull ghcr.io/cenyi/lifesimgrid:latest

# Ejecutar el contenedor
docker run -d -p 8080:80 ghcr.io/cenyi/lifesimgrid:latest
```

Para actualizar a la última versión:

```bash
docker pull ghcr.io/cenyi/lifesimgrid:latest
docker compose up -d   # o reinicia tu contenedor
```

**Opción B: Construir desde el código fuente**

```bash
# Construir la imagen Docker
docker build -t lifesimgrid .

# Ejecutar el contenedor
docker run -d -p 8080:80 lifesimgrid
```

Abre [http://localhost:8080](http://localhost:8080) en tu navegador.

**Docker Compose** (opcional):

```yaml
services:
  lifesimgrid:
    image: ghcr.io/cenyi/lifesimgrid:latest
    # O construir desde el código fuente: build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

```bash
# Iniciar con Docker Compose
docker compose up -d
```

> **Nota**: La imagen Docker usa nginx para servir el mismo directorio estático `out/`. Esto no afecta al despliegue en Cloudflare Pages — ambos métodos sirven archivos estáticos idénticos.

### 🤝 Contribuir

¡Nos encantan las contribuciones de la comunidad! Aquí tienes cómo ayudar:

1. Haz **Fork** del repositorio
2. Crea una rama: `git checkout -b feature/amazing-feature`
3. Haz commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Abre un **Pull Request**

#### Formas de contribuir

- 🌐 **Traducciones** — Añade o mejora traducciones en `src/locales/`
- 🐛 **Reportes de errores** — Informa en [GitHub Issues](https://github.com/cenyi/LifeSimGrid/issues)
- 🎨 **UI/UX** — Mejora la accesibilidad, el diseño responsive o el diseño visual
- 📖 **Documentación** — Corrige errores tipográficos, añade guías, mejora el README
- 🧪 **Tests** — Añade tests unitarios o de integración

#### Guía de traducción

Cada archivo de locale (`src/locales/*.json`) debe tener exactamente las mismas claves que `en.json`. Al añadir nuevas claves:

1. Añade la clave a `en.json` primero
2. Añade la clave a todos los demás archivos de locale
3. Usa expresiones naturales y nativas — no traducciones automáticas
4. Mantén las etiquetas de texto enriquecido de next-intl como `<pixel>`, `<qr>`, `<voice>` tal cual
5. Mantén los prefijos de emoji, términos técnicos y nombres de marcas tal cual

### 🔒 Privacidad y Derechos de Autor

*   **100% Computación Local en el Navegador**: Este repositorio de código abierto opera bajo un paradigma estricto de cero backend, cero bases de datos. Cada activo subido para cuantización de cuadrícula y cada flujo de bytes de búfer binario FFL de Mii decodificado se compila y procesa en tiempo real exclusivamente dentro de la memoria de tu dispositivo local. Nunca se almacena en caché, registra o transmite ningún dato de seguimiento o contenido personal a ninguna infraestructura de nube externa.
*   **Uso Justo Nominativo y Neutralidad Técnica**: Este repositorio constituye una práctica de desarrollo de código abierto de terceros completamente independiente. Está diseñado únicamente para demostrar la utilidad de las APIs frontend modernas (como HTML5 Canvas y Web Audio nativa) para el trazado de texturas y la reconstrucción de datos de bytes estructurados.
*   **Aclaración de Marcas Registradas**: LifeSimGrid tiene absolutamente cero afiliación comercial, asociación operativa, autorización oficial o respaldo de patrocinio con Nintendo Co., Ltd., o cualquier fabricante de consolas de juegos, desarrollador de software y editor. Los títulos como «Animal Crossing», «Tomodachi Life» y «Mii» son marcas registradas de sus respectivos titulares de derechos de autor, referenciados aquí estrictamente bajo uso justo nominativo con fines de compatibilidad de plataforma e identificación tecnológica únicamente. Todas las comparaciones técnicas con herramientas web heredadas como «Living the Grid» se posicionan puramente como una demostración alternativa de sandbox educativo.

### 📜 Licencia

MIT License — ver archivo [LICENSE](LICENSE) para más detalles.

### ⚖️ Descargo de Responsabilidad Legal

LifeSimGrid se presenta como un conjunto de herramientas de fans de la comunidad de terceros no oficial completamente independiente y una alternativa web avanzada a conjuntos de herramientas heredados. Este proyecto no está afiliado con, autorizado por, patrocinado ni respaldado por ningún fabricante de consolas, desarrollador de software o editor de juegos. Todas las especificaciones binarias FFL de Mii universales, protocolos de formato de personajes y especificaciones de cuadrícula mencionadas en este repositorio son propiedad exclusiva de sus respectivos titulares de marcas registradas, referenciadas aquí estrictamente bajo uso justo nominativo con fines de identificación tecnológica y compatibilidad.

### 🛡️ Política de Seguridad

Estamos profundamente comprometidos con la seguridad de los datos y el sandboxing local de privacidad primero. Si descubres alguna vulnerabilidad de seguridad potencial, anomalía en el análisis de protocolos o excepción en el flujo de datos dentro de este kit de herramientas, **no** abras un issue público en GitHub.

En su lugar, repórtalo de manera responsable por correo electrónico a **hi@lifesimgrid.org**. Nuestros voluntarios de ingeniería central toman todos los informes de seguridad técnica en serio y investigarán y responderán dentro de las 48 horas.

### 📋 Hoja de Ruta

- [ ] **Soporte PWA**: Capacidad completa de Progressive Web App que ofrece funcionalidad 100% offline mediante caché personalizado de Service Worker.
- [ ] **Alternancia de Modo Oscuro**: Implementación fluida de tema oscuro adaptativo al sistema utilizando estilado atómico de Tailwind CSS.
- [ ] **Internacionalización Expandida**: Integraciones de locale i18n adicionales que cubren `pt-BR`, `ru`, `th` y `vi`.
- [ ] **Actualización del Estudio de Píxeles**: Soporte para tamaños de lienzo de cuadrícula de píxeles personalizados definidos por el usuario más allá de las especificaciones de activos estándar.
- [ ] **Visualización del Lab de Voz**: Visualización de audio de forma de onda en vivo con HTML5 Canvas que refleja las salidas de frecuencia de Web Audio API en tiempo real.
- [ ] **Optimización de Accesibilidad**: Auditoría estructural integral que cumple estrictamente con los estándares web internacionales WCAG 2.1 AA.

---

## Français

### 🎯 Qu'est-ce que LifeSimGrid ?

**LifeSimGrid** est un **outil de motifs Animal Crossing non officiel** avancé et un **éditeur de codes QR Mii** open source basé sur le web. Il constitue l'**alternative 100% sans serveur** ultime à Living the Grid pour les jeux modernes de simulation de vie.

En tant que boîte à outils web gratuite basée sur le navigateur, toute l'analyse cryptographique binaire, l'échantillonnage HTML5 Canvas et la synthèse audio chiptune s'exécutent entièrement côté client. Cela garantit une confidentialité des données absolue à 100% et des performances locales ultra-rapides — aucun serveur cloud, aucune inscription de compte et aucun suivi de base de données requis.

### ✨ Cinq Studios Dédiés

#### 🎨 Studio Pixel (Outil de Motifs de Design Personnalisé Animal Crossing)
*   **Canevas Grille Multi-Ratio** : S'adapte parfaitement aux spécifications avancées de dessin de textures dans les **jeux de simulation sociale en bac à sable**. Prend en charge nativement les ratios de recadrage carré 1:1 (motifs standard), rectangulaire 2:3 (portraits sur chevalet, pochettes d'album) et panoramique 16:9 (papiers peints muraux intérieurs personnalisés étendus).
*   **Échantillonnage Pinceau Multi-Densité** : Offre quatre niveaux de densité de pixels distincts pour correspondre aux tailles de grille des consoles rétro — 256×256 (1px ultra-fin), 85×85 (3px, disposition de tuile Pro Design standard), 64×64 (4px canevas simplifié) et 32×32 (7px tuile de design classique).
*   **Filtres d'Image de Pré-Traitement** : Intègre des curseurs de configuration de luminosité et de contraste ajustables en temps réel pour éliminer significativement les distorsions de couleur boueuses lors de la réduction d'art anime complexe ou de graphismes de jeu.
*   **Surlignage Peinture par Numéros** : Cliquez sur l'un des 24 échantillons de couleurs quantifiées pour isoler et surligner instantanément les indices de grille de pixels correspondants sur le canevas avec des bordures en pointillés pour un traçage manuel sans effort sur votre console portable.

#### 🔓 Configurateur QR (Éditeur de Codes QR Mii et Débogueur d'Autorisations du Protocole FFL)
*   **Déblocage d'Autorisations par Lots en Parallèle** : Prend en charge le glisser-déposer simultané de plusieurs images de codes QR Mii. Implémente des flux asynchrones frontend haute performance via `Promise.all` pour lever les indicateurs de somme de contrôle « copie non autorisée » et « partage/édition restreint » intégrés au format de protocole binaire FFL Mii officiel.
*   **Renommage Cryptographique en Ligne** : Permet la modification immédiate et sécurisée des noms de personnages directement dans le bac à sable du navigateur web. Le moteur frontend écrase automatiquement les segments d'octets hexadécimaux et corrige instantanément la somme de contrôle de vérification binaire.
*   **Empaquetage ZIP Côté Client Local** : Exploite `JSZip` pour regrouper vos actifs de codes QR entièrement déchiffrés et modifiés directement dans la mémoire du navigateur en tant qu'exportation de paquet `.zip` unique — éliminant la contrainte de sauvegarder les fichiers un par un.

#### 🔮 Lab Voix & Relations (Calculateur de Compatibilité Tomodachi Life)
*   **Synthé de Simulation Vocale 8-Bit** : Emploie une architecture Web Audio API de bas niveau (onde en dents de scie + nœuds de filtre passe-bas) pour synthétiser et prévisualiser la parole robotique électronique nostalgique des puces sonores rétro de consoles portables. Il permet une personnalisation complète des paramètres natifs de hauteur vocale (Hz) et de vitesse de parole.
*   **Classement des Relations de l'Île Tomodachi** : Dispose d'un traqueur de gestion automatisée entièrement local. Basé sur les 12 signes astrologiques du zodiaque classiques du jeu et les 16 groupes de personnalité comportementale centrale (p. ex., Loup Solitaire Indépendant, Acteur Confiant et Déterminé, Leader Extraverti), les utilisateurs peuvent constituer un registre d'île personnalisé allant jusqu'à 15 résidents (stockés en toute sécurité via `localStorage`).
*   **Calcul Croisé du Destin Automatisé** : Le moteur mathématique calcule instantanément les appariements croisés sur l'ensemble de votre registre, produisant le classement de compatibilité définitif de votre île — mettant en évidence le Top 3 des Meilleures Âmes Sœurs (harmonie romantique/amitié maximale) face au Top 3 des Pires Couples (les plus susceptibles de se heurter avec des drames virtuels).

#### 🧠 Cartographie MBTI (Tomodachi Life MBTI Cartographie des 16 personnalités et Calculateur de compatibilité)
*   **Cartographie complète des 16 MBTI**: Les 16 types de personnalité MBTI sont intégralement mappés aux groupes de personnalité de Tomodachi Life, incluant le mappage double INFP (Sweet/Softie).
*   **Calculateur de compatibilité**: Disposition en 5 onglets (Calculateur de compatibilité, Graphique de personnalité, Outil vocal, Carte des fans, Liste de personnages), section How It Works, FAQ avec données structurées BreadcrumbList/HowTo.
*   **Déclaration de transparence de l'algorithme**: Composants de la formule déclarés explicitement——Base Score (25) + Personality (25) + Zodiac (25) + Friendship (25), traçabilité des résultats garantie.

#### 🔲 Studio Grille de Pixels (Convertisseur Universel de Grille de Pixels)
*   **Conversion de Grille Universelle** : Convertit n'importe quelle image en motifs de grille de pixels pour cross-stitch, Perler beads, pixel art Minecraft et designs personnalisés Tomodachi Life.
*   **Tailles de Grille Flexibles et Correspondance de Couleurs Intelligente** : Offre 5 tailles de grille (16×16 à 128×128) avec correspondance de couleurs Euclidean distance et error-diffusion dithering pour des résultats précis.
*   **Guide de Conversion de Photos et Mise en Page Optimisée pour l'Impression** : Guide étape par étape pour transformer des photos en pixel art. Supporte l'impression native du navigateur (Ctrl+P) avec masquage automatique des panneaux de contrôle, générant un blueprint papier numéroté idéal pour le crafting hors ligne.
*   **100% Côté Client** : Tout le traitement d'image s'exécute dans votre navigateur via HTML5 Canvas API. Aucun upload, aucune base de données.

### 🔒 Architecture Respectueuse de la Vie Privée

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Bac à Sable de Votre Navigateur Client                 │
│                                                                             │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌─────────────────┐  │
│  │      HTML5 Canvas     │  │     jsQR + qrcode     │  │  Web Audio API  │  │
│  │  (Animal Crossing     │  │ (Codec QR de Tampon   │  │ (Synthèse       │  │
│  │   Pixélisateur de    │  │  Cryptographique      │  │  Procédurale    │  │
│  │   Motifs)             │  │  Mii FFL)             │  │  Tomodachi Mii) │  │
│  └──────────┬────────────┘  └───────────┬───────────┘  └────────┬────────┘  │
│             │                           │                       │           │
│             └───────────────────────────┼───────────────────────┘           │
│                                         ▼                                   │
│                            localStorage et IndexedDB du Navigateur          │
│                  (100% Alternative Sans Serveur à Living the Grid)          │
└─────────────────────────────────────────────────────────────────────────────┘
          ✕ Aucun backend cloud     ✕ Aucun suivi de base de données     ✕ Zéro téléchargement de données
```

- **Architecture 100% Côté Client** — Zéro serveur cloud, zéro suivi de base de données backend et zéro absolu de téléchargements de données sortants. Une alternative web entièrement sécurisée aux plateformes existantes comme Living the Grid.
- **Exécution en Bac à Sable Local** — Toute la pixellisation d'images personnalisées, l'analyse de tampon cryptographique binaire FFL de Mii et la synthèse vocale chiptune s'exécutent strictement dans votre navigateur.
- **Flux de Données Respectueux de la Vie Privée** — Votre registre de résidents de l'île Tomodachi et vos paramètres sont engagés uniquement dans le `localStorage` et `IndexedDB` du navigateur local — les données de votre île ne quittent jamais votre appareil physique.
- **100% Gratuit et Open Source** — Flux de données entièrement transparents et code source auditable publié sur GitHub sous la licence MIT permissive.

### 📸 Captures d'écran

> *Bientôt disponible — les PR avec des captures d'écran sont les bienvenues !*

### 🌍 Langues prises en charge (10)

`en` · `zh-Hant` · `ja` · `es` · `fr` · `ko` · `de` · `it` · `nl` · `zh-CN`

### 🛠️ Stack Technique et Architecture


| Catégorie | Technologie Haute Performance et Implémentation |
|-----------|------------|
| **Framework** | Next.js 16 (Framework App Router) + TypeScript (Sécurité de Type Stricte) |
| **Styles** | Tailwind CSS (Stylage atomique utility-first) |
| **i18n Internationalisation**| `next-intl` v4 (`localePrefix : "as-needed"` pour l'indexation multilingue optimisée des moteurs de recherche) |
| **Matrice Codec QR**  | `jsQR` (Extraction de matrice binaire Mii locale) + `qrcode` (Encodage Byte Mode compatible Mii Version 3) |
| **Archive Client**  | `JSZip` (Compilation d'archive parallèle haute performance côté navigateur et génération ZIP multi-fichiers locale) |
| **Moteur Audio** | Web Audio API Native (Synthèse procédurale d'onde en dents de scie/carrée de bas niveau `OscillatorNode` + `BiquadFilterNode`) |
| **Pipeline d'Imagerie** | HTML5 Canvas API (`imageSmoothingEnabled : false` forcé pour le rendu net de grille de pixels par plus proche voisin) |
| **Déploiement** | Optimisation d'Export Statique (SSG) → Mis à l'échelle mondialement sur le réseau CDN de périphérie global de Cloudflare Pages |

### 🚀 Pour commencer

#### Prérequis

- **Node.js** ≥ 18.17
- **npm** ≥ 9

#### Installation

```bash
# Cloner le dépôt
git clone https://github.com/cenyi/LifeSimGrid.git
cd LifeSimGrid

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

#### Build de production

```bash
# Générer l'export statique
npm run build

# Prévisualiser le build localement
npx serve out
```

### 📁 Structure du projet

```
src/
├── app/                    # Pages Next.js App Router
│   ├── [locale]/           # Routes i18n par locale (10 langues)
│   │   ├── page.tsx        # Page d'accueil (SSG)
│   │   ├── about/          # Page À propos
│   │   ├── contact/        # Page de contact
│   │   ├── privacy/        # Politique de confidentialité
│   │   ├── terms/          # Conditions d'utilisation
│   │   ├── acnh-pixel-studio/    # Sous-page ACNH Custom Designs
│   │   ├── mii-qr-unlocker/     # Sous-page Mii QR Code
│   │   ├── tomodachi-voice-lab/ # Sous-page Tomodachi Voice
│   │   ├── tomodachi-life-mbti/ # Sous-page Tomodachi Life MBTI
│   │   └── pixel-grid-studio/   # Sous-page Pixel Grid Studio
│   ├── acnh-pixel-studio/  # Sous-page EN niveau racine
│   ├── mii-qr-unlocker/   # Sous-page EN niveau racine
│   ├── tomodachi-voice-lab/ # Sous-page EN niveau racine
│   ├── tomodachi-life-mbti/ # Sous-page EN niveau racine
│   ├── pixel-grid-studio/  # Sous-page EN niveau racine
│   ├── layout.tsx          # Layout racine + metadataBase
│   └── globals.css         # Styles globaux + CSS lien ancre
├── components/             # Composants React
│   ├── HomePageContent.tsx # Changement d'onglets et navigation hash
│   ├── AcnhPixelStudioPage.tsx  # Composant sous-page ACNH
│   ├── MiiQrUnlockerPage.tsx    # Composant sous-page Mii QR
│   ├── TomodachiVoiceLabPage.tsx # Composant sous-page Voice Lab
│   ├── TomodachiLifeMbtiPage.tsx # Composant sous-page MBTI
│   ├── PixelGridStudioPage.tsx  # Composant sous-page Pixel Grid
│   ├── AboutPage.tsx       # Composant page À propos
│   ├── ContactPage.tsx     # Composant page de contact
│   ├── PrivacyPage.tsx     # Composant page de confidentialité
│   ├── TermsPage.tsx       # Composant page des conditions
│   ├── PixelStudio.tsx     # Convertisseur de grille de pixels
│   ├── AvatarEditor.tsx    # Configurateur QR d'avatar
│   ├── VoiceLab.tsx        # Synthèse vocale et lab de relations
│   ├── SEOSection.tsx      # Guide, FAQ et JSON-LD
│   ├── HistoryPanel.tsx    # Panneau d'historique (aside + aria-live)
│   ├── EnRedirect.tsx      # Gestionnaire de redirection locale EN
│   ├── Navbar.tsx          # Navigation et sélecteur de langue
│   └── Footer.tsx          # Pied de page et clause de non-responsabilité
├── i18n/                   # Configuration next-intl
│   ├── routing.ts          # Configuration du routing par locale
│   └── request.ts          # Configuration i18n côté serveur
├── lib/                    # Logique principale
│   ├── compatibility.ts    # Algorithmes de zodiaque et personnalité
│   ├── qr-handler.ts       # Logique de décodage/encodage QR
│   └── history-db.ts       # Base de données d'historique（wrapper IndexedDB）
└── locales/                # Fichiers de traduction (10 langues)
    ├── en.json             # Anglais (Américain)
    ├── zh-Hant.json        # Chinois traditionnel
    ├── ja.json             # Japonais
    ├── es.json             # Espagnol
    ├── fr.json             # Français
    ├── ko.json             # Coréen
    ├── de.json             # Allemand
    ├── it.json             # Italien
    ├── nl.json             # Néerlandais
    └── zh-CN.json          # Chinois simplifié
```

### 🚢 Déploiement

Ce projet utilise l'export statique de Next.js (`output: 'export'`), compatible avec tout fournisseur d'hébergement statique.

#### Cloudflare Pages

1. Forkez ou poussez ce dépôt sur GitHub
2. Allez sur le [Tableau de bord Cloudflare](https://dash.cloudflare.com/) → Pages → Créer un projet
3. Connectez votre dépôt GitHub
4. Configurez les paramètres de build :
   - **Commande de build** : `npm run build`
   - **Répertoire de sortie du build** : `out`
5. Déployez — c'est fait !

> **Note** : Aucune variable d'environnement n'est nécessaire. L'application entière est 100% statique.

#### Docker

Ce projet inclut un `Dockerfile` multi-étapes qui construit l'export statique et le sert via nginx.

**Option A : Tirer l'image pré-construite depuis GHCR (recommandé)**

```bash
# Tirer la dernière image
docker pull ghcr.io/cenyi/lifesimgrid:latest

# Exécuter le conteneur
docker run -d -p 8080:80 ghcr.io/cenyi/lifesimgrid:latest
```

Pour mettre à jour vers la dernière version :

```bash
docker pull ghcr.io/cenyi/lifesimgrid:latest
docker compose up -d   # ou redémarrez votre conteneur
```

**Option B : Construire depuis le code source**

```bash
# Construire l'image Docker
docker build -t lifesimgrid .

# Exécuter le conteneur
docker run -d -p 8080:80 lifesimgrid
```

Ouvrez [http://localhost:8080](http://localhost:8080) dans votre navigateur.

**Docker Compose** (optionnel) :

```yaml
services:
  lifesimgrid:
    image: ghcr.io/cenyi/lifesimgrid:latest
    # Ou construire depuis le code source : build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

```bash
# Démarrer avec Docker Compose
docker compose up -d
```

> **Note** : L'image Docker utilise nginx pour servir le même répertoire statique `out/`. Cela n'affecte pas le déploiement Cloudflare Pages — les deux méthodes servent des fichiers statiques identiques.

### 🤝 Contribuer

Nous adorons les contributions de la communauté ! Voici comment aider :

1. **Forkez** le dépôt
2. Créez une branche : `git checkout -b feature/amazing-feature`
3. Commitez : `git commit -m 'Add amazing feature'`
4. Poussez : `git push origin feature/amazing-feature`
5. Ouvrez une **Pull Request**

#### Façons de contribuer

- 🌐 **Traductions** — Ajoutez ou améliorez les traductions dans `src/locales/`
- 🐛 **Rapports de bugs** — Signalez sur [GitHub Issues](https://github.com/cenyi/LifeSimGrid/issues)
- 🎨 **UI/UX** — Améliorez l'accessibilité, le responsive design ou le design visuel
- 📖 **Documentation** — Corrigez les coquilles, ajoutez des guides, améliorez le README
- 🧪 **Tests** — Ajoutez des tests unitaires ou d'intégration

#### Guide de traduction

Chaque fichier de locale (`src/locales/*.json`) doit avoir exactement les mêmes clés que `en.json`. Lors de l'ajout de nouvelles clés :

1. Ajoutez la clé à `en.json` en premier
2. Ajoutez la clé à tous les autres fichiers de locale
3. Utilisez des expressions naturelles et natives — pas de traductions automatiques
4. Conservez les balises de texte riche next-intl comme `<pixel>`, `<qr>`, `<voice>` telles quelles
5. Conservez les préfixes emoji, termes techniques et noms de marques tels quels

### 🔒 Confidentialité et Droits d'Auteur

*   **100% Calcul Local dans le Navigateur** : Ce dépôt open source fonctionne selon un paradigme strict de zéro backend, zéro base de données. Chaque actif téléchargé pour la quantification en grille et chaque flux d'octets de tampon binaire FFL de Mii décodé est compilé et traité en temps réel exclusivement dans la mémoire de votre appareil local. Aucune donnée de suivi ou contenu personnel n'est jamais mise en cache, enregistrée ou transmise à une infrastructure cloud externe.
*   **Usage Nominatif Équitable et Neutralité Technique** : Ce dépôt constitue une pratique de développement open source tierce entièrement indépendante. Il est conçu uniquement pour démontrer l'utilité des APIs frontend modernes (telles que HTML5 Canvas et Web Audio native) pour le traçage de textures et la reconstruction de données d'octets structurés.
*   **Clarification sur les Marques Déposées** : LifeSimGrid n'a absolument aucune affiliation commerciale, partenariat opérationnel, autorisation officielle ou approbation de parrainage avec Nintendo Co., Ltd., ou tout fabricant de consoles de jeux, développeur de logiciels et éditeur. Les titres tels que « Animal Crossing », « Tomodachi Life » et « Mii » sont des marques déposées de leurs titulaires de droits d'auteur respectifs, référencés ici strictement sous l'usage nominatif équitable à des fins de compatibilité de plateforme et d'identification technologique uniquement. Toutes les comparaisons techniques avec des outils web existants comme « Living the Grid » sont positionnées purement comme une démonstration alternative de bac à sable éducatif.

### 📜 Licence

MIT License — voir le fichier [LICENSE](LICENSE) pour plus de détails.

### ⚖️ Avertissement Légal

LifeSimGrid se présente comme une suite d'utilitaires de fans de la communauté tierce non officielle entièrement indépendante et une alternative web avancée aux ensembles d'outils existants. Ce projet n'est pas affilié à, autorisé par, sponsorisé ou approuvé par aucun fabricant de consoles, développeur de logiciels ou éditeur de jeux. Toutes les spécifications binaires FFL de Mii universelles, les protocoles de format de personnages et les spécifications de grille mentionnées dans ce dépôt sont la propriété exclusive de leurs titulaires de marques déposées respectifs, référencés ici strictement sous l'usage nominatif équitable à des fins d'identification technologique et de compatibilité.

### 🛡️ Politique de Sécurité

Nous sommes profondément engagés envers la sécurité des données et le bac à sable local de confidentialité d'abord. Si vous découvrez une vulnérabilité de sécurité potentielle, une anomalie d'analyse de protocole ou une exception de flux de données dans cette boîte à outils, **ne** créez **pas** d'issue GitHub publique.

À la place, signalez-la de manière responsable par e-mail à **hi@lifesimgrid.org**. Nos bénévoles d'ingénierie principale prennent tous les rapports de sécurité technique au sérieux et enquêteront et répondront dans les 48 heures.

### 📋 Feuille de Route

- [ ] **Support PWA** : Capacité complète de Progressive Web App offrant une fonctionnalité 100% hors ligne via la mise en cache personnalisée de Service Worker.
- [ ] **Basculement Mode Sombre** : Implémentation fluide de thème sombre adaptatif au système utilisant le stylage atomique de Tailwind CSS.
- [ ] **Internationalisation Étendue** : Intégrations de locale i18n supplémentaires couvrant `pt-BR`, `ru`, `th` et `vi`.
- [ ] **Mise à Niveau du Studio Pixel** : Prise en charge des tailles de canevas de grille de pixels personnalisées définies par l'utilisateur au-delà des spécifications d'actifs standard.
- [ ] **Visualisation du Lab Vocal** : Visualisation audio de forme d'onde en direct avec HTML5 Canvas reflétant les sorties de fréquence de Web Audio API en temps réel.
- [ ] **Optimisation de l'Accessibilité** : Audit structurel complet conformément strictement aux standards web internationaux WCAG 2.1 AA.

---

## 한국어

### 🎯 LifeSimGrid란?

**LifeSimGrid**은(는) 고도의 **비공식 Animal Crossing 패턴 도구**이자 오픈소스 웹 기반 **Mii QR 코드 에디터**입니다. 현대 라이프 시뮬레이션 게임을 위한 궁극의 100% 서버리스 **Living the Grid 대안**으로 기능합니다.

무료 브라우저 기반 웹 툴킷으로서, 모든 바이너리 암호 해석, HTML5 Canvas 샘플링, 칩튠 오디오 합성이 완전히 클라이언트 사이드에서 실행됩니다. 이를 통해 절대적인 100% 데이터 프라이버시와 번개같은 로컬 성능을 보장합니다 — 클라우드 서버 없음, 계정 가입 없음, 데이터베이스 추적 없음.

### ✨ 다섯 가지 전용 스튜디오

#### 🎨 픽셀 스튜디오 (Animal Crossing 커스텀 디자인 패턴 도구)
*   **멀티 비율 그리드 캔버스**：**샌드박스 소셜 시뮬레이션 게임**의 고급 텍스처 드로잉 사양에 완벽 대응. 정사각형 1:1(표준 패턴), 직사각형 2:3(이젤 초상화, 앨범 커버), 와이드스크린 16:9(대규모 커스텀 실내 벽지) 크롭 비율을 네이티브 지원.
*   **멀티 밀도 브러시 샘플링**：레트로 콘솔 그리드 크기에 맞춘 4가지 픽셀 밀도 티어 제공 — 256×256(1px 울트라 파인), 85×85(3px, 표준 Pro Design 타일 레이아웃), 64×64(4px 간소화 캔버스), 32×32(7px 클래식 디자인 타일).
*   **전처리 이미지 필터**：내장 실시간 조절 가능한 밝기 및 대비 설정 슬라이더로, 복잡한 애니메이션 아트나 게임 그래픽을 축소할 때의 탁한 색 왜곡을 크게 해소.
*   **페인트 바이 넘버 하이라이트**：24개 양자화 컬러 스와치 중 하나를 클릭하면 캔버스에서 해당 픽셀 그리드 인덱스가 점선 테두리로 즉시 분리 및 하이라이트되어 휴대용 콘솔에서 손쉬운 수동 트레이싱 가능.

#### 🔓 QR 컨피규레이터 (Mii QR 코드 에디터 & FFL 프로토콜 권한 언로커)
*   **병렬 배치 권한 언록**：여러 Mii QR 코드 이미지의 동시 드래그 앤 드롭 지원. `Promise.all`을 통한 고성능 프론트엔드 비동기 스트림으로 공식 Mii FFL 바이너리 프로토콜 형식에 내장된 "복사 불가" 및 "공유/편집 제한" 체크섬 플래그를 일괄 해제.
*   **온라인 암호학적 리네임**：웹 브라우저 샌드박스 내에서 캐릭터 이름을 직접 안전하게 수정 가능. 프론트엔드 엔진이 16진수 바이트 세그먼트를 자동 덮어쓰고 바이너리 검증 체크섬을 즉시 수정.
*   **로컬 클라이언트 사이드 ZIP 패키징**：`JSZip`을 활용하여 완전히 복호화 및 수정된 QR 코드 에셋을 브라우저 메모리 내에서 직접 단일 `.zip` 패키지로 내보내기 — 파일을 하나씩 저장하는 번거로움 제거.

#### 🔮 보이스 & 릴레이션십 랩 (Tomodachi Life 궁합 계산기)
*   **8-Bit 보이스 시뮬레이션 신스**：저수준 Web Audio API 아키텍처(톱니파 + 로우패스 필터 노드)를 채용하여 레트로 휴대용 콘솔 사운드 칩의 노스탤지어한 전자 로봇 음성을 합성 및 미리보기. 네이티브 음성 피치(Hz)와 스피드 매개변수의 완전 커스터마이징 지원.
*   **Tomodachi 섬 릴레이션십 리더보드**：완전히 로컬한 자동 관리 트래커 탑재. 게임의 클래식한 12 별자리와 16개 코어 행동 성격 그룹(예: 독립적인 외톨이, 자신감 넘치는 행동파, 외향적 리더)을 기반으로 최대 15명 주민의 커스텀 섬 명부 구축 가능(`localStorage`로 안전 저장).
*   **자동 운명 교차 연산**：수학 엔진이 명부 전체의 교차 페어링을 즉시 계산하여 섬 그리드의 결정적 궁합 랭킹 출력 — Top 3 베스트 소울메이트(최고 로맨스/우정 조화) vs Top 3 워스트 매치(가상 드라마를 일으킬 가능성이 가장 높은 조합)를 하이라이트.

#### 🧠 MBTI 성격 매핑 (Tomodachi Life MBTI 16성격 매핑 및 궁합 계산기)
*   **16종 MBTI 완전 매핑**: MBTI 16종 성격 유형을 Tomodachi Life의 성격 그룹에 완전 매핑. INFP 이중 매핑(Sweet/Softie) 특별 처리 포함.
*   **궁합 계산기**: 5개 탭 레이아웃(궁합 계산기, 성격 차트, 음성 도구, 팬 맵, 캐릭터 목록), How It Works 섹션, FAQ, BreadcrumbList/HowTo 구조화 데이터 지원.
*   **알고리즘 투명성 선언**: 공식 구성 요소 명시——Base Score (25) + Personality (25) + Zodiac (25) + Friendship (25), 결과 추적 가능성 보장.

#### 🔲 픽셀 그리드 스튜디오 (범용 픽셀 그리드 컨버터)
*   **범용 픽셀 그리드 변환**: 모든 이미지를 픽셀 그리드 패턴으로 변환. cross-stitch, Perler beads, Minecraft 픽셀 아트, Tomodachi Life 커스텀 디자인 템플릿 지원.
*   **유연한 그리드 사이즈 & 스마트 컬러 매칭**: 5가지 그리드 사이즈(16×16~128×128) 제공. Euclidean distance 컬러 매칭과 error-diffusion dithering을 채택하여 32색 레트로 팔레트로도 정확한 결과 생성.
*   **사진 변환 가이드 & 인쇄 최적화 레이아웃**: 사진을 픽셀 아트로 변환하는 단계별 가이드. 네이티브 브라우저 인쇄(Ctrl+P)를 지원하며 컨트롤 패널을 자동 숨김 처리하여 깔끔한 번호 매겨진 종이 그리드 청사진 출력. 오프라인 크래프팅에 최적.
*   **100% 클라이언트 사이드**: 모든 이미지 처리는 HTML5 Canvas API로 브라우저 내에서 실행. 업로드 불필요, 데이터베이스 추적 없음.

### 🔒 프라이버시 우선 아키텍처

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          당신의 클라이언트 브라우저 샌드박스                  │
│                                                                             │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌─────────────────┐  │
│  │      HTML5 Canvas     │  │     jsQR + qrcode     │  │  Web Audio API  │  │
│  │  (Animal Crossing     │  │ (Mii FFL 암호학적      │  │ (Tomodachi Mii  │  │
│  │   패턴 픽셀레이터)     │  │   버퍼 QR 코덱)       │  │ 절차적 신스)     │  │
│  └──────────┬────────────┘  └───────────┬───────────┘  └────────┬────────┘  │
│             │                           │                       │           │
│             └───────────────────────────┼───────────────────────┘           │
│                                         ▼                                   │
│                            브라우저 localStorage & IndexedDB               │
│                       (100% Living the Grid 서버리스 대안)                  │
└─────────────────────────────────────────────────────────────────────────────┘
          ✕ 클라우드 백엔드 없음     ✕ 데이터베이스 추적 없음     ✕ 데이터 업로드 제로
```

- **100% 클라이언트 사이드 아키텍처** — 제로 클라우드 서버, 제로 백엔드 데이터베이스 추적, 절대 제로 아웃바운드 데이터 업로드. Living the Grid 같은 레거시 플랫폼을 대체하는 완전히 안전한 웹 대안.
- **로컬 샌드박스 실행** — 모든 커스텀 이미지 픽셀레이션, Mii FFL 바이너리 암호학적 버퍼 파싱, 칩튠 음성 합성은 엄격하게 브라우저 내에서 실행.
- **프라이버시 우선 데이터 흐름** — 당신의 Tomodachi 섬 주민 명부와 설정은 로컬 브라우저 `localStorage`와 `IndexedDB`에만 커밋 — 섬의 데이터는 물리적 기기를 떠나지 않습니다.
- **100% 무료 & 오픈소스** — 완전히 투명한 데이터 흐름과 감사 가능한 소스 코드를 관대한 MIT License로 GitHub에 공개.

### 📸 스크린샷

> *출시 예정 — 스크린샷 PR을 환영합니다!*

### 🌍 지원 언어 (10개)

`en` · `zh-Hant` · `ja` · `es` · `fr` · `ko` · `de` · `it` · `nl` · `zh-CN`

### 🛠️ 기술 스택 및 아키텍처


| 카테고리 | 고성능 기술 및 구현 |
|----------|-----------|
| **프레임워크** | Next.js 16(App Router 프레임워크) + TypeScript(엄격한 타입 안전성) |
| **스타일링** | Tailwind CSS(유틸리티 퍼스트 원자 스타일링) |
| **i18n 국제화**| `next-intl` v4(`localePrefix: "as-needed"` 최적화된 검색 엔진 다국어 인덱싱용) |
| **QR 코덱 매트릭스**  | `jsQR`(로컬 Mii 바이너리 매트릭스 추출) + `qrcode`(Version 3 Mii 호환 Byte Mode 인코딩) |
| **클라이언트 아카이브**  | `JSZip`(고성능 병렬 브라우저 사이드 아카이브 컴파일 및 로컬 멀티파일 ZIP 생성) |
| **오디오 엔진** | 네이티브 Web Audio API(저수준 `OscillatorNode` 톱니/구형파 절차적 합성 + `BiquadFilterNode`) |
| **이미징 파이프라인** | HTML5 Canvas API(`imageSmoothingEnabled: false` 최근접 이웃 선명 픽셀 그리드 렌더링 강제) |
| **배포** | 정적 내보내기 최적화(SSG) → Cloudflare Pages 글로벌 엣지 CDN 네트워크로 스케일링 |

### 🚀 시작하기

#### 사전 요구 사항

- **Node.js** ≥ 18.17
- **npm** ≥ 9

#### 설치

```bash
# 저장소 클론
git clone https://github.com/cenyi/LifeSimGrid.git
cd LifeSimGrid

# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 여세요.

#### 프로덕션 빌드

```bash
# 정적 내보내기 생성
npm run build

# 로컬에서 빌드 미리보기
npx serve out
```

### 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── [locale]/           # i18n 로케일 라우팅 (10개 언어)
│   │   ├── page.tsx        # 홈페이지 (SSG)
│   │   ├── about/          # 소개 페이지
│   │   ├── contact/        # 연락처 페이지
│   │   ├── privacy/        # 개인정보 처리방침
│   │   ├── terms/          # 이용약관
│   │   ├── acnh-pixel-studio/    # ACNH 커스텀 디자인 서브페이지
│   │   ├── mii-qr-unlocker/     # Mii QR Code 서브페이지
│   │   ├── tomodachi-voice-lab/ # Tomodachi Voice 서브페이지
│   │   ├── tomodachi-life-mbti/ # Tomodachi Life MBTI 서브페이지
│   │   └── pixel-grid-studio/   # Pixel Grid Studio 서브페이지
│   ├── acnh-pixel-studio/  # 루트 레벨 EN 서브페이지
│   ├── mii-qr-unlocker/   # 루트 레벨 EN 서브페이지
│   ├── tomodachi-voice-lab/ # 루트 레벨 EN 서브페이지
│   ├── tomodachi-life-mbti/ # 루트 레벨 EN 서브페이지
│   ├── pixel-grid-studio/  # 루트 레벨 EN 서브페이지
│   ├── layout.tsx          # 루트 레이아웃 + metadataBase
│   └── globals.css         # 글로벌 스타일 + 앵커 링크 CSS
├── components/             # React 컴포넌트
│   ├── HomePageContent.tsx # 탭 전환 & 해시 네비게이션
│   ├── AcnhPixelStudioPage.tsx  # ACNH 서브페이지 컴포넌트
│   ├── MiiQrUnlockerPage.tsx    # Mii QR 서브페이지 컴포넌트
│   ├── TomodachiVoiceLabPage.tsx # Voice Lab 서브페이지 컴포넌트
│   ├── TomodachiLifeMbtiPage.tsx # MBTI 서브페이지 컴포넌트
│   ├── PixelGridStudioPage.tsx  # Pixel Grid 서브페이지 컴포넌트
│   ├── AboutPage.tsx       # 소개 페이지 컴포넌트
│   ├── ContactPage.tsx     # 연락처 페이지 컴포넌트
│   ├── PrivacyPage.tsx     # 개인정보 처리방침 페이지 컴포넌트
│   ├── TermsPage.tsx       # 이용약관 페이지 컴포넌트
│   ├── PixelStudio.tsx     # 픽셀 그리드 변환기
│   ├── AvatarEditor.tsx    # 아바타 QR 설정기
│   ├── VoiceLab.tsx        # 음성 합성 & 관계 랭킹
│   ├── SEOSection.tsx      # 가이드, FAQ & JSON-LD
│   ├── HistoryPanel.tsx    # 기록 패널 (aside + aria-live)
│   ├── EnRedirect.tsx      # EN 로케일 리다이렉트 핸들러
│   ├── Navbar.tsx          # 내비게이션 & 언어 전환기
│   └── Footer.tsx          # 푸터 & 면책 조항
├── i18n/                   # next-intl 설정
│   ├── routing.ts          # 로케일 라우팅 설정
│   └── request.ts          # 서버 사이드 i18n 설정
├── lib/                    # 핵심 로직
│   ├── compatibility.ts    # 별자리 & 성격 알고리즘
│   ├── qr-handler.ts       # QR 디코딩/인코딩 로직
│   └── history-db.ts       # 기록 데이터베이스（IndexedDB 래퍼）
└── locales/                # 번역 파일 (10개 언어)
    ├── en.json             # 영어 (미국)
    ├── zh-Hant.json        # 번체 중국어
    ├── ja.json             # 일본어
    ├── es.json             # 스페인어
    ├── fr.json             # 프랑스어
    ├── ko.json             # 한국어
    ├── de.json             # 독일어
    ├── it.json             # 이탈리아어
    ├── nl.json             # 네덜란드어
    └── zh-CN.json          # 간체 중국어
```

### 🚢 배포

이 프로젝트는 Next.js 정적 내보내기(`output: 'export'`)를 사용하며, 모든 정적 호스팅 제공자와 호환됩니다.

#### Cloudflare Pages

1. 이 저장소를 Fork하거나 GitHub에 푸시
2. [Cloudflare 대시보드](https://dash.cloudflare.com/) → Pages → 프로젝트 만들기
3. GitHub 저장소 연결
4. 빌드 설정 구성:
   - **빌드 명령어**: `npm run build`
   - **빌드 출력 디렉토리**: `out`
5. 배포 — 완료!

> **참고**: 환경 변수가 필요하지 않습니다. 전체 앱이 100% 정적입니다.

#### Docker

이 프로젝트는 정적 내보내기를 빌드하고 nginx를 통해 제공하는 멀티스테이지 `Dockerfile`을 포함합니다.

**옵션 A: GHCR에서 사전 빌드된 이미지 풀 (권장)**

```bash
# 최신 이미지 풀
docker pull ghcr.io/cenyi/lifesimgrid:latest

# 컨테이너 실행
docker run -d -p 8080:80 ghcr.io/cenyi/lifesimgrid:latest
```

최신 버전으로 업데이트:

```bash
docker pull ghcr.io/cenyi/lifesimgrid:latest
docker compose up -d   # 또는 컨테이너 재시작
```

**옵션 B: 소스에서 빌드**

```bash
# Docker 이미지 빌드
docker build -t lifesimgrid .

# 컨테이너 실행
docker run -d -p 8080:80 lifesimgrid
```

브라우저에서 [http://localhost:8080](http://localhost:8080)을 여세요.

**Docker Compose** (선택 사항):

```yaml
services:
  lifesimgrid:
    image: ghcr.io/cenyi/lifesimgrid:latest
    # 또는 소스에서 빌드: build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

```bash
# Docker Compose로 시작
docker compose up -d
```

> **참고**: Docker 이미지는 nginx를 사용하여 동일한 정적 `out/` 디렉토리를 제공합니다. 이는 Cloudflare Pages 배포에 영향을 주지 않습니다 — 두 방법 모두 동일한 정적 파일을 제공합니다.

### 🤝 기여하기

커뮤니티 기여를 환영합니다! 참여 방법:

1. 저장소를 **Fork**
2. 브랜치 생성: `git checkout -b feature/amazing-feature`
3. 커밋: `git commit -m 'Add amazing feature'`
4. 푸시: `git push origin feature/amazing-feature`
5. **Pull Request** 생성

#### 기여 방법

- 🌐 **번역** — `src/locales/`에서 번역 추가 또는 개선
- 🐛 **버그 보고** — [GitHub Issues](https://github.com/cenyi/LifeSimGrid/issues)에 보고
- 🎨 **UI/UX** — 접근성, 모바일 반응형 또는 디자인 개선
- 📖 **문서** — 오타 수정, 가이드 추가, README 개선
- 🧪 **테스트** — 유닛 테스트 또는 통합 테스트 추가

#### 번역 가이드라인

각 로케일 파일(`src/locales/*.json`)은 `en.json`과 정확히 동일한 키를 가져야 합니다. 새 키를 추가할 때:

1. 먼저 `en.json`에 키를 추가
2. 다른 모든 로케일 파일에 키를 추가
3. 기계 번역이 아닌 자연스럽고 네이티브한 표현 사용
4. `<pixel>`, `<qr>`, `<voice>` 등 next-intl 리치 텍스트 태그는 그대로 유지
5. 이모지 접두사, 기술 용어 및 브랜드 이름은 그대로 유지

### 🔒 개인정보 및 저작권 면책

*   **100% 브라우저 로컬 연산**：본 오픈소스 프로젝트는 엄격한 제로 백엔드, 제로 데이터베이스 패러다임으로 운영됩니다. 그리드 양자화를 위해 업로드된 모든 에셋과 디코딩된 모든 Mii FFL 바이너리 버퍼 바이트 스트림은 로컬 기기의 메모리에서만 실시간으로 컴파일 및 처리됩니다. 추적 데이터나 개인 콘텐츠가 외부 클라우드 인프라에 캐시, 기록 또는 전송되는 일은 절대 없습니다.
*   **지시적 공정 사용 및 기술적 중립성**：본 프로젝트는 완전히 독립적인 제3자 오픈소스 개발 실천입니다. 최신 프론트엔드 API(HTML5 Canvas 및 네이티브 Web Audio 등)를 활용한 텍스처 트레이싱과 구조화된 바이트 데이터 재구성의 유용성을 시연하는 목적으로만 설계되었습니다.
*   **상표권 명확화**：LifeSimGrid는 Nintendo Co., Ltd. 또는 어떤 게임 콘솔 제조업체, 소프트웨어 개발자, 퍼블리셔와도 절대 영의 상업적 제휴, 운영 파트너십, 공식 인가, 후원 보증이 없습니다. "Animal Crossing", "Tomodachi Life", "Mii" 등의 명칭은 각 저작권 보유자의 등록상표이며, 여기서는 플랫폼 호환성 및 기술적 식별 목적으로만 지시적 공정 사용에 근거하여 언급됩니다. "Living the Grid" 같은 레거시 웹 도구와의 기술적 비교는 순수하게 교육적 샌드박스 대안 시연으로 포지셔닝됩니다.

### 📜 라이선스

MIT License — 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

### ⚖️ 법적 고지

LifeSimGrid은 완전히 독립적인 비공식 제3자 커뮤니티 팬 유틸리티 스위트이자 레거시 툴셋에 대한 고도의 웹 대안입니다. 본 프로젝트는 어떤 콘솔 제조업체, 소프트웨어 개발자, 게임 퍼블리셔와도 제휴, 인가, 후원 또는 보증 관계가 없습니다. 본 저장소에서 언급된 모든 범용 Mii FFL 바이너리 사양, 캐릭터 형식 프로토콜 및 그리드 사양은 각 상표 보유자의 전유 재산이며, 여기서는 기술적 식별 및 호환성 목적으로만 지시적 공정 사용에 근거하여 언급됩니다.

### 🛡️ 보안 정책

우리는 데이터 보안과 로컬 프라이버시 우선 샌드박스 실행에 깊이 전념하고 있습니다. 본 툴킷 내에서 잠재적인 보안 취약점, 프로토콜 파싱 이상, 또는 데이터 흐름 예외를 발견하신 경우 공개 GitHub 이슈를 **열지 마세요**.

대신 **hi@lifesimgrid.org**로 책임감 있게 이메일로 보고해 주세요. 핵심 엔지니어링 자원봉사 팀은 모든 기술 보안 보고를 진지하게 다루며 48시간 이내에 조사 및 응답합니다.

### 📋 프로젝트 로드맵

- [ ] **PWA 지원**：커스텀 Service Worker 캐싱을 통해 100% 오프라인 기능을 제공하는 완전한 Progressive Web App 지원.
- [ ] **다크 모드 전환**：Tailwind CSS 원자 스타일링을 활용한 유려한 시스템 적응형 다크 테마 구현.
- [ ] **확장 국제화**：`pt-BR`, `ru`, `th`, `vi`를 포함한 추가 i18n 로케일 통합.
- [ ] **픽셀 스튜디오 업그레이드**：표준 에셋 사양을 넘어선 커스텀 사용자 정의 픽셀 그리드 캔버스 크기 지원.
- [ ] **보이스 랩 비주얼라이제이션**：실시간 Web Audio API 주파수 출력을 미러링하는 라이브 HTML5 Canvas 파형 오디오 비주얼라이제이션.
- [ ] **접근성 최적화**：WCAG 2.1 AA 국제 웹 표준에 엄격하게 준수하는 포괄적인 구조 감사.

---

## Deutsch

### 🎯 Was ist LifeSimGrid?

**LifeSimGrid** ist ein fortschrittliches **inoffizielles Animal Crossing-Musterwerkzeug** und ein quelloffenes, webbasiertes **Mii-QR-Code-Editor**. Es dient als die ultimative 100% serverlose **Alternative zu Living the Grid** für moderne Lebenssimulationsspiele.

Als kostenloses, browserbasiertes Web-Toolkit erfolgen gesamte binäre kryptografische Analyse, HTML5-Canvas-Abtastung und Chiptune-Audiosynthese vollständig auf der Client-Seite. Dies gewährleistet absolute 100%ige Datenschutzprivatsphäre und blitzschnelle lokale Leistung — keine Cloud-Server, keine Kontoregistrierung und keine Datenbankverfolgung erforderlich.

### ✨ Fünf Dedizierte Studios

#### 🎨 Pixel-Studio (Animal Crossing Custom Design Musterwerkzeug)
*   **Multi-Verhältnis-Raster-Leinwand** : Passt perfekt zu den fortschrittlichen Texturzeichnungsspezifikationen in **Sandkasten-Sozialsimulationsspielen**. Es unterstützt nativ quadratische 1:1 (Standardmuster), rechteckige 2:3 (Staffelei-Porträts, Albumcover) und Breitbild-16:9 (weitläufige individuelle Innenwandtapeten) Zuschnitt-Seitenverhältnisse.
*   **Multi-Dichte-Pinsel-Abtastung** : Bietet vier unterschiedliche Pixeldichtestufen zur Übereinstimmung mit Retro-Konsolen-Rastergrößen — 256×256 (1px ultrafein), 85×85 (3px, Standard-Pro-Design-Kachel-Layout), 64×64 (4px vereinfachte Leinwand) und 32×32 (7px klassische Design-Kachel).
*   **Vorverarbeitungs-Bildfilter** : Verfügt über integrierte, in Echtzeit anpassbare Helligkeits- und Kontrastkonfigurationsschieberegler, um trübe Farbverzerrungen beim Herunterskalieren komplexer Anime-Kunst oder Spielgrafiken signifikant zu beseitigen.
*   **Malen-nach-Zahlen-Hervorhebung** : Klicken Sie auf eine der 24 quantisierten Farbpaletten, um übereinstimmende Pixelraster-Indizes auf der Leinwand sofort mit gestrichelten Rändern zu isolieren und hervorzuheben, für müheloses manuelles Nachzeichnen auf Ihrer tragbaren Konsole.

#### 🔓 QR-Konfigurator (Mii-QR-Code-Editor & FFL-Protokoll-Berechtigungsentsperrer)
*   **Parallele Batch-Berechtigungsentsperrung** : Unterstützt gleichzeitiges Ziehen und Ablegen mehrerer Mii-QR-Code-Bilder. Implementiert hochleistungs-Frontend-Asynchronströme über `Promise.all`, um die in das offizielle Mii-FFL-Binärprotokollformat eingebetteten Prüfsummen-Flags »Kopieren nicht erlaubt« und »Teilen/Bearbeiten eingeschränkt« zu entfernen.
*   **Online-Kryptografische Umbenennung** : Ermöglicht die sofortige, sichere Änderung von Charakternamen direkt im Web-Browser-Sandkasten. Das Frontend-Engine überschreibt automatisch hexadezimale Byte-Segmente und korrigiert die binäre Verifikationsprüfsumme sofort.
*   **Lokale Client-seitige ZIP-Verpackung** : Nutzt `JSZip`, um Ihre vollständig entschlüsselten und modifizierten QR-Code-Assets direkt im Browser-Speicher als einziges `.zip`-Paket-Export zu bündeln — und eliminiert die Mühe, Dateien einzeln zu speichern.

#### 🔮 Sprach- & Beziehungs-Lab (Tomodachi Life Kompatibilitätsrechner)
*   **8-Bit-Sprachsimulations-Synth** : Verwendet eine Low-Level-Web-Audio-API-Architektur (Sägezahnwelle + Tiefpassfilter-Knoten), um die nostalgische, elektronische Robotersprache von Retro-Handheld-Soundchips zu synthetisieren und vorzuschauen. Es ermöglicht die vollständige Anpassung der nativen Sprachhöhe (Hz) und Sprechgeschwindigkeitsparameter.
*   **Tomodachi-Insel-Beziehungs-Rangliste** : Verfügt über einen vollständig lokalen automatisierten Verwaltungs-Tracker. Basierend auf den 12 klassischen astrologischen Tierkreiszeichen des Spiels und den 16 Kern-Verhaltenspersönlichkeitsgruppen (z. B. Unabhängiger Einzelgänger, Selbstbewusster Macher, Extrovertierter Anführer) können Benutzer eine individuelle Insel-Liste von bis zu 15 Bewohnern erstellen (sicher gespeichert über `localStorage`).
*   **Automatisierte Schicksals-Kreuzberechnung** : Die Mathematik-Engine berechnet sofort Kreuzpaarungen über Ihre gesamte Liste und gibt die endgültige Kompatibilitätsrangliste Ihrer Insel aus — mit Hervorhebung der Top 3 Besten Seelenverwandten (höchste Romantik-/Freundschaftsharmonie) gegenüber den Top 3 Schlechtesten Paaren (am wahrscheinlichsten mit virtuellem Drama zu kollidieren).

#### 🧠 MBTI-Persönlichkeitszuordnung (Tomodachi Life MBTI 16-Persönlichkeits-Mapping & Kompatibilitätsrechner)
*   **Vollständige MBTI-16-Zuordnung**: Alle 16 MBTI-Persönlichkeitstypen werden Tomodachi Life-Persönlichkeitsgruppen zugeordnet, einschließlich INFP-Dual-Mapping (Sweet/Softie).
*   **Kompatibilitätsrechner**: 5-Tab-Layout (Kompatibilitätsrechner, Persönlichkeitsdiagramm, Voice-Tool, Fan-Map, Charakterliste), How-It-Works-Bereich, FAQ mit BreadcrumbList/HowTo strukturierten Daten.
*   **Algorithmus-Transparenz**: Formelbestandteile explizit deklariert——Base Score (25) + Personality (25) + Zodiac (25) + Friendship (25), Ergebnisnachvollziehbarkeit gewährleistet.

#### 🔲 Pixel-Grid-Studio (Universeller Pixel-Grid-Konverter)
*   **Universelle Pixel-Grid-Konvertierung**: Konvertiert jedes Bild in Pixel-Grid-Muster für cross-stitch, Perler beads, Minecraft-Pixel-Art und Tomodachi Life Custom Designs.
*   **Flexible Grid-Größen & Intelligente Farbzuordnung**: Bietet 5 Grid-Größen (16×16 bis 128×128) mit Euclidean distance Farbzuordnung und error-diffusion dithering für präzise Ergebnisse.
*   **Foto-Konvertierungs-Guide & Druckoptimiertes Layout**: Schritt-für-Schritt-Anleitung zur Umwandlung von Fotos in Pixel-Art. Unterstützt nativen Browserdruck (Ctrl+P) mit automatischer Ausblendung der Bedienfelder und erzeugt einen sauberen, nummerierten Papier-Grid-Blueprint ideal für Offline-Crafting.
*   **100% Client-Seitig**: Die gesamte Bildverarbeitung läuft in Ihrem Browser über HTML5 Canvas API. Keine Uploads, keine Datenbanken.

### 🔒 Datenschutz-Erst-Architektur

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Ihr Client-Browser-Sandkasten                          │
│                                                                             │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌─────────────────┐  │
│  │      HTML5 Canvas     │  │     jsQR + qrcode     │  │  Web Audio API  │  │
│  │  (Animal Crossing     │  │ (Mii FFL Kryptografie-│  │ (Tomodachi Mii  │  │
│  │   Muster-Pixelator)   │  │  Puffer QR-Codec)     │  │ Prozedural-     │  │
│  │                       │  │                       │  │ Synth)          │  │
│  └──────────┬────────────┘  └───────────┬───────────┘  └────────┬────────┘  │
│             │                           │                       │           │
│             └───────────────────────────┼───────────────────────┘           │
│                                         ▼                                   │
│                            Browser localStorage & IndexedDB                 │
│                (100% Living the Grid Serverlose Alternative)                │
└─────────────────────────────────────────────────────────────────────────────┘
          ✕ Kein Cloud-Backend     ✕ Kein Datenbank-Tracking     ✕ Keine Daten-Uploads
```

- **100% Client-seitige Architektur** — Keine Cloud-Server, kein Backend-Datenbank-Tracking und absolut keine ausgehenden Daten-Uploads. Eine vollständig sichere Web-Alternative zu Legacy-Plattformen wie Living the Grid.
- **Lokale Sandkasten-Ausführung** — Alle benutzerdefinierte Bild-Pixelierung, Mii-FFL-binäre kryptografische Pufferanalyse und Chiptune-Sprachsynthese werden streng in Ihrem Browser ausgeführt.
- **Datenschutz-Erst-Datenfluss** — Ihre Tomodachi-Insel-Bewohnerliste und Einstellungen werden nur im lokalen Browser-`localStorage` und `IndexedDB` gespeichert — die Daten Ihrer Insel verlassen niemals Ihr physisches Gerät.
- **100% Kostenlos und Quelloffen** — Vollständig transparente Datenflüsse und prüfbaren Quellcode, der auf GitHub unter der permissiven MIT-Lizenz veröffentlicht ist.

### 📸 Screenshots

> *Demnächst — PRs mit Screenshots willkommen!*

### 🌍 Unterstützte Sprachen (10)

`en` · `zh-Hant` · `ja` · `es` · `fr` · `ko` · `de` · `it` · `nl` · `zh-CN`

### 🛠️ Tech-Stack und Architektur


| Kategorie | Hochleistungs-Technologie und Implementierung |
|-----------|------------|
| **Framework** | Next.js 16 (App Router Framework) + TypeScript (Strenge Typsicherheit) |
| **Styling** | Tailwind CSS (Utility-first atomares Styling) |
| **i18n Internationalisierung**| `next-intl` v4 (`localePrefix: "as-needed"` für optimierte mehrsprachige Suchmaschinenindexierung) |
| **QR-Codec-Matrix**  | `jsQR` (Lokale Mii-Binärmatrix-Extraktion) + `qrcode` (Version 3 Mii-kompatible Byte-Mode-Kodierung) |
| **Client-Archiv**  | `JSZip` (Hochleistungs-parallele Browser-seitige Archivkompilierung und lokale Multi-Datei-ZIP-Generierung) |
| **Audio-Engine** | Native Web Audio API (Low-Level `OscillatorNode` Sägezahn/Rechteckwelle prozedurale Synthese + `BiquadFilterNode`) |
| **Bildverarbeitungs-Pipeline** | HTML5 Canvas API (`imageSmoothingEnabled: false` erzwungen für Next-Neighbor-knackige Pixelraster-Rendering) |
| **Bereitstellung** | Statischer Export Optimierung (SSG) → Global skaliert auf Cloudflare Pages globales Edge-CDN-Netzwerk |

### 🚀 Erste Schritte

#### Voraussetzungen

- **Node.js** ≥ 18.17
- **npm** ≥ 9

#### Installation

```bash
# Repository klonen
git clone https://github.com/cenyi/LifeSimGrid.git
cd LifeSimGrid

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Öffnen Sie [http://localhost:3000](http://localhost:3000) in Ihrem Browser.

#### Produktions-Build

```bash
# Statischen Export generieren
npm run build

# Build lokal vorschauen
npx serve out
```

### 📁 Projektstruktur

```
src/
├── app/                    # Next.js App Router Seiten
│   ├── [locale]/           # i18n Locale-Routing (10 Sprachen)
│   │   ├── page.tsx        # Startseite (SSG)
│   │   ├── about/          # Über-Seite
│   │   ├── contact/        # Kontaktseite
│   │   ├── privacy/        # Datenschutzerklärung
│   │   ├── terms/          # Nutzungsbedingungen
│   │   ├── acnh-pixel-studio/    # ACNH Custom Designs Unterseite
│   │   ├── mii-qr-unlocker/     # Mii QR Code Unterseite
│   │   ├── tomodachi-voice-lab/ # Tomodachi Voice Unterseite
│   │   ├── tomodachi-life-mbti/ # Tomodachi Life MBTI Unterseite
│   │   └── pixel-grid-studio/   # Pixel Grid Studio Unterseite
│   ├── acnh-pixel-studio/  # Root-Level EN Unterseite
│   ├── mii-qr-unlocker/   # Root-Level EN Unterseite
│   ├── tomodachi-voice-lab/ # Root-Level EN Unterseite
│   ├── tomodachi-life-mbti/ # Root-Level EN Unterseite
│   ├── pixel-grid-studio/  # Root-Level EN Unterseite
│   ├── layout.tsx          # Root-Layout + metadataBase
│   └── globals.css         # Globale Stile + Anker-Link CSS
├── components/             # React Komponenten
│   ├── HomePageContent.tsx # Tab-Umschaltung & Hash-Navigation
│   ├── AcnhPixelStudioPage.tsx  # ACNH Unterseiten-Komponente
│   ├── MiiQrUnlockerPage.tsx    # Mii QR Unterseiten-Komponente
│   ├── TomodachiVoiceLabPage.tsx # Voice Lab Unterseiten-Komponente
│   ├── TomodachiLifeMbtiPage.tsx # MBTI Unterseiten-Komponente
│   ├── PixelGridStudioPage.tsx  # Pixel Grid Unterseiten-Komponente
│   ├── AboutPage.tsx       # Über-Seiten-Komponente
│   ├── ContactPage.tsx     # Kontaktseiten-Komponente
│   ├── PrivacyPage.tsx     # Datenschutz-Seiten-Komponente
│   ├── TermsPage.tsx       # Nutzungsbedingungen-Seiten-Komponente
│   ├── PixelStudio.tsx     # Pixel-Grid-Konverter
│   ├── AvatarEditor.tsx    # Avatar-QR-Konfigurator
│   ├── VoiceLab.tsx        # Sprachsynthese & Beziehungs-Lab
│   ├── SEOSection.tsx      # Leitfaden, FAQ & JSON-LD
│   ├── HistoryPanel.tsx    # Verlaufspanel (aside + aria-live)
│   ├── EnRedirect.tsx      # EN Locale-Redirect-Handler
│   ├── Navbar.tsx          # Navigation & Sprachwechsler
│   └── Footer.tsx          # Footer & Haftungsausschluss
├── i18n/                   # next-intl Konfiguration
│   ├── routing.ts          # Locale-Routing-Konfiguration
│   └── request.ts          # Serverseitiges i18n-Setup
├── lib/                    # Kernlogik
│   ├── compatibility.ts    # Sternzeichen & Persönlichkeitsalgorithmen
│   ├── qr-handler.ts       # QR Dekodierungs-/Kodierungslogik
│   └── history-db.ts       # Verlaufsdatenbank（IndexedDB-Wrapper）
└── locales/                # Übersetzungsdateien (10 Sprachen)
    ├── en.json             # Englisch (Amerikanisch)
    ├── zh-Hant.json        # Traditionelles Chinesisch
    ├── ja.json             # Japanisch
    ├── es.json             # Spanisch
    ├── fr.json             # Französisch
    ├── ko.json             # Koreanisch
    ├── de.json             # Deutsch
    ├── it.json             # Italienisch
    ├── nl.json             # Niederländisch
    └── zh-CN.json          # Vereinfachtes Chinesisch
```

### 🚢 Bereitstellung

Dieses Projekt verwendet den statischen Next.js-Export (`output: 'export'`) und ist mit jedem statischen Hosting-Anbieter kompatibel.

#### Cloudflare Pages

1. Forken oder pushen Sie dieses Repo zu GitHub
2. Gehen Sie zum [Cloudflare-Dashboard](https://dash.cloudflare.com/) → Pages → Projekt erstellen
3. Verbinden Sie Ihr GitHub-Repository
4. Build-Einstellungen konfigurieren:
   - **Build-Befehl**: `npm run build`
   - **Build-Ausgabeverzeichnis**: `out`
5. Bereitstellen — fertig!

> **Hinweis**: Es werden keine Umgebungsvariablen benötigt. Die gesamte App ist 100% statisch.

#### Docker

Dieses Projekt enthält ein mehrstufiges `Dockerfile`, das den statischen Export erstellt und über nginx bereitstellt.

**Option A: Vorgefertigtes Image von GHCR ziehen (empfohlen)**

```bash
# Neuestes Image ziehen
docker pull ghcr.io/cenyi/lifesimgrid:latest

# Container ausführen
docker run -d -p 8080:80 ghcr.io/cenyi/lifesimgrid:latest
```

Auf die neueste Version aktualisieren:

```bash
docker pull ghcr.io/cenyi/lifesimgrid:latest
docker compose up -d   # oder Container neu starten
```

**Option B: Aus dem Quellcode erstellen**

```bash
# Docker-Image erstellen
docker build -t lifesimgrid .

# Container ausführen
docker run -d -p 8080:80 lifesimgrid
```

Öffnen Sie [http://localhost:8080](http://localhost:8080) in Ihrem Browser.

**Docker Compose** (optional):

```yaml
services:
  lifesimgrid:
    image: ghcr.io/cenyi/lifesimgrid:latest
    # Oder aus dem Quellcode erstellen: build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

```bash
# Mit Docker Compose starten
docker compose up -d
```

> **Hinweis**: Das Docker-Image verwendet nginx, um dasselbe statische `out/`-Verzeichnis bereitzustellen. Dies hat keinen Einfluss auf die Cloudflare Pages-Bereitstellung — beide Methoden stellen identische statische Dateien bereit.

### 🤝 Mitwirken

Wir freuen uns über Community-Beiträge! So können Sie helfen:

1. Repository **forken**
2. Branch erstellen: `git checkout -b feature/amazing-feature`
3. Committen: `git commit -m 'Add amazing feature'`
4. Pushen: `git push origin feature/amazing-feature`
5. **Pull Request** erstellen

#### Mitwirkungsmöglichkeiten

- 🌐 **Übersetzungen** — Übersetzungen in `src/locales/` hinzufügen oder verbessern
- 🐛 **Fehlerberichte** — unter [GitHub Issues](https://github.com/cenyi/LifeSimGrid/issues) melden
- 🎨 **UI/UX** — Barrierefreiheit, mobiles Responsive Design oder visuelles Design verbessern
- 📖 **Dokumentation** — Tippfehler korrigieren, Leitfäden hinzufügen, README verbessern
- 🧪 **Tests** — Unit- oder Integrationstests hinzufügen

#### Übersetzungsrichtlinien

Jede Locale-Datei (`src/locales/*.json`) muss genau dieselben Schlüssel wie `en.json` haben. Beim Hinzufügen neuer Schlüssel:

1. Schlüssel zuerst zu `en.json` hinzufügen
2. Schlüssel zu allen anderen Locale-Dateien hinzufügen
3. Natürliche, muttersprachliche Ausdrücke verwenden — keine maschinellen Übersetzungen
4. Next-intl-Rich-Text-Tags wie `<pixel>`, `<qr>`, `<voice>` unverändert lassen
5. Emoji-Präfixe, Fachbegriffe und Markennamen unverändert lassen

### 🔒 Datenschutz und Urheberrecht

*   **100% lokale Browser-Berechnung** : Dieses Open-Source-Repository arbeitet nach einem strengen Null-Backend-, Null-Datenbank-Paradigma. Jedes hochgeladene Asset zur Rasterquantisierung und jeder dekodierte Mii-FFL-Binärpuffer-Bytestrom wird in Echtzeit ausschließlich im Speicher Ihres lokalen Geräts kompiliert und verarbeitet. Es werden niemals Tracking-Daten oder persönliche Inhalte in einer externen Cloud-Infrastruktur zwischengespeichert, protokolliert oder übertragen.
*   **Nominativer Fair Use und Technische Neutralität** : Dieses Repository stellt eine vollständig unabhängige Drittanbieter-Open-Source-Entwicklungspraxis dar. Es ist ausschließlich dafür konzipiert, den Nutzen moderner Frontend-APIs (wie HTML5 Canvas und native Web Audio) für Textur-Nachzeichnung und strukturierte Byte-Daten-Rekonstruktion zu demonstrieren.
*   **Markenrechtliche Klarstellung** : LifeSimGrid hat absolute null kommerzielle Zugehörigkeit, betriebliche Partnerschaft, offizielle Autorisierung oder Sponsoring-Befürwortung mit Nintendo Co., Ltd. oder irgendeinem Spielkonsolenhersteller, Softwareentwickler und Verlag. Titel wie »Animal Crossing«, »Tomodachi Life« und »Mii« sind eingetragene Marken ihrer jeweiligen Urheberrechtsinhaber, die hier streng unter nominativem Fair Use ausschließlich für Plattformkompatibilitäts- und Technologische Identifikationszwecke referenziert werden. Alle technischen Vergleiche mit Legacy-Web-Tools wie »Living the Grid« sind rein als educational Sandkasten-Alternativ-Demonstration positioniert.

### 📜 Lizenz

MIT License — siehe [LICENSE](LICENSE) Datei für Details.

### ⚖️ Rechtlicher Haftungsausschluss

LifeSimGrid steht als eine vollständig unabhängige, inoffizielle Drittanbieter-Community-Fan-Dienstprogramm-Suite und eine fortschrittliche Web-Alternative zu Legacy-Toolsets. Dieses Projekt ist nicht verbunden mit, autorisiert von, gesponsert oder befürwortet durch Konsolenhersteller, Softwareentwickler oder Spielverlage. Alle universellen Mii-FFL-Binärspezifikationen, Zeichenformat-Protokolle und Rasterspezifikationen, die in diesem Repository erwähnt werden, sind das alleinige Eigentum ihrer jeweiligen Markeninhaber, die hier streng unter nominativem Fair Use für technologische Identifikations- und Kompatibilitätszwecke referenziert werden.

### 🛡️ Sicherheitsrichtlinie

Wir sind zutiefst zur Datensicherheit und zum lokalen Datenschutz-Erst-Sandkasten verpflichtet. Wenn Sie eine potenzielle Sicherheitslücke, eine Protokoll-Analyse-Anomalie oder eine Datenfluss-Ausnahme in diesem Toolkit entdecken, öffnen Sie bitte **kein** öffentliches GitHub-Issue.

Melden Sie es stattdessen verantwortungsvoll per E-Mail an **hi@lifesimgrid.org**. Unsere Kern-Engineering-Freiwilligen nehmen alle technischen Sicherheitsberichte ernst und werden innerhalb von 48 Stunden untersuchen und antworten.

### 📋 Roadmap

- [ ] **PWA-Unterstützung** : Vollständige Progressive-Web-App-Fähigkeit, die 100% Offline-Funktionalität über benutzerdefiniertes Service-Worker-Caching bietet.
- [ ] **Dunkelmodus-Umschaltung** : Flüssige, systemadaptive Dunkelthema-Implementierung unter Nutzung von Tailwind CSS atomarem Styling.
- [ ] **Erweiterte Internationalisierung** : Zusätzliche i18n-Locale-Integrationen, die `pt-BR`, `ru`, `th` und `vi` abdecken.
- [ ] **Pixel-Studio-Upgrade** : Unterstützung für benutzerdefinierte Pixelraster-Leinwandgrößen über Standard-Asset-Spezifikationen hinaus.
- [ ] **Sprach-Lab-Visualisierung** : Live-HTML5-Canvas-Wellenform-Audiovisualisierung, die Echtzeit-Web-Audio-API-Frequenzausgaben spiegelt.
- [ ] **Barrierefreiheitsoptimierung** : Umfassende Struktur-Auditierung, die streng den WCAG 2.1 AA internationalen Webstandards entspricht.

---

## Italiano

### 🎯 Cos'è LifeSimGrid?

**LifeSimGrid** è uno **strumento non ufficiale avanzato per pattern di Animal Crossing** e un **editor di codici QR Mii** open-source e basato sul web. Funziona come la **alternativa definitiva e 100% serverless a Living the Grid** per i moderni giochi di simulazione di vita.

Come toolkit web gratuito e basato sul browser, tutta l'analisi crittografica binaria, il campionamento HTML5 Canvas e la sintesi audio chiptune avvengono interamente lato client. Ciò garantisce una privacy dei dati assoluta al 100% e prestazioni locali fulminee — nessun server cloud, nessuna registrazione account e nessun tracciamento database richiesto.

### ✨ Cinque Studi Dedicati

#### 🎨 Studio Pixel (Strumento per Pattern Custom Design di Animal Crossing)
*   **Griglia Canvas Multi-Rapporto**: Si adatta perfettamente alle specifiche avanzate di disegno texture nei **giochi di simulazione sociale sandbox**. Supporta nativamente i rapporti di aspetto Quadrato 1:1 (pattern standard), Rettangolare 2:3 (ritratti da cavalletto, copertine album) e Panoramico 16:9 (carta da parati personalizzata per pareti interne) per il ritaglio.
*   **Campionamento Pennello Multi-Densità**: Offre quattro livelli distinti di densità pixel per corrispondere alle dimensioni delle griglie delle console vintage — 256×256 (1px ultra-fine), 85×85 (3px, layout standard piastrella Pro Design), 64×64 (4px canvas semplificata) e 32×32 (7px piastrella design classica).
*   **Filtri Immagine Pre-Elaborazione**: Dispone di slider di configurazione luminosità e contrasto regolabili in tempo reale per eliminare significativamente le distorsioni cromatiche fangose durante il downscaling di grafiche anime complesse o grafiche di gioco.
*   **Evidenziazione Dipinti-per-Numeri**: Clicca su uno dei 24 campioni di colore quantizzati per isolare ed evidenziare istantaneamente gli indici della griglia pixel corrispondenti sulla canvas con bordi tratteggiati per un tracciamento manuale senza sforzo sulla tua console portatile.

#### 🔓 Configuratore QR (Editor di Codici QR Mii & Sblocco Permessi Protocollo FFL)
*   **Sblocco Permessi Batch Parallelo**: Supporta il trascinamento e rilascio simultaneo di più immagini di codici QR Mii. Implementa flussi asincroni frontend ad alte prestazioni tramite `Promise.all` per rimuovere i flag di checksum "copia non consentita" e "condivisione/modifica limitata" incorporati nel formato ufficiale del protocollo binario Mii FFL.
*   **Rinomina Crittografica Online**: Permette la modifica immediata e sicura dei nomi dei personaggi direttamente nella sandbox del browser web. Il motore frontend sovrascrive automaticamente i segmenti di byte esadecimali e corregge istantaneamente il checksum di verifica binaria.
*   **Imballaggio ZIP Lato Client Locale**: Sfrutta `JSZip` per raggruppare i tuoi asset di codici QR completamente decrittografati e modificati direttamente nella memoria del browser come singolo pacchetto di esportazione `.zip` — eliminando la seccatura di salvare i file uno per uno.

#### 🔮 Lab Vocale e Relazioni (Calcolatore di Compatibilità Tomodachi Life)
*   **Sintesi Simulazione Vocale 8-Bit**: Impiega un'architettura Web Audio API di basso livello (onda dente di sega + nodi filtro passa-basso) per sintetizzare e visualizzare in anteprima il parlato robotico elettronico nostalgico dei chip sonori delle console portatili retro. Permette la personalizzazione completa dei parametri nativi di intonazione vocale (Hz) e velocità del parlato.
*   **Classifica Relazioni Isola Tomodachi**: Presenta un tracker di gestione automatizzata completamente locale. Basato sui classici 12 segni zodiacali astrologici e sui 16 gruppi di personalità comportamentale principali del gioco (es. Lupo Solitario Indipendente, Leader Sicuro di Sé, Capo Estroverso), gli utenti possono costruire una lista personalizzata dell'isola fino a 15 residenti (archiviati in modo sicuro tramite `localStorage`).
*   **Calcolo Incrociato del Destino Automatizzato**: Il motore matematico calcola istantaneamente gli accoppiamenti incrociati sull'intera lista, generando la classifica di compatibilità definitiva della tua isola — evidenziando i Top 3 Migliori Anime Gemelle (massima armonia romantica/d'amicizia) contro i Top 3 Peggiori Corrispondenze (più probabili di scontrarsi con drammi virtuali).

#### 🧠 Mappatura MBTI (Tomodachi Life MBTI Mappatura delle 16 personalità e Calcolatore di compatibilità)
*   **Mappatura completa delle 16 MBTI**: Tutti i 16 tipi di personalità MBTI sono mappati ai gruppi di personalità di Tomodachi Life, inclusa la mappatura duale INFP (Sweet/Softie).
*   **Calcolatore di compatibilità**: Layout a 5 schede (Calcolatore di compatibilità, Grafico della personalità, Strumento vocale, Mappa dei fan, Elenco dei personaggi), sezione How It Works, FAQ con dati strutturati BreadcrumbList/HowTo.
*   **Dichiarazione di trasparenza dell'algoritmo**: Componenti della formula dichiarati esplicitamente——Base Score (25) + Personality (25) + Zodiac (25) + Friendship (25), tracciabilità dei risultati garantita.

#### 🔲 Studio Griglia di Pixel (Convertitore Universale di Griglia di Pixel)
*   **Conversione Griglia Universale**: Converte qualsiasi immagine in motivi di griglia di pixel per cross-stitch, Perler beads, pixel art di Minecraft e design personalizzati di Tomodachi Life.
*   **Dimensioni Griglia Flessibili e Corrispondenza Colori Intelligente**: Offre 5 dimensioni di griglia (16×16 a 128×128) con corrispondenza colori Euclidean distance ed error-diffusion dithering per risultati precisi.
*   **Guida alla Conversione di Foto e Layout Ottimizzato per la Stampa**: Guida passo-passo per trasformare foto in pixel art. Supporta la stampa nativa del browser (Ctrl+P) con nascondimento automatico dei pannelli di controllo, generando un blueprint cartaceo numerato ideale per crafting offline.
*   **100% Lato Client**: Tutta l'elaborazione delle immagini viene eseguita nel tuo browser tramite HTML5 Canvas API. Nessun upload, nessun database.

### 🔒 Architettura Privacy-First

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     Sandbox del Tuo Browser Client                          │
│                                                                             │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌─────────────────┐  │
│  │      HTML5 Canvas     │  │     jsQR + qrcode     │  │  Web Audio API  │  │
│  │  (Animal Crossing     │  │ (Codec QR Crittogr.   │  │ (Sintesi Proced.│  │
│  │ Pixelator Pattern)    │  │  Buffer Mii FFL)      │  │  Mii Tomodachi) │  │
│  └──────────┬────────────┘  └───────────┬───────────┘  └────────┬────────┘  │
│             │                           │                       │           │
│             └───────────────────────────┼───────────────────────┘           │
│                                         ▼                                   │
│                            localStorage & IndexedDB del Browser             │
│                    (100% Alternativa Serverless a Living the Grid)           │
└─────────────────────────────────────────────────────────────────────────────┘
          ✕ Nessun backend cloud     ✕ Nessun tracciamento database     ✕ Zero caricamenti dati
```

- **Architettura 100% Lato Client** — Zero server cloud, zero tracciamento database backend e assolutamente zero caricamenti dati in uscita. Un'alternativa web completamente sicura alle piattaforme legacy come Living the Grid.
- **Esecuzione Sandbox Locale** — Tutta la pixelazione delle immagini personalizzate, l'analisi crittografica del buffer binario Mii FFL e la sintesi vocale chiptune vengono eseguite rigorosamente all'interno del tuo browser.
- **Flusso Dati Privacy-First** — La lista dei residenti dell'isola Tomodachi e le impostazioni vengono salvate esclusivamente in `localStorage` e `IndexedDB` del browser locale — i dati della tua isola non lasciano mai il tuo dispositivo fisico.
- **100% Gratuito e Open-Source** — Flussi di dati completamente trasparenti e codice sorgente auditable pubblicato su GitHub sotto la licenza permissiva MIT.

### 📸 Screenshot

> *Prossimamente — PR con screenshot benvenuti!*

### 🌍 Lingue supportate (10)

`en` · `zh-Hant` · `ja` · `es` · `fr` · `ko` · `de` · `it` · `nl` · `zh-CN`

### 🛠️ Stack Tecnologico e Architettura

| Categoria | Tecnologia ad Alte Prestazioni e Implementazione |
|-----------|-----------|
| **Framework** | Next.js 16 (App Router Framework) + TypeScript (Type Safety Rigorosa) |
| **Styling** | Tailwind CSS (Styling atomico utility-first) |
| **Localizzazione i18n**| `next-intl` v4 (`localePrefix: "as-needed"` per indicizzazione multilingua ottimizzata per i motori di ricerca) |
| **Matrice Codec QR**  | `jsQR` (Estrazione matrice binaria Mii locale) + `qrcode` (Codifica Byte Mode compatibile Mii Versione 3) |
| **Archivio Client**  | `JSZip` (Compilazione d'archivio parallela ad alte prestazioni lato browser e generazione ZIP multi-file locale) |
| **Motore Audio** | Web Audio API Nativa (Sintesi procedurale onda dente di sega/quadrata `OscillatorNode` di basso livello + `BiquadFilterNode`) |
| **Pipeline Imaging** | API HTML5 Canvas (`imageSmoothingEnabled: false` forzato per rendering griglia pixel nitido nearest-neighbor) |
| **Distribuzione** | Ottimizzazione Export Statico (SSG) → Scalato globalmente sulla rete CDN edge globale Cloudflare Pages |

### 🚀 Per iniziare

#### Prerequisiti

- **Node.js** ≥ 18.17
- **npm** ≥ 9

#### Installazione

```bash
# Clona il repository
git clone https://github.com/cenyi/LifeSimGrid.git
cd LifeSimGrid

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel tuo browser.

#### Build di produzione

```bash
# Genera l'export statico
npm run build

# Anteprima locale del build
npx serve out
```

### 📁 Struttura del progetto

```
src/
├── app/                    # Pagine Next.js App Router
│   ├── [locale]/           # Routing i18n per locale (10 lingue)
│   │   ├── page.tsx        # Homepage (SSG)
│   │   ├── about/          # Pagina Chi siamo
│   │   ├── contact/        # Pagina Contatti
│   │   ├── privacy/        # Informativa sulla privacy
│   │   ├── terms/          # Termini di servizio
│   │   ├── acnh-pixel-studio/    # Sottopagina ACNH Custom Designs
│   │   ├── mii-qr-unlocker/     # Sottopagina Mii QR Code
│   │   ├── tomodachi-voice-lab/ # Sottopagina Tomodachi Voice
│   │   ├── tomodachi-life-mbti/ # Sottopagina Tomodachi Life MBTI
│   │   └── pixel-grid-studio/   # Sottopagina Pixel Grid Studio
│   ├── acnh-pixel-studio/  # Sottopagina EN livello root
│   ├── mii-qr-unlocker/   # Sottopagina EN livello root
│   ├── tomodachi-voice-lab/ # Sottopagina EN livello root
│   ├── tomodachi-life-mbti/ # Sottopagina EN livello root
│   ├── pixel-grid-studio/  # Sottopagina EN livello root
│   ├── layout.tsx          # Layout root + metadataBase
│   └── globals.css         # Stili globali + CSS collegamento ancora
├── components/             # Componenti React
│   ├── HomePageContent.tsx # Cambio schede e navigazione hash
│   ├── AcnhPixelStudioPage.tsx  # Componente sottopagina ACNH
│   ├── MiiQrUnlockerPage.tsx    # Componente sottopagina Mii QR
│   ├── TomodachiVoiceLabPage.tsx # Componente sottopagina Voice Lab
│   ├── TomodachiLifeMbtiPage.tsx # Componente sottopagina MBTI
│   ├── PixelGridStudioPage.tsx  # Componente sottopagina Pixel Grid
│   ├── AboutPage.tsx       # Componente pagina Chi siamo
│   ├── ContactPage.tsx     # Componente pagina Contatti
│   ├── PrivacyPage.tsx     # Componente pagina Privacy
│   ├── TermsPage.tsx       # Componente pagina Termini
│   ├── PixelStudio.tsx     # Convertitore griglia pixel
│   ├── AvatarEditor.tsx    # Configuratore QR avatar
│   ├── VoiceLab.tsx        # Sintesi vocale e lab relazioni
│   ├── SEOSection.tsx      # Guida, FAQ e JSON-LD
│   ├── HistoryPanel.tsx    # Pannello cronologia (aside + aria-live)
│   ├── EnRedirect.tsx      # Gestore reindirizzamento locale EN
│   ├── Navbar.tsx          # Navigazione e selettore lingua
│   └── Footer.tsx          # Footer e dichiarazione di non responsabilità
├── i18n/                   # Configurazione next-intl
│   ├── routing.ts          # Configurazione routing per locale
│   └── request.ts          # Configurazione i18n lato server
├── lib/                    # Logica principale
│   ├── compatibility.ts    # Algoritmi zodiacali e di personalità
│   ├── qr-handler.ts       # Logica di decodifica/codifica QR
│   └── history-db.ts       # Database cronologia（wrapper IndexedDB）
└── locales/                # File di traduzione (10 lingue)
    ├── en.json             # Inglese (Americano)
    ├── zh-Hant.json        # Cinese tradizionale
    ├── ja.json             # Giapponese
    ├── es.json             # Spagnolo
    ├── fr.json             # Francese
    ├── ko.json             # Coreano
    ├── de.json             # Tedesco
    ├── it.json             # Italiano
    ├── nl.json             # Olandese
    └── zh-CN.json          # Cinese semplificato
```

### 🚢 Distribuzione

Questo progetto utilizza l'export statico di Next.js (`output: 'export'`), compatibile con qualsiasi provider di hosting statico.

#### Cloudflare Pages

1. Fai Fork o pusha questo repo su GitHub
2. Vai alla [Dashboard Cloudflare](https://dash.cloudflare.com/) → Pages → Crea un progetto
3. Connetti il tuo repository GitHub
4. Configura le impostazioni di build:
   - **Comando di build**: `npm run build`
   - **Directory di output del build**: `out`
5. Distribuisci — fatto!

> **Nota**: Non sono necessarie variabili d'ambiente. L'intera app è 100% statica.

#### Docker

Questo progetto include un `Dockerfile` multi-fase che costruisce l'export statico e lo serve tramite nginx.

**Opzione A: Estrarre l'immagine pre-costruita da GHCR (consigliato)**

```bash
# Estrarre l'immagine più recente
docker pull ghcr.io/cenyi/lifesimgrid:latest

# Eseguire il contenitore
docker run -d -p 8080:80 ghcr.io/cenyi/lifesimgrid:latest
```

Per aggiornare all'ultima versione:

```bash
docker pull ghcr.io/cenyi/lifesimgrid:latest
docker compose up -d   # o riavvia il contenitore
```

**Opzione B: Costruire dal codice sorgente**

```bash
# Costruire l'immagine Docker
docker build -t lifesimgrid .

# Eseguire il contenitore
docker run -d -p 8080:80 lifesimgrid
```

Apri [http://localhost:8080](http://localhost:8080) nel tuo browser.

**Docker Compose** (opzionale):

```yaml
services:
  lifesimgrid:
    image: ghcr.io/cenyi/lifesimgrid:latest
    # O costruire dal codice sorgente: build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

```bash
# Avviare con Docker Compose
docker compose up -d
```

> **Nota**: L'immagine Docker usa nginx per servire la stessa directory statica `out/`. Ciò non influisce sulla distribuzione Cloudflare Pages — entrambi i metodi servono file statici identici.

### 🤝 Contribuire

Amiamo i contributi della community! Ecco come puoi aiutare:

1. Fai **Fork** del repository
2. Crea un branch: `git checkout -b feature/amazing-feature`
3. Committa: `git commit -m 'Add amazing feature'`
4. Fai push: `git push origin feature/amazing-feature`
5. Apri una **Pull Request**

#### Modi per contribuire

- 🌐 **Traduzioni** — Aggiungi o migliora traduzioni in `src/locales/`
- 🐛 **Segnalazioni bug** — Segnala su [GitHub Issues](https://github.com/cenyi/LifeSimGrid/issues)
- 🎨 **UI/UX** — Migliora accessibilità, design responsive o design visivo
- 📖 **Documentazione** — Correggi refusi, aggiungi guide, migliora il README
- 🧪 **Test** — Aggiungi test unitari o di integrazione

#### Linee guida per la traduzione

Ogni file di locale (`src/locales/*.json`) deve avere esattamente le stesse chiavi di `en.json`. Quando aggiungi nuove chiavi:

1. Aggiungi la chiave a `en.json` per prima
2. Aggiungi la chiave a tutti gli altri file di locale
3. Usa espressioni naturali e native — non traduzioni automatiche
4. Mantieni i tag di testo ricco next-intl come `<pixel>`, `<qr>`, `<voice>` così come sono
5. Mantieni i prefissi emoji, i termini tecnici e i nomi dei marchi così come sono

### 🔒 Informativa Privacy e Copyright

*   **100% Elaborazione Locale nel Browser**: Questo repository open-source opera secondo un rigoroso paradigma zero-backend, zero-database. Ogni asset caricato per la quantizzazione su griglia e ogni flusso di byte buffer binario Mii FFL decodificato viene compilato ed elaborato in tempo reale esclusivamente nella memoria del dispositivo locale. Nessun dato di tracciamento o contenuto personale viene mai memorizzato nella cache, registrato o trasmesso a qualsiasi infrastruttura cloud esterna.
*   **Fair Use Nominativo e Neutralità Tecnica**: Questo repository rappresenta una pratica di sviluppo open-source di terze parti completamente indipendente. È progettato esclusivamente per dimostrare l'utilità delle API frontend moderne (come HTML5 Canvas e Web Audio nativa) per il tracciamento di texture e la ricostruzione di dati strutturati di byte.
*   **Chiarimento sui Marchi**: LifeSimGrid non ha assolutamente alcuna affiliazione commerciale, partnership operativa, autorizzazione ufficiale o endorsement di sponsorizzazione con Nintendo Co., Ltd., o qualsiasi produttore di console di gioco, sviluppatore di software ed editore. Titoli come "Animal Crossing", "Tomodachi Life" e "Mii" sono marchi registrati dei rispettivi titolari del copyright, qui referenziati strettamente sotto fair use nominativo esclusivamente per scopi di compatibilità della piattaforma e identificazione tecnologica. Tutti i confronti tecnici con strumenti web legacy come "Living the Grid" sono posizionati puramente come dimostrazione alternativa di sandbox educativa.

### 📜 Licenza

MIT License — vedi file [LICENSE](LICENSE) per i dettagli.

### ⚖️ Disclaimer Legale

LifeSimGrid si configura come una suite di utilità per fan della community di terze parti interamente indipendente e non ufficiale e un'alternativa web avanzata ai set di strumenti legacy. Questo progetto non è affiliato, autorizzato, sponsorizzato o endorsement da alcun produttore di console, sviluppatore di software o editore di giochi. Tutte le specifiche binarie universali Mii FFL, i protocolli di formato personaggio e le specifiche di griglia menzionate nel repository sono di esclusiva proprietà dei rispettivi titolari dei marchi, qui referenziati strettamente sotto fair use nominativo per scopi di identificazione tecnologica e compatibilità.

### 🛡️ Politica di Sicurezza

Siamo profondamente impegnati nella sicurezza dei dati e nel sandboxing locale privacy-first. Se scopri qualsiasi potenziale vulnerabilità di sicurezza, anomalia nell'analisi dei protocolli o eccezione nel flusso dei dati all'interno di questo toolkit, **non** aprire un issue GitHub pubblico.

Segnalalo invece in modo responsabile via e-mail a **hi@lifesimgrid.org**. I nostri volontari di ingegneria principale prendono tutti i rapporti di sicurezza tecnica sul serio e indagheranno rispondendo entro 48 ore.

### 📋 Roadmap del Progetto

- [ ] **Supporto PWA**: Funzionalità completa Progressive Web App che offre funzionalità offline al 100% tramite caching Service Worker personalizzato.
- [ ] **Attivazione Modalità Scura**: Implementazione fluida del tema scuro adattivo al sistema utilizzando lo styling atomico Tailwind CSS.
- [ ] **Localizzazione Espansa**: Integrazioni i18n locali aggiuntive che coprono `pt-BR`, `ru`, `th` e `vi`.
- [ ] **Aggiornamento Studio Pixel**: Supporto per dimensioni canvas griglia pixel personalizzate definite dall'utente oltre le specifiche standard degli asset.
- [ ] **Visualizzazione Lab Vocale**: Visualizzazione audio forma d'onda HTML5 Canvas dal vivo che rispecchia le uscite di frequenza Web Audio API in tempo reale.
- [ ] **Ottimizzazione Accessibilità**: Audit strutturale completo conforme rigorosamente agli standard web internazionali WCAG 2.1 AA.

---

## Nederlands

### 🎯 Wat is LifeSimGrid?

**LifeSimGrid** is een geavanceerd **onofficieel Animal Crossing-patroonhulpmiddel** en een open-source, webgebaseerde **Mii QR-code-editor**. Het dient als het ultieme 100% serverloze **alternatief voor Living the Grid** voor moderne levenssimulatiegames.

Als een gratis, op de browser gebaseerde web-toolkit vinden alle binaire cryptografische parsing, HTML5 Canvas-sampling en chiptune-audiosynthese volledig aan de clientzijde plaats. Dit garandeert absolute 100% gegevensprivacy en bliksemsnelle lokale prestaties — geen cloudservers, geen accountregistraties en geen database-tracking vereist.

### ✨ Vijf Toegewijde Studio's

#### 🎨 Pixelstudio (Animal Crossing Custom Design Patroonhulpmiddel)
*   **Multi-Verhouding Raster Canvas**: Past zich perfect aan bij de geavanceerde textuurtekenpecificaties in **sandbox-socialsimulatiegames**. Het ondersteunt native Vierkant 1:1 (standaardpatronen), Rechthoekig 2:3 (ezelpoortretten, albumhoezen) en Breedbeeld 16:9 (grootschalige aangepaste binnenmuur-behang) uitsnijdbeeldverhoudingen.
*   **Multi-Dichtheid Kwast Sampling**: Biedt vier verschillende pixeldichtheidsniveaus om overeen te komen met vintage console rasterformaten — 256×256 (1px ultra-fijn), 85×85 (3px, standaard Pro Design tegelindeling), 64×64 (4px vereenvoudigd canvas) en 32×32 (7px klassiek ontwerp tegel).
*   **Pre-Verwerking Beeldfilters**: Beschikt over ingebouwde realtime aanpasbare helderheids- en contrastconfiguratieschuifregelaars om modderige kleurvervormingen aanzienlijk te elimineren bij het verkleinen van complexe anime-kunst of gamegraphics.
*   **Schilder-op-Nummers Markering**: Klik op een van de 24 gekwantiseerde kleurmonsters om direct overeenkomende pixelrasterindexen op het canvas te isoleren en te markeren met stippellijnen voor moeiteloos handmatig traceren op uw draagbare console.

#### 🔓 QR-configurator (Mii QR-code Editor & FFL-protocol Machtigingsontgrendelaar)
*   **Parallelle Batch Machtigingsontgrendeling**: Ondersteunt het gelijktijdig slepen en neerzetten van meerdere Mii QR-codeafbeeldingen. Implementeert hoogpresterende frontend asynchrone streams via `Promise.all` om de "kopiëren niet toegestaan" en "delen/bewerken beperkt" checksum-vlaggen te verwijderen die zijn ingebed in het officiële Mii FFL binaire protocolformaat.
*   **Online Cryptografische Hernoeming**: Maakt onmiddellijke, veilige wijziging van personagenamen direct in de webbrowser-sandbox mogelijk. De frontend-engine overschrijft automatisch hexadecimale byte-segmenten en herstelt de binaire verificatie-checksum onmiddellijk.
*   **Lokale Client-Zijde ZIP-verpakking**: Maakt gebruik van `JSZip` om uw volledig gedecodeerde en gewijzigde QR-code-assets direct in het browsergeheugen te bundelen als een enkel `.zip`-exportpakket — de gedoe van het één voor één opslaan van bestanden eliminerend.

#### 🔮 Stem- & Relatielab (Tomodachi Life Compatibiliteitscalculator)
*   **8-Bit Stemsimulatie Synth**: Maakt gebruik van low-level Web Audio API-architectuur (zaagtandgolf + laagdoorlaatfilter-knooppunten) om de nostalgische, elektronische robotische spraak van retro draagbare geluidschips te synthetiseren en voor te beluisteren. Het maakt volledige aanpassing mogelijk van native stemtoonhoogte (Hz) en spraaksnelheidsparameters.
*   **Tomodachi Eiland Relatie Ranglijst**: Beschikt over een volledig lokale geautomatiseerde beheertracker. Gebaseerd op de klassieke 12 astrologische dierenriemtekens en de 16 belangrijkste gedragspersoonlijkheidsgroepen van het spel (bijv. Onafhankelijke Eenling, Zelfverzekerde Doener, Uitgaande Leider), kunnen gebruikers een aangepaste eilandlijst van maximaal 15 bewoners opbouwen (veilig opgeslagen via `localStorage`).
*   **Geautomatiseerde Lotskruisberekening**: De wiskundige engine berekent onmiddellijk kruisparing over uw hele lijst, en levert de definitieve compatibiliteitsranglijst van uw eiland — waarbij de Top 3 Beste Zielsverwanten (hoogste romantische/vriendschapsharmonie) worden uitgelicht tegen de Top 3 Slechtste Overeenkomsten (hoogstwaarschijnlijk botsen met virtueel drama).

#### 🧠 MBTI-Persoonlijkheidstoewijzing (Tomodachi Life MBTI 16-persoonlijkheidsmapping & Compatibiliteitscalculator)
*   **Volledige MBTI-16-toewijzing**: Alle 16 MBTI-persoonlijkheidstypen worden toegewezen aan Tomodachi Life-persoonlijkheidsgroepen, inclusief INFP-dual-mapping (Sweet/Softie).
*   **Compatibiliteitscalculator**: 5-tab-layout (Compatibiliteitscalculator, Persoonlijkheidsdiagram, Voice-tool, Fan-map, Personagelijst), How It Works-sectie, FAQ met BreadcrumbList/HowTo gestructureerde gegevens.
*   **Algoritme-transparantieverklaring**: Formulecomponenten expliciet verklaard——Base Score (25) + Personality (25) + Zodiac (25) + Friendship (25), resultaattraceerbaarheid gewaarborgd.

#### 🔲 Pixel Grid Studio (Universele Pixel Grid Converter)
*   **Universele Pixel Grid Conversie**: Converteert elke afbeelding naar pixel grid patronen voor cross-stitch, Perler beads, Minecraft pixel art en Tomodachi Life custom designs.
*   **Flexibele Grid-formaten & Intelligente Kleurmatching**: Biedt 5 grid-formaten (16×16 tot 128×128) met Euclidean distance kleurmatching en error-diffusion dithering voor nauwkeurige resultaten.
*   **Fotoconversie-gids & Printgeoptimaliseerde Layout**: Stapsgewijze gids voor het transformeren van foto's naar pixel art. Ondersteunt native browserprinting (Ctrl+P) met automatische verberging van bedieningspanelen, wat een schoon, genummerd papier grid-blueprint oplevert ideaal voor offline crafting.
*   **100% Client-Zijde**: Alle beeldverwerking wordt uitgevoerd in uw browser via HTML5 Canvas API. Geen uploads, geen databases.

### 🔒 Privacy-First Architectuur

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Uw Client Browser Sandbox                            │
│                                                                             │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌─────────────────┐  │
│  │      HTML5 Canvas     │  │     jsQR + qrcode     │  │  Web Audio API  │  │
│  │  (Animal Crossing     │  │ (Mii FFL Cryptogr.    │  │ (Tomodachi Mii  │  │
│  │  Patroon Pixelator)   │  │  Buffer QR-codec)     │  │ Procedurele     │  │
│  │                       │  │                       │  │  Synth)         │  │
│  └──────────┬────────────┘  └───────────┬───────────┘  └────────┬────────┘  │
│             │                           │                       │           │
│             └───────────────────────────┼───────────────────────┘           │
│                                         ▼                                   │
│                         Browser localStorage & IndexedDB                    │
│                  (100% Living the Grid Serverloos Alternatief)              │
└─────────────────────────────────────────────────────────────────────────────┘
          ✕ Geen cloud-backend     ✕ Geen database-tracking     ✕ Zero gegevensuploads
```

- **100% Client-Zijde Architectuur** — Zero cloudservers, zero backend-database-tracking en absoluut zero uitgaande gegevensuploads. Een volledig veilig webalternatief voor legacy-platforms zoals Living the Grid.
- **Lokale Sandbox-uitvoering** — Alle aangepaste beeldpixelatie, Mii FFL binaire cryptografische bufferparsing en chiptune-spraaksynthese worden strikt binnen uw browser uitgevoerd.
- **Privacy-First Gegevensstroom** — Uw Tomodachi eilandbewonerslijst en instellingen worden uitsluitend opgeslagen in lokale browser `localStorage` en `IndexedDB` — de gegevens van uw eiland verlaten nooit uw fysieke apparaat.
- **100% Gratis en Open-Source** — Volledig transparante gegevensstromen en auditeerbare broncode gepubliceerd op GitHub onder de permissieve MIT-licentie.

### 📸 Schermafbeeldingen

> *Binnenkort — PR's met schermafbeeldingen welkom!*

### 🌍 Ondersteunde talen (10)

`en` · `zh-Hant` · `ja` · `es` · `fr` · `ko` · `de` · `it` · `nl` · `zh-CN`

### 🛠️ Tech-stack en Architectuur

| Categorie | Hoge-Prestaties Technologie en Implementatie |
|-----------|------------|
| **Framework** | Next.js 16 (App Router Framework) + TypeScript (Strikte Typeveiligheid) |
| **Styling** | Tailwind CSS (Utility-first atomair stylen) |
| **i18n-localisatie**| `next-intl` v4 (`localePrefix: "as-needed"` voor geoptimaliseerde zoekmachine meertalige indexering) |
| **QR-codec Matrix**  | `jsQR` (Lokale Mii binaire matrixextractie) + `qrcode` (Versie 3 Mii-compatibele Byte Mode-codering) |
| **Cliëntarchief**  | `JSZip` (Hoogpresterende parallelle browser-side archiefcompilatie en lokale multi-file ZIP-generatie) |
| **Audiomotor** | Native Web Audio API (Low-level `OscillatorNode` zaagtand/vierkante golf procedurele synthese + `BiquadFilterNode`) |
| **Beeldverwerkingspipeline** | HTML5 Canvas API (`imageSmoothingEnabled: false` geforceerd voor nearest-neighbor scherp pixelraster-rendering) |
| **Implementatie** | Statische Export Optimalisatie (SSG) → Wereldwijd geschaald op Cloudflare Pages wereldwijd edge CDN-netwerk |

### 🚀 Aan de slag

#### Vereisten

- **Node.js** ≥ 18.17
- **npm** ≥ 9

#### Installatie

```bash
# Repository klonen
git clone https://github.com/cenyi/LifeSimGrid.git
cd LifeSimGrid

# Afhankelijkheden installeren
npm install

# Ontwikkelingsserver starten
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in uw browser.

#### Productie-build

```bash
# Statische export genereren
npm run build

# Build lokaal voorvertonen
npx serve out
```

### 📁 Projectstructuur

```
src/
├── app/                    # Next.js App Router pagina's
│   ├── [locale]/           # i18n locale-routing (10 talen)
│   │   ├── page.tsx        # Homepage (SSG)
│   │   ├── about/          # Over-pagina
│   │   ├── contact/        # Contactpagina
│   │   ├── privacy/        # Privacybeleid
│   │   ├── terms/          # Gebruiksvoorwaarden
│   │   ├── acnh-pixel-studio/    # ACNH Custom Designs subpagina
│   │   ├── mii-qr-unlocker/     # Mii QR Code subpagina
│   │   ├── tomodachi-voice-lab/ # Tomodachi Voice subpagina
│   │   ├── tomodachi-life-mbti/ # Tomodachi Life MBTI subpagina
│   │   └── pixel-grid-studio/   # Pixel Grid Studio subpagina
│   ├── acnh-pixel-studio/  # Root-niveau EN subpagina
│   ├── mii-qr-unlocker/   # Root-niveau EN subpagina
│   ├── tomodachi-voice-lab/ # Root-niveau EN subpagina
│   ├── tomodachi-life-mbti/ # Root-niveau EN subpagina
│   ├── pixel-grid-studio/  # Root-niveau EN subpagina
│   ├── layout.tsx          # Root-layout + metadataBase
│   └── globals.css         # Globale stijlen + ankerlink CSS
├── components/             # React componenten
│   ├── HomePageContent.tsx # Tab-wissel en hash-navigatie
│   ├── AcnhPixelStudioPage.tsx  # ACNH subpagina-component
│   ├── MiiQrUnlockerPage.tsx    # Mii QR subpagina-component
│   ├── TomodachiVoiceLabPage.tsx # Voice Lab subpagina-component
│   ├── TomodachiLifeMbtiPage.tsx # MBTI subpagina-component
│   ├── PixelGridStudioPage.tsx  # Pixel Grid subpagina-component
│   ├── AboutPage.tsx       # Over-pagina component
│   ├── ContactPage.tsx     # Contactpagina component
│   ├── PrivacyPage.tsx     # Privacy-pagina component
│   ├── TermsPage.tsx       # Voorwaarden-pagina component
│   ├── PixelStudio.tsx     # Pixelgrid-converter
│   ├── AvatarEditor.tsx    # Avatar QR-configurator
│   ├── VoiceLab.tsx        # Spraaksynthese & relatie-lab
│   ├── SEOSection.tsx      # Gids, FAQ & JSON-LD
│   ├── HistoryPanel.tsx    # Geschiedenispaneel (aside + aria-live)
│   ├── EnRedirect.tsx      # EN locale-redirect-handler
│   ├── Navbar.tsx          # Navigatie & taalwisselaar
│   └── Footer.tsx          # Footer & vrijwaringsclausule
├── i18n/                   # next-intl configuratie
│   ├── routing.ts          # Locale-routing configuratie
│   └── request.ts          # Server-side i18n setup
├── lib/                    # Kernlogica
│   ├── compatibility.ts    # Dierenriem & persoonlijkheidsalgoritmen
│   ├── qr-handler.ts       # QR decodeer/encodeer logica
│   └── history-db.ts       # Geschiedenisdatabase（IndexedDB-wrapper）
└── locales/                # Vertaalbestanden (10 talen)
    ├── en.json             # Engels (Amerikaans)
    ├── zh-Hant.json        # Traditioneel Chinees
    ├── ja.json             # Japans
    ├── es.json             # Spaans
    ├── fr.json             # Frans
    ├── ko.json             # Koreaans
    ├── de.json             # Duits
    ├── it.json             # Italiaans
    ├── nl.json             # Nederlands
    └── zh-CN.json          # Vereenvoudigd Chinees
```

### 🚢 Implementatie

Dit project gebruikt de statische Next.js-export (`output: 'export'`) en is compatibel met elke statische hostingprovider.

#### Cloudflare Pages

1. Fork of push deze repo naar GitHub
2. Ga naar het [Cloudflare-dashboard](https://dash.cloudflare.com/) → Pages → Maak een project
3. Verbind uw GitHub-repository
4. Configureer de build-instellingen:
   - **Build-commando**: `npm run build`
   - **Build-uitvoermap**: `out`
5. Implementeer — klaar!

> **Let op**: Er zijn geen omgevingsvariabelen nodig. De hele app is 100% statisch.

#### Docker

Dit project bevat een meerfasig `Dockerfile` dat de statische export bouwt en via nginx aanbiedt.

**Optie A: Vooraf gebouwde image van GHCR ophalen (aanbevolen)**

```bash
# Meest recente image ophalen
docker pull ghcr.io/cenyi/lifesimgrid:latest

# Container uitvoeren
docker run -d -p 8080:80 ghcr.io/cenyi/lifesimgrid:latest
```

Bijwerken naar de nieuwste versie:

```bash
docker pull ghcr.io/cenyi/lifesimgrid:latest
docker compose up -d   # of start uw container opnieuw
```

**Optie B: Bouwen vanuit broncode**

```bash
# Docker-image bouwen
docker build -t lifesimgrid .

# Container uitvoeren
docker run -d -p 8080:80 lifesimgrid
```

Open [http://localhost:8080](http://localhost:8080) in uw browser.

**Docker Compose** (optioneel):

```yaml
services:
  lifesimgrid:
    image: ghcr.io/cenyi/lifesimgrid:latest
    # Of bouwen vanuit broncode: build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

```bash
# Starten met Docker Compose
docker compose up -d
```

> **Let op**: De Docker-image gebruikt nginx om dezelfde statische `out/`-map aan te bieden. Dit heeft geen invloed op de Cloudflare Pages-implementatie — beide methoden bieden identieke statische bestanden aan.

### 🤝 Bijdragen

We houden van community-bijdragen! Hier is hoe u kunt helpen:

1. **Fork** de repository
2. Maak een branch: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open een **Pull Request**

#### Manieren om bij te dragen

- 🌐 **Vertalingen** — Voeg vertalingen toe of verbeter ze in `src/locales/`
- 🐛 **Bugrapporten** — Meld op [GitHub Issues](https://github.com/cenyi/LifeSimGrid/issues)
- 🎨 **UI/UX** — Verbeter toegankelijkheid, mobiel responsive design of visueel design
- 📖 **Documentatie** — Corrigeer typefouten, voeg handleidingen toe, verbeter de README
- 🧪 **Tests** — Voeg unit- of integratietests toe

#### Vertaalrichtlijnen

Elk locale-bestand (`src/locales/*.json`) moet exact dezelfde sleutels hebben als `en.json`. Bij het toevoegen van nieuwe sleutels:

1. Voeg de sleutel eerst toe aan `en.json`
2. Voeg de sleutel toe aan alle andere locale-bestanden
3. Gebruik natuurlijke, moedertaaluitdrukkingen — geen machinale vertalingen
4. Behoud next-intl rich-text tags zoals `<pixel>`, `<qr>`, `<voice>` ongewijzigd
5. Behoud emoji-voorvoegsels, technische termen en merknamen ongewijzigd

### 🔒 Privacy en Auteursrecht Disclaimer

*   **100% Lokale Browserberekening**: Deze open-source repository opereert volgens een strikt zero-backend, zero-database paradigma. Elk geüpload asset voor rasterkwantificering en elke gedecodeerde Mii FFL binaire buffer bytestroom wordt gecompileerd en verwerkt in realtime uitsluitend binnen het geheugen van uw lokale apparaat. Er worden nooit trackinggegevens of persoonlijke inhoud gecached, gelogd of verzonden naar enige externe cloudinfrastructuur.
*   **Nominatief Fair Use en Technische Neutraliteit**: Deze repository vertegenwoordigt een volledig onafhankelijke derde-partij open-source ontwikkelingspraktijk. Het is uitsluitend ontworpen om het nut van moderne frontend-API's (zoals HTML5 Canvas en native Web Audio) aan te tonen voor textuurtracering en gestructureerde bytedatareconstructie.
*   **Handelsmerkverduidelijking**: LifeSimGrid heeft absoluut geen commerciële affiliatie, operationele partnerschap, officiële autorisatie of sponsor-endorsement met Nintendo Co., Ltd., of enige consolefabrikant, softwareontwikkelaar en uitgever. Titels zoals "Animal Crossing", "Tomodachi Life" en "Mii" zijn geregistreerde handelsmerken van hun respectieve auteursrechthouders, hier uitsluitend refererend onder nominatief fair use voor platformcompatibiliteit en technologische identificatiedoeleinden. Alle technische vergelijkingen met legacy webtools zoals "Living the Grid" zijn puur gepositioneerd als een educatieve sandbox-alternatiefdemonstratie.

### 📜 Licentie

MIT License — zie [LICENSE](LICENSE) bestand voor details.

### ⚖️ Juridische Disclaimer

LifeSimGrid staat als een volledig onafhankelijke, onofficiële derde-partij community fan-utiliteitssuite en een geavanceerd webalternatief voor legacy toolsets. Dit project is niet gelieerd aan, geautoriseerd door, gesponsord door of goedgekeurd door enige consolefabrikant, softwareontwikkelaar of game-uitgever. Alle universele Mii FFL binaire specificaties, personageformaatprotocollen en rasterspecificaties die in de repository worden genoemd zijn de uitsluitende eigendommen van hun respectieve handelsmerkhouders, hier uitsluitend refererend onder nominatief fair use voor technologische identificatie en compatibiliteitsdoeleinden.

### 🛡️ Beveiligingsbeleid

Wij zijn diepg toegewijd aan gegevensbeveiliging en lokale privacy-first sandboxing. Als u een potentiële beveiligingskwetsbaarheid, protocol-parsing anomalie of gegevensstroomuitzondering ontdekt binnen deze toolkit, open dan **geen** openbaar GitHub-issue.

Rapporteer het in plaats daarvan verantwoord via e-mail naar **hi@lifesimgrid.org**. Onze kern-engineering vrijwilligers nemen alle technische beveiligingsrapporten serieus en zullen onderzoeken en reageren binnen 48 uur.

### 📋 Projectroutekaart

- [ ] **PWA-ondersteuning**: Volledige Progressive Web App-mogelijkheid die 100% offline functionaliteit biedt via aangepaste Service Worker-caching.
- [ ] **Donkermodus-schakelaar**: Vloeiende, systeem-adaptieve donkerthemaimplementatie gebruikmakend van Tailwind CSS atomair stylen.
- [ ] **Uitgebreide Localisatie**: Aanvullende i18n locale-integraties die `pt-BR`, `ru`, `th` en `vi` dekken.
- [ ] **Pixelstudio-upgrade**: Ondersteuning voor aangepaste door de gebruiker gedefinieerde pixelraster canvasformaten buiten standaard assetspecificaties.
- [ ] **Stemlab Visualisatie**: Live HTML5 Canvas golfvorm-audiovisualisatie die realtime Web Audio API frequentie-uitvoeren weerspiegelt.
- [ ] **Toegankelijkheidsoptimalisatie**: Uitgebreid structureel audit strikt voldoend aan WCAG 2.1 AA internationale webstandaarden.

---

## 简体中文

### 🎯 LifeSimGrid 是什么？

**LifeSimGrid** 是一款高级的**非官方 Animal Crossing 图案工具**，同时也是一个开源、基于网页的 **Mii QR code 编辑器**。它作为现代生活模拟游戏的终极 100% 无服务器 **Living the Grid 替代方案**。

作为一款免费的浏览器网页工具套件，所有二进制密码学解析、HTML5 Canvas 采样与芯片音频合成均在客户端完整执行。这确保了绝对 100% 的数据隐私与闪电般的本地性能——无需云服务器、无需账号注册、无需数据库追踪。

### ✨ 五大核心工作室

#### 🎨 像素工作室（Animal Crossing 自定义设计图案工具）
*   **多比例网格画布**：完美适配**沙盒社交模拟游戏**中的高级纹理绘图规范。原生支持正方形 1:1（标准图案）、长方形 2:3（画架肖像、专辑封面）与宽屏 16:9（大面积自定义室内墙壁壁纸）裁切比例。
*   **多密度笔刷采样**：提供四种不同的像素密度等级以匹配复古主机网格尺寸——256×256（1px 超精细）、85×85（3px，标准 Pro Design 瓷砖布局）、64×64（4px 简化画布）与 32×32（7px 经典设计瓷砖）。
*   **预处理影像滤镜**：内置实时可调式亮度与对比度配置滑块，大幅消除缩小复杂动漫艺术或游戏图形时的浑浊色彩失真。
*   **数字填色高亮**：点击 24 种量化色板中的任何一色，即可在画布上即时隔离并高亮显示对应的像素网格索引（以虚线边框标示），让你在掌上主机上轻松手动临摹。

#### 🔓 QR 配置修改器（Mii QR Code 编辑器与 FFL 协议权限解锁器）
*   **并行批量权限解锁**：支持同时拖放多张 Mii QR code 图片。通过 `Promise.all` 实现高性能前端异步流，一键解除官方 Mii FFL 二进制协议格式中嵌入的「禁止复制」与「限制分享/编辑」校验标志。
*   **线上密码学改名**：允许在浏览器沙盒中直接、安全地修改角色名称。前端引擎自动覆写十六进制字节段并即时修正二进制验证校验码。
*   **本地客户端 ZIP 封装**：运用 `JSZip` 在浏览器内存中直接将完全解密与修改后的 QR code 资产打包为单一 `.zip` 包导出——免除逐一保存文件的繁琐操作。

#### 🔮 语音与关系实验室（Tomodachi Life 兼容性计算器）
*   **8-Bit 语音模拟合成器**：采用底层 Web Audio API 架构（锯齿波 + 低通滤波器节点）来合成与预览复古掌机音效芯片的怀旧电子机器人语音。支持原生音高（Hz）与语速参数的完全自定义。
*   **Tomodachi 岛屿关系天梯榜**：具备完全本地自动化管理追踪器。基于游戏经典的 12 星座与 16 种核心行为性格群组（例如：独行侠、自信行动派、外向领导者），用户可建立最多 15 位居民的自定义岛屿名册（通过 `localStorage` 安全存储）。
*   **自动命定交叉演算**：数学引擎即时计算整个名册的交叉配对，输出你的岛屿网格终极兼容性天梯榜——标示 Top 3 最佳灵魂伴侣（最高浪漫/友谊和谐度）对比 Top 3 最差配对（最可能产生虚拟戏剧冲突）。

#### 🧠 MBTI 人格对应工具（Tomodachi Life MBTI 16 人格映射与兼容性计算器）
*   **16 种 MBTI 人格完整映射**：将 MBTI 16 种人格类型完整对应至 Tomodachi Life 游戏中的性格分组，包含 INFP 双映射（Sweet/Softie）的特殊处理。
*   **兼容性计算器**：5 个标签页式布局（兼容性计算器、人格图表、语音工具、粉丝地图、角色名册），搭配 How It Works 说明区块与 FAQ，支持 BreadcrumbList/HowTo 结构化数据。
*   **算法透明声明**：明确标示公式组成——Base Score (25) + Personality (25) + Zodiac (25) + Friendship (25)，确保结果可追溯。

#### 🔲 像素网格工作室（通用像素网格转换器）
*   **通用像素网格转换**：将任何图像转换为像素网格图案，支持十字绣（cross-stitch）、Perler beads 拼豆、Minecraft 像素艺术与 Tomodachi Life 自定义设计模板。
*   **弹性网格尺寸与智能色彩匹配**：提供 5 种网格尺寸（16×16 至 128×128），采用 Euclidean distance 色彩匹配算法搭配 error-diffusion dithering，即使使用 32 色复古调色盘也能产出准确结果。
*   **照片转换指南与打印优化布局**：提供逐步照片转像素艺术指南。支持原生浏览器打印（Ctrl+P），自动隐藏控制面板，输出干净的编号纸本网格蓝图，完美适配十字绣临摹与离线手工创作。
*   **100% 客户端架构**：所有图像处理均通过 HTML5 Canvas API 在你的浏览器内执行，无需上传，无数据库追踪。

### 🔒 隐私优先架构

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          你的客户端浏览器沙盒                                │
│                                                                             │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌─────────────────┐  │
│  │      HTML5 Canvas     │  │     jsQR + qrcode     │  │  Web Audio API  │  │
│  │  (Animal Crossing     │  │ (Mii FFL 密码学       │  │ (Tomodachi Mii  │  │
│  │   图案像素化器)        │  │   缓冲区 QR 编解码)    │  │ 程序化合成器)    │  │
│  └──────────┬────────────┘  └───────────┬───────────┘  └────────┬────────┘  │
│             │                           │                       │           │
│             └───────────────────────────┼───────────────────────┘           │
│                                         ▼                                   │
│                            浏览器 localStorage 与 IndexedDB                 │
│                       （100% Living the Grid 无服务器替代方案）               │
└─────────────────────────────────────────────────────────────────────────────┘
          ✕ 无云后端     ✕ 无数据库追踪     ✕ 零数据上传
```

- **100% 客户端架构**——零云服务器、零后端数据库追踪、绝对零对外数据上传。相较于 Living the Grid 等传统平台的完全安全网页替代方案。
- **本地沙盒执行**——所有自定义图像像素化、Mii FFL 二进制密码学缓冲区解析与芯片音频合成均严格在你的浏览器内执行。
- **隐私优先数据流**——你的 Tomodachi 岛屿居民名册与设置仅提交至本地浏览器 `localStorage` 与 `IndexedDB`——你的岛屿数据绝不离开你的实体设备。
- **100% 免费开源**——完全透明的数据流与可审计的源代码，以宽松的 MIT License 发布于 GitHub。

### 📸 截图

> *即将推出——欢迎提交截图 PR！*

### 🌍 支持语言（10 种）

`en` · `zh-Hant` · `ja` · `es` · `fr` · `ko` · `de` · `it` · `nl` · `zh-CN`

### 🛠️ 技术栈与架构


| 类别 | 高性能技术与实现 |
|------|-----------|
| **框架** | Next.js 16（App Router 框架）+ TypeScript（严格类型安全） |
| **样式** | Tailwind CSS（Utility-first 原子化样式） |
| **i18n 国际化**| `next-intl` v4（`localePrefix: "as-needed"` 优化搜索引擎多语言索引） |
| **QR 编解码矩阵**  | `jsQR`（本地 Mii 二进制矩阵提取）+ `qrcode`（Version 3 Mii 兼容 Byte Mode 编码） |
| **客户端归档**  | `JSZip`（高性能并行浏览器端归档编译与本地多文件 ZIP 生成） |
| **音频引擎** | 原生 Web Audio API（底层 `OscillatorNode` 锯齿/方波程序化合成 + `BiquadFilterNode`） |
| **影像管线** | HTML5 Canvas API（`imageSmoothingEnabled: false` 强制最近邻插值锐利像素网格渲染） |
| **部署** | 静态导出优化（SSG）→ Cloudflare Pages 全球边缘 CDN 网络扩展 |

### 🚀 快速开始

#### 前置条件

- **Node.js** ≥ 18.17
- **npm** ≥ 9

#### 安装

```bash
# 克隆仓库
git clone https://github.com/cenyi/LifeSimGrid.git
cd LifeSimGrid

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000)。

#### 生产构建

```bash
# 生成静态导出
npm run build

# 本地预览构建结果
npx serve out
```

### 📁 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── [locale]/           # 国际化语言路由（10 种语言）
│   │   ├── page.tsx        # 首页（SSG）
│   │   ├── about/          # 关于页面
│   │   ├── contact/        # 联系页面
│   │   ├── privacy/        # 隐私政策
│   │   ├── terms/          # 服务条款
│   │   ├── acnh-pixel-studio/    # ACNH 自定义设计子页面
│   │   ├── mii-qr-unlocker/     # Mii QR Code 子页面
│   │   ├── tomodachi-voice-lab/ # Tomodachi Voice 子页面
│   │   ├── tomodachi-life-mbti/ # Tomodachi Life MBTI 子页面
│   │   └── pixel-grid-studio/   # Pixel Grid Studio 子页面
│   ├── acnh-pixel-studio/  # 根层级 EN 子页面
│   ├── mii-qr-unlocker/   # 根层级 EN 子页面
│   ├── tomodachi-voice-lab/ # 根层级 EN 子页面
│   ├── tomodachi-life-mbti/ # 根层级 EN 子页面
│   ├── pixel-grid-studio/  # 根层级 EN 子页面
│   ├── layout.tsx          # 根布局 + metadataBase
│   └── globals.css         # 全局样式 + 锚点链接 CSS
├── components/             # React 组件
│   ├── HomePageContent.tsx # 标签页切换与 hash 导航
│   ├── AcnhPixelStudioPage.tsx  # ACNH 子页面组件
│   ├── MiiQrUnlockerPage.tsx    # Mii QR 子页面组件
│   ├── TomodachiVoiceLabPage.tsx # Voice Lab 子页面组件
│   ├── TomodachiLifeMbtiPage.tsx # MBTI 子页面组件
│   ├── PixelGridStudioPage.tsx  # Pixel Grid 子页面组件
│   ├── AboutPage.tsx       # 关于页面组件
│   ├── ContactPage.tsx     # 联系页面组件
│   ├── PrivacyPage.tsx     # 隐私政策页面组件
│   ├── TermsPage.tsx       # 服务条款页面组件
│   ├── PixelStudio.tsx     # 像素网格转换器
│   ├── AvatarEditor.tsx    # 角色 QR 配置修改器
│   ├── VoiceLab.tsx        # 语音合成与关系排行榜
│   ├── SEOSection.tsx      # 指南、FAQ 与 JSON-LD
│   ├── HistoryPanel.tsx    # 历史面板 (aside + aria-live)
│   ├── EnRedirect.tsx      # EN 语言重定向处理器
│   ├── Navbar.tsx          # 导航栏与语言切换器
│   └── Footer.tsx          # 页脚与免责声明
├── i18n/                   # next-intl 配置
│   ├── routing.ts          # 语言路由配置
│   └── request.ts          # 服务器端国际化设置
├── lib/                    # 核心逻辑
│   ├── compatibility.ts    # 星座与性格算法
│   ├── qr-handler.ts       # QR 解码/编码逻辑
│   └── history-db.ts       # 历史数据库（IndexedDB 封装）
└── locales/                # 翻译文件（10 种语言）
    ├── en.json             # 英文（美式）
    ├── zh-Hant.json        # 繁体中文
    ├── ja.json             # 日文
    ├── es.json             # 西班牙文
    ├── fr.json             # 法文
    ├── ko.json             # 韩文
    ├── de.json             # 德文
    ├── it.json             # 意大利文
    ├── nl.json             # 荷兰文
    └── zh-CN.json          # 简体中文
```

### 🚢 部署

本项目使用 Next.js 静态导出（`output: 'export'`），可部署至任何静态托管服务。

#### Cloudflare Pages

1. Fork 或推送本仓库至 GitHub
2. 前往 [Cloudflare 仪表板](https://dash.cloudflare.com/) → Pages → 创建项目
3. 连接你的 GitHub 仓库
4. 配置构建参数：
   - **构建命令**：`npm run build`
   - **构建输出目录**：`out`
5. 部署——完成！

> **注意**：无需配置环境变量。整个应用为 100% 静态。

#### Docker

本项目包含多阶段 `Dockerfile`，可构建静态导出并通过 nginx 提供服务。

**方式 A：从 GHCR 拉取预构建镜像（推荐）**

```bash
# 拉取最新镜像
docker pull ghcr.io/cenyi/lifesimgrid:latest

# 运行容器
docker run -d -p 8080:80 ghcr.io/cenyi/lifesimgrid:latest
```

更新至最新版本：

```bash
docker pull ghcr.io/cenyi/lifesimgrid:latest
docker compose up -d   # 或重启容器
```

**方式 B：从源码构建**

```bash
# 构建 Docker 镜像
docker build -t lifesimgrid .

# 运行容器
docker run -d -p 8080:80 lifesimgrid
```

在浏览器中打开 [http://localhost:8080](http://localhost:8080)。

**Docker Compose**（可选）：

```yaml
services:
  lifesimgrid:
    image: ghcr.io/cenyi/lifesimgrid:latest
    # 或从源码构建：build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

```bash
# 使用 Docker Compose 启动
docker compose up -d
```

> **注意**：Docker 镜像使用 nginx 来提供相同的静态 `out/` 目录。这不会影响 Cloudflare Pages 部署——两种方式提供完全相同的静态文件。

### 🔒 隐私与版权安全声明

*   **100% 浏览器本地运算**：本开源项目运作于严格的零后端、零数据库范式。每张上传以进行网格量化的资产与每个解码的 Mii FFL 二进制缓冲区字节流，均在你的本地设备内存中即时编译与处理。绝无任何跟踪数据或个人内容被缓存、记录或传输至任何外部云端基础设施。
*   **指示性合理使用与技术中立**：本项目为完全独立的第三方开源开发实践。其设计目的仅为展示现代前端 API（如 HTML5 Canvas 与原生 Web Audio）在纹理临摹与结构化字节数据重建方面的应用。
*   **商标声明**：LifeSimGrid 与 Nintendo Co., Ltd. 或任何游戏主机制造商、软件开发商及发行商绝对零商业关联、运营合作、官方授权或赞助背书。「Animal Crossing」、「Tomodachi Life」与「Mii」等名称为其各自版权持有者的注册商标，在此仅基于指示性合理使用，用于平台兼容性与技术识别目的。所有对「Living the Grid」等传统网页工具的技术比较，纯粹定位为教育沙盒替代方案示范。

### 🤝 参与贡献

我们欢迎社区贡献！以下是参与方式：

1. **Fork** 本仓库
2. **创建**功能分支：`git checkout -b feature/amazing-feature`
3. **提交**变更：`git commit -m 'Add amazing feature'`
4. **推送**分支：`git push origin feature/amazing-feature`
5. **发起** Pull Request

#### 贡献方式

- 🌐 **翻译**——在 `src/locales/` 中新增或改进翻译
- 🐛 **问题反馈**——至 [GitHub Issues](https://github.com/cenyi/LifeSimGrid/issues) 提交问题
- 🎨 **UI/UX**——改善无障碍性、移动端响应式设计或视觉设计
- 📖 **文档**——修正错字、新增指南、改进 README
- 🧪 **测试**——新增单元测试或集成测试

#### 翻译指南

每个语言文件（`src/locales/*.json`）必须与 `en.json` 拥有完全相同的键值。新增键值时：

1. 先将键值新增至 `en.json`
2. 将键值新增至所有其他语言文件
3. 使用自然、地道的表达方式——而非机器翻译
4. 保留 `<pixel>`、`<qr>`、`<voice>` 等 next-intl 富文本标签不变
5. 保留表情符号前缀、技术术语与品牌名称不变

### 📜 授权条款

本项目采用 **MIT License** 授权——详见 [LICENSE](LICENSE) 文件。

### ⚖️ 免责声明

LifeSimGrid 为完全独立的非官方第三方社群粉丝工具套件，以及传统工具集的高级网页替代方案。本项目不隶属于、未经授权、未受赞助或认可于任何主机制造商、软件开发商或游戏发行商。本仓库中提及的所有通用 Mii FFL 二进制规范、角色格式协议与网格规格，均为其各自商标持有者的专有财产，在此仅基于指示性合理使用，用于技术识别与兼容性目的。

### 🛡️ 安全政策

我们深切致力于数据安全与本地隐私优先沙盒执行。如果您在本工具套件中发现任何潜在的安全漏洞、协议解析异常或数据流例外，请**不要**开启公开的 GitHub Issue。

请改为通过电子邮件负责任地报告至 **hi@lifesimgrid.org**。我们的核心工程志愿团队严肃对待所有技术安全报告，并将在 48 小时内调查与响应。

### 📋 项目路线图

- [ ] **PWA 支持**：完整的 Progressive Web App 功能，通过自定义 Service Worker 缓存提供 100% 离线运行能力。
- [ ] **深色模式切换**：流畅的系统自适应深色主题实现，运用 Tailwind CSS 原子化样式。
- [ ] **扩展国际化**：新增 `pt-BR`、`ru`、`th` 与 `vi` 等 i18n 语言集成。
- [ ] **像素工作室升级**：支持超越标准资产规范的自定义用户定义像素网格画布尺寸。
- [ ] **语音实验室可视化**：实时 HTML5 Canvas 波形音频可视化，镜像实时 Web Audio API 频率输出。
- [ ] **无障碍优化**：严格遵循 WCAG 2.1 AA 国际网页标准的全面结构审计。

---

<div align="center">

**© 2026 LifeSimGrid. Made with ❤️ by fans, for fans.**

[🏠 Website](https://lifesimgrid.org) · [🐙 GitHub](https://github.com/cenyi/LifeSimGrid) · [🐛 Issues](https://github.com/cenyi/LifeSimGrid/issues) · [📧 Contact](mailto:hi@lifesimgrid.org)

</div>
