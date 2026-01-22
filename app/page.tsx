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

export const metadata: Metadata = {
  title: 'Anchetas y Desayunos Sorpresa en Medellín | Creaciones Vane',
  description: 'Anchetas personalizadas, desayunos sorpresa, decoraciones para eventos, ramos de rosas y refrigerios para tus eventos en Medellín. Entrega en El Poblado, Laureles, Envigado. ¡Detalles desde $40.000!',
  keywords: ['anchetas medellín', 'desayunos sorpresa medellín', 'regalos a domicilio medellín'],
  alternates: {
    canonical: 'https://creacionesvane.com',
  },
  openGraph: {
    title: 'Anchetas y Desayunos Sorpresa en Medellín | Creaciones Vane',
    description: 'Detalles de amor que alegran el corazón. Entrega el mismo día en todo Medellín.',
    url: 'https://creacionesvane.com',
    siteName: 'Creaciones Vane',
    images: [
      {
        url: 'https://creacionesvane.com/banner-detalles.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  other: {
    'geo.region': 'CO-ANT',
    'geo.placename': 'Medellín',
    'geo.position': '6.297486;-75.553924',
    'ICBM': '6.297486, -75.553924',
  },
};

export default function Home() {
  // 2. JSON-LD (Datos Estructurados)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Creaciones Vane - Detalles de Amor",
    "description": "Anchetas personalizadas y desayunos sorpresa en Medellín.",
    "url": "https://creacionesvane.com",
    "telephone": "+573128235654",
    "address": {
      "@type": "PostalAddress",
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
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  };

  return (
    <>
      {/* Insertar el JSON-LD en el cuerpo para el App Router */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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