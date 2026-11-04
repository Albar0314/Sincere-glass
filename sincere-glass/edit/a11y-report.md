# Sincere Glass — Accessibility Tree Audit

Generated: 2026-11-04T08:59:31.275Z
Project root: `D:\桌面\sincere-glass\sincere-glass`

---

## 1. Root layout <main> landmark

- Layout file: `src/app/layout.tsx`
- Has <main> wrapper: **YES**

## 2. Pages missing <main>

56 page file(s) have no <main> element themselves.
(If root layout has <main>, individual pages do NOT need their own — this list is informational.)

- `src/app/blog/12mm-tempered-glass-specifications/page.tsx`
- `src/app/blog/architectural-glass-applications-guide/page.tsx`
- `src/app/blog/architectural-glass-china-buyer-guide/page.tsx`
- `src/app/blog/architectural-glass-manufacturing-guide/page.tsx`
- `src/app/blog/architectural-glass-specification-guide/page.tsx`
- `src/app/blog/architectural-glass-supplier-china-vetting/page.tsx`
- `src/app/blog/architectural-glass-types-guide/page.tsx`
- `src/app/blog/balustrade-glass-specification/page.tsx`
- `src/app/blog/curtain-wall-glass-specification/page.tsx`
- `src/app/blog/curved-glass-vs-flat-glass/page.tsx`
- `src/app/blog/glass-shipping-container-loading-guide/page.tsx`
- `src/app/blog/heat-soaked-tempered-glass-guide/page.tsx`
- `src/app/blog/how-is-insulated-glass-made/page.tsx`
- `src/app/blog/how-is-laminated-glass-made/page.tsx`
- `src/app/blog/how-is-tempered-glass-made/page.tsx`
- `src/app/blog/how-to-import-glass-from-china/page.tsx`
- `src/app/blog/insulated-glass-complete-guide/page.tsx`
- `src/app/blog/insulated-glass-vs-laminated-glass/page.tsx`
- `src/app/blog/jumbo-architectural-glass-panels/page.tsx`
- `src/app/blog/low-iron-glass-complete-guide/page.tsx`
- `src/app/blog/low-iron-glass-vs-clear-glass/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/blog/sgp-vs-pvb-interlayer-cost/page.tsx`
- `src/app/blog/shower-glass-thickness-guide/page.tsx`
- `src/app/blog/spandrel-glass-guide/page.tsx`
- `src/app/blog/tempered-glass-vs-annealed-glass/page.tsx`
- `src/app/blog/tempered-glass-vs-laminated-glass/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/equipment/page.tsx`
- `src/app/es/blog/12mm-tempered-glass-specifications/page.tsx`
- `src/app/es/blog/architectural-glass-applications-guide/page.tsx`
- `src/app/es/blog/architectural-glass-china-buyer-guide/page.tsx`
- `src/app/es/blog/architectural-glass-manufacturing-guide/page.tsx`
- `src/app/es/blog/architectural-glass-specification-guide/page.tsx`
- `src/app/es/blog/architectural-glass-supplier-china-vetting/page.tsx`
- `src/app/es/blog/architectural-glass-types-guide/page.tsx`
- `src/app/es/blog/balustrade-glass-specification/page.tsx`
- `src/app/es/blog/curtain-wall-glass-specification/page.tsx`
- `src/app/es/blog/curved-glass-vs-flat-glass/page.tsx`
- `src/app/es/blog/glass-shipping-container-loading-guide/page.tsx`
- ... +16 more

### 2a. Pages returning <> fragment as root

50 page(s) return a fragment with no landmark. These are the ones Agent crawlers will struggle with if root layout also lacks <main>.

