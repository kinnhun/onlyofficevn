"use client";

import React, { useEffect, useRef } from "react";
import { MessageItem } from "./MessageItem";
import {
  Bot,
  Download,
  Key,
  Type,
  ImagePlus,
  Loader2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import type { ChatMessage, ProcessingStage } from "../types";

type MessageListProps = {
  messages: ChatMessage[];
  isLoading: boolean;
  stage?: ProcessingStage;
  onSelectAction?: (actionText: string) => void;
  onTriggerAttachImage?: () => void;
  onOutcomeAction?: (
    messageId: string,
    action: "resolved" | "still_failing" | "attach_another" | "handoff"
  ) => void;
  onFeedback?: (messageId: string, rating: "helpful" | "unhelpful") => void;
};

const STAGE_LABELS: Record<string, string> = {
  validating_image: "Đang kiểm tra ảnh...",
  reading_image: "Đang đọc nội dung ảnh chụp màn hình...",
  searching_knowledge: "Đang tìm hướng dẫn phù hợp...",
  preparing_answer: "Đang chuẩn bị câu trả lời...",
};

export function MessageList({
  messages,
  isLoading,
  stage = "idle",
  onSelectAction,
  onTriggerAttachImage,
  onOutcomeAction,
  onFeedback,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isLoading]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 p-4 sm:p-8 flex flex-col items-center justify-center overflow-y-auto bg-[#F9FAFB]">
        <div className="max-w-3xl w-full text-center space-y-6 animate-in fade-in duration-200">
          <div className="inline-flex items-center justify-center relative">
            <div className="w-16 h-16 rounded-2xl bg-[#FF520D] text-white flex items-center justify-center shadow-md">
              <Bot className="w-8 h-8" />
            </div>
            <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-[#101828] text-white text-[10px] font-bold tracking-wide border-2 border-white">
              Trợ lý AI
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
              Trợ lý kỹ thuật ONLYOFFICE
            </h2>
            <p className="text-xs font-semibold text-[#FF520D]">
              Hỗ trợ bởi Mercy Tech · Trợ lý AI
            </p>
            <p className="text-sm text-[#344054] max-w-xl mx-auto leading-relaxed pt-1">
              Chào anh/chị, em là trợ lý AI hỗ trợ ONLYOFFICE của Mercy Tech. Anh/chị
              có thể mô tả vấn đề hoặc gửi ảnh màn hình để em cùng kiểm tra.
            </p>
          </div>

          {/* 4 Official Starter Cards per Specification Section 4.1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <button
              type="button"
              onClick={() =>
                onSelectAction?.("Hướng dẫn cài đặt phần mềm ONLYOFFICE phù hợp hệ điều hành")
              }
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#FF520D] hover:shadow-sm transition-all flex items-start gap-3 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF520D]"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFF4EE] text-[#FF520D] flex items-center justify-center shrink-0">
                <Download className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#101828]">
                    Cài đặt phần mềm
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#FF520D] opacity-60 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-xs text-[#475467] mt-1 leading-relaxed">
                  Chọn đúng bộ cài Windows, macOS, Linux và xử lý lỗi thiếu DLL hoặc không mở được ứng dụng.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() =>
                onSelectAction?.(
                  "Văn bản bị lỗi font .VnTime ô vuông hoặc lỗi gõ tiếng Việt thì kiểm tra thế nào?"
                )
              }
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#FF520D] hover:shadow-sm transition-all flex items-start gap-3 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF520D]"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFF4EE] text-[#FF520D] flex items-center justify-center shrink-0">
                <Type className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#101828]">
                    Font và tiếng Việt
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#FF520D] opacity-60 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-xs text-[#475467] mt-1 leading-relaxed">
                  Xử lý lỗi font TCVN3/VNI, xung đột bộ gõ Unikey, lệch bảng và canh lề chuẩn Nghị định 30.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() =>
                onSelectAction?.(
                  "Hướng dẫn đăng nhập tài khoản, dùng thử 7 ngày và nhập key/tem cào Mercy"
                )
              }
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#FF520D] hover:shadow-sm transition-all flex items-start gap-3 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF520D]"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFF4EE] text-[#FF520D] flex items-center justify-center shrink-0">
                <Key className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#101828]">
                    Tài khoản/Key Mercy
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#FF520D] opacity-60 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-xs text-[#475467] mt-1 leading-relaxed">
                  Hướng dẫn dùng thử 7 ngày, nhập mã kích hoạt, cài lại Windows và tra cứu theo phiên đăng nhập.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                if (onTriggerAttachImage) {
                  onTriggerAttachImage();
                } else {
                  onSelectAction?.("Em muốn gửi ảnh chụp màn hình lỗi để kiểm tra");
                }
              }}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#FF520D] hover:shadow-sm transition-all flex items-start gap-3 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF520D]"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFF4EE] text-[#FF520D] flex items-center justify-center shrink-0">
                <ImagePlus className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#101828]">
                    Gửi ảnh cần hỗ trợ
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#FF520D] opacity-60 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-xs text-[#475467] mt-1 leading-relaxed">
                  Đính kèm hoặc dán (Ctrl+V) tối đa 3 ảnh lỗi, so sánh Trước/Sau hoặc mẫu bố cục mong muốn.
                </p>
              </div>
            </button>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-[11px] text-[#475467]">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF520D]" />
              <span>Không cần cung cấp mật khẩu, OTP hoặc mã kích hoạt đầy đủ</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  const stageText =
    STAGE_LABELS[stage] || "Đang tìm hướng dẫn phù hợp và chuẩn bị câu trả lời...";

  return (
    <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#F9FAFB]">
      <div className="max-w-4xl mx-auto space-y-4">
        {messages.map((msg) => (
          <MessageItem
            key={msg.id}
            message={msg}
            onSelectAction={onSelectAction}
            onOutcomeAction={onOutcomeAction}
            onFeedback={onFeedback}
          />
        ))}

        {isLoading && (
          <div
            role="status"
            aria-live="polite"
            className="flex gap-2.5 items-center justify-start w-full animate-in fade-in duration-150"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FFF4EE] border border-[#FF520D]/30 flex items-center justify-center text-[#FF520D] shrink-0">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <div className="rounded-2xl rounded-tl-xs px-4 py-2.5 bg-white border border-slate-200 text-[#101828] text-xs font-medium shadow-2xs">
              {stageText}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
