import json
import os

vi_path = r"d:\mercy\testCloneGiaoDien\web\messages\vi.json"
en_path = r"d:\mercy\testCloneGiaoDien\web\messages\en.json"

with open(vi_path, "r", encoding="utf-8") as f:
    vi_data = json.load(f)

with open(en_path, "r", encoding="utf-8") as f:
    en_data = json.load(f)

# 1. seamlessCollaboration
seamless_vi = {
    "breadcrumb": {
        "home": "Trang chủ",
        "docs": "ONLYOFFICE Docs",
        "current": "Cộng tác liền mạch"
    },
    "hero": {
        "badge": "CỘNG TÁC THỜI GIAN THỰC",
        "titlePrefix": "Cộng tác",
        "titleHighlight": "hiệu quả",
        "titleSuffix": "trên mọi loại tài liệu văn phòng",
        "subtitle": "Chia sẻ, đồng chỉnh sửa và kết nối tức thì theo thời gian thực giúp đội ngũ làm việc nhanh hơn, giảm thiểu sai sót và bảo mật dữ liệu doanh nghiệp tuyệt đối.",
        "startFree": "Bắt đầu miễn phí",
        "contactSales": "Liên hệ tư vấn",
        "trustSync": "0ms độ trễ đồng bộ",
        "trustLock": "Chế độ khóa đoạn văn độc quyền",
        "trustVideo": "Tích hợp Video Call Jitsi & Zoom",
        "alt": "Giao diện cộng tác ONLYOFFICE"
    },
    "tabs": {
        "share": "Chia sẻ",
        "coedit": "Đồng chỉnh sửa",
        "comment": "Bình luận",
        "communicate": "Giao tiếp",
        "trackChanges": "Theo dõi thay đổi",
        "compareCombine": "So sánh & Ghép",
        "manageVersions": "Quản lý phiên bản"
    },
    "features": {
        "share": {
            "badge": "01. PHÂN QUYỀN TRUY CẬP",
            "title": "Chia Sẻ Tài Liệu Với Hệ Thống Phân Quyền Linh Hoạt",
            "desc": "Chia sẻ tài liệu văn bản, bảng tính, bài thuyết trình và tệp PDF để xem hoặc chỉnh sửa, bật tính năng bình luận hoặc đánh giá xét duyệt. Tạo biểu mẫu điện tử sẵn sàng để người khác điền thông tin. Thiết lập bộ lọc dữ liệu tùy chỉnh cho phép từng cộng tác viên xem số liệu độc lập. Chia sẻ liên kết đến vùng dữ liệu được chọn để đồng nghiệp tìm kiếm nhanh chóng trong các bảng tính lớn. Hạn chế quyền sao chép, tải xuống và in ấn. Hỗ trợ chia sẻ công khai qua liên kết bảo mật.",
            "points": [
                "6 cấp độ phân quyền chuyên sâu: Toàn quyền (Full Access), Chỉ xem (Read Only), Đánh giá (Review), Bình luận (Comment), Điền biểu mẫu (Form Filling) và Lọc dữ liệu tùy chỉnh (Custom Filter).",
                "Chia sẻ liên kết trực tiếp tới vùng dữ liệu hoặc ô tính cụ thể trong các bảng tính lớn hàng ngàn dòng.",
                "Chặn sao chép, tải về và in ấn nhằm bảo vệ an toàn tối đa tài sản trí tuệ và bí mật kinh doanh."
            ],
            "tryNow": "Trải nghiệm tính năng này"
        },
        "coedit": {
            "badge": "02. ĐỒNG CHỈNH SỬA THỜI GIAN THỰC",
            "title": "Đồng Chỉnh Sửa Mượt Mà, Không Lo Xung Đột Nội Dung",
            "desc": "Cùng làm việc trên tài liệu trực tuyến trong thời gian thực. Sử dụng Fast Mode để thấy ngay thay đổi của đồng nghiệp theo từng ký tự gõ. Kích hoạt Strict Mode để khóa đoạn văn bản bạn đang soạn thảo, giúp tập trung làm việc riêng tư mà không bị người khác sửa đè.",
            "points": [
                "Fast Mode: Nhìn thấy con trỏ màu và từng ký tự đồng nghiệp gõ với độ trễ 0ms thời gian thực.",
                "Strict Mode: Khóa đoạn văn bản bạn đang viết độc quyền cho đến khi bạn bấm Save để công bố.",
                "Triệt tiêu hoàn toàn tình trạng trùng lặp hoặc xung đột chỉnh sửa (merge conflicts) giữa các cộng tác viên."
            ],
            "tryNow": "Trải nghiệm tính năng này"
        },
        "comment": {
            "badge": "03. BÌNH LUẬN & GẮN THẺ",
            "title": "Bình Luận Trao Đổi & Gắn Thẻ @Mention Thành Viên",
            "desc": "Để lại bình luận trực tiếp trên từng đoạn từ để thảo luận và phản hồi nhanh chóng. Gắn thẻ @tên thành viên trong nhận xét để mời họ tham gia cộng tác và tự động chia sẻ quyền truy cập tệp. Quản lý nhận xét dễ dàng, sắp xếp theo tác giả hoặc thời gian.",
            "points": [
                "Gắn thẻ @tên đồng nghiệp để gửi thông báo tức thời qua email và giao diện làm việc.",
                "Phân loại, tìm kiếm và lọc nhận xét thông minh theo tác giả, thời gian hoặc trạng thái giải quyết.",
                "Đánh dấu Hoàn tất (Resolve) khi góp ý đã được xử lý để tài liệu luôn gọn gàng và mạch lạc."
            ],
            "tryNow": "Trải nghiệm tính năng này"
        },
        "communicate": {
            "badge": "04. GIAO TIẾP TỨC THÌ",
            "title": "Giao Tiếp Đa Kênh: Trò Chuyện & Gọi Video Ngay Trong Tài Liệu",
            "desc": "Trò chuyện trực tiếp với đồng nghiệp ngay trong giao diện soạn thảo tài liệu. Kích hoạt plugin Jitsi, Rainbow hoặc Zoom để thực hiện cuộc gọi thoại và tổ chức họp video call mà không cần chuyển sang ứng dụng khác.",
            "points": [
                "Khung chat nội bộ tích hợp ngay trên thanh công cụ bên, lưu trữ trao đổi đi liền với tệp tài liệu.",
                "Tổ chức cuộc họp video call chất lượng cao trực tiếp qua Jitsi / Zoom mà không tốn phí bản quyền phụ.",
                "Duy trì 100% sự tập trung vào nội dung tài liệu mà không phải chuyển đổi cửa sổ phần mềm liên tục."
            ],
            "tryNow": "Trải nghiệm tính năng này"
        },
        "trackChanges": {
            "badge": "05. XÉT DUYỆT & THEO DÕI",
            "title": "Theo Dõi Lịch Sử Thay Đổi Toàn Diện (Track Changes)",
            "desc": "Bật chế độ Track Changes để đánh dấu rõ ràng mọi đóng góp và xét duyệt chỉnh sửa từ các thành viên khác. Chấp nhận (Accept) hoặc từ chối (Reject) từng thay đổi riêng lẻ hoặc toàn bộ cùng lúc. Tùy chọn cách thức hiển thị các chỉnh sửa đã thực hiện.",
            "points": [
                "Mỗi biên tập viên được gán một mã màu riêng biệt giúp nhận diện rõ ràng ai đã thêm hoặc bớt từng từ.",
                "Xem trước linh hoạt ở 3 chế độ: Đánh dấu sửa đổi (Markup), Bản gốc ban đầu (Original) hoặc Bản duyệt cuối cùng (Final).",
                "Chấp nhận hoặc từ chối từng đề xuất chỉnh sửa chỉ bằng một cú nhấp chuột của người kiểm duyệt."
            ],
            "tryNow": "Trải nghiệm tính năng này"
        },
        "compareCombine": {
            "badge": "06. SO SÁNH & GHÉP NỐI",
            "title": "So Sánh & Ghép Tài Liệu Chuẩn Xác (Compare & Combine)",
            "desc": "Nhanh chóng so sánh để tìm ra sự khác biệt giữa hai phiên bản tài liệu. Dễ dàng điều hướng giữa các điểm khác biệt, chấp nhận hoặc loại bỏ từng điểm. Ghép nối nội dung từ hai tài liệu thành một bản hoàn chỉnh duy nhất.",
            "points": [
                "Tự động rà soát và đối chiếu từng câu từ, công thức và bảng biểu giữa 2 phiên bản hợp đồng.",
                "Thanh công cụ điều hướng thông minh giúp lướt qua từng điểm dị biệt chỉ trong vài giây.",
                "Ghép nối nội dung từ hai bản nháp riêng rẽ thành một bản chuẩn cuối cùng mà không làm vỡ định dạng."
            ],
            "tryNow": "Trải nghiệm tính năng này"
        },
        "manageVersions": {
            "badge": "07. QUẢN LÝ PHIÊN BẢN",
            "title": "Quản Lý Lịch Sử Phiên Bản & Khôi Phục Tức Thì",
            "desc": "Truy cập toàn bộ lịch sử phiên bản của tài liệu, kiểm tra ai đã tạo từng phiên bản, vào thời gian nào và những thay đổi cụ thể. Xem lại và khôi phục về bất kỳ phiên bản nào trước đó chỉ với 1 cú nhấp chuột, kể cả nội dung đã xóa.",
            "points": [
                "Nhật ký kiểm toán chi tiết lưu trữ chính xác Tác giả, Thời gian và các thay đổi đã thực hiện.",
                "Khôi phục một chạm (1-click Rollback) về bất kỳ mốc lịch sử nào mà không làm mất bản nháp hiện tại.",
                "Đặt tên phiên bản tùy chỉnh (Named Versions) để đánh dấu các mốc ký kết, nghiệm thu hoặc phát hành quan trọng."
            ],
            "tryNow": "Trải nghiệm tính năng này"
        }
    },
    "matrix": {
        "badge": "SỨC MẠNH VƯỢT TRỘI",
        "title": "Tại Sao Doanh Nghiệp Chọn Cơ Chế Cộng Tác ONLYOFFICE?",
        "subtitle": "Sự kết hợp hoàn hảo giữa tốc độ làm việc nhóm theo thời gian thực và tiêu chuẩn bảo mật dữ liệu cấp doanh nghiệp On-Premise.",
        "card1Title": "2 Chế Độ Đồng Chỉnh Sửa Độc Quyền",
        "card1Desc": "Chuyển đổi linh hoạt giữa Fast Mode (ký tự theo mili-giây) và Strict Mode (khóa đoạn văn riêng tư). Không một đối thủ nào khác trên thị trường sở hữu giải pháp này.",
        "card2Title": "Bảo Mật Máy Chủ Riêng (On-Premise)",
        "card2Desc": "Triển khai trực tiếp trên máy chủ nội bộ hoặc Private Cloud của bạn. Dữ liệu tài liệu, nội dung chat và video call không bao giờ bị rò rỉ ra dịch vụ bên thứ ba.",
        "card3Title": "Tương Thích OOXML 100% Chuẩn Xác",
        "card3Desc": "Mở và lưu trực tiếp định dạng Microsoft Office (.docx, .xlsx, .pptx). Đảm bảo giữ nguyên vẹn 100% bố cục, font chữ tiếng Việt, bảng biểu và công thức.",
        "card4Title": "Họp Video Call Không Phụ Thu Phí",
        "card4Desc": "Tích hợp sẵn tiện ích Jitsi, Rainbow, Zoom ngay trong thanh công cụ. Gọi thoại và họp video tức thì cùng đồng nghiệp mà không cần mua thêm gói phần mềm khác."
    },
    "cta": {
        "badge": "MERCY TECH — ĐỐI TÁC ỦY QUYỀN ONLYOFFICE TẠI VIỆT NAM",
        "title": "Sẵn Sàng Nâng Tầm Năng Suất Cộng Tác Cho Doanh Nghiệp?",
        "subtitle": "Trải nghiệm miễn phí bản quyền ONLYOFFICE Enterprise hoặc nhận tư vấn lộ trình triển khai On-Premise bảo mật tối đa từ đội ngũ kỹ sư Mercy Tech.",
        "buttonTrial": "Đăng ký trải nghiệm ngay",
        "buttonConsult": "Liên hệ chuyên gia tư vấn"
    }
}

