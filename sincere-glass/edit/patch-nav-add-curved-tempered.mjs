// patch-nav-add-curved-tempered.mjs
// Adds Curved Tempered Glass to Header mega menu + Footer product column.
// Fixes the missing-product entry Grok flagged (rendered as "product.curvedTempered.name"
// placeholder in some surfaces). Idempotent — safe to re-run.
//
// Run from project root:
//   node edit\patch-nav-add-curved-tempered.mjs

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();

function patchFile(relPath, mutate, description) {
  const path = join(ROOT, relPath);
  if (!existsSync(path)) {
    console.log(`⚠ ${relPath} not found — skipping`);
    return;
  }
  const original = readFileSync(path, 'utf8');
  const next = mutate(original);
  if (next === original) {
    console.log(`⚠ ${relPath} already contains curved-tempered-glass — skipping`);
    return;
  }
  writeFileSync(path, next, 'utf8');
  console.log(`✓ Patched ${relPath} — ${description}`);
}

// ─── 1. src/components/Header.tsx ─────────────────────────
// Add curved-tempered-glass to the mega-menu products array.
patchFile(
  'src/components/Header.tsx',
  (src) => {
    if (src.includes('curved-tempered-glass')) return src;

    // Anchor on the Low-E entry (last in current array).
    const anchor =
      '  { name: "Low-E Glass", href: "/products/low-e-glass", desc: "Energy-efficient coating", image: "/images/products/low-e.jpg" },';
    const insertion =
      anchor +
      '\n  { name: "Curved Tempered Glass", href: "/products/curved-tempered-glass", desc: "Single-axis bent, Rₘᵢₙ 500mm", image: "/images/products/curved-tempered.jpg" },';

    if (!src.includes(anchor)) {
      console.log('⚠ Low-E anchor not found in Header.tsx — may need manual edit');
      return src;
    }
    return src.replace(anchor, insertion);
  },
  'added Curved Tempered Glass to mega menu'
);

// ─── 2. src/components/Footer.tsx ─────────────────────────
// Add curved-tempered-glass to the footer productLinks array.
patchFile(
  'src/components/Footer.tsx',
  (src) => {
    if (src.includes('curved-tempered-glass')) return src;

    const anchor = `  { label: "Low-E Glass", href: "/products/low-e-glass" },`;
    const insertion =
      anchor + `\n  { label: "Curved Tempered Glass", href: "/products/curved-tempered-glass" },`;

    if (!src.includes(anchor)) {
      console.log('⚠ Low-E anchor not found in Footer.tsx — may need manual edit');
      return src;
    }
    return src.replace(anchor, insertion);
  },
  'added Curved Tempered Glass to Footer products column'
);

// ─── 3. ES mirror files, if present ───────────────────────
// If the ES locale mirror has its own Header/Footer, patch those too.
const esMirrors = [
  ['src/_i18n/es/components/Header.tsx', 'Header'],
  ['src/_i18n/es/components/Footer.tsx', 'Footer'],
];

for (const [path, kind] of esMirrors) {
  patchFile(
    path,
    (src) => {
      if (src.includes('curved-tempered-glass')) return src;

      if (kind === 'Header') {
        const anchor =
          '  { name: "Low-E Glass", href: "/products/low-e-glass", desc: "Energy-efficient coating", image: "/images/products/low-e.jpg" },';
        if (!src.includes(anchor)) return src;
        return src.replace(
          anchor,
          anchor +
            '\n  { name: "Vidrio Templado Curvo", href: "/products/curved-tempered-glass", desc: "Curvo mono-axial, Rₘᵢₙ 500mm", image: "/images/products/curved-tempered.jpg" },'
        );
      }

      // Footer
      const anchor = `  { label: "Low-E Glass", href: "/products/low-e-glass" },`;
      if (!src.includes(anchor)) return src;
      return src.replace(
        anchor,
        anchor + `\n  { label: "Vidrio Templado Curvo", href: "/products/curved-tempered-glass" },`
      );
    },
    'added Curved Tempered Glass (ES mirror)'
  );
}

console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Nav patch complete.');
console.log('');
console.log('Verify:');
console.log('  1. Header mega menu now shows 6 products on desktop + mobile.');
console.log('  2. Footer product column lists Curved Tempered Glass.');
console.log('  3. Any ES mirror shows the Spanish label.');
console.log('  4. npm run build  (confirm no type errors from the new entry).');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
