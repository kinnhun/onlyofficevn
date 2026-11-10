/**
 * Production Ultra-Strict Rate Limiter & Anti-Spam Defense Service
 * 
 * Provides:
 * 1. Sliding-window IP rate limiting (Strict)
 * 2. 24-hour daily quotas per IP to prevent long-term credit draining
 * 3. Burst throttling (minimum interval between turns)
 * 4. Duplicate message spam detection (within 90s)
 * 5. Gibberish & keyboard smash detection
 * 6. Escalated temporary IP bans (30-60 minutes)
 */

type RateLimitBucket = {
  timestamps: number[];
  dailyTimestamps: number[];
  lastRequestAt: number;
  lastMessageText?: string;
  bannedUntil?: number;
};

// In-memory sliding window bucket store per IP
const ipBuckets = new Map<string, RateLimitBucket>();

// Clean up stale buckets every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of ipBuckets.entries()) {
      if (bucket.bannedUntil && bucket.bannedUntil > now) continue;
      // Remove buckets with no activity in past 24 hours
      if (now - bucket.lastRequestAt > 24 * 60 * 60 * 1000) {
        ipBuckets.delete(key);
      }
    }
  }, 5 * 60 * 1000).unref?.();
}

/**
 * Extracts client IP from request headers safely.
 * Works behind reverse proxies (Nginx, Vercel, Cloudflare).
 */
export function extractClientIp(req: Request): string {
  const headers = req.headers;

  // 1. Cloudflare header
  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  // 2. Standard X-Forwarded-For (take the leftmost client IP)
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }

  // 3. X-Real-IP
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "127.0.0.1";
}

export type RateLimitAction =
  | "messages"
  | "tickets"
  | "uploads"
  | "conversations"
  | "feedback";

type ActionConfig = {
  maxRequests: number;
  windowMs: number;
  minIntervalMs: number; // Burst prevention (minimum time between requests)
  maxDaily: number; // Maximum requests allowed per 24 hours per IP
  excessiveThreshold: number; // If hit, trigger temporary ban
  banDurationMs: number;
  vietnameseErrorMessage: string;
};

// ─── Ultra-Strict Enterprise Rate Limit Configuration ───
const ACTION_CONFIGS: Record<RateLimitAction, ActionConfig> = {
  messages: {
    maxRequests: 5, // Tối đa 5 câu hỏi / phút (người thật không bao giờ gõ 5 câu/phút)
    windowMs: 60 * 1000,
    minIntervalMs: 3500, // Tối thiểu 3.5s giữa 2 câu hỏi (chặn click đúp & spam script)
    maxDaily: 30, // Tối đa 30 câu hỏi / 24h / IP (bảo toàn ngân sách AI)
    excessiveThreshold: 10, // Quá 10 câu/phút -> coi là bot tấn công
    banDurationMs: 30 * 60 * 1000, // Khóa 30 phút
    vietnameseErrorMessage:
      "Anh/chị đang gửi tin nhắn quá nhanh. Vui lòng đọc phản hồi và chờ 3-5 giây trước khi đặt câu hỏi tiếp theo.",
  },
  tickets: {
    maxRequests: 1, // Tối đa 1 phiếu / 10 phút (người thật chỉ gửi 1 lần)
    windowMs: 10 * 60 * 1000,
    minIntervalMs: 15000, // Tối thiểu 15s
    maxDaily: 3, // Tối đa 3 phiếu / 24h / IP (tránh spam Telegram kỹ thuật)
    excessiveThreshold: 3,
    banDurationMs: 60 * 60 * 1000, // Khóa 60 phút nếu cố tình spam tạo phiếu
    vietnameseErrorMessage:
      "Yêu cầu hỗ trợ của anh/chị đã được chuyển đến kỹ thuật viên Mercy Tech. Vui lòng chờ phản hồi, không gửi liên tiếp nhiều phiếu trong thời gian ngắn.",
  },
  uploads: {
    maxRequests: 3, // Tối đa 3 ảnh / phút
    windowMs: 60 * 1000,
    minIntervalMs: 2500, // Tối thiểu 2.5s giữa các lần tải ảnh
    maxDaily: 10, // Tối đa 10 ảnh / 24h / IP (bảo vệ dung lượng đĩa)
    excessiveThreshold: 6,
    banDurationMs: 30 * 60 * 1000,
    vietnameseErrorMessage:
      "Tần suất tải ảnh vượt quá giới hạn an toàn. Vui lòng chờ 1-2 phút trước khi gửi thêm ảnh chụp màn hình.",
  },
  conversations: {
    maxRequests: 2, // Tối đa 2 phiên hội thoại mới / 10 phút
    windowMs: 10 * 60 * 1000,
    minIntervalMs: 5000, // Tối thiểu 5s
    maxDaily: 8, // Tối đa 8 phiên / 24h / IP
    excessiveThreshold: 5,
    banDurationMs: 30 * 60 * 1000,
    vietnameseErrorMessage:
      "Anh/chị đã tạo phiên hỗ trợ mới gần đây. Vui lòng tiếp tục trò chuyện trong phiên hiện tại.",
  },
  feedback: {
    maxRequests: 10,
    windowMs: 60 * 1000,
    minIntervalMs: 1000,
    maxDaily: 50,
    excessiveThreshold: 20,
    banDurationMs: 15 * 60 * 1000,
    vietnameseErrorMessage: "Thao tác đánh giá quá nhanh. Vui lòng thử lại sau.",
  },
};

