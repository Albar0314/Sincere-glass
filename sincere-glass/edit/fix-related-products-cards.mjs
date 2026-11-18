// edit/fix-related-products-cards.mjs
// Run from project root:  node edit\fix-related-products-cards.mjs
//
// Fixes the blog RelatedProductsCards component:
//   - image paths: *-card.jpg (never existed) -> real /images/products/*.jpg
//   - "View product →" literal -> real → arrow
// Marker: SG-RELATED-CARDS-FIX-V1

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "src");

const tpl = join(__dirname, "RelatedProductsCards.tsx.txt");
const dest = join(SRC, "components", "blog", "RelatedProductsCards.tsx");

if (!existsSync(tpl)) {
  console.error("✗ RelatedProductsCards.tsx.txt missing in edit/ — drop it in and retry.");
  process.exit(1);
}

writeFileSync(dest, readFileSync(tpl, "utf8"));
console.log("✓ wrote src/components/blog/RelatedProductsCards.tsx");

// Sanity-check referenced images actually exist on disk
const imgs = [
  "tempered.jpg",
  "laminated.jpg",
  "insulated.jpg",
  "enameled.jpg",
];
console.log("\nChecking /public/images/products/ …");
let allThere = true;
for (const f of imgs) {
  const p = join(ROOT, "public", "images", "products", f);
  if (existsSync(p)) {
    console.log(`  ✓ ${f}`);
  } else {
    allThere = false;
    console.error(`  ✗ MISSING: public/images/products/${f} — card will still 404 until this file exists`);
  }
}

console.log(
  allThere
    ? "\nAll referenced images present. Run `npm run build`, then push.\n"
    : "\nSome images missing (see ✗). Add them to public/images/products/ or point the map at files that exist.\n"
);
