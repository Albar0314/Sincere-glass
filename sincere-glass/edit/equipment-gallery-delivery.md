# Equipment Photos — Delivery Package

**Date:** 2026-10-26
**Scope:** Convert 6 raw photo folders into a production-ready equipment gallery that lives on the Equipment page and seeds a photo strip on the homepage.

---

## 1. Files in `edit\equipment-photos\`

| File | Purpose |
|---|---|
| `prepare-equipment-images.mjs` | Scans raw photos, renames, converts to WebP, builds manifest |
| `EquipmentGallery.tsx.txt` | Hero + thumbnails + lightbox (reusable) |
| `EquipmentGallerySection.tsx.txt` | Full section with 6-tab selector (for Equipment page) |
| `HomepagePhotoStrip.tsx.txt` | 6-tile horizontal strip (for Homepage) |
| `deploy-equipment-gallery.mjs` | Installs the 3 .tsx files into src/components/ |
| `equipment-gallery-delivery.md` | This document |

---

## 2. Run order

### 2.1 Place raw photos

Move your 6 category folders into:

```
D:\桌面\sincere-glass\sincere-glass\public\images\equipment-raw\
```

Folder names can stay in your current format (`Tempering equipment`, `cutting equipment`, `Hollow device`, etc.) — the script fuzzy-matches them against known category synonyms.

Each folder should contain `1.png`, `2.png`, ... in order.

### 2.2 Install `sharp` (one-time, for image conversion)

```powershell
npm install --save-dev sharp
```

### 2.3 Process photos

```powershell
node edit\prepare-equipment-images.mjs
```

What this does:
- Renames categories to canonical kebab-case (`tempering`, `cutting`, `edging`, `laminating`, `insulating`, `enameling`)
- Converts every PNG/JPG to WebP, long-edge ≤ 1600 px, quality 82
- Writes to `/public/images/equipment/<category>/1.webp, 2.webp, ...`
- Generates `/src/lib/equipment-gallery.ts` manifest with per-category counts
- Reports before/after dimensions and file-size savings per photo

Re-run it any time you add or remove source photos — it's idempotent.

### 2.4 Install gallery components

```powershell
node edit\deploy-equipment-gallery.mjs
```

Writes 3 files into `src/components/`.

### 2.5 Build + verify

```powershell
npm run build
```

If it fails, the manifest-import is the most likely culprit — re-run step 2.3.

---

## 3. Hand-integration (2 pages)

The deploy script installs the components but doesn't touch the Equipment page or Homepage — too varied to safely regex-patch. Open each file and drop in a snippet:

### 3.1 Equipment page

**File:** `src/app/equipment/page.tsx`

**Find:** the current section that uses `/videos/*.mp4` placeholder paths (the "Equipment Deep Dive accordion" per memory). This is the section to replace.

**Replace it with:**

```tsx
import EquipmentGallerySection from "@/components/EquipmentGallerySection";

// ... inside the page's JSX, wherever the video-placeholder accordion lives:
<EquipmentGallerySection />
```

That's it — the component is fully self-contained (its own heading, intro, 6-tab selector, gallery, and lightbox).

**Keep** the rest of the Equipment page as-is: Hero with animated stats, Production flow animation, Capacity dashboard, Competitive comparison bars.

### 3.2 Homepage

**File:** `src/app/page.tsx`

**Suggested slot:** between CompanySnapshot and ProjectCases (where the facility story transitions into the proof-of-work story). Or between ProductsOverview and WhyUs if you prefer earlier placement.

**Add:**

```tsx
import HomepagePhotoStrip from "@/components/HomepagePhotoStrip";

// ... inside the page's JSX:
<HomepagePhotoStrip />
```

Server-rendered (no `"use client"`), so it loads fast and SEOs well.

### 3.3 Product pages (optional, deferred)

Once homepage + Equipment are live, product pages can get 1-2 inline equipment photos in their WhySincere section. Example (Tempered Glass page):

