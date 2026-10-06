interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

interface Props {
  stats: Stat[];
}

export default function DataHighlight({ stats }: Props) {
  return (
    <div className="my-10 grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-[#3A4250]/15 rounded-lg p-5 text-center border border-[#3A4250]/20"
        >
          <div className="text-3xl font-bold text-[#DAA745] mb-1">
            {stat.value}
            {stat.suffix && <span className="text-lg ml-0.5">{stat.suffix}</span>}
          </div>
          <div className="text-xs text-[#8B95A5]">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