seamless_en = {
    "breadcrumb": {
        "home": "Home",
        "docs": "ONLYOFFICE Docs",
        "current": "Seamless Collaboration"
    },
    "hero": {
        "badge": "REAL-TIME COLLABORATION",
        "titlePrefix": "Collaborate",
        "titleHighlight": "effectively",
        "titleSuffix": "on all kinds of office documents",
        "subtitle": "Share, co-author and communicate in real time to get work done faster across documents, spreadsheets, presentations, and PDFs.",
        "startFree": "Create now",
        "contactSales": "Talk to an expert",
        "trustSync": "0ms latency sync",
        "trustLock": "Paragraph locking mode",
        "trustVideo": "In-doc Jitsi & Zoom calls",
        "alt": "ONLYOFFICE Collaboration Header"
    },
    "tabs": {
        "share": "Share",
        "coedit": "Co-edit",
        "comment": "Comment",
        "communicate": "Communicate",
        "trackChanges": "Track changes",
        "compareCombine": "Compare & combine",
        "manageVersions": "Manage versions"
    },
    "features": {
        "share": {
            "badge": "01. ACCESS PERMISSIONS",
            "title": "Share Docs Providing Flexible Permissions",
            "desc": "Share text documents, spreadsheets, presentations, and PDF files for viewing or editing, enable commenting or reviewing. Create ready-to-fill-out forms and let other users fill them in. Set permission for custom filtering to let collaborators filter data independently. Share links to the selected range so that other co-authors can quickly find necessary data even in large workbooks. Restrict the copy, download, and print options. Public sharing is also available.",
            "points": [
                "6 granular permission levels: Full Access, Read Only, Reviewing, Commenting, Form Filling, and Custom Filtering.",
                "Direct link sharing to specific cell ranges within massive enterprise workbooks.",
                "Strict restrictions on copying, downloading, and printing to protect confidential enterprise data."
            ],
            "tryNow": "Try this feature now"
        },
        "coedit": {
            "badge": "02. REAL-TIME CO-AUTHORING",
            "title": "Co-edit Without Stress",
            "desc": "Co-author documents online in real-time, use the Fast mode to display all changes right after input. Enable the Strict mode to lock the paragraph you edit and work on it privately without interruptions.",
            "points": [
                "Fast Mode: Displays co-authors' colored cursors and live keystrokes with 0ms real-time sync.",
                "Strict Mode: Exclusively locks your active paragraph until you choose to save and broadcast.",
                "Eliminates version divergence and overwrite conflicts among simultaneous collaborators."
            ],
            "tryNow": "Try this feature now"
        },
        "comment": {
            "badge": "03. COMMENTS & MENTIONS",
            "title": "Comment & Mention",
            "desc": "Leave comments to discuss questions and issues. Mention users in comments to invite them to collaborate and instantly share the file with them. Manage comments, sort them by author or date.",
            "points": [
                "Tag colleagues with @mention to trigger instant notifications and grant immediate file access.",
                "Smart comment filtering and sorting by author, timestamp, or resolved status.",
                "Mark discussions as Resolved once feedback is handled to keep documents tidy."
            ],
            "tryNow": "Try this feature now"
        },
        "communicate": {
            "badge": "04. IN-DOCUMENT COMMUNICATION",
            "title": "Communicate in Real Time",
            "desc": "Chat with co-authors right in your documents. Enable the Jitsi or Rainbow plugins to make audio calls and organize video meetings directly within the editor.",
            "points": [
                "Integrated sidebar team chat keeps discussions preserved alongside the document itself.",
                "Host high-definition voice and video calls directly through Jitsi, Rainbow, or Zoom plugins.",
                "Eliminate tab-switching fatigue and maintain 100% focus on collaborative deliverables."
            ],
            "tryNow": "Try this feature now"
        },
        "trackChanges": {
            "badge": "05. REVIEW & TRACK CHANGES",
            "title": "Track Changes with Total Control",
            "desc": "Enable Track Changes to highlight your contributions and review changes made by other editors. Accept or reject changes one-by-one or all at once. Choose a way to display the changes you made.",
            "points": [
                "Each editor is allocated an exclusive color tag to cleanly attribute every insertion and deletion.",
                "Flexible preview modes: Full Markup view, Original draft, or Final clean version.",
                "Granular one-click Accept or Reject controls for lead reviewers and project managers."
            ],
            "tryNow": "Try this feature now"
        },
        "compareCombine": {
            "badge": "06. COMPARE & COMBINE",
            "title": "Compare & Combine Documents",
            "desc": "Quickly compare and find differences between two documents. Navigate between changes, accept or reject them. Combine two docs together into a unified authoritative master file.",
            "points": [
                "Automated side-by-side discrepancy detection across text, formulas, styling, and tables.",
                "Intuitive navigation pane to step sequentially through all identified differences in seconds.",
                "Safely merge multiple departmental drafts into a single cohesive master document."
            ],
            "tryNow": "Try this feature now"
        },
        "manageVersions": {
            "badge": "07. VERSION MANAGEMENT",
            "title": "Manage Versions & Instant Recovery",
            "desc": "Access the version history of your document, check who created each version and when, what changes they made. View and recover previous versions if needed, including the deleted text.",
            "points": [
                "Comprehensive audit trail recording author names, timestamps, and line-by-line delta changes.",
                "Instant one-click rollback to any historical snapshot without losing active modifications.",
                "Assign custom labels (Named Versions) to bookmark contractual agreements and official releases."
            ],
            "tryNow": "Try this feature now"
        }
    },
    "matrix": {
        "badge": "ENTERPRISE ADVANTAGES",
        "title": "Why Enterprises Choose ONLYOFFICE Collaboration?",
        "subtitle": "The optimal balance between real-time teamwork velocity and strict on-premises data sovereignty.",
        "card1Title": "Dual Co-authoring Modes",
        "card1Desc": "Seamlessly switch between Fast Mode (millisecond live edits) and Strict Mode (private paragraph locking). No other suite provides this dual flexibility.",
        "card2Title": "100% Self-Hosted Privacy",
        "card2Desc": "Deploy directly on your enterprise servers or private cloud. Documents, team chats, and video calls never leak to external third-party hosts.",
        "card3Title": "Native OOXML Engine",
        "card3Desc": "Native ISO/IEC 29500 OOXML engine ensuring zero formatting loss, font distortion, or formula breakage when collaborating across platforms.",
        "card4Title": "Built-in Video Conferencing",
        "card4Desc": "Pre-integrated with Jitsi, Rainbow, and Zoom plugins. Spin up voice or video huddles right in the doc without supplementary conferencing subscriptions."
    },
    "cta": {
        "badge": "MERCY TECH — AUTHORIZED ONLYOFFICE PARTNER",
        "title": "Ready to Transform Team Productivity with ONLYOFFICE?",
        "subtitle": "Start a free ONLYOFFICE Enterprise trial or receive on-premises deployment consultation from certified Mercy Tech engineers.",
        "buttonTrial": "Start your free trial",
        "buttonConsult": "Talk to an expert"
    }
}

