"use client";

import React from "react";
import { DownloadOutlined, ArrowRightOutlined, ExportOutlined } from "@ant-design/icons";

type InlineLinkRendererProps = {
  text: string;
};

export function InlineLinkRenderer({ text }: InlineLinkRendererProps) {
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*.*?\*\*|\`.*?\`)/g;
  const parts = text.split(tokenRegex);

  return (
    <>
      {parts.map((part, idx) => {
        if (!part) return null;

        // 1. Markdown Link: [label](url)
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          const [, label, rawUrl] = linkMatch;
          const url = rawUrl.trim();
          const isDownload =
            url.endsWith(".exe") ||
            url.endsWith(".zip") ||
            url.endsWith(".rar") ||
            url.endsWith(".pdf") ||
            url.endsWith(".bat") ||
            url.includes("/downloads/");
          const isInternal = url.startsWith("/") && !isDownload;

          if (isDownload) {
            return (
              <a
                key={idx}
                href={url}
                download
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 10px",
                  margin: "2px 4px",
                  borderRadius: "8px",
                  backgroundColor: "#fff7ed",
                  color: "#ea580c",
                  fontWeight: 700,
                  fontSize: "12px",
                  border: "1px solid #fed7aa",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <DownloadOutlined style={{ fontSize: "13px" }} />
                <span>{label}</span>
              </a>
            );
          }

          if (isInternal) {
            return (
              <a
                key={idx}
                href={url}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 10px",
                  margin: "2px 4px",
                  borderRadius: "8px",
                  backgroundColor: "#f8fafc",
                  color: "#ea580c",
                  fontWeight: 700,
                  fontSize: "12px",
                  border: "1px solid #e2e8f0",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <ArrowRightOutlined style={{ fontSize: "11px" }} />
                <span>{label}</span>
              </a>
            );
          }

          return (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "2px 4px",
                fontSize: "12.5px",
                color: "#ea580c",
                fontWeight: 600,
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              <span>{label}</span>
              <ExportOutlined style={{ fontSize: "11px" }} />
            </a>
          );
        }

        // 2. Bold: **text**
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={idx} style={{ fontWeight: 700, color: "inherit" }}>
              {part.slice(2, -2)}
            </strong>
          );
        }

        // 3. Inline code: `text`
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={idx}
              style={{
                padding: "2px 6px",
                borderRadius: "4px",
                fontFamily: "monospace",
                fontSize: "12px",
                backgroundColor: "#f1f5f9",
                color: "#0f172a",
                border: "1px solid #e2e8f0",
                margin: "0 2px",
              }}
            >
              {part.slice(1, -1)}
            </code>
          );
        }

        return <span key={idx}>{part}</span>;
      })}
    </>
  );
}
