"use client";

import Script from "next/script";

const ADSENSE_CLIENT_ID = "ca-pub-5844297701493718";

/**
 * Analytics component — renders the AdSense script tag.
 *
 * Google Consent Mode v2 defaults (all denied) are set in layout.tsx <head>.
 * GA4 and Microsoft Clarity are loaded dynamically by CookieConsent.tsx
 * only after the user grants consent.
 *
 * AdSense auto-ads script is loaded here unconditionally (it respects
 * Consent Mode v2 signals — ads will not serve personalized content
 * when ad_storage is "denied").
 */
export default function Analytics() {
  return (
    <>
      {/* Google AdSense auto-ads script — respects Consent Mode v2 */}
      <Script
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
    </>
  );
}
