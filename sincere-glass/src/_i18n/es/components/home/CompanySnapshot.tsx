import FactoryBrollLoop from "@/_i18n/es/components/FactoryBrollLoop";
export default function CompanySnapshot() {
  return <FactoryBrollLoop overlayOpacity={0.65} className="min-h-[500px] md:min-h-[600px] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-xs text-[#DAA745] font-semibold uppercase tracking-wider mb-3">
            Dentro de Sincere Glass
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F2F0ED] mb-4">
            Unas instalaciones de 20.000 m² diseñadas para vidrio arquitectónico de gran formato
          </h2>
          <p className="text-[#8B95A5] leading-relaxed">
            Quince años fabricando vidrio arquitectónico en Wuhan, ahora con envíos a todo el mundo.
            Nuestras líneas de templado y laminado de 3.3.3 m × 15 m se encuentran entre las de mayor capacidad de la provincia de Hubei.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-8">
          <div>
            <div className="text-3xl md:text-5xl font-bold text-[#DAA745] mb-1">20,000</div>
            <div className="text-xs md:text-sm text-[#F2F0ED]/80">m² de instalaciones</div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-bold text-[#DAA745] mb-1">3×15</div>
            <div className="text-xs md:text-sm text-[#F2F0ED]/80">m de capacidad para grandes formatos</div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-bold text-[#DAA745] mb-1">15+</div>
            <div className="text-xs md:text-sm text-[#F2F0ED]/80">años en producción</div>
          </div>
        </div>
      </div>
    </FactoryBrollLoop>;
}