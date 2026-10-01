"use client";

import React from "react";
import { useTranslations } from "next-intl";
import FeatureSwitcher, { FeatureItem } from "./FeatureSwitcher";

export default function DocsSection() {
  const t = useTranslations("docsSection");

  const docsItems: FeatureItem[] = [
    {
      id: "docs-action",
      label: <span>{t("items.action")}</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/docs/actions.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/docs/actions@2x.png",
    },
    {
      id: "docs-forms",
      label: <span>{t("items.forms")}</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/docs/pdf_forms.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/docs/pdf_forms@2x.png",
    },
    {
      id: "docs-pdf",
      label: <span>{t("items.pdf")}</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/docs/pdfs.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/docs/pdfs@2x.png",
    },
    {
      id: "docs-convert",
      label: <span>{t("items.convert")}</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/docs/convert.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/docs/convert@2x.png",
    },
    {
      id: "docs-ebook",
      label: <span>{t("items.ebook")}</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/docs/e_book.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/docs/e_book@2x.png",
    },
    {
      id: "docs-diagram",
      label: <span>{t("items.diagram")}</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/docs/diagrams.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/docs/diagrams@2x.png",
    },
  ];

  return (
    <FeatureSwitcher
      title={
        <>
          <span className="Text-module-scss-module__bfsDDa__text" style={{ "--text-color": "#ff6f3d" } as React.CSSProperties}>
            {t("titlePrefix")}
          </span>
          {t("titleSuffix")}
        </>
      }
      learnMoreText={t("learnMore")}
      learnMoreHref="/office-suite"
      items={docsItems}
      imagePosition="left"
      backgroundColor="transparent"
    />
  );
}
