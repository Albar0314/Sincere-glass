interface Props {
  overlayOpacity?: number;
  className?: string;
  children?: React.ReactNode;
  /** Which brand color overlays the video. Defaults to brand dark. */
  overlayColor?: string;
}

/**
 * Silent, autoplaying, looping factory b-roll background.
 * Uses a single mp4 at /videos/factory-broll.mp4.
 * The dark overlay keeps foreground text readable; adjust opacity per section.
 */
export default function FactoryBrollLoop({
  overlayOpacity = 0.55,
  overlayColor = '#1C1F26',
  className = '',
  children,
}: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ background: '#1C1F26' }}
      >
        <source src="/videos/factory-broll.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: overlayColor, opacity: overlayOpacity }}
        aria-hidden="true"
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
