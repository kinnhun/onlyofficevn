"use client";

import React from "react";
import { AlertCircle, CheckCircle2, Headset, ShieldAlert } from "lucide-react";
import type { AiTicket } from "../types";

type TicketStatsHeaderProps = {
  tickets: AiTicket[];
};

export function TicketStatsHeader({ tickets }: TicketStatsHeaderProps) {
  const pendingCount = tickets.filter((t) => t.status === "pending").length;
  const urgentRiskCount = tickets.filter(
    (t) => t.priority === "urgent_data_risk" && t.status !== "resolved"
  ).length;
  const inProgressCount = tickets.filter((t) => t.status === "in_progress").length;
  const resolvedCount = tickets.filter((t) => t.status === "resolved").length;

  return (
    <div
      role="region"
      aria-label="Thống kê tổng quan phiếu hỗ trợ kỹ thuật"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
    >
      {/* Card 1: Cần hỗ trợ ngay */}
      <div
        className={`p-4 rounded-2xl border transition-all ${
          pendingCount > 0
            ? "bg-rose-50/90 border-rose-200 shadow-xs"
            : "bg-white/80 border-earth-brown/15"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                pendingCount > 0
                  ? "bg-rose-500 text-white animate-pulse"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-earth-brown/80 uppercase tracking-wider">
                Chờ Gọi / Hỗ Trợ
              </div>
              <div className="text-2xl font-black text-rose-600 font-mono">
                {pendingCount} <span className="text-xs font-normal text-rose-500">phiếu</span>
              </div>
            </div>
          </div>
          {pendingCount > 0 && (
            <span className="flex h-3 w-3 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
          )}
        </div>
      </div>

      {/* Card 2: Nguy cơ mất file / lỗi lưu trữ */}
      <div
        className={`p-4 rounded-2xl border transition-all ${
          urgentRiskCount > 0
            ? "bg-amber-50 border-amber-300 shadow-xs"
            : "bg-white/80 border-earth-brown/15"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                urgentRiskCount > 0
                  ? "bg-amber-600 text-white animate-bounce"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-earth-brown/80 uppercase tracking-wider">
                Rủi Ro Dữ Liệu
              </div>
              <div
                className={`text-2xl font-black font-mono ${
                  urgentRiskCount > 0 ? "text-amber-800" : "text-earth-brown/70"
                }`}
              >
                {urgentRiskCount} <span className="text-xs font-normal text-earth-brown/60">khẩn cấp</span>
              </div>
            </div>
          </div>
          {urgentRiskCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-200 text-amber-900 border border-amber-300">
              Cần cứu file
            </span>
          )}
        </div>
      </div>

      {/* Card 3: Đang kết nối UltraViewer */}
      <div className="p-4 rounded-2xl bg-white/80 border border-earth-brown/15 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <Headset className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-earth-brown/80 uppercase tracking-wider">
              Đang Hỗ Trợ
            </div>
            <div className="text-2xl font-black text-sky-700 font-mono">
              {inProgressCount} <span className="text-xs font-normal text-sky-600">khách</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 4: Đã xử lý xong */}
      <div className="p-4 rounded-2xl bg-white/80 border border-earth-brown/15 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-earth-brown/80 uppercase tracking-wider">
              Đã Xử Lý Xong
            </div>
            <div className="text-2xl font-black text-emerald-700 font-mono">
              {resolvedCount} <span className="text-xs font-normal text-emerald-600">ca xong</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
