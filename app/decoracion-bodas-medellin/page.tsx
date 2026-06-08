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
 * Landing transaccional #1 (GSC pos 56 → top 10).
 *
 * Reglas de la landing (canon para las siguientes):
 *  1. Vocabulario REAL de Creaciones Vane:
 *     - "aros con forros" (no "arco nupcial")
 *     - "backings de madera con forros" (no "backdrop")
 *     - "cilindros" / "cilindros de madera" / "mesas reloj" (no "centros de mesa")
 *  2. NO menciones a comida o digestibles: ni mesa dulce, ni catering, ni bebidas.
 *     Las invitaciones SÍ son un valor agregado real.
 *  3. Flores: disponibilidad y cotización aparte.
 *  4. Transporte: incluido en zona cercana; lejanías (ej. Copacabana, Caldas,
 *     Barbosa, Girardota, fincas fuera del Valle) se cotizan según la ruta.
 *  5. Diseño: editorial, sin gradientes, sin emojis. SVGs lineales propios.
 *     Mobile-first agresivo.
 */

const PAGE_PATH = '/decoracion-bodas-medellin';
const PAGE_URL = `${BUSINESS.url}${PAGE_PATH}`;

export const metadata: Metadata = pageMetadata({
  title:
    'Decoración para Bodas en Medellín | Aros con Forros, Backings y Cilindros',
  description: `Decoración para bodas en Medellín y el Valle de Aburrá: aros con forros, backings de madera, cilindros y mesas reloj. Invitaciones personalizadas opcionales. Desde $480.000. WhatsApp ${BUSINESS.phoneDisplay}.`,
  path: PAGE_PATH,
  ogImage: `${BUSINESS.url}/images/decoracionesBoda.webp`,
  keywords: [
    'decoración bodas medellín',
    'decoración boda medellín',
    'decoración matrimonio medellín',
    'aros con forros bodas medellín',
    'backing de madera bodas medellín',
    'cilindros decoración medellín',
    'mesas reloj boda medellín',
    'decoración bodas el poblado',
    'decoración bodas envigado',
    'decoración bodas sabaneta',
    'decoración bodas campestres medellín',
    'decoración bodas pequeñas medellín',
    'decoración bodas civiles medellín',
    'invitaciones bodas medellín',
    'paquetes decoración bodas medellín',
    'cotización decoración boda medellín',
    'montaje boda medellín',
    'decoración boda económica medellín',
    'precio decoración boda medellín',
  ],
});

const PAQUETES = [
  {
    id: 'esencial',
    nombre: 'Esencial',
    precio: 480_000,
    precioLabel: '$480.000',
    descripcion:
      'Para bodas íntimas y celebraciones civiles. Foco en el punto central de la ceremonia y la mesa de bienvenida.',
    incluye: [
      '1 aro con forro decorativo en tu paleta',
      '1 backing de madera con forro temático',
      '4 cilindros decorativos',
      '1 mesa reloj para libro de firmas',
      'Montaje y desmontaje en zona cercana',
    ],
    ctaId: 'bodas-paquete-esencial',
    waMessage:
      '¡Hola! Quiero cotizar el paquete Esencial de decoración de boda. ¿Me confirmas disponibilidad?',
  },
  {
    id: 'premium',
    nombre: 'Premium',
    precio: 650_000,
    precioLabel: '$650.000',
    destacado: true,
    descripcion:
      'Nuestro paquete más solicitado. Cobertura completa del salón principal y zonas de fotos.',
    incluye: [
      '2 aros con forros personalizados',
      'Backing de madera con forros y nombres de los novios',
      '6 cilindros + 2 cilindros de madera',
      'Mesa reloj para libro de firmas y mesa de bienvenida',
      'Iluminación LED cálida en zona principal',
      'Invitaciones digitales personalizadas',
      'Montaje y desmontaje en zona cercana',
    ],
    ctaId: 'bodas-paquete-premium',
    waMessage:
      '¡Hola! Quiero cotizar el paquete Premium de decoración de boda. ¿Me confirmas disponibilidad?',
  },
  {
    id: 'lujo',
    nombre: 'Lujo',
    precio: null,
    precioLabel: 'Cotización personalizada',
    descripcion:
      'Para bodas de gran formato o locaciones campestres. Diseño 100% a medida según tu paleta y temática.',
    incluye: [
      'Diseño exclusivo con mood board previo',
      'Aros XL con forros premium',
      'Múltiples backings de madera con forros',
      'Cilindros y cilindros de madera en cantidad libre',
      'Mesa reloj principal + zona de bienvenida completa',
      'Iluminación profesional + números o letras luminosas',
      'Invitaciones personalizadas premium (digitales o impresas)',
      'Cotización de transporte según la locación',
    ],
    ctaId: 'bodas-paquete-lujo',
    waMessage:
      '¡Hola! Quiero cotizar el paquete Lujo de decoración de boda. Te cuento fecha, locación y cantidad de invitados.',
  },
] as const;

