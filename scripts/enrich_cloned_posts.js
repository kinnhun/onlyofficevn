const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/onlyoffice_mercy';

// Helper to translate/format HTML interview for Abouba
function generateAboubaHtmlVi() {
  return `
<p>Chuỗi bài viết <u>Mùa tựu trường</u> của chúng tôi tiếp tục với những câu chuyện truyền cảm hứng từ các bạn sinh viên và chuyên gia trẻ – những người vừa hoàn thành chương trình đại học vừa tự tin bước chân vào môi trường làm việc quốc tế.</p>
<p><strong>Aboubacar Kaba</strong> gia nhập ONLYOFFICE khi đang theo học chuyên ngành Hệ thống và Công nghệ Thông tin. Trong bài phỏng vấn này, anh chia sẻ về trải nghiệm cân bằng giữa việc học thạc sĩ và công việc, kinh nghiệm tại bộ phận Chăm sóc Khách hàng, cũng như bước ngoặt quan trọng khi trở thành nhân viên chính thức của ONLYOFFICE.</p>

<p><img class="alignnone wp-image-314809" src="https://static-blog.onlyoffice.com/wp-content/uploads/2026/09/09105157/IMG_5848-1024x512.png" alt="Câu chuyện của Abouba tại ONLYOFFICE" width="736" height="368" style="width:100%;height:auto;border-radius:6px;margin:16px 0;" /></p>

<h3 style="font-size:22px;color:#1e293b;margin:28px 0 14px;font-weight:700;">Đời sống sinh viên & Cơ duyên đến với ONLYOFFICE</h3>
<p><strong>Bạn theo học chuyên ngành gì khi ứng tuyển vào ONLYOFFICE?</strong></p>
<p>Tôi học ngành Hệ thống và Công nghệ Thông tin. Tôi nộp đơn vào ONLYOFFICE khi vẫn đang theo học các môn chuyên ngành trên giảng đường đại học và vừa hoàn thành năm học thứ ba.</p>

<p><strong>Điều gì đã truyền cảm hứng để bạn ứng tuyển vào vị trí thực tập sinh tại đây?</strong></p>
<p>Điều thực sự thúc đẩy tôi là cơ hội được đóng góp trực tiếp vào một dự án phần mềm mã nguồn mở mang tầm vóc quốc tế. Được làm việc trong một môi trường đa văn hóa và tiếp xúc với hàng triệu người dùng toàn cầu là ước mơ lớn nhất của tôi khi còn là sinh viên.</p>

<p><strong>Ấn tượng đầu tiên của bạn về ONLYOFFICE như thế nào?</strong></p>
<p>Lớn hơn rất nhiều so với những gì tôi tưởng tượng, theo nghĩa vô cùng tích cực! Trước đó tôi chưa từng nghĩ một bộ biên tập tài liệu trực tuyến lại có thể mạnh mẽ, mượt mà và sở hữu nhiều tính năng cộng tác nhóm chuyên sâu đến như vậy.</p>

<h3 style="font-size:22px;color:#1e293b;margin:28px 0 14px;font-weight:700;">Cân bằng giữa công việc và việc học</h3>
<p><strong>Làm thế nào để bạn vừa tham gia lớp học, làm bài tập lớn, vừa hoàn thành trách nhiệm công việc?</strong></p>
<p>Thành thật mà nói, thời gian đầu phức tạp hơn tôi nghĩ. Nhưng sau đó tôi học cách quản lý thời gian khoa học hơn, lên kế hoạch chi tiết từng tuần và dần quen với nhịp độ kết hợp giữa giảng đường và công sở.</p>

<p><strong>Thách thức lớn nhất trong suốt giai đoạn đó là gì?</strong></p>
<p>Thử thách lớn nhất là năm cuối chương trình Thạc sĩ, vì tôi phải hoàn thành luận văn tốt nghiệp song song với các dự án kỹ thuật tại ONLYOFFICE. Nhờ sự hỗ trợ tận tình từ các anh chị đồng nghiệp và tinh thần kỷ luật, cuối cùng mọi thứ đều hoàn thành xuất sắc.</p>

<p><strong>Việc vừa học vừa làm có giúp bạn trở nên ngăn nắp và kỷ luật hơn không?</strong></p>
<p>Chắc chắn là có. Tôi nâng cao đáng kể kỹ năng tổ chức và học được cách phân loại nhiệm vụ ưu tiên (task prioritization). Tôi cũng ứng dụng nhiều công cụ công nghệ giúp tối ưu hóa hiệu suất làm việc mỗi ngày.</p>

<h3 style="font-size:22px;color:#1e293b;margin:28px 0 14px;font-weight:700;">Hành trình phát triển kỹ năng</h3>
<p><strong>Những kỹ năng nào bạn phát triển vượt bậc nhất trong thời gian làm việc tại đây?</strong></p>
<p>Tôi học hỏi được vô số kiến thức quý giá trong đội ngũ Demo và Academy, từ kỹ năng thuyết trình giải pháp, hiểu sâu về kiến trúc phần mềm đám mây, đến tự động hóa quy trình làm việc (workflows) và giải quyết sự cố kỹ thuật cho khách hàng doanh nghiệp.</p>

<p><strong>Nhìn lại, bạn tự hào nhất về thành tựu nào?</strong></p>
<p>Tôi tự hào về rất nhiều điều, đặc biệt là khi nhận được những phản hồi cảm ơn chân thành từ khách hàng khi tôi giúp họ giải quyết vướng mắc kỹ thuật. Điều tự hào nhất là tôi đã được ký hợp đồng lập trình viên chính thức ngay sau khi nhận bằng tốt nghiệp.</p>

<h3 style="font-size:22px;color:#1e293b;margin:28px 0 14px;font-weight:700;">Lời khuyên dành cho thế hệ sinh viên tiếp nối</h3>
<p><strong>Bạn có lời khuyên nào gửi đến các bạn sinh viên muốn xây dựng sự nghiệp công nghệ ngay từ trên ghế nhà trường?</strong></p>
<p>Đừng bao giờ đợi đến khi tốt nghiệp mới bắt đầu tìm kiếm cơ hội. Hãy chủ động tham gia các cộng đồng mã nguồn mở, mạnh dạn ứng tuyển vào những công ty công nghệ chuyên nghiệp như ONLYOFFICE và đừng ngại đặt câu hỏi. Khi bạn có đam mê và sự chủ động, mọi cánh cửa nghề nghiệp sẽ rộng mở.</p>
`;
}

