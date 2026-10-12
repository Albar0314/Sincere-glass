#!/usr/bin/env node
/**
 * Fix GSC "产品摘要 — 应指定 offers/review/aggregateRating" error
 * via Plan B: convert Product schema → Service schema.
 *
 * Why: Sincere Glass product pages are NOT e-commerce SKU pages. They're
 * B2B capability pages (quote-driven, custom specs). Google's Product
 * rich-result requires offers/review/aggregateRating — none of which fit
 * a B2B custom-quote workflow without faking data. Service schema is
 * what Google actually recommends for "we provide X service" pages.
 *
 * What this does:
 *   - Walks src/app/**​/page.tsx (EN + ES mirror under src/app/es/)
 *   - Finds every JSON-LD object literal with "@type": "Product"
 *   - Extracts the source span (not AST) of name/description/image/url
 *     so template strings and variable refs stay byte-identical
 *   - Replaces the Product object with a Service object carrying:
 *     serviceType, name, description, image, url, category,
 *     provider (Organization), areaServed, audience (BusinessAudience)
 *   - Leaves FAQPage schemas alone (FAQ rich result still works for B2B)
 *   - Leaves everything else in the file byte-identical (position-based
 *     substring replace, no file-wide reformat)
 *
 * Idempotent: files already converted to Service are skipped.
 *
 * Run from project root:
 *   node edit/convert-product-to-service-schema.mjs
 *
 * Then: git diff → review → commit → push → Vercel deploy
 *       → Rich Results Test → GSC "验证修正情况"
 */

import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";
import _traverse from "@babel/traverse";

const traverse = _traverse.default || _traverse;

// ---- CONFIG -----------------------------------------------------------------
const ROOTS = ["src/app"]; // walks recursively; ES mirror lives under src/app/es/
const BRAND_NAME = "Sincere Glass";
const BRAND_URL = "https://sincereglass.com";
const SERVICE_TYPE = "Architectural Glass Manufacturing";
const CATEGORY = "Architectural Glass";
const AREA_SERVED = "Worldwide";
const AUDIENCE_TYPE = "Architects, Contractors, Facade Engineers, Glass Importers";
// -----------------------------------------------------------------------------

function* walkPageTsx(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "api" || entry.name === "_i18n") continue;
      yield* walkPageTsx(full);
    } else if (entry.isFile() && entry.name === "page.tsx") {
      yield full;
    }
  }
}

function findTypeProp(objExpr, typeValue) {
  if (!objExpr || objExpr.type !== "ObjectExpression") return null;
  return objExpr.properties.find(
    (p) =>
      p.type === "ObjectProperty" &&
      p.key &&
      ((p.key.type === "StringLiteral" && p.key.value === "@type") ||
        (p.key.type === "Identifier" && p.key.name === "@type")) &&
      p.value &&
      p.value.type === "StringLiteral" &&
      p.value.value === typeValue
  );
}

function isSchemaObject(objExpr) {
  if (!objExpr || objExpr.type !== "ObjectExpression") return false;
  return objExpr.properties.some(
    (p) =>
      p.type === "ObjectProperty" &&
      p.key &&
      ((p.key.type === "StringLiteral" && p.key.value === "@context") ||
        (p.key.type === "Identifier" && p.key.name === "@context"))
  );
}

function getPropSource(src, obj, keyName) {
  const prop = obj.properties.find(
    (p) =>
      p.type === "ObjectProperty" &&
      p.key &&
      ((p.key.type === "Identifier" && p.key.name === keyName) ||
        (p.key.type === "StringLiteral" && p.key.value === keyName))
  );
  if (!prop) return null;
  return src.substring(prop.value.start, prop.value.end);
}

function detectBaseIndent(src, obj) {
  const before = src.substring(0, obj.start);
  const lineStart = before.lastIndexOf("\n") + 1;
  return src.substring(lineStart, obj.start);
}

function hasContextProp(obj) {
  return obj.properties.some(
    (p) =>
      p.type === "ObjectProperty" &&
      p.key &&
      ((p.key.type === "StringLiteral" && p.key.value === "@context") ||
        (p.key.type === "Identifier" && p.key.name === "@context"))
  );
}

