import { removeVietnameseTones } from "@/lib/vietnamese-tones";
import {
  getFaqs,
  getBotSettings,
  getKnowledgeCacheRevision,
  bumpKnowledgeCacheRevision,
} from "@/features/ai-assistant-admin/services/ai-admin-storage.service";
import type {
  KnowledgeArticle,
  KnowledgeArticleStatus,
  KnowledgeAudience,
  KnowledgeChunk,
  SupportCitation,
  SupportIntent,
  SupportOS,
  SupportOwnerContext,
  SupportProduct,
} from "../types/support.types";

const BASE_ARTICLES: KnowledgeArticle[] = [
  {
    articleId: "kb_overview_onlyoffice_mercy",
    title: "Tổng quan tính năng ONLYOFFICE & Bộ tiện ích tiếng Việt của Mercy Tech",
    titleEn: "Overview of ONLYOFFICE Features & Mercy Tech Vietnamese Utilities",
    summary:
      "Giới thiệu các phân hệ soạn thảo Văn bản, Bảng tính, Trình chiếu, PDF và bộ 3 tiện ích tiếng Việt tích hợp sẵn của Mercy Tech.",
    product: ["desktop_editors", "mercy_installer"],
    edition: ["mercy_service", "community", "unknown"],
    os: ["windows", "macos", "linux", "unknown"],
    versionRange: ">=8.0",
    issueType: ["how_to_use"],
    audience: "public",
    sourceName: "Tài liệu Kỹ thuật Mercy Tech",
    sourceUrl: "/comparison",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.0",
    symptoms: [
      "onlyoffice có những tính năng gì",
      "bộ 3 tiện ích tiếng việt gồm những gì",
      "bộ cài mercy có gì đặc biệt",
      "so sánh onlyoffice với word excel",
    ],
    applicableConditions: "Áp dụng cho khách hàng tìm hiểu tính năng bộ phần mềm văn phòng ONLYOFFICE do Mercy Tech triển khai.",
    diagnosticQuestions: [
      "Anh/chị đang quan tâm dùng cho cá nhân hay triển khai đồng bộ nhiều máy cho doanh nghiệp?",
    ],
    safeSteps: [
      "Soạn thảo đồng bộ trên 1 cửa sổ duy nhất: Văn bản (.docx), Bảng tính (.xlsx), Trình chiếu (.pptx) và đọc/chú thích PDF chuẩn bố cục.",
      "Tích hợp sẵn bộ 3 tiện ích tiếng Việt trên bộ cài Windows Mercy: Chuẩn Hóa Font Tiếng Việt (TCVN3/VNI sang Unicode), Đọc Số Thành Chữ kế toán và Chuyển Công Thức Toán.",
      "Trải nghiệm thực tế với chế độ Dùng thử 7 ngày miễn phí và được kỹ thuật viên Mercy Tech hỗ trợ cài đặt từ xa khi cần.",
    ],
    safeStepsEn: [
      "Edit Documents (.docx), Spreadsheets (.xlsx), Presentations (.pptx), and PDFs inside a unified tabbed workspace.",
      "Includes Mercy Tech's 3 Vietnamese productivity plugins on Windows: Font Converter (TCVN3/VNI to Unicode), Number-to-Words for accounting, and Math Formula tools.",
      "Evaluate compatibility cleanly with the official 7-day free trial and remote technician support.",
    ],
    expectedResult: "Nắm rõ các phân hệ văn phòng và tiện ích tiếng Việt trước khi tải cài đặt.",
    stopConditions: "Lưu ý bộ 3 tiện ích mở rộng tích hợp tự động hiện tối ưu cho bộ cài Windows 64-bit.",
    escalateWhen: "Đơn vị cần tư vấn triển khai số lượng lớn hoặc tích hợp máy chủ nội bộ.",
    chunks: [
      {
        chunkId: "chk_overview_mercy_01",
        articleId: "kb_overview_onlyoffice_mercy",
        version: "1.0",
        sectionTitle: "Các phân hệ văn phòng và bộ 3 tiện ích tiếng Việt",
        content:
          "ONLYOFFICE Desktop Editors hỗ trợ mở và chỉnh sửa mượt mà hầu hết các tệp Word (.docx), Excel (.xlsx), PowerPoint (.pptx) và PDF. Gói triển khai của Mercy Tech trên Windows tích hợp sẵn 3 tiện ích tiếng Việt (Chuẩn hóa Font, Đọc số thành chữ, Công thức Toán), kèm chế độ Dùng thử 7 ngày và hỗ trợ kỹ thuật trực tiếp.",
        contentEn:
          "ONLYOFFICE Desktop Editors supports Word (.docx), Excel (.xlsx), PowerPoint (.pptx), and PDF files, enhanced on Windows by Mercy Tech's 3 Vietnamese plugins and a 7-day trial.",
        keywords: ["so sánh", "tiện ích tiếng việt", "3 tiện ích", "all-in-one", "word excel"],
      },
    ],
  },
  {
    articleId: "kb_install_win_allinone",
    title: "Cài đặt bộ cài ONLYOFFICE Mercy All-in-One trên Windows 10/11",
    titleEn: "Installing ONLYOFFICE Mercy All-in-One Installer on Windows 10/11",
    summary:
      "Tải trực tiếp bộ cài All-in-One tự động nạp trọn bộ tiện ích tiếng Việt và hướng dẫn kích hoạt bản quyền / dùng thử 7 ngày.",
    product: ["mercy_installer", "desktop_editors"],
    edition: ["mercy_service", "community"],
    os: ["windows"],
    versionRange: ">=8.0",
    issueType: ["how_to_use", "technical_error"],
    audience: "public",
    sourceName: "Sổ tay Kỹ thuật & Bộ Cài Đặt Mercy Tech",
    sourceUrl: "/my-license/download",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "2.0",
    symptoms: [
      "cài đặt onlyoffice trên windows",
      "tải bộ cài all-in-one",
      "setup-onlyoffice-mercy.exe",
      "cài phần mềm máy tính win 10 win 11",
      "link tải bộ cài",
      "hướng dẫn cài đặt phần mềm",
      "chọn và cài đặt phần mềm onlyoffice đúng hệ điều hành",
      "tải phần mềm onlyoffice",
      "cài đặt onlyoffice",
      "download onlyoffice mercy",
      "tải bộ cài",
    ],
    applicableConditions: "Áp dụng cho máy tính chạy Windows 10 hoặc Windows 11 (64-bit), tối ưu hóa trọn gói bởi Mercy Tech.",
    diagnosticQuestions: [],
    safeSteps: [
      "Tải bộ cài All-in-One: Nhấp vào nút [Tải Setup-OnlyOffice-Mercy.exe (~7.1MB)](/Setup-OnlyOffice-Mercy.exe) (hoặc xem trang [Hướng Dẫn Tải & Cài Đặt Chi Tiết](/my-license/download)).",
      "Chạy cài đặt: Mở thư mục Downloads, nhấp đúp vào file `Setup-OnlyOffice-Mercy.exe` (hoặc chuột phải chọn Run as administrator).",
      "Kích hoạt hoặc Dùng thử 7 ngày: Nếu có Tem cào Hologram hoặc Key bản quyền, nhập mã vào ô. Nếu muốn trải nghiệm dùng thử, ĐỂ TRỐNG Ô MÃ rồi bấm nút 'CÀI ĐẶT & DÙNG THỬ 7 NGÀY (MIỄN PHÍ)'.",
      "Hoàn tất: Trình cài đặt tự động tích hợp sẵn bộ 3 tiện ích tiếng Việt (Chuẩn hóa font .VnTime/VNI, Đọc số thành chữ, Chuyển công thức toán) và tạo biểu tượng ONLYOFFICE ra màn hình Desktop.",
    ],
    safeStepsEn: [
      "Download the All-in-One installer: Click [Download Setup-OnlyOffice-Mercy.exe (~7.1MB)](/Setup-OnlyOffice-Mercy.exe) or visit [Detailed Installation Guide](/my-license/download).",
      "Run the installer: Double-click `Setup-OnlyOffice-Mercy.exe` from your Downloads folder (Run as administrator).",
      "Activate or Start 7-Day Free Trial: Enter your license key/scratch sticker code, or LEAVE THE CODE FIELD BLANK to activate the 7-day full trial.",
      "Done: The installer automatically integrates 3 Vietnamese productivity plugins and puts ONLYOFFICE shortcut on your Desktop.",
    ],
    expectedResult: "ONLYOFFICE Editors mở lên hoàn tất với đầy đủ 3 tiện ích tiếng Việt độc quyền và giấy chứng nhận bản quyền/dùng thử trên Desktop.",
    stopConditions: "Nếu dùng macOS (MacBook), tải [Bộ Cài macOS (.zip)](/downloads/Setup-OnlyOffice-Mercy-Mac.zip); không dùng file .exe trên macOS.",
    escalateWhen: "Máy báo lỗi hệ thống hoặc cần kỹ thuật viên Mercy Tech hỗ trợ cài đặt từ xa qua UltraViewer.",
    chunks: [
      {
        chunkId: "chk_install_win_01",
        articleId: "kb_install_win_allinone",
        version: "2.0",
        sectionTitle: "Tải và cài đặt trọn gói ONLYOFFICE Mercy All-in-One",
        content:
        "Tải trực tiếp bộ cài [Tải Setup-OnlyOffice-Mercy.exe (~7.1MB)](/Setup-OnlyOffice-Mercy.exe) cho Windows 10/11 (64-bit). File cài All-in-One siêu nhẹ (~7.1MB), tự động thiết lập và nạp sẵn trọn bộ 3 tiện ích tiếng Việt độc quyền (Chuẩn hóa Font TCVN3/.VnTime/VNI, Đọc số thành chữ, Chuyển công thức Toán). Khi cài đặt, chỉ cần để trống ô mã key và bấm 'Cài đặt' là nhận ngay bản quyền dùng thử Demo 7 ngày đầy đủ tính năng. Xem hướng dẫn hình ảnh từng bước tại [Hướng Dẫn Tải & Cài Đặt Chi Tiết](/my-license/download). Ngoài ra có thể tải [Bộ Font Tiếng Việt Chuẩn](/Bo-Font-Chuan-Mercy.zip) hoặc [Bộ Cài macOS](/downloads/Setup-OnlyOffice-Mercy-Mac.zip).",
        contentEn:
        "Download official [Setup-OnlyOffice-Mercy.exe (~7.1MB)](/Setup-OnlyOffice-Mercy.exe) for Windows 10/11 (64-bit). Automatically integrates Vietnamese plugins and grants a 7-day free trial when leaving the key field blank. See [Detailed Installation Guide](/my-license/download).",
        keywords: [
          "cài đặt",
          "install",
          "windows",
          "win 10",
          "win 11",
          "all-in-one",
          "bộ cài",
          "tải phần mềm",
          "download",
          "link tải",
          "bộ cài của tôi",
          "hướng dẫn cài đặt",
          "setup-onlyoffice-mercy.exe",
        ],
      },
    ],
  },
  {
    articleId: "kb_install_macos",
    title: "Cài đặt ONLYOFFICE Desktop Editors trên macOS (Intel & Apple Silicon)",
    titleEn: "Installing ONLYOFFICE Desktop Editors on macOS (Intel & Apple Silicon)",
    summary:
      "Hướng dẫn chọn đúng gói .dmg cho chip Apple Silicon (M1/M2/M3/M4) hoặc chip Intel trên máy Mac.",
    product: ["desktop_editors"],
    edition: ["community", "enterprise", "unknown"],
    os: ["macos"],
    versionRange: ">=8.0",
    issueType: ["how_to_use", "technical_error"],
    audience: "public",
    sourceName: "Hướng dẫn Cài đặt Đa nền tảng ONLYOFFICE",
    sourceUrl: "/download",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.1",
    symptoms: [
      "cài trên macbook",
      "macos m1 m2 m3 intel",
      "không mở được file exe trên mac",
      "install onlyoffice on mac",
    ],
    applicableConditions: "Áp dụng cho macOS 11 trở lên (cần phân biệt chip Apple Silicon ARM64 và Intel x86_64).",
    diagnosticQuestions: [
      "Máy Mac của anh/chị đang dùng chip Apple M1/M2/M3/M4 hay chip Intel (xem trong menu Apple > Giới thiệu về máy Mac này)?",
    ],
    safeSteps: [
      "Kiểm tra loại chip tại menu Apple (góc trên bên trái) -> About This Mac (Giới thiệu về máy Mac này).",
      "Tải đúng gói cài đặt định dạng .dmg dành cho Apple Silicon (ARM) hoặc Intel (x64); không tải tệp .exe của Windows.",
      "Mở tệp .dmg vừa tải, kéo biểu tượng ONLYOFFICE vào thư mục Applications, sau đó mở ứng dụng từ Launchpad/Applications.",
    ],
    safeStepsEn: [
      "Check your Mac processor under Apple menu -> About This Mac (Apple Silicon M-series vs Intel).",
      "Download the matching .dmg package for macOS (ARM64 for Apple Silicon or x86_64 for Intel); do not use Windows .exe files.",
      "Open the .dmg file, drag ONLYOFFICE into the Applications folder, and launch it from Applications.",
    ],
    expectedResult: "Ứng dụng ONLYOFFICE chạy trực tiếp từ thư mục Applications trên macOS mà không báo lỗi định dạng tệp.",
    stopConditions: "Nếu macOS báo ứng dụng cần xác minh Gatekeeper, chỉ mở qua System Settings > Privacy & Security theo quy chuẩn Apple.",
    escalateWhen: "Đã chọn đúng gói .dmg theo chip nhưng ứng dụng thoát đột ngột khi khởi động.",
    chunks: [
      {
        chunkId: "chk_install_mac_01",
        articleId: "kb_install_macos",
        version: "1.1",
        sectionTitle: "Chọn gói .dmg theo chip Apple Silicon hoặc Intel trên macOS",
        content:
          "Máy Mac (macOS) không chạy được tệp .exe của Windows. Cần kiểm tra mục About This Mac để tải đúng gói .dmg cho chip Apple Silicon (M1/M2/M3/M4 - ARM) hoặc chip Intel (x86_64), sau đó kéo biểu tượng ONLYOFFICE vào thư mục Applications.",
        contentEn:
          "macOS cannot run Windows .exe installers. Check About This Mac and download the .dmg package matching Apple Silicon (ARM64) or Intel (x86_64), then drag ONLYOFFICE to Applications.",
        keywords: ["macos", "macbook", "mac", "dmg", "apple silicon", "m1", "m2", "m3", "intel", "install mac"],
      },
    ],
  },
  {
    articleId: "kb_install_linux",
    title: "Cài đặt ONLYOFFICE Desktop Editors trên Linux (Ubuntu/Debian/Fedora)",
    titleEn: "Installing ONLYOFFICE Desktop Editors on Linux",
    summary: "Hướng dẫn chọn gói .deb, .rpm, Flatpak hoặc AppImage cho bản phân phối Linux tương ứng.",
    product: ["desktop_editors"],
    edition: ["community", "enterprise", "unknown"],
    os: ["linux"],
    versionRange: ">=8.0",
    issueType: ["how_to_use", "technical_error"],
    audience: "public",
    sourceName: "Hướng dẫn Cài đặt Đa nền tảng ONLYOFFICE",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.0",
    symptoms: ["ubuntu", "debian", "fedora", "linux", "appimage", "flatpak", "deb", "rpm"],
    applicableConditions: "Áp dụng cho Linux 64-bit (Ubuntu/Debian dùng .deb, RHEL/Fedora dùng .rpm, hoặc bản AppImage).",
    diagnosticQuestions: ["Anh/chị đang dùng bản phân phối Linux nào (ví dụ Ubuntu, Linux Mint hay Fedora)?"],
    safeSteps: [
      "Xác định bản phân phối Linux đang dùng (Ubuntu/Debian chọn gói .deb, Fedora/RHEL chọn .rpm, hoặc chọn AppImage chạy trực tiếp).",
      "Tải gói cài đặt chính thức tương ứng với kiến trúc x86_64.",
      "Cài đặt qua trình quản lý gói của hệ điều hành và mở ứng dụng kiểm tra font chữ hiển thị.",
    ],
    safeStepsEn: [
      "Identify your Linux distribution (.deb for Ubuntu/Debian, .rpm for Fedora/RHEL, or portable AppImage).",
      "Download the official 64-bit package matching your distribution.",
      "Install via your system package manager and launch ONLYOFFICE Desktop Editors.",
    ],
    expectedResult: "ONLYOFFICE Desktop Editors mở bình thường trên môi trường Desktop Linux.",
    stopConditions: "Không chạy script tải từ nguồn không chính thức.",
    escalateWhen: "Xung đột thư viện phụ thuộc (dependency) không giải quyết được qua kho gói chuẩn.",
    chunks: [
      {
        chunkId: "chk_install_linux_01",
        articleId: "kb_install_linux",
        version: "1.0",
        sectionTitle: "Cài đặt trên Ubuntu, Debian, Fedora",
        content:
          "Trên Linux 64-bit, sử dụng gói .deb cho Ubuntu/Debian/Mint, gói .rpm cho Fedora/RHEL, hoặc gói AppImage/Flatpak chính thức của ONLYOFFICE Desktop Editors.",
        contentEn:
          "On 64-bit Linux, use the .deb package for Ubuntu/Debian, .rpm for Fedora/RHEL, or the official AppImage/Flatpak build.",
        keywords: ["linux", "ubuntu", "debian", "fedora", "deb", "rpm", "appimage", "flatpak"],
      },
    ],
  },
  {
    articleId: "kb_install_mobile",
    title: "Sử dụng ứng dụng ONLYOFFICE Documents trên Android và iOS/iPadOS",
    titleEn: "Using ONLYOFFICE Documents on Android and iOS/iPadOS",
    summary: "Hướng dẫn tải ứng dụng di động từ Google Play hoặc App Store để xem và sửa tài liệu.",
    product: ["desktop_editors", "docspace"],
    edition: ["community", "unknown"],
    os: ["android", "ios"],
    versionRange: "all",
    issueType: ["how_to_use"],
    audience: "public",
    sourceName: "Tài liệu Kỹ thuật Mercy Tech",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.0",
    symptoms: ["điện thoại", "iphone", "ipad", "android", "app store", "google play"],
    applicableConditions: "Áp dụng cho điện thoại và máy tính bảng Android hoặc iOS/iPadOS.",
    diagnosticQuestions: ["Anh/chị đang mở tài liệu lưu trên máy hay kết nối đám mây DocSpace?"],
    safeSteps: [
      "Mở App Store (iPhone/iPad) hoặc Google Play (Android) và tìm ứng dụng chính thức 'ONLYOFFICE Documents'.",
      "Cài đặt ứng dụng và mở tệp từ mục Trên thiết bị (On device) hoặc kết nối kho lưu trữ đám mây nếu có.",
    ],
    safeStepsEn: [
      "Open the App Store (iOS/iPadOS) or Google Play Store (Android) and install the official 'ONLYOFFICE Documents' app.",
      "Open local files from the On device tab or connect to your cloud portal if applicable.",
    ],
    expectedResult: "Xem và chỉnh sửa được tệp văn bản, bảng tính trên thiết bị di động.",
    stopConditions: "Lưu ý bộ cài tiện ích Mercy (.exe) trên Windows không cài vào điện thoại.",
    escalateWhen: "Tài khoản đám mây doanh nghiệp báo lỗi xác thực trên di động.",
    chunks: [
      {
        chunkId: "chk_install_mobile_01",
        articleId: "kb_install_mobile",
        version: "1.0",
        sectionTitle: "Ứng dụng di động ONLYOFFICE Documents",
        content:
          "Trên Android và iPhone/iPad, cài ứng dụng chính thức 'ONLYOFFICE Documents' từ Google Play hoặc App Store. Lưu ý bộ tiện ích mở rộng trên Windows không áp dụng cho bản di động.",
        contentEn:
          "On Android and iOS/iPadOS, install the official 'ONLYOFFICE Documents' app from Google Play or the App Store.",
        keywords: ["android", "ios", "iphone", "ipad", "mobile", "điện thoại", "google play", "app store"],
      },
    ],
  },
  {
    articleId: "kb_error_vcruntime_dll",
    title: "Xử lý thông báo thiếu VCRUNTIME140_1.dll hoặc MSVCP140.dll trên Windows",
    titleEn: "Fixing missing VCRUNTIME140_1.dll or MSVCP140.dll error on Windows",
    summary:
      "Khắc phục lỗi thiếu thư viện Microsoft Visual C++ Redistributable khi mở hoặc cài đặt ứng dụng trên Windows.",
    product: ["desktop_editors", "mercy_installer"],
    edition: ["mercy_service", "community", "enterprise", "unknown"],
    os: ["windows"],
    versionRange: ">=7.5",
    issueType: ["technical_error"],
    audience: "public",
    sourceName: "Tài liệu Kỹ thuật Mercy Tech",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.1",
    symptoms: [
      "vcruntime140_1.dll",
      "vcruntime140.dll",
      "msvcp140.dll",
      "system error dll was not found",
      "thiếu file dll",
    ],
    applicableConditions: "Áp dụng cho Windows 10/11 hiển thị hộp thoại System Error báo thiếu tệp VCRUNTIME140*.dll hoặc MSVCP140.dll.",
    diagnosticQuestions: [
      "Hộp thoại trên màn hình báo thiếu tên tệp .dll cụ thể nào và máy đang dùng Windows 64-bit hay 32-bit?",
    ],
    safeSteps: [
      "Đóng hộp thoại thông báo lỗi và thoát các cửa sổ ONLYOFFICE đang mở.",
      "Cài bổ sung gói Microsoft Visual C++ Redistributable 2015–2022 (bản x64 cho Windows 64-bit) từ nguồn chính thức của Microsoft, hoặc chạy lại trình cài đặt Mercy dưới quyền quản trị để bổ sung runtime.",
      "Khởi động lại máy tính nếu trình cài đặt yêu cầu, sau đó mở lại ONLYOFFICE để kiểm tra.",
    ],
    safeStepsEn: [
      "Close the error dialog and any running ONLYOFFICE windows.",
      "Install the official Microsoft Visual C++ Redistributable 2015–2022 (x64 for 64-bit Windows), or re-run the Mercy installer to repair missing runtime libraries.",
      "Restart Windows if prompted, then launch ONLYOFFICE again to verify.",
    ],
    expectedResult: "Hộp thoại thiếu DLL không còn xuất hiện và ứng dụng mở vào giao diện chính.",
    stopConditions: "Tuyệt đối không tải các tệp .dll rời rạc từ trang web không rõ nguồn gốc chép đè vào System32.",
    escalateWhen: "Đã cài Visual C++ Redistributable chính thức nhưng vẫn báo lỗi mã 0xc000007b hoặc thiếu tệp khác.",
    chunks: [
      {
        chunkId: "chk_dll_vcruntime_01",
        articleId: "kb_error_vcruntime_dll",
        version: "1.1",
        sectionTitle: "Bổ sung Visual C++ Redistributable an toàn",
        content:
          "Lỗi VCRUNTIME140_1.dll hoặc MSVCP140.dll xảy ra khi Windows thiếu thư viện Microsoft Visual C++ Redistributable 2015–2022. Xử lý an toàn bằng cách cài gói Visual C++ Redistributable chính thức hoặc chạy lại bộ cài Mercy; tuyệt đối không tải file .dll lẻ trôi nổi chép vào System32.",
        contentEn:
          "Missing VCRUNTIME140_1.dll or MSVCP140.dll indicates missing Microsoft Visual C++ Redistributable 2015–2022. Install the official Microsoft package or re-run the Mercy installer; never copy loose .dll files from third-party websites into System32.",
        keywords: ["vcruntime140_1.dll", "vcruntime140", "msvcp140.dll", "dll", "system error", "0xc000007b", "visual c++"],
      },
    ],
  },
  {
    articleId: "kb_app_not_launching",
    title: "Ứng dụng ONLYOFFICE không mở lên hoặc bị kẹt tiến trình nền",
    titleEn: "ONLYOFFICE Desktop Editors does not open or hangs in background",
    summary:
      "Kiểm tra tiến trình nền và khởi động lại ứng dụng an toàn trước khi cân nhắc cài đặt lại.",
    product: ["desktop_editors", "mercy_installer"],
    edition: ["mercy_service", "community", "enterprise", "unknown"],
    os: ["windows", "macos", "linux"],
    versionRange: "all",
    issueType: ["technical_error"],
    audience: "public",
    sourceName: "Tài liệu Kỹ thuật Mercy Tech",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.0",
    symptoms: ["không mở được", "bấm đúp không lên", "treo khởi động", "not opening", "won't start"],
    applicableConditions: "Áp dụng khi bấm biểu tượng ứng dụng nhưng cửa sổ không hiện ra (không mặc định yêu cầu gỡ cài đặt).",
    diagnosticQuestions: [
      "Khi anh/chị bấm mở ứng dụng thì hoàn toàn không có hiện tượng gì hay có hiện thông báo lỗi nào không?",
      "Anh/chị đang mở biểu tượng ứng dụng hay bấm đúp trực tiếp vào một tệp tài liệu cụ thể?",
    ],
    safeSteps: [
      "Đảm bảo các tệp tài liệu đang làm dở ở ứng dụng khác đã được lưu; sau đó kiểm tra Task Manager (Windows) hoặc Activity Monitor (macOS) xem có tiến trình 'DesktopEditors' bị treo hay không.",
      "Nếu có tiến trình DesktopEditors đang treo mà không hiện cửa sổ, chọn End task / Quit tiến trình đó rồi thử mở lại ứng dụng từ biểu tượng chính.",
      "Thử mở ứng dụng trống (không mở trực tiếp tệp nặng) để phân biệt lỗi ứng dụng với lỗi riêng của một tệp tài liệu.",
    ],
    safeStepsEn: [
      "Check Task Manager (Windows) or Activity Monitor (macOS) to see if a 'DesktopEditors' background process is stuck.",
      "If stuck without a visible window, end that process cleanly and launch ONLYOFFICE Editors from its main icon.",
      "Test opening the empty app first to separate an application launch issue from a specific heavy document.",
    ],
    expectedResult: "Xác định được cửa sổ chính mở bình thường hay bị chặn bởi tiến trình treo.",
    stopConditions: "Không gỡ cài đặt hoặc xóa thư mục cấu hình khi chưa xác minh nguyên nhân.",
    escalateWhen: "Đã khởi động lại máy tính và mở ứng dụng trống nhưng vẫn không lên cửa sổ.",
    chunks: [
      {
        chunkId: "chk_app_hang_01",
        articleId: "kb_app_not_launching",
        version: "1.0",
        sectionTitle: "Kiểm tra tiến trình treo mà không cần gỡ cài đặt",
        content:
          "Khi bấm mở ONLYOFFICE không lên cửa sổ, không mặc định gỡ cài đặt. Hãy kiểm tra Task Manager (Windows) hoặc Activity Monitor (macOS), đóng tiến trình DesktopEditors bị kẹt nếu có, rồi thử mở ứng dụng trống thay vì bấm trực tiếp vào file tài liệu.",
        contentEn:
          "When ONLYOFFICE fails to open, do not immediately uninstall. Check Task Manager or Activity Monitor for a stuck DesktopEditors process, close it, and launch the main app window directly.",
        keywords: ["không mở được", "treo", "không lên", "task manager", "desktopeditors", "won't launch", "hang"],
      },
    ],
  },
  {
    articleId: "kb_mercy_trial_7days",
    title: "Hướng dẫn sử dụng chế độ Dùng thử 7 ngày trên bộ cài Mercy",
    titleEn: "Activating the 7-day Trial Mode on Mercy Installer",
    summary: "Cách bật chế độ dùng thử 7 ngày miễn phí trên bộ cài ONLYOFFICE Mercy để trải nghiệm thực tế.",
    product: ["mercy_installer", "mercy_keys"],
    edition: ["mercy_service"],
    os: ["windows"],
    versionRange: ">=1.0",
    issueType: ["how_to_use", "license_or_package_query"],
    audience: "public",
    sourceName: "Tài liệu Dịch vụ Mercy Tech",
    owner: "CSKH Mercy Tech",
    approvedBy: "Vy Thiên Hùng",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.1",
    symptoms: ["dùng thử", "demo 7 ngày", "trial", "trải nghiệm miễn phí"],
    applicableConditions: "Áp dụng cho khách hàng lần đầu trải nghiệm bộ cài ONLYOFFICE tối ưu bởi Mercy Tech trên Windows.",
    diagnosticQuestions: [
      "Trên màn hình máy tính anh/chị đã mở được cửa sổ Kích hoạt của bộ cài Mercy chưa?",
    ],
    safeSteps: [
      "Mở ứng dụng ONLYOFFICE Mercy trên Windows để hiển thị hộp thoại Kích hoạt.",
      "Tại cửa sổ này, chọn nút 'Dùng thử 7 ngày' (không cần điền mã kích hoạt nếu đang bắt đầu trải nghiệm).",
      "Đợi hệ thống xác nhận kích hoạt trải nghiệm 7 ngày và mở thử một tệp Word/Excel bản sao để kiểm tra font chữ.",
    ],
    safeStepsEn: [
      "Launch ONLYOFFICE Mercy on Windows to open the Activation dialog.",
      "Click the '7-Day Trial' ('Dùng thử 7 ngày') button without entering a license key.",
      "Once confirmed, open a sample Word or Excel file to verify formatting and Vietnamese utilities.",
    ],
    expectedResult: "Ứng dụng chuyển sang trạng thái dùng thử 7 ngày và sử dụng được các tiện ích tiếng Việt.",
    stopConditions: "Nếu máy tính báo đã hết lượt dùng thử 7 ngày trên thiết bị đó, không thử can thiệp hệ thống.",
    escalateWhen: "Máy chưa từng dùng thử nhưng báo không thể kích hoạt chế độ 7 ngày.",
    chunks: [
      {
        chunkId: "chk_trial_7d_01",
        articleId: "kb_mercy_trial_7days",
        version: "1.1",
        sectionTitle: "Kích hoạt Dùng thử 7 ngày",
        content:
          "Chế độ dùng thử chính thức của bộ cài Mercy có thời hạn đúng 7 ngày (DEMO 7 NGÀY). Trong cửa sổ kích hoạt, khách bấm 'Dùng thử 7 ngày' để trải nghiệm soạn thảo và 3 tiện ích tiếng Việt trên máy tính của mình.",
        contentEn:
          "Mercy Tech offers a 7-day free trial (7-Day Demo) on its Windows package. In the activation dialog, select 'Dùng thử 7 ngày' to test document compatibility and Vietnamese utilities.",
        keywords: ["dùng thử", "demo 7 ngày", "7 ngày", "trial", "free trial", "miễn phí"],
      },
    ],
  },
  {
    articleId: "kb_mercy_activate_key",
    title: "Hướng dẫn nhập mã kích hoạt hoặc mã tem cào vật lý Mercy",
    titleEn: "Activating a Mercy Digital Key or Physical Scratch Sticker",
    summary: "Cách nhập đúng định dạng mã kích hoạt điện tử hoặc mã cào 12 số trên bộ cài Mercy.",
    product: ["mercy_keys", "mercy_installer"],
    edition: ["mercy_service"],
    os: ["windows"],
    versionRange: ">=1.0",
    issueType: ["license_or_package_query", "how_to_use", "technical_error"],
    audience: "public",
    sourceName: "Tài liệu Dịch vụ Mercy Tech",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.2",
    symptoms: ["nhập key", "kích hoạt bản quyền", "tem cào vật lý", "mã cào 12 số", "sai định dạng key"],
    applicableConditions: "Áp dụng cho khách hàng sở hữu mã kích hoạt điện tử hoặc tem cào vật lý Mercy Tech.",
    diagnosticQuestions: [
      "Anh/chị đang dùng mã điện tử trong tài khoản hay mã cào trên tem vật lý? (Lưu ý: vui lòng KHÔNG gửi mã đầy đủ vào khung chat).",
    ],
    safeSteps: [
      "Kiểm tra kết nối Internet ổn định trên máy tính trước khi bấm kích hoạt.",
      "Sao chép chính xác mã từ cổng Tài khoản Mercy (hoặc nhập đúng dãy số trên tem cào, kiểm tra không dư khoảng trắng ở đầu/cuối).",
      "Bấm Xác nhận kích hoạt và quan sát thông báo phản hồi trên hộp thoại.",
    ],
    safeStepsEn: [
      "Ensure your PC has an active internet connection before activating.",
      "Enter or paste the code from your Mercy Account portal or physical scratch card without leading/trailing spaces (do not paste your full code in chat).",
      "Click Activate and observe the confirmation message.",
    ],
    expectedResult: "Hộp thoại xác nhận thiết bị đã kích hoạt thành công.",
    stopConditions: "Tuyệt đối không gửi ảnh lộ rõ toàn bộ mã cào 12 số hoặc key đầy đủ chưa che vào khung chat.",
    escalateWhen: "Hệ thống báo mã đã gắn với thiết bị khác khi khách vừa cài lại Windows hoặc thay phần cứng.",
    chunks: [
      {
        chunkId: "chk_activate_key_01",
        articleId: "kb_mercy_activate_key",
        version: "1.2",
        sectionTitle: "Lưu ý khi nhập mã kích hoạt hoặc tem cào",
        content:
          "Khi kích hoạt trên bộ cài Mercy, kiểm tra kết nối mạng và đảm bảo không thừa khoảng trắng khi dán mã. Không dán mã kích hoạt đầy đủ hoặc chụp rõ mã tem cào chưa che vào cuộc trò chuyện. Nếu cần kiểm tra mã theo tài khoản, hãy đăng nhập trên website.",
        contentEn:
          "Verify internet connectivity and trim extra spaces when entering your Mercy key or scratch code. Never paste full license keys into chat.",
        keywords: ["kích hoạt", "nhập key", "tem cào", "mã cào", "activate", "license key", "seri"],
      },
    ],
  },
  {
    articleId: "kb_mercy_connection_error",
    title: "Hộp thoại báo không kết nối được máy chủ khi mở hoặc kích hoạt bộ cài Mercy",
    titleEn: "Cannot connect to server dialog during Mercy activation or startup",
    summary:
      "Phân biệt lỗi kết nối mạng/tường lửa/proxy với trạng thái mã kích hoạt; không suy diễn mã hết hạn từ lỗi mạng.",
    product: ["mercy_installer", "mercy_keys"],
    edition: ["mercy_service"],
    os: ["windows"],
    versionRange: "all",
    issueType: ["technical_error", "license_or_package_query"],
    audience: "public",
    sourceName: "Tài liệu Kỹ thuật Mercy Tech",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.1",
    symptoms: [
      "không kết nối được máy chủ",
      "cannot connect to server",
      "connection timed out",
      "lỗi mạng kích hoạt",
      "unable to reach server",
    ],
    applicableConditions: "Áp dụng khi xuất hiện thông báo không kết nối được máy chủ xác thực.",
    diagnosticQuestions: [
      "Trình duyệt trên máy đó có mở được trang https://onlyoffice.mercytechglobal.com bình thường không, và máy có đang dùng VPN hoặc Proxy nội bộ công ty không?",
    ],
    safeSteps: [
      "Lưu ý: Thông báo không kết nối được máy chủ chỉ phản ánh gián đoạn đường truyền tới máy chủ xác thực, chưa phải kết luận mã kích hoạt hết hạn hay bị thu hồi.",
      "Mở trình duyệt web trên cùng máy tính và thử truy cập https://onlyoffice.mercytechglobal.com để kiểm tra đường truyền DNS/HTTPS.",
      "Nếu máy đang bật VPN hoặc mạng công ty có Proxy giới hạn cổng ra ngoài, thử kiểm tra trên mạng tiêu chuẩn hoặc liên hệ bộ phận mạng nội bộ cho phép kết nối HTTPS chuẩn (cổng 443).",
    ],
    safeStepsEn: [
      "Note: A server connection error indicates a network/connectivity interruption, NOT that your license key is expired or revoked.",
      "Open a browser on the same PC and test reaching https://onlyoffice.mercytechglobal.com over standard HTTPS.",
      "If using a VPN or corporate proxy, test without VPN or ask IT to allow standard outbound HTTPS (port 443) to the portal domain.",
    ],
    expectedResult: "Kết nối xác thực thông suốt khi đường truyền HTTPS tới máy chủ ổn định.",
    stopConditions: "Tuyệt đối không tắt tường lửa Windows hoặc bỏ qua kiểm tra chứng chỉ SSL.",
    escalateWhen: "Trình duyệt vào được website bình thường nhưng ứng dụng vẫn báo không kết nối được máy chủ.",
    chunks: [
      {
        chunkId: "chk_conn_err_01",
        articleId: "kb_mercy_connection_error",
        version: "1.1",
        sectionTitle: "Phân biệt lỗi kết nối máy chủ và trạng thái Key",
        content:
          "Hộp thoại 'Không kết nối được máy chủ' (Cannot connect to server) không đồng nghĩa key hết hạn hay bị khóa. Nguyên nhân thường do mạng tạm gián đoạn, DNS, VPN hoặc Proxy công ty chặn kết nối HTTPS ra ngoài. Cần kiểm tra mở https://onlyoffice.mercytechglobal.com trên trình duyệt; không tắt tường lửa hay tắt kiểm tra SSL.",
        contentEn:
          "A 'Cannot connect to server' message does not mean a license key has expired. Check browser access to https://onlyoffice.mercytechglobal.com, VPN, or corporate proxy settings without disabling firewall or SSL verification.",
        keywords: ["không kết nối được máy chủ", "cannot connect", "connection error", "server", "mất kết nối", "proxy", "vpn"],
      },
    ],
  },
  {
    articleId: "kb_mercy_reinstall_windows",
    title: "Hỗ trợ kích hoạt lại sau khi cài lại Windows hoặc đổi máy tính",
    titleEn: "Reactivating after reinstalling Windows or changing PC hardware",
    summary: "Quy trình kiểm tra và hỗ trợ chuyển đổi thiết bị khi cài lại hệ điều hành.",
    product: ["mercy_keys"],
    edition: ["mercy_service"],
    os: ["windows"],
    versionRange: "all",
    issueType: ["license_or_package_query", "technical_error"],
    audience: "public",
    sourceName: "Chính sách Hỗ trợ Kỹ thuật Mercy Tech",
    owner: "CSKH Mercy Tech",
    approvedBy: "Vy Thiên Hùng",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.0",
    symptoms: ["cài lại win", "đổi ổ cứng", "đổi máy mới", "mã đã kích hoạt trên thiết bị khác", "reset key"],
    applicableConditions: "Áp dụng khi khách cài lại Windows hoặc nâng cấp phần cứng khiến định danh thiết bị thay đổi.",
    diagnosticQuestions: [
      "Anh/chị vừa cài lại Windows trên chính máy cũ hay chuyển sang một máy tính mới hoàn toàn?",
    ],
    safeSteps: [
      "Nếu đã có tài khoản trên cổng Mercy Tech, anh/chị đăng nhập vào trang Quản lý tài khoản để kiểm tra danh sách thiết bị đang gắn với mã.",
      "Trợ lý AI không tự cấp lại hoặc reset mã kích hoạt trực tiếp để bảo vệ tài sản của chủ tài khoản.",
      "Nếu hộp thoại báo mã đang gắn với thiết bị cũ, vui lòng bấm 'Gặp kỹ thuật viên' kèm SĐT/Email đăng ký hoặc số Seri tem (không gửi mã cào đầy đủ) để kỹ thuật viên xác minh và hỗ trợ mở lại.",
    ],
    safeStepsEn: [
      "Sign in to your Mercy Tech account portal to view the current device binding of your license.",
      "For security, the AI assistant never resets or reissues license bindings automatically.",
      "If the key remains bound to a previous Windows installation, click 'Contact Technician' with your registered email/phone or sticker serial (do not share the full scratch code) for verification.",
    ],
    expectedResult: "Khách nắm rõ trạng thái gắn thiết bị và được chuyển đúng luồng xác minh chủ sở hữu.",
    stopConditions: "Không gửi mã kích hoạt đầy đủ vào khung chat công khai.",
    escalateWhen: "Khách cần kỹ thuật viên xác minh và giải phóng liên kết thiết bị cũ.",
    chunks: [
      {
        chunkId: "chk_reinstall_win_01",
        articleId: "kb_mercy_reinstall_windows",
        version: "1.0",
        sectionTitle: "Cài lại Windows và chuyển thiết bị",
        content:
          "Sau khi cài lại Windows hoặc thay ổ cứng/mainboard, mã định danh phần cứng có thể thay đổi. Trợ lý AI không tự động reset hoặc cấp lại key; khách hàng đăng nhập cổng tài khoản kiểm tra hoặc gửi yêu cầu gặp kỹ thuật viên kèm email/SĐT đăng ký để được xác minh hỗ trợ.",
        contentEn:
          "Reinstalling Windows or replacing hardware can change the device fingerprint. The AI assistant does not reset keys automatically; sign in to check status or request technician verification.",
        keywords: ["cài lại win", "reinstall windows", "đổi máy", "thiết bị khác", "reset key", "ổ cứng"],
      },
    ],
  },
  {
    articleId: "kb_mercy_account_login",
    title: "Đăng nhập tài khoản Mercy và quên mật khẩu",
    titleEn: "Signing in to Mercy Portal and password recovery",
    summary: "Hướng dẫn đăng nhập cổng khách hàng/đại lý và khôi phục mật khẩu qua luồng chính thức.",
    product: ["mercy_keys"],
    edition: ["mercy_service"],
    os: ["unknown"],
    versionRange: "all",
    issueType: ["account_login"],
    audience: "public",
    sourceName: "Tài liệu Cổng Tài khoản Mercy Tech",
    sourceUrl: "/login",
    owner: "CSKH Mercy Tech",
    approvedBy: "Vy Thiên Hùng",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.0",
    symptoms: ["đăng nhập", "quên mật khẩu", "login", "forgot password", "không vào được tài khoản"],
    applicableConditions: "Áp dụng cho khách hàng và đại lý đăng nhập trên website onlyoffice.mercytechglobal.com.",
    diagnosticQuestions: [
      "Trang đăng nhập đang báo sai thông tin, quên mật khẩu hay tài khoản chưa được khởi tạo?",
    ],
    safeSteps: [
      "Truy cập trang Đăng nhập chính thức (/login) và kiểm tra đúng địa chỉ Email hoặc tên đăng nhập đã đăng ký (không thừa dấu cách).",
      "Nếu quên mật khẩu, sử dụng tính năng khôi phục trên trang đăng nhập hoặc bấm 'Gặp kỹ thuật viên' để bộ phận CSKH xác minh qua Email/SĐT đăng ký.",
      "Lưu ý bảo mật: Tuyệt đối KHÔNG nhập mật khẩu hoặc mã OTP vào cửa sổ chat này.",
    ],
    safeStepsEn: [
      "Open the official Sign-in page (/login) and verify your registered email address.",
      "If you forgot your password, use the official recovery flow or submit a support request with your registered email/phone.",
      "Security reminder: Never type your password or OTP into this chat.",
    ],
    expectedResult: "Truy cập lại tài khoản qua kênh chính thức an toàn.",
    stopConditions: "Không bao giờ yêu cầu hoặc tiếp nhận mật khẩu/OTP trong hội thoại.",
    escalateWhen: "Khách không nhận được thông tin khôi phục hoặc đổi email quản trị.",
    chunks: [
      {
        chunkId: "chk_acc_login_01",
        articleId: "kb_mercy_account_login",
        version: "1.0",
        sectionTitle: "Đăng nhập và khôi phục mật khẩu an toàn",
        content:
          "Đăng nhập tại trang chính thức /login. Tuyệt đối không cung cấp mật khẩu hoặc mã OTP cho trợ lý AI. Nếu quên mật khẩu hoặc cần kiểm tra email đăng ký, sử dụng luồng khôi phục chính thức hoặc liên hệ CSKH Mercy Tech (Zalo CSKH 0763 068 614).",
        contentEn:
          "Sign in via /login. Never share passwords or OTP codes in chat. For account recovery, use the official flow or contact Mercy Tech support.",
        keywords: ["đăng nhập", "quên mật khẩu", "login", "password", "otp", "tài khoản mercy"],
      },
    ],
  },
  {
    articleId: "kb_mercy_check_certificate",
    title: "Tra cứu thông tin xác thực và chứng nhận dịch vụ Mercy Check",
    titleEn: "Verifying Mercy Service Certificate and License Record",
    summary: "Cách tra cứu thông tin gói dịch vụ trên trang Mercy Check và phạm vi ý nghĩa của chứng nhận.",
    product: ["mercy_check", "mercy_keys"],
    edition: ["mercy_service"],
    os: ["unknown"],
    versionRange: "all",
    issueType: ["license_or_package_query", "business_policy"],
    audience: "public",
    sourceName: "Tài liệu Dịch vụ Mercy Tech",
    owner: "Mercy Tech",
    approvedBy: "Vy Thiên Hùng",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.0",
    symptoms: ["mercy check", "chứng nhận", "mộc đỏ a4", "tra cứu seri", "thanh tra bản quyền"],
    applicableConditions: "Áp dụng khi khách cần tra cứu hồ sơ gói dịch vụ phần mềm tối ưu bởi Mercy Tech.",
    diagnosticQuestions: ["Anh/chị đang muốn tra cứu theo số Seri tem hay kiểm tra chứng nhận trong tài khoản?"],
    safeSteps: [
      "Đăng nhập vào cổng khách hàng/đại lý để xem và tải bản chứng nhận gói dịch vụ gắn với đơn vị của mình.",
      "Lưu ý phân biệt rõ: Gói dịch vụ của Mercy Tech là bộ cài tối ưu, tiện ích tiếng Việt và dịch vụ hỗ trợ kỹ thuật trên nền ONLYOFFICE mã nguồn mở theo giấy phép tương ứng; cần phân biệt với gói ONLYOFFICE Enterprise thương mại từ Ascensio.",
    ],
    safeStepsEn: [
      "Sign in to your customer/dealer portal to view and download the service certificate associated with your organization.",
      "Note: Mercy Tech provides localized optimization, utilities, and technical support services built around ONLYOFFICE under applicable licensing, distinct from Ascensio's ONLYOFFICE Enterprise server edition.",
    ],
    expectedResult: "Hiểu đúng bản chất gói dịch vụ và cách tải hồ sơ chứng nhận từ cổng tài khoản.",
    stopConditions: "Không đưa ra tư vấn pháp lý chuyên sâu hoặc cam kết bảo đảm kết quả thanh tra nhà nước.",
    escalateWhen: "Khách cần điều chỉnh thông tin tên doanh nghiệp hoặc mã số thuế trên hồ sơ chứng nhận/hợp đồng.",
    chunks: [
      {
        chunkId: "chk_mercy_check_01",
        articleId: "kb_mercy_check_certificate",
        version: "1.0",
        sectionTitle: "Tra cứu chứng nhận dịch vụ và lưu ý pháp lý trung tính",
        content:
          "Khách hàng đăng nhập cổng tài khoản Mercy để tải chứng nhận dịch vụ và kiểm tra số Seri. Không gán nhãn ONLYOFFICE Enterprise cho bộ cài dịch vụ Mercy và không đưa ra cam kết bảo đảm kết quả thanh tra pháp lý; nếu doanh nghiệp cần tư vấn hồ sơ hợp đồng/hóa đơn VAT chính thức, hãy kết nối bộ phận chuyên trách.",
        contentEn:
          "Customers can view service certificates in the Mercy portal. Do not label Mercy service packages as ONLYOFFICE Enterprise or guarantee regulatory inspection outcomes.",
        keywords: ["mercy check", "chứng nhận", "mộc đỏ", "thanh tra", "pháp lý", "bản quyền", "enterprise"],
      },
    ],
  },
  {
    articleId: "kb_doc_vntime_tcvn3",
    title: "Xử lý văn bản lỗi font .VnTime, TCVN3 hoặc VNI bị ô vuông, ký tự lạ",
    titleEn: "Fixing .VnTime, TCVN3, or VNI garbled/square font issues in documents",
    summary:
      "Phân biệt thiếu font hiển thị với chuyển mã TCVN3/VNI sang Unicode, ưu tiên sao lưu tệp gốc trước khi chuyển đổi.",
    product: ["desktop_editors", "mercy_installer"],
    edition: ["mercy_service", "community", "enterprise", "unknown"],
    os: ["windows", "macos", "linux"],
    versionRange: "all",
    issueType: ["technical_error", "how_to_use"],
    audience: "public",
    sourceName: "Tài liệu Kỹ thuật Mercy Tech",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.3",
    symptoms: [
      "lỗi font",
      ".vntime",
      "vni-times",
      "tcvn3",
      "ô vuông",
      "ký tự ngoằn ngoèo",
      "chuẩn hóa font tiếng việt",
    ],
    applicableConditions: "Áp dụng cho tệp văn bản (.doc, .docx) hoặc bảng tính cũ dùng bảng mã TCVN3 (.VnTime) hoặc VNI.",
    diagnosticQuestions: [
      "Trên thanh công cụ tên font đang hiện là .VnTime / VNI-Times hay Times New Roman, và anh/chị đang mở trên Windows hay macOS?",
    ],
    safeSteps: [
      "Bước an toàn đầu tiên: Tạo một bản sao lưu (Save Copy / Copy file) của tài liệu gốc trước khi chuyển đổi mã chữ để giữ nguyên định dạng gốc nếu cần đối chiếu.",
      "Nếu muốn giữ nguyên tệp gốc chỉ để xem/in: cài bộ font TCVN3 (.VnTime) hoặc VNI vào hệ điều hành rồi khởi động lại ONLYOFFICE.",
      "Nếu đang dùng bộ cài Mercy trên Windows và muốn đổi hẳn sang chuẩn Unicode (Times New Roman): mở bản sao tài liệu -> bôi đen vùng chữ lỗi -> vào thẻ Tiện ích (Plugins) -> chọn 'Chuẩn Hóa Font Tiếng Việt'.",
    ],
    safeStepsEn: [
      "First, save a backup copy of the original document before converting character encodings.",
      "To view/print without altering text codes, install the legacy TCVN3 (.VnTime) or VNI fonts in your OS and restart ONLYOFFICE.",
      "On the Mercy Windows build, to convert legacy text to standard Unicode: open the backup copy, select the affected text, go to Plugins -> Vietnamese Font Converter.",
    ],
    expectedResult: "Văn bản hiển thị tiếng Việt có dấu rõ ràng mà tệp gốc vẫn được bảo toàn an toàn.",
    stopConditions: "Không chuyển mã đè trực tiếp lên tệp hồ sơ gốc duy nhất khi chưa tạo bản sao.",
    escalateWhen: "Tài liệu trộn lẫn nhiều bảng mã phức tạp trong bảng biểu hoặc TextBox không tự nhận diện được.",
    chunks: [
      {
        chunkId: "chk_font_vntime_01",
        articleId: "kb_doc_vntime_tcvn3",
        version: "1.3",
        sectionTitle: "Sao lưu tệp gốc và xử lý lỗi font TCVN3 / VNI",
        content:
          "Khi gặp văn bản cũ lỗi font .VnTime (TCVN3) hoặc VNI-Times hiển thị ô vuông/ký tự lạ: (1) Luôn tạo bản sao lưu file gốc trước. (2) Nếu chỉ cần xem/in giữ nguyên mã cũ, cài bộ font TCVN3/VNI vào máy và mở lại ONLYOFFICE. (3) Trên bản Mercy Windows, có thể bôi đen đoạn văn bản trên file bản sao và dùng Plugin 'Chuẩn Hóa Font Tiếng Việt' để chuyển sang Unicode.",
        contentEn:
          "For legacy .VnTime (TCVN3) or VNI garbled text: (1) Always make a backup copy of the original file first. (2) Install TCVN3/VNI system fonts to view as-is, or (3) use the Vietnamese Font Converter plugin on a copy to convert to Unicode.",
        keywords: ["lỗi font", "font", ".vntime", "vntime", "tcvn3", "vni", "ô vuông", "unicode", "chuẩn hóa font"],
      },
    ],
  },
  {
    articleId: "kb_doc_unikey_typing",
    title: "Khắc phục lỗi gõ tiếng Việt Unikey/EVKey nhảy chữ, mất dấu trên Windows",
    titleEn: "Fixing Vietnamese typing issues with Unikey/EVKey on Windows",
    summary: "Xử lý hiện tượng gõ tiếng Việt không ăn dấu, lặp chữ (ưw) hoặc lệch quyền bộ gõ trên Windows.",
    product: ["desktop_editors", "docs", "mercy_installer"],
    edition: ["mercy_service", "community", "enterprise", "unknown"],
    os: ["windows"],
    versionRange: "all",
    issueType: ["technical_error"],
    audience: "public",
    sourceName: "Tài liệu Kỹ thuật Mercy Tech",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.1",
    symptoms: ["unikey", "evkey", "gõ tiếng việt", "nhảy chữ", "ưw", "mất dấu", "không gõ được dấu"],
    applicableConditions: "Áp dụng cho Windows khi gõ tiếng Việt trong ONLYOFFICE Desktop hoặc trình duyệt.",
    diagnosticQuestions: [
      "Dưới góc phải thanh Taskbar có đang bật đồng thời cả bộ gõ tiếng Việt mặc định của Windows (VIE) lẫn Unikey không?",
    ],
    safeSteps: [
      "Kiểm tra thanh ngôn ngữ góc dưới bên phải Windows: chuyển bàn phím của Windows về ENG (tránh bật song song bộ gõ VIE của Windows cùng lúc với Unikey/EVKey gây lặp chữ 'ưw').",
      "Mở bảng điều khiển Unikey: kiểm tra Bảng mã là 'Unicode', Kiểu gõ 'Telex' (hoặc VNI), biểu tượng đang ở chữ 'V' màu đỏ.",
      "Nếu ONLYOFFICE đang chạy quyền Administrator mà Unikey chạy quyền thường khiến không gõ được dấu: thoát hẳn Unikey ở khay hệ thống rồi mở lại Unikey với 'Run as administrator'.",
    ],
    safeStepsEn: [
      "Switch Windows built-in input indicator on the taskbar to ENG so Windows Vietnamese IME does not conflict with Unikey/EVKey.",
      "In Unikey, set Character Set to 'Unicode', Input Method to 'Telex' (or VNI), and verify the tray icon is set to 'V'.",
      "If ONLYOFFICE runs elevated while Unikey does not, exit Unikey completely from the system tray and relaunch it with matching permissions.",
    ],
    expectedResult: "Gõ tiếng Việt mượt mà, không bị nhân đôi ký tự hoặc mất dấu.",
    stopConditions: "Không cài nhiều bộ gõ bên thứ ba chạy chồng lên nhau cùng lúc.",
    escalateWhen: "Đã tắt xung đột bộ gõ ENG/VIE nhưng vẫn nhảy ký tự trong một bảng tính cụ thể.",
    chunks: [
      {
        chunkId: "chk_unikey_win_01",
        articleId: "kb_doc_unikey_typing",
        version: "1.1",
        sectionTitle: "Tránh xung đột bộ gõ Windows VIE và Unikey",
        content:
          "Lỗi gõ chữ 'w' thành 'ưw' hoặc nhảy chữ trên Windows thường do bật trùng cả bộ gõ tiếng Việt mặc định của Windows (VIE) và Unikey/EVKey. Hãy chuyển bàn phím Windows về ENG, giữ Unikey ở bảng mã Unicode + Telex. Nếu không bỏ dấu được, thoát hẳn Unikey rồi mở lại bằng Run as administrator.",
        contentEn:
          "Duplicate characters like 'ưw' usually happen when both Windows Vietnamese IME (VIE) and Unikey are active simultaneously. Switch Windows keyboard to ENG and verify Unikey uses Unicode.",
        keywords: ["unikey", "evkey", "gõ tiếng việt", "nhảy chữ", "ưw", "mất dấu", "telex", "vni"],
      },
    ],
  },
  {
    articleId: "kb_doc_macos_vietnamese",
    title: "Xử lý lỗi gõ tiếng Việt gạch chân hoặc mất chữ đầu trên macOS",
    titleEn: "Fixing Vietnamese IME underline or dropped characters on macOS",
    summary: "Cấu hình bộ gõ tiếng Việt trên macOS khi soạn thảo trong ONLYOFFICE Desktop hoặc trình duyệt.",
    product: ["desktop_editors", "docs"],
    edition: ["community", "enterprise", "unknown"],
    os: ["macos"],
    versionRange: ">=8.0",
    issueType: ["technical_error"],
    audience: "public",
    sourceName: "Tài liệu Kỹ thuật Mercy Tech",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.0",
    symptoms: ["gõ tiếng việt trên mac", "mất chữ đầu macbook", "gạch chân tiếng việt macos", "evkey mac", "gotiengviet"],
    applicableConditions: "Áp dụng cho người dùng macOS sử dụng bộ gõ mặc định Apple Telex/VNI hoặc OpenKey/EVKey.",
    diagnosticQuestions: ["Anh/chị đang dùng bộ gõ Telex mặc định của macOS hay ứng dụng OpenKey/EVKey?"],
    safeSteps: [
      "Kiểm tra thanh menu trên cùng của macOS để chắc chắn chỉ bật một bộ gõ tiếng Việt duy nhất (nếu dùng OpenKey/EVKey thì chuyển bàn phím hệ thống của Apple về ABC).",
      "Trong System Settings > Keyboard > Text Input, tắt tùy chọn 'Correct spelling automatically' nếu tính năng tự sửa lỗi chính tả tiếng Anh đang tự đổi từ tiếng Việt vừa gõ.",
    ],
    safeStepsEn: [
      "Ensure only one Vietnamese input source is active on your macOS menu bar (set Apple input to ABC if using OpenKey/EVKey).",
      "In System Settings > Keyboard, disable 'Correct spelling automatically' if macOS auto-replaces Vietnamese words.",
    ],
    expectedResult: "Gõ dấu tiếng Việt ổn định trong tài liệu trên máy Mac.",
    stopConditions: "Không cấp quyền Accessibility cho ứng dụng không rõ nguồn gốc.",
    escalateWhen: "Lỗi vẫn lặp lại trên phiên bản ONLYOFFICE Desktop mới nhất của macOS.",
    chunks: [
      {
        chunkId: "chk_mac_vn_01",
        articleId: "kb_doc_macos_vietnamese",
        version: "1.0",
        sectionTitle: "Cấu hình bộ gõ tiếng Việt trên macOS",
        content:
          "Trên macOS, tránh bật song song bộ gõ Telex của Apple với OpenKey/EVKey (hãy để bàn phím Apple về ABC nếu dùng bộ gõ ngoài) và tắt tự động sửa chính tả tiếng Anh trong System Settings > Keyboard nếu chữ bị tự đổi.",
        contentEn:
          "On macOS, avoid running Apple's built-in Vietnamese IME simultaneously with OpenKey/EVKey, and disable automatic English spell-correction if words change unexpectedly.",
        keywords: ["macos", "macbook", "gõ tiếng việt mac", "openkey", "gạch chân", "mất chữ"],
      },
    ],
  },
  {
    articleId: "kb_doc_layout_word_diff",
    title: "Kiểm tra lệch bố cục, nhảy dòng hoặc lệch bảng giữa Word và ONLYOFFICE",
    titleEn: "Troubleshooting layout, line-wrap, or table differences between Word and ONLYOFFICE",
    summary:
      "Cách so sánh font chữ hệ thống, khổ giấy và thuộc tính bảng khi tài liệu hiển thị khác giữa hai trình soạn thảo.",
    product: ["desktop_editors", "docs"],
    edition: ["mercy_service", "community", "enterprise", "unknown"],
    os: ["windows", "macos", "linux"],
    versionRange: ">=8.0",
    issueType: ["compare_results", "technical_error", "replicate_layout"],
    audience: "public",
    sourceName: "Tài liệu Kỹ thuật Mercy Tech",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.1",
    symptoms: ["lệch bố cục", "nhảy trang", "lệch bảng", "khác với word", "sai định dạng bảng", "so sánh trước sau"],
    applicableConditions: "Áp dụng khi mở tệp .doc/.docx thấy số trang, khoảng cách dòng hoặc chiều rộng cột bảng khác bản gốc.",
    diagnosticQuestions: [
      "Tệp của anh/chị đang ở định dạng .docx hay .doc đời cũ, và font chữ sử dụng trong tài liệu đã được cài sẵn trên máy tính này chưa?",
    ],
    safeSteps: [
      "Tạo một bản sao của tệp trước khi chỉnh sửa bố cục để bảo toàn bản gốc.",
      "Kiểm tra tên font chữ tại đoạn bị nhảy dòng: nếu máy thiếu font gốc (ví dụ thiếu font Calibri/Cambria trên Linux hoặc thiếu font chuyên ngành), trình soạn thảo sẽ thay thế bằng font khác có độ rộng chữ khác nhau gây đẩy trang.",
      "Mở thẻ Layout (Bố cục) -> kiểm tra Size (đúng A4 thay vì Letter) và Margins (Lề trang); với bảng bị tràn, nhấp chuột phải vào bảng -> Table Advanced Settings để kiểm tra độ rộng cố định.",
    ],
    safeStepsEn: [
      "Save a duplicate copy of the file before adjusting formatting.",
      "Verify that the exact fonts used in the document are installed on your system; font substitution changes character widths and page breaks.",
      "Under the Layout tab, check Page Size (A4 vs Letter) and Margins; for shifted tables, check Table Advanced Settings.",
    ],
    expectedResult: "Xác định và đồng bộ được khổ giấy, font chữ và độ rộng bảng giữa các máy.",
    stopConditions: "Ảnh chụp chỉ hỗ trợ chẩn đoán vùng nhìn thấy; không cam kết mọi tệp .doc phức tạp đều tự căn chỉnh giống hệt mà không cần kiểm tra font.",
    escalateWhen: "Đã đủ font và đúng khổ A4 nhưng biểu mẫu phức tạp vẫn bị chồng đè khung.",
    chunks: [
      {
        chunkId: "chk_layout_diff_01",
        articleId: "kb_doc_layout_word_diff",
        version: "1.1",
        sectionTitle: "Nguyên nhân và cách kiểm tra lệch trang / lệch bảng",
        content:
          "Khi tài liệu nhảy dòng hoặc lệch bảng so với Word: (1) Sao lưu file gốc trước. (2) Kiểm tra máy đã có đúng font chữ gốc của văn bản chưa (thiếu font sẽ bị thay thế làm đổi độ rộng dòng). (3) Kiểm tra khổ giấy Layout > Size (A4 hay Letter) và định dạng .doc cũ sang .docx chuẩn.",
        contentEn:
          "When pages wrap differently than Word: (1) Back up the original file. (2) Check whether required fonts are installed. (3) Verify Page Size (A4 vs Letter) and table width settings.",
        keywords: ["lệch bảng", "nhảy trang", "lệch dòng", "bố cục", "layout", "word", "khổ giấy", "a4", "letter"],
      },
    ],
  },
  {
    articleId: "kb_doc_decree30_margins",
    title: "Thiết lập thể thức và canh lề văn bản hành chính theo Nghị định 30/2020/NĐ-CP",
    titleEn: "Setting Vietnamese Decree 30 administrative document margins and formatting",
    summary: "Thông số khổ giấy A4, định lượng lề trang và cỡ chữ chuẩn cho văn bản hành chính Việt Nam.",
    product: ["desktop_editors", "docs"],
    edition: ["mercy_service", "community", "enterprise", "unknown"],
    os: ["windows", "macos", "linux"],
    versionRange: "all",
    issueType: ["how_to_use", "replicate_layout"],
    audience: "public",
    sourceName: "Tài liệu Kỹ thuật Mercy Tech",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.0",
    symptoms: ["nghị định 30", "canh lề hành chính", "lề chuẩn công văn", "times new roman 14"],
    applicableConditions: "Áp dụng khi soạn thảo công văn, tờ trình, hợp đồng theo thể thức hành chính trên ONLYOFFICE.",
    diagnosticQuestions: [],
    safeSteps: [
      "Vào thẻ Layout (Bố cục) -> chọn Size -> chọn A4 (210 mm × 297 mm).",
      "Chọn Margins -> Custom Margins và đặt: Top (Trên) 2.0 cm, Bottom (Dưới) 2.0 cm, Left (Trái) 3.0 cm, Right (Phải) 1.5 cm đến 2.0 cm.",
      "Tại thẻ Home, chọn phông chữ Times New Roman (bộ mã Unicode), cỡ chữ nội dung 13 hoặc 14 pt, giãn dòng 1.15–1.3 và khoảng cách đoạn 6 pt.",
    ],
    safeStepsEn: [
      "Open the Layout tab -> Size -> select A4 (210 mm × 297 mm).",
      "Open Margins -> Custom Margins: Top 2.0 cm, Bottom 2.0 cm, Left 3.0 cm, Right 1.5–2.0 cm.",
      "Set font to Times New Roman (Unicode), body size 13–14 pt.",
    ],
    expectedResult: "Trang văn bản chuẩn khổ A4 và lề hành chính theo Nghị định 30.",
    stopConditions: "Kiểm tra đơn vị đo trong File > Advanced Settings đang là cm (centimeter) trước khi nhập số.",
    escalateWhen: "Cần tạo mẫu Template mặc định cho nhiều máy tính trong đơn vị.",
    chunks: [
      {
        chunkId: "chk_decree30_01",
        articleId: "kb_doc_decree30_margins",
        version: "1.0",
        sectionTitle: "Thông số lề trang Nghị định 30 trên ONLYOFFICE",
        content:
          "Chuẩn Nghị định 30/2020/NĐ-CP trên ONLYOFFICE: Khổ giấy A4; Lề trên 2cm, Lề dưới 2cm, Lề trái 3cm, Lề phải 1.5–2cm (chỉnh tại Layout > Margins > Custom Margins; kiểm tra đơn vị đo là cm trong File > Advanced Settings). Font chữ Times New Roman Unicode cỡ 13–14pt.",
        contentEn:
          "Decree 30 setup in ONLYOFFICE: Page Size A4; Top 2cm, Bottom 2cm, Left 3cm, Right 1.5–2cm; Times New Roman 13–14pt.",
        keywords: ["nghị định 30", "canh lề", "lề trái 3cm", "công văn", "hành chính", "margins"],
      },
    ],
  },
  {
    articleId: "kb_doc_export_print_pdf",
    title: "Xuất tệp sang PDF và in ấn văn bản/bảng tính đúng tỷ lệ trang",
    titleEn: "Exporting to PDF and printing documents/spreadsheets to fit page",
    summary: "Cách lưu thành PDF giữ nguyên font chữ và thiết lập Fit to Page khi in bảng tính nhiều cột.",
    product: ["desktop_editors", "docs"],
    edition: ["mercy_service", "community", "enterprise", "unknown"],
    os: ["windows", "macos", "linux"],
    versionRange: "all",
    issueType: ["how_to_use", "technical_error"],
    audience: "public",
    sourceName: "Tài liệu Kỹ thuật Mercy Tech",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.0",
    symptoms: ["xuất pdf", "in bị mất cột", "in 2 mặt", "print excel tràn trang", "save as pdf"],
    applicableConditions: "Áp dụng cho Document Editor, Spreadsheet Editor và Presentation Editor.",
    diagnosticQuestions: [
      "Anh/chị đang xuất từ Văn bản (Word) hay Bảng tính (Excel) bị tràn cột sang trang sau?",
    ],
    safeSteps: [
      "Để xuất PDF: vào File -> Save As (hoặc Download as trên bản web) -> chọn định dạng PDF.",
      "Nếu bảng tính in hoặc xuất PDF bị rớt cột sang trang 2: vào thẻ Layout -> Orientation (chọn Landscape nếu bảng ngang) và tại mục Scale/Fit chọn 'Fit All Columns on One Page' (Vừa tất cả cột trên 1 trang).",
      "Mở File -> Print để xem trước bản in (Print Preview) từng trang trước khi bấm in ra giấy.",
    ],
    safeStepsEn: [
      "To export PDF: go to File -> Save As -> choose PDF.",
      "If spreadsheet columns spill onto extra pages: open Layout -> set Orientation to Landscape if needed, and select 'Fit All Columns on One Page'.",
      "Check File -> Print preview before printing.",
    ],
    expectedResult: "Bản PDF hoặc bản in nằm gọn trong khổ giấy A4, không bị đứt cột.",
    stopConditions: "Nếu máy in báo Offline, cần kiểm tra kết nối cáp/mạng của máy in trong hệ điều hành.",
    escalateWhen: "Bản xem trước (Print Preview) hiển thị đúng nhưng máy in ra bị lệch khổ giấy driver.",
    chunks: [
      {
        chunkId: "chk_print_pdf_01",
        articleId: "kb_doc_export_print_pdf",
        version: "1.0",
        sectionTitle: "Xuất PDF và căn vừa tất cả cột khi in bảng tính",
        content:
          "Vào File > Save As > PDF để xuất PDF. Với bảng tính bị tràn cột khi in, vào thẻ Layout chọn 'Fit All Columns on One Page' và kiểm tra lại trong File > Print trước khi in.",
        contentEn:
          "Use File > Save As > PDF to export. For wide spreadsheets, enable 'Fit All Columns on One Page' under Layout and verify in Print Preview.",
        keywords: ["xuất pdf", "export pdf", "in ấn", "print", "tràn trang", "mất cột", "in 2 mặt"],
      },
    ],
  },
  {
    articleId: "kb_sheet_formula_separator",
    title: "Xử lý lỗi công thức bảng tính báo lỗi dấu phẩy (,), chấm phẩy (;), #NAME?, #VALUE!",
    titleEn: "Fixing spreadsheet formula delimiter (, vs ;) and #NAME?, #VALUE! errors",
    summary:
      "Khắc phục sự khác biệt dấu phân cách đối số công thức theo vùng miền (Region) và tên hàm trong Spreadsheet Editor.",
    product: ["desktop_editors", "docs"],
    edition: ["mercy_service", "community", "enterprise", "unknown"],
    os: ["windows", "macos", "linux"],
    versionRange: "all",
    issueType: ["technical_error", "how_to_use"],
    audience: "public",
    sourceName: "Tài liệu Kỹ thuật Mercy Tech",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.1",
    symptoms: ["lỗi công thức", "#name?", "#value!", "dấu phẩy chấm phẩy", "vlookup", "sumifs", "formula error"],
    applicableConditions: "Áp dụng khi nhập công thức trong Spreadsheet Editor báo lỗi cú pháp hoặc kết quả lỗi.",
    diagnosticQuestions: [
      "Anh/chị có thể cho biết công thức cụ thể đang hiện trên thanh Formula Bar (`fx`) hoặc gửi ảnh chụp có cả thanh công thức và tiêu đề cột không?",
    ],
    safeSteps: [
      "Kiểm tra gợi ý cú pháp ngay dưới ô đang gõ: nếu thiết lập vùng là Tiếng Việt (Vietnamese), dấu ngăn cách giữa các tham số thường là dấu chấm phẩy `;` (ví dụ `=IF(A1>0; \"Đạt\"; \"Chưa\")`) thay vì dấu phẩy `,`.",
      "Nếu muốn đổi thiết lập vùng và dấu phân cách số/công thức: vào File -> Advanced Settings -> mục Regional Settings để chọn chuẩn phù hợp.",
      "Với lỗi `#NAME?`, kiểm tra tên hàm không viết sai chính tả và chuỗi văn bản trong công thức dùng dấu ngoặc kép thẳng `\"...\"`.",
    ],
    safeStepsEn: [
      "Check the formula tooltip while typing: with Vietnamese or European regional settings, argument separators use semicolons `;` instead of commas `,`.",
      "To adjust delimiters, open File -> Advanced Settings -> Regional Settings.",
      "For `#NAME?`, verify function spelling and ensure text literals are wrapped in standard double quotes.",
    ],
    expectedResult: "Công thức nhận đúng tham số và tính ra kết quả thay vì báo lỗi cú pháp.",
    stopConditions: "Không suy đoán giá trị các ô nằm ngoài vùng nhìn thấy trên ảnh chụp.",
    escalateWhen: "Công thức mảng phức tạp hoặc Macro từ file ngoài cần kiểm tra tương thích trực tiếp.",
    chunks: [
      {
        chunkId: "chk_sheet_formula_01",
        articleId: "kb_sheet_formula_separator",
        version: "1.1",
        sectionTitle: "Dấu ngăn cách tham số công thức (, và ;) và lỗi #NAME?",
        content:
          "Trong ONLYOFFICE Spreadsheet, dấu ngăn cách đối số phụ thuộc Regional Settings (thường là dấu chấm phẩy ';' với vùng Việt Nam hoặc dấu phẩy ',' với English US). Có thể kiểm tra/đổi tại File > Advanced Settings > Regional Settings. Nếu ảnh không thấy thanh Formula Bar, cần xem công thức cụ thể không tự đoán dữ liệu ngoài vùng nhìn thấy.",
        contentEn:
          "Argument separators in ONLYOFFICE Spreadsheet depend on Regional Settings (';' vs ','). Check File > Advanced Settings > Regional Settings.",
        keywords: ["công thức", "formula", "#name?", "#value!", "#ref!", "chấm phẩy", "dấu phẩy", "vlookup", "sum", "if"],
      },
    ],
  },
  {
    articleId: "kb_sheet_date_number_format",
    title: "Định dạng ngày tháng dd/mm/yyyy và phân cách hàng nghìn trong Bảng tính",
    titleEn: "Formatting dates (dd/mm/yyyy) and thousand separators in Spreadsheets",
    summary: "Cách chỉnh hiển thị ngày tháng chuẩn Việt Nam và số tiền kế toán trong ONLYOFFICE Spreadsheet.",
    product: ["desktop_editors", "docs"],
    edition: ["mercy_service", "community", "enterprise", "unknown"],
    os: ["windows", "macos", "linux"],
    versionRange: "all",
    issueType: ["how_to_use", "technical_error"],
    audience: "public",
    sourceName: "Tài liệu Kỹ thuật Mercy Tech",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.0",
    symptoms: ["ngày tháng bị ngược", "mm/dd/yyyy", "dd/mm/yyyy", "định dạng số tiền", "dấu chấm phân cách nghìn"],
    applicableConditions: "Áp dụng cho Spreadsheet Editor khi ngày tháng hiển thị ngược tháng/ngày hoặc thiếu phân cách hàng nghìn.",
    diagnosticQuestions: [],
    safeSteps: [
      "Vào File -> Advanced Settings -> mục Region chọn 'Vietnamese (Vietnam)' để mặc định ngày theo chuẩn ngày/tháng/năm.",
      "Để định dạng riêng một vùng ô: bôi đen các ô -> nhấn Ctrl+1 (hoặc chọn More formats ở thẻ Home) -> chọn Date hoặc Custom và nhập `dd/mm/yyyy` (hoặc `#,##0` cho số tiền).",
    ],
    safeStepsEn: [
      "Go to File -> Advanced Settings -> Region and select 'Vietnamese (Vietnam)' for dd/mm/yyyy defaults.",
      "To format specific cells, select the range -> open Number Format -> More formats -> Custom and enter `dd/mm/yyyy` or `#,##0`.",
    ],
    expectedResult: "Ngày tháng và số liệu kế toán hiển thị đúng chuẩn dd/mm/yyyy.",
    stopConditions: "Nếu ô đang lưu dưới dạng Text (chữ), cần chuyển về kiểu Ngày/Số trước khi đổi mặt nạ hiển thị.",
    escalateWhen: "Dữ liệu xuất từ phần mềm kế toán trộn lẫn cả chuỗi Text và Date trong cùng một cột.",
    chunks: [
      {
        chunkId: "chk_sheet_date_01",
        articleId: "kb_sheet_date_number_format",
        version: "1.0",
        sectionTitle: "Định dạng ngày dd/mm/yyyy và số tiền",
        content:
          "Chỉnh chuẩn vùng Việt Nam tại File > Advanced Settings > Region > Vietnamese (Vietnam), hoặc chọn vùng ô rồi mở More formats > Custom nhập 'dd/mm/yyyy'.",
        contentEn:
          "Set Region in File > Advanced Settings, or apply Custom cell format 'dd/mm/yyyy'.",
        keywords: ["ngày tháng", "dd/mm/yyyy", "mm/dd/yyyy", "định dạng số", "date format", "hàng nghìn"],
      },
    ],
  },
  {
    articleId: "kb_sheet_spell_number_plugin",
    title: "Sử dụng tiện ích Đọc Số Tiền Thành Chữ tiếng Việt",
    titleEn: "Using the Vietnamese Number-to-Words Plugin",
    summary: "Hướng dẫn chuyển đổi con số thành dòng chữ tiếng Việt chuẩn chứng từ kế toán trong bộ cài Mercy.",
    product: ["mercy_installer", "desktop_editors"],
    edition: ["mercy_service"],
    os: ["windows"],
    versionRange: ">=1.0",
    issueType: ["how_to_use"],
    audience: "public",
    sourceName: "Tài liệu Kỹ thuật Mercy Tech",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.0",
    symptoms: ["đọc số thành chữ", "đổi số tiền ra chữ", "bằng chữ kế toán", "vnd thành chữ"],
    applicableConditions: "Áp dụng cho ONLYOFFICE tích hợp bộ 3 tiện ích tiếng Việt của Mercy Tech.",
    diagnosticQuestions: [],
    safeSteps: [
      "Mở văn bản hoặc bảng tính trong ONLYOFFICE trên máy đã cài bộ tiện ích Mercy.",
      "Đặt con trỏ vào vị trí cần chèn (hoặc chọn ô chứa số tiền) -> mở thẻ Plugins (Tiện ích) trên thanh công cụ.",
      "Chọn 'Đọc Số Thành Chữ', kiểm tra số tiền hiển thị và nhấn Chèn để điền câu chữ tiếng Việt vào tài liệu.",
    ],
    safeStepsEn: [
      "Open your document or spreadsheet in the Mercy-configured ONLYOFFICE Desktop Editor.",
      "Place your cursor at the target cell/line and open the Plugins tab.",
      "Click 'Đọc Số Thành Chữ' (Number to Vietnamese Words), verify the number, and insert the text.",
    ],
    expectedResult: "Dòng chữ số tiền tiếng Việt được chèn chính xác vào vị trí mong muốn.",
    stopConditions: "Nếu mở thẻ Plugins chưa thấy tiện ích này, có thể máy đang cài bản Community thuần thay vì bộ cài Mercy.",
    escalateWhen: "Đã cài bộ cài Mercy nhưng thẻ Plugins không hiển thị bộ 3 tiện ích tiếng Việt.",
    chunks: [
      {
        chunkId: "chk_spell_num_01",
        articleId: "kb_sheet_spell_number_plugin",
        version: "1.0",
        sectionTitle: "Thao tác Đọc Số Thành Chữ trong tab Plugins",
        content:
          "Trên bản ONLYOFFICE tích hợp tiện ích Mercy, vào thẻ Plugins -> chọn 'Đọc Số Thành Chữ' -> chọn ô số hoặc nhập số tiền để chèn dòng chữ tiếng Việt vào văn bản/bảng tính.",
        contentEn:
          "In the Mercy build of ONLYOFFICE, open the Plugins tab and select 'Đọc Số Thành Chữ' to convert numeric amounts into Vietnamese words.",
        keywords: ["đọc số thành chữ", "đổi số tiền thành chữ", "số thành chữ", "plugin kế toán"],
      },
    ],
  },
  {
    articleId: "kb_sheet_filter_chart_pivot",
    title: "Tạo Bộ lọc (Filter), Biểu đồ (Chart) và Pivot Table trong Bảng tính",
    titleEn: "Creating Filters, Charts, and Pivot Tables in Spreadsheet Editor",
    summary: "Hướng dẫn lọc dữ liệu, vẽ biểu đồ trực quan và tổng hợp bảng chéo Pivot Table.",
    product: ["desktop_editors", "docs"],
    edition: ["mercy_service", "community", "enterprise", "unknown"],
    os: ["windows", "macos", "linux"],
    versionRange: ">=8.0",
    issueType: ["how_to_use", "replicate_layout"],
    audience: "public",
    sourceName: "Tài liệu Hướng dẫn ONLYOFFICE",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.0",
    symptoms: ["lọc dữ liệu", "filter", "vẽ biểu đồ", "chart", "pivot table", "tổng hợp dữ liệu"],
    applicableConditions: "Áp dụng cho bảng dữ liệu có dòng tiêu đề cột rõ ràng, không gộp ô (Merge cells) ở dòng tiêu đề.",
    diagnosticQuestions: [],
    safeSteps: [
      "Đảm bảo dòng đầu tiên của vùng dữ liệu là tiêu đề cột liên tục (tránh Merge ô ở dòng tiêu đề gây sót cột khi lọc).",
      "Để lọc: bôi đen vùng bảng -> vào thẻ Home hoặc Data -> nhấn biểu tượng Filter (Hình phễu).",
      "Để vẽ biểu đồ hoặc tạo Pivot Table: bôi đen vùng dữ liệu -> mở thẻ Insert -> chọn Chart (Biểu đồ) hoặc Pivot Table.",
    ],
    safeStepsEn: [
      "Ensure the header row has clear column names without merged cells.",
      "To filter: select your data range and click Filter on the Home or Data tab.",
      "To create a Chart or Pivot Table: select the range -> open the Insert tab -> choose Chart or Pivot Table.",
    ],
    expectedResult: "Tạo được mũi tên lọc dữ liệu, biểu đồ hoặc bảng tổng hợp theo nhu cầu.",
    stopConditions: "Không suy đoán cấu trúc cột nằm khuất ngoài màn hình.",
    escalateWhen: "Tệp chứa Pivot Table phức tạp từ phần mềm BI ngoài không làm mới được nguồn dữ liệu.",
    chunks: [
      {
        chunkId: "chk_filter_chart_01",
        articleId: "kb_sheet_filter_chart_pivot",
        version: "1.0",
        sectionTitle: "Lọc dữ liệu, Biểu đồ và Pivot Table",
        content:
          "Kiểm tra dòng tiêu đề bảng không bị gộp ô (Merge). Bôi đen bảng -> nhấn Filter ở thẻ Home/Data để lọc, hoặc vào thẻ Insert -> chọn Chart / Pivot Table để trực quan hóa và tổng hợp số liệu.",
        contentEn:
          "Ensure unmerged headers, then use Home/Data > Filter or Insert > Chart / Pivot Table.",
        keywords: ["filter", "lọc", "biểu đồ", "chart", "pivot table", "bảng tính"],
      },
    ],
  },
  {
    articleId: "kb_slide_layout_media",
    title: "Chỉnh bố cục Slide trình chiếu, chèn hình ảnh và xuất PDF",
    titleEn: "Adjusting presentation slide layouts, inserting images, and exporting PDF",
    summary: "Cách đồng bộ font trên Slide Master, căn chỉnh hình ảnh và xuất bài thuyết trình.",
    product: ["desktop_editors", "docs"],
    edition: ["mercy_service", "community", "enterprise", "unknown"],
    os: ["windows", "macos", "linux"],
    versionRange: ">=8.0",
    issueType: ["how_to_use", "replicate_layout", "technical_error"],
    audience: "public",
    sourceName: "Tài liệu Hướng dẫn ONLYOFFICE",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.0",
    symptoms: ["slide", "powerpoint", "pptx", "trình chiếu", "slide master", "lệch hình slide"],
    applicableConditions: "Áp dụng cho Presentation Editor (.pptx).",
    diagnosticQuestions: [
      "Anh/chị đang muốn chỉnh bố cục cho một slide lẻ hay đổi đồng loạt cho toàn bộ bài trình chiếu?",
    ],
    safeSteps: [
      "Để đổi khung bố cục của 1 slide: nhấp chuột phải vào slide ở cột bên trái -> chọn Change Slide Layout.",
      "Để chỉnh phông chữ hoặc logo đồng loạt mọi slide: vào thẻ View -> chọn Slide Master, chỉnh trên slide gốc rồi nhấn Close Master View.",
      "Để gửi bài trình chiếu không bị nhảy font trên máy chiếu khác: xuất thêm một bản dự phòng qua File -> Save As -> PDF.",
    ],
    safeStepsEn: [
      "To change a single slide's layout: right-click the slide thumbnail -> Change Slide Layout.",
      "To edit fonts or logos across all slides: open View -> Slide Master, apply changes, then click Close Master View.",
      "Export a backup PDF via File -> Save As -> PDF when presenting on unfamiliar PCs.",
    ],
    expectedResult: "Slide giữ bố cục đồng nhất và hiển thị ổn định khi thuyết trình.",
    stopConditions: "Không cam kết các hiệu ứng chuyển động 3D độc quyền từ phần mềm khác giữ nguyên nếu chưa xác định phiên bản.",
    escalateWhen: "Tệp .pptx dung lượng lớn báo lỗi mở trên máy khách.",
    chunks: [
      {
        chunkId: "chk_slide_01",
        articleId: "kb_slide_layout_media",
        version: "1.0",
        sectionTitle: "Chỉnh Slide Layout và Slide Master",
        content:
          "Trong Presentation Editor, nhấp chuột phải vào slide chọn Change Slide Layout cho từng trang, hoặc mở View > Slide Master để đồng bộ phông chữ/bố cục toàn bài. Có thể xuất File > Save As > PDF để trình chiếu không lệch font.",
        contentEn:
          "Right-click a slide for Change Slide Layout, or use View > Slide Master for deck-wide formatting.",
        keywords: ["slide", "pptx", "powerpoint", "trình chiếu", "slide master", "thuyết trình"],
      },
    ],
  },
  {
    articleId: "kb_pdf_forms_edit",
    title: "Điền biểu mẫu PDF (PDF Forms) và chỉnh sửa chú thích trên PDF Editor",
    titleEn: "Filling PDF Forms and annotating PDFs in ONLYOFFICE",
    summary: "Cách điền trường biểu mẫu, thêm chữ/chú thích trên tệp PDF theo phiên bản ONLYOFFICE 8.0 trở lên.",
    product: ["desktop_editors", "docs"],
    edition: ["mercy_service", "community", "enterprise", "unknown"],
    os: ["windows", "macos", "linux"],
    versionRange: ">=8.1",
    issueType: ["how_to_use"],
    audience: "public",
    sourceName: "Tài liệu Hướng dẫn ONLYOFFICE",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.0",
    symptoms: ["chỉnh sửa pdf", "điền form pdf", "biểu mẫu pdf", "ký tên pdf", "pdf editor"],
    applicableConditions: "Tính năng chỉnh sửa trực tiếp văn bản PDF yêu cầu ONLYOFFICE phiên bản 8.1 trở lên (tệp PDF gốc dạng văn bản, không phải ảnh scan).",
    diagnosticQuestions: [
      "Tệp PDF của anh/chị là tệp xuất từ văn bản điện tử hay bản chụp/scan từ giấy, và phiên bản ONLYOFFICE hiện tại là bao nhiêu?",
    ],
    safeSteps: [
      "Mở tệp PDF trong ONLYOFFICE (phiên bản 8.1+): nếu chỉ cần điền ô trống hoặc ghi chú, sử dụng chế độ Commenting / Form Filling mặc định để tránh xô lệch bố cục.",
      "Nếu cần sửa chữ trên PDF gốc dạng văn bản: bấm nút 'Edit PDF' (Chỉnh sửa PDF) trên thanh công cụ phía trên.",
      "Lưu lại thành bản sao mới (Save As) sau khi điền xong để giữ nguyên bản mẫu trống ban đầu.",
    ],
    safeStepsEn: [
      "Open the PDF in ONLYOFFICE (v8.1+ recommended): use Commenting / Form Filling mode to fill fields or add annotations safely.",
      "To edit selectable text in a digital PDF, toggle 'Edit PDF' on the top toolbar (scanned image PDFs cannot be edited directly as text without OCR).",
      "Save As a new file so your blank form template stays intact.",
    ],
    expectedResult: "Điền biểu mẫu hoặc ghi chú PDF rõ nét và lưu thành tệp mới an toàn.",
    stopConditions: "Không hứa sửa chữ trực tiếp trên tệp PDF là ảnh chụp scan nếu chưa qua nhận dạng chữ.",
    escalateWhen: "Biểu mẫu PDF có chữ ký số chuyên dụng cần kiểm tra tính toàn vẹn chữ ký.",
    chunks: [
      {
        chunkId: "chk_pdf_edit_01",
        articleId: "kb_pdf_forms_edit",
        version: "1.0",
        sectionTitle: "Điền biểu mẫu và chế độ Edit PDF (v8.1+)",
        content:
          "Từ ONLYOFFICE 8.1 trở lên, mở tệp PDF có thể điền biểu mẫu/ghi chú hoặc bấm 'Edit PDF' để sửa văn bản điện tử. Lưu ý PDF dạng ảnh scan không sửa chữ trực tiếp được nếu chưa nhận dạng OCR, và luôn nên Save As ra tệp mới.",
        contentEn:
          "In ONLYOFFICE 8.1+, use Form Filling/Commenting or click 'Edit PDF' for digital PDFs. Scanned image PDFs require OCR before text editing.",
        keywords: ["pdf", "edit pdf", "biểu mẫu pdf", "điền pdf", "chỉnh sửa pdf", "scan"],
      },
    ],
  },
  {
    articleId: "kb_plugin_mathtype_equation",
    title: "Chuyển đổi công thức MathType cũ sang Equation trên ONLYOFFICE",
    titleEn: "Converting legacy MathType equations to native Equations in ONLYOFFICE",
    summary: "Cách xử lý công thức toán học trong đề thi/giáo án cũ bị mờ hoặc không nhấp sửa được.",
    product: ["mercy_installer", "desktop_editors"],
    edition: ["mercy_service", "community", "unknown"],
    os: ["windows"],
    versionRange: ">=8.0",
    issueType: ["technical_error", "how_to_use"],
    audience: "public",
    sourceName: "Tài liệu Kỹ thuật Mercy Tech",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.0",
    symptoms: ["mathtype", "công thức toán", "equation", "đề thi toán", "lỗi công thức toán"],
    applicableConditions: "Áp dụng cho giáo án, đề thi chứa đối tượng OLE MathType cũ trên Windows.",
    diagnosticQuestions: [
      "Công thức toán trong tệp của anh/chị đang hiển thị dạng ảnh OLE cũ hay bị lỗi ký hiệu ô vuông?",
    ],
    safeSteps: [
      "Tạo bản sao lưu của tệp đề thi/giáo án gốc trước khi chuyển đổi hàng loạt.",
      "Trên bộ cài ONLYOFFICE Mercy (Windows), mở bản sao tài liệu -> vào thẻ Plugins -> chọn tiện ích chuyển đổi công thức Toán sang định dạng Equation chuẩn.",
      "Để gõ mới công thức toán học: vào thẻ Insert -> chọn Equation.",
    ],
    safeStepsEn: [
      "Create a backup copy of your exam/lesson document first.",
      "On the Mercy Windows build, open Plugins and run the Math Equation utility on the duplicate file, or use Insert -> Equation for new formulas.",
    ],
    expectedResult: "Công thức toán học hiển thị sắc nét và chỉnh sửa trực tiếp bằng trình Equation.",
    stopConditions: "Luôn thao tác trên bản sao tài liệu để đối chiếu ký hiệu toán học sau chuyển đổi.",
    escalateWhen: "Tệp chứa hàng trăm công thức OLE đặc thù cần kỹ thuật viên hỗ trợ kiểm tra trực tiếp.",
    chunks: [
      {
        chunkId: "chk_mathtype_01",
        articleId: "kb_plugin_mathtype_equation",
        version: "1.0",
        sectionTitle: "Chuyển công thức MathType và tạo Equation mới",
        content:
          "Sao lưu tệp giáo án/đề thi gốc trước, sau đó mở bản sao trên ONLYOFFICE Mercy (Windows) -> vào thẻ Plugins dùng tiện ích chuyển đổi công thức Toán sang Equation, hoặc vào Insert > Equation để soạn mới.",
        contentEn:
          "Back up the original document first, then use the Math utility under Plugins on the Mercy Windows build or Insert > Equation.",
        keywords: ["mathtype", "equation", "công thức toán", "giáo án", "đề thi"],
      },
    ],
  },
  {
    articleId: "kb_plugin_ai_configuration",
    title: "Cài đặt và cấu hình Plugin AI trong trình soạn thảo ONLYOFFICE",
    titleEn: "Installing and configuring the AI Plugin inside ONLYOFFICE Editors",
    summary:
      "Hướng dẫn bật Plugin AI qua Plugin Manager và nguyên tắc bảo mật không chia sẻ API key trong hội thoại.",
    product: ["desktop_editors", "docs"],
    edition: ["mercy_service", "community", "enterprise", "unknown"],
    os: ["windows", "macos", "linux"],
    versionRange: ">=8.1",
    issueType: ["how_to_use", "technical_error"],
    audience: "public",
    sourceName: "Tài liệu Hướng dẫn ONLYOFFICE",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.0",
    symptoms: ["plugin ai", "cấu hình ai trong editor", "ai provider", "plugin manager", "lỗi kết nối plugin ai"],
    applicableConditions: "Áp dụng cho ONLYOFFICE 8.1+ khi khách muốn dùng Plugin AI tóm tắt/dịch thuật trong trình soạn thảo.",
    diagnosticQuestions: [
      "Anh/chị đang gặp vướng mắc ở bước cài đặt Plugin trong Plugin Manager hay bước kết nối nhà cung cấp mô hình? (Lưu ý: tuyệt đối KHÔNG dán API key vào khung chat này).",
    ],
    safeSteps: [
      "Mở tài liệu trong ONLYOFFICE -> chọn thẻ Plugins -> mở Plugin Manager -> tìm plugin 'AI' và nhấn Install / Update.",
      "Trong thẻ Plugins, bấm Background Plugins -> bật 'AI', sau đó mở mục 'AI -> Settings' để chọn nhà cung cấp (Provider) và mô hình tương ứng.",
      "Tự nhập khóa kết nối của riêng anh/chị trực tiếp vào ô bảo mật trong hộp thoại Settings của ứng dụng; tuyệt đối KHÔNG dán API key vào cửa sổ chat hỗ trợ.",
    ],
    safeStepsEn: [
      "In ONLYOFFICE, open Plugins -> Plugin Manager -> find 'AI' and click Install.",
      "Enable 'AI' under Background Plugins, then open AI -> Settings to select your provider and model.",
      "Enter your API key only inside ONLYOFFICE's local Settings dialog — NEVER paste your API key into this support chat.",
    ],
    expectedResult: "Menu AI xuất hiện trong trình soạn thảo và gọi được tác vụ chọn sẵn.",
    stopConditions: "Nếu khách lỡ gửi API key vào chat, nhắc khách thu hồi/đổi key ngay lập tức tại trang nhà cung cấp AI.",
    escalateWhen: "Plugin Manager không tải được danh sách plugin do mạng nội bộ chặn kết nối.",
    chunks: [
      {
        chunkId: "chk_plugin_ai_01",
        articleId: "kb_plugin_ai_configuration",
        version: "1.0",
        sectionTitle: "Cài Plugin AI và bảo mật API Key",
        content:
          "Vào Plugins > Plugin Manager cài plugin 'AI', bật trong Background Plugins rồi cấu hình nhà cung cấp tại AI > Settings. Tuyệt đối không yêu cầu và không để khách dán API key vào hội thoại; nếu lộ key, khách nên thu hồi key ngay.",
        contentEn:
          "Install the AI plugin via Plugins > Plugin Manager, enable it in Background Plugins, and configure your provider in AI > Settings. Never paste API keys into chat.",
        keywords: ["plugin ai", "plugin manager", "cài plugin", "api key", "nhà cung cấp ai"],
      },
    ],
  },
  {
    articleId: "kb_docs_vs_docspace_diff",
    title: "Phân biệt ONLYOFFICE Desktop Editors, ONLYOFFICE Docs và ONLYOFFICE DocSpace",
    titleEn: "Distinguishing ONLYOFFICE Desktop Editors, ONLYOFFICE Docs, and DocSpace",
    summary: "Giải thích rõ sự khác biệt giữa ứng dụng cài trên máy cá nhân, máy chủ nhúng soạn thảo web và không gian cộng tác phòng ban.",
    product: ["desktop_editors", "docs", "docspace"],
    edition: ["community", "enterprise", "mercy_service", "unknown"],
    os: ["unknown"],
    versionRange: "all",
    issueType: ["how_to_use", "business_policy"],
    audience: "public",
    sourceName: "Tài liệu Sản phẩm ONLYOFFICE & Mercy Tech",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.0",
    symptoms: ["phân biệt docs và desktop", "docspace là gì", "onlyoffice docs", "khác nhau giữa các bản"],
    applicableConditions: "Áp dụng khi khách cần chọn đúng dòng sản phẩm cho cá nhân hoặc doanh nghiệp.",
    diagnosticQuestions: [
      "Đơn vị anh/chị đang cần mở/sửa tệp trực tiếp trên từng máy tính cá nhân hay cần hệ thống làm việc chung nhiều người trên trình duyệt web?",
    ],
    safeSteps: [
      "ONLYOFFICE Desktop Editors (và bộ cài dịch vụ Mercy): cài trực tiếp lên máy tính Windows/macOS/Linux để mở và sửa tệp Word, Excel, PowerPoint, PDF ngoại tuyến trên máy.",
      "ONLYOFFICE Docs (Document Server): bộ trình soạn thảo chạy trên máy chủ web để tích hợp vào Nextcloud, OwnCloud, Moodle, Odoo hoặc phần mềm nội bộ.",
      "ONLYOFFICE DocSpace: nền tảng quản lý phòng làm việc (Rooms) và chia sẻ tài liệu trực tuyến tích hợp sẵn trình soạn thảo trên trình duyệt.",
    ],
    safeStepsEn: [
      "ONLYOFFICE Desktop Editors: local desktop app for Windows/macOS/Linux to edit Office and PDF files offline.",
      "ONLYOFFICE Docs (Document Server): web-based collaborative editors designed to integrate with Nextcloud, Odoo, SharePoint, or custom apps.",
      "ONLYOFFICE DocSpace: room-based collaborative cloud/self-hosted document workspace with built-in editors.",
    ],
    expectedResult: "Xác định đúng dòng sản phẩm phù hợp với kiến trúc sử dụng của khách hàng.",
    stopConditions: "Không coi mọi giao diện soạn thảo ONLYOFFICE là cùng một sản phẩm nếu chưa rõ đang mở trên trình duyệt hay ứng dụng Desktop.",
    escalateWhen: "Doanh nghiệp cần tư vấn kiến trúc triển khai máy chủ nội bộ (On-Premises).",
    chunks: [
      {
        chunkId: "chk_docs_diff_01",
        articleId: "kb_docs_vs_docspace_diff",
        version: "1.0",
        sectionTitle: "Ba dòng sản phẩm chính của ONLYOFFICE",
        content:
          "Desktop Editors là ứng dụng cài trên máy tính cá nhân (offline). ONLYOFFICE Docs là máy chủ trình soạn thảo web tích hợp vào Nextcloud/Odoo/ứng dụng riêng. ONLYOFFICE DocSpace là không gian cộng tác theo phòng (Rooms) trên trình duyệt.",
        contentEn:
          "Desktop Editors runs locally on PC/Mac/Linux; ONLYOFFICE Docs integrates web editors into platforms like Nextcloud; DocSpace provides room-based web collaboration.",
        keywords: ["desktop editors", "onlyoffice docs", "docspace", "document server", "phân biệt", "nextcloud"],
      },
    ],
  },
  {
    articleId: "kb_docs_collab_jwt_escalate",
    title: "Lỗi kết nối máy chủ ONLYOFFICE Docs, JWT Secret hoặc chứng chỉ SSL",
    titleEn: "ONLYOFFICE Docs server connection, JWT token, or SSL certificate errors",
    summary:
      "Hướng dẫn quan sát thông báo lỗi cơ bản và chuyển kỹ thuật viên đối với cấu hình JWT, chứng chỉ và máy chủ sản xuất.",
    product: ["docs", "docspace"],
    edition: ["community", "enterprise", "unknown"],
    os: ["linux", "windows", "unknown"],
    versionRange: ">=7.2",
    issueType: ["technical_error"],
    audience: "public",
    sourceName: "Tài liệu Kỹ thuật Mercy Tech",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.0",
    symptoms: [
      "document security token is not correctly formed",
      "jwt",
      "download failed document server",
      "ssl certificate",
      "docker onlyoffice docs",
    ],
    applicableConditions: "Áp dụng cho quản trị viên gặp lỗi tích hợp ONLYOFFICE Docs/DocSpace trên máy chủ.",
    diagnosticQuestions: [
      "Anh/chị đang tích hợp ONLYOFFICE Docs với nền tảng nào (ví dụ Nextcloud, OwnCloud, ứng dụng riêng) và thông báo cụ thể trên màn hình là gì?",
    ],
    safeSteps: [
      "Ghi nhận chính xác nội dung thông báo lỗi (ví dụ 'The document security token is not correctly formed' thường liên quan đến cấu hình khóa JWT chưa khớp giữa ứng dụng tích hợp và Document Server).",
      "Kiểm tra trang trạng thái cơ bản của máy chủ qua trình duyệt trên HTTPS hợp lệ (tuyệt đối KHÔNG tắt xác thực chứng chỉ SSL hoặc tắt JWT trên môi trường sản xuất).",
      "Vì can thiệp cấu hình máy chủ, JWT, chứng chỉ SSL hoặc Docker sản xuất cần kiểm tra trực tiếp an toàn, anh/chị vui lòng bấm 'Gặp kỹ thuật viên' để đội ngũ kỹ thuật Mercy Tech tiếp nhận.",
    ],
    safeStepsEn: [
      "Record the exact error message (e.g., 'The document security token is not correctly formed' indicates a JWT configuration mismatch between the host app and Document Server).",
      "Verify HTTPS reachability without disabling SSL certificate checks or turning off JWT in production.",
      "Because production server, JWT, and certificate changes require careful verification, please click 'Contact Technician' for specialist assistance.",
    ],
    expectedResult: "Thu thập đúng ngữ cảnh lỗi mà không gây rủi ro bảo mật trên máy chủ sản xuất.",
    stopConditions: "Tuyệt đối không hướng dẫn tắt kiểm tra chứng chỉ SSL (`rejectUnauthorized: false`) hay gửi khóa bí mật JWT vào khung chat.",
    escalateWhen: "Mọi trường hợp cần chỉnh sửa cấu hình máy chủ sản xuất, Docker, Reverse Proxy hoặc JWT.",
    chunks: [
      {
        chunkId: "chk_docs_jwt_01",
        articleId: "kb_docs_collab_jwt_escalate",
        version: "1.0",
        sectionTitle: "Giới hạn an toàn với JWT, SSL và máy chủ sản xuất",
        content:
          "Với lỗi 'The document security token is not correctly formed' (JWT), lỗi tải file giữa Nextcloud và Document Server hoặc chứng chỉ SSL: không bao giờ hướng dẫn tắt SSL hay gửi khóa bí mật JWT vào chat. Chỉ ghi nhận triệu chứng và chuyển phiếu sang kỹ thuật viên chuyên trách.",
        contentEn:
          "For JWT token errors, SSL issues, or production Document Server integration: never advise disabling SSL verification or pasting JWT secrets in chat; collect error details and escalate to a technician.",
        keywords: ["jwt", "security token", "ssl", "certificate", "docker", "nginx", "document server", "download failed"],
      },
    ],
  },
  {
    articleId: "kb_corrupted_file_recovery",
    title: "Xử lý an toàn khi tệp tài liệu báo hỏng, lỗi định dạng hoặc nguy cơ mất dữ liệu",
    titleEn: "Safe handling when a document appears corrupted or has data-loss risk",
    summary:
      "Nguyên tắc bắt buộc bảo vệ dữ liệu: sao lưu tệp gốc sang vị trí riêng trước bất kỳ thao tác mở thử hay khôi phục nào.",
    product: ["desktop_editors", "docs", "mercy_installer"],
    edition: ["mercy_service", "community", "enterprise", "unknown"],
    os: ["windows", "macos", "linux"],
    versionRange: "all",
    issueType: ["technical_error"],
    audience: "public",
    sourceName: "Quy chuẩn An toàn Dữ liệu Mercy Tech",
    owner: "Kỹ thuật Mercy Tech",
    approvedBy: "Trần Trung Kiên",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.2",
    symptoms: [
      "file bị hỏng",
      "corrupted",
      "không mở được file quan trọng",
      "mất dữ liệu",
      "file 0kb",
      "unknown format or damaged",
    ],
    applicableConditions: "Áp dụng ngay lập tức khi khách báo tệp tài liệu quan trọng bị lỗi mở, hỏng cấu trúc hoặc mất nội dung.",
    diagnosticQuestions: [
      "Dung lượng tệp hiện tại hiển thị trong thư mục là bao nhiêu KB/MB (có khác 0 KB không) và tệp nằm trên ổ cứng máy hay USB/đám mây?",
    ],
    safeSteps: [
      "QUAN TRỌNG — Bảo vệ tệp gốc trước tiên: Anh/chị hãy sao chép (Copy) tệp tài liệu đang lỗi sang một thư mục khác làm bản dự phòng nguyên trạng; tuyệt đối KHÔNG lưu đè (Save), không đổi đuôi tệp trực tiếp trên bản gốc và không gỡ/reset phần mềm lúc này.",
      "Kiểm tra trong cùng thư mục lưu tệp (hoặc lịch sử phiên bản đám mây nếu lưu trên OneDrive/Google Drive/DocSpace) xem còn tệp tạm hoặc phiên bản trước đó không.",
      "Bấm 'Gặp kỹ thuật viên' để kỹ thuật viên Mercy Tech hướng dẫn kiểm tra trên bản sao một cách an toàn.",
    ],
    safeStepsEn: [
      "IMPORTANT — Protect your original file first: Immediately make a duplicate copy of the affected file in a separate folder. Do NOT overwrite, rename in place, or reset/uninstall software.",
      "Check the folder or cloud version history (OneDrive/Google Drive/DocSpace) for any previous version or backup file.",
      "Click 'Contact Technician' so a Mercy Tech specialist can help inspect the duplicate copy safely.",
    ],
    expectedResult: "Tệp gốc được giữ nguyên vẹn, tránh ghi đè làm mất khả năng khôi phục.",
    stopConditions: "Dừng mọi thao tác ghi đè, xóa file tạm hoặc chạy công cụ sửa file không rõ nguồn gốc.",
    escalateWhen: "Tài liệu kế toán/hợp đồng quan trọng báo lỗi cấu trúc không mở được.",
    chunks: [
      {
        chunkId: "chk_data_safety_01",
        articleId: "kb_corrupted_file_recovery",
        version: "1.2",
        sectionTitle: "Ưu tiên sao lưu bản gốc khi có nguy cơ mất dữ liệu",
        content:
          "Khi tệp tài liệu báo hỏng (corrupted), lỗi không mở được hoặc có nguy cơ mất dữ liệu: BƯỚC 1 BẮT BUỘC là sao chép (copy) tệp gốc ra một thư mục an toàn khác trước mọi thao tác. Tuyệt đối không lưu đè lên tệp gốc, không xóa tệp tạm và không reset ứng dụng; ưu tiên chuyển kỹ thuật viên hỗ trợ trên bản sao.",
        contentEn:
          "When a document is corrupted or at risk of data loss: STEP 1 is ALWAYS to copy the original file to a separate backup folder before trying anything. Never overwrite the original file or reset the app; escalate to a technician.",
        keywords: ["file hỏng", "bị hỏng", "corrupted", "damaged", "mất dữ liệu", "cứu file", "không mở được file", "0kb"],
      },
    ],
  },
  {
    articleId: "kb_dealer_portal_stickers",
    title: "Hướng dẫn kỹ thuật Đại lý: Quản lý lô tem cào vật lý và tra cứu trạng thái kích hoạt",
    titleEn: "Dealer Technical Guide: Managing physical scratch stickers and activation status",
    summary: "Tài liệu dành riêng cho Đại lý đã xác thực về cách tra cứu Seri tem, ghi chú khách lẻ và kiểm tra thiết bị kích hoạt.",
    product: ["mercy_keys", "mercy_check"],
    edition: ["mercy_service"],
    os: ["unknown"],
    versionRange: "all",
    issueType: ["license_or_package_query", "how_to_use"],
    audience: "dealer",
    sourceName: "Sổ tay Kỹ thuật Đại lý Mercy Tech",
    sourceUrl: "/dealers/stickers",
    owner: "Quản lý Kênh Đại lý Mercy Tech",
    approvedBy: "Vy Thiên Hùng",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.0",
    symptoms: ["quản lý tem cào đại lý", "tra cứu lô tem đại lý", "dealers/stickers", "tồn kho tem đại lý"],
    applicableConditions: "Chỉ áp dụng cho tài khoản Đại lý đã đăng nhập xác thực trên hệ thống Mercy Tech.",
    diagnosticQuestions: [],
    safeSteps: [
      "Mở trang Quản lý Tem Vật Lý Đại Lý (/dealers/stickers) khi đang đăng nhập bằng tài khoản đại lý của đơn vị.",
      "Sử dụng ô tìm kiếm theo số Seri (ví dụ MT-0319227767-xxxxx) hoặc lọc theo trạng thái Đã kích hoạt / Trong kho để kiểm tra thiết bị của khách lẻ thuộc phạm vi đại lý mình.",
      "Khi cần báo kỹ thuật kiểm tra hộ khách cuối, chỉ cung cấp số Seri tem (không gửi mã cào 12 số đầy đủ qua kênh công khai).",
    ],
    safeStepsEn: [
      "Open the Dealer Physical Stickers portal (/dealers/stickers) while signed in with your verified dealer account.",
      "Filter by Serial number or status (Activated / In Stock) to view stickers assigned exclusively to your dealership.",
      "Provide only the sticker Serial number (never the full 12-digit scratch code) when escalating end-customer support.",
    ],
    expectedResult: "Đại lý tra cứu nhanh số lượng tồn kho, số lượng đã kích hoạt thuộc phạm vi phân quyền của mình.",
    stopConditions: "Mỗi đại lý chỉ được xem dữ liệu lô tem thuộc quyền sở hữu của chính đại lý đó.",
    escalateWhen: "Cần đối soát lô xuất kho hoặc hỗ trợ chuyển thiết bị cho khách hàng cuối.",
    chunks: [
      {
        chunkId: "chk_dealer_only_01",
        articleId: "kb_dealer_portal_stickers",
        version: "1.0",
        sectionTitle: "Quản lý lô tem vật lý trên cổng Đại lý (/dealers/stickers)",
        content:
          "Tài khoản Đại lý đã xác thực truy cập /dealers/stickers để xem thống kê tổng số tem, số tem còn trong kho, số tem đã kích hoạt và tra cứu theo số Seri thuộc riêng đại lý của mình.",
        contentEn:
          "Authenticated dealers can visit /dealers/stickers to inspect inventory counts, activation status, and serial numbers assigned to their own dealership.",
        keywords: ["đại lý", "dealer", "lô tem", "tem cào vật lý", "tồn kho tem", "dealers/stickers"],
      },
    ],
  },
  {
    articleId: "kb_commercial_policy_packages",
    title: "Chính sách gói triển khai nhiều máy và hợp tác Đại lý Mercy Tech",
    titleEn: "Multi-PC deployment packages and Mercy Tech Dealer partnership policy",
    summary: "Thông tin định hướng các gói triển khai doanh nghiệp và kênh đại lý đã được phê duyệt.",
    product: ["mercy_keys", "mercy_installer"],
    edition: ["mercy_service"],
    os: ["windows"],
    versionRange: "all",
    issueType: ["business_policy", "license_or_package_query"],
    audience: "public",
    sourceName: "Chính sách Kinh doanh Mercy Tech",
    owner: "Ban Giám đốc Mercy Tech",
    approvedBy: "Vy Thiên Hùng",
    approvedAt: "2026-10-29",
    effectiveAt: "2026-10-29",
    nextReviewAt: "2027-01-29",
    status: "published",
    version: "1.0",
    isCommercialPolicy: true,
    symptoms: ["bảng giá", "mua bản quyền", "giá bao nhiêu", "trở thành đại lý", "triển khai nhiều máy", "xuất hóa đơn vat"],
    applicableConditions: "Chỉ trả lời chi tiết mức giá khi quản trị viên đã bật cờ phê duyệt chính sách thương mại.",
    diagnosticQuestions: [
      "Đơn vị anh/chị dự kiến triển khai khoảng bao nhiêu máy tính hoặc đang quan tâm hình thức hợp tác Đại lý?",
    ],
    safeSteps: [
      "Mercy Tech cung cấp gói dịch vụ cài đặt tối ưu, bộ tiện ích tiếng Việt kèm hỗ trợ kỹ thuật, hóa đơn/hồ sơ chứng từ cho cá nhân, doanh nghiệp và đối tác đại lý.",
      "Khách hàng có thể trải nghiệm trước qua chế độ Dùng thử 7 ngày trên máy tính thực tế.",
      "Để nhận báo giá chính thức đúng số lượng máy hoặc chính sách chiết khấu đại lý hiện hành, vui lòng để lại thông tin qua nút 'Gặp kỹ thuật viên' hoặc liên hệ Zalo CSKH 0763 068 614 (Mercy Tech Global).",
    ],
    safeStepsEn: [
      "Mercy Tech offers deployment packages with Vietnamese utilities, technical support, and official documentation for businesses and dealers.",
      "You can evaluate compatibility first with the 7-day trial.",
      "For an official quote tailored to your seat count or dealer tier, please submit a request or contact Mercy Tech Support (0763 068 614).",
    ],
    expectedResult: "Khách nhận thông tin chính thống mà không bị nhầm lẫn giữa các mức giá chưa đối soát.",
    stopConditions: "Không tự chọn đại một con số giá nếu chính sách giá chưa được quản trị viên duyệt bật.",
    escalateWhen: "Khách cần báo giá chính thức, hợp đồng hoặc đăng ký đại lý.",
    chunks: [
      {
        chunkId: "chk_commercial_01",
        articleId: "kb_commercial_policy_packages",
        version: "1.0",
        sectionTitle: "Tư vấn gói triển khai và báo giá chính thức",
        content:
          "Mercy Tech hỗ trợ triển khai cho cá nhân, doanh nghiệp nhiều máy và đối tác đại lý (có chế độ Dùng thử 7 ngày). Mức phí cụ thể phụ thuộc số lượng máy và chương trình được phê duyệt tại thời điểm báo giá; khách hàng liên hệ CSKH 0763 068 614 (Mercy Tech Global) để nhận báo giá chính thức.",
        contentEn:
          "Mercy Tech provides business multi-seat and dealer packages alongside a 7-day trial. Official quotes are provided based on seat count by Mercy Tech Customer Care (0763 068 614).",
        keywords: ["giá", "bảng giá", "bao nhiêu tiền", "mua gói", "đại lý", "nhiều máy", "hóa đơn", "pricing", "quote"],
      },
    ],
  },
];

