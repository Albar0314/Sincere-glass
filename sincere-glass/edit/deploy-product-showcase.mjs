// deploy-product-showcase.mjs
// Installs src/components/ProductEquipmentShowcase.tsx.
// Hand-integration into product pages is instructed in product-equipment-photos-delivery.md.
//
// Run from project root:  node edit\deploy-product-showcase.mjs

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const EDIT_DIR = path.join(ROOT, "edit");

const srcTmpl = path.join(EDIT_DIR, "ProductEquipmentShowcase.tsx.txt");
if (!fs.existsSync(srcTmpl)) {
  console.error("[!] Missing template: " + srcTmpl);
  process.exit(1);
}
const manifest = path.join(ROOT, "src", "lib", "equipment-gallery.ts");
if (!fs.existsSync(manifest)) {
  console.error("[!] Missing src/lib/equipment-gallery.ts");
  console.error("    Run prepare-equipment-images.mjs first.");
  process.exit(1);
}

const dest = path.join(ROOT, "src", "components", "ProductEquipmentShowcase.tsx");
fs.mkdirSync(path.dirname(dest), { recursive: true });
const existed = fs.existsSync(dest);
fs.writeFileSync(dest, fs.readFileSync(srcTmpl, "utf8"), "utf8");
console.log((existed ? "[overwrote] " : "[created]   ") + "src/components/ProductEquipmentShowcase.tsx");
console.log("\nDone. Open product-equipment-photos-delivery.md for 6 copy-paste snippets.");
