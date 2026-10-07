interface Props {
  takeaways: string[];
  className?: string;
}

export default function TLDRBox({ takeaways, className = '' }: Props) {
  if (!takeaways?.length) return null;

  return (
    <aside
      className={`my-8 border-l-4 border-[#DAA745] bg-[#3A4250]/20 rounded-r-xl p-6 ${className}`}
      aria-label="Key takeaways"
    >
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-4 h-4 text-[#DAA745]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" />
        </svg>
        <h2 className="text-xs font-semibold text-[#DAA745] tracking-wider uppercase m-0">
          Key Takeaways
        </h2>
      </div>
      <ul className="space-y-2 list-none pl-0">
        {takeaways.map((item, i) => (
          <li key={i} className="flex gap-3 text-[#F2F0ED] text-sm leading-relaxed">
            <span className="text-[#DAA745] font-bold flex-shrink-0 mt-0.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
