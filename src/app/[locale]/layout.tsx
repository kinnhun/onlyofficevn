import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";

export const metadata: Metadata = {
  title: "ONLYOFFICE - Secure Online Office | ONLYOFFICE Vietnam",
  description:
    "ONLYOFFICE cung cấp bộ ứng dụng văn phòng trực tuyến bảo mật, tương thích cao với định dạng MS Office. ONLYOFFICE offers a secure online office suite highly compatible with MS Office formats.",
  icons: {
    icon: "https://static-site.onlyoffice.com/public/images/favicons/favicon32.png",
    shortcut: "https://static-site.onlyoffice.com/public/images/favicons/favicon32.png",
    apple: "https://static-site.onlyoffice.com/public/images/favicons/favicon150.png",
  },
  openGraph: {
    title: "ONLYOFFICE Vietnam - Văn phòng trực tuyến an toàn cho doanh nghiệp",
    description:
      "ONLYOFFICE cung cấp bộ ứng dụng văn phòng trực tuyến bảo mật, tương thích cao với định dạng MS Office.",
    url: "https://onlyofficevietnam.com",
    siteName: "ONLYOFFICE Vietnam",
    images: [
      {
        url: "https://download.onlyoffice.com/assets/fb/fb_icon_325x325.jpg",
        width: 325,
        height: 325,
      },
    ],
    type: "website",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "vi" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir="ltr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <div id="__next">
            <div className="layout">{children}</div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
