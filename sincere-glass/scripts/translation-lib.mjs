// scripts/translation-lib.mjs
// V3 — adds data-array/object/const extraction so components that store
// user-facing text in `const data = [{title, description, ...}, ...]`
// patterns get translated properly.
//
// Replaces V2 wholesale. Safe to overwrite.

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
import generateModule from '@babel/generator';
import * as typesModule from '@babel/types';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const traverse = traverseModule.default || traverseModule;
const generate = generateModule.default || generateModule;
const t = typesModule.default || typesModule; // handles both ESM default and CJS namespace

// ============================================================
// Config
// ============================================================
export function loadConfig() {
  const primary = {
    apiKey: process.env.ANTHROPIC_API_KEY,
    baseURL: process.env.ANTHROPIC_BASE_URL,
    model: process.env.PRIMARY_MODEL || 'claude-sonnet-4-6',
  };
  const backup = {
    apiKey: process.env.BACKUP_API_KEY,
    baseURL: process.env.BACKUP_BASE_URL,
    model: process.env.BACKUP_MODEL || primary.model,
  };
  if (!primary.apiKey) {
    throw new Error('ANTHROPIC_API_KEY not set in .env.local — translation cannot proceed.');
  }
  return { primary, backup };
}

// ============================================================
// Cache
// ============================================================
export class TranslationCache {
  constructor(cacheDir, locale) {
    this.cacheDir = cacheDir;
    this.locale = locale;
    this.cachePath = path.join(cacheDir, `${locale}.json`);
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
    this.data = fs.existsSync(this.cachePath)
      ? JSON.parse(fs.readFileSync(this.cachePath, 'utf-8'))
      : {};
  }
  hash(text) {
    return crypto.createHash('sha256').update(text).digest('hex').slice(0, 16);
  }
  get(text) {
    const entry = this.data[this.hash(text)];
    return entry ? entry.translation : null;
  }
  set(text, translation) {
    this.data[this.hash(text)] = { source: text.slice(0, 200), translation };
  }
  save() {
    fs.writeFileSync(this.cachePath, JSON.stringify(this.data, null, 2));
  }
}

// ============================================================
// Glossary
// ============================================================
export function loadGlossary(locale) {
  const p = path.resolve('translation/glossary', `${locale}.json`);
  if (!fs.existsSync(p)) throw new Error(`Glossary not found: ${p}`);
  const data = JSON.parse(fs.readFileSync(p, 'utf-8'));
  const terms = {};
  for (const [category, mappings] of Object.entries(data)) {
    if (category.startsWith('_')) continue;
    for (const [en, translation] of Object.entries(mappings)) {
      terms[en] = translation;
    }
  }
  return terms;
}

export function buildGlossarySystemPrompt(locale, glossary) {
  const localeName = locale === 'es'
    ? 'Spanish (international variant, suitable for both Spain and Latin America)'
    : locale;

  const termList = Object.entries(glossary)
    .map(([en, loc]) => `  "${en}" → "${loc}"`)
    .join('\n');

  return `You are translating B2B architectural glass industry website content from English to ${localeName}. The source website is Sincere Glass (sincereglass.com), a Chinese glass manufacturer entering international markets.

TERMINOLOGY GLOSSARY (MUST USE):
When any of these English terms appear in the source (case-insensitive match), you MUST use the exact corresponding target-language term:
${termList}

TRANSLATION RULES:
1. Preserve the brand name "Sincere Glass" unchanged.
2. Preserve proper nouns unchanged: Wuhan, Hubei, Honghu, Wujin, Hannan, Xintan, Li Cheng, Li Chuanren.
3. Preserve all numbers, measurements, dimensions, and units exactly as written: 3m×15m, 20,000 m², 15+ years, 6mm, 120+, 17,000㎡, etc.
4. Preserve standard codes exactly: EN 12150, EN 14449, EN 1279, ASTM C1048, ISO 9001, 3C, CCC, CE, IBC, SGCC, etc.
5. Preserve URLs, email addresses, phone numbers.
6. Preserve placeholder tokens unchanged: {name}, {count}, {{var}}, ${'${'}...${'}'}.
7. Maintain B2B professional tone — formal, trustworthy, technical. This is for architects, construction buyers, and import specifiers, not consumers.
8. Match the sentence length and energy of the source. Do not add explanatory padding.
9. If a word has no direct equivalent (e.g. acronyms), transliterate or keep the English with a brief parenthetical gloss on first use.
10. Short award / certification names stay compact: "Zero Safety Accident Award" → a correspondingly compact Spanish title, not a long explanation.

OUTPUT FORMAT:
Return ONLY the translated text. No quotes around it, no "Here is the translation:" preamble, no commentary.`;
}

