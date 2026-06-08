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
 * Landing transaccional #3 (GSC pos 39 → top 10).
 *
 * Reglas heredadas del canon:
 *  - Lenguaje del cliente: no "catering", "box lunch", "coffee break",
 *    "off-site", "ROI" ni jerga corporativa anglo. Sí: "refrigerios para
 *    empresa/reunión/evento", "caja", "factura electrónica".
 *  - Iconos sobre el SERVICIO (caja, oficina, reloj, factura, hoja para
 *    opciones), no emojis de comida.
 *  - Sin gradientes. Fucsia marca como destacado, nunca negro.
 *  - Mobile-first agresivo.
 *  - Hero image: /images/refrigeriosEmpresariales.webp (pendiente subir).
 *
 * Nota: a diferencia de bodas/comunión, refrigerios SÍ son comida —
 * esa es la línea de negocio. Lo que evitamos es lenguaje extranjero.
 */

const PAGE_PATH = '/refrigerios-empresariales-medellin';
const PAGE_URL = `${BUSINESS.url}${PAGE_PATH}`;

export const metadata: Metadata = pageMetadata({
  title:
    'Refrigerios Empresariales en Medellín | Cajas para Reuniones y Eventos',
  description: `Refrigerios para empresas en Medellín y el Valle de Aburrá. Cajas desde $5.000 por persona, pedido mínimo 10 unidades. Entrega puntual, factura electrónica y opciones vegetarianas. WhatsApp ${BUSINESS.phoneDisplay}.`,
  path: PAGE_PATH,
  ogImage: `${BUSINESS.url}/images/refrigeriosEmpresariales.webp`,
  keywords: [
    'refrigerios empresariales medellín',
    'refrigerios para empresa medellín',
    'refrigerios reuniones medellín',
    'refrigerios capacitaciones medellín',
    'refrigerios conferencias medellín',
    'refrigerios evento corporativo medellín',
    'caja de refrigerio medellín',
    'cajas de refrigerio empresa medellín',
    'refrigerios el poblado',
    'refrigerios envigado',
    'refrigerios sabaneta',
    'refrigerios laureles',
    'refrigerios belén',
    'refrigerios itagüí',
    'refrigerios económicos medellín',
    'refrigerios para oficina medellín',
    'factura electrónica refrigerios medellín',
    'refrigerios personalizados marca medellín',
    'refrigerios vegetarianos medellín',
    'refrigerios sin gluten medellín',
    'refrigerios escolares medellín',
    'refrigerios infantiles medellín',
    'pedido refrigerios medellín',
    'cotización refrigerios medellín',
    'refrigerios para 50 personas medellín',
    'refrigerios para 100 personas medellín',
  ],
});

const PAQUETES = [
  {
    id: 'basica',
    nombre: 'Básica',
    precio: 5_000,
    precioLabel: '$5.000',
    sufijoPrecio: '/ persona',
    descripcion:
      'La opción más sencilla para refrigerios de reunión, capacitación o jornada corta.',
    incluye: [
      '1 sándwich del día',
      '1 unidad de fruta de temporada',
      '1 jugo en caja',
      '1 postre pequeño',
      'Caja blanca lista para entregar',
    ],
    ctaId: 'refrigerios-paquete-basica',
    waMessage:
      '¡Hola! Quiero cotizar refrigerios Básicos para mi evento. ¿Cuál es la cantidad mínima y la disponibilidad?',
  },
  {
    id: 'empresarial',
    nombre: 'Empresarial',
    precio: 9_000,
    precioLabel: '$9.000',
    sufijoPrecio: '/ persona',
    destacado: true,
    descripcion:
      'Nuestra caja más solicitada por empresas. Variedad, presentación cuidada y opción de imprimir el logo.',
    incluye: [
      '1 sándwich gourmet (opciones de pollo, jamón o vegetariano)',
      '1 unidad de fruta + 1 snack salado',
      '1 jugo natural en botella',
      '1 postre artesanal',
      '1 agua o té',
      'Caja con etiqueta personalizable',
      'Logo de tu empresa en la caja (opcional)',
    ],
    ctaId: 'refrigerios-paquete-empresarial',
    waMessage:
      '¡Hola! Quiero cotizar la caja Empresarial de refrigerios para mi evento. ¿Pueden incluir el logo de la empresa?',
  },
  {
    id: 'premium',
    nombre: 'Premium',
    precio: 15_000,
    precioLabel: '$15.000',
    sufijoPrecio: '/ persona',
    descripcion:
      'Para eventos importantes, conferencias y juntas con clientes. Caja completa con presentación tipo regalo.',
    incluye: [
      '1 sándwich gourmet premium o wrap',
      '1 ensalada de fruta fresca',
      '1 snack salado + 1 dulce artesanal',
      '1 jugo natural en botella + 1 agua',
      '1 postre de la casa',
      'Caja con etiqueta y tarjeta de saludo',
      'Logo o mensaje personalizado de tu empresa',
    ],
    ctaId: 'refrigerios-paquete-premium',
    waMessage:
      '¡Hola! Quiero cotizar la caja Premium de refrigerios para mi evento. Te cuento cantidad y fecha.',
  },
] as const;

