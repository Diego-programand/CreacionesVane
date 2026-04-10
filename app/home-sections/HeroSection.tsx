import Image from 'next/image';
import ScrollReveal from '../components/ScrollReveal';

/**
 * HERO SECTION — Página de Inicio
 * 
 * JERARQUÍA DE ENCABEZADOS OPTIMIZADA PARA SEO LOCAL:
 * <h1> → Keyword principal "Regalos" + "Medellín" (1 solo H1 por página)
 * Los subtítulos usan <p> con estilos grandes, sin competir con el H1.
 * 
 * ALT de imágenes geo-localizados para SEO de imágenes.
 */
export default function HeroSection() {
    return (
        /* role="banner" semántico para el hero principal */
        <section
            className="relative h-[450px] flex items-center justify-center overflow-hidden"
            aria-label="Sección principal de Creaciones Vane - Regalos en Medellín"
        >
            {/* Imagen de fondo con ALT geo-localizado */}
            <Image
                src="/banner-detalles.webp"
                alt="Anchetas, desayunos sorpresa y regalos personalizados a domicilio en Medellín - Creaciones Vane"
                priority={true}
                fetchPriority="high"
                loading="eager"
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover object-center blur-[5px]"
            />
            {/* Overlay gradiente de marca */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary-600/80 via-primary-500/70 to-primary-700/80" />

            <div className="relative z-10 text-center px-4 max-w-4xl w-full">
                {/* Logo con ALT descriptivo y geo */}
                <Image
                    src="/logo.png"
                    alt="Logo de Creaciones Vane - Tienda de regalos y desayunos sorpresa en Medellín, Colombia"
                    width={120}
                    height={120}
                    priority
                    className="mx-auto mb-3 rounded-full shadow-2xl bg-white p-2"
                />

                {/* ===== H1 PRINCIPAL — ÚNICO POR PÁGINA =====
                     Maximiza relevancia semántica "Regalos" + "Medellín"
                     + keywords transaccionales de alta intención */}
                <h1 className="text-4xl md:text-5xl font-sm font-script text-white mb-3 drop-shadow-lg">
                    Regalos y Desayunos Sorpresa en Medellín
                </h1>

                {/* Subtítulo de marca — NO es H2 para no robar peso al H1 */}
                <p className="text-2xl md:text-3xl text-white/95 mb-4 font-script drop-shadow-md">
                    Creaciones Vane — Tu Cómplice que Endulza
                </p>

                {/* Descripción con keywords long-tail */}
                <p className="text-base md:text-lg text-white/95 mb-6 max-w-2xl mx-auto drop-shadow-md">
                    Anchetas personalizadas, peluches, ramos de rosas, decoraciones para eventos
                    y refrigerios con entrega el mismo día en Medellín, Envigado, Sabaneta e Itagüí.
                </p>

                {/* CTAs principales */}
                <ScrollReveal direction="up" delay={0.2}>
                    <div className="grid grid-cols-2 p-3 gap-3 sm:flex sm:justify-center sm:gap-6">
                        {/* CTA WhatsApp — Mensaje predefinido geo-localizado */}
                        <a
                            href="https://wa.me/573128235654?text=¡Hola!%20Quiero%20pedir%20un%20regalo%20a%20domicilio%20en%20Medellín%20💝"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center bg-white text-primary-600 px-4 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-lg shadow-xl hover:shadow-2xl hover:scale-105 hover:bg-primary-50 transition-all duration-300 text-center"
                            id="hero-cta-whatsapp"
                        >
                            Pedir Ahora
                        </a>
                        {/* CTA Ubicación */}
                        <a
                            href="#location"
                            className="flex items-center justify-center bg-transparent border border-white text-white px-4 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-lg shadow-xl hover:shadow-2xl hover:scale-105 hover:bg-white hover:text-primary-600 hover:border-primary-600 transition-all duration-300 text-center"
                            id="hero-cta-location"
                        >
                            Cómo Llegar
                        </a>
                    </div>
                </ScrollReveal>

            </div>
        </section>
    );
}