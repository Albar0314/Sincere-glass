'use client';

type Cell = 'standard' | 'acceptable' | 'rare' | 'forbidden';
interface Row {
  zone: string;
  cells: Record<string, Cell>;
}
const PRODUCTS = ['Tempered', 'Laminated', 'IGU', 'Low-E IGU', 'Enameled'] as const;
const ROWS: Row[] = [{
  zone: 'Facade / Curtain Wall',
  cells: {
    Tempered: 'rare',
    Laminated: 'acceptable',
    IGU: 'acceptable',
    'Low-E IGU': 'standard',
    Enameled: 'acceptable'
  }
}, {
  zone: 'Interior Partitions',
  cells: {
    Tempered: 'standard',
    Laminated: 'acceptable',
    IGU: 'rare',
    'Low-E IGU': 'rare',
    Enameled: 'acceptable'
  }
}, {
  zone: 'Balustrades & Guards',
  cells: {
    Tempered: 'forbidden',
    Laminated: 'standard',
    IGU: 'forbidden',
    'Low-E IGU': 'forbidden',
    Enameled: 'rare'
  }
}, {
  zone: 'Shower & Wet Areas',
  cells: {
    Tempered: 'standard',
    Laminated: 'rare',
    IGU: 'forbidden',
    'Low-E IGU': 'forbidden',
    Enameled: 'rare'
  }
}, {
  zone: 'Skylights & Overhead',
  cells: {
    Tempered: 'forbidden',
    Laminated: 'standard',
    IGU: 'acceptable',
    'Low-E IGU': 'standard',
    Enameled: 'rare'
  }
}, {
  zone: 'Glass Floors & Treads',
  cells: {
    Tempered: 'forbidden',
    Laminated: 'standard',
    IGU: 'forbidden',
    'Low-E IGU': 'forbidden',
    Enameled: 'rare'
  }
}];
const CELL_STYLES: Record<Cell, {
  bg: string;
  border: string;
  label: string;
  dot: string;
}> = {
  standard: {
    bg: 'bg-[#DAA745]/25',
    border: 'border-[#DAA745]/60',
    label: 'Standard',
    dot: 'bg-[#DAA745]'
  },
  acceptable: {
    bg: 'bg-green-500/15',
    border: 'border-green-500/40',
    label: 'Acceptable',
    dot: 'bg-green-400'
  },
  rare: {
    bg: 'bg-[#3A4250]/30',
    border: 'border-[#3A4250]/50',
    label: 'Rare',
    dot: 'bg-[#8B95A5]'
  },
  forbidden: {
    bg: 'bg-red-500/15',
    border: 'border-red-500/40',
    label: "No permitido",
    dot: 'bg-red-400'
  }
};
export default function ApplicationGlassMatrix() {
  return <div className="my-10 bg-[#1C1F26] border border-[#3A4250]/40 rounded-2xl p-6 sm:p-8">
      <div className="mb-6">
        <div className="text-xs font-semibold text-[#DAA745] uppercase tracking-wider mb-2">
          La matriz de decisión de un vistazo
        </div>
        <h3 className="text-xl font-semibold text-[#F2F0ED] m-0">
          Qué vidrio va dónde, en una sola vista
        </h3>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left text-xs font-semibold text-[#8B95A5] uppercase tracking-wider py-3 pr-4 w-[180px]">
                Zona \ Vidrio
              </th>
              {PRODUCTS.map(p => <th key={p} className="text-center text-xs font-semibold text-[#F2F0ED] py-3 px-2">
                  {p}
                </th>)}
            </tr>
          </thead>
          <tbody>
            {ROWS.map(r => <tr key={r.zone} className="border-t border-[#3A4250]/20">
                <td className="text-sm text-[#F2F0ED] py-3 pr-4 font-medium">{r.zone}</td>
                {PRODUCTS.map(p => {
              const cell = r.cells[p];
              const style = CELL_STYLES[cell];
              return <td key={p} className="py-2 px-1">
                      <div className={`text-center text-[11px] py-2 rounded-md border ${style.bg} ${style.border}`}>
                        <span className="text-[#F2F0ED] font-medium">{style.label}</span>
                      </div>
                    </td>;
            })}
              </tr>)}
          </tbody>
        </table>
      </div>

      {/* Mobile stack */}
      <div className="md:hidden space-y-4">
        {ROWS.map(r => <div key={r.zone} className="border border-[#3A4250]/30 rounded-xl p-4">
            <div className="text-sm font-semibold text-[#F2F0ED] mb-3">{r.zone}</div>
            <div className="grid grid-cols-2 gap-2">
              {PRODUCTS.map(p => {
            const cell = r.cells[p];
            const style = CELL_STYLES[cell];
            return <div key={p} className={`text-xs py-2 px-3 rounded-md border ${style.bg} ${style.border} flex items-center justify-between`}>
                    <span className="text-[#F2F0ED]">{p}</span>
                    <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                  </div>;
          })}
            </div>
          </div>)}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-[#3A4250]/30">
        {(Object.keys(CELL_STYLES) as Cell[]).map(k => {
        const s = CELL_STYLES[k];
        return <div key={k} className="flex items-center gap-2 text-xs text-[#8B95A5]">
              <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
              <span>{s.label}</span>
            </div>;
      })}
      </div>

      <p className="text-xs text-[#8B95A5] italic mt-4">
        "Estándar" indica que el producto es la primera opción en esa zona según los códigos modernos. "No permitido" significa que los principales códigos (IBC (Código Internacional de Construcción) / EN / GB / AS) lo prohíben expresamente o lo restringen de forma significativa en esa aplicación. Jurisdicciones específicas y sistemas con cálculo de ingeniería pueden diferir.
      </p>
    </div>;
}