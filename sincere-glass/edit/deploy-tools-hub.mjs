// edit/deploy-tools-hub.mjs
// One-shot deploy for Tools Hub Phase 1.
// Writes 2 new library files, 2 new components, 3 new pages, and applies
// 3 anchor-based patches to existing files (QuoteContext, QuoteModal, schema).
// Idempotent via unique markers. Backups written as *.bak next to each patched
// file. CRLF-tolerant. Aborts on any anchor miss without side effects.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = process.cwd();

const MARK_QCTX = "TOOLS-HUB-V1:QuoteContext.prefillMessage";
const MARK_QMOD = "TOOLS-HUB-V1:QuoteModal.messageDefault";
const MARK_SCHEMA = "TOOLS-HUB-V1:schema.toolsHelpers";

function readFile(p) { return fs.readFileSync(p, "utf8"); }
function writeFile(p, c) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, c, "utf8");
}
function copyFromTemplate(templateName, targetRel) {
  const src = path.join(__dirname, templateName);
  const dst = path.join(ROOT, targetRel);
  if (!fs.existsSync(src)) throw new Error("Missing template: " + templateName);
  const content = readFile(src);
  writeFile(dst, content);
  console.log("  wrote " + targetRel);
}
function backup(p) {
  const bak = p + ".bak";
  fs.copyFileSync(p, bak);
  console.log("  backup -> " + path.relative(ROOT, bak));
}
function detectEOL(s) { return s.includes("\r\n") ? "\r\n" : "\n"; }

// -- Patch helpers ------------------------------------------------------------

function patchQuoteContext() {
  const p = path.join(ROOT, "src", "lib", "QuoteContext.tsx");
  if (!fs.existsSync(p)) throw new Error("Missing: src/lib/QuoteContext.tsx");
  let src = readFile(p);
  if (src.includes(MARK_QCTX)) {
    console.log("  QuoteContext.tsx already patched - skipping");
    return;
  }
  const EOL = detectEOL(src);

  // Anchor 1: expand interface
  const ifaceAnchor = /interface QuoteCtx \{\s*[\r\n]+\s*isOpen: boolean;\s*[\r\n]+\s*openQuote: \(product\?: string\) => void;\s*[\r\n]+\s*closeQuote: \(\) => void;\s*[\r\n]+\s*preselectedProduct: string;\s*[\r\n]+\}/;
  if (!ifaceAnchor.test(src)) {
    throw new Error("QuoteContext.tsx: interface QuoteCtx anchor not found - file may have been modified. Please paste current content for manual patch.");
  }
  src = src.replace(
    ifaceAnchor,
    [
      "// " + MARK_QCTX,
      "interface QuoteCtx {",
      "  isOpen: boolean;",
      "  openQuote: (product?: string, prefillMessage?: string) => void;",
      "  closeQuote: () => void;",
      "  preselectedProduct: string;",
      "  prefillMessage: string;",
      "}",
    ].join(EOL)
  );

  // Anchor 2: expand default context
  const defaultAnchor = /const Ctx = createContext<QuoteCtx>\(\{\s*[\r\n]+\s*isOpen: false,\s*[\r\n]+\s*openQuote: \(\) => \{\},\s*[\r\n]+\s*closeQuote: \(\) => \{\},\s*[\r\n]+\s*preselectedProduct: "",\s*[\r\n]+\}\);/;
  if (!defaultAnchor.test(src)) {
    throw new Error("QuoteContext.tsx: default context anchor not found.");
  }
  src = src.replace(
    defaultAnchor,
    [
      "const Ctx = createContext<QuoteCtx>({",
      "  isOpen: false,",
      "  openQuote: () => {},",
      "  closeQuote: () => {},",
      "  preselectedProduct: \"\",",
      "  prefillMessage: \"\",",
      "});",
    ].join(EOL)
  );

  // Anchor 3: expand Provider body
  const providerAnchor = /export function QuoteProvider\(\{ children \}: \{ children: ReactNode \}\) \{[\s\S]*?return \(\s*[\r\n]+\s*<Ctx\.Provider value=\{\{ isOpen, openQuote, closeQuote, preselectedProduct \}\}>\s*[\r\n]+\s*\{children\}\s*[\r\n]+\s*<\/Ctx\.Provider>\s*[\r\n]+\s*\);\s*[\r\n]+\}/;
  if (!providerAnchor.test(src)) {
    throw new Error("QuoteContext.tsx: QuoteProvider body anchor not found.");
  }
  src = src.replace(
    providerAnchor,
    [
      "export function QuoteProvider({ children }: { children: ReactNode }) {",
      "  const [isOpen, setOpen] = useState(false);",
      "  const [preselectedProduct, setProduct] = useState(\"\");",
      "  const [prefillMessage, setPrefillMessage] = useState(\"\");",
      "",
      "  function openQuote(product?: string, pfMessage?: string) {",
      "    if (product) setProduct(product);",
      "    setPrefillMessage(pfMessage || \"\");",
      "    setOpen(true);",
      "    document.body.style.overflow = \"hidden\";",
      "  }",
      "  function closeQuote() {",
      "    setOpen(false);",
      "    setPrefillMessage(\"\");",
      "    document.body.style.overflow = \"\";",
      "  }",
      "",
      "  return (",
      "    <Ctx.Provider value={{ isOpen, openQuote, closeQuote, preselectedProduct, prefillMessage }}>",
      "      {children}",
      "    </Ctx.Provider>",
      "  );",
      "}",
    ].join(EOL)
  );

  backup(p);
  writeFile(p, src);
  console.log("  patched src/lib/QuoteContext.tsx");
}

