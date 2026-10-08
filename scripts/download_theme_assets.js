const fs = require('fs');
const path = require('path');
const https = require('https');

// Extract all URLs
function getUrls(dir) {
  let urls = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (['node_modules', '.next', '.git'].includes(file)) continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      urls = urls.concat(getUrls(fullPath));
    } else if (/\.(ts|tsx|js|jsx)$/.test(file)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.match(/https:\/\/onlyoffice\.vn\/wp-content\/[^\s\"\'\`]+/g);
      if (matches) urls.push(...matches);
    }
  }
  return [...new Set(urls)];
}

const urls = getUrls(path.join(__dirname, '../src'));
console.log(`Found ${urls.length} wp-content URLs to download:`);

function downloadFile(url) {
  return new Promise((resolve) => {
    // Determine target path in public/
    const urlObj = new URL(url);
    // pathname: /wp-content/themes/...
    const relPath = urlObj.pathname.startsWith('/') ? urlObj.pathname.slice(1) : urlObj.pathname;
    const dest = path.join(__dirname, '../public', relPath);

    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      console.log(`Already exists: ${dest}`);
      return resolve(true);
    }

    fs.mkdirSync(path.dirname(dest), { recursive: true });

    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded: ${url} -> ${dest} (${fs.statSync(dest).size} bytes)`);
          resolve(true);
        });
      } else {
        console.error(`Failed to download ${url}: status ${res.statusCode}`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.error(`Error downloading ${url}:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  for (const url of urls) {
    await downloadFile(url);
  }
  console.log('All downloads completed!');
}

run();
