export interface BlogPost {
  id: string;
  title: string;
  category: "release" | "guides" | "security" | "stories";
  categoryName: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  featured?: boolean;
  content: string[];
}

export function getBlogPosts(isVi: boolean): BlogPost[] {
  return [
    {
      id: "trial-guide",
      title: isVi
        ? "Hướng dẫn kích hoạt bản quyền dùng thử 7 ngày ONLYOFFICE Enterprise cùng Mercy Tech"
        : "How to activate 7-day free trial of ONLYOFFICE Enterprise with Mercy Tech",
      category: "guides",
      categoryName: isVi ? "Hướng dẫn" : "Guide",
      excerpt: isVi
        ? "Cách sử dụng công cụ kích hoạt tự động (.BAT) để trải nghiệm đầy đủ tính năng văn phòng trực tuyến bảo mật, hỗ trợ AI và kết nối không giới hạn."
        : "Step-by-step tutorial to use our automated activation script (.BAT) for 7 days of full Enterprise features.",
      date: "01/10/2026",
      readTime: "4",
      author: "Mercy Tech Team",
      featured: true,
      content: [
        isVi
          ? "Để giúp các doanh nghiệp và tổ chức tại Việt Nam dễ dàng thẩm định giải pháp trước khi đầu tư bản quyền chính thức, Công ty TNHH Công Nghệ Mercy (Mercy Tech) cung cấp công cụ tự động kích hoạt 7 ngày dùng thử đầy đủ 100% tính năng của ONLYOFFICE Docs Enterprise."
          : "To help organizations evaluate the platform before purchasing, Mercy Technology provides an automated 7-day trial activation tool.",
        isVi
          ? "Quy trình kích hoạt cực kỳ đơn giản gồm 3 bước: 1. Tải file Kich-Hoat-Demo-OnlyOffice-Mercy.bat về máy tính. 2. Nhấp chuột phải chọn 'Run as administrator'. 3. Hệ thống sẽ tự động cấu hình và kích hoạt giấy phép Enterprise 7 ngày hoàn toàn miễn phí."
          : "The process is simple: 1. Download Kich-Hoat-Demo-OnlyOffice-Mercy.bat. 2. Right-click and choose 'Run as administrator'. 3. The script configures and unlocks 7 days of Enterprise features.",
        isVi
          ? "Trong suốt quá trình dùng thử, quý khách hàng nhận được sự hỗ trợ kỹ thuật trực tiếp từ đội ngũ kỹ sư Mercy Tech qua Hotline / Messenger: 0763.068.614."
          : "Throughout your trial, Mercy Tech support engineers are available via Hotline / Messenger: 0763.068.614.",
      ],
    },
    {
      id: "onlyoffice-v82",
      title: isVi
        ? "ONLYOFFICE Docs 8.2 ra mắt: Tích hợp trợ lý AI thông minh và nâng cấp trình chỉnh sửa PDF"
        : "ONLYOFFICE Docs 8.2 released: AI assistants and upgraded PDF editing",
      category: "release",
      categoryName: isVi ? "Bản phát hành" : "Release",
      excerpt: isVi
        ? "Khám phá các cải tiến vượt bậc: Tạo trường biểu mẫu nâng cao trong PDF, đồng chỉnh sửa thời gian thực mượt mà hơn và tích hợp các plugin AI hiện đại."
        : "Explore major enhancements: advanced PDF field creation, smoother real-time co-editing, and cutting-edge AI plugins.",
      date: "28/09/2026",
      readTime: "5",
      author: "ONLYOFFICE Team",
      content: [
        isVi
          ? "Phiên bản ONLYOFFICE Docs 8.2 mang đến bước nhảy vọt về khả năng xử lý biểu mẫu PDF, cho phép người dùng chèn trường chữ ký số, hộp kiểm tra và trường văn bản tự động tính toán."
          : "Version 8.2 brings major leaps in PDF form processing, allowing digital signatures and calculated text fields.",
        isVi
          ? "Plugin AI mới hỗ trợ kết nối trực tiếp với OpenAI ChatGPT, Anthropic Claude và Ollama (local AI) giúp dịch thuật, tóm tắt tài liệu và viết code tự động ngay trong trình soạn thảo."
          : "New AI plugins natively connect to OpenAI, Claude, and Ollama for translation and automated document drafting.",
      ],
    },
    {
      id: "vs-ms365",
      title: isVi
        ? "So sánh ONLYOFFICE và Microsoft 365: Đâu là lựa chọn tối ưu chi phí cho doanh nghiệp Việt?"
        : "ONLYOFFICE vs Microsoft 365: Cost-effective choice for modern businesses",
      category: "stories",
      categoryName: isVi ? "Khách hàng" : "Case Study",
      excerpt: isVi
        ? "Phân tích toàn diện về độ tương thích định dạng MS Office, tính năng bảo mật dữ liệu trên máy chủ nội bộ (On-premises) và bài toán tiết kiệm 60% chi phí bản quyền."
        : "Comprehensive comparison on MS Office compatibility, on-premises data privacy, and up to 60% software cost savings.",
      date: "22/09/2026",
      readTime: "6",
      author: "Nguyễn Minh Quân",
      content: [
        isVi
          ? "Rất nhiều doanh nghiệp tại Việt Nam đang tìm kiếm giải pháp văn phòng thay thế Microsoft 365 do chi phí thuê bao định kỳ ngoại tệ tăng cao và yêu cầu tuân thủ chủ quyền dữ liệu trong nước."
          : "Many businesses seek alternatives to Microsoft 365 due to rising recurring subscription costs and strict local data sovereignty requirements.",
        isVi
          ? "ONLYOFFICE nổi bật với khả năng cài đặt tự lưu trữ trên hạ tầng máy chủ riêng (Private Cloud / On-Premises), cấp phép vĩnh viễn không lo tăng giá hàng năm và tương thích chuẩn xác 99.9% với các tệp tin docx, xlsx, pptx."
          : "ONLYOFFICE stands out by offering on-premises self-hosting, lifetime licensing options, and native OOXML compatibility.",
      ],
    },
    {
      id: "nextcloud-integration",
      title: isVi
        ? "Hướng dẫn tích hợp ONLYOFFICE vào Nextcloud và máy chủ lưu trữ dữ liệu riêng"
        : "Integrating ONLYOFFICE into Nextcloud and private storage clouds",
      category: "guides",
      categoryName: isVi ? "Hướng dẫn" : "Guide",
      excerpt: isVi
        ? "Các bước cài đặt ONLYOFFICE Document Server qua Docker và kết nối liền mạch với ứng dụng Nextcloud chỉ trong 15 phút."
        : "Step-by-step setup of ONLYOFFICE Document Server via Docker and connecting to Nextcloud in 15 minutes.",
      date: "15/09/2026",
      readTime: "7",
      author: "Lê Hoàng Long",
      content: [
        isVi
          ? "Nextcloud kết hợp cùng ONLYOFFICE là bộ đôi hoàn hảo để xây dựng đám mây lưu trữ và cộng tác tài liệu nội bộ bảo mật chuẩn doanh nghiệp."
          : "Combining Nextcloud with ONLYOFFICE delivers the premier private cloud collaboration stack for enterprises.",
        isVi
          ? "Nhờ Connector chính thức có sẵn trên Nextcloud App Store, quản trị viên chỉ cần khai báo địa chỉ Document Server và Secret Key là toàn bộ nhân sự có thể mở và sửa tài liệu trực tiếp trên trình duyệt."
          : "Using the official Nextcloud connector, administrators can connect the Document Server with minimal configuration.",
      ],
    },
    {
      id: "security-private-rooms",
      title: isVi
        ? "Bảo mật tài liệu tối đa với Private Rooms: Mã hóa đầu cuối độc quyền của ONLYOFFICE"
        : "Maximum document security with Private Rooms: ONLYOFFICE end-to-end encryption",
      category: "security",
      categoryName: isVi ? "Bảo mật & AI" : "Security & AI",
      excerpt: isVi
        ? "Tìm hiểu cách thuật toán mã hóa AES-256 bảo vệ dữ liệu nhạy cảm của tổ chức ngay cả khi chia sẻ và đồng chỉnh sửa qua mạng Internet."
        : "How AES-256 end-to-end encryption protects confidential corporate files during real-time collaboration.",
      date: "10/09/2026",
      readTime: "5",
      author: "Security Team",
      content: [
        isVi
          ? "Tính năng Private Rooms (Phòng bảo mật riêng) cho phép mọi ký tự bạn gõ đều được mã hóa tại máy client trước khi gửi lên máy chủ, ngăn chặn triệt để nguy cơ rò rỉ dữ liệu hoặc nghe lén."
          : "Private Rooms encrypt every keystroke at the client level before transmission, preventing eavesdropping and data leaks.",
        isVi
          ? "Đây là giải pháp lý tưởng cho các ngân hàng, tổ chức tài chính, cơ quan nhà nước và bộ phận pháp chế doanh nghiệp."
          : "An ideal solution for financial institutions, governmental bodies, and legal departments.",
      ],
    },
    {
      id: "docspace-collaboration",
      title: isVi
        ? "Chuyển đổi số văn phòng làm việc không giới hạn với bộ giải pháp DocSpace"
        : "Digital workplace transformation with ONLYOFFICE DocSpace rooms",
      category: "stories",
      categoryName: isVi ? "Khách hàng" : "Case Study",
      excerpt: isVi
        ? "Mô hình phòng làm việc theo dự án (Rooms) giúp kết nối các phòng ban, khách hàng và đối tác bên ngoài một cách chặt chẽ và an toàn."
        : "Room-based collaboration streamlines teamwork with external partners and clients safely.",
      date: "05/09/2026",
      readTime: "4",
      author: "Trần Anh Tuấn",
      content: [
        isVi
          ? "ONLYOFFICE DocSpace định nghĩa lại cách chia sẻ tài liệu thông qua hệ thống phòng cộng tác chuyên biệt (Collaboration Rooms, Public Rooms, Custom Rooms)."
          : "ONLYOFFICE DocSpace redefines document sharing using dedicated rooms tailored for any workflow.",
        isVi
          ? "Người quản trị có thể phân quyền chi tiết đến từng thao tác: Chỉ xem, chỉnh sửa, nhận xét, điền biểu mẫu hoặc tải xuống."
          : "Granular permissions allow view-only, reviewing, commenting, form-filling, or downloading controls.",
      ],
    },
  ];
}
