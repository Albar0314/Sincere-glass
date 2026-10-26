"use client";

import { useState } from "react";
import Image from "next/image";
import EquipmentGallery from "@/_i18n/es/components/EquipmentGallery";
import { EQUIPMENT_CATEGORIES } from "@/lib/equipment-gallery";

/**
 * Full equipment gallery section with a 6-category tab selector on top and
 * the EquipmentGallery component below. Drop this as a <section> inside
 * src/app/equipment/page.tsx wherever the video-placeholder accordion
 * currently lives.
 *
 * The tabs use URL hash so a link like /equipment#laminating lands on
 * the right tab (used by homepage photo strip and product-page cross-links).
 */
export default function EquipmentGallerySection() {
  const [activeKey, setActiveKey] = useState<string>(() => {
    if (typeof window === "undefined") return EQUIPMENT_CATEGORIES[0]?.key || "";
    const hash = window.location.hash.replace("#", "");
    const found = EQUIPMENT_CATEGORIES.find(c => c.key === hash);
    return found ? found.key : EQUIPMENT_CATEGORIES[0]?.key || "";
  });
  const active = EQUIPMENT_CATEGORIES.find(c => c.key === activeKey) || EQUIPMENT_CATEGORIES[0];
  if (!active) return null;
  return <section className="py-16 md:py-24 bg-brand-lighter">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-10">
          <p className="text-brand-accent text-sm font-semibold uppercase tracking-wider mb-2">
            Dentro de nuestra instalación de 20.000 m²
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark">
            Seis líneas de producción, una sola planta
          </h2>
          <p className="mt-3 text-brand-muted max-w-3xl">
            Cada pieza de vidrio que enviamos es cortada, canteada, templada y, cuando se requiere, laminada o sellada en UVA (Unidad de Vidrio Aislante) en nuestras propias instalaciones. Sin subcontratistas, sin traslados entre plantas.
          </p>
        </div>

        {/* Tabs with thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {EQUIPMENT_CATEGORIES.map(cat => {
          const isActive = cat.key === activeKey;
          const thumb = cat.photos[0]?.src;
          return <button key={cat.key} type="button" onClick={() => {
            setActiveKey(cat.key);
            if (typeof window !== "undefined") {
              history.replaceState(null, "", "#" + cat.key);
            }
          }} className={"group relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all " + (isActive ? "border-brand-accent shadow-lg scale-[1.02]" : "border-transparent hover:border-brand-accent/50 opacity-80 hover:opacity-100")} aria-pressed={isActive} aria-label={"Show " + cat.title}>
                {thumb && <Image src={thumb} alt="" fill className="object-cover" sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 16vw" />}
                <div className={"absolute inset-0 flex items-end p-2 bg-gradient-to-t transition-opacity " + (isActive ? "from-brand-dark/90 via-brand-dark/40 to-transparent" : "from-black/80 via-black/30 to-transparent")}>
                  <span className="text-white text-xs font-semibold leading-tight text-left">
                    {cat.title}
                  </span>
                </div>
                {isActive && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-accent" />}
              </button>;
        })}
        </div>

        {/* Active gallery */}
        <div id={active.key} className="scroll-mt-24">
          <EquipmentGallery category={active} />
        </div>
      </div>
    </section>;
}