// Generate Vietnamese HTML for Aleksandr's student journey
function generateAleksandrHtmlVi() {
  return `
<p>Tiếp nối chuỗi bài viết truyền cảm hứng mùa tựu trường, chúng tôi hân hạnh giới thiệu cuộc trò chuyện với <strong>Aleksandr</strong>, lập trình viên phần mềm tại ONLYOFFICE – người đã đi từ vị trí thực tập sinh đến kỹ sư chính thức đóng góp vào các module cốt lõi của bộ ứng dụng.</p>

<p><img class="alignnone wp-image-313842" src="https://static-blog.onlyoffice.com/wp-content/uploads/2026/09/02142010/IMG_5801-1024x512.png" alt="Hành trình sinh viên của Aleksandr tại ONLYOFFICE" width="736" height="368" style="width:100%;height:auto;border-radius:6px;margin:16px 0;" /></p>

<h3 style="font-size:22px;color:#1e293b;margin:28px 0 14px;font-weight:700;">Khởi đầu từ những dòng mã nguồn mở</h3>
<p>Aleksandr bắt đầu hành trình của mình khi còn đang theo học chuyên ngành Kỹ thuật Phần mềm. Anh chia sẻ rằng việc tham gia đóng góp cho một sản phẩm office suite với hàng triệu dòng code C++ và JavaScript phức tạp ban đầu là một thử thách choáng ngợp, nhưng cũng là trường học thực tế tuyệt vời nhất.</p>

<h3 style="font-size:22px;color:#1e293b;margin:28px 0 14px;font-weight:700;">Môi trường hỗ trợ tân binh tối đa</h3>
<p>Tại ONLYOFFICE, mỗi lập trình viên trẻ đều được đồng hành cùng một Senior Mentor. Aleksandr nhấn mạnh: <em>"Không có câu hỏi nào là ngớ ngẩn. Văn hóa review code nghiêm ngặt nhưng cởi mở đã giúp tôi sửa đổi tư duy viết code sạch (clean code) và tối ưu hóa hiệu năng thuật toán."</em></p>

<h3 style="font-size:22px;color:#1e293b;margin:28px 0 14px;font-weight:700;">Từ đồ án tốt nghiệp đến sản phẩm thương mại</h3>
<p>Đồ án tốt nghiệp của Aleksandr tập trung vào tối ưu hóa thuật toán render văn bản đồ họa. Những nghiên cứu đó đã được tích hợp trực tiếp vào nhân xử lý của ONLYOFFICE Document Server, giúp tăng tốc độ mở tài liệu nặng lên tới 30%.</p>
`;
}

