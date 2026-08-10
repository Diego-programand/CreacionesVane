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
 * Landing transaccional #5 — desayunos sorpresa.
 *
 * Origen: análisis GSC 2026-08-09. El sitio rankea posición 1–1,67 en
 * "desayunos sorpresa" y "desayunos sorpresa medellin" con CTR de 66–100%,
 * pero solo ~12 impresiones en 12 meses porque no existía URL dedicada: la
 * consulta la absorbía /creaciones-vane (catálogo general). Esta landing
 * captura la franja completa de variantes (novia, cumpleaños, aniversario,
 * empresarial, "cerca de mí").
 *
 * Reglas heredadas del canon:
 *  - Lenguaje del cliente: "desayuno sorpresa", "domicilio", "detalle".
 *    Sin anglicismos ("breakfast box", "delivery").
 *  - SVGs lineales propios, stroke 1.5, viewBox 24×24. Sin emojis.
 *  - Sin gradientes. Fucsia marca como destacado.
 *  - Mobile-first agresivo (67% del tráfico del sitio es móvil).
 *
 * PRECIOS: solo se publican los extremos confirmados del negocio
 * ($55.000–$190.000, fuente: llms.txt y BUSINESS.priceRanges.desayunos). Los
 * tramos intermedios NO se inventan — cuando el negocio confirme los precios
 * exactos por tamaño, convertir TIPOS en paquetes con precio fijo y cambiar
 * AggregateOffer por OfferCatalog, igual que en las otras landings.
 */

const PAGE_PATH = '/desayunos-sorpresa-medellin';
const PAGE_URL = `${BUSINESS.url}${PAGE_PATH}`;

const PRECIO_MIN = BUSINESS.priceRanges.desayunos.low; // 55.000
const PRECIO_MAX = BUSINESS.priceRanges.desayunos.high; // 190.000

export const metadata: Metadata = pageMetadata({
  title: 'Desayunos Sorpresa a Domicilio en Medellín',
  description: `Desayunos sorpresa a domicilio en Medellín desde $55.000. Fruta fresca, jugo natural, sándwich gourmet y decoración temática. Pide antes de las 12:00 PM y llega hoy. WhatsApp ${BUSINESS.phoneDisplay}.`,
  path: PAGE_PATH,
  keywords: [
    'desayunos sorpresa medellín',
    'desayuno sorpresa medellín',
    'desayunos sorpresa a domicilio medellín',
    'desayuno sorpresa a domicilio',
    'desayunos sorpresa domicilio medellín',
    'desayuno sorpresa cerca de mi',
    'desayunos medellín domicilio',
    'desayuno sorpresa para novia medellín',
    'desayuno sorpresa para novio medellín',
    'desayuno sorpresa para esposo medellín',
    'desayuno sorpresa para esposa medellín',
    'desayuno sorpresa cumpleaños medellín',
    'desayuno sorpresa aniversario medellín',
    'desayuno sorpresa día de la madre medellín',
    'desayuno sorpresa para mamá medellín',
    'desayunos empresariales medellín',
    'desayuno sorpresa el poblado',
    'desayuno sorpresa laureles',
    'desayuno sorpresa envigado',
    'desayuno sorpresa sabaneta',
    'desayuno sorpresa belén',
    'desayuno sorpresa bello',
    'desayuno sorpresa itagüí',
    'desayunos sorpresa económicos medellín',
    'desayuno sorpresa con globos medellín',
    'desayuno sorpresa con peluche medellín',
    'cuánto cuesta un desayuno sorpresa medellín',
    'pedir desayuno sorpresa medellín',
  ],
});

/**
 * Qué lleva SIEMPRE un desayuno sorpresa. Fuente: llms.txt (contenido
 * confirmado por el negocio) + elementos de personalización del catálogo.
 */
