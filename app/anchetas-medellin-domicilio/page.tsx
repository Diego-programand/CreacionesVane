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
 * Landing transaccional #4 (GSC pos 1, baja impresión → empujar volumen).
 *
 * Reglas heredadas del canon:
 *  - Lenguaje del cliente: "ancheta", "domicilio el mismo día", "detalle",
 *    "regalo sorpresa". Sin anglicismos ni jerga.
 *  - SVGs lineales propios. Sin emojis ni iconos genéricos.
 *  - Sin gradientes. Fucsia marca como destacado.
 *  - Mobile-first agresivo.
 *  - Hero image: /images/anchetasMedellinDomicilio.webp (pendiente subir).
 *
 * Estrategia: ya posicionamos #1 en "anchetas medellín domicilio" pero con
 * muy pocas impresiones. Esta landing apunta a captar long-tail relacionados
 * (ancheta para mamá / aniversario / cumpleaños / amor) y a generar
 * impressions adicionales explotando la autoridad ya conseguida.
 */

const PAGE_PATH = '/anchetas-medellin-domicilio';
const PAGE_URL = `${BUSINESS.url}${PAGE_PATH}`;

export const metadata: Metadata = pageMetadata({
  title:
    'Anchetas a Domicilio en Medellín | Entrega el Mismo Día desde $50.000',
  description: `Anchetas personalizadas con entrega a domicilio el mismo día en Medellín. Desayunos sorpresa, peluches, ramos y chocolates desde $50.000. WhatsApp ${BUSINESS.phoneDisplay}.`,
  path: PAGE_PATH,
  ogImage: `${BUSINESS.url}/images/anchetasMedellinDomicilio.webp`,
  keywords: [
    'anchetas medellín',
    'anchetas medellín domicilio',
    'anchetas domicilio medellín',
    'anchetas a domicilio el mismo día medellín',
    'anchetas personalizadas medellín',
    'anchetas sorpresa medellín',
    'anchetas para mamá medellín',
    'anchetas para esposa medellín',
    'anchetas para novia medellín',
    'anchetas para amiga medellín',
    'anchetas para mi novio medellín',
    'anchetas para esposo medellín',
    'anchetas cumpleaños medellín',
    'anchetas aniversario medellín',
    'anchetas el poblado',
    'anchetas envigado',
    'anchetas sabaneta',
    'anchetas laureles',
    'anchetas belén',
    'anchetas itagüí',
    'anchetas bello',
    'anchetas económicas medellín',
    'anchetas con peluche medellín',
    'anchetas con globos medellín',
    'anchetas con chocolates medellín',
    'anchetas con rosas medellín',
    'desayunos sorpresa a domicilio medellín',
    'detalle sorpresa medellín',
    'regalo sorpresa medellín',
    'cotización ancheta medellín',
  ],
});

const PAQUETES = [
  {
    id: 'detalle',
    nombre: 'Detalle',
    precio: 50_000,
    precioLabel: '$80.000',
    descripcion:
      'Perfecto para sorprender con un gesto bonito sin gastar mucho. Ideal para amigos, compañeros o detalles del día a día.',
    incluye: [
      'Snacks y golosinas variadas',
      'Caja decorada en tu paleta',
      'Tarjeta con mensaje personalizado',
      'Entrega el mismo día en zona cercana',
    ],
    ctaId: 'anchetas-paquete-detalle',
    waMessage:
      '¡Hola! Quiero cotizar una ancheta Detalle a domicilio en Medellín. ¿Para hoy mismo?',
  },
  {
    id: 'clasica',
    nombre: 'Clásica',
    precio: 110_000,
    precioLabel: '$130.000',
    destacado: true,
    descripcion:
      'Nuestra ancheta más solicitada. Suficiente cariño para sorprender de verdad sin pasarse del presupuesto.',
    incluye: [
      'Snacks, chocolates y dulces premium',
      '1 peluche pequeño o ramo de rosas (a elegir)',
      'Globos decorativos en tu paleta',
      'Caja decorada con tarjeta personalizada',
      'Entrega el mismo día en zona cercana',
    ],
    ctaId: 'anchetas-paquete-clasica',
    waMessage:
      '¡Hola! Quiero cotizar una ancheta Clásica a domicilio en Medellín. ¿Para hoy mismo?',
  },
  {
    id: 'sorpresa',
    nombre: 'Sorpresa Completa',
    precio: 180_000,
    precioLabel: '$180.000',
    descripcion:
      'Para esas fechas que sí merecen una sorpresa en grande: aniversarios, cumpleaños número redondo o un gracias especial.',
    incluye: [
      'Selección premium de chocolates y dulces',
      'Peluche grande + ramo de rosas frescas',
      'Globos personalizados y caja de lujo',
      'Tarjeta manuscrita con tu mensaje',
      'Foto de la entrega para confirmarte',
      'Entrega el mismo día en zona cercana',
    ],
    ctaId: 'anchetas-paquete-sorpresa',
    waMessage:
      '¡Hola! Quiero cotizar una ancheta Sorpresa Completa a domicilio en Medellín. Te cuento la fecha y la dirección.',
  },
] as const;

