"use client";

import React from "react";
import { Sparkles, RotateCcw, Headset, ShieldCheck } from "lucide-react";

type ChatHeaderProps = {
  onReset: () => void;
  onOpenHandoff: () => void;
  messageCount: number;
};

export function ChatHeader({ onReset, onOpenHandoff, messageCount }: ChatHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 border-b border-earth-brown/10 bg-white/70 backdrop-blur-md rounded-t-2xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center text-deep-brown shadow-sm shrink-0">
          <Sparkles className="w-5 h-5 text-gold-dark" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold text-deep-brown">
              Trợ Lý AI ONLYOFFICE
            </h1>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Trực tuyến 24/7
            </span>
          </div>
          <p className="text-xs text-earth-brown/80 flex items-center gap-1.5 mt-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-dark shrink-0" />
            Giải đáp tính năng, hướng dẫn cài đặt & khắc phục sự cố kỹ thuật
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        {messageCount > 0 && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-earth-brown/15 bg-white/80 hover:bg-gold/10 hover:border-gold/40 text-deep-brown transition-all duration-200"
            title="Bắt đầu hội thoại mới"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Hội thoại mới</span>
          </button>
        )}
        <button
          onClick={onOpenHandoff}
          className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg bg-gold hover:bg-gold-light text-deep-brown shadow-sm transition-all duration-200"
        >
          <Headset className="w-3.5 h-3.5" />
          <span>Gặp Kỹ Thuật Viên</span>
        </button>
      </div>
    </div>
  );
}
