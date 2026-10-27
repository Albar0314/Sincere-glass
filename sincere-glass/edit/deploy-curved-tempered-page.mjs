// deploy-curved-tempered-page.mjs
// Rebuilds the Curved Tempered Glass product page to pillar quality
// and wires it into Header, Footer, and products.ts.
//
// Usage from project root (D:\\桌面\\sincere-glass\\sincere-glass\\):
//   node edit\\deploy-curved-tempered-page.mjs
//
// Idempotent: safe to re-run.

import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const EDIT = join(ROOT, 'edit');

function must(path) {
  const p = join(EDIT, path);
  if (!existsSync(p)) { console.error(`\u2717 Missing: edit/${path}`); process.exit(1); }
  return p;
}
function log(msg) { console.log(msg); }

// ───────────────────────────────────────────────────────────────────
// 1. Interactive components → src/components/products/curved-tempered/
// ───────────────────────────────────────────────────────────────────
const compDir = join(ROOT, 'src', 'components', 'products', 'curved-tempered');
mkdirSync(compDir, { recursive: true });

const COMPONENTS = [
  ['curved-RadiusEnvelopeExplorer.tsx.txt', 'RadiusEnvelopeExplorer.tsx'],
  ['curved-BendingProductionTimeline.tsx.txt', 'BendingProductionTimeline.tsx'],
  ['curved-ApplicationShowcase.tsx.txt', 'CurvedApplicationShowcase.tsx'],
];

for (const [src, dst] of COMPONENTS) {
  copyFileSync(must(src), join(compDir, dst));
  log(`\u2713 Wrote src/components/products/curved-tempered/${dst}`);
}

// ───────────────────────────────────────────────────────────────────
// 2. Product page → src/app/products/curved-tempered-glass/page.tsx
//    (overwrites the thin existing page)
// ───────────────────────────────────────────────────────────────────
const pageDir = join(ROOT, 'src', 'app', 'products', 'curved-tempered-glass');
mkdirSync(pageDir, { recursive: true });
copyFileSync(must('curved-page.tsx.txt'), join(pageDir, 'page.tsx'));
log(`\u2713 Overwrote src/app/products/curved-tempered-glass/page.tsx`);

// ───────────────────────────────────────────────────────────────────
// 3. Patch Header.tsx \u2014 add Curved Tempered to products array
// ───────────────────────────────────────────────────────────────────
const headerPath = join(ROOT, 'src', 'components', 'Header.tsx');
let header = readFileSync(headerPath, 'utf8');

if (header.includes('/products/curved-tempered-glass')) {
  log('\u26a0 Header already has curved-tempered-glass entry \u2014 skipping');
} else {
  const anchor = `  { name: "Low-E Glass", href: "/products/low-e-glass", desc: "Energy-efficient coating", image: "/images/products/low-e.jpg" },`;
  if (!header.includes(anchor)) {
    log('\u2717 Header anchor (Low-E Glass line) not found \u2014 please patch Header.tsx manually');
  } else {
    const insertion = anchor + `\n  { name: "Curved Tempered Glass", href: "/products/curved-tempered-glass", desc: "Single-axis, R\u2098\u1d62\u2099 500mm at 6mm", image: "/images/products/curved-tempered.jpg" },`;
    header = header.replace(anchor, insertion);
    writeFileSync(headerPath, header, 'utf8');
    log('\u2713 Patched Header.tsx \u2014 added Curved Tempered Glass to products array');
  }
}

// ───────────────────────────────────────────────────────────────────
// 4. Patch Footer.tsx \u2014 add Curved Tempered to productLinks
// ───────────────────────────────────────────────────────────────────
const footerPath = join(ROOT, 'src', 'components', 'Footer.tsx');
let footer = readFileSync(footerPath, 'utf8');

if (footer.includes('/products/curved-tempered-glass')) {
  log('\u26a0 Footer already has curved-tempered-glass entry \u2014 skipping');
} else {
  const anchor = `  { label: "Low-E Glass", href: "/products/low-e-glass" },`;
  if (!footer.includes(anchor)) {
    log('\u2717 Footer anchor (Low-E Glass line) not found \u2014 please patch Footer.tsx manually');
  } else {
    const insertion = anchor + `\n  { label: "Curved Tempered Glass", href: "/products/curved-tempered-glass" },`;
    footer = footer.replace(anchor, insertion);
    writeFileSync(footerPath, footer, 'utf8');
    log('\u2713 Patched Footer.tsx \u2014 added Curved Tempered Glass to productLinks');
  }
}

