// deploy-curved-tempered.mjs
// Deploys the Curved Tempered Glass product line (6th product line).
//
// Run from project root:  node edit\deploy-curved-tempered.mjs
//
// This script:
//   1. Creates the 3 interactive components under src/components/products/curved-tempered/
//   2. Creates the product page at src/app/products/curved-tempered-glass/page.tsx
//   3. Appends the Curved Tempered Glass entry to src/lib/products.ts
//   4. Patches src/components/Header.tsx — adds 6th item to the hardcoded products[] array
//   5. Patches src/components/Footer.tsx — adds 6th productLinks entry
//
// SAFE: Each patch is idempotent — if the entry/line already exists the script skips
// that step and reports it, instead of inserting a duplicate.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const EDIT_DIR = path.join(ROOT, "edit");

// ---------- helpers ----------

function readTemplate(name) {
  const p = path.join(EDIT_DIR, name);
  if (!fs.existsSync(p)) {
    throw new Error("Missing template file: " + p);
  }
  return fs.readFileSync(p, "utf8");
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeFile(target, content, label) {
  ensureDir(path.dirname(target));
  const existed = fs.existsSync(target);
  fs.writeFileSync(target, content, "utf8");
  console.log((existed ? "  [overwrote] " : "  [created]   ") + label + "  (" + target + ")");
}

function patchFile(target, patcher, label) {
  if (!fs.existsSync(target)) {
    console.log("  [SKIPPED]   " + label + " — file not found: " + target);
    return false;
  }
  const original = fs.readFileSync(target, "utf8");
  const patched = patcher(original);
  if (patched === null) {
    console.log("  [SKIPPED]   " + label + " — already applied or anchor not found");
    return false;
  }
  if (patched === original) {
    console.log("  [NOCHANGE]  " + label);
    return false;
  }
  fs.writeFileSync(target, patched, "utf8");
  console.log("  [patched]   " + label);
  return true;
}

// ---------- 1. Interactive components ----------

console.log("\n[1/5] Writing interactive components...");

const compDir = path.join(ROOT, "src", "components", "products", "curved-tempered");
writeFile(
  path.join(compDir, "CurvatureVisualizer.tsx"),
  readTemplate("CurvatureVisualizer.tsx.txt"),
  "CurvatureVisualizer.tsx"
);
writeFile(
  path.join(compDir, "CurveTypologySelector.tsx"),
  readTemplate("CurveTypologySelector.tsx.txt"),
  "CurveTypologySelector.tsx"
);
writeFile(
  path.join(compDir, "FeasibilityChecker.tsx"),
  readTemplate("FeasibilityChecker.tsx.txt"),
  "FeasibilityChecker.tsx"
);

// ---------- 2. Product page ----------

console.log("\n[2/5] Writing product page...");

const pagePath = path.join(ROOT, "src", "app", "products", "curved-tempered-glass", "page.tsx");
writeFile(pagePath, readTemplate("page.tsx.txt"), "products/curved-tempered-glass/page.tsx");

// ---------- 3. Append entry to products.ts ----------

console.log("\n[3/5] Patching src/lib/products.ts...");

const productsTsPath = path.join(ROOT, "src", "lib", "products.ts");
patchFile(
  productsTsPath,
  (src) => {
    if (src.indexOf('slug: "curved-tempered-glass"') !== -1) {
      return null; // already added
    }
    // Find the closing `];` of the exported products array.
    // Anchor: the last `},` followed by whitespace and `];`
    // Replace that `];` with our new entry + `];`
    const anchor = /\},\s*\n\s*\];\s*$/m;
    if (!anchor.test(src)) {
      console.log("    ! Could not find products[] array closing bracket");
      return null;
    }
    const entry =
`  {
    slug: "curved-tempered-glass",
    name: "Curved Tempered Glass",
    tagline: "Hot-bent and cold-bent architectural glass from a 500 mm minimum radius",
    description: [
      "Curved tempered glass is architectural glass formed to a curved profile and heat-treated for safety. In hot-bending, a flat panel is heated above its softening point and shaped over a steel mold; the curve is then locked in during the tempering quench. In cold-bending, a flat tempered panel is flexed into a curved frame during installation.",
      "Our facility produces curved tempered to a 500 mm minimum radius on 6 mm panels, up to 3,300 mm by 15,000 mm at the panel ceiling. Cylindrical, spherical, and free-form geometries are all available, and curved panels can be laminated or built into IGUs.",
    ],
    image: "/images/products/curved-tempered.jpg",
    specs: [
      { label: "Thickness Range", value: "6mm, 8mm, 10mm, 12mm, 15mm, 19mm" },
      { label: "Minimum Radius", value: "500mm (6mm panels)" },
      { label: "Max Panel Size", value: "3,300mm \\u00d7 15,000mm" },
      { label: "Geometries", value: "Cylindrical, spherical, free-form" },
      { label: "Forming Methods", value: "Hot-bending or cold-bending" },
      { label: "Certification", value: "GB 15763.2 + EN 12150; China 3C (CCC) Certified" },
    ],
    features: [
      { title: "Tight-Radius Specialty", desc: "500 mm minimum radius sits well below the 800 mm floor most Chinese plants publish. Achieved with 6 mm panels on a reusable steel mold." },
      { title: "Jumbo Capability", desc: "Our 3.3 m \\u00d7 15 m tempering furnace handles curved panels at full size \\u2014 among the largest in Hubei province." },
      { title: "Multi-Build Compatible", desc: "Curved panels can be laminated (PVB or SGP) or built into insulated units with Low-E coating, in one order." },
      { title: "Dual-Standard Output", desc: "Produced to China GB 15763.2 and tested against EN 12150; EN or ANSI Z97.1 test reports available for export projects." },
    ],
    applications: [
      "Panoramic lifts and elevator shafts",
      "Curved curtain walls and building facades",
      "Dome skylights and oculus roofs",
      "Entrance canopies and porte-cocheres",
      "Boutique shopfronts and showcases",
      "Marine and yacht wheelhouse glazing",
    ],
    standard: "GB 15763.2-2005 + EN 12150 \\u2014 Curved Tempered Safety Glass",
    searchKeywords: ["curved tempered", "bent glass", "curved glass", "bent tempered glass", "hot bent glass", "cold bent glass", "cylindrical glass", "spherical glass", "free-form glass", "curved facade glass", "curved curtain wall", "curved lift glass", "\\u5f2f\\u94a2\\u73bb\\u7483", "\\u70ed\\u5f2f\\u73bb\\u7483", "\\u5f2f\\u5f62\\u73bb\\u7483"],
  },
`;
    return src.replace(anchor, "},\n" + entry + "];\n");
  },
  "src/lib/products.ts (append curved-tempered-glass entry)"
);