# 2. demo
demo_vi = {
    "hero": {
        "distributorBadge": "MERCY TECH — ĐƠN VỊ PHÂN PHỐI CHÍNH THỨC ONLYOFFICE TẠI VIỆT NAM",
        "title": "Trải Nghiệm Trực Tuyến ",
        "titleHighlight": "ONLYOFFICE Docs Enterprise",
        "subtitle": "Hệ sinh thái ứng dụng văn phòng số bảo mật cao cấp. Tương thích 100% định dạng Microsoft Office (.docx, .xlsx, .pptx) và chỉnh sửa biểu mẫu PDF chuyên nghiệp trực tiếp trên trình duyệt hoặc cài đặt On-Premise cho tổ chức.",
        "card1Title": "1. Demo Đám Mây Trực Tiếp",
        "card1Sub": "Word, Excel, PowerPoint, PDF",
        "card2Title": "2. Dùng Thử 7 Ngày (PC)",
        "card2Sub": "Kích hoạt 1-Click tự động (.BAT)",
        "card3Title": "3. Quét Crack & Bản Quyền",
        "card3Sub": "Công cụ kiểm tra MercyCheck v2.0",
        "noAccount": "100% Không Cần Đăng Ký Tài Khoản",
        "msCompat": "Tương Thích Chuẩn Định Dạng MS Office",
        "security": "Bảo Mật Chuẩn Doanh Nghiệp Quốc Tế",
        "speed": "Tốc Độ Xử Lý Nhanh Trên Mọi Trình Duyệt"
    },
    "onlineSuite": {
        "badge": "TRÌNH SOẠN THẢO TRỰC TUYẾN ONLYOFFICE CHÍNH HÃNG",
        "title": "Trải Nghiệm Đầy Đủ 4 Ứng Dụng Văn Phòng Số",
        "subtitle": "Bấm chọn từng định dạng bên dưới. Bạn có thể gõ nội dung, chèn bảng biểu, định dạng phông chữ và tính toán số liệu trực tiếp ngay trên khung giao diện thời gian thực.",
        "tabs": {
            "docx": {
                "label": "Soạn Thảo Văn Bản",
                "sub": "Tương thích 100% Word",
                "filename": "Hop-Dong-Kinh-Te-OnlyOffice-Mercy.docx"
            },
            "xlsx": {
                "label": "Bảng Tính & Số Liệu",
                "sub": "Đầy đủ hàm & công thức",
                "filename": "Bang-Bao-Gia-Chi-Tiet-Doanh-Nghiep.xlsx"
            },
            "pptx": {
                "label": "Trình Chiếu Slide",
                "sub": "Hiệu ứng chuyển động mượt mà",
                "filename": "Gioi-Thieu-Giai-Phap-OnlyOffice-Vietnam.pptx"
            },
            "pdf": {
                "label": "Chỉnh Sửa Biểu Mẫu",
                "sub": "Điền form & ký số điện tử",
                "filename": "Bieu-Mau-Phap-Ly-AGPLv3.pdf"
            }
        },
        "loading": "Đang kết nối trực tiếp đến máy chủ đám mây ONLYOFFICE...",
        "preparing": "Đang chuẩn bị giao diện demo...",
        "serverPrompt": "Cần triển khai máy chủ On-Premise / Private Cloud riêng?",
        "serverDesc": "Mercy Tech cung cấp giải pháp máy chủ tài liệu nội bộ, bảo mật dữ liệu 100% trong mạng LAN công ty, tích hợp sẵn Nextcloud/Docker.",
        "serverBtn": "Tư Vấn Máy Chủ Riêng"
    },
    "pcActivation": {
        "badge": "BẢN QUYỀN TRẢI NGHIỆM ĐẦY ĐỦ CHO DOANH NGHIỆP",
        "title": "Tải Công Cụ Kích Hoạt Dùng Thử 7 Ngày ",
        "titleHighlight": "(Tự Động 1-Click .BAT)",
        "desc": "Script thông minh từ Mercy Tech tự động nhận diện cấu hình Windows (x64 / ARM64), tải bản cài đặt OnlyOffice chính hãng mới nhất (nếu máy chưa có) và tiêm license dùng thử 7 ngày đầy đủ tính năng Enterprise kèm trọn bộ 3 Plugin AI & dịch thuật.",
        "points": {
            "p1": "Kích hoạt đầy đủ tính năng Enterprise: Document Server, PDF Editor, AI Assistant",
            "p2": "An toàn tuyệt đối 100%, mã nguồn mở minh bạch, không crack, không can thiệp hệ thống",
            "p3": "Hỗ trợ kỹ thuật cài đặt từ xa qua Ultraview / Teamviewer bởi kỹ sư Mercy Tech"
        },
        "platform": "Phiên bản Windows 10 / 11",
        "verified": "✓ Đã kiểm định an toàn",
        "downloadBtn": "TẢI CÔNG CỤ 1-CLICK (.BAT)",
        "mirrorBtn": "Tải Dự Phòng",
        "guideBtn": "Xem Hướng Dẫn",
        "copied": "Đã chép",
        "copy": "Copy",
        "guide": {
            "title": "Hướng Dẫn Kích Hoạt 1-Click",
            "step1Title": "Tải file .BAT về máy tính:",
            "step1Desc": "Bấm nút \"TẢI CÔNG CỤ 1-CLICK\" để lưu file Kich-Hoat-Demo-OnlyOffice-Mercy.bat.",
            "step2Title": "Khởi chạy quyền Administrator:",
            "step2Desc": "Nhấp đúp vào file (hoặc click chuột phải chọn Run as administrator).",
            "step3Title": "Tự động hoàn tất:",
            "step3Desc": "Bấm Yes khi Windows hỏi quyền UAC. Script tự động cài đặt OnlyOffice và kích hoạt 7 ngày dùng thử đầy đủ tính năng!",
            "supportNote": "✓ An toàn tuyệt đối 100%, không chứa mã độc. Kỹ sư Mercy Tech sẵn sàng hỗ trợ trực tiếp qua Hotline: 0763.068.614 (24/7).",
            "closeBtn": "Đã hiểu, đóng cửa sổ"
        }
    },
    "mercyCheck": {
        "badge": "CÔNG CỤ BẢO MẬT & RÀ SOÁT BẢN QUYỀN ĐỘC QUYỀN MERCY TECH",
        "title": "MercyCheck v2.0 — Rà Soát Bản Quyền & Phát Hiện Crack Ngầm",
        "desc": "Công cụ 1-Click độc quyền từ Mercy Tech. Tự động kiểm tra bản quyền Windows, MS Office, phát hiện các công cụ crack nguy hiểm tiềm ẩn ransomware (AutoKMS, sppc.dll Ohook, Adobe GenP, IDM, WinRAR...) và chẩn đoán sức khỏe hệ thống chỉ trong 15 giây.",
        "version": "Phiên bản mới nhất v2.0",
        "portable": "Portable • Zero-Install",
        "downloadCardTitle": "Tải Về & Quét Ngay Trên Máy Tính",
        "downloadCardDesc": "Công cụ dạng Single-File Portable (~44 KB), không cần cài đặt, không tạo rác hệ thống và hoạt động 100% offline bảo mật dữ liệu tuyệt đối.",
        "downloadBtn": "TẢI MERCYCHECK.BAT",
        "zipBtn": "Tải Bản .ZIP",
        "copyLink": "Copy link tải",
        "copiedLink": "Đã copy link",
        "features": {
            "f1Title": "Phát hiện 15+ loại crack:",
            "f1Desc": "AutoKMS, sppc.dll, GenP, IDM, WinRAR...",
            "f2Title": "Xác thực License:",
            "f2Desc": "Phân loại Digital, Retail, OEM vs KMS lậu",
            "f3Title": "An toàn bảo mật:",
            "f3Desc": "Defender, Firewall, Hosts, Port backdoor",
            "f4Title": "Sức khỏe phần cứng:",
            "f4Desc": "SMART ổ cứng, chai pin, CPU & RAM"
        },
        "psLabel": "Chạy nhanh qua PowerShell (Dành cho Quản trị viên IT):",
        "psTitle": "Bấm để sao chép lệnh PowerShell",
        "consoleTitle": "cmd.exe — MercyCheck v2.0 (Admin Console)",
        "filterTabs": {
            "all": "Tất cả",
            "crack": "Phát hiện Crack",
            "license": "Bản quyền",
            "security": "Bảo mật"
        },
        "legalBanner": {
            "title": "Chuẩn bị đón đoàn thanh tra bản quyền phần mềm liên ngành?",
            "desc": "Mercy Tech cung cấp giải pháp chuyển đổi toàn diện sang OnlyOffice bản quyền hợp pháp 100%, kèm Hợp đồng kinh tế, Hóa đơn VAT và Chứng nhận nguồn gốc AGPLv3 đóng dấu mộc đỏ.",
            "btn": "Tư Vấn Miễn Trừ Pháp Lý"
        }
    },
    "enterpriseCta": {
        "badge": "GIẢI PHÁP VĂN PHÒNG SỐ CHUẨN DOANH NGHIỆP — MERCY TECH",
        "titlePrefix": "Chuyển Đổi Sang ONLYOFFICE — ",
        "titleHighlight": "Hợp Pháp Hóa 100% & Tiết Kiệm 70% Chi Phí",
        "subtitle": "Xóa bỏ hoàn toàn nỗi lo bị thanh tra xử phạt bản quyền phần mềm và nguy cơ lây nhiễm mã độc ransomware từ các bản crack lậu. Mercy Tech đồng hành tư vấn lộ trình triển khai bản quyền trọn gói, bảo mật và tiết kiệm nhất cho doanh nghiệp.",
        "pillars": {
            "p1Title": "100% Hợp Pháp & Có VAT",
            "p1Desc": "Đầy đủ hợp đồng kinh tế, hóa đơn VAT điện tử và chứng nhận nguồn gốc AGPLv3 mộc đỏ pháp lý.",
            "p2Title": "On-Premise Riêng Biệt",
            "p2Desc": "Tự chủ 100% máy chủ tài liệu nội bộ, tương thích sâu với Docker, Nextcloud, OwnCloud.",
            "p3Title": "Tiết Kiệm Đến 70%",
            "p3Desc": "Cấp phép vĩnh viễn theo thiết bị hoặc cụm máy chủ, không phụ thuộc chi phí thuê bao đắt đỏ.",
            "p4Title": "Kỹ Sư Hỗ Trợ 24/7",
            "p4Desc": "Đội ngũ kỹ thuật Mercy Tech trực tiếp cài đặt, đào tạo chuyển giao và bảo hành kỹ thuật trọn đời."
        },
        "quoteBtn": "Nhận Báo Giá Doanh Nghiệp",
        "chatBtn": "Chat Tư Vấn Ngay",
        "hotline": "Hotline: 0763.068.614"
    }
}

