"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { revealLanguageTransition } from "@/lib/language-transition";

export function DocumentLocale() {
  const pathname = usePathname();
  useLayoutEffect(() => {
    document.documentElement.lang = /^\/en(?:\/|$)/.test(pathname)
      ? "en"
      : "ru";
    revealLanguageTransition();
  }, [pathname]);
  return null;
}
