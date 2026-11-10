"use client";

import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Sparkles,
  CheckCircle2,
  EyeOff,
  FileCheck,
  Shield,
} from "lucide-react";
import type { AiFaq, FaqCategory, FaqArticleStatus } from "../types";

type FaqManagementTabProps = {
  faqs: AiFaq[];
  onSaveFaq: (faq: AiFaq) => void;
  onDeleteFaq: (id: string) => void;
};

const CATEGORY_MAP: Record<FaqCategory, { label: string; color: string }> = {
  cai_dat: {
    label: "Cài đặt & Cập nhật",
    color: "bg-amber-100 text-amber-800 border-amber-300",
  },
  ban_quyen: {
    label: "Tài khoản, Key & Demo 7 ngày",
    color: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  tien_ich: {
    label: "Font, Bảng tính & Plugin",
    color: "bg-sky-100 text-sky-800 border-sky-300",
  },
  sua_loi: {
    label: "Chẩn đoán & Sửa lỗi",
    color: "bg-purple-100 text-purple-800 border-purple-300",
  },
};

const STATUS_MAP: Record<FaqArticleStatus, { label: string; color: string }> = {
  published: {
    label: "Đã duyệt (Published)",
    color: "bg-emerald-50 text-emerald-700 border-emerald-300",
  },
  review: {
    label: "Chờ duyệt (Review)",
    color: "bg-amber-50 text-amber-700 border-amber-300",
  },
  draft: {
    label: "Bản nháp (Draft)",
    color: "bg-slate-100 text-slate-700 border-slate-300",
  },
  withdrawn: {
    label: "Đã thu hồi (Withdrawn)",
    color: "bg-rose-50 text-rose-700 border-rose-300",
  },
};

const AUDIENCE_LABELS: Record<NonNullable<AiFaq["audience"]>, string> = {
  public: "Công khai",
  authenticated: "Khách đã đăng nhập",
  dealer: "Chỉ Đại lý xác thực",
  technician: "Nội bộ Kỹ thuật viên",
};

export function FaqManagementTab({
  faqs,
  onSaveFaq,
  onDeleteFaq,
}: FaqManagementTabProps) {
  const [editingFaq, setEditingFaq] = useState<AiFaq | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenAdd = () => {
    setEditingFaq({
      id: "",
      question: "",
      answer: "",
      category: "cai_dat",
      status: "published",
      audience: "public",
      product: "desktop_editors",
      os: "all",
      version: "1.0",
      isCommercialPolicy: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq: AiFaq) => {
    setEditingFaq({
      status: "published",
      audience: "public",
      product: "desktop_editors",
      os: "all",
      version: "1.0",
      isCommercialPolicy: false,
      ...faq,
    });
    setIsModalOpen(true);
  };

  const handleQuickToggleWithdraw = (faq: AiFaq) => {
    const nextStatus: FaqArticleStatus =
      faq.status === "withdrawn" ? "published" : "withdrawn";
    onSaveFaq({
      ...faq,
      status: nextStatus,
      updatedAt: Date.now(),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq || !editingFaq.question.trim() || !editingFaq.answer.trim()) {
      return;
    }
    onSaveFaq({
      ...editingFaq,
      updatedAt: Date.now(),
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/80 p-4 rounded-2xl border border-earth-brown/15">
        <div>
          <h3 className="text-sm font-black text-deep-brown">
            Kho Tri Thức Đã Duyệt & Quy Trình Xuất Bản (KB)
          </h3>
          <p className="text-xs text-earth-brown/70 mt-0.5">
            Chỉ bài viết ở trạng thái <strong>Published</strong> mới được AI truy xuất và trích dẫn nguồn. Thu hồi (Withdrawn) sẽ ngừng hiệu lực ngay lập tức.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold hover:bg-gold-light text-deep-brown font-black text-xs shadow-sm transition-all cursor-pointer active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Soạn Bài Hướng Dẫn Mới</span>
        </button>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {faqs.map((faq) => {
          const cat = CATEGORY_MAP[faq.category] || CATEGORY_MAP.cai_dat;
          const stKey: FaqArticleStatus = faq.status || "published";
          const st = STATUS_MAP[stKey];
          const aud = AUDIENCE_LABELS[faq.audience || "public"];

          return (
            <div
              key={faq.id}
              className={`p-4 rounded-2xl bg-white border shadow-2xs transition-all flex flex-col justify-between ${
                stKey === "withdrawn"
                  ? "border-rose-200 opacity-75"
                  : "border-earth-brown/15 hover:border-gold/50"
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${cat.color}`}
                    >
                      {cat.label}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${st.color}`}
                    >
                      {st.label}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
                      <Shield className="w-2.5 h-2.5" />
                      <span>{aud}</span>
                    </span>
                    {faq.isCommercialPolicy && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-700 border border-orange-200">
                        Chính sách thương mại
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleQuickToggleWithdraw(faq)}
                      className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        stKey === "withdrawn"
                          ? "hover:bg-emerald-50 text-emerald-700"
                          : "hover:bg-amber-50 text-amber-700"
                      }`}
                      title={
                        stKey === "withdrawn"
                          ? "Duyệt xuất bản lại"
                          : "Thu hồi bài viết khỏi AI ngay lập tức"
                      }
                    >
                      {stKey === "withdrawn" ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(faq)}
                      className="p-1.5 rounded-lg hover:bg-earth-brown/10 text-earth-brown/60 hover:text-deep-brown transition-colors cursor-pointer"
                      title="Sửa bài hướng dẫn"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteFaq(faq.id)}
                      className="p-1.5 rounded-lg hover:bg-rose-50 text-earth-brown/40 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Xóa bài hướng dẫn"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="text-xs font-black text-deep-brown leading-snug">
                  {faq.question}
                </h4>

                <p className="text-xs text-earth-brown/85 leading-relaxed bg-earth-brown/5 p-2.5 rounded-xl border border-earth-brown/10 whitespace-pre-line">
                  {faq.answer}
                </p>

                <div className="flex items-center justify-between text-[10px] text-earth-brown/60 pt-1">
                  <span>
                    Sản phẩm: <strong>{faq.product || "all"}</strong> · OS:{" "}
                    <strong>{faq.os || "all"}</strong>
                  </span>
                  {faq.version && <span>v{faq.version}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-5 sm:p-6 w-full max-w-xl border border-earth-brown/15 shadow-xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-earth-brown/10 mb-4">
              <h4 className="text-base font-black text-deep-brown flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-dark" />
                <span>
                  {editingFaq.id ? "Cập Nhật Bài Hướng Dẫn KB" : "Thêm Bài Hướng Dẫn KB Mới"}
                </span>
              </h4>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-earth-brown/50 hover:text-deep-brown hover:bg-earth-brown/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-deep-brown mb-1">
                    Chủ đề kỹ thuật
                  </label>
                  <select
                    value={editingFaq.category}
                    onChange={(e) =>
                      setEditingFaq({
                        ...editingFaq,
                        category: e.target.value as FaqCategory,
                      })
                    }
                    className="w-full text-xs p-2.5 rounded-xl bg-earth-brown/5 border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold"
                  >
                    <option value="cai_dat">Cài đặt & Cập nhật</option>
                    <option value="ban_quyen">Tài khoản, Key & Demo 7 ngày</option>
                    <option value="tien_ich">Font, Bảng tính & Plugin</option>
                    <option value="sua_loi">Chẩn đoán & Sửa lỗi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-deep-brown mb-1">
                    Trạng thái xuất bản
                  </label>
                  <select
                    value={editingFaq.status || "published"}
                    onChange={(e) =>
                      setEditingFaq({
                        ...editingFaq,
                        status: e.target.value as FaqArticleStatus,
                      })
                    }
                    className="w-full text-xs p-2.5 rounded-xl bg-earth-brown/5 border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold font-bold"
                  >
                    <option value="published">Đã duyệt (Published)</option>
                    <option value="review">Chờ duyệt (Review)</option>
                    <option value="draft">Bản nháp (Draft)</option>
                    <option value="withdrawn">Thu hồi (Withdrawn)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-black text-deep-brown mb-1">
                    Đối tượng được xem
                  </label>
                  <select
                    value={editingFaq.audience || "public"}
                    onChange={(e) =>
                      setEditingFaq({
                        ...editingFaq,
                        audience: e.target.value as AiFaq["audience"],
                      })
                    }
                    className="w-full text-xs p-2.5 rounded-xl bg-earth-brown/5 border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold"
                  >
                    <option value="public">Công khai</option>
                    <option value="authenticated">Đã đăng nhập</option>
                    <option value="dealer">Chỉ Đại lý</option>
                    <option value="technician">Chỉ Kỹ thuật viên</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-deep-brown mb-1">
                    Sản phẩm áp dụng
                  </label>
                  <select
                    value={editingFaq.product || "desktop_editors"}
                    onChange={(e) =>
                      setEditingFaq({ ...editingFaq, product: e.target.value })
                    }
                    className="w-full text-xs p-2.5 rounded-xl bg-earth-brown/5 border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold"
                  >
                    <option value="desktop_editors">desktop_editors</option>
                    <option value="mercy_installer">mercy_installer</option>
                    <option value="mercy_keys">mercy_keys</option>
                    <option value="mercy_check">mercy_check</option>
                    <option value="docs">docs</option>
                    <option value="docspace">docspace</option>
                    <option value="all">Tất cả sản phẩm</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-deep-brown mb-1">
                    Hệ điều hành
                  </label>
                  <select
                    value={editingFaq.os || "all"}
                    onChange={(e) =>
                      setEditingFaq({ ...editingFaq, os: e.target.value })
                    }
                    className="w-full text-xs p-2.5 rounded-xl bg-earth-brown/5 border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold"
                  >
                    <option value="all">Mọi OS</option>
                    <option value="windows">Windows</option>
                    <option value="macos">macOS</option>
                    <option value="linux">Linux</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-deep-brown mb-1">
                  Tiêu đề / Câu hỏi
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Xử lý lỗi font .VnTime trên Windows & macOS"
                  value={editingFaq.question}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, question: e.target.value })
                  }
                  className="w-full text-xs p-2.5 rounded-xl bg-earth-brown/5 border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-deep-brown mb-1">
                  Nội dung hướng dẫn đã kiểm chứng (Không dùng khẳng định tuyệt đối)
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Nhập các bước an toàn và kết quả cần quan sát..."
                  value={editingFaq.answer}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, answer: e.target.value })
                  }
                  className="w-full text-xs p-2.5 rounded-xl bg-earth-brown/5 border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold leading-relaxed"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-deep-brown cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(editingFaq.isCommercialPolicy)}
                  onChange={(e) =>
                    setEditingFaq({
                      ...editingFaq,
                      isCommercialPolicy: e.target.checked,
                    })
                  }
                  className="rounded border-earth-brown/30"
                />
                <span className="flex items-center gap-1 font-semibold">
                  <FileCheck className="w-3.5 h-3.5 text-gold-dark" />
                  <span>
                    Đây là tài liệu giá/chính sách thương mại (chỉ trích xuất khi Quản trị viên đã bật duyệt chính sách giá)
                  </span>
                </span>
              </label>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-earth-brown/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-earth-brown/20 text-deep-brown hover:bg-earth-brown/10 transition-colors"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gold hover:bg-gold-light text-deep-brown font-black text-xs shadow-sm transition-all cursor-pointer"
                >
                  Lưu Bài Hướng Dẫn
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
