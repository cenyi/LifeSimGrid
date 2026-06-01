import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import en from "@/locales/en.json";
import ContactPage from "@/components/ContactPage";
import type { Metadata } from "next";

const BASE = "https://lifesimgrid.com";

export const metadata: Metadata = {
  title: "Contact Us - LifeSimGrid",
  description:
    "Get in touch with the LifeSimGrid team for technical support, bug reports, or compliance inquiries.",
  alternates: {
    canonical: `${BASE}/contact`,
    languages: {
      en: `${BASE}/contact`,
      "zh-Hant": `${BASE}/zh-Hant/contact`,
      ja: `${BASE}/ja/contact`,
    },
  },
};

export default function RootContactPage() {
  setRequestLocale("en");

  return (
    <NextIntlClientProvider messages={en} locale="en">
      <ContactPage />
    </NextIntlClientProvider>
  );
}
