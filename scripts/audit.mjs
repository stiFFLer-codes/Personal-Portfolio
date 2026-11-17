// The accessibility run the footer reports on.
//
//   npm run audit
//
// Serves dist/, opens every page in the sitemap in light and dark at a
// desktop and a phone width, runs axe-core, then presses Tab through each
// page and counts how many links and controls it reaches. Writes
// src/data/a11y-audit.json, which the site reads at build time: the claim on
// the page is this file, not a sentence someone typed.
//
// Needs Playwright with a Chromium it can launch. It is not a dependency of
// the site; install it yourself or run this where it already exists.
import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  ({ chromium } = require('/opt/node-tools/node_modules/playwright'));
}
const axeSource = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');
const axeVersion = require('axe-core/package.json').version;

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg', '.xml': 'application/xml', '.pdf': 'application/pdf', '.json': 'application/json' };

const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (path.endsWith('/')) path += 'index.html';
  else if (!extname(path)) path += '/index.html';
  try {
    const body = await readFile(join(root, path));
    res.writeHead(200, { 'Content-Type': TYPES[extname(path)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('not found');
  }
});
await new Promise((r) => server.listen(0, r));
const base = `http://localhost:${server.address().port}`;

const sitemap = await readFile(join(root, 'sitemap.xml'), 'utf8');
const paths = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1]);

const FOCUSABLE = 'a[href], button, input, select, textarea, summary, [tabindex]:not([tabindex="-1"])';

const browser = await chromium.launch();
const pages = [];
for (const path of paths) {
  const entry = { path, passes: 0, violations: [], keyboard: { reached: 0, total: 0 } };
  for (const scheme of ['light', 'dark']) {
    for (const width of [1280, 390]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme, reducedMotion: 'reduce' });
      const page = await ctx.newPage();
      await page.goto(base + path, { waitUntil: 'networkidle' });
      await page.addScriptTag({ content: axeSource });
      const result = await page.evaluate(() => window.axe.run(document, { resultTypes: ['violations', 'passes'] }));
      entry.passes = Math.max(entry.passes, result.passes.length);
      for (const v of result.violations) {
        entry.violations.push({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.length, scheme, width, targets: v.nodes.slice(0, 3).map((n) => n.target.join(' ')) });
      }

      // Keyboard: Tab from the top until focus stops landing on new elements.
      if (scheme === 'light' && width === 1280) {
        const total = await page.evaluate((sel) => {
          const visible = (el) => {
            const r = el.getBoundingClientRect();
            const s = getComputedStyle(el);
            return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && !el.disabled;
          };
          const els = [...document.querySelectorAll(sel)].filter(visible);
          // Radios in one group are a single Tab stop.
          const groups = new Set();
          let n = 0;
          for (const el of els) {
            if (el.type === 'radio') {
              if (groups.has(el.name)) continue;
              groups.add(el.name);
            }
            el.dataset.auditStop = '1';
            n++;
          }
          window.__seen = new Set();
          return n;
        }, FOCUSABLE);
        let idle = 0;
        for (let i = 0; i < total + 20 && idle < 3; i++) {
          await page.keyboard.press('Tab');
          const fresh = await page.evaluate(() => {
            const el = document.activeElement;
            if (!el || el === document.body) return false;
            const key = el.type === 'radio' ? `radio:${el.name}` : el;
            if (window.__seen.has(key)) return false;
            window.__seen.add(key);
            return true;
          });
          idle = fresh ? 0 : idle + 1;
        }
        entry.keyboard = { reached: await page.evaluate(() => window.__seen.size), total };
      }
      await ctx.close();
    }
  }
  pages.push(entry);
  const k = entry.keyboard;
  console.log(`${entry.violations.length ? 'FAIL' : 'ok  '} ${path}  rules passed ${entry.passes}, violations ${entry.violations.length}, tab ${k.reached}/${k.total}`);
  for (const v of entry.violations) console.log(`       ${v.scheme} ${v.width}px ${v.id}: ${v.help} (${v.nodes})  ${v.targets.join(' | ')}`);
}
await browser.close();
server.close();

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const now = new Date();
const out = {
  date: `${now.getUTCDate()} ${MONTHS[now.getUTCMonth()]} ${now.getUTCFullYear()}`,
  tool: `axe-core ${axeVersion}`,
  pages,
};
await writeFile(new URL('../src/data/a11y-audit.json', import.meta.url), JSON.stringify(out, null, 2) + '\n');
const bad = pages.reduce((n, p) => n + p.violations.length, 0);
console.log(`\n${pages.length} pages, ${bad} violations. Wrote src/data/a11y-audit.json. Build again to publish it.`);
