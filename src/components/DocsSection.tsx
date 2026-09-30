"use client";

import React from "react";
import Link from "next/link";
import FeatureSwitcher, { FeatureItem } from "./FeatureSwitcher";

export default function DocsSection() {
  const docsItems: FeatureItem[] = [
    {
      id: "docs-action",
      label: (
        <span>
          View, edit, and collaborate on{" "}
          <Link
            id="docs-document-editor"
            className="Link-module-scss-module__pMOyZW__link Link-module-scss-module__pMOyZW__text-underline Link-module-scss-module__pMOyZW__hover-underline-none"
            style={{ "--link-color": "#ff6f3d" } as React.CSSProperties}
            href="/document-editor"
          >
            docs
          </Link>
          ,{" "}
          <Link
            id="docs-spreadsheet-editor"
            className="Link-module-scss-module__pMOyZW__link Link-module-scss-module__pMOyZW__text-underline Link-module-scss-module__pMOyZW__hover-underline-none"
            style={{ "--link-color": "#ff6f3d" } as React.CSSProperties}
            href="/spreadsheet-editor"
          >
            sheets
          </Link>
          ,{" "}
          <Link
            id="docs-presentation-editor"
            className="Link-module-scss-module__pMOyZW__link Link-module-scss-module__pMOyZW__text-underline Link-module-scss-module__pMOyZW__hover-underline-none"
            style={{ "--link-color": "#ff6f3d" } as React.CSSProperties}
            href="/presentation-editor"
          >
            slides
          </Link>
        </span>
      ),
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/docs/actions.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/docs/actions@2x.png",
    },
    {
      id: "docs-forms",
      label: (
        <span>
          Build fillable{" "}
          <Link
            id="docs-form-creator"
            className="Link-module-scss-module__pMOyZW__link Link-module-scss-module__pMOyZW__text-underline Link-module-scss-module__pMOyZW__hover-underline-none"
            style={{ "--link-color": "#ff6f3d" } as React.CSSProperties}
            href="/form-creator"
          >
            PDF forms
          </Link>{" "}
          and fill them in online
        </span>
      ),
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/docs/pdf_forms.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/docs/pdf_forms@2x.png",
    },
    {
      id: "docs-pdf",
      label: (
        <span>
          Read and edit{" "}
          <Link
            id="docs-pdf-editor"
            className="Link-module-scss-module__pMOyZW__link Link-module-scss-module__pMOyZW__text-underline Link-module-scss-module__pMOyZW__hover-underline-none"
            style={{ "--link-color": "#ff6f3d" } as React.CSSProperties}
            href="/pdf-editor"
          >
            PDFs
          </Link>
          , export/import to/from PDF
        </span>
      ),
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/docs/pdfs.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/docs/pdfs@2x.png",
    },
    {
      id: "docs-convert",
      label: <span>Convert docs to Markdown and HTML</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/docs/convert.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/docs/convert@2x.png",
    },
    {
      id: "docs-ebook",
      label: (
        <span>
          Turn your textbooks into{" "}
          <Link
            id="docs-e-book"
            className="Link-module-scss-module__pMOyZW__link Link-module-scss-module__pMOyZW__text-underline Link-module-scss-module__pMOyZW__hover-underline-none"
            style={{ "--link-color": "#ff6f3d" } as React.CSSProperties}
            href="/e-book"
          >
            e-books
          </Link>
        </span>
      ),
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/docs/e_book.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/docs/e_book@2x.png",
    },
    {
      id: "docs-diagram",
      label: (
        <span>
          View and navigate{" "}
          <Link
            id="docs-diagram"
            className="Link-module-scss-module__pMOyZW__link Link-module-scss-module__pMOyZW__text-underline Link-module-scss-module__pMOyZW__hover-underline-none"
            style={{ "--link-color": "#ff6f3d" } as React.CSSProperties}
            href="/diagram-viewer"
          >
            diagrams
          </Link>{" "}
          with ease
        </span>
      ),
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/docs/diagrams.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/docs/diagrams@2x.png",
    },
  ];

  return (
    <FeatureSwitcher
      title={
        <>
          <span className="Text-module-scss-module__bfsDDa__text" style={{ "--text-color": "#ff6f3d" } as React.CSSProperties}>
            ONLYOFFICE Docs
          </span>
          ,<br /> the most complete office suite
        </>
      }
      learnMoreText="Learn more about ONLYOFFICE Docs features"
      learnMoreHref="/office-suite"
      items={docsItems}
      imagePosition="left"
      backgroundColor="transparent"
    />
  );
}

