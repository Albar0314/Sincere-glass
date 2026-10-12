// fix2-restore-make-alternates.mjs
// Reverses fix1's over-aggressive removal: restores the makeAlternates import
// (from the correct path src/lib/i18n, not hreflang) and the alternates
// override so translate-all.mjs's injectLocaleIntoMakeAlternates Babel pass
// can inject the locale param into the ES mirror and give it a self-canonical.
//
// Run from project root:
//   node edit\fix2-restore-make-alternates.mjs

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

// Guard: skip if already patched.
if (src.includes("from '@/lib/i18n'") && src.includes('makeAlternates(`/blog/')) {
  console.log('⚠ Looks already patched — no changes applied.');
  process.exit(0);
}

// 1. Add `import { makeAlternates } from '@/lib/i18n';` right after the
//    hreflang/blog-registry import block. We anchor on the existing
//    BlogArticleLayout import which is always present.
const importAnchor = /(import BlogArticleLayout,[\s\S]*?from '@\/components\/blog\/BlogArticleLayout';\n)/;
if (!importAnchor.test(src)) {
  console.error('✗ Could not find BlogArticleLayout import anchor.');
  process.exit(1);
}
src = src.replace(
  importAnchor,
  `$1import { makeAlternates } from '@/lib/i18n';\n`
);

// 2. Replace `export const metadata: Metadata = generateArticleMetadata(article);`
//    with the override-form that calls makeAlternates.
const metadataLine = /export const metadata: Metadata = generateArticleMetadata\(article\);/;
if (!metadataLine.test(src)) {
  console.error('✗ Could not find simple metadata assignment to replace.');
  console.error('  The file may have been manually edited — resolve by hand.');
  process.exit(1);
}
src = src.replace(
  metadataLine,
  `export const metadata: Metadata = {\n  ...generateArticleMetadata(article),\n  alternates: makeAlternates(\`/blog/\${SLUG}\`),\n};`
);

if (src === before) {
  console.log('⚠ No changes applied — file content unchanged.');
  process.exit(0);
}

fs.writeFileSync(PAGE_PATH, src, 'utf8');
console.log(`✓ Patched: ${path.relative(PROJECT_ROOT, PAGE_PATH)}`);
console.log("  - Added `import { makeAlternates } from '@/lib/i18n';`");
console.log('  - Restored `alternates: makeAlternates(`/blog/${SLUG}`)` metadata override');
console.log('');
console.log('Why this matters:');
console.log('  * EN build now resolves the import correctly (makeAlternates lives in i18n.ts, not hreflang.ts).');
console.log('  * When scripts/translate-all.mjs mirrors this page to src/app/es/blog/...,');
console.log('    its injectLocaleIntoMakeAlternates Babel pass will inject the locale arg,');
console.log('    giving the ES mirror a self-referential canonical (/es/blog/...) instead of');
console.log('    pointing back at the EN original (which would trip the GSC "not indexable" bug).');
console.log('');
console.log('Next: npm run build  → should pass.');
console.log('      Then: git add . && git commit && push.');
console.log('      Then (optionally, when ready for ES): node scripts/translate-all.mjs');
