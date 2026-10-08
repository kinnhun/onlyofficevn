"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

export default function I18nInitializer() {
  const currentLocale = useLocale();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("NEXT_LOCALE");
      if (!stored) {
        localStorage.setItem("NEXT_LOCALE", currentLocale || "vi");
      }
      // Ensure cookie is in sync with current locale
      document.cookie = `NEXT_LOCALE=${currentLocale || "vi"};path=/;max-age=31536000;SameSite=Lax`;
    } catch {
      // ignore
    }
  }, [currentLocale]);

  return null;
}
