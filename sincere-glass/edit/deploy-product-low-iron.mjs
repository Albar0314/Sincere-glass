import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const EDIT_DIR = path.join(ROOT, "edit");
const DRY_RUN = process.argv.includes("--dry-run");
const MARKER = "SG-LOW-IRON-PRODUCT-V1";

function log(msg) {
  console.log((DRY_RUN ? "[DRY-RUN] " : "") + msg);
}

function readTxt(filename) {
  const full = path.join(EDIT_DIR, filename);
  if (!fs.existsSync(full)) {
    throw new Error("Missing template file: " + full);
  }
  return fs.readFileSync(full, "utf8");
}

function writeWithBackup(targetPath, content) {
  if (DRY_RUN) {
    log("Would write: " + path.relative(ROOT, targetPath));
    return;
  }
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  if (fs.existsSync(targetPath)) {
    const bak = targetPath + ".bak";
    if (!fs.existsSync(bak)) {
      fs.writeFileSync(bak, fs.readFileSync(targetPath, "utf8"), "utf8");
      log("Backup created: " + path.relative(ROOT, bak));
    }
  }
  fs.writeFileSync(targetPath, content, "utf8");
  log("Written: " + path.relative(ROOT, targetPath));
}

function main() {
  log("=== Deploying /products/low-iron-glass (" + MARKER + ") ===");

  // 1. Copy component & page templates
  const files = [
    ["LowIronOpticalLab.tsx.txt", "src/components/products/low-iron/LowIronOpticalLab.tsx"],
    ["LowIronSpecConfigurator.tsx.txt", "src/components/products/low-iron/LowIronSpecConfigurator.tsx"],
    ["LowIronApplicationsMatrix.tsx.txt", "src/components/products/low-iron/LowIronApplicationsMatrix.tsx"],
    ["page-low-iron-glass.tsx.txt", "src/app/products/low-iron-glass/page.tsx"]
  ];

  for (const [srcName, destRel] of files) {
    const content = readTxt(srcName);
    writeWithBackup(path.join(ROOT, destRel), content);
  }

  // 2. Auto-copy hero image if placed in edit/
  const imgCandidates = ["low-iron.jpg", "low-iron.webp", "low-iron-hero.webp"];
  let imgCopied = false;
  for (const cand of imgCandidates) {
    const srcImg = path.join(EDIT_DIR, cand);
    if (fs.existsSync(srcImg)) {
      const destImg = path.join(ROOT, "public/images/products/low-iron.jpg");
      if (!DRY_RUN) {
        fs.mkdirSync(path.dirname(destImg), { recursive: true });
        fs.copyFileSync(srcImg, destImg);
      }
      log("Copied product image: edit/" + cand + " -> public/images/products/low-iron.jpg");
      imgCopied = true;
      break;
    }
  }
  if (!imgCopied) {
    log("[INFO] No edit/low-iron.jpg found yet. Save the generated hero image to public/images/products/low-iron.jpg before push.");
  }

  // 3. Patch src/lib/products.ts
  const productsPath = path.join(ROOT, "src/lib/products.ts");
  if (fs.existsSync(productsPath)) {
    const src = fs.readFileSync(productsPath, "utf8");
    const eol = src.includes("\r\n") ? "\r\n" : "\n";
    if (src.includes("low-iron-glass")) {
      log("[SKIP] src/lib/products.ts already contains low-iron-glass");
    } else {
      const entry = [
        "  {",
        '    slug: "low-iron-glass",',
        '    name: "Low Iron Glass",',
        '    shortDescription: "Ultra-clear architectural float glass (Fe2O3 < 0.01%, up to 91.5% VLT) eliminating green edge tint. Available in 4-19mm tempered, laminated, IGU, and ceramic frit up to 3.3m x 15m.",',
        '    image: "/images/products/low-iron.jpg",',
        '    category: "Architectural Glass",',
        "    searchKeywords: [",
        '      "low iron glass",',
        '      "ultra clear glass",',
        '      "extra clear float glass",',
        '      "starphire alternative",',
        '      "crystal clear architectural glass",',
        '      "Fe2O3",',
        '      "VLT",',
        '      "IGU",',
        '      "\\u8d85\\u767d\\u73bb\\u7483",',
        '      "\\u4f4e\\u94c1\\u73bb\\u7483"',
        "    ],",
        "  },"
      ].join(eol);

      const anchorRe = /(\r?\n\];\s*\r?\n)/;
      if (anchorRe.test(src)) {
        const patched = src.replace(anchorRe, eol + entry + "$1");
        writeWithBackup(productsPath, patched);
      } else {
        log("[WARN] Could not auto-detect array end in src/lib/products.ts. Please inspect and add low-iron-glass manually.");
      }
    }
  } else {
    log("[WARN] src/lib/products.ts not found.");
  }

  // 4. Patch src/components/blog/RelatedProductsCards.tsx (PRODUCT_MAP)
  const relCardsPath = path.join(ROOT, "src/components/blog/RelatedProductsCards.tsx");
  if (fs.existsSync(relCardsPath)) {
    const src = fs.readFileSync(relCardsPath, "utf8");
    const eol = src.includes("\r\n") ? "\r\n" : "\n";
    if (src.includes('"low-iron-glass"') || src.includes("'low-iron-glass'")) {
      log("[SKIP] RelatedProductsCards.tsx already has low-iron-glass");
    } else {
      const mapEntry = [
        '  "low-iron-glass": {',
        '    name: "Low Iron Glass",',
        '    tagline: "Ultra-clear float (<0.01% Fe2O3) up to 3.3m x 15m",',
        '    image: "/images/products/low-iron.jpg",',
        '    href: "/products/low-iron-glass",',
        "  },"
      ].join(eol);
      const mapRe = /(PRODUCT_MAP[\s\S]*?=\s*\{[\s\S]*?)(\r?\n\};)/;
      if (mapRe.test(src)) {
        const patched = src.replace(mapRe, "$1" + eol + mapEntry + "$2");
        writeWithBackup(relCardsPath, patched);
      } else {
        log("[WARN] Could not auto-patch PRODUCT_MAP in RelatedProductsCards.tsx. Please add low-iron-glass manually.");
      }
    }
  }

  // 5. Check src/lib/dict.ts (remind/verify EN & ES keys)
  const dictPath = path.join(ROOT, "src/lib/dict.ts");
  if (fs.existsSync(dictPath)) {
    const dictSrc = fs.readFileSync(dictPath, "utf8");
    if (dictSrc.includes("low-iron-glass") || dictSrc.includes("lowIron")) {
      log("[SKIP] src/lib/dict.ts already references low-iron-glass / lowIron");
    } else {
      log("[ACTION REQUIRED] Please add low-iron-glass .name & .desc to both EN and ES blocks in src/lib/dict.ts (verify 4 matches with: findstr /n \"low-iron\" src\\lib\\dict.ts).");
    }
  }

  log("=== Done! Run `npm run build` next to verify. ===");
}

main();
