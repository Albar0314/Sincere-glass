// patch-product-video-schema.mjs
// (1) Adds <VideoSchema> JSON-LD next to each existing <YouTubeEmbed> on the 4
//     product pages (tempered / curved-tempered / laminated / insulated).
// (2) Inserts an "Our Production Lines" 3-column video section + 3 VideoSchema
//     into the /products hub page.
//
// Idempotent via marker SG-PRODUCT-VIDEO-SCHEMA-V1. Safe to re-run.
// Writes <file>.bak next to each modified file before changing it.
//
// Usage from project root (D:\桌面\sincere-glass\sincere-glass\):
//   node patch-product-video-schema.mjs
//
// After success, run `npm run build` (per project SOP — don't batch).

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const MARKER = 'SG-PRODUCT-VIDEO-SCHEMA-V1';

// ---------- helpers ----------
function detectEOL(raw) { return raw.includes('\r\n') ? '\r\n' : '\n'; }
function stripBOM(s) { return s.charCodeAt(0) === 0xFEFF ? s.slice(1) : s; }
function log(msg) { console.log(msg); }
function backup(abs, raw) {
  const bak = abs + '.bak';
  if (!existsSync(bak)) {
    writeFileSync(bak, raw, 'utf8');
    log(`  wrote backup: ${bak.replace(ROOT, '')}`);
  } else {
    log(`  backup already exists (keeping older): ${bak.replace(ROOT, '')}`);
  }
}
function read(relPath) {
  const abs = join(ROOT, relPath);
  if (!existsSync(abs)) throw new Error(`MISSING: ${relPath}`);
  const raw = stripBOM(readFileSync(abs, 'utf8'));
  return { abs, raw, eol: detectEOL(raw) };
}

// ---------- video metadata ----------
// All videos uploaded 2026-11-03 to YouTube @XinchenGlass; duration PT20S approx.
const VIDEOS = {
  expE_icthfo: {
    name: 'Tempering furnace in operation',
    desc: 'Sincere Glass tempering furnace heating and air-quenching architectural glass panels at the Wuhan facility.',
  },
  FUGOpDGbca0: {
    name: 'Bending-tempering line in operation',
    desc: 'Single-axis curved tempered glass being formed on the mold at Sincere Glass Wuhan factory.',
  },
  'Ct-LqD0WTVg': {
    name: 'Curved tempered panels in finished-goods inventory',
    desc: 'Finished curved tempered glass panels staged for shipment at Sincere Glass Wuhan facility.',
  },
  inNYYEAnWOo: {
    name: 'Laminating autoclave in operation',
    desc: 'Laminated glass production - PVB and SGP interlayer bonding in the autoclave at Sincere Glass Wuhan.',
  },
  qcSV4WG8nL0: {
    name: 'Dual-seal insulated glass production line',
    desc: 'Insulated glass unit assembly on the dual-seal production line at Sincere Glass Wuhan.',
  },
  YLkfJbK1XpA: {
    name: 'Glass cutting line',
    desc: 'Architectural glass cutting line at Sincere Glass Wuhan 20,000 sqm facility.',
  },
  '1XwGWynxkJE': {
    name: 'Edge grinding line',
    desc: 'Precision edge grinding and polishing line at Sincere Glass Wuhan factory.',
  },
  SiFnUYgcjqQ: {
    name: 'Finished-goods warehouse',
    desc: 'Finished architectural glass panels staged for shipment at Sincere Glass Wuhan factory.',
  },
};

function videoSchemaTag(id) {
  const v = VIDEOS[id];
  if (!v) throw new Error(`No VIDEOS entry for ${id}`);
  return `<VideoSchema videoId="${id}" name="${v.name}" description="${v.desc}" uploadDate="2026-11-03" duration="PT20S" />`;
}

// ---------- Part 1: 4 product pages — add import + inject VideoSchema per YouTubeEmbed ----------
const PRODUCT_PAGES = [
  { relPath: 'src/app/products/tempered-glass/page.tsx',       videoIds: ['expE_icthfo'] },
  { relPath: 'src/app/products/curved-tempered-glass/page.tsx', videoIds: ['FUGOpDGbca0', 'Ct-LqD0WTVg'] },
  { relPath: 'src/app/products/laminated-glass/page.tsx',       videoIds: ['inNYYEAnWOo'] },
  { relPath: 'src/app/products/insulated-glass/page.tsx',       videoIds: ['qcSV4WG8nL0'] },
];

