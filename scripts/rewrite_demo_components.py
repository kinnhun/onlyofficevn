import os

# 1. DemoHero.tsx
hero_code = '''"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { FileText, Download, ShieldAlert, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function DemoHero() {
  const t = useTranslations("demo.hero");

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      style={{
        padding: "56px 20px 36px",
        textAlign: "center",
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255, 111, 61, 0.12), transparent 70%), linear-gradient(180deg, #fffbf7 0%, #ffffff 100%)",
        borderBottom: "1px solid #f1f5f9",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Official Distributor Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "7px 20px",
            borderRadius: "9999px",
            backgroundColor: "#ffffff",
            border: "1.5px solid #fed7aa",
            marginBottom: "20px",
            boxShadow: "0 4px 14px rgba(234, 88, 12, 0.08)",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#16a34a",
              display: "inline-block",
              boxShadow: "0 0 0 2px rgba(22, 163, 74, 0.2)",
            }}
          />
          <span
            style={{
              fontSize: "12px",
              fontWeight: 800,
              color: "#ea580c",
              letterSpacing: "0.4px",
              textTransform: "uppercase",
            }}
          >
            {t("distributorBadge")}
          </span>
        </div>

        {/* Main Heading */}
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 800,
            lineHeight: 1.2,
            color: "#0f172a",
            margin: "0 0 18px",
            letterSpacing: "-0.025em",
          }}
        >
          {t("title")}
          <span
            style={{
              background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            {t("titleHighlight")}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(15px, 2vw, 17px)",
            lineHeight: 1.65,
            color: "#475569",
            maxWidth: "780px",
            margin: "0 auto 32px",
            fontWeight: 500,
          }}
        >
          {t("subtitle")}
        </p>

        {/* 3 Quick Jump Action Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "14px",
            maxWidth: "960px",
            margin: "0 auto 36px",
          }}
        >
          {/* Card 1: Cloud Suite Demo */}
          <button
            type="button"
            onClick={() => scrollTo("demo-online")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "16px 20px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              border: "1.5px solid #e2e8f0",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              textAlign: "left",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ff6f3d";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 24px rgba(255, 111, 61, 0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(15, 23, 42, 0.04)";
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "#fff7ed",
                border: "1px solid #fed7aa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <FileText size={22} color="#ea580c" />
            </div>
            <div>
              <div style={{ fontSize: "14.5px", fontWeight: 700, color: "#0f172a", marginBottom: "2px" }}>
                {t("card1Title")}
              </div>
              <div style={{ fontSize: "12.5px", color: "#64748b" }}>
                {t("card1Sub")}
              </div>
            </div>
          </button>

          {/* Card 2: PC 7-day Trial */}
          <button
            type="button"
            onClick={() => scrollTo("demo-pc")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "16px 20px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              border: "1.5px solid #e2e8f0",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              textAlign: "left",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ff6f3d";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 24px rgba(255, 111, 61, 0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(15, 23, 42, 0.04)";
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "#fff7ed",
                border: "1px solid #fed7aa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Download size={22} color="#ea580c" />
            </div>
            <div>
              <div style={{ fontSize: "14.5px", fontWeight: 700, color: "#0f172a", marginBottom: "2px" }}>
                {t("card2Title")}
              </div>
              <div style={{ fontSize: "12.5px", color: "#64748b" }}>
                {t("card2Sub")}
              </div>
            </div>
          </button>

          {/* Card 3: MercyCheck */}
          <button
            type="button"
            onClick={() => scrollTo("mercy-check")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "16px 20px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              border: "1.5px solid #e2e8f0",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              textAlign: "left",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#dc2626";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 24px rgba(220, 38, 38, 0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(15, 23, 42, 0.04)";
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <ShieldAlert size={22} color="#dc2626" />
            </div>
            <div>
              <div style={{ fontSize: "14.5px", fontWeight: 700, color: "#0f172a", marginBottom: "2px" }}>
                {t("card3Title")}
              </div>
              <div style={{ fontSize: "12.5px", color: "#64748b" }}>
                {t("card3Sub")}
              </div>
            </div>
          </button>
        </div>

        {/* Feature Guarantees Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "24px",
            padding: "14px 20px",
            borderRadius: "14px",
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            maxWidth: "960px",
            margin: "0 auto",
            fontSize: "13px",
            color: "#475569",
            fontWeight: 600,
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
            <CheckCircle2 size={16} color="#16a34a" />
            <span>{t("noAccount")}</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
            <CheckCircle2 size={16} color="#16a34a" />
            <span>{t("msCompat")}</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
            <ShieldCheck size={16} color="#ea580c" />
            <span>{t("security")}</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
            <Zap size={16} color="#ea580c" />
            <span>{t("speed")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
'''

