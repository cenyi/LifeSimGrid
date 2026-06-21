import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import ContactPage from "@/components/ContactPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.org";

/** 根级 Contact 页面的元数据（英文默认版本）。 */
export const metadata: Metadata = {
  title: { absolute: "Contact LifeSimGrid — Support & Bug Reports" },
  description:
    "Contact LifeSimGrid for technical support, bug reports or compliance inquiries. Free ACNH, Mii & Tomodachi Life tools. 100% client-side.",
  alternates: {
    canonical: `${BASE}/contact`,
    languages: {
      en: `${BASE}/contact`,
      "zh-Hant": `${BASE}/zh-Hant/contact`,
      ja: `${BASE}/ja/contact`,
      es: `${BASE}/es/contact`,
      fr: `${BASE}/fr/contact`,
      ko: `${BASE}/ko/contact`,
      de: `${BASE}/de/contact`,
      it: `${BASE}/it/contact`,
      nl: `${BASE}/nl/contact`,
      "zh-CN": `${BASE}/zh-CN/contact`,
      "x-default": `${BASE}/contact`,
    },
  },
  openGraph: {
    title: "Contact LifeSimGrid — Support & Bug Reports",
    description:
      "Contact LifeSimGrid for technical support, bug reports or compliance. Free ACNH, Mii & Tomodachi Life tools. 100% client-side.",
    url: `${BASE}/contact`,
    siteName: "LifeSimGrid",
    type: "website",
  },
};

/** 根级 Contact 页面组件，渲染于 /contact 路径（英文默认版本）。 */
export default function RootContactPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <ContactPage />
    </NextIntlClientProvider>
  );
}
