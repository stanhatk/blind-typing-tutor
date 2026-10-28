/**
 * Tells IndexNow search engines (Bing, Yandex, Seznam, Naver) about every
 * page in the live sitemap, so new and changed pages are crawled soon after
 * a deploy instead of whenever the crawler gets to them.
 *
 * Usage:
 *   node scripts/indexnow.cjs [--dry-run]
 *
 * The key is public by design: search engines verify it by fetching
 * https://<host>/<key>.txt, served from public/.
 */

const HOST = "blind-typing-tutor.wordmemo.net";
const KEY = "52400f9d74111da5f502f3869fda8964";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const BATCH_SIZE = 10000; // IndexNow limit per request

async function getSitemapUrls() {
  const response = await fetch(`https://${HOST}/sitemap.xml`);
  if (!response.ok) throw new Error(`Sitemap: HTTP ${response.status}`);
  const xml = await response.text();
  // Pages and their language alternates
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>|href="([^"]+)"/g)].map((m) => m[1] ?? m[2]);
  return [...new Set(urls)].filter((url) => new URL(url).host === HOST);
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const keyFile = await fetch(`https://${HOST}/${KEY}.txt`);
  if (!keyFile.ok || (await keyFile.text()).trim() !== KEY) {
    throw new Error(`Key file https://${HOST}/${KEY}.txt is not served; deploy public/${KEY}.txt first`);
  }

  const urls = await getSitemapUrls();
  console.warn(`IndexNow: ${urls.length} URLs from the sitemap`);
  if (dryRun) return;

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `https://${HOST}/${KEY}.txt`,
        urlList: urls.slice(i, i + BATCH_SIZE),
      }),
    });
    // 200 OK and 202 Accepted both mean the URLs were received
    if (response.status !== 200 && response.status !== 202) {
      throw new Error(`IndexNow: HTTP ${response.status} ${await response.text()}`);
    }
    console.warn(`IndexNow: submitted ${Math.min(urls.length - i, BATCH_SIZE)} URLs (HTTP ${response.status})`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
