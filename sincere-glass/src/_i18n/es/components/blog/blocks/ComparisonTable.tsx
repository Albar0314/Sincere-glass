interface Row {
  property: string;
  values: string[];
  highlight?: number; // index of the "best" column
}
interface Props {
  headers: string[];
  rows: Row[];
  caption?: string;
}
export default function ComparisonTable({
  headers,
  rows,
  caption
}: Props) {
  return <div className="my-10 overflow-x-auto -mx-6 px-6">
      <table className="w-full border-collapse text-sm">
        {caption && <caption className="text-left text-[#8B95A5] text-xs mb-3">{caption}</caption>}
        <thead>
          <tr>
            {headers.map((h, i) => <th key={i} className={`text-left py-3 px-4 font-medium text-[#F2F0ED] border-b border-[#3A4250]/40 ${i === 0 ? 'bg-transparent' : 'bg-[#3A4250]/10'}`}>
                {h}
              </th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => <tr key={ri} className="border-b border-[#3A4250]/20 last:border-0">
              <td className="py-3 px-4 text-[#8B95A5] font-medium">{row.property}</td>
              {row.values.map((v, vi) => <td key={vi} className={`py-3 px-4 ${row.highlight === vi ? 'text-[#DAA745] font-medium' : 'text-[#F2F0ED]/80'}`}>
                  {v}
                </td>)}
            </tr>)}
        </tbody>
      </table>
    </div>;
}