function patchProductPage(target) {
  log(`\n> ${target.relPath}`);
  const { abs, raw, eol } = read(target.relPath);

  if (raw.includes(MARKER)) {
    log('  SKIP (marker already present)');
    return;
  }

  let out = raw;

  // 1. Add VideoSchema import right after the existing YouTubeEmbed import line
  const importRe = /^(import\s+YouTubeEmbed\s+from\s+["']@\/components\/YouTubeEmbed["'];?)\s*$/m;
  if (!importRe.test(out)) {
    log('  ERROR: YouTubeEmbed import line not found - skipping');
    return;
  }
  out = out.replace(importRe, (m, line) => `${line}${eol}import VideoSchema from "@/components/VideoSchema";`);

  // 2. For each videoId on this page, insert <VideoSchema .../> on a new line
  //    right after the <YouTubeEmbed videoId="ID" ... /> invocation, same indent.
  let injected = 0;
  for (const id of target.videoIds) {
    // Escape id for regex (hyphens are fine, no special meta here but be safe)
    const idEsc = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Capture leading whitespace + the full YouTubeEmbed self-closing tag line
    const re = new RegExp(`([ \\t]*)(<YouTubeEmbed\\s+videoId="${idEsc}"[^>]*/>)`);
    const match = out.match(re);
    if (!match) {
      log(`  WARN: YouTubeEmbed for ${id} not found`);
      continue;
    }
    const indent = match[1];
    const inserted = `${match[0]}${eol}${indent}${videoSchemaTag(id)} {/* ${MARKER} */}`;
    out = out.replace(re, () => inserted);
    injected++;
  }

  if (injected === 0) {
    log('  SKIP (no YouTubeEmbed matches injected)');
    return;
  }

  backup(abs, raw);
  writeFileSync(abs, out, 'utf8');
  log(`  OK: added VideoSchema import + injected ${injected} <VideoSchema> tag(s)`);
}

// ---------- Part 2: /products hub — add imports + insert video section + 3 schema ----------
function patchProductsHub() {
  const relPath = 'src/app/products/page.tsx';
  log(`\n> ${relPath}`);
  const { abs, raw, eol } = read(relPath);

  if (raw.includes(MARKER)) {
    log('  SKIP (marker already present)');
    return;
  }

  let out = raw;

  // 1. Add YouTubeEmbed + VideoSchema imports after existing makeAlternates import
  const importAnchor = /(import\s+\{\s*makeAlternates\s*\}\s+from\s+["']@\/lib\/i18n["'];?)/;
  if (!importAnchor.test(out)) {
    log('  ERROR: makeAlternates import not found - skipping');
    return;
  }
  out = out.replace(
    importAnchor,
    (m, line) =>
      `${line}${eol}import YouTubeEmbed from "@/components/YouTubeEmbed";${eol}import VideoSchema from "@/components/VideoSchema";`
  );

  // 2. Insert production-video section + 3 VideoSchema tags BEFORE the first
  //    "py-16 md:py-24 bg-brand-lighter" section (which is the product grid).
  const sectionAnchor = /([ \t]*)(<section\s+className="py-16 md:py-24 bg-brand-lighter">)/;
  const anchorMatch = out.match(sectionAnchor);
  if (!anchorMatch) {
    log('  ERROR: product-grid section anchor not found - skipping');
    return;
  }
  const indent = anchorMatch[1];
  const I = indent;        // outer indent (matches <section>)
  const I2 = indent + '  '; // +1
  const I3 = indent + '    '; // +2
  const I4 = indent + '      '; // +3

  const block =
    `${I}{/* ${MARKER} production-video section */}${eol}` +
    `${I}<section className="py-16 md:py-20 bg-brand-dark border-t border-white/10">${eol}` +
    `${I2}<div className="max-w-7xl mx-auto px-6 md:px-12">${eol}` +
    `${I3}<div className="text-center mb-10">${eol}` +
    `${I4}<p className="text-xs text-brand-accent font-semibold uppercase tracking-wider mb-3">Inside our facility</p>${eol}` +
    `${I4}<h2 className="font-display text-2xl md:text-3xl font-bold text-white">Our production lines</h2>${eol}` +
    `${I4}<p className="mt-3 text-white/60 max-w-2xl mx-auto">Cutting, edge grinding, and finished-goods staging in our 20,000 sqm Wuhan plant.</p>${eol}` +
    `${I3}</div>${eol}` +
    `${I3}<div className="grid grid-cols-1 md:grid-cols-3 gap-6">${eol}` +
    `${I4}<div>${eol}` +
    `${I4}  <YouTubeEmbed videoId="YLkfJbK1XpA" title="Glass cutting line" aspectRatio="16/9" />${eol}` +
    `${I4}  <p className="mt-3 text-sm text-white/80 font-semibold">Cutting line</p>${eol}` +
    `${I4}  <p className="text-xs text-white/50">CNC and manual cutting to project dimensions</p>${eol}` +
    `${I4}</div>${eol}` +
    `${I4}<div>${eol}` +
    `${I4}  <YouTubeEmbed videoId="1XwGWynxkJE" title="Edge grinding line" aspectRatio="16/9" />${eol}` +
    `${I4}  <p className="mt-3 text-sm text-white/80 font-semibold">Edge grinding line</p>${eol}` +
    `${I4}  <p className="text-xs text-white/50">Precision polished edges before tempering</p>${eol}` +
    `${I4}</div>${eol}` +
    `${I4}<div>${eol}` +
    `${I4}  <YouTubeEmbed videoId="SiFnUYgcjqQ" title="Finished-goods warehouse" aspectRatio="16/9" />${eol}` +
    `${I4}  <p className="mt-3 text-sm text-white/80 font-semibold">Finished-goods warehouse</p>${eol}` +
    `${I4}  <p className="text-xs text-white/50">Panels staged and crated for worldwide shipping</p>${eol}` +
    `${I4}</div>${eol}` +
    `${I3}</div>${eol}` +
    `${I2}</div>${eol}` +
    `${I}</section>${eol}` +
    `${I}${videoSchemaTag('YLkfJbK1XpA')}${eol}` +
    `${I}${videoSchemaTag('1XwGWynxkJE')}${eol}` +
    `${I}${videoSchemaTag('SiFnUYgcjqQ')}${eol}` +
    `${eol}`;

  out = out.replace(
    sectionAnchor,
    () => block + `${indent}<section className="py-16 md:py-24 bg-brand-lighter">`
  );

  backup(abs, raw);
  writeFileSync(abs, out, 'utf8');
  log('  OK: added imports + production-video section + 3 <VideoSchema> tags');
}

// ---------- run ----------
log(`# patch-product-video-schema.mjs`);
log(`# marker: ${MARKER}`);
log(`# root:   ${ROOT}`);

for (const p of PRODUCT_PAGES) {
  try { patchProductPage(p); } catch (e) { log(`  FAIL: ${e.message}`); }
}
try { patchProductsHub(); } catch (e) { log(`  FAIL: ${e.message}`); }

log(`\nDone. Next: npm run build`);
