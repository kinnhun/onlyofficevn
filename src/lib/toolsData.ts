import { ToolDetailData } from "@/components/docs/ToolDetailPage";

export interface ToolMetadataInfo {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  canonical: string;
}

export function getToolMetadata(slug: string, locale: string): ToolMetadataInfo {
  const isVi = locale === "vi";

  switch (slug) {
    case "document-editor":
      return {
        title: isVi
          ? "ONLYOFFICE Document Editor — Phần Mềm Soạn Thảo Văn Bản Chuyên Nghiệp"
          : "ONLYOFFICE Document Editor — Professional Word Processor (DOCX)",
        description: isVi
          ? "Tương thích tuyệt đối với Microsoft Word (.docx). Soạn thảo đa người dùng thời gian thực, tích hợp Trợ lý AI và hỗ trợ hơn 50 định dạng văn bản."
          : "Full Microsoft Word (DOCX) compatibility, real-time co-authoring, integrated AI assistant, and advanced typography controls.",
        ogTitle: isVi
          ? "ONLYOFFICE Document Editor — Soạn Thảo Văn Bản Chuyên Nghiệp"
          : "ONLYOFFICE Document Editor — Professional Online Word Processor",
        ogDescription: isVi
          ? "Mở và chỉnh sửa file .docx mượt mà, không vỡ layout, tích hợp AI dịch thuật và sửa ngữ pháp."
          : "Work with DOCX files online with 100% formatting fidelity and real-time team collaboration.",
        canonical: "/document-editor",
      };

    case "spreadsheet-editor":
      return {
        title: isVi
          ? "ONLYOFFICE Spreadsheet Editor — Phần Mềm Bảng Tính Thông Minh Cho Doanh Nghiệp"
          : "ONLYOFFICE Spreadsheet Editor — Smart Enterprise Sheets (XLSX)",
        description: isVi
          ? "Tương thích 100% Microsoft Excel (.xlsx), hơn 400 hàm tính toán, bảng Pivot động, chế độ Personal Sheet Views và tự động hóa với Macro."
          : "100% XLSX compatibility, 400+ mathematical and financial formulas, dynamic Pivot Tables, and Personal Sheet Views.",
        ogTitle: isVi
          ? "ONLYOFFICE Spreadsheet Editor — Bảng Tính Thông Minh"
          : "ONLYOFFICE Spreadsheet Editor — Advanced Online Sheets",
        ogDescription: isVi
          ? "Phân tích dữ liệu lớn mượt mà, hơn 400 hàm, Pivot Tables và cộng tác bảng tính không gián đoạn."
          : "Analyze big data with 400+ formulas, Pivot Tables, and seamless multi-user collaboration.",
        canonical: "/spreadsheet-editor",
      };

    case "presentation-editor":
      return {
        title: isVi
          ? "ONLYOFFICE Presentation Editor — Phần Mềm Tạo Bản Thuyết Trình Chuyên Nghiệp"
          : "ONLYOFFICE Presentation Editor — Professional Online Slide Maker (PPTX)",
        description: isVi
          ? "Tương thích hoàn hảo với PowerPoint (.pptx) — hiệu ứng chuyển động phong phú, phát GIF trong slideshow, kho mẫu đa dạng và cộng tác thời gian thực."
          : "Native PPTX compatibility, multimedia embeds, smooth slide transitions, Presenter View, and real-time co-authoring for teams.",
        ogTitle: isVi
          ? "ONLYOFFICE Presentation Editor — Thuyết Trình Chuyên Nghiệp"
          : "ONLYOFFICE Presentation Editor — Professional Online Slides",
        ogDescription: isVi
          ? "Tương thích hoàn hảo với PowerPoint (.pptx) — phát GIF trực tiếp, AI trợ lý và trình chiếu thời gian thực."
          : "Work with PowerPoint files online with full formatting fidelity, animations, and presenter mode.",
        canonical: "/presentation-editor",
      };

    case "pdf-editor":
      return {
        title: isVi
          ? "ONLYOFFICE PDF Editor — Phần Mềm Chỉnh Sửa PDF Toàn Diện & Ký Số"
          : "ONLYOFFICE PDF Editor — Advanced PDF Editing & Digital Signatures",
        description: isVi
          ? "Chỉnh sửa trực tiếp nội dung văn bản, hình ảnh trong PDF, điền biểu mẫu tương tác, chuyển đổi hai chiều PDF sang DOCX và ký số pháp lý an toàn."
          : "Directly edit text and images in PDF files, fill interactive forms, convert two-way between PDF and DOCX, and apply legal e-signatures.",
        ogTitle: isVi
          ? "ONLYOFFICE PDF Editor — Chỉnh Sửa PDF Toàn Diện"
          : "ONLYOFFICE PDF Editor — Complete PDF Solution",
        ogDescription: isVi
          ? "Sửa trực tiếp file PDF không cần chuyển đổi, ký số bảo mật chuẩn quốc tế."
          : "Edit text, annotate, fill forms, and e-sign PDFs directly in your web browser.",
        canonical: "/pdf-editor",
      };

    case "form-creator":
      return {
        title: isVi
          ? "ONLYOFFICE Form Creator — Phần Mềm Tạo & Điền Biểu Mẫu Điện Tử"
          : "ONLYOFFICE Form Creator — Interactive Digital Forms & Contracts",
        description: isVi
          ? "Biến tài liệu văn bản thành biểu mẫu PDF tương tác (OFORM) với đa dạng trường điền tự động hóa, kiểm tra ràng buộc logic và chữ ký số."
          : "Design fillable interactive PDF forms with automated fields, logic validation, and compliant digital signatures.",
        ogTitle: isVi
          ? "ONLYOFFICE Form Creator — Biểu Mẫu Điện Tử Tương Tác"
          : "ONLYOFFICE Form Creator — Interactive Fillable Forms",
        ogDescription: isVi
          ? "Tạo biểu mẫu thu thập dữ liệu tự động, điền đa thiết bị và xác thực chữ ký điện tử."
          : "Create surveys, employment contracts, and forms that can be completed on any device.",
        canonical: "/form-creator",
      };

    case "diagram-viewer":
      return {
        title: isVi
          ? "ONLYOFFICE Diagram Viewer — Trình Xem Sơ Đồ Microsoft Visio (VSDX) Không Cần License"
          : "ONLYOFFICE Diagram Viewer — Native Microsoft Visio (VSDX) Viewer",
        description: isVi
          ? "Mở và xem trực tiếp tệp sơ đồ Microsoft Visio (VSDX, VSD). Độ phân giải vector sắc nét, tải nhanh trên web và máy tính không cần mua license Visio."
          : "Open and inspect Microsoft Visio diagrams (VSDX, VSD) natively in your browser with crisp vector rendering without Visio licenses.",
        ogTitle: isVi
          ? "ONLYOFFICE Diagram Viewer — Trình Xem Sơ Đồ Visio VSDX"
          : "ONLYOFFICE Diagram Viewer — Microsoft Visio Viewer",
        ogDescription: isVi
          ? "Xem bản vẽ kỹ thuật và sơ đồ mạng VSDX sắc nét, không cần cài đặt phần mềm bên thứ ba."
          : "Inspect complex Visio network diagrams and engineering layouts with lightning-fast vector rendering.",
        canonical: "/diagram-viewer",
      };

    default:
      return {
        title: "ONLYOFFICE Docs — Enterprise Office Suite",
        description: "Powerful cloud office suite for editing text documents, spreadsheets, presentations, forms, and PDFs.",
        ogTitle: "ONLYOFFICE Docs",
        ogDescription: "Powerful cloud office suite for enterprise productivity.",
        canonical: `/${slug}`,
      };
  }
}

