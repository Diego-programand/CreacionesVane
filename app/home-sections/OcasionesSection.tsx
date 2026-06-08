import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';
import { waUrl } from '../lib/whatsapp';

/**
 * Iconos SVG lineales propios para las ocasiones del home.
 *
 * Reglas:
 *  - Sin emojis de teclado. SVGs custom con stroke 1.5 y viewBox 24×24.
 *  - Color heredado vía currentColor (lo controla la clase del padre).
 *  - Misma firma visual que las landings transaccionales para coherencia.
 */
type IconProps = { className?: string };

const IconFlores = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <circle cx="12" cy="6" r="2.5" />
    <circle cx="6.5" cy="9.5" r="2.5" />
    <circle cx="17.5" cy="9.5" r="2.5" />
    <circle cx="12" cy="13" r="2.5" />
    <circle cx="12" cy="9.5" r="1" fill="currentColor" />
    <path d="M12 15.5v6" />
    <path d="M9 21.5h6" />
  </svg>
);

const IconCorazon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M12 20.5s-7.5-5-7.5-11.2A4.3 4.3 0 0112 6.6a4.3 4.3 0 017.5 2.7c0 6.2-7.5 11.2-7.5 11.2z" />
  </svg>
);

const IconRegalo = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="3.5" y="11" width="17" height="10" rx="1.5" />
    <path d="M2.5 7.5h19V11h-19z" />
    <path d="M12 7.5v13.5" />
    <path d="M12 7.5c-1.5 0-3.5-.5-3.5-2.5s2-2.5 3.5 0c1.5-2.5 3.5-2 3.5 0s-2 2.5-3.5 2.5z" />
  </svg>
);

const IconCupcake = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M5 12h14l-1.8 9H6.8L5 12z" />
    <path d="M5 12c0-3 3-5.5 7-5.5s7 2.5 7 5.5" />
    <path d="M12 3.5v3" />
    <circle cx="12" cy="2.5" r="0.6" fill="currentColor" />
  </svg>
);

const IconAros = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <circle cx="9" cy="15" r="5" />
    <circle cx="15" cy="15" r="5" />
    <path d="M9 5l3 3" />
    <path d="M15 5l-3 3" />
    <path d="M12 8v1.5" />
  </svg>
);

const IconBirrete = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M2.5 10L12 5.5l9.5 4.5L12 14.5 2.5 10z" />
    <path d="M6.5 12.5v4.5c1.8 1.5 3.5 2 5.5 2s3.7-.5 5.5-2v-4.5" />
    <path d="M21.5 10v5.5" />
    <path d="M21.5 17a1.5 1.5 0 01-1.5 1.5" />
  </svg>
);

const IconCorbata = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M9 3h6l-1 4 2 11-4 4-4-4 2-11-1-4z" />
    <path d="M10.5 7h3" />
  </svg>
);

const IconMaletin = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="3" y="7" width="18" height="13" rx="1.5" />
    <path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2" />
    <path d="M3 13h18" />
    <path d="M11 12.5h2" />
  </svg>
);

const ocasiones = [
  {
    Icon: IconFlores,
    titulo: 'Día de las Madres',
    descripcion: 'Sorprende a mamá con una ancheta o desayuno sorpresa a domicilio en Medellín.',
    href: '/creaciones-vane',
    keywords: 'regalo día de las madres medellín, anchetas día de la madre, desayuno sorpresa mamá',
  },
  {
    Icon: IconCorazon,
    titulo: 'San Valentín',
    descripcion: 'Ramos de rosas, peluches y anchetas románticas para el 14 de febrero.',
    href: '/creaciones-vane',
    keywords: 'regalo san valentín medellín, ramos de rosas san valentín, anchetas amor',
  },
  {
    Icon: IconRegalo,
    titulo: 'Amor y Amistad',
    descripcion: 'Celebra el 19 de septiembre con detalles personalizados para quien más quieres.',
    href: '/creaciones-vane',
    keywords: 'regalo amor y amistad medellín, anchetas amor y amistad, detalle 19 septiembre',
  },
  {
    Icon: IconCupcake,
    titulo: 'Cumpleaños',
    descripcion: 'Desayunos sorpresa, anchetas y decoraciones temáticas para cumpleaños en Medellín.',
    href: '/creaciones-vane',
    keywords: 'regalo cumpleaños medellín, desayuno sorpresa cumpleaños, decoración cumpleaños',
  },
  {
    Icon: IconAros,
    titulo: 'Bodas y Matrimonios',
    descripcion: 'Decoración elegante para bodas y eventos de matrimonio en Medellín y el Valle de Aburrá.',
    href: '/decoracion-bodas-medellin',
    keywords: 'decoración bodas medellín, decoración matrimonios, ambientación bodas',
  },
  {
    Icon: IconBirrete,
    titulo: 'Graduaciones',
    descripcion: 'Anchetas y detalles especiales para celebrar el logro de un ser querido.',
    href: '/creaciones-vane',
    keywords: 'regalo graduación medellín, ancheta graduación, detalle grado',
  },
  {
    Icon: IconCorbata,
    titulo: 'Día del Padre',
    descripcion: 'Sorprende a papá con una ancheta especial o un desayuno sorpresa a domicilio.',
    href: '/creaciones-vane',
    keywords: 'regalo día del padre medellín, ancheta día del padre, desayuno sorpresa papá',
  },
  {
    Icon: IconMaletin,
    titulo: 'Eventos Empresariales',
    descripcion: 'Refrigerios para reuniones, capacitaciones y eventos de empresa en Medellín.',
    href: '/refrigerios-empresariales-medellin',
    keywords: 'refrigerios eventos empresariales medellín, refrigerios para empresa medellín',
  },
];

export default function OcasionesSection() {
  return (
    <section className="py-20 bg-white" aria-labelledby="ocasiones-heading">
      <div className="container mx-auto px-4">
        <ScrollReveal direction="up" className="text-center mb-14">
          <span className="bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full font-bold tracking-wider uppercase text-xs mb-4 inline-block border border-primary-200">
            Para cada momento especial
          </span>
          <h2 id="ocasiones-heading" className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Regalos para Toda <span className="text-primary-600 italic">Ocasión</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
            Desde cumpleaños hasta bodas, tenemos el detalle perfecto para cada celebración en Medellín.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {ocasiones.map((o, i) => (
            <ScrollReveal key={o.titulo} direction="up" delay={i * 0.05} className="h-full">
              <Link
                href={o.href}
                className="group flex flex-col items-center text-center p-5 rounded-2xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50 transition-all duration-300 h-full shadow-sm hover:shadow-md"
                title={o.keywords}
              >
                <span className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                  <o.Icon className="w-7 h-7" />
                </span>
                <h3 className="font-bold text-gray-800 text-sm md:text-base mb-2 group-hover:text-primary-600 transition-colors">
                  {o.titulo}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {o.descripcion}
                </p>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={0.4} className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            ¿Tienes una ocasión especial en mente?
          </p>
          <a
            href={waUrl('¡Hola! Quiero un regalo personalizado para una ocasión especial 💝')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-md hover:shadow-lg hover:scale-105"
            aria-label="Consultar por WhatsApp para un regalo personalizado"
          >
            Consultar por WhatsApp
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