const TIPOS_EVENTO = [
  'Reuniones de trabajo',
  'Capacitaciones internas',
  'Conferencias y charlas',
  'Inducciones de personal',
  'Talleres y formaciones',
  'Jornadas pedagógicas',
  'Eventos académicos',
  'Lanzamientos internos',
  'Juntas con clientes',
  'Jornadas escolares',
  'Reuniones de junta',
  'Fiestas de oficina',
];

const FAQS = [
  {
    q: '¿Cuál es el pedido mínimo?',
    a: '10 unidades. Por debajo de esa cantidad no garantizamos producción puntual ni el mismo nivel de presentación. Para pedidos grandes (más de 50 unidades) damos descuento por volumen — escríbenos para cotizar.',
  },
  {
    q: '¿Con cuánta anticipación debo hacer el pedido?',
    a: 'Recomendamos confirmar con 48 horas de anticipación para pedidos hasta 30 unidades. Para más de 30 unidades pedimos mínimo 72 horas. Algunos pedidos urgentes los podemos resolver el mismo día si tenemos capacidad — escríbenos por WhatsApp para confirmar.',
  },
  {
    q: '¿Entregan en mi oficina o en el sitio del evento?',
    a: 'Sí. Llevamos los refrigerios listos al lugar que indiques (oficina, salón de eventos, auditorio, colegio). Coordinamos la hora exacta de entrega para que estén disponibles al inicio del refrigerio.',
  },
  {
    q: '¿Tienen opciones vegetarianas o sin gluten?',
    a: 'Sí, manejamos sándwiches vegetarianos y opciones sin gluten. Confírmanos cuántas unidades especiales necesitas al momento del pedido para incluirlas en la preparación. No aplica costo adicional.',
  },
  {
    q: '¿Pueden poner el logo de mi empresa en la caja?',
    a: 'Sí. Imprimimos tu logo en la caja, agregamos una etiqueta con el nombre del evento o incluimos una tarjeta de saludo con mensaje personalizado. Se cotiza como adicional. En la caja Empresarial está incluida la opción de etiqueta personalizable; en la Premium va el logo o mensaje.',
  },
  {
    q: '¿Aceptan pago con factura electrónica?',
    a: 'Sí, emitimos factura electrónica con los datos de tu empresa (NIT, razón social, dirección y correo). Solo confírmanos los datos al hacer el pedido y la enviamos antes o después de la entrega según prefieras.',
  },
  {
    q: '¿Qué incluye exactamente cada caja?',
    a: 'La Básica trae sándwich, una fruta, jugo en caja y un postre pequeño. La Empresarial añade snack salado, jugo natural en botella, agua y opción de etiqueta personalizada. La Premium incluye ensalada de fruta, dos snacks, dos bebidas, postre de la casa y tarjeta de saludo. En todas, los sabores y opciones se confirman al cotizar.',
  },
  {
    q: '¿Hacen refrigerios para jornadas escolares o eventos infantiles?',
    a: 'Sí. Adaptamos las cajas a niños con porciones más pequeñas, sabores conocidos y opciones sin frutos secos por seguridad. Las usamos en colegios, jornadas pedagógicas, fiestas infantiles y eventos familiares.',
  },
  {
    q: '¿Cubren todo el Valle de Aburrá?',
    a: 'Entregamos en zona cercana (Medellín, El Poblado, Laureles, Belén, Envigado, Sabaneta, Itagüí, Bello) sin costo adicional. Para zonas lejanas (La Estrella, Caldas, Copacabana, Girardota, Barbosa) cotizamos un valor adicional según la distancia y la hora de entrega.',
  },
  {
    q: '¿Cómo se reserva el pedido?',
    a: 'Confirmamos el pedido con un abono del 50% del valor total. El saldo se cancela contra entrega o con factura electrónica si prefieres. Aceptamos Nequi, Daviplata, transferencia bancaria, efectivo y factura empresarial.',
  },
];

