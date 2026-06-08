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
 * Landing transaccional #2 (GSC pos 5.17 → top 3).
 *
 * Hereda canon de /decoracion-bodas-medellin:
 *  - Vocabulario real: aros con forros, backings de madera, cilindros,
 *    cilindros de madera, mesas reloj.
 *  - Sin digestibles. Invitaciones SÍ como valor agregado.
 *  - Flores aparte. Transporte: cercano incluido, lejano se cotiza.
 *  - Sin gradientes, sin emojis. SVGs lineales.
 *  - Fucsia marca #D81B60 como destacado (nunca negro/stone-900).
 *  - Hero image: /images/decoracionesPrimeraComunion.webp (pendiente subir).
 */

const PAGE_PATH = '/decoracion-primera-comunion-medellin';
const PAGE_URL = `${BUSINESS.url}${PAGE_PATH}`;

export const metadata: Metadata = pageMetadata({
  title:
    'Decoración para Primera Comunión en Medellín | Aros, Backings y Mesas Reloj',
  description: `Decoración para primera comunión en Medellín y el Valle de Aburrá. Aros con forros, backings de madera con el nombre del niño, cilindros y mesa de bienvenida. Desde $320.000. WhatsApp ${BUSINESS.phoneDisplay}.`,
  path: PAGE_PATH,
  ogImage: `${BUSINESS.url}/images/decoracionesPrimeraComunion.webp`,
  keywords: [
    'decoración primera comunión medellín',
    'decoración primeras comuniones medellín',
    'decoración comunión medellín',
    'decoración primera comunión niño medellín',
    'decoración primera comunión niña medellín',
    'aros con forros primera comunión medellín',
    'backing primera comunión medellín',
    'mesa de bienvenida comunión medellín',
    'decoración comunión salón parroquial medellín',
    'decoración primera comunión el poblado',
    'decoración primera comunión envigado',
    'decoración primera comunión sabaneta',
    'decoración primera comunión laureles',
    'decoración primera comunión belén',
    'decoración primera comunión itagüí',
    'invitaciones primera comunión medellín',
    'paquetes decoración primera comunión medellín',
    'cotización decoración primera comunión medellín',
    'precio decoración primera comunión medellín',
    'decoración primera comunión económica medellín',
    'decoración primera comunión paleta dorada medellín',
    'decoración primera comunión paleta celeste medellín',
  ],
});

const PAQUETES = [
  {
    id: 'esencial',
    nombre: 'Esencial',
    precio: 320_000,
    precioLabel: '$320.000',
    descripcion:
      'Para celebraciones íntimas en casa o salón social. Foco en la mesa de bienvenida y un punto de fotos.',
    incluye: [
      '1 aro con forro decorativo en tu paleta',
      '1 backing de madera con forro temático',
      '3 cilindros decorativos',
      '1 mesa reloj con letrero del nombre',
      'Montaje y desmontaje en zona cercana',
    ],
    ctaId: 'comunion-paquete-esencial',
    waMessage:
      '¡Hola! Quiero cotizar el paquete Esencial de decoración para primera comunión. ¿Me confirmas disponibilidad?',
  },
  {
    id: 'premium',
    nombre: 'Premium',
    precio: 480_000,
    precioLabel: '$480.000',
    destacado: true,
    descripcion:
      'Nuestro paquete más solicitado. Cubre mesa de bienvenida, zona de fotos y punto central del salón.',
    incluye: [
      '2 aros con forros personalizados',
      'Backing de madera con forros y nombre del niño o niña',
      '4 cilindros + 2 cilindros de madera',
      'Mesa reloj de bienvenida + zona de fotos',
      'Iluminación LED cálida en zona principal',
      'Invitaciones digitales personalizadas',
      'Montaje y desmontaje en zona cercana',
    ],
    ctaId: 'comunion-paquete-premium',
    waMessage:
      '¡Hola! Quiero cotizar el paquete Premium de decoración para primera comunión. ¿Me confirmas disponibilidad?',
  },
  {
    id: 'lujo',
    nombre: 'Lujo',
    precio: null,
    precioLabel: 'Cotización personalizada',
    descripcion:
      'Para comuniones de gran formato o doble comunión (hermanos). Diseño 100% a medida.',
    incluye: [
      'Diseño exclusivo con mood board previo',
      'Aros XL con forros premium',
      'Múltiples backings de madera con motivos personalizados',
      'Cilindros y cilindros de madera en cantidad libre',
      'Mesa reloj principal + zona de fotos + mesa de recordatorios',
      'Iluminación profesional + letras luminosas con el nombre',
      'Invitaciones personalizadas premium (digitales o impresas)',
      'Cotización de transporte según la locación',
    ],
    ctaId: 'comunion-paquete-lujo',
    waMessage:
      '¡Hola! Quiero cotizar el paquete Lujo de decoración para primera comunión. Te cuento fecha, locación y cantidad de invitados.',
  },
] as const;

