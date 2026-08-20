import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollReveal from '../components/ScrollReveal';
import { waUrl } from '../lib/whatsapp';
import {
  BUSINESS,
  postalAddress,
  geoCoordinates,
  openingHoursSpec,
} from '../lib/business';
import { breadcrumbSchema, faqSchema, pageMetadata } from '../lib/seo';

/**
 * Landing estacional — Amor y Amistad.
 *
 * En Colombia se celebra el tercer sábado de septiembre y es el pico comercial
 * de detalles más grande del segundo semestre. La búsqueda arranca a finales
 * de agosto y se dispara la semana previa, así que la página debe estar
 * indexada con semanas de antelación: publicarla en septiembre llega tarde.
 *
 * No inventa producto: reempaqueta para la temporada lo que el negocio ya
 * vende todo el año (anchetas, desayunos sorpresa, peluches, ramos,
 * chocolates) con los precios ya confirmados en BUSINESS.priceRanges.
 *
 * Es una landing permanente, no de un solo año: FECHA_CELEBRACION se actualiza
 * cada temporada y el contenido sigue sirviendo. Por eso el title no lleva año.
 */

const PAGE_PATH = '/regalos-amor-y-amistad-medellin';
const PAGE_URL = `${BUSINESS.url}${PAGE_PATH}`;

/**
 * Tercer sábado de septiembre. Actualizar cada año — también en el schema
 * Event y en el copy del hero.
 */
const FECHA_CELEBRACION = '2026-09-19';
const FECHA_LEGIBLE = 'sábado 19 de septiembre de 2026';

export const metadata: Metadata = pageMetadata({
  title: 'Regalos de Amor y Amistad en Medellín',
  description: `Regalos de Amor y Amistad a domicilio en Medellín: anchetas, desayunos sorpresa, peluches y ramos desde $80.000. Entrega el mismo día y sorpresa confidencial. Reserva antes de que se llene la agenda. WhatsApp ${BUSINESS.phoneDisplay}.`,
  path: PAGE_PATH,
  keywords: [
    'regalos amor y amistad medellín',
    'amor y amistad medellín',
    'detalles amor y amistad medellín',
    'anchetas amor y amistad medellín',
    'regalos amor y amistad a domicilio',
    'desayuno sorpresa amor y amistad',
    'regalo para amigo secreto medellín',
    'amigo secreto regalos medellín',
    'regalos día del amor y la amistad',
    'detalles para amiga medellín',
    'detalles para novio amor y amistad',
    'detalles para novia amor y amistad',
    'peluches amor y amistad medellín',
    'ramos de rosas amor y amistad medellín',
    'regalos amor y amistad el poblado',
    'regalos amor y amistad envigado',
    'regalos amor y amistad laureles',
    'regalos corporativos amor y amistad medellín',
    'qué regalar en amor y amistad',
    'ideas de regalo amor y amistad medellín',
  ],
});

/**
 * Ideas por destinatario. Cubre las variantes de búsqueda de la temporada
 * (pareja, amiga, amigo secreto, equipo de trabajo) sin crear producto nuevo:
 * cada una se arma con el catálogo que ya existe.
 */
