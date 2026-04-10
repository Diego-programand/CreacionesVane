import { Metadata } from 'next';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HeroSection from './home-sections/HeroSection';
import ServicesSection from './home-sections/ServicesSection';
import FeaturedProductsSection from './home-sections/FeaturedProductsSection';
import CTASection from './home-sections/CTASection';
import LocationSection from './home-sections/LocationSection';
import ExperienceSection from './home-sections/ExperienceSection';

/**
 * ========================================
 *  HOME PAGE — CREACIONES VANE
 *  SEO Local: Medellín + Valle de Aburrá
 * ========================================
 * 
 * ESTRATEGIA SEO:
 * - Title: keyword transaccional "domicilio en Medellín"
 * - H1 (en HeroSection): "Regalos y Desayunos Sorpresa en Medellín"
 * - JSON-LD: LocalBusiness + FAQPage + BreadcrumbList
 * - Keywords: alta intención + geo-localizadas
 */

// ===== METADATA OPTIMIZADA CON KEYWORDS LOCALES TRANSACCIONALES =====
export const metadata: Metadata = {
  /* Title con keyword transaccional principal + diferenciador + CTA implícito */
  title: 'Regalos y Desayunos Sorpresa a Domicilio en Medellín | Creaciones Vane - Entrega Hoy',
  
  /* Description con CTA, precio, zonas y WhatsApp — max 160 chars visibles */
  description: 'Creaciones Vane: Regalos, anchetas, desayunos sorpresa, peluches y decoraciones a domicilio en Medellín. Entrega el mismo día en El Poblado, Envigado, Laureles, Sabaneta e Itagüí. Desde $50.000. WhatsApp 312 823 5654',
  
  /* Keywords agrupadas por intención de búsqueda */
  keywords: [
    // === Keywords transaccionales — ALTA conversión ===
    'regalos a domicilio medellín',
    'desayunos sorpresa a domicilio medellín',
    'anchetas a domicilio medellín entrega hoy',
    'comprar regalos medellín',
    'pedir desayuno sorpresa medellín',

    // === Keywords locales — Valle de Aburrá ===
    'regalos envigado',
    'desayunos sorpresa envigado',
    'detalles de amor itagüí',
    'anchetas el poblado',
    'desayunos sorpresa laureles',
    'regalos sabaneta',
    'anchetas bello antioquia',
    'detalles la estrella antioquia',

    // === Keywords por producto ===
    'anchetas personalizadas medellín',
    'desayunos sorpresa medellín',
    'peluches con flores medellín',
    'ramos de rosas a domicilio medellín',
    'cajas de chocolates medellín',
    'globos personalizados medellín',
    'decoración eventos medellín',
    'refrigerios empresariales medellín',

    // === Keywords por ocasión — temporalidad ===
    'regalos cumpleaños medellín',
    'detalles san valentín medellín',
    'anchetas día de la madre medellín',
    'regalos de aniversario medellín',
    'desayunos románticos medellín',

    // === Keywords long-tail — ultra específicas ===
    'desayunos sorpresa el mismo día medellín',
    'anchetas personalizadas con globos y peluches medellín',
    'ramos de rosas baratos a domicilio medellín',
    'mejor tienda de regalos en medellín',
    'arreglos florales con chocolates medellín',
  ],

  /* Canonical URL — evita contenido duplicado */
  alternates: {
    canonical: 'https://creacionesvane.com',
  },

  /* ===== OPEN GRAPH — Compartir en redes sociales ===== */
  openGraph: {
    title: 'Creaciones Vane - Regalos, Desayunos Sorpresa y Peluches a Domicilio en Medellín',
    description: 'Tu cómplice que endulza. Anchetas personalizadas, desayunos sorpresa, peluches, ramos de rosas y decoraciones con entrega el mismo día en Medellín, Envigado y Sabaneta. Desde $50.000',
    url: 'https://creacionesvane.com',
    siteName: 'Creaciones Vane',
    images: [
      {
        url: 'https://creacionesvane.com/banner-detalles.png',
        width: 1200,
        height: 630,
        alt: 'Regalos, anchetas y desayunos sorpresa a domicilio en Medellín - Creaciones Vane',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },

  /* ===== TWITTER CARD ===== */
  twitter: {
    card: 'summary_large_image',
    title: 'Creaciones Vane - Regalos a Domicilio en Medellín | Entrega Hoy',
    description: 'Desayunos sorpresa, anchetas, peluches y detalles de amor. Entrega el mismo día en Medellín. WhatsApp 312 823 5654',
    images: ['https://creacionesvane.com/banner-detalles.png'],
  },

  /* ===== GEO TAGS — SEO Local ===== */
  other: {
    'geo.region': 'CO-ANT',
    'geo.placename': 'Medellín, Antioquia, Colombia',
    'geo.position': '6.2476;-75.5658',
    'ICBM': '6.2476, -75.5658',
    'DC.title': 'Regalos y Desayunos Sorpresa a Domicilio en Medellín | Creaciones Vane',
    'DC.coverage': 'Medellín, Envigado, Itagüí, Bello, Sabaneta, Valle de Aburrá, Antioquia, Colombia',
  },
};

export default function Home() {
  // ===== JSON-LD: LOCAL BUSINESS COMPLETO =====
  // Tipo: LocalBusiness con areaServed para todo el Valle de Aburrá
  const jsonLdLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://creacionesvane.com/#localbusiness",
    "name": "Creaciones Vane - Regalos y Desayunos Sorpresa en Medellín",
    "alternateName": ["Creaciones Vane Medellín", "Anchetas Vane", "Creaciones Vane Regalos"],
    "image": [
      "https://creacionesvane.com/logo.png",
      "https://creacionesvane.com/banner-detalles.webp",
      "https://creacionesvane.com/banner-decoraciones.webp"
    ],
    "description": "Tienda especializada en regalos a domicilio, desayunos sorpresa, anchetas personalizadas, peluches, ramos de rosas, decoraciones para eventos y refrigerios en Medellín y el Valle de Aburrá. Entrega el mismo día. Desde 2019.",
    "url": "https://creacionesvane.com",
    "telephone": "+573128235654",
    "priceRange": "$$",
    "currenciesAccepted": "COP",
    "paymentAccepted": "Efectivo, Nequi, Daviplata, Transferencia Bancaria",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Carrera 50 #120-13",
      "addressLocality": "Medellín",
      "addressRegion": "Antioquia",
      "postalCode": "050001",
      "addressCountry": "CO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 6.2476,
      "longitude": -75.5658
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "15:00"
      }
    ],
    // Detalle completo de municipios del Valle de Aburrá
    "areaServed": [
      {
        "@type": "City",
        "name": "Medellín",
        "sameAs": "https://es.wikipedia.org/wiki/Medell%C3%ADn",
        "geo": { "@type": "GeoCoordinates", "latitude": 6.2476, "longitude": -75.5658 },
        "containedInPlace": {
          "@type": "AdministrativeArea",
          "name": "Valle de Aburrá",
          "containedInPlace": { "@type": "State", "name": "Antioquia" }
        }
      },
      {
        "@type": "City",
        "name": "Envigado",
        "geo": { "@type": "GeoCoordinates", "latitude": 6.1711, "longitude": -75.5906 }
      },
      {
        "@type": "City",
        "name": "Itagüí",
        "geo": { "@type": "GeoCoordinates", "latitude": 6.1848, "longitude": -75.5993 }
      },
      {
        "@type": "City",
        "name": "Bello",
        "geo": { "@type": "GeoCoordinates", "latitude": 6.3383, "longitude": -75.5559 }
      },
      {
        "@type": "City",
        "name": "Sabaneta",
        "geo": { "@type": "GeoCoordinates", "latitude": 6.1517, "longitude": -75.6165 }
      },
      {
        "@type": "City",
        "name": "La Estrella",
        "geo": { "@type": "GeoCoordinates", "latitude": 6.1572, "longitude": -75.6308 }
      },
      {
        "@type": "City",
        "name": "Copacabana",
        "geo": { "@type": "GeoCoordinates", "latitude": 6.3504, "longitude": -75.5115 }
      }
    ],
    // Catálogo de servicios con Desayunos, Regalos, Peluches, Decoración
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Regalos y Servicios Creaciones Vane Medellín",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Desayunos Sorpresa a Domicilio",
            "description": "Desayunos sorpresa con frutas, jugos, sándwich gourmet y decoración temática. Entrega a domicilio el mismo día en Medellín.",
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
            "name": "Anchetas y Regalos Personalizados",
            "description": "Anchetas con snacks, dulces, globos, peluches y chocolates. Regalos personalizados con mensaje de amor.",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "COP",
              "lowPrice": "50000",
              "highPrice": "200000",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Peluches con Globos y Chocolates",
            "description": "Peluches tiernos acompañados de globos, flores y cajas de chocolates. El regalo perfecto para cualquier ocasión especial en Medellín.",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "COP",
              "lowPrice": "35000",
              "highPrice": "120000",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Ramos de Rosas Frescos",
            "description": "Ramos de rosas frescas con entrega el mismo día en Medellín, Envigado y Sabaneta.",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "COP",
              "lowPrice": "50000",
              "highPrice": "160000",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Decoración Profesional de Eventos",
            "description": "Decoración para bodas, cumpleaños infantiles, baby shower y eventos corporativos en Medellín. Montaje y desmontaje incluido.",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "COP",
              "lowPrice": "300000",
              "highPrice": "650000",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Refrigerios para Eventos",
            "description": "Refrigerios individuales frescos para eventos corporativos, fiestas infantiles y reuniones en Medellín. Desde 10 unidades.",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "COP",
              "lowPrice": "5000",
              "highPrice": "15000",
              "availability": "https://schema.org/InStock"
            }
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "287",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // ===== BREADCRUMB SCHEMA =====
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://creacionesvane.com"
      }
    ]
  };

  // ===== FAQ SCHEMA — Preguntas frecuentes para Rich Snippets =====
  // Estas FAQs aparecerán directamente en Google como rich results
  const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Hacen entregas de regalos a domicilio en Medellín el mismo día?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, en Creaciones Vane realizamos entregas el mismo día en todo Medellín y el área metropolitana: El Poblado, Laureles, Envigado, Sabaneta, Itagüí, Bello y La Estrella. Contáctanos por WhatsApp al 312 823 5654 antes de las 2:00 PM para garantizar entrega el mismo día."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto cuesta un desayuno sorpresa en Medellín?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nuestros desayunos sorpresa en Medellín van desde $55.000 hasta $190.000 COP. Incluyen frutas frescas, jugos naturales, sándwich gourmet y decoración temática personalizada. El precio varía según el tamaño y acompañamientos adicionales como peluches, globos o ramos de rosas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué zonas de Medellín cubren para entregas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cubrimos todo el Valle de Aburrá: Medellín (El Poblado, Laureles, Belén, Robledo, Centro, Buenos Aires), Envigado, Sabaneta, Itagüí, Bello, La Estrella, Copacabana y Caldas. El costo del domicilio varía según la zona."
        }
      },
      {
        "@type": "Question",
        "name": "¿Puedo personalizar las anchetas y regalos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "¡Por supuesto! En Creaciones Vane cada ancheta y regalo es 100% personalizable. Puedes elegir los productos, colores, mensaje personalizado y acompañamientos como peluches, globos, chocolates o ramos de rosas. Escríbenos por WhatsApp al 312 823 5654 con tu idea y la hacemos realidad."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué métodos de pago aceptan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aceptamos pagos en efectivo contra entrega, transferencia bancaria, Nequi y Daviplata. Para garantizar tu pedido, solicitamos un anticipo del 50% al confirmar."
        }
      }
    ]
  };

  return (
    <>
      {/* ===== SCHEMAS JSON-LD — SEO Estructurado ===== */}
      {/* LocalBusiness: Cobertura completa Valle de Aburrá */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
      />
      {/* BreadcrumbList: Navegación jerárquica */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      {/* FAQPage: Rich snippets en Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />

      <Header />
      
      {/* ===== ESTRUCTURA SEMÁNTICA PRINCIPAL =====
           H1 → "Regalos y Desayunos Sorpresa en Medellín" (en HeroSection)
           H2 → Secciones del Home (Services, Featured, Location, etc.)
           H3 → Subsecciones dentro de cada sección */}
      <main>
        {/* H1 dentro de HeroSection: "Regalos y Desayunos Sorpresa en Medellín" */}
        <HeroSection />
        
        {/* H2: "Momentos para Recordar" — Categorías de servicios */}
        <ServicesSection />
        
        {/* H2: "Productos Destacados" — Carrusel de productos */}
        <FeaturedProductsSection />
        
        {/* H2: "Nuestra Tienda en Medellín" — Mapa + ubicación */}
        <LocationSection />
        
        {/* H2: CTA de conversión */}
        <CTASection />
        
        {/* H2: Experiencia + social proof */}
        <ExperienceSection />
      </main>
      
      <Footer />
      
      {/* Widget flotante WhatsApp — optimizado para móvil */}
      <WhatsAppButton />
    </>
  );
}