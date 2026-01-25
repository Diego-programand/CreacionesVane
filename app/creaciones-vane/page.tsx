'use client';

import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollReveal from '../components/ScrollReveal';
import ProductCatalog from '../components/ProductCatalog';

export default function CreacionesVanePage() {
  return (
    <>
      <Head>
        <title>Anchetas y Desayunos Sorpresa en Medellín | Creaciones Vane</title>
        <meta
          name="description"
          content="Anchetas personalizadas, desayunos sorpresa y ramos de rosas en Medellín. Entrega el mismo día en Poblado, Laureles, Envigado. ¡Detalles desde $50.000!"
        />
        <meta
          name="keywords"
          content="anchetas medellín, desayunos sorpresa medellín, ramos de rosas medellín, detalles a domicilio medellín, regalos personalizados medellín"
        />
        <link rel="canonical" href="https://creacionesvane.com/creaciones-vane" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creacionesvane.com/creaciones-vane" />
        <meta property="og:title" content="Anchetas y Desayunos Sorpresa en Medellín | Creaciones Vane" />
        <meta property="og:description" content="Detalles de amor que alegran el corazón. Anchetas, desayunos sorpresa y flores con entrega el mismo día en Medellín." />
        <meta property="og:image" content="https://creacionesvane.com/banner-detalles.png" />
        <meta property="og:locale" content="es_CO" />

        {/* Geo tags */}
        <meta name="geo.region" content="CO-ANT" />
        <meta name="geo.placename" content="Medellín" />
        <meta name="geo.position" content="6.297486;-75.553924" />
        <meta name="ICBM" content="6.297486, -75.553924" />

        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              "name": "Creaciones Vane - Detalles de Amor",
              "description": "Anchetas personalizadas, desayunos sorpresa, ramos de rosas y decoraciones en Medellín.",
              "url": "https://creacionesvane.com/creaciones-vane",
              "telephone": "+573128235654",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "postalCode": "050001",
                "streetAddress": "Carrera 50 #120-13",
                "addressLocality": "Medellín",
                "addressRegion": "Antioquia",
                "addressCountry": "CO"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 6.297486,
                "longitude": -75.553924
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "09:00",
                "closes": "18:00"
              },
              "areaServed": [
                { "@type": "City", "name": "Medellín" },
                { "@type": "City", "name": "Envigado" },
                { "@type": "City", "name": "Sabaneta" },
                { "@type": "City", "name": "El poblado" },
                { "@type": "City", "name": "Itagüí" }
              ]
            })
          }}
        />
      </Head>

      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <header className="relative h-[350px] flex items-center justify-center overflow-hidden">
          <Image
            src="/banner-detalles.webp"
            alt="Anchetas y desayunos sorpresa en Medellín - Creaciones Vane"
            fill
            className="object-cover object-center blur-[2px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-600/80 via-primary-500/70 to-primary-700/80" />

          <div className="relative z-10 text-center px-4 max-w-4xl w-full">
            <ScrollReveal direction="down" delay={0.2}>
              <Image
                src="/logo.png"
                alt="Logo Creaciones Vane"
                width={120}
                height={120}
                className="mx-auto mb-3 rounded-full shadow-2xl bg-white p-2"
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <h1 className="text-4xl md:text-5xl font-sm font-script text-white mb-3 drop-shadow-lg">
                Creaciones Vane
              </h1>
              <p className="text-2xl md:text-3xl text-white/95 mb-4 font-script drop-shadow-md">
                Cómplice que endulza
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.6}>
              <p className="text-base md:text-lg text-white/95 max-w-2xl mx-auto drop-shadow-md">
                Detalles de amor que alegran el corazón. Anchetas, desayunos, ramos y más en Medellín.
              </p>
            </ScrollReveal>
          </div>
        </header>

        {/* Catálogo de productos - Ahora es solo una línea! */}
        <ProductCatalog
          theme="detalles"
          title="Nuestros Detalles de Amor"
          shuffleOnLoad={true}
        />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}