demo_en = {
    "hero": {
        "distributorBadge": "MERCY TECH — AUTHORIZED ONLYOFFICE DISTRIBUTOR IN VIETNAM",
        "title": "Interactive Live Demo ",
        "titleHighlight": "ONLYOFFICE Docs Enterprise",
        "subtitle": "Secure, enterprise-grade digital office ecosystem. 100% native compatibility with Microsoft Office formats (.docx, .xlsx, .pptx) and professional PDF form editing directly in browser or on-premises.",
        "card1Title": "1. Live Cloud Suite Demo",
        "card1Sub": "Word, Excel, PowerPoint, PDF",
        "card2Title": "2. 7-Day PC Trial",
        "card2Sub": "Automatic 1-Click activation (.BAT)",
        "card3Title": "3. Crack & License Audit",
        "card3Sub": "MercyCheck v2.0 security scanner",
        "noAccount": "100% No Account Required",
        "msCompat": "Native MS Office Compatibility",
        "security": "International Enterprise Security",
        "speed": "High-Performance Across All Browsers"
    },
    "onlineSuite": {
        "badge": "OFFICIAL ONLYOFFICE ONLINE EDITOR SUITE",
        "title": "Experience All 4 Digital Office Applications",
        "subtitle": "Select any format below. You can compose documents, insert tables, style typography, and compute formulas directly in this live workspace.",
        "tabs": {
            "docx": {
                "label": "Document Editor",
                "sub": "100% MS Word compatible",
                "filename": "OnlyOffice-Commercial-Agreement.docx"
            },
            "xlsx": {
                "label": "Spreadsheet & Data",
                "sub": "Complete formulas & sheets",
                "filename": "Enterprise-Financial-Forecast.xlsx"
            },
            "pptx": {
                "label": "Presentation Slides",
                "sub": "Fluid animations & transitions",
                "filename": "OnlyOffice-Solution-Overview.pptx"
            },
            "pdf": {
                "label": "PDF & Form Creator",
                "sub": "Fillable forms & digital signatures",
                "filename": "Legal-Compliance-Form.pdf"
            }
        },
        "loading": "Connecting directly to ONLYOFFICE Cloud server...",
        "preparing": "Preparing demo workspace...",
        "serverPrompt": "Need an On-Premise or Private Cloud deployment?",
        "serverDesc": "Mercy Tech delivers self-hosted document server solutions with 100% on-premises data isolation, pre-integrated with Nextcloud/Docker.",
        "serverBtn": "Private Server Consultation"
    },
    "pcActivation": {
        "badge": "FULL ENTERPRISE TRIAL LICENSE",
        "title": "Download 7-Day Trial Activation Tool ",
        "titleHighlight": "(Automated 1-Click .BAT)",
        "desc": "Smart script by Mercy Tech automatically detects Windows architecture (x64 / ARM64), downloads the latest genuine OnlyOffice installer (if needed), and activates a 7-day full Enterprise trial with 3 AI & translation plugins included.",
        "points": {
            "p1": "Unlocks full Enterprise capabilities: Document Server, PDF Editor, AI Assistant",
            "p2": "100% verified safe, transparent open-source code, non-crack, zero intrusive modifications",
            "p3": "Remote setup assistance via Ultraview / Teamviewer by Mercy Tech engineers"
        },
        "platform": "Windows 10 / 11 Editions",
        "verified": "✓ Verified Safe",
        "downloadBtn": "DOWNLOAD 1-CLICK TOOL (.BAT)",
        "mirrorBtn": "Mirror Download",
        "guideBtn": "Quick Guide",
        "copied": "Copied",
        "copy": "Copy",
        "guide": {
            "title": "1-Click Activation Guide",
            "step1Title": "Download .BAT file:",
            "step1Desc": "Click \"DOWNLOAD 1-CLICK TOOL\" to save Kich-Hoat-Demo-OnlyOffice-Mercy.bat.",
            "step2Title": "Run as Administrator:",
            "step2Desc": "Double-click the file (or right-click and choose Run as administrator).",
            "step3Title": "Automated execution:",
            "step3Desc": "Click Yes when Windows prompts for UAC permission. The script installs OnlyOffice and enables 7 days of full Enterprise features!",
            "supportNote": "✓ 100% verified safe with zero malware. Mercy Tech engineers are available 24/7 for remote assistance via Hotline: 0763.068.614.",
            "closeBtn": "Got it, close window"
        }
    },
    "mercyCheck": {
        "badge": "MERCY TECH EXCLUSIVE SECURITY & LICENSE AUDIT TOOL",
        "title": "MercyCheck v2.0 — License Audit & Crack Detection Engine",
        "desc": "Proprietary 1-Click tool by Mercy Tech. Automatically audits Windows and MS Office licenses, detects dangerous crack utilities harboring ransomware (AutoKMS, sppc.dll Ohook, Adobe GenP, IDM, WinRAR...), and diagnoses hardware health in 15 seconds.",
        "version": "Latest Release v2.0",
        "portable": "Portable • Zero-Install",
        "downloadCardTitle": "Download & Run Instant PC Audit",
        "downloadCardDesc": "Packaged as a Single-File Portable script (~44 KB), zero installation required, creates no temporary clutter, and operates 100% offline.",
        "downloadBtn": "DOWNLOAD MERCYCHECK.BAT",
        "zipBtn": "Download .ZIP",
        "copyLink": "Copy link",
        "copiedLink": "Link copied",
        "features": {
            "f1Title": "Detects 15+ crack tools:",
            "f1Desc": "AutoKMS, sppc.dll, GenP, IDM, WinRAR...",
            "f2Title": "License Verification:",
            "f2Desc": "Identifies Digital, Retail, OEM vs Illegal KMS",
            "f3Title": "Security Assessment:",
            "f3Desc": "Defender, Firewall, Hosts file & LAN backdoors",
            "f4Title": "Hardware Health:",
            "f4Desc": "Drive SMART health, battery wear, CPU & RAM"
        },
        "psLabel": "Quick Run via PowerShell (For IT Admins):",
        "psTitle": "Click to copy PowerShell command",
        "consoleTitle": "cmd.exe — MercyCheck v2.0 (Admin Console)",
        "filterTabs": {
            "all": "All Logs",
            "crack": "Crack Alerts",
            "license": "Licenses",
            "security": "Security"
        },
        "legalBanner": {
            "title": "Preparing for Inter-Agency Software License Audits?",
            "desc": "Mercy Tech delivers a turnkey migration to 100% legally compliant OnlyOffice, complete with commercial contracts, VAT e-invoices, and certified AGPLv3 compliance documents.",
            "btn": "Legal Compliance Consultation"
        }
    },
    "enterpriseCta": {
        "badge": "ENTERPRISE DIGITAL WORKSPACE SOLUTIONS — MERCY TECH",
        "titlePrefix": "Migrate to ONLYOFFICE — ",
        "titleHighlight": "100% Legally Compliant & Save 70% Costs",
        "subtitle": "Completely eliminate software license audit penalties and ransomware risks stemming from cracked tools. Mercy Tech partners with your organization to deliver a secure, fully compliant, and cost-effective deployment roadmap.",
        "pillars": {
            "p1Title": "100% Legally Compliant & VAT",
            "p1Desc": "Full commercial contracts, electronic VAT invoices, and legally certified AGPLv3 origin documentation.",
            "p2Title": "Dedicated On-Premise",
            "p2Desc": "100% sovereignty over internal document servers, seamlessly compatible with Docker, Nextcloud, and OwnCloud.",
            "p3Title": "Save Up To 70%",
            "p3Desc": "Perpetual licensing per device or server cluster, freeing you from exorbitant recurring subscriptions.",
            "p4Title": "24/7 Dedicated Engineers",
            "p4Desc": "Mercy Tech technical team directly installs, trains your staff, and provides lifetime technical support."
        },
        "quoteBtn": "Request Enterprise Quote",
        "chatBtn": "Live Consultation Chat",
        "hotline": "Hotline: 0763.068.614"
    }
}

