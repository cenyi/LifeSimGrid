"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useMemo } from "react";
import {
  Shield, ArrowRight, Heart, Users, Star,
  Search, Utensils, Check, Trash2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import {
  PERSONALITIES,
  getPersonalityGroup,
} from "@/lib/types";
import { getPersonalityLabelKey } from "@/lib/personality-data";
import {
  FOODS,
  FOOD_CATEGORIES,
  type FoodItem,
  type FoodCategory,
  type MiiReaction,
  reactionForKnownFavorite,
} from "@/lib/food-data";

/* ------------------------------------------------------------------ */
/*  localStorage helpers                                               */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "lifesimgrid-food-tracker";

interface FoodTracker {
  /** food id → { tested: boolean; reaction: MiiReaction | null; notes?: string } */
  tested: Record<string, { tested: boolean; reaction: MiiReaction | null }>;
}

function loadTracker(): FoodTracker {
  if (typeof window === "undefined") return { tested: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { tested: {} };
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.tested === "object") return parsed as FoodTracker;
    return { tested: {} };
  } catch {
    return { tested: {} };
  }
}

function saveTracker(t: FoodTracker) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(t));
  } catch {
    /* ignore */
  }
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Reaction → localized label key. */
function reactionLabelKey(r: MiiReaction): string {
  return `reaction${r.charAt(0).toUpperCase()}${r.slice(1)}`;
}

/** Reaction → Tailwind color class. */
function reactionColorClass(r: MiiReaction): string {
  switch (r) {
    case "love": return "bg-green-100 text-green-700 border-green-200";
    case "like": return "bg-blue-100 text-blue-700 border-blue-200";
    case "neutral": return "bg-gray-100 text-gray-600 border-gray-200";
    case "dislike": return "bg-amber-100 text-amber-700 border-amber-200";
    case "hate": return "bg-red-100 text-red-700 border-red-200";
  }
}

/** Category i18n key. */
function categoryLabelKey(c: FoodCategory): string {
  return `category${c.charAt(0).toUpperCase()}${c.slice(1)}`;
}