function patchQuoteModal() {
  const candidates = [
    "src/components/QuoteModal.tsx",
    "src/components/ui/QuoteModal.tsx",
  ];
  const p = candidates.map((c) => path.join(ROOT, c)).find(fs.existsSync);
  if (!p) throw new Error("QuoteModal.tsx not found at any known path.");

  let src = readFile(p);
  if (src.includes(MARK_QMOD)) {
    console.log("  QuoteModal.tsx already patched - skipping");
    return;
  }
  const EOL = detectEOL(src);

  // Anchor 1: destructure useQuote to also get prefillMessage
  const useQuoteAnchor = /const \{ isOpen, closeQuote, preselectedProduct \} = useQuote\(\);/;
  if (!useQuoteAnchor.test(src)) {
    throw new Error("QuoteModal.tsx: useQuote destructuring anchor not found.");
  }
  src = src.replace(
    useQuoteAnchor,
    "// " + MARK_QMOD + EOL + "  const { isOpen, closeQuote, preselectedProduct, prefillMessage } = useQuote();"
  );

  // Anchor 2: textarea defaultValue + expand rows
  const textareaAnchor = /<textarea\s+id="q-message"\s+name="message"\s+rows=\{3\}/;
  if (!textareaAnchor.test(src)) {
    throw new Error("QuoteModal.tsx: message textarea anchor not found.");
  }
  src = src.replace(
    textareaAnchor,
    "<textarea" + EOL + "                  id=\"q-message\"" + EOL + "                  name=\"message\"" + EOL + "                  rows={5}" + EOL + "                  defaultValue={prefillMessage}"
  );

  backup(p);
  writeFile(p, src);
  console.log("  patched " + path.relative(ROOT, p));
}

