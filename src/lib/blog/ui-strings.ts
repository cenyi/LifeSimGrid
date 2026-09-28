/**
 * LifeSimGrid — Blog UI chrome strings (per-locale)
 *
 * Article CONTENT lives in per-locale post files (posts/<locale>/…);
 * this module only holds the page chrome around it (index hero,
 * breadcrumb labels, reading time, related-posts section) plus the
 * blog index meta tags — so the /[locale]/blog pages need zero new
 * keys in the 12 locale JSONs (key-set parity is untouched).
 *
 * Exhaustive by design (AGENTS.md rule): Record<NonEnLocale, …> fails
 * the build when a locale is appended to LOCALES without a blog entry.
 *
 * Meta length limits (SERP pixel-based): CJK titles 25–28字 / descs
 * ≤75字; de 40–45 / ≤135; es/fr/it/nl 50–55 / ≤150.
 */

import type { NonEnLocale } from "@/i18n/routing";
import type { BlogPost } from "./types";
import { wordCount } from "./posts-en";

export interface BlogUiStrings {
  /** Small amber kicker above the index H1 ("LifeSimGrid Blog"). */
  indexTag: string;
  /** Blog index H1. */
  indexTitle: string;
  /** Blog index hero paragraph. */
  indexIntro: string;
  /** sr-only H2 above the post grid. */
  allArticles: string;
  /** Blog index meta title (without the " | LifeSimGrid" suffix). */
  metaTitle: string;
  /** Blog index meta description. */
  metaDesc: string;
  /** Breadcrumb: home label. */
  home: string;
  /** Breadcrumb: blog label. */
  blog: string;
  /** Reading-time label, e.g. "5 min read". */
  minRead: (minutes: number) => string;
  /** Related-posts section H2. */
  moreGuides: string;
  /** Related-post card CTA. */
  read: string;
}

/** English chrome (also the fallback for unregistered locales). */
const EN: BlogUiStrings = {
  indexTag: "LifeSimGrid Blog",
  indexTitle: "Deep guides for ACNH, Mii & Tomodachi Life players",
  indexIntro:
    "Technical deep dives into the formats, algorithms, and game systems behind our tools — written from the same code that runs them. No fluff, no rehashed wiki pages: byte layouts, scoring formulas, and step-by-step methods you can verify yourself.",
  allArticles: "All articles",
  metaTitle: "Blog — ACNH, Mii & Tomodachi Life Guides",
  metaDesc:
    "Deep technical guides for ACNH custom designs, Mii QR codes, and Tomodachi Life systems — written from the code that powers our free browser tools.",
  home: "Home",
  blog: "Blog",
  minRead: (n) => `${n} min read`,
  moreGuides: "More guides",
  read: "Read",
};

