// edit/patch-cleanup-i18n.mjs
// Clean up the leftover orphan function body in src/lib/i18n.ts caused by
// the previous patch's regex matching only the signature, not the full function.
//
// Usage: node edit\patch-cleanup-i18n.mjs

import fs from 'fs';
import path from 'path';

const i18nPath = path.resolve('src/lib/i18n.ts');
let content = fs.readFileSync(i18nPath, 'utf-8');
const original = content;

// Find and remove orphan body
// Pattern: end of correct new function `};\n}` followed by stray ` {\n const languages...` orphan body
// The orphan is uniquely identifiable because it contains `canonical: SITE_URL + canonicalPath,`
// (without the localizedPath wrapper that the new version has)

const orphanPattern = /(\};\s*\n\})\s*\{\s*const languages: Record<string, string> = \{\};[\s\S]*?canonical:\s*SITE_URL\s*\+\s*canonicalPath,[\s\S]*?\};\s*\n\}/;

if (!orphanPattern.test(content)) {
  // Try an alternate pattern — maybe formatting differs
  const altPattern = /(\n\})\s*\{\s*const languages[\s\S]*?SITE_URL\s*\+\s*canonicalPath[\s\S]*?\};\s*\n\}/;
  if (!altPattern.test(content)) {
    console.log('ℹ️  No orphan detected. File may already be clean.');
    console.log('    If build still fails, paste lines 60-120 of src/lib/i18n.ts to me.');
    process.exit(0);
  }
  content = content.replace(altPattern, '$1');
  console.log('✅ Removed orphan body (matched alternate pattern)');
} else {
  content = content.replace(orphanPattern, '$1');
  console.log('✅ Removed orphan body');
}

if (content === original) {
  console.log('ℹ️  No changes made');
} else {
  fs.writeFileSync(i18nPath, content, 'utf-8');
  console.log(`✅ Saved: src/lib/i18n.ts`);
}

console.log(`
下一步:
1. npm run build (应该通过)
2. 如果还是报错, 把 src/lib/i18n.ts 第 50-110 行贴给我
`);
