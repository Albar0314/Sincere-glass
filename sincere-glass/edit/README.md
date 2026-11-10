# Tools Hub Phase 1 - Deployment Package

## 文件清单 (8 个文件)

1. `tools-registry.ts.txt`             → src/lib/tools-registry.ts
2. `useHashState.ts.txt`                → src/lib/useHashState.ts
3. `MaxPanelSizeTool.tsx.txt`           → src/components/tools/MaxPanelSizeTool.tsx
4. `TriplePaneROITool.tsx.txt`          → src/components/tools/TriplePaneROITool.tsx
5. `tools-hub-page.tsx.txt`             → src/app/tools/page.tsx
6. `tool-page-max-panel-size.tsx.txt`   → src/app/tools/glass-max-panel-size-calculator/page.tsx
7. `tool-page-triple-pane-roi.tsx.txt`  → src/app/tools/triple-pane-roi-calculator/page.tsx
8. `deploy-tools-hub.mjs`               (部署脚本本身)

## 部署步骤

1. 把全部 8 个文件放到 `D:\桌面\sincere-glass\sincere-glass\edit\` 目录
2. 在项目根目录执行：
   ```
   cd D:\桌面\sincere-glass\sincere-glass
   node edit\deploy-tools-hub.mjs
   ```
3. 立刻运行 `npm run build` 验证
4. 本地起服务：
   - `/tools` hub 页
   - `/tools/glass-max-panel-size-calculator`
   - `/tools/triple-pane-roi-calculator`
5. 验证点：
   - 两个工具都能交互
   - 调参数后 URL hash 变化 (`#support=point&wind=high`)
   - 刷新页面 state 保留
   - 点击 "Get quote for this spec" → QuoteModal 弹出且 message 区域已预填

## Patch 影响的文件 (会自动备份 .bak)

- `src/lib/QuoteContext.tsx` — 扩展 openQuote 签名加 prefillMessage
- `src/components/QuoteModal.tsx` — message textarea 读 prefillMessage + rows 3→5
- `src/lib/schema.ts` — 追加 4 个 schema helper 函数

## 回滚

```
git checkout -- src/lib/QuoteContext.tsx src/components/QuoteModal.tsx src/lib/schema.ts
rm -rf src/app/tools src/components/tools src/lib/tools-registry.ts src/lib/useHashState.ts
```

或用生成的 `.bak`：

```
cp src/lib/QuoteContext.tsx.bak src/lib/QuoteContext.tsx
cp src/components/QuoteModal.tsx.bak src/components/QuoteModal.tsx
cp src/lib/schema.ts.bak src/lib/schema.ts
```

## 关于图片

**Phase 1 不需要 hero 图**。工具页 hero section 是纯文字 H1 + 描述。

未来如果想加 hero 图：
- 路径: `public/images/tools/<slug>-hero.webp`
- Registry 里 heroImage 字段填上即可 (当前两个 entry 都没填)

## Phase 2 遗留 (后续处理)

- `sitemap.ts` 加入 `/tools` + 2 个工具页 URL
- `SearchModal.tsx` 把工具索引进 Cmd+K
- `Header.tsx` 加 Tools 导航入口
- `scripts/translate-all.mjs` 跑一遍生成 ES mirror

这些需要你贴当前文件内容才能动。
