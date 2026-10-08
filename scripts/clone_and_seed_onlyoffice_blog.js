const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/onlyoffice_mercy';

// Helper to fetch JSON from Next.js page on onlyoffice.com/blog
async function fetchOnlyOfficeArticle(uri) {
  try {
    const url = `https://www.onlyoffice.com/blog${uri}`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const html = await res.text();
    const match = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
    if (!match) return null;
    const data = JSON.parse(match[1]);
    return data.props?.pageProps?.post || null;
  } catch (err) {
    console.warn(`Could not fetch details for ${uri}:`, err.message);
    return null;
  }
}

// Vietnamese translation mapping for common OnlyOffice blog titles & excerpts
const VI_TRANSLATIONS = {
  "accessibility-conformance": {
    title: "Khả năng tiếp cận và soạn thảo tài liệu: Đạo luật Tiếp cận Châu Âu có ý nghĩa gì đối với phần mềm và cách ONLYOFFICE triển khai",
    category: "for-business",
    categoryName: "Dành cho doanh nghiệp",
    excerpt: "Các yêu cầu về khả năng tiếp cận đối với sản phẩm số ngày càng quan trọng tại Châu Âu. Đối với các tổ chức chọn lựa phần mềm văn phòng, khả năng tiếp cận không còn là tính năng bổ sung mà là một tiêu chuẩn pháp lý bắt buộc...",
  },
  "how-to-export-notion-pages-to-word-docx-and-keep-collaborating-afterward": {
    title: "Cách xuất trang Notion sang Microsoft Word (DOCX) và tiếp tục cộng tác trên ONLYOFFICE",
    category: "for-business",
    categoryName: "Dành cho doanh nghiệp",
    excerpt: "Hướng dẫn chi tiết cách chuyển đổi các trang ghi chú, bảng dữ liệu từ Notion sang định dạng Word chuẩn mà không bị vỡ bố cục hay mất liên kết.",
  },
  "get-started-with-document-editing-in-your-web-app-using-onlyoffice-create-app": {
    title: "Bắt đầu nhúng trình soạn thảo tài liệu vào ứng dụng web với ONLYOFFICE Create App",
    category: "for-developers",
    categoryName: "Dành cho nhà phát triển",
    excerpt: "Hướng dẫn từng bước cách tích hợp trình soạn thảo văn bản, bảng tính và trình chiếu trực tuyến vào ứng dụng React, Vue, Angular hoặc Node.js chỉ với 1 dòng lệnh.",
  },
  "how-to-make-a-resume-without-microsoft-word": {
    title: "Cách tạo CV xin việc chuyên nghiệp mà không cần Microsoft Word",
    category: "for-business",
    categoryName: "Dành cho doanh nghiệp",
    excerpt: "Khám phá các mẫu CV chuẩn quốc tế miễn phí và mẹo định dạng chuyên nghiệp với trình soạn thảo tài liệu ONLYOFFICE Docs.",
  },
  "cloud-based-productivity-apps": {
    title: "Top 20 ứng dụng làm việc đám mây tốt nhất cho đội ngũ doanh nghiệp 2026",
    category: "for-business",
    categoryName: "Dành cho doanh nghiệp",
    excerpt: "Tổng hợp và đánh giá chi tiết các giải pháp văn phòng trực tuyến, quản lý dự án, lưu trữ dữ liệu an toàn và công cụ cộng tác nhóm đáng đầu tư nhất hiện nay.",
  },
  "hanging-indent-explained": {
    title: "Giải thích về thụt lề treo (Hanging Indent) và cách tạo nhanh trong văn bản",
    category: "product-releases",
    categoryName: "Phát hành sản phẩm",
    excerpt: "Tìm hiểu cách thiết lập thụt dòng treo cho danh mục tài liệu tham khảo theo chuẩn APA, MLA, Chicago trên ONLYOFFICE Document Editor.",
  },
  "fleurdelix-os-chooses-onlyoffice": {
    title: "Hệ điều hành Fleurdelix OS lựa chọn ONLYOFFICE làm bộ ứng dụng văn phòng mặc định",
    category: "for-developers",
    categoryName: "Dành cho nhà phát triển",
    excerpt: "Thêm một bản phân phối Linux hiện đại tin tưởng tích hợp sẵn ONLYOFFICE Desktop Editors để mang lại trải nghiệm tương thích Microsoft Office hoàn hảo.",
  },
  "collaboration-software": {
    title: "Phần mềm cộng tác làm việc nhóm: Hướng dẫn tổng quan và tiêu chí lựa chọn",
    category: "for-business",
    categoryName: "Dành cho doanh nghiệp",
    excerpt: "Cách các công cụ cộng tác thời gian thực giúp nâng cao 40% năng suất làm việc nhóm và bảo vệ quyền riêng tư dữ liệu nội bộ.",
  },
  "onlyoffice-desktop-editors-and-liya-linux": {
    title: "ONLYOFFICE Desktop Editors trở thành bộ công cụ văn phòng mặc định trên Liya Linux",
    category: "for-developers",
    categoryName: "Dành cho nhà phát triển",
    excerpt: "Đội ngũ phát triển Liya Linux công bố hợp tác chính thức cùng ONLYOFFICE nhằm cung cấp môi trường làm việc bảo mật và tốc độ cao cho người dùng máy tính.",
  },
  "best-free-online-writing-tools": {
    title: "9 công cụ soạn thảo văn bản trực tuyến miễn phí tốt nhất năm 2026",
    category: "for-business",
    categoryName: "Dành cho doanh nghiệp",
    excerpt: "So sánh các nền tảng viết trực tuyến bảo mật, hỗ trợ AI và cộng tác nhiều người cùng lúc mà không lo mất dữ liệu.",
  },
  "how-to-write-a-letter": {
    title: "Cách soạn thảo và gửi thư tín chuyên nghiệp trên máy tính (Kèm mẫu chuẩn)",
    category: "product-releases",
    categoryName: "Phát hành sản phẩm",
    excerpt: "Bộ sưu tập các mẫu thư công vụ, thư mời hợp tác và thư cảm ơn được định dạng sẵn trong ONLYOFFICE Docs.",
  },
  "onlyoffice-10-is-coming": {
    title: "ONLYOFFICE 10.0 sắp ra mắt mùa thu này: Những đột phá đáng mong chờ nhất",
    category: "product-releases",
    categoryName: "Phát hành sản phẩm",
    excerpt: "Bản cập nhật thế hệ mới mang đến kiến trúc AI tác tử (Autonomous AI Agents), cải tiến phòng làm việc DocSpace và mã hóa Zero-Knowledge.",
  },
  "abouba-s-story-at-onlyoffice": {
    title: "Bắt đầu sự nghiệp trước khi tốt nghiệp: Câu chuyện của Abouba tại ONLYOFFICE",
    category: "back-to-school",
    categoryName: "Mùa tựu trường",
    excerpt: "Khám phá cách một sinh viên công nghệ thông tin trẻ tuổi đã gia nhập đội ngũ ONLYOFFICE từ khi còn ngồi trên ghế giảng đường đại học và phát triển kỹ năng lập trình thực tế.",
  },
  "onlyoffice-desktop-editors-and-winux": {
    title: "ONLYOFFICE Desktop Editors được chọn làm bộ phần mềm văn phòng trên Winux",
    category: "for-developers",
    categoryName: "Dành cho nhà phát triển",
    excerpt: "Hợp tác giữa hệ điều hành Winux và ONLYOFFICE mang lại bộ công cụ làm việc mượt mà, hỗ trợ tốt nhất cho các định dạng văn phòng chuẩn quốc tế.",
  },
  "export-airtable-to-excel": {
    title: "Cách xuất dữ liệu Airtable sang Excel (XLSX) và tiếp tục chỉnh sửa bảng tính",
    category: "for-business",
    categoryName: "Dành cho doanh nghiệp",
    excerpt: "Hướng dẫn bảo toàn công thức, trường dữ liệu và liên kết quan hệ khi chuyển bảng tính từ Airtable sang ONLYOFFICE Spreadsheet.",
  },
  "from-university-to-full-time-developer": {
    title: "Từ giảng đường đến lập trình viên chính thức: Aleksandr chia sẻ hành trình tại ONLYOFFICE",
    category: "back-to-school",
    categoryName: "Mùa tựu trường",
    excerpt: "Hành trình từ thực tập sinh đến kỹ sư phần mềm chuyên nghiệp: Aleksandr kể lại trải nghiệm xây dựng các tính năng cốt lõi cho bộ soạn thảo văn bản.",
  },
  "antidote-plugin-for-onlyoffice": {
    title: "Plugin Antidote mới cho ONLYOFFICE: Kiểm tra và nâng cao chất lượng văn bản tiếng Anh và Pháp",
    category: "back-to-school",
    categoryName: "Mùa tựu trường",
    excerpt: "Tích hợp công cụ chỉnh sửa ngữ pháp và phong cách văn bản hàng đầu thế giới Antidote trực tiếp vào giao diện soạn thảo tài liệu ONLYOFFICE.",
  },
  "16-questions-answered-faq": {
    title: "Kỷ niệm 16 năm ONLYOFFICE: Giải đáp 16 câu hỏi thường gặp nhất (FAQ)",
    category: "onlyoffice-16th-anniversary",
    categoryName: "Kỷ niệm 16 năm ONLYOFFICE",
    excerpt: "Nhân dịp sinh nhật 16 tuổi, đội ngũ phát triển ONLYOFFICE trả lời trực tiếp những thắc mắc thú vị nhất từ cộng đồng người dùng và quản trị viên hệ thống trên toàn cầu.",
  },
  "plans-for-the-next-16-years": {
    title: "Định hướng phát triển của ONLYOFFICE trong 16 năm tiếp theo",
    category: "onlyoffice-16th-anniversary",
    categoryName: "Kỷ niệm 16 năm ONLYOFFICE",
    excerpt: "Lộ trình tương lai: Tích hợp AI tác tử (AI Agents), tăng cường bảo mật Zero-Knowledge, mở rộng DocSpace và tự động hóa quy trình tài liệu doanh nghiệp.",
  },
  "the-customers-we-didn-t-expect": {
    title: "Những khách hàng đặc biệt vượt ngoài mong đợi của ONLYOFFICE",
    category: "onlyoffice-16th-anniversary",
    categoryName: "Kỷ niệm 16 năm ONLYOFFICE",
    excerpt: "Từ trạm nghiên cứu tại Nam Cực đến các tổ chức bảo tồn đại dương và bệnh viện dã chiến: Những câu chuyện triển khai ONLYOFFICE kỳ lạ và truyền cảm hứng nhất.",
  },
  "onlyoffice-connector-confluence-cloud-released": {
    title: "Phát hành ONLYOFFICE connector v2.1.0 cho Confluence Cloud: Hỗ trợ định dạng mới và trang không gian riêng",
    category: "product-releases",
    categoryName: "Phát hành sản phẩm",
    excerpt: "Bản cập nhật v2.1.0 mang đến khả năng mở và chỉnh sửa trực tiếp thêm nhiều định dạng tài liệu, giao diện duyệt file tiện lợi và tối ưu hiệu suất làm việc nhóm.",
  },
  "what-s-new-in-the-onlyoffice-connectors-for-odoo": {
    title: "Có gì mới trong bộ kết nối ONLYOFFICE cho Odoo: Mở PDF từ chế độ xem trước, tạo biểu mẫu từ mẫu có sẵn",
    category: "product-releases",
    categoryName: "Phát hành sản phẩm",
    excerpt: "Nâng tầm quản trị doanh nghiệp trên ERP Odoo với trình biên tập tài liệu và PDF chuyên sâu từ ONLYOFFICE, hỗ trợ ký số và tự động điền form.",
  },
  "onlyoffice-cloud-systems-asia": {
    title: "Cộng tác không biên giới: ONLYOFFICE hợp tác chiến lược cùng Cloud Systems Asia",
    category: "for-business",
    categoryName: "Dành cho doanh nghiệp",
    excerpt: "Mở rộng hệ sinh thái văn phòng số bảo mật tại khu vực Châu Á - Thái Bình Dương thông qua mạng lưới máy chủ đám mây tốc độ cao của Cloud Systems Asia.",
  },
  "migrate-from-microsoft-365": {
    title: "Cách chuyển đổi từ Microsoft 365 sang ONLYOFFICE mượt mà không làm gián đoạn vận hành",
    category: "for-business",
    categoryName: "Dành cho doanh nghiệp",
    excerpt: "Chiến lược chuyển dịch thông minh giúp doanh nghiệp cắt giảm tới 90% chi phí bản quyền định kỳ, bảo vệ an toàn dữ liệu nội bộ và giữ nguyên 100% thói quen sử dụng của nhân viên.",
  },
  "trial-guide": {
    title: "Hướng dẫn kích hoạt bản quyền dùng thử 7 ngày ONLYOFFICE Enterprise cùng Mercy Tech",
    category: "product-releases",
    categoryName: "Phát hành sản phẩm",
    excerpt: "Cách sử dụng công cụ kích hoạt tự động (.BAT) để trải nghiệm đầy đủ tính năng văn phòng trực tuyến bảo mật, hỗ trợ AI và kết nối không giới hạn.",
  },
};

