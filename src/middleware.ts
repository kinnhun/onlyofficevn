import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

const REDIRECT_TARGET = "/huong-dan-cai-dat";

const ALIAS_PATHS = [
  "caidat",
  "huongdancaidat",
  "cai-dat",
  "huongdan",
  "huong-dan",
  "huongdancai",
  "huong-dan-cai",
  "setup",
  "install",
  "install-guide",
  "installation",
];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Tách các phân đoạn URL
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0) {
    const hasLocale = segments[0] === "vi" || segments[0] === "en";
    const locale = hasLocale ? segments[0] : "vi";
    const pathToCheck = (hasLocale ? segments[1] : segments[0])?.toLowerCase();

    if (pathToCheck && ALIAS_PATHS.includes(pathToCheck)) {
      const targetUrl = request.nextUrl.clone();
      targetUrl.pathname = locale === "vi" ? REDIRECT_TARGET : `/${locale}${REDIRECT_TARGET}`;
      return NextResponse.redirect(targetUrl, 307);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
