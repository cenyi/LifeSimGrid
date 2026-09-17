"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

// 全局友情链接 · 统一 Logo 渲染规格（注意不依赖外部图源自带尺寸，统一以 LOGO 宽/高为准）
const LOGO_WIDTH = 140;
const LOGO_HEIGHT = 38;

const FRIEND_LINKS = [
  {
    href: "https://peerpush.com/p/lifesimgrid",
    src: "https://peerpush.com/p/lifesimgrid/badge.png",
    alt: "LifeSimGrid on PeerPush",
  },
];

export default function Footer() {
  const t = useTranslations("Footer");
  const seo = useTranslations("SEO");
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" aria-label="Site footer" className="w-full border-t border-gray-200 bg-[#F3F4F6]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-xl bg-amber-50 p-4">
          <p className="text-center text-sm leading-relaxed text-amber-800">
            ⚖️ {seo("disclaimer")}
          </p>
        </div>

        <div className="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-500">
          <Link href="/acnh-pixel-studio" className="transition-colors hover:text-gray-900">{t("toolAcnh")}</Link>
          <Link href="/mii-qr-unlocker" className="transition-colors hover:text-gray-900">{t("toolMii")}</Link>
          <Link href="/tomodachi-voice-lab" className="transition-colors hover:text-gray-900">{t("toolVoice")}</Link>
          <Link href="/tomodachi-life-mbti" className="transition-colors hover:text-gray-900">{t("toolMbti")}</Link>
          <Link href="/living-the-grid" className="transition-colors hover:text-gray-900">{t("toolLivingTheGrid")}</Link>
          <Link href="/tomodachi-island-planner" className="transition-colors hover:text-gray-900">{t("toolIslandPlanner")}</Link>
        </div>

        <div className="mb-4 flex flex-col items-center gap-3">
          <p className="text-sm font-medium text-gray-500">{t("friends")}</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {FRIEND_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-opacity hover:opacity-80"
              >
                <img
                  src={link.src}
                  alt={link.alt}
                  width={LOGO_WIDTH}
                  height={LOGO_HEIGHT}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-500">
            © {year} LifeSimGrid. All rights reserved. Made by a fan.
          </p>

          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-medium text-sm text-gray-500">
            <Link
              href="/about"
              className="transition-colors hover:text-gray-900"
            >
              {t("about")}
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-gray-900"
            >
              {t("contact")}
            </Link>
            <Link
              href="/privacy"
              className="transition-colors hover:text-gray-900"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-gray-900"
            >
              {t("terms")}
            </Link>
          </nav>

          <p className="max-w-xs text-right text-xs text-gray-400">
            {t("techDisclaimer")}
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          {t("copyright", { year: String(year) })}
        </p>
      </div>
    </footer>
  );
}
