const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (['node_modules', '.next', '.git'].includes(file)) continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (/\.(ts|tsx|js|jsx)$/.test(file)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.match(/https:\/\/onlyoffice\.vn\/[^\s\"\'\`]+/g);
      if (matches) results.push(...matches);
    }
  }
  return results;
}

const urls = [...new Set(walk('d:/mercy/testCloneGiaoDien/web/src'))];
console.log('Total URLs pointing to onlyoffice.vn:', urls.length);
urls.forEach(u => console.log(u));