function buildServiceObject(src, obj, baseIndent) {
  const i = baseIndent;
  const i1 = baseIndent + "  ";
  const i2 = baseIndent + "    ";

  const name = getPropSource(src, obj, "name");
  const description = getPropSource(src, obj, "description");
  const image = getPropSource(src, obj, "image");
  const url = getPropSource(src, obj, "url");

  const lines = [];
  lines.push(`{`);
  if (hasContextProp(obj)) {
    lines.push(`${i1}"@context": "https://schema.org",`);
  }
  lines.push(`${i1}"@type": "Service",`);
  lines.push(`${i1}serviceType: ${JSON.stringify(SERVICE_TYPE)},`);
  if (name) lines.push(`${i1}name: ${name},`);
  if (description) lines.push(`${i1}description: ${description},`);
  if (image) lines.push(`${i1}image: ${image},`);
  if (url) lines.push(`${i1}url: ${url},`);
  lines.push(`${i1}category: ${JSON.stringify(CATEGORY)},`);
  lines.push(`${i1}provider: {`);
  lines.push(`${i2}"@type": "Organization",`);
  lines.push(`${i2}name: ${JSON.stringify(BRAND_NAME)},`);
  lines.push(`${i2}url: ${JSON.stringify(BRAND_URL)},`);
  lines.push(`${i1}},`);
  lines.push(`${i1}areaServed: {`);
  lines.push(`${i2}"@type": "Place",`);
  lines.push(`${i2}name: ${JSON.stringify(AREA_SERVED)},`);
  lines.push(`${i1}},`);
  lines.push(`${i1}audience: {`);
  lines.push(`${i2}"@type": "BusinessAudience",`);
  lines.push(`${i2}audienceType: ${JSON.stringify(AUDIENCE_TYPE)},`);
  lines.push(`${i1}},`);
  lines.push(`${i}}`);
  return lines.join("\n");
}

function patchFile(absPath) {
  const src = fs.readFileSync(absPath, "utf8");

  let ast;
  try {
    ast = parse(src, { sourceType: "module", plugins: ["typescript", "jsx"] });
  } catch (e) {
    return { status: "parse-error", error: e.message };
  }

  const productObjs = [];
  let serviceAlreadyFound = 0;

  traverse(ast, {
    ObjectExpression(nodePath) {
      const obj = nodePath.node;
      if (!isSchemaObject(obj)) return;
      if (findTypeProp(obj, "Product")) productObjs.push(obj);
      else if (findTypeProp(obj, "Service")) serviceAlreadyFound++;
    },
  });

  if (productObjs.length === 0) {
    if (serviceAlreadyFound > 0) return { status: "already-service" };
    return { status: "no-product-schema" };
  }

  // Apply edits bottom-up so earlier positions stay valid
  productObjs.sort((a, b) => b.start - a.start);
  let out = src;
  for (const obj of productObjs) {
    const baseIndent = detectBaseIndent(src, obj);
    const replacement = buildServiceObject(src, obj, baseIndent);
    out = out.substring(0, obj.start) + replacement + out.substring(obj.end);
  }

  fs.writeFileSync(absPath, out, "utf8");
  return { status: "patched", count: productObjs.length };
}

// ---- Run --------------------------------------------------------------------
console.log("Converting Product → Service schema (B2B-correct, GSC-clean)\n");

const stats = { patched: 0, alreadyService: 0, noSchema: 0, errored: 0, errorFiles: [] };

for (const root of ROOTS) {
  for (const file of walkPageTsx(root)) {
    const rel = path.relative(process.cwd(), file);
    const result = patchFile(file);
    if (result.status === "patched") {
      console.log(`  OK:                 ${rel}  (converted ${result.count} schema${result.count > 1 ? "s" : ""})`);
      stats.patched++;
    } else if (result.status === "already-service") {
      // silent — already migrated
      stats.alreadyService++;
    } else if (result.status === "no-product-schema") {
      // silent — most pages have no Product schema at all
      stats.noSchema++;
    } else {
      console.log(`  ERROR:              ${rel}  — ${result.error || result.status}`);
      stats.errored++;
      stats.errorFiles.push(rel);
    }
  }
}

console.log("");
console.log(
  `Summary: ${stats.patched} patched · ${stats.alreadyService} already Service · ${stats.noSchema} no schema · ${stats.errored} errored`
);
if (stats.errored) {
  console.log("Errored files:");
  stats.errorFiles.forEach((f) => console.log(`  - ${f}`));
}
console.log("");
console.log("Next steps:");
console.log("  1. git diff src/app/");
console.log("     Confirm: @type flipped to \"Service\", name/description/image/url preserved,");
console.log("     provider/areaServed/audience blocks appended, FAQPage schema untouched.");
console.log("  2. npm run dev → open /products/tempered-glass → view page source");
console.log("     Find <script type=\"application/ld+json\"> blocks:");
console.log("       - One should now be @type: Service");
console.log("       - FAQPage block should still be present");
console.log("  3. git commit && push → wait for Vercel deploy");
console.log("  4. Validate with https://search.google.com/test/rich-results");
console.log("     Service schema shows as \"Detected structured data\" (no rich-result preview — that's correct, intentional).");
console.log("     FAQPage should still show as eligible for FAQ rich result.");
console.log("  5. GSC → 产品摘要 报错项 → 「验证修正情况」");
console.log("     Google re-crawls over several days to a few weeks.");
console.log("     Expected: Product issue count → 0 (because no Product markup exists anymore).");
console.log("  6. Monitor GSC → 增强功能 → 常见问题解答 (FAQ) tab to confirm FAQ still indexed.");
