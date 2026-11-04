import Image from "next/image";

interface Props {
  overlayOpacity?: number;
  className?: string;
  children?: React.ReactNode;
  /** Which brand color overlays the image. Defaults to brand dark. */
  overlayColor?: string;
  /** Path to the poster image. Defaults to /images/hero-factory.jpg. */
  poster?: string;
  /** Alt text for the poster image. Optional; blank by default since image is decorative. */
  posterAlt?: string;
}

/**
 * Factory b-roll section as a static poster image with brand overlay.
 *
 * Was previously a silent autoplay mp4 at /videos/factory-broll.mp4, but
 * we no longer ship raw mp4 assets through the Vercel bundle (bandwidth
 * cost + repo bloat). Video content now lives on YouTube and is embedded
 * per-section via YouTubeEmbed where motion adds value. For hero
 * backgrounds the static image gives the same visual weight without the
 * autoplay bandwidth, LCP penalty, or iframe chrome.
 */
export default function FactoryBrollLoop({
  overlayOpacity = 0.55,
  overlayColor = "#1C1F26",
  className = "",
  children,
  poster = "/images/hero-factory.jpg",
  posterAlt = "",
}: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={poster}
        alt={posterAlt}
        fill
        sizes="100vw"
        quality={75}
        className="object-cover object-center"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: overlayColor, opacity: overlayOpacity }}
        aria-hidden="true"
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
