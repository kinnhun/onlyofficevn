"use client";

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
    setIsMounted(true);
    if (typeof window === "undefined") return;

    const SCRIPT_SRC = "https://site.docs.onlyoffice.com/web-apps/apps/api/documents/api.js";
    const SCRIPT_ID = "onlyoffice-api-script";

    // Ensure the <script> tag is ALWAYS present in document.head
    // DocsAPI.DocEditor uses document.scripts in getBasePath() to construct iframe src!
    let existingScript = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!existingScript) {
      existingScript = document.querySelector(`script[src="${SCRIPT_SRC}"]`) as HTMLScriptElement | null;
    }

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => {
        setIsDocsApiLoaded(true);
      };
      script.onerror = () => {
        console.error("DocsAPI loading failed.");
      };
      document.head.appendChild(script);
    } else {
      if (window.DocsAPI) {
        setIsDocsApiLoaded(true);
      } else {
        existingScript.addEventListener("load", () => {
          setIsDocsApiLoaded(true);
        });
      }
    }

    // DO NOT remove script from document.head on unmount because DocsAPI.DocEditor
    // inspects document.scripts via getBasePath() to resolve the cloud editor URL!
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
          // Prevent external DocsAPI iframe from stealing scroll position if user just landed on top
          setTimeout(() => {
            if (typeof window !== "undefined" && !window.location.hash && window.scrollY < 400) {
              window.scrollTo({ top: 0, behavior: "instant" });
            }
          }, 350);
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
    <section id="demo-online" className="demo-online-section">
      <style>{`
        .demo-online-section {
          padding: 30px 20px 48px;
          background-color: #ffffff;
        }
        .demo-online-tabs {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 12px;
          margin-bottom: 16px;
        }
        .demo-online-tab-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 14px;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-sizing: border-box;
        }
        .demo-online-frame {
          border-radius: 18px;
          border: 1.5px solid #cbd5e1;
          background-color: #f8fafc;
          overflow: hidden;
          box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);
          display: flex;
          flex-direction: column;
          height: 720px;
        }
        .demo-online-mobile-tip {
          display: none;
        }

        @media (max-width: 768px) {
          .demo-online-section {
            padding: 24px 12px 36px !important;
          }
          .demo-online-tabs {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
            margin-bottom: 12px !important;
          }
          .demo-online-tab-btn {
            padding: 8px 10px !important;
            border-radius: 10px !important;
            gap: 8px !important;
          }
          .demo-online-frame {
            height: 520px !important;
            border-radius: 14px !important;
          }
          .demo-online-mobile-tip {
            display: block !important;
            font-size: 11.5px !important;
            color: #64748b !important;
            text-align: center !important;
            margin-top: 10px !important;
          }
        }
      `}</style>
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
        <div className="demo-online-tabs">
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
        <div className="demo-online-frame">
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

        {/* Mobile Orientation Tip */}
        <div className="demo-online-mobile-tip">
          💡 Gợi ý: Xoay ngang điện thoại hoặc mở trên máy tính để có trải nghiệm soạn thảo Online tốt nhất.
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
