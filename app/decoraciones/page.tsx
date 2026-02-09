import { Metadata } from 'next';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollReveal from '../components/ScrollReveal';
import ProductCatalog from '../components/ProductCatalog';
import { getCldVideoUrl } from '../data/mockData';

// METADATA ESTÁTICA ULTRA OPTIMIZADA
export const metadata: Metadata = {
  title: 'Decoración de Eventos en Medellín | Decoraciones Vane - Bodas, Cumpleaños, Baby Shower desde $300.000',
  description: 'Decoración profesional para bodas, cumpleaños infantiles, quinceañeras y Baby Shower en Medellín. Montaje completo con globos, flores, backdrop y arcos. Servicio en El Poblado, Laureles, Envigado. Montaje y desmontaje incluido. WhatsApp 312 823 5654',
  keywords: [
    // Keywords primarias - Alto volumen
    'decoración eventos medellín',
    'decoración bodas medellín',
    'decoración cumpleaños medellín',
    'baby shower medellín',
    'decoración con globos medellín',

    // Keywords por tipo de evento
    'decoración cumpleaños infantiles medellín',
    'decoración quinceañeras medellín',
    'decoración bodas campestres medellín',
    'decoración baby shower niña medellín',
    'decoración baby shower niño medellín',
    'decoración primer añito medellín',
    'decoración bautizo medellín',
    'decoración eventos corporativos medellín',

    // Keywords por zona - SEO Local
    'decoración eventos el poblado',
    'montaje decoración laureles',
    'decoración fiestas envigado',
    'decoración eventos sabaneta',
    'backdrop medellín el poblado',

    // Keywords long-tail - Alta conversión
    'decoración temática paw patrol medellín',
    'arcos de globos orgánicos medellín',
    'montaje completo decoración eventos medellín',
    'decoración elegante bodas medellín',
    'decoración económica cumpleaños medellín',

    // Keywords por servicio específico
    'backdrop medellín',
    'arcos de globos medellín',
    'globos orgánicos medellín',
    'centros de mesa medellín',
    'montaje decoración medellín',
    'alquiler decoración eventos medellín',

    // Keywords por estilo
    'decoración minimalista medellín',
    'decoración vintage medellín',
    'decoración moderna medellín',
    'decoración rústica medellín',
    'decoración temática medellín',

    // Keywords comparativas
    'mejor decoración eventos medellín',
    'decoración profesional medellín',
    'decoración económica y bonita medellín'
  ],
  alternates: {
    canonical: 'https://creacionesvane.com/decoraciones',
  },
  openGraph: {
    type: 'website',
    url: 'https://creacionesvane.com/decoraciones',
    title: 'Decoración de Eventos en Medellín | Decoraciones Vane',
    description: 'Espacios que inspiran. Decoración profesional para bodas, cumpleaños, quinceañeras y Baby Shower en Medellín con montaje completo.',
    images: [
      {
        url: 'https://creacionesvane.com/banner-decoraciones.png',
        width: 1200,
        height: 630,
        alt: 'Decoración profesional de eventos en Medellín - Bodas, cumpleaños y Baby Shower'
      }
    ],
    locale: 'es_CO',
    siteName: 'Creaciones Vane',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decoración de Eventos en Medellín | Decoraciones Vane',
    description: 'Transformamos tu evento en un momento inolvidable. Decoración profesional con montaje completo. WhatsApp 312 823 5654',
    images: ['https://creacionesvane.com/banner-decoraciones.png'],
  },
  other: {
    'geo.region': 'CO-ANT',
    'geo.placename': 'Medellín',
    'geo.position': '6.297486;-75.553924',
    'ICBM': '6.297486, -75.553924',
  },
};

