import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { POSTS, readingMinutes, formatDate } from "@/lib/blog/posts-en";
import type { Metadata } from "next";
import { BookOpen, Clock, Calendar } from "lucide-react";

const BASE = "https://lifesimgrid.org";

export const metadata: Metadata = {
  title: { absolute: "Blog — ACNH, Mii & Tomodachi Life Guides | LifeSimGrid" },
  description:
    "Deep technical guides for ACNH custom designs, Mii QR codes, and Tomodachi Life systems — written from the code that powers our free browser tools.",
  alternates: {
    canonical: `${BASE}/blog`,
  },
  openGraph: {
    title: "Blog — ACNH, Mii & Tomodachi Life Guides",
    description:
      "Deep technical guides for ACNH custom designs, Mii QR codes, and Tomodachi Life systems.",
    url: `${BASE}/blog`,
    siteName: "LifeSimGrid",
    type: "website",
  },
};

export default function BlogIndexPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <Navbar />

      {/* Hero */}
      <section
        aria-labelledby="blog-index-title"
        className="mx-auto max-w-6xl px-4 pt-10 pb-6"
      >
        <div className="mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-amber-500" />
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
            LifeSimGrid Blog
          </span>
        </div>
        <h1
          id="blog-index-title"
          className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl"
        >
          Deep guides for ACNH, Mii & Tomodachi Life players
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
          Technical deep dives into the formats, algorithms, and game systems
          behind our tools — written from the same code that runs them. No
          fluff, no rehashed wiki pages: byte layouts, scoring formulas, and
          step-by-step methods you can verify yourself.
        </p>
      </section>

      {/* Post list */}
      <section
        aria-labelledby="blog-index-list-title"
        className="mx-auto max-w-6xl px-4 py-6"
      >
        <h2 id="blog-index-list-title" className="sr-only">
          All articles
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {POSTS.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-amber-200 hover:shadow-md"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {readingMinutes(post)} min read
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
    </NextIntlClientProvider>
  );
}