const PARA_QUIEN = [
  'Para mamá',
  'Para tu pareja',
  'Para una amiga',
  'Para un amigo',
  'Para tus papás',
  'Para tus hijos',
  'Para tu jefe o jefa',
  'Para un compañero',
  'Para un cliente',
  'Para alguien que extrañas',
];

const FAQS = [
  {
    q: '¿Cuánto cuesta una ancheta en Medellín?',
    a: 'Las anchetas van desde $80.000 COP (Detalle) hasta $180.000 COP (Sorpresa Completa). La más solicitada es la Clásica de $130.000. Si quieres algo distinto, personalizamos cualquier paquete con tu presupuesto y la persona a quien le vas a regalar.',
  },
  {
    q: '¿Hacen entrega el mismo día?',
    a: 'Sí. Si confirmas tu pedido por WhatsApp antes de las 2:00 PM y estás en zona cercana (Medellín, El Poblado, Laureles, Belén, Envigado, Sabaneta, Itagüí, Bello), tu ancheta llega el mismo día. Para pedidos después de las 2:00 PM coordinamos entrega temprana al día siguiente.',
  },
  {
    q: '¿Qué necesito para hacer el pedido?',
    a: 'Solo nos cuentas: para quién es, qué te gustaría que incluyera, la dirección de entrega, la hora y un mensaje para la tarjeta. Te enviamos opciones y precio. Confirmas con un abono y nosotros nos encargamos de la sorpresa.',
  },
  {
    q: '¿Puedo elegir qué va dentro de la ancheta?',
    a: 'Sí. Cada ancheta es personalizable. Puedes pedir snacks específicos, chocolates en particular, peluche temático (oso, perrito, gato), color de globos, tipo de ramo y mensaje en la tarjeta. Cuéntanos los gustos de la persona y armamos algo único.',
  },
  {
    q: '¿La persona se entera del pedido o es sorpresa?',
    a: 'Es 100% sorpresa. Tú coordinas con nosotros por WhatsApp y nosotros entregamos directamente a la persona en la dirección que nos indiques. Si quieres, te enviamos una foto del momento de la entrega para que veas su reacción.',
  },
  {
    q: '¿En qué zonas hacen entrega?',
    a: 'Entregamos en zona cercana sin costo adicional: Medellín, El Poblado, Laureles, Belén, Envigado, Sabaneta, Itagüí y Bello. En zona lejana (La Estrella, Caldas, Copacabana, Girardota, Barbosa) cobramos un valor adicional por el transporte. Te confirmamos el valor exacto antes de cerrar el pedido.',
  },
  {
    q: '¿Hacen anchetas para hombres también?',
    a: 'Por supuesto. Ajustamos snacks, paleta de colores, peluches y mensaje según la persona. Tenemos opciones populares para esposos, novios, papás, amigos, jefes y compañeros de trabajo.',
  },
  {
    q: '¿Puedo programar la entrega para una fecha futura?',
    a: 'Sí. Puedes hacer el pedido con anticipación y nosotros coordinamos la entrega exacta para la fecha y hora que necesites (cumpleaños, aniversario, fecha especial). Te recomendamos confirmar con al menos 2 días de anticipación para fechas marcadas (San Valentín, Día de las Madres, Amor y Amistad).',
  },
  {
    q: '¿Cómo se paga y se reserva el pedido?',
    a: 'Confirmamos con un abono del 50% del valor total. El saldo se cancela contra entrega. Aceptamos Nequi, Daviplata, transferencia bancaria y efectivo. Si necesitas factura, también la emitimos.',
  },
];

