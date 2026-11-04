import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/caidat",
        destination: "/huong-dan-cai-dat",
        permanent: true,
      },
      {
        source: "/huongdancaidat",
        destination: "/huong-dan-cai-dat",
        permanent: true,
      },
      {
        source: "/cai-dat",
        destination: "/huong-dan-cai-dat",
        permanent: true,
      },
      {
        source: "/huongdan",
        destination: "/huong-dan-cai-dat",
        permanent: true,
      },
      {
        source: "/huong-dan",
        destination: "/huong-dan-cai-dat",
        permanent: true,
      },
      {
        source: "/setup",
        destination: "/huong-dan-cai-dat",
        permanent: true,
      },
      {
        source: "/install",
        destination: "/huong-dan-cai-dat",
        permanent: true,
      },
      {
        source: "/install-guide",
        destination: "/huong-dan-cai-dat",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/documenteditor/:path*",
        destination: "https://site.docs.onlyoffice.com/web-apps/apps/documenteditor/:path*",
      },
      {
        source: "/spreadsheeteditor/:path*",
        destination: "https://site.docs.onlyoffice.com/web-apps/apps/spreadsheeteditor/:path*",
      },
      {
        source: "/presentationeditor/:path*",
        destination: "https://site.docs.onlyoffice.com/web-apps/apps/presentationeditor/:path*",
      },
      {
        source: "/pdfeditor/:path*",
        destination: "https://site.docs.onlyoffice.com/web-apps/apps/pdfeditor/:path*",
      },
      {
        source: "/web-apps/apps/:path*",
        destination: "https://site.docs.onlyoffice.com/web-apps/apps/:path*",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
