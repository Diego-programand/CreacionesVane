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

// METADATA OPTIMIZADA CON KEYWORDS LOCALES ESTRATÉGICAS
export const metadata: Metadata = {
  title: 'Anchetas y Desayunos Sorpresa en Medellín | Creaciones Vane - Entrega en El Poblado, Envigado, Laureles',
  description: 'Creaciones Vane: Anchetas personalizadas, desayunos sorpresa, ramos de rosas, decoraciones para eventos y refrigerios en Medellín. Entrega el mismo día en El Poblado, Laureles, Envigado, Sabaneta e Itagüí. ¡Detalles desde $50.000! WhatsApp 312 823 5654',
  keywords: [
    // Keywords primarias - Alto volumen
    'anchetas medellín',
    'desayunos sorpresa medellín',
    'regalos a domicilio medellín',
    'detalles de amor medellín',

    // Keywords por zona - SEO Local
    'anchetas el poblado',
    'desayunos sorpresa laureles',
    'regalos envigado',
    'anchetas sabaneta',
    'detalles itagüí',

    // Keywords long-tail - Alta conversión
    'desayunos sorpresa el mismo día medellín',
    'anchetas personalizadas con globos medellín',
    'ramos de rosas a domicilio medellín',
    'decoración de eventos medellín',
    'refrigerios empresariales medellín',

    // Keywords por ocasión
    'regalos cumpleaños medellín',
    'detalles san valentín medellín',
    'anchetas día de la madre medellín',
    'desayunos románticos medellín',

    // Keywords por producto específico
    'ramos de rosas medellín',
    'cajas de chocolates medellín',
    'globos personalizados medellín',
    'peluches con flores medellín'
  ],
  alternates: {
    canonical: 'https://creacionesvane.com',
  },
  openGraph: {
    title: 'Creaciones Vane - Anchetas y Desayunos Sorpresa en Medellín',
    description: 'Tu cómplice que endulza. Anchetas personalizadas, desayunos sorpresa y decoraciones con entrega el mismo día en todo Medellín. Desde $50.000',
    url: 'https://creacionesvane.com',
    siteName: 'Creaciones Vane',
    images: [
      {
        url: 'https://creacionesvane.com/banner-detalles.png',
        width: 1200,
        height: 630,
        alt: 'Anchetas y desayunos sorpresa personalizados en Medellín - Creaciones Vane',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creaciones Vane - Anchetas y Desayunos Sorpresa en Medellín',
    description: 'Detalles de amor con entrega el mismo día en Medellín. WhatsApp 312 823 5654',
    images: ['https://creacionesvane.com/banner-detalles.png'],
  },
  other: {
    'geo.region': 'CO-ANT',
    'geo.placename': 'Medellín',
    'geo.position': '6.297486;-75.553924',
    'ICBM': '6.297486, -75.553924',
  },
};

export default function Home() {
  // JSON-LD SCHEMA COMPLETO - ORGANIZATION + LOCAL BUSINESS
  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Creaciones Vane",
    "alternateName": ["Creaciones Vane Medellín", "Anchetas Vane"],
    "url": "https://creacionesvane.com",
    "logo": "https://creacionesvane.com/logo.png",
    "description": "Empresa especializada en anchetas personalizadas, desayunos sorpresa, decoraciones para eventos y refrigerios en Medellín desde 2019",
    "foundingDate": "2019",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+57-312-823-5654",
      "contactType": "customer service",
      "areaServed": "CO",
      "availableLanguage": ["Spanish"]
    },
    "sameAs": [
      "https://www.instagram.com/creacionesvane",
      "https://www.facebook.com/creacionesvane",
      "https://wa.me/573128235654"
    ]
  };

  const jsonLdLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Creaciones Vane - Anchetas y Desayunos Sorpresa",
    "image": "https://creacionesvane.com/logo.png",
    "description": "Especialistas en anchetas personalizadas, desayunos sorpresa, ramos de rosas y decoraciones para eventos en Medellín. Entrega el mismo día.",
    "url": "https://creacionesvane.com",
    "telephone": "+573128235654",
    "priceRange": "$$",
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
      "latitude": 6.297486,
      "longitude": -75.553924
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
    "areaServed": [
      {
        "@type": "City",
        "name": "Medellín",
        "containedIn": {
          "@type": "AdministrativeArea",
          "name": "Antioquia"
        }
      },
      { "@type": "City", "name": "Envigado" },
      { "@type": "City", "name": "Sabaneta" },
      { "@type": "City", "name": "Itagüí" },
      { "@type": "City", "name": "La Estrella" },
      { "@type": "City", "name": "Bello" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Productos y Servicios Creaciones Vane",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Anchetas Personalizadas",
            "description": "Anchetas con snacks, dulces, globos y peluches personalizados",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "COP",
              "lowPrice": "50000",
              "highPrice": "200000"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Desayunos Sorpresa",
            "description": "Desayunos a domicilio con frutas, jugos, sándwich y decoración temática",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "COP",
              "lowPrice": "55000",
              "highPrice": "190000"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Decoración de Eventos",
            "description": "Decoración profesional para bodas, cumpleaños, baby shower y eventos corporativos",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "COP",
              "lowPrice": "300000",
              "highPrice": "650000"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Refrigerios para Eventos",
            "description": "Refrigerios individuales para eventos corporativos y fiestas infantiles",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "COP",
              "lowPrice": "5000",
              "highPrice": "15000"
            }
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "156",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // BREADCRUMB SCHEMA
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

  return (
    <>
      {/* SCHEMAS JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <FeaturedProductsSection />
        <LocationSection />
        <CTASection />
        <ExperienceSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}