// ───────────────────────────────────────────────────────────────────
// 5. Patch src/lib/products.ts \u2014 add curved-tempered-glass data entry
//    (only if not already present)
// ───────────────────────────────────────────────────────────────────
const productsPath = join(ROOT, 'src', 'lib', 'products.ts');
let products = readFileSync(productsPath, 'utf8');

if (
  products.includes(`slug: "curved-tempered-glass"`) ||
  products.includes(`slug: 'curved-tempered-glass'`)
) {
  log('\u26a0 products.ts already has curved-tempered-glass entry \u2014 skipping');
} else {
  const entry = `
  {
    slug: "curved-tempered-glass",
    name: "Curved Tempered Glass",
    tagline: "Single-axis curved tempered. R\u2098\u1d62\u2099 500mm at 6mm, up to 2.6m tall.",
    description: [
      "Curved tempered glass is single-axis-curved float glass that has been heated to ~620\u00b0C, slumped against a bespoke cylindrical mold during heating, then air-quenched in the curved position. Same compressive-stress surface and tensile-stress core as flat tempered \u2014 same 4\u20135\u00d7 strength, same safe-granule breakage per GB 15763.2-2005. The only production difference is the mold step.",
      "Our Wuhan bending-tempering line produces panels with minimum radius 500mm at 6mm thickness (scaling to 2,200mm at 19mm), maximum panel height 2,600mm, and maximum developed arc length 3,000mm. Routinely combined with lamination (PVB/SGP) or IGU assembly on adjacent lines for curved laminated and curved IGU units.",
    ],
    image: "/images/products/curved-tempered.jpg",
    specs: [
      { label: "Curvature type", value: "Single-axis (cylindrical or conical)" },
      { label: "Thickness", value: "6, 8, 10, 12, 15, 19 mm" },
      { label: "Minimum radius", value: "500mm (6mm) \u2192 2,200mm (19mm)" },
      { label: "Max panel height", value: "2,600 mm" },
      { label: "Max arc length", value: "3,000 mm" },
      { label: "Radius tolerance", value: "\u00b11 \u2013 \u00b11.5 mm" },
      { label: "Downstream processing", value: "Can be laminated / assembled into IGU" },
      { label: "Certification", value: "China 3C (CCC) Certified" },
    ],
    features: [
      { title: "Equivalent strength", desc: "4\u20135\u00d7 the impact and bending strength of annealed glass; same spec as flat tempered." },
      { title: "Tight-radius capability", desc: "R\u2098\u1d62\u2099 500mm at 6mm \u2014 we quote radii many factories reject." },
      { title: "Mold-formed geometry", desc: "Bespoke steel mold per unique radius; mold life 300\u2013500 panels, cost amortizes across quantity." },
      { title: "Combinable with lam / IGU", desc: "Adjacent autoclave and IGU lines allow curved laminated and curved IGU builds under one roof." },
    ],
    applications: [
      "Curved curtain-wall facades",
      "Rotunda balustrades and atrium perimeters",
      "Entrance canopies and overhead glazing",
      "Bay-window shopfronts and retail displays",
      "Elevator shaft panoramic enclosures",
      "Interior partitions and feature walls",
    ],
    standard: "GB 15763.2-2005 \u2014 Safety Glass for Buildings, Part 2: Tempered Glass",
    searchKeywords: [
      "curved tempered", "bent tempered", "curved toughened", "cylindrical glass",
      "bent glass", "curved safety glass", "architectural curved glass",
      "minimum bend radius", "glass bending", "cold bent",
      "\u5f2f\u94a2\u73bb\u7483", "\u5f2f\u66f2\u73bb\u7483", "\u5f2f\u5f2f\u73bb\u7483", "\u5f2f\u94a2\u5316\u73bb\u7483"
    ],
  },
`;
  // Insert before closing `];` of products array
  const close = products.lastIndexOf('];');
  if (close < 0) {
    console.error('\u2717 Could not find closing `];` of products array');
    process.exit(1);
  }
  products = products.slice(0, close) + entry + products.slice(close);
  writeFileSync(productsPath, products, 'utf8');
  log('\u2713 Appended curved-tempered-glass to src/lib/products.ts');
}

log('');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
log('Curved Tempered Glass page rebuild complete.');
log('');
log('Next steps:');
log('  1. Place product hero image at public/images/products/curved-tempered.jpg');
log('     (and if your card thumbnails need one: curved-tempered-glass-card.jpg)');
log('  2. npm run build  (verify no type errors)');
log('  3. git add -A && git commit && push');
log('  4. After Vercel deploys, confirm:');
log('     - Header mega menu shows 6 products (desktop + mobile)');
log('     - Footer Products column lists Curved Tempered Glass');
log('     - /products/curved-tempered-glass renders the new pillar page');
log('     - Site search Cmd+K finds "curved tempered glass"');
log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
