import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ONLYOFFICE Vietnam — Bộ Ứng Dụng Văn Phòng Bảo Mật",
    short_name: "ONLYOFFICE",
    description: "Bộ ứng dụng văn phòng trực tuyến bảo mật toàn diện cho doanh nghiệp Việt Nam. Soạn thảo văn bản, bảng tính, thuyết trình, PDF và biểu mẫu.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ff6f3d",
    icons: [
      {
        src: "https://static-site.onlyoffice.com/public/images/favicons/favicon32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "https://static-site.onlyoffice.com/public/images/favicons/favicon150.png",
        sizes: "150x150",
        type: "image/png",
      },
      {
        src: "https://download.onlyoffice.com/assets/fb/fb_icon_325x325.jpg",
        sizes: "325x325",
        type: "image/jpeg",
      },
    ],
  };
}