export function getToolDetailData(slug: string, locale: string): ToolDetailData {
  const isVi = locale === "vi";

  switch (slug) {
    // 1. DOCUMENT EDITOR
    case "document-editor":
      return {
        id: "document",
        slug: "document-editor",
        name: isVi ? "Phần Mềm Soạn Thảo Văn Bản Chuyên Nghiệp" : "Professional Document Editor & Word Processor",
        tagline: isVi
          ? "Tương thích tuyệt đối với Microsoft Word (.docx) — cộng tác thời gian thực và tích hợp AI thông minh."
          : "100% seamless Microsoft Word (DOCX) compatibility — real-time co-authoring and smart integrated AI.",
        badge: "ONLYOFFICE Document Editor",
        msCompatLabel: isVi ? "Tương thích 99.9% DOCX / Word" : "100% DOCX Compatibility",
        formatList: ["DOCX", "DOC", "DOCM", "DOTX", "ODT", "OTT", "RTF", "TXT", "HTML", "PDF", "EPUB", "FB2"],
        heroImage: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/word-processor/word-processor-hero.png",
        videoEmbedUrl: "https://www.youtube.com/embed/HqRMneSGHk0?autoplay=1&mute=1&loop=1&playlist=HqRMneSGHk0",
        overviewText: isVi
          ? "Soạn thảo, định dạng văn bản chuyên nghiệp với đầy đủ công cụ học thuật, đánh số trang, tạo mục lục tự động và kiểm tra chính tả đa ngôn ngữ."
          : "Professional text drafting and formatting with full academic tools, automated tables of contents, page numbering, and multilingual spell-check.",
        interactiveTabsHeading: isVi ? "Soạn Thảo Toàn Diện" : "Comprehensive Document Authoring",
        interactiveTabsSubheading: isVi ? "Làm việc quen tay — tối ưu hiệu quả" : "Familiar workflow — peak enterprise efficiency",
        bonusCardsHeading: isVi ? "Cộng Tác Mượt Mà" : "Seamless Team Collaboration",
        bonusCardsSubheading: isVi ? "Kết nối dễ dàng — làm việc năng suất" : "Effortless connectivity for high-velocity teams",
        interactiveTabs: [
          {
            id: "ft-doc-1",
            label: isVi ? "Tương thích Microsoft Word" : "Microsoft Word Compatibility",
            eyebrow: isVi ? "TƯƠNG THÍCH MICROSOFT WORD" : "MICROSOFT WORD COMPATIBILITY",
            heading: isVi ? "Mở và chỉnh sửa file .docx không mất định dạng." : "Open & edit DOCX files with zero formatting loss.",
            bullets: isVi
              ? [
                  "Mở, chỉnh sửa và lưu file .docx không mất định dạng, công thức, bảng biểu hay font chữ.",
                  "Hỗ trợ đầy đủ track changes (theo dõi thay đổi), bình luận và các đối tượng nhúng mà không lo vỡ trang.",
                ]
              : [
                  "Open, edit, and save DOCX files while preserving fonts, formulas, tables, and page layouts.",
                  "Full support for Track Changes, inline comments, footnotes, and embedded objects without layout breaks.",
                ],
            image: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/word-processor/word-tuong-thich-microsoft.png",
          },
          {
            id: "ft-doc-2",
            label: isVi ? "Trợ lý AI tích hợp" : "Integrated AI Assistant",
            eyebrow: isVi ? "TRỢ LÝ AI TÍCH HỢP" : "INTEGRATED AI ASSISTANT",
            heading: isVi ? "Soạn thảo và xử lý tài liệu bằng một lệnh đơn giản." : "Draft, summarize & polish documents with simple prompts.",
            bullets: isVi
              ? [
                  "Kết nối trực tiếp với ChatGPT, Claude, Gemini hoặc các mô hình AI riêng tư On-Premises.",
                  "Soạn thảo, tóm tắt, dịch thuật, viết lại và sửa lỗi ngữ pháp ngay trong tài liệu mà không cần copy/paste.",
                ]
              : [
                  "Connect directly to ChatGPT, Claude, Gemini, or private self-hosted enterprise LLMs.",
                  "Draft content, summarize long briefs, translate across 50+ languages, and fix syntax right inside the editor.",
                ],
            image: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/word-processor/word-ai-soan-thao.png",
          },
          {
            id: "ft-doc-3",
            label: isVi ? "Cộng tác thời gian thực" : "Real-time Co-authoring",
            eyebrow: isVi ? "CỘNG TÁC THỜI GIAN THỰC" : "REAL-TIME CO-AUTHORING",
            heading: isVi ? "Cùng đồng nghiệp hoàn thiện tài liệu tức thì." : "Work together simultaneously with zero collision.",
            bullets: isVi
              ? [
                  "2 Chế độ cộng tác linh hoạt: Fast Mode (hiển thị thay đổi tức thì) và Strict Mode (khóa đoạn văn đang sửa).",
                  "Lịch sử phiên bản chi tiết cho phép xem ai đã sửa gì và khôi phục bản lưu trước đó bất kỳ lúc nào.",
                ]
              : [
                  "Two collaboration modes: Fast (live typing view) and Strict (paragraph locking to prevent collision).",
                  "Comprehensive version history with color-coded diff tracking and 1-click restore.",
                ],
            image: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/slides/slide-cong-tac.png",
          },
        ],
        bonusCards: [
          {
            title: isVi ? "Định Dạng Học Thuật Chuyên Sâu" : "Advanced Academic Formatting",
            desc: isVi
              ? "Tạo mục lục tự động, chú thích cuối trang (Footnotes), trích dẫn tài liệu tham khảo theo chuẩn APA, IEEE, Harvard và chèn công thức toán học LaTeX."
              : "Generate automated tables of contents, footnotes, endnotes, citations (APA, IEEE, Harvard), and insert complex LaTeX equations.",
          },
          {
            title: isVi ? "So Sánh Hai Văn Bản (Document Compare)" : "Smart Document Comparison",
            desc: isVi
              ? "Tự động so sánh hai phiên bản hợp đồng khác nhau và làm nổi bật từng từ bị thêm, bớt hoặc chỉnh sửa bằng màu sắc trực quan."
              : "Compare two revisions of a contract side-by-side with color-coded visual diffs for additions and deletions.",
          },
          {
            title: isVi ? "Bảo Mật Cấp Doanh Nghiệp" : "Enterprise-grade Security",
            desc: isVi
              ? "Bảo vệ tài liệu bằng mật khẩu mã hóa AES-256, đóng dấu Watermark chống rò rỉ và phân quyền chỉ đọc hoặc chỉ bình luận."
              : "Encrypt documents with AES-256 passwords, embed dynamic watermarks, and restrict permissions to View-only or Comment-only.",
          },
        ],
        features: [
          {
            title: isVi ? "Tương thích tuyệt đối với Microsoft Word" : "Absolute Microsoft Word Compatibility",
            points: isVi
              ? [
                  "Hỗ trợ trọn vẹn tệp .docx, .doc, .rtf, .txt, .odt mà không bị xô lệch lề hay lỗi phông chữ.",
                  "Giữ nguyên định dạng bảng, đồ thị, biểu đồ và định dạng đầu mục phức tạp.",
                  "Chuyển đổi văn bản sang PDF hoặc EPUB tiện lợi cho việc in ấn và xuất bản.",
                ]
              : [
                  "Native support for DOCX, DOC, RTF, TXT, and ODT without font substitutions or broken margins.",
                  "Preserves nested tables, dynamic charts, headers, and bullet numbering styles.",
                  "Export directly to PDF, EPUB, or HTML with 1-click convenience.",
                ],
          },
          {
            title: isVi ? "Hỗ trợ tiện ích mở rộng & Plugin phong phú" : "Rich Plugin Ecosystem",
            points: isVi
              ? [
                  "Tích hợp sẵn YouTube, Zotero, Mendeley, DeepL, Google Translate và bộ đếm từ.",
                  "Viết thêm macro tự động bằng ngôn ngữ JavaScript hiện đại thay vì VBA cũ kỹ.",
                  "Dễ dàng tạo các plugin tùy chỉnh phục vụ quy trình nội bộ của doanh nghiệp.",
                ]
              : [
                  "Pre-installed plugins for YouTube, Zotero, Mendeley, DeepL, Google Translate, and word counters.",
                  "Automate repetitive tasks with modern JavaScript macros instead of legacy VBA.",
                  "Easily build bespoke internal enterprise plugins via open REST APIs.",
                ],
          },
        ],
        collaborationBenefits: [
          {
            title: isVi ? "Phê Duyệt Hợp Đồng Nhanh Chóng" : "Rapid Contract Approval",
            desc: isVi
              ? "Rút ngắn 70% thời gian duyệt thỏa thuận giữa các phòng ban nhờ chế độ bình luận và giải quyết phản hồi trực tiếp."
              : "Shorten cross-department contract review cycles by 70% with inline resolving comments and track changes.",
          },
          {
            title: isVi ? "Kiểm Soát Phiên Bản Chặt Chẽ" : "Strict Version Auditing",
            desc: isVi
              ? "Không còn nỗi lo gửi nhầm file 'ban_cuoi_v2_final'. Toàn bộ sửa đổi được lưu trữ tập trung trên đám mây."
              : "Say goodbye to 'final_v2_really_final.docx'. All edits synchronize to a single cloud audit trail.",
          },
          {
            title: isVi ? "Triển Khai Linh Hoạt On-Premise" : "Flexible On-Premise Hosting",
            desc: isVi
              ? "Cài đặt máy chủ tài liệu ngay trong hạ tầng nội bộ để đáp ứng các tiêu chuẩn bảo mật dữ liệu nhà nước và tài chính."
              : "Deploy document servers on private bare-metal or cloud clusters complying with GDPR and HIPAA mandates.",
          },
        ],
      };

    // 2. SPREADSHEET EDITOR
    case "spreadsheet-editor":
      return {
        id: "spreadsheet",
        slug: "spreadsheet-editor",
        name: isVi ? "Phần Mềm Bảng Tính Thông Minh Cho Doanh Nghiệp" : "Smart Enterprise Spreadsheet Editor (XLSX)",
        tagline: isVi
          ? "Tương thích tuyệt đối với Microsoft Excel — hơn 400 hàm tính toán, bảng Pivot động và phân tích chuyên sâu."
          : "100% native Microsoft Excel fidelity — 400+ formulas, dynamic Pivot Tables, and advanced data visualization.",
        badge: "ONLYOFFICE Spreadsheet Editor",
        msCompatLabel: isVi ? "Tương thích 100% XLSX / Excel" : "100% XLSX Compatibility",
        formatList: ["XLSX", "XLS", "XLSM", "XLTX", "ODS", "OTS", "CSV", "TSV", "PDF"],
        heroImage: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/sheets/sheet-ham-tinh-toan.png",
        videoEmbedUrl: "https://www.youtube.com/embed/HqRMneSGHk0?autoplay=1&mute=1&loop=1&playlist=HqRMneSGHk0",
        overviewText: isVi
          ? "Phân tích, xử lý dữ liệu tài chính, kế toán và kinh doanh với hơn 400 hàm toán học, thống kê, tài chính và tự động hóa quy trình bằng Macro JavaScript."
          : "Analyze corporate financial figures and data models with 400+ mathematical and statistical functions, automated Pivot Tables, and JavaScript macros.",
        interactiveTabsHeading: isVi ? "Tính Toán Thông Minh Dễ Dàng" : "Intelligent Spreadsheet Analysis",
        interactiveTabsSubheading: isVi ? "Làm việc quen tay — tối ưu hiệu quả" : "Familiar Excel shortcuts — zero learning curve",
        bonusCardsHeading: isVi ? "Công Cụ Phân Tích Chuyên Nghiệp" : "Enterprise Analytical Power",
        bonusCardsSubheading: isVi ? "Làm chủ mọi luồng dữ liệu phức tạp" : "Master big datasets with lightning responsiveness",
        interactiveTabs: [
          {
            id: "ft-sheet-1",
            label: isVi ? "Tương thích Microsoft Excel" : "Excel Formula Fidelity",
            eyebrow: isVi ? "TƯƠNG THÍCH MICROSOFT EXCEL" : "MICROSOFT EXCEL FIDELITY",
            heading: isVi ? "Mở file .xlsx không lo mất công thức." : "Open & edit XLSX files with intact formulas.",
            bullets: isVi
              ? [
                  "Mở, chỉnh sửa và lưu mượt mà các tệp định dạng .xlsx, .xls, .csv mà không lo mất công thức hay hỏng cấu trúc bảng.",
                  "Hỗ trợ đầy đủ hơn 400 hàm tính toán từ tài chính, thống kê cho đến tra cứu nâng cao (XLOOKUP, INDEX-MATCH, SUMIFS).",
                ]
              : [
                  "Seamlessly open and calculate XLSX, XLS, and CSV workbooks with zero formula calculation errors.",
                  "Full support for over 400 formulas including XLOOKUP, INDEX-MATCH, VLOOKUP, SUMIFS, and financial functions.",
                ],
            image: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/sheets/sheet-ham-tinh-toan.png",
          },
          {
            id: "ft-sheet-2",
            label: isVi ? "Trực quan hoá dữ liệu tức thì" : "Instant Visual Analytics",
            eyebrow: isVi ? "TRỰC QUAN HOÁ DỮ LIỆU TỨC THÌ" : "INSTANT DATA VISUALIZATION",
            heading: isVi ? "Biến số liệu thô thành báo cáo sinh động." : "Turn raw figures into compelling executive dashboards.",
            bullets: isVi
              ? [
                  "Biến số liệu thô thành báo cáo sinh động với hơn 20 loại biểu đồ chất lượng cao (cột, tròn, radar, scatter...).",
                  "Tính năng Conditional Formatting tự động định dạng màu sắc theo giá trị để phát hiện nhanh các điểm bất thường.",
                ]
              : [
                  "Transform raw tables into clear visual insights with 20+ chart types (bar, combo, radar, waterfall, scatter).",
                  "Conditional Formatting with color scales and data bars highlights outliers and revenue trends automatically.",
                ],
            image: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/sheets/sheet-bieu-do.png",
          },
          {
            id: "ft-sheet-3",
            label: isVi ? "Personal Sheet Views" : "Personal Sheet Views",
            eyebrow: isVi ? "CHẾ ĐỘ XEM CÁ NHÂN HÓA" : "PERSONAL SHEET VIEWS",
            heading: isVi ? "Lọc số liệu mà không làm phiền đồng nghiệp." : "Filter data independently without disturbing others.",
            bullets: isVi
              ? [
                  "Tạo các bộ lọc riêng biệt cho bản thân mà không làm thay đổi cách hiển thị của những người khác đang cùng làm việc.",
                  "Lưu lại các chế độ xem tùy chỉnh theo tên để sử dụng lại bất cứ khi nào cần báo cáo.",
                ]
              : [
                  "Create individual filter views that only affect your own screen while teammates work on the same sheet.",
                  "Save and name custom view configurations for recurring quarterly audits and reviews.",
                ],
            image: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/sheets/sheet-cong-tac.png",
          },
        ],
        bonusCards: [
          {
            title: isVi ? "Pivot Table — Bảng Tổng Hợp Động" : "Dynamic Pivot Tables",
            desc: isVi
              ? "Tổ chức, tóm tắt và phân tích các tập dữ liệu lớn quy mô doanh nghiệp. Dễ dàng lọc, nhóm và xoay chuyển các chiều dữ liệu chỉ với vài cú click chuột."
              : "Aggregate, summarize, and explore multi-dimensional datasets with multi-level grouping and calculated fields.",
          },
          {
            title: isVi ? "Solver — Bộ Giải Tối Ưu Hóa" : "Mathematical Solver",
            desc: isVi
              ? "Giải quyết chính xác các bài toán kinh doanh, ngân sách và logistics phức tạp dựa trên các mục tiêu và hệ thống ràng buộc biên được thiết lập."
              : "Find optimal target solutions for complex financial models, supply chain routing, and linear programming bounds.",
          },
          {
            title: isVi ? "Xử Lý Hàng Trăm Nghìn Dòng" : "High-Performance Data Engine",
            desc: isVi
              ? "Vận hành mượt mà, phản hồi nhanh nhạy và không lo bị treo/lag khi làm việc với các bảng tính doanh nghiệp có quy mô hàng trăm nghìn dòng."
              : "Smooth hardware-accelerated rendering handles workbooks with hundreds of thousands of rows without browser lag.",
          },
        ],
        features: [
          {
            title: isVi ? "Hơn 400 hàm tính toán & phân tích dữ liệu chuyên sâu" : "400+ Advanced Scientific & Financial Functions",
            points: isVi
              ? [
                  "Hỗ trợ đầy đủ các hàm VLOOKUP, XLOOKUP, INDEX, MATCH, SUMIFS, COUNTIFS chuẩn Microsoft Excel.",
                  "Xử lý các mô hình tài chính phức tạp, phân tích kịch bản What-If và tìm kiếm mục tiêu Goal Seek.",
                  "Tự động phát hiện lỗi công thức và gợi ý sửa chữa thông minh.",
                ]
              : [
                  "Full support for XLOOKUP, VLOOKUP, INDEX, MATCH, SUMIFS, and COUNTIFS matching Excel standards.",
                  "Build What-If scenario simulations, sensitivity matrices, and Goal Seek targets.",
                  "Smart formula autocompletion and dynamic syntax error checking.",
                ],
          },
          {
            title: isVi ? "Tự động hóa bằng JavaScript Macro" : "Modern JavaScript Macro Automation",
            points: isVi
              ? [
                  "Sử dụng JavaScript chuẩn để viết script tự động hóa, dễ học và an toàn hơn VBA cổ điển.",
                  "Tích hợp API trích xuất số liệu từ các phần mềm kế toán, ERP hoặc CRM nội bộ.",
                  "Chạy an toàn trên mọi hệ điều hành từ Windows, macOS đến Linux mà không gặp lỗi tương thích.",
                ]
              : [
                  "Automate repetitive spreadsheet workflows using clean, sandboxed JavaScript instead of brittle legacy VBA.",
                  "Integrate with internal ERP and CRM systems via secure REST endpoints.",
                  "Runs identically across Windows, macOS, Linux, and web browsers with zero platform lock-in.",
                ],
          },
        ],
        collaborationBenefits: [
          {
            title: isVi ? "Đồng Bộ Kế Toán — Tài Chính" : "Finance & Accounting Sync",
            desc: isVi
              ? "Nhiều kế toán viên cùng nhập chứng từ trên cùng một file sổ cái tổng hợp mà không bao giờ bị khóa bảng."
              : "Multiple accounting team members can log ledgers on the same master sheet without file-locking headaches.",
          },
          {
            title: isVi ? "Phân Quyền Vùng Nhập Liệu" : "Range-Level Permissions",
            desc: isVi
              ? "Khóa các ô công thức nhạy cảm và chỉ cấp quyền nhập liệu cho các ô dữ liệu tương ứng của nhân viên."
              : "Protect master formula cells while allowing specific sales reps to edit only their designated input cells.",
          },
          {
            title: isVi ? "Báo Cáo Bảng Tính Thời Gian Thực" : "Real-time Live Reports",
            desc: isVi
              ? "Lãnh đạo theo dõi số liệu doanh số cập nhật tức thì theo thời gian thực ngay khi nhân sự vừa nhập số liệu."
              : "Executive leadership views revenue updates live as soon as field teams submit branch figures.",
          },
        ],
      };

    // 3. PRESENTATION EDITOR
    case "presentation-editor":
      return {
        id: "presentation",
        slug: "presentation-editor",
        name: isVi ? "Phần Mềm Tạo Bản Thuyết Trình Chuyên Nghiệp" : "Professional Presentation Editor (PPTX)",
        tagline: isVi
          ? "Tương thích hoàn hảo với PowerPoint (.pptx) — hiệu ứng đẹp, phát GIF trong slideshow, kho mẫu đa dạng."
          : "Native PowerPoint (PPTX) compatibility — fluid animations, direct GIF playback, and presenter mode.",
        badge: "ONLYOFFICE Presentation Editor",
        msCompatLabel: isVi ? "Tương thích 100% PowerPoint (.pptx)" : "100% PPTX Compatibility",
        formatList: ["PPTX", "PPT", "PPSX", "POTX", "ODP", "OTP", "PDF"],
        heroImage: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-ppt.jpg",
        videoEmbedUrl: "https://www.youtube.com/embed/kxMwSea5Nw4?autoplay=1&mute=1&loop=1&playlist=kxMwSea5Nw4",
        heroLayout: "centered",
        overviewText: isVi
          ? "Tạo và trình diễn các bài thuyết trình kinh doanh, báo cáo hội nghị và đào tạo nội bộ với kho hiệu ứng chuyển cảnh động và nhúng đa phương tiện không giới hạn."
          : "Craft and deliver boardroom-ready pitch decks, keynote presentations, and training modules with smooth transitions and rich multimedia embeds.",
        interactiveTabsHeading: isVi ? "Tạo Bản Thuyết Trình Đơn Giản" : "Effortless Presentation Creation",
        interactiveTabsSubheading: isVi
          ? "Tương thích đa định dạng — hiệu ứng chuyển động đẹp mượt mà"
          : "Multi-format compatibility with ultra-smooth animation transitions",
        bonusCardsHeading: isVi ? "Thiết Kế Đồng Bộ Tuyệt Đối" : "Master Slide Consistency",
        bonusCardsSubheading: isVi ? "Tự tin trình chiếu trước đám đông" : "Confidence on stage with smart presenter controls",
        interactiveTabs: [
          {
            id: "ft-tt-1",
            label: isVi ? "Tương thích PowerPoint" : "PowerPoint Compatibility",
            eyebrow: isVi ? "TƯƠNG THÍCH POWERPOINT" : "POWERPOINT COMPATIBILITY",
            heading: isVi ? "Mở file .pptx không lỗi định dạng." : "Open .pptx files with zero broken layouts.",
            bullets: isVi
              ? [
                  "Mở và chỉnh sửa file .pptx, .ppt, .ppsx mượt mà không lỗi định dạng, tích hợp hàng chục hiệu ứng xuất hiện và chuyển tiếp đẹp mắt.",
                  "Giữ nguyên 100% cấu trúc slide, font chữ, bố cục bảng và biểu đồ số liệu khi trao đổi với đối tác dùng Microsoft 365.",
                ]
              : [
                  "Open and edit PPTX, PPT, and PPSX files flawlessly with dozens of entrance, exit, and transition animations.",
                  "Preserves 100% of slide geometry, fonts, speaker notes, and embedded charts when sharing with Microsoft 365 users.",
                ],
            image: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/slides/slide-animation.png",
          },
          {
            id: "ft-tt-2",
            label: isVi ? "Mẫu thiết kế & tài nguyên" : "Design Templates & Assets",
            eyebrow: isVi ? "MẪU THIẾT KẾ VÀ TÀI NGUYÊN SÁNG TẠO" : "DESIGN TEMPLATES & ASSETS",
            heading: isVi ? "Kho mẫu đa dạng, sẵn sàng sử dụng." : "Rich template library ready for pitch decks.",
            bullets: isVi
              ? [
                  "Khám phá kho mẫu thuyết trình đa dạng, biểu tượng, hình ảnh và tài nguyên thiết kế phong phú cho báo cáo kinh doanh, pitch deck.",
                  "Tích hợp sẵn các biểu đồ SmartArt, hình khối vector và công cụ tạo biểu đồ phân tích trực quan từ bảng tính.",
                ]
              : [
                  "Access a curated library of business pitch decks, investor templates, vector icons, and stock graphics.",
                  "Includes SmartArt diagrams, shapes, and charts synchronized directly with spreadsheet data.",
                ],
            image: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/slides/slide-master-slide.png",
          },
          {
            id: "ft-tt-3",
            label: isVi ? "Cộng tác theo thời gian thực" : "Real-time Team Co-authoring",
            eyebrow: isVi ? "CỘNG TÁC THEO THỜI GIAN THỰC" : "REAL-TIME TEAM CO-AUTHORING",
            heading: isVi ? "Cùng nhóm hoàn thiện bài thuyết trình." : "Build winning slide decks together as a team.",
            bullets: isVi
              ? [
                  "Cùng chỉnh sửa slide trực tuyến, để lại bình luận, tag tên thành viên, và khôi phục nhanh nhờ lịch sử phiên bản.",
                  "Chế độ khóa slide hoặc đoạn văn bản đang chỉnh sửa giúp ngăn ngừa xung đột dữ liệu giữa các thành viên nhóm.",
                ]
              : [
                  "Co-author slides in real-time, leave targeted comments, tag colleagues, and restore previous versions effortlessly.",
                  "Slide and element locking guarantees zero edit conflicts during fast-paced deadline crunches.",
                ],
            image: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/slides/slide-cong-tac.png",
          },
        ],
        bonusCards: [
          {
            title: isVi ? "Master Slide Nhất Quán" : "Master Slide Layouts",
            desc: isVi
              ? "Thiết lập bố cục, phông chữ, logo một lần duy nhất để áp dụng đồng loạt cho tất cả các slide trong bài thuyết trình."
              : "Define color palettes, corporate logos, and font hierarchies once to enforce consistent enterprise branding across all slides.",
          },
          {
            title: isVi ? "Phát GIF Trực Tiếp & Animation" : "Direct GIF Playback & Motion",
            desc: isVi
              ? "Thỏa sức làm sống động bài trình chiếu bằng cách phát trực tiếp file GIF động ngay trong slide mà không cần plugin ngoài."
              : "Bring ideas to life with native animated GIF playback during slideshow mode, paired with dozens of cinematic 3D slide transitions.",
          },
          {
            title: isVi ? "Chế Độ Xem Diễn Giả (Presenter View)" : "Smart Presenter View",
            desc: isVi
              ? "Hiển thị đồng hồ đếm giờ, slide tiếp theo và ghi chú riêng tư trên màn hình của bạn trong khi khán giả chỉ thấy màn hình sạch."
              : "Dual-monitor presenter console displays elapsed time, upcoming slides, and private speaker notes with a virtual laser pointer.",
          },
        ],
        features: [
          {
            title: isVi ? "Thiết kế trực quan, tương thích tuyệt đối với Microsoft PowerPoint" : "Visual Slide Builder with Native PowerPoint Compatibility",
            points: isVi
              ? [
                  "Mở và chỉnh sửa hoàn hảo các tệp .pptx từ đối tác mà không bao giờ mất hiệu ứng hay vỡ layout chữ.",
                  "Bộ sưu tập hàng trăm template mẫu chuyên nghiệp dành cho kinh doanh, giáo dục, tài chính và công nghệ.",
                  "Chèn và định dạng linh hoạt SmartArt, hình khối vector, bảng số liệu đồng bộ từ bảng tính.",
                ]
              : [
                  "Flawlessly open and edit PPTX decks without losing layout positions, custom fonts, or transition timings.",
                  "Extensive template library tailored for pitch decks, corporate quarters, and technical lectures.",
                  "Insert and format SmartArt diagrams, vector shapes, and linked tables from spreadsheets.",
                ],
          },
          {
            title: isVi ? "Kho hiệu ứng chuyển cảnh & hoạt ảnh phong phú" : "Cinematic Slide Transitions & Entrance Animations",
            points: isVi
              ? [
                  "Hiệu ứng chuyển slide 3D mượt mà, thời gian đáp ứng nhanh và không bị giật lag khi trình chiếu.",
                  "Thiết lập hoạt ảnh xuất hiện, nhấn mạnh và biến mất cho từng đoạn chữ, hình ảnh hay biểu đồ.",
                  "Hỗ trợ nhúng video trực tiếp từ YouTube, Vimeo hoặc file video nội bộ độ phân giải cao.",
                ]
              : [
                  "Smooth 3D slide transitions with ultra-responsive hardware-accelerated playback.",
                  "Configure fine-grained entrance, emphasis, and exit animations for text, shapes, and diagrams.",
                  "Embed videos directly from YouTube, Vimeo, or local high-definition media files.",
                ],
          },
        ],
        collaborationBenefits: [
          {
            title: isVi ? "Phân Chia Công Việc Nhanh Chóng" : "Distributed Team Authoring",
            desc: isVi
              ? "Mỗi thành viên phụ trách một phần slide (kinh doanh, kỹ thuật, tài chính) và đồng bộ trong tích tắc."
              : "Assign different slides to marketing, engineering, and finance specialists for simultaneous synthesis.",
          },
          {
            title: isVi ? "Trình Chiếu Trực Tuyến Từ Xa" : "Remote Live Presentation",
            desc: isVi
              ? "Chia sẻ liên kết bài thuyết trình để người tham gia cuộc họp từ xa theo dõi slide trực tiếp trên trình duyệt của họ."
              : "Broadcast slides remotely to meeting attendees directly in their browsers with no downloads needed.",
          },
          {
            title: isVi ? "AI Gợi Ý Nội Dung & Bố Cục Slide" : "AI Slide Drafting Assistant",
            desc: isVi
              ? "Yêu cầu trợ lý AI tóm tắt nội dung báo cáo thành các gạch đầu dòng súc tích phù hợp cho slide trình diễn."
              : "Ask the built-in AI assistant to outline key talking points, condense verbose paragraphs, and generate speaker notes.",
          },
        ],
      };

    // 4. PDF EDITOR
    case "pdf-editor":
      return {
        id: "pdf",
        slug: "pdf-editor",
        name: isVi ? "Phần Mềm Chỉnh Sửa PDF Toàn Diện & Ký Số" : "Comprehensive PDF Editor & Converter",
        tagline: isVi
          ? "Chỉnh sửa trực tiếp nội dung văn bản, hình ảnh trong PDF, điền biểu mẫu, tạo chữ ký số và bảo mật tài liệu."
          : "Directly edit text and images in PDF files, fill interactive forms, apply digital signatures, and convert formats.",
        badge: "ONLYOFFICE PDF Editor",
        msCompatLabel: isVi ? "Chuẩn Adobe Acrobat & ISO PDF" : "Adobe Acrobat & ISO PDF Standard",
        formatList: ["PDF", "PDF/A", "DJVU", "FB2", "EPUB", "DOCX", "XLSX", "PPTX"],
        heroImage: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/pdf-editor/pdf-chinh-sua-noi-dung.png",
        videoEmbedUrl: "https://www.youtube.com/embed/HqRMneSGHk0?autoplay=1&mute=1&loop=1&playlist=HqRMneSGHk0",
        overviewText: isVi
          ? "Chỉnh sửa văn bản, hình ảnh, sắp xếp trang, điền biểu mẫu PDF tương tác, gạch chú thích và ký số bảo mật mà không cần mua thêm phần mềm Adobe Acrobat đắt đỏ."
          : "Edit text, insert images, organize pages, fill interactive forms, annotate, and apply compliant e-signatures without costly Adobe Acrobat licenses.",
        interactiveTabsHeading: isVi ? "Chỉnh Sửa & Điền Form PDF Nâng Cao" : "Advanced PDF Editing & Form Filling",
        interactiveTabsSubheading: isVi
          ? "Làm việc trực tiếp trên file PDF không cần chuyển đổi trung gian"
          : "Edit PDF files natively without third-party converters",
        bonusCardsHeading: isVi ? "Bảo Mật & Ký Số Điện Tử" : "Bank-Grade Security & Signatures",
        bonusCardsSubheading: isVi ? "An tâm tuyệt đối khi luân chuyển hồ sơ pháp lý" : "Complete peace of mind for confidential legal contracts",
        interactiveTabs: [
          {
            id: "ft-pdf-1",
            label: isVi ? "Chỉnh sửa nội dung trực tiếp" : "Direct Text & Image Editing",
            eyebrow: isVi ? "CHỈNH SỬA NỘI DUNG TRỰC TIẾP" : "DIRECT TEXT & IMAGE EDITING",
            heading: isVi ? "Sửa văn bản, hình ảnh trực tiếp trong PDF." : "Edit text and images directly inside PDF pages.",
            bullets: isVi
              ? [
                  "Sửa văn bản, thay thế hình ảnh và đối tượng đồ họa trực tiếp trong tệp PDF mà không cần chuyển đổi trung gian qua Word.",
                  "Xóa, xoay, tách hoặc gộp nhiều trang PDF một cách dễ dàng chỉ bằng vài thao tác kéo thả.",
                ]
              : [
                  "Modify text, replace images, and reposition vector elements directly inside the PDF without converting back to Word.",
                  "Delete, rotate, split, merge, and reorder PDF pages with intuitive drag-and-drop actions.",
                ],
            image: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/pdf-editor/pdf-chinh-sua-noi-dung.png",
          },
          {
            id: "ft-pdf-2",
            label: isVi ? "Điền form PDF tương tác" : "Interactive PDF Form Filling",
            eyebrow: isVi ? "ĐIỀN FORM PDF TƯƠNG TÁC" : "INTERACTIVE PDF FORM FILLING",
            heading: isVi ? "Điền vào tất cả loại trường biểu mẫu." : "Fill out standard interactive PDF forms effortlessly.",
            bullets: isVi
              ? [
                  "Hỗ trợ điền vào tất cả loại trường form: ô nhập text, checkbox, radio button, dropdown menu, chữ ký và ngày tháng.",
                  "Tự động tính toán các trường số học và kiểm tra định dạng dữ liệu đầu vào chuẩn xác.",
                ]
              : [
                  "Fill text inputs, checkboxes, radio groups, dropdown selectors, date pickers, and signature blocks.",
                  "Auto-calculate arithmetic fields and validate tax codes, email addresses, and phone numbers.",
                ],
            image: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/pdf-editor/pdf-dien-form.png",
          },
          {
            id: "ft-pdf-3",
            label: isVi ? "Chuyển đổi PDF sang Word" : "Accurate PDF to Word Conversion",
            eyebrow: isVi ? "CHUYỂN ĐỔI ĐỊNH DẠNG HAI CHIỀU" : "TWO-WAY FORMAT CONVERSION",
            heading: isVi ? "Chuyển PDF sang DOCX giữ nguyên bố cục." : "Convert PDF to DOCX preserving complete geometry.",
            bullets: isVi
              ? [
                  "Chuyển đổi file PDF sang tệp Word (.docx) để chỉnh sửa sâu, giữ nguyên 100% bảng biểu và hình ảnh.",
                  "Xuất bản tài liệu Word, Excel, PowerPoint sang chuẩn PDF/A phục vụ lưu trữ lưu trữ dài hạn.",
                ]
              : [
                  "Convert PDFs into editable Word (.docx) files while preserving tables, columns, and layout headers.",
                  "Export Word, Excel, and PowerPoint files to ISO-compliant PDF/A format for long-term archiving.",
                ],
            image: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/pdf-editor/pdf-chuyen-doi-dinh-dang.png",
          },
        ],
        bonusCards: [
          {
            title: isVi ? "Chữ Ký Số Hợp Chuẩn Pháp Lý" : "Legally Binding E-Signatures",
            desc: isVi
              ? "Tạo chữ ký số điện tử để ký hợp đồng thương mại, hóa đơn điện tử và các văn bản pháp lý đáp ứng các quy chuẩn pháp luật."
              : "Sign commercial agreements, invoices, and legal documents with cryptographic digital signatures and audit verification.",
          },
          {
            title: isVi ? "Chú Thích & Đánh Dấu (Annotation)" : "Markup, Highlight & Draw",
            desc: isVi
              ? "Gạch chân, bôi vàng highlight đoạn văn bản quan trọng, để lại sticky notes và vẽ tự do trực tiếp lên trang PDF."
              : "Highlight key clauses, strikethrough text, drop sticky notes, and draw freehand sketches directly on PDF pages.",
          },
          {
            title: isVi ? "Đóng Dấu Watermark & Mã Hóa" : "Watermark & Password Encryption",
            desc: isVi
              ? "Đặt mật khẩu bảo vệ file, phân quyền in ấn và đóng dấu chìm Watermark tùy biến để ngăn chặn việc rò rỉ tài liệu mật."
              : "Lock confidential PDFs with AES-256 passwords, restrict printing permissions, and apply dynamic watermark stamps.",
          },
        ],
        features: [
          {
            title: isVi ? "Biên tập trực tiếp tệp PDF như trên trình xử lý văn bản" : "Direct In-Place PDF Text Editing",
            points: isVi
              ? [
                  "Chỉnh sửa chính xác từng đoạn văn bản, thay đổi phông chữ, cỡ chữ và màu sắc chữ trong PDF.",
                  "Chèn ảnh mới, căn chỉnh vị trí ảnh và thay đổi kích thước ảnh theo ý muốn.",
                  "Xóa các trang thừa, xoay trang bị ngược và trích xuất từng trang riêng lẻ.",
                ]
              : [
                  "Directly edit PDF paragraphs, change font sizes, colors, and line spacing with Word-like ease.",
                  "Insert new photos, resize logos, and adjust transparency directly inside the document.",
                  "Delete unnecessary pages, rotate scanned sheets, and extract specific chapters into standalone files.",
                ],
          },
          {
            title: isVi ? "Chuyển đổi tài liệu đa năng và tối ưu hóa dung lượng" : "Universal Document Conversion & Compression",
            points: isVi
              ? [
                  "Chuyển đổi qua lại giữa PDF và các định dạng phổ biến: DOCX, XLSX, PPTX, TXT, HTML.",
                  "Nén và tối ưu hóa dung lượng tệp PDF để dễ dàng gửi qua email mà không làm giảm chất lượng ảnh.",
                  "Hỗ trợ mở định dạng sách điện tử EPUB, FB2 và tệp bản vẽ DjVu.",
                ]
              : [
                  "Convert between PDF, DOCX, XLSX, PPTX, TXT, and HTML with high rendering fidelity.",
                  "Compress oversized PDF files for fast email attachments without degrading graphics.",
                  "Natively view eBook formats (EPUB, FB2) and DjVu documents.",
                ],
          },
        ],
        collaborationBenefits: [
          {
            title: isVi ? "Ký Kết Hợp Đồng Từ Xa" : "Remote Contract Closing",
            desc: isVi
              ? "Gửi hợp đồng PDF cho đối tác ký trực tuyến mà không cần in ra giấy rồi quét scan lại."
              : "Execute agreements digitally without printing, pen-signing, and re-scanning paper contracts.",
          },
          {
            title: isVi ? "Duyệt Hồ Sơ Dự Thầu Nhanh" : "Fast Tender & RFP Review",
            desc: isVi
              ? "Cả nhóm cùng gạch chú thích và phản hồi trên bộ hồ sơ dự thầu hàng trăm trang một cách đồng bộ."
              : "Review multi-hundred-page technical RFPs with team annotations and highlighted questions.",
          },
          {
            title: isVi ? "Tiết Kiệm Chi Phí Bản Quyền" : "Significant License Savings",
            desc: isVi
              ? "Thay thế hoàn toàn các phần mềm PDF thương mại đắt đỏ như Adobe Acrobat Pro cho toàn bộ nhân sự công ty."
              : "Replace expensive Adobe Acrobat Pro licenses across your enterprise with an all-in-one suite.",
          },
        ],
      };

    // 5. FORM CREATOR
    case "form-creator":
      return {
        id: "form",
        slug: "form-creator",
        name: isVi ? "Phần Mềm Tạo & Điền Biểu Mẫu Điện Tử" : "Digital Form Creator & Fillable PDF Builder",
        tagline: isVi
          ? "Biến bất kỳ tài liệu Word nào thành biểu mẫu PDF tương tác (OFORM) với đa dạng trường điền và chữ ký số."
          : "Turn standard documents into interactive fillable forms with rich fields, validation, and digital signatures.",
        badge: "ONLYOFFICE Form Creator",
        msCompatLabel: isVi ? "Chuẩn Fillable PDF / OFORM" : "Fillable PDF & OFORM Standard",
        formatList: ["OFORM", "DOCXF", "PDF", "DOCX"],
        heroImage: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/pdf-editor/pdf-dien-form.png",
        videoEmbedUrl: "https://www.youtube.com/embed/HqRMneSGHk0?autoplay=1&mute=1&loop=1&playlist=HqRMneSGHk0",
        overviewText: isVi
          ? "Số hóa hoàn toàn quy trình giấy tờ thủ công. Tạo các mẫu đơn xin nghỉ phép, hợp đồng lao động, bản khảo sát khách hàng hay hồ sơ nhân sự với các trường nhập liệu tự động hóa."
          : "Eliminate manual paperwork. Create HR onboarding templates, customer surveys, purchase orders, and legal waivers with automated fillable fields.",
        interactiveTabsHeading: isVi ? "Thiết Kế & Số Hóa Biểu Mẫu" : "Digital Form Design & Automation",
        interactiveTabsSubheading: isVi
          ? "Tự động hóa hoàn toàn quy trình thu thập dữ liệu doanh nghiệp"
          : "Automate company data collection workflows from start to finish",
        bonusCardsHeading: isVi ? "Lợi Ích Chuyển Đổi Số" : "Digital Transformation Benefits",
        bonusCardsSubheading: isVi
          ? "Tiết kiệm thời gian và chi phí vận hành cho bộ phận nhân sự, hành chính"
          : "Save hundreds of administrative hours across operations and HR",
        interactiveTabs: [
          {
            id: "ft-form-1",
            label: isVi ? "Thiết kế biểu mẫu trực quan" : "Visual Form Designer",
            eyebrow: isVi ? "THIẾT KẾ BIỂU MẪU TRỰC QUAN" : "VISUAL FORM DESIGNER",
            heading: isVi ? "Tạo các trường nhập liệu tương tác dễ dàng." : "Add interactive form controls in seconds.",
            bullets: isVi
              ? [
                  "Chèn các trường text box, checkbox, radio button, dropdown menu, bộ chọn ngày tháng và khung chữ ký.",
                  "Thiết lập định dạng mặt nạ (input mask) cho số điện thoại, mã số thuế, căn cước công dân chuẩn xác.",
                ]
              : [
                  "Drag and drop text boxes, checkboxes, radio groups, combo dropdowns, date pickers, and signature blocks.",
                  "Apply input masks for phone numbers, national IDs, tax numbers, and postal codes.",
                ],
            image: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/pdf-editor/pdf-dien-form.png",
          },
          {
            id: "ft-form-2",
            label: isVi ? "Ràng buộc logic & tự động hóa" : "Logic Rules & Auto-calculation",
            eyebrow: isVi ? "RÀNG BUỘC LOGIC & TỰ ĐỘNG HÓA" : "LOGIC RULES & AUTO-CALCULATION",
            heading: isVi ? "Kiểm tra dữ liệu đầu vào tự động." : "Validate inputs and calculate figures automatically.",
            bullets: isVi
              ? [
                  "Đánh dấu các trường bắt buộc (Required Fields) và khóa các nội dung điều khoản pháp lý chống chỉnh sửa ngoài ý muốn.",
                  "Tự động tính toán tổng tiền, thuế VAT trực tiếp ngay trong biểu mẫu theo công thức định sẵn.",
                ]
              : [
                  "Mark required fields and lock non-editable legal terms to prevent unauthorized tampering.",
                  "Auto-calculate sub-totals, sales taxes, and invoice balances using custom formulas.",
                ],
            image: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/word-processor/word-sang-tao-bieu-do.png",
          },
          {
            id: "ft-form-3",
            label: isVi ? "Xuất bản PDF chuẩn quốc tế" : "Standard PDF Form Export",
            eyebrow: isVi ? "XUẤT BẢN CHUẨN QUỐC TẾ" : "STANDARD PDF FORM EXPORT",
            heading: isVi ? "Điền mượt mà trên mọi thiết bị và ứng dụng." : "Fillable across any device and standard PDF viewer.",
            bullets: isVi
              ? [
                  "Lưu biểu mẫu dưới định dạng chuẩn PDF tương tác, người nhận có thể điền trên điện thoại hoặc trình duyệt bất kỳ.",
                  "Hỗ trợ định dạng OFORM mở giúp bảo vệ quyền riêng tư dữ liệu khi trao đổi giữa các phòng ban.",
                ]
              : [
                  "Export to standard fillable PDF format compatible with Acrobat, browsers, and mobile devices.",
                  "Leverage open OFORM architecture to ensure strict data sovereignty within your private cloud.",
                ],
            image: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/pdf-editor/pdf-chuyen-doi-dinh-dang.png",
          },
        ],
        bonusCards: [
          {
            title: isVi ? "Biến File Word Có Sẵn Thành Form" : "Convert Existing Word Docs",
            desc: isVi
              ? "Tận dụng lại các mẫu đơn Word sẵn có của công ty và biến thành biểu mẫu tương tác thông minh chỉ sau vài phút kéo thả."
              : "Import existing Word (.docx) templates and convert static blank lines into interactive digital form fields in minutes.",
          },
          {
            title: isVi ? "Khóa Trường Cố Định Chống Sửa" : "Role-Based Field Protection",
            desc: isVi
              ? "Người điền form chỉ được phép nhập dữ liệu vào đúng các ô được chỉ định, tuyệt đối không thể thay đổi câu chữ của văn bản gốc."
              : "Recipients can only enter data into designated input boxes while terms and legal boilerplate remain strictly immutable.",
          },
          {
            title: isVi ? "Tích Hợp Thu Thập Vào Bảng Tính" : "Spreadsheet Ingestion",
            desc: isVi
              ? "Kết hợp cùng ONLYOFFICE DocSpace để toàn bộ thông tin đối tác điền vào form sẽ tự động đổ về một bảng tính tổng hợp duy nhất."
              : "Pair with ONLYOFFICE DocSpace Form Filling Rooms to aggregate hundreds of submissions directly into one central spreadsheet.",
          },
        ],
        features: [
          {
            title: isVi ? "Bộ sưu tập trường điền dữ liệu đa dạng và chuyên nghiệp" : "Rich Set of Form Controls & Input Formats",
            points: isVi
              ? [
                  "Trường văn bản (Text Field) hỗ trợ giới hạn số lượng ký tự và kiểm tra định dạng email.",
                  "Trường ngày tháng tích hợp lịch chọn ngày trực quan, tránh nhầm lẫn ngày/tháng.",
                  "Trường chữ ký số hỗ trợ ký vẽ tay, tải ảnh chữ ký hoặc xác thực chứng thư số.",
                ]
              : [
                  "Text inputs with character limits, regex validation, and email syntax verification.",
                  "Interactive date picker popup prevents date formatting confusion (MM/DD vs DD/MM).",
                  "Digital signature fields support drawn signatures, image uploads, and cryptographic certificates.",
                ],
          },
          {
            title: isVi ? "Xuất bản và phân phối biểu mẫu linh hoạt" : "Flexible Form Distribution & Compliance",
            points: isVi
              ? [
                  "Xuất file PDF form chuẩn tương thích với mọi phần mềm đọc PDF như Adobe Reader, Foxit.",
                  "Chia sẻ liên kết điền form trực tuyến mà người điền không cần cài đặt thêm phần mềm.",
                  "Tích hợp vào hệ thống cổng thông tin nội bộ của doanh nghiệp hoặc website bán hàng.",
                ]
              : [
                  "Export standard fillable PDFs that render accurately in Adobe Reader, Foxit, and mobile browsers.",
                  "Share online web links so external clients can complete forms without software installation.",
                  "Easily embed intake forms inside customer portals, intranet sites, and CRM workflows.",
                ],
          },
        ],
        collaborationBenefits: [
          {
            title: isVi ? "Tự Động Hóa Tuyển Dụng & Onboarding" : "Automated HR Onboarding",
            desc: isVi
              ? "Ứng viên điền thông tin nhân sự và ký cam kết trực tuyến trước ngày đi làm đầu tiên."
              : "New hires complete tax forms, NDA agreements, and benefit elections online before their first day.",
          },
          {
            title: isVi ? "Chuẩn Hóa Đơn Hàng & Mua Sắm" : "Standardized Purchase Requisitions",
            desc: isVi
              ? "Mọi yêu cầu mua sắm nội bộ được gửi theo đúng mẫu chuẩn, loại bỏ sai sót số liệu."
              : "Internal purchase requests follow rigorous pre-set templates, preventing billing discrepancies.",
          },
          {
            title: isVi ? "Không Còn Giấy Tờ Thất Lạc" : "Zero Paper Clutter",
            desc: isVi
              ? "Toàn bộ tài liệu biểu mẫu được lưu trữ số hóa, dễ dàng tra cứu và sao lưu định kỳ."
              : "All completed forms are archived digitally with timestamped audit histories for effortless audits.",
          },
        ],
      };

    // 6. DIAGRAM VIEWER
    case "diagram-viewer":
      return {
        id: "diagram",
        slug: "diagram-viewer",
        name: isVi ? "Phần Mềm Xem Sơ Đồ Microsoft Visio (VSDX)" : "Native Microsoft Visio (VSDX) Diagram Viewer",
        tagline: isVi
          ? "Đọc và truy xuất chi tiết các tệp sơ đồ phức tạp định dạng VSDX với tốc độ tải cực nhanh mà không cần mua license Visio."
          : "Inspect complex Microsoft Visio (VSDX) files natively with instant vector rendering without expensive Visio licenses.",
        badge: "ONLYOFFICE Diagram Viewer",
        msCompatLabel: isVi ? "Tương thích Microsoft Visio (.vsdx)" : "100% Microsoft Visio (VSDX) Compatibility",
        formatList: ["VSDX", "VSD", "SVG", "PDF", "PNG"],
        heroImage: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-xem-so-do.jpg",
        videoEmbedUrl: "https://www.youtube.com/embed/HqRMneSGHk0?autoplay=1&mute=1&loop=1&playlist=HqRMneSGHk0",
        overviewText: isVi
          ? "Giải quyết bài toán mở file sơ đồ hệ thống công nghệ thông tin, bản vẽ kiến trúc mạng hay lưu đồ quy trình kinh doanh. ONLYOFFICE hiển thị chuẩn xác từng chi tiết mà không đòi hỏi chi phí đắt đỏ của Microsoft Visio."
          : "Open IT network topology schematics, architectural engineering plans, and business process flowcharts with precision rendering without costly proprietary software.",
        interactiveTabsHeading: isVi ? "Xem Sơ Đồ Kỹ Thuật Đa Năng" : "Versatile Technical Diagram Inspection",
        interactiveTabsSubheading: isVi
          ? "Hiển thị chuẩn xác mọi định dạng sơ đồ Visio"
          : "Pixel-perfect vector rendering for all Microsoft Visio formats",
        bonusCardsHeading: isVi ? "Tối Ưu Chi Phí Cho Doanh Nghiệp" : "Enterprise License Optimization",
        bonusCardsSubheading: isVi
          ? "Không cần mua license phần mềm đắt đỏ cho nhân sự chỉ có nhu cầu đọc duyệt bản vẽ"
          : "Cut software overhead for team members who only need read and inspection access",
        interactiveTabs: [
          {
            id: "ft-diagram-1",
            label: isVi ? "Hiển thị chuẩn Visio" : "Native Visio Rendering",
            eyebrow: isVi ? "HIỂN THỊ CHUẨN MICROSOFT VISIO" : "NATIVE MICROSOFT VISIO RENDERING",
            heading: isVi ? "Mở file .vsdx không vỡ nét vector." : "Open VSDX files with razor-sharp vector fidelity.",
            bullets: isVi
              ? [
                  "Mở trực tiếp các tệp tin .vsdx và .vsd tạo bởi mọi phiên bản Microsoft Visio từ cũ đến mới nhất.",
                  "Giữ nguyên độ sắc nét tuyệt đối của các đối tượng đồ họa vector khi phóng to cực đại.",
                ]
              : [
                  "Natively open VSDX and VSD files created by any version of Microsoft Visio without distortion.",
                  "Maintains razor-sharp resolution for all vector symbols and connectors even at extreme zoom levels.",
                ],
            image: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/docs-page/tool-xem-so-do.jpg",
          },
          {
            id: "ft-diagram-2",
            label: isVi ? "Điều hướng & tìm kiếm" : "Smooth Navigation & Search",
            eyebrow: isVi ? "ĐIỀU HƯỚNG & TÌM KIẾM THÔNG MINH" : "SMOOTH NAVIGATION & SEARCH",
            heading: isVi ? "Dễ dàng tra cứu trên sơ đồ lớn." : "Effortlessly search large, multi-node diagrams.",
            bullets: isVi
              ? [
                  "Công cụ Pan rê chuột mượt mà và tìm kiếm nhanh các mã hiệu, nhãn thiết bị trong sơ đồ hàng nghìn node.",
                  "Duyệt chuyển giữa các trang vẽ (pages) trong cùng một tài liệu sơ đồ đa trang một cách thuận tiện.",
                ]
              : [
                  "Fluid pan-and-zoom navigation with fast text search across schematics with thousands of interconnected nodes.",
                  "Seamlessly switch between multiple drawing tabs and layers within complex multi-page files.",
                ],
            image: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/word-processor/word-sang-tao-bieu-do.png",
          },
          {
            id: "ft-diagram-3",
            label: isVi ? "Xuất bản & chia sẻ an toàn" : "Safe Export & Sharing",
            eyebrow: isVi ? "XUẤT BẢN & CHIA SẺ AN TOÀN" : "SAFE EXPORT & SHARING",
            heading: isVi ? "Xuất PDF hoặc ảnh chất lượng cao." : "Export high-resolution PDFs and vector images.",
            bullets: isVi
              ? [
                  "Chuyển đổi sơ đồ Visio sang file PDF vector hoặc ảnh PNG độ phân giải cao để đính kèm báo cáo.",
                  "Chia sẻ liên kết chỉ đọc an toàn, ngăn chặn việc sao chép hoặc trích xuất dữ liệu trái phép.",
                ]
              : [
                  "Export diagrams directly to crisp vector PDFs or high-DPI PNGs for presentations and project reports.",
                  "Share password-protected View-Only links preventing unauthorized extraction or printing.",
                ],
            image: "https://onlyofficevietnam.com/wp-content/themes/onlyoffice-vn/assets/images/pdf-editor/pdf-chuyen-doi-dinh-dang.png",
          },
        ],
        bonusCards: [
          {
            title: isVi ? "Không Cần Mua License Visio" : "Zero Visio License Required",
            desc: isVi
              ? "Tiết kiệm hàng chục triệu đồng chi phí mua bản quyền Microsoft Visio riêng biệt cho nhân sự chỉ có nhu cầu đọc duyệt bản vẽ."
              : "Save millions of VND in dedicated Microsoft Visio desktop licenses for team members who solely review schematics.",
          },
          {
            title: isVi ? "Vector Sắc Nét 100%" : "100% Crisp Vector Resolution",
            desc: isVi
              ? "Công nghệ render vector tiên tiến giữ trọn độ nét dù bạn phóng to bao nhiêu lần trên màn hình độ phân giải cao 4K/Retina."
              : "State-of-the-art vector engine renders complex engineering drawings flawlessly on 4K and Retina displays.",
          },
          {
            title: isVi ? "Bảo Mật Dữ Liệu Tuyệt Đối" : "Self-Hosted Data Privacy",
            desc: isVi
              ? "Bản vẽ kỹ thuật và sơ đồ mạng nội bộ được xử lý an toàn trên hạ tầng của bạn, không gửi dữ liệu ra bên ngoài."
              : "Confidential network topology schematics are rendered inside your private cloud perimeter, never sent to external servers.",
          },
        ],
        features: [
          {
            title: isVi ? "Hiển thị chuẩn xác từng đường nét vector của Microsoft Visio" : "Pixel-Perfect Microsoft Visio Compatibility",
            points: isVi
              ? [
                  "Mở trực tiếp các tệp tin .vsdx và .vsd tạo bởi mọi phiên bản Microsoft Visio từ cũ đến mới nhất.",
                  "Giữ nguyên độ sắc nét tuyệt đối của các đối tượng đồ họa vector khi phóng to cực đại (zoom-in).",
                  "Hiển thị đầy đủ các lớp (layers), màu sắc phân biệt và các nhãn ghi chú kỹ thuật.",
                ]
              : [
                  "Open VSDX and VSD files created by any version of Microsoft Visio with zero conversion errors.",
                  "Preserve exact coordinates, line curves, connector arrows, and custom font labels.",
                  "Display multi-layer schematics, color highlights, and technical shape metadata.",
                ],
          },
          {
            title: isVi ? "Tốc độ tải nhanh & Không cần cài đặt phần mềm bên thứ 3" : "Lightning-Fast Browser Loading With Zero Install",
            points: isVi
              ? [
                  "Xem sơ đồ trực tiếp trên trình duyệt web chỉ bằng một cú click chuột.",
                  "Tiết kiệm chi phí mua bản quyền Microsoft Visio riêng biệt cho từng nhân viên chỉ có nhu cầu đọc sơ đồ.",
                  "Dễ dàng in ấn hoặc xuất ra định dạng PDF chất lượng cao để đính kèm hồ sơ kỹ thuật.",
                ]
              : [
                  "Inspect diagrams natively in Google Chrome, Safari, Edge, and Firefox with instant startup.",
                  "Save substantial IT budgets by eliminating standalone Visio desktop installations.",
                  "Print directly or export to high-resolution vector PDF for architectural blueprints.",
                ],
          },
        ],
        collaborationBenefits: [
          {
            title: isVi ? "Đánh Giá Thiết Kế Hạ Tầng IT" : "IT Infrastructure Review",
            desc: isVi
              ? "Kỹ sư mạng và chuyên viên bảo mật cùng thảo luận trực tiếp trên sơ đồ mạng máy chủ."
              : "Network architects and security auditors inspect firewall diagrams together on one screen.",
          },
          {
            title: isVi ? "Chuẩn Hóa Sơ Đồ Quy Trình (BPMN)" : "BPMN Process Optimization",
            desc: isVi
              ? "Ban giám đốc và các trưởng phòng dễ dàng theo dõi lưu đồ luân chuyển công việc nội bộ."
              : "Executive directors review business process flowcharts across operations and supply chain.",
          },
          {
            title: isVi ? "Hỗ Trợ Mọi Nền Tảng" : "Universal Platform Access",
            desc: isVi
              ? "Xem mượt mà trên máy tính Windows, máy Mac, máy Linux và máy tính bảng mà không gặp rào cản hệ điều hành."
              : "Works smoothly on macOS, Linux, Windows, and iPad without cross-platform formatting issues.",
          },
        ],
      };

    default:
      return getToolDetailData("document-editor", locale);
  }
}
