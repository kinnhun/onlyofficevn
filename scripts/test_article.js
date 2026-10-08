async function test() {
  const res = await fetch('https://www.onlyoffice.com/blog/2026/10/accessibility-conformance/', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const html = await res.text();
  const m = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (m) {
    const d = JSON.parse(m[1]);
    const post = d.props?.pageProps?.post;
    console.log('Translations:', post?.translations);
  } else {
    console.log('No next data');
  }
}
test().catch(console.error);
