import BlogArticleLayout, { generateArticleMetadata, articleJsonLd, type TOCItem } from "@/_i18n/es/components/blog/BlogArticleLayout";
import TLDRBox from "@/_i18n/es/components/blog/TLDRBox";
import { FAQ, TechNote } from "@/_i18n/es/components/blog/blocks";
import CostDisclaimer from "@/_i18n/es/components/blog/CostDisclaimer";
import LeadMagnetCTA from "@/_i18n/es/components/blog/LeadMagnetCTA";
import RelatedProductsCards from "@/_i18n/es/components/blog/RelatedProductsCards";
import SupplierVerificationScorecard from "@/_i18n/es/components/blog/article-13/SupplierVerificationScorecard";
import IncotermsExplorer from "@/_i18n/es/components/blog/article-13/IncotermsExplorer";
import ContainerLoadCalculator from "@/_i18n/es/components/blog/article-13/ContainerLoadCalculator";
import { blogArticles } from "@/lib/blog-registry";
import { makeAlternates } from "@/lib/i18n";
const article = blogArticles.find(a => a.slug === "how-to-import-glass-from-china")!;
export const metadata = {
  ...generateArticleMetadata(article),
  alternates: makeAlternates("/blog/how-to-import-glass-from-china", "es")
};
const toc: TOCItem[] = [{
  id: "who-this-is-for",
  text: "A quién va dirigido",
  level: 2
}, {
  id: "the-five-stages",
  text: "El proceso de importación en 5 etapas",
  level: 2
}, {
  id: "stage-1",
  text: "Etapa 1 — Preselección de proveedores",
  level: 2
}, {
  id: "stage-2",
  text: "Etapa 2 — Verificación de capacidad",
  level: 2
}, {
  id: "stage-3",
  text: "Etapa 3 — Especificación y cotización",
  level: 2
}, {
  id: "stage-4",
  text: "Etapa 4 — Logística e Incoterms",
  level: 2
}, {
  id: "stage-5",
  text: "Etapa 5 — Control de calidad y carga del contenedor",
  level: 2
}, {
  id: "landed-cost",
  text: "Desglose completo del costo en destino",
  level: 2
}, {
  id: "red-flags",
  text: "7 señales de alerta que indican problemas",
  level: 2
}, {
  id: "faq",
  text: "Preguntas frecuentes",
  level: 2
}];
const faqItems = article.buyerFaq || [];
export default function Page() {
  return <>
      {articleJsonLd(article, faqItems).map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}

      <BlogArticleLayout article={article} toc={toc}>
        <TLDRBox takeaways={article.tldr || []} />

        <p>
          Importar vidrio arquitectónico desde China puede reducir el presupuesto de acristalamiento de un proyecto entre un 30 y un 50 % frente al suministro local en Norteamérica, Europa o el Golfo — pero solo si el proceso de importación se gestiona con la misma disciplina que exige el propio proyecto. El ahorro desaparece rápidamente cuando un contenedor de paneles de vidrio templado llega con los recortes de herraje incorrectos, cuando una unidad de vidrio laminado no supera los ensayos EN en el puerto de entrada, o cuando un pedido "jumbo" se reparte entre tres fábricas porque la primera mintió sobre el tamaño de su horno.
        </p>

        <p>
          Esta guía está escrita desde dentro de una planta de vidrio de 20,000 m² en Wuhan. Recorre las cinco etapas que todo comprador serio atraviesa — preselección de proveedores, verificación de capacidad, cotización, logística y control de calidad — además de la documentación, los Incoterms y el cálculo de carga en contenedor que determinan si el vidrio llega a su obra intacto y dentro del presupuesto.
        </p>

        <h2 id="who-this-is-for">A quién va dirigido</h2>

        <p>Esta guía asume que usted se encuentra en uno de estos cuatro perfiles:</p>

        <ul>
          <li>
            <strong>Arquitectos o especificadores de proyecto</strong> que ya han definido la composición del vidrio (p. ej., laminado PVB (polivinil butiral) 6-1.52-6, vidrio de baja emisividad (Low-E) #2) y necesitan obtener los paneles reales en el mercado de exportación.
          </li>
          <li>
            <strong>Contratistas de acristalamiento</strong> que comparan una compra directa en China frente al margen de un distribuidor local, en obras donde el recuento de paneles supera aproximadamente 200 m² — el volumen a partir del cual la importación directa comienza a superar el precio local una vez descontado el flete.
          </li>
          <li>
            <strong>Promotores inmobiliarios o consultores de fachada</strong> que elaboran presupuestos preliminares y necesitan cifras realistas FOB y con costos de destino para justificar la partida de vidrio.
          </li>
          <li>
            <strong>Importadores por primera vez</strong> en empresas comercializadoras que ya tienen un comprador confirmado pero nunca han gestionado un contenedor de vidrio.
          </li>
        </ul>

        <p>
          Si necesita repasar la selección de productos de vidrio antes de iniciar la búsqueda de proveedores, comience con nuestro <a href="/blog/architectural-glass-types-guide">guía de tipos de vidrio arquitectónico</a>. Si está evaluando una aplicación específica, nuestro <a href="/blog/curtain-wall-glass-specification">especificación de vidrio para muro cortina</a> recorrido cubre el lado de la especificación antes de que esta guía aborde el lado de la compra.
        </p>

        <h2 id="the-five-stages">El proceso de importación en 5 etapas</h2>

        <p>
          Una importación directa desde una fábrica de vidrio china tarda entre 6 y 14 semanas desde el primer contacto hasta el vidrio en obra, según el número de paneles, la complejidad de la composición y el tiempo de tránsito marítimo. Los pasos son los mismos tanto si compra diez paneles como diez contenedores:
        </p>

        <ol>
          <li><strong>Preseleccionar proveedores</strong> — 3 a 5 candidatos evaluados según un cuestionario de credenciales, capacidad y comunicación.</li>
          <li><strong>Verificar capacidad</strong> — credenciales documentales en mano, muestras físicas solicitadas, auditoría de fábrica (por vídeo o presencial) programada.</li>
          <li><strong>Especificar y cotizar</strong> — una solicitud de cotización rigurosa que no deja margen de interpretación, comparada en términos homogéneos.</li>
          <li><strong>Logística e Incoterms</strong> — la elección del Incoterm determina quién paga qué y, más importante, dónde se transfiere el riesgo.</li>
          <li><strong>Control de calidad y carga del contenedor</strong> — inspección previa al embarque, reserva del buque, declaración VGM, conocimiento de embarque.</li>
        </ol>

        <TechNote type="tip" title="El orden importa">
          <p>
            Los compradores que intentan comprimir las etapas 1 y 2 en un solo hilo de correo electrónico ("envíeme una cotización y sus certificados") terminan con ofertas baratas de fábricas que en realidad no pueden producir la especificación requerida. Dedique dos semanas a la selección del proveedor; las cuatro semanas de producción transcurrirán con mayor fluidez.
          </p>
        </TechNote>

        <h2 id="stage-1">Etapa 1 — Preselección de proveedores</h2>

        <p>
          Alibaba.com, Made-in-China y los directorios de ferias comerciales (Guangzhou Fair, Fenestration China, Vitrum) ofrecen cada uno entre 20 y 200 fábricas candidatas para un tipo de vidrio determinado. Esa lista debe reducirse a 3–5 antes de iniciar cualquier conversación seria. El cuestionario que se presenta a continuación es el que recomendamos que los compradores apliquen tanto a nosotros como a nuestra competencia.
        </p>

        <p>
          <strong>Cómo funciona el cuestionario:</strong> Diez criterios de verificación se agrupan en tres dimensiones: Credenciales (40 puntos: ISO 9001, certificación 3C/CCC, ensayos EN, licencia comercial, derechos de exportación), Capacidad (35 puntos: horno o autoclave con dimensiones compatibles con su panel de mayor tamaño, capacidad mensual de al menos 3× el volumen de su pedido, tres o más proyectos de referencia en la misma categoría de producto) y Comunicación (25 puntos: respuesta técnica en 24 horas en su idioma de trabajo, disposición a enviar una muestra de pago antes de la orden de compra). Marque lo que haya verificado por escrito. La puntuación resultante se ubica en uno de cuatro niveles: 81–100 Proveedor Preferente (proceder a la solicitud de cotización), 61–80 Calificado (resolver puntos abiertos antes de la orden de compra), 31–60 Precaución (solo proceder con auditoría de fábrica y garantías de pago), 0–30 Alto Riesgo (descartarlo). Las ponderaciones son deliberadamente más elevadas en la compatibilidad dimensional del equipo y la velocidad de respuesta técnica, los dos atributos más predictivos del riesgo de ejecución.
        </p>

        
      <p className="text-sm text-[#8B95A5] italic my-6">
        Para la guía detallada sobre selección de proveedores — el modelo de amenazas de 5 riesgos, el verificador de certificados y el guión de auditoría en vídeo de 90 minutos —
        véase <a href="/blog/architectural-glass-supplier-china-vetting" className="text-[#DAA745]">cómo evaluar a un proveedor de vidrio en China</a>.
      </p>
<SupplierVerificationScorecard />

        <p>
          Un proveedor con menos de 61 puntos no es candidato — descártelo. Un proveedor entre 61 y 80 puntos es candidato con elementos específicos pendientes; esos elementos pasan a su lista de verificación de la Etapa 2. Solo los proveedores con más de 81 puntos avanzan directamente a la solicitud de cotización.
        </p>

        <p>
          La ponderación no es arbitraria. "El horno o autoclave puede procesar su panel de mayor tamaño" lleva 15 puntos porque el modo de falla más común en una compra de vidrio en China es que la fábrica acepte un plano que físicamente no puede producir y luego subcontrate las piezas de gran formato a una planta que usted nunca ha auditado. En nuestra planta de Wuhan, nuestro horno de templado de 3.3 m × 15 m y el autoclave de laminado de 3.3 m × 15 m nos permiten mantener los paneles jumbo en casa de principio a fin — una capacidad específica que el sistema de puntuación está diseñado para poner sobre la mesa antes de cotizar.
        </p>

        <h2 id="stage-2">Etapa 2 — Verificación de capacidad</h2>

        <p>
          Las credenciales en un folleto no son credenciales. Para cada proveedor preseleccionado, debe verificar:
        </p>

        <ul>
          <li>
            <strong>Certificado ISO 9001:2015</strong> — emitido por un organismo de certificación reconocido (SGS, TÜV, BV, Intertek, DNV). Verifique el número de certificado en el sitio web del organismo certificador, no solo en el PDF que envía la fábrica por correo. Consulte la <a href="https://www.iso.org/iso-9001-quality-management.html" target="_blank" rel="noopener noreferrer">descripción general de ISO 9001</a> para conocer qué cubre realmente la norma.
          </li>
          <li>
            <strong>Certificado 3C (CCC) de China</strong> bajo GB 15763.2-2005 para vidrio templado y GB 15763.3-2009 para vidrio laminado. Legalmente obligatorio para vidrio de seguridad arquitectónico vendido o exportado desde China. Sin CCC, la fábrica no es un productor legal de vidrio de seguridad.
          </li>
          <li>
            <strong>Informes de ensayo EN 12150-1:2015 y EN 14449:2005</strong> si va a enviar mercancía a Europa y necesita el marcado CE. El informe de ensayo debe identificar su fábrica, no un grupo matriz ni una planta "similar".
          </li>
          <li>
            <strong>Lista de proyectos de referencia</strong> con fotografías, nombre del proyecto y composición del vidrio. Tres proyectos reales superan a un catálogo vistoso de renders sin identificar.
          </li>
          <li>
            <strong>Una muestra física.</strong> Este es el paso que la mayoría de los compradores omite y del que más se arrepienten. Una muestra de 300×300 mm cuesta entre USD 20–40 producirla y entre 60–120 enviarla por vía aérea. Confirma la orientación del recubrimiento, la claridad del PVB (polivinil butiral), la calidad del pulido de bordes, y si lo que la fábrica llama "vidrio de baja emisividad (Low-E)" realmente lo es. Para un pedido de seis cifras, este es el seguro más barato que jamás comprará.
          </li>
        </ul>

        <p>
          Para artículos técnicos que explican qué debe verificar, nuestros análisis detallados sobre <a href="/blog/how-is-tempered-glass-made">cómo se fabrica el vidrio templado</a> and <a href="/blog/how-is-laminated-glass-made">cómo se fabrica el vidrio laminado</a> describen paso a paso las etapas de producción que la auditoría de fábrica debe cubrir.
        </p>

        <LeadMagnetCTA variant="inline" articleSlug="how-to-import-glass-from-china" />

        <h3>La auditoría de fábrica por video</h3>

        <p>
          Una auditoría presencial realizada por un inspector independiente (SGS, Intertek, QIMA) cuesta entre USD 300–600 por fábrica y vale la pena para pedidos superiores a USD 50,000. Para pedidos de menor valor, un recorrido en vivo por video — programado en bloques de una hora, con el contacto de la fábrica llevando un teléfono por las estaciones específicas — le aporta el 80% de la información con el 10% del costo. Exija ver:
        </p>

        <ol>
          <li>La línea de corte de vidrio y la estación de rectificado de bordes — pedir al operario que mida una muestra cortada con calibre delante de usted detecta problemas de tolerancia de inmediato.</li>
          <li>La placa de datos del horno de templado (confirma que la capacidad del horno coincide con lo que le indicaron).</li>
          <li>El autoclave de laminado y la sala de ensamblaje limpia (los defectos de laminado son en un 90% una cuestión de polvo y humedad).</li>
          <li>La línea de UVA (Unidad de Vidrio Aislante), si se pide vidrio aislante — estación de relleno de argón, dispensador de sellante, comprobador de punto de rocío en el banco de control de calidad.</li>
          <li>El área de embalaje de producto terminado — un embalaje deficiente destruye más vidrio que cualquier fallo de producción.</li>
        </ol>

        <h2 id="stage-3">Etapa 3 — Especificación y cotización</h2>

        <p>
          Una solicitud de cotización imprecisa genera cotizaciones imprecisas. Cada cotización que reciba debe elaborarse a partir de la misma hoja de especificaciones, de modo que los tres o cuatro precios devueltos sean directamente comparables. Una especificación lista para producción incluye:
        </p>

        <ul>
          <li>
            <strong>La composición del vidrio expresada en notación estándar</strong>, no en prosa. "6T + 1.52 PVB + 6T, vidrio de baja emisividad (Low-E) en #2" es inequívoco. "Vidrio laminado templado con recubrimiento Low-E" son tres preguntas disfrazadas de respuesta.
          </li>
          <li><strong>Planilla de paneles</strong>: para cada medida única, la cantidad, dimensiones (A × H en mm), y cualquier corte de herraje o perforaciones con coordenadas.</li>
          <li><strong>Acabado de bordes</strong>: rectificado plano + arrisado, pulido plano, o pulido de canto redondeado.</li>
          <li><strong>Preparación de herraje</strong>: perforado, cortes para bisagras, entallas para fijaciones — todo con plano acotado por panel.</li>
          <li><strong>Normas aplicables</strong>: cite el artículo concreto, no la familia normativa. "Ensayo de impacto según ANSI Z97.1-2015, Clase A", no "ensayo ANSI."</li>
          <li><strong>Condiciones de entrega</strong>: Incoterm (véase sección siguiente), dirección o puerto de entrega, fecha límite de llegada aceptable.</li>
          <li><strong>Documentación requerida</strong>: factura comercial, lista de empaque, certificado de origen, informe de ensayo de fábrica, copia de certificación 3C o marcado CE, conocimiento de embarque.</li>
        </ul>

        <TechNote type="warning" title="Cuidado con la comparación de cotizaciones">
          <p>
            Tres cotizaciones a USD 42, 46 y 58 por m² parecen sencillas de comparar. Normalmente no lo son. Verifique si cada cotización incluye el embalaje en caja, el transporte terrestre hasta el puerto, el despacho de exportación, y bajo qué Incoterm se presenta antes de comparar precios. La cotización de USD 42 suele ser EXW; la de USD 58 a veces es CIF — lo que puede significar que el proveedor de USD 58 resulta más barato en destino.
          </p>
        </TechNote>

        <p>
          El plazo de entrega estándar desde nuestra fábrica en Wuhan para un pedido mixto de <a href="/products/tempered-glass">tempered</a> and <a href="/products/laminated-glass">vidrio laminado</a> es de 25–35 días desde la confirmación del pedido hasta listo en fábrica (ex-works). El vidrio de baja emisividad (Low-E) con recubrimiento <a href="/products/insulated-glass">unidades de vidrio aislante</a> toman entre 30 y 45 días, porque el plazo de entrega del recubrimiento de baja emisividad (Low-E) y la ventana de curado del doble sello de la UVA (Unidad de Vidrio Aislante) se acumulan de forma secuencial. Añada 1–2 semanas para la inspección previa al embarque y la carga del contenedor. Añada el tiempo de tránsito conforme a la sección de Incoterms que figura a continuación.
        </p>

        <h2 id="stage-4">Etapa 4 — Logística e Incoterms</h2>

        <p>
          Incoterms 2020 — los <a href="https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/" target="_blank" rel="noopener noreferrer">reglas de la Cámara de Comercio Internacional</a> que determinan quién paga, quién asume el riesgo y quién gestiona la aduana — son la parte que más se malinterpreta en una compra de vidrio en China. El explorador que figura a continuación explica los cuatro Incoterms que usted encontrará en una factura de vidrio.
        </p>

        <p>
          <strong>Diferencias entre los cuatro términos:</strong> cada Incoterm sucesivo amplía el alcance del vendedor a lo largo de la cadena de envío. <strong>EXW</strong> (Ex Works) termina en la puerta de la fábrica — el vendedor embala y el comprador se encarga de todo lo demás. <strong>FOB</strong> (Free On Board) añade el transporte terrestre interior, el despacho de exportación y la carga en un puerto chino. <strong>CIF</strong> (Cost, Insurance, Freight) añade además el flete marítimo y el seguro marino mínimo hasta la llegada al puerto de destino, aunque el comprador sigue siendo responsable del despacho de importación y la entrega. <strong>DDP</strong> (Delivered Duty Paid) se extiende hasta el lugar de la obra, incluidos los aranceles de importación y el transporte local. Un matiz crítico: tanto bajo FOB como bajo CIF, <em>el riesgo de pérdida se transfiere en el puerto chino de carga</em> — no en el puerto de destino — un malentendido frecuente entre los compradores que resulta muy costoso cuando un contenedor sufre daños en alta mar bajo una cotización CIF.
        </p>

        <IncotermsExplorer />

        <p>
          Para la mayoría de los compradores de vidrio arquitectónico que mueven entre uno y cinco contenedores, FOB es la opción predeterminada correcta. Le ofrece un precio de fábrica comparable, permite que su propio transitario coteje las tarifas marítimas (que pueden variar hasta un 30% entre navieras en una sola semana) y simplifica la documentación. CIF es útil cuando necesita un precio único puesto en puerto para presupuestar, aunque puede resultar más caro que FOB más su propio flete. DDP parece atractivo — una sola factura, todo resuelto — pero incluye flete, aranceles y gastos de despacho en un precio que usted no puede verificar, y pocos exportadores de vidrio serios disponen de la infraestructura en destino para ejecutarlo de forma fiable.
        </p>

        <TechNote type="note" title="SOLAS VGM — no se sorprenda con esto">
          <p>
            Según el Capítulo VI, Regla 2 del Convenio SOLAS (enmendado por las reglas VGM de la OMI de 2016), el expedidor está legalmente obligado a declarar la Masa Bruta Verificada de cada contenedor embalado antes de la salida del buque. En el caso de contenedores de vidrio, la fábrica calcula el VGM a partir del peso de los paneles y la tara de los cajones, y lo comunica al transitario. Si no se realiza este trámite, el contenedor no se embarca. Un exportador competente lo gestiona sin incidencias; uno desorganizado provoca retrasos de última hora. Consulte el procedimiento VGM durante la evaluación del proveedor.
          </p>
        </TechNote>

        <h2 id="stage-5">Etapa 5 — Control de calidad y carga del contenedor</h2>

        <p>
          La inspección previa al embarque es la última oportunidad para detectar un problema antes de que el vidrio esté en alta mar. Existen dos opciones:
        </p>

        <ul>
          <li>
            <strong>Autoinspección por el equipo de control de calidad de la fábrica</strong> — la opción predeterminada. La fábrica emite un informe de inspección que cubre planitud, calidad de bordes, tolerancia dimensional, orientación del recubrimiento, claridad de la lámina intermedia en el vidrio laminado e integridad del sello de la UVA (Unidad de Vidrio Aislante). Solicite este informe por escrito antes de que la mercancía salga de la planta.
          </li>
          <li>
            <strong>Inspección por terceros</strong> — SGS, Intertek, QIMA, Bureau Veritas. El coste es de USD 300–500 por día de inspección en una fábrica de vidrio. Independiente y muy recomendable en pedidos superiores a USD 30,000 o para compradores que realizan su primer pedido.
          </li>
        </ul>

        <p>
          En cualquier caso, la lista de verificación de inspección para vidrio arquitectónico debe incluir: recuento de paneles frente a la lista de embalaje; tolerancia dimensional (típicamente ±2 mm para corte a medida, ±1 mm para vidrio templado); defectos visuales según <a href="https://www.glass.org/" target="_blank" rel="noopener noreferrer">NGA (National Glass Association)</a> o los límites de la norma EN 572-8; desconchado de bordes; burbujas o delaminación en la lámina intermedia del vidrio laminado; integridad del sello perimetral de la UVA (Unidad de Vidrio Aislante) y comprobación del desecante; verificación de la orientación del recubrimiento mediante un detector de vidrio de baja emisividad (Low-E); integridad de los cajones y presencia de protección en esquinas.
        </p>

        <h3>Cálculo de carga del contenedor</h3>

        <p>
          <strong>La fórmula:</strong> cada metro cuadrado de vidrio pesa aproximadamente espesor (mm) × 2,5 kg (densidad del vidrio flotado sodo-cálcico = 2.500 kg/m³, por lo que 1 mm de vidrio sobre 1 m² pesa 2,5 kg). Añada aproximadamente un 18% al peso total del vidrio para tener en cuenta los bastidores en A, el material de sujeción, las bolsas antihumedad y la protección de esquinas. Divida el peso de embarque resultante entre la capacidad de carga legal por carretera del contenedor para obtener el número de contenedores: aproximadamente 24.000 kg para un contenedor estándar de 20' Dry Container, y 26.000 kg para un 40' High Cube en la mayoría de jurisdicciones. Para vidrio arquitectónico, el 20'DC alcanza su límite de peso mucho antes de llenar su volumen de 33 m³, por lo que el número de contenedores está determinado por kilogramos, no por la geometría de los paneles, y el 20'DC es la opción predeterminada salvo que la altura de los paneles supere aproximadamente 2,6 m.
        </p>

        <ContainerLoadCalculator />

        <p className="text-sm text-[#8B95A5] italic mt-2">
          Para la parte operativa del embalaje — tipos de cajón, protocolo de carga, prevención de daños, seguro y lista de verificación fotográfica previa al precinto — consulte nuestro análisis detallado sobre <a href="/blog/glass-shipping-container-loading-guide">transporte de vidrio en contenedor</a>.
        </p>

        <p>
          Un contenedor de 20' es casi siempre la opción correcta para vidrio arquitectónico, ya que el factor limitante es el peso, no el volumen: un 20' cargado con vidrio templado de 10 mm alcanzará el límite de carga de 24 toneladas mucho antes de llenar los 33 m³ de volumen interior. Los contenedores 40' High Cube solo están justificados cuando la altura de los paneles supera aproximadamente 2,6 m, situación en la que un cajón en A para 20' no permite colocar los paneles en posición vertical.
        </p>

        <h2 id="landed-cost">Desglose completo del costo en destino</h2>

        <p>
          Un ejemplo práctico concreta las piezas. Suponga que importa 100 paneles de vidrio laminado transparente 6-1.52-6, de 1500 × 2500 mm, con destino a Los Ángeles. Usando la calculadora de contenedores anterior, el envío es de aproximadamente 2.650 kg de vidrio + embalaje = 3.100 kg, muy por debajo de un contenedor de 20' (que puede transportar hasta ~24 toneladas de vidrio).
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm" aria-label="Ejemplo práctico — estructura de costo en destino para 100 paneles de vidrio laminado 6-1.52-6, FOB Shanghái a Los Ángeles, tasas de referencia T4 2026">
            <caption className="text-left text-[#8B95A5] text-xs mb-3">
              Costo indicativo en destino — 100 paneles × 1,5 m × 2,5 m × laminado 6-1.52-6, Shanghái → Los Ángeles. Datos verificados el 13-10-2026; todas las cifras son precios de referencia en USD, sujetos a cotización en firme.
            </caption>
            <thead>
              <tr>
                <th scope="col" className="text-left py-3 px-4 font-medium text-[#F2F0ED] border-b border-[#3A4250]/40">Partida de costo</th>
                <th scope="col" className="text-right py-3 px-4 font-medium text-[#F2F0ED] border-b border-[#3A4250]/40 bg-[#3A4250]/10">USD (indicativo)</th>
                <th scope="col" className="text-left py-3 px-4 font-medium text-[#F2F0ED] border-b border-[#3A4250]/40">Nota y fuente</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#3A4250]/20">
                <td className="py-3 px-4 text-[#8B95A5] font-medium">Vidrio FOB Shanghái</td>
                <td className="py-3 px-4 text-right text-[#F2F0ED]">8,250</td>
                <td className="py-3 px-4 text-[#F2F0ED]/80">100 paneles × 3,75 m² × USD 22/m² (referencia de exportación Sincere Glass T4 2026)</td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <td className="py-3 px-4 text-[#8B95A5] font-medium">Embalaje para exportación</td>
                <td className="py-3 px-4 text-right text-[#F2F0ED]">450</td>
                <td className="py-3 px-4 text-[#F2F0ED]/80">Bastidor en A, materiales de sujeción, bolsas antihumedad (generalmente incluido en FOB)</td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <td className="py-3 px-4 text-[#8B95A5] font-medium">Flete marítimo (20' a LAX)</td>
                <td className="py-3 px-4 text-right text-[#F2F0ED]">2,400</td>
                <td className="py-3 px-4 text-[#F2F0ED]/80">Todo incluido; varía entre USD 1.700–3.400 según temporada — verifique en tiempo real con su transitario</td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <td className="py-3 px-4 text-[#8B95A5] font-medium">Seguro marítimo (0,3% del valor CIF)</td>
                <td className="py-3 px-4 text-right text-[#F2F0ED]">35</td>
                <td className="py-3 px-4 text-[#F2F0ED]/80">Contráterlo. El ahorro frente a una reclamación por contenedor dañado es desproporcionado.</td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <td className="py-3 px-4 text-[#8B95A5] font-medium">Arancel de importación de EE. UU. (HTSUS 7005 / 7007)</td>
                <td className="py-3 px-4 text-right text-[#F2F0ED]">410</td>
                <td className="py-3 px-4 text-[#F2F0ED]/80">
                  Tasa NMF del 4,9% según el HTS de la USITC 2026; verifique la clasificación vigente en{" "}
                  <a href="https://hts.usitc.gov/" target="_blank" rel="noopener noreferrer">hts.usitc.gov</a>
                </td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <td className="py-3 px-4 text-[#8B95A5] font-medium">Agente de aduanas + gastos portuarios</td>
                <td className="py-3 px-4 text-right text-[#F2F0ED]">650</td>
                <td className="py-3 px-4 text-[#F2F0ED]/80">Entrada, fianza, THC, chasis, pre-retiro — mercado Costa Oeste EE. UU. T4 2026</td>
              </tr>
              <tr className="border-b border-[#3A4250]/20">
                <td className="py-3 px-4 text-[#8B95A5] font-medium">Transporte terrestre interno hasta obra (50 millas)</td>
                <td className="py-3 px-4 text-right text-[#F2F0ED]">550</td>
                <td className="py-3 px-4 text-[#F2F0ED]/80">Drayage de contenedor + plataforma si se requiere</td>
              </tr>
              <tr className="border-b border-[#3A4250]/40 bg-[#DAA745]/10">
                <td className="py-3 px-4 font-semibold text-[#DAA745]">Costo de llegada a obra</td>
                <td className="py-3 px-4 text-right font-bold text-[#DAA745]">12,745</td>
                <td className="py-3 px-4 text-[#F2F0ED]/80">= USD 34,0 / m² entregado</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          <strong>Cómo calculamos esto:</strong> Las partidas se construyen de abajo hacia arriba a partir del precio ex-works de fábrica. FOB agrega transporte interior, despacho de exportación y carga, costos que normalmente se absorben en la cotización FOB por m² para rutas habituales. El flete marítimo es una tarifa todo incluido por contenedor desde el puerto FOB chino hasta el puerto de destino indicado, obtenida de cotizaciones actuales de transitarios y no de tarifas publicadas — las tarifas fluctúan aproximadamente un 30% entre navieras en una sola semana y varían estacionalmente con el Año Nuevo Chino y los picos previos a los días festivos en EE. UU. El seguro de transporte se calcula al 0,3% del valor CIF (= FOB + flete). El derecho de importación utiliza la tasa NMF vigente para la partida HTSUS 7005 (vidrio flotado) o 7007 (vidrio de seguridad) — <a href="https://hts.usitc.gov/" target="_blank" rel="noopener noreferrer">verifique la clasificación vigente en hts.usitc.gov</a>. Los gastos de agente, portuarios y de drayage interior corresponden a tarifas estándar del mercado de la Costa Oeste de EE. UU. para un contenedor de 20' en T4 2026. Para un proyecto específico, sustituya cada partida por una cotización en firme de la parte que la ejecuta; esta tabla es una verificación presupuestaria, no una cotización.
        </p>

        <p>
          A modo de comparación, la misma especificación suministrada por un distribuidor norteamericano suele oscilar entre USD 55 y 80 por m² entregado, según el volumen. La diferencia del 40–60% es real y reproducible en pedidos superiores a aproximadamente 200 m² — por debajo de ese umbral, los costos fijos de flete y despacho eliminan el ahorro.
        </p>

        <CostDisclaimer />

        <h2 id="red-flags">7 señales de alerta que indican problemas</h2>

        <p>
          Estos son patrones que hemos observado en el lado chino del mercado durante 15 años de ventas nacionales y una creciente cartera de exportación. Si detecta dos o más en el mismo proveedor, retírese.
        </p>

        <ol>
          <li>
            <strong>"Podemos fabricar cualquier medida" sin especificar el equipo.</strong> Las fábricas legítimas citan el tamaño del horno y del autoclave. Un proveedor que no puede nombrar el equipo está revendiendo.
          </li>
          <li>
            <strong>La cotización llega en 10 minutos sin hacer preguntas.</strong> Una cotización de producción real requiere al menos una ronda de aclaraciones sobre el pulido de bordes, la ferretería, la orientación del vidrio de baja emisividad (Low-E) o el embalaje. Una cotización instantánea es una suposición.
          </li>
          <li>
            <strong>Sin disposición a emitir una Factura Pro-Forma.</strong> Una Pro-Forma es un documento de 30 minutos. La negativa generalmente significa que el precio cotizado es inestable o que la entidad en la factura no es la entidad en el certificado.
          </li>
          <li>
            <strong>Las condiciones de pago exigen 100% T/T por adelantado.</strong> La norma del sector es 30% de depósito en el pedido, 70% contra copia del conocimiento de embarque. El 100% T/T es un problema de flujo de caja que la fábrica intenta trasladarle a usted.
          </li>
          <li>
            <strong>Certificados a nombre de una empresa diferente a la de la factura.</strong> Este es el patrón de fraude en exportación más común. La entidad que posee la certificación 3C debe ser la misma que factura y realiza el envío.
          </li>
          <li>
            <strong>Vago sobre el Incoterm.</strong> "Precio todo incluido" y "precio entregado" no son Incoterms. Si el proveedor no se compromete con EXW, FOB, CIF o DDP, no sabe lo que está vendiendo.
          </li>
          <li>
            <strong>No se permite inspección previa al envío.</strong> Una fábrica que rechaza el acceso a inspección de terceros es una fábrica desde la que no puede realizar envíos.
          </li>
        </ol>

        <h2 id="faq">Preguntas frecuentes</h2>

        <FAQ items={faqItems} />

        <RelatedProductsCards slugs={article.relatedProductSlugs || []} />

        <LeadMagnetCTA variant="footer" articleSlug="how-to-import-glass-from-china" />
      </BlogArticleLayout>
    </>;
}