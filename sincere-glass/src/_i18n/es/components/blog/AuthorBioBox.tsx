import type { BlogArticle } from '@/lib/blog-registry';
interface Props {
  article: BlogArticle;
}
export default function AuthorBioBox({
  article
}: Props) {
  const {
    author,
    reviewedBy
  } = article;
  return <section className="my-12 border-t border-b border-[#3A4250]/40 py-8" itemScope itemType="https://schema.org/Person">
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        {author.image && <img src={author.image} alt={`${author.name} profile photo`} width={88} height={88} loading="lazy" className="rounded-full w-20 h-20 object-cover flex-shrink-0 border-2 border-[#DAA745]/40" itemProp="image" />}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-[#DAA745] tracking-wider uppercase font-semibold">
              Author
            </span>
          </div>
          <h3 className="text-lg font-bold text-[#F2F0ED] m-0" itemProp="name">
            <a href={author.url} className="hover:text-[#DAA745] transition-colors no-underline" itemProp="url">
              {author.name}
            </a>
          </h3>
          {author.title && <p className="text-sm text-[#8B95A5] mt-1 mb-2" itemProp="jobTitle">
              {author.title}
            </p>}
          {author.bio && <p className="text-sm text-[#8B95A5] leading-relaxed m-0" itemProp="description">
              {author.bio}
            </p>}
          {reviewedBy && <p className="text-xs text-[#8B95A5]/80 mt-3 italic">
              Revisión técnica:{' '}
              <span className="text-[#F2F0ED]/80 not-italic font-medium">
                {reviewedBy.name}
              </span>
              {reviewedBy.title && <span>, {reviewedBy.title}</span>}
            </p>}
        </div>
      </div>
    </section>;
}