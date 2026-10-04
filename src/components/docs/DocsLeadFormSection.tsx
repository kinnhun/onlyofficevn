"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";
import { CheckCircle2, MessageCircle, Send, Phone } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

export default function DocsLeadFormSection() {
  const locale = useLocale();
  const isVi = locale === "vi";

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    company: "",
    industry: "",
    companySize: "",
    needs: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || !formData.fullName) {
      alert(isVi ? "Vui lòng nhập Họ tên và Số điện thoại" : "Please provide your name and phone number");
      return;
    }
    setSubmitted(true);
  };

  const handleNeedToggle = (need: string) => {
    setFormData((prev) => {
      const exists = prev.needs.includes(need);
      return {
        ...prev,
        needs: exists ? prev.needs.filter((n) => n !== need) : [...prev.needs, need],
      };
    });
  };

  return (
    <section id="oo-docs-lead-form" style={{ backgroundColor: "#ffffff", padding: "84px 20px 96px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
            alignItems: "center",
          }}
          className="oo-docs-lead-split-responsive"
        >
          <style>{`
            @media (min-width: 960px) {
              .oo-docs-lead-split-responsive {
                grid-template-columns: 1fr 1fr !important;
              }
            }
          `}</style>

          {/* Left: YouTube Video Preview */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                borderRadius: "16px",
                boxShadow: "0 18px 45px rgba(15, 23, 42, 0.1)",
                border: "1.5px solid #e2e8f0",
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/HqRMneSGHk0"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
                allowFullScreen
                loading="lazy"
                title="ONLYOFFICE Docs — Demo Video"
              />
            </div>
            <div style={{ textAlign: "center", fontSize: "13.5px", color: "#64748b", fontWeight: 500 }}>
              {isVi ? "Video giới thiệu tổng quan ONLYOFFICE Docs trên toàn cầu" : "ONLYOFFICE Docs Global Interface & Workflow Demo"}
            </div>
          </div>

          {/* Right: Lead Consultation Form Box */}
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1.5px solid #e2e8f0",
              borderRadius: "20px",
              padding: "36px 32px",
              boxShadow: "0 18px 45px rgba(15, 23, 42, 0.07)",
            }}
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "36px 12px" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundColor: "#f0fdf4",
                    border: "2px solid #bbf7d0",
                    color: "#16a34a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#1e293b", margin: "0 0 8px" }}>
                  {isVi ? "Đăng ký thành công!" : "Submission Received!"}
                </h3>
                <p style={{ fontSize: "14.5px", color: "#64748b", margin: "0 0 24px", lineHeight: 1.6 }}>
                  {isVi
                    ? "Chuyên gia ONLYOFFICE Vietnam (Mercy Tech) sẽ liên hệ bạn trong vòng 30 phút làm việc."
                    : "An ONLYOFFICE Vietnam expert will contact you within 30 business minutes."}
                </p>
                <a
                      href="https://www.messenger.com/t/286163107904324"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={openMessengerChat}
                  style={{
                    background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                    color: "#ffffff",
                    padding: "12px 24px",
                    borderRadius: "100px",
                    fontWeight: 700,
                    fontSize: "14px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    textDecoration: "none",
                  }}
                >
                  <MessageCircle size={16} />
                  <span>{isVi ? "Nhắn tin trao đổi ngay qua Messenger" : "Chat immediately on Messenger"}</span>
                </a>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#1e293b", margin: "0 0 6px" }}>
                  {isVi ? "Tư Vấn 1:1 Miễn Phí" : "Free 1:1 Expert Consultation"}
                </h3>
                <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 24px" }}>
                  {isVi
                    ? "Liên hệ ngay — phản hồi trong vòng 30 phút làm việc"
                    : "Contact now — guaranteed response within 30 minutes"}
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* Row 1: Name & Phone */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                        {isVi ? "Họ và tên *" : "Full Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isVi ? "Nguyễn Văn A" : "John Doe"}
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "14px",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                        {isVi ? "Số điện thoại *" : "Phone Number *"}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0988 xxx xxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "14px",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </div>

                  {/* Row 2: Company & Industry */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                        {isVi ? "Tên công ty" : "Company Name"}
                      </label>
                      <input
                        type="text"
                        placeholder={isVi ? "Công ty ABC" : "Acme Corp"}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "14px",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                        {isVi ? "Lĩnh vực hoạt động" : "Industry"}
                      </label>
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "14px",
                          boxSizing: "border-box",
                          backgroundColor: "#ffffff",
                        }}
                      >
                        <option value="">{isVi ? "— Chọn ngành nghề —" : "— Select industry —"}</option>
                        <option value="IT">{isVi ? "Công nghệ thông tin" : "Information Technology"}</option>
                        <option value="Finance">{isVi ? "Tài chính - Ngân hàng" : "Banking & Finance"}</option>
                        <option value="Education">{isVi ? "Giáo dục" : "Education"}</option>
                        <option value="Healthcare">{isVi ? "Y tế" : "Healthcare"}</option>
                        <option value="Manufacturing">{isVi ? "Sản xuất" : "Manufacturing"}</option>
                        <option value="Retail">{isVi ? "Thương mại - Bán lẻ" : "Retail & E-commerce"}</option>
                        <option value="Gov">{isVi ? "Chính phủ - Nhà nước" : "Government & Public"}</option>
                        <option value="Other">{isVi ? "Khác" : "Other"}</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Company Size */}
                  <div>
                    <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                      {isVi ? "Quy mô nhân sự" : "Team Size"}
                    </label>
                    <select
                      value={formData.companySize}
                      onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "14px",
                        boxSizing: "border-box",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <option value="">{isVi ? "— Chọn quy mô —" : "— Select size —"}</option>
                      <option value="20-50">20 – 50 {isVi ? "người" : "members"}</option>
                      <option value="50-100">50 – 100 {isVi ? "người" : "members"}</option>
                      <option value="100+">{isVi ? "Trên 100 người" : "100+ members"}</option>
                    </select>
                  </div>

                  {/* Checkboxes: Needs */}
                  <div>
                    <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "8px" }}>
                      {isVi ? "Nhu cầu của bạn" : "Primary Needs"}
                    </label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {[
                        isVi ? "Triển khai trên server riêng (On-premises)" : "Deploy On-Premises Private Server",
                        isVi ? "Dùng Cloud để làm việc nhanh" : "Use Cloud Solution for Fast Setup",
                        isVi ? "Nhúng vào phần mềm của công ty (Developer)" : "Embed into Corporate App (Developer API)",
                      ].map((item, idx) => (
                        <label key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "#334155", cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            checked={formData.needs.includes(item)}
                            onChange={() => handleNeedToggle(item)}
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    style={{
                      background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                      color: "#ffffff",
                      border: "none",
                      padding: "13px 20px",
                      borderRadius: "8px",
                      fontWeight: 800,
                      fontSize: "15px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      boxShadow: "0 4px 14px rgba(255, 111, 61, 0.35)",
                      marginTop: "6px",
                    }}
                  >
                    <Send size={16} />
                    <span>{isVi ? "GỬI NGAY" : "SUBMIT REQUEST"}</span>
                  </button>

                  <div style={{ textAlign: "center", marginTop: "4px" }}>
                    <a
                          href="https://www.messenger.com/t/286163107904324"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={openMessengerChat}
                      style={{
                        fontSize: "13px",
                        color: "#ea580c",
                        fontWeight: 600,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <MessageCircle size={14} />
                      <span>{isVi ? "Hoặc nhắn tin trực tiếp qua Messenger" : "Or chat instantly on Messenger"}</span>
                    </a>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