// ============================================================
// Translator — Anthropic SDK with primary/backup fallback
// ============================================================
export class Translator {
  constructor(config, systemPrompt) {
    this.primary = config.primary;
    this.backup = config.backup;
    this.systemPrompt = systemPrompt;
    this.primaryClient = new Anthropic({
      apiKey: this.primary.apiKey,
      baseURL: this.primary.baseURL,
    });
    this.backupClient = this.backup.apiKey && this.backup.baseURL
      ? new Anthropic({ apiKey: this.backup.apiKey, baseURL: this.backup.baseURL })
      : null;
  }

  async _call(client, model, userMessage, maxTokens) {
    const res = await client.messages.create({
      model,
      max_tokens: maxTokens,
      system: this.systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    });
    const block = res.content.find(b => b.type === 'text');
    if (!block) throw new Error('No text block in response');
    return block.text.trim();
  }

  async translateOne(text) {
    const prompt = `Translate the following text:\n\n${text}`;
    try {
      return await this._call(this.primaryClient, this.primary.model, prompt, 2048);
    } catch (err) {
      console.warn(`  ⚠️  Primary API failed (${err.message?.slice(0, 80)}), trying backup...`);
      if (!this.backupClient) throw err;
      return await this._call(this.backupClient, this.backup.model, prompt, 2048);
    }
  }

  async translateBatch(items) {
    const batchSize = 15;
    const results = {};
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const numbered = batch
        .map((text, idx) => `[${idx + 1}]\n${text}`)
        .join('\n\n---SEPARATOR---\n\n');
      const prompt = `Translate each of the following ${batch.length} numbered items independently. Keep the [N] prefix exactly. Separate your translations with the exact string "---SEPARATOR---" on its own line.\n\n${numbered}`;

      let response;
      try {
        response = await this._call(this.primaryClient, this.primary.model, prompt, 8192);
      } catch (err) {
        console.warn(`  ⚠️  Batch failed on primary (${err.message?.slice(0, 80)}), trying backup...`);
        if (!this.backupClient) throw err;
        response = await this._call(this.backupClient, this.backup.model, prompt, 8192);
      }

      const parts = response.split(/\n\s*-{3,}SEPARATOR-{3,}\s*\n/).map(s => s.trim());
      for (const part of parts) {
        const m = part.match(/^\[(\d+)\]\s*([\s\S]+)$/);
        if (m) {
          const idx = parseInt(m[1]) - 1;
          if (batch[idx] !== undefined) results[batch[idx]] = m[2].trim();
        }
      }
      for (const text of batch) {
        if (!results[text]) {
          console.warn(`  ⚠️  Batch missed one, translating individually: "${text.slice(0, 50)}..."`);
          try {
            results[text] = await this.translateOne(text);
          } catch (err) {
            console.error(`  ❌ Failed to translate: "${text.slice(0, 50)}..."`);
            results[text] = text;
          }
        }
      }
      console.log(`  → batch ${Math.min(i + batchSize, items.length)}/${items.length} done`);
    }
    return results;
  }
}

