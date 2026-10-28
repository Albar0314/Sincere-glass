// fix-article-22-link-import.mjs
// Fixes the Vercel build failure from deploy-article-22-hst.mjs:
//   "Cannot find name 'Link'" in src/app/blog/jumbo-architectural-glass-panels/page.tsx
//
// Root cause: the deploy script inserted a <Link> JSX element into the reciprocal
// link paragraph, but that page did not import Link. (The how-is-tempered-glass-made
// page already had a Link import, so it compiled fine.)
//
// This fix script:
//   1. Scans the two reciprocal-link target pages
//   2. If GROK-INSERT-V1:hst marker is present AND no Link import found,
//      adds `import Link from "@/components/LocalizedLink";` after the last
//      existing import line (matches project convention per 2026-10-12 i18n rollout)
//   3. Idempotent — re-run safely
//
// Usage from project root (D:\桌面\sincere-glass\sincere-glass\):
//   node edit\fix-article-22-link-import.mjs
//
// After this, re-run: npm run build

import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const PATCH_MARK = 'GROK-INSERT-V1:hst';
const LINK_IMPORT = `import Link from "@/components/LocalizedLink";`;

const targets = [
  join(ROOT, 'src', 'app', 'blog', 'jumbo-architectural-glass-panels', 'page.tsx'),
  join(ROOT, 'src', 'app', 'blog', 'how-is-tempered-glass-made', 'page.tsx'),
];

let fixed = 0;
let alreadyOk = 0;
let notPatched = 0;

for (const page of targets) {
  if (!existsSync(page)) {
    console.log(`\u26a0 Not found: ${page}`);
    continue;
  }

  const src = readFileSync(page, 'utf8');

  if (!src.includes(PATCH_MARK)) {
    console.log(`\u00b7 No ${PATCH_MARK} in ${page} — skipping (not a reciprocal target)`);
    notPatched++;
    continue;
  }

  // Check if Link is already imported (any form)
  const hasLinkImport =
    /import\s+Link\s+from\s+['"][^'"]+['"]/.test(src) ||
    /import\s+\{[^}]*\bLink\b[^}]*\}\s+from\s+['"][^'"]+['"]/.test(src);

  if (hasLinkImport) {
    console.log(`\u2713 ${page} already imports Link — OK`);
    alreadyOk++;
    continue;
  }

  // Find the last existing top-level import line to anchor after it.
  // Matches: lines starting with `import ... from '...';` at column 0, before the first non-import line.
  const importLineRegex = /^import\s+[^;]+?from\s+['"][^'"]+['"];?\s*$/gm;
  let lastImportEnd = 0;
  let m;
  while ((m = importLineRegex.exec(src)) !== null) {
    // Only count imports in the top region (before any `export` or non-import code block)
    const upTo = src.slice(0, m.index);
    if (/^\s*(export\s|function\s|const\s|let\s|class\s)/m.test(upTo.split('\n').slice(-1)[0] || '')) break;
    lastImportEnd = m.index + m[0].length;
  }

  if (lastImportEnd === 0) {
    console.error(`\u2717 Could not find any import lines in ${page} — manual fix needed`);
    continue;
  }

  // Backup, then insert the Link import after the last import line.
  copyFileSync(page, page + '.bak2');
  const next = src.slice(0, lastImportEnd) + '\n' + LINK_IMPORT + src.slice(lastImportEnd);
  writeFileSync(page, next, 'utf8');

  console.log(`\u2713 Added Link import to ${page}`);
  console.log(`  (backup written to ${page}.bak2)`);
  fixed++;
}

console.log('');
console.log('\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501');
console.log(`Fixed: ${fixed}  |  Already OK: ${alreadyOk}  |  Not patched: ${notPatched}`);
console.log('');
console.log('Next: npm run build');
console.log('\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501');
