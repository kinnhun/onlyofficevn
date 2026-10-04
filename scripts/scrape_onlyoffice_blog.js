const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/onlyoffice_mercy';
const TARGET_API_URL = 'https://onlyoffice.vn/wp-json/wp/v2';
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'blog', 'scraped');

function decodeEntities(encodedString) {
  if (!encodedString) return '';
  const translate_re = /&(nbsp|amp|quot|lt|gt|#038|#8211|#8212|#8216|#8217|#8220|#8221|#8230);/g;
  const translate = {
    "nbsp": " ",
    "amp": "&",
    "quot": "\"",
    "lt": "<",
    "gt": ">",
    "#038": "&",
    "#8211": "–",
    "#8212": "—",
    "#8216": "‘",
    "#8217": "’",
    "#8220": "“",
    "#8221": "”",
    "#8230": "…"
  };
  return encodedString.replace(translate_re, function(match, entity) {
    return translate[entity] || match;
  }).replace(/&#(\d+);/g, function(match, dec) {
    return String.fromCharCode(dec);
  });
}

function stripHtml(html) {
  if (!html) return '';
  return decodeEntities(html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim());
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse JSON from ${url}: ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

function downloadImage(url, destPath) {
  return new Promise((resolve) => {
    if (!url) return resolve(null);
    if (fs.existsSync(destPath)) {
      return resolve(destPath);
    }

    const client = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destPath);

    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 15000 }, (res) => {
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(destPath, () => {});
        return resolve(null);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(destPath);
      });
    }).on('error', () => {
      file.close();
      fs.unlink(destPath, () => {});
      resolve(null);
    }).on('timeout', () => {
      file.close();
      fs.unlink(destPath, () => {});
      resolve(null);
    });
  });
}

async function scrapeAll() {
  console.log('🚀 Bắt đầu cào dữ liệu từ https://onlyoffice.vn/blog/...');
  console.log(`📡 Kết nối MongoDB tại: ${MONGODB_URI}`);

  await mongoose.connect(MONGODB_URI);
  console.log('✅ Đã kết nối MongoDB thành công.');

  const db = mongoose.connection.db;
  const collection = db.collection('blog_posts');

  console.log('📥 Đang lấy danh mục và thẻ từ WordPress API...');
  const [categories, tags] = await Promise.all([
    fetchJson(`${TARGET_API_URL}/categories?per_page=100`).catch(() => []),
    fetchJson(`${TARGET_API_URL}/tags?per_page=100`).catch(() => []),
  ]);

  const catMap = new Map();
  categories.forEach(c => catMap.set(c.id, { id: c.id, slug: c.slug, name: decodeEntities(c.name) }));

  const tagMap = new Map();
  tags.forEach(t => tagMap.set(t.id, decodeEntities(t.name)));

  console.log(`✅ Lấy được ${catMap.size} chuyên mục và ${tagMap.size} thẻ tag.`);

  console.log('📥 Đang tải danh sách bài viết từ https://onlyoffice.vn/wp-json/wp/v2/posts?per_page=100&_embed=1...');
  const rawPosts = await fetchJson(`${TARGET_API_URL}/posts?per_page=100&_embed=1`);
  console.log(`📄 Đã lấy được ${rawPosts.length} bài viết.`);

  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  let successCount = 0;
  let imageCount = 0;

  for (let i = 0; i < rawPosts.length; i++) {
    const p = rawPosts[i];
    const postSlug = p.slug || `post-${p.id}`;
    const rawTitle = decodeEntities(p.title?.rendered || '');
    const cleanExcerpt = stripHtml(p.excerpt?.rendered || '').substring(0, 280);
    const rawContentHtml = p.content?.rendered || '';
    const cleanContent = stripHtml(rawContentHtml);
    const wordCount = cleanContent.split(/\s+/).length;
    const readTime = `${Math.max(3, Math.ceil(wordCount / 220))}`;

    // Format date DD/MM/YYYY
    let formattedDate = '01/10/2026';
    if (p.date) {
      const d = new Date(p.date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      formattedDate = `${day}/${month}/${year}`;
    }

    // Categories & Tags
    const postCategories = (p.categories || []).map(id => catMap.get(id)).filter(Boolean);
    const mainCat = postCategories[0] || { slug: 'huong-dan-su-dung', name: 'Hướng Dẫn Sử Dụng' };
    const postTags = (p.tags || []).map(id => tagMap.get(id)).filter(Boolean);

    // Featured Image handling
    const remoteImageUrl = p._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    let localImagePath = remoteImageUrl || '/blog/trial-guide.jpg';

    if (remoteImageUrl) {
      const ext = path.extname(new URL(remoteImageUrl).pathname) || '.jpg';
      const filename = `${postSlug}${ext}`;
      const destPath = path.join(IMAGES_DIR, filename);

      const downloaded = await downloadImage(remoteImageUrl, destPath);
      if (downloaded) {
        localImagePath = `/blog/scraped/${filename}`;
        imageCount++;
      } else {
        localImagePath = remoteImageUrl;
      }
    }

    // Paragraphs array
    const paragraphs = rawContentHtml
      .split(/<\/(?:p|h2|h3|h4)>/i)
      .map(part => stripHtml(part))
      .filter(t => t.length > 20);

    const doc = {
      id: postSlug,
      slug: postSlug,
      image: localImagePath,
      title_vi: rawTitle,
      title_en: rawTitle,
      category: mainCat.slug,
      categoryName_vi: mainCat.name,
      categoryName_en: mainCat.name,
      excerpt_vi: cleanExcerpt,
      excerpt_en: cleanExcerpt,
      date: formattedDate,
      readTime,
      author: 'ONLYOFFICE Vietnam',
      authorRole_vi: 'Đội ngũ Chuyên gia ONLYOFFICE',
      authorRole_en: 'ONLYOFFICE Expert Team',
      featured: i < 5,
      order: i,
      tags: postTags.length > 0 ? postTags : [mainCat.name],
      summary_vi: cleanExcerpt,
      summary_en: cleanExcerpt,
      content_vi: paragraphs.slice(0, 10),
      content_en: paragraphs.slice(0, 10),
      contentHtml: rawContentHtml,
      sourceUrl: p.link || `https://onlyoffice.vn/${postSlug}/`,
      sections: [],
      scrapedAt: new Date(),
    };

    await collection.findOneAndUpdate(
      { id: doc.id },
      { $set: doc },
      { upsert: true }
    );

    successCount++;
    if (successCount % 10 === 0 || successCount === rawPosts.length) {
      console.log(`[${successCount}/${rawPosts.length}] Đã lưu bài: "${rawTitle.substring(0, 40)}..."`);
    }
  }

  const finalTotal = await collection.countDocuments();
  console.log('\n======================================================');
  console.log(`🎉 HOÀN THÀNH CÀO DỮ LIỆU TỪ https://onlyoffice.vn/blog/`);
  console.log(`📊 Tổng số bài viết đã lưu vào MongoDB: ${finalTotal}`);
  console.log(`🖼️ Tổng số ảnh tải về thư mục web/public/blog/scraped/: ${imageCount}`);
  console.log('======================================================\n');

  process.exit(0);
}

scrapeAll().catch(err => {
  console.error('❌ Lỗi khi cào dữ liệu:', err);
  process.exit(1);
});
