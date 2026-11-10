"use client";

import React, { useState, useMemo } from "react";
import {
  Bot,
  Plus,
  Download,
  Key,
  Type,
  Calculator,
  FileSpreadsheet,
  Keyboard,
  ShieldCheck,
  Headset,
  ArrowLeft,
  X,
  Search,
  ImagePlus,
  Copy,
  Check,
  Layers,
} from "lucide-react";
import Link from "next/link";

type ChatSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  onSelectTopic: (topicQuery: string) => void;
  onTriggerAttachImage?: () => void;
  onOpenHandoff: () => void;
  hotlineZalo?: string;
  hotlineTech?: string;
  supportHours?: string;
};

type TopicItem = {
  id: string;
  categoryLabel: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  query: string;
  badge?: string;
};

const TOPICS: TopicItem[] = [
  {
    id: "t_install",
    categoryLabel: "Cài đặt & Cập nhật",
    title: "Chọn bộ cài đúng hệ điều hành",
    desc: "Windows (.exe), macOS (.dmg) & Linux",
    icon: Download,
    query: "Hướng dẫn chọn và cài đặt phần mềm ONLYOFFICE đúng hệ điều hành máy tính",
    badge: "OS",
  },
  {
    id: "t_account_key",
    categoryLabel: "Tài khoản & Key Mercy",
    title: "Tài khoản, Key & Dùng thử 7 ngày",
    desc: "Đăng nhập, nhập key kích hoạt hoặc cài lại máy",
    icon: Key,
    query: "Hướng dẫn đăng nhập tài khoản Mercy, nhập key kích hoạt hoặc dùng thử 7 ngày",
    badge: "7 ngày",
  },
  {
    id: "t_font",
    categoryLabel: "Văn bản & Tiếng Việt",
    title: "Lỗi font .VnTime / TCVN3 / VNI",
    desc: "Sao lưu file gốc & chuyển mã Unicode an toàn",
    icon: Type,
    query: "Văn bản mở lên bị lỗi font .VnTime ô vuông thì kiểm tra và chuyển mã thế nào?",
    badge: "Phổ biến",
  },
  {
    id: "t_unikey",
    categoryLabel: "Văn bản & Tiếng Việt",
    title: "Lỗi gõ tiếng Việt (Unikey / macOS)",
    desc: "Khắc phục nhảy chữ, mất dấu tiếng Việt",
    icon: Keyboard,
    query: "Khắc phục lỗi gõ tiếng Việt bị mất dấu hoặc nhảy chữ trong ONLYOFFICE",
  },
  {
    id: "t_spreadsheet",
    categoryLabel: "Bảng tính & Plugin",
    title: "Công thức, ngày tháng & Đọc số",
    desc: "Dấu phân cách công thức, định dạng số & plugin",
    icon: FileSpreadsheet,
    query: "Bảng tính bị lỗi công thức dấu phẩy/chấm phẩy hoặc sai định dạng ngày tháng",
  },
  {
    id: "t_number_words",
    categoryLabel: "Bảng tính & Plugin",
    title: "Plugin Đọc số tiền & Công thức Toán",
    desc: "Hướng dẫn bật tiện ích trên bộ cài Mercy",
    icon: Calculator,
    query: "Cách kiểm tra và sử dụng tiện ích Đọc Số Thành Chữ hoặc công thức toán học",
  },
  {
    id: "t_dll",
    categoryLabel: "Cài đặt & Cập nhật",
    title: "Thiếu VCRUNTIME140_1.dll / Không mở được",
    desc: "Cài bổ sung Visual C++ Redistributable chính thức",
    icon: ShieldCheck,
    query: "Mở phần mềm báo lỗi thiếu file VCRUNTIME140_1.dll hoặc không khởi động được",
  },
  {
    id: "t_docs_docspace",
    categoryLabel: "Docs & DocSpace",
    title: "Phân biệt Desktop, Docs & DocSpace",
    desc: "Cộng tác trực tuyến, plugin AI & kết nối máy chủ",
    icon: Layers,
    query: "Phân biệt ONLYOFFICE Desktop Editors, Docs và DocSpace như thế nào?",
  },
];

