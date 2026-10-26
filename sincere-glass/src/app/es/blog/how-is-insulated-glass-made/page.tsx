import { blogArticles, type BlogArticle } from '@/lib/blog-registry';
import BlogArticleLayout, { generateArticleMetadata, articleJsonLd, type TOCItem } from "@/_i18n/es/components/blog/BlogArticleLayout";
import TLDRBox from "@/_i18n/es/components/blog/TLDRBox";
import LeadMagnetCTA from "@/_i18n/es/components/blog/LeadMagnetCTA";
import RelatedProductsCards from "@/_i18n/es/components/blog/RelatedProductsCards";
import { FAQ, TechNote } from "@/_i18n/es/components/blog/blocks";
import IGUAnatomyExplorer from "@/_i18n/es/components/blog/article-6/IGUAnatomyExplorer";
import GasConductivityChart from "@/_i18n/es/components/blog/article-6/GasConductivityChart";
import SealLifespanTimeline from "@/_i18n/es/components/blog/article-6/SealLifespanTimeline";
const SLUG = 'how-is-insulated-glass-made';
const article: BlogArticle = blogArticles.find(a => a.slug === SLUG)!;
export const metadata = generateArticleMetadata(article);
const toc: TOCItem[] = [{
  id: 'not-just-two-panes',
  text: "Una UVA (Unidad de Vidrio Aislante) No Es Solo \"Dos Hojas Con una Cámara\"",
  level: 2
}, {
  id: 'anatomy',
  text: "Los 5 Componentes de una UVA (Unidad de Vidrio Aislante)",
  level: 2
}, {
  id: 'production',
  text: "La Línea de Producción Completa",
  level: 2
}, {
  id: 'spacer-decision',
  text: "La Decisión del Perfil Separador: Aluminio vs Borde Cálido",
  level: 2
}, {
  id: 'argon-fill',
  text: "El Relleno de Argón: Por Qué Importa y Cómo Se Realiza",
  level: 2
}, {
  id: 'dual-seal',
  text: "Doble Sello: La Cuestión de la Vida Útil de 25 Años",
  level: 2
}, {
  id: 'qc',
  text: "Control de Calidad: Punto de Rocío, Contenido de Gas, Integridad del Sello",
  level: 2
}, {
  id: 'faq',
  text: "Preguntas frecuentes del comprador",
  level: 2
}];
const buyerFaqItems = [{
  q: "What's the production lead time for insulated glass units?",
  a: 'Our standard IGU production cycle is 10-15 working days from order confirmation, matching our laminated glass line. For IGUs that require Low-E coated glass or laminated outer lites, the lead time extends to 15-20 working days because the lites must be fully processed before IGU assembly can begin.'
}, {
  q: 'What\'s the typical lifespan of an insulated glass unit?',
  a: 'A properly sealed dual-seal IGU with PIB + silicone seals should maintain its gas fill and remain condensation-free for 25-30 years. Our standard IGUs ship with a 10-year seal warranty; 15-year warranty is available for projects using premium silicone secondary seals. Lifespan is dominated by seal quality, not by the glass itself.'
}, {
  q: 'Can IGUs be shipped by sea without seal damage?',
  a: 'Yes, if the production quality is correct. Properly sealed dual-seal IGUs are stable in sea transit; the pressure change at altitude (for air freight) is actually more stressful than ocean shipping. We package IGUs in pine A-frame crates with corner protection and desiccant packs. For destinations above 1500m elevation (Denver, Mexico City, La Paz), we recommend specifying pressure-equalizing capillary tubes to prevent seal stress.'
}, {
  q: 'What does "argon-filled" actually mean — is it 100% argon?',
  a: 'Industry standard "argon-filled" means approximately 90-95% argon concentration at time of manufacture, with the remaining 5-10% being residual air that could not be fully displaced during the fill process. Over 25 years, slow permeation through the seal typically reduces this by about 1% per year, so a 25-year-old argon IGU may have 65-70% argon remaining. We test fill percentage at QC and provide fill-rate certificates for high-performance specifications.'
}, {
  q: "What's the MOQ for insulated glass orders from Sincere Glass?",
  a: 'Standard MOQ is 50 square meters per order, with no restriction on panel sizes within our 3m × 15m line capacity. For high-performance IGUs (laminated outer lite + Low-E + argon + warm-edge spacer), we recommend ordering in whole facade sets rather than small batches to maintain consistent production parameters across the project.'
}];
export default function Page() {
  return <>
      {articleJsonLd(article, buyerFaqItems).map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}

      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox takeaways={['An IGU (insulated glass unit) is 2+ glass lites separated by a sealed cavity filled with inert gas, with a desiccant-filled spacer bar and a dual-seal perimeter.', 'The thermal performance comes from the gas fill (argon vs air cuts U-value by ~20%) and Low-E coating (another 40-50% reduction) — not the glass itself.', 'The lifespan comes from the dual seal system: primary butyl (PIB) for moisture/gas barrier + secondary silicone or polysulfide for structural strength. Properly sealed: 25-30 years.', 'Production cycle: ~2 hours from assembly to seal cure, but requires strict humidity control (under 30% RH) throughout — a wet IGU is a dead IGU.', 'Common failure mode: seal degradation leading to desiccant saturation and internal condensation (visible fog between panes). Not repairable — the IGU must be replaced.']} />

        <p>
          De los tres principales procesos de fabricación de vidrio — templado, laminado y ensamblaje de UVA (Unidad de Vidrio Aislante)
          — la producción de UVA es la más <strong>system-engineering</strong>orientada a la precisión de ensamblaje.
          El templado es un proceso térmico; el laminado es una unión química; la producción de UVA es
          una disciplina de ensamblaje en la que cinco componentes deben funcionar conjuntamente durante 25+ años en
          un sistema sellado que nunca puede abrirse para mantenimiento.
        </p>

        <p>
          Este artículo describe lo que ocurre en una línea de producción de UVA — concretamente
          la nuestra, que incluye una línea automática de gran formato con relleno de argón entre nuestras 2 líneas de UVA.
          Es el artículo complementario a nuestro{' '}
          <a href="/blog/how-is-tempered-glass-made">recorrido por la producción de vidrio templado</a>{' '}
          and{' '}
          <a href="/blog/how-is-laminated-glass-made">recorrido por la producción de vidrio laminado</a>, completando la trilogía sobre cómo se fabrica realmente el vidrio arquitectónico moderno. Para un marco más amplio sobre la selección de vidrio, consulte nuestra{' '}
          <a href="/blog/architectural-glass-types-guide">guía completa de tipos de
          vidrio arquitectónico</a>.
        </p>

        <h2 id="not-just-two-panes">Una UVA (Unidad de Vidrio Aislante) No Es Solo "Dos Hojas Con una Cámara"</h2>

        <p>
          La intuición de que "el vidrio aislante son dos hojas con aire entre ellas" es como decir "el motor de un coche son pistones que suben y bajan." Técnicamente correcto, operativamente engañoso. El <strong>cavidad sellada</strong> es lo que hace funcionar el sistema —
          no el espacio en sí. Una vez que el aire puede circular libremente hacia dentro y hacia fuera, el aislamiento térmico colapsa y se forma condensación. Toda la disciplina de producción existe para crear y mantener ese sello.
        </p>

        <p>
          Tres condiciones deben cumplirse para que una UVA (Unidad de Vidrio Aislante) funcione:
        </p>

        <ul>
          <li>
            <strong>La cavidad debe permanecer sellada</strong> durante décadas, resistiendo la exposición UV, los ciclos térmicos y los movimientos del edificio.
          </li>
          <li>
            <strong>El gas de relleno debe permanecer en su interior</strong> — el argón escapa entre 1 y 2 veces más rápido que el aire
            a través de cualquier defecto en el sello, por lo que los sellos deficientes degradan el rendimiento térmico antes de que aparezca niebla visible.
          </li>
          <li>
            <strong>La humedad interna debe mantenerse baja</strong> — la humedad residual en la
            cavidad provoca condensación en la primera mañana fría, visible como niebla entre
            las hojas.
          </li>
        </ul>

        <p>
          Cada requisito corresponde a un componente específico de la UVA (Unidad de Vidrio Aislante), que analizaremos a continuación.
        </p>

        <h2 id="anatomy">Los 5 Componentes de una UVA (Unidad de Vidrio Aislante)</h2>

        <p>
          Haga clic en cualquier componente del diagrama a continuación para ver su función, las opciones disponibles y lo que especificamos como estándar:
        </p>

        <IGUAnatomyExplorer />

        <p>
          La mayoría de los compradores se centran en el vidrio en sí (hoja exterior, hoja interior, recubrimiento Low-E) y
          tratan el perfil separador y los sellos como elementos genéricos. Esto invierte completamente las prioridades. <strong>El vidrio es la parte fácil</strong> — cualquier proveedor de vidrio flotado
          puede suministrar un 6mm transparente con recubrimiento de baja emisividad (Low-E). El perfil separador, el desecante y el sistema de sellado determinan si ese vidrio seguirá rindiendo según lo previsto a los 25 años o si se habrá empañado antes del año 8.
        </p>

        <LeadMagnetCTA variant="inline" articleSlug="how-is-insulated-glass-made" />

        <h2 id="production">La Línea de Producción Completa</h2>

        <p>
          A diferencia del templado (un horno continuo) o el laminado (un autoclave por lotes), el ensamblaje de la UVA (Unidad de Vidrio Aislante) es una <strong>línea de estaciones secuencial</strong>. Cada unidad pasa por 8 estaciones en secuencia, completándose normalmente en unas 2 horas por unidad (aunque la línea completa funciona de forma continua):
        </p>

        <ol>
          <li>
            <strong>Preparación del vidrio</strong> — Ambas hojas llegan desde las líneas anteriores (de templado o laminado). Se lavan con agua desionizada, se secan con cuchilla de aire y se inspeccionan para detectar defectos superficiales. En el caso del vidrio de baja emisividad (Low-E), se verifica la orientación del recubrimiento (el recubrimiento debe quedar orientado hacia la cámara, en la superficie n.º 2 o n.º 3).
          </li>
          <li>
            <strong>Ensamblaje del marco separador</strong> — Los perfiles separadores se cortan a medida, se doblan en las esquinas (o se unen a tope en el caso de compuestos de borde cálido) y se rellenan con desecante fresco. El perímetro del marco debe ser dimensionalmente preciso con una tolerancia de 1mm; de lo contrario, la alineación del vidrio falla en las estaciones posteriores.
          </li>
          <li>
            <strong>Aplicación del sello primario</strong> — Se aplica butilo termofusible (PIB) como cordón continuo en ambas caras del marco separador. Este es el sello de barrera contra gases y humedad.
          </li>
          <li>
            <strong>Prensa de ensamblaje</strong> — El conjunto (hoja exterior + marco separador + hoja interior) se prensa bajo presión ligera para asentar el PIB sin que este se expanda. El perfil separador debe quedar perfectamente paralelo a ambas hojas — cualquier desviación compromete el sello.
          </li>
          <li>
            <strong>Relleno de gas (si se especifica)</strong> — Se inyecta argón o criptón a través de dos orificios en la esquina del perfil separador, desplazando el aire por un segundo orificio. En nuestra línea automática, este es un proceso controlado que apunta a una tasa de llenado del 90%+.
          </li>
          <li>
            <strong>Sellado de los orificios de relleno</strong> — Los orificios de inyección se tapan con butilo y se sella el exterior sobre ellos. Este es el punto de fallo más frecuente cuando el control de calidad en producción es deficiente.
          </li>
          <li>
            <strong>Sello secundario</strong> — Se inyecta silicona (nuestro estándar) o polisulfuro alrededor de todo el perímetro en el canal entre los bordes del vidrio y la cara exterior del perfil separador. Esto aporta resistencia estructural y protección UV al sello primario.
          </li>
          <li>
            <strong>Curado + CC</strong> — El sello secundario cura durante 24-48 horas. El control de calidad verifica el punto de rocío, el porcentaje de relleno de gas y la precisión dimensional antes del embalaje.
          </li>
        </ol>

        <h2 id="spacer-decision">La Decisión del Perfil Separador: Aluminio vs Borde Cálido</h2>

        <p>
          El perfil separador es el elemento de mayor puente térmico en una UVA (Unidad de Vidrio Aislante). En una UVA de vidrio de baja emisividad (Low-E) con valor U de 1,4 W/m²·K, el sello perimetral puede representar entre el 15 y el 25 % de la pérdida de calor total a través de la ventana. La elección del material del perfil separador es, por tanto, una decisión de rendimiento significativa:
        </p>

        <ul>
          <li>
            <strong>Perfil separador de aluminio (estándar):</strong> La mayor conductividad térmica (~220 W/m·K); genera el mayor puente térmico. Es la opción más económica. Adecuada para acristalamiento residencial de bajo presupuesto en climas templados. En invierno, la temperatura en el borde puede caer por debajo del punto de rocío, provocando condensación visible en el vidrio cerca del perfil separador.
          </li>
          <li>
            <strong>Perfil separador de acero inoxidable:</strong> Opción intermedia (~16 W/m·K). Mejora modesta respecto al aluminio con un sobrecosto moderado. Habitual en los mercados residenciales europeos.
          </li>
          <li>
            <strong>Perfil separador de borde cálido compuesto (TPS, Super Spacer, Swiggle):</strong> La menor conductividad térmica (~0,1-0,3 W/m·K). La opción premium del sector para acristalamiento de alto rendimiento. Puede mejorar el valor U en el centro del vidrio en 0,1-0,2 W/m²·K y reducir significativamente el riesgo de condensación en el borde.
          </li>
        </ul>

        <p>
          Para cualquier UVA (Unidad de Vidrio Aislante) con recubrimiento de baja emisividad (Low-E), se recomienda encarecidamente el perfil separador de borde cálido — el puente térmico de un perfil separador de aluminio anula gran parte del beneficio del vidrio de baja emisividad (Low-E) en el perímetro. Especificamos perfiles separadores de borde cálido compuestos como estándar para todos los pedidos de UVA con vidrio de baja emisividad (Low-E).
        </p>

        <h2 id="argon-fill">El Relleno de Argón: Por Qué Importa y Cómo Se Realiza</h2>

        <p>
          El relleno de argón añade menos de $2-3/m² durante la producción y reduce el valor U en aproximadamente un 20 % en comparación con el aire seco. Esta es una de las mejoras de mejor relación costo/rendimiento en todo el sector del vidrio arquitectónico. Explore las opciones de gas para ver por qué:
        </p>

        <GasConductivityChart />

        <p>
          La física es sencilla: la conductividad térmica a través de un gas depende del recorrido libre medio de las moléculas entre colisiones. Los átomos de argón son más pesados y grandes que el aire (N₂ y O₂), por lo que colisionan con mayor frecuencia y transfieren menos energía. El criptón y el xenón son aún más grandes y eficaces, pero el costo se incrementa de forma considerable.
        </p>

        <p>
          Nuestro proceso de relleno emplea un método de dos puertos: un puerto de inyección y un puerto de ventilación situados en esquinas diagonales del perfil separador. El argón entra a ~5-10 L/min mientras el aire desplazado sale por el venteo. El proceso dura típicamente entre 30 y 60 segundos por UVA (Unidad de Vidrio Aislante) y alcanza una concentración de argón del 90-95 %, verificada mediante sensor de oxígeno en el puerto de ventilación. Ambos puertos se sellan posteriormente con butil seguido de silicona secundaria.
        </p>

        <TechNote type="tip" title="UVA (Unidad de Vidrio Aislante) para grandes altitudes">
          <p>
            Para proyectos en zonas de altura (Denver, Ciudad de México, Johannesburgo) o en cualquier caso donde la UVA (Unidad de Vidrio Aislante) vaya a enviarse por flete aéreo atravesando cambios de presión significativos, recomendamos especificar <strong>tubos capilares</strong> — pequeños tubos de ventilación embebidos en el perfil separador que permiten la ecualización de presión durante el transporte y se obturan después de la instalación. Sin ellos, el diferencial de presión puede comprometer el sello y provocar un fallo prematuro. No son necesarios para envíos por vía marítima ni para instalaciones por debajo de 1500m.
          </p>
        </TechNote>

        <h2 id="dual-seal">Doble Sello: La Cuestión de la Vida Útil de 25 Años</h2>

        <p>
          El sistema de sellado determina si una UVA (Unidad de Vidrio Aislante) dura 10 o 30 años. Consulte los sistemas a continuación para ver las proyecciones de vida útil:
        </p>

        <SealLifespanTimeline />

        <p>
          Las UVA (Unidad de Vidrio Aislante) de sello único siguen presentes en el mercado residencial de bajo coste, pero no deben considerarse para ningún proyecto comercial. Dentro de los sistemas de doble sello, la elección entre sello secundario de polisulfuro y silicona depende de la aplicación:
        </p>

        <ul>
          <li>
            <strong>Sello secundario de polisulfuro:</strong> Menor coste, vida útil esperada de 20-25 años. Adecuado para acristalamiento comercial estándar. No es estable a la radiación UV — debe quedar protegido de la luz solar directa mediante el marco.
          </li>
          <li>
            <strong>Sello secundario de silicona:</strong> Mayor coste, vida útil esperada de 30+ años. Estable a la radiación UV, adecuado para acristalamiento estructural donde el sello puede quedar expuesto. Obligatorio para el acristalamiento estructural de silicona (SSG) en el que la UVA (Unidad de Vidrio Aislante) se adhiere al marco del muro cortina a través del propio sello secundario.
          </li>
        </ul>

        <p>
          Nuestro estándar es sello primario de PIB + sello secundario de silicona. Para proyectos con alta sensibilidad al coste en los que la UVA (Unidad de Vidrio Aislante) vaya enmarcada en perfilería de aluminio estándar, podemos cotizar PIB + polisulfuro como alternativa.
        </p>

        <h2 id="qc">Control de Calidad: Punto de Rocío, Contenido de Gas, Integridad del Sello</h2>

        <p>
          El control de calidad de las UVA (Unidad de Vidrio Aislante) es particular porque las características de rendimiento críticas son <strong>invisible</strong>. Una UVA (Unidad de Vidrio Aislante) terminada tiene exactamente el mismo aspecto que una no funcional a simple vista — ambas son dos hojas con una cámara intermedia. Se requieren ensayos:
        </p>

        <ul>
          <li>
            <strong>Ensayo de punto de rocío</strong> — Una pequeña muestra de cada lote se congela a -40°C y se inspecciona para detectar la formación de escarcha interior. Un desecante correctamente secado debe mantener el punto de rocío por debajo de -40°C. Cualquier escarcha visible indica que el desecante estaba agotado o que hubo penetración de humedad durante el ensamblaje.
          </li>
          <li>
            <strong>Medición del contenido de gas</strong> — La espectroscopía de emisión de chispa o el muestreo por sensor de oxígeno verifican el porcentaje de relleno de argón. Sometemos a prueba cada 20ª unidad de una serie y proporcionamos certificados de tasa de relleno para especificaciones de alto rendimiento.
          </li>
          <li>
            <strong>Inspección de continuidad del sello</strong> — Inspección visual y con sonda del sello primario y sello secundario en todo el perímetro. Las discontinuidades o vacíos se marcan para reparación o rechazo.
          </li>
          <li>
            <strong>Precisión dimensional</strong> — Se miden el espesor total, la escuadría del perfil separador y el desplazamiento entre las dos hojas de vidrio. Tolerancias conforme a EN 1279-6 o GB/T 11944-2012.
          </li>
          <li>
            <strong>Inspección óptica visual</strong> — Sin rayaduras, sin residuos en la cámara, sin defectos del perfil separador visibles a través del vidrio. Cualquier contaminación dentro de la cámara es motivo de rechazo — no puede limpiarse una vez sellada.
          </li>
        </ul>

        <p>
          Nuestra página de producto para vidrio aislante cubre las opciones de composición estándar y la ficha técnica:{' '}
          <a href="/products/insulated-glass">Detalles del producto Vidrio Aislante</a>. Para cotizaciones específicas de proyecto, utilice el botón Solicitar Cotización en el encabezado.
        </p>

        {/* Pillar back-link */}
        <TechNote type="note" title="Una visión de conjunto">
          <p>
            Este artículo completa nuestra trilogía de Guías Técnicas sobre fabricación de vidrio — consulte también nuestros recorridos sobre la{' '}
            <a href="/blog/how-is-tempered-glass-made">producción de vidrio templado</a> and{' '}
            <a href="/blog/how-is-laminated-glass-made">producción de vidrio laminado</a>.
            Para un marco más amplio de las 5 familias de vidrio arquitectónico, consulte nuestra{' '}
            <a href="/blog/architectural-glass-types-guide">guía completa para compradores sobre tipos de vidrio arquitectónico</a>.
          </p>
        </TechNote>

        <FAQ items={buyerFaqItems} />

        
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

        <RelatedProductsCards slugs={['insulated-glass', 'low-e-glass', 'laminated-glass']} />

        <LeadMagnetCTA variant="footer" articleSlug="how-is-insulated-glass-made" />
      </BlogArticleLayout>
    </>;
}