// fix-build-errors.mjs
// Fixes two issues from the first deploy:
//   1. page.tsx imports InlineQuoteCTA and SocialProof which don't exist in this project
//      -> replaces page.tsx with a self-contained version (inline CTA band + trust band)
//   2. Footer.tsx uses { label, href } format, not { key, href } — the earlier patch skipped it
//      -> appends Curved Tempered Glass to Footer's productLinks[] with the correct format
//
// Run from project root:
//   node edit\fix-build-errors.mjs

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const EDIT_DIR = path.join(ROOT, "edit");

function readTemplate(name) {
  const p = path.join(EDIT_DIR, name);
  if (!fs.existsSync(p)) throw new Error("Missing template: " + p);
  return fs.readFileSync(p, "utf8");
}

// --- 1. Replace page.tsx with the fixed version ---
console.log("\n[1/2] Replacing src/app/products/curved-tempered-glass/page.tsx...");

const pagePath = path.join(ROOT, "src", "app", "products", "curved-tempered-glass", "page.tsx");
if (!fs.existsSync(pagePath)) {
  console.log("  [ERROR] page.tsx not found at " + pagePath);
  console.log("          Run deploy-curved-tempered.mjs first.");
  process.exit(1);
}
fs.writeFileSync(pagePath, readTemplate("page.tsx.txt"), "utf8");
console.log("  [ok] page.tsx replaced (self-contained, no InlineQuoteCTA/SocialProof dependencies)");

// --- 2. Patch Footer.tsx with the correct { label, href } format ---
console.log("\n[2/2] Patching src/components/Footer.tsx (correct {label, href} format)...");

const footerPath = path.join(ROOT, "src", "components", "Footer.tsx");
if (!fs.existsSync(footerPath)) {
  console.log("  [SKIPPED] Footer.tsx not found at expected path");
} else {
  const src = fs.readFileSync(footerPath, "utf8");
  if (src.indexOf("/products/curved-tempered-glass") !== -1) {
    console.log("  [SKIPPED] Curved Tempered already in Footer");
  } else {
    const anchor = /(\{\s*label:\s*"Low-E Glass",\s*href:\s*"\/products\/low-e-glass"\s*\},\s*\n)(\];)/;
    if (!anchor.test(src)) {
      console.log("  [SKIPPED] Could not find Low-E Glass productLinks anchor");
      console.log("            Open src/components/Footer.tsx manually and add this line");
      console.log("            inside productLinks[] after the Low-E entry:");
      console.log('              { label: "Curved Tempered Glass", href: "/products/curved-tempered-glass" },');
    } else {
      const newLine = '  { label: "Curved Tempered Glass", href: "/products/curved-tempered-glass" },\n';
      const patched = src.replace(anchor, "$1" + newLine + "$2");
      fs.writeFileSync(footerPath, patched, "utf8");
      console.log("  [ok] Footer.tsx patched");
    }
  }
}

console.log("\nDone. Run: npm run build");