/**
 * Iconos SVG lineales sobre el SERVICIO (caja, oficina, reloj, factura,
 * hoja para opciones especiales), no sobre la comida. Stroke 1.5, viewBox
 * 24×24. Mantienen la firma visual del canon de las landings.
 */
type IconProps = { className?: string };
const ICONS = {
  caja: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 8l9-4 9 4-9 4-9-4z" />
      <path d="M3 8v8l9 4 9-4V8" />
      <path d="M12 12v8" />
    </svg>
  ),
  oficina: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2" />
      <path d="M10 21v-3h4v3" />
    </svg>
  ),
  reloj: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  factura: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </svg>
  ),
  hoja: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20 4c-3 0-9 1-12 4S4 14 4 17c0 1.5.5 2.5 1 3 0-3 1-7 4-10s7-4 10-4c0 0 .5-1 1-2z" />
      <path d="M5 20c2-6 6-10 12-12" />
    </svg>
  ),
  marca: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M9 3H5a2 2 0 00-2 2v4l11 11a2 2 0 002.8 0l4.2-4.2a2 2 0 000-2.8L10 2.5" />
      <circle cx="7.5" cy="7.5" r="1" fill="currentColor" />
    </svg>
  ),
  personas: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 19c0-3 3-5 6-5s6 2 6 5" />
      <path d="M15 19c0-2 2-3 3.5-3s3.5 1 3.5 3" />
    </svg>
  ),
  calendario: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="1.5" />
      <path d="M3 10h18" />
      <path d="M8 3v4M16 3v4" />
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

const INCLUYE_GENERAL = [
  {
    Icon: ICONS.caja,
    title: 'Caja personalizada',
    body: 'Cada refrigerio va en una caja individual lista para entregar. Opción de etiqueta con el nombre del evento o el logo de tu empresa.',
  },
  {
    Icon: ICONS.personas,
    title: 'Pedido por volumen',
    body: 'Pedido mínimo de 10 unidades. Para más de 50 manejamos descuento por volumen — escríbenos para cotizar.',
  },
  {
    Icon: ICONS.reloj,
    title: 'Entrega a la hora pactada',
    body: 'Llevamos los refrigerios al sitio del evento en la hora exacta que coordinemos para que estén listos al inicio.',
  },
  {
    Icon: ICONS.oficina,
    title: 'En tu oficina o salón',
    body: 'Entregamos en oficinas, auditorios, salones de eventos, colegios o cualquier sitio dentro de la zona cercana.',
  },
  {
    Icon: ICONS.hoja,
    title: 'Vegetariano y sin gluten',
    body: 'Adaptamos cajas con opción vegetariana o sin gluten sin costo adicional. Solo nos avisas la cantidad al cotizar.',
  },
  {
    Icon: ICONS.marca,
    title: 'Logo de tu empresa',
    body: 'Imprimimos el logo de tu empresa en la caja, ponemos una tarjeta con mensaje o agregamos un detalle pequeño con tus colores.',
  },
  {
    Icon: ICONS.factura,
    title: 'Factura electrónica',
    body: 'Emitimos factura electrónica con los datos de tu empresa (NIT, razón social, dirección y correo) sin trámite adicional.',
  },
  {
    Icon: ICONS.calendario,
    title: 'Confirmas con tiempo',
    body: 'Recomendamos confirmar con 48–72 horas. Pedidos urgentes los resolvemos el mismo día si tenemos capacidad.',
  },
];