const FAQS = [
  {
    q: '¿Cuánto cuesta decorar una boda en Medellín?',
    a: 'Nuestros paquetes van desde $480.000 COP (Esencial, para bodas íntimas) hasta $650.000 COP (Premium, el más solicitado). El paquete Lujo se cotiza a medida según locación, cantidad de invitados y montaje requerido. Los precios incluyen aros con forros, backings de madera, cilindros y mesas reloj. El transporte está incluido en zona cercana del Valle de Aburrá; locaciones lejanas se cotizan aparte.',
  },
  {
    q: '¿Qué incluye exactamente la decoración?',
    a: 'Trabajamos con aros con forros, backings de madera con forros temáticos, cilindros decorativos, cilindros de madera y mesas reloj. Cada paquete incluye el diseño, transporte en zona cercana, montaje y desmontaje. Las flores naturales y los arreglos florales se cotizan aparte según disponibilidad de proveedores.',
  },
  {
    q: '¿Cómo funciona el transporte? ¿Cubren todo el Valle de Aburrá?',
    a: 'El transporte está incluido en zonas cercanas (Medellín, El Poblado, Laureles, Belén, Envigado, Sabaneta, Itagüí). Para destinos lejanos (Copacabana, Caldas, Barbosa, Girardota o fincas fuera del Valle) cotizamos un adicional según la distancia y el tiempo de montaje. Te confirmamos el valor exacto antes de reservar.',
  },
  {
    q: '¿Hacen también las invitaciones de la boda?',
    a: 'Sí. Las invitaciones digitales personalizadas vienen incluidas en el paquete Premium y son opcionales en Esencial con un valor adicional. En el paquete Lujo puedes elegir entre invitaciones digitales o impresas premium.',
  },
  {
    q: '¿Las flores naturales están incluidas?',
    a: 'No. Las flores naturales se manejan según la disponibilidad del proveedor y se cotizan aparte. Si las quieres incluir, te enviamos la cotización adicional una vez confirmes paquete, fecha y paleta para coordinar el pedido floral.',
  },
  {
    q: '¿Con cuánta anticipación debo reservar?',
    a: 'Recomendamos reservar con 4 a 8 semanas de anticipación para asegurar la fecha y los materiales en tu paleta. Para bodas en diciembre, enero, mayo y junio sugerimos mínimo 8 semanas porque son meses de alta demanda.',
  },
  {
    q: '¿Decoran bodas al aire libre y en fincas?',
    a: 'Sí. Tenemos experiencia decorando bodas campestres, en fincas, jardines y terrazas. Para eventos al aire libre reforzamos las estructuras y coordinamos plan de contingencia por clima. Si la finca está fuera del Valle de Aburrá, cotizamos transporte adicional según la ruta.',
  },
  {
    q: '¿Puedo elegir mis propios colores y temática?',
    a: 'Por supuesto. Adaptamos cualquier paquete a tu paleta de colores y estilo (clásica, vintage, boho, minimalista, romántica). Te enviamos un mood board personalizado antes del montaje para que apruebes el diseño final.',
  },
  {
    q: '¿Cómo se reserva la fecha?',
    a: 'Confirmamos la fecha con un abono del 50% del valor del paquete. El saldo restante se cancela el día del montaje. Aceptamos Nequi, Daviplata, transferencia bancaria y efectivo.',
  },
];

/**
 * Iconos SVG lineales propios. Estilo editorial: stroke 1.5, sin fill,
 * mismo viewBox 24×24. Color heredado vía currentColor.
 */