# 2. DemoOnlineSuite.tsx
online_suite_code = '''"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { FileText, FileSpreadsheet, Presentation, FileEdit, Sparkles, Server, Check, ArrowRight } from "lucide-react";

declare global {
  interface Window {
    DocsAPI?: {
      DocEditor: new (placeholderId: string, config: any) => {
        destroyEditor: () => void;
      };
    };
  }
}

interface DemoOnlineSuiteProps {
  onOpenQuote?: () => void;
}

const ONLYOFFICE_CONFIGS: Record<string, { token: string; config: any }> = {
  docx: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2N1bWVudCI6eyJmaWxlVHlwZSI6ImRvY3giLCJrZXkiOiI5N2EwYzdiZS1mZDgyLTQ3YzktYWYyZi1hMWI0N2EyN2Q0OWMiLCJ0aXRsZSI6IkV4YW1wbGUgRG9jdW1lbnQgVGl0bGUuZG9jeCIsInVybCI6Imh0dHBzOi8vc3RhdGljLm9ubHlvZmZpY2UuY29tL2Fzc2V0cy9kb2NzL3NhbXBsZXMvZGVtby5kb2N4IiwicGVybWlzc2lvbnMiOnsiZWRpdCI6dHJ1ZSwicmV2aWV3Ijp0cnVlfX0sImRvY3VtZW50VHlwZSI6IndvcmQiLCJlZGl0b3JDb25maWciOnsibGFuZyI6ImVuIiwidXNlciI6eyJpZCI6Ijc4ZTFlODQxIiwibmFtZSI6IkpvaG4gU21pdGgifSwiY3VzdG9taXphdGlvbiI6eyJoaWRlUmlnaHRNZW51Ijp0cnVlLCJpbnRlZ3JhdGlvbk1vZGUiOiJlbWJlZCIsImFub255bW91cyI6eyJyZXF1ZXN0IjpmYWxzZX19LCJwbHVnaW5zIjp7InBsdWdpbnNEYXRhIjpbImh0dHBzOi8vb25seW9mZmljZS5jb20vcGx1Z2luLXJhaW5ib3cvY29uZmlnLmpzb24iXX19LCJ3aWR0aCI6IjEwMCUiLCJoZWlnaHQiOiIxMDAlIiwiaWF0IjoxNzgzMjE1ODgwfQ.V-CEcNh5FEdIEUt7CyDGgVhV0kIBgCzQCMgpuKdsezc",
    config: {
      document: {
        fileType: "docx",
        key: "97a0c7be-fd82-47c9-af2f-a1b47a27d49c",
        title: "Example Document Title.docx",
        url: "https://static.onlyoffice.com/assets/docs/samples/demo.docx",
        permissions: { edit: true, review: true },
      },
      documentType: "word",
      editorConfig: {
        lang: "en",
        user: { id: "78e1e841", name: "John Smith" },
        customization: {
          hideRightMenu: true,
          integrationMode: "embed",
          anonymous: { request: false },
        },
        plugins: {
          pluginsData: ["https://onlyoffice.com/plugin-rainbow/config.json"],
        },
      },
      width: "100%",
      height: "100%",
    },
  },
  xlsx: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2N1bWVudCI6eyJmaWxlVHlwZSI6Inhsc3giLCJrZXkiOiJmMTI3OWU2Zi1mZjUwLTRjN2MtYjliNi00ZDg0ZjBiNTY0OWUiLCJ0aXRsZSI6IkV4YW1wbGUgVGl0bGUueGxzeCIsInVybCI6Imh0dHBzOi8vc3RhdGljLm9ubHlvZmZpY2UuY29tL2Fzc2V0cy9kb2NzL3NhbXBsZXMvZGVtby54bHN4IiwicGVybWlzc2lvbnMiOnsiZWRpdCI6dHJ1ZSwicmV2aWV3Ijp0cnVlfX0sImRvY3VtZW50VHlwZSI6ImNlbGwiLCJlZGl0b3JDb25maWciOnsibGFuZyI6ImVuIiwiY3VzdG9taXphdGlvbiI6eyJoaWRlUmlnaHRNZW51Ijp0cnVlLCJpbnRlZ3JhdGlvbk1vZGUiOiJlbWJlZCIsImFub255bW91cyI6eyJyZXF1ZXN0IjpmYWxzZX19LCJwbHVnaW5zIjp7InBsdWdpbnNEYXRhIjpbImh0dHBzOi8vb25seW9mZmljZS5jb20vcGx1Z2luLXJhaW5ib3cvY29uZmlnLmpzb24iXX19LCJ3aWR0aCI6IjEwMCUiLCJoZWlnaHQiOiIxMDAlIiwiaWF0IjoxNzgzMjE1ODgwfQ.zH-PJrTzNNTHZ5Y2HBXKU_LE1rQ1px0xTT8sAsTCdGc",
    config: {
      document: {
        fileType: "xlsx",
        key: "f1279e6f-ff50-4c7c-b9b6-4d84f0b5649e",
        title: "Example Title.xlsx",
        url: "https://static.onlyoffice.com/assets/docs/samples/demo.xlsx",
        permissions: { edit: true, review: true },
      },
      documentType: "cell",
      editorConfig: {
        lang: "en",
        customization: {
          hideRightMenu: true,
          integrationMode: "embed",
          anonymous: { request: false },
        },
        plugins: {
          pluginsData: ["https://onlyoffice.com/plugin-rainbow/config.json"],
        },
      },
      width: "100%",
      height: "100%",
    },
  },
  pptx: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2N1bWVudCI6eyJmaWxlVHlwZSI6InBwdHgiLCJrZXkiOiI3NWQwOTY0Ni1iMGVhLTQ3ZjgtODQ0Zi1lOTkzY2FhMTJiNDIiLCJ0aXRsZSI6IkV4YW1wbGUgVGl0bGUucHB0eCIsInVybCI6Imh0dHBzOi8vc3RhdGljLm9ubHlvZmZpY2UuY29tL2Fzc2V0cy9kb2NzL3NhbXBsZXMvZGVtby5wcHR4IiwicGVybWlzc2lvbnMiOnsiZWRpdCI6dHJ1ZSwicmV2aWV3Ijp0cnVlfX0sImRvY3VtZW50VHlwZSI6InNsaWRlIiwiZWRpdG9yQ29uZmlnIjp7ImxhbmciOiJlbiIsImN1c3RvbWl6YXRpb24iOnsiaGlkZVJpZ2h0TWVudSI6dHJ1ZSwiaW50ZWdyYXRpb25Nb2RlIjoiZW1iZWQiLCJhbm9ueW1vdXMiOnsicmVxdWVzdCI6ZmFsc2V9fSwicGx1Z2lucyI6eyJwbHVnaW5zRGF0YSI6WyJodHRwczovL3d3dy5vbmx5b2ZmaWNlLmNvbS9wbHVnaW4tcmFpbmJvdy9jb25maWcuanNvbiJdfX0sIndpZHRoIjoiMTAwJSIsImhlaWdodCI6IjEwMCUiLCJpYXQiOjE3OTA5MDc2NDd9.QojlPUcSL6zKkKEdD7hSaPf2PZYT14Xuln0p9y48d28",
    config: {
      document: {
        fileType: "pptx",
        key: "75d09646-b0ea-47f8-844f-e993caa12b42",
        title: "Example Title.pptx",
        url: "https://static.onlyoffice.com/assets/docs/samples/demo.pptx",
        permissions: { edit: true, review: true },
      },
      documentType: "slide",
      editorConfig: {
        lang: "en",
        customization: {
          hideRightMenu: true,
          integrationMode: "embed",
          anonymous: { request: false },
        },
        plugins: {
          pluginsData: ["https://www.onlyoffice.com/plugin-rainbow/config.json"],
        },
      },
      width: "100%",
      height: "100%",
    },
  },
  pdf: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2N1bWVudCI6eyJmaWxlVHlwZSI6InBkZiIsImtleSI6IjdiNjgyNjJjLWI2YTEtNGRiYS04ZDc0LTUyNDA4MzNjOWZhMSIsInRpdGxlIjoiRXhhbXBsZSBEb2N1bWVudCBUaXRsZS5wZGYiLCJ1cmwiOiJodHRwczovL3N0YXRpYy5vbmx5b2ZmaWNlLmNvbS9hc3NldHMvZG9jcy9zYW1wbGVzL2RlbW8ucGRmIiwicGVybWlzc2lvbnMiOnsiZWRpdCI6dHJ1ZSwicmV2aWV3Ijp0cnVlfX0sImRvY3VtZW50VHlwZSI6InBkZiIsImVkaXRvckNvbmZpZyI6eyJsYW5nIjoiZW4iLCJjdXN0b21pemF0aW9uIjp7ImhpZGVSaWdodE1lbnUiOnRydWUsImludGVncmF0aW9uTW9kZSI6ImVtYmVkIiwiYW5vbnltb3VzIjp7InJlcXVlc3QiOmZhbHNlfX0sInBsdWdpbnMiOnsicGx1Z2luc0RhdGEiOlsiaHR0cHM6Ly93d3cub25seW9mZmljZS5jb20vcGx1Z2luLXJhaW5ib3cvY29uZmlnLmpzb24iXX19LCJ3aWR0aCI6IjEwMCUiLCJoZWlnaHQiOiIxMDAlIiwiaWF0IjoxNzkwOTA3NjQ3fQ.YB2lKMyc6Jn9YMtzix_ZGUDy_Zb5cOM71le2q5HoAwk",
    config: {
      document: {
        fileType: "pdf",
        key: "7b68262c-b6a1-4dba-8d74-5240833c9fa1",
        title: "Example Document Title.pdf",
        url: "https://static.onlyoffice.com/assets/docs/samples/demo.pdf",
        permissions: { edit: true, review: true },
      },
      documentType: "pdf",
      editorConfig: {
        lang: "en",
        customization: {
          hideRightMenu: true,
          integrationMode: "embed",
          anonymous: { request: false },
        },
        plugins: {
          pluginsData: ["https://www.onlyoffice.com/plugin-rainbow/config.json"],
        },
      },
      width: "100%",
      height: "100%",
    },
  },
};

export default function DemoOnlineSuite({ onOpenQuote }: DemoOnlineSuiteProps) {
  const t = useTranslations("demo.onlineSuite");

  const [activeTab, setActiveTab] = useState<"docx" | "xlsx" | "pptx" | "pdf">("docx");
  const [isDocsApiLoaded, setIsDocsApiLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [loadedEditors, setLoadedEditors] = useState<Record<string, boolean>>({ docx: true });
  const editorsRef = useRef<Record<string, any>>({});

  const tabs = [
    {
      id: "docx",
      label: t("tabs.docx.label"),
      ext: ".DOCX",
      sub: t("tabs.docx.sub"),
      icon: FileText,
      brandColor: "#2563eb",
      activeBg: "#eff6ff",
      activeBorder: "#93c5fd",
      filename: t("tabs.docx.filename"),
    },
    {
      id: "xlsx",
      label: t("tabs.xlsx.label"),
      ext: ".XLSX",
      sub: t("tabs.xlsx.sub"),
      icon: FileSpreadsheet,
      brandColor: "#16a34a",
      activeBg: "#f0fdf4",
      activeBorder: "#86efac",
      filename: t("tabs.xlsx.filename"),
    },
    {
      id: "pptx",
      label: t("tabs.pptx.label"),
      ext: ".PPTX",
      sub: t("tabs.pptx.sub"),
      icon: Presentation,
      brandColor: "#ea580c",
      activeBg: "#fff7ed",
      activeBorder: "#fed7aa",
      filename: t("tabs.pptx.filename"),
    },
    {
      id: "pdf",
      label: t("tabs.pdf.label"),
      ext: ".PDF",
      sub: t("tabs.pdf.sub"),
      icon: FileEdit,
      brandColor: "#dc2626",
      activeBg: "#fef2f2",
      activeBorder: "#fca5a5",
      filename: t("tabs.pdf.filename"),
    },
  ] as const;

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // When active tab changes, mark it as needing to be loaded
  useEffect(() => {
    if (isDocsApiLoaded && !loadedEditors[activeTab]) {
      setLoadedEditors((prev) => ({ ...prev, [activeTab]: true }));
    }
  }, [activeTab, isDocsApiLoaded, loadedEditors]);

  // Dynamically load OnlyOffice DocsAPI script
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.DocsAPI) {
      setIsDocsApiLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://site.docs.onlyoffice.com/web-apps/apps/api/documents/api.js";
    script.async = true;
    script.onload = () => {
      setIsDocsApiLoaded(true);
    };
    script.onerror = () => {
      console.error("DocsAPI loading failed.");
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Initialize OnlyOffice DocEditor instances for each active tab
  useEffect(() => {
    if (!isDocsApiLoaded || typeof window === "undefined" || !window.DocsAPI) return;

    Object.keys(loadedEditors).forEach((tabKey) => {
      if (!loadedEditors[tabKey] || editorsRef.current[tabKey]) return;

      const container = document.getElementById(`editor-container-${tabKey}`);
      if (!container) return;

      const placeholderId = `editor-placeholder-${tabKey}`;
      container.innerHTML = `<div id="${placeholderId}" style="width: 100%; height: 100%;"></div>`;

      const editorData = ONLYOFFICE_CONFIGS[tabKey];
      if (editorData && window.DocsAPI) {
        try {
          const fullConfig = { ...editorData.config, token: editorData.token };
          editorsRef.current[tabKey] = new window.DocsAPI.DocEditor(placeholderId, fullConfig);
        } catch (err) {
          console.error(`Error setting up DocsAPI editor for ${tabKey}:`, err);
        }
      }
    });
  }, [loadedEditors, isDocsApiLoaded]);

  // Cleanup all editor instances on unmount
  useEffect(() => {
    return () => {
      Object.keys(editorsRef.current).forEach((tabKey) => {
        try {
          if (editorsRef.current[tabKey]) {
            editorsRef.current[tabKey].destroyEditor();
          }
        } catch (err) {
          console.warn(`Unmount destroy error for ${tabKey}:`, err);
        }
      });
      editorsRef.current = {};
    };
  }, []);

  return (
    <section id="demo-online" style={{ padding: "30px 20px 48px", backgroundColor: "#ffffff" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        {/* Section Heading & Subtitle */}
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 28px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 16px",
              borderRadius: "9999px",
              backgroundColor: "#fff7ed",
              border: "1px solid #fed7aa",
              fontSize: "12px",
              fontWeight: 800,
              color: "#ea580c",
              textTransform: "uppercase",
              letterSpacing: "0.4px",
              marginBottom: "12px",
            }}
          >
            <Sparkles size={14} color="#ea580c" />
            <span>{t("badge")}</span>
          </div>

          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "#0f172a", margin: "0 0 10px", letterSpacing: "-0.02em" }}>
            {t("title")}
          </h2>
          <p style={{ fontSize: "15px", color: "#64748b", margin: 0, lineHeight: 1.6 }}>
            {t("subtitle")}
          </p>
        </div>

        {/* 4 Application Tab Switcher */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "14px",
                  backgroundColor: isActive ? tab.activeBg : "#ffffff",
                  border: `2px solid ${isActive ? tab.brandColor : "#e2e8f0"}`,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: isActive ? `0 6px 16px ${tab.brandColor}22` : "0 2px 6px rgba(0,0,0,0.02)",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    backgroundColor: isActive ? tab.brandColor : "#f1f5f9",
                    color: isActive ? "#ffffff" : "#64748b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                  }}
                >
                  <Icon size={20} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 800, color: isActive ? "#0f172a" : "#334155" }}>
                      {tab.label}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: tab.brandColor,
                        backgroundColor: `${tab.brandColor}18`,
                        padding: "1px 6px",
                        borderRadius: "4px",
                      }}
                    >
                      {tab.ext}
                    </span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748b", marginTop: "1px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                    {tab.sub}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Workspace Container Frame */}
        <div
          style={{
            borderRadius: "18px",
            border: "1.5px solid #cbd5e1",
            backgroundColor: "#f8fafc",
            overflow: "hidden",
            boxShadow: "0 12px 32px rgba(15, 23, 42, 0.08)",
            display: "flex",
            flexDirection: "column",
            height: "720px",
          }}
        >
          {/* Editor Header Bar */}
          <div
            style={{
              padding: "10px 18px",
              backgroundColor: "#ffffff",
              borderBottom: "1.5px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "7px",
                  backgroundColor: currentTab.brandColor,
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <currentTab.icon size={15} />
              </div>
              <div>
                <span style={{ fontSize: "13.5px", fontWeight: 700, color: "#0f172a" }}>
                  {currentTab.filename}
                </span>
                <span style={{ fontSize: "11px", color: "#16a34a", fontWeight: 600, marginLeft: "8px" }}>
                  ● Live Cloud Workspace
                </span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  fontSize: "11.5px",
                  fontWeight: 700,
                  color: "#475569",
                  backgroundColor: "#f1f5f9",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  border: "1px solid #e2e8f0",
                }}
              >
                Docs API v8.2
              </span>
            </div>
          </div>

          {/* Editor Viewports */}
          <div style={{ flex: 1, position: "relative", backgroundColor: "#ffffff" }}>
            {tabs.map((tab) => (
              <div
                key={tab.id}
                id={`editor-container-${tab.id}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: activeTab === tab.id ? "block" : "none",
                }}
              />
            ))}

            {/* Loading state indicator */}
            {!isMounted || !isDocsApiLoaded ? (
              (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    zIndex: 2,
                    fontSize: "14px",
                    color: "#64748b",
                    fontWeight: 600,
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      border: "3px solid #fed7aa",
                      borderTopColor: "#ea580c",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  <span>
                    {t("loading")}
                  </span>
                </div>
              )
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  color: "#94a3b8",
                  fontWeight: 600,
                }}
              >
                {t("preparing")}
              </div>
            )}
          </div>
        </div>

        {/* Enterprise Private Cloud Consultation Bar */}
        <div
          style={{
            marginTop: "20px",
            padding: "16px 24px",
            borderRadius: "14px",
            backgroundColor: "#fff7ed",
            border: "1.5px solid #fed7aa",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Server size={22} color="#ea580c" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: "13.5px", color: "#475569", lineHeight: 1.5 }}>
              <strong style={{ color: "#0f172a" }}>
                {t("serverPrompt")}
              </strong>{" "}
              {t("serverDesc")}
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenQuote}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: "#ea580c",
              color: "#ffffff",
              border: "none",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(234, 88, 12, 0.3)",
              whiteSpace: "nowrap",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#c2410c";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#ea580c";
            }}
          >
            <span>{t("serverBtn")}</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
'''

