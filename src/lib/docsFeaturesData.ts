export interface FeatureDetail {
  slug: string;
  tag: string;
  enTag: string;
  title: string;
  enTitle: string;
  subtitle: string;
  enSubtitle: string;
  desc: string;
  enDesc: string;
  img: string;
  stats: { label: string; value: string }[];
  keyHighlights: {
    title: string;
    description: string;
    points: string[];
  }[];
  formatBadges: string[];
  comparisonTable: {
    feature: string;
    onlyoffice: string;
    traditional: string;
  }[];
  faq: {
    q: string;
    a: string;
  }[];
}

export const featureDetailMap: Record<string, FeatureDetail> = {
  "tuong-thich-dinh-dang": {
    slug: "tuong-thich-dinh-dang",
    tag: "ĐA ĐỊNH DẠNG",
    enTag: "MULTI-FORMAT",
    title: "Tương Thích Linh Hoạt Với Mọi Loại Tài Liệu",
    enTitle: "Universal File Format Compatibility",
    subtitle: "Mở, chỉnh sửa mượt mà DOCX, XLSX, PPTX, PDF và hơn 50 định dạng quốc tế mà không bị lệch dòng, nhảy font hay mất dữ liệu.",
    enSubtitle: "Native ISO/IEC 29500 OOXML engine ensuring zero layout breakage across 50+ document standards.",
    desc: "Thao tác mượt mà và tương thích đa dạng file DOCX, DOC, DOCM, DOTX, DjVu, EPUB, FB2, HTML, ODT, OTT, PDF, PDF/A, RTF, TXT, XML, XPS, HWP, HWPX, Pages...",
    enDesc: "Seamlessly work with DOCX, DOC, XLSX, PPTX, PDF, EPUB, ODF, RTF without layout breaking.",
    img: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/qt-tuong-thich.jpg",
    stats: [
      { value: "99.8%", label: "Tương thích Microsoft Word & Excel" },
      { value: "50+", label: "Định dạng file văn phòng được hỗ trợ" },
      { value: "0 Lỗi", label: "Gõ tiếng Việt Unicode & VNI" },
      { value: "ISO 29500", label: "Chuẩn OOXML quốc tế chính thức" },
    ],
    keyHighlights: [
      {
        title: "Bộ Engine OOXML Bản Quyền Chuẩn Xác",
        description: "ONLYOFFICE sử dụng trực tiếp cấu trúc OOXML (Office Open XML) tiêu chuẩn quốc tế giống như Microsoft Office, không qua bộ chuyển đổi trung gian HTML.",
        points: [
          "Bảo toàn 100% các công thức toán học, bảng biểu phức tạp và font chữ tiếng Việt (Arial, Times New Roman, Calibri, Roboto).",
          "Mở và lưu trực tiếp đuôi .docx, .xlsx, .pptx mà không bị cảnh báo định dạng không tương thích khi gửi đối tác.",
          "Hỗ trợ đầy đủ các thuộc tính SmartArt, WordArt và biểu đồ nhúng liên kết giữa Excel và Word.",
        ],
      },
      {
        title: "Đọc & Chuyển Đổi Đa Chiều Hơn 50 Định Dạng",
        description: "Dễ dàng làm việc với các định dạng cũ, định dạng mã nguồn mở ODF của LibreOffice hoặc các tệp sách điện tử.",
        points: [
          "Văn bản: DOCX, DOC, DOCM, DOTX, ODT, OTT, RTF, TXT, HTML, EPUB, FB2, MOBI, DjVu, Pages.",
          "Bảng tính: XLSX, XLS, XLSM, XLTX, ODS, OTS, CSV, TSV, Numbers.",
          "Trình chiếu: PPTX, PPT, PPTM, POTX, ODP, OTP, Keynote.",
          "Tệp đồ họa & kỹ thuật: Hỗ trợ mở và xem sắc nét sơ đồ Microsoft Visio (VSDX, VSD).",
        ],
      },
      {
        title: "Xử Lý PDF Nâng Cao & Chuẩn Lưu Trữ Quốc Gia",
        description: "Chỉnh sửa trực tiếp văn bản trong file PDF và xuất định dạng PDF/A phục vụ lưu trữ tài liệu vĩnh viễn theo quy định nhà nước.",
        points: [
          "Sửa lỗi chính tả, thay đổi số liệu hợp đồng PDF ngay lập tức mà không cần tìm file Word gốc.",
          "Chuyển đổi 2 chiều PDF sang DOCX chỉ trong 1 cú click với độ chính xác định dạng cao.",
          "Tuân thủ tiêu chuẩn lưu trữ số hóa văn bản lưu trữ ISO 19005 (PDF/A).",
        ],
      },
    ],
    formatBadges: [
      "DOCX", "XLSX", "PPTX", "PDF", "PDF/A", "ODT", "ODS", "ODP", "DOC", "XLS", "PPT", "RTF", "TXT", "HTML", "EPUB", "FB2", "VSDX", "HWP", "Pages"
    ],
    comparisonTable: [
      {
        feature: "Cấu trúc định dạng lõi",
        onlyoffice: "Chuẩn OOXML ISO/IEC 29500 (giống MS Office)",
        traditional: "Dùng HTML nội bộ → Hay bị vỡ khung, lệch tab",
      },
      {
        feature: "Mở file Excel chứa Macro",
        onlyoffice: "Hỗ trợ đọc & chạy Macro JavaScript bảo mật",
        traditional: "Dễ bị lỗi crash hoặc vô hiệu hóa macro",
      },
      {
        feature: "Mở sơ đồ Visio (VSDX)",
        onlyoffice: "Tích hợp sẵn bộ xem vector VSDX sắc nét",
        traditional: "Không hỗ trợ, bắt buộc mua thêm phần mềm ngoài",
      },
      {
        feature: "Gõ tiếng Việt Telex/VNI",
        onlyoffice: "100% mượt mà, không kẹt phím, không mất dấu",
        traditional: "Hay bị lỗi mất chữ đầu câu hoặc gạch chân đỏ",
      },
    ],
    faq: [
      {
        q: "ONLYOFFICE có đọc được các file Word (.docx) chứa bảng biểu phức tạp không?",
        a: "Hoàn toàn có. Vì sử dụng trực tiếp cấu trúc OOXML gốc, ONLYOFFICE hiển thị chuẩn xác từng bảng biểu, viền nét và công thức giống hệt như trên Microsoft Office.",
      },
      {
        q: "Khi tôi sửa file trên ONLYOFFICE rồi gửi cho đối tác dùng Microsoft 365 có bị lỗi không?",
        a: "Không. Đối tác của bạn mở file ra sẽ thấy định dạng nguyên vẹn 100%, không xuất hiện bất kỳ cảnh báo định dạng lạ nào.",
      },
    ],
  },

  "xu-ly-tron-bo": {
    slug: "xu-ly-tron-bo",
    tag: "ĐA NỀN TẢNG",
    enTag: "COMPREHENSIVE SUITE",
    title: "Xử Lý Trọn Bộ Tài Liệu Trên 1 Nền Tảng",
    enTitle: "Complete Document Suite on 1 Platform",
    subtitle: "Tất cả công cụ bạn cần: Soạn thảo văn bản, Bảng tính, Thuyết trình, PDF Editor, Biểu mẫu và Xem sơ đồ quy trình trong cùng một giao diện duy nhất.",
    enSubtitle: "6-in-1 workspace engine consolidating text, data, slides, PDFs, forms, and diagrams into a single seamless tab.",
    desc: "Đủ bộ soạn thảo văn bản, bảng tính, thuyết trình tích hợp thêm biểu mẫu, PDF, Ebook và trình xem sơ đồ.",
    enDesc: "Complete document ecosystem: word, sheet, slide, PDF, forms, diagrams.",
    img: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/qt-xu-ly-tron-bo.jpg",
    stats: [
      { value: "6 Trong 1", label: "Ứng dụng văn phòng cốt lõi hợp nhất" },
      { value: "Tiết kiệm 70%", label: "Chi phí bản quyền phần mềm rời rạc" },
      { value: "1 Cửa Sổ", label: "Chuyển đổi linh hoạt giữa các tài liệu" },
      { value: "40+ Plugins", label: "Mở rộng tính năng không giới hạn" },
    ],
    keyHighlights: [
      {
        title: "Document Editor — Soạn Thảo Văn Bản Chuyên Nghiệp",
        description: "Đầy đủ công cụ đánh số trang, tạo mục lục tự động, chú thích học thuật, kiểm tra ngữ pháp tiếng Việt và nhúng biểu đồ liên kết.",
        points: [
          "Tự do tùy biến giao diện tab kiểu Ribbon quen thuộc giúp nhân sự chuyển đổi sử dụng ngay không cần đào tạo lại.",
          "Chế độ xem tài liệu đa dạng: Page View, Web View, Focus Mode giúp tập trung cao độ khi viết lách.",
        ],
      },
      {
        title: "Spreadsheet Editor — Bảng Tính Hơn 400 Hàm & Pivot Table",
        description: "Xử lý dữ liệu lớn, tính toán chính xác với hơn 400 hàm toán học, tài chính và thống kê chuyên sâu.",
        points: [
          "Bảng Pivot đa chiều kéo thả nhanh chóng, tự động tổng hợp số liệu kinh doanh theo phòng ban.",
          "Chế độ Personal Sheet Views cho phép lọc số liệu mà không làm phiền màn hình đồng nghiệp đang cùng xem.",
        ],
      },
      {
        title: "Presentation Maker & PDF Studio & Form Creator",
        description: "Bộ ba công cụ thiết kế slide trình diễn, chỉnh sửa trực tiếp PDF và tạo biểu mẫu điện tử thu thập thông tin.",
        points: [
          "Hiệu ứng chuyển slide 3D mượt mà kèm Presenter View chuyên nghiệp hiển thị ghi chú riêng cho diễn giả.",
          "Sửa trực tiếp từng chữ và ảnh trong tệp PDF mà không cần chuyển đổi trung gian.",
          "Tạo biểu mẫu điền tự động với chữ ký số pháp lý.",
        ],
      },
    ],
    formatBadges: ["Văn bản DOCX", "Bảng tính XLSX", "Thuyết trình PPTX", "PDF Editor", "Biểu mẫu OFORM", "Sơ đồ VSDX"],
    comparisonTable: [
      {
        feature: "Số lượng ứng dụng cài đặt",
        onlyoffice: "1 bộ duy nhất chứa đủ 6 công cụ",
        traditional: "Phải mua & cài riêng Word, Excel, PPT, Acrobat, Visio",
      },
      {
        feature: "Tiêu hao RAM & Bộ nhớ",
        onlyoffice: "Kiến trúc web-native siêu nhẹ, chiếm dưới 300MB RAM",
        traditional: "Nặng nề, mỗi ứng dụng chiếm 1-2GB RAM",
      },
      {
        feature: "Chi phí mua bản quyền",
        onlyoffice: "Giấy phép vĩnh viễn hoặc thuê bao hợp lý",
        traditional: "Thuê bao đắt đỏ hằng năm theo từng ứng dụng",
      },
    ],
    faq: [
      {
        q: "Tôi có thể mở đồng thời nhiều file văn bản và bảng tính cùng lúc không?",
        a: "Có. Giao diện ONLYOFFICE hỗ trợ các tab tài liệu đa nhiệm như một trình duyệt web, giúp bạn chuyển đổi tức thì giữa Word và Excel chỉ trong 1 giây.",
      },
    ],
  },

  "cong-tac": {
    slug: "cong-tac",
    tag: "CỘNG TÁC",
    enTag: "COLLABORATION",
    title: "Cộng Tác Linh Hoạt Ngay Trên Tài Liệu",
    enTitle: "Dynamic Team Co-Authoring & Review",
    subtitle: "Đồng chỉnh sửa thời gian thực, bình luận, gắn thẻ @mention, chat nội bộ và gọi video trực tiếp ngay trên tài liệu mà không cần rời mắt khỏi trang viết.",
    enSubtitle: "Real-time or paragraph-locking collaboration with integrated audio/video meetings and Track Changes.",
    desc: "Cùng chỉnh sửa, bình luận, chat và gọi video trực tiếp qua plugin trong quá trình làm việc.",
    enDesc: "Co-authoring, comments, chat, and in-document video conferencing calls.",
    img: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/qt-cong-tac.jpg",
    stats: [
      { value: "0ms", label: "Độ trễ đồng bộ con trỏ thời gian thực" },
      { value: "2 Chế Độ", label: "Fast Mode & Strict Mode độc quyền" },
      { value: "100+", label: "Người dùng đồng chỉnh sửa cùng lúc" },
      { value: "100%", label: "Lịch sử phiên bản được bảo toàn" },
    ],
    keyHighlights: [
      {
        title: "2 Chế Độ Đồng Chỉnh Sửa Độc Quyền",
        description: "Linh hoạt lựa chọn cách thức làm việc nhóm tùy theo tính chất nhạy cảm của tài liệu.",
        points: [
          "Fast Mode: Nhìn thấy con trỏ màu và từng ký tự đồng nghiệp gõ theo từng mili giây.",
          "Strict Mode: Khóa đoạn văn bản bạn đang viết để giữ bảo mật ý tưởng cho đến khi bạn bấm Save để công bố.",
        ],
      },
      {
        title: "Track Changes & So Sánh Tài Liệu (Document Comparison)",
        description: "Kiểm soát tuyệt đối mọi sửa đổi trong văn bản pháp lý và hợp đồng kinh tế.",
        points: [
          "Mỗi tác giả được gán một màu sắc riêng biệt, người quản lý có thể Accept hoặc Reject từng thay đổi cụ thể.",
          "So sánh tự động 2 phiên bản tài liệu khác nhau để hiển thị chính xác từng từ ngữ bị thêm bớt.",
          "Khôi phục nhanh chóng về bất kỳ phiên bản nào trong quá khứ nhờ Version History.",
        ],
      },
      {
        title: "Giao Tiếp Đa Kênh: Chat, Bình Luận & Gọi Video Trực Tiếp",
        description: "Trao đổi công việc tức thì mà không cần chuyển qua Slack, Zalo hay Zoom bên ngoài.",
        points: [
          "Bình luận gắn thẻ @tên đồng nghiệp để tự động gửi thông báo nhắc việc.",
          "Hộp chat trực tuyến nội bộ được mã hóa lưu trữ cùng tài liệu.",
          "Tích hợp sẵn plugin Jitsi / Zoom gọi video call trực tiếp trên thanh công cụ của tài liệu.",
        ],
      },
    ],
    formatBadges: ["Fast Mode", "Strict Mode", "Track Changes", "Version History", "@Mention", "Video Call", "Document Comparison"],
    comparisonTable: [
      {
        feature: "Chế độ đồng chỉnh sửa",
        onlyoffice: "Có cả Fast Mode (real-time) và Strict Mode (khóa đoạn văn)",
        traditional: "Chỉ có 1 chế độ, dễ bị xung đột văn bản",
      },
      {
        feature: "Họp video call trong tài liệu",
        onlyoffice: "Tích hợp sẵn Jitsi/Zoom không tốn thêm chi phí",
        traditional: "Bắt buộc mở ứng dụng họp riêng bên ngoài",
      },
      {
        feature: "Quyền riêng tư dữ liệu họp",
        onlyoffice: "Chạy trên máy chủ riêng của doanh nghiệp bạn",
        traditional: "Lưu trữ trên máy chủ công cộng bên thứ ba",
      },
    ],
    faq: [
      {
        q: "Làm thế nào để tránh việc người khác sửa đè vào đoạn văn tôi đang viết?",
        a: "Bạn chỉ cần chuyển sang chế độ 'Strict Mode'. Khi bạn đặt con trỏ vào một đoạn văn, hệ thống sẽ tạm thời khóa đoạn đó đối với những người khác cho đến khi bạn hoàn tất.",
      },
    ],
  },

  "bao-mat": {
    slug: "bao-mat",
    tag: "BẢO MẬT DOANH NGHIỆP",
    enTag: "ENTERPRISE SECURITY",
    title: "Phân Quyền Linh Hoạt, Bảo Mật Không Lỗ Hổng",
    enTitle: "Granular Permissions & Enterprise Security",
    subtitle: "Bảo vệ tối đa bí mật kinh doanh với 7 cấp độ phân quyền, mã hóa đầu cuối AES-256, đóng dấu bản quyền Watermark và tuân thủ Luật An ninh mạng Việt Nam.",
    enSubtitle: "7 permission tiers, dynamic watermarks, end-to-end encryption, and full compliance with Decree 13/2023.",
    desc: "Giới hạn truy cập/sao chép/in ấn, đóng dấu bản quyền, chữ ký số, đặt mật khẩu và mã hóa đầu cuối chặt chẽ.",
    enDesc: "Strict document restrictions: deny copy/download/print, digital signatures, and end-to-end encryption.",
    img: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/qt-phan-quyen.jpg",
    stats: [
      { value: "AES-256", label: "Chuẩn mã hóa cấp quân sự" },
      { value: "7 Cấp Độ", label: "Phân quyền truy cập chi tiết" },
      { value: "100%", label: "Dữ liệu lưu tại máy chủ Việt Nam" },
      { value: "ISO 27001", label: "Chứng chỉ bảo mật thông tin toàn cầu" },
    ],
    keyHighlights: [
      {
        title: "7 Cấp Độ Phân Quyền Tài Liệu Chuyên Sâu",
        description: "Kiểm soát chính xác ai được làm gì với từng file tài liệu và từng thư mục phòng ban.",
        points: [
          "Full Access (Toàn quyền), Review (Duyệt sửa đổi), Comment (Chỉ bình luận), Form Filling (Chỉ điền biểu mẫu).",
          "Custom Filter (Lọc bảng tính cá nhân), Read-Only (Chỉ xem), Deny Access (Chặn truy cập).",
          "Cấm hoàn toàn hành vi sao chép nội dung (Copy), tải về (Download) và in ấn (Print) đối với tài liệu nhạy cảm.",
        ],
      },
      {
        title: "Dynamic Watermark Chống Chụp Màn Hình & Rò Rỉ",
        description: "Tự động đóng dấu bản quyền chìm mờ lên tài liệu khi người xem mở file.",
        points: [
          "Con dấu hiển thị rõ email của người đang xem, địa chỉ IP và thời gian mở file chính xác đến từng giây.",
          "Nếu người xem dùng điện thoại chụp lại màn hình, thông tin cá nhân của họ sẽ in rõ trên ảnh giúp dễ dàng truy vết thủ phạm.",
        ],
      },
      {
        title: "Private Rooms — Mã Hóa Đầu Cuối (End-to-End Encryption)",
        description: "Công nghệ phòng riêng mã hóa tài liệu trực tiếp từ trình duyệt trước khi gửi lên máy chủ.",
        points: [
          "Sử dụng thuật toán mã hóa đối xứng AES-256 bit không thể bẻ khóa.",
          "Ngay cả quản trị viên hệ thống máy chủ cũng không thể đọc trộm nội dung văn bản nếu không có khóa giải mã của bạn.",
        ],
      },
    ],
    formatBadges: ["AES-256", "Watermark", "Ký số", "Private Cloud", "On-Premise", "ISO 27001", "Nghị định 13/2023"],
    comparisonTable: [
      {
        feature: "Nơi lưu trữ dữ liệu",
        onlyoffice: "100% On-Premise hoặc Cloud riêng tại Việt Nam",
        traditional: "Lưu trữ trên máy chủ công cộng ở nước ngoài",
      },
      {
        feature: "Chống chụp màn hình",
        onlyoffice: "Dynamic Watermark tự động hiện tên người xem",
        traditional: "Không có, nhân viên chụp trộm màn hình không truy vết được",
      },
      {
        feature: "Tuân thủ pháp lý Việt Nam",
        onlyoffice: "Đầy đủ hóa đơn VAT, tuân thủ Luật An ninh mạng",
        traditional: "Thanh toán thẻ quốc tế, khó khấu trừ thuế",
      },
    ],
    faq: [
      {
        q: "Doanh nghiệp tôi có thể tự cài đặt ONLYOFFICE trên máy chủ nội bộ không có kết nối internet không?",
        a: "Hoàn toàn được. ONLYOFFICE Docs hỗ trợ mô hình On-Premise triển khai trong mạng nội bộ (mạng LAN nội bộ hoặc mạng chính phủ) mà không cần kết nối ra ngoài internet.",
      },
    ],
  },

  "ai": {
    slug: "ai",
    tag: "TRÍ TUỆ NHÂN TẠO",
    enTag: "AI ASSISTANTS",
    title: "Tăng Tốc Công Việc Với Trợ Lý AI",
    enTitle: "AI-Powered Productivity Assistants",
    subtitle: "Kết nối linh hoạt với ChatGPT-4o, Claude 3.5, DeepSeek hoặc mô hình AI cục bộ bảo mật để tóm tắt văn bản, dịch thuật và sinh công thức tự động.",
    enSubtitle: "Native multi-LLM integration empowering instant summarization, translation, rewriting, and automated spreadsheet logic.",
    desc: "Kết nối linh hoạt với mọi trợ lý AI để tóm tắt, dịch, viết email và tạo nội dung ngay trong tài liệu.",
    enDesc: "Seamless integration with OpenAI, Claude, DeepSeek, and private local LLMs.",
    img: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/qt-ai.jpg",
    stats: [
      { value: "x5 Lần", label: "Tốc độ soạn thảo và xử lý văn bản" },
      { value: "100+ Ngôn Ngữ", label: "Dịch thuật tức thì chuẩn ngữ cảnh" },
      { value: "Local AI", label: "Hỗ trợ chạy offline trên máy chủ riêng" },
      { value: "0 Đô-la", label: "Phí phụ thu tính năng AI từ ONLYOFFICE" },
    ],
    keyHighlights: [
      {
        title: "Tích Hợp Trực Tiếp Vào Thanh Công Cụ Ribbon",
        description: "Không cần chuyển tab sang trang web ChatGPT rồi copy/paste qua lại dễ lộ dữ liệu nội bộ.",
        points: [
          "Bôi đen đoạn văn bản và chọn: Tóm tắt (Summarize), Viết lại (Rewrite), Đổi giọng văn (Formal/Casual/Technical).",
          "Tự động sửa lỗi chính tả tiếng Việt và cấu trúc ngữ pháp tài liệu hành chính.",
          "Tạo nội dung mới từ ý tưởng ban đầu: 'Soạn thảo bản thông báo nghỉ lễ 30/4 cho toàn thể nhân viên'.",
        ],
      },
      {
        title: "Đa Dạng Nhà Cung Cấp & Tự Do Lựa Chọn Mô Hình",
        description: "Hỗ trợ kết nối API với tất cả các nền tảng trí tuệ nhân tạo hàng đầu hiện nay.",
        points: [
          "OpenAI (GPT-4o, GPT-4o mini, o1).",
          "Anthropic (Claude 3.5 Sonnet, Claude 3 Haiku).",
          "DeepSeek (DeepSeek-V3, DeepSeek-R1 suy luận logic cao).",
          "ZhiPu Copilot và Together AI.",
        ],
      },
      {
        title: "Chế Độ Local AI Bảo Mật Dữ Liệu Tuyệt Đối",
        description: "Dành riêng cho ngân hàng, cơ quan nhà nước và doanh nghiệp có yêu cầu bảo mật thông tin khắt khe.",
        points: [
          "Chạy các mô hình ngôn ngữ lớn nguồn mở (Ollama, GPT4All, Llama 3) ngay trên phần cứng máy chủ nội bộ.",
          "100% dữ liệu văn bản không bao giờ bị gửi ra bên ngoài internet, bảo đảm an toàn dữ liệu số.",
        ],
      },
    ],
    formatBadges: ["ChatGPT-4o", "Claude 3.5", "DeepSeek", "Ollama", "Local LLMs", "Tóm tắt AI", "Dịch thuật AI"],
    comparisonTable: [
      {
        feature: "Chi phí sử dụng AI",
        onlyoffice: "Miễn phí plugin, tự dùng API key của bạn",
        traditional: "Bắt buộc trả phí $20-$30/tháng/người dùng",
      },
      {
        feature: "Bảo mật dữ liệu khi dùng AI",
        onlyoffice: "Hỗ trợ Local AI offline không gửi ra internet",
        traditional: "Buộc phải gửi dữ liệu lên cloud công cộng",
      },
      {
        feature: "Linh hoạt lựa chọn mô hình",
        onlyoffice: "Chọn OpenAI, Claude, DeepSeek tùy thích",
        traditional: "Bị khóa chặt vào 1 mô hình duy nhất của nhà cung cấp",
      },
    ],
    faq: [
      {
        q: "Dùng tính năng AI trong ONLYOFFICE có bị thu thêm tiền bản quyền không?",
        a: "Không. ONLYOFFICE cung cấp plugin AI hoàn toàn miễn phí. Doanh nghiệp chỉ cần điền mã API key của nhà cung cấp bạn chọn (OpenAI, DeepSeek) hoặc dùng Local AI miễn phí.",
      },
    ],
  },

  "da-thiet-bi": {
    slug: "da-thiet-bi",
    tag: "ĐA THIẾT BỊ",
    enTag: "CROSS-DEVICE",
    title: "Làm Việc Ở Bất Cứ Đâu — Tự Do Đa Nền Tảng",
    enTitle: "Work from Anywhere, Any Device",
    subtitle: "Đồng bộ trải nghiệm làm việc mượt mà trên trình duyệt Web, ứng dụng Desktop cho Windows/Mac/Linux và ứng dụng Di động iOS/Android.",
    enSubtitle: "Omnichannel workspace syncing web cloud, native desktop editors, and mobile apps with 100% offline capability.",
    desc: "Truy cập và xử lý tài liệu trên web, máy tính Windows/Mac/Linux và điện thoại.",
    enDesc: "Work seamlessly across Web browsers, Windows, macOS, Linux, and iOS/Android.",
    img: "https://onlyoffice.vn/wp-content/themes/onlyoffice-vn/assets/images/docs-page/qt-moi-noi.jpg",
    stats: [
      { value: "100%", label: "Khả năng làm việc Offline trên Desktop" },
      { value: "4 Hệ Điều Hành", label: "Windows, macOS, Linux, Mobile" },
      { value: "Apple Silicon", label: "Tối ưu chip M1 / M2 / M3 / M4" },
      { value: "40+ Đám Mây", label: "Kết nối Nextcloud, ownCloud, SharePoint" },
    ],
    keyHighlights: [
      {
        title: "Desktop Editor Miễn Phí Trên Mọi Hệ Điều Hành",
        description: "Tải về và sử dụng trọn đời trên máy tính cá nhân mà không cần internet.",
        points: [
          "Windows: Hỗ trợ từ Windows 7, 8, 10 đến Windows 11 với bộ cài .exe, .msi tiêu chuẩn.",
          "macOS: Tối ưu hóa đặc biệt cho chip Apple Silicon (M1/M2/M3/M4) và chip Intel, hiển thị Retina siêu nét.",
          "Linux: Đóng gói chuẩn mực cho Ubuntu, Debian, CentOS, Fedora qua DEB, RPM, Snap, Flatpak, AppImage.",
        ],
      },
      {
        title: "Ứng Dụng Mobile Thông Minh Cho iOS & Android",
        description: "Duyệt nhanh hợp đồng và xử lý công việc gấp ngay trên điện thoại khi đang di chuyển.",
        points: [
          "Giao diện tối ưu cho màn hình cảm ứng, dễ dàng đọc số liệu bảng tính và xem slide thuyết trình.",
          "Hỗ trợ chế độ Dark Mode bảo vệ mắt khi làm việc buổi tối.",
          "Kết nối trực tiếp vào đám mây doanh nghiệp để mở tài liệu nhanh chóng.",
        ],
      },
      {
        title: "Tích Hợp Sẵn Với Hơn 40 Nền Tảng Doanh Nghiệp",
        description: "Biến hệ thống lưu trữ hiện có của bạn thành không gian soạn thảo trực tuyến mạnh mẽ.",
        points: [
          "Nextcloud, ownCloud, Seafile, Alfresco, SharePoint, Confluence, Moodle, Odoo, Redmine.",
          "Đồng bộ hóa 2 chiều tự động giúp tài liệu luôn được cập nhật phiên bản mới nhất trên mọi thiết bị.",
        ],
      },
    ],
    formatBadges: ["Windows", "macOS", "Linux", "iOS", "Android", "Web Browser", "Nextcloud", "SharePoint"],
    comparisonTable: [
      {
        feature: "Hỗ trợ hệ điều hành Linux",
        onlyoffice: "Bản quyền native chính thức đầy đủ tính năng",
        traditional: "Không hỗ trợ phiên bản desktop native cho Linux",
      },
      {
        feature: "Tối ưu chip Apple M-Series",
        onlyoffice: "Chạy native ARM64 siêu tốc, không tốn pin",
        traditional: "Chạy qua giả lập Rosetta chậm và nóng máy",
      },
      {
        feature: "Làm việc khi mất mạng",
        onlyoffice: "Desktop App lưu cục bộ bình thường, tự đồng bộ khi có mạng",
        traditional: "Một số giải pháp web cloud bị đơ khi mất kết nối",
      },
    ],
    faq: [
      {
        q: "Phiên bản Desktop Editor có bị cắt giảm tính năng so với bản Web không?",
        a: "Không. Bản Desktop Editor của ONLYOFFICE sở hữu đầy đủ 100% công cụ soạn thảo, bảng tính, slide, PDF và cả plugin AI giống hệt như phiên bản web.",
      },
    ],
  },
};