type IconProps = { className?: string };
const ICONS = {
  aro: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.5" strokeDasharray="2 2" />
    </svg>
  ),
  backing: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="4" y="4" width="16" height="14" rx="1.5" />
      <path d="M8 4v14M12 4v14M16 4v14" />
      <path d="M6 21h12" />
    </svg>
  ),
  cilindro: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <ellipse cx="12" cy="5" rx="6" ry="2" />
      <path d="M6 5v14" />
      <path d="M18 5v14" />
      <ellipse cx="12" cy="19" rx="6" ry="2" />
    </svg>
  ),
  mesaReloj: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M7 3h10" />
      <path d="M7 21h10" />
      <path d="M7 3c0 4 5 5 5 9s-5 5-5 9" />
      <path d="M17 3c0 4-5 5-5 9s5 5 5 9" />
    </svg>
  ),
  invitacion: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
  luz: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 00-3.5 10.9V16h7v-2.1A6 6 0 0012 3z" />
    </svg>
  ),
  montaje: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M14.7 6.3a4 4 0 00-5.4 5.4l-6 6 2 2 6-6a4 4 0 005.4-5.4l-2.5 2.5-2-2 2.5-2.5z" />
    </svg>
  ),
  paleta: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 3a9 9 0 100 18 3 3 0 002.8-4.1 1.6 1.6 0 011.5-2.2H18a4 4 0 004-4 9 9 0 00-10-7.7z" />
      <circle cx="7.5" cy="11.5" r="1" fill="currentColor" />
      <circle cx="10" cy="7.5" r="1" fill="currentColor" />
      <circle cx="14.5" cy="7" r="1" fill="currentColor" />
      <circle cx="17" cy="11" r="1" fill="currentColor" />
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
    Icon: ICONS.aro,
    title: 'Aros con forros',
    body: 'Aros decorativos con forros en tu paleta de colores como punto focal del salón o de la ceremonia.',
  },
  {
    Icon: ICONS.backing,
    title: 'Backings de madera',
    body: 'Backings de madera con forros personalizados. Ideales para zona de fotos o para identificar a los novios.',
  },
  {
    Icon: ICONS.cilindro,
    title: 'Cilindros y cilindros de madera',
    body: 'Combinaciones de cilindros decorativos y cilindros de madera para crear volumen y juegos de altura.',
  },
  {
    Icon: ICONS.mesaReloj,
    title: 'Mesas reloj',
    body: 'Mesas reloj para libro de firmas, mesa de bienvenida o estación principal de la celebración.',
  },
  {
    Icon: ICONS.invitacion,
    title: 'Invitaciones personalizadas',
    body: 'Diseño de invitaciones digitales con tus datos, paleta y estilo. Opción de invitaciones impresas como adicional.',
  },
  {
    Icon: ICONS.luz,
    title: 'Iluminación decorativa',
    body: 'Iluminación LED cálida en zonas clave. En el paquete Lujo añadimos números o letras luminosas.',
  },
  {
    Icon: ICONS.montaje,
    title: 'Montaje y desmontaje',
    body: 'Llegamos con tiempo a la locación, hacemos el montaje y retiramos todo al cierre del evento.',
  },
  {
    Icon: ICONS.paleta,
    title: 'Mood board previo',
    body: 'Antes del montaje te enviamos una propuesta visual con paleta, materiales y referencias para que la apruebes.',
  },
];

