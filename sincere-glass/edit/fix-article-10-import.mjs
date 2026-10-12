// fix-article-10-import.mjs
// Removes the broken `makeAlternates` import and alternates override from
// article #10. BlogArticleLayout.generateArticleMetadata() already handles
// hreflang via hreflangAlternates — the override was redundant.
//
// Run from project root:
//   node edit\fix-article-10-import.mjs

import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const PAGE_PATH = path.join(
  PROJECT_ROOT,
  'src', 'app', 'blog', 'shower-glass-thickness-guide', 'page.tsx'
);

if (!fs.existsSync(PAGE_PATH)) {
  console.error(`✗ Page not found: ${PAGE_PATH}`);
  process.exit(1);
}

let src = fs.readFileSync(PAGE_PATH, 'utf8');
const before = src;

// 1. Remove the broken import line.
src = src.replace(
  /\nimport\s*\{\s*makeAlternates\s*\}\s*from\s*['"]@\/lib\/hreflang['"];?/g,
  ''
);

// 2. Replace the metadata override that uses makeAlternates with the
//    unmodified generateArticleMetadata() result.
src = src.replace(
  /export const metadata: Metadata = \{\s*\.\.\.generateArticleMetadata\(article\),\s*alternates:\s*makeAlternates\(`\/blog\/\$\{SLUG\}`\),\s*\};/,
  'export const metadata: Metadata = generateArticleMetadata(article);'
);

if (src === before) {
  console.log('⚠ No changes applied — file may already be patched or shape differs.');
  console.log('  Verify the file manually.');
  process.exit(0);
}

fs.writeFileSync(PAGE_PATH, src, 'utf8');
console.log(`✓ Patched: ${path.relative(PROJECT_ROOT, PAGE_PATH)}`);
console.log('  - Removed broken `makeAlternates` import');
console.log('  - Replaced metadata override with plain `generateArticleMetadata(article)`');
console.log('\nNext: npm run build  (should pass now)');