/** Localized chrome. Exhaustive over NonEnLocale — a new locale without an entry fails the build. */
export const BLOG_UI: Record<NonEnLocale, BlogUiStrings> = {
  "zh-Hant": {
    indexTag: "LifeSimGrid 部落格",
    indexTitle: "寫給動森、Mii 與朋友聚會玩家的深度指南",
    indexIntro:
      "深入解析工具背後的格式、演算法與遊戲系統——全部改寫自實際執行的程式碼。位元組布局、評分公式、可自行驗證的步驟方法，沒有廢話，也不是維基百科的二手整理。",
    allArticles: "所有文章",
    metaTitle: "部落格 — 動森・Mii・朋友聚會深度指南",
    metaDesc:
      "ACNH我的設計、Mii QR碼與朋友聚會 新生活系統的技術深度指南，改寫自工具實際程式碼，100%純前端免費。",
    home: "首頁",
    blog: "部落格",
    minRead: (n) => `約 ${n} 分鐘`,
    moreGuides: "更多指南",
    read: "閱讀",
  },
  "zh-CN": {
    indexTag: "LifeSimGrid 博客",
    indexTitle: "写给动森、Mii 与朋友聚会玩家的深度指南",
    indexIntro:
      "深入解析工具背后的格式、算法与游戏系统——全部改写自实际运行的源代码。字节布局、评分公式、可自行验证的步骤方法，没有废话，也不是百科的二手整理。",
    allArticles: "所有文章",
    metaTitle: "博客 — 动森・Mii・朋友聚会深度指南",
    metaDesc:
      "ACNH我的设计、Mii二维码与朋友聚会 新生活系统的技术深度指南，改写自工具实际源代码，100%纯前端免费。",
    home: "首页",
    blog: "博客",
    minRead: (n) => `约 ${n} 分钟`,
    moreGuides: "更多指南",
    read: "阅读",
  },
  ja: {
    indexTag: "LifeSimGrid ブログ",
    indexTitle: "どうぶつの森・Mii・トモダチコレクションプレイヤーのための深掘りガイド",
    indexIntro:
      "ツールの裏側にあるフォーマット・アルゴリズム・ゲームシステムを深く掘り下げる技術解説。実際に動いているコードから書かれているので、バイト構成からスコア計算式まで、自分の手で検証できます。",
    allArticles: "すべての記事",
    metaTitle: "ブログ — どうぶつの森・Mii・トモダチ攻略ガイド",
    metaDesc:
      "マイデザイン、Mii QR、トモダチコレクション 新生活の仕組みを深掘りする技術ガイド。ツールと同じコードから書かれた無料解説。",
    home: "ホーム",
    blog: "ブログ",
    minRead: (n) => `約${n}分`,
    moreGuides: "その他のガイド",
    read: "読む",
  },
  ko: {
    indexTag: "LifeSimGrid 블로그",
    indexTitle: "동물의 숲・Mii・Tomodachi Life 플레이어를 위한 심화 가이드",
    indexIntro:
      "도구 뒤편의 포맷, 알고리즘, 게임 시스템을 깊이 파헤치는 기술 해설. 실제 돌아가는 코드에서 직접 작성했기 때문에 바이트 레이아웃부터 점수 공식까지 직접 검증할 수 있습니다.",
    allArticles: "모든 글",
    metaTitle: "블로그 — 동물의 숲・Mii 심화 가이드",
    metaDesc:
      "커스텀 디자인, Mii QR, Tomodachi Life 시스템을 깊이 파헤치는 기술 가이드. 도구와 같은 코드에서 작성된 무료 해설.",
    home: "홈",
    blog: "블로그",
    minRead: (n) => `약 ${n}분`,
    moreGuides: "더 보기",
    read: "읽기",
  },
  de: {
    indexTag: "LifeSimGrid Blog",
    indexTitle: "Tiefen-Guides für ACNH-, Mii- & Tomodachi-Life-Spieler",
    indexIntro:
      "Technische Deep-Dives in die Formate, Algorithmen und Spielsysteme hinter unseren Tools — geschrieben aus dem Code, der sie antreibt. Keine Floskeln, keine kopierten Wiki-Seiten: Byte-Layouts, Scoring-Formeln und Schritt-für-Schritt-Methoden zum Selbst-Nachprüfen.",
    allArticles: "Alle Artikel",
    metaTitle: "Blog — ACNH-, Mii- & Tomodachi-Life-Guides",
    metaDesc:
      "Technische Deep-Dives zu ACNH Custom Designs, Mii QR und Tomodachi Life — geschrieben aus dem Code unserer Browser-Tools.",
    home: "Startseite",
    blog: "Blog",
    minRead: (n) => `${n} Min. Lesezeit`,
    moreGuides: "Weitere Guides",
    read: "Lesen",
  },
  es: {
    indexTag: "Blog de LifeSimGrid",
    indexTitle: "Guías profundas para jugadores de ACNH, Mii y Tomodachi Life",
    indexIntro:
      "Análisis técnicos de los formatos, algoritmos y sistemas de juego detrás de nuestras herramientas, escritos desde el mismo código que los ejecuta. Sin relleno ni wikis recicladas: estructuras de bytes, fórmulas de puntuación y métodos paso a paso que puedes verificar tú mismo.",
    allArticles: "Todos los artículos",
    metaTitle: "Blog — Guías de ACNH, Mii y Tomodachi Life",
    metaDesc:
      "Guías técnicas sobre Custom Designs, Mii QR y los sistemas de Tomodachi Life, escritas desde el código de nuestras herramientas.",
    home: "Inicio",
    blog: "Blog",
    minRead: (n) => `${n} min de lectura`,
    moreGuides: "Más guías",
    read: "Leer",
  },
  fr: {
    indexTag: "Blog LifeSimGrid",
    indexTitle: "Guides approfondis pour les joueurs ACNH, Mii et Tomodachi Life",
    indexIntro:
      "Analyses techniques des formats, algorithmes et systèmes de jeu derrière nos outils, écrites à partir du même code qui les exécute. Sans blabla ni wikis recyclées : disposition des octets, formules de score et méthodes pas à pas que vous pouvez vérifier vous-même.",
    allArticles: "Tous les articles",
    metaTitle: "Blog — Guides ACNH, Mii et Tomodachi Life",
    metaDesc:
      "Guides techniques sur les Custom Designs, Mii QR et les systèmes de Tomodachi Life, écrits à partir du code de nos outils.",
    home: "Accueil",
    blog: "Blog",
    minRead: (n) => `${n} min de lecture`,
    moreGuides: "D'autres guides",
    read: "Lire",
  },
  it: {
    indexTag: "Blog di LifeSimGrid",
    indexTitle: "Guide approfondite per giocatori di ACNH, Mii e Tomodachi Life",
    indexIntro:
      "Analisi tecniche di formati, algoritmi e sistemi di gioco dei nostri strumenti, scritte dallo stesso codice che li esegue. Senza giri di parole né pagine wiki riciclate: layout di byte, formule di punteggio e metodi passo a passo che puoi verificare tu stesso.",
    allArticles: "Tutti gli articoli",
    metaTitle: "Blog — Guide ACNH, Mii e Tomodachi Life",
    metaDesc:
      "Guide tecniche su Custom Designs, Mii QR e i sistemi di Tomodachi Life, scritte dal codice dei nostri strumenti.",
    home: "Home",
    blog: "Blog",
    minRead: (n) => `${n} min di lettura`,
    moreGuides: "Altre guide",
    read: "Leggi",
  },
  nl: {
    indexTag: "LifeSimGrid Blog",
    indexTitle: "Diepgaande gidsen voor ACNH-, Mii- en Tomodachi Life-spelers",
    indexIntro:
      "Technische duik in de formaten, algoritmes en spelsystemen achter onze tools — geschreven vanuit de code die ze aandrijft. Geen vulling of gerecyclede wiki's: byte-indelingen, scoreformules en stapsgewijze methodes die je zelf kunt verifiëren.",
    allArticles: "Alle artikelen",
    metaTitle: "Blog — ACNH-, Mii- en Tomodachi Life-gidsen",
    metaDesc:
      "Technische gidsen over ACNH Custom Designs, Mii QR en Tomodachi Life-systemen, geschreven vanuit de code van onze tools.",
    home: "Home",
    blog: "Blog",
    minRead: (n) => `${n} min leestijd`,
    moreGuides: "Meer gidsen",
    read: "Lezen",
  },
  ru: {
    indexTag: "Блог LifeSimGrid",
    indexTitle: "Глубокие гайды для игроков ACNH, Mii и Tomodachi Life",
    indexIntro:
      "Технический разбор форматов, алгоритмов и игровых систем, стоящих за нашими инструментами, — написан по тому же коду, который их запускает. Без воды и переписанных вики: байтовые структуры, формулы подсчёта и пошаговые методы, которые легко проверить самому.",
    allArticles: "Все статьи",
    metaTitle: "Блог — гайды по ACNH, Mii и Tomodachi Life",
    metaDesc:
      "Технические гайды по Custom Designs, Mii QR и системам Tomodachi Life, написанные по коду наших инструментов.",
    home: "Главная",
    blog: "Блог",
    minRead: (n) => `${n} мин чтения`,
    moreGuides: "Другие гайды",
    read: "Читать",
  },
  pt: {
    indexTag: "Blog do LifeSimGrid",
    indexTitle: "Guias detalhadas para jogadores de ACNH, Mii e Tomodachi Life",
    indexIntro:
      "Análises técnicas dos formatos, algoritmos e sistemas por trás das nossas ferramentas, escritas a partir do mesmo código que as executa. Sem enrolação nem wikis recicladas: layouts de bytes, fórmulas de pontuação e métodos passo a passo que você pode verificar.",
    allArticles: "Todos os artigos",
    metaTitle: "Blog — Guias de ACNH, Mii e Tomodachi Life",
    metaDesc:
      "Guias técnicas sobre Custom Designs, Mii QR e os sistemas de Tomodachi Life, escritas a partir do código das nossas ferramentas.",
    home: "Início",
    blog: "Blog",
    minRead: (n) => `${n} min de leitura`,
    moreGuides: "Mais guias",
    read: "Ler",
  },
};

