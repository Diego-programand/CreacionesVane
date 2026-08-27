import Image from 'next/image';
import ScrollReveal from '../components/ScrollReveal';
import { waUrl } from '../lib/whatsapp';

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
            className="relative min-h-[520px] py-12 md:py-16 flex items-center justify-center overflow-hidden"
            aria-label="Sección principal de Creaciones Vane - Regalos en Medellín"
        >
            {/* Imagen de fondo con ALT geo-localizado */}
            <Image
                src="/banner-anchetas.webp"
                alt="Anchetas, desayunos sorpresa y regalos personalizados a domicilio en Medellín - Creaciones Vane"
                priority={true}
                fetchPriority="high"
                loading="eager"
                fill
                quality={75}
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover object-center blur-[3px]"
            />
            {/* Overlay gradiente de marca */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary-600/80 via-primary-500/70 to-primary-700/80" />

            <div className="relative z-10 text-center px-4 max-w-4xl w-full">
                {/* Logo con ALT descriptivo y geo */}
                <Image
                    src="/logo.png"
                    alt="Logo de Creaciones Vane - Tienda de regalos y desayunos sorpresa en Medellín, Colombia"
                    width={110}
                    height={110}
                    priority
                    className="mx-auto mb-3 rounded-full shadow-2xl bg-white p-2 w-[90px] h-[90px] md:w-[110px] md:h-[110px]"
                />

                {/* ===== H1 PRINCIPAL — ÚNICO POR PÁGINA ===== */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-sm font-script text-white mb-3 drop-shadow-lg leading-tight">
                    Regalos y Desayunos Sorpresa en Medellín
                </h1>

                {/* Subtítulo de marca */}
                <p className="text-xl sm:text-2xl md:text-3xl text-white/95 mb-4 font-script drop-shadow-md">
                    Creaciones Vane — Cómplice que Endulza
                </p>

                {/* Descripción con keywords long-tail */}
                <p className="text-sm sm:text-base md:text-lg text-white/95 mb-6 max-w-2xl mx-auto drop-shadow-md leading-relaxed px-2">
                    Anchetas personalizadas, peluches, ramos de rosas, decoraciones para eventos
                    y refrigerios a domicilio en Medellín, Envigado, Sabaneta e Itagüí. Confirma
                    con 24 horas y coordinamos la hora exacta de la entrega.
                </p>

                {/* CTAs principales sin desbordamiento en móvil */}
                <ScrollReveal direction="up" delay={0.2}>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto w-full px-2">
                        {/* CTA WhatsApp */}
                        <a
                            href={waUrl('¡Hola! Quiero pedir un regalo a domicilio en Medellín 💝')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto flex items-center justify-center bg-white text-primary-600 px-6 py-3.5 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg shadow-xl hover:shadow-2xl hover:scale-105 hover:bg-primary-50 transition-all duration-300 text-center"
                            id="hero-cta-whatsapp"
                        >
                            Pedir Ahora
                        </a>
                        {/* CTA Ubicación */}
                        <a
                            href="#location"
                            className="w-full sm:w-auto flex items-center justify-center bg-transparent border border-white text-white px-6 py-3.5 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg shadow-xl hover:shadow-2xl hover:scale-105 hover:bg-white hover:text-primary-600 hover:border-primary-600 transition-all duration-300 text-center"
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