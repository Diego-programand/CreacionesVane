import Image from 'next/image';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import InfiniteCarousel from './components/InfiniteCarousel';
import ScrollReveal from './components/ScrollReveal';
import { productosMock, categorias } from './data/mockData';

export default function Home() {
  const productosDestacados = productosMock.filter(p => p.destacado).slice(0, 6);

  return (
    <>
      <Header />
      <main>
        {/* Hero Section con Banner */}
        <section className="relative h-[350px] flex items-center justify-center overflow-hidden">
          <Image
            src="/banner-detalles.png"
            alt="Banner Creaciones Vane"
            fill
            className="object-cover object-center blur-[5px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-600/80 via-primary-500/70 to-primary-700/80" />

          <div className="relative z-10 text-center px-4 max-w-4xl w-full">
            <ScrollReveal direction="down" delay={0.2}>
              <Image
                src="/logo.png"
                alt="Creaciones Vane Logo"
                width={120}
                height={120}
                className="mx-auto mb-3 rounded-full shadow-2xl bg-white p-2"
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <p className="text-base md:text-lg text-white/95 mb-6 max-w-2xl mx-auto drop-shadow-md">
                Desde 2019 creando momentos especiales con detalles de amor,
                refrigerios deliciosos y decoraciones que inspiran
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.6}>
              <a
                href="https://wa.me/573128235654?text=¡Hola!%20Quiero%20conocer%20más%20sobre%20sus%20servicios%20💝"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-primary-600 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg shadow-xl hover:shadow-2xl hover:scale-105 hover:bg-primary-50 transition-all duration-300"
              >
                Contáctanos
              </a>
            </ScrollReveal>
          </div>
        </section>

        {/* Nuestros Servicios - Accordion Gallery */}
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
                {categorias.map((categoria) => {
                  const imagenes: Record<string, string> = {
                    'detalles': '/categorias/anchetas.webp',
                    'refrigerios': '/categorias/refrigerios.webp',
                    'decoraciones': '/categorias/decoracion.webp'
                  };

                  const ordenCategorias = ['refrigerios', 'detalles', 'decoraciones'];

                  return (
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
                  );
                })}
              </div>
            </ScrollReveal>

            {/* Tablet/Móvil/Desktop Pequeño (<1280px) - Cards verticales */}
            <div className="xl:hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {categorias.map((categoria, index) => {
                const imagenes: Record<string, string> = {
                  'detalles': '/categorias/anchetas.webp',
                  'refrigerios': '/categorias/refrigerios.webp',
                  'decoraciones': '/categorias/decoracion.webp'
                };

                return (
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
                );
              })}
            </div>
          </div>
        </section>

        {/* Productos Destacados - Carrousel Infinito */}
        <section className="py-16 bg-gradient-to-br from-primary-100 via-primary-100 to-white">
          <div className="container mx-auto px-4">
            <ScrollReveal direction="up" className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                Productos Destacados
              </h2>
              <div className="w-24 h-1 bg-primary-500 mx-auto mb-4 rounded-full"></div>
              <p className="text-lg md:text-xl text-gray-700">
                Lo mejor de nuestras tres líneas
              </p>
            </ScrollReveal>

            <ScrollReveal direction="fade" delay={0.3}>
              <InfiniteCarousel products={productosDestacados} />
            </ScrollReveal>

            {/* Separador Estético */}
            <ScrollReveal direction="fade" delay={0.4}>
              <div className="flex items-center justify-center my-12">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent max-w-md"></div>
                <div className="mx-4">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent max-w-md"></div>
              </div>
            </ScrollReveal>

            {/* CTA Ver Más */}
            <ScrollReveal direction="up" delay={0.5}>
              <div className="text-center">
                <p className="text-gray-700 mb-6 text-base md:text-lg">
                  ¿Quieres ver más productos? Explora nuestros catálogos completos
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 px-4">
                  <Link
                    href="/creaciones-vane"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg hover:scale-105"
                  >
                    Ver Detalles de Amor
                  </Link>
                  <Link
                    href="/refrigerios"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg hover:scale-105"
                  >
                    Ver Refrigerios
                  </Link>
                  <Link
                    href="/decoraciones"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg hover:scale-105"
                  >
                    Ver Decoraciones
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA Final */}
        <section className="relative py-20 md:py-24 overflow-hidden">
          <div className="absolute inset-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/images/fallback-hearts.jpg"
              className="absolute inset-0 w-full h-full object-cover"
            >
              {/* Versión para Móvil (se activa en pantallas menores a 768px) */}
              <source
                src="/videos/hearts-background-mobile.mp4"
                type="video/mp4"
                media="(max-width: 767px)"
              />

              {/* Versión para Desktop (se activa en pantallas de 768px en adelante) */}
              <source
                src="/videos/hearts-background.mp4"
                type="video/mp4"
                media="(min-width: 768px)"
              />

              Tu navegador no soporta videos.
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/70 via-primary-500/60 to-primary-700/7                              0"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal direction="down" delay={0.2}>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-2xl">
                  ¿Listo para sorprender?
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4}>
                <p className="text-lg md:text-xl lg:text-2xl mb-10 text-white/95 drop-shadow-lg leading-relaxed">
                  Contáctanos hoy y hagamos realidad ese momento especial que tienes en mente
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.6}>
                <a
                  href="https://wa.me/573128235654?text=¡Hola!%20Quiero%20hacer%20un%20pedido%20💝"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-primary-600 px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-base md:text-lg shadow-2xl hover:shadow-[0_20px_60px_rgba(226,28,101,0.4)] hover:scale-105 hover:bg-primary-50 transition-all duration-300 group"
                >
                  <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Enviar mensaje por WhatsApp</span>
                  <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </ScrollReveal>

              <ScrollReveal direction="fade" delay={0.8}>
                <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-12 text-white/90">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm md:text-base font-semibold">Desde 2019</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm md:text-base font-semibold">100% Personalizado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm md:text-base font-semibold">Entrega rápida</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}