const FAQS = [
  {
    q: '¿Cuánto cuesta decorar una primera comunión en Medellín?',
    a: 'Los paquetes van desde $320.000 COP (Esencial, para celebraciones íntimas) hasta $480.000 COP (Premium, el más solicitado). El paquete Lujo se cotiza a medida según locación, cantidad de invitados y si se decora una o varias sedes (parroquia y salón). Todos los precios incluyen aros con forros, backings de madera, cilindros y mesa reloj. El transporte está incluido en zona cercana del Valle de Aburrá; locaciones lejanas se cotizan aparte.',
  },
  {
    q: '¿Qué incluye exactamente la decoración?',
    a: 'Trabajamos con aros con forros, backings de madera con el nombre del niño o niña, cilindros decorativos, cilindros de madera y mesa reloj para la zona de bienvenida. Cada paquete incluye el diseño, transporte en zona cercana, montaje y desmontaje. Las flores naturales se cotizan aparte según disponibilidad del proveedor.',
  },
  {
    q: '¿Decoran en la parroquia, el salón social y la casa?',
    a: 'Sí. Podemos decorar el salón donde se hace la recepción (salón parroquial, salón social del edificio, casa familiar o salón de eventos). Si necesitas decorar la parroquia y el salón el mismo día, se cotiza como dos sedes y aplica un valor adicional por logística y transporte entre ubicaciones.',
  },
  {
    q: '¿Hacen las invitaciones de primera comunión?',
    a: 'Sí. Las invitaciones digitales personalizadas vienen incluidas en el paquete Premium y son opcionales en Esencial con un valor adicional. En el paquete Lujo puedes elegir entre invitaciones digitales o impresas premium con el nombre del niño o niña y los datos del evento.',
  },
  {
    q: '¿Las flores naturales están incluidas?',
    a: 'No. Las flores naturales se manejan según disponibilidad del proveedor y se cotizan aparte. Si las quieres incluir, te enviamos la cotización adicional una vez confirmes paquete, fecha y paleta.',
  },
  {
    q: '¿Con cuánta anticipación debo reservar?',
    a: 'Recomendamos reservar con 4 a 6 semanas de anticipación. En mayo y junio (temporada alta de primeras comuniones en Colombia) sugerimos reservar con 8 semanas para asegurar fecha y materiales en tu paleta.',
  },
  {
    q: '¿Pueden adaptar la decoración a una paleta específica (dorado, celeste, rosa pastel)?',
    a: 'Por supuesto. Adaptamos cualquier paquete a la paleta que elijas: blanco con dorado (clásica), blanco con celeste (niños), blanco con rosa pastel (niñas), o paletas multicolor pastel. Te enviamos un mood board previo para que apruebes el diseño.',
  },
  {
    q: '¿Decoran comuniones de hermanos el mismo día (doble comunión)?',
    a: 'Sí, lo coordinamos en el paquete Lujo con cotización personalizada. Hacemos dos backings (uno por nombre), doble zona de fotos y la mesa de bienvenida ampliada. Te enviamos una propuesta a medida según el espacio y los invitados.',
  },
  {
    q: '¿Cómo se reserva la fecha?',
    a: 'Confirmamos la fecha con un abono del 50% del valor del paquete. El saldo se cancela el día del montaje. Aceptamos Nequi, Daviplata, transferencia bancaria y efectivo.',
  },
];

