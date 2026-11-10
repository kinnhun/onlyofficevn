"use client";

import React, { useRef } from "react";
import {
  Download,
  Type,
  Key,
  ImagePlus,
  FileSpreadsheet,
  Keyboard,
  Headset,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type QuickSuggestionsProps = {
  onSelect: (question: string) => void;
  onAttachImage?: () => void;
  disabled?: boolean;
};

const SUGGESTIONS = [
  {
    label: "Cài đặt phần mềm",
    icon: Download,
    query: "Hướng dẫn chọn và cài đặt phần mềm ONLYOFFICE đúng hệ điều hành",
  },
  {
    label: "Font và tiếng Việt",
    icon: Type,
    query: "Văn bản mở lên bị lỗi font .VnTime ô vuông thì xử lý thế nào?",
  },
  {
    label: "Tài khoản/Key Mercy",
    icon: Key,
    query: "Hướng dẫn đăng nhập tài khoản Mercy, nhập key hoặc dùng thử 7 ngày",
  },
  {
    label: "Lỗi gõ tiếng Việt",
    icon: Keyboard,
    query: "Khắc phục lỗi gõ tiếng Việt bị nhảy chữ hoặc mất dấu trong ONLYOFFICE",
  },
  {
    label: "Công thức bảng tính",
    icon: FileSpreadsheet,
    query: "Bảng tính báo lỗi công thức hoặc sai định dạng ngày tháng số tiền",
  },
  {
    label: "Gặp kỹ thuật viên",
    icon: Headset,
    query: "Tôi cần chuyển kỹ thuật viên hỗ trợ kiểm tra trực tiếp",
  },
];

export function QuickSuggestions({
  onSelect,
  onAttachImage,
  disabled,
}: QuickSuggestionsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -220 : 220;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative px-3 sm:px-4 py-2 border-t border-slate-200 bg-[#F9FAFB]">
      <div className="max-w-4xl mx-auto flex items-center gap-2">
        <span className="text-[11px] font-bold text-[#475467] shrink-0">
          Gợi ý:
        </span>

        <div
          ref={scrollRef}
          className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5"
        >
          {onAttachImage && (
            <button
              type="button"
              disabled={disabled}
              onClick={onAttachImage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#C4320A] bg-[#FFF4EE] hover:bg-[#FFE6D8] border border-[#FF520D]/30 whitespace-nowrap transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF520D]"
            >
              <ImagePlus className="w-3.5 h-3.5 shrink-0" />
              <span>Gửi ảnh cần hỗ trợ</span>
            </button>
          )}

          {SUGGESTIONS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                disabled={disabled}
                onClick={() => onSelect(item.query)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#101828] bg-white hover:bg-[#FFF4EE] border border-slate-200 hover:border-[#FF520D]/50 whitespace-nowrap transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF520D]"
              >
                <Icon className="w-3.5 h-3.5 text-[#FF520D] shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center gap-0.5 shrink-0 pl-1">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Cuộn gợi ý sang trái"
            className="p-1 rounded-full hover:bg-slate-200/70 text-[#475467] hover:text-[#101828] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Cuộn gợi ý sang phải"
            className="p-1 rounded-full hover:bg-slate-200/70 text-[#475467] hover:text-[#101828] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