function determineCategory(slug, title, catFromProps) {
  if (catFromProps) return catFromProps;
  if (VI_TRANSLATIONS[slug]?.category) return VI_TRANSLATIONS[slug].category;

  const text = (slug + ' ' + title).toLowerCase();
  if (text.includes('school') || text.includes('university') || text.includes('student') || text.includes('education')) {
    return 'back-to-school';
  }
  if (text.includes('anniversary') || text.includes('16') || text.includes('celebrat')) {
    return 'onlyoffice-16th-anniversary';
  }
  if (text.includes('release') || text.includes('update') || text.includes('version') || text.includes('connector') || text.includes('plugin') || text.includes('guide')) {
    return 'product-releases';
  }
  if (text.includes('developer') || text.includes('api') || text.includes('sdk') || text.includes('linux') || text.includes('app') || text.includes('code')) {
    return 'for-developers';
  }
  return 'for-business';
}

function getCategoryName(category, isVi) {
  const map = {
    'back-to-school': { vi: 'Mùa tựu trường', en: 'Back to school' },
    'onlyoffice-16th-anniversary': { vi: 'Kỷ niệm 16 năm ONLYOFFICE', en: 'ONLYOFFICE 16th Anniversary' },
    'product-releases': { vi: 'Phát hành sản phẩm', en: 'Product releases' },
    'for-developers': { vi: 'Dành cho nhà phát triển', en: 'For developers' },
    'for-business': { vi: 'Dành cho doanh nghiệp', en: 'For business' },
  };
  return isVi ? map[category]?.vi || category : map[category]?.en || category;
}

