/**
 * patch-fix-leadmagnet-prop.mjs
 *
 * Adds required `articleSlug` prop to both LeadMagnetCTA calls in Article #2.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const p = join(ROOT, 'src', 'app', 'blog', 'insulated-glass-vs-laminated-glass', 'page.tsx');

if (!existsSync(p)) {
  console.log('❌ Article #2 page not found');
  process.exit(1);
}

let c = readFileSync(p, 'utf-8');
const SLUG = 'insulated-glass-vs-laminated-glass';
let fixed = 0;

// inline variant
if (c.includes('<LeadMagnetCTA variant="inline" />')) {
  c = c.replace(
    '<LeadMagnetCTA variant="inline" />',
    `<LeadMagnetCTA variant="inline" articleSlug="${SLUG}" />`
  );
  fixed++;
}

// footer variant
if (c.includes('<LeadMagnetCTA variant="footer" />')) {
  c = c.replace(
    '<LeadMagnetCTA variant="footer" />',
    `<LeadMagnetCTA variant="footer" articleSlug="${SLUG}" />`
  );
  fixed++;
}

writeFileSync(p, c);
console.log(`✅ Fixed ${fixed} LeadMagnetCTA calls — added articleSlug="${SLUG}"`);
console.log('   Run: npm run build');
