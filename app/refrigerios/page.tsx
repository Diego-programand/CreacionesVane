import { Metadata } from 'next';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollReveal from '../components/ScrollReveal';
import ProductCatalog from '../components/ProductCatalog';
import { getCldVideoUrl } from '../data/mockData';

//  METADATA ESTÁTICA
export const metadata: Metadata = {
  title: 'Refrigerios para Eventos en Medellín | Refrigerios Vane - Corporativos e Infantiles desde $5.000',
  description: 'Refrigerios frescos para eventos corporativos, fiestas infantiles y reuniones en Medellín. Box lunch, sándwiches gourmet, frutas y bebidas. Entrega puntual en El Poblado, Laureles, Envigado. Pedido mínimo 15 unidades. WhatsApp 312 823 5654',
  keywords: [
    // Keywords primarias - Alto volumen
    'refrigerios medellín',
    'refrigerios para eventos medellín',
    'refrigerios empresariales medellín',
    'box lunch medellín',
    'catering medellín',

    // Keywords por tipo de evento
    'refrigerios fiestas infantiles medellín',
    'refrigerios corporativos medellín',
    'lunch empresarial medellín',
    'refrigerios para conferencias medellín',
    'refrigerios para capacitaciones medellín',
    'refrigerios reuniones medellín',

    // Keywords por zona - SEO Local
    'refrigerios el poblado',
    'box lunch laureles',
    'catering envigado',
    'refrigerios sabaneta',
    'lunch empresarial el poblado',

    // Keywords long-tail - Alta conversión
    'refrigerios económicos para eventos medellín',
    'refrigerios saludables empresariales medellín',
    'box lunch con frutas medellín',
    'refrigerios personalizados logo empresa medellín',
    'catering eventos pequeños medellín',

    // Keywords por producto
    'sándwich gourmet eventos medellín',
    'croissant eventos medellín',
    'refrigerios con fruta fresca medellín',
    'lunch individual medellín',

    // Keywords comparativas
    'mejor catering medellín',
    'refrigerios económicos y buenos medellín',
    'refrigerios entrega puntual medellín'
  ],
  alternates: {
    canonical: 'https://creacionesvane.com/refrigerios',
  },
  openGraph: {
    type: 'website',
    url: 'https://creacionesvane.com/refrigerios',
    title: 'Refrigerios para Eventos en Medellín | Refrigerios Vane',
    description: 'Sabor en cada evento. Refrigerios frescos y deliciosos para eventos corporativos, fiestas infantiles y reuniones en Medellín. Entrega puntual garantizada.',
    images: [
      {
        url: 'https://creacionesvane.com/banner-refrigerios.png',
        width: 1200,
        height: 630,
        alt: 'Refrigerios para eventos corporativos e infantiles en Medellín - Refrigerios Vane'
      }
    ],
    locale: 'es_CO',
    siteName: 'Creaciones Vane',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refrigerios para Eventos en Medellín | Refrigerios Vane',
    description: 'Refrigerios frescos con ingredientes de calidad. Entrega puntual garantizada. WhatsApp 312 823 5654',
    images: ['https://creacionesvane.com/banner-refrigerios.png'],
  },
  other: {
    'geo.region': 'CO-ANT',
    'geo.placename': 'Medellín',
    'geo.position': '6.297486;-75.553924',
    'ICBM': '6.297486, -75.553924',
  },
};

