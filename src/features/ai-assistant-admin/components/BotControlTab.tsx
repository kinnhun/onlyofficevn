"use client";

import React, { useState, useEffect } from "react";
import {
  Power,
  Phone,
  ShieldCheck,
  Check,
  Eye,
  Cpu,
  Clock,
  DollarSign,
  KeyRound,
  Activity,
  AlertTriangle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import type { AiBotSettings, BotOperatingMode } from "../types";

type BotControlTabProps = {
  settings: AiBotSettings;
  onSaveSettings: (
    settings: Partial<AiBotSettings> & {
      newRouterApiKey?: string;
      clearRouterApiKey?: boolean;
    }
  ) => void;
};

type RouterTestResult = {
  ok: boolean;
  status: number;
  latencyMs: number;
  baseUrl: string;
  modelTested: string;
  keySource: string;
  availableModels: string[];
  sampleReply?: string;
  errorDetail?: string;
};

export function BotControlTab({ settings, onSaveSettings }: BotControlTabProps) {
  const [formData, setFormData] = useState<AiBotSettings>(settings);
  const [draftApiKey, setDraftApiKey] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testingRouter, setTestingRouter] = useState(false);
  const [testResult, setTestResult] = useState<RouterTestResult | null>(null);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Partial<AiBotSettings> & { newRouterApiKey?: string } = {
      ...formData,
    };
    if (draftApiKey.trim()) {
      payload.newRouterApiKey = draftApiKey.trim();
    }
    onSaveSettings(payload);
    setDraftApiKey("");
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleTestRouter = async () => {
    setTestingRouter(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/admin/ai-assistant/test-router", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseUrl: formData.routerBaseUrl,
          apiKey: draftApiKey.trim() || undefined,
          model: formData.modelTextRoute,
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setTestResult(json.data as RouterTestResult);
      } else {
        setTestResult({
          ok: false,
          status: 500,
          latencyMs: 0,
          baseUrl: formData.routerBaseUrl || "",
          modelTested: formData.modelTextRoute || "test",
          keySource: "unknown",
          availableModels: [],
          errorDetail: json.error || "Không thể kiểm tra kết nối máy chủ AI.",
        });
      }
    } catch {
      setTestResult({
        ok: false,
        status: 503,
        latencyMs: 0,
        baseUrl: formData.routerBaseUrl || "",
        modelTested: formData.modelTextRoute || "test",
        keySource: "unknown",
        availableModels: [],
        errorDetail: "Lỗi mạng khi gọi API kiểm tra kết nối.",
      });
    } finally {
      setTestingRouter(false);
    }
  };

  const hasConfiguredKey = Boolean(
    formData.hasRouterApiKey || draftApiKey.trim().length > 0
  );

  return (
    <div className="max-w-3xl bg-white p-6 rounded-3xl border border-earth-brown/15 shadow-sm space-y-6">
      <div className="pb-4 border-b border-earth-brown/10">
        <h3 className="text-base font-black text-deep-brown flex items-center gap-2">
          <Power className="w-5 h-5 text-gold-dark" />
          <span>Điều Khiển Mô Hình, Vision, Ngân Sách & Vận Hành</span>
        </h3>
        <p className="text-xs text-earth-brown/70 mt-0.5">
          Khóa API AI Router được mã hóa AES-256 trên máy chủ, không bao giờ gửi xuống trình duyệt của khách hàng.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Online Master Switch & Operating Mode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-earth-brown/5 border border-earth-brown/10 flex items-center justify-between">
            <div>
              <div className="text-xs font-black text-deep-brown flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    formData.isOnline ? "bg-emerald-500" : "bg-rose-500"
                  }`}
                />
                <span>Trạng Thái Bot Website</span>
              </div>
              <p className="text-[11px] text-earth-brown/70 mt-0.5">
                {formData.isOnline ? "Đang phục vụ khách hàng" : "Tạm ngưng nhận chat"}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, isOnline: !formData.isOnline })
              }
              className={`px-3.5 py-2 rounded-xl text-xs font-black shadow-2xs transition-all cursor-pointer ${
                formData.isOnline
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-rose-600 hover:bg-rose-700 text-white"
              }`}
            >
              {formData.isOnline ? "ĐANG BẬT" : "ĐANG TẮT"}
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-earth-brown/5 border border-earth-brown/10 space-y-1.5">
            <label className="block text-xs font-black text-deep-brown">
              Chế độ vận hành (Operating Mode):
            </label>
            <select
              value={formData.operatingMode || "ai_full"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  operatingMode: e.target.value as BotOperatingMode,
                })
              }
              className="w-full text-xs p-2 rounded-xl bg-white border border-earth-brown/20 text-deep-brown font-bold focus:outline-none focus:border-gold"
            >
              <option value="ai_full">AI đầy đủ (Text + Vision)</option>
              <option value="text_only">Chỉ hỏi đáp chữ (Tắt đọc ảnh)</option>
              <option value="faq_only">Chỉ tra cứu KB chuẩn (Không gọi LLM)</option>
              <option value="maintenance">Bảo trì hệ thống</option>
            </select>
          </div>
        </div>

        {/* Vision & Commercial Policy Gates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="p-3.5 rounded-2xl bg-earth-brown/5 border border-earth-brown/10 flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.visionEnabled !== false}
              onChange={(e) =>
                setFormData({ ...formData, visionEnabled: e.target.checked })
              }
              className="mt-0.5 rounded border-earth-brown/30"
            />
            <div className="text-xs">
              <div className="font-black text-deep-brown flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-gold-dark" />
                <span>Cho phép AI đọc ảnh màn hình (Vision)</span>
              </div>
              <p className="text-[11px] text-earth-brown/70 mt-0.5">
                Khi tắt, hệ thống vẫn lưu ảnh riêng tư cho kỹ thuật viên nhưng thành thật báo chưa đọc được ảnh tự động.
              </p>
            </div>
          </label>

          <label className="p-3.5 rounded-2xl bg-earth-brown/5 border border-earth-brown/10 flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(formData.commercialPolicyApproved)}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  commercialPolicyApproved: e.target.checked,
                })
              }
              className="mt-0.5 rounded border-earth-brown/30"
            />
            <div className="text-xs">
              <div className="font-black text-deep-brown flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-gold-dark" />
                <span>Duyệt chính sách giá thương mại trong KB</span>
              </div>
              <p className="text-[11px] text-earth-brown/70 mt-0.5">
                Khi chưa bật, AI không tự báo con số giá mà hướng dẫn liên hệ tư vấn viên Mercy Tech.
              </p>
            </div>
          </label>
        </div>

        {/* 9Router Credentials, Model Routes & Live Connection Test */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs font-black text-deep-brown flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-gold-dark" />
              <span>Kết Nối Máy Chủ AI Router (9Router) & Tuyến Model</span>
            </div>

            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                hasConfiguredKey
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-800 border-amber-200"
              }`}
            >
              {hasConfiguredKey ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    Đã cấu hình API Key ({formData.routerApiKeyMasked || "Mới nhập"})
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Chưa có API Key thật (đang chạy chế độ KB dự phòng)</span>
                </>
              )}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-earth-brown/80 mb-1">
                AI Router Base URL:
              </label>
              <input
                type="text"
                placeholder="https://api.your-router.com/v1"
                value={formData.routerBaseUrl || ""}
                onChange={(e) =>
                  setFormData({ ...formData, routerBaseUrl: e.target.value })
                }
                className="w-full text-xs font-mono p-2 rounded-xl bg-white border border-slate-200 text-deep-brown"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-earth-brown/80 mb-1 flex items-center gap-1">
                <KeyRound className="w-3 h-3 text-gold-dark" />
                <span>
                  9Router API Key{" "}
                  {formData.hasRouterApiKey
                    ? `(đã lưu: ${formData.routerApiKeyMasked})`
                    : "(bắt buộc để AI thật trả lời)"}
                  :
                </span>
              </label>
              <input
                type="password"
                autoComplete="new-password"
                placeholder={
                  formData.hasRouterApiKey
                    ? "Để trống nếu giữ nguyên key cũ, hoặc dán key mới..."
                    : "Dán API Key thật lấy từ trang quản trị 9Router..."
                }
                value={draftApiKey}
                onChange={(e) => setDraftApiKey(e.target.value)}
                className="w-full text-xs font-mono p-2 rounded-xl bg-white border border-slate-200 text-deep-brown"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-earth-brown/80 mb-1">
                Route hỏi đáp chữ (Text Model):
              </label>
              <input
                type="text"
                value={formData.modelTextRoute || "test"}
                onChange={(e) =>
                  setFormData({ ...formData, modelTextRoute: e.target.value })
                }
                className="w-full text-xs font-mono p-2 rounded-xl bg-white border border-slate-200 text-deep-brown"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-earth-brown/80 mb-1">
                Route đọc ảnh (Vision Model):
              </label>
              <input
                type="text"
                value={formData.modelVisionRoute || "test"}
                onChange={(e) =>
                  setFormData({ ...formData, modelVisionRoute: e.target.value })
                }
                className="w-full text-xs font-mono p-2 rounded-xl bg-white border border-slate-200 text-deep-brown"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-earth-brown/80 mb-1">
                Timeout Router (ms):
              </label>
              <input
                type="number"
                min={2000}
                max={45000}
                value={formData.routerTimeoutMs || 10000}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    routerTimeoutMs: Number(e.target.value) || 10000,
                  })
                }
                className="w-full text-xs font-mono p-2 rounded-xl bg-white border border-slate-200 text-deep-brown"
              />
            </div>
          </div>

          {/* Live Test Button & Diagnostic Output */}
          <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleTestRouter}
              disabled={testingRouter}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-deep-brown hover:bg-earth-brown text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-60"
            >
              {testingRouter ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Activity className="w-3.5 h-3.5" />
              )}
              <span>
                {testingRouter
                  ? "Đang kiểm tra 9Router..."
                  : "Kiểm tra kết nối AI thật & Lấy danh sách Model"}
              </span>
            </button>

            <span className="text-[11px] text-slate-500">
              Sau khi dán API Key mới, nhớ bấm <strong>Lưu Cấu Hình</strong> ở cuối trang.
            </span>
          </div>

          {testResult && (
            <div
              className={`p-3 rounded-xl border text-xs space-y-2 ${
                testResult.ok
                  ? "bg-emerald-50/90 border-emerald-200 text-emerald-900"
                  : "bg-rose-50/90 border-rose-200 text-rose-900"
              }`}
            >
              <div className="font-black flex items-center justify-between">
                <span>
                  {testResult.ok
                    ? `✅ Kết nối AI thật thành công! (Model: ${testResult.modelTested} · ${testResult.latencyMs}ms)`
                    : `❌ Chưa gọi được AI thật (HTTP ${testResult.status})`}
                </span>
              </div>

              {testResult.sampleReply && (
                <div className="p-2 rounded-lg bg-white/80 border border-emerald-200/70 text-[#101828]">
                  <strong>Phản hồi thử từ AI:</strong> {testResult.sampleReply}
                </div>
              )}

              {testResult.errorDetail && (
                <div className="leading-relaxed">{testResult.errorDetail}</div>
              )}

              {testResult.availableModels.length > 0 && (
                <div className="space-y-1">
                  <div className="font-bold text-[11px]">
                    Danh sách Model/Combo tìm thấy trên 9Router (bấm để chọn làm Route):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {testResult.availableModels.slice(0, 20).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            modelTextRoute: m,
                            modelVisionRoute: m,
                          })
                        }
                        className="px-2 py-0.5 rounded-md bg-white border border-slate-300 hover:border-gold text-[#101828] font-mono text-[11px] cursor-pointer"
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-slate-200/70">
            <div>
              <label className="block text-[11px] font-bold text-earth-brown/80 mb-1">
                Lưu ảnh tối đa (ngày):
              </label>
              <input
                type="number"
                min={1}
                max={30}
                value={formData.imageRetentionDays || 7}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    imageRetentionDays: Number(e.target.value) || 7,
                  })
                }
                className="w-full text-xs font-mono p-2 rounded-xl bg-white border border-slate-200 text-deep-brown"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-earth-brown/80 mb-1">
                Giới hạn lượt/giờ/phiên:
              </label>
              <input
                type="number"
                min={5}
                max={200}
                value={formData.maxTurnsPerHour || 30}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxTurnsPerHour: Number(e.target.value) || 30,
                  })
                }
                className="w-full text-xs font-mono p-2 rounded-xl bg-white border border-slate-200 text-deep-brown"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-earth-brown/80 mb-1">
                Ngân sách trần/phiên (USD):
              </label>
              <input
                type="number"
                step="0.05"
                min={0.05}
                max={10}
                value={formData.maxSessionBudgetUsd || 0.5}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxSessionBudgetUsd: Number(e.target.value) || 0.5,
                  })
                }
                className="w-full text-xs font-mono p-2 rounded-xl bg-white border border-slate-200 text-deep-brown"
              />
            </div>
          </div>
        </div>

        {/* Support Hours & Offline Notice */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black text-deep-brown mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold-dark" />
              <span>Khung giờ kỹ thuật viên trực tiếp:</span>
            </label>
            <input
              type="text"
              value={formData.supportHours || "08:00 – 17:30 (Thứ 2 – Thứ 7)"}
              onChange={(e) =>
                setFormData({ ...formData, supportHours: e.target.value })
              }
              className="w-full text-xs p-2.5 rounded-xl bg-earth-brown/5 border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-deep-brown mb-1.5">
              Thông báo khi tạm bảo trì bot:
            </label>
            <input
              type="text"
              value={formData.offlineNotice}
              onChange={(e) =>
                setFormData({ ...formData, offlineNotice: e.target.value })
              }
              className="w-full text-xs p-2.5 rounded-xl bg-earth-brown/5 border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        {/* Hotlines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black text-deep-brown mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gold-dark" />
              <span>Số Zalo CSKH chính thức (Mercy Tech Global):</span>
            </label>
            <input
              type="text"
              value={formData.hotlineZalo}
              onChange={(e) =>
                setFormData({ ...formData, hotlineZalo: e.target.value })
              }
              className="w-full text-xs font-mono font-bold p-2.5 rounded-xl bg-earth-brown/5 border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-deep-brown mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
              <span>Hotline Kỹ thuật viên:</span>
            </label>
            <input
              type="text"
              value={formData.hotlineTech}
              onChange={(e) =>
                setFormData({ ...formData, hotlineTech: e.target.value })
              }
              className="w-full text-xs font-mono font-bold p-2.5 rounded-xl bg-earth-brown/5 border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-earth-brown/10">
          {savedSuccess ? (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>Đã lưu cấu hình thành công!</span>
            </span>
          ) : (
            <span className="text-[11px] text-earth-brown/60">
              Cấu hình có hiệu lực ngay lập tức cho các lượt hỏi tiếp theo.
            </span>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-deep-brown font-black text-xs shadow-sm transition-all cursor-pointer active:scale-95"
          >
            Lưu Cấu Hình
          </button>
        </div>
      </form>
    </div>
  );
}
