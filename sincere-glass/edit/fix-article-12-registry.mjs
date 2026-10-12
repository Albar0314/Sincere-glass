// fix-article-12-registry.mjs
// Fixes the unescaped apostrophe in architect's inside the buyerFaq string literal.
// Run from project root:  node edit\fix-article-12-registry.mjs

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const REGISTRY_PATH = path.join(ROOT, 'src', 'lib', 'blog-registry.ts');

if (!fs.existsSync(REGISTRY_PATH)) {
  console.error(`[fix] registry not found: ${REGISTRY_PATH}`);
  process.exit(1);
}

let txt = fs.readFileSync(REGISTRY_PATH, 'utf8');

const BROKEN_Q = `q: 'Can you work from an architect's drawing set directly, or do you need a glass schedule?',`;
const FIXED_Q = `q: "Can you work from an architect's drawing set directly, or do you need a glass schedule?",`;

if (!txt.includes(BROKEN_Q)) {
  if (txt.includes(FIXED_Q)) {
    console.log('[fix] already fixed — no change needed');
    process.exit(0);
  }
  console.error('[fix] could not find the broken line verbatim — manual edit needed');
  console.error('[fix] find this line in src/lib/blog-registry.ts:');
  console.error('      q: \'Can you work from an architect\'s drawing set directly, or do you need a glass schedule?\',');
  console.error('[fix] and change the outer quotes from single to double quotes.');
  process.exit(1);
}

txt = txt.replace(BROKEN_Q, FIXED_Q);
fs.writeFileSync(REGISTRY_PATH, txt, 'utf8');
console.log('[fix] patched broken apostrophe in buyerFaq');
console.log('[fix] now run `npm run build` to verify');
