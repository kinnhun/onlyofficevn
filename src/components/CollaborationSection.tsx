"use client";

import React from "react";
import { useTranslations } from "next-intl";
import FeatureSwitcher, { FeatureItem } from "./FeatureSwitcher";

export default function CollaborationSection() {
  const t = useTranslations("collabSection");

  const collabItems: FeatureItem[] = [
    {
      id: "collab-share",
      label: <span>{t("items.share")}</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/share.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/share@2x.png",
    },
    {
      id: "collab-coediting",
      label: <span>{t("items.coediting")}</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/modes.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/modes@2x.png",
    },
    {
      id: "collab-review",
      label: <span>{t("items.review")}</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/changes.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/changes@2x.png",
    },
    {
      id: "collab-comments",
      label: <span>{t("items.comments")}</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/leave.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/leave@2x.png",
    },
    {
      id: "collab-chat",
      label: <span>{t("items.chat")}</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/communicate.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/communicate@2x.png",
    },
    {
      id: "collab-calls",
      label: <span>{t("items.calls")}</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/make.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/make@2x.png",
    },
  ];

  return (
    <FeatureSwitcher
      title={
        <>
          {t("titlePrefix")}{" "}
          <span className="Text-module-scss-module__bfsDDa__text" style={{ "--text-color": "#ff6f3d" } as React.CSSProperties}>
            {t("titleHighlight")}
          </span>{" "}
          {t("titleSuffix")}
        </>
      }
      learnMoreText={t("learnMore")}
      learnMoreHref="/seamless-collaboration"
      items={collabItems}
      imagePosition="right"
      backgroundColor="transparent"
    />
  );
}