/**
 * Iconos SVG lineales propios. Mismo set y firma visual que la landing
 * de bodas para mantener consistencia visual de marca.
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
    body: 'Aros decorativos con forros en la paleta que elijas (dorado, celeste, rosa pastel, multicolor) como punto focal del salón.',
  },
  {
    Icon: ICONS.backing,
    title: 'Backings de madera',
    body: 'Backings de madera con forros y el nombre del niño o niña. Perfectos para la zona de fotos del recuerdo.',
  },
  {
    Icon: ICONS.cilindro,
    title: 'Cilindros y cilindros de madera',
    body: 'Cilindros decorativos y de madera para crear volumen y juegos de altura en el montaje.',
  },
  {
    Icon: ICONS.mesaReloj,
    title: 'Mesas reloj',
    body: 'Mesa reloj para zona de bienvenida con letrero, recordatorios o libro de firmas de los invitados.',
  },
  {
    Icon: ICONS.invitacion,
    title: 'Invitaciones personalizadas',
    body: 'Diseño de invitaciones digitales con los datos de la celebración. Opción de invitaciones impresas como adicional.',
  },
  {
    Icon: ICONS.luz,
    title: 'Iluminación decorativa',
    body: 'Iluminación LED cálida en la zona principal. En el paquete Lujo añadimos letras luminosas con el nombre.',
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

export default function DecoracionPrimeraComunionMedellinPage() {
  const jsonLdLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${PAGE_URL}#localbusiness`,
    name: 'Creaciones Vane — Decoración para Primera Comunión en Medellín',
    description:
      'Servicio de decoración para primeras comuniones en Medellín y el Valle de Aburrá: aros con forros, backings de madera con el nombre del niño, cilindros y mesa reloj. Invitaciones personalizadas como valor adicional. Desde $320.000 COP.',
    url: PAGE_URL,
    telephone: BUSINESS.phoneE164,
    priceRange: '$$-$$$',
    image: [
      `${BUSINESS.url}/images/decoracionesPrimeraComunion.webp`,
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
    serviceType: 'Decoración para Primera Comunión',
    name: 'Decoración para Primera Comunión en Medellín',
    description:
      'Decoración para primera comunión con aros con forros, backings de madera con el nombre del niño o niña, cilindros, cilindros de madera y mesa reloj. Invitaciones personalizadas opcionales. Montaje y desmontaje en el Valle de Aburrá.',
    provider: { '@id': `${BUSINESS.url}/#organization` },
    areaServed: { '@type': 'City', name: 'Medellín' },
    category: 'First Communion Decoration',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Paquetes de Decoración para Primera Comunión',
      itemListElement: PAQUETES.filter((p) => p.precio !== null).map((p) => ({
        '@type': 'Offer',
        name: `Paquete ${p.nombre} — Decoración Primera Comunión`,
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
    { name: 'Decoración para Primera Comunión en Medellín', url: PAGE_URL },
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
          data-section="comunion-hero"
          className="relative isolate min-h-[78svh] flex items-end overflow-hidden"
          aria-label="Decoración para primera comunión en Medellín"
        >
          {/*
            Imagen del hero. Convención de nombres para landings:
            /images/decoracionesX.webp (X = evento, ej: decoracionesPrimeraComunion).
            El archivo se guarda en /public/images/ — Next no rompe si aún no
            existe, solo renderiza alt + overlay hasta que se suba.
          */}
          <Image
            src="/images/decoracionesPrimeraComunion.webp"
            alt="Decoración para primera comunión en Medellín con aros con forros, backings de madera y mesa de bienvenida"
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
                  Decoración para primera comunión en Medellín
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <p className="text-white/85 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-7 sm:mb-9">
                  Aros con forros, backings de madera con el nombre, cilindros y mesa de bienvenida. Diseñamos una celebración a la altura del día.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center max-w-md sm:max-w-none">
                  <a
                    id="comunion-hero-cta"
                    href={waUrl(
                      'Hola Vane, quiero cotizar la decoración para la primera comunión. ¿Me cuentan los paquetes y disponibilidad?'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-white text-stone-900 hover:bg-stone-100 px-7 py-4 rounded-full font-semibold text-base transition-colors duration-200"
                    aria-label="Cotizar decoración de primera comunión por WhatsApp"
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
          data-section="comunion-incluye"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-[#FBF7F4]"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                Qué incluye
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4 max-w-3xl">
                Una primera comunión bien decorada
              </h2>
              <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 sm:mb-14">
                Llevamos todo, lo montamos antes del evento y lo retiramos al cierre. Tú solo te ocupas de disfrutar el día.
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
              <strong className="text-stone-700">Flores naturales:</strong> no están incluidas en los paquetes. Se cotizan aparte según disponibilidad del proveedor floral.
            </p>
          </div>
        </section>

        {/* ============================================================== */}
        {/* PAQUETES                                                        */}
        {/* ============================================================== */}
        <section
          id="paquetes"
          data-section="comunion-paquetes"
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
          data-section="comunion-cobertura"
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
                    En estas zonas y en fincas fuera del Valle de Aburrá cotizamos un adicional según distancia y tiempo de montaje:
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
                    Te confirmamos el valor exacto del transporte antes de reservar.
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
          data-section="comunion-proceso"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-white border-y border-stone-200"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                Proceso
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4 max-w-3xl">
                Así reservamos tu primera comunión
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
          data-section="comunion-faq"
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
          data-section="comunion-cta-final"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-[#D81B60] text-white"
        >
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="down">
              <p className="font-script text-white/90 text-2xl sm:text-3xl mb-4">
                ¿Listos para empezar?
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-5">
                Diseñemos la celebración juntos
              </h2>
              <p className="text-white/85 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
                Escríbenos por WhatsApp con la fecha de la primera comunión y la locación. Te respondemos el mismo día.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <a
                id="comunion-cta-final"
                href={waUrl(
                  'Hola Vane, estamos organizando la primera comunión de mi hijo(a) en Medellín. La fecha tentativa es ____ y la locación es ____. ¿Me ayudan con la cotización?'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white text-[#D81B60] hover:bg-stone-50 px-8 py-4 rounded-full font-semibold text-base transition-colors duration-200"
                aria-label="Cotizar decoración de primera comunión por WhatsApp"
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
                {' '}o{' '}
                <Link href="/decoracion-bodas-medellin" className="text-white underline decoration-white/40 hover:decoration-white">
                  decoración para bodas
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