export type RateLimitResult = {
  allowed: boolean;
  status: number;
  code: string;
  message: string;
  retryAfterSec?: number;
};

/**
 * Checks rate limits for a given IP and action.
 * Returns { allowed: true } or { allowed: false, ... }
 */
export function checkRateLimit(
  ip: string,
  action: RateLimitAction,
  options?: { bypassAdmin?: boolean }
): RateLimitResult {
  if (options?.bypassAdmin) {
    return { allowed: true, status: 200, code: "OK", message: "" };
  }

  const config = ACTION_CONFIGS[action];
  const bucketKey = `${ip}:${action}`;
  const now = Date.now();

  let bucket = ipBuckets.get(bucketKey);
  if (!bucket) {
    bucket = { timestamps: [], dailyTimestamps: [], lastRequestAt: 0 };
    ipBuckets.set(bucketKey, bucket);
  }

  // 1. Check if IP is currently banned
  if (bucket.bannedUntil && bucket.bannedUntil > now) {
    const remainingSec = Math.ceil((bucket.bannedUntil - now) / 1000);
    return {
      allowed: false,
      status: 429,
      code: "IP_TEMPORARILY_BANNED",
      message: `Hệ thống ghi nhận dấu hiệu spam bất thường từ kết nối mạng của bạn. Vui lòng thử lại sau ${Math.ceil(remainingSec / 60)} phút.`,
      retryAfterSec: remainingSec,
    };
  }

  // 2. Burst throttling (check interval from last request)
  if (bucket.lastRequestAt > 0 && now - bucket.lastRequestAt < config.minIntervalMs) {
    const waitSec = Math.ceil((config.minIntervalMs - (now - bucket.lastRequestAt)) / 1000);
    return {
      allowed: false,
      status: 429,
      code: "REQUEST_BURST_THROTTLED",
      message: config.vietnameseErrorMessage,
      retryAfterSec: waitSec || 1,
    };
  }

  // 3. 24-hour Daily Quota Check
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  bucket.dailyTimestamps = bucket.dailyTimestamps.filter((t) => t > oneDayAgo);
  if (bucket.dailyTimestamps.length >= config.maxDaily) {
    return {
      allowed: false,
      status: 429,
      code: "DAILY_QUOTA_EXCEEDED",
      message: `Anh/chị đã sử dụng hết hạn mức hỗ trợ tự động trong ngày (${config.maxDaily}/${config.maxDaily} lượt). Vui lòng quay lại vào ngày mai hoặc bấm 'Gặp kỹ thuật viên' để được hỗ trợ trực tiếp.`,
      retryAfterSec: 3600,
    };
  }

  // 4. Sliding window check
  const windowStart = now - config.windowMs;
  bucket.timestamps = bucket.timestamps.filter((t) => t > windowStart);

  // Check for excessive flooding -> trigger temporary ban
  if (bucket.timestamps.length >= config.excessiveThreshold) {
    bucket.bannedUntil = now + config.banDurationMs;
    const banMin = Math.ceil(config.banDurationMs / 60000);
    return {
      allowed: false,
      status: 429,
      code: "IP_TEMPORARILY_BANNED",
      message: `Hệ thống tạm khóa yêu cầu do thao tác lặp lại quá nhiều lần. Vui lòng quay lại sau ${banMin} phút.`,
      retryAfterSec: Math.ceil(config.banDurationMs / 1000),
    };
  }

  // Check normal rate limit
  if (bucket.timestamps.length >= config.maxRequests) {
    const oldest = bucket.timestamps[0];
    const resetSec = Math.ceil((oldest + config.windowMs - now) / 1000);
    return {
      allowed: false,
      status: 429,
      code: "RATE_LIMIT_EXCEEDED",
      message: config.vietnameseErrorMessage,
      retryAfterSec: resetSec || 1,
    };
  }

  // Record this request
  bucket.timestamps.push(now);
  bucket.dailyTimestamps.push(now);
  bucket.lastRequestAt = now;

  return { allowed: true, status: 200, code: "OK", message: "" };
}

