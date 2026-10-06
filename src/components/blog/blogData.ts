export interface BlogSection {
  id: string;
  heading: string;
  paragraphs: string[];
  callout?: {
    type: "tip" | "warning" | "highlight" | "quote";
    title: string;
    text: string;
  };
  steps?: {
    step: string;
    title: string;
    desc: string;
  }[];
  codeBlock?: {
    language: string;
    code: string;
    filename?: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  categoryName: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  authorRole?: string;
  featured?: boolean;
  tags?: string[];
  content: string[];
  contentHtml?: string;
  sourceUrl?: string;
  summary?: string;
  image?: string;
  sections?: BlogSection[];
}

export function getBlogPosts(isVi: boolean): BlogPost[] {
  return [
    {
      id: "trial-guide",
      image: isVi ? "/blog/trial/vn.png" : "/blog/trial/en.png",
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
      authorRole: isVi ? "Đội ngũ Kỹ sư Chuyển đổi số" : "Digital Transformation Engineers",
      featured: true,
      tags: ["Dùng Thử 7 Ngày", "Tool .BAT", "Enterprise", "Bảo Mật"],
      summary: isVi
        ? "Bản quyền dùng thử 7 ngày ONLYOFFICE Docs Enterprise mở khóa 100% tính năng cao cấp nhất: Chỉnh sửa tài liệu đồng thời thời gian thực, tích hợp trợ lý AI thông minh, bảo mật mã hóa đầu cuối Private Rooms và kết nối linh hoạt với Nextcloud, OwnCloud, Seafile."
        : "7-day Enterprise trial unlocks 100% features: real-time collaborative editing, AI integration, Private Rooms end-to-end encryption, and seamless cloud connectors.",
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
      sections: [
        {
          id: "why-trial",
          heading: isVi ? "1. Vì sao nên thẩm định ONLYOFFICE Enterprise trước khi mua?" : "1. Why evaluate Enterprise before buying?",
          paragraphs: [
            isVi
              ? "Việc đầu tư hệ thống phần mềm văn phòng cho toàn bộ doanh nghiệp đòi hỏi sự tương thích hoàn hảo với thói quen làm việc của nhân sự, đặc biệt là các bảng tính Excel phức tạp, các macro VBA và file văn bản hành chính."
              : "Enterprise software deployments require thorough compatibility testing with existing office documents, macros, and team workflows.",
            isVi
              ? "Chương trình thẩm định 7 ngày của Mercy Tech cho phép doanh nghiệp cài đặt thử nghiệm trên máy chủ nội bộ hoặc máy trạm độc lập mà không phải trả bất kỳ khoản phí nào, không cần khai báo thẻ tín dụng."
              : "Mercy Tech's 7-day evaluation enables organizations to test on-premises servers or local PCs without credit cards or hidden commitments.",
          ],
          callout: {
            type: "highlight",
            title: isVi ? "Cam kết từ Mercy Tech" : "Mercy Tech Guarantee",
            text: isVi
              ? "100% tính năng mở khóa giống hệt phiên bản thương mại có trả phí: Không giới hạn dung lượng file, không chèn watermark quảng cáo, không giới hạn số lượng kết nối đồng thời."
              : "100% identical to paid commercial licenses: No watermarks, no file size caps, full concurrent connections.",
          },
        },
        {
          id: "step-by-step",
          heading: isVi ? "2. Quy trình 3 bước kích hoạt nhanh bằng công cụ .BAT" : "2. 3-Step automated activation with .BAT tool",
          paragraphs: [
            isVi
              ? "Đội ngũ kỹ sư Mercy Tech đã tối ưu hóa toàn bộ quá trình xác thực vào một tệp kịch bản tự động duy nhất, loại bỏ hoàn toàn các thao tác gõ lệnh phức tạp trên Terminal."
              : "Mercy Tech engineers have packaged all license verification routines into a single automated script.",
          ],
          steps: [
            {
              step: "Bước 1",
              title: isVi ? "Tải công cụ chính thức" : "Download official tool",
              desc: isVi
                ? "Tải tệp Kich-Hoat-Demo-OnlyOffice-Mercy.bat từ nút tải an toàn phía dưới hoặc liên hệ qua kênh hỗ trợ kỹ thuật."
                : "Download Kich-Hoat-Demo-OnlyOffice-Mercy.bat directly from our verified secure link.",
            },
            {
              step: "Bước 2",
              title: isVi ? "Chạy dưới quyền Administrator" : "Run as Administrator",
              desc: isVi
                ? "Nhấp chuột phải vào tệp vừa tải về, chọn 'Run as administrator' để cấp quyền cấu hình service tự động."
                : "Right-click the script and select 'Run as administrator' to grant license injection permissions.",
            },
            {
              step: "Bước 3",
              title: isVi ? "Khởi động và trải nghiệm" : "Launch and enjoy",
              desc: isVi
                ? "Màn hình thông báo 'KÍCH HOẠT THÀNH CÔNG'. Mở ONLYOFFICE và tận hưởng trọn vẹn 7 ngày bản quyền Enterprise."
                : "A confirmation prompt appears. Open ONLYOFFICE and enjoy 7 days of full Enterprise features.",
            },
          ],
          codeBlock: {
            language: "batch",
            filename: "Kich-Hoat-Demo-OnlyOffice-Mercy.bat",
            code: `@echo off
echo ========================================================
echo   CONG CU KICH HOAT DUNG THU 7 NGAY ONLYOFFICE ENTERPRISE
echo   PHAT TRIEN BOI: CONG TY TNHH CONG NGHE MERCY (MERCY TECH)
echo ========================================================
echo.
echo [*] Dang kiem tra ket noi Document Server...
echo [*] Xac thuc giay phep thu nghiem 7 ngay...
echo [OK] Kich hoat Enterprise thanh cong! Thoi han: 7 Ngay.
pause`,
          },
        },
        {
          id: "enterprise-features",
          heading: isVi ? "3. Những tính năng cao cấp nhất được mở khóa trong 7 ngày" : "3. Unlocked premium features during trial",
          paragraphs: [
            isVi
              ? "Trong 7 ngày dùng thử, bạn có quyền truy cập vào tất cả các module Enterprise tiên tiến nhất của ONLYOFFICE:"
              : "During the 7-day period, full access is granted to all Enterprise modules:",
          ],
          table: {
            headers: isVi ? ["Tính năng Enterprise", "Mô tả chi tiết", "Trạng thái dùng thử"] : ["Enterprise Feature", "Description", "Trial Status"],
            rows: isVi
              ? [
                  ["Trợ lý AI tích hợp", "Kết nối OpenAI, Claude, Ollama dịch thuật & tóm tắt tự động", "Mở khóa 100%"],
                  ["Trình chỉnh sửa PDF nâng cao", "Chèn chữ ký số, hộp kiểm, trường biểu mẫu tương tác", "Mở khóa 100%"],
                  ["Private Rooms (AES-256)", "Mã hóa đầu cuối không lưu trữ bản rõ trên máy chủ", "Mở khóa 100%"],
                  ["Đồng chỉnh sửa Realtime", "Chế độ Fast & Strict, trò chuyện và bình luận trực tiếp", "Mở khóa 100%"],
                  ["Hỗ trợ kỹ thuật 1-1", "Kỹ sư Mercy Tech hướng dẫn cài đặt & khắc phục sự cố", "Miễn phí 24/7"],
                ]
              : [
                  ["Integrated AI Assistant", "Connects OpenAI, Claude, local Ollama for smart drafting", "100% Unlocked"],
                  ["Advanced PDF Editor", "Digital signatures, form fields, calculated inputs", "100% Unlocked"],
                  ["Private Rooms (AES-256)", "End-to-end encryption with zero-knowledge servers", "100% Unlocked"],
                  ["Real-time Co-editing", "Fast & Strict modes, inline chat and review tracking", "100% Unlocked"],
                  ["1-on-1 Engineering Support", "Mercy Tech technical assistance and troubleshooting", "Free 24/7"],
                ],
          },
        },
        {
          id: "support-contact",
          heading: isVi ? "4. Hỗ trợ kỹ thuật trực tiếp và tư vấn triển khai" : "4. Technical support and deployment advisory",
          paragraphs: [
            isVi
              ? "Nếu gặp bất kỳ khó khăn nào trong quá trình tải, chạy script hoặc cấu hình kết nối Nextcloud/Docker, quý khách có thể liên hệ ngay với đội ngũ hỗ trợ kỹ thuật Mercy Tech qua Hotline 0763.068.614 hoặc Facebook Messenger chính thức."
              : "For questions regarding Docker, Nextcloud integration, or licensing, reach Mercy Tech engineers at Hotline 0763.068.614.",
            isVi
              ? "Sau 7 ngày thẩm định, nếu giải pháp đáp ứng tốt nhu cầu, Mercy Tech sẽ cung cấp gói bản quyền vĩnh viễn với hóa đơn VAT đầy đủ và bảo hành trọn đời theo thiết bị."
              : "After testing, Mercy Tech provides permanent lifetime licensing with VAT invoices and lifetime hardware-bound warranty.",
          ],
          callout: {
            type: "tip",
            title: isVi ? "Lời khuyên triển khai" : "Deployment Tip",
            text: isVi
              ? "Nên kiểm tra song song tính năng mở các file Excel kế toán chứa hàm phức tạp để so sánh tốc độ hiển thị và độ chuẩn xác giao diện 100% so với Microsoft Office."
              : "Test with complex financial spreadsheets to experience identical calculation fidelity and layout accuracy.",
          },
        },
      ],
    },
    {
      id: "onlyoffice-v82",
      image: "/blog/onlyoffice-v82.png",
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
      authorRole: isVi ? "Đội ngũ Phát triển Sản phẩm" : "Core Engineering Team",
      tags: ["Docs 8.2", "Trợ Lý AI", "Biểu Mẫu PDF", "Cập Nhật Mới"],
      summary: isVi
        ? "Phiên bản ONLYOFFICE Docs 8.2 là cột mốc lớn với việc tái cấu trúc hoàn toàn bộ công cụ PDF, tích hợp kết nối trí tuệ nhân tạo thế hệ mới và tối ưu hóa 35% tốc độ mở bảng tính lớn."
        : "ONLYOFFICE Docs 8.2 marks a major milestone with overhauled PDF editing, native generative AI hooks, and 35% faster large spreadsheet loading.",
      content: [
        isVi
          ? "Phiên bản ONLYOFFICE Docs 8.2 mang đến bước nhảy vọt về khả năng xử lý biểu mẫu PDF, cho phép người dùng chèn trường chữ ký số, hộp kiểm tra và trường văn bản tự động tính toán."
          : "Version 8.2 brings major leaps in PDF form processing, allowing digital signatures and calculated text fields.",
        isVi
          ? "Plugin AI mới hỗ trợ kết nối trực tiếp với OpenAI ChatGPT, Anthropic Claude và Ollama (local AI) giúp dịch thuật, tóm tắt tài liệu và viết code tự động ngay trong trình soạn thảo."
          : "New AI plugins natively connect to OpenAI, Claude, and Ollama for translation and automated document drafting.",
      ],
      sections: [
        {
          id: "pdf-editing",
          heading: isVi ? "1. Trình chỉnh sửa PDF nâng cao & Biểu mẫu tương tác" : "1. Advanced PDF Editor & Fillable Forms",
          paragraphs: [
            isVi
              ? "Người dùng giờ đây không còn cần đến Adobe Acrobat đắt đỏ để tạo hoặc ký duyệt tài liệu PDF. ONLYOFFICE Docs 8.2 tích hợp trực tiếp khả năng chèn chữ ký số mã hóa, tạo các hộp kiểm, danh sách thả xuống và trường tính toán số học tự động."
              : "Users no longer need expensive standalone PDF suites. Version 8.2 enables digital signatures, checkboxes, dropdowns, and automated math formulas inside PDF forms.",
            isVi
              ? "Mọi biểu mẫu được chuẩn hóa theo định dạng tiêu chuẩn quốc tế ISO 32000, đảm bảo mở đồng nhất trên mọi hệ điều hành và thiết bị di động."
              : "All forms conform to ISO 32000 standards, ensuring consistent rendering across desktop and mobile devices.",
          ],
          callout: {
            type: "highlight",
            title: isVi ? "Tính năng độc quyền" : "Exclusive Feature",
            text: isVi
              ? "Chuyển đổi 2 chiều giữa tệp DOCX và biểu mẫu PDF chỉ bằng một cú nhấp chuột, giữ nguyên 100% bố cục và định dạng font chữ."
              : "Bidirectional conversion between DOCX and fillable PDF forms with 100% layout and font preservation.",
          },
        },
        {
          id: "ai-plugins",
          heading: isVi ? "2. Tích hợp AI thông minh thế hệ mới (OpenAI, Claude, Ollama)" : "2. Next-Gen AI Assistants (OpenAI, Claude, Ollama)",
          paragraphs: [
            isVi
              ? "Thay vì phải sao chép qua lại giữa các cửa sổ chat AI, plugin AI của ONLYOFFICE 8.2 hoạt động trực tiếp trong thanh công cụ bên phải (Right Sidebar). Nhân viên có thể yêu cầu AI tóm tắt văn bản 50 trang trong 3 giây, dịch thuật đa ngôn ngữ hoặc sửa lỗi ngữ pháp tiếng Việt."
              : "Instead of window switching, the AI plugin lives right inside the editor sidebar. Summarize long reports, translate languages, or generate tables directly on canvas.",
            isVi
              ? "Đặc biệt đối với các cơ quan và doanh nghiệp có yêu cầu bảo mật nghiêm ngặt không được gửi dữ liệu ra Internet, ONLYOFFICE 8.2 hỗ trợ kết nối trực tiếp với máy chủ Ollama / Local AI nội bộ."
              : "For organizations with strict air-gap data security, Docs 8.2 connects seamlessly with on-premises Ollama local LLM instances.",
          ],
        },
        {
          id: "performance",
          heading: isVi ? "3. Tối ưu hóa hiệu năng và bảng tính lớn" : "3. Performance Boost for Big Data Spreadsheets",
          paragraphs: [
            isVi
              ? "Thuật toán xử lý ma trận bảng tính được cải tiến giúp giảm 35% lượng RAM tiêu thụ khi mở các bảng tính Excel trên 100.000 dòng. Các thao tác lọc (Filter), Pivot Table và vẽ biểu đồ động diễn ra tức thì."
              : "Overhauled spreadsheet engine cuts memory usage by 35% on workbooks exceeding 100,000 rows. Filtering, Pivot Tables, and dynamic charts render instantaneously.",
          ],
        },
      ],
    },
    {
      id: "vs-ms365",
      image: "/blog/vs-ms365.jpg",
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
      authorRole: isVi ? "Chuyên gia Tư vấn Giải pháp CNTT" : "IT Solutions Consultant",
      tags: ["So Sánh", "Tiết Kiệm Chi Phí", "On-Premises", "Tương Thích 100%"],
      summary: isVi
        ? "So sánh thực tế giữa ONLYOFFICE và Microsoft 365: Bài toán cắt giảm 60% chi phí thuê bao ngoại tệ, đảm bảo 100% chủ quyền dữ liệu và thoát khỏi rủi ro thanh tra sở hữu trí tuệ."
        : "Comparative analysis between ONLYOFFICE and MS 365: 60% cost reduction, 100% data sovereignty, and compliance assurance.",
      content: [
        isVi
          ? "Rất nhiều doanh nghiệp tại Việt Nam đang tìm kiếm giải pháp văn phòng thay thế Microsoft 365 do chi phí thuê bao định kỳ ngoại tệ tăng cao và yêu cầu tuân thủ chủ quyền dữ liệu trong nước."
          : "Many businesses seek alternatives to Microsoft 365 due to rising recurring subscription costs and strict local data sovereignty requirements.",
        isVi
          ? "ONLYOFFICE nổi bật với khả năng cài đặt tự lưu trữ trên hạ tầng máy chủ riêng (Private Cloud / On-Premises), cấp phép vĩnh viễn không lo tăng giá hàng năm và tương thích chuẩn xác 99.9% với các tệp tin docx, xlsx, pptx."
          : "ONLYOFFICE stands out by offering on-premises self-hosting, lifetime licensing options, and native OOXML compatibility.",
      ],
      sections: [
        {
          id: "cost-analysis",
          heading: isVi ? "1. Phân tích chi phí sở hữu tổng thể (TCO) trong 3 năm" : "1. 3-Year Total Cost of Ownership (TCO) Analysis",
          paragraphs: [
            isVi
              ? "Microsoft 365 yêu cầu doanh nghiệp chi trả theo mô hình đăng ký thuê bao hàng năm (Subscription) bằng ngoại tệ USD. Khi quy mô công ty mở rộng từ 50 lên 200 nhân sự, chi phí bản quyền hàng năm trở thành gánh nặng ngân sách khổng lồ."
              : "Microsoft 365 requires annual recurring subscriptions in USD, which scale aggressively as teams grow.",
            isVi
              ? "Ngược lại, ONLYOFFICE cung cấp tùy chọn cấp phép vĩnh viễn (Lifetime License). Doanh nghiệp chỉ đầu tư một lần duy nhất, khấu hao tài sản cố định và không phải chịu rủi ro tăng giá thuê bao hàng năm."
              : "ONLYOFFICE offers perpetual lifetime licensing: pay once, depreciate as fixed IT assets, and eliminate annual price hikes.",
          ],
          table: {
            headers: isVi ? ["Tiêu chí so sánh", "Microsoft 365 Business", "ONLYOFFICE Enterprise"] : ["Comparison Factor", "Microsoft 365 Business", "ONLYOFFICE Enterprise"],
            rows: isVi
              ? [
                  ["Mô hình cấp phép", "Thuê bao hàng năm (Phải gia hạn)", "Bản quyền vĩnh viễn (Sở hữu trọn đời)"],
                  ["Vị trí lưu trữ dữ liệu", "Đám mây công cộng nước ngoài", "Máy chủ nội bộ On-Premises / Private Cloud"],
                  ["Chi phí 3 năm (100 user)", "Khoảng 650.000.000đ – 850.000.000đ", "Tiết kiệm hơn 60% tổng chi phí"],
                  ["Quyền kiểm soát mã nguồn", "Đóng hoàn toàn (Blackbox)", "Mã nguồn mở minh bạch (AGPLv3)"],
                  ["Khả năng tích hợp hệ thống", "Hạn chế trong hệ sinh thái Microsoft", "Mở rộng qua API, Nextcloud, ERP/CRM tùy biến"],
                ]
              : [
                  ["Licensing Model", "Annual subscription recurring", "Perpetual lifetime ownership"],
                  ["Data Residency", "Public cloud abroad", "On-premises private server"],
                  ["3-Year Cost (100 seats)", "High recurring USD fee", "Over 60% total savings"],
                  ["Source Code Transparency", "Closed proprietary", "Open-source AGPLv3 compliance"],
                  ["System Integration", "Constrained to MS ecosystem", "Universal API & open connectors"],
                ],
          },
        },
        {
          id: "compatibility",
          heading: isVi ? "2. Độ tương thích định dạng Word, Excel, PowerPoint" : "2. Document Format Compatibility",
          paragraphs: [
            isVi
              ? "Một trong những rào cản lớn nhất khi đổi phần mềm văn phòng là sợ vỡ khung bảng biểu, lệch font chữ hoặc sai công thức tính toán. ONLYOFFICE sử dụng trực tiếp chuẩn mã hóa OpenXML (docx, xlsx, pptx) làm định dạng gốc, đảm bảo tương thích 99.9%."
              : "ONLYOFFICE uses OOXML (docx, xlsx, pptx) as its native core format, eliminating format distortion and missing fonts.",
            isVi
              ? "Người dùng có thể mở và chỉnh sửa các file biểu mẫu phức tạp của cơ quan hành chính nhà nước, file kế toán với hàng ngàn dòng công thức VLOOKUP/XLOOKUP mà không gặp bất kỳ lỗi hiển thị nào."
              : "Administrative state forms, complex accounting files with thousands of VLOOKUP/XLOOKUP functions open with zero layout distortion.",
          ],
          callout: {
            type: "highlight",
            title: isVi ? "Độ tương thích chuẩn quốc tế" : "Native OOXML Standards",
            text: isVi
              ? "ONLYOFFICE là bộ ứng dụng văn phòng duy nhất trên thế giới sử dụng trực tiếp chuẩn ISO/IEC 29500 làm cấu trúc lõi bên trong, không qua khâu biên dịch trung gian."
              : "ONLYOFFICE is the only office suite globally that uses ISO/IEC 29500 as its internal DOM model without lossy format conversions.",
          },
        },
        {
          id: "data-sovereignty",
          heading: isVi ? "3. Chủ quyền dữ liệu & Tuân thủ Luật An ninh mạng Việt Nam" : "3. Data Sovereignty & Cybersecurity Compliance",
          paragraphs: [
            isVi
              ? "Khi sử dụng Microsoft 365, dữ liệu của doanh nghiệp được lưu trữ trên các trung tâm dữ liệu đám mây công cộng ở nước ngoài (Singapore, Hồng Kông). Điều này đặt ra thách thức lớn đối với Nghị định 53/2022/NĐ-CP về yêu cầu lưu trữ dữ liệu tại Việt Nam."
              : "Microsoft 365 stores documents in foreign cloud hubs, creating compliance hurdles with local data residency regulations.",
            isVi
              ? "ONLYOFFICE cho phép doanh nghiệp triển khai 100% On-Premises trên máy chủ nội bộ hoặc Private Cloud đặt tại Viettel IDC, VNPT, FPT. Dữ liệu tài liệu tuyệt đối không rời khỏi lãnh thổ Việt Nam và không chịu rủi ro bị khóa tài khoản đơn phương."
              : "ONLYOFFICE deploys 100% on-premises on domestic infrastructure, guaranteeing full data ownership and immunity to foreign account suspensions.",
          ],
        },
        {
          id: "conclusion-choice",
          heading: isVi ? "4. Lời khuyên lựa chọn cho doanh nghiệp Việt Nam" : "4. Recommendation for Vietnamese Enterprises",
          paragraphs: [
            isVi
              ? "Nếu doanh nghiệp cần tối ưu ngân sách lâu dài, mong muốn sở hữu vĩnh viễn tài sản phần mềm và bảo mật tuyệt đối các bí mật kinh doanh trên máy chủ riêng, ONLYOFFICE Enterprise kết hợp bản quyền theo máy của Mercy Tech là khoản đầu tư chiến lược mang lại ROI cao nhất."
              : "For organizations seeking long-term cost optimization, perpetual software ownership, and strict data sovereignty, ONLYOFFICE backed by Mercy Tech delivers unmatched ROI.",
          ],
          callout: {
            type: "tip",
            title: isVi ? "Khuyến nghị từ chuyên gia Mercy Tech" : "Mercy Tech Recommendation",
            text: isVi
              ? "Hãy bắt đầu với chương trình thẩm định 7 ngày miễn phí của Mercy Tech để kiểm tra tính tương thích của 100% tệp mẫu thực tế trước khi quyết định đầu tư chính thức."
              : "Start with our free 7-day trial evaluation to benchmark your actual production documents before purchasing.",
          },
        },
      ],
    },
    {
      id: "lifetime-license-mainboard",
      image: "/blog/lifetime-license-mainboard.jpg",
      title: isVi
        ? "Tại sao doanh nghiệp và thợ IT ưu tiên bản quyền ONLYOFFICE vĩnh viễn theo Mainboard thay vì crack?"
        : "Why businesses & IT technicians prefer ONLYOFFICE lifetime license by Mainboard over cracks",
      category: "security",
      categoryName: isVi ? "Bảo mật & AI" : "Security & AI",
      excerpt: isVi
        ? "Phân tích rủi ro mã độc Ransomware từ phần mềm crack và lợi ích kinh tế vượt trội của Key Online vĩnh viễn khóa cứng theo UUID phần cứng."
        : "Analysis of ransomware risks from cracked office software and why hardware-bound lifetime licenses provide absolute safety.",
      date: "18/09/2026",
      readTime: "5",
      author: "Kỹ Sư An Toàn Thông Tin",
      authorRole: isVi ? "Chuyên gia An ninh Mạng Mercy Tech" : "Cybersecurity Specialist",
      tags: ["Bản Quyền Vĩnh Viễn", "Khóa UUID", "Chống Ransomware", "Tuân Thủ Pháp Lý"],
      summary: isVi
        ? "Nghiên cứu về các lỗ hổng bảo mật chết người từ bộ cài crack Office lậu và lý do giải pháp Key Online vĩnh viễn theo UUID Mainboard của ONLYOFFICE trở thành tiêu chuẩn mới cho các phòng máy tính và doanh nghiệp."
        : "In-depth study on backdoor vulnerabilities in cracked software and why hardware-bound licensing provides legal and security peace of mind.",
      content: [
        isVi
          ? "Việc sử dụng các công cụ crack kích hoạt Microsoft Office tiềm ẩn nguy cơ nhiễm mã độc, trojan đánh cắp dữ liệu kế toán và ngân hàng cực kỳ nguy hiểm. Các tổ chức hiện đại ngày càng chú trọng an ninh thông tin và tuân thủ sở hữu trí tuệ."
          : "Using cracked office tools exposes corporate systems to severe ransomware, financial credential stealing, and legal audits.",
        isVi
          ? "Mô hình cấp quyền theo UUID Mainboard của ONLYOFFICE mang lại giải pháp hoàn hảo: Kích hoạt 1 lần duy nhất, bản quyền gắn liền với máy tính trọn đời, tự động kích hoạt lại miễn phí khi cài lại hệ điều hành Windows mà không cần lo ngại thanh tra bản quyền."
          : "ONLYOFFICE hardware UUID-bound lifetime licensing binds permanently to the machine, reinstalls seamlessly after OS refreshes, and complies with international intellectual property laws.",
      ],
      sections: [
        {
          id: "crack-risks",
          heading: isVi ? "1. Hiểm họa ngầm từ các công cụ bẻ khóa crack Office lậu" : "1. The hidden peril of cracked office software",
          paragraphs: [
            isVi
              ? "Theo thống kê từ Trung tâm An ninh mạng, hơn 85% các công cụ kích hoạt lậu (KMS Auto, script crack trôi nổi) đều chứa mã độc nhúng sẵn trojan, keylogger và cửa sau (backdoor)."
              : "Security research shows over 85% of pirated activation tools contain embedded keyloggers, miners, and backdoors.",
            isVi
              ? "Khi nhân viên vô tình kích hoạt các phần mềm này, hệ thống máy tính công ty sẽ bị chiếm quyền điều khiển ngầm, dữ liệu nhạy cảm như hợp đồng kinh doanh, sao kê tài khoản ngân hàng và mật khẩu nội bộ sẽ bị gửi về máy chủ tin tặc."
              : "Once installed, backdoors exfiltrate banking credentials, corporate contracts, and passwords to malicious command servers.",
          ],
          callout: {
            type: "warning",
            title: isVi ? "Cảnh báo pháp lý & chế tài" : "Legal Liability Warning",
            text: isVi
              ? "Doanh nghiệp sử dụng phần mềm không bản quyền có thể bị xử phạt hành chính lên tới hàng trăm triệu đồng theo Nghị định 131/2013/NĐ-CP và chịu rủi ro bồi thường thiệt hại dân sự rất lớn khi bị thanh tra."
              : "Using unlicensed software exposes businesses to substantial administrative fines and civil lawsuits under copyright enforcement laws.",
          },
        },
        {
          id: "uuid-mechanism",
          heading: isVi ? "2. Cơ chế khóa cứng theo UUID Mainboard hoạt động ra sao?" : "2. How UUID Mainboard binding works",
          paragraphs: [
            isVi
              ? "UUID (Universally Unique Identifier) là mã định danh phần cứng duy nhất được ghi trên vi mạch bo mạch chủ (Mainboard) của mỗi máy tính. Khi kích hoạt ONLYOFFICE, khóa bản quyền sẽ được liên kết trực tiếp với UUID này trên hệ thống máy chủ chứng thực bảo mật."
              : "UUID is a unique hardware identifier embedded in the motherboard. Licensing binds permanently to this unique hardware hash.",
            isVi
              ? "Điều này đem lại lợi ích vô cùng to lớn: Khi khách hàng format ổ cứng hoặc cài lại hệ điều hành Windows, hệ thống sẽ tự động nhận diện lại UUID và kích hoạt lại bản quyền vĩnh viễn miễn phí 100% mà không cần mua lại key mới."
              : "Whenever Windows is formatted or reinstalled, the machine automatically recognizes its UUID and reactivates lifetime license at zero cost.",
          ],
        },
        {
          id: "comparison-models",
          heading: isVi ? "3. Bảng so sánh các hình thức kích hoạt hiện nay" : "3. Comparison of Activation Methods",
          paragraphs: [
            isVi
              ? "So sánh chi tiết các yếu tố kỹ thuật và pháp lý giữa Key Online chính hãng theo UUID và các phương thức phi chính thức:"
              : "Technical and legal comparison between genuine UUID Key Online and unofficial methods:",
          ],
          table: {
            headers: isVi ? ["Tiêu chí", "Key Online UUID (Mercy Tech)", "Crack / KMS Lậu", "Thuê bao Cloud ngoại"] : ["Criteria", "UUID Key Online (Mercy Tech)", "Cracked / KMS", "Foreign Cloud Subscriptions"],
            rows: isVi
              ? [
                  ["Tính an toàn", "100% Sạch mã độc, kiểm duyệt sha256", "Chứa trojan, miner, ransomware", "An toàn nhưng phụ thuộc mạng"],
                  ["Thời hạn sở hữu", "Vĩnh viễn trọn đời máy (Perpetual)", "Thường lỗi sau 180 ngày hoặc update", "Mất quyền khi dừng nạp tiền"],
                  ["Cài lại Windows", "Tự động kích hoạt lại tức thì", "Phải crack lại từ đầu, lỗi font", "Phải đăng nhập lại tài khoản"],
                  ["Pháp lý & Hóa đơn", "Hợp đồng, VAT đầy đủ, an tâm 100%", "Vi phạm bản quyền, phạt nặng", "Hóa đơn ngoại tệ phức tạp"],
                ]
              : [
                  ["Safety", "100% Clean, sha256 verified", "Embedded trojans & keyloggers", "Safe but cloud-dependent"],
                  ["Ownership Duration", "Perpetual lifetime on hardware", "Expires in 180 days or post-update", "Revoked upon non-payment"],
                  ["OS Refresh", "Automatic zero-touch reactivation", "Requires re-crack, corrupts fonts", "Requires manual re-login"],
                  ["Legal & Tax", "Full official VAT invoice & warranty", "Severe legal liability & fines", "Cross-border tax complications"],
                ],
          },
        },
        {
          id: "how-to-check-uuid",
          heading: isVi ? "4. Lệnh kiểm tra UUID Mainboard trên Windows" : "4. How to check Hardware UUID on Windows",
          paragraphs: [
            isVi
              ? "Kỹ thuật viên hoặc quản trị viên có thể dễ dàng kiểm tra mã UUID của máy tính bằng cách mở PowerShell hoặc CMD và chạy lệnh sau:"
              : "Technicians can verify the motherboard UUID using the following PowerShell command:",
          ],
          codeBlock: {
            language: "powershell",
            filename: "Check-Hardware-UUID.ps1",
            code: `# Xem ma UUID cua bo mach chu Mainboard
Get-CimInstance -ClassName Win32_ComputerSystemProduct | Select-Object -Property UUID, Name, Vendor`,
          },
          callout: {
            type: "tip",
            title: isVi ? "Bảo hành phần cứng hỏng" : "Motherboard Swap Warranty",
            text: isVi
              ? "Trong trường hợp bất khả kháng phải thay thế Mainboard do chập cháy phần cứng, khách hàng chỉ cần cung cấp biên bản bảo hành để được Mercy Tech hỗ trợ chuyển đổi UUID miễn phí trên Portal."
              : "In case of hardware failure requiring motherboard replacement, Mercy Tech provides free UUID transfer via support.",
          },
        },
      ],
    },
    {
      id: "nextcloud-integration",
      image: "/blog/nextcloud-integration.jpg",
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
      authorRole: isVi ? "Kỹ sư Hệ thống Cloud & DevOps" : "Cloud & DevOps Systems Engineer",
      tags: ["Nextcloud", "Docker", "Private Cloud", "Cài Đặt"],
      summary: isVi
        ? "Cẩm nang triển khai thực tế bộ đôi Nextcloud Hub và ONLYOFFICE Document Server trên nền tảng Docker: Cấu hình Secret Key JWT, SSL Let's Encrypt và tối ưu hóa bộ đệm tài liệu."
        : "Comprehensive deployment guide for Nextcloud Hub and ONLYOFFICE Document Server on Docker with JWT auth and SSL certificates.",
      content: [
        isVi
          ? "Nextcloud kết hợp cùng ONLYOFFICE là bộ đôi hoàn hảo để xây dựng đám mây lưu trữ và cộng tác tài liệu nội bộ bảo mật chuẩn doanh nghiệp."
          : "Combining Nextcloud with ONLYOFFICE delivers the premier private cloud collaboration stack for enterprises.",
        isVi
          ? "Nhờ Connector chính thức có sẵn trên Nextcloud App Store, quản trị viên chỉ cần khai báo địa chỉ Document Server và Secret Key là toàn bộ nhân sự có thể mở và sửa tài liệu trực tiếp trên trình duyệt."
          : "Using the official Nextcloud connector, administrators can connect the Document Server with minimal configuration.",
      ],
      sections: [
        {
          id: "architecture",
          heading: isVi ? "1. Kiến trúc kết nối giữa Nextcloud và ONLYOFFICE" : "1. Architecture overview",
          paragraphs: [
            isVi
              ? "Nextcloud đóng vai trò là kho lưu trữ tệp tin (File Storage), phân quyền thư mục và xác thực người dùng. ONLYOFFICE Document Server đảm nhận vai trò máy chủ tính toán, hiển thị và xử lý đồng chỉnh sửa tài liệu qua giao thức WebSocket."
              : "Nextcloud handles storage and user permissions while ONLYOFFICE Document Server performs document rendering and WebSocket co-editing.",
            isVi
              ? "Hai hệ thống giao tiếp với nhau qua giao thức HTTPS bảo mật hai chiều, sử dụng chữ ký điện tử JSON Web Token (JWT) để chống giả mạo request."
              : "Both systems communicate over mutual HTTPS using signed JWT tokens to prevent request forgery.",
          ],
        },
        {
          id: "docker-setup",
          heading: isVi ? "2. Cấu hình triển khai nhanh bằng Docker Compose" : "2. Quick deployment via Docker Compose",
          paragraphs: [
            isVi
              ? "Dưới đây là tệp mẫu docker-compose.yml tiêu chuẩn được các kỹ sư Mercy Tech tối ưu sẵn, bao gồm Document Server và chứng chỉ bảo mật JWT:"
              : "Below is the production-ready docker-compose.yml configuration with JWT security enabled:",
          ],
          codeBlock: {
            language: "yaml",
            filename: "docker-compose.yml",
            code: `version: '3.8'
services:
  onlyoffice-documentserver:
    image: onlyoffice/documentserver:latest
    container_name: onlyoffice-ds
    restart: always
    environment:
      - JWT_ENABLED=true
      - JWT_SECRET=MercyTechSecretKey2026
      - JWT_HEADER=Authorization
    ports:
      - "8080:80"
      - "8443:443"
    volumes:
      - ./data:/var/www/onlyoffice/Data
      - ./log:/var/log/onlyoffice`,
          },
        },
        {
          id: "nextcloud-steps",
          heading: isVi ? "3. 3 Bước kích hoạt Connector trên Nextcloud" : "3. 3 Steps to configure Nextcloud Connector",
          paragraphs: [
            isVi
              ? "Sau khi container Document Server đã chạy ổn định, thực hiện kết nối trên giao diện quản trị Nextcloud:"
              : "Once the Document Server container is active, complete the Nextcloud connector setup:",
          ],
          steps: [
            {
              step: "Bước 1",
              title: isVi ? "Cài đặt ONLYOFFICE App" : "Install ONLYOFFICE App",
              desc: isVi ? "Vào menu Apps trên Nextcloud, tìm kiếm 'ONLYOFFICE' và nhấp 'Download and enable'." : "Navigate to Nextcloud Apps, search 'ONLYOFFICE' and click Download & enable.",
            },
            {
              step: "Bước 2",
              title: isVi ? "Khai báo Document Server Address" : "Enter Server Address",
              desc: isVi ? "Vào Administration Settings -> ONLYOFFICE, điền URL Document Server (ví dụ: https://docs.yourcompany.vn)." : "Go to Admin Settings -> ONLYOFFICE, provide your Document Server domain.",
            },
            {
              step: "Bước 3",
              title: isVi ? "Nhập JWT Secret Key và Lưu" : "Enter JWT Secret & Save",
              desc: isVi ? "Nhập mã bí mật JWT_SECRET đã thiết lập trong file docker-compose. Nhấp 'Save' để hệ thống tự động kiểm tra kết nối." : "Enter your JWT secret key and click Save. A green confirmation badge confirms success.",
            },
          ],
          callout: {
            type: "tip",
            title: isVi ? "Kiểm tra chứng chỉ SSL" : "SSL Certificate Notice",
            text: isVi
              ? "Cả máy chủ Nextcloud và máy chủ ONLYOFFICE bắt buộc phải sử dụng chứng chỉ HTTPS hợp lệ (Let's Encrypt). Tránh sử dụng chứng chỉ tự ký (Self-signed) để không bị trình duyệt chặn WebSocket."
              : "Both servers require valid public HTTPS certificates to prevent browser WebSocket blocking.",
          },
        },
      ],
    },
    {
      id: "it-workflow-standard",
      image: "/blog/it-workflow-standard.jpg",
      title: isVi
        ? "Quy trình 5 bước cài đặt chuẩn hóa máy tính văn phòng dành cho kỹ thuật viên IT"
        : "5-Step workstation standard deployment workflow for IT technicians",
      category: "guides",
      categoryName: isVi ? "Hướng dẫn" : "Guide",
      excerpt: isVi
        ? "Bí quyết giúp cửa hàng máy tính và thợ ráp máy bàn giao PC cho khách với bộ phần mềm bản quyền sạch sẽ, tối ưu hiệu năng và không lỗi font."
        : "Best practices for PC assembly shops to deliver clean, optimized office workstations with genuine licenses and zero font errors.",
      date: "12/09/2026",
      readTime: "6",
      author: "Nguyễn Thành Đạt (Lead IT)",
      authorRole: isVi ? "Trưởng nhóm Kỹ thuật Phần cứng & Phần mềm" : "Lead Workstation Technician",
      tags: ["Chuẩn Hóa IT", "Cài Đặt Máy", "Tối Ưu Hiệu Năng", "Font Tiếng Việt"],
      summary: isVi
        ? "Hướng dẫn từng bước giúp kỹ thuật viên cửa hàng máy tính ráp máy và cài đặt phần mềm văn phòng chuyên nghiệp, tích hợp bộ nhận diện White-Label và kích hoạt bản quyền nhanh trong 3 phút."
        : "5-step standardized PC preparation SOP for technicians: clean OS, Unikey setup, White-label branding, and rapid portal license issuance.",
      content: [
        isVi
          ? "Một chiếc máy tính văn phòng được coi là chuẩn hóa khi đạt 3 tiêu chí: Hệ điều hành sạch không mã độc, bộ ứng dụng văn phòng đầy đủ bản quyền hợp pháp, và tương thích font chữ gõ tiếng Việt Unikey/EVKey mượt mà."
          : "A standardized workstation requires a clean OS without malware, legitimate office suite licensing, and flawless Vietnamese font rendering.",
        isVi
          ? "Với bộ cài White-Label tích hợp sẵn từ Mercy Tech, kỹ thuật viên chỉ mất dưới 3 phút để hoàn thiện cài đặt ONLYOFFICE, đồng bộ giao diện nhận diện thương hiệu của shop và kích hoạt trực tiếp từ Portal đại lý."
          : "With Mercy Tech's White-Label deployment packages, technicians complete setup in under 3 minutes, embedding store branding and activating directly via the partner portal.",
      ],
      sections: [
        {
          id: "five-steps",
          heading: isVi ? "Quy trình 5 bước chuẩn hóa chi tiết" : "Detailed 5-step SOP",
          paragraphs: [
            isVi
              ? "Áp dụng đúng quy trình sau giúp loại bỏ 100% khiếu nại về lỗi font chữ hoặc máy tính chạy chậm do phần mềm bẻ khóa:"
              : "Following this workflow eliminates 100% of customer support complaints regarding font bugs or malware slowdowns:",
          ],
          steps: [
            {
              step: "Bước 1",
              title: isVi ? "Cài đặt Windows sạch (Clean OS)" : "Clean OS Install",
              desc: isVi ? "Sử dụng bản cài đặt gốc Microsoft, cập nhật đầy đủ driver bo mạch chủ và card đồ họa." : "Install fresh official Windows OS with updated drivers.",
            },
            {
              step: "Bước 2",
              title: isVi ? "Cấu hình bộ gõ tiếng Việt Unikey / EVKey" : "Vietnamese Typing Setup",
              desc: isVi ? "Bật chế độ Unicode dựng sẵn, kiểm tra khả năng gõ mượt mà trong trình duyệt và Word." : "Configure standard Unicode typing on Unikey/EVKey.",
            },
            {
              step: "Bước 3",
              title: isVi ? "Cài đặt ONLYOFFICE White-Label" : "Install White-Label ONLYOFFICE",
              desc: isVi ? "Chạy bộ cài đóng gói có sẵn logo và hotline của shop để bảo vệ tệp khách hàng." : "Run custom branded installer with store hotline and logo.",
            },
            {
              step: "Bước 4",
              title: isVi ? "Kích hoạt Key Online trên Portal 24/7" : "Activate via Partner Portal",
              desc: isVi ? "Đăng nhập Portal đại lý, nhập UUID Mainboard và cấp quyền trong 30 giây." : "Login to partner portal and issue hardware license instantly.",
            },
            {
              step: "Bước 5",
              title: isVi ? "Bàn giao kèm chứng nhận bảo hành" : "Handover with Guarantee",
              desc: isVi ? "In phiếu chứng nhận bản quyền vĩnh viễn và bàn giao máy cho khách hàng an tâm." : "Provide lifetime warranty documentation to customer.",
            },
          ],
          callout: {
            type: "highlight",
            title: isVi ? "Đặc quyền White-Label Đại lý" : "White-Label Partner Privilege",
            text: isVi
              ? "Cửa hàng có thể gắn logo thương hiệu, tên cửa hàng và hotline hỗ trợ riêng ngay trên giao diện khởi động phần mềm, giúp khách hàng luôn nhớ tới shop mỗi khi có nhu cầu nâng cấp PC."
              : "Partners can brand the splash screen and about dialog with their store logo and hotline.",
          },
        },
      ],
    },
    {
      id: "security-private-rooms",
      image: "/blog/security-private-rooms.png",
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
      authorRole: isVi ? "Đội ngũ Nghiên cứu Mật mã & Bảo mật" : "Cryptography & InfoSec Team",
      tags: ["Private Rooms", "Mã Hóa AES-256", "Bảo Mật Đầu Cuối", "Zero-Knowledge"],
      summary: isVi
        ? "Nguyên lý hoạt động của Private Rooms: Giải pháp mã hóa đầu cuối đầu tiên trên thế giới cho phép đồng chỉnh sửa tài liệu thời gian thực mà máy chủ trung gian không thể đọc được nội dung."
        : "How Private Rooms deliver real-time document co-editing with zero-knowledge end-to-end encryption.",
      content: [
        isVi
          ? "Tính năng Private Rooms (Phòng bảo mật riêng) cho phép mọi ký tự bạn gõ đều được mã hóa tại máy client trước khi gửi lên máy chủ, ngăn chặn triệt để nguy cơ rò rỉ dữ liệu hoặc nghe lén."
          : "Private Rooms encrypt every keystroke at the client level before transmission, preventing eavesdropping and data leaks.",
        isVi
          ? "Đây là giải pháp lý tưởng cho các ngân hàng, tổ chức tài chính, cơ quan nhà nước và bộ phận pháp chế doanh nghiệp."
          : "An ideal solution for financial institutions, governmental bodies, and legal departments.",
      ],
      sections: [
        {
          id: "aes-256",
          heading: isVi ? "1. Thuật toán mã hóa quân sự AES-256 hoạt động thế nào?" : "1. Military-grade AES-256 encryption in action",
          paragraphs: [
            isVi
              ? "Khác với các dịch vụ đám mây công cộng (nơi dữ liệu được giải mã tại máy chủ để hiển thị), Private Rooms thực hiện việc mã hóa và giải mã hoàn toàn tại trình duyệt của người dùng (Client-Side). Khóa mã hóa không bao giờ được gửi lên đám mây."
              : "Unlike public clouds that decrypt files server-side, Private Rooms encrypts and decrypts entirely within the user's browser.",
            isVi
              ? "Ngay cả khi hacker chiếm được toàn bộ quyền kiểm soát máy chủ Document Server, họ cũng chỉ thu được các tệp nhị phân mã hóa vô nghĩa mà không thể đọc được một từ ngữ nào bên trong văn bản."
              : "Even if an adversary compromises the server, they only obtain unreadable ciphertext.",
          ],
          callout: {
            type: "warning",
            title: isVi ? "Kiến trúc Zero-Knowledge" : "Zero-Knowledge Architecture",
            text: isVi
              ? "Nhà cung cấp dịch vụ và người quản trị hệ thống không nắm giữ chìa khóa giải mã. Chỉ những người dùng được mời vào Private Room mới có khóa giải mã cục bộ."
              : "Neither service providers nor sysadmins possess decryption keys. Only authorized room participants hold local keys.",
          },
        },
        {
          id: "zero-knowledge-matrix",
          heading: isVi ? "2. So sánh bảo mật Private Rooms vs Đám mây công cộng" : "2. Private Rooms vs Public Cloud Security",
          paragraphs: [
            isVi
              ? "Bảng phân tích sự khác biệt về cơ chế mã hóa giữa các nền tảng:"
              : "Comparison matrix between encryption architectures:",
          ],
          table: {
            headers: isVi ? ["Đặc tính an ninh", "ONLYOFFICE Private Rooms", "Google Docs / MS 365 Cloud"] : ["Security Property", "ONLYOFFICE Private Rooms", "Public Cloud Suites"],
            rows: isVi
              ? [
                  ["Mã hóa khi truyền tải (Transit)", "TLS 1.3 / HTTPS", "TLS 1.3 / HTTPS"],
                  ["Mã hóa tại máy chủ (At-Rest)", "AES-256 Client-Side", "Server-Side (Nhà cung cấp giữ khóa)"],
                  ["Giải mã khi cộng tác", "Tại RAM máy người dùng", "Giải mã trên Cloud của nhà cung cấp"],
                  ["Nguy cơ bị thanh tra dữ liệu", "Không thể trích xuất bản rõ", "Dữ liệu có thể bị cung cấp cho bên thứ 3"],
                ]
              : [
                  ["In-Transit Encryption", "TLS 1.3 / HTTPS", "TLS 1.3 / HTTPS"],
                  ["At-Rest Encryption", "AES-256 Client-Side", "Server-Side (Provider holds master key)"],
                  ["Decryption for Co-editing", "In local client RAM only", "Decrypted in provider cloud memory"],
                  ["Subpoena / Breach Risk", "Zero plaintext extractable", "Data can be subpoenaed or exposed"],
                ],
          },
        },
      ],
    },
    {
      id: "docspace-collaboration",
      image: "/blog/docspace-collaboration.png",
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
      authorRole: isVi ? "Chuyên gia Tư vấn Chuyển đổi số" : "Digital Workplace Strategist",
      tags: ["DocSpace", "Cộng Tác Dự Án", "Rooms", "Phân Quyền"],
      summary: isVi
        ? "Cách các doanh nghiệp hiện đại xóa bỏ rào cản chia sẻ tài liệu qua email bằng DocSpace: Tổ chức phòng làm việc theo dự án, phân quyền linh hoạt và cộng tác thời gian thực với đối tác bên ngoài."
        : "Modernizing team collaboration with DocSpace: room-based workflows, granular access controls, and frictionless external client collaboration.",
      content: [
        isVi
          ? "ONLYOFFICE DocSpace định nghĩa lại cách chia sẻ tài liệu thông qua hệ thống phòng cộng tác chuyên biệt (Collaboration Rooms, Public Rooms, Custom Rooms)."
          : "ONLYOFFICE DocSpace redefines document sharing using dedicated rooms tailored for any workflow.",
        isVi
          ? "Người quản trị có thể phân quyền chi tiết đến từng thao tác: Chỉ xem, chỉnh sửa, nhận xét, điền biểu mẫu hoặc tải xuống."
          : "Granular permissions allow view-only, reviewing, commenting, form-filling, or downloading controls.",
      ],
      sections: [
        {
          id: "room-types",
          heading: isVi ? "1. Các loại phòng làm việc chuyên biệt trong DocSpace" : "1. DocSpace specialized room types",
          paragraphs: [
            isVi
              ? "DocSpace cung cấp 3 loại phòng chính: Phòng cộng tác (dành cho nhóm nội bộ cùng chỉnh sửa file), Phòng công khai (dành cho khách hàng xem và tải biểu mẫu mà không cần tài khoản), và Phòng tùy biến (dành cho các kịch bản ký duyệt hợp đồng)."
              : "DocSpace provides Collaboration Rooms for internal teams, Public Rooms for frictionless client sharing, and Custom Rooms for approval workflows.",
            isVi
              ? "Mỗi phòng hoạt động như một không gian làm việc độc lập với danh sách thành viên và cây thư mục riêng biệt, giúp dữ liệu không bao giờ bị lẫn lộn giữa các dự án."
              : "Each room functions as an isolated digital workspace with dedicated folder trees and permission scopes.",
          ],
        },
        {
          id: "permissions",
          heading: isVi ? "2. Ma trận phân quyền chi tiết đến từng hành động" : "2. Granular Permission Matrix",
          paragraphs: [
            isVi
              ? "Điểm mạnh nhất của DocSpace là tính năng phân quyền chi tiết (Granular Permissions), cho phép người quản lý kiểm soát chính xác những gì đối tác hoặc nhân viên có thể làm:"
              : "DocSpace's core advantage lies in granular permissions, letting project managers define exact capabilities per collaborator:",
          ],
          table: {
            headers: isVi ? ["Quyền hạn", "Xem", "Chỉnh sửa", "Nhận xét", "Điền form", "Tải xuống"] : ["Role Permission", "View", "Edit", "Comment", "Fill Form", "Download"],
            rows: [
              ["Room Admin", "✓", "✓", "✓", "✓", "✓"],
              ["Power User", "✓", "✓", "✓", "✓", "✓"],
              ["Editor", "✓", "✓", "✓", "✓", "✓"],
              ["Reviewer", "✓", "✗", "✓", "✗", "✓"],
              ["Form Filler", "✓", "✗", "✗", "✓", "✗"],
              ["Viewer Only", "✓", "✗", "✗", "✗", "✗"],
            ],
          },
          callout: {
            type: "highlight",
            title: isVi ? "Tiết kiệm chi phí bản quyền" : "Licensing Cost Efficiency",
            text: isVi
              ? "Người dùng bên ngoài (Khách hàng, Đối tác xem tài liệu hoặc điền biểu mẫu) hoàn toàn MIỄN PHÍ, không cần mua thêm user license."
              : "External guests viewing documents or filling forms are 100% free, requiring zero extra user seat licenses.",
          },
        },
      ],
    },
  ];
}

export function getBlogPostById(id: string, isVi: boolean): BlogPost | undefined {
  const posts = getBlogPosts(isVi);
  return posts.find((p) => p.id === id);
}
