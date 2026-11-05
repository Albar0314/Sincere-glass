'use client';

import { useState } from 'react';

interface Props {
  videoId: string;
  title: string;
  /** 'maxresdefault' when uploader provided 1080p source, else 'hqdefault' */
  thumbnailQuality?: 'hqdefault' | 'maxresdefault';
  /** CSS aspect-ratio string, e.g. "16/9", "21/9", "4/3" */
  aspectRatio?: string;
  className?: string;
  /**
   * When true: skip the click-to-load thumbnail. Render the YouTube iframe
   * immediately with native player controls, but WITHOUT autoplay. User
   * still clicks native play to start. Use on pages where the video is the
   * focal content (product pages, hero sections). Keep false (default) for
   * embeds buried mid-content where click-to-load keeps initial weight low.
   */
  autoLoad?: boolean;
}

/**
 * YouTube embed with two modes:
 *   - Default (autoLoad=false): click-to-load. Shows static thumbnail + play
 *     button; only on click does the iframe mount (and autoplays, since the
 *     click is itself an intent-to-play). Keeps LCP + bandwidth low and
 *     delays YouTube cookies until user opts in.
 *   - autoLoad=true: iframe renders on mount with native YouTube controls
 *     visible. No autoplay (would be hostile on page load); user clicks
 *     native play. Right choice when the video IS the content.
 */
export default function YouTubeEmbed({
  videoId,
  title,
  thumbnailQuality = 'maxresdefault',
  aspectRatio = '16/9',
  className = '',
  autoLoad = false,
}: Props) {
  const [loaded, setLoaded] = useState<boolean>(autoLoad);
  const thumb = `https://i.ytimg.com/vi/${videoId}/${thumbnailQuality}.jpg`;

  // Only add autoplay=1 when the iframe mounts because of a user click
  // (i.e. click-to-load path). When autoLoad put us straight into iframe
  // mode, respect the user by NOT auto-starting playback.
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1${autoLoad ? '' : '&autoplay=1'}`;

  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden bg-[#1C1F26] group ${className} ${loaded ? '' : 'cursor-pointer'}`}
      style={{ aspectRatio: aspectRatio.replace('/', ' / ') }}
      onClick={!loaded ? () => setLoaded(true) : undefined}
      role={!loaded ? 'button' : undefined}
      aria-label={!loaded ? `Play video: ${title}` : undefined}
    >
      {!loaded ? (
        <>
          <img
            src={thumb}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#DAA745] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 md:w-8 md:h-8 text-[#1C1F26] ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-3 left-4 right-4 text-[#F2F0ED] text-sm font-medium drop-shadow-lg">
            {title}
          </div>
        </>
      ) : (
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      )}
    </div>
  );
}