# 3. pricingQuoteModal
modal_vi = {
    "badge": "BẢO MẬT & CHIẾT KHẤU TỐI ĐA",
    "title": "Yêu Cầu Nhận Báo Giá Ưu Đãi",
    "successTitle": "GỬI YÊU CẦU THÀNH CÔNG!",
    "successDesc": "Hệ thống đang mở kết nối liên hệ với chuyên viên tư vấn Mercy Tech (Hotline: 0763.068.614) để gửi bảng giá chiết khấu chi tiết cho quý khách.",
    "closeBtn": "Đóng cửa sổ",
    "productLabel": "1. Sản phẩm quan tâm:",
    "products": {
        "keyOnline": "🔑 OnlyOffice Key Online (Vĩnh viễn theo Mainboard)",
        "portal": "⚡ Tài Khoản Portal Quản Trị Đại Lý 24/7 (Xuất Key Tức Thì)",
        "enterprise": "🏢 OnlyOffice Docs Enterprise (Máy chủ riêng / On-premise)",
        "reseller": "💼 Gói Đại Lý Sỉ / Phân phối cho cửa hàng máy tính"
    },
    "quantityLabel": "2. Số lượng dự kiến:",
    "quantities": {
        "tier1": "Từ 1 – 4 thiết bị (Cá nhân / Máy lẻ)",
        "tier2": "Từ 5 – 49 thiết bị (Doanh nghiệp vừa & nhỏ)",
        "tier3": "Từ 50 thiết bị trở lên (Dự án / Số lượng lớn)",
        "tier4": "Số lượng sỉ định kỳ cho cửa hàng máy tính"
    },
    "fullNameLabel": "Họ và tên *:",
    "fullNamePlaceholder": "Nguyễn Văn A",
    "phoneLabel": "Số điện thoại liên hệ *:",
    "phonePlaceholder": "09xx xxx xxx",
    "companyLabel": "Tên Công ty / Cửa hàng máy tính:",
    "companyPlaceholder": "Công ty ABC / Vi tính XYZ (nếu có)",
    "vatCheckbox": "Doanh nghiệp có nhu cầu xuất Hóa đơn điện tử VAT",
    "submitBtn": "Gửi Yêu Cầu & Liên Hệ Báo Giá"
}

