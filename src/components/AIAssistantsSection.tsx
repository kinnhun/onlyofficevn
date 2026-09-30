"use client";

import React from "react";
import FeatureSwitcher, { FeatureItem } from "./FeatureSwitcher";

export default function AIAssistantsSection() {
  const aiItems: FeatureItem[] = [
    {
      id: "ai-generate",
      label: <span>Generate docs, sheets, slides, PDF forms in seconds</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/generate.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/generate@2x.png",
    },
    {
      id: "ai-code",
      label: <span>Create text, images, and even build code effortlessly</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/create.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/create@2x.png",
    },
    {
      id: "ai-answers",
      label: <span>Get instant answers and quickly find the information you need</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/get_instant.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/get_instant@2x.png",
    },
    {
      id: "ai-translate",
      label: <span>Translate, rewrite, and check spelling or grammar with ease</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/translate.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/translate@2x.png",
    },
    {
      id: "ai-ocr",
      label: <span>Extract text from scanned PDFs — and much more</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/extract.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/extract@2x.png",
    },
    {
      id: "ai-models",
      label: <span>Connect any AI model, even a fully local one</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/connect.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/connect@2x.png",
    },
    {
      id: "ai-tasks",
      label: <span>Assign different AI models to different tasks for maximum efficiency</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/assign_different.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/ai-assistants/assign_different@2x.png",
    },
  ];

  return (
    <FeatureSwitcher
      title={
        <>
          Enhanced with{" "}
          <span className="Text-module-scss-module__bfsDDa__text" style={{ "--text-color": "#ff6f3d" } as React.CSSProperties}>
            AI assistants and smart agents
          </span>
        </>
      }
      learnMoreText="Learn more about AI in ONLYOFFICE"
      learnMoreHref="/ai-assistants"
      items={aiItems}
      imagePosition="left"
      backgroundColor="transparent"
    />
  );
}
