// SG-EQUIP-VIDEO-V1
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import type { EquipmentCategory } from "@/lib/equipment-gallery";
import { getEquipmentVideo } from "@/lib/equipment-videos";
import YouTubeEmbed from "@/components/YouTubeEmbed";

/**
 * Equipment gallery with Video/Photos tabs.
 *
 * When a video is registered for the category (see src/lib/equipment-videos.ts)
 * the Video tab becomes the default view, pushing B2B buyer-relevant live
 * production footage above the fold. The Photos tab preserves the original
 * hero + thumbnail + lightbox layout.
 *
 * Rendered server-side the hero shows the first photo and the thumbnail strip
 * is static markup so crawlers see the gallery without JS.
 */
interface Props {
  category: EquipmentCategory;
  initialIndex?: number;
}

type ViewTab = "video" | "photos";

export default function EquipmentGallery({ category, initialIndex = 0 }: Props) {
  const video = getEquipmentVideo(category.key);
  const hasVideo = !!video;

  const [tab, setTab] = useState<ViewTab>(hasVideo ? "video" : "photos");
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // When category changes (parent switches tabs), reset to the right default
  useEffect(() => {
    setTab(hasVideo ? "video" : "photos");
    setActiveIndex(initialIndex);
  }, [category.key, hasVideo, initialIndex]);

  const photos = category.photos;
  const total = photos.length;
  const active = photos[activeIndex];

  const openLightbox = useCallback((i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const nextInLightbox = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % total);
  }, [total]);

  const prevInLightbox = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + total) % total);
  }, [total]);

  // Keyboard nav
  useEffect(() => {
    if (!lightboxOpen) return;
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") nextInLightbox();
      else if (e.key === "ArrowLeft") prevInLightbox();
    }
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, closeLightbox, nextInLightbox, prevInLightbox]);

  if (total === 0 && !hasVideo) {
    return (
      <div className="rounded-xl bg-brand-lighter/40 border border-gray-200 p-10 text-center text-brand-muted">
        Content coming soon.
      </div>
    );
  }

  return (
    <>
      {/* Tab bar - only rendered when a video exists for this category */}
      {hasVideo && (
        <div className="mb-4 flex items-center gap-2" role="tablist" aria-label="Equipment media">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "video"}
            onClick={() => setTab("video")}
            className={
              "px-4 py-2 rounded-md text-sm font-semibold transition-colors flex items-center gap-2 " +
              (tab === "video"
                ? "bg-brand-dark text-white"
                : "bg-white text-brand-muted hover:text-brand-dark border border-brand-light")
            }
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            Video
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "photos"}
            onClick={() => setTab("photos")}
            className={
              "px-4 py-2 rounded-md text-sm font-semibold transition-colors flex items-center gap-2 " +
              (tab === "photos"
                ? "bg-brand-dark text-white"
                : "bg-white text-brand-muted hover:text-brand-dark border border-brand-light")
            }
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Photos ({total})
          </button>
        </div>
      )}

      {/* VIDEO TAB */}
      {hasVideo && tab === "video" && video && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <YouTubeEmbed
              videoId={video.videoId}
              title={video.title}
              aspectRatio="16/9"
            />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-brand-dark">
                {category.title}
              </h3>
              <p className="text-sm text-brand-accent font-medium mt-1">{category.tagline}</p>
              <p className="text-sm text-brand-muted mt-3 leading-relaxed">
                {category.description}
              </p>
            </div>
            <Link
              href={video.deepLink}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-brand-dark transition-colors"
            >
              See the product this line produces
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      )}

      {/* PHOTOS TAB (default when no video) */}
      {(tab === "photos" || !hasVideo) && total > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Hero image */}
          <button
            type="button"
            onClick={() => openLightbox(activeIndex)}
            className="lg:col-span-3 relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 group cursor-zoom-in"
            aria-label={"View " + active.alt + " full size"}
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width:1024px) 100vw, 60vw"
              priority={initialIndex === 0 && activeIndex === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
              Click to enlarge
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

            {total > 1 && (
              <div className="grid grid-cols-4 lg:grid-cols-3 gap-2">
                {photos.map((p, i) => (
                  <button
                    key={p.src}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={
                      "relative aspect-square rounded-md overflow-hidden border-2 transition-all " +
                      (i === activeIndex
                        ? "border-brand-accent ring-2 ring-brand-accent/30"
                        : "border-transparent hover:border-gray-300 opacity-80 hover:opacity-100")
                    }
                    aria-label={"Show " + p.alt}
                    aria-pressed={i === activeIndex}
                  >
                    <Image src={p.src} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          {/* Close */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl backdrop-blur z-10"
            aria-label="Close"
          >
            &times;
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-6 text-white/70 text-sm font-mono bg-white/10 px-3 py-1 rounded backdrop-blur">
            {lightboxIndex + 1} / {total}
          </div>

          {/* Caption */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm max-w-md text-center bg-black/40 px-4 py-2 rounded-lg backdrop-blur">
            {category.title} - photo {lightboxIndex + 1} of {total}
          </div>

          {/* Prev */}
          {total > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevInLightbox();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl backdrop-blur"
              aria-label="Previous photo"
            >
              &lsaquo;
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-w-6xl w-full max-h-[85vh] aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Next */}
          {total > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextInLightbox();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl backdrop-blur"
              aria-label="Next photo"
            >
              &rsaquo;
            </button>
          )}
        </div>
      )}
    </>
  );
}
