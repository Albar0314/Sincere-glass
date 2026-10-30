import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const EDIT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(EDIT_DIR);

const files = [
  { src: 'certifications-page.tsx.txt', dest: join(ROOT, 'src/app/certifications/page.tsx') },
  { src: 'certifications-client.tsx.txt', dest: join(ROOT, 'src/components/certifications/CertificationsClient.tsx') },
];

for (const f of files) {
  const srcPath = join(EDIT_DIR, f.src);
  if (!existsSync(srcPath)) { console.error(`Template missing: ${srcPath}`); process.exit(1); }
}

const manifestPath = join(ROOT, 'src/lib/test-reports-manifest.json');
if (!existsSync(manifestPath)) { console.error(`Manifest missing: ${manifestPath}. Run copy-to-project.mjs first.`); process.exit(1); }

for (const f of files) {
  const srcPath = join(EDIT_DIR, f.src);
  const dir = dirname(f.dest);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  if (existsSync(f.dest)) writeFileSync(f.dest + '.bak', readFileSync(f.dest));
  writeFileSync(f.dest, readFileSync(srcPath));
  console.log(`✓ ${f.dest.replace(ROOT, '')}`);
}

// Patch sitemap.ts
const sitemapPath = join(ROOT, 'src/app/sitemap.ts');
if (existsSync(sitemapPath)) {
  let sitemap = readFileSync(sitemapPath, 'utf8');
  if (sitemap.includes('/certifications')) {
    console.log(`- sitemap.ts already contains /certifications`);
  } else {
    writeFileSync(sitemapPath + '.bak', sitemap);
    // Try common anchors; whichever matches first wins
    const anchors = [
      [`"/about"`, `"/about",\n  "/certifications"`],
      [`'/about'`, `'/about',\n  '/certifications'`],
      [`"/contact"`, `"/certifications",\n  "/contact"`],
      [`'/contact'`, `'/certifications',\n  '/contact'`],
    ];
    let patched = false;
    for (const [a, b] of anchors) {
      if (sitemap.includes(a)) { sitemap = sitemap.replace(a, b); patched = true; break; }
    }
    if (patched) {
      writeFileSync(sitemapPath, sitemap);
      console.log(`✓ sitemap.ts patched`);
    } else {
      console.warn(`! sitemap.ts: no known anchor found. Add '/certifications' to the URL list manually, then re-run.`);
    }
  }
}

console.log(`\n✓ Phase A done. Now run:`);
console.log(`  cd ${ROOT}`);
console.log(`  npm run build`);
console.log(`  (if build passes) git add -A && commit && push`);