/**
 * Iconos SVG lineales propios. Stroke 1.5, viewBox 24×24, mismo set que las
 * landings anteriores. Iconos sobre el SERVICIO (sorpresa, entrega, mensaje,
 * personalización), no emojis de regalo o corazón.
 */
type IconProps = { className?: string };
const ICONS = {
  caja: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3.5" y="11" width="17" height="10" rx="1.5" />
      <path d="M2.5 7.5h19V11h-19z" />
      <path d="M12 7.5v13.5" />
      <path d="M12 7.5c-1.5 0-3.5-.5-3.5-2.5s2-2.5 3.5 0c1.5-2.5 3.5-2 3.5 0s-2 2.5-3.5 2.5z" />
    </svg>
  ),
  reloj: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  tarjeta: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M7 10h10M7 14h6" />
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
  camara: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 8h3.5l2-3h7l2 3H21v11H3V8z" />
      <circle cx="12" cy="13.5" r="3.5" />
    </svg>
  ),
  sorpresa: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 3v3M5.5 5.5l2 2M3 12h3M18 12h3M16.5 7.5l2-2" />
      <path d="M7 21l5-10 5 10H7z" />
    </svg>
  ),
  moto: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="5.5" cy="17" r="3" />
      <circle cx="18.5" cy="17" r="3" />
      <path d="M8.5 17h7l2-6h-4l-3 6" />
      <path d="M13.5 11l-2-4h-3" />
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
    title: 'Ancheta personalizada',
    body: 'Cada ancheta se arma con los gustos de la persona: snacks, chocolates, peluche, ramo o globos según lo que quieras incluir.',
  },
  {
    Icon: ICONS.paleta,
    title: 'Tu paleta de colores',
    body: 'Elegimos colores de globos, caja y decoración según la temática (cumpleaños, amor, agradecimiento, fecha especial).',
  },
  {
    Icon: ICONS.tarjeta,
    title: 'Tarjeta con tu mensaje',
    body: 'Incluimos una tarjeta con el mensaje que tú nos dictes, escrito a mano o impreso según prefieras.',
  },
  {
    Icon: ICONS.sorpresa,
    title: '100% sorpresa',
    body: 'La persona no se entera. Tú coordinas todo con nosotros por WhatsApp y nosotros entregamos directamente.',
  },
  {
    Icon: ICONS.reloj,
    title: 'Entrega el mismo día',
    body: 'Si confirmas antes de las 2:00 PM y estás en zona cercana, tu ancheta llega el mismo día.',
  },
  {
    Icon: ICONS.camara,
    title: 'Foto de la entrega',
    body: 'Si nos lo pides, te enviamos una foto del momento de la entrega para que veas la sorpresa.',
  },
  {
    Icon: ICONS.moto,
    title: 'Domicilio coordinado',
    body: 'Te confirmamos la hora exacta de entrega y mantenemos contacto contigo hasta que esté en manos de la persona.',
  },
  {
    Icon: ICONS.check,
    title: 'Pago fácil',
    body: 'Aceptamos Nequi, Daviplata, transferencia y efectivo. Abono del 50% al confirmar, saldo contra entrega.',
  },
];

