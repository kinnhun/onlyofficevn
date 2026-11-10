/**
 * Utility to strip Vietnamese diacritics / tones for accent-insensitive search
 * e.g. "Công ty TNHH Thiết Bị" -> "cong ty tnhh thiet bi"
 */
export function removeVietnameseTones(str?: string | null): string {
  if (!str) return "";
  return String(str)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}
