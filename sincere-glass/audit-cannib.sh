#!/usr/bin/env bash
# audit-cannib.sh — 导出三组嫌疑文章的 metadata/H1/headline 供蚕食分析
# 用法：cd 到项目根目录，bash audit-cannib.sh

set -e

# 如果你的博客不在 app/blog/，改这里（可能是 src/app/blog 或 app/[lang]/blog）
BLOG_DIR="src/app/blog"

# 三组嫌疑文章
GROUP_A=(
  architectural-glass-types-guide
  architectural-glass-applications-guide
  architectural-glass-manufacturing-guide
  architectural-glass-specification-guide
  architectural-glass-china-buyer-guide
  architectural-glass-supplier-china-vetting
)
GROUP_B=(
  how-is-insulated-glass-made
  insulated-glass-complete-guide
  insulated-glass-vs-laminated-glass
)
GROUP_C=(
  low-iron-glass-complete-guide
  low-iron-glass-vs-clear-glass
)

OUT="cannib-audit-$(date +%Y%m%d-%H%M).md"
> "$OUT"

dump_article() {
  local slug="$1"
  local file="$BLOG_DIR/$slug/page.tsx"
  
  echo "### $slug" >> "$OUT"
  if [[ ! -f "$file" ]]; then
    # 尝试 MDX 结构
    file=$(find . -type f \( -name "${slug}.tsx" -o -name "${slug}.mdx" -o -name "${slug}.md" \) 2>/dev/null | head -1)
    if [[ -z "$file" ]]; then
      echo "⚠️ 文件未找到：$slug" >> "$OUT"
      echo "" >> "$OUT"
      return
    fi
  fi
  echo "\`$file\`" >> "$OUT"
  echo "" >> "$OUT"
  
  echo "**title:**" >> "$OUT"
  grep -oE "title:\s*['\"\`][^'\"\`]{1,200}['\"\`]" "$file" | head -3 >> "$OUT" || true
  echo "" >> "$OUT"
  
  echo "**description:**" >> "$OUT"
  grep -oE "description:\s*['\"\`][^'\"\`]{1,300}['\"\`]" "$file" | head -3 >> "$OUT" || true
  echo "" >> "$OUT"
  
  echo "**keywords（如有）:**" >> "$OUT"
  grep -A2 -E "keywords\s*:" "$file" | head -5 >> "$OUT" || true
  echo "" >> "$OUT"
  
  echo "**H1 / 主标题变量:**" >> "$OUT"
  grep -oE "<h1[^>]*>[^<{]{3,200}</h1>|heading\s*=\s*['\"\`][^'\"\`]{3,200}['\"\`]|title\s*=\s*['\"\`][^'\"\`]{3,200}['\"\`]" "$file" | head -3 >> "$OUT" || true
  echo "" >> "$OUT"
  
  echo "**JSON-LD headline:**" >> "$OUT"
  grep -oE "\"headline\"\s*:\s*\"[^\"]+\"|headline:\s*['\"\`][^'\"\`]+['\"\`]" "$file" | head -2 >> "$OUT" || true
  echo "" >> "$OUT"
  
  echo "**JSON-LD about / mentions（意图线索）:**" >> "$OUT"
  grep -oE "\"about\"\s*:\s*\[[^]]+\]|\"keywords\"\s*:\s*\"[^\"]+\"" "$file" | head -2 >> "$OUT" || true
  echo "" >> "$OUT"
  
  echo "**首段锚文本（前 3 段，粗提取）:**" >> "$OUT"
  grep -oE ">[A-Z][^<>{}\n]{60,300}<" "$file" | head -3 | sed 's/^>//; s/<$//' >> "$OUT" || true
  echo "" >> "$OUT"
  
  # 文件字数（粗略）
  echo "**文件总行数 / 大致字数:**" >> "$OUT"
  wc -l "$file" | awk '{print $1 " 行"}' >> "$OUT"
  grep -oE ">[^<>{}]{20,}<" "$file" | wc -w | awk '{print $1 " 词（粗估）"}' >> "$OUT"
  echo "" >> "$OUT"
  echo "---" >> "$OUT"
  echo "" >> "$OUT"
}

echo "# Sincere Glass 蚕食审计 $(date)" >> "$OUT"
echo "" >> "$OUT"

echo "## 组 A：architectural-glass-* 系列（6 篇）" >> "$OUT"
echo "" >> "$OUT"
for s in "${GROUP_A[@]}"; do dump_article "$s"; done

echo "## 组 B：insulated glass（3 篇）" >> "$OUT"
echo "" >> "$OUT"
for s in "${GROUP_B[@]}"; do dump_article "$s"; done

echo "## 组 C：low iron glass（2 篇）" >> "$OUT"
echo "" >> "$OUT"
for s in "${GROUP_C[@]}"; do dump_article "$s"; done

echo "完成。输出：$OUT"
echo "把这个文件内容贴回去做分析。"