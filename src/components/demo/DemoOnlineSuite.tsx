"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const [activeTab, setActiveTab] = useState<"docx" | "xlsx" | "pptx" | "pdf">("docx");
  const [isDocsApiLoaded, setIsDocsApiLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [loadedEditors, setLoadedEditors] = useState<Record<string, boolean>>({ docx: true });
  const editorsRef = useRef<Record<string, any>>({});

  const tabs = [
    {
      id: "docx",
      label: "Soạn Thảo Văn Bản",
      ext: ".DOCX",
      sub: "Tương thích 100% Word",
      icon: FileText,
      brandColor: "#2563eb",
      activeBg: "#eff6ff",
      activeBorder: "#93c5fd",
      filename: "Hop-Dong-Kinh-Te-OnlyOffice-Mercy.docx",
    },
    {
      id: "xlsx",
      label: "Bảng Tính & Số Liệu",
      ext: ".XLSX",
      sub: "Đầy đủ hàm & công thức",
      icon: FileSpreadsheet,
      brandColor: "#16a34a",
      activeBg: "#f0fdf4",
      activeBorder: "#86efac",
      filename: "Bang-Bao-Gia-Chi-Tiet-Doanh-Nghiep.xlsx",
    },
    {
      id: "pptx",
      label: "Trình Chiếu Slide",
      ext: ".PPTX",
      sub: "Hiệu ứng chuyển động mượt mà",
      icon: Presentation,
      brandColor: "#ea580c",
      activeBg: "#fff7ed",
      activeBorder: "#fed7aa",
      filename: "Gioi-Thieu-Giai-Phap-OnlyOffice-Vietnam.pptx",
    },
    {
      id: "pdf",
      label: "Chỉnh Sửa Biểu Mẫu",
      ext: ".PDF",
      sub: "Điền form & ký số điện tử",
      icon: FileEdit,
      brandColor: "#dc2626",
      activeBg: "#fef2f2",
      activeBorder: "#fca5a5",
      filename: "Bieu-Mau-Phap-Ly-AGPLv3.pdf",
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
            <span>TRÌNH SOẠN THẢO TRỰC TUYẾN ONLYOFFICE CHÍNH HÃNG</span>
          </div>

          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "#0f172a", margin: "0 0 10px", letterSpacing: "-0.02em" }}>
            Trải Nghiệm Đầy Đủ 4 Ứng Dụng Văn Phòng Số
          </h2>
          <p style={{ fontSize: "15px", color: "#64748b", margin: 0, lineHeight: 1.6 }}>
            Bấm chọn từng định dạng bên dưới. Bạn có thể gõ nội dung, chèn bảng biểu, định dạng phông chữ và tính toán số liệu trực tiếp ngay trên khung giao diện thời gian thực.
          </p>
        </div>

        {/* 4 Professional Tab Selection Cards (Equal 4 Columns, No 3+1 Wrap) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "12px",
            marginBottom: "20px",
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
                  padding: "14px 18px",
                  borderRadius: "14px",
                  border: isActive ? `2px solid ${tab.brandColor}` : "1.5px solid #e2e8f0",
                  backgroundColor: isActive ? tab.activeBg : "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  boxShadow: isActive ? `0 8px 20px ${tab.brandColor}25` : "0 2px 6px rgba(15, 23, 42, 0.04)",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  textAlign: "left",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "#cbd5e1";
                    e.currentTarget.style.backgroundColor = "#f8fafc";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.backgroundColor = "#ffffff";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                {/* Icon Container */}
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    backgroundColor: isActive ? "#ffffff" : "#f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: isActive ? `0 2px 8px ${tab.brandColor}30` : "none",
                  }}
                >
                  <Icon size={22} color={tab.brandColor} />
                </div>

                {/* Text Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 700, color: isActive ? "#0f172a" : "#334155" }}>
                      {tab.label}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 800,
                        padding: "2px 6px",
                        borderRadius: "4px",
                        backgroundColor: isActive ? tab.brandColor : "#e2e8f0",
                        color: isActive ? "#ffffff" : "#64748b",
                      }}
                    >
                      {tab.ext}
                    </span>
                    <span style={{ fontSize: "11.5px", color: "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {tab.sub}
                    </span>
                  </div>
                </div>

                {/* Active Indicator Bar */}
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      backgroundColor: tab.brandColor,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Live ONLYOFFICE Window Frame Mockup */}
        <div
          style={{
            position: "relative",
            width: "100%",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1.5px solid #cbd5e1",
            boxShadow: "0 20px 45px -10px rgba(15, 23, 42, 0.12), 0 8px 16px -6px rgba(15, 23, 42, 0.08)",
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Mac/Windows Chrome Header Bar */}
          <div
            style={{
              height: "44px",
              backgroundColor: "#f8fafc",
              borderBottom: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 16px",
              userSelect: "none",
            }}
          >
            {/* Window control dots */}
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <span style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#ef4444", display: "inline-block" }} />
              <span style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#f59e0b", display: "inline-block" }} />
              <span style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#10b981", display: "inline-block" }} />
            </div>

            {/* Document Title Tab in Header */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "4px 14px",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                fontSize: "12.5px",
                fontWeight: 600,
                color: "#1e293b",
                maxWidth: "60%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <currentTab.icon size={15} color={currentTab.brandColor} />
              <span>{currentTab.filename}</span>
            </div>

            {/* Live Server Indicator */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#16a34a",
                  display: "inline-block",
                  boxShadow: "0 0 0 2px rgba(22, 163, 74, 0.2)",
                  animation: "pulse 2s infinite",
                }}
              />
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#16a34a" }}>
                ONLYOFFICE Cloud • Online
              </span>
            </div>
          </div>

          {/* Real ONLYOFFICE Cloud Editor Canvas */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "750px",
              backgroundColor: "#ffffff",
            }}
          >
            {isMounted ? (
              isDocsApiLoaded ? (
                <div style={{ width: "100%", height: "100%", position: "relative" }}>
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
                          width: "100%",
                          height: "100%",
                          visibility: isTabActive ? "visible" : "hidden",
                          opacity: isTabActive ? 1 : 0,
                          zIndex: isTabActive ? 10 : 0,
                          pointerEvents: isTabActive ? "auto" : "none",
                          transition: "opacity 0.2s ease-in-out",
                        }}
                      >
                        {!isLoaded && (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "13px",
                              color: "#64748b",
                            }}
                          >
                            Đang kết nối tài liệu...
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
                    backgroundColor: "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "14px",
                    fontSize: "14px",
                    color: "#64748b",
                    fontWeight: 600,
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "3.5px solid #fed7aa",
                      borderTopColor: "#ea580c",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  <span>Đang kết nối trực tiếp đến máy chủ đám mây ONLYOFFICE...</span>
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
                Đang chuẩn bị giao diện demo...
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
              <strong style={{ color: "#0f172a" }}>Cần triển khai máy chủ On-Premise / Private Cloud riêng?</strong>{" "}
              Mercy Tech cung cấp giải pháp máy chủ tài liệu nội bộ, bảo mật dữ liệu 100% trong mạng LAN công ty, tích hợp sẵn Nextcloud/Docker.
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
            <span>Tư Vấn Máy Chủ Riêng</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
