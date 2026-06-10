import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import MiiQrUnlockerPage from "@/components/MiiQrUnlockerPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** Localized page titles for Mii QR Unlocker (template appends " - LifeSimGrid"). */
const PAGE_TITLES: Record<string, string> = {
  "zh-Hant": "Mii QR碼解鎖器 - 修復「無法編輯」錯誤",
  ja: "Mii QRコードロック解除 - 編集できないエラー修正",
  es: "Desbloqueador de códigos QR Mii",
  fr: "Débloqueur de codes QR Mii",
  ko: "Mii QR 코드 언록",
  de: "Mii QR-Code-Entsperrer",
  it: "Sbloccatore codici QR Mii",
  nl: "Mii QR-code ontgrendelaar",
  "zh-CN": "Mii二维码解锁器 - 修复无法编辑错误",
};

/** Localized page descriptions for Mii QR Unlocker. */
const PAGE_DESCS: Record<string, string> = {
  "zh-Hant": "免費線上 Mii QR 碼解鎖工具。修復「此 Mii 無法編輯」與「不允許複製」錯誤。支援 3DS、Wii U 與 Switch Mii 資料。",
  ja: "無料オンラインMii QRコードロック解除ツール。「このMiiは編集できません」エラーを即座に修正。3DS・Wii U・Switch対応。",
  es: "Herramienta gratuita para desbloquear códigos QR Mii. Corrige errores de edición y copia al instante. Compatible con 3DS, Wii U y Switch.",
  fr: "Outil gratuit pour débloquer les codes QR Mii. Corrige les erreurs de modification et de copie instantanément. Compatible 3DS, Wii U et Switch.",
  ko: "무료 Mii QR 코드 언록 도구. 편집 및 복사 불가 오류를 즉시 수정. 3DS, Wii U, Switch Mii 데이터 지원.",
  de: "Kostenloses Tool zum Entsperren von Mii-QR-Codes. Behebt Bearbeitungs- und Kopierfehler sofort. Unterstützt 3DS, Wii U und Switch.",
  it: "Strumento gratuito per sbloccare codici QR Mii. Corregge istantaneamente errori di modifica e copia. Supporta 3DS, Wii U e Switch.",
  nl: "Gratis tool voor het ontgrendelen van Mii QR-codes. Lost bewerking- en kopieerfouten direct op. Ondersteunt 3DS, Wii U en Switch.",
  "zh-CN": "免费在线 Mii 二维码解锁工具。修复「此 Mii 无法编辑」与「不允许复制」错误。支持 3DS、Wii U 与 Switch Mii 数据。",
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
