import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';
import InfiniteCarousel from '../components/InfiniteCarousel';
import { productosMock } from '../data/mockData';

export default function FeaturedProductsSection() {
  const productosDestacados = productosMock.filter(p => p.destacado).slice(0, 6);

  return (
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
  );
}