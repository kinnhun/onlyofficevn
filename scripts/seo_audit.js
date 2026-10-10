const http = require('http');

const routes = [
  '/',
  '/en',
  '/docs',
  '/en/docs',
  '/document-editor',
  '/spreadsheet-editor',
  '/presentation-editor',
  '/pdf-editor',
  '/form-creator',
  '/diagram-viewer',
  '/pricing',
  '/en/pricing',
  '/demo',
  '/en/demo',
  '/partners',
  '/en/partners',
  '/blog',
  '/en/blog',
  '/blog/accessibility-conformance',
  '/en/blog/accessibility-conformance',
];

const targetBase = process.argv[2] || 'http://localhost:3000';
const client = targetBase.startsWith('https') ? require('https') : require('http');

function fetchHtml(path) {
  return new Promise((resolve) => {
    client.get(`${targetBase}${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ path, status: res.statusCode, html: data }));
    }).on('error', (err) => resolve({ path, error: err.message }));
  });
}

function analyzePage(path, html) {
  const issues = [];
  const info = {};

  // Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  info.title = titleMatch ? titleMatch[1] : null;
  if (!info.title) issues.push('Missing <title>');
  else if (info.title.length < 20) issues.push(`Title too short (${info.title.length} chars)`);
  else if (info.title.length > 90) issues.push(`Title long (${info.title.length} chars)`);

  // Meta Description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) ||
                    html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i);
  info.description = descMatch ? descMatch[1] : null;
  if (!info.description) issues.push('Missing meta description');
  else if (info.description.length < 50) issues.push(`Description too short (${info.description.length} chars)`);

  // Meta Keywords
  const kwMatch = html.match(/<meta\s+name=["']keywords["']\s+content=["']([^"']*)["']/i) ||
                  html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']keywords["']/i);
  info.keywords = kwMatch ? kwMatch[1] : null;
  if (!info.keywords) issues.push('Missing meta keywords');

  // Canonical
  const canonMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i) ||
                     html.match(/<link\s+href=["']([^"']*)["']\s+rel=["']canonical["']/i);
  info.canonical = canonMatch ? canonMatch[1] : null;
  if (!info.canonical) issues.push('Missing canonical link');
  else if (!info.canonical.startsWith('https://onlyofficevietnam.com')) {
    issues.push(`Canonical domain invalid: ${info.canonical}`);
  }

  // Hreflang
  const hreflangs = [...html.matchAll(/<link\s+rel=["']alternate["']\s+hreflang=["']([^"']*)["']\s+href=["']([^"']*)["']/gi)];
  info.hreflangs = hreflangs.map(m => `${m[1]} -> ${m[2]}`);
  if (hreflangs.length === 0) issues.push('Missing hreflang alternates');

  // Open Graph
  const ogTitle = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i);
  const ogImage = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i);
  const ogUrl = html.match(/<meta\s+property=["']og:url["']\s+content=["']([^"']*)["']/i);
  if (!ogTitle) issues.push('Missing og:title');
  if (!ogImage) issues.push('Missing og:image');
  if (!ogUrl) issues.push('Missing og:url');

  // JSON-LD
  const jsonLds = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([^<]*)<\/script>/gi)];
  info.jsonLdCount = jsonLds.length;
  if (jsonLds.length === 0) issues.push('Missing JSON-LD structured data');
  else {
    jsonLds.forEach((ld, idx) => {
      try {
        JSON.parse(ld[1]);
      } catch (e) {
        issues.push(`JSON-LD #${idx+1} syntax error: ${e.message}`);
      }
    });
  }

  // H1 Tags
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  info.h1Count = h1Matches.length;
  if (h1Matches.length === 0) issues.push('Missing <h1>');
  else if (h1Matches.length > 1) issues.push(`Multiple <h1> tags (${h1Matches.length})`);

  // Images without alt
  const imgMatches = [...html.matchAll(/<img\s+([^>]*?)>/gi)];
  let imgsWithoutAlt = 0;
  for (const m of imgMatches) {
    if (!/alt=["'][^"']*["']/i.test(m[1])) {
      imgsWithoutAlt++;
    }
  }
  if (imgsWithoutAlt > 0) {
    issues.push(`${imgsWithoutAlt} <img> tag(s) without alt attribute`);
  }

  return { path, info, issues };
}

async function run() {
  console.log(`Starting SEO Audit for ${routes.length} key routes on http://localhost:3000...\n`);
  let totalIssues = 0;
  for (const r of routes) {
    const res = await fetchHtml(r);
    if (res.error) {
      console.log(`❌ ${r}: Failed to fetch (${res.error})`);
      totalIssues++;
      continue;
    }
    if (res.status !== 200) {
      console.log(`❌ ${r}: HTTP status ${res.status}`);
      totalIssues++;
      continue;
    }
    const report = analyzePage(r, res.html);
    if (report.issues.length === 0) {
      console.log(`✅ ${r} [200 OK]`);
      console.log(`   Title: "${report.info.title}"`);
      console.log(`   Canonical: ${report.info.canonical}`);
      console.log(`   Keywords: "${report.info.keywords?.slice(0, 70)}..."`);
      console.log(`   H1: ${report.info.h1Count} | JSON-LD: ${report.info.jsonLdCount} | Hreflang: ${report.info.hreflangs.length}`);
    } else {
      console.log(`⚠️ ${r} [200 OK with issues]:`);
      report.issues.forEach(iss => console.log(`   - ${iss}`));
      totalIssues += report.issues.length;
    }
  }

  console.log(`\n================================`);
  console.log(`SEO Audit completed. Total issues: ${totalIssues}`);
}

run();
