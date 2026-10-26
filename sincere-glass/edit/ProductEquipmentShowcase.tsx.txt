import Image from "next/image";
import Link from "@/components/LocalizedLink";
import { getEquipmentCategory } from "@/lib/equipment-gallery";

/**
 * A one-image "the line that makes this product" showcase block for
 * product pages. Reads the equipment-gallery manifest, picks the first
 * photo of the given category, and links to /equipment#<key> which
 * auto-selects the right tab on the Equipment page.
 *
 * Server-rendered (no "use client") so it adds zero JS to the product
 * page and the photo is crawlable. Returns null gracefully if the
 * category has no photos yet, so a product page using this component
 * never breaks when photos are missing or renamed.
 */

type Variant = "wide" | "card";

interface Props {
  /** Equipment category key from src/lib/equipment-gallery.ts */
  categoryKey: string;
  /** Headline shown on the overlay */
  heading?: string;
  /** Sub-headline shown under the headline */
  tagline?: string;
  /** Call-to-action text */
  ctaText?: string;
  /** "wide" = 16/9 banner, "card" = 4/5 portrait card. Default: wide */
  variant?: Variant;
  /** Optional wrapper class */
  className?: string;
}

export default function ProductEquipmentShowcase({
  categoryKey,
  heading,
  tagline,
  ctaText = "See all equipment",
  variant = "wide",
  className = "",
}: Props) {
  const cat = getEquipmentCategory(categoryKey);
  const hero = cat?.photos[0];
  if (!cat || !hero) return null;

  const title = heading || `Made on our ${cat.title.toLowerCase()}`;
  const sub = tagline || cat.tagline;

  const aspect = variant === "card" ? "aspect-[4/5]" : "aspect-[16/9]";

  return (
    <div className={"my-8 " + className}>
      <Link
        href={"/equipment#" + categoryKey}
        className={"group relative block rounded-xl overflow-hidden bg-brand-dark " + aspect}
        aria-label={title + " - view on Equipment page"}
      >
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 50vw"
        />
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
          <p className="text-brand-accent text-xs font-semibold uppercase tracking-wider mb-2">
            Inside our facility
          </p>
          <h3 className="font-display text-xl md:text-2xl font-bold text-white leading-tight">
            {title}
          </h3>
          <p className="text-white/70 text-sm md:text-base mt-2 max-w-md leading-relaxed">
            {sub}
          </p>
          <span className="inline-flex items-center gap-1 mt-4 text-brand-accent text-sm font-semibold group-hover:gap-2 transition-all w-fit">
            {ctaText}
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </div>
  );
}
