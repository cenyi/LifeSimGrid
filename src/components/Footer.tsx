"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

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
          <Link href="/living-the-grid" className="transition-colors hover:text-gray-900">{t("toolLivingTheGrid")}</Link>
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
