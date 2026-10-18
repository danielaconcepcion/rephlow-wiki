import { chromium } from 'playwright';

const BASE = 'http://localhost:4173/madrid-ucm';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await b.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on('pageerror', e => errors.push('JS: ' + e.message));
page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 160)); });

async function sweep(path, tabSel) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  const tabs = await page.$$(tabSel);
  const report = { path, blocks: tabs.length, figures: 0, broken: [], tables: 0, downloads: 0, dupIds: [] };
  for (let i = 0; i < tabs.length; i++) {
    const t = (await page.$$(tabSel))[i];
    await t.click();
    await page.waitForTimeout(450);
    // open every folder tab in the deck
    const folders = await page.$$('.folder-tab, [id^="folder-tab-"]');
    for (let f = 0; f < folders.length; f++) {
      const ff = (await page.$$('.folder-tab, [id^="folder-tab-"]'))[f];
      if (!ff) continue;
      await ff.click().catch(() => {});
      await page.waitForTimeout(220);
      const r = await page.evaluate(() => {
        const imgs = [...document.querySelectorAll('article img, .lab-block img')];
        return {
          figures: imgs.length,
          broken: imgs.filter(i => i.complete && i.naturalWidth === 0).map(i => i.getAttribute('src')),
          tables: document.querySelectorAll('.record-table').length,
          downloads: document.querySelectorAll('.record-protocols .record-download').length,
        };
      });
      report.figures = Math.max(report.figures, r.figures);
      report.tables = Math.max(report.tables, r.tables);
      report.downloads += r.downloads;
      report.broken.push(...r.broken);
    }
  }
  report.broken = [...new Set(report.broken)];
  report.dupIds = await page.evaluate(() => {
    const seen = {}, dup = [];
    document.querySelectorAll('[id]').forEach(e => {
      if (seen[e.id]) dup.push(e.id); else seen[e.id] = 1;
    });
    return [...new Set(dup)];
  });
  return report;
}

for (const [p, sel] of [['/experiments', '.section-tabs button'], ['/results', '.section-tabs button']]) {
  console.log(JSON.stringify(await sweep(p, sel), null, 1));
}
console.log('ERRORS:', errors.length ? errors.slice(0, 12) : 'none');
await b.close();