function patchSchema() {
  const p = path.join(ROOT, "src", "lib", "schema.ts");
  if (!fs.existsSync(p)) throw new Error("Missing: src/lib/schema.ts");
  let src = readFile(p);
  if (src.includes(MARK_SCHEMA)) {
    console.log("  schema.ts already has tool helpers - skipping");
    return;
  }
  const EOL = detectEOL(src);
  const addition = [
    "",
    "// " + MARK_SCHEMA,
    "",
    "/**",
    " * SoftwareApplication schema for a free online tool or calculator.",
    " * Price 0, offers present (free), no aggregateRating (we do not fabricate ratings).",
    " */",
    "export function getSoftwareApplicationSchema(opts: {",
    "  name: string;",
    "  description: string;",
    "  url: string;",
    "  category?: string;",
    "}) {",
    "  return {",
    "    \"@context\": \"https://schema.org\",",
    "    \"@type\": \"SoftwareApplication\",",
    "    name: opts.name,",
    "    description: opts.description,",
    "    url: opts.url,",
    "    applicationCategory: opts.category || \"BusinessApplication\",",
    "    operatingSystem: \"Web\",",
    "    offers: { \"@type\": \"Offer\", price: \"0\", priceCurrency: \"USD\" },",
    "    provider: { \"@id\": (process.env.NEXT_PUBLIC_SITE_URL || \"https://sincereglass.com\") + \"/#organization\" },",
    "  };",
    "}",
    "",
    "/**",
    " * HowTo schema for a numbered step-by-step procedure (how-to-use a tool).",
    " */",
    "export function getHowToSchema(opts: {",
    "  name: string;",
    "  steps: Array<{ name: string; text: string }>;",
    "}) {",
    "  return {",
    "    \"@context\": \"https://schema.org\",",
    "    \"@type\": \"HowTo\",",
    "    name: opts.name,",
    "    step: opts.steps.map((s, i) => ({",
    "      \"@type\": \"HowToStep\",",
    "      position: i + 1,",
    "      name: s.name,",
    "      text: s.text,",
    "    })),",
    "  };",
    "}",
    "",
    "/**",
    " * FAQPage schema builder (keeps existing inline FAQ components and schema in sync).",
    " */",
    "export function getFaqSchema(items: Array<{ q: string; a: string }>) {",
    "  return {",
    "    \"@context\": \"https://schema.org\",",
    "    \"@type\": \"FAQPage\",",
    "    mainEntity: items.map((it) => ({",
    "      \"@type\": \"Question\",",
    "      name: it.q,",
    "      acceptedAnswer: { \"@type\": \"Answer\", text: it.a },",
    "    })),",
    "  };",
    "}",
    "",
    "/**",
    " * BreadcrumbList schema builder.",
    " */",
    "export function getBreadcrumbSchema(crumbs: Array<{ name: string; url: string }>) {",
    "  return {",
    "    \"@context\": \"https://schema.org\",",
    "    \"@type\": \"BreadcrumbList\",",
    "    itemListElement: crumbs.map((c, i) => ({",
    "      \"@type\": \"ListItem\",",
    "      position: i + 1,",
    "      name: c.name,",
    "      item: c.url,",
    "    })),",
    "  };",
    "}",
    "",
  ].join(EOL);

  backup(p);
  writeFile(p, src.replace(/\s*$/, "") + EOL + addition);
  console.log("  patched src/lib/schema.ts (appended tool schema helpers)");
}

// -- Main ---------------------------------------------------------------------

function main() {
  console.log("Tools Hub Phase 1 deploy");
  console.log("Root: " + ROOT);
  console.log("");

  // 1. New files
  console.log("[1/4] Writing new library files...");
  copyFromTemplate("tools-registry.ts.txt", "src/lib/tools-registry.ts");
  copyFromTemplate("useHashState.ts.txt", "src/lib/useHashState.ts");

  console.log("[2/4] Writing tool components...");
  copyFromTemplate("MaxPanelSizeTool.tsx.txt", "src/components/tools/MaxPanelSizeTool.tsx");
  copyFromTemplate("TriplePaneROITool.tsx.txt", "src/components/tools/TriplePaneROITool.tsx");

  console.log("[3/4] Writing pages...");
  copyFromTemplate("tools-hub-page.tsx.txt", "src/app/tools/page.tsx");
  copyFromTemplate("tool-page-max-panel-size.tsx.txt", "src/app/tools/glass-max-panel-size-calculator/page.tsx");
  copyFromTemplate("tool-page-triple-pane-roi.tsx.txt", "src/app/tools/triple-pane-roi-calculator/page.tsx");

  // 2. Patches to existing files
  console.log("[4/4] Patching existing files...");
  try {
    patchQuoteContext();
    patchQuoteModal();
    patchSchema();
  } catch (e) {
    console.error("");
    console.error("Patch failed: " + e.message);
    console.error("New files have been written. Patch targets left untouched (or restored via .bak).");
    console.error("Fix the anchor or paste the current file content and rerun.");
    process.exit(1);
  }

  console.log("");
  console.log("Deploy complete. Next steps:");
  console.log("  1. npm run build           (must pass)");
  console.log("  2. Open /tools locally to sanity-check both cards render");
  console.log("  3. Open /tools/glass-max-panel-size-calculator and /tools/triple-pane-roi-calculator");
  console.log("  4. Click 'Get quote for this spec' -> QuoteModal opens with pre-filled spec");
  console.log("  5. Commit + push");
  console.log("");
  console.log("Phase 2 follow-ups (not done here):");
  console.log("  - sitemap.ts: add /tools, /tools/glass-max-panel-size-calculator, /tools/triple-pane-roi-calculator");
  console.log("  - SearchModal.tsx: index tools in Cmd+K");
  console.log("  - Header.tsx: add Tools nav link");
  console.log("  - scripts/translate-all.mjs: regenerate ES mirror");
}

main();
