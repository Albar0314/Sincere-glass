// deploy-equipment-gallery.mjs
// Installs the Equipment Gallery components:
//   - src/components/EquipmentGallery.tsx         (reusable gallery + lightbox)
//   - src/components/EquipmentGallerySection.tsx  (full section with tabs - drop-in for Equipment page)
//   - src/components/HomepagePhotoStrip.tsx       (horizontal strip - drop-in for homepage)
//
// Prerequisites:
//   1. Raw photos placed in public/images/equipment-raw/
//   2. node edit\prepare-equipment-images.mjs already run successfully
//      (this writes src/lib/equipment-gallery.ts)
//
// Run from project root:
//   node edit\deploy-equipment-gallery.mjs

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const EDIT_DIR = path.join(ROOT, "edit");

function readTemplate(name) {
  const p = path.join(EDIT_DIR, name);
  if (!fs.existsSync(p)) throw new Error("Missing template: " + p);
  return fs.readFileSync(p, "utf8");
}

function writeFile(target, content, label) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const existed = fs.existsSync(target);
  fs.writeFileSync(target, content, "utf8");
  console.log((existed ? "  [overwrote] " : "  [created]   ") + label);
}

// --- Prereq check ---

const manifestPath = path.join(ROOT, "src", "lib", "equipment-gallery.ts");
if (!fs.existsSync(manifestPath)) {
  console.error("\n[!] Missing src/lib/equipment-gallery.ts");
  console.error("    Run this first:  node edit\\prepare-equipment-images.mjs");
  console.error("    Then re-run this script.\n");
  process.exit(1);
}

console.log("\nInstalling Equipment Gallery components...\n");

writeFile(
  path.join(ROOT, "src", "components", "EquipmentGallery.tsx"),
  readTemplate("EquipmentGallery.tsx.txt"),
  "src/components/EquipmentGallery.tsx"
);
writeFile(
  path.join(ROOT, "src", "components", "EquipmentGallerySection.tsx"),
  readTemplate("EquipmentGallerySection.tsx.txt"),
  "src/components/EquipmentGallerySection.tsx"
);
writeFile(
  path.join(ROOT, "src", "components", "HomepagePhotoStrip.tsx"),
  readTemplate("HomepagePhotoStrip.tsx.txt"),
  "src/components/HomepagePhotoStrip.tsx"
);

console.log("\n----------------------------------------------------------------");
console.log("Done. Next: hand-integrate into the Equipment page and Homepage.");
console.log("See claude/equipment-gallery-delivery.md for exact snippets.");
console.log("----------------------------------------------------------------");
