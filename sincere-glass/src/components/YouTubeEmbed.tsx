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
}

/**
 * Click-to-load YouTube embed.
 * Shows a static thumbnail with a play button until clicked; only then
 * injects the iframe. Keeps LCP + bandwidth low, and avoids YouTube
 * cookies loading until the user actively opts in.
 */
export default function YouTubeEmbed({
  videoId,
  title,
  thumbnailQuality = 'maxresdefault',
  aspectRatio = '16/9',
  className = '',
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${videoId}/${thumbnailQuality}.jpg`;

  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden bg-[#1C1F26] group ${className} ${loaded ? '' : 'cursor-pointer'}`}
      style={{ aspectRatio: aspectRatio.replace('/', ' / ') }}
      onClick={() => !loaded && setLoaded(true)}
      role={loaded ? undefined : 'button'}
      aria-label={loaded ? undefined : `Play video: ${title}`}
    >
      {!loaded ? (
        <>
          <img
            src={thumb}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
            onError={(e) => {
              // Fallback: maxresdefault not always available for shorter videos
              (e.currentTarget as HTMLImageElement).src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#DAA745] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 md:w-8 md:h-8 text-[#1C1F26] ml-1" fill="currentColor" viewBox="0 0 24 24">
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
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      )}
    </div>
  );
}
