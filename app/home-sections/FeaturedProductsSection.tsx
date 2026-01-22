'use client';

import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';
import InfiniteCarousel from '../components/InfiniteCarousel';
import { productosMock } from '../data/mockData';
import { ArrowRight } from 'lucide-react'; // Añadimos un toque visual

export default function FeaturedProductsSection() {
  const productosDestacados = productosMock.filter(p => p.destacado);

  return (
    // Reducimos un poco el padding vertical (py-16 -> py-12) para laptops
    <section className="py-12 md:py-20 bg-primary-100 overflow-hidden">
      <div className="container mx-auto px-4">
        
        <ScrollReveal direction="up" className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Productos <span className="text-primary-600">Destacados</span>
          </h2>
          <div className="w-20 h-1.5 bg-primary-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Descubre nuestra selección premium: detalles que emocionan, 
            refrigerios deliciosos y decoraciones inolvidables.
          </p>
        </ScrollReveal>

        {/* CONTENEDOR DEL CAROUSEL */}
        <div className="relative">
           <ScrollReveal direction="fade" delay={0.3}>
             {/* Nota: Asegúrate de que dentro de InfiniteCarousel 
                estés configurando para ver 3 o 4 productos en desktop (lg:grid-cols-3 o similar)
             */}
             <InfiniteCarousel products={productosDestacados} />
           </ScrollReveal>
        </div>

        {/* Separador Estético más sutil */}
        <ScrollReveal direction="fade" delay={0.4}>
          <div className="flex items-center justify-center my-16 opacity-50">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"></div>
            <div className="mx-6 flex gap-1">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-primary-300 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"></div>
          </div>
        </ScrollReveal>

        {/* CTA Ver Más - Diseño más limpio */}
        <ScrollReveal direction="up" delay={0.5}>
          <div className="text-center bg-white/40 backdrop-blur-sm border border-white/60 p-8 rounded-3xl max-w-5xl mx-auto shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
              ¿Buscas algo más específico?
            </h3>
            <p className="text-gray-600 mb-8 text-sm md:text-base">
              Explora nuestras categorías completas y encuentra el detalle perfecto.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/creaciones-vane"
                className="group flex items-center justify-center gap-2 bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-600 hover:text-white px-5 py-3 rounded-xl font-bold transition-all shadow-sm hover:shadow-primary-200"
              >
                Anchetas y más <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/refrigerios"
                className="group flex items-center justify-center gap-2 bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-600 hover:text-white px-5 py-3 rounded-xl font-bold transition-all shadow-sm hover:shadow-primary-200"
              >
                Refrigerios <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/decoraciones"
                className="group flex items-center justify-center gap-2 bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-600 hover:text-white px-5 py-3 rounded-xl font-bold transition-all shadow-sm hover:shadow-primary-200"
              >
                Decoraciones <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}