# 3. DemoPcActivation.tsx
pc_activation_code = '''"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Download, HelpCircle, X, CheckCircle2, ShieldCheck, Terminal, Copy, Check, Sparkles, Laptop, FileCheck } from "lucide-react";

export default function DemoPcActivation() {
  const t = useTranslations("demo.pcActivation");

  const [guideOpen, setGuideOpen] = useState(false);
  const [copiedPs, setCopiedPs] = useState(false);

  const psCmd = "$ irm 'https://onlyoffice.mercytechglobal.com/Kich-Hoat-Demo-OnlyOffice-Mercy.bat' | iex";

  const handleCopyPs = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(psCmd);
      setCopiedPs(true);
      setTimeout(() => setCopiedPs(false), 2000);
    }
  };

  return (
    <section id="demo-pc" style={{ padding: "40px 20px 48px", backgroundColor: "#f8fafc" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Main Activation Card */}
        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #fffbf7 60%, #fff7ed 100%)",
            borderRadius: "24px",
            border: "1.5px solid #fed7aa",
            padding: "42px 36px",
            boxShadow: "0 12px 36px rgba(234, 88, 12, 0.08)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle glow accent */}
          <div
            style={{
              position: "absolute",
              top: "-60px",
              right: "-60px",
              width: "240px",
              height: "240px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255, 111, 61, 0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "36px",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Left Content Column */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "5px 14px",
                  borderRadius: "9999px",
                  backgroundColor: "#fff7ed",
                  border: "1px solid #fed7aa",
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#ea580c",
                  textTransform: "uppercase",
                  letterSpacing: "0.4px",
                  marginBottom: "14px",
                }}
              >
                <Sparkles size={14} color="#ea580c" />
                <span>{t("badge")}</span>
              </div>

              <h2
                style={{
                  fontSize: "clamp(24px, 3.5vw, 32px)",
                  fontWeight: 800,
                  color: "#0f172a",
                  margin: "0 0 14px",
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                }}
              >
                {t("title")}
                <span style={{ color: "#ea580c" }}>{t("titleHighlight")}</span>
              </h2>

              <p
                style={{
                  fontSize: "15px",
                  color: "#475569",
                  lineHeight: 1.65,
                  margin: "0 0 24px",
                }}
              >
                {t("desc")}
              </p>

              {/* 3 Value Points */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px", color: "#334155", fontWeight: 600 }}>
                  <CheckCircle2 size={17} color="#16a34a" style={{ flexShrink: 0 }} />
                  <span>{t("points.p1")}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px", color: "#334155", fontWeight: 600 }}>
                  <CheckCircle2 size={17} color="#16a34a" style={{ flexShrink: 0 }} />
                  <span>{t("points.p2")}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px", color: "#334155", fontWeight: 600 }}>
                  <CheckCircle2 size={17} color="#16a34a" style={{ flexShrink: 0 }} />
                  <span>{t("points.p3")}</span>
                </div>
              </div>
            </div>

            {/* Right Action Column */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                border: "1.5px solid #fed7aa",
                padding: "28px",
                boxShadow: "0 8px 24px rgba(234, 88, 12, 0.08)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Laptop size={18} color="#ea580c" />
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a" }}>
                    {t("platform")}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 700,
                    color: "#16a34a",
                    backgroundColor: "#f0fdf4",
                    padding: "3px 10px",
                    borderRadius: "9999px",
                    border: "1px solid #bbf7d0",
                  }}
                >
                  {t("verified")}
                </span>
              </div>

              {/* Primary Download Button */}
              <a
                href="/Kich-Hoat-Demo-OnlyOffice-Mercy.bat"
                download="Kich-Hoat-Demo-OnlyOffice-Mercy.bat"
                style={{
                  background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                  color: "#ffffff",
                  padding: "16px 24px",
                  borderRadius: "14px",
                  fontWeight: 800,
                  fontSize: "15px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow: "0 6px 20px rgba(234, 88, 12, 0.35)",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 10px 26px rgba(234, 88, 12, 0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(234, 88, 12, 0.35)";
                }}
                title={t("downloadBtn")}
              >
                <Download size={20} strokeWidth={2.5} />
                <span>{t("downloadBtn")}</span>
                <span
                  style={{
                    fontSize: "11px",
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    padding: "2px 7px",
                    borderRadius: "6px",
                    fontWeight: 700,
                  }}
                >
                  ~44 KB
                </span>
              </a>

              {/* Secondary Actions: Backup ZIP + Guide */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <a
                  href="/Kich-Hoat-Demo-OnlyOffice-Mercy.bat"
                  download="Kich-Hoat-Demo-OnlyOffice-Mercy.bat"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#334155",
                    border: "1.5px solid #cbd5e1",
                    borderRadius: "10px",
                    padding: "11px 14px",
                    fontSize: "13px",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "7px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#ea580c";
                    e.currentTarget.style.color = "#ea580c";
                    e.currentTarget.style.backgroundColor = "#fff7ed";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#cbd5e1";
                    e.currentTarget.style.color = "#334155";
                    e.currentTarget.style.backgroundColor = "#ffffff";
                  }}
                >
                  <Download size={15} color="#ea580c" />
                  <span>{t("mirrorBtn")}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setGuideOpen(true)}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#334155",
                    border: "1.5px solid #cbd5e1",
                    borderRadius: "10px",
                    padding: "11px 14px",
                    fontSize: "13px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "7px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#ea580c";
                    e.currentTarget.style.color = "#ea580c";
                    e.currentTarget.style.backgroundColor = "#fff7ed";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#cbd5e1";
                    e.currentTarget.style.color = "#334155";
                    e.currentTarget.style.backgroundColor = "#ffffff";
                  }}
                >
                  <HelpCircle size={15} color="#ea580c" />
                  <span>{t("guideBtn")}</span>
                </button>
              </div>

              {/* PowerShell 1-Liner for IT Admins (Light Mode) */}
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: "10px",
                  backgroundColor: "#f8fafc",
                  color: "#1e293b",
                  fontSize: "12px",
                  fontFamily: "monospace",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                  border: "1.5px solid #cbd5e1",
                }}
              >
                <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  <span style={{ color: "#ea580c", fontWeight: 700 }}>PS&gt; </span>
                  <span style={{ color: "#334155", fontWeight: 600 }}>irm https://onlyoffice.mercytech.../demo.bat | iex</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPs}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #cbd5e1",
                    borderRadius: "6px",
                    color: "#334155",
                    padding: "5px 10px",
                    fontSize: "11px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    flexShrink: 0,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  }}
                >
                  {copiedPs ? <Check size={12} color="#16a34a" /> : <Copy size={12} color="#ea580c" />}
                  <span>{copiedPs ? t("copied") : t("copy")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Modal */}
      {guideOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 23, 42, 0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 100000,
          }}
          onClick={() => setGuideOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              padding: "32px",
              maxWidth: "540px",
              width: "100%",
              boxShadow: "0 24px 48px rgba(15, 23, 42, 0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#fff7ed", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Download size={20} color="#ea580c" />
                </div>
                <h3 style={{ fontSize: "19px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                  {t("guide.title")}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setGuideOpen(false)}
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  padding: "6px",
                  color: "#64748b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px", color: "#334155" }}>
              <div style={{ display: "flex", gap: "12px", padding: "12px", borderRadius: "10px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#ea580c", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0, fontSize: "12px" }}>1</span>
                <div>
                  <strong style={{ color: "#0f172a" }}>{t("guide.step1Title")}</strong> {t("guide.step1Desc")}
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", padding: "12px", borderRadius: "10px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#ea580c", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0, fontSize: "12px" }}>2</span>
                <div>
                  <strong style={{ color: "#0f172a" }}>{t("guide.step2Title")}</strong> {t("guide.step2Desc")}
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", padding: "12px", borderRadius: "10px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#ea580c", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0, fontSize: "12px" }}>3</span>
                <div>
                  <strong style={{ color: "#0f172a" }}>{t("guide.step3Title")}</strong> {t("guide.step3Desc")}
                </div>
              </div>

              <div style={{ padding: "14px", background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: "10px", fontSize: "13px", color: "#166534", lineHeight: 1.5 }}>
                {t("guide.supportNote")}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setGuideOpen(false)}
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "12px",
                background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(234, 88, 12, 0.3)",
              }}
            >
              {t("guide.closeBtn")}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
'''

