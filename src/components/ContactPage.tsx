"use client";

import { useTranslations } from "next-intl";
import { type ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Scale, Clock, HelpCircle } from "lucide-react";

/** Rich text tag that renders the email as a clickable mailto link */
const EMAIL_TAG = {
  email: (chunks: ReactNode) => (
    <a href="mailto:hi@lifesimgrid.org" className="text-island-blue hover:underline">
      {chunks}
    </a>
  ),
};

export default function ContactPage() {
  const t = useTranslations("Contact");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section aria-labelledby="contact-heading" className="mx-auto max-w-4xl px-4 py-12">
          <h1 id="contact-heading" className="mb-4 font-mono text-3xl font-bold text-gray-900 sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-gray-600">
            {t("intro")}
          </p>

          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </div>
                <h2 className="font-mono text-lg font-bold text-gray-900">
                  {t("githubTitle")}
                </h2>
              </div>
              <p className="mb-3 leading-relaxed text-gray-600">
                {t("githubText")}
              </p>
              <a
                href={t("githubUrl")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-700 active:scale-95"
              >
                {t("githubUrl")}
              </a>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-island-blue text-white">
                  <Mail className="h-5 w-5" />
                </div>
                <h2 className="font-mono text-lg font-bold text-gray-900">
                  {t("supportTitle")}
                </h2>
              </div>
              <p className="leading-relaxed text-gray-600">
                {t.rich("supportText", EMAIL_TAG)}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sunshine text-gray-900">
                  <Scale className="h-5 w-5" />
                </div>
                <h2 className="font-mono text-lg font-bold text-gray-900">
                  {t("legalTitle")}
                </h2>
              </div>
              <p className="leading-relaxed text-gray-600">
                {t("legalText")}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500 text-white">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <h2 className="font-mono text-lg font-bold text-gray-900">
                  {t("faqTitle")}
                </h2>
              </div>
              <p className="leading-relaxed text-gray-600">
                {t("faqText")}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500 text-white">
                  <Clock className="h-5 w-5" />
                </div>
                <h2 className="font-mono text-lg font-bold text-gray-900">
                  {t("responseNote")}
                </h2>
              </div>
              <p className="leading-relaxed text-gray-600">
                {t("responseNoteText")}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