const IDEAS = [
  {
    id: 'pareja',
    titulo: 'Para tu pareja',
    body: 'La combinación que más sale en la temporada: ancheta con chocolates, peluche y globos, o desayuno sorpresa entregado temprano. Si quieren celebrarlo en la noche, conviene programar la entrega en la mañana para que la sorpresa dure todo el día.',
    incluye: ['Ancheta o desayuno sorpresa', 'Peluche o ramo de rosas', 'Tarjeta manuscrita'],
    desde: 'Desde $80.000',
  },
  {
    id: 'amiga',
    titulo: 'Para una amiga',
    body: 'Detalles con snacks, chocolates y algo pequeño que la represente. Es el regalo que más se pide para entregar en la oficina o en la casa sin que la persona lo espere, y funciona igual de bien para varias amigas el mismo día.',
    incluye: ['Snacks y chocolates', 'Globos en su paleta', 'Entrega en oficina o casa'],
    desde: 'Desde $80.000',
  },
  {
    id: 'amigo-secreto',
    titulo: 'Para el amigo secreto',
    body: 'Aquí lo importante es el presupuesto acordado y que no se sepa quién lo envía. Armamos el detalle dentro del tope que nos digas y entregamos sin revelar el remitente. Si el intercambio es en la oficina, coordinamos la hora exacta.',
    incluye: ['Ajustado al tope del intercambio', 'Remitente anónimo', 'Entrega coordinada'],
    desde: 'Desde $80.000',
  },
  {
    id: 'equipo',
    titulo: 'Para tu equipo de trabajo',
    body: 'Varios detalles iguales entregados el mismo día en una o varias direcciones. Es lo que piden las empresas que quieren reconocer al equipo en la fecha. Emitimos factura electrónica y podemos incluir el logo en la presentación.',
    incluye: ['Entregas múltiples', 'Factura electrónica', 'Logo de la empresa opcional'],
    desde: 'Cotización por volumen',
  },
  {
    id: 'distancia',
    titulo: 'Desde otro país',
    body: 'Si estás fuera de Colombia y quieres sorprender a alguien en Medellín, coordinamos todo por WhatsApp y pagas por transferencia. Te enviamos la foto del momento de la entrega. En esta fecha conviene reservar con más días porque la agenda se llena.',
    incluye: ['Coordinación por WhatsApp', 'Pago por transferencia', 'Foto de la entrega'],
    desde: 'Desde $80.000',
  },
  {
    id: 'ultimo-momento',
    titulo: 'Si se te hizo tarde',
    body: 'Confirmando antes de las 12:00 del mediodía entregamos el mismo día en zona cercana. En la semana de Amor y Amistad la capacidad se agota antes, así que entre más temprano escribas, más opciones quedan disponibles.',
    incluye: ['Entrega el mismo día', 'Sujeto a disponibilidad', 'Zona cercana'],
    desde: 'Desde $80.000',
  },
];

const FAQS = [
  {
    q: '¿Cuándo es Amor y Amistad en Colombia en 2026?',
    a: `Amor y Amistad se celebra el tercer sábado de septiembre. En 2026 cae el ${FECHA_LEGIBLE}. Los pedidos se concentran entre el miércoles y el sábado de esa semana, así que recomendamos reservar con al menos una semana de anticipación para asegurar la fecha y la hora de entrega que necesitas.`,
  },
  {
    q: '¿Cuánto cuesta un regalo de Amor y Amistad en Medellín?',
    a: 'Los detalles arrancan en $80.000 COP y llegan hasta $200.000 según el tamaño y lo que incluyan. Los desayunos sorpresa van de $90.000 a $190.000. Si tienes un presupuesto definido, escríbenos con esa cifra y armamos la mejor opción dentro de él en lugar de ofrecerte algo que se pase.',
  },
  {
    q: '¿Hasta cuándo puedo pedir para que llegue el día de Amor y Amistad?',
    a: 'Para entregas el mismo sábado recomendamos confirmar el pedido a más tardar el miércoles anterior. En esa semana la agenda se llena y las franjas horarias más pedidas (primera hora de la mañana) se agotan primero. Pedidos de último momento los atendemos si queda capacidad.',
  },
  {
    q: '¿Puedo enviar el regalo sin que sepa quién se lo manda?',
    a: 'Sí, y es lo habitual en los intercambios de amigo secreto. Entregamos sin revelar el remitente y escribimos en la tarjeta exactamente lo que nos dictes, con firma o sin ella. Si prefieres que se sepa después, también podemos enviarte la foto de la entrega para que la compartas tú.',
  },
  {
    q: '¿Hacen entregas en oficinas para intercambios de la empresa?',
    a: 'Sí. Entregamos varios detalles el mismo día en la misma dirección o en direcciones distintas, coordinando la hora para que coincida con el momento del intercambio. Para pedidos de empresa emitimos factura electrónica y podemos incluir el logo en la presentación.',
  },
  {
    q: '¿Qué zonas cubren para Amor y Amistad?',
    a: 'Entregamos sin costo adicional en Medellín, El Poblado, Laureles, Belén, Robledo, Centro, Envigado, Sabaneta, Itagüí y Bello. En La Estrella, Caldas, Copacabana, Girardota y Barbosa cotizamos un adicional de transporte que te confirmamos antes de cerrar el pedido.',
  },
  {
    q: '¿Qué pasa si la persona no está cuando llega la entrega?',
    a: 'Te escribimos de inmediato para coordinar. Si hay alguien más en el lugar que pueda recibirlo, lo dejamos con esa persona solo si tú lo autorizas; si no, reprogramamos la entrega. Por eso pedimos un número de contacto alterno al hacer el pedido.',
  },
];