- `src/app/blog/12mm-tempered-glass-specifications/page.tsx`
- `src/app/blog/architectural-glass-applications-guide/page.tsx`
- `src/app/blog/architectural-glass-china-buyer-guide/page.tsx`
- `src/app/blog/architectural-glass-manufacturing-guide/page.tsx`
- `src/app/blog/architectural-glass-specification-guide/page.tsx`
- `src/app/blog/architectural-glass-types-guide/page.tsx`
- `src/app/blog/balustrade-glass-specification/page.tsx`
- `src/app/blog/curtain-wall-glass-specification/page.tsx`
- `src/app/blog/curved-glass-vs-flat-glass/page.tsx`
- `src/app/blog/glass-shipping-container-loading-guide/page.tsx`
- `src/app/blog/heat-soaked-tempered-glass-guide/page.tsx`
- `src/app/blog/how-is-insulated-glass-made/page.tsx`
- `src/app/blog/how-is-laminated-glass-made/page.tsx`
- `src/app/blog/how-is-tempered-glass-made/page.tsx`
- `src/app/blog/how-to-import-glass-from-china/page.tsx`
- `src/app/blog/insulated-glass-complete-guide/page.tsx`
- `src/app/blog/insulated-glass-vs-laminated-glass/page.tsx`
- `src/app/blog/jumbo-architectural-glass-panels/page.tsx`
- `src/app/blog/low-iron-glass-complete-guide/page.tsx`
- `src/app/blog/low-iron-glass-vs-clear-glass/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/blog/sgp-vs-pvb-interlayer-cost/page.tsx`
- `src/app/blog/shower-glass-thickness-guide/page.tsx`
- `src/app/blog/spandrel-glass-guide/page.tsx`
- `src/app/blog/tempered-glass-vs-annealed-glass/page.tsx`
- `src/app/blog/tempered-glass-vs-laminated-glass/page.tsx`
- `src/app/es/blog/12mm-tempered-glass-specifications/page.tsx`
- `src/app/es/blog/architectural-glass-applications-guide/page.tsx`
- `src/app/es/blog/architectural-glass-china-buyer-guide/page.tsx`
- `src/app/es/blog/architectural-glass-manufacturing-guide/page.tsx`
- `src/app/es/blog/architectural-glass-specification-guide/page.tsx`
- `src/app/es/blog/architectural-glass-types-guide/page.tsx`
- `src/app/es/blog/balustrade-glass-specification/page.tsx`
- `src/app/es/blog/curtain-wall-glass-specification/page.tsx`
- `src/app/es/blog/curved-glass-vs-flat-glass/page.tsx`
- `src/app/es/blog/glass-shipping-container-loading-guide/page.tsx`
- `src/app/es/blog/how-is-insulated-glass-made/page.tsx`
- `src/app/es/blog/how-is-laminated-glass-made/page.tsx`
- `src/app/es/blog/how-is-tempered-glass-made/page.tsx`
- `src/app/es/blog/how-to-import-glass-from-china/page.tsx`
- ... +10 more

## 3. <div>/<span> with onClick but no role="button"

Total: **5**

- `src/components/EquipmentGallery.tsx`
  `<div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={clo`
- `src/components/EquipmentGallery.tsx`
  `<div className="relative max-w-6xl w-full max-h-[85vh] aspect-[4/3]" onClick={(e) => e.stopPropa`
- `src/components/QuoteModal.tsx`
  `<div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} aria-hidden="true" `
- `src/components/SearchModal.tsx`
  `<div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" /> <div class`
