import { blogArticles, type BlogArticle } from '@/lib/blog-registry';
import BlogArticleLayout, { generateArticleMetadata, articleJsonLd, type TOCItem } from "@/_i18n/es/components/blog/BlogArticleLayout";
import TLDRBox from "@/_i18n/es/components/blog/TLDRBox";
import LeadMagnetCTA from "@/_i18n/es/components/blog/LeadMagnetCTA";
import RelatedProductsCards from "@/_i18n/es/components/blog/RelatedProductsCards";
import { FAQ, TechNote } from "@/_i18n/es/components/blog/blocks";
import ProductionLineTimeline from "@/_i18n/es/components/blog/article-4/ProductionLineTimeline";
import TemperatureCurveChart from "@/_i18n/es/components/blog/article-4/TemperatureCurveChart";
import StressVisualization from "@/_i18n/es/components/blog/article-4/StressVisualization";
const SLUG = 'how-is-tempered-glass-made';
const article: BlogArticle = blogArticles.find(a => a.slug === SLUG)!;
export const metadata = generateArticleMetadata(article);
const toc: TOCItem[] = [{
  id: 'raw-material',
  text: "Todo Comienza con Vidrio Ordinario",
  level: 2
}, {
  id: 'production-line',
  text: "La Línea de Producción Completa de 7 Fases",
  level: 2
}, {
  id: 'temperature-curve',
  text: "El Recorrido de Temperatura",
  level: 2
}, {
  id: 'why-stress-matters',
  text: "Por Qué Importa el Patrón de Tensiones",
  level: 2
}, {
  id: 'cannot-be-reversed',
  text: "Por Qué el Vidrio Templado No Puede Cortarse ni Perforarse",
  level: 2
}, {
  id: 'spontaneous-breakage',
  text: "El Único Riesgo: Rotura Espontánea por NiS",
  level: 2
}, {
  id: 'what-good-looks-like',
  text: "Cómo Luce un Buen Templado",
  level: 2
}, {
  id: 'faq',
  text: "Preguntas frecuentes del comprador",
  level: 2
}];
const buyerFaqItems = [{
  q: 'How long does tempered glass take to produce?',
  a: 'A single sheet of 6mm glass takes about 7-10 minutes from entering the furnace to exiting the quench — but total production time including cutting, edge finishing, washing, and QC is typically 1-2 days from order confirmation for a standard batch. At our Wuhan facility, standard tempered glass orders ship in 7-12 working days.'
}, {
  q: 'What\'s the maximum size tempered glass we can produce?',
  a: 'Our larger tempering furnace accepts panels up to 3m × 15m — one of the largest in Hubei province. The practical maximum for most architectural projects is dictated by handling and shipping, not production capability. For panels over 2.5m × 6m, we recommend discussing crating and transport logistics early in the quote process.'
}, {
  q: 'Can tempered glass be re-tempered or heat-strengthened after production?',
  a: 'No. Once a glass sheet has been tempered, it cannot be re-processed thermally without destroying it. If a project needs modification, the glass must be re-cut from new annealed stock and tempered again. This is why spec drawings must be finalized before placing a tempered glass order.'
}, {
  q: 'How can I verify a batch is actually tempered and not just annealed?',
  a: 'Three ways: (1) Polarized light test — tempered glass shows characteristic stress patterns ("quench marks" or "polka dots") when viewed through polarizing film. (2) Breakage test — if a corner is broken off a sample, tempered glass fragments into small granules; annealed produces large shards. (3) Edge inspection — tempered glass has a slight edge profile change from the quench. Legitimate suppliers provide test reports with every batch; we provide these with all 3C-certified orders.'
}, {
  q: 'What\'s the MOQ for custom tempered glass orders from China?',
  a: 'Our standard MOQ is 50 square meters per order, with no restriction on panel sizes up to our furnace maximum. Smaller trial orders are accepted at a nominal setup fee for new buyers. For complex custom shapes or coatings, we recommend consulting on feasibility before finalizing the quote.'
}];
export default function Page() {
  return <>
      {articleJsonLd(article, buyerFaqItems).map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}

      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox takeaways={['Tempered glass is made by heating ordinary annealed glass to ~620°C and then rapidly cooling (quenching) the surface with high-pressure air.', 'The quench freezes the surface while the core is still hot — when the core finishes contracting, it pulls against the frozen surface, locking in compressive stress.', 'Total time from raw sheet to tempered panel: ~7 minutes in the furnace + 60-90 seconds of quenching, within a 1-2 day production cycle.', 'Because the stress pattern is baked in, tempered glass CANNOT be cut, drilled, or modified after production — any attempt causes complete shattering.', 'Rare risk: NiS (nickel sulfide) inclusions in the raw glass can cause spontaneous breakage years later. Reputable factories (ours included) inspect for this before tempering.']} />

        <p>
          "¿Cómo se fabrica el vidrio templado?" es una pregunta con una respuesta de una sola frase y una respuesta de veinte páginas. La versión de una frase: <strong>calentar el vidrio a 620 °C, luego
          enfriar su superficie rápidamente mientras el núcleo aún está caliente</strong>. La versión de veinte páginas involucra tolerancias de corte CNC, teoría de microfisuras en el canto, distorsión por ondulación de rodillos, geometría de boquillas de chorro de aire y riesgo de inclusiones de sulfuro de níquel.
        </p>

        <p>
          Este artículo recorre lo que realmente ocurre, paso a paso, en una línea de templado en funcionamiento — concretamente la nuestra en Wuhan, provincia de Hubei. No es una explicación de libro de texto; es un recorrido por el piso de fábrica. Si ha leído nuestra{' '}
          <a href="/blog/tempered-glass-vs-annealed-glass">comparación entre vidrio templado y vidrio recocido</a>, ya conoce el resultado final; aquí se explica cómo se llega a él.
          Para un marco de selección más amplio, consulte nuestro{' '}
          <a href="/blog/architectural-glass-types-guide">guía completa de tipos de
          vidrio arquitectónico</a>.
        </p>

        <h2 id="raw-material">Todo Comienza con Vidrio Ordinario</h2>

        <p>
          Cada pieza de vidrio templado comienza como una simple hoja de{' '}
          <strong>vidrio flotado recocido</strong> — la producción estándar de una línea de vidrio flotado. El vidrio fundido se vierte sobre un baño de estaño fundido, se extiende hasta alcanzar el espesor deseado, se enfría lentamente a través de un horno de recocido y se distribuye en hojas planas a procesadores intermedios como nosotros.
        </p>

        <p>
          Nosotros no fabricamos vidrio flotado. Lo adquirimos en grandes lotes de fábricas flotadoras certificadas, inspeccionamos cada lote en busca de defectos ópticos e indicadores de inclusiones de NiS, y lo introducimos en nuestra línea de producción. Todo lo que se describe a continuación es lo que hacemos con <em>convert</em> ese vidrio recocido en bruto para convertirlo en un producto final de vidrio templado homologado como vidrio de seguridad.
        </p>

        <TechNote type="note" title="¿Por qué no fabricar también vidrio flotado?">
          <p>
            La producción de vidrio flotado requiere un horno de funcionamiento continuo 24/7 a ~1500 °C con un baño de estaño, con un consumo energético equivalente al de una pequeña ciudad. La rentabilidad solo es viable a una escala masiva (producción mínima de ~500 toneladas/día). Fábricas intermedias como la nuestra —y la mayoría de las operaciones de templado en todo el mundo— adquieren el vidrio flotado en bruto de un reducido número de fábricas especializadas y se concentran en el procesamiento de valor añadido: corte, templado, laminado y recubrimiento.
          </p>
        </TechNote>

        <h2 id="production-line">La Línea de Producción Completa de 7 Fases</h2>

        <p>
          Explore las fases a continuación. Cada clic muestra lo que ocurre en esa etapa, cuánto tiempo tarda, a qué temperatura se encuentra el vidrio y cómo encajan las capacidades específicas de nuestra instalación.
        </p>

        <ProductionLineTimeline />

        <p>
          La mayoría de las personas entiende el "templado" como únicamente el paso del horno (Fase 04) y el enfriamiento rápido (Fase 05). En realidad, las cuatro fases previas determinan si ambas tendrán éxito. Un canto mal rectificado, una mancha del lavado de la Fase 03 o un espaciado de carga no uniforme en la Fase 04 —cualquiera de estos factores puede provocar que una hoja se rompa dentro del horno o genere un producto distorsionado que no supere el control de calidad. El horno es la etapa más llamativa, pero la calidad se gana o se pierde en la preparación.
        </p>

        <LeadMagnetCTA variant="inline" articleSlug="how-is-tempered-glass-made" />

        <h2 id="temperature-curve">El Recorrido de Temperatura</h2>

        <p>
          El ciclo térmico completo, visualizado. Pase el cursor por cualquier punto de la curva para ver qué le ocurre al vidrio a esa temperatura:
        </p>

        <TemperatureCurveChart />

        <p>
          Tres detalles relevantes para los compradores que interpreten este gráfico:
        </p>

        <ul>
          <li>
            <strong>El objetivo es 620 °C, no más.</strong> Acercarse al punto de reblandecimiento (~650-700 °C) aumenta el riesgo de distorsión sin mejorar la calidad del templado. Nuestro horno está calibrado para una temperatura sostenida de ~620 °C.
          </li>
          <li>
            <strong>El enfriamiento rápido es un evento de segundos.</strong> Desde la salida (580 °C) hasta la congelación superficial (300 °C) en aproximadamente 15 segundos. Este es el momento en que se crea el "templado". Todo lo demás es preparación y recuperación.
          </li>
          <li>
            <strong>La fase de enfriamiento hasta temperatura ambiente también es importante.</strong> Una manipulación precipitada mientras el núcleo aún está caliente puede generar tensiones secundarias o deformaciones. Los paneles terminados permanecen en el transportador de salida hasta que su temperatura está realmente por debajo de los 100 °C.
          </li>
        </ul>

        <h2 id="why-stress-matters">Por Qué Importa el Patrón de Tensiones</h2>

        <p>
          Esto es lo que el enfriamiento rápido hace realmente, a nivel del material. Alterne entre vidrio recocido simple y vidrio templado para ver la diferencia en la distribución de tensiones internas:
        </p>

        <StressVisualization />

        <p>
          Este perfil de tensiones explica por qué el vidrio templado es 4-5× más resistente que el recocido: cualquier fuerza de flexión externa debe superar primero los ~180 MPa de compresión superficial acumulada antes de que el vidrio pueda entrar en tensión neta y fallar. También explica por qué el vidrio templado se fragmenta en gránulos: cuando la superficie finalmente cede, libera catastróficamente la tensión almacenada en el núcleo a través de toda la hoja en milisegundos.
        </p>

        <p>
          Per <strong>GB 15763.2-2005 §4.2</strong>, la norma china de vidrio de seguridad exige una tensión de compresión superficial mínima de 90 MPa para el vidrio templado arquitectónico. Las normas internacionales establecen requisitos similares: EN 12150-1 exige un mínimo de 69 MPa; ANSI Z97.1 y ASTM C1048 especifican mediante ensayos de fragmentación en lugar de medición directa de tensiones, pero se calibran a niveles equivalentes. Nuestra producción apunta a 100-180 MPa para superar con holgura las cuatro normas.
        </p>

        <h2 id="cannot-be-reversed">Por Qué el Vidrio Templado No Puede Cortarse ni Perforarse</h2>

        <p>
          Este es el error más costoso que cometen los compradores: especificar vidrio templado y esperar luego poder perforarlo o cortarlo a medida en obra.
          <strong> Cualquier intento de cortar, perforar, esmerilar o ranurar el vidrio templado provoca su explosión inmediata en gránulos.</strong>
        </p>

        <p>
          La razón se desprende directamente del perfil de tensiones mostrado anteriormente. La "piel" exterior de vidrio en compresión mantiene en equilibrio el "núcleo" interior en tensión. En el momento en que esa piel se rompe —incluso con la rueda de un cortador de vidrio marcando apenas 0,1 mm de profundidad— se libera la tensión del núcleo y la hoja entera se desintegra en milisegundos. No existe una rotura parcial; no existe un corte controlado.
        </p>

        <TechNote type="warning" title="Especifique el vidrio completamente antes de realizar el pedido">
          <p>
            Cada orificio, cada ranura, cada biselado, cada pulido de bordes debe quedar especificado en los planos ANTES de que el vidrio entre en nuestro horno. Lo fabricaremos exactamente según plano, pero las modificaciones en obra son imposibles. Si las dimensiones cambian tras la producción, el vidrio debe desecharse y reordenarse desde materia prima nueva. La confirmación del diseño es el paso más lento para la mayoría de los compradores; recomendamos firmemente una revisión exhaustiva antes de formalizar el pedido.
          </p>
        </TechNote>

        <p>
          Esto también explica la diferencia de precio (consulte nuestra{' '}
          <a href="/blog/tempered-glass-vs-annealed-glass">comparación de costos entre vidrio templado y vidrio recocido</a>). El vidrio recocido es económico en parte porque el comprador asume la flexibilidad de fabricación. El vidrio templado cuesta ~3× más que el recocido en parte porque la fábrica asume el riesgo de errores de especificación: una vez templado, no puede ser reprocesado.
        </p>

        <h2 id="spontaneous-breakage">El Único Riesgo: Rotura Espontánea por NiS</h2>

        <p>
          El vidrio templado tiene un modo de fallo poco frecuente pero muy conocido: <strong>rotura espontánea por inclusiones de sulfuro de níquel (NiS)</strong>. Partículas microscópicas de NiS presentes en el vidrio crudo pueden sufrir una lenta transición de fase a lo largo de meses o años, expandiéndose aproximadamente un 4% en volumen. Esta expansión dentro del núcleo en tensión de una hoja de vidrio templado puede desencadenar un fallo catastrófico: la hoja explota sin causa aparente, a veces años después de su instalación.
        </p>

        <p>
          La tasa de fallo es baja — las estimaciones del sector oscilan entre 1 de cada 10,000 y 1 de cada 100,000 paneles de vidrio templado — pero cuando ocurre en un muro cortina de gran altura, representa un evento de responsabilidad civil. Existen medidas preventivas:
        </p>

        <ul>
          <li>
            <strong>Control en origen:</strong> Solo adquirimos materia prima de fábricas de vidrio flotado proveedoras con cribado documentado de NiS. Los lotes sospechosos se rechazan antes de entrar en nuestra línea de producción.
          </li>
          <li>
            <strong>Ensayo de choque térmico (HST):</strong> Tras el templado, los paneles sospechosos pueden recalentarse a ~290°C y mantenerse durante 2-4 horas. Los paneles con inclusiones de NiS tienden a fallar durante este ensayo en lugar de hacerlo en obra. El HST añade ~$5-10/m² al precio, pero es estándar en trabajos de muro cortina en altura.
          </li>
          <li>
            <strong>Especificar vidrio laminado templado:</strong> Si un panel se rompe espontáneamente, la lámina intermedia de PVB (polivinil butiral) retiene los fragmentos en su lugar — sin caída de vidrio. Consulte nuestra <a href="/blog/tempered-glass-vs-laminated-glass">comparativa entre vidrio templado y vidrio laminado</a> para saber cuándo conviene optar por la versión superior.
          </li>
        </ul>

        <p>
          Para la mayoría de las aplicaciones arquitectónicas por debajo de 10 plantas y sin instalación en posición cenital, el vidrio templado con certificación 3C estándar es apropiado sin necesidad de HST. Para fachadas de gran altura, acristalamientos cenitales o cualquier aplicación en la que la caída de una hoja pueda causar lesiones, recomendamos configuraciones de vidrio templado con ensayo de choque térmico o de vidrio laminado templado.
        </p>

        <h2 id="what-good-looks-like">Cómo Luce un Buen Templado</h2>

        <p>
          Para compradores que evalúan la calidad del vidrio templado de cualquier proveedor — incluido nosotros — estos son los aspectos específicos que deben verificarse:
        </p>

        <ul>
          <li>
            <strong>Informe de ensayo de fragmentación</strong> por lote — que muestre ≥40 fragmentos por cuadrado de 50mm × 50mm, sin ninguna esquirla de longitud superior a 100mm
          </li>
          <li>
            <strong>Tensión de compresión superficial</strong> medida (mediante medidor GASP o SCALP) ≥90 MPa para producto con certificación 3C
          </li>
          <li>
            <strong>Ondulación de rodillo</strong> dentro de tolerancia según ASTM C1048 — visible como ondulaciones bajo luz rasante
          </li>
          <li>
            <strong>Comba / deformación general</strong> menos de 3 mm por metro para vidrio templado arquitectónico
          </li>
          <li>
            <strong>Calidad del canto</strong> — sin astillas, sin marcas de corte en bruto, grado de pulido conforme a especificación
          </li>
          <li>
            <strong>Marca de certificación 3C</strong> (logotipo CCC) grabado o serigrafiado sobre el vidrio, con trazabilidad por lote
          </li>
          <li>
            <strong>Para aplicaciones de alto riesgo:</strong> certificado de ensayo de choque térmico según EN 14179 o equivalente
          </li>
        </ul>

        <p>
          Nuestra página de producto de vidrio templado incluye las opciones estándar y la ficha técnica:{' '}
          <a href="/products/tempered-glass">Detalles del producto de vidrio templado</a>. Para cotizaciones específicas de proyecto o revisiones de especificación, utilice el botón Solicitar cotización en el encabezado.
        </p>

        {/* Pillar back-link */}
        <TechNote type="note" title="Una visión de conjunto">
          <p>
            Este artículo es el primero de nuestra serie de Guías Técnicas. Para una visión completa de las 5 familias de vidrio arquitectónico y cuándo especificar cada una, consulte nuestra <a href="/blog/architectural-glass-types-guide">guía completa del comprador de tipos de vidrio arquitectónico</a>.
          </p>
        </TechNote>

        <FAQ items={buyerFaqItems} />

        
        <TechNote type="note" title="Lectura complementaria">
          <p>
            Ahora que sabe cómo se fabrica el vidrio templado, descubra cómo se produce su producto de vidrio de seguridad complementario en nuestro{' '}
            <a href="/blog/how-is-laminated-glass-made">
              recorrido por el proceso de producción de vidrio laminado
            </a>{' '}
            — química de autoclave, selección de lámina intermedia PVB (polivinil butiral) vs SGP (SentryGlas Plus), y los defectos que se remontan a la disciplina del proceso.
          </p>
        </TechNote>

        
        <TechNote type="note" title="Complete la trilogía">
          <p>
            Consulte el tercer proceso de fabricación de nuestra serie de Guías Técnicas:{' '}
            <a href="/blog/how-is-insulated-glass-made">
              cómo se fabrican las unidades de vidrio aislante (UVA)
            </a>{' '}
            — el sistema sellado de 5 componentes, la mecánica del relleno de argón, y la química de doble sello que determina si una UVA (Unidad de Vidrio Aislante) dura 10 o 30 años.
          </p>
        </TechNote>

        
        {/* Technical Pillar back-link */}
        <TechNote type="note" title="Una visión de conjunto">
          <p>
            Este artículo es uno de los tres análisis técnicos en profundidad de nuestra serie de Guías Técnicas.
            Para la visión general a nivel de comprador de los 3 procesos de fabricación y cómo se
            corresponden con las capacidades del proveedor, consulte nuestra{' '}
            <a href="/blog/architectural-glass-manufacturing-guide">
              guía completa de fabricación de vidrio arquitectónico
            </a>.
          </p>
        </TechNote>

        <RelatedProductsCards slugs={['tempered-glass', 'laminated-glass', 'low-e-glass']} />

        <LeadMagnetCTA variant="footer" articleSlug="how-is-tempered-glass-made" />
      </BlogArticleLayout>
    </>;
}