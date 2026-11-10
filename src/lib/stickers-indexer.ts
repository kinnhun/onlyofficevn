import type { PhysicalSticker } from "./github-db";
import { removeVietnameseTones } from "./vietnamese-tones";

export interface StickerFilterParams {
  search?: string;
  searchField?: string; // "all" | "seri" | "code" | "partner" | "phone" | "device" | "orderRef"
  status?: string; // "all" | "in_stock" | "assigned" | "activated" | "revoked"
  batchName?: string;
  partnerName?: string;
  partnerType?: string; // "all" | "dealer" | "customer"
  priceTier?: string; // "all" | "249000" | "399000" | ... | "custom"
  hasDevice?: string; // "all" | "with_device" | "without_device"
  hasReset?: string; // "all" | "yes" | "no"
  hasNotes?: string; // "all" | "yes" | "no"
  startSeri?: string;
  endSeri?: string;
  dateRange?: string; // "all" | "today" | "last7days" | "last30days" | "thisMonth"
  page?: number;
  pageSize?: number | "all";
}

export interface StickerIndexedItem {
  sticker: PhysicalSticker;
  seriNum: number | null;
  seriLower: string;
  codeLower: string;
  codeRaw: string;
  partnerLower: string;
  partnerUnaccented: string;
  phoneLower: string;
  deviceLower: string;
  deviceUnaccented: string;
  ipLower: string;
  orderLower: string;
  orderUnaccented: string;
  searchHaystack: string;
  timestamp: number;
}

