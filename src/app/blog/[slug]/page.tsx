import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import en from "@/locales/en.json";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogArticleRenderer from "@/components/BlogArticleRenderer";
import { POSTS, getPost, readingMinutes, formatDate } from "@/lib/blog/posts-en";
import type { Metadata } from "next";
import { Clock, Calendar, ArrowRight } from "lucide-react";

const BASE = "https://lifesimgrid.org";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: { absolute: `${post.title} | LifeSimGrid` },
    description: post.description,
    alternates: {
      canonical: `${BASE}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${BASE}/blog/${post.slug}`,
      siteName: "LifeSimGrid",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: ["LifeSimGrid"],
      tags: post.tags,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  setRequestLocale("en");

  const post = getPost(slug);
  if (!post) notFound();

  const url = `${BASE}/blog/${post.slug}`;
  const dateModified = post.updatedAt ?? post.publishedAt;

  /* JSON-LD: Article */
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified,
    inLanguage: "en",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: "LifeSimGrid", url: BASE },
    publisher: { "@type": "Organization", name: "LifeSimGrid", url: BASE },
    keywords: post.tags.join(", "),
  };

  /* JSON-LD: BreadcrumbList */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  /* Up to 3 other posts for the internal-linking section */
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <NextIntlClientProvider messages={en} locale="en">
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

      <article className="mx-auto max-w-3xl px-4 pt-10 pb-6">
        {/* Breadcrumb */}
        <nav
          className="mb-6 flex items-center gap-2 text-xs text-gray-500"
          aria-label="Breadcrumb"
        >
          <a href="/" className="hover:text-gray-700">
            Home
          </a>
          <span>/</span>
          <a href="/blog" className="hover:text-gray-700">
            Blog
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
                {formatDate(post.publishedAt)}
              </time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {readingMinutes(post)} min read
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
          className="mx-auto max-w-3xl px-4 py-8"
        >
          <h2
            id="blog-related-title"
            className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl"
          >
            More guides
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((p) => (
              <a
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex flex-col rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-amber-200 hover:shadow-md"
              >
                <div className="mb-2 text-xs text-gray-500">
                  {formatDate(p.publishedAt)}
                </div>
                <h3 className="mb-1 flex-1 text-sm font-semibold leading-snug text-gray-900 transition-colors group-hover:text-amber-700">
                  {p.title}
                </h3>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-600">
                  Read
                  <ArrowRight className="h-3 w-3" />
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </NextIntlClientProvider>
  );
}
