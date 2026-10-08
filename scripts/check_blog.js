const fs = require('fs');

async function test() {
  const res = await fetch('https://www.onlyoffice.com/blog', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const html = await res.text();
  console.log('HTML length:', html.length);
  const nextMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (nextMatch) {
    console.log('Found __NEXT_DATA__!');
    const data = JSON.parse(nextMatch[1]);
    const pageProps = data.props?.pageProps;
    console.log('pageProps keys:', Object.keys(pageProps || {}));
    if (pageProps.allPosts) console.log('allPosts length:', pageProps.allPosts.length);
    if (pageProps.posts) console.log('posts length:', pageProps.posts.length);
    if (pageProps.categories) console.log('categories:', Object.keys(pageProps.categories));
    fs.writeFileSync('scripts/onlyoffice_props.json', JSON.stringify(pageProps, null, 2));
    console.log('Saved to scripts/onlyoffice_props.json');
  } else {
    console.log('No __NEXT_DATA__, scanning for post links or article tags...');
    const postLinks = [...html.matchAll(/href="(\/blog\/[^"]+)"/g)].map(m => m[1]);
    console.log('Unique post links:', [...new Set(postLinks)].slice(0, 20));
  }
}

test().catch(console.error);