// Extract numeric suffix from Seri (e.g. MT-0319227767-00042 -> 42)
export function extractSeriNum(seriStr?: string): number | null {
  if (!seriStr) return null;
  const match = seriStr.trim().match(/(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
}

export class StickersIndexStore {
  public all: PhysicalSticker[] = [];
  public byId = new Map<string, PhysicalSticker>();
  public bySeriExact = new Map<string, PhysicalSticker>();
  public byCodeExact = new Map<string, PhysicalSticker>();
  public byCodeRawExact = new Map<string, PhysicalSticker>();

  public byStatus = new Map<string, PhysicalSticker[]>();
  public byBatchName = new Map<string, PhysicalSticker[]>();
  public byPartnerName = new Map<string, PhysicalSticker[]>();
  public byPartnerType = new Map<string, PhysicalSticker[]>();

  public withDevice: PhysicalSticker[] = [];
  public withoutDevice: PhysicalSticker[] = [];
  public withReset: PhysicalSticker[] = [];
  public withoutReset: PhysicalSticker[] = [];
  public withNotes: PhysicalSticker[] = [];
  public withoutNotes: PhysicalSticker[] = [];

  // Sorted list for binary-search range queries: startSeri -> endSeri
  public sortedBySeriNum: { seriNum: number; sticker: PhysicalSticker }[] = [];

  // Pre-indexed search entries for ultra-fast string matching
  public searchEntries: StickerIndexedItem[] = [];

  // Pre-computed stats & filter option lists
  public stats = {
    total: 0,
    inStock: 0,
    assigned: 0,
    activated: 0,
    revoked: 0,
    totalRevenue: 0,
  };
  public batches: string[] = [];
  public partners: string[] = [];

  constructor(stickers: PhysicalSticker[]) {
    this.buildIndex(stickers);
  }

  private buildIndex(stickers: PhysicalSticker[]) {
    this.all = stickers;
    const batchSet = new Set<string>();
    const partnerSet = new Set<string>();

    let inStock = 0;
    let assigned = 0;
    let activated = 0;
    let revoked = 0;
    let totalRevenue = 0;

    const sortedNumItems: { seriNum: number; sticker: PhysicalSticker }[] = [];
    const entries: StickerIndexedItem[] = new Array(stickers.length);

    for (let i = 0; i < stickers.length; i++) {
      const s = stickers[i];

      // 1. Exact ID map
      if (s.id) this.byId.set(s.id, s);

      // 2. Exact Seri maps
      const cleanSeri = (s.seri || "").trim().toUpperCase();
      if (cleanSeri) {
        this.bySeriExact.set(cleanSeri, s);
        // Also map just the raw number e.g. "00042" or "42"
        const num = extractSeriNum(cleanSeri);
        if (num !== null) {
          sortedNumItems.push({ seriNum: num, sticker: s });
        }
      }

      // 3. Exact Code maps
      const cleanCode = (s.code || "").trim();
      const codeRaw = cleanCode.replace(/-/g, "");
      if (cleanCode) this.byCodeExact.set(cleanCode.toLowerCase(), s);
      if (codeRaw) this.byCodeRawExact.set(codeRaw.toLowerCase(), s);

      // 4. Status indexing
      if (s.status === "in_stock") inStock++;
      else if (s.status === "assigned") assigned++;
      else if (s.status === "activated") activated++;
      else if (s.status === "revoked") revoked++;

      const statusKey = s.status || "in_stock";
      let statusList = this.byStatus.get(statusKey);
      if (!statusList) {
        statusList = [];
        this.byStatus.set(statusKey, statusList);
      }
      statusList.push(s);

      // 5. Batch indexing
      if (s.batchName) {
        batchSet.add(s.batchName);
        let batchList = this.byBatchName.get(s.batchName);
        if (!batchList) {
          batchList = [];
          this.byBatchName.set(s.batchName, batchList);
        }
        batchList.push(s);
      }

      // 6. Partner indexing
      if (s.soldTo?.partnerName) {
        partnerSet.add(s.soldTo.partnerName);
        const pKey = s.soldTo.partnerName.trim().toLowerCase();
        let pList = this.byPartnerName.get(pKey);
        if (!pList) {
          pList = [];
          this.byPartnerName.set(pKey, pList);
        }
        pList.push(s);
      }

      // 7. Partner type indexing
      if (s.soldTo?.partnerType) {
        let ptList = this.byPartnerType.get(s.soldTo.partnerType);
        if (!ptList) {
          ptList = [];
          this.byPartnerType.set(s.soldTo.partnerType, ptList);
        }
        ptList.push(s);
      }

      // 8. Device state indexing
      if (s.activation?.deviceName) {
        this.withDevice.push(s);
      } else {
        this.withoutDevice.push(s);
      }

      // 9. Reset state indexing
      if (s.activation?.resetCount && s.activation.resetCount > 0) {
        this.withReset.push(s);
      } else {
        this.withoutReset.push(s);
      }

      // 10. Notes indexing
      const hasNotes = Boolean(s.note) || Boolean(s.notes && s.notes.length > 0);
      if (hasNotes) {
        this.withNotes.push(s);
      } else {
        this.withoutNotes.push(s);
      }

      // 11. Revenue
      if (s.soldTo?.unitPrice) {
        totalRevenue += s.soldTo.unitPrice;
      }

      // 12. Pre-index search corpus
      const seriLower = cleanSeri.toLowerCase();
      const codeLower = cleanCode.toLowerCase();
      const codeRawLower = codeRaw.toLowerCase();
      const partnerLower = (s.soldTo?.partnerName || "").toLowerCase();
      const partnerUnaccented = removeVietnameseTones(s.soldTo?.partnerName || "");
      const phoneLower = (s.soldTo?.partnerPhone || "").toLowerCase();
      const deviceLower = (s.activation?.deviceName || "").toLowerCase();
      const deviceUnaccented = removeVietnameseTones(s.activation?.deviceName || "");
      const ipLower = (s.activation?.ipAddress || "").toLowerCase();
      const orderLower = (s.soldTo?.orderRef || "").toLowerCase();
      const orderUnaccented = removeVietnameseTones(s.soldTo?.orderRef || "");

      const searchHaystack = `${seriLower} ${codeLower} ${codeRawLower} ${partnerLower} ${partnerUnaccented} ${phoneLower} ${deviceLower} ${deviceUnaccented} ${ipLower} ${orderLower} ${orderUnaccented}`;

      const dateStr = s.activation?.activatedAt || s.soldTo?.soldAt || s.createdAt || "";
      const timestamp = dateStr ? new Date(dateStr).getTime() : 0;

      entries[i] = {
        sticker: s,
        seriNum: extractSeriNum(cleanSeri),
        seriLower,
        codeLower,
        codeRaw: codeRawLower,
        partnerLower,
        partnerUnaccented,
        phoneLower,
        deviceLower,
        deviceUnaccented,
        ipLower,
        orderLower,
        orderUnaccented,
        searchHaystack,
        timestamp,
      };
    }

    // Sort binary search items
    sortedNumItems.sort((a, b) => a.seriNum - b.seriNum);
    this.sortedBySeriNum = sortedNumItems;
    this.searchEntries = entries;

    this.stats = {
      total: stickers.length,
      inStock,
      assigned,
      activated,
      revoked,
      totalRevenue,
    };
    this.batches = Array.from(batchSet);
    this.partners = Array.from(partnerSet);
  }

  /**
   * High performance filtered query execution with O(1) indexed looks and binary search
   */
  public query(params: StickerFilterParams) {
    const {
      search,
      searchField = "all",
      status = "all",
      batchName = "all",
      partnerName = "all",
      partnerType = "all",
      priceTier = "all",
      hasDevice = "all",
      hasReset = "all",
      hasNotes = "all",
      startSeri,
      endSeri,
      dateRange = "all",
      page = 1,
      pageSize = 50,
    } = params;

    const trimmedSearch = (search || "").toLowerCase().trim();
    const searchRaw = trimmedSearch.replace(/-/g, "");
    const searchUnaccented = removeVietnameseTones(trimmedSearch);

    const startNum = startSeri ? extractSeriNum(startSeri) : null;
    const endNum = endSeri ? extractSeriNum(endSeri) : null;

    // Date range boundaries
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const sevenDaysAgo = startOfToday - 7 * 24 * 3600 * 1000;
    const thirtyDaysAgo = startOfToday - 30 * 24 * 3600 * 1000;
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

    // Fast-path 1: Exact search on seri if full seri provided
    if (trimmedSearch && searchField === "seri") {
      const exact = this.bySeriExact.get(trimmedSearch.toUpperCase());
      if (exact && status === "all" && batchName === "all" && partnerName === "all") {
        return {
          stickers: [exact],
          stats: this.stats,
          filteredStats: { count: 1, revenue: exact.soldTo?.unitPrice || 0 },
          batches: this.batches,
          partners: this.partners,
          page: 1,
          pageSize: typeof pageSize === "number" ? pageSize : 50,
          total: 1,
        };
      }
    }

    // Fast-path 2: Exact search on code
    if (trimmedSearch && searchField === "code") {
      const exact = this.byCodeExact.get(trimmedSearch) || this.byCodeRawExact.get(searchRaw);
      if (exact && status === "all" && batchName === "all" && partnerName === "all") {
        return {
          stickers: [exact],
          stats: this.stats,
          filteredStats: { count: 1, revenue: exact.soldTo?.unitPrice || 0 },
          batches: this.batches,
          partners: this.partners,
          page: 1,
          pageSize: typeof pageSize === "number" ? pageSize : 50,
          total: 1,
        };
      }
    }

    const filtered: PhysicalSticker[] = [];
    let filteredRevenue = 0;

    const entries = this.searchEntries;
    const len = entries.length;

    for (let i = 0; i < len; i++) {
      const entry = entries[i];
      const s = entry.sticker;

      // 1. Status filter
      if (status !== "all" && s.status !== status) continue;

      // 2. Batch filter
      if (batchName !== "all" && s.batchName !== batchName) continue;

      // 3. Partner filter (supports exact, substring & accent-insensitive)
      if (partnerName !== "all") {
        const pLower = (s.soldTo?.partnerName || "").toLowerCase();
        const pTarget = partnerName.toLowerCase().trim();
        const pTargetUnaccented = removeVietnameseTones(pTarget);
        const pLowerUnaccented = entry.partnerUnaccented;
        if (
          pLower !== pTarget &&
          !pLower.includes(pTarget) &&
          !pLowerUnaccented.includes(pTargetUnaccented)
        ) {
          continue;
        }
      }

      // 4. Partner type
      if (partnerType !== "all") {
        if (!s.soldTo || s.soldTo.partnerType !== partnerType) continue;
      }

      // 5. Price tier
      if (priceTier !== "all") {
        const p = s.soldTo?.unitPrice;
        if (priceTier === "custom") {
          if (!p || [249000, 399000, 499000, 699000, 999000].includes(p)) continue;
        } else {
          const targetPrice = parseInt(priceTier, 10);
          if (p !== targetPrice) continue;
        }
      }

      // 6. Device filter
      if (hasDevice === "with_device") {
        if (!s.activation?.deviceName) continue;
      } else if (hasDevice === "without_device") {
        if (s.activation?.deviceName) continue;
      }

      // 7. Reset filter
      if (hasReset === "yes") {
        if (!s.activation?.resetCount || s.activation.resetCount <= 0) continue;
      } else if (hasReset === "no") {
        if (s.activation?.resetCount && s.activation.resetCount > 0) continue;
      }

      // 8. Notes filter
      if (hasNotes === "yes") {
        const hasAnyNotes = Boolean(s.note) || Boolean(s.notes && s.notes.length > 0);
        if (!hasAnyNotes) continue;
      } else if (hasNotes === "no") {
        const hasAnyNotes = Boolean(s.note) || Boolean(s.notes && s.notes.length > 0);
        if (hasAnyNotes) continue;
      }

      // 9. Numeric range filter
      if (startNum !== null || endNum !== null) {
        const num = entry.seriNum;
        if (num === null) continue;
        if (startNum !== null && num < startNum) continue;
        if (endNum !== null && num > endNum) continue;
      }

      // 10. Date range filter
      if (dateRange !== "all") {
        const t = entry.timestamp;
        if (dateRange === "today" && t < startOfToday) continue;
        if (dateRange === "last7days" && t < sevenDaysAgo) continue;
        if (dateRange === "last30days" && t < thirtyDaysAgo) continue;
        if (dateRange === "thisMonth" && t < startOfMonth) continue;
      }

      // 11. Pre-computed string search (with Vietnamese accent-insensitive support)
      if (trimmedSearch) {
        if (searchField === "seri") {
          if (!entry.seriLower.includes(trimmedSearch)) continue;
        } else if (searchField === "code") {
          if (!entry.codeLower.includes(trimmedSearch) && !entry.codeRaw.includes(searchRaw)) continue;
        } else if (searchField === "partner") {
          if (!entry.partnerLower.includes(trimmedSearch) && !entry.partnerUnaccented.includes(searchUnaccented)) continue;
        } else if (searchField === "phone") {
          if (!entry.phoneLower.includes(trimmedSearch)) continue;
        } else if (searchField === "device") {
          if (
            !entry.deviceLower.includes(trimmedSearch) &&
            !entry.deviceUnaccented.includes(searchUnaccented) &&
            !entry.ipLower.includes(trimmedSearch)
          ) {
            continue;
          }
        } else if (searchField === "orderRef") {
          if (!entry.orderLower.includes(trimmedSearch) && !entry.orderUnaccented.includes(searchUnaccented)) continue;
        } else {
          // "all": match pre-indexed search haystack
          if (
            !entry.searchHaystack.includes(trimmedSearch) &&
            !entry.searchHaystack.includes(searchUnaccented) &&
            !entry.codeRaw.includes(searchRaw)
          ) {
            continue;
          }
        }
      }

      filtered.push(s);
      if (s.soldTo?.unitPrice) {
        filteredRevenue += s.soldTo.unitPrice;
      }
    }

    const totalFiltered = filtered.length;

    // Apply pagination if pageSize is a number
    let paginatedStickers = filtered;
    if (pageSize !== "all" && typeof pageSize === "number" && pageSize > 0) {
      const pageNum = Math.max(1, page);
      const start = (pageNum - 1) * pageSize;
      paginatedStickers = filtered.slice(start, start + pageSize);
    }

    return {
      stickers: paginatedStickers,
      stats: this.stats,
      filteredStats: {
        count: totalFiltered,
        revenue: filteredRevenue,
      },
      batches: this.batches,
      partners: this.partners,
      page: Math.max(1, page),
      pageSize: pageSize === "all" ? totalFiltered : pageSize,
      total: totalFiltered,
    };
  }
}

// Global cached singleton index store
let _globalStickersIndex: StickersIndexStore | null = null;
let _lastIndexBuiltTime = 0;
const INDEX_MAX_AGE_MS = 60000; // 1 minute auto refresh check

export function getOrBuildStickersIndex(stickers: PhysicalSticker[]): StickersIndexStore {
  const now = Date.now();
  if (!_globalStickersIndex || _globalStickersIndex.all !== stickers || now - _lastIndexBuiltTime > INDEX_MAX_AGE_MS) {
    _globalStickersIndex = new StickersIndexStore(stickers);
    _lastIndexBuiltTime = now;
  }
  return _globalStickersIndex;
}

export function invalidateStickersIndex() {
  _globalStickersIndex = null;
  _lastIndexBuiltTime = 0;
}
