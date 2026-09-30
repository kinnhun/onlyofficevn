import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ONLYOFFICE - Secure Online Office | ONLYOFFICE",
  description:
    "ONLYOFFICE offers a secure online office suite highly compatible with MS Office formats. Connect it to your web platform for document editing and collaboration or use as a part of ONLYOFFICE Workspace.",
  icons: {
    icon: "https://static-site.onlyoffice.com/public/images/favicons/favicon32.png",
    shortcut: "https://static-site.onlyoffice.com/public/images/favicons/favicon32.png",
    apple: "https://static-site.onlyoffice.com/public/images/favicons/favicon150.png",
  },
  openGraph: {
    title: "Online Office Applications for business",
    description:
      "ONLYOFFICE offers a secure online office suite highly compatible with MS Office formats. Connect it to your web platform for document editing and collaboration or use as a part of ONLYOFFICE Workspace.",
    url: "https://www.onlyoffice.com",
    siteName: "ONLYOFFICE",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div id="__next">
          <div className="layout">{children}</div>
        </div>
      </body>
    </html>
  );
}