function formatDate(isoString) {
  if (!isoString) return '06/10/2026';
  try {
    const d = new Date(isoString);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return '06/10/2026';
  }
}

async function run() {
  console.log('================================================================');
  console.log('🚀 Bắt đầu xóa sạch MongoDB và clone blog từ onlyoffice.com/blog');
  console.log('================================================================');

  await mongoose.connect(MONGODB_URI);
  console.log('✅ Đã kết nối thành công tới MongoDB:', MONGODB_URI);

  const db = mongoose.connection.db;
  const collection = db.collection('blog_posts');

  // STEP 1: XÓA HẾT BÀI VIẾT CŨ
  console.log('🗑️ Đang xóa sạch toàn bộ blog_posts cũ trong database...');
  const deleteResult = await collection.deleteMany({});
  console.log(`✅ Đã xóa thành công ${deleteResult.deletedCount} bài viết cũ khỏi collection blog_posts!`);

  // STEP 2: LOAD PROPS TỪ ONLYOFFICE.COM/BLOG
  console.log('📥 Đang đọc dữ liệu clone từ scripts/onlyoffice_props.json...');
  const propsPath = path.join(__dirname, 'onlyoffice_props.json');
  if (!fs.existsSync(propsPath)) {
    throw new Error('Chưa có scripts/onlyoffice_props.json! Hãy chạy check_blog.js trước.');
  }

  const propsData = JSON.parse(fs.readFileSync(propsPath, 'utf8'));

  // Collect all unique post items
  const postMap = new Map();

  // Helper to add post to map
  const addPost = (node, categoryKey) => {
    if (!node || !node.slug) return;
    if (!postMap.has(node.slug)) {
      postMap.set(node.slug, {
        node,
        assignedCategory: categoryKey,
      });
    }
  };

  // Add category specific posts first to preserve their authentic topic assignment
  propsData.backToSchoolPosts?.edges?.forEach(e => addPost(e.node, 'back-to-school'));
  propsData.OO16thAnniversaryPosts?.edges?.forEach(e => addPost(e.node, 'onlyoffice-16th-anniversary'));
  propsData.productReleasesPosts?.edges?.forEach(e => addPost(e.node, 'product-releases'));
  propsData.forDevelopersPosts?.edges?.forEach(e => addPost(e.node, 'for-developers'));
  propsData.forBusinessPosts?.edges?.forEach(e => addPost(e.node, 'for-business'));

  // Add all other 60 posts
  propsData.allPosts?.edges?.forEach(e => addPost(e.node, null));

  console.log(`📄 Thu thập được tổng cộng ${postMap.size} bài viết độc nhất từ OnlyOffice.`);

  // STEP 3: FETCH FULL ARTICLE CONTENT FOR PRIORITY POSTS & BUILD DOCUMENTS
  console.log('📥 Đang lấy chi tiết nội dung các bài viết nổi bật từ onlyoffice.com...');
  const finalDocuments = [];
  let index = 0;

  for (const [slug, item] of postMap.entries()) {
    index++;
    const node = item.node;
    const category = determineCategory(slug, node.title, item.assignedCategory);
    const categoryNameVi = getCategoryName(category, true);
    const categoryNameEn = getCategoryName(category, false);

    const image = node.featuredImage?.node?.sourceUrl || node.firstImgPost || 'https://static-blog.onlyoffice.com/wp-content/uploads/2026/10/01164202/IMG_6017.png';
    const date = formatDate(node.date);
    const author = node.author?.node?.name || 'ONLYOFFICE Team';

    const viInfo = VI_TRANSLATIONS[slug] || {};
    const titleEn = node.title || '';
    const titleVi = viInfo.title || titleEn;

    let excerptEn = '';
    if (slug === 'accessibility-conformance' && propsData.mainPostExcerpt?.edges?.[0]?.node?.moreTextExcerpt) {
      excerptEn = propsData.mainPostExcerpt.edges[0].node.moreTextExcerpt;
    } else {
      excerptEn = viInfo.excerpt || `Read the latest insights and technical updates on "${titleEn}" directly from ONLYOFFICE.`;
    }
    const excerptVi = viInfo.excerpt || excerptEn;

    // Fetch full rich content if it's in the top 20 or priority list
    let fullHtml = '';
    if (index <= 18 && node.uri) {
      console.log(`[${index}/${postMap.size}] Fetching content: ${node.uri}...`);
      const details = await fetchOnlyOfficeArticle(node.uri);
      if (details) {
        fullHtml = details.content || '';
        if (details.excerpt && !excerptEn) {
          excerptEn = details.excerpt.replace(/<[^>]*>/g, '').trim();
        }
      }
    }

    const doc = {
      id: slug,
      slug: slug,
      order: index,
      featured: index === 1,
      isMainFeatured: slug === 'accessibility-conformance',
      image: image,
      image_vi: image,
      image_en: image,
      title_en: titleEn,
      title_vi: titleVi,
      category: category,
      categoryName_vi: categoryNameVi,
      categoryName_en: categoryNameEn,
      excerpt_en: excerptEn,
      excerpt_vi: excerptVi,
      date: date,
      readTime: '5',
      author: author,
      authorRole_vi: 'Chuyên gia ONLYOFFICE',
      authorRole_en: 'ONLYOFFICE Team',
      tags: ['ONLYOFFICE', categoryNameEn],
      contentHtml: fullHtml,
      content_en: [
        excerptEn,
        `For more information about ${titleEn}, explore our official documentation and community forums.`
      ],
      content_vi: [
        excerptVi,
        `Để biết thêm chi tiết về ${titleVi}, vui lòng truy cập tài liệu kỹ thuật chính thức và diễn đàn người dùng ONLYOFFICE.`
      ],
      summary_en: excerptEn,
      summary_vi: excerptVi,
      sections: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    finalDocuments.push(doc);
  }

  // STEP 4: INSERT INTO MONGODB
  console.log(`💾 Đang nạp ${finalDocuments.length} bài viết mới vào MongoDB collection blog_posts...`);
  await collection.insertMany(finalDocuments);
  console.log(`✅ ĐÃ LƯU THÀNH CÔNG ${finalDocuments.length} BÀI VIẾT VÀO MONGODB!`);

  // STEP 5: SAVE LOCAL JSON BACKUP
  const backupPath = path.join(__dirname, 'cloned_onlyoffice_posts.json');
  fs.writeFileSync(backupPath, JSON.stringify(finalDocuments, null, 2));
  console.log(`📁 Đã lưu bản sao lưu JSON tại: ${backupPath}`);

  await mongoose.disconnect();
  console.log('🎉 Hoàn tất quá trình clone và thay thế cơ sở dữ liệu!');
}

run().catch(err => {
  console.error('❌ Lỗi khi thực hiện clone:', err);
  process.exit(1);
});
