<div align="center">

# 🏝️ LifeSimGrid

**Custom Avatar Grid & Life Sim Studio**

*An open-source, 100% serverless web utility suite designed for lifestyle and social simulation enthusiasts.*

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![100% Client-Side](https://img.shields.io/badge/Privacy-100%25_Client--Side-brightgreen)]()
[![Languages](https://img.shields.io/badge/i18n-10_Languages-blueviolet)]()

🌐 **English** | [繁體中文](#繁體中文) | [日本語](#日本語) | [Español](#español) | [Français](#français) | [한국어](#한국어) | [Deutsch](#deutsch) | [Italiano](#italiano) | [Nederlands](#nederlands) | [简体中文](#简体中文)

**[🔗 Live Demo](https://lifesimgrid.org)** · **[🐛 Report Bug](https://github.com/cenyi/LifeSimGrid/issues)** · **[✨ Request Feature](https://github.com/cenyi/LifeSimGrid/issues)**

</div>

---

## English

### 🎯 What is LifeSimGrid?

**LifeSimGrid** is an **auxiliary tool designed for island life simulation games**, and also a **customization tool compatible with life simulation games**. It's a free, open-source, 100% client-side web toolkit — all data parsing and image processing happen locally in your browser, ensuring both maximum performance and 100% privacy.

### 📸 Screenshots

> *Coming soon — PRs with screenshots welcome!*

### ✨ Three Core Studios

#### 🎨 Pixel Studio
*   **Multi-Ratio Grid Support**: Perfectly adapts to the creative drawing specs in **social simulation games** — natively supports Square (256×256), Rectangular (book/album covers), and Widescreen (interior walls/wallpaper) crop ratios.
*   **Multi-Density Brush Sampling**: Four grid density options — 256×256 (1px), 85×85 (3px, HD recommended), 64×64 (4px), and 32×32 (7px).
*   **Pre-Processing Image Filters**: Built-in adjustable brightness and contrast axes to significantly reduce color distortion when downscaling complex images.
*   **Paint-by-Numbers Highlight**: Click any color swatch to instantly highlight matching grid indices on the canvas for easy manual tracing.

#### 🔓 QR Configurator
*   **Batch Permission Unlock**: Supports batch drag-and-drop of multiple avatar binary QR code images. One-click force removal of "anti-copy" and "non-editable" restriction flags (FFL protocol format) using async streams on the frontend.
*   **Online Safe Rename**: Allows direct correction of resident names on the web — the system automatically recalculates and fixes the binary checksum on the frontend.
*   **Pure Frontend ZIP Packaging**: After batch processing, package results directly in the browser as a `.zip` archive for export — no need to download files one by one.

#### 🔮 Voice & Relationship Lab
*   **8-Bit Voice Simulation**: Uses Web Audio API (sawtooth wave + 1200Hz lowpass filter) to locally simulate retro handheld hardware's electronic robot voice, with freely adjustable pitch and speed.
*   **Multi-Resident Relationship Leaderboard**: Based on universal 12 zodiac signs and 16 core personality traits, build a resident roster locally (localStorage), auto cross-calculate and output the island's destiny compatibility leaderboard (best soulmates vs. most friction).

### 🔒 Privacy-First Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Your Browser                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │  Canvas   │  │  jsQR +  │  │  Web Audio API   │  │
│  │  API      │  │  qrcode  │  │  (Oscillator +   │  │
│  │(Pixelate) │  │(QR Codec)│  │   BiquadFilter)  │  │
│  └──────────┘  └──────────┘  └──────────────────┘  │
│         │             │               │              │
│         └─────────────┼───────────────┘              │
│                       ▼                              │
│              localStorage only                       │
│           (Zero server storage)                      │
└─────────────────────────────────────────────────────┘
         ✕ No backend   ✕ No database   ✕ No uploads
```

- **100% client-side** — no backend servers, no databases, no data uploads
- All image processing, binary decoding, and audio synthesis happen locally
- Resident roster saved in `localStorage` only — never leaves your device
- Open-source code — fully auditable on GitHub

### 🌍 Supported Languages (10)

`en` · `zh-Hant` · `ja` · `es` · `fr` · `ko` · `de` · `it` · `nl` · `zh-CN`

### 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| i18n | next-intl v4 (`localePrefix: "as-needed"`) |
| QR Codec | jsQR (decode) + qrcode (Byte Mode encode) |
| Archive | JSZip (client-side ZIP generation) |
| Audio | Web Audio API (OscillatorNode + BiquadFilter) |
| Imaging | Canvas API (`imageSmoothingEnabled: false`) |
| Deployment | Static export → Cloudflare Pages |

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
│   │   └── terms/          # Terms of service
│   ├── layout.tsx          # Root layout + metadataBase
│   └── globals.css         # Global styles + anchor link CSS
├── components/             # React components
│   ├── HomePageContent.tsx # Tab switching & hash navigation
│   ├── PixelStudio.tsx     # Pixel grid converter
│   ├── AvatarEditor.tsx    # Avatar QR configurator
│   ├── VoiceLab.tsx        # Voice synth & relationship lab
│   ├── SEOSection.tsx      # Guide, FAQ & JSON-LD
│   ├── Navbar.tsx          # Navigation with language switcher
│   └── Footer.tsx          # Footer with disclaimer
├── i18n/                   # next-intl configuration
│   ├── routing.ts          # Locale routing config
│   └── request.ts          # Server-side i18n setup
├── lib/                    # Core logic
│   ├── compatibility.ts    # Zodiac & personality algorithms
│   └── qr-handler.ts       # QR decode/encode logic
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
4. Keep `<pixel>`, `<qr>`, `<voice>` next-intl rich text tags as-is
5. Keep emoji prefixes, technical terms, and brand names as-is

### 🔒 Privacy & Copyright Disclaimer

*   **100% Browser-Local Computation**: This project has no backend servers or databases. Every image uploaded and every binary byte stream decoded is processed in real-time within the local device's memory — never uploaded to the cloud.
*   **Neutral Technical Research**: This project is a fully independent third-party open-source technical practice, aimed at providing tracing and data stream reconstruction convenience using modern web technologies. This site has no commercial affiliation, authorization, or endorsement relationship with any console maker, game developer, or publisher.

### 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

### ⚖️ Legal Disclaimer

This is an independent third-party fan tool. Not affiliated with, authorized, or endorsed by any console maker or game developer. All avatar format protocols and grid specs are properties of their respective owners.

### 🛡️ Security

If you discover a security vulnerability, please **do not** open a public issue. Instead, email us at **hi@lifesimgrid.org**. We take all security reports seriously and will respond within 48 hours.

### 📋 Roadmap

- [ ] PWA support (offline mode with Service Worker)
- [ ] Dark mode toggle
- [ ] Additional locale support (pt-BR, ru, th, vi)
- [ ] Pixel Studio: custom grid sizes
- [ ] Voice Lab: waveform visualization
- [ ] Accessibility audit (WCAG 2.1 AA)

---

## 繁體中文

### 🎯 LifeSimGrid 是什麼？

**LifeSimGrid** 是一款**為島嶼生活模擬遊戲設計的輔助工具**，同時也是一個**兼容生活模擬遊戲的自定義工具**。本專案採用純前端技術架構，所有數據解析與圖像處理均在用戶本地瀏覽器完成，兼顧極致效能與 100% 隱私安全。

### ✨ 三大核心工作室

#### 🎨 像素工作室
*   **多規格網格支援**：完美適配**社交模擬類遊戲**中的創意繪圖規範，原生支援正方形（256×256）、長方形（書本/唱片封面）與寬螢幕（室內牆壁/壁紙）等多種裁剪比例。
*   **多密度筆刷採樣**：提供 256×256 (1px)、85×85 (3px 高清推薦)、64×64 (4px) 與 32×32 (7px) 四種網格密度切換。
*   **前處理影像濾鏡**：內建可調式亮度與對比度軸，大幅減少複雜原圖縮小後的色彩失真。
*   **數字填色高亮**：點擊通用色盤色塊，即可在網頁畫布上即時高亮對應的網格編號，方便手動臨摹。

#### 🔓 數據配置修改器
*   **批量權限解鎖**：支援多張角色二進位 QR Code 圖片的批量拖放上傳。在前端利用異步流，一鍵強制解除「防拷貝」與「不可編輯」的限制旗標（FFL 協議格式）。
*   **線上安全改名**：允許在網頁端直接修正居民名稱，系統會自動在前端重新計算並修正二進位校驗碼（Checksum）。
*   **純前端 ZIP 封裝**：批量處理完成後，直接在瀏覽器端打包成 `.zip` 壓縮檔導出，免去逐一下載的繁瑣操作。

#### 🔮 居民語音合成與關係天梯榜
*   **8-Bit 聲線模擬**：使用 Web Audio API（鋸齒波與 1200Hz 低通濾波器）在本地端模擬復古掌機硬體的電子機器假音，支援音高與語速的自由調校。
*   **多居民關係天梯榜**：基於通用的十二星座與 16 種核心性格特質，在本地（LocalStorage）建立居民名冊，自動交叉演算並輸出全島的命定相容性天梯榜（最恩愛伴侶 vs 最多摩擦冤家）。

### 🔒 隱私優先架構

- **100% 純前端**——無後端伺服器、無資料庫、零數據上傳
- 所有圖片處理、二進位解碼與語音合成均在本地完成
- 居民名冊僅存於 `localStorage`——從不離開你的裝置
- 開源程式碼——可在 GitHub 完整審計

### 📸 截圖

> *即將推出——歡迎提交截圖 PR！*

### 🌍 支援語言（10 種）

`en` · `zh-Hant` · `ja` · `es` · `fr` · `ko` · `de` · `it` · `nl` · `zh-CN`

### 🛠️ 技術棧

| 類別 | 技術 |
|------|------|
| 框架 | Next.js 16 (App Router) + TypeScript |
| 樣式 | Tailwind CSS |
| 國際化 | next-intl v4（`localePrefix: "as-needed"`） |
| QR 編解碼 | jsQR（解碼）+ qrcode（Byte Mode 編碼） |
| 封裝 | JSZip（客戶端 ZIP 生成） |
| 音訊 | Web Audio API（OscillatorNode + BiquadFilter） |
| 影像 | Canvas API（`imageSmoothingEnabled: false`） |
| 部署 | 靜態匯出 → Cloudflare Pages |

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
│   │   └── terms/          # 服務條款
│   ├── layout.tsx          # 根佈局 + metadataBase
│   └── globals.css         # 全域樣式 + 錨點連結 CSS
├── components/             # React 元件
│   ├── HomePageContent.tsx # 分頁切換與 hash 導航
│   ├── PixelStudio.tsx     # 像素網格轉換器
│   ├── AvatarEditor.tsx    # 角色 QR 設定修改器
│   ├── VoiceLab.tsx        # 語音合成與關係天梯榜
│   ├── SEOSection.tsx      # 指南、FAQ 與 JSON-LD
│   ├── Navbar.tsx          # 導航列與語言切換器
│   └── Footer.tsx          # 頁尾與免責聲明
├── i18n/                   # next-intl 設定
│   ├── routing.ts          # 語言路由設定
│   └── request.ts          # 伺服器端國際化設定
├── lib/                    # 核心邏輯
│   ├── compatibility.ts    # 星座與性格演算法
│   └── qr-handler.ts       # QR 解碼/編碼邏輯
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

*   **100% 瀏覽器本地運算**：本專案不設有任何後端伺服器或資料庫。玩家上傳的每一張圖片、解碼的每一個二進位字節流，均在本地設備的記憶體內即時處理，絕不上傳雲端。
*   **中立技術研究**：本專案為完全獨立的第三方開源技術實踐，旨在利用現代網頁技術提供臨摹與數據流重構便利。本站與任何遊戲主機製造商、官方遊戲開發商或出版商無任何商業關聯、授權或代言關係。

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

本站為獨立第三方粉絲工具，與任何遊戲主機製造商或遊戲開發商無任何商業關聯、授權或代言關係。所有虛擬化身數據格式與網格規格均屬於其各自版權所有者。

### 🛡️ 安全

如果您發現安全漏洞，請**不要**公開提交 Issue。請發送電子郵件至 **hi@lifesimgrid.org**。我們會嚴肅對待所有安全回報，並在 48 小時內回覆。

### 📋 路線圖

- [ ] PWA 支援（Service Worker 離線模式）
- [ ] 深色模式切換
- [ ] 更多語言支援（pt-BR、ru、th、vi）
- [ ] 像素工作室：自訂網格尺寸
- [ ] 語音實驗室：波形視覺化
- [ ] 無障礙審計（WCAG 2.1 AA）

---

## 日本語

### 🎯 LifeSimGrid とは？

**LifeSimGrid** は、**島ライフシミュレーションゲーム向けに設計された補助ツール**であり、**ライフシミュレーションゲームと互換性のあるカスタマイズツール**でもあります。純フロントエンド技術アーキテクチャを採用し、すべてのデータ解析と画像処理はユーザーのローカルブラウザで完結し、究極のパフォーマンスと100%のプライバシー安全性を両立しています。

### ✨ 3つのコアスタジオ

#### 🎨 ピクセルスタジオ
*   **マルチ仕様グリッド対応**：**ソーシャルシミュレーションゲーム**のクリエイティブ描画仕様に完全適合 — 正方形（256×256）、長方形（書籍/レコードジャケット）、ワイドスクリーン（室内壁/壁紙）など多様なアスペクト比をネイティブサポート。
*   **マルチ密度ブラシサンプリング**：256×256 (1px)、85×85 (3px HD推奨)、64×64 (4px)、32×32 (7px) の4種類のグリッド密度切替。
*   **前処理画像フィルター**：内蔵の調整可能な明るさ・コントラスト軸で、複雑な原図縮小時の色歪みを大幅に軽減。
*   **数字塗り絵ハイライト**：汎用パレットの色ブロックをクリックすると、キャンバス上の対応するグリッド番号がリアルタイムでハイライトされ、手動トレースが容易に。

#### 🔓 データ設定変更ツール
*   **一括権限解除**：複数のアバターバイナリQRコード画像の一括ドラッグ＆ドロップに対応。フロントエンドの非同期ストリームで「コピー禁止」と「編集不可」の制限フラグ（FFLプロトコル形式）をワンクリックで強制解除。
*   **オンライン安全リネーム**：ウェブ上で住民名を直接修正可能 — システムがフロントエンドでバイナリチェックサムを自動再計算・修正。
*   **純フロントエンドZIPパッケージング**：一括処理完了後、ブラウザ上で直接`.zip`圧縮ファイルとしてエクスポート — 一つずつダウンロードする手間を省略。

#### 🔮 住民音声合成＆関係性ランキング
*   **8-Bit音声シミュレーション**：Web Audio API（ノコギリ波＋1200Hzローパスフィルター）を使用し、レトロ携帯ゲーム機ハードウェアの電子ロボット音声をローカルでシミュレート。ピッチとスピードの自由調整に対応。
*   **多住民関係性ランキング**：汎用的な12星座と16のコア性格特性に基づき、ローカル（localStorage）で住民名簿を構築し、全島の運命の相性ランキング（最も仲良しカップル vs 最も摩擦が多いペア）を自動交差演算・出力。

### 🔒 プライバシーファースト設計

- **100%クライアントサイド**——バックエンドサーバーなし、データベースなし、データアップロードなし
- すべての画像処理、バイナリデコード、音声合成はローカルで実行
- 住民名簿は `localStorage` のみ——デバイスから一切送信されません

### 📸 スクリーンショット

> *近日公開——スクリーンショットの PR も歓迎！*

### 🌍 対応言語（10言語）

`en` · `zh-Hant` · `ja` · `es` · `fr` · `ko` · `de` · `it` · `nl` · `zh-CN`

### 🛠️ 技術スタック

| カテゴリ | 技術 |
|----------|------|
| フレームワーク | Next.js 16 (App Router) + TypeScript |
| スタイリング | Tailwind CSS |
| 国際化 | next-intl v4（`localePrefix: "as-needed"`） |
| QR コーデック | jsQR（デコード）+ qrcode（Byte Mode エンコード） |
| アーカイブ | JSZip（クライアントサイド ZIP 生成） |
| オーディオ | Web Audio API（OscillatorNode + BiquadFilter） |
| 画像処理 | Canvas API（`imageSmoothingEnabled: false`） |
| デプロイ | 静的エクスポート → Cloudflare Pages |

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
│   │   └── terms/          # 利用規約
│   ├── layout.tsx          # ルートレイアウト + metadataBase
│   └── globals.css         # グローバルスタイル + アンカーリンク CSS
├── components/             # React コンポーネント
│   ├── HomePageContent.tsx # タブ切替 & ハッシュナビゲーション
│   ├── PixelStudio.tsx     # ピクセルグリッドコンバーター
│   ├── AvatarEditor.tsx    # アバター QR コンフィギュレーター
│   ├── VoiceLab.tsx        # 音声合成 & 関係性ラボ
│   ├── SEOSection.tsx      # ガイド、FAQ & JSON-LD
│   ├── Navbar.tsx          # ナビゲーションと言語スイッチャー
│   └── Footer.tsx          # フッターと免責事項
├── i18n/                   # next-intl 設定
│   ├── routing.ts          # ロケールルーティング設定
│   └── request.ts          # サーバーサイド i18n セットアップ
├── lib/                    # コアロジック
│   ├── compatibility.ts    # 星座 & 性格アルゴリズム
│   └── qr-handler.ts       # QR デコード/エンコードロジック
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

*   **100%ブラウザローカル計算**：本プロジェクトにはバックエンドサーバーやデータベースはありません。アップロードされたすべての画像とデコードされたすべてのバイナリバイトストリームは、ローカルデバイスのメモリ内でリアルタイムに処理され、クラウドにアップロードされることはありません。
*   **中立的技術研究**：本プロジェクトは完全に独立したサードパーティのオープンソース技術実践であり、最新のウェブ技術を用いてトレースとデータストリーム再構築の利便性を提供することを目的としています。本サイトは、いかなるゲーム機メーカー、公式ゲーム開発者、またはパブリッシャーとも商業的関係、認可、または推薦関係はありません。

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

本サイトは独立したサードパーティのファンツールです。いかなるゲーム機メーカーやゲーム開発者とも提携、認可、推奨の関係はありません。すべてのアバターフォーマットプロトコルとグリッド仕様はそれぞれの所有者に帰属します。

### 🛡️ セキュリティ

セキュリティ脆弱性を発見した場合は、公開 Issue を**開かずに**、**hi@lifesimgrid.org** にメールでご連絡ください。すべてのセキュリティ報告を真摯に受け止め、48時間以内に対応いたします。

### 📋 ロードマップ

- [ ] PWA サポート（Service Worker オフラインモード）
- [ ] ダークモード切替
- [ ] 追加ロケール対応（pt-BR、ru、th、vi）
- [ ] ピクセルスタジオ：カスタムグリッドサイズ
- [ ] ボイスラボ：波形ビジュアライゼーション
- [ ] アクセシビリティ監査（WCAG 2.1 AA）

---

## Español

### 🎯 ¿Qué es LifeSimGrid?

**LifeSimGrid** es una **herramienta auxiliar diseñada para juegos de simulación de vida en islas** y también una **herramienta de personalización compatible con juegos de simulación de vida**. Utiliza una arquitectura puramente frontend — todo el análisis de datos y procesamiento de imágenes se completa en el navegador local del usuario, garantizando tanto el máximo rendimiento como una seguridad de privacidad del 100%.

### ✨ Tres Estudios Principales

| Estudio | Descripción |
|---------|-------------|
| 🎨 **Estudio de Píxeles** | Soporte de cuadrícula multi-especificación que se adapta perfectamente a las especificaciones de dibujo creativo en **juegos de simulación social** — soporta nativamente cuadrado, rectangular y panorámico |
| 🔓 **Configurador QR** | Desbloqueo de permisos por lotes, cambio de nombre seguro en línea y empaquetado ZIP puro del lado del cliente |
| 🎵 **Lab de Voz y Relaciones** | Simulación de voz 8-Bit y tabla de relaciones multi-residentes basada en signos zodiacales y 16 rasgos de personalidad |

### 🔒 Arquitectura Privacidad Primero

- **100% del lado del cliente** — sin servidores backend, sin bases de datos, sin subidas de datos
- Todo el procesamiento de imágenes, decodificación binaria y síntesis de audio se realiza localmente
- El registro de residentes se guarda solo en `localStorage` — nunca sale de tu dispositivo
- Código abierto — auditable en GitHub

### 📸 Capturas de pantalla

> *Próximamente — ¡PRs con capturas de pantalla bienvenidos!*

### 🌍 Idiomas compatibles (10)

`en` · `zh-Hant` · `ja` · `es` · `fr` · `ko` · `de` · `it` · `nl` · `zh-CN`

### 🛠️ Stack tecnológico

| Categoría | Tecnología |
|-----------|-----------|
| Framework | Next.js 16 (App Router) + TypeScript |
| Estilos | Tailwind CSS |
| i18n | next-intl v4 (`localePrefix: "as-needed"`) |
| Códec QR | jsQR (decodificación) + qrcode (codificación Byte Mode) |
| Archivo | JSZip (generación ZIP del lado del cliente) |
| Audio | Web Audio API (OscillatorNode + BiquadFilter) |
| Imágenes | Canvas API (`imageSmoothingEnabled: false`) |
| Despliegue | Exportación estática → Cloudflare Pages |

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
│   ├── [locale]/           # Rutas de locale i18n (10 idiomas)
│   │   ├── page.tsx        # Página principal (SSG)
│   │   ├── about/          # Página About
│   │   ├── contact/        # Página de contacto
│   │   ├── privacy/        # Política de privacidad
│   │   └── terms/          # Términos de servicio
│   ├── layout.tsx          # Layout raíz + metadataBase
│   └── globals.css         # Estilos globales + CSS de enlaces ancla
├── components/             # Componentes React
│   ├── HomePageContent.tsx # Cambio de pestañas y navegación hash
│   ├── PixelStudio.tsx     # Convertidor de cuadrícula de píxeles
│   ├── AvatarEditor.tsx    # Configurador QR de avatares
│   ├── VoiceLab.tsx        # Lab de síntesis de voz y relaciones
│   ├── SEOSection.tsx      # Guía, FAQ y JSON-LD
│   ├── Navbar.tsx          # Navegación con selector de idioma
│   └── Footer.tsx          # Pie de página con descargo
├── i18n/                   # Configuración next-intl
│   ├── routing.ts          # Configuración de rutas de locale
│   └── request.ts          # Configuración i18n del lado del servidor
├── lib/                    # Lógica central
│   ├── compatibility.ts    # Algoritmos de zodiaco y personalidad
│   └── qr-handler.ts       # Lógica de decodificación/codificación QR
└── locales/                # Archivos de traducción (10 idiomas)
    ├── en.json             # Inglés (americano)
    ├── zh-Hant.json        # Chino tradicional
    ├── ja.json             # Japonés
    ├── es.json             # Español
    ├── fr.json             # Francés
    ├── ko.json             # Coreano
    ├── de.json             # Alemán
    ├── it.json             # Italiano
    ├── nl.json             # Holandés
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

### 🔒 Privacidad y derechos de autor

*   **100% computación local en el navegador**: Este proyecto no tiene servidores backend ni bases de datos. Cada imagen subida y cada flujo de bytes binarios decodificado se procesa en tiempo real en la memoria del dispositivo local — nunca se sube a la nube.
*   **Investigación técnica neutral**: Este proyecto es una práctica de tecnología open source de terceros completamente independiente, destinada a proporcionar comodidad de trazado y reconstrucción de flujos de datos utilizando tecnologías web modernas. Este sitio no tiene afiliación comercial, autorización ni respaldo de ningún fabricante de consolas, desarrollador de juegos oficial o editor.

### 📜 Licencia

MIT License — ver archivo [LICENSE](LICENSE) para más detalles.

### ⚖️ Descargo de responsabilidad

Esta es una herramienta de fans independiente de terceros. No está afiliada, autorizada ni respaldada por ningún fabricante de consolas o desarrollador de juegos. Todos los protocolos de formato de avatar y especificaciones de cuadrícula son propiedad de sus respectivos dueños.

### 🛡️ Seguridad

Si descubres una vulnerabilidad de seguridad, **no** abras un issue público. En su lugar, envía un correo electrónico a **hi@lifesimgrid.org**. Tomamos todos los informes de seguridad en serio y responderemos en 48 horas.

### 📋 Hoja de ruta

- [ ] Soporte PWA (modo offline con Service Worker)
- [ ] Alternar modo oscuro
- [ ] Soporte de locale adicional (pt-BR, ru, th, vi)
- [ ] Estudio de Píxeles: tamaños de cuadrícula personalizados
- [ ] Lab de Voz: visualización de forma de onda
- [ ] Auditoría de accesibilidad (WCAG 2.1 AA)

---

## Français

### 🎯 Qu'est-ce que LifeSimGrid ?

**LifeSimGrid** est un **outil auxiliaire conçu pour les jeux de simulation de vie sur île** et également un **outil de personnalisation compatible avec les jeux de simulation de vie**. Il adopte une architecture purement frontend — toute l'analyse des données et le traitement des images sont effectués dans le navigateur local de l'utilisateur, garantissant à la fois des performances maximales et une sécurité de confidentialité à 100%.

### ✨ Trois Studios Principaux

| Studio | Description |
|--------|-------------|
| 🎨 **Studio Pixel** | Prise en charge de grille multi-spécifications parfaitement adaptée aux spécifications de dessin créatif dans les **jeux de simulation sociale** |
| 🔓 **Configurateur QR** | Déblocage d'autorisations par lots, renommage sécurisé en ligne et empaquetage ZIP côté client |
| 🎵 **Lab Vocal et Relations** | Simulation vocale 8-Bit et classement de relations multi-résidents basé sur les signes du zodiaque et 16 traits de personnalité |

### 🔒 Architecture Respectueuse de la Vie Privée

- **100% côté client** — aucun serveur backend, aucune base de données, aucun téléchargement de données
- Tout le traitement d'images, décodage binaire et synthèse audio s'exécute localement
- Le registre des résidents est sauvegardé uniquement dans `localStorage` — ne quitte jamais votre appareil
- Code open source — entièrement auditable sur GitHub

### 📸 Captures d'écran

> *Bientôt disponible — les PR avec des captures d'écran sont les bienvenues !*

### 🌍 Langues prises en charge (10)

`en` · `zh-Hant` · `ja` · `es` · `fr` · `ko` · `de` · `it` · `nl` · `zh-CN`

### 🛠️ Stack technique

| Catégorie | Technologie |
|-----------|------------|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styles | Tailwind CSS |
| i18n | next-intl v4 (`localePrefix: "as-needed"`) |
| Codec QR | jsQR (décodage) + qrcode (encodage Byte Mode) |
| Archive | JSZip (génération ZIP côté client) |
| Audio | Web Audio API (OscillatorNode + BiquadFilter) |
| Imagerie | Canvas API (`imageSmoothingEnabled: false`) |
| Déploiement | Export statique → Cloudflare Pages |

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
│   ├── [locale]/           # Routes de locale i18n (10 langues)
│   │   ├── page.tsx        # Page d'accueil (SSG)
│   │   ├── about/          # Page À propos
│   │   ├── contact/        # Page Contact
│   │   ├── privacy/        # Politique de confidentialité
│   │   └── terms/          # Conditions d'utilisation
│   ├── layout.tsx          # Layout racine + metadataBase
│   └── globals.css         # Styles globaux + CSS liens d'ancrage
├── components/             # Composants React
│   ├── HomePageContent.tsx # Changement d'onglets et navigation hash
│   ├── PixelStudio.tsx     # Convertisseur de grille de pixels
│   ├── AvatarEditor.tsx    # Configurateur QR d'avatars
│   ├── VoiceLab.tsx        # Lab de synthèse vocale et relations
│   ├── SEOSection.tsx      # Guide, FAQ et JSON-LD
│   ├── Navbar.tsx          # Navigation avec sélecteur de langue
│   └── Footer.tsx          # Pied de page avec avertissement
├── i18n/                   # Configuration next-intl
│   ├── routing.ts          # Configuration des routes de locale
│   └── request.ts          # Configuration i18n côté serveur
├── lib/                    # Logique centrale
│   ├── compatibility.ts    # Algorithmes de zodiaque et personnalité
│   └── qr-handler.ts       # Logique de décodage/encodage QR
└── locales/                # Fichiers de traduction (10 langues)
    ├── en.json             # Anglais (américain)
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

### 🔒 Confidentialité et droits d'auteur

*   **100% calcul local dans le navigateur** : Ce projet n'a aucun serveur backend ni base de données. Chaque image téléchargée et chaque flux d'octets binaires décodé est traité en temps réel dans la mémoire de l'appareil local — jamais téléchargé vers le cloud.
*   **Recherche technique neutre** : Ce projet est une pratique technologique open source tierce entièrement indépendante, visant à fournir un traçage et une reconstruction de flux de données pratiques grâce aux technologies web modernes. Ce site n'a aucune affiliation commerciale, autorisation ou approbation avec aucun fabricant de consoles, développeur de jeux officiel ou éditeur.

### 📜 Licence

MIT License — voir le fichier [LICENSE](LICENSE) pour plus de détails.

### ⚖️ Avertissement légal

Ceci est un outil de fans tiers indépendant. Non affilié, autorisé ou approuvé par aucun fabricant de consoles ou développeur de jeux. Tous les protocoles de format d'avatar et spécifications de grille sont la propriété de leurs propriétaires respectifs.

### 🛡️ Sécurité

Si vous découvrez une vulnérabilité de sécurité, **ne** créez **pas** d'issue public. Envoyez plutôt un e-mail à **hi@lifesimgrid.org**. Nous prenons tous les rapports de sécurité au sérieux et répondrons dans les 48 heures.

### 📋 Feuille de route

- [ ] Support PWA (mode hors ligne avec Service Worker)
- [ ] Basculement mode sombre
- [ ] Support de locale supplémentaire (pt-BR, ru, th, vi)
- [ ] Studio Pixel : tailles de grille personnalisées
- [ ] Lab Vocal : visualisation de forme d'onde
- [ ] Audit d'accessibilité (WCAG 2.1 AA)

---

## 한국어

### 🎯 LifeSimGrid란?

**LifeSimGrid**는 **섬 라이프 시뮬레이션 게임을 위해 설계된 보조 도구**이자, **라이프 시뮬레이션 게임과 호환되는 커스터마이징 도구**입니다. 순수 프론트엔드 기술 아키텍처를 채택하여 모든 데이터 파싱과 이미지 처리가 사용자의 로컬 브라우저에서 완료되며, 극한의 성능과 100% 프라이버시 보안을 동시에 보장합니다.

### ✨ 세 가지 핵심 스튜디오

| 스튜디오 | 설명 |
|----------|------|
| 🎨 **픽셀 스튜디오** | **소셜 시뮬레이션 게임**의 크리에이티브 드로잉 사양에 완벽 대응하는 멀티 스펙 그리드 지원 |
| 🔓 **QR 컨피규레이터** | 배치 권한 해제, 온라인 안전 이름 변경 및 순수 클라이언트 ZIP 패키징 |
| 🎵 **음성 & 관계 랩** | 8-Bit 음성 시뮬레이션 및 별자리와 16가지 성격 특성 기반 다중 주민 관계 리더보드 |

### 🔒 프라이버시 우선 아키텍처

- **100% 클라이언트 사이드** — 백엔드 서버 없음, 데이터베이스 없음, 데이터 업로드 없음
- 모든 이미지 처리, 바이너리 디코딩 및 오디오 합성은 로컬에서 실행
- 주민 명부는 `localStorage`에만 저장 — 기기를 떠나지 않습니다
- 오픈소스 코드 — GitHub에서 감사 가능

### 📸 스크린샷

> *출시 예정 — 스크린샷 PR을 환영합니다!*

### 🌍 지원 언어 (10개)

`en` · `zh-Hant` · `ja` · `es` · `fr` · `ko` · `de` · `it` · `nl` · `zh-CN`

### 🛠️ 기술 스택

| 카테고리 | 기술 |
|----------|------|
| 프레임워크 | Next.js 16 (App Router) + TypeScript |
| 스타일링 | Tailwind CSS |
| i18n | next-intl v4 (`localePrefix: "as-needed"`) |
| QR 코덱 | jsQR (디코드) + qrcode (Byte Mode 인코드) |
| 아카이브 | JSZip (클라이언트 사이드 ZIP 생성) |
| 오디오 | Web Audio API (OscillatorNode + BiquadFilter) |
| 이미징 | Canvas API (`imageSmoothingEnabled: false`) |
| 배포 | 정적 내보내기 → Cloudflare Pages |

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
│   │   └── terms/          # 이용약관
│   ├── layout.tsx          # 루트 레이아웃 + metadataBase
│   └── globals.css         # 전역 스타일 + 앵커 링크 CSS
├── components/             # React 컴포넌트
│   ├── HomePageContent.tsx # 탭 전환 및 해시 네비게이션
│   ├── PixelStudio.tsx     # 픽셀 그리드 변환기
│   ├── AvatarEditor.tsx    # 아바타 QR 컨피규레이터
│   ├── VoiceLab.tsx        # 음성 합성 및 관계 랩
│   ├── SEOSection.tsx      # 가이드, FAQ 및 JSON-LD
│   ├── Navbar.tsx          # 네비게이션 및 언어 전환기
│   └── Footer.tsx          # 면책 조항이 있는 푸터
├── i18n/                   # next-intl 설정
│   ├── routing.ts          # 로케일 라우팅 설정
│   └── request.ts          # 서버 사이드 i18n 설정
├── lib/                    # 핵심 로직
│   ├── compatibility.ts    # 별자리 및 성격 알고리즘
│   └── qr-handler.ts       # QR 디코드/인코드 로직
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

### 🔒 개인정보 및 저작권

*   **100% 브라우저 로컬 연산**: 이 프로젝트에는 백엔드 서버나 데이터베이스가 없습니다. 업로드된 모든 이미지와 디코딩된 모든 바이너리 바이트 스트림은 로컬 기기의 메모리에서 실시간으로 처리되며, 클라우드에 업로드되지 않습니다.
*   **중립적 기술 연구**: 이 프로젝트는 완전히 독립적인 제3자 오픈소스 기술 실천으로, 현대 웹 기술을 활용한 추적 및 데이터 스트림 재구성의 편의성을 제공하는 것을 목적으로 합니다. 이 사이트는 어떤 콘솔 제조업체, 공식 게임 개발자 또는 퍼블리셔와도 상업적 관계, 인가 또는 보증 관계가 없습니다.

### 📜 라이선스

MIT License — 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

### ⚖️ 법적 고지

이것은 독립적인 제3자 팬 도구입니다. 어떤 콘솔 제조업체나 게임 개발자와도 제휴, 인가 또는 보증 관계가 없습니다. 모든 아바타 형식 프로토콜 및 그리드 사양은 각 소유자의 재산입니다.

### 🛡️ 보안

보안 취약점을 발견하신 경우, 공개 이슈를 **열지 마세요**. 대신 **hi@lifesimgrid.org**로 이메일을 보내주세요. 모든 보안 보고를 진지하게 다루며 48시간 이내에 응답합니다.

### 📋 로드맵

- [ ] PWA 지원 (Service Worker 오프라인 모드)
- [ ] 다크 모드 전환
- [ ] 추가 로케일 지원 (pt-BR, ru, th, vi)
- [ ] 픽셀 스튜디오: 커스텀 그리드 크기
- [ ] 음성 랩: 파형 시각화
- [ ] 접근성 감사 (WCAG 2.1 AA)

---

## Deutsch

### 🎯 Was ist LifeSimGrid?

**LifeSimGrid** ist ein **Hilfstool für Insellebens-Simulationspiele** und zugleich ein **Anpassungstool, das mit Lebenssimulationsspielen kompatibel ist**. Es nutzt eine reine Frontend-Architektur — gesamte Datenanalyse und Bildverarbeitung erfolgen im lokalen Browser des Benutzers und gewährleisten sowohl maximale Leistung als auch 100% Datenschutzsicherheit.

### ✨ Drei Kern-Studios

| Studio | Beschreibung |
|--------|-------------|
| 🎨 **Pixel-Studio** | Multi-Spezifikation-Raster-Unterstützung, perfekt angepasst an die kreativen Zeichnungsspezifikationen in **Sozialsimulationsspielen** |
| 🔓 **QR-Konfigurator** | Batch-Berechtigungsentsperrung, sichere Online-Umbenennung und reines Client-seitiges ZIP-Packaging |
| 🎵 **Sprach- & Beziehungs-Lab** | 8-Bit-Sprachsimulation und Multi-Bewohner-Beziehungsrangliste basierend auf Tierkreiszeichen und 16 Persönlichkeitsmerkmalen |

### 🔒 Datenschutz-first-Architektur

- **100% clientseitig** — keine Backend-Server, keine Datenbanken, keine Daten-Uploads
- Alle Bildverarbeitung, Binärdekodierung und Audiosynthese erfolgt lokal
- Bewohnerliste wird nur in `localStorage` gespeichert — verlässt nie Ihr Gerät
- Open-Source-Code — vollständig auf GitHub prüfbar

### 📸 Screenshots

> *Demnächst — PRs mit Screenshots willkommen!*

### 🌍 Unterstützte Sprachen (10)

`en` · `zh-Hant` · `ja` · `es` · `fr` · `ko` · `de` · `it` · `nl` · `zh-CN`

### 🛠️ Tech-Stack

| Kategorie | Technologie |
|-----------|------------|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| i18n | next-intl v4 (`localePrefix: "as-needed"`) |
| QR-Codec | jsQR (Dekodierung) + qrcode (Byte-Mode-Kodierung) |
| Archiv | JSZip (clientseitige ZIP-Generierung) |
| Audio | Web Audio API (OscillatorNode + BiquadFilter) |
| Bildverarbeitung | Canvas API (`imageSmoothingEnabled: false`) |
| Bereitstellung | Statischer Export → Cloudflare Pages |

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
│   │   ├── about/          # About-Seite
│   │   ├── contact/        # Kontaktseite
│   │   ├── privacy/        # Datenschutzrichtlinie
│   │   └── terms/          # Nutzungsbedingungen
│   ├── layout.tsx          # Root-Layout + metadataBase
│   └── globals.css         # Globale Styles + Ankerlink-CSS
├── components/             # React-Komponenten
│   ├── HomePageContent.tsx # Tab-Wechsel & Hash-Navigation
│   ├── PixelStudio.tsx     # Pixelraster-Konverter
│   ├── AvatarEditor.tsx    # Avatar-QR-Konfigurator
│   ├── VoiceLab.tsx        # Sprachsynthese- & Beziehungs-Lab
│   ├── SEOSection.tsx      # Leitfaden, FAQ & JSON-LD
│   ├── Navbar.tsx          # Navigation mit Sprachwechsler
│   └── Footer.tsx          # Footer mit Haftungsausschluss
├── i18n/                   # next-intl Konfiguration
│   ├── routing.ts          # Locale-Routing-Konfiguration
│   └── request.ts          # Serverseitiges i18n-Setup
├── lib/                    # Kernlogik
│   ├── compatibility.ts    # Tierkreis- & Persönlichkeitsalgorithmen
│   └── qr-handler.ts       # QR-Dekodierungs/Kodierungslogik
└── locales/                # Übersetzungsdateien (10 Sprachen)
    ├── en.json             # Englisch (amerikanisch)
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

*   **100% lokale Browser-Berechnung**: Dieses Projekt hat keine Backend-Server oder Datenbanken. Jedes hochgeladene Bild und jeder dekodierte binäre Bytestrom wird in Echtzeit im Speicher des lokalen Geräts verarbeitet — niemals in die Cloud hochgeladen.
*   **Neutrale technische Forschung**: Dieses Projekt ist eine vollständig unabhängige Open-Source-Technologiepraxis Dritter, die darauf abzielt, Nachverfolgungs- und Datenstrom-Rekonstruktionskomfort mit modernen Webtechnologien zu bieten. Diese Seite hat keine kommerzielle Verbindung, Autorisierung oder Befürwortung durch Konsolenhersteller, offizielle Spieleentwickler oder Publisher.

### 📜 Lizenz

MIT License — siehe [LICENSE](LICENSE) Datei für Details.

### ⚖️ Rechtlicher Haftungsausschluss

Dies ist ein unabhängiges Drittanbieter-Fan-Tool. Nicht verbunden mit, autorisiert von oder befürwortet durch Konsolenhersteller oder Spieleentwickler. Alle Avatar-Formatprotokolle und Rasterspezifikationen sind Eigentum ihrer jeweiligen Inhaber.

### 🛡️ Sicherheit

Wenn Sie eine Sicherheitslücke entdecken, öffnen Sie **kein** öffentliches Issue. Senden Sie stattdessen eine E-Mail an **hi@lifesimgrid.org**. Wir nehmen alle Sicherheitsberichte ernst und antworten innerhalb von 48 Stunden.

### 📋 Roadmap

- [ ] PWA-Unterstützung (Offline-Modus mit Service Worker)
- [ ] Dunkelmodus-Umschaltung
- [ ] Zusätzliche Locale-Unterstützung (pt-BR, ru, th, vi)
- [ ] Pixel-Studio: Benutzerdefinierte Rastergrößen
- [ ] Sprach-Lab: Wellenform-Visualisierung
- [ ] Barrierefreiheits-Audit (WCAG 2.1 AA)

---

## Italiano

### 🎯 Cos'è LifeSimGrid?

**LifeSimGrid** è uno **strumento ausiliario progettato per giochi di simulazione di vita su isola** e anche uno **strumento di personalizzazione compatibile con i giochi di simulazione di vita**. Adotta un'architettura puramente frontend — tutta l'analisi dei dati e l'elaborazione delle immagini avvengono nel browser locale dell'utente, garantendo sia prestazioni massime che sicurezza della privacy al 100%.

### ✨ Tre Studi Principali

| Studio | Descrizione |
|--------|-------------|
| 🎨 **Studio Pixel** | Supporto griglia multi-specificazione perfettamente adattato alle specifiche di disegno creativo nei **giochi di simulazione sociale** |
| 🔓 **Configuratore QR** | Sblocco permessi in batch, rinomina sicura online e packaging ZIP puro lato client |
| 🎵 **Lab Vocale e Relazioni** | Simulazione vocale 8-bit e classifica relazioni multi-residenti basata su segni zodiacali e 16 tratti di personalità |

### 🔒 Architettura Privacy-First

- **100% lato client** — nessun server backend, nessun database, nessun caricamento dati
- Tutta l'elaborazione delle immagini, decodifica binaria e sintesi audio avviene localmente
- Il registro dei residenti è salvato solo in `localStorage` — non lascia mai il tuo dispositivo
- Codice open source — completamente auditable su GitHub

### 📸 Screenshot

> *Prossimamente — PR con screenshot benvenuti!*

### 🌍 Lingue supportate (10)

`en` · `zh-Hant` · `ja` · `es` · `fr` · `ko` · `de` · `it` · `nl` · `zh-CN`

### 🛠️ Stack tecnologico

| Categoria | Tecnologia |
|-----------|-----------|
| Framework | Next.js 16 (App Router) + TypeScript |
| Stili | Tailwind CSS |
| i18n | next-intl v4 (`localePrefix: "as-needed"`) |
| Codec QR | jsQR (decodifica) + qrcode (codifica Byte Mode) |
| Archivio | JSZip (generazione ZIP lato client) |
| Audio | Web Audio API (OscillatorNode + BiquadFilter) |
| Imaging | Canvas API (`imageSmoothingEnabled: false`) |
| Distribuzione | Export statico → Cloudflare Pages |

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
│   ├── [locale]/           # Routing locale i18n (10 lingue)
│   │   ├── page.tsx        # Home page (SSG)
│   │   ├── about/          # Pagina About
│   │   ├── contact/        # Pagina Contatti
│   │   ├── privacy/        # Informativa sulla privacy
│   │   └── terms/          # Termini di servizio
│   ├── layout.tsx          # Layout radice + metadataBase
│   └── globals.css         # Stili globali + CSS link ancora
├── components/             # Componenti React
│   ├── HomePageContent.tsx # Cambio schede e navigazione hash
│   ├── PixelStudio.tsx     # Convertitore griglia pixel
│   ├── AvatarEditor.tsx    # Configuratore QR avatar
│   ├── VoiceLab.tsx        # Lab sintesi vocale e relazioni
│   ├── SEOSection.tsx      # Guida, FAQ e JSON-LD
│   ├── Navbar.tsx          # Navigazione con selettore lingua
│   └── Footer.tsx          # Footer con disclaimer
├── i18n/                   # Configurazione next-intl
│   ├── routing.ts          # Configurazione routing locale
│   └── request.ts          # Setup i18n lato server
├── lib/                    # Logica principale
│   ├── compatibility.ts    # Algoritmi zodiacali e di personalità
│   └── qr-handler.ts       # Logica decodifica/codifica QR
└── locales/                # File di traduzione (10 lingue)
    ├── en.json             # Inglese (americano)
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

### 🔒 Privacy e diritti d'autore

*   **100% calcolo locale nel browser**: Questo progetto non ha server backend o database. Ogni immagine caricata e ogni flusso di byte binari decodificato viene elaborato in tempo reale nella memoria del dispositivo locale — mai caricato sul cloud.
*   **Ricerca tecnica neutrale**: Questo progetto è una pratica tecnologica open source di terze parti completamente indipendente, volta a fornire comodità di tracciamento e ricostruzione di flussi di dati utilizzando tecnologie web moderne. Questo sito non ha alcuna affiliazione commerciale, autorizzazione o endorsement con alcun produttore di console, sviluppatore di giochi ufficiale o editore.

### 📜 Licenza

MIT License — vedi file [LICENSE](LICENSE) per i dettagli.

### ⚖️ Disclaimer legale

Questo è uno strumento di fan indipendente di terze parti. Non affiliato, autorizzato o endorsement da alcun produttore di console o sviluppatore di giochi. Tutti i protocolli di formato avatar e le specifiche di griglia sono di proprietà dei rispettivi proprietari.

### 🛡️ Sicurezza

Se scopri una vulnerabilità di sicurezza, **non** aprire un issue pubblico. Invia invece un'e-mail a **hi@lifesimgrid.org**. Prendiamo tutti i rapporti di sicurezza sul serio e risponderemo entro 48 ore.

### 📋 Roadmap

- [ ] Supporto PWA (modalità offline con Service Worker)
- [ ] Attivazione modalità scura
- [ ] Supporto locale aggiuntivo (pt-BR, ru, th, vi)
- [ ] Studio Pixel: dimensioni griglia personalizzate
- [ ] Lab Vocale: visualizzazione forma d'onda
- [ ] Audit accessibilità (WCAG 2.1 AA)

---

## Nederlands

### 🎯 Wat is LifeSimGrid?

**LifeSimGrid** is een **hulpmiddel ontworpen voor eilandlevenssimulatiegames** en tevens een **aanpassingstool compatibel met levenssimulatiegames**. Het gebruikt een zuiver frontend-architectuur — alle data-analyse en beeldverwerking vinden plaats in de lokale browser van de gebruiker, wat zowel maximale prestaties als 100% privacyveiligheid garandeert.

### ✨ Drie Kernstudio's

| Studio | Beschrijving |
|--------|-------------|
| 🎨 **Pixelstudio** | Multi-specificatie rasterondersteuning perfect afgestemd op de creatieve tekenspecificaties in **socialsimulatiegames** |
| 🔓 **QR-configurator** | Batch-machtigingsontgrendeling, veilige online hernoeming en zuiver client-side ZIP-verpakking |
| 🎵 **Stem- & Relatielab** | 8-Bit stemsimulatie en multi-bewoner relatie-ranglijst gebaseerd op dierenriemtekens en 16 persoonlijkheidstrekken |

### 🔒 Privacy-First Architectuur

- **100% aan de clientzijde** — geen backend-servers, geen databases, geen gegevensuploads
- Alle beeldverwerking, binaire decodering en audiosynthese gebeurt lokaal
- Bewonerslijst wordt alleen opgeslagen in `localStorage` — verlaat nooit uw apparaat
- Open-source code — volledig auditeerbaar op GitHub

### 📸 Schermafbeeldingen

> *Binnenkort — PR's met schermafbeeldingen welkom!*

### 🌍 Ondersteunde talen (10)

`en` · `zh-Hant` · `ja` · `es` · `fr` · `ko` · `de` · `it` · `nl` · `zh-CN`

### 🛠️ Tech-stack

| Categorie | Technologie |
|-----------|------------|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| i18n | next-intl v4 (`localePrefix: "as-needed"`) |
| QR-codec | jsQR (decodering) + qrcode (Byte Mode codering) |
| Archief | JSZip (client-side ZIP-generatie) |
| Audio | Web Audio API (OscillatorNode + BiquadFilter) |
| Beeldverwerking | Canvas API (`imageSmoothingEnabled: false`) |
| Implementatie | Statische export → Cloudflare Pages |

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
│   │   ├── about/          # About-pagina
│   │   ├── contact/        # Contactpagina
│   │   ├── privacy/        # Privacybeleid
│   │   └── terms/          # Gebruiksvoorwaarden
│   ├── layout.tsx          # Root-layout + metadataBase
│   └── globals.css         # Globale stijlen + ankerlink-CSS
├── components/             # React-componenten
│   ├── HomePageContent.tsx # Tab-wissel & hash-navigatie
│   ├── PixelStudio.tsx     # Pixelraster-converter
│   ├── AvatarEditor.tsx    # Avatar QR-configurator
│   ├── VoiceLab.tsx        # Spraaksynthese- & relatieslab
│   ├── SEOSection.tsx      # Gids, FAQ & JSON-LD
│   ├── Navbar.tsx          # Navigatie met taalwisselaar
│   └── Footer.tsx          # Footer met disclaimer
├── i18n/                   # next-intl configuratie
│   ├── routing.ts          # Locale-routing configuratie
│   └── request.ts          # Server-side i18n setup
├── lib/                    # Kernlogica
│   ├── compatibility.ts    # Dierenriem & persoonlijkheidsalgoritmen
│   └── qr-handler.ts       # QR decodeer/encodeer-logica
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

### 🔒 Privacy en auteursrecht

*   **100% lokale browserberekening**: Dit project heeft geen backend-servers of databases. Elke geüploade afbeelding en elke gedecodeerde binaire bytestroom wordt in realtime verwerkt in het geheugen van het lokale apparaat — nooit geüpload naar de cloud.
*   **Neutraal technisch onderzoek**: Dit project is een volledig onafhankelijke derde partij open-source technologiepraktijk, gericht op het bieden van tracerings- en datastroomreconstructiegemak met moderne webtechnologieën. Deze site heeft geen commerciële affiliatie, autorisatie of goedkeuring van enige consolefabrikant, officiële gameontwikkelaar of uitgever.

### 📜 Licentie

MIT License — zie [LICENSE](LICENSE) bestand voor details.

### ⚖️ Juridische disclaimer

Dit is een onafhankelijk derde-partij fan-tool. Niet gelieerd aan, geautoriseerd door of goedgekeurd door enige consolefabrikant of gameontwikkelaar. Alle avatar-formaatprotocollen en rasterspecificaties zijn eigendom van hun respectieve eigenaren.

### 🛡️ Beveiliging

Als u een beveiligingskwetsbaarheid ontdekt, open **geen** openbaar issue. Stuur in plaats daarvan een e-mail naar **hi@lifesimgrid.org**. We nemen alle beveiligingsrapporten serieus en reageren binnen 48 uur.

### 📋 Routekaart

- [ ] PWA-ondersteuning (offline modus met Service Worker)
- [ ] Donkermodus-schakelaar
- [ ] Aanvullende locale-ondersteuning (pt-BR, ru, th, vi)
- [ ] Pixelstudio: aangepaste rasterformaten
- [ ] Stemlab: golfvorm-visualisatie
- [ ] Toegankelijkheidsaudit (WCAG 2.1 AA)

---

## 简体中文

### 🎯 LifeSimGrid 是什么？

**LifeSimGrid** 是一款**为岛屿生活模拟游戏设计的辅助工具**，同时也是一个**兼容生活模拟游戏的自定义工具**。本项目采用纯前端技术架构，所有数据解析与图像处理均在用户本地浏览器完成，兼顾极致性能与 100% 隐私安全。

### ✨ 三大核心工作室

#### 🎨 像素工作室
*   **多规格网格支持**：完美适配**社交模拟类游戏**中的创意绘图规范，原生支持正方形（256×256）、长方形（书本/唱片封面）与宽屏（室内墙壁/壁纸）等多种裁切比例。
*   **多密度笔刷采样**：提供 256×256 (1px)、85×85 (3px 高清推荐)、64×64 (4px) 与 32×32 (7px) 四种网格密度切换。
*   **预处理影像滤镜**：内置可调式亮度与对比度轴，大幅减少复杂原图缩小后的色彩失真。
*   **数字填色高亮**：点击通用色盘色块，即可在网页画布上即时高亮对应的网格编号，方便手动临摹。

#### 🔓 数据配置修改器
*   **批量权限解锁**：支持多张角色二进制 QR 码图片的批量拖放上传。在前端利用异步流，一键强制解除「防拷贝」与「不可编辑」的限制标志（FFL 协议格式）。
*   **线上安全改名**：允许在网页端直接修正居民名称，系统会自动在前端重新计算并修正二进制校验码（Checksum）。
*   **纯前端 ZIP 封装**：批量处理完成后，直接在浏览器端打包成 `.zip` 压缩包导出，免去逐一下载的繁琐操作。

#### 🔮 居民语音合成与关系天梯榜
*   **8-Bit 声线模拟**：使用 Web Audio API（锯齿波与 1200Hz 低通滤波器）在本地端模拟复古掌机硬件的电子机器假音，支持音高与语速的自由调校。
*   **多居民关系天梯榜**：基于通用的十二星座与 16 种核心性格特质，在本地（LocalStorage）建立居民名册，自动交叉演算并输出全岛的命定兼容性天梯榜（最恩爱伴侣 vs 最多摩擦冤家）。

### 🔒 隐私优先架构

- **100%纯前端**——无后端服务器、无数据库、零数据上传
- 所有图片处理、二进制解码与语音合成均在本地完成
- 居民名册仅存于 `localStorage`——从不离开你的设备
- 开源代码——可在 GitHub 完整审计

### 📸 截图

> *即将推出——欢迎提交截图 PR！*

### 🌍 支持语言（10 种）

`en` · `zh-Hant` · `ja` · `es` · `fr` · `ko` · `de` · `it` · `nl` · `zh-CN`

### 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) + TypeScript |
| 样式 | Tailwind CSS |
| 国际化 | next-intl v4（`localePrefix: "as-needed"`） |
| QR 编解码 | jsQR（解码）+ qrcode（Byte Mode 编码） |
| 封装 | JSZip（客户端 ZIP 生成） |
| 音频 | Web Audio API（OscillatorNode + BiquadFilter） |
| 图像 | Canvas API（`imageSmoothingEnabled: false`） |
| 部署 | 静态导出 → Cloudflare Pages |

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
│   │   └── terms/          # 服务条款
│   ├── layout.tsx          # 根布局 + metadataBase
│   └── globals.css         # 全局样式 + 锚点链接 CSS
├── components/             # React 组件
│   ├── HomePageContent.tsx # 标签切换与 hash 导航
│   ├── PixelStudio.tsx     # 像素网格转换器
│   ├── AvatarEditor.tsx    # 角色 QR 配置修改器
│   ├── VoiceLab.tsx        # 语音合成与关系天梯榜
│   ├── SEOSection.tsx      # 指南、FAQ 与 JSON-LD
│   ├── Navbar.tsx          # 导航栏与语言切换器
│   └── Footer.tsx          # 页脚与免责声明
├── i18n/                   # next-intl 配置
│   ├── routing.ts          # 语言路由配置
│   └── request.ts          # 服务端国际化设置
├── lib/                    # 核心逻辑
│   ├── compatibility.ts    # 星座与性格算法
│   └── qr-handler.ts       # QR 解码/编码逻辑
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

*   **100% 浏览器本地运算**：本项目不设任何后端服务器或数据库。玩家上传的每一张图片、解码的每一个二进制字节流，均在本地设备的内存内即时处理，绝不上传云端。
*   **中立技术研究**：本项目为完全独立的第三方开源技术实践，旨在利用现代网页技术提供临摹与数据流重构便利。本站与任何游戏主机制造商、官方游戏开发商或发行商无任何商业关联、授权或代言关系。

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

本站为独立第三方粉丝工具，与任何游戏主机制造商或游戏开发商无任何商业关联、授权或代言关系。所有虚拟化身数据格式与网格规格均属于其各自版权所有者。

### 🛡️ 安全

如果您发现安全漏洞，请**不要**公开提交 Issue。请发送电子邮件至 **hi@lifesimgrid.org**。我们会严肃对待所有安全报告，并在 48 小时内回复。

### 📋 路线图

- [ ] PWA 支持（Service Worker 离线模式）
- [ ] 深色模式切换
- [ ] 更多语言支持（pt-BR、ru、th、vi）
- [ ] 像素工作室：自定义网格尺寸
- [ ] 语音实验室：波形可视化
- [ ] 无障碍审计（WCAG 2.1 AA）

---

<div align="center">

**© 2026 LifeSimGrid. Made with ❤️ by fans, for fans.**

[🏠 Website](https://lifesimgrid.org) · [🐙 GitHub](https://github.com/cenyi/LifeSimGrid) · [🐛 Issues](https://github.com/cenyi/LifeSimGrid/issues) · [📧 Contact](mailto:hi@lifesimgrid.org)

</div>
