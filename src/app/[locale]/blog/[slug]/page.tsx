import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogArticleRenderer from "@/components/BlogArticleRenderer";
import { routing, type Locale } from "@/i18n/routing";
import { languageAlternates, localizedUrl } from "@/lib/locale-urls";
import { getBlogPosts, getBlogPost, blogPath } from "@/lib/blog/registry";
import {
  getBlogUi,
  formatBlogDate,
  readingMinutesFor,
} from "@/lib/blog/ui-strings";
import type { Metadata } from "next";
import { Clock, Calendar, ArrowRight } from "lucide-react";

export function generateStaticParams() {
  const result: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const post of getBlogPosts(locale)) {
      result.push({ locale, slug: post.slug });
    }
  }
  return result;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(locale, slug);
  if (!post) return {};

  const path = `blog/${post.slug}`;
  return {
    title: { absolute: `${post.title} | LifeSimGrid` },
    description: post.description,
    alternates: {
      canonical: localizedUrl(locale as Locale, path),
      languages: languageAlternates(path, { xDefaultFirst: true }),
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: localizedUrl(locale as Locale, path),
      siteName: "LifeSimGrid",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: ["LifeSimGrid"],
      tags: post.tags,
    },
  };
}

export default async function LocaleBlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const post = getBlogPost(locale, slug);
  if (!post) notFound();

  const ui = getBlogUi(locale);
  const url = localizedUrl(locale as Locale, `blog/${post.slug}`);
  const homeUrl = locale === "en" ? "/" : `/${locale}`;
  const dateModified = post.updatedAt ?? post.publishedAt;

  /* JSON-LD: Article */
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified,
    inLanguage: locale,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: "LifeSimGrid", url: "https://lifesimgrid.org" },
    publisher: { "@type": "Organization", name: "LifeSimGrid", url: "https://lifesimgrid.org" },
    keywords: post.tags.join(", "),
  };

  /* JSON-LD: BreadcrumbList */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: ui.home, item: localizedUrl(locale as Locale, "") },
      { "@type": "ListItem", position: 2, name: ui.blog, item: localizedUrl(locale as Locale, "blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  /* Up to 3 other posts in the same locale for the internal-linking section */
  const related = getBlogPosts(locale)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/<\/script/g, "<\\/script"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/<\/script/g, "<\\/script"),
        }}
      />

      <article className="mx-auto max-w-6xl px-4 pt-10 pb-6">
        {/* Breadcrumb */}
        <nav
          className="mb-6 flex items-center gap-2 text-xs text-gray-500"
          aria-label="Breadcrumb"
        >
          <a href={homeUrl} className="hover:text-gray-700">
            {ui.home}
          </a>
          <span>/</span>
          <a href={blogPath(locale)} className="hover:text-gray-700">
            {ui.blog}
          </a>
          <span>/</span>
          <span className="truncate text-gray-700">{post.title}</span>
        </nav>

        {/* Header */}
        <header>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            {post.title}
          </h1>
          <div className="mb-2 flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={post.publishedAt}>
                {formatBlogDate(post.publishedAt, locale)}
              </time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {ui.minRead(readingMinutesFor(post, locale))}
            </span>
          </div>
          <div className="mb-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Body */}
        <BlogArticleRenderer blocks={post.blocks} />
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section
          aria-labelledby="blog-related-title"
          className="mx-auto max-w-6xl px-4 py-8"
        >
          <h2
            id="blog-related-title"
            className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl"
          >
            {ui.moreGuides}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((p) => (
              <a
                key={p.slug}
                href={blogPath(locale, p.slug)}
                className="group flex flex-col rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-amber-200 hover:shadow-md"
              >
                <div className="mb-2 text-xs text-gray-500">
                  {formatBlogDate(p.publishedAt, locale)}
                </div>
                <h3 className="mb-1 flex-1 text-sm font-semibold leading-snug text-gray-900 transition-colors group-hover:text-amber-700">
                  {p.title}
                </h3>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-600">
                  {ui.read}
                  <ArrowRight className="h-3 w-3" />
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
