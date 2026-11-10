"use client";

import React, { useState, useMemo } from "react";
import { message } from "antd";
import { TicketItemRow } from "./TicketItemRow";
import {
  Search,
  Filter,
  RefreshCw,
  Plus,
  Download,
  X,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Calendar,
  UserCheck,
  Tag,
  ArrowUpDown,
  ShieldAlert,
} from "lucide-react";
import type { AiTicket, TicketStatus, IssueCategory, AssignedTech } from "../types";

type TicketListTableProps = {
  tickets: AiTicket[];
  isLoading: boolean;
  onRefresh: () => void;
  onUpdateStatus: (id: string, status: TicketStatus) => void;
  onDelete: (id: string) => void;
  onOpenDetail: (ticket: AiTicket) => void;
  onOpenCreate?: () => void;
};

type TimeFilter = "all" | "today" | "3days" | "7days" | "month";
type PriorityFilter = "all" | "urgent_data_risk" | "normal";
type SortOption = "newest" | "urgent_first" | "pending_first" | "oldest";

const CATEGORY_NAMES: Record<IssueCategory, string> = {
  cai_dat: "📦 Cài đặt All-in-One",
  font_chu: "🔤 Sửa lỗi font .VnTime",
  ban_quyen: "🔑 Kích hoạt Demo 7 ngày / Mộc A4",
  unikey: "⌨️ Lỗi gõ Unikey",
  dll: "🛡️ Thiếu file DLL",
  khac: "❓ Hỗ trợ kỹ thuật khác",
};

