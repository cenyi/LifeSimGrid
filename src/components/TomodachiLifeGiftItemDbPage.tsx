"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useMemo, useCallback } from "react";
import {
  Shield, ArrowRight, Share2, Gift, Users,
  Sparkles, Lightbulb, Heart, Search, Trash2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import {
  PERSONALITIES,
  getPersonalityGroup,
  getMbtiCode,
} from "@/lib/types";
import { getGroupColor, getPersonalityLabelKey } from "@/lib/personality-data";
import {
  GIFT_CATEGORIES,
  GIFTS,
  bestCategoriesFor,
  topReceiversFor,
  randomGift,
  bestGiftInCategory,
  type GiftCategory,
} from "@/lib/gift-data";

const STORAGE_KEY = "lifesimgrid-gift-wishlist";

function loadWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveWishlist(list: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

export default function TomodachiLifeGiftItemDbPage() {
  const t = useTranslations("TomodachiLifeGiftItemDbPage");
  const tMbti = useTranslations("TomodachiLifeMbtiPage");
  const locale = useLocale();

  const [wishlist, setWishlist] = useState<string[]>(loadWishlist);
  const [finderPersonality, setFinderPersonality] = useState("outgoing_leader");
  const [finderCategory, setFinderCategory] = useState<GiftCategory>("toy");
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState<GiftCategory | "all">("all");

  // Re-roll the random picker (reroll button replaces the current pick).
  const [randomPick, setRandomPick] = useState(randomGift);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      saveWishlist(next);
      return next;
    });
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlist([]);
    saveWishlist([]);
  }, []);

  const finderResult = useMemo(
    () => bestCategoriesFor(finderPersonality).filter((c) => c.category === finderCategory)[0],
    [finderPersonality, finderCategory]
  );

  const finderBestGift = useMemo(
    () => (finderResult ? bestGiftInCategory(finderCategory, finderPersonality) : null),
    [finderCategory, finderPersonality, finderResult]
  );

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return GIFTS.filter((g) => {
      const nameMatch = g.name.toLowerCase().includes(q);
      const catMatch = catFilter === "all" || g.category === catFilter;
      return nameMatch && catMatch;
    });
  }, [search, catFilter]);

  const personalityOptions = useMemo(
    () =>
      PERSONALITIES.map((p) => ({
        key: p,
        label: tMbti(getPersonalityLabelKey(p) as string),
        mbti: getMbtiCode(p),
        color: getGroupColor(getPersonalityGroup(p)),
      })),
    [tMbti]
  );

  /* JSON-LD */
  const base = "https://lifesimgrid.org";
  const prefix = locale === "en" ? "" : `/${locale}`;
  const pageUrl = `${base}${prefix}/tomodachi-life-gift-item-db`;
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
    name: "Tomodachi Life Gift & Item Database",
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

  const band = finderResult ? (finderResult.affinity >= 70 ? "high" : finderResult.affinity >= 45 ? "medium" : "low") : "low";
  const bandColor = band === "high" ? "text-green-600" : band === "medium" ? "text-amber-600" : "text-red-500";
  const bandBar = band === "high" ? "bg-green-500" : band === "medium" ? "bg-amber-500" : "bg-red-400";

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/<\/script/g, "<\\/script") }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd).replace(/<\/script/g, "<\\/script") }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/<\/script/g, "<\\/script") }} />

        {/* HERO */}
        <section aria-labelledby="gift-hero" className="mx-auto max-w-6xl px-4 pt-8 pb-4 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-100 bg-pink-50 px-4 py-1.5 text-xs font-medium text-pink-700">
            <Gift className="h-3.5 w-3.5" />
            {t("heroBadge")}
          </div>
          <h1 id="gift-hero" className="font-mono text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {t("heroTitle")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
            {t("heroSubtitle")}
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-gray-500">
            <Shield className="h-3.5 w-3.5" />
            {t("privacyBadge")}
          </div>
        </section>

        {/* GIFT FINDER */}
        <section aria-labelledby="gift-finder" className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="gift-finder" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
              {t("finderTitle")}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-gray-600">{t("finderDesc")}</p>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {t("receiverLabel")}
                </label>
                <select
                  value={finderPersonality}
                  onChange={(e) => setFinderPersonality(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-pink-400 focus:outline-none"
                >
                  {personalityOptions.map((p) => (
                    <option key={p.key} value={p.key}>
                      {p.label} ({p.mbti})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {t("categoryLabel")}
                </label>
                <select
                  value={finderCategory}
                  onChange={(e) => setFinderCategory(e.target.value as GiftCategory)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-pink-400 focus:outline-none"
                >
                  {GIFT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{t(`category${c.charAt(0).toUpperCase()}${c.slice(1)}` as "categoryToy")}</option>
                  ))}
                </select>
              </div>
            </div>

            {finderResult && (
              <div className="mt-5 rounded-2xl border-2 p-5" style={{ borderColor: finderResult.affinity >= 70 ? "#22c55e" : finderResult.affinity >= 45 ? "#f59e0b" : "#ef4444" }}>
                <div className="mb-3 flex items-center gap-2">
                  <Gift className="h-5 w-5 text-pink-600" />
                  <h3 className="font-mono text-lg font-bold text-gray-900">{t("resultTitle")}</h3>
                </div>

                <div className="mb-4 flex items-end gap-3">
                  <span className={`font-mono text-5xl font-extrabold ${bandColor}`}>{finderResult.affinity}%</span>
                  <span className="text-sm font-medium text-gray-500">{t("affinityOf100")}</span>
                </div>

                <div className="mb-4 h-3 overflow-hidden rounded-full bg-gray-100">
                  <div className={`h-full rounded-full ${bandBar} transition-all duration-500`} style={{ width: `${finderResult.affinity}%` }} />
                </div>

                <p className="text-sm leading-relaxed text-gray-600 mb-2">
                  {t(`affinity${band.charAt(0).toUpperCase()}${band.slice(1)}` as "affinityHigh")}
                </p>

                <div className="flex items-center gap-2 rounded-lg bg-pink-50 p-2 text-xs text-pink-800">
                  <span className="font-bold">{t("bestForLabel")}</span>
                  {bestCategoriesFor(finderPersonality).slice(0, 3).map((c) => (
                    <span key={c.category} className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-pink-700">
                      {t(`category${c.category.charAt(0).toUpperCase()}${c.category.slice(1)}` as "categoryToy")} ({c.affinity})
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  if (!finderBestGift) return;
                  toggleWishlist(finderBestGift.id);
                }}
                disabled={!finderBestGift}
                className="inline-flex items-center gap-1.5 rounded-lg bg-pink-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-pink-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Heart className="h-3.5 w-3.5" />
                {t("addToWishlistBtn")}
              </button>
              <button
                type="button"
                onClick={() => setCatFilter(finderCategory)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition-all hover:bg-gray-50 active:scale-95"
              >
                <Search className="h-3.5 w-3.5" />
                {t("browseCategoryBtn")}
              </button>
            </div>
          </div>
        </section>

        {/* RANDOM GIFT PICKER */}
        <section aria-labelledby="gift-random" className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 id="gift-random" className="font-mono text-lg sm:text-xl font-bold text-gray-900">
                {t("randomTitle")}
              </h2>
              <button
                type="button"
                onClick={() => setRandomPick(randomGift)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition-all hover:bg-gray-50 active:scale-95"
              >
                <Gift className="h-3.5 w-3.5" />
                {t("rerollBtn")}
              </button>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-gray-600">{t("randomDesc")}</p>

            <div className="rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 p-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("randomPickLabel")}</p>
              <p className="font-mono text-3xl font-bold text-gray-900 mb-1">{randomPick.name}</p>
              <p className="text-sm text-gray-600 mb-3">
                {t(`category${randomPick.category.charAt(0).toUpperCase()}${randomPick.category.slice(1)}` as "categoryToy")}
                {(randomPick.commonGift ? ` · ${t("commonGiftLabel")}` : ` · ${t("rareGiftLabel")}`)}
              </p>
              <div className="flex flex-wrap gap-2">
                {topReceiversFor(randomPick.id).map((r) => (
                  <span key={r.personality} className="rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-gray-700">
                    {tMbti(getPersonalityLabelKey(r.personality) as string)} ({r.affinity})
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => toggleWishlist(randomPick.id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all active:scale-95 ${
                    wishlist.includes(randomPick.id)
                      ? "border border-pink-300 bg-pink-100 text-pink-700"
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-pink-50"
                  }`}
                >
                  <Heart className="h-3.5 w-3.5" />
                  {wishlist.includes(randomPick.id) ? t("inWishlistBtn") : t("addToWishlistBtn")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const receivers = topReceiversFor(randomPick.id)
                      .map((r) => tMbti(getPersonalityLabelKey(r.personality) as string))
                      .join(", ");
                    const cat = t(
                      `category${randomPick.category.charAt(0).toUpperCase()}${randomPick.category.slice(1)}` as "categoryToy"
                    );
                    const txt = `Tomodachi Life gift idea: ${randomPick.name} (${cat}) — ${receivers}. https://lifesimgrid.org/tomodachi-life-gift-item-db`;
                    navigator.clipboard?.writeText(txt).catch(() => {});
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-pink-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-pink-700 active:scale-95"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  {t("shareBtn")}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ITEM DATABASE */}
        <section aria-labelledby="gift-db" className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
              <h2 id="gift-db" className="font-mono text-lg sm:text-xl font-bold text-gray-900">
                {t("dbTitle")}
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Heart className="h-3.5 w-3.5 text-pink-500" />
                  <span>{t("wishlistCountLabel")}: {wishlist.length}</span>
                </div>
                {wishlist.length > 0 && (
                  <button
                    type="button"
                    onClick={clearWishlist}
                    className="inline-flex items-center gap-1 rounded border border-red-200 bg-red-50 px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {t("clearWishlistBtn")}
                  </button>
                )}
              </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[160px]">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white pl-8 pr-3 py-2 text-sm focus:border-pink-400 focus:outline-none"
                />
              </div>
              <select
                value={catFilter}
                onChange={(e) => setCatFilter(e.target.value as GiftCategory | "all")}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-pink-400 focus:outline-none"
              >
                <option value="all">{t("allCategoriesLabel")}</option>
                {GIFT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{t(`category${c.charAt(0).toUpperCase()}${c.slice(1)}` as "categoryToy")}</option>
                ))}
              </select>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((g) => (
                <div key={g.id} className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <div className="mb-1 flex items-start justify-between">
                    <p className="font-mono text-sm font-bold text-gray-900">{g.name}</p>
                    <button
                      type="button"
                      onClick={() => toggleWishlist(g.id)}
                      className={`rounded p-1 transition-colors ${
                        wishlist.includes(g.id) ? "text-pink-600 bg-pink-100" : "text-gray-400 hover:text-pink-500 hover:bg-pink-50"
                      }`}
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mb-1 text-xs text-gray-500">
                    {t(`category${g.category.charAt(0).toUpperCase()}${g.category.slice(1)}` as "categoryToy")}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {PERSONALITIES.slice(0, 4).map((p) => (
                      <span key={p} className="inline-flex items-center gap-1 rounded bg-white px-1.5 py-0.5 text-xs" style={{ color: getGroupColor(getPersonalityGroup(p)) }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: getGroupColor(getPersonalityGroup(p)) }} />
                        {g.affinity[getPersonalityGroup(p)]}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <p className="py-6 text-center text-sm text-gray-500">{t("noResultsLabel")}</p>
            )}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section aria-labelledby="gift-how" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="rounded-2xl bg-pink-50 p-4 sm:p-6">
            <h2 id="gift-how" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
              {t("howTitle")}
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li className="leading-relaxed">{t("howStep1")}</li>
              <li className="leading-relaxed">{t("howStep2")}</li>
              <li className="leading-relaxed">{t("howStep3")}</li>
              <li className="leading-relaxed">{t("howStep4")}</li>
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="gift-faq" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="gift-faq" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
              {t("faqTitle")}
            </h2>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <details key={i} className="group rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
                  <summary className="flex cursor-pointer items-center justify-between p-3 sm:p-4 hover:bg-gray-100 transition-colors">
                    <h4 className="pr-4 text-sm font-semibold text-gray-800">{t(`faq${i}Q` as "faq1Q")}</h4>
                    <ArrowRight className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {t(`faq${i}A` as "faq1A")}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* DISCLAIMER */}
        <section className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
          <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
              <div>
                <h3 className="mb-1 text-sm font-bold text-amber-800">{t("disclaimerTitle")}</h3>
                <p className="text-xs leading-relaxed text-amber-700">{t("modelDisclaimer")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section aria-labelledby="gift-cta" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
            <h2 id="gift-cta" className="mb-4 font-mono text-lg sm:text-xl font-bold text-gray-900">
              {t("ctaTitle")}
            </h2>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/tomodachi-life-mbti" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
                <Lightbulb className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium text-gray-900">{t("ctaMbti")}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
              </Link>
              <Link href="/tomodachi-life-compatibility" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
                <Users className="h-5 w-5 text-indigo-500" />
                <span className="text-sm font-medium text-gray-900">{t("ctaCompat")}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
              </Link>
              <Link href="/tomodachi-life-personality-quiz" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium text-gray-900">{t("ctaQuiz")}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
              </Link>
              <Link href="/tomodachi-life-food-chart" className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all">
                <Gift className="h-5 w-5 text-pink-500" />
                <span className="text-sm font-medium text-gray-900">{t("ctaFood")}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}