const INCLUYE_SIEMPRE = [
  {
    icon: 'fruta' as const,
    title: 'Fruta fresca',
    body: 'Porción de fruta de temporada cortada el mismo día de la entrega, nunca del día anterior.',
  },
  {
    icon: 'jugo' as const,
    title: 'Jugo natural',
    body: 'Jugo natural en botella, no en caja. Nos dices el sabor o lo elegimos según lo que esté mejor ese día.',
  },
  {
    icon: 'sandwich' as const,
    title: 'Sándwich gourmet',
    body: 'Sándwich preparado en la mañana, con opciones de pollo, jamón y queso o vegetariano.',
  },
  {
    icon: 'decoracion' as const,
    title: 'Decoración temática',
    body: 'Bandeja o caja decorada en la paleta y el motivo que elijas: cumpleaños, aniversario, agradecimiento.',
  },
  {
    icon: 'tarjeta' as const,
    title: 'Tarjeta con tu mensaje',
    body: 'Escribimos a mano el mensaje que nos dictes. Es el detalle que la persona guarda después.',
  },
  {
    icon: 'sorpresa' as const,
    title: 'Sorpresa confidencial',
    body: 'La persona nunca sabe que viene. Coordinamos contigo por WhatsApp y entregamos directamente.',
  },
  {
    icon: 'foto' as const,
    title: 'Foto de la entrega',
    body: 'Si lo pides, te enviamos una foto del momento en que lo recibe. Sin costo adicional.',
  },
  {
    icon: 'reloj' as const,
    title: 'Entrega el mismo día',
    body: 'Confirmando antes de las 12:00 PM llega hoy mismo en zona cercana del Valle de Aburrá.',
  },
];

/**
 * Ocasiones. Cubre las variantes de búsqueda detectadas en GSC sin inventar
 * precios por tramo: cada tipo describe la personalización, no un paquete
 * cerrado.
 */
const OCASIONES = [
  {
    id: 'pareja',
    titulo: 'Desayuno sorpresa para tu pareja',
    body: 'El más pedido. Llega temprano, antes de que salga a trabajar. Se personaliza con globos en la paleta que elijas, peluche pequeño o ramo de rosas, y la tarjeta con tu mensaje.',
    extras: ['Globos decorativos', 'Peluche o ramo de rosas', 'Tarjeta manuscrita'],
  },
  {
    id: 'cumpleanos',
    titulo: 'Desayuno sorpresa de cumpleaños',
    body: 'Con decoración temática de cumpleaños, vela y el nombre de la persona en la presentación. Podemos coordinar la entrega a primera hora para que sea lo primero que reciba en el día.',
    extras: ['Decoración temática', 'Nombre personalizado', 'Entrega a primera hora'],
  },
  {
    id: 'aniversario',
    titulo: 'Desayuno sorpresa de aniversario',
    body: 'Presentación más cuidada, con rosas frescas y detalles en la paleta que hayan usado en su relación. Para aniversarios grandes recomendamos coordinar con dos días de anticipación.',
    extras: ['Rosas frescas', 'Presentación premium', 'Fecha programada'],
  },
  {
    id: 'mama',
    titulo: 'Desayuno sorpresa para mamá',
    body: 'Pensado para el Día de la Madre y cumpleaños de mamá. Porciones más generosas y opción de incluir a más de una persona si vas a sorprender a mamá y abuela el mismo día.',
    extras: ['Porción generosa', 'Opción para dos personas', 'Flores incluidas opcionales'],
  },
  {
    id: 'agradecimiento',
    titulo: 'Desayuno para agradecer o felicitar',
    body: 'Para un ascenso, una recuperación o simplemente un gracias. Presentación neutra y elegante, sin temática romántica, apropiada para amigos, colegas o clientes.',
    extras: ['Presentación neutra', 'Sin temática romántica', 'Apto para oficina'],
  },
  {
    id: 'empresarial',
    titulo: 'Desayunos sorpresa empresariales',
    body: 'Para reconocer a un colaborador, celebrar un cierre de negocio o sorprender a un cliente. Podemos entregar varios el mismo día en distintas direcciones y emitir factura electrónica.',
    extras: ['Entregas múltiples', 'Factura electrónica', 'Logo de tu empresa opcional'],
  },
];

