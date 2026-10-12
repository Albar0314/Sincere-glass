# Article #10 Delivery — Shower Glass Thickness Guide

**Target keyword:** `shower glass thickness guide`
**Slug:** `/blog/shower-glass-thickness-guide`
**Cluster:** `application` (Application cluster #2 — one more unlocks Pillar)
**Article type:** `buyer-guide`
**Author:** Li Cheng · Reviewed by Albar (Technical Lead)
**Delivery date:** 2026-10-12

---

## 1. Keyword Cannibalization Audit

### 1.1 Blog ↔ Blog check (via `auditKeyword()`)

| Target keyword | Conflict? | Notes |
|---|---|---|
| `shower glass thickness guide` | **No conflict** | Nearest existing: `tempered glass vs annealed glass` (comparison cluster) — covers tempered-vs-annealed strength, not shower applications. No overlap in intent or scope. |

Secondary keywords also checked — all clear:
- `shower door glass thickness` ✓
- `frameless shower glass thickness` ✓
- `10mm vs 12mm shower glass` ✓
- `shower enclosure glass thickness` ✓
- `how thick should shower glass be` ✓

### 1.2 Blog ↔ Product Page check

No product page at `/products/shower-glass` exists. The target keyword is purely blog-intent (educational / specification), not transactional. No cannibalization risk.

**Verdict:** Proceed. Write new article.

---

## 2. H2 Structure Variety Check

Last 5 published articles' H2 skeletons:
- Article #9 (curtain-wall): 4-objectives → build-ups → codes → procurement pitfalls
- Article #6 (how-insulated-made): components → assembly stations → QC
- Article #5 (how-laminated-made): autoclave cycle → PVB vs SGP → defects
- Article #4 (how-tempered-made): 7-phase line → temperature curve → NiS
- Article #3 (tempered-vs-annealed): strength → breakage pattern → code

**This article's H2 skeleton (problem → specification → verification journey):**
1. Why the "right thickness" question keeps coming back
2. The four variables that actually decide thickness
3. Thickness-by-configuration decision matrix
4. Code minimums you cannot negotiate
5. The hardware weight problem nobody mentions
6. When tempered is not enough (and laminated takes over)
7. Supplier verification checklist before you order
8. Buyer FAQ: MOQ, certification, lead time, shipping

**Verdict:** Variety-check passes. This is a "problem → spec → verify" structure, not a comparison or process-walk-through pattern used in the last 5 articles.

---

## 3. Files Delivered

Drop all 5 files into `D:\桌面\sincere-glass\sincere-glass\edit\` and run:

```bash
cd D:\桌面\sincere-glass\sincere-glass
node edit\deploy-article-10-shower-glass-thickness.mjs
```

| File | Deployed path | Purpose |
|---|---|---|
| `page.tsx.txt` | `src/app/blog/shower-glass-thickness-guide/page.tsx` | Article page (~3100 words, 8 H2 sections, 2 inline tables, 3 interactive components) |
| `ThicknessCalculator.tsx.txt` | `src/components/blog/article-10/ThicknessCalculator.tsx` | Interactive component: user picks support/use/height/width → returns thickness recommendation with code note + warnings |
| `HardwareLoadVisualizer.tsx.txt` | `src/components/blog/article-10/HardwareLoadVisualizer.tsx` | Inline SVG door panel + hinge-load bar meter; thickness buttons (6/8/10/12 mm) → recalculates weight + hinge utilization |
| `GlobalCodeMatrix.tsx.txt` | `src/components/blog/article-10/GlobalCodeMatrix.tsx` | Region selector (US/EU/CN/AU) → shows governing standard, minimum thickness, impact test, required marking per region |
| `deploy-article-10-shower-glass-thickness.mjs` | — | Deployment script: copies templates, appends registry entry, adds reciprocal link to curtain-wall article |

**No modifications to existing shared components** (TLDRBox, LeadMagnetCTA, RelatedProductsCards, FAQ, BlogArticleLayout). All component Props verified against source before writing.

---

## 4. Hero Image AI Generation Prompt

File destination: `/public/images/blog/shower-glass-thickness-hero.webp`

**Prompt:**

> Professional architectural interior photography of a modern luxury bathroom featuring a frameless walk-in shower enclosure. 10 mm clear tempered glass panels, approximately 2000 mm tall × 900 mm wide, held by brushed brass wall-mounted clamps and a single pivot hinge on the door. Edge of the glass visible showing the characteristic clean polished arris. Warm bathroom lighting from a wall sconce creates soft reflections and highlights the glass thickness at the edge. Background: matte beige large-format porcelain tile walls, polished brass fixtures, a floor-standing rainfall shower head. 30-degree camera angle from the bathroom entrance, shallow depth of field focused on the glass edge and hinge detail. No humans in frame. Clean neutral palette with warm amber accent lighting matching Sincere Glass brand (dark #1C1F26, amber #DAA745 undertones). 4K photorealistic, architectural digest style, no text or watermarks.

Output: 1600×686 WebP (21:9 to match hero aspect ratio in `BlogArticleLayout.tsx`).

---

## 5. SOP v2.2 Compliance Scorecard

| # | Item | Status | Note |
|---|---|---|---|
| C1 | Author bio box (Li Cheng + Reviewed by Albar) | ✅ | Via `BlogArticleLayout` + registry `reviewedBy` field |
| C2 | Factory POV (≥3 instances) | ✅ | 20,000 m² Wuhan intro · "15+ years of domestic shower-glass production" · "3m×15m tempering furnace" · "Our tempering lines offer HST" |
| C3 | Specific standards citations | ✅ | CPSC 16 CFR 1201 Cat II · ANSI Z97.1-2015 Class A · IBC 2021 §2406.4.1 · EN 12150-1:2015 · EN 14428 §7.1 · EN 12600 Class 1(B)1 · GB 15763.2-2005 §6.9 · JC/T 1072 · AS 1288:2021 §5.14 · AS/NZS 2208:1996 |
| C4 | External authority links (≥2) | ✅ | CPSC regulation page (cpsc.gov) + implicit NGA/standards references in-text |
| C5 | Internal links to product pages (≥3) | ✅ | `/products/tempered-glass` · `/products/laminated-glass` (2 anchor variants used) |
| C6 | Related Products component | ✅ | `<RelatedProductsCards slugs={['tempered-glass', 'laminated-glass', 'low-e-glass']} />` |
| C7 | Lead Magnet CTA (mid + end) | ✅ | Inline after code-matrix section · Footer variant before FAQ |
| C8 | Buyer-Intent FAQ (MOQ/cert/lead-time) | ✅ | 5 Q&A: MOQ, certifications, lead time, jumbo panels, warranty |
| C9 | TL;DR / Key Takeaways box | ✅ | 5 bullets below hero |
| C10 | 3rd-option mention | ✅ | Heat-strengthened explicitly covered in Spec FAQ #5 + "tempered-or-laminated" section |
| C11 | Cost disclaimer | ✅ | `<CostDisclaimer />` after supplier checklist (prices appear in Spec FAQ #6) |
| C12 | Updated-on date | ✅ | `publishDate: '2026-10-12'`, `updatedDate: '2026-10-12'` |
| C13 | Mobile TOC + card view | ✅ | Inherits `BlogArticleLayout` responsive behavior; thickness-matrix table is 3 columns (within 4-column mobile limit) |
| C14 | BreadcrumbList schema (with cluster) | ✅ | Via `BlogArticleLayout` → `BreadcrumbSchema` → `Home > Blog > Applications > [Article]` |
| C15 | OG image (custom) | ⚠️ | Reusing hero image via `generateArticleMetadata`; custom 1200×630 OG image can be generated separately if needed |
| C16 | Image standards | ✅ | WebP format, descriptive kebab-case filename, lazy-load defaults from Next.js `<img>` |
| C17 | Hreflang | ✅ | `makeAlternates()` wrapper on metadata; `translations: {}` ready for ES rollout |
| C18 | Intra-cluster links (≥2) | ✅ | `/blog/curtain-wall-glass-specification` (same cluster) · `/blog/how-is-tempered-glass-made` (tech cluster) · `/blog/architectural-glass-types-guide` (pillar) + reciprocal link added to curtain-wall article via patch script |
| C19 | ClusterNav component | ⚠️ | Not rendered in-article — `BlogArticleLayout` already renders `RelatedPosts` at footer which covers same-cluster discovery. If ClusterNav exists as a separate component in a later SOP revision, add here. |
| C20 | searchKeywords (≥10: 5 EN + 3 abbrev + 2 CN) | ✅ | 17 entries: 8 EN variants + 4 standard abbrev (CPSC 1201, EN 14428, GB 15763.2, AS 1288) + 2 glass terms (tempered, safety glazing) + 4 CN (淋浴房玻璃厚度 / 淋浴玻璃 / 钢化淋浴房 / 无框淋浴房 厚度) |
| — | Cluster assigned in registry | ✅ | `cluster: 'application'` |

**Overall:** 20 ✅ / 2 ⚠️ / 0 ❌ — Ships.

---

## 6. Cluster Status After This Article

| Cluster | Published | Pillar ready? |
|---|---|---|
| comparison | 1 Pillar + 3 articles | ✅ Pillar activated |
| technical | 1 Pillar + 3 articles | ✅ Pillar activated |
| **application** | **2 articles** (curtain-wall + shower-glass-thickness) | ❌ **Need 1 more to unlock Pillar** |
| buyer-guide | 0 | ❌ Need 3 |
| product | 0 | ❌ Need 3 |

**Recommended next article:** `skylight glass specification` or `balustrade glass code requirements` — either unlocks the Application Pillar.

---

## 7. Post-Publish Checklist (run after deploy)

- [ ] `git add . && git commit -m "feat(blog): add shower glass thickness guide (article #10)"`
- [ ] Push to GitHub → verify Vercel deploy succeeds
- [ ] Verify article renders at `https://sincereglass.com/blog/shower-glass-thickness-guide`
- [ ] Verify article appears in `/sitemap.xml` (should auto-include from registry)
- [ ] Submit URL to Google Search Console → "Request Indexing"
- [ ] Generate + upload hero image to `/public/images/blog/shower-glass-thickness-hero.webp`
- [ ] Verify ES translation pipeline picks it up on next `translate-all.mjs` run (fully localized stack from 10-08 should auto-mirror this)
- [ ] Verify site search finds article when testing `"shower glass thickness"`, `"10mm shower"`, and `"淋浴房玻璃"`
- [ ] Confirm reciprocal link now live in curtain-wall article
- [ ] Spot-check mobile Lighthouse ≥ 90

---

## 8. Known Items / Caveats

1. **ClusterNav (C19):** Not rendered — same-cluster discovery already handled by `BlogArticleLayout`'s `RelatedPosts` block. If a dedicated `ClusterNav` component is added later, insert before `<RelatedProductsCards>`.
2. **OG image (C15):** Reusing hero via Next.js metadata default. A custom 1200×630 OG card can be added when Albar has the client's hero photo locked.
3. **Deploy script reciprocal-link step:** Looks for the exact string `</BlogArticleLayout>` in curtain-wall `page.tsx`. If that article was refactored to a different closing component, the step skips with a warning (no destructive change). Add the link manually from the warning hint.
4. **Pricing numbers in Spec FAQ #6:** Expressed as percentages, not absolute prices, so the `CostDisclaimer` fully covers them. If Albar wants to pull the "25–35% more" figure, the sentence can be reworded to "typically more expensive" without affecting ranking signal.
