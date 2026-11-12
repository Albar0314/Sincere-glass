// ============================================================
// Sincere Glass — About page sections (paste-ready)
// Marker: SG-ABOUT-FACTORY-TRUST-V1
//
// Two independent sections for src/app/about/page.tsx:
//   1. RawMaterialSection         — 3-col grid of 原片 photos
//   2. GlobalShippingTrustStrip   — narrow horizontal trust band with 发货 photo
//
// Both self-contained. Import Image from "next/image" if not already imported.
// Place RawMaterialSection somewhere in the mid-page (after company intro,
// before equipment); place GlobalShippingTrustStrip near the bottom
// (above footer / CTA).
//
// Styling matches existing site tokens (#1C1F26 dark, #DAA745 amber accent,
// #F2F0ED off-white, #8B95A5 muted grey) used throughout other sections
// (see FactoryBrollLoop / CompanySnapshot examples).
// ============================================================

import Image from "next/image";

// ---------- SECTION 1 ----------
export function RawMaterialSection() {
  const photos = [
    {
      src: "/images/about/raw-stock-1.png",
      alt: "Sincere Glass raw float glass stock inventory in Wuhan facility — vertical storage racks",
      caption: "Vertical storage racks — Qingdao-source float glass, kept dry and dust-controlled",
    },
    {
      src: "/images/about/raw-stock-2.png",
      alt: "Raw architectural glass stacked for cutting line feed at Sincere Glass factory",
      caption: "Ready-to-cut stock staged for the four cutting lines",
    },
    {
      src: "/images/about/raw-stock-3.png",
      alt: "Full-size architectural float glass panels in Sincere Glass raw material warehouse",
      caption: "Jumbo panels for 3 m × 15 m tempering and lamination orders",
    },
  ];

  return (
    <section className="py-20 bg-[#1C1F26]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs text-[#DAA745] font-semibold uppercase tracking-wider mb-3">
            Raw material inventory
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F2F0ED] mb-4">
            Clear float stock, kept ready for same-week cut starts
          </h2>
          <p className="text-[#8B95A5] max-w-2xl mx-auto leading-relaxed">
            We carry continuous raw-glass inventory across common thicknesses so most orders
            enter cutting within 48 hours of confirmation — no three-week wait on mill allocation.
            Full-size jumbo stock stays on-hand for 3 m × 15 m tempering and lamination work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {photos.map((p) => (
            <figure key={p.src} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#0F1115]">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="mt-3 text-sm text-[#8B95A5] leading-snug">
                {p.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- SECTION 2 ----------
export function GlobalShippingTrustStrip() {
  return (
    <section className="py-16 bg-[#0F1115]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
          {/* Image occupies 2 columns on md+ */}
          <div className="md:col-span-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#1C1F26]">
              <Image
                src="/images/about/shipping-1.png"
                alt="Sincere Glass architectural glass crates loaded for container export from Wuhan"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Copy + stats occupy 3 columns on md+ */}
          <div className="md:col-span-3">
            <p className="text-xs text-[#DAA745] font-semibold uppercase tracking-wider mb-3">
              Global shipping
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#F2F0ED] mb-4">
              Export-grade crating, shipped from Shanghai &amp; Ningbo
            </h2>
            <p className="text-[#8B95A5] leading-relaxed mb-6">
              Every order ships in reinforced wooden crates purpose-built for architectural
              glass transit — corner protection, interleaving tissue, moisture barrier, and
              strap tension verified against CTM-2 and GB/T 17748 crating practice. We handle
              trucking to Shanghai or Ningbo, container stuffing, and CIF/FOB documentation
              per the Incoterms on your PO.
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[#DAA745] mb-1">
                  2
                </div>
                <div className="text-xs text-[#8B95A5]">
                  Export ports (Shanghai + Ningbo)
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[#DAA745] mb-1">
                  FOB / CIF
                </div>
                <div className="text-xs text-[#8B95A5]">
                  Incoterms supported
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[#DAA745] mb-1">
                  &lt;0.3%
                </div>
                <div className="text-xs text-[#8B95A5]">
                  In-transit breakage
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
