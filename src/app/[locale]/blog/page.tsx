import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { routing, type Locale } from "@/i18n/routing";
import { languageAlternates, localizedUrl } from "@/lib/locale-urls";
import { getBlogPosts, blogPath } from "@/lib/blog/registry";
import {
  getBlogUi,
  formatBlogDate,
  readingMinutesFor,
} from "@/lib/blog/ui-strings";
import type { Metadata } from "next";
import { BookOpen, Clock, Calendar } from "lucide-react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ui = getBlogUi(locale);
  const path = "blog";
  return {
    title: { absolute: `${ui.metaTitle} | LifeSimGrid` },
    description: ui.metaDesc,
    alternates: {
      canonical: localizedUrl(locale as Locale, path),
      languages: languageAlternates(path),
    },
    openGraph: {
      title: ui.metaTitle,
      description: ui.metaDesc,
      url: localizedUrl(locale as Locale, path),
      siteName: "LifeSimGrid",
      type: "website",
    },
  };
}

export default async function LocaleBlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const ui = getBlogUi(locale);
  const posts = getBlogPosts(locale);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        aria-labelledby="blog-index-title"
        className="mx-auto max-w-6xl px-4 pt-10 pb-6"
      >
        <div className="mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-amber-500" />
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
            {ui.indexTag}
          </span>
        </div>
        <h1
          id="blog-index-title"
          className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl"
        >
          {ui.indexTitle}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
          {ui.indexIntro}
        </p>
      </section>

      {/* Post list */}
      <section
        aria-labelledby="blog-index-list-title"
        className="mx-auto max-w-6xl px-4 py-6"
      >
        <h2 id="blog-index-list-title" className="sr-only">
          {ui.allArticles}
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={blogPath(locale, post.slug)}
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-amber-200 hover:shadow-md"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatBlogDate(post.publishedAt, locale)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {ui.minRead(readingMinutesFor(post, locale))}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-amber-700">
                {post.title}
              </h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
