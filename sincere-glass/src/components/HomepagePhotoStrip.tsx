import Image from "next/image";
import Link from "@/components/LocalizedLink";
import { EQUIPMENT_CATEGORIES } from "@/lib/equipment-gallery";

/**
 * Horizontally scrollable photo strip for the homepage. Shows one hero photo
 * per equipment category, each linking to /equipment#<key> which lands on
 * the correct tab in EquipmentGallerySection.
 *
 * Place this as a section anywhere on the homepage — the suggested slot is
 * between CompanySnapshot and ProjectCases, or between ProductsOverview and
 * WhyUs. Server-rendered; no "use client" needed.
 */
export default function HomepagePhotoStrip() {
  if (EQUIPMENT_CATEGORIES.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <p className="text-brand-accent text-sm font-semibold uppercase tracking-wider mb-2">
              Inside the facility
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Six production lines, one roof
            </h2>
            <p className="mt-3 text-white/60 max-w-2xl text-sm md:text-base">
              Every panel is cut, edged, tempered, and (when needed) laminated or sealed in-house. Click any line to see the equipment.
            </p>
          </div>
          <Link
            href="/equipment"
            className="text-brand-accent hover:text-brand-accent-hover text-sm font-semibold flex items-center gap-1 whitespace-nowrap"
          >
            View equipment page
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {EQUIPMENT_CATEGORIES.map((cat) => {
            const hero = cat.photos[0];
            if (!hero) return null;
            return (
              <Link
                key={cat.key}
                href={"/equipment#" + cat.key}
                className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-brand-primary/40 block"
                aria-label={"View " + cat.title}
              >
                <Image
                  src={hero.src}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <p className="text-white font-display font-bold text-sm md:text-base leading-tight group-hover:text-brand-accent transition-colors">
                    {cat.title}
                  </p>
                  <p className="text-white/60 text-xs mt-1 line-clamp-2">
                    {cat.photos.length} photo{cat.photos.length === 1 ? "" : "s"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
