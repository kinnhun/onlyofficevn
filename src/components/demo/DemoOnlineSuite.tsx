"use client";

import React, { useState, useEffect, useRef } from "react";
import { FileText, FileSpreadsheet, Presentation, FileEdit } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<"docx" | "xlsx" | "pptx" | "pdf">("docx");
  const [isDocsApiLoaded, setIsDocsApiLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [loadedEditors, setLoadedEditors] = useState<Record<string, boolean>>({ docx: true });
  const editorsRef = useRef<Record<string, any>>({});

  const tabs = [
    { id: "docx", label: "Soạn thảo Văn bản (Word)", icon: FileText },
    { id: "xlsx", label: "Bảng tính & Số liệu (Excel)", icon: FileSpreadsheet },
    { id: "pptx", label: "Trình chiếu & Bản trình bày (PowerPoint)", icon: Presentation },
    { id: "pdf", label: "Biên tập & Chỉnh sửa (PDF)", icon: FileEdit },
  ] as const;

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
    <section id="demo-online" style={{ padding: "20px 20px 30px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Tab Selection */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "28px",
          }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "12px 22px",
                  borderRadius: "9999px",
                  border: isActive ? "1.5px solid #eab308" : "1px solid rgba(234, 179, 8, 0.25)",
                  background: isActive
                    ? "linear-gradient(135deg, #f8d26c 0%, #ffd75f 100%)"
                    : "rgba(255, 255, 255, 0.75)",
                  color: isActive ? "#3f2c00" : "#513b0d",
                  fontSize: "13px",
                  fontWeight: 800,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  boxShadow: isActive ? "0 8px 20px rgba(248, 185, 20, 0.25)" : "0 2px 6px rgba(0, 0, 0, 0.04)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "#ffffff";
                    e.currentTarget.style.borderColor = "rgba(234, 179, 8, 0.5)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.75)";
                    e.currentTarget.style.borderColor = "rgba(234, 179, 8, 0.25)";
                  }
                }}
              >
                <Icon size={16} color={isActive ? "#3f2c00" : "#b45309"} style={{ flexShrink: 0 }} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Live Real ONLYOFFICE Cloud Editor Container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "720px",
            borderRadius: "2.5rem",
            overflow: "hidden",
            border: "1.5px solid rgba(255, 255, 255, 0.8)",
            boxShadow: "0 32px 80px rgba(91, 66, 17, 0.06)",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(16px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {isMounted ? (
            isDocsApiLoaded ? (
              <div style={{ width: "100%", height: "100%", flexGrow: 1, position: "relative", backgroundColor: "#ffffff" }}>
                {["docx", "xlsx", "pptx", "pdf"].map((tabKey) => {
                  const isLoaded = loadedEditors[tabKey];
                  const isTabActive = activeTab === tabKey;
                  return (
                    <div
                      key={tabKey}
                      id={`editor-container-${tabKey}`}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#ffffff",
                        transition: "opacity 0.3s ease",
                        opacity: isTabActive ? 1 : 0,
                        zIndex: isTabActive ? 10 : 0,
                        pointerEvents: isTabActive ? "auto" : "none",
                      }}
                    >
                      {isLoaded ? (
                        <div id={`editor-placeholder-${tabKey}`} style={{ width: "100%", height: "100%", flexGrow: 1 }}>
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "13px",
                              color: "#94a3b8",
                              fontWeight: 600,
                            }}
                          >
                            Đang tải tài liệu OnlyOffice...
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "13px",
                            color: "#94a3b8",
                            fontWeight: 600,
                          }}
                        >
                          Đang chờ kích hoạt...
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  flexGrow: 1,
                  backgroundColor: "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "12px",
                  fontSize: "13.5px",
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
                <span>Đang kết nối máy chủ OnlyOffice đám mây...</span>
              </div>
            )
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                flexGrow: 1,
                backgroundColor: "#f8fafc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                color: "#94a3b8",
                fontWeight: 600,
              }}
            >
              Đang chuẩn bị giao diện...
            </div>
          )}
        </div>

        {/* Note below mirroring official demo */}
        <div
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "rgba(117, 97, 59, 0.7)",
            marginTop: "20px",
            marginBottom: "16px",
            maxWidth: "700px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.6,
            fontWeight: 600,
          }}
        >
          Hệ thống chạy trực tiếp trên máy chủ đám mây của ONLYOFFICE. Để triển khai hệ thống lưu trữ và máy chủ riêng bảo mật On-Premise cho doanh nghiệp của bạn, vui lòng liên hệ{" "}
          <button
            type="button"
            onClick={onOpenQuote}
            style={{
              background: "none",
              border: "none",
              color: "#ea580c",
              fontWeight: 800,
              textDecoration: "underline",
              cursor: "pointer",
              padding: 0,
              font: "inherit",
            }}
          >
            CÔNG TY TNHH CÔNG NGHỆ MERCY
          </button>
          .
        </div>
      </div>
    </section>
  );
}
