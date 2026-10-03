import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import FloatingTrialButton from "@/components/FloatingTrialButton";
import { Open_Sans } from "next/font/google";
import "../globals.css";

const openSans = Open_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-open-sans",
});

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
    <html lang={locale} dir="ltr" className={openSans.variable} suppressHydrationWarning>
      <body className={openSans.className} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <div id="__next">
            <div className="layout">{children}</div>
            <FloatingTrialButton />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
