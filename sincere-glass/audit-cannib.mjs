// audit-cannib.mjs — 从 blog-registry.ts 解析 11 篇文章的 SEO 字段
// 用法：node audit-cannib.mjs

import { readFileSync, writeFileSync } from 'node:fs';

const REGISTRY = 'src/lib/blog-registry.ts';

const GROUPS = [
  ['A: architectural-glass-* (6)', [
    'architectural-glass-types-guide',
    'architectural-glass-applications-guide',
    'architectural-glass-manufacturing-guide',
    'architectural-glass-specification-guide',
    'architectural-glass-china-buyer-guide',
    'architectural-glass-supplier-china-vetting',
  ]],
  ['B: insulated-glass (3)', [
    'how-is-insulated-glass-made',
    'insulated-glass-complete-guide',
    'insulated-glass-vs-laminated-glass',
  ]],
  ['C: low-iron-glass (2)', [
    'low-iron-glass-complete-guide',
    'low-iron-glass-vs-clear-glass',
  ]],
];

const src = readFileSync(REGISTRY, 'utf8');

function extractEntry(slug) {
  const slugRe = new RegExp(`slug:\\s*['"\`]${slug}['"\`]`);
  const m = src.match(slugRe);
  if (!m) return null;

  // 从 slug 位置向后找匹配的闭合 }
  // 先向前找开头的 {
  let i = m.index;
  let depth = 0;
  while (i > 0) {
    i--;
    if (src[i] === '}') depth++;
    else if (src[i] === '{') {
      if (depth === 0) break;
      depth--;
    }
  }
  const start = i;

  // 从 start 向后找匹配的 }
  i = start;
  depth = 0;
  for (; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') {
      depth--;
      if (depth === 0) { i++; break; }
    }
  }
  return src.slice(start, i);
}

function strField(entry, name) {
  const re = new RegExp(`\\b${name}:\\s*(['"\`])((?:\\\\.|(?!\\1).)*)\\1`, 's');
  const m = entry.match(re);
  return m ? m[2] : null;
}

function arrField(entry, name) {
  const re = new RegExp(`\\b${name}:\\s*\\[([\\s\\S]*?)\\]`);
  const m = entry.match(re);
  if (!m) return null;
  const items = [...m[1].matchAll(/['"`]((?:\\.|(?!['"`]).)*)['"`]/g)].map(x => x[1]);
  return items.length ? items : null;
}

let out = `# Sincere Glass 蚕食审计 v2 (from blog-registry.ts)\n\n`;
out += `生成时间：${new Date().toISOString()}\n\n`;

for (const [groupName, slugs] of GROUPS) {
  out += `## 组 ${groupName}\n\n`;

  // 组内 targetKeyword 对照表
  const summary = [];

  for (const slug of slugs) {
    out += `### ${slug}\n\n`;
    const entry = extractEntry(slug);
    if (!entry) {
      out += `⚠️ 未在 registry 中找到\n\n---\n\n`;
      continue;
    }

    const tk = strField(entry, 'targetKeyword');
    summary.push({ slug, tk });

    out += `- **title:** ${strField(entry, 'title') || '(空)'}\n`;
    out += `- **targetKeyword:** \`${tk || '(空)'}\`\n`;
    const sec = arrField(entry, 'secondaryKeywords');
    out += `- **secondaryKeywords:** ${sec ? sec.map(s => `\`${s}\``).join(' / ') : '(空)'}\n`;
    const sk = arrField(entry, 'searchKeywords');
    out += `- **searchKeywords:** ${sk ? sk.map(s => `\`${s}\``).join(' / ') : '(空)'}\n`;
    out += `- **cluster:** ${strField(entry, 'cluster') || '(空)'}\n`;
    out += `- **articleType:** ${strField(entry, 'articleType') || '(空)'}\n`;
    out += `- **category:** ${strField(entry, 'category') || '(空)'}\n`;
    out += `- **excerpt:** ${strField(entry, 'excerpt') || '(空)'}\n`;
    const tldr = arrField(entry, 'tldr');
    if (tldr) {
      out += `- **tldr:**\n`;
      tldr.forEach(t => out += `  - ${t}\n`);
    }
    out += `\n---\n\n`;
  }

  // 组内 targetKeyword 速查表
  out += `#### 组内 targetKeyword 速查\n\n`;
  out += `| slug | targetKeyword |\n|---|---|\n`;
  summary.forEach(s => out += `| ${s.slug} | ${s.tk || '(空)'} |\n`);
  out += `\n`;
}

const ts = new Date().toISOString().replace(/[:T]/g, '-').slice(0, 16);
const outFile = `cannib-audit-v2-${ts}.md`;
writeFileSync(outFile, out, 'utf8');
console.log(`Done. Output: ${outFile}`);