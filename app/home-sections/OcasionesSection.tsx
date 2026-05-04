import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';
import { waUrl } from '../lib/whatsapp';

const ocasiones = [
  {
    emoji: '💐',
    titulo: 'Día de las Madres',
    descripcion: 'Sorprende a mamá con una ancheta o desayuno sorpresa a domicilio en Medellín.',
    href: '/creaciones-vane',
    keywords: 'regalo día de las madres medellín, anchetas día de la madre, desayuno sorpresa mamá',
  },
  {
    emoji: '💝',
    titulo: 'San Valentín',
    descripcion: 'Ramos de rosas, peluches y anchetas románticas para el 14 de febrero.',
    href: '/creaciones-vane',
    keywords: 'regalo san valentín medellín, ramos de rosas san valentín, anchetas amor',
  },
  {
    emoji: '🎉',
    titulo: 'Amor y Amistad',
    descripcion: 'Celebra el 19 de septiembre con detalles personalizados para quien más quieres.',
    href: '/creaciones-vane',
    keywords: 'regalo amor y amistad medellín, anchetas amor y amistad, detalle 19 septiembre',
  },
  {
    emoji: '🎂',
    titulo: 'Cumpleaños',
    descripcion: 'Desayunos sorpresa, anchetas y decoraciones temáticas para cumpleaños en Medellín.',
    href: '/creaciones-vane',
    keywords: 'regalo cumpleaños medellín, desayuno sorpresa cumpleaños, decoración cumpleaños',
  },
  {
    emoji: '💒',
    titulo: 'Bodas y Matrimonios',
    descripcion: 'Decoración elegante para bodas y eventos de matrimonio en Medellín y el Valle de Aburrá.',
    href: '/decoraciones',
    keywords: 'decoración bodas medellín, decoración matrimonios, ambientación bodas',
  },
  {
    emoji: '🎓',
    titulo: 'Graduaciones',
    descripcion: 'Anchetas y detalles especiales para celebrar el logro de un ser querido.',
    href: '/creaciones-vane',
    keywords: 'regalo graduación medellín, ancheta graduación, detalle grado',
  },
  {
    emoji: '👨',
    titulo: 'Día del Padre',
    descripcion: 'Sorprende a papá con una ancheta especial o un desayuno sorpresa a domicilio.',
    href: '/creaciones-vane',
    keywords: 'regalo día del padre medellín, ancheta día del padre, desayuno sorpresa papá',
  },
  {
    emoji: '🍱',
    titulo: 'Eventos Empresariales',
    descripcion: 'Refrigerios para reuniones corporativas y eventos empresariales en Medellín.',
    href: '/refrigerios',
    keywords: 'refrigerios eventos empresariales medellín, catering corporativo medellín',
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
                <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block" role="img" aria-hidden="true">
                  {o.emoji}
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