export default function RefrigeriosEmpresarialesMedellinPage() {
  const jsonLdLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${PAGE_URL}#localbusiness`,
    name: 'Creaciones Vane — Refrigerios Empresariales en Medellín',
    description:
      'Servicio de refrigerios para empresas en Medellín y el Valle de Aburrá: cajas individuales, opciones vegetarianas y sin gluten, personalización con logo y factura electrónica. Pedido mínimo 10 unidades. Desde $5.000 por persona.',
    url: PAGE_URL,
    telephone: BUSINESS.phoneE164,
    priceRange: BUSINESS.priceRange,
    image: [
      `${BUSINESS.url}/images/refrigeriosEmpresariales.webp`,
      `${BUSINESS.url}/banner-refrigerios.webp`,
    ],
    address: postalAddress(),
    geo: geoCoordinates(),
    openingHoursSpecification: openingHoursSpec(),
    parentOrganization: { '@id': `${BUSINESS.url}/#organization` },
    areaServed: [
      { '@type': 'City', name: 'Medellín' },
      { '@type': 'Place', name: 'El Poblado' },
      { '@type': 'Place', name: 'Laureles' },
      { '@type': 'Place', name: 'Belén' },
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
    serviceType: 'Refrigerios Empresariales',
    name: 'Refrigerios Empresariales en Medellín',
    description:
      'Cajas individuales de refrigerios para reuniones, capacitaciones, conferencias y eventos empresariales. Opciones Básica, Empresarial y Premium con logo personalizable y factura electrónica.',
    provider: { '@id': `${BUSINESS.url}/#organization` },
    areaServed: { '@type': 'City', name: 'Medellín' },
    category: 'Corporate Catering',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cajas de Refrigerios Empresariales',
      itemListElement: PAQUETES.map((p) => ({
        '@type': 'Offer',
        name: `Caja ${p.nombre} — Refrigerio Empresarial`,
        description: p.descripcion,
        priceCurrency: 'COP',
        price: p.precio,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: p.precio,
          priceCurrency: 'COP',
          referenceQuantity: {
            '@type': 'QuantitativeValue',
            value: 1,
            unitCode: 'C62',
            unitText: 'persona',
          },
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            minValue: 10,
            unitCode: 'C62',
            unitText: 'unidades',
          },
        },
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        url: `${PAGE_URL}#paquete-${p.id}`,
        seller: { '@id': `${BUSINESS.url}/#organization` },
      })),
    },
  };

  const breadcrumb = breadcrumbSchema([
    { name: 'Inicio', url: BUSINESS.url },
    { name: 'Refrigerios', url: `${BUSINESS.url}/refrigerios` },
    { name: 'Refrigerios Empresariales en Medellín', url: PAGE_URL },
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
          data-section="refrigerios-hero"
          className="relative isolate min-h-[78svh] flex items-end overflow-hidden"
          aria-label="Refrigerios empresariales en Medellín"
        >
          {/*
            Imagen del hero. Convención de nombres: /images/X.webp donde X
            describe la landing (camelCase). Para refrigerios empresariales:
            refrigeriosEmpresariales.webp. Si aún no existe, Next renderiza
            alt + overlay; la página no rompe.
          */}
          <Image
            src="/images/refrigeriosEmpresariales.webp"
            alt="Cajas de refrigerios empresariales en Medellín entregadas para reuniones y eventos"
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
                  Refrigerios para empresas en Medellín
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <p className="text-white/85 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-7 sm:mb-9">
                  Cajas listas para entregar en tu oficina, capacitación o evento. Con logo de tu empresa, factura electrónica y opciones vegetarianas.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center max-w-md sm:max-w-none">
                  <a
                    id="refrigerios-hero-cta"
                    href={waUrl(
                      'Hola Vane, quiero cotizar refrigerios para un evento de mi empresa en Medellín. ¿Me confirmas opciones y precios?'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-white text-stone-900 hover:bg-stone-100 px-7 py-4 rounded-full font-semibold text-base transition-colors duration-200"
                    aria-label="Cotizar refrigerios empresariales por WhatsApp"
                  >
                    <ICONS.whatsapp className="w-5 h-5 text-[#25D366]" />
                    Cotizar por WhatsApp
                  </a>
                  <a
                    href="#paquetes"
                    className="inline-flex items-center justify-center gap-2 border border-white/40 text-white hover:bg-white/10 px-7 py-4 rounded-full font-medium text-base transition-colors duration-200"
                  >
                    Ver cajas y precios
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="fade" delay={0.6}>
                <div className="mt-10 sm:mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 text-white/80 text-sm">
                  <span className="flex items-center gap-2">
                    <ICONS.check className="w-4 h-4" />
                    Pedido mínimo 10 unidades
                  </span>
                  <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/40" />
                  <span className="flex items-center gap-2">
                    <ICONS.check className="w-4 h-4" />
                    Factura electrónica
                  </span>
                  <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/40" />
                  <span className="flex items-center gap-2">
                    <ICONS.check className="w-4 h-4" />
                    Vegetariano y sin gluten
                  </span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* INCLUYE                                                         */}
        {/* ============================================================== */}
        <section
          data-section="refrigerios-incluye"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-[#FBF7F4]"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                Qué incluye
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4 max-w-3xl">
                Un servicio pensado para empresas
              </h2>
              <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 sm:mb-14">
                Cada pedido viene resuelto de principio a fin: preparación, presentación, entrega y facturación. Tú solo nos cuentas la cantidad, fecha y hora.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-200 border border-stone-200 rounded-2xl overflow-hidden">
              {INCLUYE_GENERAL.map(({ Icon, title, body }) => (
                <div
                  key={title}
                  className="bg-[#FBF7F4] p-6 sm:p-7 flex flex-col"
                >
                  <Icon className="w-7 h-7 text-[#D81B60] mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-stone-900 mb-2 leading-snug">
                    {title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* PAQUETES                                                        */}
        {/* ============================================================== */}
        <section
          id="paquetes"
          data-section="refrigerios-paquetes"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-white border-y border-stone-200"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                Tres opciones de caja
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4 max-w-3xl">
                Elige según el tipo de evento
              </h2>
              <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 sm:mb-14">
                Pedido mínimo de 10 unidades en todas las cajas. Descuento por volumen a partir de 50 unidades.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {PAQUETES.map((p) => {
                const destacado = 'destacado' in p && p.destacado;
                return (
                  <article
                    key={p.id}
                    id={`paquete-${p.id}`}
                    className={
                      destacado
                        ? 'relative rounded-3xl p-7 sm:p-8 flex flex-col bg-[#D81B60] text-white'
                        : 'relative rounded-3xl p-7 sm:p-8 flex flex-col bg-white border border-stone-200'
                    }
                  >
                    {destacado && (
                      <span className="absolute -top-3 left-7 sm:left-8 bg-white text-[#D81B60] px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider shadow-sm">
                        Más solicitado
                      </span>
                    )}

                    <div className="mb-7">
                      <p
                        className={
                          destacado
                            ? 'text-white/60 text-xs uppercase tracking-[0.2em] mb-2'
                            : 'text-stone-500 text-xs uppercase tracking-[0.2em] mb-2'
                        }
                      >
                        Caja
                      </p>
                      <h3
                        className={
                          destacado
                            ? 'text-2xl sm:text-3xl font-semibold text-white mb-3'
                            : 'text-2xl sm:text-3xl font-semibold text-stone-900 mb-3'
                        }
                      >
                        {p.nombre}
                      </h3>
                      <p
                        className={
                          destacado
                            ? 'text-3xl sm:text-4xl font-bold text-white'
                            : 'text-3xl sm:text-4xl font-bold text-stone-900'
                        }
                      >
                        {p.precioLabel}
                        <span
                          className={
                            destacado
                              ? 'text-sm font-normal text-white/70 ml-1.5'
                              : 'text-sm font-normal text-stone-500 ml-1.5'
                          }
                        >
                          {p.sufijoPrecio}
                        </span>
                      </p>
                      <p
                        className={
                          destacado
                            ? 'text-xs text-white/70 mt-1'
                            : 'text-xs text-stone-500 mt-1'
                        }
                      >
                        Pedido mínimo 10 unidades
                      </p>
                      <p
                        className={
                          destacado
                            ? 'text-sm leading-relaxed text-white/85 mt-4'
                            : 'text-sm leading-relaxed text-stone-600 mt-4'
                        }
                      >
                        {p.descripcion}
                      </p>
                    </div>

                    <div
                      className={
                        destacado
                          ? 'h-px bg-white/25 mb-7'
                          : 'h-px bg-stone-200 mb-7'
                      }
                    />

                    <ul className="space-y-3 mb-8 flex-1">
                      {p.incluye.map((item) => (
                        <li
                          key={item}
                          className={
                            destacado
                              ? 'flex items-start gap-3 text-sm text-white/95 leading-relaxed'
                              : 'flex items-start gap-3 text-sm text-stone-700 leading-relaxed'
                          }
                        >
                          <ICONS.check
                            className={
                              destacado
                                ? 'w-4 h-4 mt-0.5 text-white flex-shrink-0'
                                : 'w-4 h-4 mt-0.5 text-[#D81B60] flex-shrink-0'
                            }
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      id={p.ctaId}
                      href={waUrl(p.waMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        destacado
                          ? 'inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-full font-semibold text-sm bg-white text-[#D81B60] hover:bg-stone-50 transition-colors duration-200'
                          : 'inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-full font-semibold text-sm border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-colors duration-200'
                      }
                      aria-label={`Cotizar caja ${p.nombre} por WhatsApp`}
                    >
                      Cotizar esta caja
                      <ICONS.arrow className="w-4 h-4" />
                    </a>
                  </article>
                );
              })}
            </div>

            <p className="mt-10 text-sm text-stone-500 max-w-3xl leading-relaxed">
              ¿Necesitas más de 100 unidades, sabores específicos o un combo distinto? Escríbenos y armamos una propuesta a medida.
            </p>
          </div>
        </section>

        {/* ============================================================== */}
        {/* TIPOS DE EVENTO                                                 */}
        {/* ============================================================== */}
        <section
          data-section="refrigerios-eventos"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-[#FBF7F4]"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                Para qué eventos
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-10 sm:mb-14 max-w-3xl">
                Empresas que ya pidieron con nosotros
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {TIPOS_EVENTO.map((tipo) => (
                <div
                  key={tipo}
                  className="flex items-center gap-2.5 bg-white border border-stone-200 rounded-xl px-4 py-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D81B60] flex-shrink-0" />
                  <span className="text-sm text-stone-800 font-medium">{tipo}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* COBERTURA Y TRANSPORTE                                          */}
        {/* ============================================================== */}
        <section
          data-section="refrigerios-cobertura"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-white border-y border-stone-200"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                Entregas
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4 max-w-3xl">
                Te llevamos los refrigerios listos
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 mt-8 sm:mt-12">
              <ScrollReveal direction="up" delay={0.1}>
                <div className="bg-[#FBF7F4] border border-stone-200 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <ICONS.mapa className="w-6 h-6 text-[#D81B60]" />
                    <h3 className="text-lg sm:text-xl font-semibold text-stone-900">
                      Zona cercana — entrega sin costo extra
                    </h3>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed mb-5">
                    Entregamos sin costo adicional en estas zonas del Valle de Aburrá:
                  </p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-stone-800">
                    {[
                      'Medellín',
                      'El Poblado',
                      'Laureles',
                      'Belén',
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
                <div className="bg-[#FBF7F4] border border-stone-200 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <ICONS.mapa className="w-6 h-6 text-stone-500" />
                    <h3 className="text-lg sm:text-xl font-semibold text-stone-900">
                      Zona lejana — entrega con valor adicional
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
                      'Sitios fuera del Valle',
                    ].map((zona) => (
                      <li key={zona} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-stone-400" />
                        {zona}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-xs text-stone-500 leading-relaxed">
                    Te confirmamos el valor exacto del transporte antes de cerrar el pedido.
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
          data-section="refrigerios-proceso"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-[#FBF7F4]"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                Proceso
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4 max-w-3xl">
                Así pides los refrigerios
              </h2>
            </ScrollReveal>

            <ol className="mt-10 sm:mt-14 space-y-8 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-8 sm:gap-y-12 relative">
              {[
                {
                  step: '01',
                  title: 'Cotización por WhatsApp',
                  body: 'Cuéntanos fecha, hora de entrega, cantidad de personas y caja que te interesa.',
                },
                {
                  step: '02',
                  title: 'Confirmamos opciones',
                  body: 'Te enviamos sabores disponibles, opciones vegetarianas y la cotización final con o sin factura.',
                },
                {
                  step: '03',
                  title: 'Reserva con 50%',
                  body: 'Confirmamos el pedido con un abono del 50%. Aceptamos Nequi, Daviplata, transferencia y factura.',
                },
                {
                  step: '04',
                  title: 'Entrega en hora',
                  body: 'Llevamos las cajas listas al sitio del evento a la hora pactada. Saldo contra entrega.',
                },
              ].map((s) => (
                <li key={s.step} className="relative">
                  <p className="font-script text-3xl sm:text-4xl text-[#D81B60] mb-3 leading-none">
                    {s.step}
                  </p>
                  <h3 className="text-base sm:text-lg font-semibold text-stone-900 mb-2 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============================================================== */}
        {/* FAQ                                                             */}
        {/* ============================================================== */}
        <section
          data-section="refrigerios-faq"
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
          data-section="refrigerios-cta-final"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-[#D81B60] text-white"
        >
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="down">
              <p className="font-script text-white/90 text-2xl sm:text-3xl mb-4">
                ¿Tienes un evento próximo?
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-5">
                Cotiza los refrigerios hoy
              </h2>
              <p className="text-white/85 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
                Escríbenos por WhatsApp con fecha, hora de entrega y cantidad de personas. Te respondemos el mismo día con opciones y precio final.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <a
                id="refrigerios-cta-final"
                href={waUrl(
                  'Hola Vane, necesito cotizar refrigerios para un evento de mi empresa en Medellín. La fecha es ____, la hora de entrega ____ y somos ____ personas. ¿Me ayudan?'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white text-[#D81B60] hover:bg-stone-50 px-8 py-4 rounded-full font-semibold text-base transition-colors duration-200"
                aria-label="Cotizar refrigerios empresariales por WhatsApp"
              >
                <ICONS.whatsapp className="w-5 h-5 text-[#25D366]" />
                Escribir por WhatsApp
              </a>
            </ScrollReveal>

            <ScrollReveal direction="fade" delay={0.4}>
              <p className="mt-8 text-sm text-white/75">
                También puedes ver{' '}
                <Link href="/refrigerios" className="text-white underline decoration-white/40 hover:decoration-white">
                  todos los refrigerios del catálogo
                </Link>
                {' '}o{' '}
                <Link href="/decoraciones" className="text-white underline decoration-white/40 hover:decoration-white">
                  decoración para eventos
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
