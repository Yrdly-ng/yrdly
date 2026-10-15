// Read-only HTTP audit. Does not use Chrome or submit forms.
const { JSDOM } = require('jsdom');
const fs = require('node:fs');
const base = process.env.QA_BASE_URL || 'http://localhost:3101';
const origin = new URL(base).origin;
const pages = new Map();
const queue = ['/', '/coming-soon', '/unsubscribe'];
const external = new Set();
const images = new Set();
const problems = [];
const fragments = [];

async function read(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  return { response, html: await response.text() };
}

(async () => {
  while (queue.length) {
    const paths = queue.splice(0, 4).filter(path => !pages.has(path));
    await Promise.all(paths.map(async path => {
      pages.set(path, null);
      try {
        const { response, html } = await read(origin + path);
        const document = new JSDOM(html).window.document;
        pages.set(path, { status: response.status, ids: new Set([...document.querySelectorAll('[id]')].map(el => el.id)) });
        if (!response.ok) problems.push(`${path}: HTTP ${response.status}`);
        for (const image of document.querySelectorAll('img[src]')) {
          const src = image.getAttribute('src');
          if (src && !src.startsWith('data:')) images.add(new URL(src, origin).href);
        }
        for (const link of document.querySelectorAll('a[href]')) {
          const href = link.getAttribute('href');
          if (!href || href === '#' || href.startsWith('javascript:')) {
            problems.push(`${path}: empty link ${link.textContent.trim()}`);
            continue;
          }
          const url = new URL(href, origin + path);
          if (!['http:', 'https:'].includes(url.protocol)) continue;
          if (url.origin === origin) {
            if (url.hash) fragments.push({ from: path, path: url.pathname, id: decodeURIComponent(url.hash.slice(1)) });
            if (!pages.has(url.pathname) && !queue.includes(url.pathname)) queue.push(url.pathname);
          } else external.add(url.href);
        }
        console.log(`${response.status} ${path}`);
      } catch (error) { problems.push(`${path}: ${error.message}`); }
    }));
  }
  for (const fragment of fragments) {
    if (!pages.get(fragment.path)?.ids.has(fragment.id)) problems.push(`${fragment.from}: missing ${fragment.path}#${fragment.id}`);
  }
  const externalResults = [];
  const links = [...external].filter(url => new URL(url).hostname === 'app.yrdly.ng');
  for (let i = 0; i < links.length; i += 4) {
    await Promise.all(links.slice(i, i + 4).map(async url => {
      try {
        const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
        await response.body?.cancel();
        externalResults.push({ url, status: response.status, destination: response.url });
        if (!response.ok) problems.push(`${url}: HTTP ${response.status}`);
      } catch (error) { problems.push(`${url}: ${error.message}`); }
    }));
  }
  const api = await fetch(`${origin}/api/events`, { signal: AbortSignal.timeout(30000) });
  const events = await api.json();
  if (!api.ok || !Array.isArray(events)) problems.push('Events API unavailable');
  else {
    for (const event of events) {
      if (event.image) images.add(new URL(event.image, origin).href);
      const detail = await fetch(`${origin}/api/events?id=${encodeURIComponent(event.id)}`, { signal: AbortSignal.timeout(30000) });
      const items = await detail.json();
      if (!detail.ok || !items.some(item => item.id === event.id)) problems.push(`Missing event detail ${event.id}`);
      const product = await fetch(`https://app.yrdly.ng${event.appEventUrl}`, { signal: AbortSignal.timeout(30000) });
      await product.body?.cancel();
      if (!product.ok) problems.push(`Broken event app link ${event.appEventUrl}`);
    }
  }
  const media = [...images];
  for (let i = 0; i < media.length; i += 4) {
    await Promise.all(media.slice(i, i + 4).map(async url => {
      try {
        const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
        await response.body?.cancel();
        if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) problems.push(`Image unavailable: ${url} (${response.status})`);
      } catch (error) { problems.push(`Image unavailable: ${url} (${error.message})`); }
    }));
  }
  const report = { base, pages: [...pages].map(([path, data]) => ({ path, status: data?.status })), external: externalResults, otherLinks: [...external].filter(url => new URL(url).hostname !== 'app.yrdly.ng'), publicEvents: events.length, images: images.size, problems };
  fs.mkdirSync('/private/tmp/yrdly-astra-qa', { recursive: true });
  fs.writeFileSync('/private/tmp/yrdly-astra-qa/link-report.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ pages: pages.size, appLinks: externalResults.length, publicEvents: events.length, images: images.size, problems }, null, 2));
  if (problems.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
