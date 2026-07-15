import type { Metadata, Viewport } from "next";
import "./globals.css";
import Analytics from "@/components/Analytics";
import TrailingSlashRedirector from "@/components/TrailingSlashRedirector";
import CookieConsent from "@/components/CookieConsent";

const SITE_URL = "https://lifesimgrid.org";
const SITE_NAME = "LifeSimGrid";
const SITE_DESC =
  "Pixel Studio, QR Code Unlocker, Voice Simulator & Compatibility Calculator. 100% client-side, no server needed.";

export const viewport: Viewport = {
  themeColor: "#faf7f2",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  generator: "Next.js",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  title: {
    template: "%s - LifeSimGrid",
    default: "LifeSimGrid - Custom Island Companion Toolset",
  },
  description: SITE_DESC,
  keywords: [],
  category: "UtilitiesApplication",
  classification: "Free Web App",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      "x-default": `${SITE_URL}/`,
      en: `${SITE_URL}/`,
      "zh-Hant": `${SITE_URL}/zh-Hant`,
      ja: `${SITE_URL}/ja`,
      es: `${SITE_URL}/es`,
      fr: `${SITE_URL}/fr`,
      ko: `${SITE_URL}/ko`,
      de: `${SITE_URL}/de`,
      it: `${SITE_URL}/it`,
      nl: `${SITE_URL}/nl`,
      "zh-CN": `${SITE_URL}/zh-CN`,
      ru: `${SITE_URL}/ru`,
      pt: `${SITE_URL}/pt`,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "LifeSimGrid - Custom Island Companion Toolset",
    description: SITE_DESC,
    url: SITE_URL,
    locale: "en_US",
    alternateLocale: [
      "zh_TW",
      "zh_CN",
      "ja_JP",
      "es_ES",
      "fr_FR",
      "ko_KR",
      "de_DE",
      "it_IT",
      "nl_NL",
      "ru_RU",
      "pt_PT",
    ],
    images: `${SITE_URL}/og-image.svg`,
  },
  twitter: {
    card: "summary_large_image",
    title: "LifeSimGrid - Custom Island Companion Toolset",
    description: SITE_DESC,
    images: `${SITE_URL}/og-image.svg`,
  },
  other: {
    "apple-mobile-web-app-title": SITE_NAME,
    "apple-mobile-web-app-capable": "yes",
    "mobile-web-app-capable": "yes",
    "format-detection": "telephone=no, address=no, email=no",
    "msapplication-TileColor": "#faf7f2",
    "rating": "general",
    "distribution": "global",
    "revisit-after": "7 days",
  },
  verification: {
    yandex: "58b4894d924b1d01",
    other: {
      "msvalidate.01": "57D8507EE5239386A6F15DA1F9DE6841",
      "naver-site-verification": "c2158695ff94758b3a59a282c4abed080b166a2e",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESC,
      inLanguage: [
        "en",
        "zh-Hant",
        "ja",
        "es",
        "fr",
        "ko",
        "de",
        "it",
        "nl",
        "zh-CN",
        "ru",
        "pt",
      ],
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.svg`,
      },
      sameAs: [],
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#app`,
      name: SITE_NAME,
      url: SITE_URL,
      applicationCategory: "UtilitiesApplication",
      applicationSuite: SITE_NAME,
      operatingSystem: "Any (Browser-based)",
      description: SITE_DESC,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      browserRequirements: "Requires modern browser with JavaScript enabled",
      inLanguage: [
        "en",
        "zh-Hant",
        "ja",
        "es",
        "fr",
        "ko",
        "de",
        "it",
        "nl",
        "zh-CN",
        "ru",
        "pt",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/<\/script/g, "<\\/script") }}
        />
        {/* Google Consent Mode v2 — must load before gtag.js */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','analytics_storage':'denied','wait_for_update':500});",
          }}
        />
      </head>
      <body className="min-h-screen bg-cream antialiased">
        <Analytics />
        <TrailingSlashRedirector />
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}