# 4. DemoMercyCheck.tsx
mercy_check_code = '''"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { ShieldAlert, Download, Copy, Check, Terminal, Eye, CheckCircle2, AlertTriangle, ShieldCheck, Zap, Lock } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

export default function DemoMercyCheck() {
  const t = useTranslations("demo.mercyCheck");

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPs, setCopiedPs] = useState(false);
  const [filterTab, setFilterTab] = useState<"all" | "crack" | "license" | "security">("all");

  const psCommand = "$ irm 'https://onlyoffice.mercytechglobal.com/MercyCheck.bat' | iex";

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.origin + "/MercyCheck.bat");
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleCopyPs = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(psCommand);
      setCopiedPs(true);
      setTimeout(() => setCopiedPs(false), 2000);
    }
  };

  return (
    <section id="mercy-check" style={{ padding: "48px 20px 60px", backgroundColor: "#ffffff" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header Section */}
        <div style={{ textAlign: "center", maxWidth: "840px", margin: "0 auto 36px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 18px",
              borderRadius: "9999px",
              backgroundColor: "#fef2f2",
              border: "1.5px solid #fecaca",
              fontSize: "12px",
              fontWeight: 800,
              color: "#dc2626",
              textTransform: "uppercase",
              letterSpacing: "0.4px",
              marginBottom: "14px",
            }}
          >
            <ShieldAlert size={15} color="#dc2626" />
            <span>{t("badge")}</span>
          </div>

          <h2 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 800, color: "#0f172a", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            {t("title")}
          </h2>

          <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.65, margin: 0 }}>
            {t("desc")}
          </p>
        </div>

        {/* 2 Columns: Download Info + Terminal Mock */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "28px",
            alignItems: "stretch",
          }}
        >
          {/* Left Column: Download & Features */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              border: "1.5px solid #e2e8f0",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#16a34a", display: "inline-block" }} />
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "#16a34a", textTransform: "uppercase" }}>
                    {t("version")}
                  </span>
                </div>
                <span style={{ fontSize: "11.5px", color: "#64748b", fontWeight: 600 }}>{t("portable")}</span>
              </div>

              <h3 style={{ fontSize: "21px", fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>
                {t("downloadCardTitle")}
              </h3>

              <p style={{ fontSize: "13.5px", color: "#64748b", margin: "0 0 22px", lineHeight: 1.6 }}>
                {t("downloadCardDesc")}
              </p>

              {/* Main Download BAT */}
              <a
                href="/MercyCheck.bat"
                download="MercyCheck.bat"
                style={{
                  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  color: "#ffffff",
                  padding: "15px 22px",
                  borderRadius: "14px",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: "14.5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 6px 20px rgba(220, 38, 38, 0.35)",
                  marginBottom: "12px",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(220, 38, 38, 0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(220, 38, 38, 0.35)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Download size={20} />
                  <span>{t("downloadBtn")}</span>
                </div>
                <span style={{ fontSize: "11px", backgroundColor: "rgba(0,0,0,0.2)", padding: "3px 9px", borderRadius: "8px", fontWeight: 700 }}>
                  1-Click • ~44 KB
                </span>
              </a>

              {/* Secondary Buttons */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
                <a
                  href="/MercyCheck.bat"
                  download="MercyCheck.bat"
                  style={{
                    padding: "11px 14px",
                    borderRadius: "10px",
                    border: "1.5px solid #cbd5e1",
                    backgroundColor: "#f8fafc",
                    color: "#334155",
                    fontSize: "12.5px",
                    fontWeight: 700,
                    textDecoration: "none",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#dc2626";
                    e.currentTarget.style.color = "#dc2626";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#cbd5e1";
                    e.currentTarget.style.color = "#334155";
                  }}
                >
                  <Download size={14} color="#dc2626" />
                  <span>{t("zipBtn")}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  style={{
                    padding: "11px 14px",
                    borderRadius: "10px",
                    border: "1.5px solid #cbd5e1",
                    backgroundColor: "#f8fafc",
                    color: "#334155",
                    fontSize: "12.5px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#dc2626";
                    e.currentTarget.style.color = "#dc2626";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#cbd5e1";
                    e.currentTarget.style.color = "#334155";
                  }}
                >
                  {copiedLink ? <Check size={14} color="#16a34a" /> : <Copy size={14} color="#dc2626" />}
                  <span>{copiedLink ? t("copiedLink") : t("copyLink")}</span>
                </button>
              </div>

              {/* 4 Feature Points */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "#475569", borderTop: "1px solid #f1f5f9", paddingTop: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <AlertTriangle size={16} color="#dc2626" style={{ flexShrink: 0 }} />
                  <span>
                    <strong>{t("features.f1Title")}</strong> {t("features.f1Desc")}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0 }} />
                  <span>
                    <strong>{t("features.f2Title")}</strong> {t("features.f2Desc")}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <Lock size={16} color="#ea580c" style={{ flexShrink: 0 }} />
                  <span>
                    <strong>{t("features.f3Title")}</strong> {t("features.f3Desc")}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <Zap size={16} color="#ea580c" style={{ flexShrink: 0 }} />
                  <span>
                    <strong>{t("features.f4Title")}</strong> {t("features.f4Desc")}
                  </span>
                </div>
              </div>
            </div>

            {/* PowerShell 1-liner (Light Mode) */}
            <div style={{ marginTop: "20px", paddingTop: "14px", borderTop: "1px solid #f1f5f9" }}>
              <div style={{ fontSize: "11.5px", fontWeight: 700, color: "#64748b", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                <Terminal size={13} color="#ea580c" />
                <span>{t("psLabel")}</span>
              </div>
              <div
                onClick={handleCopyPs}
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  fontFamily: "monospace",
                  fontSize: "12px",
                  color: "#0f172a",
                  border: "1.5px solid #cbd5e1",
                }}
                title={t("psTitle")}
              >
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  <strong style={{ color: "#ea580c" }}>PS&gt; </strong>{psCommand}
                </span>
                <span style={{ marginLeft: "8px", backgroundColor: "#ffffff", border: "1px solid #cbd5e1", padding: "3px 8px", borderRadius: "5px", fontSize: "10.5px", color: copiedPs ? "#16a34a" : "#475569", flexShrink: 0, fontWeight: 700 }}>
                  {copiedPs ? t("copiedLink") : "COPY"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Light Terminal / Inspector Mock */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              border: "1.5px solid #cbd5e1",
              overflow: "hidden",
              boxShadow: "0 12px 36px rgba(15, 23, 42, 0.08)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Terminal Window Header (Light) */}
            <div
              style={{
                backgroundColor: "#f8fafc",
                borderBottom: "1.5px solid #e2e8f0",
                padding: "12px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#ef4444", display: "inline-block" }} />
                <span style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#f59e0b", display: "inline-block" }} />
                <span style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#10b981", display: "inline-block" }} />
                <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#334155", marginLeft: "8px", fontWeight: 700 }}>
                  {t("consoleTitle")}
                </span>
              </div>

              {/* Filter Tabs (Light) */}
              <div style={{ display: "flex", gap: "4px" }}>
                {(["all", "crack", "license", "security"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setFilterTab(tab)}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "6px",
                      border: filterTab === tab ? "none" : "1px solid #cbd5e1",
                      backgroundColor: filterTab === tab ? "#ea580c" : "#ffffff",
                      color: filterTab === tab ? "#ffffff" : "#475569",
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {t(`filterTabs.${tab}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Log Content (Light Clean) */}
            <div
              style={{
                padding: "20px",
                fontFamily: "monospace",
                fontSize: "12px",
                lineHeight: 1.65,
                color: "#1e293b",
                backgroundColor: "#fbfcfe",
                maxHeight: "440px",
                overflowY: "auto",
                flex: 1,
              }}
            >
              {/* ASCII Header */}
              {(filterTab === "all" || filterTab === "crack") && (
                <div style={{ color: "#ea580c", marginBottom: "14px", whiteSpace: "pre", fontSize: "10.5px", lineHeight: 1.25, fontWeight: 700 }}>
{`========================================================================
  MERCY CHECK v2.0 - AUDIT REPORT & MALWARE SCANNER
  Provided by Mercy Technology Co., Ltd. | Hotline: 0763.068.614
========================================================================`}
                </div>
              )}

              {/* Section I: Hardware */}
              {filterTab === "all" && (
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ color: "#0369a1", fontWeight: 800 }}>
                    [I. SYSTEM HARDWARE OVERVIEW]
                  </div>
                  <div style={{ paddingLeft: "12px", color: "#475569" }}>
                    <div>• Mainboard   : ASUS PRIME B760M-A D4 (LGA1700)</div>
                    <div>• CPU         : 13th Gen Intel(R) Core(TM) i5-13400 (10 cores, 16 threads)</div>
                    <div>• RAM         : 16.0 GB (3200 MHz, 2 slots)</div>
                    <div>• Storage     : KINGSTON NVMe PCIe 4.0 1024 GB (SMART Health: 99% - Good)</div>
                  </div>
                </div>
              )}

              {/* Section II: License */}
              {(filterTab === "all" || filterTab === "license") && (
                <div style={{ marginBottom: "14px", borderTop: "1px solid #e2e8f0", paddingTop: "10px" }}>
                  <div style={{ color: "#0369a1", fontWeight: 800 }}>
                    [II. SYSTEM & OFFICE LICENSING]
                  </div>
                  <div style={{ paddingLeft: "12px" }}>
                    <div>
                      • Windows     : Windows 11 Pro 64-bit —{" "}
                      <span style={{ color: "#16a34a", fontWeight: 800 }}>
                        ✓ Activated (Genuine Digital License)
                      </span>
                    </div>
                    <div>• Product Key : XXXXX-XXXXX-XXXXX-XXXXX-3V66T</div>
                    <div>
                      • MS Office   :{" "}
                      <span style={{ color: "#dc2626", fontWeight: 800, backgroundColor: "#fee2e2", padding: "1px 6px", borderRadius: "4px" }}>
                        Office LTSC Pro Plus 2021 — KMS 127.0.0.1 (HIGH-RISK ILLEGAL CRACK)
                      </span>
                    </div>
                    <div>
                      • ONLYOFFICE  :{" "}
                      <span style={{ color: "#16a34a", fontWeight: 800 }}>
                        ✓ Activated (Mercy Tech Certified - Lifetime)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Section III: Crack Detection */}
              {(filterTab === "all" || filterTab === "crack") && (
                <div style={{ marginBottom: "14px", borderTop: "1px solid #e2e8f0", paddingTop: "10px" }}>
                  <div style={{ color: "#dc2626", fontWeight: 800 }}>
                    [III. CRACK & MALWARE DETECTION REPORT]
                  </div>
                  <div style={{ paddingLeft: "12px", backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "10px", marginTop: "6px" }}>
                    <div style={{ color: "#b91c1c", fontWeight: 700 }}>
                      [!] PROCESS DETECTED: AutoKMS.exe running silently at C:\\Windows\\AutoKMS\\
                    </div>
                    <div style={{ color: "#b91c1c", fontWeight: 700 }}>
                      [!] DLL INJECTION DETECTED: sppc.dll (Ohook memory hook in active process)
                    </div>
                    <div style={{ color: "#b91c1c", fontWeight: 700 }}>
                      [!] HOSTS FILE MODIFIED: 127.0.0.1 kms8.msguides.com redirected
                    </div>
                    <div style={{ color: "#ea580c", marginTop: "4px", fontWeight: 800 }}>
                      =&gt; WARNING: High vulnerability to ransomware & intellectual property violation!
                    </div>
                  </div>
                </div>
              )}

              {/* Section IV: Security */}
              {(filterTab === "all" || filterTab === "security") && (
                <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "10px" }}>
                  <div style={{ color: "#0369a1", fontWeight: 800 }}>
                    [IV. CYBERSECURITY & DEFENDER POSTURE]
                  </div>
                  <div style={{ paddingLeft: "12px", color: "#475569" }}>
                    <div>
                      • Windows Defender :{" "}
                      <span style={{ color: "#dc2626", fontWeight: 700 }}>
                        Real-time Protection disabled by AutoKMS
                      </span>
                    </div>
                    <div>
                      • Windows Firewall : Enabled (Active)
                    </div>
                    <div>
                      • Port 135/445     : Warning: Vulnerable to lateral traversal across LAN
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Legal Audit Notice Box */}
        <div
          style={{
            marginTop: "28px",
            padding: "20px 28px",
            borderRadius: "16px",
            backgroundColor: "#fff7ed",
            border: "1.5px solid #fed7aa",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "18px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <ShieldCheck size={28} color="#ea580c" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", marginBottom: "3px" }}>
                {t("legalBanner.title")}
              </div>
              <div style={{ fontSize: "13px", color: "#475569", lineHeight: 1.5 }}>
                {t("legalBanner.desc")}
              </div>
            </div>
          </div>

          <a
            href="https://www.messenger.com/t/286163107904324"
            target="_blank"
            rel="noopener noreferrer"
            onClick={openMessengerChat}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "11px 22px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
              color: "#ffffff",
              fontSize: "13.5px",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(234, 88, 12, 0.25)",
              whiteSpace: "nowrap",
            }}
          >
            <span>{t("legalBanner.btn")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
'''