const FAQS = [
  {
    q: '¿Cuánto cuesta un desayuno sorpresa en Medellín?',
    a: 'Los desayunos sorpresa van desde $55.000 COP hasta $190.000 COP según el tamaño, los acompañamientos y los extras que elijas (peluche, ramo de rosas, globos). Todos incluyen fruta fresca, jugo natural, sándwich gourmet, decoración temática y tarjeta con tu mensaje. Escríbenos con tu presupuesto y te armamos la mejor opción dentro de ese rango.',
  },
  {
    q: '¿Entregan desayunos sorpresa el mismo día en Medellín?',
    a: 'Sí. Si confirmas el pedido por WhatsApp antes de las 12:00 PM, entregamos el mismo día en zona cercana: Medellín, El Poblado, Laureles, Belén, Robledo, Centro, Envigado, Sabaneta, Itagüí y Bello. Para entregas de madrugada o a primera hora de la mañana, coordina el pedido el día anterior.',
  },
  {
    q: '¿A qué hora entregan los desayunos sorpresa?',
    a: 'Coordinamos la hora exacta contigo. La mayoría de los desayunos se entregan entre las 6:00 y las 9:00 AM para que la persona lo reciba antes de empezar su día. También hacemos entregas más tarde si prefieres sorprender en la oficina a media mañana.',
  },
  {
    q: '¿La persona se entera de que le van a llevar el desayuno?',
    a: 'No. La sorpresa es 100% confidencial. Tú coordinas todo con nosotras por WhatsApp y entregamos directamente en la dirección que nos indiques, sin adelantar nada. Si quieres, te enviamos una foto del momento de la entrega para que veas su reacción.',
  },
  {
    q: '¿Qué incluye exactamente el desayuno?',
    a: 'Todos los desayunos incluyen fruta fresca de temporada, jugo natural en botella, sándwich gourmet (pollo, jamón y queso o vegetariano) y decoración temática con tarjeta personalizada. A partir de ahí puedes sumar globos, peluche, ramo de rosas, chocolates o postre según el presupuesto.',
  },
  {
    q: '¿Puedo pedir un desayuno sorpresa vegetariano o con restricciones?',
    a: 'Sí. Manejamos sándwich vegetariano sin costo adicional y adaptamos el desayuno si la persona tiene alguna restricción (sin lactosa, sin gluten, sin frutos secos). Avísanos al hacer el pedido para prepararlo correctamente.',
  },
  {
    q: '¿Puedo programar el desayuno para una fecha futura?',
    a: 'Sí, y es lo que recomendamos para fechas marcadas. Puedes reservar con anticipación y nosotras coordinamos la entrega el día y la hora exactos. Para San Valentín, Día de la Madre, Amor y Amistad y diciembre sugerimos reservar con mínimo una semana porque la agenda se llena.',
  },
  {
    q: '¿En qué zonas entregan desayunos sorpresa?',
    a: 'Entregamos sin costo adicional en Medellín, El Poblado, Laureles, Belén, Robledo, Centro, Envigado, Sabaneta, Itagüí y Bello. En La Estrella, Caldas, Copacabana, Girardota y Barbosa cobramos un adicional de transporte que te confirmamos antes de cerrar el pedido.',
  },
  {
    q: '¿Cómo se paga el pedido?',
    a: 'Aceptamos Nequi, Daviplata, transferencia bancaria y efectivo. Para desayunos con entrega programada confirmamos el pedido con el pago previo. Si necesitas factura electrónica para tu empresa, también la emitimos.',
  },
  {
    q: '¿Hacen desayunos sorpresa para empresas?',
    a: 'Sí. Entregamos varios desayunos el mismo día en distintas direcciones para reconocer colaboradores, celebrar cierres de negocio o sorprender clientes. Emitimos factura electrónica y podemos incluir el logo de tu empresa en la presentación. Escríbenos con la cantidad y las direcciones para cotizar.',
  },
];

/**
 * Iconos SVG lineales propios. Stroke 1.5, viewBox 24×24, mismo set que las
 * landings anteriores. Sobre el SERVICIO y sus componentes reales, no emojis.
 */
