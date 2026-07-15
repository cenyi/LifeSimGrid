"use client";

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Loads Google Analytics 4.
 *
 * Consent Mode v2 defaults (all denied) are set in layout.tsx <head>.
 * The CookieConsent component handles granting consent and loading
 * Microsoft Clarity only after the user accepts.
 */
export default function Analytics() {
  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { 'anonymize_ip': true });
            `}
          </Script>
        </>
      )}
    </>
  );
}
