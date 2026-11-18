// fix-article-31-inlinequote.mjs
// InlineQuoteCTA variant only accepts "default" | "compact" | "dark".
// Article #31 page used variant="inline" (invalid). Fix just that one tag -
// do NOT touch LeadMagnetCTA variant="inline", which is valid for that component.
//
// Idempotent. Backs up to page.tsx.bak. Run from project root:
//   node fix-article-31-inlinequote.mjs
//   npm run build

import fs from "node:fs";
import path from "node:path";

const fp = path.join(
  process.cwd(),
  "src",
  "app",
  "blog",
  "low-iron-tempered-glass",
  "page.tsx"
);

const FROM = '<InlineQuoteCTA variant="inline" />';
const TO = '<InlineQuoteCTA variant="default" />';

const raw = fs.readFileSync(fp, "utf8");
if (!raw.includes(FROM)) {
  console.log('[fix] no <InlineQuoteCTA variant="inline" /> found - nothing to do (already fixed?).');
  process.exit(0);
}
fs.copyFileSync(fp, fp + ".bak");
fs.writeFileSync(fp, raw.replace(FROM, TO), "utf8");
console.log('[fix] InlineQuoteCTA variant "inline" -> "default". Run: npm run build');
