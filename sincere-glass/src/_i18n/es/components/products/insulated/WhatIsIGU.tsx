"use client";

import { useInView } from "@/lib/useInView";
export default function WhatIsIGU() {
  const {
    ref,
    isInView
  } = useInView();
  return <section className="py-20 md:py-28 bg-brand-lighter" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12" style={{
      opacity: isInView ? 1 : 0,
      transform: isInView ? "translateY(0)" : "translateY(24px)",
      transition: "all 700ms"
    }}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">¿Qué es el vidrio aislante?</h2>
        <div className="mt-8 space-y-5 text-brand-muted leading-relaxed text-lg">
          <p>
            Las unidades de vidrio aislante (UVA (Unidad de Vidrio Aislante)) —también denominadas doble acristalamiento o triple acristalamiento— están compuestas por dos o más hojas de vidrio separadas por un espacio sellado relleno de gas. Esta cámara de aire muerto (o gas inerte) actúa como barrera térmica, reduciendo drásticamente la transferencia de calor entre los ambientes interior y exterior.
          </p>
          <p>
            El resultado: <strong className="text-brand-dark font-medium">los edificios se mantienen más frescos en verano y más cálidos en invierno</strong>,
            reduciendo el consumo energético de climatización entre un 30–50% en comparación con el acristalamiento de una sola hoja. Las UVA (Unidad de Vidrio Aislante) también reducen significativamente el ruido exterior —una consideración crítica en proyectos comerciales y residenciales urbanos.
          </p>
          <p>
            Nuestras UVA (Unidad de Vidrio Aislante) utilizan <strong className="text-brand-dark font-medium">tecnología de perfil separador de doble sello</strong> (sello primario de PIB + sello secundario de silicona estructural) para una durabilidad máxima. La resistencia a la presión del viento es 1,5× la del vidrio de una sola hoja. Combinadas con recubrimientos de vidrio de baja emisividad (Low-E), nuestras unidades ofrecen algunos de los valores U más bajos disponibles de un fabricante chino.
          </p>
        </div>
      </div>
    </section>;
}