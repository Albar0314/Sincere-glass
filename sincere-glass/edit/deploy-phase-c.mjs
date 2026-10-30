import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const EDIT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(EDIT_DIR);
const MARKER = 'CERT-STRIP-V1';

function backup(p) { if (existsSync(p)) copyFileSync(p, p + '.bak'); }

// --- 1. Create CertificationStrip component (EN + ES mirror) ---
const stripSrc = readFileSync(join(EDIT_DIR, 'certification-strip.tsx.txt'), 'utf8');
const enStrip = join(ROOT, 'src/components/home/CertificationStrip.tsx');
backup(enStrip);
writeFileSync(enStrip, stripSrc);
console.log(`✓ ${enStrip.replace(ROOT, '')}`);

const esStripDir = join(ROOT, 'src/_i18n/es/components/home');
if (existsSync(esStripDir)) {
  const esStrip = join(esStripDir, 'CertificationStrip.tsx');
  backup(esStrip);
  // ES mirror uses same code (links auto-prefix via LocalizedLink); copy as-is
  writeFileSync(esStrip, stripSrc);
  console.log(`✓ ${esStrip.replace(ROOT, '')}`);
}

// --- 2. Patch Header: add "certifications" to navLinks (EN + ES) ---
const headers = [
  join(ROOT, 'src/components/Header.tsx'),
  join(ROOT, 'src/_i18n/es/components/Header.tsx'),
];
for (const hp of headers) {
  if (!existsSync(hp)) { console.warn(`! Header not found: ${hp.replace(ROOT,'')}`); continue; }
  let src = readFileSync(hp, 'utf8');
  if (src.includes(MARKER) || src.includes('"certifications"')) {
    console.log(`- ${hp.replace(ROOT,'')} already has certifications nav`); continue;
  }
  backup(hp);
  // Anchor: the line with { key: "blog", href: "/blog" }, — insert after
  const anchor = `  { key: "blog",      href: "/blog" },`;
  const insert = `  { key: "blog",      href: "/blog" },\n  { key: "certifications", href: "/certifications" }, // ${MARKER}`;
  if (src.includes(anchor)) {
    src = src.replace(anchor, insert);
    writeFileSync(hp, src);
    console.log(`✓ ${hp.replace(ROOT,'')} (nav patched)`);
  } else {
    console.warn(`! ${hp.replace(ROOT,'')}: blog anchor not found, skip`);
  }
}

// --- 3. Patch i18n dict: add nav.certifications EN + ES ---
const dictPatches = [
  { file: 'src/lib/dict.en.json', value: 'Certifications' },
  { file: 'src/lib/dict.es.json', value: 'Certificaciones' },
  { file: 'src/lib/i18n/en.json', value: 'Certifications' },
  { file: 'src/lib/i18n/es.json', value: 'Certificaciones' },
  { file: 'src/dict/en.json', value: 'Certifications' },
  { file: 'src/dict/es.json', value: 'Certificaciones' },
];
let dictFound = false;
for (const d of dictPatches) {
  const p = join(ROOT, d.file);
  if (!existsSync(p)) continue;
  dictFound = true;
  const json = JSON.parse(readFileSync(p, 'utf8'));
  const nav = json.nav || json;
  if (nav.certifications) { console.log(`- ${d.file} already has nav.certifications`); continue; }
  backup(p);
  if (json.nav) json.nav.certifications = d.value;
  else json.certifications = d.value;
  writeFileSync(p, JSON.stringify(json, null, 2));
  console.log(`✓ ${d.file} patched (${d.value})`);
}
if (!dictFound) {
  console.warn(`! No i18n dict JSON found. Nav will show "nav.certifications" as literal. Locate dict file and add key manually.`);
}

// --- 4. Patch homepage: insert CertificationStrip under TrustBar (EN + ES) ---
const homes = [
  { file: 'src/app/page.tsx', importLine: `import CertificationStrip from "@/components/home/CertificationStrip";` },
  { file: 'src/app/es/page.tsx', importLine: `import CertificationStrip from "@/_i18n/es/components/home/CertificationStrip";` },
];
for (const h of homes) {
  const p = join(ROOT, h.file);
  if (!existsSync(p)) { console.warn(`! ${h.file} not found`); continue; }
  let src = readFileSync(p, 'utf8');
  if (src.includes('CertificationStrip')) { console.log(`- ${h.file} already has CertificationStrip`); continue; }
  backup(p);
  // Add import after last existing import
  const importMatches = [...src.matchAll(/^import[^;]+;$/gm)];
  if (importMatches.length === 0) { console.warn(`! ${h.file}: no imports`); continue; }
  const last = importMatches[importMatches.length - 1];
  src = src.slice(0, last.index + last[0].length) + '\n' + h.importLine + src.slice(last.index + last[0].length);
  // Insert <CertificationStrip /> right after <TrustBar />
  const anchor = '<TrustBar />';
  if (src.includes(anchor)) {
    src = src.replace(anchor, `${anchor}\n        <CertificationStrip />`);
    writeFileSync(p, src);
    console.log(`✓ ${h.file} (TrustBar + CertificationStrip)`);
  } else {
    console.warn(`! ${h.file}: <TrustBar /> anchor not found`);
  }
}

// --- 5. Fix TrustBar.tsx 乱码 suffix "銕?" -> "㎡" (actually use "m2" to avoid encoding) ---
const tb = join(ROOT, 'src/components/home/TrustBar.tsx');
if (existsSync(tb)) {
  let src = readFileSync(tb, 'utf8');
  if (src.includes('銕') || src.includes('"m²"') === false && src.includes('Factory Area')) {
    backup(tb);
    // Replace any garbled suffix for "Factory Area" line with ASCII "m2"
    src = src.replace(/suffix:\s*"[^"]*",\s*label:\s*"Factory Area"/, 'suffix: " m2", label: "Factory Area"');
    writeFileSync(tb, src);
    console.log(`✓ TrustBar.tsx (fixed garbled suffix -> "m2")`);
  }
}

console.log(`\n✓ Phase C done. Now run:  npm run build`);