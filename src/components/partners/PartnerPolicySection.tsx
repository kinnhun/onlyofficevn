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
  ChevronDown,
} from "lucide-react";
import { openMessengerChat } from "@/lib/messenger";

interface PartnerPolicySectionProps {
  onOpenModal: (pkgName?: string) => void;
}

function PolicyAccordionItem({
  id,
  num,
  title,
  isOpen,
  onToggle,
  children,
}: {
  id: string;
  num: number;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className="oo-partner-policy-card"
      style={{
        border: isOpen ? "1.5px solid #cbd5e1" : "1px solid #e2e8f0",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        transition: "border-color 0.2s ease",
        scrollMarginTop: "90px",
      }}
    >
      <div
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          userSelect: "none",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "10px",
              backgroundColor: isOpen ? "#ff6f3d" : "#f1f5f9",
              color: isOpen ? "#ffffff" : "#475569",
              border: "1px solid",
              borderColor: isOpen ? "#ff6f3d" : "#e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "14px",
              flexShrink: 0,
              transition: "all 0.2s ease",
            }}
          >
            {num}
          </div>
          <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#1e293b", margin: 0, lineHeight: 1.4 }}>
            {title}
          </h3>
        </div>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#64748b",
            transition: "transform 0.2s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
        >
          <ChevronDown size={18} />
        </div>
      </div>

      {isOpen && (
        <div style={{ marginTop: "18px", paddingTop: "18px", borderTop: "1px solid #f1f5f9" }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default function PartnerPolicySection({ onOpenModal }: PartnerPolicySectionProps) {
  // Article 1 open by default for immediate preview
  const [openArticles, setOpenArticles] = useState<number[]>([1]);

  const toggleArticle = (index: number) => {
    setOpenArticles((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const isAllOpen = openArticles.length === 9;
  const toggleAll = () => {
    if (isAllOpen) {
      setOpenArticles([]);
    } else {
      setOpenArticles([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }
  };

  return (
    <section id="partner-policy" className="oo-partner-section">
      <div className="oo-partner-card">
        {/* Official Document Legal Ribbon */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div className="oo-partner-kicker">
            <Scale size={14} color="#ff6f3d" />
            <span>QUY CHẾ VẬN HÀNH PHÁP LÝ & KINH DOANH</span>
          </div>

          <h2 className="oo-partner-heading" style={{ margin: "0 0 10px" }}>
            Chính Sách Đại Lý Phân Phối OnlyOffice
          </h2>

          <p className="oo-partner-subheading" style={{ maxWidth: "840px", margin: "0 auto" }}>
            Khung pháp lý, điều kiện hợp tác, phân cấp chiết khấu và quy trình bảo vệ quyền lợi dành cho đại lý và đối tác chiến lược trên toàn quốc.
          </p>
        </div>

        {/* Accordion Controls Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            padding: "0 4px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#334155" }}>
            Toàn văn 9 điều khoản quy chế (Bấm từng điều để xem nội dung chi tiết)
          </div>
          <button
            type="button"
            onClick={toggleAll}
            style={{
              background: "#ffffff",
              border: "1.5px solid #cbd5e1",
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "13px",
              fontWeight: 700,
              color: "#1e293b",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ff6f3d";
              e.currentTarget.style.color = "#ff6f3d";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#cbd5e1";
              e.currentTarget.style.color = "#1e293b";
            }}
          >
            {isAllOpen ? "Thu gọn tất cả" : "Mở rộng tất cả 9 điều"}
          </button>
        </div>

        {/* 9 Detailed Articles in Accordion Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Điều 1 */}
          <PolicyAccordionItem
            id="dieu-1"
            num={1}
            title="1. Đối Tượng Tham Gia Chương Trình Đại Lý"
            isOpen={openArticles.includes(1)}
            onToggle={() => toggleArticle(1)}
          >
            <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6, marginBottom: "16px" }}>
              Chương trình đại lý của Mercy Tech mở rộng cho các cá nhân, doanh nghiệp và tổ chức hoạt động trong lĩnh vực công nghệ thông tin và dịch vụ doanh nghiệp, bao gồm:
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                gap: "12px",
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
                    borderRadius: "10px",
                    padding: "12px 14px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 700, fontSize: "13.5px", color: "#1e293b", marginBottom: "4px" }}>
                    <CheckCircle2 size={15} color="#ff6f3d" style={{ flexShrink: 0 }} />
                    <span>{item.title}</span>
                  </div>
                  <div style={{ fontSize: "12.5px", color: "#64748b", lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </PolicyAccordionItem>

          {/* Điều 2 */}
          <PolicyAccordionItem
            id="dieu-2"
            num={2}
            title="2. Điều Kiện Trở Thành Đại Lý Chính Thức"
            isOpen={openArticles.includes(2)}
            onToggle={() => toggleArticle(2)}
          >
            <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6, marginBottom: "14px" }}>
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
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid #f1f5f9",
                    fontSize: "13px",
                    color: "#334155",
                    lineHeight: 1.5,
                  }}
                >
                  <ShieldCheck size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </PolicyAccordionItem>

          {/* Điều 3 */}
          <PolicyAccordionItem
            id="dieu-3"
            num={3}
            title="3. Các Cấp Đại Lý Và Cơ Chế Chiết Khấu Lũy Tiến"
            isOpen={openArticles.includes(3)}
            onToggle={() => toggleArticle(3)}
          >
            <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6, marginBottom: "18px" }}>
              Mercy Tech áp dụng cơ chế chiết khấu lũy tiến theo từng cấp độ hợp tác. Doanh số đại lý đạt được trong kỳ sẽ là căn cứ duy trì hoặc nâng cấp bậc chiết khấu trong kỳ kế tiếp (Mọi bảng giá sỉ chi tiết được gửi riêng theo chính sách bảo mật):
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                gap: "16px",
              }}
            >
              {/* Cấp Đồng */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  padding: "20px 18px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#475569", backgroundColor: "#f1f5f9", padding: "2px 8px", borderRadius: "10px" }}>
                      TIÊU CHUẨN
                    </span>
                    <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Cấp 1</span>
                  </div>
                  <h4 style={{ fontSize: "18px", fontWeight: 800, color: "#1e293b", margin: "0 0 10px" }}>
                    Đại Lý Cấp Đồng
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12.5px", color: "#334155" }}>
                    <div>• <strong>Doanh số cam kết:</strong> Từ 10 triệu đồng mỗi quý.</div>
                    <div style={{ color: "#ea580c", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <Lock size={12} />
                      <span>Chiết khấu sỉ: Liên hệ nhận bảng giá</span>
                    </div>
                    <div>• <strong>Thanh toán:</strong> Trả trước từng đơn hàng hoặc nạp đợt.</div>
                    <div>• <strong>Kỹ thuật:</strong> Hỗ trợ ưu tiên qua kênh đại lý riêng.</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenModal("Đăng Ký: Đại Lý Cấp Đồng")}
                  style={{
                    marginTop: "16px",
                    width: "100%",
                    padding: "9px",
                    borderRadius: "6px",
                    backgroundColor: "#f8fafc",
                    border: "1px solid #cbd5e1",
                    color: "#1e293b",
                    fontWeight: 700,
                    fontSize: "12.5px",
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
                  borderRadius: "12px",
                  border: "1.5px solid #cbd5e1",
                  padding: "20px 18px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#0369a1", backgroundColor: "#e0f2fe", padding: "2px 8px", borderRadius: "10px" }}>
                      PHỔ BIẾN
                    </span>
                    <span style={{ fontSize: "12px", color: "#0369a1", fontWeight: 700 }}>Cấp 2</span>
                  </div>
                  <h4 style={{ fontSize: "18px", fontWeight: 800, color: "#1e293b", margin: "0 0 10px" }}>
                    Đại Lý Cấp Bạc
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12.5px", color: "#1e293b" }}>
                    <div>• <strong>Doanh số cam kết:</strong> Từ 30 triệu đồng mỗi quý.</div>
                    <div style={{ color: "#ea580c", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <Lock size={12} />
                      <span>Chiết khấu cao: Liên hệ nhận bảng giá</span>
                    </div>
                    <div>• <strong>Thanh toán:</strong> Công nợ linh hoạt tới 7 ngày.</div>
                    <div>• <strong>Đặc quyền:</strong> Phân công nhân viên chăm sóc 1-1.</div>
                    <div>• <strong>Đào tạo:</strong> Khóa chuẩn hóa kỹ thuật máy trạm.</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenModal("Đăng Ký: Đại Lý Cấp Bạc")}
                  style={{
                    marginTop: "16px",
                    width: "100%",
                    padding: "9px",
                    borderRadius: "6px",
                    backgroundColor: "#ff6f3d",
                    border: "none",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "12.5px",
                    cursor: "pointer",
                  }}
                >
                  Nhận Chính Sách Cấp Bạc
                </button>
              </div>

              {/* Cấp Vàng */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  border: "1.5px solid #ff6f3d",
                  padding: "20px 18px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#ea580c", backgroundColor: "#fff7ed", padding: "2px 8px", borderRadius: "10px" }}>
                      ĐẶC QUYỀN VIP
                    </span>
                    <span style={{ fontSize: "12px", color: "#ea580c", fontWeight: 700 }}>Cấp 3 VIP</span>
                  </div>
                  <h4 style={{ fontSize: "18px", fontWeight: 800, color: "#1e293b", margin: "0 0 10px" }}>
                    Đại Lý Cấp Vàng
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12.5px", color: "#1e293b" }}>
                    <div>• <strong>Doanh số cam kết:</strong> Từ 80 triệu đồng mỗi quý.</div>
                    <div style={{ color: "#ea580c", fontWeight: 800, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <Lock size={12} />
                      <span>Chiết khấu tối đa: Giá sỉ rẻ nhất hệ thống</span>
                    </div>
                    <div>• <strong>Thanh toán:</strong> Công nợ tới 15 ngày theo hợp đồng.</div>
                    <div>• <strong>Hệ thống:</strong> Cấp Portal Admin quản trị nhiều khách.</div>
                    <div>• <strong>Kỹ thuật:</strong> Xử lý sự cố ưu tiên trong 30 phút.</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenModal("Đăng Ký: Đại Lý Cấp Vàng")}
                  style={{
                    marginTop: "16px",
                    width: "100%",
                    padding: "9px",
                    borderRadius: "6px",
                    backgroundColor: "#ea580c",
                    border: "none",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "12.5px",
                    cursor: "pointer",
                  }}
                >
                  Nhận Chính Sách Cấp Vàng
                </button>
              </div>
            </div>
          </PolicyAccordionItem>

          {/* Điều 4 */}
          <PolicyAccordionItem
            id="dieu-4"
            num={4}
            title="4. Quyền Lợi Chung Của Đại Lý Hợp Tác"
            isOpen={openArticles.includes(4)}
            onToggle={() => toggleArticle(4)}
          >
            <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6, marginBottom: "14px" }}>
              Mọi đại lý đã ký hợp đồng với Mercy Tech đều được bảo đảm trọn vẹn các quyền lợi sau:
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                gap: "10px",
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
                    padding: "12px 14px",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: "13px", color: "#ea580c", marginBottom: "3px" }}>
                    ✓ {item.title}
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748b", lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </PolicyAccordionItem>

          {/* Điều 5 */}
          <PolicyAccordionItem
            id="dieu-5"
            num={5}
            title="5. Nghĩa Vụ Và Trách Nhiệm Của Đại Lý"
            isOpen={openArticles.includes(5)}
            onToggle={() => toggleArticle(5)}
          >
            <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6, marginBottom: "14px" }}>
              Khi tham gia mạng lưới phân phối, đại lý cam kết thực hiện đúng các điều khoản:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #f1f5f9",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: "13px", color: "#c2410c", marginBottom: "2px" }}>
                    • {item.title}:
                  </div>
                  <div style={{ fontSize: "12.5px", color: "#475569", lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </PolicyAccordionItem>

          {/* Điều 6 */}
          <PolicyAccordionItem
            id="dieu-6"
            num={6}
            title="6. Quy Trình 5 Bước Đăng Ký Trở Thành Đại Lý"
            isOpen={openArticles.includes(6)}
            onToggle={() => toggleArticle(6)}
          >
            <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6, marginBottom: "16px" }}>
              Quy trình gia nhập mạng lưới đại lý được chuẩn hóa nhanh gọn và minh bạch:
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
                gap: "10px",
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
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "10px",
                    padding: "12px",
                  }}
                >
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#ea580c", textTransform: "uppercase" }}>{item.step}</div>
                  <div style={{ fontWeight: 700, fontSize: "13px", color: "#1e293b", margin: "3px 0 4px" }}>{item.title}</div>
                  <div style={{ fontSize: "12px", color: "#64748b", lineHeight: 1.4 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </PolicyAccordionItem>

          {/* Điều 7 */}
          <PolicyAccordionItem
            id="dieu-7"
            num={7}
            title="7. Hỗ Trợ Đào Tạo & Kỹ Thuật Độc Quyền"
            isOpen={openArticles.includes(7)}
            onToggle={() => toggleArticle(7)}
          >
            <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6, marginBottom: "14px" }}>
              Mercy Tech đầu tư mạnh vào năng lực kỹ thuật và bán hàng của đại lý đối tác:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "10px" }}>
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
                    borderRadius: "10px",
                    padding: "12px 14px",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: "13px", color: "#ea580c", marginBottom: "3px" }}>
                    ★ {item.title}
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748b", lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </PolicyAccordionItem>

          {/* Điều 8 */}
          <PolicyAccordionItem
            id="dieu-8"
            num={8}
            title="8. Đánh Giá & Xét Duyệt Cấp Đại Lý Định Kỳ"
            isOpen={openArticles.includes(8)}
            onToggle={() => toggleArticle(8)}
          >
            <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6, marginBottom: "10px" }}>
              Mercy Tech thực hiện đánh giá định kỳ mỗi quý (3 tháng/lần) dựa trên các tiêu chí:
            </p>
            <ul style={{ listStyle: "disc", paddingLeft: "20px", margin: "0 0 12px 0", fontSize: "13px", color: "#334155", lineHeight: 1.6 }}>
              <li>Tổng doanh số mua license & key mà đại lý đạt được trong kỳ đánh giá.</li>
              <li>Mức độ hài lòng và phản hồi của khách hàng cuối do đại lý phục vụ.</li>
              <li>Sự tuân thủ các quy định bảo mật giá sỉ, bảo mật dữ liệu và chuẩn mực thương hiệu.</li>
            </ul>
            <div style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", padding: "10px 14px", borderRadius: "8px", fontSize: "12.5px", color: "#334155" }}>
              <strong>Chính sách thăng hạng:</strong> Đại lý đạt doanh số vượt trội trong 1 quý sẽ được tự động nâng lên cấp bậc cao hơn để hưởng mức chiết khấu tốt hơn ngay trong quý tiếp theo.
            </div>
          </PolicyAccordionItem>

          {/* Điều 9 */}
          <PolicyAccordionItem
            id="dieu-9"
            num={9}
            title="9. Chấm Dứt Hợp Đồng Hợp Tác Đại Lý"
            isOpen={openArticles.includes(9)}
            onToggle={() => toggleArticle(9)}
          >
            <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6, marginBottom: "10px" }}>
              Hợp đồng đại lý có thể chấm dứt hiệu lực trong các trường hợp sau:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", color: "#475569" }}>
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
          </PolicyAccordionItem>

        </div>

        {/* Official Sign-off & Contact Info Card (Executive Dark Slate Brand Card) */}
        <div
          className="oo-partner-signoff-card"
          style={{
            marginTop: "36px",
            background: "#0f172a",
            borderRadius: "16px",
            padding: "32px 28px",
            color: "#ffffff",
            border: "1px solid #1e293b",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "24px" }}>
            <div style={{ maxWidth: "680px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#38bdf8",
                  marginBottom: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                }}
              >
                <span>🏢 ĐƠN VỊ PHÂN PHỐI CHÍNH THỨC</span>
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 10px", color: "#ffffff" }}>
                CÔNG TY TNHH CÔNG NGHỆ MERCY
              </h3>
              <div style={{ fontSize: "13.5px", color: "#94a3b8", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: "4px" }}>
                <div>• <strong>Mã số thuế:</strong> <span style={{ color: "#e2e8f0" }}>0319227767</span></div>
                <div>• <strong>Hotline đại lý:</strong> <span style={{ color: "#38bdf8" }}>0763.068.614</span> (Hỗ trợ 24/7)</div>
                <div>• <strong>Email chính thức:</strong> <span style={{ color: "#e2e8f0" }}>contact@mercytechglobal.com</span></div>
                <div>• <strong>Trụ sở:</strong> 175/3 Đường Nguyễn Thị Be, Xã Đông Thạnh, TP. Hồ Chí Minh</div>
              </div>
            </div>

            <div className="oo-partner-hero-btns" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                type="button"
                className="oo-partner-hero-btn"
                onClick={() => onOpenModal("Đăng Ký Đại Lý Chính Thức")}
                style={{
                  backgroundColor: "#ff6f3d",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "13px 22px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 14px rgba(255, 111, 61, 0.35)",
                }}
              >
                <Lock size={16} />
                <span>Nhận Báo Giá Sỉ & Hợp Đồng</span>
              </button>

              <a
                href="https://www.messenger.com/t/286163107904324"
                target="_blank"
                rel="noopener noreferrer"
                onClick={openMessengerChat}
                title="Tư vấn nhanh qua Messenger"
                className="oo-partner-hero-btn"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  padding: "13px 22px",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <MessageCircle size={16} color="#38bdf8" />
                <span>Liên hệ qua Messenger</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
