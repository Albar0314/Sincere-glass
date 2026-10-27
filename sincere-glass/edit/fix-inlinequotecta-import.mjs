// fix-inlinequotecta-import.mjs
// Corrects the InlineQuoteCTA import path in Article #20 and the Curved
// Tempered Glass product page. Actual path on disk is
// src/components/products/InlineQuoteCTA.tsx (not top-level).
//
// Usage from project root:
//   node edit\\fix-inlinequotecta-import.mjs

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();

const WRONG = `from '@/components/InlineQuoteCTA'`;
const RIGHT = `from '@/components/products/InlineQuoteCTA'`;

const TARGETS = [
  join(ROOT, 'src', 'app', 'products', 'curved-tempered-glass', 'page.tsx'),
  join(ROOT, 'src', 'app', 'blog', 'curved-tempered-glass-vs-flat-tempered-glass', 'page.tsx'),
];

let fixed = 0;
let skipped = 0;

for (const file of TARGETS) {
  if (!existsSync(file)) {
    console.log(`⚠ Not found, skipping: ${file}`);
    skipped++;
    continue;
  }
  const src = readFileSync(file, 'utf8');
  if (!src.includes(WRONG)) {
    console.log(`⚠ No wrong import found in ${file} (already fixed?)`);
    skipped++;
    continue;
  }
  const next = src.replace(WRONG, RIGHT);
  writeFileSync(file, next, 'utf8');
  console.log(`✓ Fixed import in ${file}`);
  fixed++;
}

console.log('');
console.log(`Done. Fixed: ${fixed}, Skipped: ${skipped}.`);
console.log('Run: npm run build  (or just push and let Vercel rebuild)');
