import type { Metadata } from 'next';
import Script from 'next/script';
import BlogArticleLayout, { generateArticleMetadata, articleJsonLd } from "@/_i18n/es/components/blog/BlogArticleLayout";
import TLDRBox from "@/_i18n/es/components/blog/TLDRBox";
import LeadMagnetCTA from "@/_i18n/es/components/blog/LeadMagnetCTA";
import RelatedProductsCards from "@/_i18n/es/components/blog/RelatedProductsCards";
import CostDisclaimer from "@/_i18n/es/components/blog/CostDisclaimer";
import { FAQ } from "@/_i18n/es/components/blog/blocks";
import { blogArticles } from '@/lib/blog-registry';
import { makeAlternates } from '@/lib/i18n';
import CrateTypeSelector from "@/_i18n/es/components/blog/article-14/CrateTypeSelector";
import ContainerLoadingLab from "@/_i18n/es/components/blog/article-14/ContainerLoadingLab";
import DamageRiskMap from "@/_i18n/es/components/blog/article-14/DamageRiskMap";
const SLUG = 'glass-shipping-container-loading-guide';
const article = blogArticles.find(a => a.slug === SLUG)!;
const faqItems = [{
  q: 'What breakage rate is actually acceptable for a China-to-overseas glass shipment?',
  a: 'Industry norms sit at 2–5 % breakage for commodity glass loads, but a properly engineered pack (vertical crating, perimeter foam, ratchet re-tension after road transit, 4 kg desiccant per 40′HQ) routinely runs under 1 %. Suppliers citing "2–3 % is normal" are telling you they do not control for the preventable causes.'
}, {
  q: 'Can I ship architectural glass LCL to save freight?',
  a: 'For panels over 1.5 m longest side we refuse LCL. CFS warehouses stack mixed cargo, forklift operators are rotated hourly, and glass crates get moved three to five extra times before vessel loading. The $500–1,500 freight saving disappears into 3–5 × the breakage of an FCL. Cut sizes under 1.5 m with full enclosed boxes are the only safe LCL candidate.'
}, {
  q: 'What is the MOQ for a full container order?',
  a: 'A 20′DC fills on weight at roughly 25–27 t net glass (~800–1,000 m² of 10 mm equivalent). A 40′HQ is weight-limited at 26–28 t for monolithic glass but volume-filled at ~1,000–1,200 m² for IGU or laminated. We accept partial-container project orders starting at 300 m² when the specification mix justifies the cost per m².'
}, {
  q: 'Who signs the Bill of Lading when the shipment is damaged?',
  a: 'The carrier releases on receipt against a clean B/L. Damage is discovered at destination unpack — which is why clausing the Delivery Order with "subject to tally and condition on unpack" is critical, and why your Marine Insurance (ICC A) must be in force from the moment the container seal is applied at our factory, not from port of loading.'
}, {
  q: 'What certifications and paperwork does Sincere Glass include with every export shipment?',
  a: 'For every container we provide the commercial invoice, packing list with per-crate weights, Bill of Lading, Certificate of Origin (Form E for ASEAN destinations), ISPM-15 fumigation certificate for wooden crates, product test reports (GB 15763.2 for tempered, EN 14449 for laminated when the destination asks), and SGS or CCIC pre-shipment inspection if the buyer requests it. CE marking for the EU and SGCC certification for the US are available on request when the project specifies them.'
}, {
  q: 'Can you ship DDP to our warehouse, or are you FOB-only?',
  a: 'FOB Shanghai and FOB Shenzhen are our default. DDP is available for most destinations through our forwarder, but we price it transparently line by line (ocean freight, destination THC, duty, broker fee, delivery) rather than bundling, so the buyer can audit each cost. For buyers new to importing, we recommend CIF for the first shipment to let your own broker learn the lane.'
}];
export const metadata: Metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates(`/blog/${SLUG}`, "es")
};
export default function Page() {
  const toc = [{
    id: 'why-breakage',
    text: "Por qué el 2–5 % de rotura es \"aceptable en el sector\" (y por qué aquí no lo es)",
    level: 2
  }, {
    id: 'crate-types',
    text: "Los 4 tipos de embalaje en caja que utiliza realmente una fábrica de vidrio",
    level: 2
  }, {
    id: 'container-math',
    text: "Cuánto vidrio cabe en un contenedor (y lo que los cálculos no tienen en cuenta)",
    level: 2
  }, {
    id: 'loading-protocol',
    text: "El protocolo de carga de 7 pasos en nuestro almacén de Wuhan",
    level: 2
  }, {
    id: 'damage-map',
    text: "Los 6 puntos de daño que destruyen contenedores en silencio",
    level: 2
  }, {
    id: 'fcl-vs-lcl',
    text: "FCL vs LCL (Carga Consolidada) — por qué la mayoría de fábricas rechaza el LCL (Carga Consolidada) para vidrio arquitectónico",
    level: 2
  }, {
    id: 'insurance',
    text: "Seguro marítimo: ICC A, B, C — y lo que realmente pagan las reclamaciones por vidrio",
    level: 2
  }, {
    id: 'paperwork',
    text: "Códigos HS y documentación que detienen contenedores en puerto",
    level: 2
  }, {
    id: 'pre-seal-photos',
    text: "5 fotografías que su fábrica debe enviar antes del precinto del contenedor",
    level: 2
  }, {
    id: 'faq',
    text: "Preguntas frecuentes del comprador",
    level: 2
  }];
  return <>
      <Script id={`jsonld-${SLUG}`} type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{
      __html: JSON.stringify(articleJsonLd(article, faqItems))
    }} />

      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox takeaways={['Vertical crating (A-frame or L-type) is the only acceptable method for architectural glass over 1.5 m. Horizontal pallet stacking triples breakage.', 'A 40′HQ fills on weight at ~28 t for monolithic glass but on volume at ~1,100 m² for IGU — pick the container by product mix, not by habit.', 'Four kilograms of desiccant per 40′HQ plus a ceiling vapor liner stops the condensation-staining failure that destroys trans-Pacific laminated shipments.', 'Marine insurance under ICC A clauses from factory seal to buyer unpack is the only cover that actually pays glass claims. ICC C excludes handling damage.', 'Factories that quote "2–3 % breakage is normal" are telling you they do not control for the six preventable causes mapped in this guide.']} />

        <p className="lead">
          Todo pedido de vidrio arquitectónico fabricado en China se enfrenta tarde o temprano a su prueba más exigente: una caja de acero sellada, entre dos y cinco semanas en alta mar, y entre seis y doce manipulaciones desde nuestro muelle de carga en Wuhan hasta el sitio de su proyecto. La mayoría de los casos de "vidrio chino llegó roto" no son historias sobre vidrio chino — son historias sobre contenedores embalados por alguien que trató el vidrio como si fueran baldosas. Esta guía es el manual operativo que entregamos a cada nuevo comprador: cómo embalamos, cómo cargamos, cómo aseguramos, y las cinco fotografías que enviamos antes de precintar el contenedor para que usted sepa exactamente qué hay dentro.
        </p>

        <h2 id="why-breakage">Por qué el 2–5 % de rotura es "aceptable en el sector" (y por qué aquí no lo es)</h2>

        <p>
          Pregunte a cualquier agente de compras en una feria comercial qué tasa de rotura debe presupuestar. Los honestos le dirán 2–5 %. Los optimistas responden "para eso tenemos seguro." Ambas respuestas ocultan lo mismo: un embalaje sin ingeniería. En nuestra fábrica de 20,000 m² en Wuhan tratamos el <strong>{"< 1 % de rotura en el envío completo"}</strong> no como un objetivo aspiracional, sino como el estándar mínimo que una fábrica seria debe alcanzar, porque cada una de las causas de rotura que observamos tiene una prevención conocida, económica y auditable. Las que no podemos controlar — una grúa que deja caer un contenedor en el puerto de destino, el vuelco de un camión — son precisamente las que el seguro marítimo está diseñado para cubrir. Las que <em>can</em> controlamos (desconchado de bordes, manchas por condensación, impacto por golpe de puerta, dilatación por humedad, aplastamiento por apilado, impacto en esquinas) son el tema central del resto de este artículo.
        </p>

        <p>
          Existe una razón por la que el mercado tolera la historia del "2–5 %". Las roturas dentro de un contenedor sellado solo se descubren al desembalar — momento en el que el transportista ya ha emitido un conocimiento de embarque limpio, el transitario ha quedado fuera de la cadena, y el comprador negocia con una fábrica a 10,000 km de distancia. La estructura de incentivos de todo el trayecto premia a quien cobró primero. Publicamos nuestro protocolo operativo en artículos como este precisamente por esa razón: un comprador que lo lee puede auditar a cualquier proveedor con él, y una fábrica que no puede responder a esa auditoría no debería recibir el pedido.
        </p>

        <h2 id="crate-types">Los 4 tipos de embalaje en caja que utiliza realmente una fábrica de vidrio</h2>

        <p>
          Cuatro tipos de embalaje cubren prácticamente todos los envíos de vidrio arquitectónico: el <strong>A-frame</strong>, el <strong>L-type</strong>, el <strong>caja de madera fumigada</strong>, y el <strong>paleta plana</strong>. Cada opción presenta un equilibrio distinto entre protección, eficiencia en peso y coste. La elección incorrecta rara vez es dramática; suele ser una fuga lenta — una tasa de rotura del 2 % que se acumula en un historial de reclamaciones al seguro de un cuarto de millón de dólares en tres años. El selector a continuación aplica la misma regla de decisión que utilizamos en cada nueva cotización.
        </p>

        <p>
          <strong>Cómo funciona el selector:</strong> se selecciona el tipo de producto, el tamaño del panel y el volumen del pedido; el sistema devuelve una de cuatro recomendaciones de embalaje. La regla subyacente es: los espejos y el vidrio con frita cerámica siempre van en cajas de madera cerradas (por su sensibilidad a daños superficiales); los paneles de gran formato superiores a 2,4 m × 6 m requieren bastidor en A porque ninguna caja de madera tiene las dimensiones necesarias; la UVA (Unidad de Vidrio Aislante) estándar utiliza por defecto el tipo L (referencia del sector para el tránsito marítimo con peso equilibrado); los envíos de muestras de menos de 10 m² pueden usar paleta plana. La relación peso del embalaje : peso del vidrio y el coste adicional por m² que se muestran con cada recomendación corresponden a lo que facturamos.
        </p>

        <CrateTypeSelector />

        <p>
          La opción menos obvia de esa lista es la <em>paleta plana</em>. Es económica, es familiar, y es la responsable de la mayoría de las quejas sobre "vidrio chino que llega roto" que leemos en los foros de compradores. El apilado horizontal bajo la compresión de los movimientos en alta mar destruye las hojas inferiores mediante microfisuras invisibles hasta el primer ciclo térmico en la obra — momento en el que el panel se rompe espontáneamente y nadie puede demostrar dónde se originó la fisura. No cotizamos embalaje en paleta plana para piezas cuyo lado más largo supere 1,5 m, y cuando un comprador insiste, exigimos la firma de un eximente de responsabilidad.
        </p>

        <p>
          En los envíos en caja cerrada, el cumplimiento de la norma ISPM-15 importa más de lo que la mayoría de los compradores imagina. Australia, la UE, Canadá, Japón y EE. UU. rechazan en puerto el embalaje de madera no conforme — el contenedor queda retenido, se somete a fumigación adicional y los costes se repercuten al receptor, con 7–14 días de demurrage. Cada caja de madera que sale de nuestra fábrica lleva el sello IPPC de un centro de fumigación certificado en la zona de libre comercio de Wuhan. (Referencia: <a href="https://www.ippc.int/en/core-activities/standards-setting/ispm-15/" target="_blank" rel="noopener">Norma IPPC ISPM-15</a>, revisión 2018, de aplicación obligatoria para todos los signatarios.)
        </p>

        <h2 id="container-math">Cuánto vidrio cabe en un contenedor (y lo que los cálculos no tienen en cuenta)</h2>

        <p>
          Los compradores suelen pedir "un contenedor de 40 pies de vidrio templado de 10 mm" y renegocian cuando la lista de empaque resulta incompleta. La causa casi siempre es una discrepancia entre peso y volumen que nadie calculó. Un 40′HQ dispone de 76 m³ de volumen útil y aproximadamente 28,8 t de carga útil — pero el vidrio monolítico de 10 mm pesa 25 kg/m², por lo que el límite de peso se alcanza a ~1.150 m² mientras que el límite de volumen para embalajes tipo L ronda los 1.700 m². Se paga por 76 m³ y se transporta un 70 % de aire. Un 20′DC con el mismo producto alcanza el límite de peso a ~800 m², aprovecha mejor el volumen y con frecuencia resulta más económico por m² en destino.
        </p>

        <p>
          <strong>Cómo funciona la calculadora:</strong> se selecciona el tipo de contenedor (20′DC / 40′HQ / 40′OT), el espesor del producto (monolítico de 6/8/10/12 mm, UVA (Unidad de Vidrio Aislante) o vidrio laminado) y la estrategia de embalaje. La calculadora determina dos límites independientes — carga útil en peso y volumen de huella de embalaje — y devuelve el menor de los dos como cantidad realista de embarque, junto con los porcentajes de utilización en peso y volumen y un nivel de riesgo de rotura. El límite que se alcanza primero es sobre el que se debe optimizar: las cargas limitadas por peso requieren un contenedor más pequeño; las cargas limitadas por volumen requieren añadir paneles de mayor espesor o cambiar a un 40′HQ.
        </p>

        <ContainerLoadingLab />

        <p>
          Lo segundo que el cálculo no contempla es la <em>reserva de carga útil para el propio embalaje</em>. Nuestros embalajes tipo L suponen aproximadamente el 18 % del peso total embarcado; las cajas de madera, el 28 %. Sobre un límite de carga útil de 28 t, eso equivale a 5–8 t <em>not</em> disponible para vidrio. Las fábricas que cotizan "vidrio máximo en un 40′HQ" sin restar el peso de los embalajes están ofreciendo una cifra que no pasará la báscula del puerto. Todo lo indicado arriba es neto del peso de embalaje, razón por la cual las cifras en m² parecen inferiores a los cálculos aproximados.
        </p>

        <h2 id="loading-protocol">El protocolo de carga de 7 pasos en nuestro almacén de Wuhan</h2>

        <p>
          A continuación se describe la secuencia que seguimos en cada contenedor, en orden. Cuatro operarios tardan aproximadamente 90 minutos para un 40′HQ de UVA (Unidad de Vidrio Aislante) estándar y tres horas para una carga jumbo de vidrio laminado. Registramos la hora de cada paso y fotografiamos el marcado con (📸):
        </p>

        <ol className="list-decimal pl-6 space-y-3 my-6 text-[#F2F0ED]">
          <li>
            <strong>Inspección del contenedor.</strong> Abrir las puertas del contenedor e inspeccionar el suelo en busca de clavos, astillas y manchas de aceite. Rechazar cualquier contenedor con orificios por encima de la línea de 1,5 m (riesgo de entrada de agua). Verificar el número del contenedor contra las Instrucciones de Embarque. <em>(📸 foto 1: suelo y techo del contenedor vacío.)</em>
          </li>
          <li>
            <strong>Instalación del revestimiento de suelo.</strong> Colocar una tira de espuma EVA (etileno vinil acetato) de 2 mm a lo largo del suelo del contenedor en la trayectoria de carga, seguida de dos travesaños de madera portantes (100 × 100 mm) bajo los puntos donde apoyarán los pies del embalaje. Los travesaños distribuyen las cargas puntuales de las horquillas de la carretilla elevadora.
          </li>
          <li>
            <strong>Colocación del desecante.</strong> 4 kg de desecante de cloruro de calcio para un 40′HQ (2 kg para un 20′DC), suspendidos de los anclajes del techo en bolsas transpirables con barrera de humedad. La ubicación en el techo es importante: la condensación se forma allí primero.
          </li>
          <li>
            <strong>Carga de embalajes, comenzando por el fondo.</strong> Introducir los embalajes con carretilla elevadora por el lado de las puertas, cargando primero la posición más profunda. Cada embalaje se coloca de modo que su peso descanse sobre los travesaños del suelo. Los paneles se orientan hacia el interior (dos embalajes en L espalda con espalda) para que la superficie del vidrio nunca quede adyacente a la pared del contenedor.
          </li>
          <li>
            <strong>Tensado de correas.</strong> Cada embalaje se fija a los raíles de amarre del contenedor con correas de trinquete con una carga de trabajo nominal de 2.500 kg. La tensión se verifica con un medidor de deformación; las correas se ajustan a una elongación del 2 %, sin exceder ese valor.
          </li>
          <li>
            <strong>Barras de carga en el extremo de las puertas.</strong> Se instalan dos barras de carga de aluminio en posición horizontal sobre los embalajes del extremo de las puertas, tensadas contra las paredes laterales del contenedor. Son la inversión más importante para proteger contra el impacto del cierre de puertas durante los primeros 300 km de transporte por carretera. <em>(📸 foto 2: barras de carga instaladas.)</em>
          </li>
          <li>
            <strong>Inspección final + sellado.</strong> El responsable de control de calidad recorre el contenedor, fotografía cada embalaje desde la puerta abierta (📸 foto 3), la lista de empaque se pega en el interior de la puerta, las puertas del contenedor se cierran y se aplica un precinto de alta seguridad (📸 fotos 4 y 5: primer plano del número de precinto y toma completa de la puerta con el precinto visible).
          </li>
        </ol>

        <p>
          Cada uno de los pasos anteriores tiene un modo de fallo que hemos visto en los envíos de la competencia. Omitir el desecante provoca manchas de condensación que inutilizan cargas enteras de vidrio laminado. Omitir las barras de carga produce daños en los embalajes del extremo de la puerta que las aseguradoras impugnan sistemáticamente. No suprimimos ninguno de estos pasos, y los registramos con marca de tiempo para que el comprador pueda auditar la secuencia solicitando el registro.
        </p>

        <LeadMagnetCTA variant="inline" articleSlug={SLUG} title="Descarga: Lista de verificación de auditoría de carga de contenedor" description="La lista de verificación de 7 pasos que entregamos a nuestro equipo de control de calidad, adaptada como herramienta de auditoría para el comprador. Úsela para evaluar el protocolo de carga de cualquier fábrica antes de realizar un pedido de contenedor." />

        <h2 id="damage-map">Los 6 puntos de daño que destruyen contenedores en silencio</h2>

        <p>
          Cada pieza de vidrio roto que sale de un contenedor fue dañada en uno de seis puntos. El mapa a continuación muestra el origen de cada daño y lo que el embalaje debe hacer al respecto. Los porcentajes son referencias indicativas extraídas de nuestro propio historial de reclamaciones entre 2023 y 2025, más tres conjuntos de datos publicados por aseguradoras de carga; las cifras de su proveedor variarán según la ruta, la combinación de productos y el tipo de embalaje, pero los <em>causes</em> son universales.
        </p>

        <p>
          <strong>Cómo funciona el mapa:</strong> pase el cursor o haga clic en cualquiera de los seis puntos numerados en la sección transversal del contenedor. Cada uno abre un panel con el rango de prevalencia típico, la causa física y la contramedida de embalaje específica que aplicamos. Las zonas 1–2 (astillado de bordes e impacto en esquinas) son problemas de flejes y geometría. La zona 3 (aplastamiento por apilado) es una decisión sobre el tipo de embalaje. Las zonas 4–5 (condensación y humedad) son de carácter ambiental y se resuelven con desecante más barreras de humedad. La zona 6 (golpe por cierre de puerta) es la razón por la que existen las barras de carga.
        </p>

        <DamageRiskMap />

        <h2 id="fcl-vs-lcl">FCL vs LCL (Carga Consolidada) — por qué la mayoría de fábricas rechaza el LCL (Carga Consolidada) para vidrio arquitectónico</h2>

        <p>
          Los compradores que se inician en la importación ven el LCL (Carga Consolidada) anunciado a un costo de flete un 60–80 % inferior al de un FCL (Contenedor Completo) dedicado, y razonablemente se preguntan por qué nadie lo usa para el vidrio. La respuesta está en los eventos de manipulación. Un contenedor FCL es manipulado aproximadamente seis veces desde la fábrica hasta el comprador: carga en fábrica, camión hasta el puerto, almacenamiento en patio, carga al buque, descarga del buque, camión hasta el comprador. La carga LCL pasa por dos estaciones de consolidación de contenedores —una en origen para la consolidación y otra en destino para la desconsolidación— y, por lo general, acumula entre doce y dieciséis eventos de manipulación, incluidos repetidos reposicionamientos con montacargas en almacenes optimizados para cajas de calzado y autopartes.
        </p>

        <p>
          La aritmética de rotura no da margen de error. Nuestra referencia en FCL se mantiene por debajo del 1 %. Nuestros escasos envíos en LCL —contrarios a nuestra recomendación habitual— registran entre un 4 y un 7 %. El ahorro de flete de 800–1.200 USD en un envío LCL de 15 m³ de vidrio se evapora con el primer panel roto al precio de reposición en el mercado. El único vidrio arquitectónico que despachamos conscientemente en LCL es <a href="/products/tempered-glass">vidrio templado</a> piezas cortadas a medida menores de 1,5 m, completamente encerradas en cajas de madera tratada térmicamente con divisores internos de espuma, y únicamente para compradores que han firmado un reconocimiento de riesgo de LCL.
        </p>

        <p>
          Si el pedido de un comprador realmente no justifica un FCL, la mejor alternativa casi siempre es esperar: consolidar con el próximo pedido del mismo comprador o combinar con otra línea de producto de la misma fábrica para completar un 20′DC. Para un análisis más detallado de las decisiones de contenedor del lado del comprador en una nueva importación desde China, consulte nuestra <a href="/blog/how-to-import-glass-from-china">guía completa para importar vidrio desde China</a>, que mapea el recorrido del comprador en 5 etapas, desde la evaluación del proveedor hasta el costo en destino.
        </p>

        <h2 id="insurance">Seguro marítimo: ICC A, B, C — y lo que realmente pagan las reclamaciones por vidrio</h2>

        <p>
          El seguro marítimo para vidrio parece sencillo hasta que se presenta un reclamo. Existen tres Cláusulas del Instituto de Carga de uso común (<a href="https://www.lmalloyds.com/LMA/Underwriting/Clauses/CL382" target="_blank" rel="noopener">Cláusulas LMA ICC 2009</a>), cada una con una lista de exclusiones muy diferente, y la mayoría de las sorpresas en un reclamo por vidrio se remontan a la cláusula que alguien eligió sin leerla.
        </p>

        <div className="my-8 overflow-x-auto">
          <table className="w-full border-collapse text-sm" aria-label="Comparación de las Cláusulas del Instituto de Carga A, B y C para envíos de vidrio arquitectónico: alcance de cobertura, costo de prima y resultados típicos en reclamos por vidrio">
            <caption className="text-left text-xs text-[#8B95A5] italic mb-3">
              Cobertura de las Cláusulas del Instituto de Carga para vidrio arquitectónico. Datos verificados: 2026-10-14. Textos de cláusulas de referencia: <a href="https://www.lmalloyds.com/LMA/Underwriting/Clauses/CL382" target="_blank" rel="noopener">LMA ICC 2009</a>; rangos de prima obtenidos de cotizaciones de corredores de exportación chinos, T3 2026.
            </caption>
            <thead>
              <tr className="border-b border-[#3A4250]">
                <th scope="col" className="text-left py-3 px-3 text-[#DAA745] font-semibold">Clause</th>
                <th scope="col" className="text-left py-3 px-3 text-[#DAA745] font-semibold">Alcance de cobertura</th>
                <th scope="col" className="text-left py-3 px-3 text-[#DAA745] font-semibold">Prima (aprox.)</th>
                <th scope="col" className="text-left py-3 px-3 text-[#DAA745] font-semibold">Realidad del reclamo por vidrio</th>
              </tr>
            </thead>
            <tbody className="text-[#8B95A5]">
              <tr className="border-b border-[#3A4250]/40">
                <th scope="row" className="py-3 px-3 text-[#F2F0ED] font-medium align-top">ICC A</th>
                <td className="py-3 px-3 align-top">Todo riesgo excepto guerra, huelgas, vicio propio, demora e insolvencia del transportista. Incluye daños por manipulación.</td>
                <td className="py-3 px-3 align-top">0,3–0,6 % del valor CIF</td>
                <td className="py-3 px-3 align-top text-[#F2F0ED]">La única cláusula que rutinariamente cubre la rotura de vidrio sin disputas. Obligatoria para cualquier envío de vidrio laminado o UVA (Unidad de Vidrio Aislante) de alto valor.</td>
              </tr>
              <tr className="border-b border-[#3A4250]/40">
                <th scope="row" className="py-3 px-3 text-[#F2F0ED] font-medium align-top">ICC B</th>
                <td className="py-3 px-3 align-top">Riesgos nombrados: incendio, colisión, encalladura, vuelco, echazón, entrada de agua, pérdida total del contenedor.</td>
                <td className="py-3 px-3 align-top">0,15–0,3 %</td>
                <td className="py-3 px-3 align-top">Los daños por manipulación, rotura de eslingas y manchas por condensación son típicamente <strong>excluded</strong>. Anticipe disputas en la mayoría de los siniestros de vidrio.</td>
              </tr>
              <tr>
                <th scope="row" className="py-3 px-3 text-[#F2F0ED] font-medium align-top">ICC C</th>
                <td className="py-3 px-3 align-top">Solo eventos catastróficos (incendio, colisión mayor, pérdida del buque, echazón).</td>
                <td className="py-3 px-3 align-top">0,08–0,15 %</td>
                <td className="py-3 px-3 align-top">No es utilizable para vidrio. Solo el hundimiento del buque genera indemnización.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CostDisclaimer variant="compact" />

        <p>
          Dos aspectos son fáciles de gestionar incorrectamente. Primero, la póliza debe estar vigente desde el momento en que se coloca el precinto del contenedor en nuestra fábrica, no desde el puerto de carga. Si el comprador acuerda un Incoterm FOB, la responsabilidad —y el interés asegurable— se transfiere en la borda del buque; asegúrese de que su asegurador de carga también cubra el tramo terrestre. Segundo, el procedimiento de siniestro exige evidencia fotográfica del daño <em>before</em> mientras continúa la descarga. Instruya a su almacén receptor para que se detenga ante el primer panel roto, fotografíe con la puerta del contenedor aún abierta y conserve todo el material de espuma y eslingas; los aseguradores que rechazan siniestros de vidrio casi siempre alegan que "no se pudo establecer la cadena de custodia."
        </p>

        <h2 id="paperwork">Códigos HS y documentación que detienen contenedores en puerto</h2>

        <p>
          La clasificación arancelaria es donde un contenedor bien embalado puede convertirse en un contenedor retenido en puerto. El vidrio arquitectónico se clasifica bajo múltiples códigos HS según el proceso aplicado, y un código incorrecto provoca una retención por partida arancelaria, un cargo por demora en la reclasificación de USD 100–250/día y, en ocasiones, una revisión antidumping completa en mercados como los EE. UU. y la UE.
        </p>

        <div className="my-8 overflow-x-auto">
          <table className="w-full border-collapse text-sm" aria-label="Clasificación de códigos HS para productos comunes de vidrio arquitectónico y documentación requerida en la aduana de destino">
            <caption className="text-left text-xs text-[#8B95A5] italic mb-3">
              Códigos HS comunes para exportaciones de vidrio arquitectónico desde China. Datos verificados: 2026-10-14. Referencia: <a href="https://www.wcoomd.org/en/topics/nomenclature/instrument-and-tools/hs-nomenclature-2022-edition.aspx" target="_blank" rel="noopener">Nomenclatura OMA SA 2022</a>; verifique el arancel de destino en el portal de aduanas de su país (p. ej. <a href="https://hts.usitc.gov/" target="_blank" rel="noopener">HTSUS</a> para EE. UU., <a href="https://ec.europa.eu/taxation_customs/dds2/taric/" target="_blank" rel="noopener">TARIC</a> para la UE).
            </caption>
            <thead>
              <tr className="border-b border-[#3A4250]">
                <th scope="col" className="text-left py-3 px-3 text-[#DAA745] font-semibold">Product</th>
                <th scope="col" className="text-left py-3 px-3 text-[#DAA745] font-semibold">Código HS</th>
                <th scope="col" className="text-left py-3 px-3 text-[#DAA745] font-semibold">Documentación clave en destino</th>
              </tr>
            </thead>
            <tbody className="text-[#8B95A5]">
              <tr className="border-b border-[#3A4250]/40">
                <th scope="row" className="py-3 px-3 text-[#F2F0ED] font-medium align-top">El vidrio templado</th>
                <td className="py-3 px-3 align-top font-mono text-xs">7007.19</td>
                <td className="py-3 px-3 align-top">Informe de ensayo GB 15763.2; declaración de marcado CE (UE) o listado SGCC (EE. UU.) si el proyecto lo requiere.</td>
              </tr>
              <tr className="border-b border-[#3A4250]/40">
                <th scope="row" className="py-3 px-3 text-[#F2F0ED] font-medium align-top">El vidrio laminado</th>
                <td className="py-3 px-3 align-top font-mono text-xs">7007.29</td>
                <td className="py-3 px-3 align-top">Informe de ensayo EN 14449 o ANSI Z97.1; tipo de lámina intermedia en la factura comercial (PVB (polivinil butiral) / SGP (SentryGlas Plus) / EVA (etileno vinil acetato)).</td>
              </tr>
              <tr className="border-b border-[#3A4250]/40">
                <th scope="row" className="py-3 px-3 text-[#F2F0ED] font-medium align-top">UVA (Unidad de Vidrio Aislante) / vidrio aislante</th>
                <td className="py-3 px-3 align-top font-mono text-xs">7008.00</td>
                <td className="py-3 px-3 align-top">Declaración del perfil separador y relleno de gas en la factura; valor U según EN 673 si se especifica; emisividad del vidrio de baja emisividad (Low-E) si lleva recubrimiento.</td>
              </tr>
              <tr>
                <th scope="row" className="py-3 px-3 text-[#F2F0ED] font-medium align-top">Mirror</th>
                <td className="py-3 px-3 align-top font-mono text-xs">7009.91 / 7009.92</td>
                <td className="py-3 px-3 align-top">La clasificación con o sin marco afecta el tipo arancelario; declarar ambos en la lista de empaque.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Junto con la clasificación, tres documentos facilitan el paso del contenedor por aduanas y tres documentos protegen al comprador. Los documentos aduaneros son la factura comercial, la lista de empaque con pesos por caja y número de contenedor, y el Conocimiento de Embarque o Sea Waybill. Los documentos de protección son los informes de ensayo, el Certificado de Origen (Formulario E para la ASEAN bajo el TLC China-ASEAN, que reduce la mayoría de los aranceles a cero) y el informe de Inspección Previa al Embarque si el comprador o la carta de crédito lo exigen. Nuestro paquete estándar de exportación incluye los seis documentos y se envía en un único PDF tres días hábiles antes de la fecha estimada de salida del buque.
        </p>

        <p>
          Para compradores que especifican vidrio para un proyecto en lugar de reposición de stock, consulte nuestra guía principal sobre <a href="/blog/architectural-glass-types-guide">tipos de vidrio arquitectónico</a> y el análisis detallado sobre <a href="/blog/curtain-wall-glass-specification">especificación de vidrio para muro cortina</a> — ambos artículos abordan las decisiones de especificación que determinan la clasificación HS en la factura.
        </p>

        <h2 id="pre-seal-photos">5 fotografías que su fábrica debe enviar antes del precinto del contenedor</h2>

        <p>
          El precinto de un contenedor es un evento con validez legal: una vez colocado, el transportista asume la custodia legal y las evidencias de carga quedan congeladas. Enviamos cinco fotos al comprador por correo electrónico <strong>before</strong> se aplica el precinto, con una solicitud explícita de confirmación del comprador para "autorizar el precinto". Las cinco fotos son:
        </p>

        <ol className="list-decimal pl-6 space-y-2 my-6 text-[#F2F0ED]">
          <li><strong>Suelo y techo del contenedor vacío</strong> (prueba de inspección).</li>
          <li><strong>Primera fila cargada, desde el extremo de las puertas</strong> (orientación de los cajones y colocación de la espuma visibles).</li>
          <li><strong>Contenedor completamente cargado, cinchas tensadas</strong> (muestra el patrón de cinchas de trinquete y las barras de carga).</li>
          <li><strong>Lista de empaque pegada en el interior de la puerta</strong> (para que el agente aduanal del comprador la vea al abrir por primera vez).</li>
          <li><strong>Primer plano del número de precinto + foto completa de la puerta</strong> (el número de precinto debe coincidir con el conocimiento de embarque).</li>
        </ol>

        <p>
          Este paquete de cinco fotos es también la mejor herramienta de auditoría de fábrica. Todo proveedor que no pueda presentarlo a solicitud para un embarque reciente no está operando una carga controlada — y la probabilidad de que su contenedor tenga barras de carga junto a la puerta es baja. Publicamos los nuestros como práctica habitual; es más económico ganarse la confianza en el muelle de carga que defender un reclamo de seguro seis meses después.
        </p>

        <LeadMagnetCTA variant="footer" articleSlug={SLUG} title="Paquete de auditoría de contenedor + códigos de vidrio" description="Nuestra lista de verificación de auditoría de carga de contenedor en 7 pasos, combinada con el PDF de Códigos de Construcción de Vidrio Arquitectónico Global — los dos documentos de referencia que entregamos a cada nuevo comprador antes de su primer FCL (Contenedor Completo)." />

        <FAQ items={faqItems} />

        <section className="my-14">
          <h2 className="text-sm font-semibold text-[#DAA745] uppercase tracking-wider mb-4 m-0">Más en la Guía del Comprador</h2>
          <div className="grid sm:grid-cols-1 gap-3">
            <a href="/blog/how-to-import-glass-from-china" className="block rounded-xl bg-[#3A4250]/20 border border-[#3A4250]/40 hover:border-[#DAA745]/60 transition-colors p-5 no-underline">
              <div className="text-xs text-[#DAA745] uppercase tracking-wider font-semibold mb-1">Guía del Comprador</div>
              <div className="text-base font-semibold text-[#F2F0ED] mb-1">Cómo importar vidrio arquitectónico desde China: el proceso de compra en 5 etapas</div>
              <div className="text-xs text-[#8B95A5] leading-relaxed">Evaluación de proveedores, Incoterms, cálculo de capacidad de contenedor, costo en destino y las señales de alerta que destruyen relaciones comerciales.</div>
            </a>
          </div>
        </section>

        <RelatedProductsCards slugs={article.relatedProductSlugs || ['tempered-glass', 'laminated-glass', 'insulated-glass']} heading="Products shipped under this protocol" />
      </BlogArticleLayout>
    </>;
}