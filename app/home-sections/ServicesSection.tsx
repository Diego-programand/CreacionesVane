'use client';

import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';
import { categorias } from '../data/mockData';
import { ArrowRight, Heart, Star, Cake } from 'lucide-react';

export default function ServicesSection() {
  const imagenes: Record<string, string> = {
    'detalles': '/categorias/anchetas.webp',
    'decoraciones': '/categorias/decoracion.webp',
    'refrigerios': '/categorias/refrigerios.webp',
  };

  // Iconos más "dulces" y significativos
  const icons: Record<string, any> = {
    'detalles': <Heart className="w-6 h-6 fill-current" />,
    'decoraciones': <Star className="w-6 h-6 fill-current" />,
    'refrigerios': <Cake className="w-6 h-6" />
  };

  return (
    <section className="py-24 bg-[#FFF5F7] overflow-hidden"> {/* Fondo rosado ultra sutil */}
      <div className="container mx-auto px-4">
        
        <ScrollReveal direction="up" className="text-center mb-16">
          <span className="bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full font-bold tracking-wider uppercase text-xs mb-4 inline-block border border-primary-200">
            Cómplices de tus sorpresas
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
            Momentos para <span className="text-primary-600 italic">Recordar</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl font-light">
            Desde detalles que endulzan el alma hasta eventos que roban suspiros.
          </p>
        </ScrollReveal>

        {/* Layout Dinámico: Prioridad Visual 100% a Detalles */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 h-auto">
          
          {/* PRODUCTO ESTRELLA: DETALLES (Ocupa el 60% del ancho y toda la altura) */}
          <div className="lg:col-span-7 h-[500px] md:h-[650px]">
            <ServiceCard 
              categoria={categorias.find(c => c.id === 'detalles')!} 
              img={imagenes['detalles']}
              icon={icons['detalles']}
              isMain={true}
              delay={0.1}
            />
          </div>

          {/* COLUMNA SECUNDARIA: Decoraciones y Refrigerios apilados */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* DECORACIONES (Importancia media) */}
            <div className="h-[350px] md:h-[310px]">
              <ServiceCard 
                categoria={categorias.find(c => c.id === 'decoraciones')!} 
                img={imagenes['decoraciones']}
                icon={icons['decoraciones']}
                delay={0.2}
              />
            </div>

            {/* REFRIGERIOS (Importancia baja) */}
            <div className="h-[300px] md:h-[310px]">
              <ServiceCard 
                categoria={categorias.find(c => c.id === 'refrigerios')!} 
                img={imagenes['refrigerios']}
                icon={icons['refrigerios']}
                delay={0.3}
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ categoria, img, icon, delay, isMain = false }: { categoria: any, img: string, icon: any, delay: number, isMain?: boolean }) {
  return (
    <ScrollReveal direction="fade" delay={delay} className="w-full h-full">
      <Link 
        href={categoria.ruta}
        className="group relative w-full h-full flex flex-col overflow-hidden rounded-[3rem] shadow-xl hover:shadow-primary-200/40 transition-all duration-700 bg-white"
      >
        {/* Imagen con Overlay de alto contraste */}
        <div className="absolute inset-0 z-0">
          <Image
            src={img}
            alt={categoria.nombre}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          {/* Overlay gradiente: Más oscuro abajo para que el texto resalte, más suave arriba */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-primary-900/90 transition-all duration-500"></div>
        </div>

        {/* Badge Flotante (Contraste corregido: Blanco sobre color de marca) */}
        <div className="relative z-10 p-6 md:p-8">
          <div className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-2xl shadow-lg transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
            {icon}
            <span className="font-bold text-xs md:text-sm uppercase tracking-widest">{categoria.subtitulo}</span>
          </div>
        </div>

        {/* Contenido de texto inferior */}
        <div className={`relative z-10 mt-auto p-8 md:p-10 ${isMain ? 'md:p-12' : 'p-8'}`}>
          <h3 className={`${isMain ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'} font-black text-white mb-3 drop-shadow-md`}>
            {categoria.nombre}
          </h3>
          
          <p className={`text-white/90 font-medium leading-relaxed mb-6 max-w-md ${isMain ? 'text-base md:text-lg' : 'text-sm'} transform translate-y-4 group-hover:translate-y-0 transition-all duration-500`}>
            {categoria.descripcion}
          </p>
          
          <div className="flex items-center gap-3">
            <span className="bg-white text-primary-600 px-6 py-2.5 rounded-full font-bold text-sm shadow-md group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
              Ver Catálogo <ArrowRight size={16} />
            </span>
          </div>
        </div>

        {/* Elemento Decorativo: Brillo al pasar el mouse */}
        <div className="absolute -inset-full h-full w-1/2 z-20 block transform -rotate-45 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:animate-shine pointer-events-none" />
      </Link>
    </ScrollReveal>
  );
}