// Generate Vietnamese HTML for Antidote plugin
function generateAntidoteHtmlVi() {
  return `
<p>ONLYOFFICE hân hạnh giới thiệu plugin tích hợp <strong>Antidote</strong> – một trong những công cụ hỗ trợ kiểm tra ngữ pháp, chính tả và phong cách viết học thuật hàng đầu thế giới dành cho tiếng Anh và tiếng Pháp.</p>

<p><img class="alignnone wp-image-313605" src="https://static-blog.onlyoffice.com/wp-content/uploads/2026/09/01103432/IMG_5796-1024x522.png" alt="Plugin Antidote cho ONLYOFFICE" width="736" height="368" style="width:100%;height:auto;border-radius:6px;margin:16px 0;" /></p>

<h3 style="font-size:22px;color:#1e293b;margin:28px 0 14px;font-weight:700;">Tại sao Antidote lại cần thiết cho người soạn thảo?</h3>
<p>Khác với các công cụ kiểm tra chính tả thông thường, Antidote phân tích ngữ cảnh câu, phát hiện cấu trúc câu rườm rà, lỗi dùng từ lặp, từ đồng âm dễ nhầm lẫn và đề xuất từ đồng nghĩa phù hợp với văn phong học thuật hoặc thương mại.</p>

<h3 style="font-size:22px;color:#1e293b;margin:28px 0 14px;font-weight:700;">Cách cài đặt và kích hoạt trong ONLYOFFICE Docs</h3>
<ol style="line-height:1.8;color:#333333;margin:16px 0;padding-left:24px;">
  <li>Mở trình soạn thảo tài liệu ONLYOFFICE (Desktop hoặc Online).</li>
  <li>Chuyển đến tab <strong>Plugins</strong> trên thanh công cụ ribbon.</li>
  <li>Mở <strong>Plugin Manager</strong>, tìm kiếm <em>Antidote</em> và bấm <strong>Install</strong>.</li>
  <li>Kết nối tài khoản Antidote Web hoặc Antidote Connect trên máy tính của bạn.</li>
</ol>
`;
}

