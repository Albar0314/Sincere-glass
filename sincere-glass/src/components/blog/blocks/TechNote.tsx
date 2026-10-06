interface Props {
  type?: 'tip' | 'warning' | 'note';
  title?: string;
  children: React.ReactNode;
}

const STYLES = {
  tip: { border: 'border-[#DAA745]/30', bg: 'bg-[#DAA745]/5', icon: '💡', defaultTitle: 'Pro Tip' },
  warning: { border: 'border-red-500/30', bg: 'bg-red-500/5', icon: '⚠️', defaultTitle: 'Important' },
  note: { border: 'border-[#8B95A5]/30', bg: 'bg-[#8B95A5]/5', icon: '📌', defaultTitle: 'Note' },
};

export default function TechNote({ type = 'note', title, children }: Props) {
  const s = STYLES[type];
  return (
    <div className={`my-8 rounded-lg border ${s.border} ${s.bg} p-5`}>
      <div className="flex items-center gap-2 mb-2 text-sm font-medium text-[#F2F0ED]">
        <span>{s.icon}</span>
        <span>{title || s.defaultTitle}</span>
      </div>
      <div className="text-sm text-[#8B95A5] leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