// Runtime overrides map so Admin / automated tests can publish, update, or withdraw articles dynamically
const runtimeArticleOverrides = new Map<string, KnowledgeArticle>();

export function upsertRuntimeKnowledgeArticle(article: KnowledgeArticle): void {
  runtimeArticleOverrides.set(article.articleId, { ...article });
  bumpKnowledgeCacheRevision();
}

export function setKnowledgeArticleStatus(
  articleId: string,
  status: KnowledgeArticleStatus
): boolean {
  const existingOverride = runtimeArticleOverrides.get(articleId);
  if (existingOverride) {
    runtimeArticleOverrides.set(articleId, { ...existingOverride, status });
    bumpKnowledgeCacheRevision();
    return true;
  }
  const base = BASE_ARTICLES.find((a) => a.articleId === articleId);
  if (!base) return false;
  runtimeArticleOverrides.set(articleId, { ...base, status });
  bumpKnowledgeCacheRevision();
  return true;
}

export function resetRuntimeKnowledgeOverrides(): void {
  runtimeArticleOverrides.clear();
  bumpKnowledgeCacheRevision();
}

function canOwnerReadAudience(
  owner: SupportOwnerContext,
  audience: KnowledgeAudience
): boolean {
  if (owner.isAdmin || owner.isTechnician) return true;
  if (audience === "public") return true;
  if (audience === "authenticated") {
    return owner.ownerType !== "guest";
  }
  if (audience === "dealer") {
    return owner.ownerType === "dealer";
  }
  if (audience === "technician") {
    return owner.isTechnician || owner.isAdmin;
  }
  return false;
}