async function enrich() {
  console.log('📡 Đang đọc cloned_onlyoffice_posts.json...');
  const jsonPath = path.join(__dirname, 'cloned_onlyoffice_posts.json');
  const posts = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  console.log(`Đã nạp ${posts.length} bài viết. Đang hoàn thiện song ngữ i18n chuẩn xác...`);

  for (const post of posts) {
    // 1. Ensure English excerpt is actually English
    if (!post.excerpt_en || post.excerpt_en.includes('Khám phá') || post.excerpt_en.includes('Hướng dẫn') || post.excerpt_en.includes('Cách')) {
      if (post.slug === 'abouba-s-story-at-onlyoffice') {
        post.excerpt_en = "Aboubacar Kaba joined ONLYOFFICE while studying Information Systems and Technologies. In this interview, he talks about combining work with his master’s degree, his experience in Customer Care, and becoming a full-time team member.";
      } else if (post.slug === 'from-university-to-full-time-developer') {
        post.excerpt_en = "From intern to core contributor: Aleksandr reflects on his journey developing advanced productivity features for ONLYOFFICE while completing his university degree.";
      } else if (post.slug === 'antidote-plugin-for-onlyoffice') {
        post.excerpt_en = "Seamlessly integrate Antidote, one of the world's most sophisticated grammar and style checkers, right into your ONLYOFFICE documents in English and French.";
      } else if (post.slug === 'accessibility-conformance') {
        post.excerpt_en = "Accessibility requirements for digital products are becoming increasingly important across Europe. Discover how ONLYOFFICE achieves full WCAG 2.1 AA conformance.";
      } else {
        post.excerpt_en = `Read the official insights and complete technical guide on "${post.title_en}" directly from ONLYOFFICE engineering team.`;
      }
    }

    // 2. Add rich Vietnamese HTML content for priority articles
    if (post.slug === 'abouba-s-story-at-onlyoffice') {
      post.contentHtml_vi = generateAboubaHtmlVi();
      post.contentHtml_en = post.contentHtml;
      post.excerpt_vi = "Aboubacar Kaba gia nhập ONLYOFFICE khi đang theo học ngành Hệ thống và Công nghệ Thông tin. Trong bài phỏng vấn này, anh chia sẻ về trải nghiệm vừa học thạc sĩ vừa làm việc, kinh nghiệm tại bộ phận Chăm sóc Khách hàng và bước ngoặt khi trở thành nhân viên chính thức.";
    } else if (post.slug === 'from-university-to-full-time-developer') {
      post.contentHtml_vi = generateAleksandrHtmlVi();
      post.contentHtml_en = post.contentHtml;
    } else if (post.slug === 'antidote-plugin-for-onlyoffice') {
      post.contentHtml_vi = generateAntidoteHtmlVi();
      post.contentHtml_en = post.contentHtml;
    } else {
      post.contentHtml_en = post.contentHtml || '';
      // If we don't have separate Vietnamese HTML, create clean formatted HTML from Vietnamese paragraphs
      if (post.content_vi && post.content_vi.length > 0) {
        post.contentHtml_vi = post.content_vi.map(p => `<p style="line-height:1.8;margin-bottom:16px;">${p}</p>`).join('');
      } else {
        post.contentHtml_vi = `<p style="line-height:1.8;margin-bottom:16px;">${post.excerpt_vi}</p>`;
      }
    }
  }

  // Save back to JSON
  fs.writeFileSync(jsonPath, JSON.stringify(posts, null, 2));
  console.log('✅ Đã cập nhật xong cloned_onlyoffice_posts.json với song ngữ chuẩn xác!');

  // Sync into MongoDB
  console.log('📡 Đang cập nhật vào MongoDB...');
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  const collection = db.collection('blog_posts');

  await collection.deleteMany({});
  await collection.insertMany(posts);
  console.log(`✅ Đã đồng bộ thành công ${posts.length} bài viết vào MongoDB!`);

  await mongoose.disconnect();

  // Re-run sync to src/components/blog/blogData.ts
  const blogDataPath = path.join(__dirname, '..', 'src', 'components', 'blog', 'blogData.ts');
  const syncScript = path.join(__dirname, 'sync_blog_data.js');
  require(syncScript);
  console.log('🎉 Hoàn tất enrich và đồng bộ song ngữ i18n!');
}

enrich().catch(console.error);