type IconProps = { className?: string };
const ICONS = {
  regalo: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3.5" y="11" width="17" height="10" rx="1.5" />
      <path d="M2.5 7.5h19V11h-19z" />
      <path d="M12 7.5v13.5" />
      <path d="M12 7.5c-1.5 0-3.5-.5-3.5-2.5s2-2.5 3.5 0c1.5-2.5 3.5-2 3.5 0s-2 2.5-3.5 2.5z" />
    </svg>
  ),
  calendario: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="1.5" />
      <path d="M3 10h18" />
      <path d="M8 3v4M16 3v4" />
    </svg>
  ),
  reloj: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  check: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12l5 5L20 7" />
    </svg>
  ),
  whatsapp: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
  arrow: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
};

export default function AmorYAmistadMedellinPage() {
  const jsonLdService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${PAGE_URL}#service`,
    serviceType: 'Regalos de Amor y Amistad a domicilio',
    name: 'Regalos de Amor y Amistad a Domicilio en Medellín',
    description:
      'Anchetas, desayunos sorpresa, peluches, ramos de rosas y cajas de chocolates para Amor y Amistad con entrega a domicilio el mismo día en Medellín y el Valle de Aburrá. Entrega confidencial y opción de remitente anónimo para intercambios de amigo secreto.',
    provider: { '@id': `${BUSINESS.url}/#organization` },
    areaServed: [
      { '@type': 'City', name: 'Medellín' },
      { '@type': 'City', name: 'Envigado' },
      { '@type': 'City', name: 'Sabaneta' },
      { '@type': 'City', name: 'Itagüí' },
      { '@type': 'City', name: 'Bello' },
    ],
    category: 'Gift Delivery',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'COP',
      // El mínimo visible en esta landing es el de los detalles ($80.000): las
      // tarjetas de IDEAS lo muestran así. Los desayunos arrancan más arriba,
      // por lo que usarlos como lowPrice contradiría lo que se ve en pantalla.
      lowPrice: BUSINESS.priceRanges.detalles.low,
      highPrice: BUSINESS.priceRanges.detalles.high,
      offerCount: IDEAS.length,
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31',
      seller: { '@id': `${BUSINESS.url}/#organization` },
    },
  };

  /*
    Event marca la fecha de la celebración para que Google y los motores de IA
    puedan responder "¿cuándo es Amor y Amistad?" citando esta página. Actualizar
    FECHA_CELEBRACION cada año.
  */
  const jsonLdEvent = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${PAGE_URL}#evento`,
    name: 'Día de Amor y Amistad en Colombia 2026',
    description:
      'Amor y Amistad se celebra en Colombia el tercer sábado de septiembre. Creaciones Vane entrega anchetas, desayunos sorpresa y detalles a domicilio en Medellín durante toda la semana de la celebración.',
    startDate: FECHA_CELEBRACION,
    endDate: FECHA_CELEBRACION,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Medellín y Valle de Aburrá',
      address: postalAddress(),
      geo: geoCoordinates(),
    },
    organizer: { '@id': `${BUSINESS.url}/#organization` },
  };

  const jsonLdLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${PAGE_URL}#localbusiness`,
    name: 'Creaciones Vane — Regalos de Amor y Amistad en Medellín',
    description:
      'Detalles y regalos de Amor y Amistad con entrega a domicilio el mismo día en Medellín. Anchetas, desayunos sorpresa, peluches, ramos y chocolates desde $80.000 COP.',
    url: PAGE_URL,
    telephone: BUSINESS.phoneE164,
    priceRange: BUSINESS.priceRange,
    image: [`${BUSINESS.url}/banner-anchetas.webp`, BUSINESS.logo],
    address: postalAddress(),
    geo: geoCoordinates(),
    openingHoursSpecification: openingHoursSpec(),
    parentOrganization: { '@id': `${BUSINESS.url}/#organization` },
  };

  const breadcrumb = breadcrumbSchema([
    { name: 'Inicio', url: BUSINESS.url },
    { name: 'Catálogo', url: `${BUSINESS.url}/creaciones-vane` },
    { name: 'Regalos de Amor y Amistad en Medellín', url: PAGE_URL },
  ]);

  const faq = faqSchema(FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEvent) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />

      <Header />

      <main className="min-h-screen bg-[#FBF7F4] text-stone-900">
        {/* ============================================================== */}
        {/* HERO                                                            */}
        {/* ============================================================== */}
        <section
          data-section="amistad-hero"
          className="relative isolate min-h-[78svh] flex items-end overflow-hidden"
          aria-label="Regalos de Amor y Amistad a domicilio en Medellín"
        >
          <Image
            src="/banner-anchetas.webp"
            alt="Regalos de Amor y Amistad a domicilio en Medellín: anchetas con chocolates, peluches y globos"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-90 blur-sm"
            priority
          />
          <div className="absolute inset-0 bg-stone-950/55" />

          <div className="relative z-10 w-full px-5 sm:px-8 pb-14 sm:pb-20 pt-28 sm:pt-32">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal direction="down" delay={0.1}>
                <p className="font-script text-white/95 text-xl sm:text-2xl mb-3 sm:mb-4">
                  Cómplice que endulza
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.2}>
                <h1 className="text-white text-[2.25rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight max-w-3xl mb-5 sm:mb-7">
                  Regalos de Amor y Amistad en Medellín
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <p className="text-white/85 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-7 sm:mb-9">
                  Anchetas, desayunos sorpresa, peluches y ramos entregados a domicilio sin que la persona lo espere. Este año la fecha cae el {FECHA_LEGIBLE}.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center max-w-md sm:max-w-none">
                  <a
                    id="amistad-hero-cta"
                    href={waUrl(
                      'Hola Vane, quiero pedir un detalle para Amor y Amistad en Medellín. ¿Me cuentas las opciones y precios?'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-white text-stone-900 hover:bg-stone-100 px-7 py-4 rounded-full font-semibold text-base transition-colors duration-200"
                    aria-label="Reservar detalle de Amor y Amistad por WhatsApp"
                  >
                    <ICONS.whatsapp className="w-5 h-5 text-[#25D366]" />
                    Reservar por WhatsApp
                  </a>
                  <a
                    href="#ideas"
                    className="inline-flex items-center justify-center gap-2 border border-white/40 text-white hover:bg-white/10 px-7 py-4 rounded-full font-medium text-base transition-colors duration-200"
                  >
                    Ver ideas de regalo
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="fade" delay={0.6}>
                <div className="mt-10 sm:mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 text-white/80 text-sm">
                  <span className="flex items-center gap-2">
                    <ICONS.check className="w-4 h-4" />
                    Desde $80.000
                  </span>
                  <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/40" />
                  <span className="flex items-center gap-2">
                    <ICONS.check className="w-4 h-4" />
                    Entrega el mismo día
                  </span>
                  <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/40" />
                  <span className="flex items-center gap-2">
                    <ICONS.check className="w-4 h-4" />
                    Remitente anónimo si lo pides
                  </span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* RESPUESTA DIRECTA — bloque citable por IA                       */}
        {/* ============================================================== */}
        <section
          data-section="amistad-resumen"
          className="px-5 sm:px-8 py-12 sm:py-16 bg-white border-b border-stone-200"
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
              <strong className="text-stone-900">
                En Colombia, Amor y Amistad se celebra el tercer sábado de septiembre: en 2026 cae el {FECHA_LEGIBLE}.
              </strong>{' '}
              Un detalle para esa fecha en Medellín cuesta entre $80.000 y $200.000 COP según el tamaño, y los desayunos sorpresa entre $90.000 y $190.000. Creaciones Vane entrega a domicilio en Medellín, El Poblado, Laureles, Envigado, Sabaneta, Itagüí y Bello confirmando por WhatsApp al {BUSINESS.phoneDisplay} con 24 horas de anticipación.
            </p>
          </div>
        </section>

        {/* ============================================================== */}
        {/* AVISO DE AGENDA                                                 */}
        {/* ============================================================== */}
        <section className="px-5 sm:px-8 py-10 sm:py-12 bg-[#FBF7F4]">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8">
              <ICONS.calendario className="w-9 h-9 text-[#D81B60] flex-shrink-0" />
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-stone-900 mb-2 leading-snug">
                  La semana de Amor y Amistad la agenda se llena
                </h2>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                  Los pedidos se concentran entre el miércoles y el sábado, y las franjas de primera hora de la mañana son las primeras en agotarse. Si ya sabes a quién quieres sorprender, reservar con una semana de anticipación te asegura la hora exacta de entrega.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* IDEAS POR DESTINATARIO                                          */}
        {/* ============================================================== */}
        <section
          id="ideas"
          data-section="amistad-ideas"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-white border-y border-stone-200"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                Ideas de regalo
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4 max-w-3xl">
                ¿A quién vas a sorprender?
              </h2>
              <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 sm:mb-14">
                Cada detalle se arma contigo. Nos dices para quién es y tu presupuesto, y ajustamos el contenido, la decoración y la hora de entrega.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {IDEAS.map((idea, idx) => (
                <ScrollReveal key={idea.id} direction="up" delay={0.08 * idx}>
                  <article className="h-full bg-[#FBF7F4] border border-stone-200 rounded-2xl p-6 sm:p-7 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-semibold text-stone-900 mb-3 leading-snug">
                      {idea.titulo}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed mb-5 flex-1">
                      {idea.body}
                    </p>
                    <ul className="space-y-2 mb-5">
                      {idea.incluye.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-stone-700 leading-relaxed"
                        >
                          <ICONS.check className="w-4 h-4 mt-0.5 text-[#D81B60] flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-stone-500 border-t border-stone-200 pt-4 mb-5">
                      {idea.desde}
                    </p>
                    <a
                      id={`amistad-idea-${idea.id}`}
                      href={waUrl(
                        `Hola Vane, quiero un detalle de Amor y Amistad (${idea.titulo.toLowerCase()}) en Medellín. ¿Me cuentas opciones y precio?`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#D81B60] hover:text-[#AD1457] transition-colors"
                      aria-label={`Pedir detalle ${idea.titulo} por WhatsApp`}
                    >
                      Pedir este detalle
                      <ICONS.arrow className="w-4 h-4" />
                    </a>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* QUÉ PODEMOS ARMAR                                               */}
        {/* ============================================================== */}
        <section
          data-section="amistad-catalogo"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-[#FBF7F4]"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4 max-w-3xl">
                Con qué armamos tu detalle
              </h2>
              <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-10">
                Todo sale del catálogo que trabajamos durante el año, así que no dependes de una colección limitada de temporada.
              </p>
            </ScrollReveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  titulo: 'Anchetas a domicilio',
                  texto: 'Snacks, chocolates, peluche, globos y tarjeta. Desde $80.000.',
                  path: '/anchetas-medellin-domicilio',
                },
                {
                  titulo: 'Desayunos sorpresa',
                  texto: 'Fruta fresca, jugo natural y sándwich gourmet entregados temprano. Desde $90.000.',
                  path: '/desayunos-sorpresa-medellin',
                },
                {
                  titulo: 'Catálogo completo',
                  texto: 'Peluches, ramos de rosas y cajas de chocolates para combinar.',
                  path: '/creaciones-vane',
                },
                {
                  titulo: 'Detalles para la empresa',
                  texto: 'Varios detalles el mismo día con factura electrónica.',
                  path: '/refrigerios-empresariales-medellin',
                },
              ].map((c) => (
                <Link
                  key={c.path}
                  href={c.path}
                  className="group flex items-center justify-between gap-4 bg-white border border-stone-200 hover:border-stone-900 rounded-2xl p-6 transition-colors"
                >
                  <div>
                    <p className="text-base font-semibold text-stone-900 mb-1">{c.titulo}</p>
                    <p className="text-sm text-stone-500 leading-relaxed">{c.texto}</p>
                  </div>
                  <ICONS.arrow className="w-5 h-5 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* FAQ                                                             */}
        {/* ============================================================== */}
        <section
          data-section="amistad-faq"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-white border-y border-stone-200"
        >
          <div className="max-w-3xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                Preguntas frecuentes
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-10 sm:mb-14">
                Lo que más nos preguntan
              </h2>
            </ScrollReveal>

            <div className="divide-y divide-stone-200 border-t border-b border-stone-200">
              {FAQS.map((item, idx) => (
                <details key={idx} className="group">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer py-5 sm:py-6 list-none">
                    <span className="text-base sm:text-lg font-medium text-stone-900 leading-snug pr-2">
                      {item.q}
                    </span>
                    <span className="flex-shrink-0 w-7 h-7 rounded-full border border-stone-300 flex items-center justify-center text-stone-500 group-open:bg-stone-900 group-open:border-stone-900 group-open:text-white transition-colors">
                      <svg
                        className="w-3.5 h-3.5 transition-transform group-open:rotate-45"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <div className="pb-6 text-sm sm:text-base text-stone-600 leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* CTA FINAL                                                       */}
        {/* ============================================================== */}
        <section
          data-section="amistad-cta-final"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-[#D81B60] text-white"
        >
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="down">
              <p className="font-script text-white/90 text-2xl sm:text-3xl mb-4">
                Falta poco para la fecha
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-5">
                Reserva tu detalle de Amor y Amistad
              </h2>
              <p className="text-white/85 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
                Escríbenos con para quién es, tu presupuesto y la dirección. Te armamos opciones el mismo día y aseguramos la hora de entrega antes de que se llene la agenda.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <a
                id="amistad-cta-final"
                href={waUrl(
                  'Hola Vane, quiero reservar un detalle para Amor y Amistad. Es para ____, mi presupuesto es ____ y la dirección de entrega es ____. ¿Me ayudan?'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white text-[#D81B60] hover:bg-stone-50 px-8 py-4 rounded-full font-semibold text-base transition-colors duration-200"
                aria-label="Reservar detalle de Amor y Amistad por WhatsApp"
              >
                <ICONS.whatsapp className="w-5 h-5 text-[#25D366]" />
                Escribir por WhatsApp
              </a>
            </ScrollReveal>

            <ScrollReveal direction="fade" delay={0.4}>
              <p className="mt-8 text-sm text-white/75 flex items-center justify-center gap-2">
                <ICONS.reloj className="w-4 h-4" />
                Confirmando antes de las 12:00 PM entregamos el mismo día
              </p>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
