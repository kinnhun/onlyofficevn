"use client";

import React, { useState } from "react";
import {
  CopyOutlined,
  CheckOutlined,
  CodeOutlined,
  StarOutlined,
  AlertOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { InlineLinkRenderer } from "./InlineLinkRenderer";

type MessageContentProps = {
  content: string;
};

export function MessageContent({ content }: MessageContentProps) {
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  const blocks: Array<{ type: "code" | "text"; content: string; language?: string }> = [];

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      blocks.push({
        type: "text",
        content: content.slice(lastIndex, match.index),
      });
    }
    blocks.push({
      type: "code",
      language: match[1] || "code",
      content: match[2].trim(),
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    blocks.push({
      type: "text",
      content: content.slice(lastIndex),
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", lineHeight: "1.6" }}>
      {blocks.map((block, idx) => {
        if (block.type === "code") {
          return (
            <CodeBlockCard
              key={idx}
              language={block.language || "terminal"}
              code={block.content}
            />
          );
        }
        return <TextParagraphs key={idx} text={block.content} />;
      })}
    </div>
  );
}

function CodeBlockCard({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        margin: "8px 0",
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid #e2e8f0",
        backgroundColor: "#f8fafc",
        color: "#1e293b",
        fontSize: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 12px",
          backgroundColor: "#f1f5f9",
          borderBottom: "1px solid #e2e8f0",
          fontSize: "11px",
          fontFamily: "monospace",
          color: "#475569",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <CodeOutlined style={{ color: "#ea580c" }} />
          <span style={{ textTransform: "uppercase", color: "#c2410c", fontWeight: 700 }}>
            {language}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            background: "#ffffff",
            border: "1px solid #cbd5e1",
            color: "#475569",
            cursor: "pointer",
            fontSize: "11px",
            padding: "2px 8px",
            borderRadius: "4px",
          }}
        >
          {copied ? (
            <CheckOutlined style={{ color: "#16a34a" }} />
          ) : (
            <CopyOutlined />
          )}
          <span>{copied ? "Đã chép" : "Sao chép"}</span>
        </button>
      </div>
      <pre
        style={{
          padding: "12px",
          margin: 0,
          fontFamily: "monospace",
          fontSize: "12px",
          overflowX: "auto",
          lineHeight: "1.5",
          backgroundColor: "#f8fafc",
          color: "#0f172a",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

function TextParagraphs({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lineIdx} style={{ height: "4px" }} />;
        }

        // Callout: **KẾT LUẬN**:
        if (trimmed.startsWith("**KẾT LUẬN**:") || trimmed.startsWith("**KẾT LUẬN:**")) {
          const body = trimmed.replace(/^\*\*KẾT LUẬN\*\*:\s*/, "");
          return (
            <div
              key={lineIdx}
              style={{
                padding: "10px 14px",
                borderRadius: "10px",
                backgroundColor: "#fff7ed",
                border: "1px solid #fed7aa",
                color: "#1e293b",
                fontSize: "13px",
                margin: "6px 0",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  color: "#ea580c",
                  letterSpacing: "0.03em",
                  marginBottom: "4px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <StarOutlined />
                <span>KẾT LUẬN & ĐÁNH GIÁ</span>
              </div>
              <InlineLinkRenderer text={body} />
            </div>
          );
        }

        // Callout: **TÀI NGUYÊN / TẢI VỀ**:
        if (
          trimmed.startsWith("**TÀI NGUYÊN") ||
          trimmed.startsWith("**TẢI VỀ") ||
          trimmed.startsWith("**LIÊN KẾT TẢI")
        ) {
          const body = trimmed.replace(/^\*\*.*?\*\*:\s*/, "");
          return (
            <div
              key={lineIdx}
              style={{
                padding: "10px 14px",
                borderRadius: "10px",
                backgroundColor: "#f0fdf4",
                border: "1px solid #bbf7d0",
                color: "#1e293b",
                fontSize: "12.5px",
                margin: "6px 0",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  color: "#15803d",
                  letterSpacing: "0.03em",
                  marginBottom: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <DownloadOutlined />
                <span>TÀI NGUYÊN & LIÊN KẾT TẢI VỀ CHÍNH THỨC</span>
              </div>
              <InlineLinkRenderer text={body} />
            </div>
          );
        }

        // Callout: **LƯU Ý**:
        if (trimmed.startsWith("**LƯU Ý**:") || trimmed.startsWith("**LƯU Ý QUAN TRỌNG**:")) {
          const body = trimmed.replace(/^\*\*.*?\*\*:\s*/, "");
          return (
            <div
              key={lineIdx}
              style={{
                padding: "10px 14px",
                borderRadius: "10px",
                backgroundColor: "#fffbeb",
                border: "1px solid #fde68a",
                color: "#1e293b",
                fontSize: "12.5px",
                margin: "6px 0",
              }}
            >
              <div
                style={{
                  fontSize: "10.5px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  color: "#b45309",
                  letterSpacing: "0.03em",
                  marginBottom: "4px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <AlertOutlined />
                <span>LƯU Ý QUAN TRỌNG</span>
              </div>
              <InlineLinkRenderer text={body} />
            </div>
          );
        }

        // Heading 3 (### )
        if (trimmed.startsWith("### ")) {
          return (
            <h4
              key={lineIdx}
              style={{
                fontSize: "13.5px",
                fontWeight: 800,
                color: "#0f172a",
                marginTop: "10px",
                marginBottom: "4px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span
                style={{
                  width: "4px",
                  height: "14px",
                  borderRadius: "2px",
                  backgroundColor: "#ea580c",
                  display: "inline-block",
                }}
              />
              <span>{trimmed.slice(4)}</span>
            </h4>
          );
        }

        // Bullet point (* or -)
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || trimmed.startsWith("• ")) {
          const bulletContent = trimmed.slice(2);
          return (
            <div
              key={lineIdx}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                paddingLeft: "4px",
              }}
            >
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  backgroundColor: "#ea580c",
                  flexShrink: 0,
                  marginTop: "8px",
                }}
              />
              <div style={{ flex: 1, fontSize: "13px", color: "inherit" }}>
                <InlineLinkRenderer text={bulletContent} />
              </div>
            </div>
          );
        }

        // Numbered list (e.g. 1. , 2. )
        const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (numberedMatch) {
          return (
            <div
              key={lineIdx}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                paddingLeft: "4px",
              }}
            >
              <span
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  backgroundColor: "#fff7ed",
                  color: "#ea580c",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "2px",
                  border: "1px solid #fed7aa",
                }}
              >
                {numberedMatch[1]}
              </span>
              <div style={{ flex: 1, fontSize: "13px", color: "inherit" }}>
                <InlineLinkRenderer text={numberedMatch[2]} />
              </div>
            </div>
          );
        }

        // Normal paragraph line
        return (
          <p key={lineIdx} style={{ margin: 0, fontSize: "13px", lineHeight: "1.6", color: "inherit" }}>
            <InlineLinkRenderer text={line} />
          </p>
        );
      })}
    </div>
  );
}