```tsx
import Image from "next/image";
import Link from "@/components/LocalizedLink";
import { getEquipmentCategory } from "@/lib/equipment-gallery";

// inside WhySincere or similar:
{(() => {
  const cat = getEquipmentCategory("tempering");
  const hero = cat?.photos[0];
  if (!hero) return null;
  return (
    <div className="rounded-xl overflow-hidden mt-6">
      <Link href="/equipment#tempering" className="group block relative aspect-[16/9]">
        <Image src={hero.src} alt={hero.alt} fill className="object-cover group-hover:scale-105 transition-transform" sizes="(max-width:768px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <p className="font-display font-bold">Our tempering line</p>
          <p className="text-sm text-white/70">See all equipment →</p>
        </div>
      </Link>
    </div>
  );
})()}
```

Map per product page:
- `/products/tempered-glass` → `tempering`
- `/products/laminated-glass` → `laminating`
- `/products/insulated-glass` → `insulating`
- `/products/enameled-glass` → `enameling`
- `/products/low-e-glass` → `cutting` (no dedicated Low-E line photos — cutting is a reasonable neutral choice)
- `/products/curved-tempered-glass` → `tempering` (curved tempering uses the same furnace)

### 3.4 ES multilingual mirror

After everything renders correctly in English:

```powershell
node scripts\translate-all.mjs
```

The translator will:
- Pick up the new `EquipmentGallerySection.tsx` and `HomepagePhotoStrip.tsx` (reached through the Equipment page and Homepage import graphs)
- Translate their user-facing strings
- Mirror them to `src/_i18n/es/components/`

The manifest in `src/lib/equipment-gallery.ts` holds English titles/descriptions — those will also get translated once their alt text goes through the pipeline. Note: alt text in the auto-generated manifest ("Tempering Furnaces - photo 1") is static and does not retranslate across site rebuilds; this is OK because the gallery category title + description provide the real context.

---

## 4. Category mapping reference

| Your folder name | Canonical key | Display title |
|---|---|---|
| `Tempering equipment` | `tempering` | Tempering Furnaces |
| `cutting equipment` | `cutting` | Cutting Lines |
| `Edge grinding equipment` | `edging` | Edge Grinding Lines |
| `Laminating equipment` | `laminating` | Laminating Autoclaves |
| `Hollow device` | `insulating` | Insulated Glass Lines |
| `Colored glaze equipment` | `enameling` | Ceramic Frit / Enameling |

If any folder doesn't match, open `prepare-equipment-images.mjs` and add a synonym to the `CATEGORY_MAP` object at the top — then re-run.

---

## 5. Editing titles / descriptions later

The manifest `src/lib/equipment-gallery.ts` is **regenerated every time** you run `prepare-equipment-images.mjs`. If you want to change a title or description permanently, edit the `CATEGORY_META` object inside `prepare-equipment-images.mjs` (not the generated manifest).

Suggested edits for later:
- Fill in exact furnace model names if you want more technical specificity
- Add equipment-specific stats to the description (e.g., "140°C and 12 bar for the autoclave")
- Replace generic descriptions with field-tested buyer-facing copy

---

## 6. Troubleshooting

**"sharp" module not found** → `npm install --save-dev sharp`

**Manifest has 0 categories** → folder names in `equipment-raw/` don't match the synonyms. Rename them or add synonyms to `CATEGORY_MAP` in the prepare script.

**Build fails on `@/lib/equipment-gallery` import** → the manifest wasn't generated. Run `prepare-equipment-images.mjs` first.

**Images 404 in production** → check that `public/images/equipment/<key>/N.webp` exists after running the prepare script. The script purges and rewrites the output folder each run.

**Lightbox doesn't open** → make sure `EquipmentGallery.tsx` has `"use client"` at the top (it does — this is only an issue if the file was edited by hand).

**Mobile tab labels truncate** → that's the current clamp; a longer category title can be shortened in the `CATEGORY_META.title` field.

---

## 7. Future enhancements (not in this delivery)

- Per-photo captions (currently only alt text; a `caption` field on `EquipmentPhoto` would show in the lightbox)
- Lazy-load thumbnails below the fold (currently all thumbs in the active category load; cheap for ≤20 photos per cat)
- Video support in the same gallery (interleave mp4s with photos — needs manifest schema change)
- Downloadable factory brochure PDF link in each category description
