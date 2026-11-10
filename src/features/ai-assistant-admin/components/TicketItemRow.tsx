"use client";

import React, { useState } from "react";
import {
  Phone,
  Copy,
  Check,
  Play,
  CheckCircle2,
  Trash2,
  Monitor,
  Clock,
  RotateCcw,
  Eye,
  UserCheck,
  AlertTriangle,
  Image as ImageIcon,
} from "lucide-react";
import type { AiTicket, TicketStatus, IssueCategory } from "../types";

type TicketItemRowProps = {
  ticket: AiTicket;
  onUpdateStatus: (id: string, status: TicketStatus) => void;
  onDelete: (id: string) => void;
  onOpenDetail: (ticket: AiTicket) => void;
};

const CATEGORY_LABELS: Record<IssueCategory, { label: string; color: string }> = {
  cai_dat: {
    label: "Cài đặt & Cập nhật",
    color: "bg-amber-100 text-amber-800 border-amber-300",
  },
  font_chu: {
    label: "Font & Tiếng Việt",
    color: "bg-sky-100 text-sky-800 border-sky-300",
  },
  ban_quyen: {
    label: "Key & Demo 7 ngày",
    color: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  unikey: {
    label: "Bộ gõ tiếng Việt",
    color: "bg-purple-100 text-purple-800 border-purple-300",
  },
  dll: {
    label: "Thiếu file DLL",
    color: "bg-orange-100 text-orange-800 border-orange-300",
  },
  khac: {
    label: "Hỗ trợ kỹ thuật",
    color: "bg-neutral-100 text-neutral-800 border-neutral-300",
  },
};

export function TicketItemRow({
  ticket,
  onUpdateStatus,
  onDelete,
  onOpenDetail,
}: TicketItemRowProps) {
  const [copiedId, setCopiedId] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);
  const [copiedContact, setCopiedContact] = useState(false);

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!ticket.ultraViewerId) return;
    navigator.clipboard.writeText(ticket.ultraViewerId.replace(/\s+/g, ""));
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 1500);
  };

  const handleCopyPass = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!ticket.ultraViewerPass) return;
    navigator.clipboard.writeText(ticket.ultraViewerPass);
    setCopiedPass(true);
    setTimeout(() => setCopiedPass(false), 1500);
  };

  const rawPhone = ticket.phoneOrZalo.replace(/[^0-9]/g, "");
  const cat = ticket.issueCategory
    ? CATEGORY_LABELS[ticket.issueCategory]
    : CATEGORY_LABELS.khac;

  const handleCopyContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(rawPhone || ticket.phoneOrZalo);
    setCopiedContact(true);
    setTimeout(() => setCopiedContact(false), 1500);
  };

  return (
    <div
      onClick={() => onOpenDetail(ticket)}
      className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer group ${
        ticket.status === "pending"
          ? "bg-white border-rose-300 shadow-sm hover:border-rose-400"
          : ticket.status === "in_progress"
          ? "bg-sky-50/70 border-sky-300 shadow-xs hover:border-sky-400"
          : "bg-white/80 border-earth-brown/15 opacity-85 hover:opacity-100 hover:border-gold/50"
      }`}
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Column 1: Customer & Summary */}
        <div className="min-w-0 flex-1 space-y-1.5">
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
                ? "Đang hỗ trợ"
                : "Đã xong"}
            </span>

            {ticket.priority === "urgent_data_risk" && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                <span>Rủi ro mất dữ liệu</span>
              </span>
            )}

            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${cat.color}`}
            >
              {cat.label}
            </span>

            {ticket.attachmentIds && ticket.attachmentIds.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                <ImageIcon className="w-3 h-3" />
                <span>{ticket.attachmentIds.length} ảnh</span>
              </span>
            )}

            <span className="text-xs font-mono text-earth-brown/60">
              #{ticket.id}
            </span>

            <span className="text-[11px] text-earth-brown/70 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>
                {new Date(ticket.createdAt).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span>
                - {new Date(ticket.createdAt).toLocaleDateString("vi-VN")}
              </span>
            </span>

            {ticket.assignedTech && ticket.assignedTech !== "chua_nhan" && (
              <span className="text-[10px] font-bold text-deep-brown bg-gold/20 px-2 py-0.5 rounded-full flex items-center gap-1 border border-gold/40">
                <UserCheck className="w-3 h-3 text-gold-dark" />
                <span>
                  {ticket.assignedTech === "kien_it" ? "Kiên IT" : "Bích Phương"}
                </span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <h4 className="text-base font-black text-deep-brown tracking-tight group-hover:text-gold-dark transition-colors">
              {ticket.customerName}
            </h4>

            <div
              className="flex items-center gap-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              {rawPhone && (
                <a
                  href={`tel:${rawPhone}`}
                  className="flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition-all"
                  title="Bấm để gọi điện"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{ticket.phoneOrZalo}</span>
                </a>
              )}

              <button
                type="button"
                onClick={handleCopyContact}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-2xs transition-all cursor-pointer"
                title="Sao chép SĐT Zalo hoặc Email khách"
              >
                {copiedContact ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedContact ? "Đã chép" : "Chép SĐT"}</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-earth-brown/90 leading-relaxed font-medium">
            <strong className="text-deep-brown">Vấn đề:</strong>{" "}
            {ticket.issueDescription}
          </p>
        </div>

        {/* Column 2: UltraViewer */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-earth-brown/5 rounded-xl p-3 border border-earth-brown/10 shrink-0 w-full sm:w-auto min-w-[240px]"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-deep-brown/80 mb-2">
            <Monitor className="w-3.5 h-3.5 text-gold-dark" />
            <span>Thông tin UltraViewer:</span>
          </div>

          {ticket.ultraViewerId ? (
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-earth-brown/15">
                <span>
                  ID: <strong>{ticket.ultraViewerId}</strong>
                </span>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="flex items-center gap-1 px-2 py-0.5 rounded bg-gold/20 hover:bg-gold/40 text-deep-brown text-[11px] font-sans font-bold transition-colors cursor-pointer"
                >
                  {copiedId ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>{copiedId ? "Đã chép" : "Copy ID"}</span>
                </button>
              </div>

              {ticket.ultraViewerPass && (
                <div className="flex items-center justify-between gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-earth-brown/15">
                  <span>
                    Pass: <strong>{ticket.ultraViewerPass}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyPass}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-gold/20 hover:bg-gold/40 text-deep-brown text-[11px] font-sans font-bold transition-colors cursor-pointer"
                  >
                    {copiedPass ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>{copiedPass ? "Đã chép" : "Copy Pass"}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs text-earth-brown/60 italic py-1">
              Chưa kèm UltraViewer
            </div>
          )}
        </div>

        {/* Column 3: Status Actions */}
        <div
          className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => onOpenDetail(ticket)}
            className="p-2.5 rounded-xl border border-earth-brown/20 bg-white hover:bg-gold/15 text-deep-brown transition-colors cursor-pointer"
            title="Xem chi tiết chẩn đoán & ảnh đính kèm"
          >
            <Eye className="w-4 h-4 text-gold-dark" />
          </button>

          {ticket.status === "pending" && (
            <button
              type="button"
              onClick={() => onUpdateStatus(ticket.id, "in_progress")}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Tiếp nhận</span>
            </button>
          )}

          {ticket.status === "in_progress" && (
            <button
              type="button"
              onClick={() => onUpdateStatus(ticket.id, "resolved")}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Hoàn tất</span>
            </button>
          )}

          {ticket.status === "resolved" && (
            <button
              type="button"
              onClick={() => onUpdateStatus(ticket.id, "in_progress")}
              className="flex items-center gap-1 px-3 py-2 rounded-xl border border-earth-brown/20 bg-white hover:bg-earth-brown/10 text-deep-brown font-semibold text-xs transition-colors cursor-pointer"
              title="Mở lại phiếu"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Mở lại</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onDelete(ticket.id)}
            className="p-2.5 rounded-xl hover:bg-rose-100 text-earth-brown/50 hover:text-rose-600 transition-colors cursor-pointer"
            title="Xóa phiếu"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
