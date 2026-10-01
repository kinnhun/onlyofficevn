"use client";

import React from "react";
import { useTranslations } from "next-intl";
import FeatureSwitcher, { FeatureItem } from "./FeatureSwitcher";

export default function AIAssistantsSection() {
  const t = useTranslations("aiSection");

  const aiItems: FeatureItem[] = [
    {
      id: "ai-generate",
      label: <span>{t("items.generate")}</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/generate.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/generate@2x.png",
    },
    {
      id: "ai-code",
      label: <span>{t("items.code")}</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/create.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/create@2x.png",
    },
    {
      id: "ai-answers",
      label: <span>{t("items.answers")}</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/get_instant.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/get_instant@2x.png",
    },
    {
      id: "ai-translate",
      label: <span>{t("items.translate")}</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/translate.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/translate@2x.png",
    },
    {
      id: "ai-ocr",
      label: <span>{t("items.ocr")}</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/extract.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/extract@2x.png",
    },
    {
      id: "ai-models",
      label: <span>{t("items.models")}</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/connect.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/connect@2x.png",
    },
    {
      id: "ai-tasks",
      label: <span>{t("items.tasks")}</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/assign_different.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/assign_different@2x.png",
    },
  ];

  return (
    <FeatureSwitcher
      title={
        <>
          {t("titlePrefix")}{" "}
          <span className="Text-module-scss-module__bfsDDa__text" style={{ "--text-color": "#ff6f3d" } as React.CSSProperties}>
            {t("titleHighlight")}
          </span>
        </>
      }
      learnMoreText={t("learnMore")}
      learnMoreHref="/ai-assistants"
      items={aiItems}
      imagePosition="left"
      backgroundColor="transparent"
    />
  );
}