# 5. DemoEnterpriseCta.tsx
enterprise_cta_code = '''"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ShieldCheck, Server, Headphones, FileText, ArrowRight, DollarSign, MessageCircle, Phone, Sparkles } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

interface DemoEnterpriseCtaProps {
  onOpenQuote: () => void;
}

export default function DemoEnterpriseCta({ onOpenQuote }: DemoEnterpriseCtaProps) {
  const t = useTranslations("demo.enterpriseCta");

  return (
    <section style={{ padding: "40px 20px 80px", backgroundColor: "#ffffff" }}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          background: "linear-gradient(135deg, #ffffff 0%, #fffbf7 50%, #fff7ed 100%)",
          borderRadius: "28px",
          border: "2px solid #fed7aa",
          padding: "54px 40px",
          color: "#0f172a",
          boxShadow: "0 16px 45px rgba(234, 88, 12, 0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle orange ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 111, 61, 0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "880px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 18px",
              borderRadius: "9999px",
              backgroundColor: "#ffffff",
              border: "1.5px solid #fed7aa",
              fontSize: "12px",
              fontWeight: 800,
              color: "#ea580c",
              marginBottom: "18px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              boxShadow: "0 2px 8px rgba(234, 88, 12, 0.08)",
            }}
          >
            <Sparkles size={14} color="#ea580c" />
            <span>{t("badge")}</span>
          </div>

          {/* Heading */}
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 38px)",
              fontWeight: 800,
              lineHeight: 1.25,
              color: "#0f172a",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            {t("titlePrefix")}
            <span
              style={{
                background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              {t("titleHighlight")}
            </span>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 16.5px)",
              lineHeight: 1.65,
              color: "#475569",
              marginBottom: "40px",
              fontWeight: 500,
            }}
          >
            {t("subtitle")}
          </p>

          {/* 4 Value Pillars Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              marginBottom: "42px",
              textAlign: "left",
            }}
          >
            {/* Pillar 1 */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1.5px solid #fed7aa",
                borderRadius: "18px",
                padding: "24px 20px",
                boxShadow: "0 4px 14px rgba(234, 88, 12, 0.05)",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "#fff7ed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <ShieldCheck size={24} color="#ea580c" />
              </div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", marginBottom: "6px" }}>
                {t("pillars.p1Title")}
              </div>
              <div style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.55 }}>
                {t("pillars.p1Desc")}
              </div>
            </div>

            {/* Pillar 2 */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1.5px solid #e2e8f0",
                borderRadius: "18px",
                padding: "24px 20px",
                boxShadow: "0 4px 14px rgba(15, 23, 42, 0.03)",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "#eff6ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <Server size={24} color="#2563eb" />
              </div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", marginBottom: "6px" }}>
                {t("pillars.p2Title")}
              </div>
              <div style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.55 }}>
                {t("pillars.p2Desc")}
              </div>
            </div>

            {/* Pillar 3 */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1.5px solid #e2e8f0",
                borderRadius: "18px",
                padding: "24px 20px",
                boxShadow: "0 4px 14px rgba(15, 23, 42, 0.03)",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "#f0fdf4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <DollarSign size={24} color="#16a34a" />
              </div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", marginBottom: "6px" }}>
                {t("pillars.p3Title")}
              </div>
              <div style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.55 }}>
                {t("pillars.p3Desc")}
              </div>
            </div>

            {/* Pillar 4 */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1.5px solid #e2e8f0",
                borderRadius: "18px",
                padding: "24px 20px",
                boxShadow: "0 4px 14px rgba(15, 23, 42, 0.03)",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "#fdf2f8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <Headphones size={24} color="#db2777" />
              </div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", marginBottom: "6px" }}>
                {t("pillars.p4Title")}
              </div>
              <div style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.55 }}>
                {t("pillars.p4Desc")}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            {/* Quote Modal Trigger Button */}
            <button
              type="button"
              onClick={onOpenQuote}
              style={{
                background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                color: "#ffffff",
                border: "none",
                borderRadius: "14px",
                padding: "16px 34px",
                fontSize: "15px",
                fontWeight: 800,
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(234, 88, 12, 0.35)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 28px rgba(234, 88, 12, 0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(234, 88, 12, 0.35)";
              }}
            >
              <FileText size={18} />
              <span>{t("quoteBtn")}</span>
              <ArrowRight size={17} />
            </button>

            {/* Messenger Chat Button */}
            <a
              href="https://www.messenger.com/t/286163107904324"
              target="_blank"
              rel="noopener noreferrer"
              onClick={openMessengerChat}
              style={{
                backgroundColor: "#ffffff",
                color: "#ea580c",
                border: "1.5px solid #fed7aa",
                borderRadius: "14px",
                padding: "15px 26px",
                fontSize: "14.5px",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                cursor: "pointer",
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(234, 88, 12, 0.08)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#fff7ed";
                e.currentTarget.style.borderColor = "#ff6f3d";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.borderColor = "#fed7aa";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <MessageCircle size={18} color="#ea580c" />
              <span>{t("chatBtn")}</span>
            </a>

            {/* Direct Hotline */}
            <a
              href="tel:0763068614"
              style={{
                color: "#ea580c",
                fontSize: "14px",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "10px 16px",
              }}
            >
              <Phone size={15} color="#ea580c" />
              <span>{t("hotline")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
'''