let cachedMergedCatalog: {
  revision: number;
  articles: KnowledgeArticle[];
} | null = null;

const BUILTIN_SEED_FAQ_IDS = new Set([
  "faq_1",
  "faq_2",
  "faq_3",
  "faq_4",
  "faq_5",
  "faq_6",
]);

const STOPWORDS_NORM = new Set([
  // Vietnamese pronouns, particles, verbs & generic conversational words
  "ban", "anh", "chi", "em", "minh", "toi", "chung", "ta", "ho", "no",
  "cho", "hoi", "xin", "chao", "cam", "on", "vui", "long", "nho",
  "co", "khong", "chua", "da", "dang", "se", "vua", "moi", "cu", "rat", "qua",
  "la", "gi", "nao", "nhu", "the", "sao", "viec", "cach", "lam", "duoc", "bi",
  "voi", "cua", "trong", "tren", "duoi", "ngoai", "khi", "luc", "neu", "thi", "ma",
  "hay", "hoac", "va", "de", "do", "nay", "kia", "vay", "nhe", "nha", "ơi", "oi",
  "giup", "ho", "tro", "can", "muon", "biet", "xem", "thu", "dung", "sai",
  "chuc", "nang", "tinh", "tac", "dung", "ai", "day", "dau", "may", "mot", "hai", "ba",
  "nhung", "cac", "moi", "ve", "tu", "ra", "vao", "len", "xuong", "lai", "di", "den",
  "van", "con", "het", "phan", "mem", "ung", "dung", "he", "thong", "kiem", "tra",
  // English stopwords
  "the", "and", "for", "with", "this", "that", "from", "have", "has", "had",
  "what", "how", "why", "who", "when", "where", "which", "can", "could", "would", "should",
  "you", "your", "yours", "are", "was", "were", "been", "being", "does", "did", "doing",
  "help", "please", "need", "want", "know", "about", "into", "onto", "just", "like",
]);

