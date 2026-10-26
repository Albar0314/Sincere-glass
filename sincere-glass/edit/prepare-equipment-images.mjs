// prepare-equipment-images.mjs
// Scans a raw-photos folder and processes equipment photos into the production
// shape the site expects:
//   - normalized kebab-case folder names
//   - png -> webp with sensible compression (long edge <= 1600px)
//   - produces src/lib/equipment-gallery.ts manifest with per-category counts
//
// Expected input layout:
//   public/images/equipment-raw/
//     Tempering equipment/1.png  2.png  ...
//     Laminating equipment/...
//     Hollow device/...
//     cutting equipment/...
//     Edge grinding equipment/...
//     Colored glaze equipment/...
//
// Output layout:
//   public/images/equipment/
//     tempering/1.webp  2.webp  ...
//     laminating/...
//     insulating/...
//     cutting/...
//     edging/...
//     enameling/...
//   src/lib/equipment-gallery.ts     (manifest - imported by Equipment page + homepage strip)
//
// Run from project root:
//   npm install --save-dev sharp         # if not yet installed
//   node edit\prepare-equipment-images.mjs
//
// Idempotent: re-running regenerates everything from source. Safe. Does not
// delete raw source files.

import fs from "node:fs";
import path from "node:path";

// --- Try to import sharp; give a clean install instruction if missing ---
let sharp;
try {
  sharp = (await import("sharp")).default;
} catch (e) {
  console.error("\n[!] 'sharp' module not found.");
  console.error("    Install it first:  npm install --save-dev sharp");
  console.error("    Then re-run this script.\n");
  process.exit(1);
}

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "public", "images", "equipment-raw");
const OUT_DIR = path.join(ROOT, "public", "images", "equipment");
const MANIFEST_PATH = path.join(ROOT, "src", "lib", "equipment-gallery.ts");

// Map raw folder names -> canonical category keys. Case-insensitive matching.
// Add synonyms freely; the key on the left is what the site uses.
const CATEGORY_MAP = {
  tempering: ["tempering equipment", "tempering", "tempering furnace", "tempering furnaces"],
  laminating: ["laminating equipment", "laminating", "laminator", "autoclave", "lamination"],
  insulating: ["hollow device", "insulating equipment", "insulating", "igu", "hollow glass", "insulated glass line"],
  cutting: ["cutting equipment", "cutting", "cutter", "cutting line"],
  edging: ["edge grinding equipment", "edging equipment", "edging", "edge grinding", "grinding"],
  enameling: ["colored glaze equipment", "enameling equipment", "enameling", "ceramic frit", "colored glaze", "frit"],
};

// Human-readable titles + taglines for the manifest
const CATEGORY_META = {
  tempering: {
    title: "Tempering Furnaces",
    tagline: "Two furnaces, panels up to 3.3 m x 15 m, 90-110 MPa surface compressive stress.",
    description:
      "Our tempering lines heat architectural glass above its softening point and quench it under controlled high-velocity air to lock in 4-5x the strength of annealed glass. Jumbo capacity on both furnaces.",
    order: 1,
  },
  cutting: {
    title: "Cutting Lines",
    tagline: "Four intelligent cutting lines with CNC-optimised panel nesting.",
    description:
      "Automatic scoring and breakout for rectangles, shapes, and large-format cuts. Nesting software minimises waste; tolerance held at +/-1 mm on finished dimensions.",
    order: 2,
  },
  edging: {
    title: "Edge Grinding Lines",
    tagline: "Four straight-line edgers plus CNC shape processing.",
    description:
      "Ground, flat-polished, pencil-polished, and beveled edge finishes. Edge quality is the single largest determinant of tempered-glass in-furnace breakage risk, so we invested four production lines in it.",
    order: 3,
  },
  laminating: {
    title: "Laminating Autoclaves",
    tagline: "Two high-pressure autoclaves; one at 3.3 m x 15 m jumbo capacity.",
    description:
      "PVB and SGP interlayer lamination at 140 C and 12 bar. The 3.3 m x 15 m autoclave is the key jumbo-laminated capability most Chinese plants do not have.",
    order: 4,
  },
  insulating: {
    title: "Insulated Glass Lines",
    tagline: "Two IGU lines including one ultra-large automatic argon-fill unit.",
    description:
      "Dual-seal (PIB + structural silicone) IG assembly with automated spacer bending, desiccant filling, and argon gas injection. 1.5x the wind-pressure resistance of single-pane glass.",
    order: 5,
  },
  enameling: {
    title: "Ceramic Frit / Enameling",
    tagline: "Silk-screen and digital frit printing for decorative and solar-control glass.",
    description:
      "Permanent ceramic colour fused into the glass surface during tempering. Used for spandrel panels, patterned facades, solar-control patterns, and bird-safe glass.",
    order: 6,
  },
};

// --- Helpers ---

