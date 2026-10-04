"use client";

import React, { useState } from "react";
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  Building2,
  BookOpen,
  Headphones,
  Scale,
  Clock,
  PhoneCall,
  MessageCircle,
  AlertCircle,
  FileCheck,
  ArrowRight,
  Sparkles,
  Lock,
  Compass,
} from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

interface PartnerPolicySectionProps {
  onOpenModal: (pkgName?: string) => void;
}

export default function PartnerPolicySection({ onOpenModal }: PartnerPolicySectionProps) {
  const [activeArticle, setActiveArticle] = useState<number | null>(null);

  const toggleArticle = (index: number) => {
    setActiveArticle(activeArticle === index ? null : index);
  };

  const articlePills = [
    { id: 1, title: "1. Đối tượng tham gia" },
    { id: 2, title: "2. Điều kiện đại lý" },
    { id: 3, title: "3. Cấp đại lý & Chiết khấu" },
    { id: 4, title: "4. Quyền lợi chung" },
    { id: 5, title: "5. Nghĩa vụ đại lý" },
    { id: 6, title: "6. Quy trình đăng ký" },
    { id: 7, title: "7. Đào tạo & Kỹ thuật" },
    { id: 8, title: "8. Đánh giá xét duyệt" },
    { id: 9, title: "9. Chấm dứt hợp đồng" },
  ];

  return (
    <section id="partner-policy" style={{ maxWidth: "1248px", margin: "72px auto 0", padding: "0 20px" }}>
      {/* Container with bright, clean styling (NO black background) */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "24px",
          border: "2px solid #e2e8f0",
          boxShadow: "0 12px 36px rgba(37, 99, 235, 0.06)",
          padding: "48px 36px",
          position: "relative",
        }}
      >
        {/* Official Document Legal Ribbon */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#fff7ed",
              color: "#ea580c",
              border: "1px solid #fed7aa",
              padding: "6px 18px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            <Scale size={15} color="#ff6f3d" />
            <span>QUY CHẾ VẬN HÀNH PHÁP LÝ & KINH DOANH</span>
          </div>

          <h2
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: "#1e293b",
              lineHeight: 1.3,
              margin: "0 0 14px",
              letterSpacing: "-0.01em",
            }}
          >
            Chính Sách Đại Lý Phân Phối OnlyOffice Chính Hãng
          </h2>

          <p
            style={{
              fontSize: "15.5px",
              color: "#475569",
              lineHeight: 1.65,
              maxWidth: "880px",
              margin: "0 auto",
            }}
          >
            <strong>CÔNG TY TNHH CÔNG NGHỆ MERCY (MERCY TECH)</strong> xây dựng chương trình hợp tác đại lý phân phối nhằm mở rộng mạng lưới cung cấp giải pháp văn phòng số, máy chủ và license bản quyền OnlyOffice chính hãng tới khách hàng trên toàn quốc. Trang này công bố chi tiết quyền lợi, điều kiện tham gia, cơ chế chiết khấu và quy trình đăng ký trở thành đại lý chính thức.
          </p>
        </div>

        {/* Quick Jump Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            justifyContent: "center",
            padding: "16px",
            backgroundColor: "#fffaf5",
            borderRadius: "14px",
            border: "1px solid #fed7aa",
            marginBottom: "40px",
          }}
        >
          {articlePills.map((pill) => (
            <a
              key={pill.id}
              href={`#dieu-${pill.id}`}
              style={{
                fontSize: "12.5px",
                fontWeight: 700,
                color: "#ea580c",
                backgroundColor: "#ffffff",
                border: "1px solid #fed7aa",
                padding: "6px 14px",
                borderRadius: "20px",
                textDecoration: "none",
                transition: "all 0.2s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ff6f3d";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.borderColor = "#ff6f3d";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.color = "#ea580c";
                e.currentTarget.style.borderColor = "#fed7aa";
              }}
            >
              <span>{pill.title}</span>
            </a>
          ))}
        </div>

        {/* 9 Detailed Articles in Structured Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

          {/* Điều 1 */}
          <div
            id="dieu-1"
            style={{
              padding: "28px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              border: "1.5px solid #e2e8f0",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor: "#fff7ed",
                  color: "#ea580c",
                  border: "1px solid #fed7aa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "16px",
                }}
              >
                1
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#1e293b", margin: 0 }}>
                1. Đối Tượng Tham Gia Chương Trình Đại Lý
              </h3>
            </div>
            <p style={{ fontSize: "14.5px", color: "#475569", lineHeight: 1.6, marginBottom: "16px" }}>
              Chương trình đại lý của Mercy Tech mở rộng cho các cá nhân, doanh nghiệp và tổ chức hoạt động trong lĩnh vực công nghệ thông tin và dịch vụ doanh nghiệp, bao gồm:
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "14px",
              }}
            >
              {[
                { title: "Kỹ thuật viên & Cá nhân IT", desc: "Cá nhân hoạt động trong lĩnh vực CNTT, có khả năng tư vấn, cài đặt máy và bán phần mềm cho khách hàng." },
                { title: "Công ty Thiết kế Web & Phần mềm", desc: "Đơn vị phát triển phần mềm, thiết kế website, digital agency muốn bổ sung gói license vào dịch vụ khách hàng." },
                { title: "Đơn vị giải pháp ERP / CRM / Kế toán", desc: "Cung cấp phần mềm quản trị doanh nghiệp muốn tích hợp bộ ứng dụng văn phòng bản quyền OnlyOffice." },
                { title: "Đơn vị Tích hợp Hệ thống (SI)", desc: "Có tệp khách hàng doanh nghiệp cần hạ tầng máy chủ ổn định, On-Premises & Private Cloud bảo mật cao." },
                { title: "Cửa hàng & Thợ ráp máy tính", desc: "Các trung tâm bảo hành, cửa hàng máy tính, linh kiện PC cần nguồn key bản quyền chính hãng vĩnh viễn theo mainboard bán kèm máy." },
                { title: "Cá nhân & Tổ chức Chuyển đổi số", desc: "Có mạng lưới đối tác, doanh nghiệp đang tìm kiếm giải pháp văn phòng thay thế Microsoft Office crack lậu." },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "14px 16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "14px", color: "#1e293b", marginBottom: "4px" }}>
                    <CheckCircle2 size={16} color="#ff6f3d" style={{ flexShrink: 0 }} />
                    <span>{item.title}</span>
                  </div>
                  <div style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Điều 2 */}
          <div
            id="dieu-2"
            style={{
              padding: "28px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              border: "1.5px solid #e2e8f0",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor: "#fff7ed",
                  color: "#ea580c",
                  border: "1px solid #fed7aa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "16px",
                }}
              >
                2
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#1e293b", margin: 0 }}>
                2. Điều Kiện Trở Thành Đại Lý Chính Thức
              </h3>
            </div>
            <p style={{ fontSize: "14.5px", color: "#475569", lineHeight: 1.6, marginBottom: "16px" }}>
              Để được phê duyệt và cấp mã đại lý trên hệ thống quản trị của Mercy Tech, ứng viên cần đáp ứng các tiêu chuẩn sau:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "Cá nhân hoặc pháp nhân có tư cách pháp lý hợp pháp tại Việt Nam (có CMND/CCCD hoặc Giấy chứng nhận ĐKDN).",
                "Có hiểu biết cơ bản về lĩnh vực máy tính, hệ điều hành Windows/macOS/Linux và phần mềm văn phòng OnlyOffice.",
                "Cam kết mức doanh số tối thiểu tương ứng với cấp bậc đăng ký (hoặc tham gia qua hình thức Pre-paid slot linh hoạt).",
                "Tuân thủ nghiêm ngặt các hướng dẫn về nhận diện thương hiệu, không sử dụng nội dung sai lệch gây hiểu lầm cho khách hàng.",
                "Đồng ý ký Hợp đồng Hợp tác Đại lý bằng văn bản chính thức với Mercy Tech (đóng dấu mộc đỏ pháp lý hai bên).",
              ].map((text, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    backgroundColor: "#f8fafc",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "1px solid #f1f5f9",
                    fontSize: "13.5px",
                    color: "#334155",
                    lineHeight: 1.5,
                  }}
                >
                  <ShieldCheck size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Điều 3 */}
          <div
            id="dieu-3"
            style={{
              padding: "28px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              border: "1.5px solid #e2e8f0",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor: "#fff7ed",
                  color: "#ea580c",
                  border: "1px solid #fed7aa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "16px",
                }}
              >
                3
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#1e293b", margin: 0 }}>
                3. Các Cấp Đại Lý Và Cơ Chế Chiết Khấu Lũy Tiến
              </h3>
            </div>
            <p style={{ fontSize: "14.5px", color: "#475569", lineHeight: 1.6, marginBottom: "20px" }}>
              Mercy Tech áp dụng cơ chế chiết khấu lũy tiến theo từng cấp độ hợp tác. Doanh số đại lý đạt được trong kỳ sẽ là căn cứ duy trì hoặc nâng cấp bậc chiết khấu trong kỳ kế tiếp (Mọi bảng giá sỉ chi tiết được gửi riêng theo chính sách bảo mật):
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {/* Cấp Đồng */}
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: "14px",
                  border: "1.5px solid #cbd5e1",
                  padding: "24px 20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#92400e", backgroundColor: "#fef3c7", padding: "3px 10px", borderRadius: "12px" }}>
                      TIÊU CHUẨN
                    </span>
                    <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Cấp 1</span>
                  </div>
                  <h4 style={{ fontSize: "20px", fontWeight: 800, color: "#1e293b", margin: "0 0 12px" }}>
                    Đại Lý Cấp Đồng
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "#334155" }}>
                    <div>• <strong>Doanh số cam kết:</strong> Từ 10 triệu đồng mỗi quý.</div>
                    <div style={{ color: "#ea580c", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <Lock size={13} />
                      <span>Chiết khấu sỉ: Liên hệ nhận chính sách bảo mật</span>
                    </div>
                    <div>• <strong>Thanh toán:</strong> Trả trước từng đơn hàng hoặc nạp đợt.</div>
                    <div>• <strong>Kỹ thuật:</strong> Hỗ trợ ưu tiên qua kênh đại lý riêng.</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenModal("Đăng Ký: Đại Lý Cấp Đồng")}
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    backgroundColor: "#ffffff",
                    border: "1.5px solid #cbd5e1",
                    color: "#1e293b",
                    fontWeight: 700,
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Nhận Chính Sách Cấp Đồng
                </button>
              </div>

              {/* Cấp Bạc */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "14px",
                  border: "2px solid #fed7aa",
                  padding: "24px 20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 6px 18px rgba(234, 88, 12, 0.08)",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#ea580c", backgroundColor: "#fff7ed", border: "1px solid #fed7aa", padding: "3px 10px", borderRadius: "12px" }}>
                      PHỔ BIẾN NHẤT
                    </span>
                    <span style={{ fontSize: "12px", color: "#ea580c", fontWeight: 700 }}>Cấp 2</span>
                  </div>
                  <h4 style={{ fontSize: "20px", fontWeight: 800, color: "#1e293b", margin: "0 0 12px" }}>
                    Đại Lý Cấp Bạc
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "#1e293b" }}>
                    <div>• <strong>Doanh số cam kết:</strong> Từ 30 triệu đồng mỗi quý.</div>
                    <div style={{ color: "#ea580c", fontWeight: 800, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <Lock size={13} />
                      <span>Chiết khấu cao: Liên hệ nhận chính sách bảo mật</span>
                    </div>
                    <div>• <strong>Thanh toán:</strong> Công nợ linh hoạt tới 7 ngày sau kích hoạt.</div>
                    <div>• <strong>Đặc quyền:</strong> Phân công nhân viên chăm sóc & kỹ sư 1-1.</div>
                    <div>• <strong>Đào tạo:</strong> Tham gia khóa chuẩn hóa kỹ thuật máy trạm mỗi quý.</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenModal("Đăng Ký: Đại Lý Cấp Bạc")}
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    backgroundColor: "#ea580c",
                    border: "none",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "13px",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(234, 88, 12, 0.3)",
                  }}
                >
                  Nhận Chính Sách Cấp Bạc
                </button>
              </div>

              {/* Cấp Vàng */}
              <div
                style={{
                  backgroundColor: "#fff7ed",
                  borderRadius: "14px",
                  border: "2px solid #ff6f3d",
                  padding: "24px 20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 6px 18px rgba(255, 111, 61, 0.12)",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#c2410c", backgroundColor: "#ffedd5", padding: "3px 10px", borderRadius: "12px" }}>
                      ĐẶC QUYỀN VIP
                    </span>
                    <span style={{ fontSize: "12px", color: "#ea580c", fontWeight: 700 }}>Cấp 3 VIP</span>
                  </div>
                  <h4 style={{ fontSize: "20px", fontWeight: 800, color: "#9a3412", margin: "0 0 12px" }}>
                    Đại Lý Cấp Vàng
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "#431407" }}>
                    <div>• <strong>Doanh số cam kết:</strong> Từ 80 triệu đồng mỗi quý.</div>
                    <div style={{ color: "#c2410c", fontWeight: 800, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <Lock size={13} />
                      <span>Chiết khấu tối đa: Giá sỉ rẻ nhất hệ thống</span>
                    </div>
                    <div>• <strong>Thanh toán:</strong> Công nợ tới 15 ngày theo hợp đồng nguyên tắc.</div>
                    <div>• <strong>Hệ thống:</strong> Cấp Portal Admin quản trị nhiều khách hàng tập trung.</div>
                    <div>• <strong>Kỹ thuật chuyên sâu:</strong> Xử lý sự cố ưu tiên trong 30 phút.</div>
                    <div>• <strong>Đặc quyền:</strong> Hỗ trợ bộ cài White-Label riêng & sự kiện kết nối.</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenModal("Đăng Ký: Đại Lý Cấp Vàng")}
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    backgroundColor: "#ff6f3d",
                    border: "none",
                    color: "#ffffff",
                    fontWeight: 800,
                    fontSize: "13px",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(255, 111, 61, 0.4)",
                  }}
                >
                  Nhận Chính Sách Cấp Vàng VIP
                </button>
              </div>
            </div>
          </div>

          {/* Điều 4 */}
          <div
            id="dieu-4"
            style={{
              padding: "28px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              border: "1.5px solid #e2e8f0",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor: "#fff7ed",
                  color: "#ea580c",
                  border: "1px solid #fed7aa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "16px",
                }}
              >
                4
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#1e293b", margin: 0 }}>
                4. Quyền Lợi Chung Của Đại Lý Hợp Tác
              </h3>
            </div>
            <p style={{ fontSize: "14.5px", color: "#475569", lineHeight: 1.6, marginBottom: "16px" }}>
              Mọi đại lý đã ký hợp đồng với Mercy Tech đều được bảo đảm trọn vẹn các quyền lợi sau:
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "12px",
              }}
            >
              {[
                { title: "Tài liệu bán hàng & Brochure", desc: "Sử dụng miễn phí tài liệu bán hàng, mẫu hợp đồng kinh tế và brochure sản phẩm chuẩn hóa do Mercy Tech cung cấp." },
                { title: "Công cụ báo giá nhanh", desc: "Truy cập bảng giá đại lý sỉ, công cụ tính toán chi phí và phát hành báo giá nhanh chóng cho khách hàng." },
                { title: "Hóa đơn VAT Thông tư 78", desc: "Được xuất hóa đơn điện tử VAT đầy đủ theo Thông tư 78/2021/TT-BTC, khấu trừ 100% chi phí hợp lý khi quyết toán thuế." },
                { title: "Bảo chứng pháp lý AGPLv3", desc: "Biên bản bàn giao và Chứng nhận nguồn gốc AGPLv3 đóng dấu mộc đỏ công ty để khách hàng trình cơ quan chức năng kiểm toán." },
                { title: "Kỹ thuật cấp 2 hậu thuẫn 24/7", desc: "Được đội ngũ kỹ sư Mercy Tech đứng phía sau hỗ trợ kỹ thuật trực tiếp khi đại lý gặp máy tính cấu hình khó." },
                { title: "Thưởng vượt chỉ tiêu doanh số", desc: "Được tham gia các chương trình xét thưởng tiền mặt và chiết khấu cộng thêm khi vượt KPI quý." },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "10px",
                    padding: "14px 16px",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: "13.5px", color: "#ea580c", marginBottom: "4px" }}>
                    ✓ {item.title}
                  </div>
                  <div style={{ fontSize: "12.5px", color: "#64748b", lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Điều 5 */}
          <div
            id="dieu-5"
            style={{
              padding: "28px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              border: "1.5px solid #e2e8f0",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor: "#fff7ed",
                  color: "#ea580c",
                  border: "1px solid #fed7aa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "16px",
                }}
              >
                5
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#1e293b", margin: 0 }}>
                5. Nghĩa Vụ Và Trách Nhiệm Của Đại Lý
              </h3>
            </div>
            <p style={{ fontSize: "14.5px", color: "#475569", lineHeight: 1.6, marginBottom: "16px" }}>
              Khi tham gia mạng lưới phân phối, đại lý cam kết thực hiện đúng các điều khoản:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { title: "Tư vấn trung thực", desc: "Giới thiệu chính xác về tính năng, giá cả, thời hạn bảo hành vĩnh viễn và phạm vi hỗ trợ kỹ thuật của sản phẩm OnlyOffice." },
                { title: "Không phân phối trái phép", desc: "Tuyệt đối không trích xuất, chỉnh sửa mã nguồn hoặc phân phối lại license phần mềm cho bên thứ ba khi không có sự chấp thuận bằng văn bản của Mercy Tech." },
                { title: "Bảo mật thông tin thương mại", desc: "Giữ bí mật tuyệt đối về bảng giá đại lý sỉ, chiết khấu nội bộ, tài liệu kỹ thuật và cơ chế giá của Mercy Tech." },
                { title: "Tuân thủ Luật Bảo vệ dữ liệu cá nhân", desc: "Chấp hành nghiêm ngặt quy định bảo mật dữ liệu khách hàng theo Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15." },
                { title: "Bảo vệ uy tín thương hiệu", desc: "Không sử dụng thương hiệu, logo của OnlyOffice hoặc Mercy Tech để thực hiện các hành vi gây nhầm lẫn hoặc tổn hại uy tín thương hiệu." },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#f8fafc",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "1px solid #f1f5f9",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: "13.5px", color: "#c2410c", marginBottom: "2px" }}>
                    • {item.title}:
                  </div>
                  <div style={{ fontSize: "13px", color: "#475569", lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Điều 6 */}
          <div
            id="dieu-6"
            style={{
              padding: "28px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              border: "1.5px solid #e2e8f0",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor: "#fff7ed",
                  color: "#ea580c",
                  border: "1px solid #fed7aa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "16px",
                }}
              >
                6
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#1e293b", margin: 0 }}>
                6. Quy Trình 5 Bước Đăng Ký Trở Thành Đại Lý
              </h3>
            </div>
            <p style={{ fontSize: "14.5px", color: "#475569", lineHeight: 1.6, marginBottom: "20px" }}>
              Quy trình gia nhập mạng lưới đại lý được chuẩn hóa nhanh gọn và minh bạch:
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "14px",
              }}
            >
              {[
                { step: "Bước 1", title: "Gửi Yêu Cầu Hợp Tác", desc: "Liên hệ qua Hotline 0763.068.614, gửi form hoặc nhắn Messenger kèm thông tin shop/công ty." },
                { step: "Bước 2", title: "Trao Đổi & Tư Vấn", desc: "Chuyên viên phát triển kinh doanh Mercy Tech kết nối trong 2 giờ để tư vấn cấp đại lý phù hợp." },
                { step: "Bước 3", title: "Ký Kết Hợp Đồng", desc: "Ký hợp đồng hợp tác phân phối mộc đỏ pháp lý, xác lập quyền lợi và mức chiết khấu bảo mật." },
                { step: "Bước 4", title: "Đào Tạo Chuyển Giao", desc: "Kỹ sư Mercy Tech hướng dẫn 1-1 về quy trình 5 bước cài đặt chuẩn hóa máy tính văn phòng." },
                { step: "Bước 5", title: "Cấp Tài Khoản Admin", desc: "Bàn giao Portal xuất key 24/7, bộ hồ sơ chứng nhận pháp lý và bắt đầu kinh doanh chính thức." },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#fffaf5",
                    border: "1px solid #fed7aa",
                    borderRadius: "12px",
                    padding: "16px 14px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "12px", fontWeight: 800, color: "#ea580c", textTransform: "uppercase", marginBottom: "6px" }}>
                    {item.step}
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 800, color: "#1e293b", marginBottom: "6px" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748b", lineHeight: 1.5 }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Điều 7 */}
          <div
            id="dieu-7"
            style={{
              padding: "28px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              border: "1.5px solid #e2e8f0",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor: "#fff7ed",
                  color: "#ea580c",
                  border: "1px solid #fed7aa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "16px",
                }}
              >
                7
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#1e293b", margin: 0 }}>
                7. Hỗ Trợ Đào Tạo & Kỹ Thuật Độc Quyền
              </h3>
            </div>
            <p style={{ fontSize: "14.5px", color: "#475569", lineHeight: 1.6, marginBottom: "16px" }}>
              Mercy Tech đầu tư mạnh vào năng lực kỹ thuật và bán hàng của đại lý đối tác:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px" }}>
              {[
                { title: "Khóa đào tạo cơ bản 100% miễn phí", desc: "Hướng dẫn cài đặt, kích hoạt key online, xử lý chuyển key khi reset win và sử dụng Portal quản trị." },
                { title: "Quy chuẩn 5 bước tối ưu hóa máy trạm", desc: "Chuyển giao bộ script chuẩn hóa: gỡ sạch Office lậu, import font tiếng Việt không vỡ, mặc định lưu đuôi Microsoft và cấu hình AutoSave 1 phút." },
                { title: "Webinar chuyên đề hàng tháng", desc: "Cập nhật các tính năng mới của OnlyOffice Docs Enterprise, hướng dẫn tích hợp Nextcloud, Seafile, SharePoint cho đại lý Cấp Bạc trở lên." },
                { title: "Hotline kỹ thuật ưu tiên", desc: "Đội ngũ kỹ thuật cấp 2 hỗ trợ trực tiếp qua UltraView/AnyDesk ngay khi đại lý tiếp nhận yêu cầu từ khách hàng." },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "16px",
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: "14px", color: "#ea580c", marginBottom: "4px" }}>
                    ★ {item.title}
                  </div>
                  <div style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Điều 8 */}
          <div
            id="dieu-8"
            style={{
              padding: "28px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              border: "1.5px solid #e2e8f0",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor: "#fff7ed",
                  color: "#ea580c",
                  border: "1px solid #fed7aa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "16px",
                }}
              >
                8
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#1e293b", margin: 0 }}>
                8. Đánh Giá & Xét Duyệt Cấp Đại Lý Định Kỳ
              </h3>
            </div>
            <p style={{ fontSize: "14.5px", color: "#475569", lineHeight: 1.6, marginBottom: "12px" }}>
              Mercy Tech thực hiện đánh giá định kỳ mỗi quý (3 tháng/lần) dựa trên các tiêu chí:
            </p>
            <ul style={{ listStyle: "disc", paddingLeft: "24px", margin: "0 0 16px 0", fontSize: "13.5px", color: "#334155", lineHeight: 1.7 }}>
              <li>Tổng doanh số mua license & key mà đại lý đạt được trong kỳ đánh giá.</li>
              <li>Mức độ hài lòng và phản hồi của khách hàng cuối do đại lý phục vụ.</li>
              <li>Sự tuân thủ các quy định bảo mật giá sỉ, bảo mật dữ liệu và chuẩn mực thương hiệu.</li>
            </ul>
            <div style={{ backgroundColor: "#fff7ed", border: "1px solid #fed7aa", padding: "12px 16px", borderRadius: "8px", fontSize: "13px", color: "#7c2d12" }}>
              <strong>Chính sách thăng hạng:</strong> Đại lý đạt doanh số vượt trội trong 1 quý sẽ được tự động nâng lên cấp bậc cao hơn để hưởng mức chiết khấu tốt hơn ngay trong quý tiếp theo.
            </div>
          </div>

          {/* Điều 9 */}
          <div
            id="dieu-9"
            style={{
              padding: "28px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              border: "1.5px solid #e2e8f0",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor: "#fff7ed",
                  color: "#ea580c",
                  border: "1px solid #fed7aa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "16px",
                }}
              >
                9
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#1e293b", margin: 0 }}>
                9. Chấm Dứt Hợp Đồng Hợp Tác Đại Lý
              </h3>
            </div>
            <p style={{ fontSize: "14.5px", color: "#475569", lineHeight: 1.6, marginBottom: "12px" }}>
              Hợp đồng đại lý có thể chấm dứt hiệu lực trong các trường hợp sau:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13.5px", color: "#475569" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                <span style={{ color: "#ef4444", fontWeight: 700 }}>•</span>
                <span>Hai bên cùng thỏa thuận chấm dứt hợp tác bằng văn bản trước ít nhất 30 ngày.</span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <span style={{ color: "#ef4444", fontWeight: 700 }}>•</span>
                <span>Đại lý vi phạm nghiêm trọng nghĩa vụ bảo mật bảng giá sỉ, tự ý phân phối trái phép hoặc vi phạm bản quyền phần mềm.</span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <span style={{ color: "#ef4444", fontWeight: 700 }}>•</span>
                <span>Đại lý không duy trì doanh số cam kết tối thiểu trong 3 quý liên tiếp (sau khi đã được thông báo nhắc nhở).</span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <span style={{ color: "#ef4444", fontWeight: 700 }}>•</span>
                <span>Đại lý sử dụng hình ảnh, thương hiệu OnlyOffice gây ảnh hưởng xấu tới uy tín của Mercy Tech trên thị trường.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Official Sign-off & Contact Info Card (Unified Orange Brand Card) */}
        <div
          style={{
            marginTop: "40px",
            background: "linear-gradient(135deg, #ff6f3d 0%, #ea580c 100%)",
            borderRadius: "20px",
            padding: "36px 32px",
            color: "#ffffff",
            boxShadow: "0 12px 30px rgba(234, 88, 12, 0.22)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "24px" }}>
            <div style={{ maxWidth: "680px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#ffffff",
                  marginBottom: "12px",
                }}
              >
                <span>🏢 ĐƠN VỊ PHÂN PHỐI CHÍNH THỨC</span>
              </div>
              <h3 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 12px", color: "#ffffff" }}>
                CÔNG TY TNHH CÔNG NGHỆ MERCY
              </h3>
              <div style={{ fontSize: "14px", color: "#ffedd5", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: "6px" }}>
                <div>• <strong>Mã số thuế:</strong> 0319227767</div>
                <div>• <strong>Hotline tiếp nhận đại lý:</strong> 0763.068.614 (Hỗ trợ 24/7)</div>
                <div>• <strong>Email chính thức:</strong> contact@mercytechglobal.com</div>
                <div>• <strong>Trụ sở chính:</strong> 175/3 Đường Nguyễn Thị Be, Ấp 33, Xã Đông Thạnh, Thành phố Hồ Chí Minh, Việt Nam</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button
                type="button"
                onClick={() => onOpenModal("Đăng Ký Đại Lý Chính Thức")}
                style={{
                  backgroundColor: "#ffffff",
                  color: "#ea580c",
                  border: "none",
                  borderRadius: "10px",
                  padding: "14px 28px",
                  fontSize: "15px",
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.12)",
                }}
              >
                <Lock size={16} color="#ea580c" />
                <span>Nhận Báo Giá Sỉ & Hợp Đồng Đại Lý</span>
              </button>

              <a
                href="https://m.me/onlyoffice.official.vn"
                target="_blank"
                rel="noopener noreferrer"
                onClick={openMessengerChat}
                title="Tư vấn nhanh qua Messenger"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.18)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  borderRadius: "10px",
                  padding: "14px 28px",
                  fontSize: "15px",
                  fontWeight: 800,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  backdropFilter: "blur(4px)",
                }}
              >
                <MessageCircle size={18} color="#ffffff" />
                <span>Liên hệ qua Messenger</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
