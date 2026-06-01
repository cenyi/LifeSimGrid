"use client";

import { useEffect } from "react";

/** Updates the html lang attribute based on the current locale */
export default function LangUpdater({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