function extractCleanWords(text: string): string[] {
  const norm = removeVietnameseTones(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9.#+-]+/g, " ")
    .trim();
  if (!norm) return [];
  return norm.split(/\s+/).filter((t) => t.length >= 2);
}

export function tokenizeNormalized(text: string): string[] {
  return extractCleanWords(text).filter(
    (t) =>
      !STOPWORDS_NORM.has(t) &&
      (t.length >= 3 || t === "os" || t === "pc" || t === "id" || t.startsWith("#"))
  );
}

function containsPhraseOrWord(
  haystackNorm: string,
  haystackWords: Set<string>,
  phraseRaw: string
): boolean {
  const pWords = extractCleanWords(phraseRaw);
  if (pWords.length === 0) return false;
  if (pWords.length === 1) {
    const w = pWords[0];
    if (STOPWORDS_NORM.has(w) && w.length < 5) return false;
    return haystackWords.has(w);
  }
  const joined = pWords.join(" ");
  if (joined.length < 4) return false;
  const escaped = joined.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^|\\s)${escaped}(?:$|\\s)`, "i").test(haystackNorm);
}

export async function getActiveKnowledgeCatalog(): Promise<KnowledgeArticle[]> {
  const currentRev = getKnowledgeCacheRevision();
  if (cachedMergedCatalog && cachedMergedCatalog.revision === currentRev) {
    return cachedMergedCatalog.articles;
  }

  const merged = new Map<string, KnowledgeArticle>();
  for (const base of BASE_ARTICLES) {
    merged.set(base.articleId, base);
  }
  for (const [id, override] of runtimeArticleOverrides.entries()) {
    merged.set(id, override);
  }

  // Merge custom FAQs added by Admin (skipping unmodified starter seed IDs already covered by BASE_ARTICLES)
  try {
    const customFaqs = await getFaqs();
    for (const faq of customFaqs) {
      if (BUILTIN_SEED_FAQ_IDS.has(faq.id)) continue;
      const articleId = `admin_${faq.id}`;
      if (runtimeArticleOverrides.has(articleId)) continue;
      const status: KnowledgeArticleStatus = faq.status || "published";
      const product: SupportProduct[] = faq.product
        ? [faq.product as SupportProduct]
        : ["desktop_editors", "mercy_installer", "unknown"];
      const os: SupportOS[] = faq.os
        ? [faq.os as SupportOS]
        : ["windows", "macos", "linux", "unknown"];

      const meaningfulKeywords = tokenizeNormalized(faq.question).filter(
        (w) => w.length >= 3
      );

      merged.set(articleId, {
        articleId,
        title: faq.question,
        titleEn: faq.question,
        summary: "Hướng dẫn kỹ thuật đã được quản trị viên Mercy Tech phê duyệt.",
        product,
        edition: ["mercy_service", "community", "unknown"],
        os,
        versionRange: "all",
        issueType: ["how_to_use", "technical_error"],
        audience: faq.audience || "public",
        sourceName: "Cơ sở tri thức Quản trị Mercy Tech",
        owner: "Admin Mercy Tech",
        approvedBy: faq.approvedBy || "Admin",
        approvedAt: new Date(faq.updatedAt || Date.now()).toISOString().slice(0, 10),
        effectiveAt: "2026-10-29",
        nextReviewAt: "2027-01-29",
        status,
        version: faq.version || "1.0",
        isCommercialPolicy: Boolean(faq.isCommercialPolicy),
        symptoms: [faq.question.toLowerCase()],
        applicableConditions: "Tài liệu quản trị viên cập nhật",
        diagnosticQuestions: [],
        safeSteps: [faq.answer],
        expectedResult: "Thực hiện theo hướng dẫn đã phê duyệt.",
        stopConditions: "Không áp dụng ngoài phạm vi mô tả.",
        escalateWhen: "Vẫn còn lỗi sau khi kiểm tra.",
        chunks: [
          {
            chunkId: `chk_${faq.id}`,
            articleId,
            version: faq.version || "1.0",
            sectionTitle: faq.question,
            content: faq.answer,
            keywords: meaningfulKeywords,
          },
        ],
      });
    }
  } catch {
    // Fallback to built-in catalog if storage unavailable
  }

  const articles = Array.from(merged.values());
  cachedMergedCatalog = { revision: currentRev, articles };
  return articles;
}

export type KnowledgeSearchOptions = {
  query: string;
  owner: SupportOwnerContext;
  product?: SupportProduct;
  os?: SupportOS;
  intent?: SupportIntent;
  topK?: number;
};

export type RetrievedKnowledgeItem = {
  article: KnowledgeArticle;
  chunk: KnowledgeChunk;
  score: number;
};

export async function searchApprovedKnowledge(
  options: KnowledgeSearchOptions
): Promise<{
  items: RetrievedKnowledgeItem[];
  commercialPolicyBlocked: boolean;
}> {
  const [catalog, settings] = await Promise.all([
    getActiveKnowledgeCatalog(),
    getBotSettings(),
  ]);

  const queryRaw = (options.query || "").trim().toLowerCase();
  const queryCleanWords = extractCleanWords(queryRaw);
  const queryNorm = queryCleanWords.join(" ");
  const queryWordSet = new Set(queryCleanWords);
  const queryTokens = tokenizeNormalized(queryRaw);
  const topK = Math.min(8, Math.max(1, options.topK || 4));

  // If query contains zero meaningful domain tokens after stopword removal, do NOT hallucinate random KB articles!
  if (queryTokens.length === 0) {
    return { items: [], commercialPolicyBlocked: false };
  }

  let commercialPolicyBlocked = false;
  const scored: RetrievedKnowledgeItem[] = [];

  for (const article of catalog) {
    // 1. Strict publication check (withdrawn/draft/review articles NEVER surface)
    if (article.status !== "published") continue;

    // 2. Server-side RBAC audience check
    if (!canOwnerReadAudience(options.owner, article.audience)) continue;

    // 3. Commercial policy approval gate (Section 11.1 & 24)
    if (article.isCommercialPolicy && !settings.commercialPolicyApproved) {
      const hitsCommercial = article.symptoms.some((s) =>
        containsPhraseOrWord(queryNorm, queryWordSet, s)
      );
      if (hitsCommercial || options.intent === "business_policy") {
        commercialPolicyBlocked = true;
      }
      continue;
    }

    // 4. Hard OS filter: do NOT return Windows-only articles when user explicitly uses macOS/Linux/mobile
    if (
      options.os &&
      options.os !== "unknown" &&
      !article.os.includes("unknown") &&
      !article.os.includes(options.os)
    ) {
      continue;
    }

    for (const chunk of article.chunks) {
      let domainScore = 0;

      const haystackWordsArr = extractCleanWords(
        [
          article.title,
          article.titleEn,
          article.summary,
          ...article.symptoms,
          chunk.sectionTitle,
          chunk.content,
          chunk.contentEn || "",
          ...chunk.keywords,
        ].join(" ")
      );
      const haystackWords = new Set(haystackWordsArr);

      // Exact symptom / error phrase matches
      for (const symptom of article.symptoms) {
        if (containsPhraseOrWord(queryNorm, queryWordSet, symptom)) {
          domainScore += 10;
        }
      }

      // Curated keyword matches (whole-word / phrase boundary only!)
      for (const kw of chunk.keywords) {
        if (containsPhraseOrWord(queryNorm, queryWordSet, kw)) {
          domainScore += 5;
        }
      }

      // Meaningful non-stopword token overlap
      for (const token of queryTokens) {
        if (haystackWords.has(token)) {
          domainScore +=
            token.includes(".dll") || token.startsWith("#") || token.includes("vni") || token.includes("tcvn")
              ? 8
              : 3;
        }
      }

      // Require genuine domain keyword/token overlap before adding context alignment bonuses!
      if (domainScore < 5) {
        continue;
      }

      let totalScore = domainScore;
      if (
        options.product &&
        options.product !== "unknown" &&
        article.product.includes(options.product)
      ) {
        totalScore += 2;
      }
      if (
        options.os &&
        options.os !== "unknown" &&
        article.os.includes(options.os)
      ) {
        totalScore += 3;
      }
      if (options.intent && article.issueType.includes(options.intent)) {
        totalScore += 2;
      }

      if (totalScore >= 7) {
        scored.push({ article, chunk, score: totalScore });
      }
    }
  }

  scored.sort((a, b) => b.score - a.score);

  // Deduplicate by articleId keeping highest-scoring chunk
  const seenArticles = new Set<string>();
  const deduped: RetrievedKnowledgeItem[] = [];
  for (const item of scored) {
    if (seenArticles.has(item.article.articleId)) continue;
    seenArticles.add(item.article.articleId);
    deduped.push(item);
    if (deduped.length >= topK) break;
  }

  return { items: deduped, commercialPolicyBlocked };
}

/**
 * Maps model-selected chunk IDs strictly against the backend-retrieved chunks for this turn.
 * Prevents hallucinated citations or cross-audience citation leakage.
 */
export function mapValidCitations(
  selectedChunkIds: string[],
  retrievedItems: RetrievedKnowledgeItem[]
): SupportCitation[] {
  const byChunkId = new Map<string, RetrievedKnowledgeItem>();
  for (const item of retrievedItems) {
    byChunkId.set(item.chunk.chunkId, item);
  }

  const citations: SupportCitation[] = [];
  if (!selectedChunkIds || selectedChunkIds.length === 0) {
    const strongItems = retrievedItems.filter((i) => i.score >= 12);
    if (strongItems.length === 0) return [];
    return strongItems.slice(0, 1).map((matched) => ({
      chunkId: matched.chunk.chunkId,
      articleId: matched.article.articleId,
      title: matched.article.title,
      section: matched.chunk.sectionTitle,
      version: matched.article.version,
      product: matched.article.product,
      os: matched.article.os,
      url: matched.article.sourceUrl,
      updatedAt: matched.article.approvedAt,
    }));
  }

  const idsToUse = selectedChunkIds;

  for (const id of idsToUse) {
    const matched = byChunkId.get(id);
    if (!matched) continue;
    citations.push({
      chunkId: matched.chunk.chunkId,
      articleId: matched.article.articleId,
      title: matched.article.title,
      section: matched.chunk.sectionTitle,
      version: matched.article.version,
      product: matched.article.product,
      os: matched.article.os,
      url: matched.article.sourceUrl,
      updatedAt: matched.article.approvedAt,
    });
  }

  return citations;
}