export default function AnchetasMedellinDomicilioPage() {
  const jsonLdLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${PAGE_URL}#localbusiness`,
    name: 'Creaciones Vane — Anchetas a Domicilio en Medellín',
    description:
      'Servicio de anchetas personalizadas con entrega a domicilio el mismo día en Medellín y el Valle de Aburrá. Anchetas para mamá, pareja, amigos, cumpleaños y aniversarios. Desde $50.000 COP.',
    url: PAGE_URL,
    telephone: BUSINESS.phoneE164,
    priceRange: BUSINESS.priceRange,
    image: [
      `${BUSINESS.url}/images/anchetasMedellinDomicilio.webp`,
      `${BUSINESS.url}/banner-detalles.webp`,
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
    serviceType: 'Anchetas a Domicilio',
    name: 'Anchetas a Domicilio en Medellín',
    description:
      'Anchetas personalizadas con entrega el mismo día en Medellín. Tres paquetes: Detalle ($50.000), Clásica ($110.000) y Sorpresa Completa ($180.000). Incluyen snacks, chocolates, peluche o ramo, globos, caja decorada y tarjeta personalizada.',
    provider: { '@id': `${BUSINESS.url}/#organization` },
    areaServed: { '@type': 'City', name: 'Medellín' },
    category: 'Gift Delivery',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Paquetes de Anchetas',
      itemListElement: PAQUETES.map((p) => ({
        '@type': 'Offer',
        name: `Ancheta ${p.nombre}`,
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
    { name: 'Catálogo de Anchetas', url: `${BUSINESS.url}/creaciones-vane` },
    { name: 'Anchetas a Domicilio en Medellín', url: PAGE_URL },
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
          data-section="anchetas-hero"
          className="relative isolate min-h-[78svh] flex items-end overflow-hidden"
          aria-label="Anchetas a domicilio en Medellín"
        >
          {/*
            Imagen del hero. Convención: /images/X.webp (camelCase).
            Si aún no existe, Next renderiza el overlay sólido y la página
            no rompe.
          */}
          <Image
            src="/images/anchetasMedellinDomicilio.webp"
            alt="Ancheta personalizada con peluche, chocolates y globos entregada a domicilio en Medellín"
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
                  Anchetas a domicilio en Medellín
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <p className="text-white/85 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-7 sm:mb-9">
                  Sorprende a quien quieres con una ancheta personalizada. Confirmas antes de las 2:00 PM y llega el mismo día.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center max-w-md sm:max-w-none">
                  <a
                    id="anchetas-hero-cta"
                    href={waUrl(
                      'Hola Vane, quiero enviar una ancheta a domicilio en Medellín. Te cuento para quién es y el presupuesto.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-white text-stone-900 hover:bg-stone-100 px-7 py-4 rounded-full font-semibold text-base transition-colors duration-200"
                    aria-label="Pedir ancheta a domicilio por WhatsApp"
                  >
                    <ICONS.whatsapp className="w-5 h-5 text-[#25D366]" />
                    Pedir por WhatsApp
                  </a>
                  <a
                    href="#paquetes"
                    className="inline-flex items-center justify-center gap-2 border border-white/40 text-white hover:bg-white/10 px-7 py-4 rounded-full font-medium text-base transition-colors duration-200"
                  >
                    Ver anchetas y precios
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="fade" delay={0.6}>
                <div className="mt-10 sm:mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 text-white/80 text-sm">
                  <span className="flex items-center gap-2">
                    <ICONS.check className="w-4 h-4" />
                    Entrega el mismo día
                  </span>
                  <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/40" />
                  <span className="flex items-center gap-2">
                    <ICONS.check className="w-4 h-4" />
                    100% sorpresa
                  </span>
                  <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/40" />
                  <span className="flex items-center gap-2">
                    <ICONS.check className="w-4 h-4" />
                    Foto de la entrega
                  </span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* PARA QUIÉN                                                       */}
        {/* ============================================================== */}
        <section
          data-section="anchetas-para-quien"
          className="px-5 sm:px-8 py-16 sm:py-20 bg-[#FBF7F4]"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                Para quién
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4 max-w-3xl">
                Una ancheta para cada persona
              </h2>
              <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 sm:mb-12">
                Adaptamos los snacks, peluche, ramo, globos y mensaje a la persona que vas a sorprender.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {PARA_QUIEN.map((p) => (
                <div
                  key={p}
                  className="flex items-center gap-2.5 bg-white border border-stone-200 rounded-xl px-4 py-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D81B60] flex-shrink-0" />
                  <span className="text-sm text-stone-800 font-medium">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* INCLUYE                                                         */}
        {/* ============================================================== */}
        <section
          data-section="anchetas-incluye"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-white border-y border-stone-200"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                Qué incluye
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4 max-w-3xl">
                Una sorpresa resuelta de principio a fin
              </h2>
              <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 sm:mb-14">
                Tú nos cuentas para quién es y qué quieres que sienta al recibirla. Nosotros armamos, decoramos, entregamos y te confirmamos que llegó.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-200 border border-stone-200 rounded-2xl overflow-hidden">
              {INCLUYE_GENERAL.map(({ Icon, title, body }) => (
                <div
                  key={title}
                  className="bg-white p-6 sm:p-7 flex flex-col"
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
          data-section="anchetas-paquetes"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-[#FBF7F4]"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                Tres opciones
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4 max-w-3xl">
                Elige según el momento
              </h2>
              <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 sm:mb-14">
                Estos son nuestros paquetes base. Personalizamos cualquiera con lo que sume a tu sorpresa.
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
                        Más solicitada
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
                        Ancheta
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
                          COP
                        </span>
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
                      aria-label={`Pedir ancheta ${p.nombre} por WhatsApp`}
                    >
                      Pedir esta ancheta
                      <ICONS.arrow className="w-4 h-4" />
                    </a>
                  </article>
                );
              })}
            </div>

            <p className="mt-10 text-sm text-stone-500 max-w-3xl leading-relaxed">
              ¿Quieres algo distinto? Personalizamos cualquier ancheta con tu presupuesto, peluche temático, snacks específicos o un detalle adicional. Cuéntanos por WhatsApp.
            </p>
          </div>
        </section>

        {/* ============================================================== */}
        {/* COBERTURA                                                       */}
        {/* ============================================================== */}
        <section
          data-section="anchetas-cobertura"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-white border-y border-stone-200"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                Entregas
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4 max-w-3xl">
                Dónde entregamos
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 mt-8 sm:mt-12">
              <ScrollReveal direction="up" delay={0.1}>
                <div className="bg-[#FBF7F4] border border-stone-200 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <ICONS.mapa className="w-6 h-6 text-[#D81B60]" />
                    <h3 className="text-lg sm:text-xl font-semibold text-stone-900">
                      Zona cercana — sin costo extra
                    </h3>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed mb-5">
                    Entregamos sin costo adicional el mismo día en:
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
                  <p className="mt-5 text-xs text-stone-500 leading-relaxed">
                    Pedidos confirmados antes de las 12:00 PM llegan el mismo día.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.2}>
                <div className="bg-[#FBF7F4] border border-stone-200 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <ICONS.mapa className="w-6 h-6 text-stone-500" />
                    <h3 className="text-lg sm:text-xl font-semibold text-stone-900">
                      Zona lejana — con valor adicional
                    </h3>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed mb-5">
                    En estas zonas cobramos un adicional según la distancia:
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
          data-section="anchetas-proceso"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-[#FBF7F4]"
        >
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-3">
                Proceso
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4 max-w-3xl">
                Así pides la ancheta
              </h2>
            </ScrollReveal>

            <ol className="mt-10 sm:mt-14 space-y-8 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-8 sm:gap-y-12 relative">
              {[
                {
                  step: '01',
                  title: 'Nos escribes por WhatsApp',
                  body: 'Cuéntanos para quién es, qué quieres incluir, dirección, hora de entrega y mensaje para la tarjeta.',
                },
                {
                  step: '02',
                  title: 'Confirmamos y cotizamos',
                  body: 'Te enviamos foto de referencia, opciones y precio final. Ajustamos lo que necesites.',
                },
                {
                  step: '03',
                  title: 'Reservas con 50%',
                  body: 'Confirmamos el pedido con un abono del 50%. Aceptamos Nequi, Daviplata, transferencia y efectivo.',
                },
                {
                  step: '04',
                  title: 'Entregamos en la sorpresa',
                  body: 'Llegamos a la dirección con la ancheta y, si lo pides, te enviamos foto del momento.',
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
          data-section="anchetas-faq"
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
          data-section="anchetas-cta-final"
          className="px-5 sm:px-8 py-16 sm:py-24 bg-[#D81B60] text-white"
        >
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="down">
              <p className="font-script text-white/90 text-2xl sm:text-3xl mb-4">
                ¿A quién quieres sorprender hoy?
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-5">
                Pide tu ancheta y la llevamos
              </h2>
              <p className="text-white/85 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
                Escríbenos por WhatsApp con la dirección, la hora y el mensaje. Si confirmas antes de las 2:00 PM, llega el mismo día.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <a
                id="anchetas-cta-final"
                href={waUrl(
                  'Hola Vane, quiero enviar una ancheta sorpresa hoy en Medellín. Es para ____, la dirección es ____, la hora ____ y el mensaje ____. ¿Me ayudan?'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white text-[#D81B60] hover:bg-stone-50 px-8 py-4 rounded-full font-semibold text-base transition-colors duration-200"
                aria-label="Pedir ancheta a domicilio por WhatsApp"
              >
                <ICONS.whatsapp className="w-5 h-5 text-[#25D366]" />
                Escribir por WhatsApp
              </a>
            </ScrollReveal>

            <ScrollReveal direction="fade" delay={0.4}>
              <p className="mt-8 text-sm text-white/75">
                También puedes ver{' '}
                <Link href="/creaciones-vane" className="text-white underline decoration-white/40 hover:decoration-white">
                  todo el catálogo de anchetas y desayunos
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
