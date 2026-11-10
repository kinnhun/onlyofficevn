"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Phone,
  Copy,
  Check,
  Monitor,
  FileText,
  Save,
  Share2,
  Image as ImageIcon,
  AlertTriangle,
  ListChecks,
  Stethoscope,
} from "lucide-react";
import type { AiTicket, TicketStatus, AssignedTech } from "../types";

type TicketDetailDrawerProps = {
  ticket: AiTicket | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (
    id: string,
    status: TicketStatus,
    notes?: string,
    assignedTech?: AssignedTech
  ) => void;
};

export function TicketDetailDrawer({
  ticket,
  isOpen,
  onClose,
  onUpdateStatus,
}: TicketDetailDrawerProps) {
  const [notes, setNotes] = useState("");
  const [assignedTech, setAssignedTech] = useState<AssignedTech>("chua_nhan");
  const [savedNotes, setSavedNotes] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedZaloPhone, setCopiedZaloPhone] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (ticket) {
      setNotes(ticket.notes || "");
      setAssignedTech(ticket.assignedTech || "chua_nhan");
      setFailedImages({});
    }
  }, [ticket]);

  if (!isOpen || !ticket) return null;

  const handleSaveNotes = () => {
    onUpdateStatus(ticket.id, ticket.status, notes, assignedTech);
    setSavedNotes(true);
    setTimeout(() => setSavedNotes(false), 2000);
  };

  const handleCopySummary = () => {
    const summary = [
      `PHIẾU HỖ TRỢ #${ticket.id}`,
      `Khách: ${ticket.customerName}`,
      `Liên hệ: ${ticket.phoneOrZalo}`,
      `Sản phẩm/OS: ${ticket.product || ticket.softwareEdition} / ${ticket.os || "unknown"}`,
      `UltraViewer ID: ${ticket.ultraViewerId || "Chưa có"} | Pass: ${ticket.ultraViewerPass || "Chưa có"}`,
      `Vấn đề: ${ticket.issueDescription}`,
      ticket.diagnosticSummary ? `Chẩn đoán AI: ${ticket.diagnosticSummary}` : "",
      `Tạo lúc: ${new Date(ticket.createdAt).toLocaleString("vi-VN")}`,
    ]
      .filter(Boolean)
      .join("\n");
    navigator.clipboard.writeText(summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const rawPhone = ticket.phoneOrZalo.replace(/[^0-9]/g, "");

  const handleCopyZalo = () => {
    navigator.clipboard.writeText(rawPhone || ticket.phoneOrZalo);
    setCopiedZaloPhone(true);
    setTimeout(() => setCopiedZaloPhone(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-earth-brown/15 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-earth-brown/10 bg-white/95 sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                ticket.status === "pending"
                  ? "bg-rose-100 text-rose-700 border border-rose-300"
                  : ticket.status === "in_progress"
                  ? "bg-sky-100 text-sky-800 border border-sky-300"
                  : "bg-emerald-100 text-emerald-800 border border-emerald-300"
              }`}
            >
              {ticket.status === "pending"
                ? "Chờ tiếp nhận"
                : ticket.status === "in_progress"
                ? "Kỹ thuật đang hỗ trợ (Tạm dừng AI)"
                : "Đã xử lý"}
            </span>
            {ticket.priority === "urgent_data_risk" && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-red-600 text-white flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                <span>Ưu tiên rủi ro dữ liệu</span>
              </span>
            )}
            <span className="font-mono text-xs font-bold text-deep-brown">
              #{ticket.id}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleCopySummary}
              className="p-2 rounded-xl hover:bg-earth-brown/10 text-earth-brown/70 hover:text-deep-brown transition-colors cursor-pointer"
              title="Sao chép tóm tắt phiếu"
            >
              {copiedSummary ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-earth-brown/10 text-earth-brown/70 hover:text-deep-brown transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="p-5 space-y-5 flex-1">
          {/* Customer & Contact */}
          <div className="p-4 rounded-2xl bg-earth-brown/5 border border-earth-brown/10 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h4 className="text-base font-black text-deep-brown">
                {ticket.customerName}
              </h4>
              <span className="text-xs font-semibold text-earth-brown/70">
                {ticket.product || ticket.softwareEdition}
                {ticket.os ? ` · ${ticket.os}` : ""}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {rawPhone && (
                <a
                  href={`tel:${rawPhone}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Gọi: {ticket.phoneOrZalo}</span>
                </a>
              )}

              <button
                type="button"
                onClick={handleCopyZalo}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-2xs transition-all cursor-pointer"
              >
                {copiedZaloPhone ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>
                  {copiedZaloPhone ? "Đã chép liên hệ" : "Chép SĐT / Email"}
                </span>
              </button>
            </div>
          </div>

          {/* Structured AI Diagnostic Summary (Customer never repeats from scratch) */}
          {ticket.diagnosticSummary && (
            <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-black text-sky-900">
                <Stethoscope className="w-4 h-4 text-sky-700" />
                <span>Tóm tắt chẩn đoán từ phiên AI:</span>
              </div>
              <p className="text-xs text-sky-950 leading-relaxed whitespace-pre-line">
                {ticket.diagnosticSummary}
              </p>
            </div>
          )}

          {/* Attempted Steps */}
          {ticket.attemptedStepsSummary && ticket.attemptedStepsSummary.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-900">
                <ListChecks className="w-4 h-4 text-amber-700" />
                <span>Các bước khách đã thử (tránh hướng dẫn lặp lại):</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-xs text-amber-950">
                {ticket.attemptedStepsSummary.map((st, idx) => (
                  <li key={idx}>{st}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Private Customer Screenshots (via authorized access route, 7-day retention) */}
          {ticket.attachmentIds && ticket.attachmentIds.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-black text-deep-brown flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-gold-dark" />
                <span>
                  Ảnh chụp màn hình khách gửi ({ticket.attachmentIds.length} ảnh — lưu riêng tư 7 ngày):
                </span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {ticket.attachmentIds.map((attId) => {
                  const accessUrl = `/api/support/attachments/${attId}/access`;
                  const isExpiredOrFailed = failedImages[attId];
                  return (
                    <div
                      key={attId}
                      className="rounded-xl border border-earth-brown/20 overflow-hidden bg-slate-50 flex flex-col"
                    >
                      {isExpiredOrFailed ? (
                        <div className="h-28 p-2 flex items-center justify-center text-center text-[11px] text-earth-brown/60">
                          Ảnh đã hết hạn lưu 7 ngày hoặc đã được khách xóa.
                        </div>
                      ) : (
                        <a
                          href={accessUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="block group relative"
                          title="Bấm để mở ảnh gốc trong tab mới"
                        >
                          <img
                            src={accessUrl}
                            alt={`Ảnh đính kèm ${attId}`}
                            onError={() =>
                              setFailedImages((prev) => ({
                                ...prev,
                                [attId]: true,
                              }))
                            }
                            className="w-full h-28 object-cover group-hover:opacity-90 transition-opacity"
                          />
                        </a>
                      )}
                      <span className="px-2 py-1 text-[10px] font-mono text-earth-brown/70 truncate bg-white border-t border-earth-brown/10">
                        {attId}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* UltraViewer Box */}
          <div className="p-4 rounded-2xl bg-gold/10 border border-gold/30 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-black text-deep-brown uppercase tracking-wider">
              <Monitor className="w-4 h-4 text-gold-dark" />
              <span>Thông tin UltraViewer (Tùy chọn)</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-white p-2.5 rounded-xl border border-gold/40">
                <span className="text-[10px] text-earth-brown/60 block font-sans">
                  ID UltraViewer:
                </span>
                <span className="font-bold text-deep-brown text-sm">
                  {ticket.ultraViewerId || "Chưa cung cấp"}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-gold/40">
                <span className="text-[10px] text-earth-brown/60 block font-sans">
                  Mật khẩu:
                </span>
                <span className="font-bold text-deep-brown text-sm">
                  {ticket.ultraViewerPass || "Chưa cung cấp"}
                </span>
              </div>
            </div>
          </div>

          {/* Assign Technician */}
          <div className="space-y-1.5">
            <label className="block text-xs font-black text-deep-brown">
              Kỹ thuật viên phụ trách:
            </label>
            <select
              value={assignedTech}
              onChange={(e) => setAssignedTech(e.target.value as AssignedTech)}
              className="w-full text-xs p-2.5 rounded-xl bg-earth-brown/5 border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold font-bold"
            >
              <option value="chua_nhan">Chưa phân công</option>
              <option value="kien_it">Kiên IT (Kỹ thuật viên trưởng)</option>
              <option value="cskh_mercy">Bích Phương (CSKH Mercy Tech)</option>
            </select>
          </div>

          {/* Issue Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-black text-deep-brown">
              Mô tả từ khách hàng:
            </label>
            <div className="text-xs text-deep-brown bg-earth-brown/5 p-3 rounded-xl border border-earth-brown/10 leading-relaxed font-medium">
              {ticket.issueDescription}
            </div>
          </div>

          {/* Conversation Snippet */}
          {ticket.conversationSnippet && (
            <div className="space-y-1.5">
              <label className="text-xs font-black text-deep-brown flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-gold-dark" />
                <span>Lịch sử trao đổi trước khi chuyển kỹ thuật:</span>
              </label>
              <div className="text-xs text-earth-brown/85 bg-white p-3 rounded-xl border border-earth-brown/15 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                {ticket.conversationSnippet}
              </div>
            </div>
          )}

          {/* Internal Notes */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-deep-brown">
                Ghi chú xử lý nội bộ:
              </label>
              {savedNotes && (
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Đã lưu</span>
                </span>
              )}
            </div>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ghi nhận nguyên nhân thực tế và kết quả xử lý..."
              className="w-full text-xs p-3 rounded-xl bg-earth-brown/5 border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold leading-relaxed"
            />
            <button
              type="button"
              onClick={handleSaveNotes}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold hover:bg-gold-light text-deep-brown font-black text-xs shadow-2xs transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Lưu Ghi Chú & Phân Công</span>
            </button>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-earth-brown/10 bg-earth-brown/5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {ticket.status === "pending" && (
              <button
                type="button"
                onClick={() =>
                  onUpdateStatus(ticket.id, "in_progress", notes, assignedTech)
                }
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs shadow-sm transition-all cursor-pointer"
              >
                Tiếp Nhận & Tạm Dừng AI
              </button>
            )}
            {ticket.status !== "resolved" ? (
              <button
                type="button"
                onClick={() =>
                  onUpdateStatus(ticket.id, "resolved", notes, assignedTech)
                }
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-sm transition-all cursor-pointer"
              >
                Hoàn Tất Phiếu Kỹ Thuật
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  onUpdateStatus(ticket.id, "in_progress", notes, assignedTech)
                }
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs shadow-sm transition-all cursor-pointer"
              >
                Mở Lại Hỗ Trợ
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-earth-brown/20 text-deep-brown font-semibold text-xs hover:bg-white transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
