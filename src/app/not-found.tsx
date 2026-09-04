"use client";

import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";
import { Home, Palette, Unlock, Music, Sparkles, Grid3x3 } from "lucide-react";

const t = en.Hero;

const tools = [
  { href: "/acnh-pixel-studio", label: en.Navbar.toolAcnh, icon: Palette, color: "text-amber-600" },
  { href: "/mii-qr-unlocker", label: en.Navbar.toolMii, icon: Unlock, color: "text-blue-600" },
  { href: "/tomodachi-voice-lab", label: en.Navbar.toolVoice, icon: Music, color: "text-purple-600" },
  { href: "/tomodachi-life-mbti", label: en.Navbar.toolMbti, icon: Sparkles, color: "text-green-600" },
  { href: "/living-the-grid", label: en.Navbar.toolLivingTheGrid, icon: Grid3x3, color: "text-teal-600" },
];

export default function NotFound() {
  return (
    <NextIntlClientProvider messages={en} locale="en">
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <section aria-labelledby="not-found-heading" className="mx-auto max-w-4xl px-4 py-20 text-center">
            <p className="mb-4 text-8xl font-bold text-gray-200">404</p>
            <h1 id="not-found-heading" className="mb-4 font-mono text-3xl font-bold text-gray-900 sm:text-4xl">
              {t.notFoundTitle}
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              {t.notFoundText}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-amber-600 active:scale-95"
            >
              <Home className="h-4 w-4" />
              {t.notFoundHome}
            </Link>

            <div className="mt-12">
              <p className="mb-4 text-sm font-medium text-gray-400">{t.notFoundExplore}</p>
              <div className="flex flex-wrap justify-center gap-3">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-900 hover:shadow-md active:scale-95"
                    >
                      <Icon className={`h-4 w-4 ${tool.color}`} />
                      {tool.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
