"use client";

import React, { useState, useEffect } from "react";
import { Plus, X, ShieldAlert, Laptop, AlertCircle } from "lucide-react";
import type { AiTicket, IssueCategory } from "../types";

type CreateTicketModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (ticket: Omit<AiTicket, "id" | "createdAt" | "status">) => void;
};

export function CreateTicketModal({
  isOpen,
  onClose,
  onCreate,
}: CreateTicketModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [phoneOrZalo, setPhoneOrZalo] = useState("");
  const [issueCategory, setIssueCategory] = useState<IssueCategory>("cai_dat");
  const [priority, setPriority] = useState<"normal" | "urgent_data_risk">("normal");
  const [os, setOs] = useState<"windows" | "macos" | "linux">("windows");
  const [product, setProduct] = useState<
    "desktop_editors" | "mercy_installer" | "mercy_keys" | "docs" | "docspace"
  >("desktop_editors");
  const [issueDescription, setIssueDescription] = useState("");
  const [ultraViewerId, setUltraViewerId] = useState("");
  const [ultraViewerPass, setUltraViewerPass] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const trimmedName = customerName.trim();
    const trimmedContact = phoneOrZalo.trim();
    const trimmedDesc = issueDescription.trim();

    if (!trimmedName) {
      setValidationError("Vui lòng nhập tên khách hàng.");
      return;
    }

    if (!trimmedContact || trimmedContact.length < 8) {
      setValidationError("Vui lòng nhập số điện thoại hoặc Zalo hợp lệ (tối thiểu 8 ký tự).");
      return;
    }

    if (!trimmedDesc) {
      setValidationError("Vui lòng nhập tóm tắt vấn đề cần hỗ trợ.");
      return;
    }

    const editionLabel =
      os === "macos"
        ? "ONLYOFFICE Desktop macOS"
        : os === "linux"
          ? "ONLYOFFICE Desktop Linux"
          : "ONLYOFFICE Desktop Windows";

    onCreate({
      customerName: trimmedName,
      phoneOrZalo: trimmedContact,
      softwareEdition: editionLabel,
      product,
      os,
      priority,
      issueCategory,
      issueDescription: trimmedDesc,
      ultraViewerId: ultraViewerId.trim() || undefined,
      ultraViewerPass: ultraViewerPass.trim() || undefined,
    });

    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-ticket-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-5 sm:p-6 w-full max-w-lg border border-earth-brown/15 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-earth-brown/10 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gold/25 flex items-center justify-center text-deep-brown shrink-0">
              <Plus className="w-5 h-5 text-gold-dark" />
            </div>
            <div>
              <h3 id="create-ticket-title" className="text-base font-black text-deep-brown">
                Tạo Phiếu Hỗ Trợ Kỹ Thuật
              </h3>
              <p className="text-xs text-earth-brown/65">
                Nhập nhanh khi tiếp nhận qua hotline hoặc kết nối Zalo
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ tạo phiếu"
            className="p-1.5 rounded-lg text-earth-brown/50 hover:text-deep-brown hover:bg-earth-brown/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Validation Alert */}
        {validationError && (
          <div className="mb-3.5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{validationError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Row 1: Tên & SĐT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black text-deep-brown mb-1">
                Tên khách hàng: <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Anh Hoàng (Kế toán)"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                className="w-full text-xs p-2.5 rounded-xl bg-earth-brown/5 border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-deep-brown mb-1">
                Số điện thoại / Zalo: <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: 0912 839 421"
                value={phoneOrZalo}
                onChange={(e) => {
                  setPhoneOrZalo(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                className="w-full text-xs font-mono font-bold p-2.5 rounded-xl bg-earth-brown/5 border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          {/* Row 2: Phân loại sự cố & Mức độ ưu tiên */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black text-deep-brown mb-1">
                Phân loại sự cố:
              </label>
              <select
                value={issueCategory}
                onChange={(e) => setIssueCategory(e.target.value as IssueCategory)}
                className="w-full text-xs p-2.5 rounded-xl bg-earth-brown/5 border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold font-bold"
              >
                <option value="cai_dat">📦 Cài đặt bộ cài All-in-One (~7.1MB)</option>
                <option value="font_chu">🔤 Sửa lỗi font .VnTime ô vuông</option>
                <option value="ban_quyen">🔑 Kích hoạt Demo 7 ngày / Bản quyền</option>
                <option value="unikey">⌨️ Lỗi gõ tiếng Việt Unikey</option>
                <option value="dll">🛡️ Thiếu file VCRUNTIME140_1.dll</option>
                <option value="khac">❓ Sự cố khác</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-deep-brown mb-1">
                Mức độ ưu tiên:
              </label>
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as "normal" | "urgent_data_risk")
                }
                className={`w-full text-xs p-2.5 rounded-xl border focus:outline-none font-bold cursor-pointer ${priority === "urgent_data_risk"
                    ? "bg-rose-50 border-rose-300 text-rose-800"
                    : "bg-earth-brown/5 border-earth-brown/20 text-deep-brown focus:border-gold"
                  }`}
              >
                <option value="normal">Bình thường (Tiêu chuẩn)</option>
                <option value="urgent_data_risk">
                  🚨 Nguy cơ mất dữ liệu / Lỗi lưu file (Khẩn cấp)
                </option>
              </select>
            </div>
          </div>

          {/* Row 3: Hệ điều hành & Sản phẩm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1 text-xs font-black text-deep-brown mb-1">
                <Laptop className="w-3.5 h-3.5 text-earth-brown/70" />
                <span>Hệ điều hành:</span>
              </label>
              <select
                value={os}
                onChange={(e) => setOs(e.target.value as "windows" | "macos" | "linux")}
                className="w-full text-xs p-2.5 rounded-xl bg-earth-brown/5 border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold"
              >
                <option value="windows">Windows 10 / 11 (64-bit)</option>
                <option value="macos">macOS (Apple Silicon / Intel)</option>
                <option value="linux">Linux (Ubuntu / Debian / Fedora)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-deep-brown mb-1">
                Sản phẩm ONLYOFFICE:
              </label>
              <select
                value={product}
                onChange={(e) =>
                  setProduct(
                    e.target.value as
                    | "desktop_editors"
                    | "mercy_installer"
                    | "mercy_keys"
                    | "docs"
                    | "docspace"
                  )
                }
                className="w-full text-xs p-2.5 rounded-xl bg-earth-brown/5 border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold"
              >
                <option value="desktop_editors">Desktop Editors</option>
                <option value="mercy_installer">Bộ cài All-in-One Mercy</option>
                <option value="mercy_keys">Key / Demo 7 ngày</option>
                <option value="docs">Docs Máy Chủ Cộng Tác</option>
                <option value="docspace">DocSpace Doanh Nghiệp</option>
              </select>
            </div>
          </div>

          {/* Row 4: Mô tả sự cố */}
          <div>
            <label className="block text-xs font-black text-deep-brown mb-1">
              Mô tả ngắn gọn vấn đề: <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={2}
              placeholder="Khách cần hỗ trợ vấn đề gì (ví dụ: máy tính báo lỗi font khi mở văn bản cũ)..."
              value={issueDescription}
              onChange={(e) => {
                setIssueDescription(e.target.value);
                if (validationError) setValidationError(null);
              }}
              className="w-full text-xs p-2.5 rounded-xl bg-earth-brown/5 border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold leading-relaxed"
            />
          </div>

          {/* Row 5: UltraViewer Inputs */}
          <div className="p-3.5 rounded-2xl bg-gold/10 border border-gold/30 space-y-2">
            <span className="text-[11px] font-black uppercase text-deep-brown block">
              Thông tin UltraViewer (Nếu khách đã cung cấp):
            </span>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="ID (vd: 48 291 034)"
                value={ultraViewerId}
                onChange={(e) => setUltraViewerId(e.target.value)}
                className="w-full text-xs font-mono p-2 rounded-lg bg-white border border-gold/40 text-deep-brown focus:outline-none focus:border-gold font-bold"
              />
              <input
                type="text"
                placeholder="Pass (vd: 8392)"
                value={ultraViewerPass}
                onChange={(e) => setUltraViewerPass(e.target.value)}
                className="w-full text-xs font-mono p-2 rounded-lg bg-white border border-gold/40 text-deep-brown focus:outline-none focus:border-gold font-bold"
              />
            </div>
          </div>

          {priority === "urgent_data_risk" && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
              <span>
                Phiếu này sẽ được đánh dấu <strong>Khẩn cấp - Nguy cơ mất file</strong> để kỹ thuật viên ưu tiên gọi điện ngay.
              </span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-earth-brown/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-earth-brown/20 text-deep-brown hover:bg-earth-brown/10 transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gold hover:bg-gold-light text-deep-brown font-black text-xs shadow-sm transition-all cursor-pointer active:scale-95"
            >
              Tạo Phiếu Hỗ Trợ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