- `src/components/YouTubeEmbed.tsx`
  `<div className={`relative w-full rounded-xl overflow-hidden bg-[#1C1F26] group ${className} ${loaded ? '' : 'curso`

## 4. Plain <img> without alt

Total: **0**


## 5. next/image <Image> without alt

Total: **0**


## 6. <button> with no accessible name (no text, no aria-label)

Total: **10**

- `src/components/blog/article-11/PendulumImpactSimulator.tsx`
  `<button onClick={trigger} disabled={playing} className="px-5 py-2.5 bg-[#DAA745] text-[#1C1F26] font-bold rounded-lg hover:bg-[#c4`
- `src/components/blog/article-18/JumboRFQBuilder.tsx`
  `<button type="button" onClick={copy} className="px-3 py-1.5 bg-[#DAA745] text-[#1C1F26] rounded-full text-xs font-semibold h`
- `src/components/blog/blocks/LeadMagnetCTA.tsx`
  `<button type="submit" disabled={status === "submitting"} className="px-6 py-2.5 bg-[#DAA745] text-[#1C1F26] font`
- `src/components/blog/LeadMagnetCTA.tsx`
  `<button type="submit" disabled={status === 'submitting'} className="px-5 py-2.5 bg-[#DAA745] text-[#1C1F26] rounded-fu`
- `src/components/blog/pillar-product/SpecificationBuilder.tsx`
  `<button type="button" onClick={handleCopy} className="w-full text-sm px-4 py-2.5 rounded-lg bg-[#DAA745] text-[#1C1F26] font`
- `src/components/blog/pillar-product/SpecificationBuilder.tsx`
  `<button type="button" onClick={onClick} className={`w-full text-left rounded-lg border p-3 transition-colors ${ active ? "bo`
- `src/components/contact/ContactClient.tsx`
  `<button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto px-8 py-3 bg-brand-accent hover:bg-brand-accent-hover d`
- `src/components/ContactForm.tsx`
  `<button type="submit" disabled={status === "submitting"} className="w-full mt-6 py-3 bg-[#DAA745] text-[#1C1F26] font-bold rounded-lg ho`
- `src/components/home/QuoteForm.tsx`
  `<button type="submit" disabled={loading} className="w-full py-3 bg-brand-accent hover:bg-brand-accent-hover disabled:opacity-60 text-brand-dark font-semibold ro`
- `src/components/QuoteModal.tsx`
  `<button onClick={handleClose} className="px-6 py-2.5 bg-[#DAA745] text-[#1C1F26] font-semibold rounded-lg hover:bg-[#c4963e] transit`

## 7. <a>/<Link> with no accessible name

Total: **26**

- `src/app/es/products/enameled-glass/page.tsx`
  `<Link key={p.slug} href={"/products/" + p.slug} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"> `
- `src/app/es/products/insulated-glass/page.tsx`
  `<Link key={p.slug} href={"/products/" + p.slug} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"> `
- `src/app/es/products/laminated-glass/page.tsx`
  `<Link key={p.slug} href={"/products/" + p.slug} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"> `
- `src/app/es/products/low-e-glass/page.tsx`
  `<Link key={p.slug} href={"/products/" + p.slug} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"> `
- `src/app/es/products/tempered-glass/page.tsx`
  `<Link key={p.slug} href={"/products/" + p.slug} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"> `
- `src/app/products/enameled-glass/page.tsx`
  `<Link key={p.slug} href={"/products/" + p.slug} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"> `
- `src/app/products/insulated-glass/page.tsx`
  `<Link key={p.slug} href={"/products/" + p.slug} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"> `
- `src/app/products/laminated-glass/page.tsx`
  `<Link key={p.slug} href={"/products/" + p.slug} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"> `
- `src/app/products/low-e-glass/page.tsx`
  `<Link key={p.slug} href={"/products/" + p.slug} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"> `
- `src/app/products/tempered-glass/page.tsx`
  `<Link key={p.slug} href={"/products/" + p.slug} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"> `
- `src/components/blog/article-12/ApplicationZoneExplorer.tsx`
  `<a href={`/blog/${active.linkSlug}`} className="inline-flex items-center gap-2 px-4 py-2 bg-[#DAA745] text-[#1C1F26] text-sm font-se`
- `src/components/blog/article-8/CurtainWallSpecSelector.tsx`
  `<a href={result.deepLink.href} className="px-5 py-2.5 border border-[#8B95A5]/40 text-[#F2F0ED] rounded-full text-sm font-medium hov`
- `src/components/blog/AuthorBioBox.tsx`
  `<a href={author.url} className="hover:text-[#DAA745] transition-colors no-underline" itemProp="url"> {author.name} </a>`
- `src/components/blog/AuthorCard.tsx`
  `<Link href={url} className="font-medium text-[#F2F0ED] hover:text-[#DAA745] transition-colors"> {name} </Link>`
- `src/components/blog/BlogListingChrome.tsx`
  `<a href="/blog" className="inline-block mt-4 text-sm text-[#DAA745] hover:underline"> {t("blog.viewAll")} </a>`
- `src/components/blog/BreadcrumbSchema.tsx`
  `<a href={c.url} className="text-[#8B95A5] hover:text-[#DAA745] transition-colors"> {c.name} </a>`
- `src/components/blog/ClusterTabs.tsx`
  `<a href="/blog" className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${ !active ? "bg-[#DAA745] text-[`
- `src/components/blog/pillar-arch-glass/GlassFamilyMap.tsx`
  `<a href={current.linkHref} className="text-xs font-medium text-[#DAA745] hover:underline" > {current.linkL`
- `src/components/blog/pillar-arch-glass/GlassSelectorFlowchart.tsx`
  `<a href={result.deepLink.href} className="px-5 py-2.5 border border-[#8B95A5]/40 text-[#F2F0ED] rounded-full text-sm font-medium`
- `src/components/blog/pillar-tech/ProcessSelector.tsx`
  `<a href={result.deepLink.href} className="px-5 py-2.5 bg-[#DAA745] text-[#1C1F26] rounded-full text-sm font-semibold hover:bg-[#c495`
- `src/components/contact/ContactClient.tsx`
  `<a key={m.label} href={m.href} target={m.label === "WhatsApp" ? "_blank" : undefined} rel={m.label === "WhatsApp" ? "noopener noreferrer" : undefined} `
- `src/components/contact/ContactClient.tsx`
  `<a href={"mailto:" + f.email} className="text-brand-accent hover:underline">{f.email}</a>`
- `src/components/Footer.tsx`
  `<Link href={link.href} className="text-sm hover:text-white transition-colors"> {t(link.labelKey)} </Link>`
- `src/components/Header.tsx`
  `<Link href="/products" className="flex items-center gap-1 px-3 py-2 text-sm text-white/70 hover:text-white rounded-md hover:bg-w`
- `src/components/Header.tsx`
  `<a href="#quote" className="ml-2 px-5 py-2 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark text-sm font-semibold rounded`
- ... +1 more unique occurrences

## 8. Inline <svg> without role / aria-label / aria-hidden (outside labeled parent)

Total: **6**

- `src/components/blog/article-11/BuildupLab.tsx`
  `<svg viewBox="0 0 320 180" className="w-full h-auto" aria-hidden>`
- `src/components/blog/article-11/PendulumImpactSimulator.tsx`
  `<svg viewBox="0 0 500 280" className="w-full h-auto" aria-hidden>`
- `src/components/blog/article-14/CrateTypeSelector.tsx`
  `<svg viewBox="0 0 200 140" className="w-full h-full" aria-hidden>`

## 9. <input>/<textarea>/<select> without associated label or aria-label

Total: **63**

- `src/components/blog/article-10/ThicknessCalculator.tsx`
  `<select
            value={support}
            onChange={(e) =>`
- `src/components/blog/article-10/ThicknessCalculator.tsx`
  `<select
            value={useCase}
            onChange={(e) =>`
- `src/components/blog/article-10/ThicknessCalculator.tsx`
  `<input
            type="range"
            min={1500}
            max={2400}
            step={50}
            value={heightMm}
            onChange={(e) =>`
- `src/components/blog/article-10/ThicknessCalculator.tsx`
  `<input
            type="range"
            min={500}
            max={1200}
            step={50}
            value={widthMm}
            onChange={(e) =>`
- `src/components/blog/article-13/ContainerLoadCalculator.tsx`
  `<input
            type="number"
            min={300}
            max={6000}
            step={50}
            value={width}
            onChange={(e) =>`
- `src/components/blog/article-13/ContainerLoadCalculator.tsx`
  `<input
            type="number"
            min={300}
            max={15000}
            step={50}
            value={height}
            onChange={(e) =>`
- `src/components/blog/article-13/ContainerLoadCalculator.tsx`
  `<input
            type="number"
            min={3}
            max={60}
            step={1}
            value={thickness}
            onChange={(e) =>`
- `src/components/blog/article-13/ContainerLoadCalculator.tsx`
  `<input
            type="number"
            min={1}
            step={1}
            value={count}
            onChange={(e) =>`
- `src/components/blog/article-13/SupplierVerificationScorecard.tsx`
  `<input
                          type="checkbox"
                          checked={checked[item.key]}
                          onChange={(e) =>`
- `src/components/blog/article-14/ContainerLoadingLab.tsx`
  `<select
        value={value}
        onChange={(e) =>`
- `src/components/blog/article-14/CrateTypeSelector.tsx`
  `<select
        value={value}
        onChange={(e) =>`
- `src/components/blog/article-15/RiskExposureProfiler.tsx`
  `<select
            value={deal}
            onChange={(e) =>`
- `src/components/blog/article-15/RiskExposureProfiler.tsx`
  `<select
            value={rel}
            onChange={(e) =>`
- `src/components/blog/article-15/RiskExposureProfiler.tsx`
  `<select
            value={dest}
            onChange={(e) =>`
- `src/components/blog/article-15/RiskExposureProfiler.tsx`
  `<select
            value={cmp}
            onChange={(e) =>`
- `src/components/blog/article-17/InterlayerCostCalculator.tsx`
  `<input
            type="number"
            min={10}
            max={5000}
            step={10}
            value={area}
            onChange={(e) =>`
- `src/components/blog/article-18/JumboCapabilityExplorer.tsx`
  `<select
            value={thickness}
            onChange={(e) =>`
- `src/components/blog/article-18/JumboCapabilityExplorer.tsx`
  `<input
            type="number"
            min={300}
            max={5000}
            step={10}
            value={w}
            onChange={(e) =>`
- `src/components/blog/article-18/JumboCapabilityExplorer.tsx`
  `<input
            type="number"
            min={300}
            max={20000}
            step={10}
            value={h}
            onChange={(e) =>`
- `src/components/blog/article-18/JumboRFQBuilder.tsx`
  `<input
            type="text"
            value={i.project}
            onChange={(e) =>`
- ... +43 more unique occurrences

## 10. Heading hierarchy issues

Pages with wrong <h1> count: **69**

- `src/app/about/page.tsx` has 0 <h1> (should be exactly 1)
- `src/app/blog/12mm-tempered-glass-specifications/page.tsx` has 0 <h1> (should be exactly 1)
- `src/app/blog/architectural-glass-applications-guide/page.tsx` has 0 <h1> (should be exactly 1)
- `src/app/blog/architectural-glass-china-buyer-guide/page.tsx` has 0 <h1> (should be exactly 1)
- `src/app/blog/architectural-glass-manufacturing-guide/page.tsx` has 0 <h1> (should be exactly 1)
- `src/app/blog/architectural-glass-specification-guide/page.tsx` has 0 <h1> (should be exactly 1)
- `src/app/blog/architectural-glass-supplier-china-vetting/page.tsx` has 0 <h1> (should be exactly 1)
- `src/app/blog/architectural-glass-types-guide/page.tsx` has 0 <h1> (should be exactly 1)
- `src/app/blog/balustrade-glass-specification/page.tsx` has 0 <h1> (should be exactly 1)
- `src/app/blog/curtain-wall-glass-specification/page.tsx` has 0 <h1> (should be exactly 1)
- `src/app/blog/curved-glass-vs-flat-glass/page.tsx` has 0 <h1> (should be exactly 1)
- `src/app/blog/glass-shipping-container-loading-guide/page.tsx` has 0 <h1> (should be exactly 1)
- `src/app/blog/heat-soaked-tempered-glass-guide/page.tsx` has 0 <h1> (should be exactly 1)
- `src/app/blog/how-is-insulated-glass-made/page.tsx` has 0 <h1> (should be exactly 1)
- `src/app/blog/how-is-laminated-glass-made/page.tsx` has 0 <h1> (should be exactly 1)
- `src/app/blog/how-is-tempered-glass-made/page.tsx` has 0 <h1> (should be exactly 1)
- `src/app/blog/how-to-import-glass-from-china/page.tsx` has 0 <h1> (should be exactly 1)
- `src/app/blog/insulated-glass-complete-guide/page.tsx` has 0 <h1> (should be exactly 1)
- `src/app/blog/insulated-glass-vs-laminated-glass/page.tsx` has 0 <h1> (should be exactly 1)
- `src/app/blog/jumbo-architectural-glass-panels/page.tsx` has 0 <h1> (should be exactly 1)

## 11. Duplicate IDs (within same file, literal strings only)

Total: **0**


---

## Summary counts

| Check | Count |
|---|---|
| Root layout has <main> | yes |
| Pages without <main> | 56 |
| Pages returning <> fragment | 50 |
| <div/span onClick> no role | 5 |
| <img> no alt | 0 |
| <Image> no alt | 0 |
| <button> no accessible name | 10 |
| <a>/<Link> no accessible name | 26 |
| <svg> no role/aria | 6 |
| <input> no label | 63 |
| Pages with wrong h1 count | 69 |
| Duplicate IDs | 0 |

Total source files scanned: 304
Page files: 78
Component files: 226