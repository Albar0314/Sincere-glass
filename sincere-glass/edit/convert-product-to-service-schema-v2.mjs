#!/usr/bin/env node
/**
 * v2 — fixes detectBaseIndent bug in v1 that corrupted files where
 * the schema object sits inline after `const X = ` or similar
 * (returned the full line prefix instead of leading whitespace).
 *
 * Same behavior as v1 otherwise:
 *   Converts Product JSON-LD → Service JSON-LD across all page.tsx
 *   under src/app/ (EN + ES mirror). Preserves name/description/
 *   image/url source spans byte-identical. FAQPage schema untouched.
 *   Idempotent.
 *
 * Run from project root (after reverting any damage from v1):
 *   node edit/convert-product-to-service-schema-v2.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";
import _traverse from "@babel/traverse";

const traverse = _traverse.default || _traverse;

const ROOTS = ["src/app"];
const BRAND_NAME = "Sincere Glass";
const BRAND_URL = "https://sincereglass.com";
const SERVICE_TYPE = "Architectural Glass Manufacturing";
const CATEGORY = "Architectural Glass";
const AREA_SERVED = "Worldwide";
const AUDIENCE_TYPE = "Architects, Contractors, Facade Engineers, Glass Importers";

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

function findTypeProp(obj, typeValue) {
  if (!obj || obj.type !== "ObjectExpression") return null;
  return obj.properties.find(
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

function isSchemaObject(obj) {
  if (!obj || obj.type !== "ObjectExpression") return false;
  return obj.properties.some(
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

// FIXED: extract leading whitespace only, not the full line prefix.
// For `const productSchema = {` → base indent is "" (no leading whitespace).
// For `  return {`             → base indent is "  ".
// For `    {`                   → base indent is "    ".
function detectBaseIndent(src, obj) {
  const before = src.substring(0, obj.start);
  const lineStart = before.lastIndexOf("\n") + 1;
  const linePrefix = src.substring(lineStart, obj.start);
  const match = linePrefix.match(/^(\s*)/);
  return match ? match[1] : "";
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

console.log("Converting Product → Service schema (v2 — indent bug fixed)\n");

const stats = { patched: 0, alreadyService: 0, noSchema: 0, errored: 0, errorFiles: [] };

for (const root of ROOTS) {
  for (const file of walkPageTsx(root)) {
    const rel = path.relative(process.cwd(), file);
    const result = patchFile(file);
    if (result.status === "patched") {
      console.log(`  OK:     ${rel}  (+${result.count})`);
      stats.patched++;
    } else if (result.status === "already-service") {
      stats.alreadyService++;
    } else if (result.status === "no-product-schema") {
      stats.noSchema++;
    } else {
      console.log(`  ERROR:  ${rel}  — ${result.error || result.status}`);
      stats.errored++;
      stats.errorFiles.push(rel);
    }
  }
}

console.log("");
console.log(
  `Summary: ${stats.patched} patched · ${stats.alreadyService} already Service · ${stats.noSchema} no schema · ${stats.errored} errored`
);

console.log("");
console.log("Next:");
console.log("  1. git diff src/app/   (sanity check — no `const productSchema = ` leaks on every line)");
console.log("  2. npm run build       (confirm compiles locally before pushing)");
console.log("  3. Commit and push");
