// analyze-product-pages.mjs
// Read-only inspector: dumps structure of the 5 product pages so Claude
// can design a video-insert patch without guessing anchors.
//
// Usage from project root (D:\桌面\sincere-glass\sincere-glass\):
//   node analyze-product-pages.mjs > product-pages-report.txt
//
// Then paste the contents of product-pages-report.txt back to Claude.

import { readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();

const TARGETS = [
  ['tempered-glass',         'src/app/products/tempered-glass/page.tsx'],
  ['curved-tempered-glass',  'src/app/products/curved-tempered-glass/page.tsx'],
  ['laminated-glass',        'src/app/products/laminated-glass/page.tsx'],
  ['insulated-glass',        'src/app/products/insulated-glass/page.tsx'],
  ['products-hub',           'src/app/products/page.tsx'],
];

// Components we care about locating as potential anchors
const INTERESTING_COMPONENTS = [
  'YouTubeEmbed', 'VideoSchema', 'FactoryBrollLoop',
  'ApplicationShowcase', 'CurvedApplicationShowcase',
  'Specs', 'SpecsTable', 'ProductSpecs',
  'FAQ', 'FaqSection', 'ProductFAQ',
  'RelatedProductsCards', 'RelatedProducts',
  'Hero', 'ProductHero',
  'CTA', 'InlineQuoteCTA', 'QuoteCTA', 'LeadMagnetCTA',
  'TLDRBox',
  'RadiusEnvelopeExplorer', 'BendingProductionTimeline',
];

function detectEOL(raw) {
  if (raw.includes('\r\n')) return 'CRLF';
  if (raw.includes('\n')) return 'LF';
  return 'NONE';
}

function stripBOM(s) {
  return s.charCodeAt(0) === 0xFEFF ? s.slice(1) : s;
}

function analyze(slug, relPath) {
  const abs = join(ROOT, relPath);
  console.log('\n' + '='.repeat(72));
  console.log(`SLUG: ${slug}`);
  console.log(`PATH: ${relPath}`);
  console.log('='.repeat(72));

  if (!existsSync(abs)) {
    console.log('STATUS: FILE_NOT_FOUND');
    return;
  }

  const st = statSync(abs);
  const rawBuf = readFileSync(abs);
  const raw = stripBOM(rawBuf.toString('utf8'));
  const eol = detectEOL(raw);
  const lines = raw.split(/\r?\n/);

  console.log(`STATUS: OK`);
  console.log(`SIZE: ${st.size} bytes`);
  console.log(`LINES: ${lines.length}`);
  console.log(`EOL: ${eol}`);
  console.log(`BOM: ${rawBuf[0] === 0xEF && rawBuf[1] === 0xBB && rawBuf[2] === 0xBF ? 'yes' : 'no'}`);

  // ---- Imports ----
  console.log('\n--- IMPORTS ---');
  const importLines = [];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/^\s*import\s/.test(l) || (importLines.length && /^\s*['"]/.test(l) === false && /from\s+['"]/.test(l) === false && importLines[importLines.length - 1].continued)) {
      importLines.push({ idx: i, text: l });
    }
    if (/^\s*(export|const|function|async|interface|type|return)\b/.test(l) && importLines.length > 0) break;
  }
  importLines.forEach(x => console.log(`  L${x.idx + 1}: ${x.text}`));

  // Flag whether video components already imported
  const hasYouTubeEmbed = /from\s+['"]@?\/?components\/YouTubeEmbed['"]/.test(raw) || /import\s+YouTubeEmbed\b/.test(raw);
  const hasVideoSchema  = /from\s+['"]@?\/?components\/VideoSchema['"]/.test(raw) || /import\s+VideoSchema\b/.test(raw);
  console.log(`\nALREADY_HAS_YouTubeEmbed_IMPORT: ${hasYouTubeEmbed}`);
  console.log(`ALREADY_HAS_VideoSchema_IMPORT: ${hasVideoSchema}`);

  // Flag if any <YouTubeEmbed or <VideoSchema already used (shipped?)
  console.log(`ALREADY_RENDERS_YouTubeEmbed: ${/<YouTubeEmbed\b/.test(raw)}`);
  console.log(`ALREADY_RENDERS_VideoSchema: ${/<VideoSchema\b/.test(raw)}`);
  console.log(`ALREADY_RENDERS_FactoryBrollLoop: ${/<FactoryBrollLoop\b/.test(raw)}`);

  // ---- Interesting component usages (line numbers) ----
  console.log('\n--- INTERESTING COMPONENT USAGES ---');
  for (const comp of INTERESTING_COMPONENTS) {
    const openRe = new RegExp(`<${comp}\\b`);
    const hits = [];
    for (let i = 0; i < lines.length; i++) {
      if (openRe.test(lines[i])) hits.push(i + 1);
    }
    if (hits.length) {
      console.log(`  ${comp}: lines ${hits.join(', ')}`);
    }
  }

  // ---- Top-level JSX sections (heuristic: lines where <section or <main or <div className="...py- starts at indent 4-8) ----
  console.log('\n--- TOP-LEVEL JSX SECTIONS (heuristic) ---');
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/^\s{0,8}<(section|main|article|div)\b/.test(l) && l.includes('className')) {
      console.log(`  L${i + 1}: ${l.trim().slice(0, 140)}`);
    }
  }

  // ---- Return statement location (so we know where JSX body starts) ----
  console.log('\n--- RETURN / JSX ROOT ---');
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*return\s*\(/.test(lines[i])) {
      console.log(`  L${i + 1}: ${lines[i].trim()}`);
      // Print next 3 lines for context
      for (let j = 1; j <= 3 && i + j < lines.length; j++) {
        console.log(`  L${i + 1 + j}: ${lines[i + j].trim().slice(0, 140)}`);
      }
      break;
    }
  }

  // ---- Closing structure: last 12 non-empty lines ----
  console.log('\n--- LAST 12 NON-EMPTY LINES ---');
  const nonEmpty = lines.map((t, i) => ({ t, i })).filter(x => x.t.trim().length > 0);
  nonEmpty.slice(-12).forEach(x => console.log(`  L${x.i + 1}: ${x.t.slice(0, 140)}`));
}

console.log(`# product pages structure report`);
console.log(`# generated at: ${new Date().toISOString()}`);
console.log(`# root: ${ROOT}`);

for (const [slug, relPath] of TARGETS) {
  try {
    analyze(slug, relPath);
  } catch (e) {
    console.log(`\nERROR analyzing ${slug}: ${e.message}`);
  }
}

// Also check whether the video components exist on disk (sanity)
console.log('\n' + '='.repeat(72));
console.log('VIDEO COMPONENTS ON DISK');
console.log('='.repeat(72));
for (const comp of ['src/components/YouTubeEmbed.tsx', 'src/components/VideoSchema.tsx', 'src/components/FactoryBrollLoop.tsx']) {
  const abs = join(ROOT, comp);
  console.log(`  ${comp}: ${existsSync(abs) ? 'EXISTS' : 'MISSING'}`);
}
