"use client";

import React from "react";
import FeatureSwitcher, { FeatureItem } from "./FeatureSwitcher";

export default function CollaborationSection() {
  const collabItems: FeatureItem[] = [
    {
      id: "collab-share",
      label: <span>Share your docs for viewing, editing, reviewing, commenting, or filling forms</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/share.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/share@2x.png",
    },
    {
      id: "collab-coediting",
      label: <span>Make use of character- and paragraph-level co-editing modes</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/co-editing.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/co-editing@2x.png",
    },
    {
      id: "collab-review",
      label: <span>Compare and review docs and track changes</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/changes.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/changes@2x.png",
    },
    {
      id: "collab-comments",
      label: <span>Leave comments and mentions</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/comments.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/comments@2x.png",
    },
    {
      id: "collab-chat",
      label: <span>Communicate via built-in chat or Telegram</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/chat.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/chat@2x.png",
    },
    {
      id: "collab-calls",
      label: <span>Make audio and video calls with Jitsi or Rainbow</span>,
      imageUrl: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/calls.png",
      imageUrl2x: "https://static-site.onlyoffice.com/public/images/templates/main/collaboration/calls@2x.png",
    },
  ];

  return (
    <FeatureSwitcher
      title={
        <>
          Designed to make{" "}
          <span className="Text-module-scss-module__bfsDDa__text" style={{ "--text-color": "#ff6f3d" } as React.CSSProperties}>
            collaboration
          </span>{" "}
          seamless
        </>
      }
      learnMoreText="Learn more about ONLYOFFICE collaboration features"
      learnMoreHref="/seamless-collaboration"
      items={collabItems}
      imagePosition="right"
      backgroundColor="transparent"
    />
  );
}