/**
 * Checks if the user is sending the exact same text within 90 seconds.
 * Blocks duplicate turn spam without consuming AI tokens.
 */
export function checkDuplicateMessageSpam(
  ip: string,
  text: string
): { isDuplicate: boolean; message?: string } {
  const clean = text.trim().toLowerCase();
  if (!clean || clean.length < 3) return { isDuplicate: false };

  const key = `${ip}:messages`;
  const bucket = ipBuckets.get(key);
  if (!bucket) return { isDuplicate: false };

  const now = Date.now();
  if (
    bucket.lastMessageText &&
    bucket.lastMessageText === clean &&
    now - bucket.lastRequestAt < 90 * 1000
  ) {
    return {
      isDuplicate: true,
      message:
        "Câu hỏi này vừa được gửi. Trợ lý đã phản hồi ở trên, anh/chị vui lòng kiểm tra nội dung phía trên nhé ạ.",
    };
  }

  bucket.lastMessageText = clean;
  return { isDuplicate: false };
}

/**
 * Checks for obvious nonsense, keyboard smashing, or repetitive character spam.
 * Examples: 'aaaaaaa', 'asdfghjkl', 'qwertyuiop', '11111111'.
 */
export function isGibberishSpam(text: string): boolean {
  const clean = text.trim();
  if (!clean || clean.length < 4) return false;

  // 1. Same character repeated 5+ times: 'aaaaa', '11111', '.....'
  if (/(.)\1{4,}/.test(clean)) return true;

  // 2. Common keyboard smash substrings (length >= 6)
  const smashPatterns = [
    /asdfgh/i,
    /qwerty/i,
    /zxcvbn/i,
    /lkjhgf/i,
    /poiuyt/i,
    /mnbvcx/i,
    /123456/i,
    /abcdef/i,
  ];
  for (const p of smashPatterns) {
    if (p.test(clean)) return true;
  }

  // 3. String of only consonants with no vowels and length >= 8
  const lettersOnly = clean.replace(/[^a-zA-Z]/g, "").toLowerCase();
  if (lettersOnly.length >= 8 && !/[aeiouy]/.test(lettersOnly)) {
    return true;
  }

  return false;
}