# 6. PricingQuoteModal.tsx
quote_modal_code = '''"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X, CheckCircle2, MessageCircle } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

interface PricingQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

export default function PricingQuoteModal({ isOpen, onClose, defaultProduct }: PricingQuoteModalProps) {
  const t = useTranslations("pricingQuoteModal");

  const [product, setProduct] = useState<string>("key-online");
  const [quantity, setQuantity] = useState<string>("5-49");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [needVat, setNeedVat] = useState(false);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (defaultProduct) {
      const lower = defaultProduct.toLowerCase();
      if (lower.includes("portal") || lower.includes("quản trị")) setProduct("portal-quan-tri");
      else if (lower.includes("enterprise") || lower.includes("server") || lower.includes("máy chủ")) setProduct("docs-enterprise");
      else if (lower.includes("đại lý") || lower.includes("sỉ") || lower.includes("reseller")) setProduct("dai-ly-si");
      else setProduct("key-online");
    }
  }, [defaultProduct]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = `[YÊU CẦU BÁO GIÁ BẢN QUYỀN ONLYOFFICE]%0A` +
      `Sản phẩm quan tâm: ${product}%0A` +
      `Số lượng dự kiến: ${quantity}%0A` +
      `Khách hàng: ${fullName}%0A` +
      `SĐT liên hệ: ${phone}%0A` +
      (company ? `Công ty / Cửa hàng: ${company}%0A` : "") +
      (needVat ? `Yêu cầu: Xuất hóa đơn VAT%0A` : "") +
      (note ? `Ghi chú: ${note}%0A` : "");

    setTimeout(() => {
      openMessengerChat();
    }, 600);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(30, 41, 59, 0.75)",
        backdropFilter: "blur(5px)",
        zIndex: 100000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          maxWidth: "540px",
          width: "100%",
          overflow: "hidden",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
          position: "relative",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          border: "1px solid #e5e5e5",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #f0f0f0",
            padding: "20px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#ff6f3d", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {t("badge")}
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#333333", margin: "2px 0 0" }}>
              {t("title")}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "#f4f4f5",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#666666",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "24px", overflowY: "auto", flex: 1 }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "30px 10px" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "#dcfce7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <CheckCircle2 size={32} color="#16a34a" />
              </div>
              <h4 style={{ fontSize: "19px", fontWeight: 800, color: "#16a34a", margin: "0 0 8px" }}>
                {t("successTitle")}
              </h4>
              <p style={{ fontSize: "14px", color: "#666666", lineHeight: 1.6, margin: "0 0 20px" }}>
                {t("successDesc")}
              </p>
              <button
                type="button"
                onClick={onClose}
                style={{
                  backgroundColor: "#ff6f3d",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "10px 24px",
                  fontWeight: 700,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {t("closeBtn")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Product */}
              <div>
                <label style={{ fontSize: "13px", fontWeight: 700, color: "#333333", display: "block", marginBottom: "6px" }}>
                  {t("productLabel")}
                </label>
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    border: "1.5px solid #d4d4d8",
                    fontSize: "13.5px",
                    fontWeight: 600,
                    color: "#333333",
                    outline: "none",
                  }}
                >
                  <option value="key-online">
                    {t("products.keyOnline")}
                  </option>
                  <option value="portal-quan-tri">
                    {t("products.portal")}
                  </option>
                  <option value="docs-enterprise">
                    {t("products.enterprise")}
                  </option>
                  <option value="dai-ly-si">
                    {t("products.reseller")}
                  </option>
                </select>
              </div>

              {/* Quantity Tier */}
              <div>
                <label style={{ fontSize: "13px", fontWeight: 700, color: "#333333", display: "block", marginBottom: "6px" }}>
                  {t("quantityLabel")}
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    border: "1.5px solid #d4d4d8",
                    fontSize: "13.5px",
                    color: "#333333",
                    outline: "none",
                  }}
                >
                  <option value="1-4">
                    {t("quantities.tier1")}
                  </option>
                  <option value="5-49">
                    {t("quantities.tier2")}
                  </option>
                  <option value="50+">
                    {t("quantities.tier3")}
                  </option>
                  <option value="dai-ly">
                    {t("quantities.tier4")}
                  </option>
                </select>
              </div>

              {/* Contact Inputs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#333333", display: "block", marginBottom: "4px" }}>
                    {t("fullNameLabel")}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t("fullNamePlaceholder")}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "6px",
                      border: "1px solid #d4d4d8",
                      fontSize: "13px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#333333", display: "block", marginBottom: "4px" }}>
                    {t("phoneLabel")}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={t("phonePlaceholder")}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "6px",
                      border: "1px solid #d4d4d8",
                      fontSize: "13px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* Company & VAT */}
              <div>
                <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#333333", display: "block", marginBottom: "4px" }}>
                  {t("companyLabel")}
                </label>
                <input
                  type="text"
                  placeholder={t("companyPlaceholder")}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "6px",
                    border: "1px solid #d4d4d8",
                    fontSize: "13px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12.5px", fontWeight: 600, color: "#333333", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={needVat}
                    onChange={(e) => setNeedVat(e.target.checked)}
                  />
                  <span>
                    {t("vatCheckbox")}
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                style={{
                  backgroundColor: "#ff6f3d",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "13px",
                  fontSize: "14.5px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 14px rgba(255, 111, 61, 0.3)",
                  marginTop: "6px",
                }}
              >
                <MessageCircle size={18} />
                <span>{t("submitBtn")}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
'''