export default function DecoracionesPage() {
  //  JSON-LD LOCAL BUSINESS CON SERVICIOS DETALLADOS
  const jsonLdLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://creacionesvane.com/decoraciones",
    "name": "Decoraciones Vane - Decoración Profesional de Eventos",
    "alternateName": "Decoraciones Vane Medellín",
    "description": "Servicio profesional de decoración para bodas, cumpleaños infantiles, quinceañeras, Baby Shower y eventos corporativos en Medellín. Montaje completo con globos orgánicos, flores, backdrop y mobiliario.",
    "url": "https://creacionesvane.com/decoraciones",
    "telephone": "+573128235654",
    "priceRange": "$$-$$$",
    "image": [
      "https://creacionesvane.com/banner-decoraciones.png",
      "https://creacionesvane.com/logo-decoraciones.jpeg"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Carrera 50 #120-13",
      "addressLocality": "Medellín",
      "addressRegion": "Antioquia",
      "addressCountry": "CO",
      "postalCode": "050001"
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
      {
        "@type": "City",
        "name": "Medellín",
        "description": "Decoración de eventos en toda Medellín"
      },
      {
        "@type": "Place",
        "name": "El Poblado",
        "description": "Montaje de decoraciones en salones y fincas de El Poblado"
      },
      {
        "@type": "Place",
        "name": "Laureles",
        "description": "Servicio de decoración zona Laureles"
      },
      { "@type": "City", "name": "Envigado" },
      { "@type": "City", "name": "Sabaneta" },
      { "@type": "City", "name": "Itagüí" },
      { "@type": "City", "name": "Bello" },
      { "@type": "City", "name": "La Estrella" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Decoración Profesional",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Decoración de Bodas",
            "description": "Decoración completa para bodas con arco nupcial, centros de mesa, iluminación decorativa y backdrop personalizado. Incluye montaje y desmontaje.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Decoraciones Vane"
            },
            "areaServed": "Medellín, Antioquia",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "COP",
              "price": "480000",
              "priceValidUntil": "2026-12-31",
              "availability": "https://schema.org/InStock",
              "itemCondition": "https://schema.org/NewCondition"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Decoración Cumpleaños Infantil",
            "description": "Decoración temática personalizada con globos orgánicos, aro central, cilindros decorativos, backdrop y figuras del personaje favorito. Incluye transporte, montaje y desmontaje.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Decoraciones Vane"
            },
            "areaServed": "Medellín, Antioquia",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "COP",
              "price": "300000",
              "priceValidUntil": "2026-12-31",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Decoración Baby Shower",
            "description": "Montaje profesional con globos orgánicos en tonos pastel, mesa dulce decorada, backdrop elegante y mobiliario completo. Diseños para niña o niño.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Decoraciones Vane"
            },
            "areaServed": "Medellín, Antioquia",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "COP",
              "price": "400000",
              "priceValidUntil": "2026-12-31",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Decoración Quinceañeras",
            "description": "Decoración elegante y sofisticada con arcos de globos, iluminación especial, backdrop para fotos y ambientación completa según temática elegida.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Decoraciones Vane"
            },
            "areaServed": "Medellín, Antioquia",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "COP",
              "price": "450000",
              "priceValidUntil": "2026-12-31",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Decoración Temática Premium",
            "description": "Montaje de lujo con fondo Shimmer, múltiples backings, arcos de puerta, números luminosos y figuras a escala. Ideal para eventos especiales de gran formato.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Decoraciones Vane"
            },
            "areaServed": "Medellín, Antioquia",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "COP",
              "price": "650000",
              "priceValidUntil": "2026-12-31",
              "availability": "https://schema.org/InStock"
            }
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "name": "Montaje y Desmontaje Incluido",
        "description": "Servicio completo con instalación profesional y retiro del mobiliario"
      },
      {
        "@type": "Offer",
        "name": "Diseños Personalizados",
        "description": "Adaptamos cada decoración a tus colores, temática y preferencias"
      },
      {
        "@type": "Offer",
        "name": "Transporte Incluido",
        "description": "Llevamos todo el material a tu evento sin costo adicional en el área metropolitana"
      }
    ]
  };

  //  BREADCRUMB SCHEMA
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
        "name": "Decoración de Eventos",
        "item": "https://creacionesvane.com/decoraciones"
      }
    ]
  };

  //  FAQ SCHEMA ESPECÍFICO PARA DECORACIONES
  const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿El precio incluye montaje y desmontaje?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, todos nuestros paquetes incluyen el servicio completo de transporte, montaje profesional y desmontaje al finalizar el evento en el área metropolitana de Medellín (El Poblado, Laureles, Envigado, Sabaneta)."
        }
      },
      {
        "@type": "Question",
        "name": "¿Puedo personalizar los colores y la temática?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "¡Por supuesto! Adaptamos cada decoración a tus preferencias de colores, temática del evento y estilo. Trabajamos con temas infantiles (Paw Patrol, Toy Story, Stitch), elegantes (bodas, quinceañeras) y personalizados según tu visión."
        }
      },
      {
        "@type": "Question",
        "name": "¿Con cuánto tiempo de anticipación debo reservar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Recomendamos reservar con al menos 1 semana de anticipación para garantizar disponibilidad. Para eventos en fechas especiales (diciembre, día de la madre, etc.) sugerimos reservar con 2-3 semanas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Hacen decoraciones para eventos al aire libre?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, decoramos eventos tanto en espacios cerrados como al aire libre (fincas, jardines, terrazas). Tomamos precauciones especiales para eventos outdoor considerando condiciones climáticas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué incluye el servicio de decoración?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cada paquete incluye: diseño personalizado, globos orgánicos o temáticos, mobiliario decorativo (cilindros, bases, tarimas según paquete), backdrop, transporte, montaje profesional y desmontaje. Los detalles específicos varían según el paquete elegido."
        }
      }
    ]
  };

  //  SERVICE SCHEMA (Para aparecer en Google Services)
  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Decoración de Eventos",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Decoraciones Vane",
      "telephone": "+573128235654",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Medellín",
        "addressRegion": "Antioquia",
        "addressCountry": "CO"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "Medellín"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Decoración",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Bodas",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Decoración Bodas Completa"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Cumpleaños Infantiles",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Decoración Temática Infantil"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Baby Shower",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Decoración Baby Shower"
              }
            }
          ]
        }
      ]
    }
  };

  return (
    <>
      {/*  SCHEMAS JSON-LD MÚLTIPLES */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />

      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <header className="relative h-[380px] flex items-center justify-center overflow-hidden">
          <Image
            src="/banner-decoraciones.webp"
            alt="Decoración profesional de eventos en Medellín - Bodas, cumpleaños y Baby Shower"
            fill
            className="object-cover object-center blur-[5px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#D81B60]/60 via-[#B39DDB]/75 to-[#A0E7E5]/60" />

          <div className="relative z-10 text-center px-4 max-w-4xl w-full">
            <ScrollReveal direction="down" delay={0.2}>
              <Image
                src="/logo-decoraciones.jpeg"
                alt="Logo Decoraciones Vane"
                width={120}
                height={120}
                className="mx-auto mb-3 rounded-full shadow-2xl bg-white p-1"
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                Decoraciones Vane
              </h1>
              <p className="text-2xl md:text-3xl text-white/95 mb-4 font-script drop-shadow-md">
                Espacios que inspiran
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.6}>
              <p className="text-base md:text-lg text-white/95 max-w-2xl mx-auto drop-shadow-md">
                Decoración profesional para toda ocasión en Medellín. Hacemos realidad la celebración que imaginas.
              </p>
            </ScrollReveal>
          </div>
        </header>

        {/* CATÁLOGO */}
        <ProductCatalog
          theme="decoraciones"
          title="Nuestras Decoraciones"
          shuffleOnLoad={true}
        />

        {/* CTA Final */}
        <section className="relative py-16 md:py-18 overflow-hidden">
          <div className="absolute inset-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="https://res.cloudinary.com/dw7zhnbho/image/upload/f_auto,q_auto,w_1200/fallback-balloons_mqkzzp.webp"
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
            >
              <source src={getCldVideoUrl('balloons-background_bfmiuo')} type="video/mp4" />
              Tu navegador no soporta videos.
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-[#D81B60]/70 via-[#FF85A2]/60 to-[#B39DDB]/70" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal direction="down" delay={0.2}>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-2xl">
                  ¿Listo para crear la celebración perfecta?
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4}>
                <p className="text-lg md:text-xl lg:text-2xl mb-10 text-white/95 drop-shadow-lg leading-relaxed">
                  Contáctanos y transformemos tu evento en un momento inolvidable
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.6}>
                <a
                  href="https://wa.me/573128235654?text=¡Hola!%20Quiero%20cotizar%20una%20decoración%20para%20mi%20evento%20🎈"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-[#D81B60] px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-base md:text-lg shadow-2xl hover:shadow-[0_20px_60px_rgba(216,27,96,0.4)] hover:scale-105 hover:bg-pink-50 transition-all duration-300 group"
                  aria-label="Enviar mensaje por WhatsApp"
                >
                  <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Enviar mensaje por WhatsApp</span>
                  <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </ScrollReveal>

              <ScrollReveal direction="fade" delay={0.8}>
                <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-12 text-white/90">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm md:text-base font-semibold">Desde 2019</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm md:text-base font-semibold">Diseños únicos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span className="text-sm md:text-base font-semibold">Montaje profesional</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}