function normaliseName(name) {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

function matchCategory(folderName) {
  const n = normaliseName(folderName);
  for (const [key, synonyms] of Object.entries(CATEGORY_MAP)) {
    if (synonyms.some((s) => normaliseName(s) === n)) return key;
  }
  return null;
}

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

// --- Main ---

if (!fs.existsSync(SRC_DIR)) {
  console.error("\n[!] Source folder not found: " + SRC_DIR);
  console.error("    Create it and place your raw category folders inside, e.g.:");
  console.error("      " + path.join(SRC_DIR, "Tempering equipment", "1.png"));
  console.error("      " + path.join(SRC_DIR, "cutting equipment", "1.png"));
  console.error("    Then re-run this script.\n");
  process.exit(1);
}

console.log("\nScanning source: " + SRC_DIR);

const sourceFolders = fs
  .readdirSync(SRC_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

if (sourceFolders.length === 0) {
  console.error("\n[!] No subfolders found in " + SRC_DIR);
  process.exit(1);
}

const manifest = {}; // { category: [files...] }
const unmatched = [];

for (const folder of sourceFolders) {
  const key = matchCategory(folder);
  if (!key) {
    unmatched.push(folder);
    continue;
  }

  const srcPath = path.join(SRC_DIR, folder);
  const files = fs
    .readdirSync(srcPath)
    .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
    .sort(naturalSort);

  if (files.length === 0) {
    console.log("  [skip]  " + folder + "  (no image files)");
    continue;
  }

  const outDir = path.join(OUT_DIR, key);
  fs.mkdirSync(outDir, { recursive: true });

  // Wipe stale files (we re-index to 1.webp, 2.webp, ...)
  for (const f of fs.readdirSync(outDir)) {
    fs.unlinkSync(path.join(outDir, f));
  }

  console.log("\n  [" + key + "]  from \"" + folder + "\" (" + files.length + " file" + (files.length === 1 ? "" : "s") + ")");

  const processed = [];
  for (let i = 0; i < files.length; i++) {
    const srcFile = path.join(srcPath, files[i]);
    const outName = i + 1 + ".webp";
    const outFile = path.join(outDir, outName);

    try {
      const meta = await sharp(srcFile).metadata();
      await sharp(srcFile)
        .rotate() // honour EXIF orientation
        .resize({
          width: 1600,
          height: 1600,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 82, effort: 5 })
        .toFile(outFile);

      const inSize = fs.statSync(srcFile).size;
      const outSize = fs.statSync(outFile).size;
      const saved = Math.round((1 - outSize / inSize) * 100);
      const outMeta = await sharp(outFile).metadata();
      console.log(
        "    " + files[i] + "  ->  " + outName + "  (" +
        meta.width + "x" + meta.height + "  ->  " +
        outMeta.width + "x" + outMeta.height + ",  " +
        (saved >= 0 ? "-" + saved + "%" : "+" + Math.abs(saved) + "%") +
        ")"
      );
      processed.push(outName);
    } catch (e) {
      console.error("    [!] failed on " + files[i] + ": " + e.message);
    }
  }
  manifest[key] = processed;
}

// --- Write TypeScript manifest ---

const orderedKeys = Object.keys(CATEGORY_META).sort(
  (a, b) => CATEGORY_META[a].order - CATEGORY_META[b].order
);

const entries = orderedKeys
  .filter((k) => manifest[k] && manifest[k].length > 0)
  .map((k) => {
    const files = manifest[k];
    const meta = CATEGORY_META[k];
    const photosArr = files
      .map((_, i) => `    { src: "/images/equipment/${k}/${i + 1}.webp", alt: "${meta.title} - photo ${i + 1}" }`)
      .join(",\n");
    return `  {
    key: "${k}",
    title: "${meta.title}",
    tagline: "${meta.tagline}",
    description: ${JSON.stringify(meta.description)},
    photos: [
${photosArr}
    ]
  }`;
  })
  .join(",\n");

const manifestContent = `// AUTO-GENERATED by edit/prepare-equipment-images.mjs
// Do not edit by hand - re-run the script after adding or removing source photos.
// Last generated: ${new Date().toISOString()}

export interface EquipmentPhoto {
  src: string;
  alt: string;
}

export interface EquipmentCategory {
  key: string;
  title: string;
  tagline: string;
  description: string;
  photos: EquipmentPhoto[];
}

export const EQUIPMENT_CATEGORIES: EquipmentCategory[] = [
${entries}
];

export function getEquipmentCategory(key: string): EquipmentCategory | undefined {
  return EQUIPMENT_CATEGORIES.find((c) => c.key === key);
}
`;

fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
fs.writeFileSync(MANIFEST_PATH, manifestContent, "utf8");

console.log("\n----------------------------------------------------------------");
console.log("Categories processed:  " + Object.keys(manifest).length + " / 6");
for (const k of orderedKeys) {
  const count = manifest[k] ? manifest[k].length : 0;
  const status = count > 0 ? "[" + String(count).padStart(2, " ") + "]" : "[  ]";
  console.log("  " + status + "  " + k + "  (" + CATEGORY_META[k].title + ")");
}
if (unmatched.length > 0) {
  console.log("\nUnmatched source folders (ignored - add synonyms to CATEGORY_MAP if needed):");
  for (const f of unmatched) console.log("  - " + f);
}
console.log("\nManifest written:  " + path.relative(ROOT, MANIFEST_PATH));
console.log("Images written to:  " + path.relative(ROOT, OUT_DIR));
console.log("----------------------------------------------------------------");
console.log("\nNext steps:");
console.log("  1. Build:  npm run build  (confirms manifest TS compiles)");
console.log("  2. Deploy the EquipmentGallery component and refactor Equipment page.");
console.log("");
