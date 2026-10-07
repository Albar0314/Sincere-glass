/**
 * patch-fix-leadmagnet-prop.mjs
 *
 * Fix: LeadMagnetCTA requires articleSlug prop.
 * Adds articleSlug={SLUG} to both LeadMagnetCTA instances.
 *
 * Run from project root: node edit\patch-fix-leadmagnet-prop.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const pagePath = join(process.cwd(), 'src', 'app', 'blog', 'tempered-glass-vs-laminated-glass', 'page.tsx');
let content = readFileSync(pagePath, 'utf-8');

content = content.replace(
  '<LeadMagnetCTA variant="inline" />',
  '<LeadMagnetCTA variant="inline" articleSlug={SLUG} />'
);

content = content.replace(
  '<LeadMagnetCTA variant="footer" />',
  '<LeadMagnetCTA variant="footer" articleSlug={SLUG} />'
);

writeFileSync(pagePath, content);
console.log('✅ page.tsx — added articleSlug={SLUG} to both LeadMagnetCTA instances');
