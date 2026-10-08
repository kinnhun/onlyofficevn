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
    } else if (/\.(ts|tsx|js|jsx|json|md)$/.test(file)) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = walk(path.join(__dirname, '../src'));
let totalReplacements = 0;
let modifiedFiles = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('onlyoffice.vn')) {
    const matches = (content.match(/onlyoffice\.vn/g) || []).length;
    // Replace all occurrences of onlyoffice.vn with onlyofficevietnam.com
    const updated = content.replaceAll('onlyoffice.vn', 'onlyofficevietnam.com');
    fs.writeFileSync(file, updated, 'utf8');
    totalReplacements += matches;
    modifiedFiles++;
    console.log(`Updated (${matches}x): ${file}`);
  }
}

console.log(`\nSuccessfully updated ${totalReplacements} occurrences in ${modifiedFiles} files.`);
