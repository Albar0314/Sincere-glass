// fix-pillar-page-and-sort.mjs
// Fixes two bugs after article-12 deploy:
//   1. src/app/blog/architectural-glass-applications-guide/page.tsx was overwritten with the
//      stale balustrade page.tsx (left over in edit/ from article-11 deploy). This copies the
//      correct Pillar page from edit/page-article-12-pillar.tsx into the right target.
//   2. src/app/blog/page.tsx uses `filtered[0]` as the hero when a cluster tab is active, so the
//      Pillar never bubbles up. This patches the hero selection to prefer isPillar first.
//
// Run from project root:  node edit\fix-pillar-page-and-sort.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = process.cwd();
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));

// ─── Fix 1: write the correct Pillar page.tsx ──────────────────────────
const PILLAR_SRC_CANDIDATES = [
  path.join(ROOT, 'edit', 'page-article-12-pillar.tsx'),
  path.join(ROOT, 'edit', 'page-article-12-pillar.tsx.txt'),
  path.join(SCRIPT_DIR, 'page-article-12-pillar.tsx'),
  path.join(SCRIPT_DIR, 'page-article-12-pillar.tsx.txt'),
];

const PILLAR_TARGET = path.join(
  ROOT,
  'src',
  'app',
  'blog',
  'architectural-glass-applications-guide',
  'page.tsx',
);

let pillarSrc = null;
for (const p of PILLAR_SRC_CANDIDATES) {
  if (fs.existsSync(p)) {
    pillarSrc = p;
    break;
  }
}

if (!pillarSrc) {
  console.error('[fix1] cannot find page-article-12-pillar.tsx. Tried:');
  PILLAR_SRC_CANDIDATES.forEach((p) => console.error('  - ' + p));
  console.error('[fix1] drop it into edit/ first.');
  process.exit(1);
}

// Sanity check: the source file must contain the Pillar SLUG, not the balustrade one.
const pillarContent = fs.readFileSync(pillarSrc, 'utf8');
if (!pillarContent.includes(`SLUG = 'architectural-glass-applications-guide'`)) {
  console.error('[fix1] source file does NOT contain the Pillar SLUG — refusing to copy.');
  console.error(`[fix1] file: ${pillarSrc}`);
  console.error('[fix1] this is probably the wrong file. Download page-article-12-pillar.tsx and try again.');
  process.exit(1);
}

fs.mkdirSync(path.dirname(PILLAR_TARGET), { recursive: true });
fs.writeFileSync(PILLAR_TARGET, pillarContent, 'utf8');
console.log(`[fix1] wrote correct Pillar page.tsx → ${PILLAR_TARGET}`);

// ─── Fix 2: patch blog listing hero selection ──────────────────────────
const LISTING_PATH = path.join(ROOT, 'src', 'app', 'blog', 'page.tsx');

if (!fs.existsSync(LISTING_PATH)) {
  console.error(`[fix2] blog listing not found: ${LISTING_PATH}`);
  process.exit(1);
}

let listingTxt = fs.readFileSync(LISTING_PATH, 'utf8');

// Replace exactly this line:
//   const featured = !clusterFilter ? getFeaturedArticle() : filtered[0];
// With Pillar-preferred selection:
//   const featured = !clusterFilter ? getFeaturedArticle() : (filtered.find(a => a.isPillar) || filtered[0]);
const OLD = `const featured = !clusterFilter ? getFeaturedArticle() : filtered[0];`;
const NEW = `const featured = !clusterFilter ? getFeaturedArticle() : (filtered.find(a => a.isPillar) || filtered[0]);`;

if (listingTxt.includes(NEW)) {
  console.log('[fix2] blog listing already patched — no change needed');
} else if (!listingTxt.includes(OLD)) {
  console.error('[fix2] could not find the hero-selection line verbatim.');
  console.error('[fix2] find this line in src/app/blog/page.tsx and change it manually:');
  console.error('       ' + OLD);
  console.error('[fix2] to:');
  console.error('       ' + NEW);
  process.exit(1);
} else {
  listingTxt = listingTxt.replace(OLD, NEW);
  fs.writeFileSync(LISTING_PATH, listingTxt, 'utf8');
  console.log('[fix2] patched blog listing — Pillar now wins the hero slot in cluster view');
}

console.log('');
console.log('[done] Both fixes applied. Next: npm run build + commit + push.');
