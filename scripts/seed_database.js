/**
 * Deploy & Seed MongoDB Database Script
 * Reads all 60 authentic cloned articles from cloned_onlyoffice_posts.json
 * and seeds them into the target MongoDB instance (local or remote VPS).
 * 
 * Usage:
 *   node scripts/seed_database.js
 *   MONGODB_URI="mongodb://user:pass@host:27017/onlyoffice_mercy" node scripts/seed_database.js
 */

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Read environment variables if available
const envPath = path.join(__dirname, '..', '.env');
const envLocalPath = path.join(__dirname, '..', '.env.local');

function loadEnvFile(filePath) {
  if (fs.existsSync(filePath)) {
    const lines = fs.readFileSync(filePath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnvFile(envLocalPath);
loadEnvFile(envPath);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/onlyoffice_mercy';

async function seedDatabase() {
  console.log('================================================================');
  console.log('🚀 ONLYOFFICE MERCY TECH - DATABASE SEED & DEPLOY');
  console.log('================================================================');
  console.log(`📡 Connecting to MongoDB: ${MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@')}`);

  const postsFile = path.join(__dirname, 'cloned_onlyoffice_posts.json');
  if (!fs.existsSync(postsFile)) {
    throw new Error(`Data file not found at: ${postsFile}`);
  }

  const posts = JSON.parse(fs.readFileSync(postsFile, 'utf8'));
  console.log(`📄 Found ${posts.length} articles in cloned_onlyoffice_posts.json`);

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('✅ Connected successfully to MongoDB!');

    const db = mongoose.connection.db;
    const collection = db.collection('blog_posts');

    // Remove existing documents
    const deleteResult = await collection.deleteMany({});
    console.log(`🗑️ Cleared existing documents: ${deleteResult.deletedCount} removed.`);

    // Prepare documents with timestamps
    const now = new Date();
    const documents = posts.map((post, idx) => ({
      ...post,
      order: idx,
      isMainFeatured: Boolean(post.isMainFeatured || post.slug === 'accessibility-conformance' || post.id === 'accessibility-conformance'),
      createdAt: now,
      updatedAt: now,
    }));

    // Bulk insert
    const insertResult = await collection.insertMany(documents);
    console.log(`✅ Inserted ${insertResult.insertedCount} articles into 'blog_posts' collection!`);

    // Create indices for fast lookup
    await collection.createIndex({ id: 1 }, { unique: true });
    await collection.createIndex({ slug: 1 });
    await collection.createIndex({ category: 1 });
    await collection.createIndex({ featured: 1 });
    await collection.createIndex({ order: 1 });
    console.log('⚡ Created indexes on (id, slug, category, featured, order).');

    // Verification
    const count = await collection.countDocuments();
    const sample = await collection.findOne({ slug: 'accessibility-conformance' });
    console.log('----------------------------------------------------------------');
    console.log(`🎉 Database verified successfully! Total articles in DB: ${count}`);
    if (sample) {
      console.log(`⭐ Featured post verification: "${sample.title_vi?.slice(0, 50)}..." [OK]`);
    }
    console.log('================================================================');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed database:', err);
    process.exit(1);
  }
}

seedDatabase();