export default function RefrigeriosPage() {
  //  JSON-LD FOOD ESTABLISHMENT CON MENÚ COMPLETO
  const jsonLdFoodEstablishment = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "@id": "https://creacionesvane.com/refrigerios",
    "name": "Refrigerios Vane - Catering para Eventos",
    "alternateName": "Refrigerios Vane Medellín",
    "description": "Servicio profesional de refrigerios para eventos corporativos, fiestas infantiles, conferencias y reuniones en Medellín. Ingredientes frescos, entrega puntual y opciones personalizadas.",
    "url": "https://creacionesvane.com/refrigerios",
    "telephone": "+573128235654",
    "priceRange": "$-$$",
    "servesCuisine": ["Refrigerios", "Box Lunch", "Catering Eventos", "Lunch Corporativo"],
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
        "description": "Servicio de refrigerios en todo Medellín"
      },
      {
        "@type": "Place",
        "name": "El Poblado",
        "description": "Refrigerios corporativos zona empresarial El Poblado"
      },
      {
        "@type": "Place",
        "name": "Laureles",
        "description": "Catering para eventos en Laureles"
      },
      { "@type": "City", "name": "Envigado" },
      { "@type": "City", "name": "Sabaneta" },
      { "@type": "City", "name": "Itagüí" },
      { "@type": "City", "name": "Bello" }
    ],
    "hasMenu": {
      "@type": "Menu",
      "name": "Menú de Refrigerios y Box Lunch",
      "description": "Opciones variadas para eventos corporativos e infantiles",
      "hasMenuSection": [
        {
          "@type": "MenuSection",
          "name": "Refrigerios Infantiles",
          "description": "Refrigerios frescos y nutritivos para fiestas infantiles, cumpleaños y eventos escolares",
          "hasMenuItem": [
            {
              "@type": "MenuItem",
              "name": "Refrigerio Chispas de Queso",
              "description": "Sándwich de jamón premium, queso fresco, lechuga crocante y salsas de la casa. Empaque individual higiénico.",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "COP",
                "price": "6000",
                "availability": "https://schema.org/InStock"
              },
              "suitableForDiet": "https://schema.org/VegetarianDiet"
            },
            {
              "@type": "MenuItem",
              "name": "Sándwich Express Spider-Man",
              "description": "Sándwich nutritivo con diseño temático Spider-Man, sellado higiénico",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "COP",
                "price": "5000",
                "availability": "https://schema.org/InStock"
              }
            }
          ]
        },
        {
          "@type": "MenuSection",
          "name": "Refrigerios Corporativos",
          "description": "Box lunch y refrigerios profesionales para eventos empresariales, conferencias y capacitaciones",
          "hasMenuItem": [
            {
              "@type": "MenuItem",
              "name": "Lunch Corporativo Tradición & Calidad",
              "description": "Sándwich artesanal gourmet, fruta entera seleccionada y acompañamiento premium. Presentación ejecutiva.",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "COP",
                "price": "15000",
                "availability": "https://schema.org/InStock"
              }
            },
            {
              "@type": "MenuItem",
              "name": "Croissant Edición Especial",
              "description": "Croissant artesanal relleno de jamón serrano y queso madurado, jugo natural 100%, fruta seleccionada. Cubiertos biodegradables.",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "COP",
                "price": "15000",
                "availability": "https://schema.org/InStock"
              }
            },
            {
              "@type": "MenuItem",
              "name": "Refrigerio Vitalidad: Fruta & Néctar",
              "description": "Frutas tropicales frescas, néctar artesanal y sándwich clásico. Opción saludable premium.",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "COP",
                "price": "13000",
                "availability": "https://schema.org/InStock"
              },
              "suitableForDiet": "https://schema.org/LowCalorieDiet"
            },
            {
              "@type": "MenuItem",
              "name": "Lunch Picnic Tradicional",
              "description": "Sándwich estilo picnic, ensalada de frutas frescas con kiwi y mango, dulce artesanal",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "COP",
                "price": "12000",
                "availability": "https://schema.org/InStock"
              }
            }
          ]
        },
        {
          "@type": "MenuSection",
          "name": "Eventos Masivos",
          "description": "Soluciones logísticas para eventos de alto volumen (50+ personas)",
          "hasMenuItem": [
            {
              "@type": "MenuItem",
              "name": "Máxima Eficiencia Corporativa",
              "description": "Pack sellado higiénico: sándwich fresco, néctar con tapa de seguridad, postre individual. Ideal para convenciones y ferias.",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "COP",
                "price": "10000",
                "availability": "https://schema.org/InStock"
              }
            }
          ]
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "93",
      "bestRating": "5",
      "worstRating": "1"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "name": "Entrega Puntual Garantizada",
        "description": "Compromiso de puntualidad en entregas para eventos corporativos"
      },
      {
        "@type": "Offer",
        "name": "Opciones Vegetarianas Disponibles",
        "description": "Menú adaptable para dietas especiales"
      },
      {
        "@type": "Offer",
        "name": "Pedido Mínimo 15 Unidades",
        "description": "Servicio optimizado para grupos y eventos"
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
        "name": "Refrigerios para Eventos",
        "item": "https://creacionesvane.com/refrigerios"
      }
    ]
  };

  //  FAQ SCHEMA (Preguntas frecuentes - GOLD para SEO)
  const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cuál es el pedido mínimo de refrigerios?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El pedido mínimo es de 10 unidades. Ofrecemos refrigerios desde $5.000 hasta $15.000 dependiendo del tipo de evento y opciones seleccionadas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Hacen entregas en empresas de Medellín?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, realizamos entregas puntuales en toda el área metropolitana de Medellín, especialmente en zonas empresariales como El Poblado, Laureles, Envigado y Sabaneta. Garantizamos puntualidad para eventos corporativos."
        }
      },
      {
        "@type": "Question",
        "name": "¿Tienen opciones vegetarianas o para dietas especiales?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, ofrecemos opciones vegetarianas y podemos adaptar los refrigerios a dietas especiales. Contáctanos por WhatsApp al 312 823 5654 para personalizar tu pedido."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto tiempo de anticipación necesitan para un pedido?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Recomendamos hacer el pedido con al menos 24 horas de anticipación para garantizar disponibilidad. Para eventos grandes (50+ personas), sugerimos ordenar con 2-3 días de anticipación."
        }
      }
    ]
  };

  return (
    <>
      {/*  SCHEMAS JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFoodEstablishment) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />

      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <header className="relative h-[350px] flex items-center justify-center overflow-hidden">
          <Image
            src="/banner-refrigerios.webp"
            alt="Refrigerios para eventos corporativos e infantiles en Medellín - Box lunch y catering"
            fill
            className="object-cover object-center blur-[5px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-vane-600/80 via-vane-500/70 to-vane-700/80" />

          <div className="relative z-10 text-center px-4 max-w-4xl w-full">
            <ScrollReveal direction="down" delay={0.2}>
              <Image
                src="/logo-refrigerios.jpeg"
                alt="Logo Refrigerios Vane"
                width={120}
                height={120}
                className="mx-auto mb-3 rounded-full shadow-2xl bg-white p-2"
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                Refrigerios Vane
              </h1>
              <p className="text-2xl md:text-3xl text-white/95 mb-4 font-script drop-shadow-md">
                Sabor en cada evento
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.6}>
              <p className="text-base md:text-lg text-white/95 max-w-2xl mx-auto drop-shadow-md">
                Refrigerios deliciosos para fiestas, eventos corporativos y reuniones en Medellín. Calidad garantizada.
              </p>
            </ScrollReveal>
          </div>
        </header>

        {/* CATÁLOGO */}
        <ProductCatalog
          theme="refrigerios"
          title="Nuestros Refrigerios"
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
              poster="https://res.cloudinary.com/dw7zhnbho/image/upload/f_auto,q_auto,w_1200/fallback-food_rzbomn.webp"
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
            >
              <source src={getCldVideoUrl('food-background_hcaxdm')} type="video/mp4" />
              Tu navegador no soporta videos.
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-vane-600/80 via-vane-500/60 to-vane-700/90" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal direction="down" delay={0.2}>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-2xl">
                  ¿Listo para deleitar a tus invitados?
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4}>
                <p className="text-lg md:text-xl lg:text-2xl mb-10 text-white/95 drop-shadow-lg leading-relaxed">
                  Contáctanos y asegura refrigerios frescos y deliciosos para tu evento
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.6}>
                <a
                  href="https://wa.me/573128235654?text=¡Hola!%20Quiero%20cotizar%20refrigerios%20para%20mi%20evento%20🍱"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-vane-600 px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-base md:text-lg shadow-2xl hover:shadow-[0_20px_60px_rgba(232,124,36,0.4)] hover:scale-105 hover:bg-vane-50 transition-all duration-300 group"
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
                    <span className="text-sm md:text-base font-semibold">Ingredientes frescos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm md:text-base font-semibold">Entrega puntual</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main >

      <Footer />
      <WhatsAppButton />
    </>
  );
}