// ---------- 4. Patch Header.tsx ----------

console.log("\n[4/5] Patching src/components/Header.tsx...");

const headerPath = path.join(ROOT, "src", "components", "Header.tsx");
patchFile(
  headerPath,
  (src) => {
    if (src.indexOf("/products/curved-tempered-glass") !== -1) {
      return null; // already added
    }
    const newItem = '  { name: "Curved Tempered Glass", href: "/products/curved-tempered-glass", desc: "Hot-bent to R500 mm, up to 3.3 \\u00d7 15 m", image: "/images/products/curved-tempered.jpg" },\n';
    // Anchor: the Low-E Glass line followed by `];`
    const anchor = /(\{\s*name:\s*"Low-E Glass"[^}]*\},\s*\n)(\];)/;
    if (!anchor.test(src)) {
      console.log("    ! Could not find Low-E Glass anchor in Header products[] array");
      return null;
    }
    return src.replace(anchor, "$1" + newItem + "$2");
  },
  "src/components/Header.tsx (add Curved Tempered to Mega Menu + mobile menu)"
);

// ---------- 5. Patch Footer.tsx ----------

console.log("\n[5/5] Patching src/components/Footer.tsx...");

const footerPath = path.join(ROOT, "src", "components", "Footer.tsx");
patchFile(
  footerPath,
  (src) => {
    if (src.indexOf('"curvedTempered"') !== -1 || src.indexOf("/products/curved-tempered-glass") !== -1) {
      return null;
    }
    // Anchor: last productLinks entry (`lowE`) line, then `];`
    const anchor = /(\{\s*key:\s*"lowE"[^}]*\},\s*\n)(\];)/;
    if (!anchor.test(src)) {
      console.log("    ! Could not find lowE anchor in Footer productLinks[]");
      return null;
    }
    // Footer uses `t(\`product.${link.key}.name\`)` so we need a key that maps.
    // Simpler: insert a key that still looks up gracefully. For non-i18n projects we use the plain name.
    // Looking at the actual Header code, products are hardcoded strings — Footer may also be hardcoded.
    // Use a simple key "curvedTempered"; if Footer uses t() lookup, the key will miss and show the key string.
    // Safer: inspect the actual Footer link render format before deciding — here we just add the link.
    const newLink = '  { key: "curvedTempered",  href: "/products/curved-tempered-glass" },\n';
    return src.replace(anchor, "$1" + newLink + "$2");
  },
  "src/components/Footer.tsx (add curved tempered productLinks entry)"
);

console.log("\n----------------------------------------------------------------");
console.log("Done. Next steps:");
console.log("  1. Confirm Footer.tsx uses the key correctly (either hardcoded name map or i18n lookup).");
console.log("     If Footer uses t('product.curvedTempered.name'), add that string to your i18n dict.");
console.log("     If Footer uses product.name directly, open Footer.tsx and change the new link to");
console.log("     render 'Curved Tempered Glass' directly.");
console.log("  2. Place hero/product images:");
console.log("     - /public/images/products/curved-tempered.jpg  (card thumbnail, 16:9)");
console.log("     - /public/images/products/curved-tempered-hero.webp  (OG image, optional)");
console.log("     Use the AI prompt in claude/curved-tempered-delivery.md.");
console.log("  3. Build locally: npm run build  (check for TS/ESLint errors)");
console.log("  4. Commit and push via GitHub Desktop.");
console.log("  5. SEPARATE patch for size correction (3m -> 3.3m across site):");
console.log("     run node edit\\patch-max-size-3300.mjs  (delivered separately)");
console.log("----------------------------------------------------------------");
