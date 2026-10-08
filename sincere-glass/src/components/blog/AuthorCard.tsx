import Link from "@/components/LocalizedLink";

interface Props {
  name: string;
  url: string;
  publishDate: string;
  updatedDate?: string;
  readingTime: number;
}

export default function AuthorCard({ name, url, publishDate, updatedDate, readingTime }: Props) {
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex items-center gap-4 py-4">
      {/* Avatar placeholder — replace with real photo */}
      <div className="w-11 h-11 rounded-full bg-[#3A4250] flex items-center justify-center text-[#DAA745] font-semibold text-sm shrink-0">
        {name.split(' ').map((n) => n[0]).join('')}
      </div>
      <div className="text-sm">
        <Link href={url} className="font-medium text-[#F2F0ED] hover:text-[#DAA745] transition-colors">
          {name}
        </Link>
        <div className="text-[#8B95A5] flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5">
          <time dateTime={publishDate}>{formatDate(publishDate)}</time>
          {updatedDate && (
            <span className="text-xs">(Updated {formatDate(updatedDate)})</span>
          )}
          <span>{readingTime} min read</span>
        </div>
      </div>
    </div>
  );
}