export function TicketListTable({
  tickets,
  isLoading,
  onRefresh,
  onUpdateStatus,
  onDelete,
  onOpenDetail,
  onOpenCreate,
}: TicketListTableProps) {
  // ─── Filter & Search States ───
  const [filterTab, setFilterTab] = useState<"all" | TicketStatus>("all");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | IssueCategory>("all");
  const [techFilter, setTechFilter] = useState<"all" | AssignedTech>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  // ─── Pagination States ───
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // ─── Reset Page on Filter Change ───
  const handleFilterChange = (setter: () => void) => {
    setter();
    setCurrentPage(1);
  };

  // ─── Filtering & Sorting Logic ───
  const filteredTickets = useMemo(() => {
    const now = Date.now();
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const todayMs = startOfToday.getTime();

    const result = tickets.filter((t) => {
      // 1. Status Filter
      if (filterTab !== "all" && t.status !== filterTab) return false;

      // 2. Priority Filter
      if (priorityFilter === "urgent_data_risk" && t.priority !== "urgent_data_risk") return false;
      if (priorityFilter === "normal" && t.priority === "urgent_data_risk") return false;

      // 3. Category Filter
      if (categoryFilter !== "all" && t.issueCategory !== categoryFilter) return false;

      // 4. Assigned Tech Filter
      if (techFilter !== "all") {
        const assigned = t.assignedTech || "chua_nhan";
        if (assigned !== techFilter) return false;
      }

      // 5. Time Range Filter
      if (timeFilter === "today" && t.createdAt < todayMs) return false;
      if (timeFilter === "3days" && t.createdAt < now - 3 * 86400000) return false;
      if (timeFilter === "7days" && t.createdAt < now - 7 * 86400000) return false;
      if (timeFilter === "month" && t.createdAt < now - 30 * 86400000) return false;

      // 6. Search text across all critical fields (case-insensitive & whitespace-normalized)
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const qClean = q.replace(/[\s.-]/g, "");
        const matchName = t.customerName.toLowerCase().includes(q);
        const phoneClean = t.phoneOrZalo.toLowerCase().replace(/[\s.-]/g, "");
        const matchPhone = phoneClean.includes(qClean) || t.phoneOrZalo.toLowerCase().includes(q);
        const matchUltra = t.ultraViewerId?.toLowerCase().replace(/\s+/g, "").includes(qClean) || false;
        const matchPass = t.ultraViewerPass?.toLowerCase().includes(q) || false;
        const matchDesc = t.issueDescription.toLowerCase().includes(q);
        const matchNotes = t.notes?.toLowerCase().includes(q) || false;
        const matchSnippet = t.conversationSnippet?.toLowerCase().includes(q) || false;
        const matchId = t.id.toLowerCase().includes(q);

        if (
          !matchName &&
          !matchPhone &&
          !matchUltra &&
          !matchPass &&
          !matchDesc &&
          !matchNotes &&
          !matchSnippet &&
          !matchId
        ) {
          return false;
        }
      }

      return true;
    });

    // 7. Sorting
    return result.sort((a, b) => {
      if (sortBy === "urgent_first") {
        const isUrgentA = a.priority === "urgent_data_risk" ? 1 : 0;
        const isUrgentB = b.priority === "urgent_data_risk" ? 1 : 0;
        if (isUrgentB !== isUrgentA) return isUrgentB - isUrgentA;
        return b.createdAt - a.createdAt;
      }

      if (sortBy === "pending_first") {
        const score = (status: TicketStatus) =>
          status === "pending" ? 3 : status === "in_progress" ? 2 : 1;
        const scoreDiff = score(b.status) - score(a.status);
        if (scoreDiff !== 0) return scoreDiff;
        return b.createdAt - a.createdAt;
      }

      if (sortBy === "oldest") {
        return a.createdAt - b.createdAt;
      }

      return b.createdAt - a.createdAt; // "newest" default
    });
  }, [tickets, filterTab, priorityFilter, categoryFilter, techFilter, timeFilter, search, sortBy]);

  // ─── Pagination Calculations ───
  const totalFiltered = filteredTickets.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalFiltered);
  const paginatedTickets = filteredTickets.slice(startIndex, endIndex);

  // ─── Active Filter Check ───
  const hasActiveFilters =
    search.trim() !== "" ||
    filterTab !== "all" ||
    priorityFilter !== "all" ||
    categoryFilter !== "all" ||
    techFilter !== "all" ||
    timeFilter !== "all" ||
    sortBy !== "newest";

  const handleResetFilters = () => {
    setFilterTab("all");
    setSearch("");
    setPriorityFilter("all");
    setCategoryFilter("all");
    setTechFilter("all");
    setTimeFilter("all");
    setSortBy("newest");
    setCurrentPage(1);
  };

  // ─── Export CSV with UTF-8 BOM ───
  const handleExportCsv = () => {
    if (filteredTickets.length === 0) {
      message.warning("Không có phiếu nào để xuất dữ liệu.");
      return;
    }

    const headers = [
      "Mã Phiếu",
      "Khách Hàng",
      "Số Điện Thoại / Zalo",
      "Độ Ưu Tiên",
      "Loại Sự Cố",
      "Sản Phẩm",
      "Hệ Điều Hành",
      "UltraViewer ID",
      "Mật Khẩu UltraViewer",
      "Trạng Thái",
      "Kỹ Thuật Phụ Trách",
      "Mô Tả Sự Cố",
      "Ghi Chú Nội Bộ",
      "Thời Gian Tạo",
      "Thời Gian Hoàn Tất",
    ];

    const rows = filteredTickets.map((t) => {
      const priorityLabel =
        t.priority === "urgent_data_risk"
          ? "🚨 Khẩn cấp - Nguy cơ mất file"
          : t.priority === "high"
          ? "Ưu tiên cao"
          : "Bình thường";

      const statusLabel =
        t.status === "pending"
          ? "Chờ gọi ngay"
          : t.status === "in_progress"
          ? "Đang hỗ trợ"
          : "Đã hoàn tất";

      const techLabel =
        t.assignedTech === "kien_it"
          ? "Kiên IT"
          : t.assignedTech === "cskh_mercy"
          ? "Bích Phương CSKH"
          : "Chưa nhận";

      const catLabel = t.issueCategory ? CATEGORY_NAMES[t.issueCategory] || t.issueCategory : "Khác";

      const createdDateStr = new Date(t.createdAt).toLocaleString("vi-VN");
      const resolvedDateStr = t.resolvedAt ? new Date(t.resolvedAt).toLocaleString("vi-VN") : "";

      const escapeCell = (val: string) => `"${val.replace(/"/g, '""')}"`;

      return [
        escapeCell(t.id),
        escapeCell(t.customerName),
        escapeCell(t.phoneOrZalo),
        escapeCell(priorityLabel),
        escapeCell(catLabel),
        escapeCell(t.product || t.softwareEdition || "desktop_editors"),
        escapeCell(t.os || "windows"),
        escapeCell(t.ultraViewerId || ""),
        escapeCell(t.ultraViewerPass || ""),
        escapeCell(statusLabel),
        escapeCell(techLabel),
        escapeCell(t.issueDescription || ""),
        escapeCell(t.notes || ""),
        escapeCell(createdDateStr),
        escapeCell(resolvedDateStr),
      ].join(",");
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const dateStr = new Date().toISOString().slice(0, 10);
    link.setAttribute("href", url);
    link.setAttribute("download", `Danh_sach_phieu_ho_tro_OnlyOffice_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const pendingCount = tickets.filter((t) => t.status === "pending").length;
  const urgentCount = tickets.filter(
    (t) => t.priority === "urgent_data_risk" && t.status !== "resolved"
  ).length;

  return (
    <div className="space-y-4">
      {/* ─── THANH CÔNG CỤ CHÍNH: TABS TRẠNG THÁI & HÀNH ĐỘNG ─── */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-white/85 p-3.5 rounded-3xl border border-earth-brown/15 shadow-xs">
        {/* Tabs lọc trạng thái lớn */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => handleFilterChange(() => setFilterTab("all"))}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterTab === "all"
                ? "bg-deep-brown text-white shadow-2xs"
                : "hover:bg-earth-brown/10 text-deep-brown/80"
            }`}
          >
            Tất Cả ({tickets.length})
          </button>

          <button
            onClick={() => handleFilterChange(() => setFilterTab("pending"))}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterTab === "pending"
                ? "bg-rose-600 text-white shadow-2xs"
                : "hover:bg-rose-50 text-rose-700"
            }`}
          >
            <span>🟡 Chờ Gọi Ngay</span>
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-white text-rose-700 text-[10px] font-black animate-pulse">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleFilterChange(() => setFilterTab("in_progress"))}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterTab === "in_progress"
                ? "bg-sky-600 text-white shadow-2xs"
                : "hover:bg-sky-50 text-sky-800"
            }`}
          >
            🔵 Đang Hỗ Trợ
          </button>

          <button
            onClick={() => handleFilterChange(() => setFilterTab("resolved"))}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterTab === "resolved"
                ? "bg-emerald-600 text-white shadow-2xs"
                : "hover:bg-emerald-50 text-emerald-800"
            }`}
          >
            🟢 Đã Xong
          </button>
        </div>

        {/* Nút tác vụ: Tạo phiếu, Xuất Excel, Toggle Lọc, Refresh */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {onOpenCreate && (
            <button
              onClick={onOpenCreate}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gold hover:bg-gold-light text-deep-brown text-xs font-black shadow-2xs transition-all cursor-pointer shrink-0"
              title="Ghi nhận khách gọi hotline cần hỗ trợ"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tạo Phiếu Mới</span>
            </button>
          )}

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-gold/15 border border-earth-brown/20 text-deep-brown text-xs font-bold shadow-2xs transition-all cursor-pointer shrink-0"
            title="Xuất danh sách phiếu ra file Excel CSV có dấu tiếng Việt"
          >
            <Download className="w-3.5 h-3.5 text-earth-brown" />
            <span className="hidden sm:inline">Xuất Excel</span>
          </button>

          <button
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer shrink-0 ${
              isFilterExpanded || hasActiveFilters
                ? "bg-gold/20 border-gold-dark/40 text-deep-brown"
                : "bg-white hover:bg-gold/10 border-earth-brown/20 text-deep-brown/80"
            }`}
            title="Mở rộng bộ lọc chi tiết"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Bộ Lọc</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-gold-dark animate-ping" />
            )}
          </button>

          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="p-2 rounded-xl bg-white border border-earth-brown/20 hover:bg-gold/15 text-deep-brown transition-colors cursor-pointer shrink-0"
            title="Làm mới danh sách"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-gold-dark" : ""}`} />
          </button>
        </div>
      </div>

      {/* ─── HÀNG TÌM KIẾM & BỘ LỌC CHI TIẾT ─── */}
      <div className="bg-white/90 p-4 rounded-3xl border border-earth-brown/15 shadow-xs space-y-3">
        {/* Ô Tìm Kiếm To & Sắp Xếp Nhanh */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-earth-brown/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleFilterChange(() => setSearch(e.target.value))}
              placeholder="Tìm kiếm theo Tên khách, SĐT, ID UltraViewer, nội dung, ghi chú..."
              className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-white rounded-2xl border border-earth-brown/20 text-deep-brown placeholder:text-earth-brown/50 focus:outline-none focus:border-gold shadow-2xs"
            />
            {search && (
              <button
                onClick={() => handleFilterChange(() => setSearch(""))}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-earth-brown/50 hover:text-deep-brown cursor-pointer"
                title="Xóa tìm kiếm"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sắp Xếp */}
          <div className="flex items-center gap-2 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-earth-brown/70 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => handleFilterChange(() => setSortBy(e.target.value as SortOption))}
              className="px-3 py-2 text-xs font-bold bg-white rounded-xl border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold cursor-pointer"
            >
              <option value="newest">Mới nhất trước</option>
              <option value="urgent_first">🚨 Ưu tiên rủi ro dữ liệu</option>
              <option value="pending_first">Ưu tiên chưa xử lý</option>
              <option value="oldest">Cũ nhất trước</option>
            </select>
          </div>
        </div>

        {/* Các Lựa Chọn Lọc Chi Tiết (Độ ưu tiên, Danh mục, Kỹ thuật, Thời gian) */}
        {(isFilterExpanded || hasActiveFilters) && (
          <div className="pt-3 border-t border-earth-brown/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-in fade-in duration-200">
            {/* Lọc theo mức độ ưu tiên */}
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-earth-brown mb-1">
                <ShieldAlert className="w-3 h-3 text-gold-dark" />
                <span>Mức độ ưu tiên:</span>
              </label>
              <select
                value={priorityFilter}
                onChange={(e) =>
                  handleFilterChange(() =>
                    setPriorityFilter(e.target.value as PriorityFilter)
                  )
                }
                className="w-full px-3 py-1.5 text-xs bg-white rounded-xl border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold cursor-pointer"
              >
                <option value="all">Tất cả mức độ</option>
                <option value="urgent_data_risk">🚨 Nguy cơ mất file ({urgentCount})</option>
                <option value="normal">Tiêu chuẩn / Bình thường</option>
              </select>
            </div>

            {/* Lọc theo danh mục sự cố */}
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-earth-brown mb-1">
                <Tag className="w-3 h-3 text-gold-dark" />
                <span>Loại sự cố / Yêu cầu:</span>
              </label>
              <select
                value={categoryFilter}
                onChange={(e) =>
                  handleFilterChange(() =>
                    setCategoryFilter(e.target.value as "all" | IssueCategory)
                  )
                }
                className="w-full px-3 py-1.5 text-xs bg-white rounded-xl border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold cursor-pointer"
              >
                <option value="all">Tất cả loại sự cố</option>
                <option value="cai_dat">📦 Cài đặt All-in-One</option>
                <option value="font_chu">🔤 Lỗi font .VnTime</option>
                <option value="ban_quyen">🔑 Kích hoạt Demo 7 ngày / Mộc A4</option>
                <option value="unikey">⌨️ Lỗi gõ Unikey</option>
                <option value="dll">🛡️ Thiếu file DLL</option>
                <option value="khac">❓ Hỗ trợ khác</option>
              </select>
            </div>

            {/* Lọc theo kỹ thuật viên */}
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-earth-brown mb-1">
                <UserCheck className="w-3 h-3 text-gold-dark" />
                <span>Kỹ thuật viên phụ trách:</span>
              </label>
              <select
                value={techFilter}
                onChange={(e) =>
                  handleFilterChange(() =>
                    setTechFilter(e.target.value as "all" | AssignedTech)
                  )
                }
                className="w-full px-3 py-1.5 text-xs bg-white rounded-xl border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold cursor-pointer"
              >
                <option value="all">Tất cả nhân sự</option>
                <option value="kien_it">👨‍💻 Kiên IT</option>
                <option value="cskh_mercy">👩‍💼 Bích Phương CSKH</option>
                <option value="chua_nhan">⏳ Chưa phân công</option>
              </select>
            </div>

            {/* Lọc theo thời gian */}
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-earth-brown mb-1">
                <Calendar className="w-3 h-3 text-gold-dark" />
                <span>Khoảng thời gian:</span>
              </label>
              <select
                value={timeFilter}
                onChange={(e) =>
                  handleFilterChange(() => setTimeFilter(e.target.value as TimeFilter))
                }
                className="w-full px-3 py-1.5 text-xs bg-white rounded-xl border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold cursor-pointer"
              >
                <option value="all">Tất cả thời gian</option>
                <option value="today">📅 Hôm nay</option>
                <option value="3days">3 ngày gần đây</option>
                <option value="7days">7 ngày qua</option>
                <option value="month">Trong 30 ngày</option>
              </select>
            </div>
          </div>
        )}

        {/* Thanh Tóm Tắt & Nút Đặt Lại Bộ Lọc */}
        <div className="flex items-center justify-between text-xs pt-1">
          <div className="text-earth-brown/80 font-medium">
            <span>
              Tìm thấy <strong className="text-deep-brown font-bold">{totalFiltered}</strong> phiếu
            </span>
            {hasActiveFilters && (
              <span className="text-earth-brown/60 ml-1">
                (từ tổng số {tickets.length} phiếu trong hệ thống)
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-rose-600 hover:text-rose-800 font-bold hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Xóa bộ lọc</span>
            </button>
          )}
        </div>
      </div>

      {/* ─── DANH SÁCH CÁC PHIẾU ĐÃ PHÂN TRANG ─── */}
      {paginatedTickets.length === 0 ? (
        <div className="p-12 text-center bg-white/70 rounded-3xl border border-dashed border-earth-brown/25 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-earth-brown/10 text-earth-brown/60 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-deep-brown mb-1">
              Không tìm thấy phiếu hỗ trợ nào phù hợp
            </p>
            <p className="text-xs text-earth-brown/70 max-w-md mx-auto">
              Vui lòng thử tìm với từ khóa khác hoặc bấm nút bên dưới để xem lại toàn bộ danh sách.
            </p>
          </div>
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold hover:bg-gold-light text-deep-brown text-xs font-bold shadow-2xs transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xem Lại Tất Cả Phiếu</span>
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {paginatedTickets.map((ticket) => (
            <TicketItemRow
              key={ticket.id}
              ticket={ticket}
              onUpdateStatus={onUpdateStatus}
              onDelete={onDelete}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>
      )}

      {/* ─── THANH ĐIỀU HƯỚNG PHÂN TRANG (PAGINATION CONTROLS) ─── */}
      {totalFiltered > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/85 px-4 py-3 rounded-2xl border border-earth-brown/15 shadow-xs">
          {/* Thông tin số dòng hiển thị */}
          <div className="flex items-center gap-3 text-xs text-earth-brown/80">
            <span>
              Hiển thị{" "}
              <strong className="text-deep-brown font-bold">
                {startIndex + 1} – {endIndex}
              </strong>{" "}
              trên tổng số{" "}
              <strong className="text-deep-brown font-bold">{totalFiltered}</strong> phiếu
            </span>

            {/* Chọn số dòng trên mỗi trang */}
            <div className="flex items-center gap-1.5 pl-3 border-l border-earth-brown/20">
              <span className="text-[11px] text-earth-brown/70">Mỗi trang:</span>
              <select
                aria-label="Số phiếu hiển thị mỗi trang"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 text-xs font-bold bg-white rounded-lg border border-earth-brown/20 text-deep-brown focus:outline-none focus:border-gold cursor-pointer"
              >
                <option value={5}>5 phiếu</option>
                <option value={10}>10 phiếu</option>
                <option value={20}>20 phiếu</option>
                <option value={50}>50 phiếu</option>
              </select>
            </div>
          </div>

          {/* Nút bấm chuyển trang */}
          <div className="flex items-center gap-1">
            {/* Trang đầu */}
            <button
              onClick={() => setCurrentPage(1)}
              disabled={safeCurrentPage <= 1}
              aria-label="Về trang đầu tiên"
              className="p-1.5 rounded-lg bg-white border border-earth-brown/20 text-deep-brown hover:bg-gold/15 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              title="Về trang đầu"
            >
              <ChevronsLeft className="w-3.5 h-3.5" />
            </button>

            {/* Trang trước */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage <= 1}
              aria-label="Về trang trước"
              className="p-1.5 rounded-lg bg-white border border-earth-brown/20 text-deep-brown hover:bg-gold/15 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              title="Trang trước"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Các số trang */}
            <div className="flex items-center gap-1 px-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => {
                  if (totalPages <= 7) return true;
                  if (p === 1 || p === totalPages) return true;
                  return Math.abs(p - safeCurrentPage) <= 1;
                })
                .map((p, idx, arr) => {
                  const showEllipsisBefore = idx > 0 && p - arr[idx - 1] > 1;
                  return (
                    <React.Fragment key={p}>
                      {showEllipsisBefore && (
                        <span className="px-1 text-xs text-earth-brown/50">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(p)}
                        aria-label={`Chuyển đến trang ${p}`}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          safeCurrentPage === p
                            ? "bg-gold text-deep-brown shadow-2xs font-black scale-105"
                            : "bg-white hover:bg-earth-brown/10 text-deep-brown/70 border border-earth-brown/15"
                        }`}
                      >
                        {p}
                      </button>
                    </React.Fragment>
                  );
                })}
            </div>

            {/* Trang sau */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage >= totalPages}
              aria-label="Chuyển đến trang kế tiếp"
              className="p-1.5 rounded-lg bg-white border border-earth-brown/20 text-deep-brown hover:bg-gold/15 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              title="Trang sau"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Trang cuối */}
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={safeCurrentPage >= totalPages}
              aria-label="Chuyển đến trang cuối cùng"
              className="p-1.5 rounded-lg bg-white border border-earth-brown/20 text-deep-brown hover:bg-gold/15 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              title="Đến trang cuối"
            >
              <ChevronsRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
