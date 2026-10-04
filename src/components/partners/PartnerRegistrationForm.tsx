"use client";

import React, { useState } from "react";
import { CheckCircle2, Send, MessageCircle } from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

export default function PartnerRegistrationForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    company: "",
    city: "",
    packageChoice: "Gói Đại Lý Tiêu Chuẩn (200 Key Online Vĩnh Viễn)",
    note: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
    }, 600);
  };

  return (
    <section id="register-form" style={{ maxWidth: "860px", margin: "72px auto 0", padding: "0 20px" }}>
      <div
        style={{
          background: "#ffffff",
          borderRadius: "24px",
          padding: "44px 36px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 12px 36px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#fff7ed",
              color: "#ea580c",
              padding: "4px 14px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 800,
              marginBottom: "8px",
            }}
          >
            HỢP TÁC CÙNG MERCY TECH
          </div>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#1e293b", margin: 0 }}>
            Đăng Ký Tham Gia Mạng Lưới Đối Tác & Đại Lý
          </h2>
          <p style={{ fontSize: "15px", color: "#64748b", marginTop: "8px" }}>
            Vui lòng điền thông tin bên dưới để nhận <strong>Bộ Hợp Đồng Đại Lý & File Báo Giá Sỉ Chi Tiết</strong> trong vòng 15 phút.
          </p>
        </div>

        {formSubmitted ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              background: "#f0fdf4",
              borderRadius: "16px",
              border: "1px solid #bbf7d0",
            }}
          >
            <div style={{ display: "inline-flex", padding: "14px", background: "#dcfce7", borderRadius: "50%", marginBottom: "16px" }}>
              <CheckCircle2 size={40} color="#16a34a" />
            </div>
            <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#15803d", margin: "0 0 10px" }}>
              Đăng Ký Thành Công!
            </h3>
            <p style={{ fontSize: "15px", color: "#166534", maxWidth: "560px", margin: "0 auto 24px", lineHeight: 1.6 }}>
              Cảm ơn bạn đã quan tâm. Đội ngũ đối tác Mercy Tech sẽ gửi bảng giá sỉ bảo mật và liên hệ qua điện thoại/tin nhắn <strong>{formData.phone}</strong> ngay trong ít phút.
            </p>
            <a
              href="https://www.messenger.com/t/286163107904324"
              target="_blank"
              rel="noopener noreferrer"
              onClick={openMessengerChat}
              title="Liên hệ"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
                boxShadow: "0 4px 12px rgba(234, 88, 12, 0.35)",
              }}
            >
              <MessageCircle size={16} />
              <span>Liên hệ</span>
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Họ và tên người liên hệ <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Số điện thoại liên hệ <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0912 345 678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Tên cửa hàng máy tính / Công ty IT <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tin học ABC / Công ty XYZ"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Tỉnh / Thành phố <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Hà Nội, TP.HCM, Đà Nẵng..."
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Gói hợp tác quan tâm
              </label>
              <select
                value={formData.packageChoice}
                onChange={(e) => setFormData({ ...formData, packageChoice: e.target.value })}
                style={inputStyle}
              >
                <option value="Gói Đại Lý Tiêu Chuẩn (200 Key Online Vĩnh Viễn)">Gói Đại Lý Tiêu Chuẩn (200 Key Online Vĩnh Viễn)</option>
                <option value="Gói Khởi Nghiệp Độc Quyền Tuyến (200 Key Online Vĩnh Viễn)">Gói Khởi Nghiệp Độc Quyền Tuyến (200 Key Online Vĩnh Viễn)</option>
                <option value="Gói Đại Lý Sỉ 50 Key Pre-Paid">Gói Đại Lý Sỉ 50 Key Pre-Paid</option>
                <option value="Gói Đại Lý Sỉ 100 Key Pre-Paid">Gói Đại Lý Sỉ 100 Key Pre-Paid</option>
                <option value="Gói Đại Lý Sỉ 200 Key VIP">Gói Đại Lý Sỉ 200 Key VIP</option>
                <option value="Cộng Tác Viên Giới Thiệu / Bán Hàng">Cộng Tác Viên Giới Thiệu / Bán Hàng</option>
                <option value="Mua bản quyền cho doanh nghiệp sử dụng">Mua bản quyền cho doanh nghiệp sử dụng</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Nhu cầu cụ thể hoặc khu vực đăng ký độc quyền
              </label>
              <textarea
                rows={3}
                placeholder="Ví dụ: Tôi muốn đăng ký độc quyền phân phối tại khu vực Quận Tân Bình, TP.HCM..."
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: "#ff6f3d",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                padding: "16px",
                fontWeight: 700,
                fontSize: "15px",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(255, 111, 61, 0.35)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ea580c")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff6f3d")}
            >
              <Send size={18} />
              <span>{loading ? "Đang xử lý..." : "Gửi Đăng Ký — Nhận Báo Giá Sỉ Bảo Mật Ngay"}</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
  backgroundColor: "#f8fafc",
  color: "#1e293b",
};