type IconProps = { className?: string };
const ICONS = {
  fruta: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 8c-2.5-2-6-1-6 3.5 0 4 3 8.5 5 8.5.5 0 .7-.3 1-.3s.5.3 1 .3c2 0 5-4.5 5-8.5C18 7 14.5 6 12 8z" />
      <path d="M12 8c0-2 1-3.5 3-4" />
    </svg>
  ),
  jugo: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M9 3h6l-.5 4H9.5L9 3z" />
      <path d="M9.5 7h5l.5 11a3 3 0 01-3 3h0a3 3 0 01-3-3l.5-11z" />
      <path d="M9.2 13h5.6" />
    </svg>
  ),
  sandwich: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 8.5c0-2 4-4.5 9-4.5s9 2.5 9 4.5-4 2.5-9 2.5-9-.5-9-2.5z" />
      <path d="M3 12c0 1.5 4 2.5 9 2.5s9-1 9-2.5" />
      <path d="M3 15.5c0 2 4 4.5 9 4.5s9-2.5 9-4.5" />
    </svg>
  ),
  decoracion: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <ellipse cx="9" cy="8" rx="4" ry="5" />
      <path d="M9 13v3" />
      <ellipse cx="16.5" cy="11" rx="3" ry="3.8" />
      <path d="M16.5 14.8V18" />
      <path d="M6 21c2-1 4-1 6 0s4 1 6 0" />
    </svg>
  ),
  tarjeta: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
  sorpresa: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3.5" y="11" width="17" height="10" rx="1.5" />
      <path d="M2.5 7.5h19V11h-19z" />
      <path d="M12 7.5v13.5" />
      <path d="M12 7.5c-1.5 0-3.5-.5-3.5-2.5s2-2.5 3.5 0c1.5-2.5 3.5-2 3.5 0s-2 2.5-3.5 2.5z" />
    </svg>
  ),
  foto: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 8.5A1.5 1.5 0 014.5 7h2.2l1.2-2h8.2l1.2 2h2.2A1.5 1.5 0 0121 8.5v9A1.5 1.5 0 0119.5 19h-15A1.5 1.5 0 013 17.5v-9z" />
      <circle cx="12" cy="12.5" r="3.5" />
    </svg>
  ),
  reloj: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  mapa: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 21s-7-7.5-7-12a7 7 0 1114 0c0 4.5-7 12-7 12z" />
      <circle cx="12" cy="9.5" r="2.5" />
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

