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

**[🔗 Live Demo](https://lifesimgrid.com)** · **[🐛 Report Bug](https://github.com/cenyi/LifeSimGrid/issues)** · **[✨ Request Feature](https://github.com/cenyi/LifeSimGrid/issues)**

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

### 🚢 Deployment (Cloudflare Pages)

This project uses Next.js static export (`output: 'export'`), making it compatible with any static hosting provider.

#### Cloudflare Pages Setup

1. Fork or push this repo to GitHub
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages → Create a project
3. Connect your GitHub repo
4. Set build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
5. Deploy — done!

> **Note**: No environment variables are needed. The entire app is 100% static.

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

If you discover a security vulnerability, please **do not** open a public issue. Instead, email us at **security@lifesimgrid.com**. We take all security reports seriously and will respond within 48 hours.

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

### 🔒 隱私與版權安全聲明

*   **100% 瀏覽器本地運算**：本專案不設有任何後端伺服器或資料庫。玩家上傳的每一張圖片、解碼的每一個二進位字節流，均在本地設備的記憶體內即時處理，絕不上傳雲端。
*   **中立技術研究**：本專案為完全獨立的第三方開源技術實踐，旨在利用現代網頁技術提供臨摹與數據流重構便利。本站與任何遊戲主機製造商、官方遊戲開發商或出版商無任何商業關聯、授權或代言關係。

### 🤝 參與貢獻

1. **Fork** 此倉庫
2. **建立**功能分支：`git checkout -b feature/amazing-feature`
3. **提交**變更：`git commit -m 'Add amazing feature'`
4. **推送**分支：`git push origin feature/amazing-feature`
5. **發起** Pull Request

### 📜 授權條款

本專案採用 **MIT License** 授權——詳見 [LICENSE](LICENSE) 檔案。

### ⚖️ 免責聲明

本站為獨立第三方粉絲工具，與任何遊戲主機製造商或遊戲開發商無任何商業關聯、授權或代言關係。所有虛擬化身數據格式與網格規格均屬於其各自版權所有者。

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

### 🔒 プライバシーと著作権に関する声明

*   **100%ブラウザローカル計算**：本プロジェクトにはバックエンドサーバーやデータベースはありません。アップロードされたすべての画像とデコードされたすべてのバイナリバイトストリームは、ローカルデバイスのメモリ内でリアルタイムに処理され、クラウドにアップロードされることはありません。
*   **中立的技術研究**：本プロジェクトは完全に独立したサードパーティのオープンソース技術実践であり、最新のウェブ技術を用いてトレースとデータストリーム再構築の利便性を提供することを目的としています。本サイトは、いかなるゲーム機メーカー、公式ゲーム開発者、またはパブリッシャーとも商業的関係、認可、または推薦関係はありません。

### 🤝 コントリビュート

1. リポジトリを **Fork**
2. フィーチャーブランチを作成：`git checkout -b feature/amazing-feature`
3. 変更をコミット：`git commit -m 'Add amazing feature'`
4. プッシュ：`git push origin feature/amazing-feature`
5. **Pull Request** を作成

### 📜 ライセンス

MIT License — 詳細は [LICENSE](LICENSE) ファイルをご覧ください。

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

### 🤝 Contribuir

1. Haz **Fork** del repositorio
2. Crea una rama: `git checkout -b feature/amazing-feature`
3. Haz commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Abre un **Pull Request**

### 📜 Licencia

MIT License — ver archivo [LICENSE](LICENSE) para más detalles.

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

### 🤝 Contribuer

1. **Forkez** le dépôt
2. Créez une branche : `git checkout -b feature/amazing-feature`
3. Commitez : `git commit -m 'Add amazing feature'`
4. Poussez : `git push origin feature/amazing-feature`
5. Ouvrez une **Pull Request**

### 📜 Licence

MIT License — voir le fichier [LICENSE](LICENSE) pour plus de détails.

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

### 🤝 기여하기

1. 저장소를 **Fork**
2. 브랜치 생성: `git checkout -b feature/amazing-feature`
3. 커밋: `git commit -m 'Add amazing feature'`
4. 푸시: `git push origin feature/amazing-feature`
5. **Pull Request** 생성

### 📜 라이선스

MIT License — 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

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

### 🤝 Mitwirken

1. Repository **forken**
2. Branch erstellen: `git checkout -b feature/amazing-feature`
3. Committen: `git commit -m 'Add amazing feature'`
4. Pushen: `git push origin feature/amazing-feature`
5. **Pull Request** erstellen

### 📜 Lizenz

MIT License — siehe [LICENSE](LICENSE) Datei für Details.

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

### 🤝 Contribuire

1. Fai **Fork** del repository
2. Crea un branch: `git checkout -b feature/amazing-feature`
3. Committa: `git commit -m 'Add amazing feature'`
4. Fai push: `git push origin feature/amazing-feature`
5. Apri una **Pull Request**

### 📜 Licenza

MIT License — vedi file [LICENSE](LICENSE) per i dettagli.

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

### 🤝 Bijdragen

1. **Fork** de repository
2. Maak een branch: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open een **Pull Request**

### 📜 Licentie

MIT License — zie [LICENSE](LICENSE) bestand voor details.

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

### 🔒 隐私与版权安全声明

*   **100% 浏览器本地运算**：本项目不设任何后端服务器或数据库。玩家上传的每一张图片、解码的每一个二进制字节流，均在本地设备的内存内即时处理，绝不上传云端。
*   **中立技术研究**：本项目为完全独立的第三方开源技术实践，旨在利用现代网页技术提供临摹与数据流重构便利。本站与任何游戏主机制造商、官方游戏开发商或发行商无任何商业关联、授权或代言关系。

### 🤝 参与贡献

1. **Fork** 本仓库
2. **创建**功能分支：`git checkout -b feature/amazing-feature`
3. **提交**变更：`git commit -m 'Add amazing feature'`
4. **推送**分支：`git push origin feature/amazing-feature`
5. **发起** Pull Request

### 📜 授权条款

本项目采用 **MIT License** 授权——详见 [LICENSE](LICENSE) 文件。

### ⚖️ 免责声明

本站为独立第三方粉丝工具，与任何游戏主机制造商或游戏开发商无任何商业关联、授权或代言关系。所有虚拟化身数据格式与网格规格均属于其各自版权所有者。

---

<div align="center">

**© 2026 LifeSimGrid. Made with ❤️ by fans, for fans.**

[🏠 Website](https://lifesimgrid.com) · [🐙 GitHub](https://github.com/cenyi/LifeSimGrid) · [🐛 Issues](https://github.com/cenyi/LifeSimGrid/issues) · [📧 Contact](mailto:support@lifesimgrid.com)

</div>
