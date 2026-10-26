"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import type { EquipmentCategory } from "@/lib/equipment-gallery";

/**
 * Equipment gallery with a hero image, thumbnail strip, and a native-dialog
 * lightbox for full-size viewing. All photos load through next/image for
 * automatic sizing and lazy loading. Keyboard-navigable in the lightbox:
 * Left/Right to cycle, Esc to close.
 *
 * Rendered server-side the hero shows the first photo and the thumbnail strip
 * is static markup so crawlers see the gallery without JS.
 */
interface Props {
  category: EquipmentCategory;
  initialIndex?: number;
}
export default function EquipmentGallery({
  category,
  initialIndex = 0
}: Props) {
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const photos = category.photos;
  const total = photos.length;
  const active = photos[activeIndex];
  const openLightbox = useCallback((i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  }, []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const nextInLightbox = useCallback(() => {
    setLightboxIndex(i => (i + 1) % total);
  }, [total]);
  const prevInLightbox = useCallback(() => {
    setLightboxIndex(i => (i - 1 + total) % total);
  }, [total]);

  // Keyboard nav
  useEffect(() => {
    if (!lightboxOpen) return;
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();else if (e.key === "ArrowRight") nextInLightbox();else if (e.key === "ArrowLeft") prevInLightbox();
    }
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, closeLightbox, nextInLightbox, prevInLightbox]);
  if (total === 0) {
    return <div className="rounded-xl bg-brand-lighter/40 border border-gray-200 p-10 text-center text-brand-muted">
        Fotos próximamente.
      </div>;
  }
  return <>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Hero image */}
        <button type="button" onClick={() => openLightbox(activeIndex)} className="lg:col-span-3 relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 group cursor-zoom-in" aria-label={"View " + active.alt + " full size"}>
          <Image src={active.src} alt={active.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:1024px) 100vw, 60vw" priority={initialIndex === 0 && activeIndex === 0} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
            Haga clic para ampliar
          </div>
          <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-2.5 py-1 rounded font-mono backdrop-blur-sm">
            {activeIndex + 1} / {total}
          </div>
        </button>

        {/* Thumbnail strip + info */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-brand-dark">{category.title}</h3>
            <p className="text-sm text-brand-accent font-medium mt-1">{category.tagline}</p>
            <p className="text-sm text-brand-muted mt-3 leading-relaxed">{category.description}</p>
          </div>

          {total > 1 && <div className="grid grid-cols-4 lg:grid-cols-3 gap-2">
              {photos.map((p, i) => <button key={p.src} type="button" onClick={() => setActiveIndex(i)} className={"relative aspect-square rounded-md overflow-hidden border-2 transition-all " + (i === activeIndex ? "border-brand-accent ring-2 ring-brand-accent/30" : "border-transparent hover:border-gray-300 opacity-80 hover:opacity-100")} aria-label={"Show " + p.alt} aria-pressed={i === activeIndex}>
                  <Image src={p.src} alt="" fill className="object-cover" sizes="80px" />
                </button>)}
            </div>}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={closeLightbox} role="dialog" aria-modal="true" aria-label="Visor de fotos">
          {/* Close */}
          <button type="button" onClick={closeLightbox} className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl backdrop-blur z-10" aria-label="Close">
            &times;
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-6 text-white/70 text-sm font-mono bg-white/10 px-3 py-1 rounded backdrop-blur">
            {lightboxIndex + 1} / {total}
          </div>

          {/* Caption */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm max-w-md text-center bg-black/40 px-4 py-2 rounded-lg backdrop-blur">
            {category.title} - foto {lightboxIndex + 1} of {total}
          </div>

          {/* Prev */}
          {total > 1 && <button type="button" onClick={e => {
        e.stopPropagation();
        prevInLightbox();
      }} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl backdrop-blur" aria-label="Foto anterior">
              &lsaquo;
            </button>}

          {/* Image */}
          <div className="relative max-w-6xl w-full max-h-[85vh] aspect-[4/3]" onClick={e => e.stopPropagation()}>
            <Image src={photos[lightboxIndex].src} alt={photos[lightboxIndex].alt} fill className="object-contain" sizes="90vw" priority />
          </div>

          {/* Next */}
          {total > 1 && <button type="button" onClick={e => {
        e.stopPropagation();
        nextInLightbox();
      }} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl backdrop-blur" aria-label="Foto siguiente">
              &rsaquo;
            </button>}
        </div>}
    </>;
}