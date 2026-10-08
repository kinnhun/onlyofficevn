const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/onlyoffice_mercy';

async function fix() {
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;

  // 1. Update accessibility-conformance in MongoDB
  await db.collection('blog_posts').updateOne(
    { slug: 'accessibility-conformance' },
    { $set: { order: 0, isMainFeatured: true, featured: true } }
  );

  // 2. Ensure all other posts are NOT isMainFeatured
  await db.collection('blog_posts').updateMany(
    { slug: { $ne: 'accessibility-conformance' } },
    { $set: { isMainFeatured: false } }
  );

  console.log('✅ MongoDB updated: accessibility-conformance is strictly isMainFeatured: true, order: 0');

  // 3. Update cloned_onlyoffice_posts.json so that accessibility-conformance is at index 0
  const jsonPath = path.join(__dirname, 'cloned_onlyoffice_posts.json');
  const posts = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const heroIdx = posts.findIndex(p => p.slug === 'accessibility-conformance');
  if (heroIdx !== -1) {
    const [hero] = posts.splice(heroIdx, 1);
    hero.order = 0;
    hero.isMainFeatured = true;
    hero.featured = true;
    posts.unshift(hero);
  }

  posts.forEach((p, idx) => {
    p.order = idx;
    if (p.slug !== 'accessibility-conformance') {
      p.isMainFeatured = false;
    }
  });

  fs.writeFileSync(jsonPath, JSON.stringify(posts, null, 2));
  console.log('✅ cloned_onlyoffice_posts.json updated: accessibility-conformance placed at index 0');

  // 4. Update src/components/blog/blogData.ts
  const syncScript = path.join(__dirname, 'sync_blog_data.js');
  require(syncScript);

  await mongoose.disconnect();
  console.log('🎉 Done!');
}

fix().catch(console.error);
