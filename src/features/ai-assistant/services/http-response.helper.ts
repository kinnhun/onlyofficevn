import { NextResponse } from "next/server";
import { getGuestCookieOptions } from "./security-guard.service";

export function withSupportHeaders<T>(
  payload: T,
  options: {
    status?: number;
    correlationId: string;
    newGuestCookieValue?: string;
  }
): NextResponse<T> {
  const res = NextResponse.json(payload, { status: options.status || 200 });
  res.headers.set("X-Correlation-Id", options.correlationId);
  res.headers.set("Cache-Control", "private, no-store");
  if (options.newGuestCookieValue) {
    const cookieOpts = getGuestCookieOptions();
    res.cookies.set(cookieOpts.name, options.newGuestCookieValue, {
      httpOnly: cookieOpts.httpOnly,
      secure: cookieOpts.secure,
      sameSite: cookieOpts.sameSite,
      maxAge: cookieOpts.maxAge,
      path: cookieOpts.path,
    });
  }
  return res;
}

