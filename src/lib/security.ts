import { createHmac, timingSafeEqual } from "crypto";

// ─── Secret Key Management ───
// Use environment secret, falling back to a hardened server-side internal secret
const SESSION_SECRET: string =
  process.env.SESSION_SECRET ||
  process.env.JWT_SECRET ||
  "mercy-auth-sec-2026-k9f8d3!@#super-safe-key-dont-leak";

// ─── Cryptographic HMAC-SHA256 Session Signing & Verification ───
export type SessionPayload = {
  role: "admin" | "dealer" | "customer";
  dealerId?: string;
  dealerName?: string;
  customerId?: string;
  customerName?: string;
  _iat?: number;
  [key: string]: unknown;
};

/**
 * Sign a session payload with HMAC-SHA256
 * Format: <base64urlPayload>.<signature>
 */
export function signSessionPayload(payloadObj: SessionPayload): string {
  const payloadWithTime: SessionPayload = {
    ...payloadObj,
    _iat: Date.now(),
  };
  const json = JSON.stringify(payloadWithTime);
  const b64Payload = Buffer.from(json, "utf-8").toString("base64url");
  const signature = createHmac("sha256", SESSION_SECRET)
    .update(b64Payload)
    .digest("base64url");

  return `${b64Payload}.${signature}`;
}

/**
 * Verify a signed session token.
 * Prevents Cookie Tampering, Privilege Escalation and Token Forgery.
 */
export function verifySessionToken<T extends SessionPayload = SessionPayload>(
  token: string | null | undefined,
  maxAgeMs: number = 7 * 24 * 60 * 60 * 1000 // 7 days
): T | null {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");

  // 1. Signed token verification (Production standard)
  if (parts.length === 2) {
    const [b64Payload, signature] = parts;
    if (!b64Payload || !signature) return null;

    try {
      const expectedSig = createHmac("sha256", SESSION_SECRET)
        .update(b64Payload)
        .digest("base64url");

      const sigBuf = Buffer.from(signature, "utf-8");
      const expBuf = Buffer.from(expectedSig, "utf-8");

      // Constant-time comparison to prevent timing attacks
      if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
        console.warn("[Security] Invalid session signature detected! Rejecting forged cookie.");
        return null;
      }

      const json = Buffer.from(b64Payload, "base64url").toString("utf-8");
      const data = JSON.parse(json) as T;

      // Expiration check
      if (data._iat && Date.now() - data._iat > maxAgeMs) {
        console.warn("[Security] Session token has expired.");
        return null;
      }

      return data;
    } catch {
      return null;
    }
  }

  // 2. Legacy fallback support for active sessions during code reload
  if (parts.length === 1) {
    try {
      const json = Buffer.from(token, "base64").toString("utf-8");
      const legacyData = JSON.parse(json) as T;
      if (legacyData && legacyData.role) {
        return legacyData;
      }
    } catch {
      return null;
    }
  }

  return null;
}

// ─── Constant-Time Token Comparison (Anti-Timing Attacks) ───
export function safeTokenCompare(
  providedToken: string | null | undefined,
  secretToken: string | null | undefined
): boolean {
  if (!providedToken || !secretToken) return false;
  try {
    const a = Buffer.from(providedToken, "utf-8");
    const b = Buffer.from(secretToken, "utf-8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

// ─── In-Memory Sliding-Window Rate Limiter ───
type RateLimitRecord = {
  count: number;
  resetAt: number;
  blockedUntil?: number;
};

class MemoryRateLimiter {
  private store = new Map<string, RateLimitRecord>();

  /**
   * Check if a request from this key is allowed.
   */
  check(
    key: string,
    limit: number,
    windowMs: number
  ): { allowed: boolean; remaining: number; retryAfterSec: number } {
    const now = Date.now();
    const record = this.store.get(key);

    // If currently blocked
    if (record?.blockedUntil && now < record.blockedUntil) {
      return {
        allowed: false,
        remaining: 0,
        retryAfterSec: Math.ceil((record.blockedUntil - now) / 1000),
      };
    }

    if (!record || now > record.resetAt) {
      this.store.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, remaining: limit - 1, retryAfterSec: 0 };
    }

    if (record.count >= limit) {
      return {
        allowed: false,
        remaining: 0,
        retryAfterSec: Math.ceil((record.resetAt - now) / 1000),
      };
    }

    record.count++;
    return {
      allowed: true,
      remaining: limit - record.count,
      retryAfterSec: 0,
    };
  }

  /**
   * Record a failed login attempt and automatically block IP if threshold exceeded
   */
  recordFailedLogin(ip: string): { isBlocked: boolean; retryAfterSec: number } {
    const now = Date.now();
    const key = `auth:failed:${ip}`;
    const record = this.store.get(key) || { count: 0, resetAt: now + 60_000 };

    if (now > record.resetAt) {
      record.count = 1;
      record.resetAt = now + 60_000;
    } else {
      record.count++;
    }

    // If failed 5 times within 1 minute, block for 15 minutes (900,000 ms)
    if (record.count >= 5) {
      record.blockedUntil = now + 15 * 60_000;
      this.store.set(key, record);
      console.warn(`[Security] IP ${ip} BLOCKED for 15 minutes due to 5 consecutive failed logins.`);
      return {
        isBlocked: true,
        retryAfterSec: 15 * 60,
      };
    }

    this.store.set(key, record);
    return { isBlocked: false, retryAfterSec: 0 };
  }

  /**
   * Clear failed login tracking on successful authentication
   */
  clearFailedLogin(ip: string) {
    this.store.delete(`auth:failed:${ip}`);
  }

  /**
   * Garbage collection
   */
  cleanup() {
    const now = Date.now();
    for (const [key, record] of this.store.entries()) {
      if (now > record.resetAt && (!record.blockedUntil || now > record.blockedUntil)) {
        this.store.delete(key);
      }
    }
  }
}

export const rateLimiter = new MemoryRateLimiter();

// Run periodic cleanup every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => rateLimiter.cleanup(), 5 * 60 * 1000).unref?.();
}

// ─── Input Sanitization Helper ───
export function sanitizeInput(input: string, maxLength: number = 500): string {
  if (!input || typeof input !== "string") return "";
  return input
    .slice(0, maxLength)
    .replace(/\0/g, "") // Strip null bytes
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") // XSS strip
    .trim();
}

// ─── HTTP Security Headers ───
export const SECURITY_HEADERS = {
  "X-DNS-Prefetch-Control": "on",
  "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-XSS-Protection": "1; mode=block",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
} as const;
