"use client";

import React from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface HeaderRightActionsProps {
  locale?: string;
  onSwitchLocale?: (newLocale: "vi" | "en") => void;
  tCommon?: (key: string) => string;
}

export default function HeaderRightActions({
  onSwitchLocale,
}: HeaderRightActionsProps) {
  return (
    <div
      className="oo-header-icons en"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
        whiteSpace: "nowrap",
      }}
    >
      <LanguageSwitcher
        variant="header"
        onLocaleChange={(loc) => onSwitchLocale?.(loc as "vi" | "en")}
      />
    </div>
  );
}