export default function DecoracionBodasMedellinPage() {
  /**
   * LocalBusiness propio de la landing. parentOrganization vía @id evita
   * duplicar el NAP canónico declarado en layout.tsx.
   */
  const jsonLdLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${PAGE_URL}#localbusiness`,
    name: 'Creaciones Vane — Decoración para Bodas en Medellín',
    description:
      'Servicio de decoración para bodas en Medellín y el Valle de Aburrá: aros con forros, backings de madera, cilindros y mesas reloj. Invitaciones personalizadas como valor adicional. Desde $480.000 COP.',
    url: PAGE_URL,
    telephone: BUSINESS.phoneE164,
    priceRange: '$$-$$$',
    image: [
      `${BUSINESS.url}/images/decoracionesBoda.webp`,
      `${BUSINESS.url}/logo-decoraciones.jpeg`,
    ],
    address: postalAddress(),
    geo: geoCoordinates(),
    openingHoursSpecification: openingHoursSpec(),
    parentOrganization: { '@id': `${BUSINESS.url}/#organization` },
    areaServed: [
      { '@type': 'City', name: 'Medellín' },
      { '@type': 'Place', name: 'El Poblado' },
      { '@type': 'Place', name: 'Laureles' },
      { '@type': 'City', name: 'Envigado' },
      { '@type': 'City', name: 'Sabaneta' },
      { '@type': 'City', name: 'Itagüí' },
      { '@type': 'City', name: 'Bello' },
      { '@type': 'City', name: 'La Estrella' },
    ],
  };

  const jsonLdService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${PAGE_URL}#service`,
    serviceType: 'Decoración para Bodas',
    name: 'Decoración para Bodas en Medellín',
    description:
      'Decoración para bodas con aros con forros, backings de madera, cilindros, cilindros de madera y mesas reloj. Invitaciones personalizadas opcionales. Montaje y desmontaje en el Valle de Aburrá.',
    provider: { '@id': `${BUSINESS.url}/#organization` },
    areaServed: { '@type': 'City', name: 'Medellín' },
    category: 'Wedding Decoration',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Paquetes de Decoración de Bodas',
      itemListElement: PAQUETES.filter((p) => p.precio !== null).map((p) => ({
        '@type': 'Offer',
        name: `Paquete ${p.nombre} — Decoración de Boda`,
        description: p.descripcion,
        priceCurrency: 'COP',
        price: p.precio,
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
    { name: 'Decoración de Eventos', url: `${BUSINESS.url}/decoraciones` },
    { name: 'Decoración para Bodas en Medellín', url: PAGE_URL },
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
          data-section="bodas-hero"
          className="relative isolate min-h-[78svh] flex items-end overflow-hidden"
          aria-label="Decoración para bodas en Medellín"
        >
          {/*
            Imagen del hero. Convención de nombres para landings:
            /images/decoracionesX.webp (X = evento, ej: decoracionesBoda).
            El archivo se guarda en /public/images/ — Next no rompe si aún no
            existe, solo renderiza alt + overlay hasta que se suba.
          */}
          <Image
            src="/images/decoracionesBoda.webp"
            alt="Decoración de boda en Medellín con aros con forros, backings de madera y cilindros"
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
                  Decoración para bodas en Medellín
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <p className="text-white/85 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-7 sm:mb-9">
                  Aros con forros, backings de madera, cilindros y mesas reloj. Diseñamos tu boda con tu paleta y la montamos en el Valle de Aburrá.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center max-w-md sm:max-w-none">
                  <a
                    id="bodas-hero-cta"
                    href={waUrl(
                      'Hola Vane, quiero cotizar la decoración para mi boda en Medellín. ¿Me cuentan los paquetes y disponibilidad?'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-white text-stone-900 hover:bg-stone-100 px-7 py-4 rounded-full font-semibold text-base transition-colors duration-200"
                    aria-label="Cotizar decoración de boda por WhatsApp"
                  >
                    <ICONS.whatsapp className="w-5 h-5 text-[#25D366]" />
                    Cotizar por WhatsApp
                  </a>
                  <a
                    href="#paquetes"
                    className="inline-flex items-center justify-center gap-2 border border-white/40 text-white hover:bg-white/10 px-7 py-4 rounded-full font-medium text-base transition-colors duration-200"
                  >
                    Ver paquetes y precios
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="fade" delay={0.6}>
                <div className="mt-10 sm:mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 text-white/80 text-sm">
                  <span className="flex items-center gap-2">
                    <ICONS.check className="w-4 h-4" />
                    Desde 2019 decorando momentos
                  </span>
                  <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/40" />
                  <span className="flex items-center gap-2">
                    <ICONS.check className="w-4 h-4" />
                    Reserva con 50% de abono
                  </span>
                  <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/40" />
                  <span className="flex items-center gap-2">
                    <ICONS.check className="w-4 h-4" />
                    Mood board antes del montaje
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
          data-section="bodas-incluye"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-[#FBF7F4]"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                Qué incluye
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4 max-w-3xl">
                Tu boda decorada de principio a fin
              </h2>
              <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 sm:mb-14">
                Llevamos todos los elementos que ves abajo, los montamos antes del evento y los retiramos al cierre. Tú solo te ocupas del &quot;sí, acepto&quot;.
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

            <p className="mt-8 text-xs sm:text-sm text-stone-500 max-w-3xl leading-relaxed">
              <strong className="text-stone-700">Flores naturales:</strong> no están incluidas en los paquetes. Se cotizan aparte según disponibilidad del proveedor floral y la paleta que elijas.
            </p>
          </div>
        </section>

        {/* ============================================================== */}
        {/* PAQUETES                                                        */}
        {/* ============================================================== */}
        <section
          id="paquetes"
          data-section="bodas-paquetes"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-white border-y border-stone-200"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                Paquetes
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4 max-w-3xl">
                Tres formas de empezar
              </h2>
              <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 sm:mb-14">
                Todos los paquetes incluyen montaje y desmontaje en zona cercana del Valle de Aburrá. Locaciones lejanas se cotizan aparte.
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
                        Paquete
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
                        {p.precio !== null && (
                          <span
                            className={
                              destacado
                                ? 'text-sm font-normal text-white/60 ml-1.5'
                                : 'text-sm font-normal text-stone-500 ml-1.5'
                            }
                          >
                            COP
                          </span>
                        )}
                      </p>
                      <p
                        className={
                          destacado
                            ? 'text-sm leading-relaxed text-white/75 mt-4'
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
                              ? 'flex items-start gap-3 text-sm text-white/90 leading-relaxed'
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
                      aria-label={`Cotizar paquete ${p.nombre} por WhatsApp`}
                    >
                      Cotizar este paquete
                      <ICONS.arrow className="w-4 h-4" />
                    </a>
                  </article>
                );
              })}
            </div>

            <p className="mt-10 text-sm text-stone-500 max-w-3xl leading-relaxed">
              ¿Necesitas algo distinto? Personalizamos cualquier paquete a tu paleta, locación y temática. Escríbenos y armamos una propuesta exclusiva.
            </p>
          </div>
        </section>

        {/* ============================================================== */}
        {/* COBERTURA Y TRANSPORTE                                          */}
        {/* ============================================================== */}
        <section
          data-section="bodas-cobertura"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-[#FBF7F4]"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                Cobertura
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4 max-w-3xl">
                Vamos hasta tu locación
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 mt-8 sm:mt-12">
              <ScrollReveal direction="up" delay={0.1}>
                <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <ICONS.mapa className="w-6 h-6 text-[#D81B60]" />
                    <h3 className="text-lg sm:text-xl font-semibold text-stone-900">
                      Zona cercana — transporte incluido
                    </h3>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed mb-5">
                    El transporte está incluido en estas zonas del Valle de Aburrá:
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
                <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <ICONS.mapa className="w-6 h-6 text-stone-500" />
                    <h3 className="text-lg sm:text-xl font-semibold text-stone-900">
                      Zona lejana — transporte se cotiza
                    </h3>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed mb-5">
                    En estas zonas y en fincas fuera del Valle de Aburrá cotizamos un adicional según la distancia y el tiempo de montaje:
                  </p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-stone-800">
                    {[
                      'La Estrella',
                      'Caldas',
                      'Copacabana',
                      'Girardota',
                      'Barbosa',
                      'Fincas y locaciones campestres',
                    ].map((zona) => (
                      <li key={zona} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-stone-400" />
                        {zona}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-xs text-stone-500 leading-relaxed">
                    Te confirmamos el valor exacto del transporte antes de reservar la fecha.
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
          data-section="bodas-proceso"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-white border-y border-stone-200"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                Proceso
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4 max-w-3xl">
                Así reservamos tu boda
              </h2>
            </ScrollReveal>

            <ol className="mt-10 sm:mt-14 space-y-8 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-8 sm:gap-y-12 relative">
              {[
                {
                  step: '01',
                  title: 'Cotización por WhatsApp',
                  body: 'Cuéntanos fecha, locación, cantidad de invitados y el paquete que te interesa.',
                },
                {
                  step: '02',
                  title: 'Mood board',
                  body: 'Te enviamos paleta, materiales y referencias visuales para que apruebes el diseño.',
                },
                {
                  step: '03',
                  title: 'Reserva con 50%',
                  body: 'Aseguramos tu fecha. Aceptamos Nequi, Daviplata, transferencia y efectivo.',
                },
                {
                  step: '04',
                  title: 'Montaje y desmontaje',
                  body: 'Llegamos a la locación con tiempo, montamos todo y retiramos al cierre.',
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
          data-section="bodas-faq"
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
                <details
                  key={idx}
                  className="group"
                >
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
          data-section="bodas-cta-final"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-[#D81B60] text-white"
        >
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="down">
              <p className="font-script text-white/90 text-2xl sm:text-3xl mb-4">
                ¿Lista para empezar?
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-5">
                Diseñemos tu boda juntas
              </h2>
              <p className="text-white/85 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
                Escríbenos por WhatsApp con tu fecha tentativa y locación. Te respondemos el mismo día con paquetes y disponibilidad.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <a
                id="bodas-cta-final"
                href={waUrl(
                  'Hola Vane, estoy organizando mi boda en Medellín. Mi fecha tentativa es ____ y la locación es ____. ¿Me ayudan con la cotización?'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white text-[#D81B60] hover:bg-stone-50 px-8 py-4 rounded-full font-semibold text-base transition-colors duration-200"
                aria-label="Cotizar decoración de boda por WhatsApp"
              >
                <ICONS.whatsapp className="w-5 h-5 text-[#25D366]" />
                Escribir por WhatsApp
              </a>
            </ScrollReveal>

            <ScrollReveal direction="fade" delay={0.4}>
              <p className="mt-8 text-sm text-white/75">
                También puedes ver{' '}
                <Link href="/decoraciones" className="text-white underline decoration-white/40 hover:decoration-white">
                  decoraciones para otros eventos
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
