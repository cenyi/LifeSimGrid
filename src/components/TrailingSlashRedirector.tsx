"use client";

import { useEffect } from "react";

/**
 * TrailingSlashRedirector - Removes trailing slashes from URLs via 301 redirect.
 *
 * When a user navigates to a URL ending with "/" (except the root "/"),
 * this component redirects them to the same URL without the trailing slash.
 * This preserves query parameters and hash fragments.
 *
 * Example:
 *   /zh-Hant/ → /zh-Hant
 *   /about/?foo=bar → /about?foo=bar
 *   / → / (root is preserved)
 */
export default function TrailingSlashRedirector() {
  useEffect(() => {
    const { pathname, search, hash } = window.location;

    // Root path "/" should keep its slash
    if (pathname === "/") return;

    // Only redirect if pathname ends with "/"
    if (pathname.endsWith("/")) {
      const cleanPath = pathname.slice(0, -1);
      const newUrl = cleanPath + search + hash;
      window.location.replace(newUrl);
    }
  }, []);

  return null;
}
