"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/** Redirects /en to / on the client side */
export default function EnRedirect() {
  const router = useRouter();
  const redirected = useRef(false);

  useEffect(() => {
    if (!redirected.current) {
      redirected.current = true;
      router.replace("/");
    }
  }, [router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#F8F9FA]">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFCC00] border-t-transparent" />
    </div>
  );
}