modal_en = {
    "badge": "SECURE & MAXIMUM VOLUME DISCOUNT",
    "title": "Request Special Quotation",
    "successTitle": "REQUEST SUBMITTED SUCCESSFULLY!",
    "successDesc": "Connecting you with a Mercy Tech enterprise specialist (Hotline: 0763.068.614) to deliver your customized volume discount quote.",
    "closeBtn": "Close Window",
    "productLabel": "1. Interested product:",
    "products": {
        "keyOnline": "🔑 OnlyOffice Online Key (Perpetual per Mainboard)",
        "portal": "⚡ Reseller Admin Portal Account 24/7 (Instant Key Issue)",
        "enterprise": "🏢 OnlyOffice Docs Enterprise (Dedicated / On-Premise Server)",
        "reseller": "💼 Bulk Reseller / IT Partner Package"
    },
    "quantityLabel": "2. Estimated quantity:",
    "quantities": {
        "tier1": "1 – 4 devices (Individual / Small setup)",
        "tier2": "5 – 49 devices (SMB / Medium team)",
        "tier3": "50+ devices (Enterprise / Bulk volume)",
        "tier4": "Periodic recurring bulk for computer stores"
    },
    "fullNameLabel": "Full Name *:",
    "fullNamePlaceholder": "John Smith",
    "phoneLabel": "Phone number *:",
    "phonePlaceholder": "+84...",
    "companyLabel": "Company / Organization:",
    "companyPlaceholder": "Company ABC (optional)",
    "vatCheckbox": "Request official electronic VAT e-invoice",
    "submitBtn": "Submit & Request Quote"
}

