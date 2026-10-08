"use client";

import { useInView } from "@/lib/useInView";
export default function CompanyIntro() {
  const {
    ref,
    isInView
  } = useInView();
  return <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="transition-all duration-700" style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(24px)"
      }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
            Quiénes Somos
          </h2>
          <div className="mt-8 space-y-5 text-brand-muted leading-relaxed text-lg">
            <p>
              Sincere Glass es una empresa de procesamiento de vidrio arquitectónico de servicio completo con sede en Hubei, China.
Integramos el procesamiento especializado, el control de calidad y el comercio exterior bajo un mismo techo — ofreciendo a nuestros clientes
un único punto de contacto desde el pedido hasta la entrega.
            </p>
            <p>
              Lo que comenzó en 2005 como un taller de procesamiento de vidrio en el Parque Industrial Wujin de Wuhan ha crecido hasta convertirse en una
operación de dos fábricas con una superficie de 20.000 m². Nuestra instalación en Wuhan (est. 2005) gestiona las líneas de productos principales,
mientras que nuestra instalación en Honghu (est. 2019) en el Parque Industrial Xintan alberga una capacidad ampliada para paneles
de gran formato y productos especializados como vidrio de baja emisividad (Low-E) y vidrio esmaltado.
            </p>
            <p>
              Cada producto que enviamos — vidrio templado, vidrio aislante, vidrio laminado o vidrio esmaltado — cuenta con la certificación 3C
obligatoria de China y ha superado la inspección técnica nacional. Esto no es un eslogan de marketing. Es el estándar mínimo
que nos exigimos, porque nuestro vidrio se instala en hospitales, aeropuertos y viviendas donde la calidad no es negociable.
            </p>
          </div>
        </div>
      </div>
    </section>;
}