/** Chrome strings for a locale (EN fallback for locales without an entry). */
export function getBlogUi(locale: string): BlogUiStrings {
  return BLOG_UI[locale as NonEnLocale] ?? EN;
}

/* ------------------------------------------------------------------ */
/*  Locale-aware formatting helpers                                    */
/* ------------------------------------------------------------------ */

/** Locales written without spaces between words → reading time uses characters. */
const CJK_LOCALES = new Set(["zh-Hant", "zh-CN", "ja", "ko"]);

/** "September 27, 2026" (en) / "27 de setembro de 2026" (pt) / "2026年9月27日" (ja). */
export function formatBlogDate(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

/** Total character count of a post's text (for CJK reading-time estimates). */
function postCharCount(post: BlogPost): number {
  let chars = 0;
  for (const b of post.blocks) {
    switch (b.type) {
      case "p":
      case "h2":
      case "h3":
      case "code":
      case "callout":
        chars += b.text.length;
        break;
      case "ul":
      case "ol":
        chars += b.items.join("").length;
        break;
      case "table":
        chars += [...b.headers, ...b.rows.flat()].join("").length;
        break;
    }
  }
  return chars;
}

/** Reading time at ~220 wpm (Latin scripts) or ~500 cpm (CJK), minimum 1 minute. */
export function readingMinutesFor(post: BlogPost, locale: string): number {
  if (CJK_LOCALES.has(locale)) {
    return Math.max(1, Math.round(postCharCount(post) / 500));
  }
  return Math.max(1, Math.round(wordCount(post) / 220));
}
