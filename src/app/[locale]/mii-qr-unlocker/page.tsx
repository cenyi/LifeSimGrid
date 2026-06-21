import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import MiiQrUnlockerPage from "@/components/MiiQrUnlockerPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** Localized page titles for Mii QR Unlocker (template appends " - LifeSimGrid"). */
const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "Mii QR碼解鎖器 — LifeSimGrid免費修復",
  ja: "Mii QRロック解除 — 無料ツール",
  es: "Desbloqueador QR Mii — Repara Gratis",
  fr: "Débloqueur QR Mii — Corrige Gratuit",
  ko: "Mii QR 언록 — 편집오류수정 무료",
  de: "Mii QR-Entsperrer — Fehler Gratis",
  it: "Sblocca QR Mii — Risolve Gratis",
  nl: "Mii QR-ontgrendelaar — Fout Gratis",
  "zh-CN": "Mii二维码解锁器 — LifeSimGrid免费修复",
};

/** Localized page descriptions for Mii QR Unlocker. */
const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "免費Mii QR解鎖器。修復編輯與複製錯誤。3DS/Wii U/Switch，FFL解析。100%純前端。",
  ja: "Mii QRロック解除。編集・コピー禁止を修正。3DS/Wii U/Switch対応、FFL解析。100%クライアント。",
  es: "Desbloquea QR Mii. Corrige errores edición y copia. 3DS/Wii U/Switch. FFL, 0x04. 100% cliente.",
  fr: "Débloque QR Mii. Corrige erreurs modification et copie. 3DS/Wii U/Switch. FFL, 0x04. 100% client.",
  ko: "Mii QR 언록. 편집/복사 오류 수정. FFL, 0x04. 100% 클라이언트.",
  de: "Mii-QR entsperren. Behebt Bearbeitungs-/Kopierfehler. FFL, 0x04. 100% clientseitig.",
  it: "Sblocca QR Mii. Corregge errori modifica e copia. FFL, 0x04. 100% lato client.",
  nl: "Mii QR ontgrendelen. Lost bewerkings-/kopieerfouten op. FFL, 0x04. 100% clientzijde.",
  "zh-CN": "免费Mii QR解锁器。修复编辑与复制错误。3DS/Wii U/Switch，FFL解析。100%纯前端。",
};

const FALLBACK_TITLE = "Mii QR Code Unlocker";
const FALLBACK_DESC =
  "Free online tool to unlock Mii QR codes. Fix 'This Mii Cannot be Edited' and 'Copying Not Allowed' errors instantly. Supports 3DS, Wii U, and Switch Mii data.";

/** Generate metadata for the localized Mii QR Unlocker page. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "mii-qr-unlocker";
  return {
    title: PAGE_TITLES[locale] || FALLBACK_TITLE,
    description: PAGE_DESCS[locale] || FALLBACK_DESC,
    alternates: {
      canonical: locale === "en" ? `${BASE}/${path}` : `${BASE}/${locale}/${path}`,
      languages: {
        "x-default": `${BASE}/${path}`,
        en: `${BASE}/${path}`,
        "zh-Hant": `${BASE}/zh-Hant/${path}`,
        ja: `${BASE}/ja/${path}`,
        es: `${BASE}/es/${path}`,
        fr: `${BASE}/fr/${path}`,
        ko: `${BASE}/ko/${path}`,
        de: `${BASE}/de/${path}`,
        it: `${BASE}/it/${path}`,
        nl: `${BASE}/nl/${path}`,
        "zh-CN": `${BASE}/zh-CN/${path}`,
      },
    },
    openGraph: {
      title: PAGE_TITLES[locale] || FALLBACK_TITLE,
      description: PAGE_DESCS[locale] || FALLBACK_DESC,
      url: locale === "en" ? `${BASE}/${path}` : `${BASE}/${locale}/${path}`,
      siteName: "LifeSimGrid",
      type: "website",
      images: [
        {
          url: `${BASE}/og/${path}.svg`,
          width: 1200,
          height: 630,
          alt: PAGE_TITLES[locale] || FALLBACK_TITLE,
        },
      ],
    },
  };
}

/** Locale-level Mii QR Unlocker page rendered at /{locale}/mii-qr-unlocker. */
export default async function LocaleMiiQrUnlockerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "zh-Hant" | "ja" | "es" | "fr" | "ko" | "de" | "it" | "nl" | "zh-CN")) {
    notFound();
  }

  setRequestLocale(locale);

  return <MiiQrUnlockerPage />;
}