vi_data["seamlessCollaboration"] = seamless_vi
vi_data["demo"] = demo_vi
vi_data["pricingQuoteModal"] = modal_vi

en_data["seamlessCollaboration"] = seamless_en
en_data["demo"] = demo_en
en_data["pricingQuoteModal"] = modal_en

with open(vi_path, "w", encoding="utf-8") as f:
    json.dump(vi_data, f, ensure_ascii=False, indent=2)

with open(en_path, "w", encoding="utf-8") as f:
    json.dump(en_data, f, ensure_ascii=False, indent=2)

# Also save directly to src/messages/vi.json and src/messages/en.json
src_messages_dir = r"d:\mercy\testCloneGiaoDien\web\src\messages"
with open(os.path.join(src_messages_dir, "vi.json"), "w", encoding="utf-8") as f:
    json.dump(vi_data, f, ensure_ascii=False, indent=2)

with open(os.path.join(src_messages_dir, "en.json"), "w", encoding="utf-8") as f:
    json.dump(en_data, f, ensure_ascii=False, indent=2)

# Also distribute to the modular src/messages structure
group_keys = {
    "common": ["common", "header", "footer", "branding", "announcement"],
    "home": ["hero", "docsSection", "collabSection", "aiSection", "securitySection", "solutionsSection", "customersSection", "ratingsSection", "newsSection", "faqSection"],
    "pricing": ["pricingPage", "pricingQuoteModal", "pricingGuarantees", "pricingWholesale", "pricingKeyCards"],
    "enterprise": ["demo", "seamlessCollaboration", "partnersPage", "blogPage"]
}

for lang, data in [("vi", vi_data), ("en", en_data)]:
    lang_dir = os.path.join(src_messages_dir, lang)
    os.makedirs(lang_dir, exist_ok=True)
    for group, keys in group_keys.items():
        group_data = {k: data[k] for k in keys if k in data}
        with open(os.path.join(lang_dir, f"{group}.json"), "w", encoding="utf-8") as f:
            json.dump(group_data, f, ensure_ascii=False, indent=2)

print("SUCCESS: Updated src/messages/(vi|en).json and modular files!")

