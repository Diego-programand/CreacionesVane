import { Metadata } from 'next';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollReveal from '../components/ScrollReveal';
import ProductCatalog from '../components/ProductCatalog';

// METADATA ESTÁTICA - NO 'use client'
export const metadata: Metadata = {
  /* Title con keyword transaccional "a domicilio" + geo */
  title: 'Anchetas y Desayunos Sorpresa a Domicilio en Medellín | Creaciones Vane - Peluches, Ramos y Regalos',
  /* Description con CTA, precio, zonas y WhatsApp */
  description: 'Anchetas personalizadas, desayunos sorpresa, peluches y ramos de rosas a domicilio en Medellín. Entrega el mismo día en El Poblado, Laureles, Envigado, Sabaneta e Itagüí. Regalos desde $50.000. WhatsApp 312 823 5654',
  keywords: [
    'anchetas medellín',
    'desayunos sorpresa medellín',
    'ramos de rosas medellín',
    'detalles a domicilio medellín',
    'regalos personalizados medellín',
    'anchetas el poblado',
    'desayunos sorpresa laureles',
    'regalos envigado',
    'anchetas con globos medellín',
    'desayunos románticos medellín',
    'ramos a domicilio medellín',
    'detalles san valentín medellín',
    'anchetas cumpleaños medellín',
    'cajas sorpresa medellín',
    'flores a domicilio medellín'
  ],
  alternates: {
    canonical: 'https://creacionesvane.com/creaciones-vane',
  },
  openGraph: {
    type: 'website',
    url: 'https://creacionesvane.com/creaciones-vane',
    title: 'Anchetas y Desayunos Sorpresa en Medellín | Creaciones Vane',
    description: 'Detalles de amor que alegran el corazón. Anchetas, desayunos sorpresa y flores con entrega el mismo día en todo Medellín.',
    images: [
      {
        url: 'https://creacionesvane.com/banner-detalles.png',
        width: 1200,
        height: 630,
        alt: 'Anchetas personalizadas y desayunos sorpresa en Medellín - Creaciones Vane'
      }
    ],
    locale: 'es_CO',
    siteName: 'Creaciones Vane',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anchetas y Desayunos Sorpresa en Medellín | Creaciones Vane',
    description: 'Detalles de amor con entrega el mismo día. WhatsApp 312 823 5654',
    images: ['https://creacionesvane.com/banner-detalles.png'],
  },
  other: {
    'geo.region': 'CO-ANT',
    'geo.placename': 'Medellín',
    'geo.position': '6.297486;-75.553924',
    'ICBM': '6.297486, -75.553924',
  },
};

export default function CreacionesVanePage() {
  // JSON-LD OPTIMIZADO
  const jsonLdStore = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Creaciones Vane - Detalles de Amor",
    "description": "Anchetas personalizadas, desayunos sorpresa, ramos de rosas y cajas de regalo en Medellín con entrega el mismo día",
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
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "20:00"
      }
    ],
    "areaServed": [
      { "@type": "City", "name": "Medellín" },
      { "@type": "City", "name": "El Poblado" },
      { "@type": "City", "name": "Laureles" },
      { "@type": "City", "name": "Envigado" },
      { "@type": "City", "name": "Sabaneta" },
      { "@type": "City", "name": "Itagüí" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Detalles de Amor",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Anchetas Personalizadas",
            "description": "Anchetas con snacks, dulces, globos y mensaje personalizado",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "COP",
              "lowPrice": "50000",
              "highPrice": "180000",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Desayunos Sorpresa",
            "description": "Desayunos a domicilio con frutas, jugos, sándwich y decoración",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "COP",
              "lowPrice": "55000",
              "highPrice": "190000",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Ramos de Rosas",
            "description": "Ramos de rosas frescas con entrega el mismo día",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "COP",
              "lowPrice": "50000",
              "highPrice": "160000",
              "availability": "https://schema.org/InStock"
            }
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "143",
      "bestRating": "5"
    }
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://creacionesvane.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Anchetas y Desayunos Sorpresa",
        "item": "https://creacionesvane.com/creaciones-vane"
      }
    ]
  };

  return (
    <>
      {/* SCHEMAS JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdStore) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <header className="relative h-[380px] flex items-center justify-center overflow-hidden">
          {/* Imagen banner con ALT geo-localizado para SEO de imágenes */}
          <Image
            src="/banner-detalles.webp"
            alt="Anchetas personalizadas y desayunos sorpresa a domicilio en Medellín - Creaciones Vane detalles de amor"
            fill
            className="object-cover object-center blur-[2px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-600/80 via-primary-500/70 to-primary-700/80" />

          <div className="relative z-10 text-center px-4 max-w-4xl w-full">
            <ScrollReveal direction="down" delay={0.2}>
              <Image
                src="/logo.png"
                alt="Logo Creaciones Vane - Tienda de anchetas y regalos en Medellín"
                width={120}
                height={120}
                className="mx-auto mb-3 rounded-full shadow-2xl bg-white p-2"
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              {/* H1 con keyword transaccional + geo para SEO local */}
              <h1 className="text-4xl md:text-5xl font-sm font-script text-white mb-3 drop-shadow-lg">
                Anchetas y Desayunos Sorpresa a Domicilio en Medellín
              </h1>
              <p className="text-2xl md:text-3xl text-white/95 mb-4 font-script drop-shadow-md">
                Creaciones Vane — Cómplice que Endulza
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.6}>
              {/* Descripción con keywords long-tail para Medellín */}
              <p className="text-base md:text-lg text-white/95 max-w-2xl mx-auto drop-shadow-md">
                Regalos personalizados, peluches, ramos de rosas y detalles de amor con entrega el mismo día en Medellín, Envigado, Sabaneta e Itagüí.
              </p>
            </ScrollReveal>
          </div>
        </header>

        {/* Catálogo de productos */}
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