export default function DesayunosSorpresaMedellinPage() {
  const jsonLdLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${PAGE_URL}#localbusiness`,
    name: 'Creaciones Vane — Desayunos Sorpresa a Domicilio en Medellín',
    description:
      'Desayunos sorpresa a domicilio en Medellín y el Valle de Aburrá con fruta fresca, jugo natural, sándwich gourmet, decoración temática y tarjeta personalizada. Entrega el mismo día confirmando antes de las 12:00 PM. Desde $55.000 COP.',
    url: PAGE_URL,
    telephone: BUSINESS.phoneE164,
    priceRange: BUSINESS.priceRange,
    image: [`${BUSINESS.url}/banner-anchetas.webp`, BUSINESS.logo],
    address: postalAddress(),
    geo: geoCoordinates(),
    openingHoursSpecification: openingHoursSpec(),
    parentOrganization: { '@id': `${BUSINESS.url}/#organization` },
    areaServed: [
      { '@type': 'City', name: 'Medellín' },
      { '@type': 'Place', name: 'El Poblado' },
      { '@type': 'Place', name: 'Laureles' },
      { '@type': 'Place', name: 'Belén' },
      { '@type': 'Place', name: 'Robledo' },
      { '@type': 'City', name: 'Envigado' },
      { '@type': 'City', name: 'Sabaneta' },
      { '@type': 'City', name: 'Itagüí' },
      { '@type': 'City', name: 'Bello' },
    ],
  };

  const jsonLdService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${PAGE_URL}#service`,
    serviceType: 'Desayunos Sorpresa a Domicilio',
    name: 'Desayunos Sorpresa a Domicilio en Medellín',
    description:
      'Servicio de desayunos sorpresa a domicilio en Medellín: fruta fresca, jugo natural, sándwich gourmet, decoración temática y tarjeta con mensaje personalizado. Entrega confidencial el mismo día.',
    provider: { '@id': `${BUSINESS.url}/#organization` },
    areaServed: [
      { '@type': 'City', name: 'Medellín' },
      { '@type': 'City', name: 'Envigado' },
      { '@type': 'City', name: 'Sabaneta' },
      { '@type': 'City', name: 'Itagüí' },
      { '@type': 'City', name: 'Bello' },
    ],
    category: 'Gift Delivery',
    /*
      AggregateOffer en vez de OfferCatalog: publicamos el rango real
      confirmado por el negocio sin inventar precios por tramo. Cuando existan
      paquetes cerrados con precio fijo, migrar a OfferCatalog como en las
      landings de bodas y refrigerios.
    */
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'COP',
      lowPrice: PRECIO_MIN,
      highPrice: PRECIO_MAX,
      offerCount: OCASIONES.length,
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31',
      seller: { '@id': `${BUSINESS.url}/#organization` },
    },
  };

  const breadcrumb = breadcrumbSchema([
    { name: 'Inicio', url: BUSINESS.url },
    { name: 'Catálogo', url: `${BUSINESS.url}/creaciones-vane` },
    { name: 'Desayunos Sorpresa en Medellín', url: PAGE_URL },
  ]);

  const faq = faqSchema(FAQS.map((f) => ({ q: f.q, a: f.a })));

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
          data-section="desayunos-hero"
          className="relative isolate min-h-[78svh] flex items-end overflow-hidden"
          aria-label="Desayunos sorpresa a domicilio en Medellín"
        >
          {/*
            Usa /banner-anchetas.webp hasta que el negocio suba una foto propia
            de desayunos. Convención para la definitiva:
            /images/desayunosSorpresaMedellin.webp
          */}
          <Image
            src="/banner-anchetas.webp"
            alt="Desayuno sorpresa a domicilio en Medellín con fruta fresca, jugo natural y decoración temática"
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
                  Desayunos sorpresa a domicilio en Medellín
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <p className="text-white/85 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-7 sm:mb-9">
                  Fruta fresca, jugo natural, sándwich gourmet y decoración en la paleta que elijas. Confirmas antes de las 12:00 PM y llega hoy mismo, sin que la persona sospeche nada.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center max-w-md sm:max-w-none">
                  <a
                    id="desayunos-hero-cta"
                    href={waUrl(
                      'Hola Vane, quiero pedir un desayuno sorpresa a domicilio en Medellín. ¿Me cuentas las opciones y precios?'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-white text-stone-900 hover:bg-stone-100 px-7 py-4 rounded-full font-semibold text-base transition-colors duration-200"
                    aria-label="Pedir desayuno sorpresa por WhatsApp"
                  >
                    <ICONS.whatsapp className="w-5 h-5 text-[#25D366]" />
                    Pedir por WhatsApp
                  </a>
                  <a
                    href="#ocasiones"
                    className="inline-flex items-center justify-center gap-2 border border-white/40 text-white hover:bg-white/10 px-7 py-4 rounded-full font-medium text-base transition-colors duration-200"
                  >
                    Ver opciones y precios
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="fade" delay={0.6}>
                <div className="mt-10 sm:mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 text-white/80 text-sm">
                  <span className="flex items-center gap-2">
                    <ICONS.check className="w-4 h-4" />
                    Desde $55.000
                  </span>
                  <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/40" />
                  <span className="flex items-center gap-2">
                    <ICONS.check className="w-4 h-4" />
                    Entrega el mismo día
                  </span>
                  <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/40" />
                  <span className="flex items-center gap-2">
                    <ICONS.check className="w-4 h-4" />
                    Sorpresa 100% confidencial
                  </span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* RESPUESTA DIRECTA — bloque citable por IA                       */}
        {/* ============================================================== */}
        {/*
          Bloque autocontenido de ~60 palabras que responde qué, cuánto, dónde
          y cómo pedir. GSC confirma que el sitio ya es citado en Google AI
          Mode ("dame valores", "necesito telefono"): este formato es el que
          los motores extraen.
        */}
        <section
          data-section="desayunos-resumen"
          className="px-5 sm:px-8 py-12 sm:py-16 bg-white border-b border-stone-200"
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
              <strong className="text-stone-900">Un desayuno sorpresa en Medellín cuesta entre $55.000 y $190.000 COP</strong> según el tamaño y los extras. Todos incluyen fruta fresca, jugo natural, sándwich gourmet, decoración temática y tarjeta con tu mensaje. Creaciones Vane entrega el mismo día en Medellín, El Poblado, Laureles, Envigado, Sabaneta, Itagüí y Bello confirmando el pedido por WhatsApp al {BUSINESS.phoneDisplay} antes de las 12:00 PM.
            </p>
          </div>
        </section>

        {/* ============================================================== */}
        {/* QUÉ INCLUYE                                                     */}
        {/* ============================================================== */}
        <section
          data-section="desayunos-incluye"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-[#FBF7F4]"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                Qué incluye
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4 max-w-3xl">
                Lo que lleva todo desayuno sorpresa
              </h2>
              <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 sm:mb-14">
                Esto va incluido siempre, sin importar el tamaño que elijas. Los extras como peluche, ramo de rosas o chocolates se suman según el presupuesto.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-200 border border-stone-200 rounded-2xl overflow-hidden">
              {INCLUYE_SIEMPRE.map(({ icon, title, body }) => {
                const Icon = ICONS[icon];
                return (
                  <div key={title} className="bg-[#FBF7F4] p-6 sm:p-7 flex flex-col">
                    <Icon className="w-7 h-7 text-[#D81B60] mb-4" />
                    <h3 className="text-base sm:text-lg font-semibold text-stone-900 mb-2 leading-snug">
                      {title}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed">{body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* OCASIONES Y PRECIOS                                             */}
        {/* ============================================================== */}
        <section
          id="ocasiones"
          data-section="desayunos-ocasiones"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-white border-y border-stone-200"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                Para cada ocasión
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4 max-w-3xl">
                Desayunos según a quién sorprendes
              </h2>
              <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 sm:mb-14">
                Cada desayuno se arma contigo. Nos cuentas para quién es y la ocasión, y ajustamos tamaño, decoración y extras dentro del rango de $55.000 a $190.000.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {OCASIONES.map((o, idx) => (
                <ScrollReveal key={o.id} direction="up" delay={0.08 * idx}>
                  <article className="h-full bg-[#FBF7F4] border border-stone-200 rounded-2xl p-6 sm:p-7 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-semibold text-stone-900 mb-3 leading-snug">
                      {o.titulo}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed mb-5 flex-1">
                      {o.body}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {o.extras.map((e) => (
                        <li
                          key={e}
                          className="flex items-start gap-2.5 text-sm text-stone-700 leading-relaxed"
                        >
                          <ICONS.check className="w-4 h-4 mt-0.5 text-[#D81B60] flex-shrink-0" />
                          <span>{e}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      id={`desayunos-ocasion-${o.id}`}
                      href={waUrl(
                        `Hola Vane, quiero pedir un desayuno sorpresa (${o.titulo.toLowerCase()}) en Medellín. ¿Me cuentas opciones y precio?`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#D81B60] hover:text-[#AD1457] transition-colors"
                      aria-label={`Pedir ${o.titulo} por WhatsApp`}
                    >
                      Pedir este desayuno
                      <ICONS.arrow className="w-4 h-4" />
                    </a>
                  </article>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal direction="fade" delay={0.2}>
              <div className="mt-10 sm:mt-12 bg-[#D81B60] text-white rounded-2xl p-7 sm:p-9 max-w-3xl">
                <p className="text-white/70 text-xs uppercase tracking-[0.2em] mb-3">
                  Rango de precios
                </p>
                <p className="text-3xl sm:text-4xl font-bold mb-4">
                  $55.000
                  <span className="text-lg font-normal text-white/70 mx-2">a</span>
                  $190.000
                  <span className="text-sm font-normal text-white/60 ml-2">COP</span>
                </p>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                  El precio final depende del tamaño del desayuno y de los extras que sumes: globos, peluche, ramo de rosas, chocolates o postre. Escríbenos con tu presupuesto y armamos la mejor opción dentro de él.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ============================================================== */}
        {/* COBERTURA                                                       */}
        {/* ============================================================== */}
        <section
          data-section="desayunos-cobertura"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-[#FBF7F4]"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                Cobertura
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4 max-w-3xl">
                Dónde entregamos el mismo día
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 mt-8 sm:mt-12">
              <ScrollReveal direction="up" delay={0.1}>
                <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <ICONS.mapa className="w-6 h-6 text-[#D81B60]" />
                    <h3 className="text-lg sm:text-xl font-semibold text-stone-900">
                      Entrega el mismo día, sin costo extra
                    </h3>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed mb-5">
                    Confirmando el pedido antes de las 12:00 PM entregamos hoy en:
                  </p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-stone-800">
                    {[
                      'Medellín',
                      'El Poblado',
                      'Laureles',
                      'Belén',
                      'Robledo',
                      'Centro',
                      'Envigado',
                      'Sabaneta',
                      'Itagüí',
                      'Bello',
                    ].map((zona) => (
                      <li key={zona} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-stone-400" />
                        {zona}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.2}>
                <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <ICONS.mapa className="w-6 h-6 text-stone-500" />
                    <h3 className="text-lg sm:text-xl font-semibold text-stone-900">
                      Con adicional de transporte
                    </h3>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed mb-5">
                    En estas zonas cotizamos un valor adicional según la distancia y la hora de entrega:
                  </p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-stone-800">
                    {[
                      'La Estrella',
                      'Caldas',
                      'Copacabana',
                      'Girardota',
                      'Barbosa',
                      'Fuera del Valle',
                    ].map((zona) => (
                      <li key={zona} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-stone-400" />
                        {zona}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-xs text-stone-500 leading-relaxed">
                    Te confirmamos el valor exacto antes de cerrar el pedido.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* PROCESO                                                         */}
        {/* ============================================================== */}
        <section
          data-section="desayunos-proceso"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-white border-y border-stone-200"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                Proceso
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4 max-w-3xl">
                Así pides tu desayuno sorpresa
              </h2>
            </ScrollReveal>

            <ol className="mt-10 sm:mt-14 space-y-8 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-8 sm:gap-y-12 relative">
              {[
                {
                  step: '01',
                  title: 'Escribes por WhatsApp',
                  body: 'Nos cuentas para quién es, la ocasión, tu presupuesto y la dirección de entrega.',
                },
                {
                  step: '02',
                  title: 'Armamos la propuesta',
                  body: 'Te enviamos opciones con foto de referencia, extras disponibles y el precio final.',
                },
                {
                  step: '03',
                  title: 'Confirmas el pedido',
                  body: 'Aceptamos Nequi, Daviplata, transferencia y efectivo. Coordinamos la hora exacta.',
                },
                {
                  step: '04',
                  title: 'Entregamos la sorpresa',
                  body: 'Llegamos a la dirección sin adelantar nada. Si quieres, te enviamos la foto del momento.',
                },
              ].map((s) => (
                <li key={s.step} className="relative">
                  <p className="font-script text-3xl sm:text-4xl text-[#D81B60] mb-3 leading-none">
                    {s.step}
                  </p>
                  <h3 className="text-base sm:text-lg font-semibold text-stone-900 mb-2 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============================================================== */}
        {/* FAQ                                                             */}
        {/* ============================================================== */}
        <section
          data-section="desayunos-faq"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-[#FBF7F4]"
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
          data-section="desayunos-cta-final"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-[#D81B60] text-white"
        >
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="down">
              <p className="font-script text-white/90 text-2xl sm:text-3xl mb-4">
                ¿A quién quieres sorprender?
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-5">
                Pide tu desayuno sorpresa hoy
              </h2>
              <p className="text-white/85 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
                Escríbenos antes de las 12:00 PM y lo entregamos hoy mismo. Nos cuentas la ocasión y nosotras nos encargamos del resto.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <a
                id="desayunos-cta-final"
                href={waUrl(
                  'Hola Vane, quiero pedir un desayuno sorpresa en Medellín. Es para ____, la fecha de entrega es ____ y la dirección es ____. ¿Me ayudan?'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white text-[#D81B60] hover:bg-stone-50 px-8 py-4 rounded-full font-semibold text-base transition-colors duration-200"
                aria-label="Pedir desayuno sorpresa por WhatsApp"
              >
                <ICONS.whatsapp className="w-5 h-5 text-[#25D366]" />
                Escribir por WhatsApp
              </a>
            </ScrollReveal>

            <ScrollReveal direction="fade" delay={0.4}>
              <p className="mt-8 text-sm text-white/75">
                También puedes ver{' '}
                <Link
                  href="/anchetas-medellin-domicilio"
                  className="text-white underline decoration-white/40 hover:decoration-white"
                >
                  anchetas a domicilio en Medellín
                </Link>
                {' '}o{' '}
                <Link
                  href="/creaciones-vane"
                  className="text-white underline decoration-white/40 hover:decoration-white"
                >
                  el catálogo completo
                </Link>
                .
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
