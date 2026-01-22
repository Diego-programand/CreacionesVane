import Image from 'next/image';
import ScrollReveal from '../components/ScrollReveal';

export default function HeroSection() {
    return (
        <section className="relative h-[450px] flex items-center justify-center overflow-hidden">
            <Image
                src="/banner-detalles.webp"
                alt="Banner Creaciones Vane"
                priority={true}
                fetchPriority="high"
                loading="eager"
                fill
                className="object-cover object-center blur-[5px]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary-600/80 via-primary-500/70 to-primary-700/80" />

            <div className="relative z-10 text-center px-4 max-w-4xl w-full">
                {/* QUITAMOS SCROLLREVEAL DEL LOGO */}
                <Image
                    src="/logo.png"
                    alt="Creaciones Vane Logo"
                    width={120}
                    height={120}
                    priority // Añade priority también al logo si es parte del LCP
                    className="mx-auto mb-3 rounded-full shadow-2xl bg-white p-2"
                />

                {/* QUITAMOS SCROLLREVEAL DE LOS TÍTULOS */}
                <h1 className="text-4xl md:text-5xl font-sm font-script text-white mb-3 drop-shadow-lg">
                    Creaciones Vane
                </h1>
                <p className="text-2xl md:text-3xl text-white/95 mb-4 font-script drop-shadow-md">
                    Cómplice que endulza
                </p>

                <p className="text-base md:text-lg text-white/95 mb-6 max-w-2xl mx-auto drop-shadow-md">
                    Desde 2019 creando momentos especiales con detalles de amor,
                    refrigerios deliciosos y decoraciones que inspiran
                </p>
                <ScrollReveal direction="up" delay={0.2}>
                    <div className="grid grid-cols-2 p-3 gap-3 sm:flex sm:justify-center sm:gap-6">
                        <a
                            href="https://wa.me/573128235654?text=¡Hola!%20Quiero%20conocer%20más%20sobre%20sus%20servicios%20💝"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center bg-white text-primary-600 px-4 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-lg shadow-xl hover:shadow-2xl hover:scale-105 hover:bg-primary-50 transition-all duration-300 text-center"
                        >
                            Contáctanos
                        </a>
                        <a
                            href="#location"
                            className="flex items-center justify-center bg-transparent border border-white text-white px-4 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-lg shadow-xl hover:shadow-2xl hover:scale-105 hover:bg-white hover:text-primary-600 hover:border-primary-600 transition-all duration-300 text-center"
                        >
                            Cómo llegar
                        </a>
                    </div>
                </ScrollReveal>

            </div>
        </section>
    );
}