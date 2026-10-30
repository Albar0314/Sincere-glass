import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const EDIT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(EDIT_DIR);
const MARKER = 'TEST-REPORT-DOWNLOAD-V1';

// 1. Create the component
const componentPath = join(ROOT, 'src/components/TestReportDownload.tsx');
const componentDir = dirname(componentPath);
if (!existsSync(componentDir)) mkdirSync(componentDir, { recursive: true });
if (existsSync(componentPath)) copyFileSync(componentPath, componentPath + '.bak');
writeFileSync(componentPath, readFileSync(join(EDIT_DIR, 'test-report-download.tsx.txt')));
console.log(`✓ src/components/TestReportDownload.tsx`);

// 2. Verify manifest exists
const manifestPath = join(ROOT, 'src/lib/test-reports-manifest.json');
if (!existsSync(manifestPath)) {
  console.error(`! Manifest missing: ${manifestPath}`);
  process.exit(1);
}

// 3. Patch 4 product pages
const products = [
  { file: 'src/app/products/tempered-glass/page.tsx',  bucket: 'tempered' },
  { file: 'src/app/products/laminated-glass/page.tsx', bucket: 'laminated' },
  { file: 'src/app/products/insulated-glass/page.tsx', bucket: 'insulated' },
  { file: 'src/app/products/low-e-glass/page.tsx',     bucket: 'lowE' },
];

for (const p of products) {
  const abs = join(ROOT, p.file);
  if (!existsSync(abs)) { console.warn(`! Skip (not found): ${p.file}`); continue; }

  let src = readFileSync(abs, 'utf8');
  if (src.includes(MARKER)) { console.log(`- ${p.file} already patched, skip`); continue; }

  // Backup
  copyFileSync(abs, abs + '.bak');

  // Add import after last existing import line
  const importStatement = `import TestReportDownload from "@/components/TestReportDownload";`;
  if (!src.includes(importStatement)) {
    const importRegex = /^(import[^;]+;)/gm;
    const matches = [...src.matchAll(importRegex)];
    if (matches.length === 0) {
      console.warn(`! ${p.file}: no imports found, skip`);
      continue;
    }
    const last = matches[matches.length - 1];
    const insertAt = last.index + last[0].length;
    src = src.slice(0, insertAt) + '\n' + importStatement + src.slice(insertAt);
  }

  // Insert the JSX before FAQ or SocialProof or end of main return
  // Try multiple anchors, each a complete JSX line
  const jsxBlock = `\n      {/* ${MARKER} */}\n      <TestReportDownload bucket="${p.bucket}" />\n`;
  const anchors = [
    /(\n\s*<FAQ\b)/,
    /(\n\s*<SocialProof\b)/,
    /(\n\s*<InlineQuoteCTA\b(?![\s\S]*<InlineQuoteCTA))/, // last InlineQuoteCTA
  ];
  let inserted = false;
  for (const re of anchors) {
    if (re.test(src)) {
      src = src.replace(re, jsxBlock + '$1');
      inserted = true;
      console.log(`✓ ${p.file} (anchor: ${re.source.slice(0, 30)}...)`);
      break;
    }
  }
  if (!inserted) {
    console.warn(`! ${p.file}: no JSX anchor matched, skip`);
    continue;
  }

  writeFileSync(abs, src);
}

console.log(`\n✓ Phase B done. Now run:`);
console.log(`  npm run build`);