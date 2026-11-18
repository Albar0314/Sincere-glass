// fix-contact-website-domain.mjs
// The contact card "Website" link still points at the old domain
// www.xcglass.net. Replace it with the current site, sincereglass.com,
// in both the EN and ES ContactClient.
//
// Replaces only the literal "www.xcglass.net" (href + display text). This
// does NOT touch the contact email xcglass@sina.cn, which is a different
// string and is left as-is on purpose.
//
// Idempotent (skips a file with no match). Backs up each file to .bak.
// Run from project root:  node fix-contact-website-domain.mjs
// Then:                   npm run build

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const FILES = [
  path.join("src", "components", "contact", "ContactClient.tsx"),
  path.join("src", "_i18n", "es", "components", "contact", "ContactClient.tsx"),
];

const FROM = "www.xcglass.net"; // old domain, www-prefixed form (not the email)
const TO = "sincereglass.com";

let total = 0;
for (const rel of FILES) {
  const fp = path.join(ROOT, rel);
  if (!fs.existsSync(fp)) {
    console.log(`[skip] not found: ${rel}`);
    continue;
  }
  const raw = fs.readFileSync(fp, "utf8");
  const n = raw.split(FROM).length - 1;
  if (n === 0) {
    console.log(`[skip] no "${FROM}" in ${rel} (already fixed?)`);
    continue;
  }
  fs.copyFileSync(fp, fp + ".bak");
  fs.writeFileSync(fp, raw.split(FROM).join(TO), "utf8");
  console.log(`[ok] ${rel}: replaced ${n} -> ${TO}`);
  total += n;
}

console.log(`[done] ${total} replacement(s). The href becomes https://${TO}. Run: npm run build`);
