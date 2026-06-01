<div align="center">

# 🎮 LifeSimGrid

**Custom Avatar Grid & Life Sim Studio**

*A one-stop, privacy-first toolkit for life sim fans and retro 8-bit enthusiasts.*

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

LifeSimGrid is a free, open-source, 100% client-side web toolkit for life simulation game fans. No sign-ups, no servers, no data collection — everything runs right in your browser.

### 📸 Screenshots

> *Coming soon — PRs with screenshots welcome!*

### ✨ Three Core Studios

| Studio | Description |
|--------|-------------|
| 🎨 **Pixel Studio** | Multi-ratio & multi-density pixel grid converter with a 32-color universal 8-bit retro palette and paint-by-numbers mode |
| 🔓 **QR Unlocker** | Avatar QR code configurator & permission unlocker — single-file editing & batch ZIP export with auto-detection |
| 🎵 **Voice Lab** | 8-bit voice synth with 5 presets, custom phrase TTS, personality coordinate matrix, and relationship leaderboard (up to 15 residents) |

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

LifeSimGrid 是一款免費、開源、100% 純前端的網頁工具箱，專為生活模擬遊戲愛好者打造。免註冊、免伺服器、零數據收集——所有處理都在你的瀏覽器中完成。

### ✨ 三大核心工作室

| 工作室 | 說明 |
|--------|------|
| 🎨 **像素工作室** | 多比例×多密度像素網格轉換器，內建 32 色通用 8-Bit 復古掌機色盤與數字填色模式 |
| 🔓 **QR 修改器** | 虛擬化身 QR Code 自動偵測解鎖器——單檔編輯＆批量 ZIP 匯出 |
| 🎵 **語音實驗室** | 8-Bit 語音合成（5 種聲線預設）、自訂台詞 TTS、性格坐標矩陣、配對天梯榜（最多 15 位居民） |

### 🔒 隱私優先架構

- **100% 純前端**——無後端伺服器、無資料庫、零數據上傳
- 所有圖片處理、二進位解碼與語音合成均在本地完成
- 居民名冊僅存於 `localStorage`——從不離開你的裝置
- 開源程式碼——可在 GitHub 完整審計

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

LifeSimGrid は、ライフシミュレーションゲームファンのための無料・オープンソース・100%クライアントサイドのWebツールキットです。登録不要、サーバー不要、データ収集なし——すべてブラウザ上で完結します。

### ✨ 3つのコアスタジオ

| スタジオ | 説明 |
|----------|------|
| 🎨 **ピクセルスタジオ** | マルチ比率＆マルチ密度ピクセルグリッド変換器、32色ユニバーサル8-Bitレトロパレット＆ペイントバイナンバー搭載 |
| 🔓 **QRアンロッカー** | アバターQRコード設定＆権限解除——単体編集＆バッチZIPエクスポート（自動検出） |
| 🎵 **ボイスラボ** | 8-Bit音声合成（5プリセット）、カスタムフレーズTTS、性格マトリックス、関係性ランキング（最大15人） |

### 🔒 プライバシーファースト設計

- **100%クライアントサイド**——バックエンドサーバーなし、データベースなし、データアップロードなし
- すべての画像処理、バイナリデコード、音声合成はローカルで実行
- 住民名簿は `localStorage` のみ——デバイスから一切送信されません

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

LifeSimGrid es un kit de herramientas web gratuito, de código abierto y 100% del lado del cliente para fans de los juegos de simulación de vida. Sin registro, sin servidores, sin recopilación de datos — todo se procesa en tu navegador.

### ✨ Tres Estudios Principales

| Estudio | Descripción |
|---------|-------------|
| 🎨 **Estudio de Píxeles** | Convertidor de cuadrícula de píxeles multi-proporción y multi-densidad con paleta retro 8-Bit de 32 colores y modo pintar por números |
| 🔓 **Desbloqueador QR** | Configurador de códigos QR de avatares y desbloqueador de permisos — edición individual y exportación ZIP por lotes |
| 🎵 **Lab de Voz** | Síntesis de voz 8-bit con 5 presets, TTS de frases personalizadas, matriz de personalidad y tabla de relaciones (hasta 15 residentes) |

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

LifeSimGrid est une boîte à outils web gratuite, open source et 100% côté client pour les fans de jeux de simulation de vie. Sans inscription, sans serveur, sans collecte de données — tout se passe dans votre navigateur.

### ✨ Trois Studios Principaux