export function ChatSidebar({
  isOpen,
  onClose,
  onNewChat,
  onSelectTopic,
  onTriggerAttachImage,
  onOpenHandoff,
  hotlineZalo = "0763 068 614",
  hotlineTech = "0862 497 002",
  supportHours = "08:00 – 17:30 (Thứ 2 – Thứ 7)",
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedZalo, setCopiedZalo] = useState(false);

  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return TOPICS;
    const q = searchQuery.toLowerCase();
    return TOPICS.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.categoryLabel.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleCopyZaloNumber = () => {
    navigator.clipboard.writeText(hotlineZalo.replace(/[^0-9]/g, ""));
    setCopiedZalo(true);
    setTimeout(() => setCopiedZalo(false), 2000);
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden animate-in fade-in"
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Danh mục hỗ trợ kỹ thuật"
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-[300px] sm:w-[320px] bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-out shrink-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Header */}
        <div className="p-4 border-b border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-85 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF520D] rounded-lg"
            >
              <img
                src="/mercy_logo.png"
                alt="Mercy Tech"
                className="h-7 w-auto block"
              />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C4320A] px-2 py-0.5 rounded-full bg-[#FFF4EE] border border-[#FF520D]/30">
                Hỗ trợ kỹ thuật
              </span>
            </Link>

            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng danh mục"
              className="lg:hidden p-1.5 rounded-lg text-[#475467] hover:text-[#101828] hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                onNewChat();
                onClose();
              }}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#FF520D] hover:bg-[#E04406] text-white font-bold text-xs shadow-xs transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101828]"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Vấn đề mới</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onTriggerAttachImage?.();
              }}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#FFF4EE] hover:bg-[#FFE6D8] text-[#C4320A] border border-[#FF520D]/30 font-bold text-xs transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF520D]"
            >
              <ImagePlus className="w-4 h-4" />
              <span>Gửi ảnh lỗi</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm chủ đề: cài đặt, font, key..."
              aria-label="Tìm kiếm chủ đề hỗ trợ"
              className="w-full pl-8 pr-7 py-2 text-xs bg-[#F9FAFB] rounded-xl border border-slate-200 text-[#101828] placeholder:text-[#667085] focus:outline-none focus:border-[#FF520D] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Xóa từ khóa tìm kiếm"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded text-[#667085] hover:text-[#101828]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Topics */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#667085] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Bot className="w-3 h-3 text-[#FF520D]" />
              <span>Chủ đề kỹ thuật</span>
            </span>
            <span>{filteredTopics.length} mục</span>
          </div>

          {filteredTopics.length === 0 && (
            <div className="text-center py-6 px-3 text-xs text-[#667085]">
              Không tìm thấy chủ đề khớp với &ldquo;{searchQuery}&rdquo;.
            </div>
          )}

          {filteredTopics.map((topic) => {
            const Icon = topic.icon;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => {
                  onSelectTopic(topic.query);
                  onClose();
                }}
                className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-left hover:bg-[#FFF4EE]/70 border border-transparent hover:border-[#FF520D]/30 transition-all cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF520D]"
              >
                <div className="w-8 h-8 rounded-lg bg-[#F2F4F7] group-hover:bg-[#FFF4EE] text-[#344054] group-hover:text-[#FF520D] flex items-center justify-center shrink-0 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-[#101828] truncate">
                      {topic.title}
                    </span>
                    {topic.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-[#344054] shrink-0">
                        {topic.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#667085] truncate">
                    {topic.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Contact & Handoff Card — Official Zalo CSKH phone only */}
        <div className="p-3.5 border-t border-slate-200 bg-[#F9FAFB] space-y-2.5">
          <button
            type="button"
            onClick={() => {
              onOpenHandoff();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#FFF4EE] border border-[#FF520D]/40 text-[#101828] font-bold text-xs shadow-2xs transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF520D]"
          >
            <Headset className="w-4 h-4 text-[#FF520D]" />
            <span>Chuyển phiếu gặp kỹ thuật viên</span>
          </button>

          <div className="text-[11px] text-[#344054] bg-white rounded-xl p-2.5 border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between gap-1">
              <span className="font-semibold text-[#101828]">
                Zalo CSKH (Mercy Tech Global):
              </span>
              <button
                type="button"
                onClick={handleCopyZaloNumber}
                title="Sao chép số Zalo CSKH"
                className="inline-flex items-center gap-1 font-mono font-bold text-[#C4320A] hover:underline cursor-pointer"
              >
                <span>{hotlineZalo}</span>
                {copiedZalo ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#667085]">
              <span>Hotline kỹ thuật:</span>
              <a
                href={`tel:${hotlineTech.replace(/[^0-9]/g, "")}`}
                className="font-mono font-bold text-[#101828] hover:underline"
              >
                {hotlineTech}
              </a>
            </div>
            <div className="text-[10px] text-[#667085] pt-0.5 border-t border-slate-100">
              Giờ hỗ trợ trực tiếp: {supportHours}
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center justify-center gap-1.5 text-xs text-[#475467] hover:text-[#101828] font-semibold py-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay về trang chủ</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
