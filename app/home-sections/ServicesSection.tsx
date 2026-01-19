import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';
import { categorias } from '../data/mockData';

export default function ServicesSection() {
  const imagenes: Record<string, string> = {
    'detalles': '/categorias/anchetas.webp',
    'refrigerios': '/categorias/refrigerios.webp',
    'decoraciones': '/categorias/decoracion.webp'
  };

  const ordenCategorias = ['refrigerios', 'detalles', 'decoraciones'];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal direction="up" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Nuestros Servicios
          </h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto mb-4 rounded-full"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Tres líneas especializadas para hacer tus momentos inolvidables
          </p>
        </ScrollReveal>

        {/* Desktop Grande (1280px+) - Accordion horizontal */}
        <ScrollReveal direction="fade" delay={0.2}>
          <div className="hidden xl:flex gap-0 h-[480px] 2xl:h-[630px] w-full">
            {categorias.map((categoria) => (
              <Link
                key={categoria.id}
                href={categoria.ruta}
                className="group relative flex-1 overflow-hidden transition-all duration-700 ease-out hover:flex-[2] hover:scale-105 hover:z-10 hover:shadow-2xl"
                style={{ order: ordenCategorias.indexOf(categoria.id) }}
              >
                <div className="absolute inset-0">
                  <Image
                    src={imagenes[categoria.id]}
                    alt={categoria.nombre}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/65 transition-all duration-700"></div>

                <div className="absolute inset-0 flex flex-col justify-center items-center p-6 2xl:p-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="text-4xl 2xl:text-6xl mb-3 2xl:mb-6 transform scale-0 group-hover:scale-100 transition-transform duration-700">
                    {categoria.icono}
                  </div>

                  <h3 className="text-xl 2xl:text-4xl font-bold mb-2 2xl:mb-3 drop-shadow-lg transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 delay-100">
                    {categoria.nombre}
                  </h3>

                  <p className="text-sm 2xl:text-xl font-semibold mb-3 2xl:mb-6 text-white/90 drop-shadow-md transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 delay-150">
                    {categoria.subtitulo}
                  </p>

                  <p className="text-xs 2xl:text-lg leading-relaxed mb-4 2xl:mb-8 text-white/95 drop-shadow-md max-w-md text-center transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 delay-200">
                    {categoria.descripcion}
                  </p>

                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 2xl:px-6 py-2 2xl:py-3 rounded-full border-2 border-white/60 hover:bg-white/40 transition-all transform translate-y-8 group-hover:translate-y-0 duration-700 delay-300">
                    <span className="font-semibold text-xs 2xl:text-base">Ver catálogo completo</span>
                    <svg className="w-3 2xl:w-5 h-3 2xl:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>

        {/* Tablet/Móvil/Desktop Pequeño (<1280px) - Cards verticales */}
        <div className="xl:hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categorias.map((categoria, index) => (
            <ScrollReveal key={categoria.id} direction="up" delay={index * 0.15}>
              <Link
                href={categoria.ruta}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-[420px] sm:h-[480px] block"
              >
                <div className="absolute inset-0">
                  <Image
                    src={imagenes[categoria.id]}
                    alt={categoria.nombre}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 text-white">
                  <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">
                    {categoria.icono}
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1.5 sm:mb-2 drop-shadow-lg">
                    {categoria.nombre}
                  </h3>

                  <p className="text-sm sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 text-white/90 drop-shadow-md">
                    {categoria.subtitulo}
                  </p>

                  <p className="text-xs sm:text-sm lg:text-base leading-relaxed mb-4 sm:mb-5 text-white/95 drop-shadow-md">
                    {categoria.descripcion}
                  </p>

                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border-2 border-white/60 hover:bg-white/40 transition-all self-start">
                    <span className="font-semibold text-xs sm:text-sm">Ver catálogo</span>
                    <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}