with open(r"d:\mercy\testCloneGiaoDien\web\src\components\demo\DemoHero.tsx", "w", encoding="utf-8") as f:
    f.write(hero_code)
print("DemoHero.tsx updated!")

with open(r"d:\mercy\testCloneGiaoDien\web\src\components\demo\DemoOnlineSuite.tsx", "w", encoding="utf-8") as f:
    f.write(online_suite_code)
print("DemoOnlineSuite.tsx updated!")

with open(r"d:\mercy\testCloneGiaoDien\web\src\components\demo\DemoPcActivation.tsx", "w", encoding="utf-8") as f:
    f.write(pc_activation_code)
print("DemoPcActivation.tsx updated!")

with open(r"d:\mercy\testCloneGiaoDien\web\src\components\demo\DemoMercyCheck.tsx", "w", encoding="utf-8") as f:
    f.write(mercy_check_code)
print("DemoMercyCheck.tsx updated!")

with open(r"d:\mercy\testCloneGiaoDien\web\src\components\demo\DemoEnterpriseCta.tsx", "w", encoding="utf-8") as f:
    f.write(enterprise_cta_code)
print("DemoEnterpriseCta.tsx updated!")

with open(r"d:\mercy\testCloneGiaoDien\web\src\components\pricing\PricingQuoteModal.tsx", "w", encoding="utf-8") as f:
    f.write(quote_modal_code)
print("PricingQuoteModal.tsx updated!")

print("ALL COMPONENTS SUCCESSFULLY REFACTORED TO USE useTranslations!")
