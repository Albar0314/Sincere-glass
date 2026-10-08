import { blogArticles, type BlogArticle } from '@/lib/blog-registry';
import BlogArticleLayout, { generateArticleMetadata, articleJsonLd, type TOCItem } from "@/_i18n/es/components/blog/BlogArticleLayout";
import TLDRBox from "@/_i18n/es/components/blog/TLDRBox";
import LeadMagnetCTA from "@/_i18n/es/components/blog/LeadMagnetCTA";
import RelatedProductsCards from "@/_i18n/es/components/blog/RelatedProductsCards";
import { FAQ, TechNote } from "@/_i18n/es/components/blog/blocks";
import PVBvsSGPComparison from "@/_i18n/es/components/blog/article-5/PVBvsSGPComparison";
import AutoclaveCurveChart from "@/_i18n/es/components/blog/article-5/AutoclaveCurveChart";
import DelaminationFailureViewer from "@/_i18n/es/components/blog/article-5/DelaminationFailureViewer";
const SLUG = 'how-is-laminated-glass-made';
const article: BlogArticle = blogArticles.find(a => a.slug === SLUG)!;
export const metadata = generateArticleMetadata(article);
const toc: TOCItem[] = [{
  id: 'not-just-glue',
  text: "El Laminado No Es Simplemente \"Pegar Dos Hojas\"",
  level: 2
}, {
  id: 'interlayers',
  text: "Las Cuatro Tecnologías de Lámina Intermedia",
  level: 2
}, {
  id: 'production-line',
  text: "La Línea de Producción Completa",
  level: 2
}, {
  id: 'autoclave',
  text: "El Autoclave: Donde Ocurre Realmente el Laminado",
  level: 2
}, {
  id: 'can-be-cut',
  text: "Por Qué el Vidrio Laminado SÍ Puede Cortarse (A Diferencia del Templado)",
  level: 2
}, {
  id: 'defects',
  text: "Fallos Comunes: Burbujas, Deslaminación, Turbidez",
  level: 2
}, {
  id: 'when-to-spec',
  text: "Cuándo Especificar Cada Lámina Intermedia",
  level: 2
}, {
  id: 'faq',
  text: "Preguntas frecuentes del comprador",
  level: 2
}];
const buyerFaqItems = [{
  q: 'How long does laminated glass take to produce?',
  a: 'The autoclave cycle itself is about 2.5 hours. Including cutting, cleaning, pre-press, and quality inspection, our standard production cycle is 10-15 working days from order confirmation. Combined laminated-IGU (laminated + insulated glass unit) runs 15-20 working days because it involves both the lamination autoclave and the IGU production line in sequence.'
}, {
  q: "What's the maximum size laminated glass we can produce?",
  a: 'Our 3m × 15m autoclave is among the largest in Hubei province, matching our tempering furnace capacity. This lets us produce jumbo laminated panels (and combined tempered-laminated panels) for structural glazing, large curtain walls, and ultra-wide canopies that smaller factories cannot handle.'
}, {
  q: 'Can laminated glass be cut after lamination?',
  a: 'Yes, if the glass lites inside are annealed. The interlayer is cut with a knife or heated wire after scoring and snapping the glass. However, laminated TEMPERED glass cannot be re-cut — tempering locks the glass permanently (see our tempered glass production guide for why). For modifications to tempered-laminated panels, new raw materials must be ordered.'
}, {
  q: 'What interlayer should I specify for a hurricane-prone region?',
  a: 'SGP (SentryGlas / Ionoplast) is the standard for hurricane and cyclone zones. It is ~100× stiffer than PVB post-break, which lets the broken panel continue to carry wind load until replaced. Minimum thickness 1.52mm SGP for Miami-Dade hurricane rating per TAS 201/202/203 test protocols. We produce SGP-laminated panels on the same line as PVB — specify "SGP" in your drawings.'
}, {
  q: 'Why do some laminated glass panels get bubbles after a few years?',
  a: 'This is usually not post-production bubble formation — it is pre-existing micro-bubbles that gradually expand due to interlayer stress. Caused by inadequate autoclave pressure during the de-airing phase. A properly produced laminated panel should remain bubble-free for the lifetime of the installation. Our batch records trace every panel back to specific autoclave cycle data, so field failures can be investigated and traced to root cause.'
}];
export default function Page() {
  return <>
      {articleJsonLd(article, buyerFaqItems).map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}

      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox takeaways={['Laminated glass is two or more glass panes permanently bonded by a polymer interlayer (PVB, SGP, EVA, or acoustic PVB) via a controlled heat + pressure cycle in an autoclave.', 'The autoclave reaches ~140°C and 12 bar for roughly 30-40 minutes, chemically fusing the PVB with glass surfaces. Total cycle including ramp-up and cool-down: ~2.5 hours.', 'PVB is the default interlayer (automotive, standard safety glass). SGP is ~3-5× the cost but ~100× stiffer post-break — the standard for hurricane zones and structural glazing.', 'Unlike tempered glass, laminated glass CAN be cut after production (if the glass inside is annealed). However, laminated-TEMPERED glass cannot be re-cut.', 'Most laminated glass defects (bubbles, haze, yellowing) trace back to interlayer handling and autoclave cycle control, not materials — process discipline is everything.']} />

        <p>
          "El vidrio laminado es solo dos hojas con plástico en medio" — esto es técnicamente
          cierto y casi completamente erróneo. La lámina intermedia de plástico es un
          termoplástico de ingeniería precisa que debe procesarse bajo temperatura y presión
          exactas para formar un enlace molecular permanente con el vidrio. Si el proceso falla,
          el resultado son burbujas, turbidez o deslaminación de bordes que solo se manifiesta
          meses después en obra.
        </p>

        <p>
          Este artículo describe lo que ocurre realmente en una línea de laminado en funcionamiento
          — concretamente la nuestra en Wuhan, con nuestro autoclave de 3m × 15m (uno de los más
          grandes de la provincia de Hubei). Es el complemento de nuestra{' '}
          <a href="/blog/how-is-tempered-glass-made">recorrido por la producción de vidrio templado</a>{' '}
          — muchos de nuestros clientes especifican vidrio laminado-templado, que combina ambos procesos.
          Para un marco más amplio, consulte nuestra{' '}
          <a href="/blog/architectural-glass-types-guide">guía completa de tipos de vidrio arquitectónico</a>.
        </p>

        <h2 id="not-just-glue">El Laminado No Es Simplemente "Pegar Dos Hojas"</h2>

        <p>
          El laminado es un <strong>fusión química</strong>, no un adhesivo mecánico. La lámina intermedia (más comúnmente polivinil butiral, PVB) es una lámina termoplástica que, bajo la temperatura y presión adecuadas, forma enlaces covalentes e hidrogenados con los grupos hidroxilo de la superficie del vidrio. Realizado correctamente, el enlace es tan resistente como el vidrio mismo — un fallo de laminado es casi siempre un fallo del vidrio, no una delaminación.
        </p>

        <p>
          The <strong>valor de seguridad</strong> del vidrio laminado proviene de este enlace. Cuando el vidrio se rompe, los fragmentos permanecen adheridos a la lámina intermedia en lugar de convertirse en esquirlas proyectadas. Para acristalamientos en overhead, zonas de huracanes y seguridad en escaparates, esto es lo que exigen los códigos de construcción (IBC (Código Internacional de Construcción) 2021 §2405.5, §2406.4.4). Los beneficios acústicos y de bloqueo UV son secundarios.
        </p>

        <TechNote type="note" title="PVB (polivinil butiral) frente a otras láminas intermedias">
          <p>
            El PVB (polivinil butiral) es el estándar — fue inventado para parabrisas de automóviles en la década de 1930 y sigue representando ~95% del mercado por volumen. Sin embargo, existen otras tres láminas intermedias para aplicaciones especializadas: SGP (SentryGlas Plus) para trabajo estructural y en zonas de huracanes, EVA (etileno vinil acetato) para inclusiones decorativas, y PVB (polivinil butiral) acústico para entornos críticos en cuanto al ruido. La siguiente sección las compara.
          </p>
        </TechNote>

        <h2 id="interlayers">Las Cuatro Tecnologías de Lámina Intermedia</h2>

        <p>
          Seleccione entre 1 y 3 láminas intermedias a continuación para comparar sus especificaciones en paralelo:
        </p>

        <PVBvsSGPComparison />

        <p>
          La decisión práctica generalmente se reduce a <strong>PVB (polivinil butiral) frente a SGP (SentryGlas Plus)</strong>. El PVB (polivinil butiral) es el estándar para acristalamiento de seguridad en puertas, mamparas de ducha, marquesinas en overhead y parabrisas de automóviles convencionales. El SGP (SentryGlas Plus) entra en escena cuando se requiere que el panel laminado <em>continúe soportando carga</em> tras la rotura del vidrio — zonas de huracanes (según Miami-Dade TAS 201), suelos de vidrio estructural, acristalamiento con clasificación de resistencia a explosiones y barandillas de vidrio donde la retención ante caídas es determinante.
        </p>

        <p>
          El EVA (etileno vinil acetato) y el PVB (polivinil butiral) acústico son soluciones de nicho — el EVA para proyectos decorativos con inclusiones de tela o malla metálica (requiere procesado en horno de vacío en lugar de autoclave), y el PVB acústico para uso residencial premium frente a calles de alto tráfico donde se requieren valores STC (Clase de Transmisión Sonora) superiores a 36.
        </p>

        <LeadMagnetCTA variant="inline" articleSlug="how-is-laminated-glass-made" />

        <h2 id="production-line">La Línea de Producción Completa</h2>

        <p>
          En comparación con el templado, el laminado es un proceso más largo y más sensible a las condiciones ambientales. La diferencia clave: el templado es un único evento de choque térmico; el laminado es un proceso sostenido de unión química bajo humedad, limpieza y temperatura estrictamente controladas. La secuencia de producción:
        </p>

        <ol>
          <li>
            <strong>Preparación del vidrio</strong> — Ambas hojas se cortan a las dimensiones finales, se terminan los bordes y se lavan con agua desionizada. Para paneles templado-laminados, ambas hojas se templan completamente <em>before</em> ingresando a la línea de laminado.
          </li>
          <li>
            <strong>Preparación de la lámina de PVB (polivinil butiral)</strong> — El PVB (polivinil butiral) llega de los proveedores (Kuraray, Eastman Saflex, Trosifol, DuPont) en rollos sellados contra la humedad. Una sala de preparación con clima controlado (~20 °C, 25 % HR máx.) evita la absorción de humedad. La lámina se corta con un ligero sobredimensionamiento y se inspecciona para detectar arrugas, inclusiones y residuos.
          </li>
          <li>
            <strong>Assembly</strong> — El sándwich Vidrio + PVB (polivinil butiral) + Vidrio se ensambla en una sala limpia libre de polvo. La alineación es crítica: una mala alineación provoca delaminación de bordes posteriormente. Cualquier partícula de residuo entre las capas se convierte en un defecto visible permanente.
          </li>
          <li>
            <strong>Prensado previo (rodillo de compresión)</strong> — El sándwich pasa por rodillos de caucho calentados (~90 °C, presión moderada) que expulsan la mayor parte del aire atrapado y confieren al PVB (polivinil butiral) una adherencia inicial. Este paso es el que evita la formación de burbujas de gran tamaño en el autoclave.
          </li>
          <li>
            <strong>Ciclo de autoclave</strong> — El proceso de laminado propiamente dicho. 2,5 horas a una temperatura máxima de 140 °C y 12 bar. Consulte la sección siguiente para el ciclo detallado.
          </li>
          <li>
            <strong>Acabado de bordes + control de calidad</strong> — Recorte del sobrante de PVB (polivinil butiral), inspección óptica final y embalaje en bastidores tipo A.
          </li>
        </ol>

        <p>
          La sala de ensamblaje libre de polvo es donde la mayoría de las fábricas de nivel medio fallan. Un error del equipo de limpieza, una fibra de la ropa de un operario o una toma de aire sin filtrar pueden contaminar decenas de paneles antes de que nadie lo advierta. Nuestra sala de ensamblaje opera con presión positiva filtrada con HEPA y prendas de sala limpia exclusivas — un gasto elevado para una fábrica pequeña, pero necesario para una producción consistente.
        </p>

        <h2 id="autoclave">El Autoclave: Donde Ocurre Realmente el Laminado</h2>

        <p>
          El autoclave es un gran recipiente a presión que calienta y presuriza los paneles cargados en su interior. El ciclo es una curva de temperatura-presión controlada con precisión que fuerza al PVB (polivinil butiral) a fluir hacia cada microcavidad entre las superficies de vidrio, manteniéndolo en su lugar mientras se forma el enlace químico.
        </p>

        <AutoclaveCurveChart />

        <p>
          Las tres fases más críticas:
        </p>

        <ul>
          <li>
            <strong>Purga de aire (0-45 min):</strong> La presión aumenta <em>before</em>
            la temperatura alcanza el punto de fluencia del PVB (polivinil butiral). Esto obliga al aire atrapado a reabsorberse en el PVB, donde puede difundirse hacia el exterior, en lugar de quedar como burbujas permanentes. Una presión insuficiente en esta fase es la causa nº 1 de los defectos por burbujas.
          </li>
          <li>
            <strong>Permanencia (75-110 min):</strong> Temperatura y presión máximas mantenidas durante
            30-40 minutos. Es en este momento cuando se forma el enlace químico. Un tiempo de permanencia demasiado corto
            → enlace débil y futura delaminación. Demasiado largo → consumo energético innecesario
            y degradación del PVB (polivinil butiral).
          </li>
          <li>
            <strong>Enfriamiento (110-140 min):</strong> Debe mantenerse a alta presión
            hasta que la temperatura descienda por debajo del punto de fluencia del PVB (polivinil butiral) (~90 °C), o el aire atrapado puede
            reaparecer en forma de burbujas. Acelerar este paso es un ahorro falso.
          </li>
        </ul>

        <p>
          Nuestro autoclave es una unidad de 3m × 15m con control de ciclo programable calibrado para
          cada tipo de lámina intermedia (PVB (polivinil butiral), SGP (SentryGlas Plus), PVB acústico) y configuración de vidrio. Para la producción combinada de
          vidrio laminado-UVA (Unidad de Vidrio Aislante), la hoja exterior de vidrio laminado sale de este autoclave y
          se incorpora directamente a nuestra{' '}
          <a href="/products/insulated-glass">línea de vidrio aislante</a> para su ensamblaje en
          la UVA (Unidad de Vidrio Aislante) final.
        </p>

        <h2 id="can-be-cut">Por Qué el Vidrio Laminado SÍ Puede Cortarse (A Diferencia del Templado)</h2>

        <p>
          Una diferencia fundamental respecto a nuestro{' '}
          <a href="/blog/how-is-tempered-glass-made">artículo sobre vidrio templado</a>: el vidrio laminado
          puede cortarse después del laminado, siempre que las hojas de vidrio interiores sean de vidrio recocido. El
          proceso:
        </p>

        <ol>
          <li>Marcar el vidrio en ambas superficies con una rueda cortadora de vidrio convencional</li>
          <li>Romper a lo largo de las líneas de corte (ambas hojas se rompen simultáneamente)</li>
          <li>Cortar la lámina intermedia de PVB (polivinil butiral) con un cuchillo afilado o un hilo de nicromo calentado</li>
          <li>Repasar los bordes de vidrio expuestos</li>
        </ol>

        <TechNote type="warning" title="Excepción importante: vidrio templado-laminado">
          <p>
            Vidrio laminado con <strong>tempered</strong> las hojas de vidrio interiores no pueden volver a cortarse — el templado fija el vidrio de forma permanente. Cualquier intento lo hará añicos en gránulos. Para modificaciones en paneles de vidrio templado-laminado, se deben pedir nuevas materias primas y repetir íntegramente el proceso de laminado.
          </p>
        </TechNote>

        <p>
          Esta posibilidad de corte explica por qué el vidrio laminado recocido suele preferirse en proyectos con mucha fabricación en obra donde se esperan ajustes en campo, mientras que el vidrio templado-laminado se reserva para aplicaciones en las que las dimensiones finales quedan fijadas en la fase de diseño.
        </p>

        <h2 id="defects">Fallos Comunes: Burbujas, Deslaminación, Turbidez</h2>

        <p>
          Explore a continuación los defectos más comunes para ver su aspecto, sus causas y cómo los previene una fábrica de confianza:
        </p>

        <DelaminationFailureViewer />

        <p>
          Para los compradores que evalúan un proveedor de laminado, la pregunta no es "¿ocurren defectos?" (ocurren ocasionalmente, en toda fábrica) sino "¿son los defectos trazables a un lote específico, ciclo de autoclave o partida de materia prima?" Mantenemos registros completos de lote con registros de ciclo de autoclave, números de lote de PVB (polivinil butiral) y números de lote de vidrio de origen para cada producción. Los problemas en obra pueden investigarse y rastrearse hasta la causa raíz en 24 horas.
        </p>

        <h2 id="when-to-spec">Cuándo Especificar Cada Lámina Intermedia</h2>

        <p>
          Guía de decisión práctica basada en escenarios habituales de compradores:
        </p>

        <ul>
          <li>
            <strong>Acristalamiento de seguridad estándar (mampara de ducha, overhead, barandilla de vidrio):</strong>{' '}
            PVB (polivinil butiral) 0,76 mm o 1,52 mm. La opción predeterminada, de menor coste, cumple con todos los códigos de seguridad residenciales y la mayoría de los comerciales.
          </li>
          <li>
            <strong>Región propensa a huracanes (Florida, Caribe, costa asiática):</strong>{' '}
            SGP (SentryGlas Plus) 1,52 mm mínimo, certificado Miami-Dade NOA. Obligatorio para la construcción comercial y residencial en zonas costeras expuestas a ciclones.
          </li>
          <li>
            <strong>Vidrio estructural (suelos, puentes, superficies transitables):</strong>{' '}
            SGP (SentryGlas Plus) 2,28 mm, con cálculo cuidadoso de la capacidad de carga tras rotura. No es una decisión que deba tomarse sin asesoramiento — requiere la validación de un ingeniero estructural.
          </li>
          <li>
            <strong>Aplicaciones con requisitos acústicos críticos (residencial frente a calle, hospitales, hoteles):</strong>{' '}
            PVB (polivinil butiral) acústico de 0,76 mm. Incrementa el STC (Clase de Transmisión Sonora) en 2-3 puntos respecto al PVB estándar. Combínelo con una UVA (Unidad de Vidrio Aislante) para un rendimiento acústico máximo.
          </li>
          <li>
            <strong>Inclusiones decorativas (tela, malla, flores secas):</strong>{' '}
            EVA (etileno vinil acetato), procesado en horno de vacío. Solo para aplicaciones de interior — no es resistente a la intemperie.
          </li>
          <li>
            <strong>Resistente a explosiones o a la entrada forzada:</strong> Estructura multicapa de SGP (SentryGlas Plus)
            (3 o más hojas de vidrio, 2 o más láminas intermedias). Aplicación especializada; requiere
            especificación con clasificación de seguridad.
          </li>
        </ul>

        <p>
          Para la mayoría de los compradores de vidrio arquitectónico, la elección es PVB (polivinil butiral) (opción estándar) o SGP (SentryGlas Plus) (opción mejorada).
          Consulte nuestra{' '}
          <a href="/products/laminated-glass">página de producto de vidrio laminado</a> para
          estructuras estándar y ficha técnica, o nuestra{' '}
          <a href="/blog/insulated-glass-vs-laminated-glass">guía de selección entre vidrio aislante y vidrio laminado</a> para la decisión más amplia de "¿necesito realmente el laminado?".
        </p>

        {/* Pillar back-link */}
        <TechNote type="note" title="Una visión de conjunto">
          <p>
            Este artículo es el segundo de nuestra serie de Guías Técnicas — un complemento de nuestra{' '}
            <a href="/blog/how-is-tempered-glass-made">recorrido por la producción de vidrio templado</a>.
            Para el marco general de las 5 familias de vidrio arquitectónico, consulte nuestra{' '}
            <a href="/blog/architectural-glass-types-guide">guía completa para compradores sobre tipos de vidrio arquitectónico</a>.
          </p>
        </TechNote>

        <FAQ items={buyerFaqItems} />

        
        <TechNote type="note" title="Complete la trilogía">
          <p>
            Consulte el tercer proceso de fabricación de nuestra serie de Guías Técnicas:{' '}
            <a href="/blog/how-is-insulated-glass-made">
              cómo se fabrican las unidades de vidrio aislante (UVA)
            </a>{' '}
            — muchos de nuestros clientes especifican unidades combinadas de vidrio laminado y UVA, que pasan tanto por el autoclave de laminado como por la línea de ensamblaje de UVA de forma secuencial.
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

        <RelatedProductsCards slugs={['laminated-glass', 'tempered-glass', 'insulated-glass']} />

        <LeadMagnetCTA variant="footer" articleSlug="how-is-laminated-glass-made" />
      </BlogArticleLayout>
    </>;
}