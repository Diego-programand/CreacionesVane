'use client';

import Image from 'next/image';
import ScrollReveal from '../components/ScrollReveal';

export default function ExperienceSection() {
  return (
    <section className="relative py-20 md:py-26 bg-primary-50 overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Lado Izquierdo: Imagen / Composición Visual */}
          <div className="flex-1 w-full max-w-xl">
            <ScrollReveal direction="left" delay={0.2}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary-200 rounded-2xl rotate-12 group-hover:rotate-1 transition-transform duration-500"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[4/5] sm:aspect-square md:aspect-video lg:aspect-square">
                  <Image
                    src="/images/experienceSection.webp"
                    alt="7 años de experiencia"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent"></div>
                </div>
                {/* Badge de Años */}
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border-b-4 border-primary-500 animate-bounce-slow">
                  <span className="block text-4xl md:text-5xl font-extrabold text-primary-600">+6</span>
                  <span className="text-xs md:text-sm font-bold text-gray-600 uppercase tracking-wider">Años de Amor</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Lado Derecho: Texto y Stats */}
          <div className="flex-1 text-center lg:text-left">
            <ScrollReveal direction="up">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Más de <span className="text-primary-600 italic">6 años</span> siendo cómplices de tus sonrisas
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                Desde nuestro inicio, nuestra misión ha sido transformar un simple detalle en un recuerdo inolvidable. No solo entregamos productos, entregamos emociones que perduran en el corazón.
              </p>
            </ScrollReveal>

            {/* Mini Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              <ScrollReveal direction="up" delay={0.3}>
                <div className="p-4 bg-white rounded-xl shadow-sm border-l-4 border-primary-400">
                  <h4 className="text-2xl font-bold text-primary-600">Miles</h4>
                  <p className="text-sm text-gray-600">De momentos endulzados</p>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.4}>
                <div className="p-4 bg-white rounded-xl shadow-sm border-l-4 border-primary-400">
                  <h4 className="text-2xl font-bold text-primary-600">100%</h4>
                  <p className="text-sm text-gray-600">Dedicación artesanal</p>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={0.5}>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <p className="text-sm text-gray-600 font-medium">
                  <span className="text-primary-600 font-bold">+500 clientes</span> confían en nuestra magia
                </p>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>

      <style jsx>{`
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}