/** Builds a stable 4-personality sample (one per group) for reaction table. */
function buildGroupSample(): { key: string; group: string; labelKey: string }[] {
  const groups: { key: string; group: string }[] = [
    { key: "outgoing_leader", group: "outgoing" },
    { key: "confident_goGetter", group: "confident" },
    { key: "independent_thinker", group: "independent" },
    { key: "easygoing_buddy", group: "easygoing" },
  ];
  return groups.map((g) => ({
    key: g.key,
    group: g.group,
    labelKey: getPersonalityLabelKey(g.key),
  }));
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function TomodachiLifeFoodChartPage() {
  const t = useTranslations("TomodachiLifeFoodChartPage");
  const tMbti = useTranslations("TomodachiLifeMbtiPage");
  const locale = useLocale();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<FoodCategory | "all">("all");
  const [favoriteFoodId, setFavoriteFoodId] = useState<string>("");
  const [dislikedFoodId, setDislikedFoodId] = useState<string>("");
  const [personalityKey, setPersonalityKey] = useState<string>("outgoing_leader");
  // Lazy-init from localStorage (loadTracker is SSR-safe: returns empty on the server).
  const [tracker, setTracker] = useState<FoodTracker>(loadTracker);

  const sample = useMemo(() => buildGroupSample(), []);
  const selectedGroup = getPersonalityGroup(personalityKey);
  const selectedSample = sample.find((s) => s.key === personalityKey);

  /* Filtered foods */
  const filteredFoods = useMemo(() => {
    const q = search.trim().toLowerCase();
    return FOODS.filter((f) => {
      if (activeCategory !== "all" && f.category !== activeCategory) return false;
      if (q && !f.name.toLowerCase().includes(q) && !f.id.includes(q)) return false;
      return true;
    });
  }, [search, activeCategory]);

  /* Tracker stats */
  const testedCount = Object.values(tracker.tested).filter((v) => v.tested).length;
  const totalFoods = FOODS.length;
  const loveCount = Object.values(tracker.tested).filter((v) => v.reaction === "love").length;
  const hateCount = Object.values(tracker.tested).filter((v) => v.reaction === "hate").length;

  /* Recommended = highest affinity for selected group, excluding already-loved */
  const recommendedFoods = useMemo(() => {
    return [...FOODS]
      .map((f) => ({ food: f, score: f.affinity[selectedGroup] ?? 50 }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((x) => x.food);
  }, [selectedGroup]);

  /* Handlers */
  function toggleTested(foodId: string) {
    setTracker((prev) => {
      const cur = prev.tested[foodId];
      const next = {
        ...prev,
        tested: {
          ...prev.tested,
          [foodId]: {
            tested: !cur?.tested,
            reaction: cur?.reaction ?? null,
          },
        },
      };
      saveTracker(next);
      return next;
    });
  }

  function setReaction(foodId: string, r: MiiReaction) {
    setTracker((prev) => {
      const next = {
        ...prev,
        tested: {
          ...prev.tested,
          [foodId]: {
            tested: true,
            reaction: r,
          },
        },
      };
      saveTracker(next);
      return next;
    });
  }

  function clearTracker() {
    const empty = { tested: {} };
    setTracker(empty);
    saveTracker(empty);
  }

  /* JSON-LD: BreadcrumbList + WebApplication + FAQPage (3 blocks) */
  const base = "https://lifesimgrid.org";
  const prefix = locale === "en" ? "" : `/${locale}`;
  const pageUrl = `${base}${prefix}/tomodachi-life-food-chart`;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("navHome"), item: `${base}${prefix}` },
      { "@type": "ListItem", position: 2, name: "Tomodachi Life Tools", item: `${base}${prefix}/tomodachi-life-mbti` },
      { "@type": "ListItem", position: 3, name: t("pageTitle"), item: pageUrl },
    ],
  };
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Tomodachi Life Food Chart & Tracker",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: t("metaDesc"),
    url: pageUrl,
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: t("faq1Q"), acceptedAnswer: { "@type": "Answer", text: t("faq1A") } },
      { "@type": "Question", name: t("faq2Q"), acceptedAnswer: { "@type": "Answer", text: t("faq2A") } },
      { "@type": "Question", name: t("faq3Q"), acceptedAnswer: { "@type": "Answer", text: t("faq3A") } },
      { "@type": "Question", name: t("faq4Q"), acceptedAnswer: { "@type": "Answer", text: t("faq4A") } },
    ],
  };

  /* Render a food row. */
  function renderFoodRow(food: FoodItem) {
    const status = tracker.tested[food.id];
    const prediction = reactionForKnownFavorite(
      food,
      selectedGroup,
      favoriteFoodId || null,
      dislikedFoodId || null
    );
    const tested = status?.tested ?? false;
    const reaction = status?.reaction ?? null;
    return (
      <div key={food.id} className="flex flex-col gap-2 border-b border-gray-100 py-3 last:border-0 sm:flex-row sm:items-center sm:gap-4">
        {/* Name + category */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 text-sm">{food.name}</span>
            {food.commonFavorite && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                {t("commonFavorite")}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500">{t(categoryLabelKey(food.category))}</span>
        </div>

        {/* Predicted reaction (heuristic) */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{t("predictedFor")} {selectedSample?.group ? tMbti(`group${selectedSample.group.charAt(0).toUpperCase()}${selectedSample.group.slice(1)}`) : ""}:</span>
          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${reactionColorClass(prediction)}`}>
            {t(reactionLabelKey(prediction))}
          </span>
        </div>

        {/* Tracker controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => toggleTested(food.id)}
            aria-pressed={tested}
            title={tested ? t("markUnTested") : t("markTested")}
            className={`flex h-7 w-7 items-center justify-center rounded-lg border transition-all ${
              tested
                ? "border-island-blue bg-island-blue/10 text-island-blue"
                : "border-gray-200 text-gray-400 hover:border-gray-300"
            }`}
          >
            <Check className="h-3.5 w-3.5" />
          </button>
          {MII_REACTIONS_SHORT.map((r) => (
            <button
              key={r}
              onClick={() => setReaction(food.id, r)}
              aria-pressed={reaction === r}
              title={t(reactionLabelKey(r))}
              className={`flex h-7 w-7 items-center justify-center rounded-lg border text-xs font-bold transition-all ${
                reaction === r
                  ? reactionColorClass(r)
                  : "border-gray-200 text-gray-400 hover:border-gray-300"
              }`}
            >
              {reactionShortLabel(r)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* Short reaction labels for compact buttons (localized) */
  function reactionShortLabel(r: MiiReaction): string {
    const map: Record<MiiReaction, string> = {
      love: "♥", like: "▲", neutral: "–", dislike: "▼", hate: "✕",
    };
    return map[r];
  }
  const MII_REACTIONS_SHORT: MiiReaction[] = ["love", "like", "neutral", "dislike", "hate"];

  /* Personality selector options (all 16, grouped) */
  const personalityOptions = useMemo(() => PERSONALITIES.map((p) => ({
    key: p,
    label: tMbti(getPersonalityLabelKey(p)),
    group: getPersonalityGroup(p),
  })), [tMbti]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/<\/script/g, "<\\/script") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd).replace(/<\/script/g, "<\\/script") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/<\/script/g, "<\\/script") }}
        />

        {/* Hero */}
        <section aria-labelledby="food-hero-title" className="mx-auto max-w-6xl px-4 pt-10 pb-6 text-center">
          <nav aria-label="Breadcrumb" className="mb-3 flex justify-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-gray-600 transition-colors">{t("navHome")}</Link>
            <span>/</span>
            <span className="text-gray-600">{t("navFood")}</span>
          </nav>
          <h1 id="food-hero-title" className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            {t("pageTitle")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed">
            {t("subtitle")}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-100">
              <Shield className="h-3.5 w-3.5" /> {t("privacyBadge")}
            </span>
          </div>
        </section>

        {/* Favorite / Disliked food picker */}
        <section aria-labelledby="food-fav-title" className="mx-auto max-w-4xl px-4 py-6">
          <h2 id="food-fav-title" className="mb-4 text-xl sm:text-2xl font-bold text-gray-900">{t("favDislikeTitle")}</h2>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <p className="text-xs text-gray-500 mb-4">{t("favDislikeHint")}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("favoriteLabel")}</label>
                <select
                  value={favoriteFoodId}
                  onChange={(e) => setFavoriteFoodId(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-island-blue"
                >
                  <option value="">{t("favoriteNone")}</option>
                  {FOODS.map((f) => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dislikedLabel")}</label>
                <select
                  value={dislikedFoodId}
                  onChange={(e) => setDislikedFoodId(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-island-blue"
                >
                  <option value="">{t("dislikedNone")}</option>
                  {FOODS.map((f) => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Recommendation */}
        <section aria-labelledby="food-reco-title" className="mx-auto max-w-4xl px-4 py-6">
          <h2 id="food-reco-title" className="mb-4 text-xl sm:text-2xl font-bold text-gray-900">
            {t("recoTitle")}
          </h2>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <div className="mb-4">
              <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("personalityLabel")}</label>
              <select
                value={personalityKey}
                onChange={(e) => setPersonalityKey(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-island-blue"
              >
                {personalityOptions.map((p) => (
                  <option key={p.key} value={p.key}>{p.label}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {recommendedFoods.map((f) => (
                <div key={f.id} className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <div className="text-sm font-semibold text-gray-900">{f.name}</div>
                  <div className="mt-1 font-mono text-xs text-gray-500">{f.affinity[selectedGroup] ?? 50}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-500">{t("recoHint")}</p>
          </div>
        </section>

        {/* Search + Category Filter */}
        <section aria-labelledby="food-db-title" className="mx-auto max-w-4xl px-4 py-6">
          <h2 id="food-db-title" className="mb-4 text-xl sm:text-2xl font-bold text-gray-900">{t("dbTitle")}</h2>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-island-blue"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveCategory("all")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === "all" ? "bg-island-blue text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t("all")}
              </button>
              {FOOD_CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                    activeCategory === c ? "bg-island-blue text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {t(categoryLabelKey(c))}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Food List + Tracker */}
        <section aria-labelledby="food-list-title" className="mx-auto max-w-4xl px-4 py-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 id="food-list-title" className="text-base font-bold text-gray-700">
              {t("listTitle")} <span className="text-gray-400">({filteredFoods.length})</span>
            </h2>
            <button
              onClick={clearTracker}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="h-3 w-3" /> {t("clearTracker")}
            </button>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white px-4 shadow-sm">
            {filteredFoods.length === 0 ? (
              <p className="py-6 text-center text-sm text-gray-500">{t("noResults")}</p>
            ) : (
              filteredFoods.map(renderFoodRow)
            )}
          </div>
        </section>

        {/* Tracker Progress */}
        <section aria-labelledby="food-progress-title" className="mx-auto max-w-4xl px-4 py-4">
          <h2 id="food-progress-title" className="sr-only">{t("progressTitle")}</h2>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">{t("progressTitle")}</h3>
              <span className="font-mono text-xs text-gray-500">{testedCount} / {totalFoods} · {Math.round((testedCount / Math.max(totalFoods,1)) * 100)}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-island-blue transition-all duration-500"
                style={{ width: `${(testedCount / Math.max(totalFoods, 1)) * 100}%` }}
              />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-green-50 p-2">
                <div className="font-mono text-xl font-bold text-green-600">{loveCount}</div>
                <div className="text-xs text-gray-500">{t("progressLove")}</div>
              </div>
              <div className="rounded-lg bg-amber-50 p-2">
                <div className="font-mono text-xl font-bold text-amber-600">{hateCount}</div>
                <div className="text-xs text-gray-500">{t("progressHate")}</div>
              </div>
              <div className="rounded-lg bg-blue-50 p-2">
                <div className="font-mono text-xl font-bold text-island-blue">{testedCount - loveCount - hateCount}</div>
                <div className="text-xs text-gray-500">{t("progressOther")}</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section aria-labelledby="food-how-title" className="mx-auto max-w-4xl px-4 py-6">
          <h2 id="food-how-title" className="mb-4 text-xl sm:text-2xl font-bold text-gray-900">{t("howTitle")}</h2>
          <ol className="space-y-3">
            <li className="flex gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-sunshine font-mono text-sm font-bold text-gray-900">1</span>
              <p className="text-sm text-gray-600">{t("howStep1")}</p>
            </li>
            <li className="flex gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-sunshine font-mono text-sm font-bold text-gray-900">2</span>
              <p className="text-sm text-gray-600">{t("howStep2")}</p>
            </li>
            <li className="flex gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-sunshine font-mono text-sm font-bold text-gray-900">3</span>
              <p className="text-sm text-gray-600">{t("howStep3")}</p>
            </li>
          </ol>
        </section>

        {/* FAQ */}
        <section aria-labelledby="food-faq-title" className="mx-auto max-w-4xl px-4 py-6">
          <h2 id="food-faq-title" className="mb-4 text-xl sm:text-2xl font-bold text-gray-900">{t("faqTitle")}</h2>
          <div className="space-y-3">
            <details className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-semibold text-gray-900">{t("faq1Q")}</summary>
              <p className="mt-2 text-sm text-gray-600">{t("faq1A")}</p>
            </details>
            <details className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-semibold text-gray-900">{t("faq2Q")}</summary>
              <p className="mt-2 text-sm text-gray-600">{t("faq2A")}</p>
            </details>
            <details className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-semibold text-gray-900">{t("faq3Q")}</summary>
              <p className="mt-2 text-sm text-gray-600">{t("faq3A")}</p>
            </details>
            <details className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-semibold text-gray-900">{t("faq4Q")}</summary>
              <p className="mt-2 text-sm text-gray-600">{t("faq4A")}</p>
            </details>
          </div>
        </section>

        {/* Model disclaimer */}
        <section aria-labelledby="food-disclaimer-title" className="mx-auto max-w-4xl px-4 py-4">
          <h2 id="food-disclaimer-title" className="sr-only">{t("disclaimerTitle")}</h2>
          <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 text-xs text-amber-800">
            <p className="flex items-start gap-2">
              <Shield className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{t("modelDisclaimer")}</span>
            </p>
          </div>
        </section>

        {/* CTA */}
        <section aria-labelledby="food-cta-title" className="mx-auto max-w-4xl px-4 py-6">
          <h2 id="food-cta-title" className="mb-4 text-xl sm:text-2xl font-bold text-gray-900">{t("ctaTitle")}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/tomodachi-life-personality-chart" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
              <Star className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-medium text-gray-900">{t("ctaChart")}</span>
              <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
            </Link>
            <Link href="/tomodachi-life-mbti" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
              <Users className="h-5 w-5 text-red-400" />
              <span className="text-sm font-medium text-gray-900">{t("ctaMbti")}</span>
              <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
            </Link>
            <Link href="/tomodachi-life-compatibility" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
              <Heart className="h-5 w-5 text-pink-500" />
              <span className="text-sm font-medium text-gray-900">{t("ctaCompat")}</span>
              <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
            </Link>
            <Link href="/tomodachi-character-ideas" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
              <Utensils className="h-5 w-5 text-teal-500" />
              <span className="text-sm font-medium text-gray-900">{t("ctaIdeas")}</span>
              <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
