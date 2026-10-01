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
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/co-editing.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/co-editing@2x.png",
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
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/comments.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/comments@2x.png",
    },
    {
      id: "collab-chat",
      label: <span>{t("items.chat")}</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/chat.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/chat@2x.png",
    },
    {
      id: "collab-calls",
      label: <span>{t("items.calls")}</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/calls.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/calls@2x.png",
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
