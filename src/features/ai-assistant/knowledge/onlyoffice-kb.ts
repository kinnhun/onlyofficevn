import type { KnowledgeSource } from "../types";

export type KnowledgeEntry = {
  id: string;
  keywords: string[];
  intents: string[];
  title: string;
  source: KnowledgeSource;
  answer: string;
  suggestedActions: string[];
};

export const ONLYOFFICE_KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    id: "kb_install_download",
    keywords: [
      "tải",
      "cài đặt",
      "download",
      "link tải",
      "bộ cài",
      "setup",
      "cài thế nào",
      "bước cài",
      "file cài",
      "chỗ tải",
      "tải ở đâu",
      "link bộ cài",
    ],
    intents: ["install_download"],
    title: "Hướng dẫn tải và cài đặt bộ cài OnlyOffice Mercy All-in-One",
    source: {
      id: "doc_install_guide",
      title: "Sổ tay bộ cài đặt OnlyOffice Mercy Tech",
      section: "Mục 2 — Tải và cài đặt All-in-One",
      document: "Sổ tay kỹ thuật OnlyOffice Mercy Tech v2.0",
      updatedAt: "22/10/2026",
      url: "/downloads",
    },
    answer: `** KẾT LUẬN**: Anh / chị có thể tải trực tiếp bộ cài đặt chính hãng OnlyOffice tối ưu hóa bởi Mercy Tech qua các đường dẫn an toàn dưới đây.Bộ cài All -in -One siêu nhẹ(~7.1 MB), tự động thiết lập và nạp sẵn trọn bộ tiện ích tiếng Việt trong khoảng 1 phút.

** TÀI NGUYÊN / TẢI VỀ **:
  * Bản dành cho Windows: [Tải Setup - OnlyOffice - Mercy.exe(~7.1MB)](/Setup-OnlyOffice-Mercy.exe)
  * Bản dành cho macOS: [Tải Bộ Cài macOS](/downloads/Setup - OnlyOffice - Mercy - Mac.zip)
  * Bộ Font tiếng Việt chuẩn: [Tải Bộ Font Chuẩn Mercy](/Bo-Font-Chuan-Mercy.zip)
  * Trải nghiệm trực tiếp trên web: [Dùng Thử Soạn Thảo Online](/demo)

  ** HƯỚNG DẪN CÀI ĐẶT 3 BƯỚC(WINDOWS) **:
  1. ** Bước 1 **: Nhấp vào nút ** [Tải Setup - OnlyOffice - Mercy.exe] ** ở trên để tải file về máy.
2. ** Bước 2 **: Nhấp đúp chuột(hoặc chuột phải chọn * Run as administrator *) vào file \`Setup-OnlyOffice-Mercy.exe\`.
3. **Bước 3**: Bộ cài sẽ tự động chạy trong khoảng 1 phút. Quá trình này sẽ tự tích hợp sẵn 3 tiện ích tiếng Việt độc quyền và tạo biểu tượng OnlyOffice ra màn hình Desktop.

**LƯU Ý**: Nếu anh/chị chưa có mã bản quyền, tại màn hình bộ cài hãy **ĐỂ TRỐNG Ô MÃ KÍCH HOẠT** rồi bấm nút *"Cài Đặt Ngay"* để nhận ngay Bản dùng thử Demo 7 ngày đầy đủ tính năng.`,
  suggestedActions: [
    "Dùng thử Demo 7 ngày",
    "Xem 3 tiện ích độc quyền",
    "Bảng giá bản quyền vĩnh viễn",
    "Gặp kỹ thuật viên",
  ],
  },
{
  id: "kb_trial_activation",
    keywords: [
      "dùng thử",
      "demo",
      "key",
      "mã kích hoạt",
      "bản quyền",
      "hết hạn",
      "7 ngày",
      "kích hoạt",
      "thử nghiệm",
      "trial",
      "test",
    ],
      intents: ["trial_activation"],
        title: "Chính sách dùng thử Demo 7 ngày và kích hoạt bản quyền chính thức",
          source: {
    id: "doc_license_policy",
      title: "Quy chuẩn cấp phép và dùng thử",
        section: "Mục 4 — Kích hoạt và Demo 7 ngày",
          document: "Chính sách cấp phép OnlyOffice Mercy Tech",
            updatedAt: "22/10/2026",
    },
  answer: `**KẾT LUẬN**: Mercy Tech hỗ trợ trải nghiệm **Bản dùng thử Demo 7 ngày** hoàn toàn miễn phí trên mọi máy tính Windows, mở trọn vẹn toàn bộ tính năng cao cấp không giới hạn.

**HƯỚNG DẪN DÙNG THỬ DEMO 7 NGÀY**:
1. **Bước 1**: Tải và mở file [Tải Setup-OnlyOffice-Mercy.exe](/Setup-OnlyOffice-Mercy.exe).
2. **Bước 2**: Tại ô nhập mã kích hoạt, anh/chị **ĐỂ TRỐNG Ô MÃ** và bấm nút **Cài Đặt Ngay** (hoặc nút *Dùng Thử 7 Ngày*).
3. **Bước 3**: Hệ thống sẽ tự động kích hoạt Demo 7 ngày và xuất Giấy chứng nhận bản quyền A4 có mộc đỏ ngay trên màn hình Desktop.

**KÍCH HOẠT BẢN QUYỀN CHÍNH HÃNG**:
* Nếu anh/chị đã mua License Key số hoặc Tem cào Hologram vật lý, chỉ cần nhập mã key vào ô kích hoạt (hoặc cào lớp bạc 12 số trên tem) rồi bấm *Kích hoạt*.
* Bản quyền chính thức là **Bản quyền vĩnh viễn theo máy tính**, không giới hạn thời gian sử dụng.

**LƯU Ý**: Mỗi thiết bị máy tính chỉ áp dụng dùng thử 1 lần duy nhất để bảo đảm quyền lợi trải nghiệm công bằng.`,
    suggestedActions: [
      "Tải bộ cài All-in-One",
      "Bảng giá bản quyền",
      "Tra cứu bản quyền máy trạm",
      "Liên hệ Zalo CSKH",
    ],
  },
{
  id: "kb_pricing_and_packages",
    keywords: [
      "giá",
      "báo giá",
      "bảng giá",
      "bao nhiêu tiền",
      "chi phí",
      "mua",
      "đại lý",
      "sỉ",
      "bán lẻ",
      "chiết khấu",
      "hóa đơn",
      "vat",
    ],
      intents: ["pricing"],
        title: "Bảng giá bản quyền OnlyOffice vĩnh viễn và chính sách đại lý",
          source: {
    id: "doc_pricing_policy",
      title: "Biểu giá sản phẩm và chính sách đại lý",
        section: "Mục 3 — Bảng giá bậc thang và chính sách đại lý",
          document: "Chính sách thương mại Mercy Tech Global",
            updatedAt: "22/10/2026",
    },
  answer: `**KẾT LUẬN**: OnlyOffice Mercy cung cấp giải pháp bản quyền vĩnh viễn theo thiết bị với chi phí tối ưu, kèm đầy đủ hợp đồng kinh tế và hóa đơn GTGT (VAT) hợp pháp.

**BẢNG GIÁ BÁN LẺ BẬC THANG CHÍNH THỨC**:
* **Gói Cá Nhân (1 máy)**: \`799.000 đ/máy\` — Bản quyền trọn đời theo máy trạm, tích hợp sẵn 3 tiện ích tiếng Việt độc quyền, bảo hành kỹ thuật 12 tháng.
* **Gói Doanh Nghiệp (từ 5 máy)**: \`699.000 đ/máy\` — Tiết kiệm chi phí, hỗ trợ kỹ thuật cài đặt từ xa qua UltraViewer, xuất hóa đơn VAT theo yêu cầu.
* **Gói Cơ Quan / Doanh Nghiệp (từ 10 máy trở lên)**: \`499.000 đ/máy\` — Chiết khấu sâu nhất cho đơn vị trang bị đồng loạt.

**CHÍNH SÁCH ĐẠI LÝ PHÂN PHỐI (B2B)**:
* Chiết khấu cực cao dành cho các đại lý máy tính, công ty tin học và nhà phân phối phần mềm khi nhập từ **50 key / 50 tem cào vật lý** trở lên.
* Hỗ trợ hồ sơ pháp lý, hợp đồng đại lý mẫu, catalog và chứng nhận đại lý ủy quyền.

**TÀI NGUYÊN / TẢI VỀ**:
* Xem thông tin chi tiết: [Chính Sách Đối Tác](/chinh-sach-doi-tac)
* Tải hợp đồng mẫu: [Hợp Đồng Đại Lý Mẫu PDF](/hop_dong_dai_ly_mau.pdf)
* Tra cứu bản quyền thiết bị: [Tra Cứu Bản Quyền](/my-license)`,
    suggestedActions: [
      "Xem chính sách đối tác",
      "Tải bộ cài dùng thử",
      "Hồ sơ pháp lý",
      "Liên hệ Zalo CSKH",
    ],
  },
{
  id: "kb_legal_documents",
    keywords: [
      "pháp lý",
      "hồ sơ pháp lý",
      "hợp đồng",
      "chứng nhận",
      "chứng chỉ",
      "hóa đơn",
      "bản quyền hãng",
      "ascensio",
      "thanh tra",
      "phạt",
      "bản quyền lậu",
    ],
      intents: ["legal_documents"],
        title: "Hồ sơ pháp lý, hợp đồng đại lý mẫu và bảo đảm quyền sở hữu trí tuệ",
          source: {
    id: "doc_legal_portfolio",
      title: "Hồ sơ pháp lý và sở hữu trí tuệ",
        section: "Mục 1 — Chứng nhận phân phối chính hãng",
          document: "Hồ sơ pháp lý OnlyOffice Mercy Tech",
            updatedAt: "22/10/2026",
    },
  answer: `**KẾT LUẬN**: OnlyOffice được phát triển bởi Ascensio System SIA (Cộng hòa Latvia, EU), được tối ưu hóa và phân phối chính thức tại Việt Nam bởi Công ty TNHH Công Nghệ Mercy (Mercy Tech Global, MST: 0319227767).

**HỒ SƠ BÀN GIAO CHO DOANH NGHIỆP**:
1. **Hợp đồng Mua bán / Hợp đồng Đại lý**: Xác lập giá trị pháp lý song phương có con dấu mộc đỏ.
2. **Biên bản bàn giao và nghiệm thu**: Xác nhận số lượng key / tem cào bản quyền tương ứng.
3. **Hóa đơn GTGT (VAT)**: Hóa đơn điện tử hợp lệ phục vụ kê khai thuế và hạch toán chi phí doanh nghiệp.
4. **Giấy chứng nhận bản quyền A4**: Xuất trực tiếp kèm dấu mộc đỏ và chữ ký số.

**TÀI NGUYÊN / TẢI VỀ**:
* Xem chi tiết hồ sơ: [Hồ Sơ Pháp Lý OnlyOffice](/ho-so-phap-ly-onlyoffice)
* Tải hợp đồng đại lý: [Hợp Đồng Đại Lý Mẫu PDF](/hop_dong_dai_ly_mau.pdf)
* Tải chính sách đối tác: [Tải Chính Sách Đại Lý PDF](/chinh-sach-dai-ly-onlyoffice.pdf)`,
    suggestedActions: [
      "Xem hồ sơ pháp lý",
      "Chính sách đối tác",
      "Bảng giá bản quyền",
      "Liên hệ Zalo CSKH",
    ],
  },
{
  id: "kb_font_error",
    keywords: [
      "lỗi font",
      "font",
      "vntime",
      ".vntime",
      "ô vuông",
      "bảng mã",
      "tcvn3",
      "vni",
      "lệch chữ",
      "chữ nhảy",
      "bị vỡ chữ",
      "font tiếng việt",
    ],
      intents: ["font_error"],
        title: "Cách khắc phục lỗi font chữ .VnTime và chuyển mã sang Unicode",
          source: {
    id: "doc_font_plugin",
      title: "Hướng dẫn tiện ích Chuẩn Hóa Font Mercy",
        section: "Mục 8.1 — Chuyển đổi mã TCVN3/VNI",
          document: "Sổ tay kỹ thuật OnlyOffice Mercy Tech v2.0",
            updatedAt: "22/10/2026",
    },
  answer: `**KẾT LUẬN**: Lỗi font ô vuông xuất hiện khi mở các tài liệu cũ sử dụng bảng mã TCVN3 (font \`.VnTime\`) hoặc VNI-Windows. Anh/chị có thể khắc phục triệt để bằng tiện ích **Chuẩn Hóa Font** độc quyền tích hợp sẵn trong OnlyOffice Mercy.

**HƯỚNG DẪN SỬA LỖI FONT 5 BƯỚC**:
1. **Bước 1**: Mở tài liệu đang bị lỗi font trong OnlyOffice Document Editor.
2. **Bước 2**: Nhấn vào tab **Tiện ích mở rộng** (Plugins) trên thanh công cụ phía trên.
3. **Bước 3**: Nhấp vào biểu tượng **Chuẩn Hóa Font** (Mercy Font Converter).
4. **Bước 4**: Bôi đen đoạn văn bản cần sửa. Chọn bảng mã nguồn tương ứng (chọn \`TCVN3 (ABC)\` nếu dùng font .VnTime, hoặc chọn \`VNI-Windows\`). Mã đích chọn **Unicode (Times New Roman)**.
5. **Bước 5**: Bấm nút **Chuyển mã**. Văn bản sẽ lập tức hiển thị rõ ràng, chuẩn tiếng Việt theo Nghị định 30/2020/NĐ-CP.

**TÀI NGUYÊN / TẢI VỀ**:
* Tải bộ font đầy đủ: [Tải Trọn Bộ Font Chuẩn Mercy](/Bo-Font-Chuan-Mercy.zip)
* Bộ cài All-in-One: [Tải Setup-OnlyOffice-Mercy.exe](/Setup-OnlyOffice-Mercy.exe)`,
    suggestedActions: [
      "Tải bộ font chuẩn",
      "Lỗi gõ tiếng Việt Unikey",
      "Tiện ích Đọc Số Thành Chữ",
      "Cần UltraViewer hỗ trợ",
    ],
  },
{
  id: "kb_vietnamese_typing",
    keywords: [
      "unikey",
      "gõ tiếng việt",
      "không gõ được",
      "mất dấu",
      "nhảy chữ",
      "telex",
      "bảng mã",
      "evkey",
      "bộ gõ",
      "không có dấu",
    ],
      intents: ["vietnamese_typing"],
        title: "Xử lý lỗi gõ tiếng Việt bị mất dấu hoặc nhảy chữ trong OnlyOffice",
          source: {
    id: "doc_typing_guide",
      title: "Tương thích bộ gõ tiếng Việt",
        section: "Mục 5 — Cấu hình Unikey / EVKey",
          document: "Sổ tay kỹ thuật OnlyOffice Mercy Tech v2.0",
            updatedAt: "22/10/2026",
    },
  answer: `**KẾT LUẬN**: Lỗi không gõ được tiếng Việt hoặc bị mất dấu thường xảy ra do phần mềm Unikey hoặc EVKey chưa được cấp quyền quản trị Administrator khi Windows khởi động.

**HƯỚNG DẪN KHẮC PHỤC TRONG 30 GIÂY**:
1. **Bước 1**: Nhìn xuống góc phải thanh Taskbar (gần đồng hồ), nhấp chuột phải vào biểu tượng **Unikey** (chữ V hoặc E) và chọn **Kết thúc** (Thoát hoàn toàn).
2. **Bước 2**: Tìm biểu tượng Unikey trên màn hình Desktop hoặc menu Start, nhấp chuột phải và chọn **Run as administrator** (Chạy với quyền quản trị).
3. **Bước 3**: Kiểm tra lại cửa sổ Unikey:
   * **Bảng mã**: Chọn **Unicode dựng sẵn** (dùng cho Times New Roman, Arial, Calibri...).
   * **Kiểu gõ**: Chọn **Telex** (hoặc VNI tùy thói quen gõ).
4. **Bước 4**: Mở lại OnlyOffice và gõ thử. Văn bản sẽ gõ mượt mà và nhận đủ dấu tiếng Việt.`,
    suggestedActions: [
      "Khắc phục lỗi font .VnTime",
      "Tải bộ cài OnlyOffice",
      "Gặp kỹ thuật viên",
    ],
  },
{
  id: "kb_number_to_text",
    keywords: [
      "đọc số",
      "đọc số thành chữ",
      "tiền thành chữ",
      "kế toán",
      "chuyển số sang chữ",
      "excel",
      "vnd",
      "đồng",
      "số tiền bằng chữ",
    ],
      intents: ["number_to_text"],
        title: "Tiện ích Đọc Số Thành Chữ tiếng Việt chuẩn kế toán trong Word và Excel",
          source: {
    id: "doc_number_plugin",
      title: "Tiện ích Đọc Số Thành Chữ Mercy",
        section: "Mục 8.2 — Chuẩn hóa số tiền hợp đồng và hóa đơn",
          document: "Sổ tay kỹ thuật OnlyOffice Mercy Tech v2.0",
            updatedAt: "22/10/2026",
    },
  answer: `**KẾT LUẬN**: OnlyOffice Mercy Tech tích hợp sẵn tiện ích **Đọc Số Thành Chữ** độc quyền, giúp kế toán, thủ quỹ và văn thư chuyển đổi số tiền thành chữ tiếng Việt chỉ với 1 cú nhấp chuột.

**HƯỚNG DẪN SỬ DỤNG TRÊN WORD VÀ EXCEL**:
1. **Bước 1**: Quét chọn (bôi đen) con số cần chuyển (Ví dụ: \`18.500.000\`).
2. **Bước 2**: Nhấp vào tab **Tiện ích mở rộng** (Plugins) trên thanh công cụ.
3. **Bước 3**: Bấm vào nút **Đọc Số Thành Chữ**.
4. **Bước 4**: Tiện ích sẽ tự động sinh chữ: *“Mười tám triệu năm trăm nghìn đồng chẵn”* với chữ cái đầu viết hoa đúng chuẩn thể thức văn bản hành chính Việt Nam.

**TÀI NGUYÊN / TẢI VỀ**:
* Tải bộ cài đã tích hợp sẵn tiện ích: [Tải Setup-OnlyOffice-Mercy.exe](/Setup-OnlyOffice-Mercy.exe)`,
    suggestedActions: [
      "Xem tiện ích Sửa Toán",
      "Xem tiện ích Chuẩn Hóa Font",
      "Tải bộ cài đặt",
    ],
  },
{
  id: "kb_math_equation",
    keywords: [
      "toán",
      "công thức",
      "mathtype",
      "latex",
      "sửa toán",
      "equation",
      "lệch công thức",
      "vỡ nét",
      "công thức toán",
      "đề thi",
    ],
      intents: ["math_equation"],
        title: "Tiện ích Sửa Toán và chuyển đổi MathType / LaTeX sang Equation",
          source: {
    id: "doc_math_plugin",
      title: "Tiện ích Sửa Toán Mercy",
        section: "Mục 8.3 — Chuyển đổi công thức khoa học",
          document: "Sổ tay kỹ thuật OnlyOffice Mercy Tech v2.0",
            updatedAt: "22/10/2026",
    },
  answer: `**KẾT LUẬN**: Khi mở các đề thi hoặc tài liệu khoa học chứa công thức MathType cũ bị vỡ nét hoặc không chỉnh sửa được, OnlyOffice Mercy cung cấp tiện ích **Sửa Toán** giúp chuyển đổi thành công thức Equation vector chuẩn quốc tế.

**HƯỚNG DẪN THỰC HIỆN**:
1. Mở tài liệu chứa công thức trong OnlyOffice Document.
2. Chuyển sang tab **Tiện ích mở rộng** $\\rightarrow$ Nhấp chọn **Sửa Toán** (Mercy Math Converter).
3. Tiện ích tự động nhận dạng mã nguồn LaTeX hoặc MathType và chuyển thành đối tượng Equation bản địa, cho phép chỉnh sửa trực tiếp mà không bị vỡ ảnh.`,
    suggestedActions: [
      "Xem 3 tiện ích độc quyền",
      "Tải bộ cài đặt",
      "Hỏi câu khác",
    ],
  },
{
  id: "kb_missing_dll",
    keywords: [
      "vcruntime140",
      "dll",
      "thiếu file",
      "vcruntime",
      "msvcp140",
      "lỗi cài đặt",
      "báo lỗi",
      "màn hình đen",
      "không mở được",
    ],
      intents: ["missing_dll"],
        title: "Khắc phục lỗi thông báo thiếu file VCRUNTIME140_1.dll khi cài đặt",
          source: {
    id: "doc_dll_troubleshoot",
      title: "Khắc phục sự cố thư viện hệ thống Windows",
        section: "Mục 6.2 — Bổ sung Visual C++ Runtime",
          document: "Sổ tay kỹ thuật OnlyOffice Mercy Tech v2.0",
            updatedAt: "22/10/2026",
    },
  answer: `**KẾT LUẬN**: Lỗi thông báo thiếu \`vcruntime140_1.dll\` xuất hiện trên các máy tính Windows 7 hoặc Windows 10 bản cũ chưa được cập nhật gói thư viện Visual C++ của Microsoft.

**CÁCH XỬ LÝ NHANH NHẤT**:
1. **Bước 1**: Tải lại bộ cài đặt mới nhất: [Tải Setup-OnlyOffice-Mercy.exe](/Setup-OnlyOffice-Mercy.exe).
2. **Bước 2**: Nhấp chuột phải vào file cài và chọn **Run as administrator**. Phiên bản mới của Mercy Tech đã tích hợp sẵn cơ chế tự động bù đắp thư viện DLL thiếu hụt vào thư mục cài đặt.
3. Nếu vẫn gặp trở ngại, anh/chị gửi mã UltraViewer vào khung chat này để chuyên viên kỹ thuật vào máy hỗ trợ cài đặt gói bổ trợ chính hãng chỉ trong 1 phút.`,
    suggestedActions: [
      "Chuyển kỹ thuật viên UltraViewer",
      "Tải lại bộ cài mới",
      "Liên hệ Zalo CSKH",
    ],
  },
{
  id: "kb_certificate_a4",
    keywords: [
      "chứng nhận",
      "giấy chứng nhận",
      "in a4",
      "mộc đỏ",
      "xác nhận bản quyền",
      "tem",
      "desktop",
      "file chứng nhận",
    ],
      intents: ["certificate_a4"],
        title: "Vị trí và cách in Giấy Chứng Nhận Bản Quyền OnlyOffice A4 có mộc đỏ",
          source: {
    id: "doc_certificate_guide",
      title: "Hồ sơ bàn giao và Giấy chứng nhận bản quyền",
        section: "Mục 7 — Chứng nhận A4 Desktop",
          document: "Chính sách cấp phép OnlyOffice Mercy Tech",
            updatedAt: "22/10/2026",
    },
  answer: `**KẾT LUẬN**: Ngay sau khi hoàn tất cài đặt (cả bản Dùng thử 7 ngày và bản Bản quyền trọn đời), hệ thống tự động xuất một tệp **Giấy Chứng Nhận Bản Quyền** khổ in A4 có con dấu mộc đỏ và chữ ký số.

**VỊ TRÍ FILE TRÊN MÁY TÍNH**:
* Tệp được tạo tự động ngay tại **màn hình chính (Desktop)** với tên dạng: \`Chung-Nhan-OnlyOffice-[Tên-Máy-Tính].html\`.

**CÁCH IN HOẶC XUẤT RA FILE PDF**:
1. Nhấp đúp mở file \`Chung-Nhan-OnlyOffice-...\` bằng trình duyệt web (Chrome, Edge, Cốc Cốc).
2. Nhấn tổ hợp phím **Ctrl + P** trên bàn phím.
3. Chọn máy in để in ra giấy A4, hoặc chọn *"Save as PDF"* để lưu file PDF gửi phòng kế toán / thanh tra bản quyền.`,
    suggestedActions: [
      "Tra cứu bản quyền thiết bị",
      "Hồ sơ pháp lý",
      "Tải bộ cài đặt",
    ],
  },
{
  id: "kb_human_handoff",
    keywords: [
      "gặp người thật",
      "kỹ thuật",
      "ultraview",
      "ultraviewer",
      "anydesk",
      "hỗ trợ từ xa",
      "cskh",
      "số điện thoại",
      "zalo",
      "tư vấn viên",
      "chuyên viên",
      "kiên it",
    ],
      intents: ["human_handoff"],
        title: "Kết nối kỹ thuật viên hỗ trợ máy tính từ xa qua UltraViewer",
          source: {
    id: "doc_support_channels",
      title: "Kênh hỗ trợ kỹ thuật viên trực tiếp",
        section: "Mục 1 — CSKH & Kỹ thuật UltraViewer",
          document: "Quy chuẩn CSKH Mercy Tech Global",
            updatedAt: "22/10/2026",
    },
  answer: `**KẾT LUẬN**: Đội ngũ chuyên viên kỹ thuật của Mercy Tech luôn sẵn sàng kết nối hỗ trợ trực tiếp trên màn hình máy tính của anh/chị qua phần mềm UltraViewer hoặc AnyDesk.

**CÁCH KẾT NỐI NHANH TRONG 1 PHÚT**:
1. **Bước 1**: Mở phần mềm **UltraViewer** trên máy tính (nếu chưa có, tải tại \`ultraviewer.net\`).
2. **Bước 2**: Nhắn trực tiếp **ID và Mật khẩu** UltraViewer vào khung chat này (Ví dụ: *ID 12 345 678 pass 1234*).
3. Hệ thống sẽ phát thông báo khẩn tới Telegram của Kỹ thuật viên Kiên IT để tiếp nhận và vào máy hỗ trợ anh/chị ngay trong vòng 5 - 15 phút.

**KÊNH LIÊN HỆ CHÍNH THỨC**:
* **Hotline / Zalo CSKH**: \`0763 068 614\` (Mercy Tech Global) — \`0938 160 862\` (Bích Phương Mercy).
* **Kỹ thuật viên trực tiếp**: \`0862 497 002\` (Kiên IT).
*(Lưu ý: Để bảo mật thông tin, Mercy Tech không gửi đường link rút gọn lạ; anh/chị chỉ cần tìm trực tiếp số điện thoại CSKH trên ứng dụng Zalo).*`,
    suggestedActions: [
      "Gửi UltraViewer ngay",
      "Tải bộ cài đặt",
      "Xem bảng giá bản quyền",
    ],
  },
  {
    id: "kb_change_language",
    keywords: [
      "tiếng việt",
      "đổi tiếng việt",
      "giao diện tiếng việt",
      "ngôn ngữ",
      "chuyển tiếng việt",
      "tiếng anh sang tiếng việt",
      "language",
      "vietnamese interface",
    ],
    intents: ["how_to_use"],
    title: "Hướng dẫn đổi giao diện OnlyOffice sang Tiếng Việt",
    source: {
      id: "doc_interface_settings",
      title: "Thiết lập giao diện người dùng",
      section: "Mục 3.1 — Đổi ngôn ngữ hiển thị",
      document: "Sổ tay kỹ thuật OnlyOffice Mercy Tech v2.0",
      updatedAt: "22/10/2026",
    },
    answer: `**KẾT LUẬN**: OnlyOffice hỗ trợ đầy đủ 100% giao diện Tiếng Việt chuẩn hóa. Anh/chị có thể chuyển đổi ngôn ngữ chỉ trong 15 giây theo 3 bước:

**3 BƯỚC ĐỔI SANG TIẾNG VIỆT**:
1. **Bước 1**: Mở OnlyOffice, nhấp vào menu **File** (Tệp) ở góc trên bên trái màn hình.
2. **Bước 2**: Nhấp vào mục **Advanced Settings** (Cài đặt nâng cao).
3. **Bước 3**: Tại dòng **Interface Language** (Ngôn ngữ giao diện), chọn **Tiếng Việt** (Vietnamese) trong danh sách thả xuống, rồi bấm nút **Apply** (Áp dụng). Giao diện sẽ lập tức chuyển sang toàn bộ tiếng Việt thân thiện.`,
    suggestedActions: [
      "Tắt gạch chân đỏ chính tả",
      "Khắc phục lỗi font .VnTime",
      "Tiện ích Đọc Số Thành Chữ",
    ],
  },
  {
    id: "kb_spellcheck_redline",
    keywords: [
      "gạch đỏ",
      "gạch chân đỏ",
      "lượn sóng đỏ",
      "bỏ gạch đỏ",
      "tắt gạch đỏ",
      "kiểm tra chính tả",
      "spell check",
      "bị gạch chân",
      "sửa gạch đỏ",
    ],
    intents: ["how_to_use"],
    title: "Cách tắt dấu gạch chân đỏ kiểm tra chính tả trong văn bản OnlyOffice",
    source: {
      id: "doc_spellcheck_guide",
      title: "Tùy biến kiểm tra chính tả",
      section: "Mục 4.2 — Tắt gạch đỏ Tiếng Việt",
      document: "Sổ tay kỹ thuật OnlyOffice Mercy Tech v2.0",
      updatedAt: "22/10/2026",
    },
    answer: `**KẾT LUẬN**: Các đường gạch lượn sóng màu đỏ xuất hiện dưới từng từ là do tính năng kiểm tra chính tả tiếng Anh mặc định đang quét văn bản tiếng Việt. Dấu này **không bao giờ bị in ra giấy**, nhưng anh/chị có thể tắt đi để nhìn thoáng mắt.

**CÁCH TẮT GẠCH ĐỎ NHANH**:
1. **Cách 1 (Nhanh nhất)**: Nhìn xuống thanh trạng thái góc dưới bên phải màn hình soạn thảo, bấm vào biểu tượng quyển sách có dấu kiểm tra chính tả (Spellcheck) để tắt đi.
2. **Cách 2 (Vĩnh viễn)**: Vào menu **File** (Tệp) $\\rightarrow$ Chọn **Advanced Settings** (Cài đặt nâng cao) $\\rightarrow$ Cuộn xuống mục **Proofing** (Chính tả) $\\rightarrow$ Bỏ dấu tick ở ô **Spell checking** (Kiểm tra chính tả) $\\rightarrow$ Nhấn **Apply** (Áp dụng). Toàn bộ gạch đỏ sẽ biến mất ngay lập tức.`,
    suggestedActions: [
      "Đổi giao diện sang Tiếng Việt",
      "Chuẩn hóa font tiếng Việt",
      "Xem bảng giá bản quyền",
    ],
  },
  {
    id: "kb_spreadsheet_formula",
    keywords: [
      "công thức",
      "lỗi công thức",
      "dấu phẩy",
      "chấm phẩy",
      "#name",
      "#value",
      "excel",
      "bảng tính",
      "sai định dạng",
      "cộng trừ",
      "hàm tính",
      "dấu ngăn cách",
    ],
    intents: ["technical_error"],
    title: "Xử lý lỗi công thức bảng tính (#NAME?, #VALUE?) và phân biệt dấu phẩy/chấm phẩy",
    source: {
      id: "doc_spreadsheet_guide",
      title: "Cấu hình hàm và công thức bảng tính",
      section: "Mục 7.1 — Dấu phân cách đối số",
      document: "Sổ tay kỹ thuật OnlyOffice Mercy Tech v2.0",
      updatedAt: "22/10/2026",
    },
    answer: `**KẾT LUẬN**: Lỗi công thức \`#NAME?\` hoặc \`#VALUE!\` trong OnlyOffice Spreadsheet thường do khác biệt giữa quy ước dấu phân cách đối số (dấu phẩy \`,\` hoặc chấm phẩy \`;\`) trên Windows của anh/chị.

**HƯỚNG DẪN KHẮC PHỤC**:
1. **Kiểm tra dấu ngăn cách**: Nếu gõ hàm \`=IF(A1>0, 1, 0)\` báo lỗi, hãy thử đổi dấu phẩy thành dấu chấm phẩy \`=IF(A1>0; 1; 0)\` (quy ước chuẩn của Windows khi đặt vùng định dạng ngày tháng kiểu Việt Nam).
2. **Định dạng ô dữ liệu**: Nếu tính tổng \`SUM\` ra kết quả bằng 0, nhấp chuột phải vào cột dữ liệu $\\rightarrow$ Chọn **Format Cells** $\\rightarrow$ Chọn định dạng **Number** (Số) để chuyển các số đang bị hiểu nhầm là dạng chữ (Text) về dạng số.
3. Tận dụng tiện ích **Đọc Số Thành Chữ** độc quyền trên tab Tiện ích mở rộng (Plugins) để chuyển đổi số tiền thành chữ trong nháy mắt.`,
    suggestedActions: [
      "Tiện ích Đọc Số Thành Chữ",
      "Cần UltraViewer kiểm tra hộ",
      "Tải bộ cài đặt",
    ],
  },
  {
    id: "kb_license_transfer",
    keywords: [
      "đổi máy",
      "chuyển máy",
      "cài lại win",
      "nâng cấp máy",
      "mất key",
      "hỏng máy",
      "mct5",
      "chuyển bản quyền",
      "bảo hành",
    ],
    intents: ["license_or_package_query"],
    title: "Chính sách chuyển bản quyền khi đổi máy tính hoặc cài lại Windows (MCT5)",
    source: {
      id: "doc_transfer_policy",
      title: "Quy chuẩn chuyển đổi và bảo lưu bản quyền",
      section: "Mục 5 — Quy trình đổi máy MCT5",
      document: "Chính sách cấp phép OnlyOffice Mercy Tech",
      updatedAt: "22/10/2026",
    },
    answer: `**KẾT LUẬN**: Bản quyền OnlyOffice Mercy Tech được bảo lưu vĩnh viễn theo máy tính. Khi anh/chị **cài lại Windows** hoặc **nâng cấp linh kiện/đổi máy mới**, Mercy Tech hỗ trợ chuyển đổi hoặc cấp lại key hoàn toàn miễn phí.

**QUY TRÌNH HỖ TRỢ ĐỔI MÁY / CÀI LẠI WIN**:
1. **Nếu cùng máy cài lại Win**: Chỉ cần tải lại bộ cài [Setup-OnlyOffice-Mercy.exe](/Setup-OnlyOffice-Mercy.exe) và nhập lại mã key cũ (hoặc chụp ảnh tem cào Hologram). Hệ thống sẽ tự động kích hoạt lại ngay lập tức.
2. **Nếu đổi sang máy mới**: Nhắn mã key cũ hoặc số điện thoại đã mua hàng cho chuyên viên Zalo CSKH \`0763 068 614\` (Mercy Tech Global) để thu hồi mã trên máy cũ và cấp mã mới cho thiết bị mới chỉ trong 5 phút.`,
    suggestedActions: [
      "Liên hệ Zalo CSKH",
      "Tải lại bộ cài đặt",
      "Xem bảng giá bản quyền",
    ],
  },
];
