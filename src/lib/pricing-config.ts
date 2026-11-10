// ─── Pricing Configuration ───
// Centralized source of truth for all pricing logic.
// Handles automatic transition from old → new retail prices
// at the cutoff date specified in QĐ 2907/2026/QĐ-MERCY.

// ─── Transition Date ───
// 00:00 ngày 03/08/2026 (GMT+7) = 17:00 ngày 02/08/2026 (UTC)
export const PRICE_TRANSITION_DATE = new Date("2026-08-02T17:00:00.000Z");

/**
 * Check whether the new pricing is active.
 * Returns true if `now` is at or past 00:00 03/08/2026 GMT+7.
 */
export function isNewPriceActive(now: Date = new Date()): boolean {
  return now >= PRICE_TRANSITION_DATE;
}

// ─── Retail Prices (Customer-facing) ───

interface PriceTier {
  /** Price before transition */
  old: number;
  /** Giá niêm yết mới (published/listed price) */
  listed: number;
  /** Giá sàn tối thiểu (minimum floor price) */
  floor: number;
}

export const RETAIL_TIERS = {
  /** Gói Cá Nhân — Dưới 5 máy */
  personal: { old: 399_000, listed: 799_000, floor: 499_000 } as PriceTier,
  /** Gói Doanh Nghiệp Vừa — 5 đến 49 máy */
  medium: { old: 299_000, listed: 699_000, floor: 499_000 } as PriceTier,
  /** Gói Doanh Nghiệp Lớn — Từ 50 máy */
  large: { old: 249_000, listed: 499_000, floor: 499_000 } as PriceTier,
} as const;

export const FLEXIBLE_TIERS = {
  /** Gói Cá Nhân — Dưới 5 máy */
  personal: { old: 599_000, listed: 1_499_000, floor: 999_000 } as PriceTier,
  /** Gói Doanh Nghiệp Vừa — 5 đến 49 máy */
  medium: { old: 499_000, listed: 1_299_000, floor: 999_000 } as PriceTier,
  /** Gói Doanh Nghiệp Lớn — Từ 50 máy */
  large: { old: 399_000, listed: 999_000, floor: 999_000 } as PriceTier,
} as const;

/**
 * Get the retail unit price for a given device count.
 * Before transition: returns old price.
 * After transition: returns the new *listed* price (giá niêm yết).
 */
export function getRetailPrice(count: number, now: Date = new Date()): number {
  if (count < 5) return RETAIL_TIERS.personal.listed;
  if (count <= 49) return RETAIL_TIERS.medium.listed;
  return RETAIL_TIERS.large.listed;
}

/**
 * Get the flexible machine switch unit price for a given device count.
 */
export function getFlexiblePrice(count: number, now: Date = new Date()): number {
  const isNew = isNewPriceActive(now);
  if (count < 5) return isNew ? FLEXIBLE_TIERS.personal.listed : FLEXIBLE_TIERS.personal.old;
  if (count <= 49) return isNew ? FLEXIBLE_TIERS.medium.listed : FLEXIBLE_TIERS.medium.old;
  return isNew ? FLEXIBLE_TIERS.large.listed : FLEXIBLE_TIERS.large.old;
}

// ─── Dealer/Wholesale Prices — UNCHANGED ───

/**
 * Dealer (sỉ) pricing is NOT affected by the transition.
 * These remain the same before and after the cutoff.
 */
export function getDealerPrice(count: number): number {
  if (count < 5) return 399_000;
  if (count <= 49) return 299_000;
  if (count <= 99) return 149_000;
  if (count <= 199) return 129_000;
  return 99_000;
}

// ─── Physical Sticker (Tem Cào Hologram) Pricing ───
export const PHYSICAL_STICKER_TIERS = {
  retailListed: 999_000, // Giá bán lẻ tham chiếu niêm yết: 999.000đ/tem
  pack10: { count: 10, unitPrice: 699_000, totalCost: 6_990_000, profit: 3_000_000 },
  pack50: { count: 50, unitPrice: 499_000, totalCost: 24_950_000, profit: 25_000_000 },
  pack200: { count: 200, unitPrice: 399_000, totalCost: 79_800_000, profit: 120_000_000 },
  pack500: { count: 500, unitPrice: 249_000, totalCost: 124_500_000, profit: 375_000_000 },
} as const;

export function getPhysicalStickerPrice(count: number): number {
  if (count < 10) return PHYSICAL_STICKER_TIERS.retailListed;
  if (count < 50) return PHYSICAL_STICKER_TIERS.pack10.unitPrice;
  if (count < 200) return PHYSICAL_STICKER_TIERS.pack50.unitPrice;
  if (count < 500) return PHYSICAL_STICKER_TIERS.pack200.unitPrice;
  return PHYSICAL_STICKER_TIERS.pack500.unitPrice;
}

// ─── UI Display Helpers ───

interface PriceDisplayItem {
  price: number;
  label: string;
  oldPrice?: number;
  oldLabel?: string;
}

interface PricingDisplaySet {
  personal: PriceDisplayItem;
  medium: PriceDisplayItem;
  large: PriceDisplayItem;
  flexiblePersonal: PriceDisplayItem;
  flexibleMedium: PriceDisplayItem;
  flexibleLarge: PriceDisplayItem;
  isNewPrice: boolean;
}

/**
 * Get formatted pricing data for UI components (PricingTiers, BudgetCalculator, etc.)
 */
export function getPricingDisplay(now: Date = new Date()): PricingDisplaySet {
  const isNew = isNewPriceActive(now);

  if (!isNew) {
    return {
      isNewPrice: false,
      personal: { price: 399_000, label: "399k" },
      medium: { price: 299_000, label: "299k" },
      large: { price: 249_000, label: "249k" },
      flexiblePersonal: { price: 599_000, label: "599k" },
      flexibleMedium: { price: 499_000, label: "499k" },
      flexibleLarge: { price: 399_000, label: "399k" },
    };
  }

  return {
    isNewPrice: true,
    personal: { price: 799_000, label: "799k", oldPrice: 399_000, oldLabel: "399k" },
    medium: { price: 699_000, label: "699k", oldPrice: 299_000, oldLabel: "299k" },
    large: { price: 499_000, label: "499k", oldPrice: 249_000, oldLabel: "249k" },
    flexiblePersonal: { price: 1_499_000, label: "1.499k", oldPrice: 599_000, oldLabel: "599k" },
    flexibleMedium: { price: 1_299_000, label: "1.299k", oldPrice: 499_000, oldLabel: "499k" },
    flexibleLarge: { price: 999_000, label: "999k", oldPrice: 399_000, oldLabel: "399k" },
  };
}

/**
 * Format VND currency
 */
export function formatVND(amount: number): string {
  return amount.toLocaleString("vi-VN") + " ₫";
}
