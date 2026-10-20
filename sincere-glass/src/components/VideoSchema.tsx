interface Props {
  /** Either YouTube videoId OR a self-hosted contentUrl (one is required) */
  videoId?: string;
  contentUrl?: string;
  name: string;
  description: string;
  /** ISO date YYYY-MM-DD */
  uploadDate: string;
  /** ISO 8601 duration, e.g. "PT12S" for 12 seconds */
  duration?: string;
  /** Full URL to a thumbnail image */
  thumbnailUrl?: string;
}

/**
 * Emits VideoObject JSON-LD so Google can display the video in rich results
 * and the SERP video carousel. Attach once per page that hosts the video.
 */
export default function VideoSchema({
  videoId,
  contentUrl,
  name,
  description,
  uploadDate,
  duration,
  thumbnailUrl,
}: Props) {
  const resolvedThumb =
    thumbnailUrl ||
    (videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : undefined);

  const resolvedContent =
    contentUrl || (videoId ? `https://www.youtube.com/watch?v=${videoId}` : undefined);

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    uploadDate,
    publisher: {
      '@type': 'Organization',
      name: 'Sincere Glass',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sincereglass.com/images/logo.png',
      },
    },
  };

  if (resolvedThumb) schema.thumbnailUrl = resolvedThumb;
  if (duration) schema.duration = duration;
  if (resolvedContent) schema.contentUrl = resolvedContent;
  if (videoId) schema.embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