// ============================================================
// String-translatability heuristic
// ============================================================
function shouldTranslate(text) {
  if (!text) return false;
  const trimmed = text.trim();
  if (!trimmed) return false;
  if (trimmed.length < 2) return false;
  if (/^[\d\s.,:;!?'"()\-\[\]{}+×x*/<>%&|@#$~`]+$/.test(trimmed)) return false;
  if (/^https?:\/\//.test(trimmed)) return false;
  if (/^[\w.-]+@[\w.-]+\.\w+$/.test(trimmed)) return false;
  // Looks like an image/asset path
  if (/\.(png|jpe?g|webp|svg|gif|mp4|webm|pdf|ico)($|\?)/i.test(trimmed)) return false;
  // CSS/tech token (no spaces, short, no accented chars)
  if (/^[A-Za-z0-9_-]+$/.test(trimmed) && trimmed.length < 20 && !/[a-z][A-Z]/.test(trimmed)) {
    return false;
  }
  // Looks like a hex color
  if (/^#[0-9a-fA-F]{3,8}$/.test(trimmed)) return false;
  // Pure CSS value like "rgba(...)" or "1rem" or "100%"
  if (/^(rgb|rgba|hsl|hsla|var|calc)\s*\(/i.test(trimmed)) return false;
  if (/^[\d.]+(rem|em|px|vh|vw|%|s|ms|deg)$/i.test(trimmed)) return false;
  return true;
}

// ============================================================
// Property-name whitelist for data extraction
// ============================================================
// A string value is extracted if its ENCLOSING KEY matches one of these.
// For arrays whose parent key matches, every string element is extracted.
const TRANSLATABLE_KEYS = new Set([
  // Headings / titles
  'title', 'subtitle', 'heading', 'subheading', 'headline', 'sectionTitle',
  'sectionHeading', 'pageTitle', 'tagline', 'slogan', 'name', 'label',
  'caption', 'kicker', 'eyebrow', 'prefix', 'suffix',
  // Body / description
  'description', 'desc', 'summary', 'intro', 'body', 'content', 'text',
  'bio', 'about', 'detail', 'details', 'message', 'note', 'blurb',
  'excerpt', 'answer', 'question', 'paragraph', 'copy', 'snippet',
  'teaser', 'longDescription', 'shortDescription', 'overview',
  // CTAs
  'cta', 'ctaText', 'ctaLabel', 'buttonText', 'buttonLabel',
  'linkText', 'linkLabel', 'actionText', 'actionLabel',
  // People / orgs
  'role', 'position', 'jobTitle', 'department', 'company', 'organization',
  'author', 'authorName', 'speaker', 'founder', 'leader',
  // Location
  'address', 'location', 'city', 'country', 'region', 'state', 'province',
  'street', 'address1', 'address2', 'place',
  // Timeline / credentials / achievements
  'milestone', 'achievement', 'award', 'certification', 'recognition',
  'credential', 'qualification', 'event', 'highlight', 'badge',
  'honor', 'standard',
  // Features / benefits
  'feature', 'features', 'benefit', 'benefits', 'bullet', 'bullets',
  'point', 'points', 'highlights', 'advantages', 'reasons',
  // Generic items
  'item', 'items', 'option', 'options', 'choice', 'choices',
  'category', 'tag', 'tags', 'topic', 'subject',
  // Quotes / testimonials
  'quote', 'quoteText', 'testimonial', 'review', 'citation',
  // Industry-specific common
  'applicationName', 'useCase', 'application', 'applications',
  'performanceNote', 'spec', 'specValue', 'specLabel',
]);

function isTranslatableKey(key) {
  if (!key) return false;
  return TRANSLATABLE_KEYS.has(key);
}

// ============================================================
// JSX attribute whitelist (user-facing text in attributes)
// ============================================================
const TRANSLATABLE_PROPS = new Set([
  'title', 'description', 'alt', 'placeholder', 'label',
  'aria-label', 'aria-description', 'ariaLabel', 'ariaDescription',
  'caption', 'tooltip',
]);

const METADATA_TEXT_FIELDS = new Set(['title', 'description', 'name', 'siteName']);

// ============================================================
// Parse + extract
// ============================================================
export function parseFile(sourceCode) {
  return parse(sourceCode, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
    errorRecovery: true,
  });
}

export function extractTranslatable(sourceCode) {
  const ast = parseFile(sourceCode);
  const items = [];
  const localImports = new Set();
  const skippedComplex = [];

  // Recursive data walker: looks for strings in arrays/objects whose
  // enclosing key name is in TRANSLATABLE_KEYS.
  const walkDataNode = (node, parentKey, depth = 0) => {
    if (!node || depth > 15) return; // prevent runaway recursion

    if (node.type === 'ArrayExpression') {
      const parentTranslatable = parentKey && isTranslatableKey(parentKey);
      for (const el of node.elements) {
        if (!el) continue;
        if (el.type === 'StringLiteral' && parentTranslatable && shouldTranslate(el.value)) {
          items.push({ text: el.value, node: el, type: 'array-string', meta: { parentKey } });
        } else if (el.type === 'ObjectExpression' || el.type === 'ArrayExpression') {
          walkDataNode(el, parentKey, depth + 1);
        }
      }
      return;
    }

    if (node.type === 'ObjectExpression') {
      for (const prop of node.properties) {
        if (prop.type !== 'ObjectProperty') continue;
        const keyName = prop.key.name ?? prop.key.value;
        if (!keyName) continue;

        if (prop.value.type === 'StringLiteral') {
          if (isTranslatableKey(keyName) && shouldTranslate(prop.value.value)) {
            items.push({
              text: prop.value.value,
              node: prop.value,
              type: 'object-string',
              meta: { key: keyName },
            });
          }
        } else if (
          prop.value.type === 'ObjectExpression' ||
          prop.value.type === 'ArrayExpression'
        ) {
          walkDataNode(prop.value, keyName, depth + 1);
        } else if (prop.value.type === 'TemplateLiteral') {
          // template literals with text content — skip for now, log
          if (isTranslatableKey(keyName) && prop.value.quasis.length === 1) {
            const raw = prop.value.quasis[0].value.cooked;
            if (raw && shouldTranslate(raw)) {
              items.push({
                text: raw,
                node: prop.value.quasis[0],
                type: 'template-literal-static',
                meta: { key: keyName },
              });
            }
          } else {
            skippedComplex.push({
              type: 'dynamic template literal',
              key: keyName,
              loc: prop.value.loc?.start,
            });
          }
        }
      }
      return;
    }
  };

  // Metadata-object walker (shallow + openGraph nested)
  const walkMetadataNode = (objExpr, pathHint) => {
    for (const prop of objExpr.properties || []) {
      if (prop.type !== 'ObjectProperty') continue;
      const key = prop.key.name ?? prop.key.value;
      const subPath = pathHint ? `${pathHint}.${key}` : key;
      if (prop.value.type === 'StringLiteral' && METADATA_TEXT_FIELDS.has(key)) {
        if (shouldTranslate(prop.value.value)) {
          items.push({
            text: prop.value.value,
            node: prop.value,
            type: 'metadata',
            meta: { path: subPath },
          });
        }
      } else if (prop.value.type === 'ObjectExpression') {
        walkMetadataNode(prop.value, subPath);
      }
    }
  };

  traverse(ast, {
    ImportDeclaration(p) {
      const src = p.node.source.value;
      if (src.startsWith('@/') || src.startsWith('./') || src.startsWith('../')) {
        localImports.add(src);
      }
    },

    ExportNamedDeclaration(p) {
      // export { X } from 'Y' / export { default as X } from 'Y'
      if (p.node.source) {
        const src = p.node.source.value;
        if (src.startsWith('@/') || src.startsWith('./') || src.startsWith('../')) {
          localImports.add(src);
        }
      }
    },

    ExportAllDeclaration(p) {
      // export * from 'Y' / export * as X from 'Y'
      const src = p.node.source.value;
      if (src.startsWith('@/') || src.startsWith('./') || src.startsWith('../')) {
        localImports.add(src);
      }
    },

    JSXText(p) {
      const raw = p.node.value;
      const trimmed = raw.trim();
      if (!shouldTranslate(trimmed)) return;
      const wsBefore = raw.match(/^\s*/)[0];
      const wsAfter = raw.match(/\s*$/)[0];
      items.push({
        text: trimmed,
        node: p.node,
        type: 'jsx-text',
        meta: { wsBefore, wsAfter },
      });
    },

    JSXAttribute(p) {
      const nameNode = p.node.name;
      const name = nameNode.type === 'JSXIdentifier'
        ? nameNode.name
        : (nameNode.namespace?.name + ':' + nameNode.name?.name);
      if (!TRANSLATABLE_PROPS.has(name)) return;
      const val = p.node.value;
      if (!val) return;
      if (val.type === 'StringLiteral' && shouldTranslate(val.value)) {
        items.push({ text: val.value, node: val, type: 'jsx-attr', meta: { attrName: name } });
      } else if (
        val.type === 'JSXExpressionContainer' &&
        val.expression.type === 'StringLiteral' &&
        shouldTranslate(val.expression.value)
      ) {
        items.push({ text: val.expression.value, node: val.expression, type: 'jsx-attr-expr', meta: { attrName: name } });
      } else if (val.type === 'JSXExpressionContainer' && val.expression.type === 'TemplateLiteral') {
        skippedComplex.push({ type: 'template literal in prop', attrName: name, loc: val.loc?.start });
      }
    },

    VariableDeclarator(p) {
      const varName = p.node.id?.name;

      // Metadata object (preserve existing behavior)
      if (varName === 'metadata' && p.node.init?.type === 'ObjectExpression') {
        walkMetadataNode(p.node.init, 'metadata');
        return;
      }

      // Module/function-scoped const whose name hints user-facing text
      // Example: const sectionTitle = "Leadership";
      if (
        p.node.init?.type === 'StringLiteral' &&
        varName &&
        isTranslatableKey(varName) &&
        shouldTranslate(p.node.init.value)
      ) {
        items.push({
          text: p.node.init.value,
          node: p.node.init,
          type: 'const-string',
          meta: { varName },
        });
      }

      // Data arrays / objects
      if (
        p.node.init &&
        (p.node.init.type === 'ArrayExpression' || p.node.init.type === 'ObjectExpression')
      ) {
        walkDataNode(p.node.init, varName, 0);
      }
    },
  });

  return { ast, items, localImports: Array.from(localImports), skippedComplex };
}

// ============================================================
// Apply translations (in-place AST mutation)
// ============================================================
export function applyTranslationsInPlace(items, translations) {
  for (const item of items) {
    const translated = translations[item.text];
    if (!translated) continue;
    if (item.type === 'jsx-text') {
      item.node.value = (item.meta.wsBefore || '') + translated + (item.meta.wsAfter || '');
    } else if (item.type === 'template-literal-static') {
      // TemplateElement — needs both cooked and raw
      item.node.value = { raw: translated, cooked: translated };
    } else {
      item.node.value = translated;
    }
  }
}

export function applyTranslations(ast, items, translations) {
  applyTranslationsInPlace(items, translations);
  return generateCode(ast);
}

/**
 * Convert JSXText nodes containing dangerous characters (< > { })
 * into JSXExpressionContainer with a string literal, so Babel's code
 * generator produces output that SWC can parse without ambiguity.
 *
 * Example:
 *   <span>< 2 horas</span>  (invalid when generated as raw JSXText)
 * becomes:
 *   <span>{"< 2 horas"}</span>  (unambiguous expression container)
 */
function fixDangerousJSXText(ast) {
  traverse(ast, {
    JSXText(path) {
      const raw = path.node.value;
      if (!raw) return;
      const trimmed = raw.trim();
      if (!trimmed) return;
      if (!/[<>{}]/.test(trimmed)) return;
      // Replace with { "trimmed" } expression container.
      // Surrounding whitespace is intentionally dropped — JSX would
      // collapse it anyway, and keeping it inside the string literal
      // would print as literal whitespace.
      path.replaceWith(t.jsxExpressionContainer(t.stringLiteral(trimmed)));
    },
  });
}

export function generateCode(ast) {
  fixDangerousJSXText(ast);
  return generate(ast, {
    retainLines: false,
    jsescOption: { minimal: true },
  }).code;
}

// ============================================================
// Import graph utilities
// ============================================================
export function resolveImport(spec, fromFile, projectRoot) {
  let base;
  if (spec.startsWith('@/')) {
    base = path.join(projectRoot, 'src', spec.slice(2));
  } else if (spec.startsWith('./') || spec.startsWith('../')) {
    base = path.resolve(path.dirname(fromFile), spec);
  } else {
    return null;
  }
  const candidates = [
    base + '.tsx',
    base + '.ts',
    path.join(base, 'index.tsx'),
    path.join(base, 'index.ts'),
  ];
  for (const c of candidates) {
    try {
      if (fs.statSync(c).isFile()) return c;
    } catch (_) {}
  }
  return null;
}

export function shouldFollowImport(spec) {
  if (spec.startsWith('@/components/')) return true;
  if (spec.startsWith('./') || spec.startsWith('../')) return true;
  return false;
}

export function isSharedContextFile(source) {
  return /\bcreateContext\s*[(<]/.test(source);
}

export function getMirrorPath(absPath, locale, projectRoot) {
  const rel = path.relative(projectRoot, absPath).split(path.sep).join('/');
  if (rel.startsWith('src/app/')) {
    const sub = rel.slice('src/app/'.length);
    return path.join(projectRoot, 'src', 'app', locale, sub);
  }
  if (rel.startsWith('src/components/')) {
    const sub = rel.slice('src/components/'.length);
    return path.join(projectRoot, 'src', '_i18n', locale, 'components', sub);
  }
  return null;
}

export function rewriteImportSpec(spec, locale, mirrorSet, fromFile, projectRoot) {
  const target = resolveImport(spec, fromFile, projectRoot);
  if (!target || !mirrorSet.has(target)) return spec;
  if (spec.startsWith('@/components/')) {
    return spec.replace('@/components/', `@/_i18n/${locale}/components/`);
  }
  return spec;
}

export function rewriteImportsInPlace(ast, locale, mirrorSet, fromFile, projectRoot) {
  const rewrites = [];
  traverse(ast, {
    ImportDeclaration(p) {
      const original = p.node.source.value;
      const rewritten = rewriteImportSpec(original, locale, mirrorSet, fromFile, projectRoot);
      if (rewritten !== original) {
        p.node.source.value = rewritten;
        rewrites.push({ from: original, to: rewritten });
      }
    },

    ExportNamedDeclaration(p) {
      if (!p.node.source) return;
      const original = p.node.source.value;
      const rewritten = rewriteImportSpec(original, locale, mirrorSet, fromFile, projectRoot);
      if (rewritten !== original) {
        p.node.source.value = rewritten;
        rewrites.push({ from: original, to: rewritten });
      }
    },

    ExportAllDeclaration(p) {
      const original = p.node.source.value;
      const rewritten = rewriteImportSpec(original, locale, mirrorSet, fromFile, projectRoot);
      if (rewritten !== original) {
        p.node.source.value = rewritten;
        rewrites.push({ from: original, to: rewritten });
      }
    },
  });
  return rewrites;
}
