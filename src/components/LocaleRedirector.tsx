"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "lifesimgrid-locale";

/** Detects browser language on first visit and redirects to the appropriate locale */
export default function LocaleRedirector() {
  const router = useRouter();
  const redirected = useRef(false);

  useEffect(() => {
    if (redirected.current) return;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return;

    const userLang =
      navigator.language ||
      (navigator as unknown as Record<string, unknown>).userLanguage ||
      "en";
    const lowerLang = String(userLang).toLowerCase();

    if (lowerLang.includes("zh")) {
      redirected.current = true;
      localStorage.setItem(STORAGE_KEY, "zh-Hant");
      router.replace("/zh-Hant");
    } else if (lowerLang.includes("ja") || lowerLang.includes("jp")) {
      redirected.current = true;
      localStorage.setItem(STORAGE_KEY, "ja");
      router.replace("/ja");
    } else {
      localStorage.setItem(STORAGE_KEY, "en");
    }
  }, [router]);

  return null;
}