| Studio | Description |
|--------|-------------|
| 🎨 **Studio Pixel** | Convertisseur de grille pixel multi-ratio et multi-densité avec palette rétro 8-Bit de 32 couleurs et mode peinture par numéros |
| 🔓 **Débloqueur QR** | Configurateur de codes QR d'avatars et débloqueur de permissions — édition unitaire et export ZIP par lots |
| 🎵 **Lab Vocal** | Synthèse vocale 8-bit avec 5 préréglages, TTS de phrases personnalisées, matrice de personnalité et classement de relations (jusqu'à 15 résidents) |

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

LifeSimGrid는 라이프 시뮬레이션 게임 팬들을 위한 무료 오픈소스 100% 클라이언트 사이드 웹 툴킷입니다. 가입 불필요, 서버 불필요, 데이터 수집 없음 — 모든 것이 브라우저에서 실행됩니다.

### ✨ 세 가지 핵심 스튜디오

| 스튜디오 | 설명 |
|----------|------|
| 🎨 **픽셀 스튜디오** | 멀티 비율 & 멀티 밀도 픽셀 그리드 변환기, 32색 범용 8-Bit 레트로 팔레트 및 페인트 바이 넘버 모드 탑재 |
| 🔓 **QR 언록커** | 아바타 QR 코드 설정 및 권한 해제 — 단일 편집 & 배치 ZIP 내보내기 (자동 감지) |
| 🎵 **음성 랩** | 8-Bit 음성 합성 (5가지 프리셋), 커스텀 문구 TTS, 성격 매트릭스, 관계 리더보드 (최대 15명) |

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

LifeSimGrid ist ein kostenloses, Open-Source, 100% clientseitiges Web-Toolkit für Life-Simulation-Fans. Keine Anmeldung, keine Server, keine Datenerfassung — alles läuft direkt in deinem Browser.

### ✨ Drei Kern-Studios

| Studio | Beschreibung |
|--------|-------------|
| 🎨 **Pixel-Studio** | Multi-Ratio- & Multi-Dichte-Pixelraster-Konverter mit 32-Farben-Universal-8-Bit-Retro-Palette und Mal-nach-Zahlen-Modus |
| 🔓 **QR-Entsperrer** | Avatar-QR-Code-Konfigurator & Berechtigungsentsperrer — Einzeldatei-Bearbeitung & Batch-ZIP-Export |
| 🎵 **Sprach-Lab** | 8-Bit-Sprachsynthese mit 5 Presets, Custom-Phrase-TTS, Persönlichkeitsmatrix und Beziehungs-Rangliste (bis zu 15 Bewohner) |

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

LifeSimGrid è un toolkit web gratuito, open source e 100% lato client per i fan dei giochi di simulazione di vita. Senza registrazione, senza server, senza raccolta dati — tutto funziona nel tuo browser.

### ✨ Tre Studi Principali

| Studio | Descrizione |
|--------|-------------|
| 🎨 **Studio Pixel** | Convertitore di griglia pixel multi-rapporto e multi-densità con palette retro 8-Bit a 32 colori e modalità dipingi per numeri |
| 🔓 **Sbloccatore QR** | Configuratore di codici QR avatar e sbloccatore di permessi — modifica singola ed esportazione ZIP in batch |
| 🎵 **Lab Vocale** | Sintesi vocale 8-bit con 5 preset, TTS di frasi personalizzate, matrice di personalità e classifica relazioni (fino a 15 residenti) |

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

LifeSimGrid is een gratis, open-source, 100% aan de clientzijde web-toolkit voor levenssimulatie-gamefans. Geen registratie, geen servers, geen gegevensverzameling — alles draait rechtstreeks in je browser.

### ✨ Drie Kernstudio's

| Studio | Beschrijving |
|--------|-------------|
| 🎨 **Pixelstudio** | Multi-ratio- & multi-dichtheid pixelraster-converter met 32-kleuren universele 8-Bit retro-palette en schilder-op-nummer-modus |
| 🔓 **QR-ontgrendelaar** | Avatar QR-code configurator & machtigingsontgrendelaar — enkelbestand bewerking & batch ZIP-export |
| 🎵 **Stemlab** | 8-Bit stemsynthese met 5 presets, custom-zin TTS, persoonlijkheidsmatrix en relatie-ranglijst (tot 15 bewoners) |

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

LifeSimGrid 是一款免费、开源、100%纯前端的网页工具箱，专为生活模拟游戏爱好者打造。免注册、免服务器、零数据收集——所有处理都在你的浏览器中完成。

### ✨ 三大核心工作室

| 工作室 | 说明 |
|--------|------|
| 🎨 **像素工作室** | 多比例×多密度像素网格转换器，内置 32 色通用 8-Bit 复古掌机色盘与数字填色模式 |
| 🔓 **QR 修改器** | 虚拟化身 QR 码自动检测解锁器——单文件编辑＆批量 ZIP 导出 |
| 🎵 **语音实验室** | 8-Bit 语音合成（5 种声线预设）、自定义台词 TTS、性格坐标矩阵、配对天梯榜（最多 15 位居民） |

### 🔒 隐私优先架构

- **100%纯前端**——无后端服务器、无数据库、零数据上传
- 所有图片处理、二进制解码与语音合成均在本地完成
- 居民名册仅存于 `localStorage`——从不离开你的设备
- 开源代码——可在 GitHub 完整审计

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
