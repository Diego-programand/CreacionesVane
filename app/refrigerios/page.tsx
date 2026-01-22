'use client';

import { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollReveal from '../components/ScrollReveal';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { productosMock } from '../data/mockData';
import type { Product } from '../data/mockData';

export default function RefrigeriosPage() {
  const productos = productosMock.filter(p => p.categoria === 'Refrigerios');

  // Estados de filtros
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Estados de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPerPage = useMemo(() => {
    if (windowWidth === 0) return 9;
    if (windowWidth < 768) return 3;
    if (windowWidth < 1280) return 6;
    return 9;
  }, [windowWidth]);

  // Extraer tipos únicos
  const tiposUnicos = useMemo(() => {
    const tipos = new Set<string>();
    productos.forEach(p => {
      const nombreLower = p.nombre.toLowerCase();
      if (nombreLower.includes('infantil') || nombreLower.includes('kids') || nombreLower.includes('niño')) {
        tipos.add('Infantiles');
      } else if (nombreLower.includes('empresarial') || nombreLower.includes('ejecutivo') || nombreLower.includes('corporativo') || nombreLower.includes('conferencia')) {
        tipos.add('Empresariales');
      } else if (nombreLower.includes('saludable') || nombreLower.includes('light') || nombreLower.includes('vegano')) {
        tipos.add('Saludables');
      } else if (nombreLower.includes('box lunch')) {
        tipos.add('Box Lunch');
      } else if (nombreLower.includes('coffee break')) {
        tipos.add('Coffee Break');
      } else {
        tipos.add('Otros');
      }
    });
    return Array.from(tipos).sort();
  }, [productos]);

  const toggleType = (tipo: string) => {
    setSelectedTypes(prev =>
      prev.includes(tipo) ? prev.filter(t => t !== tipo) : [...prev, tipo]
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setMinPrice('');
    setMaxPrice('');
    setSearchTerm('');
    setCurrentPage(1);
  };

  // Determinar tipo de producto
  const getProductType = (product: Product): string => {
    const nombreLower = product.nombre.toLowerCase();
    if (nombreLower.includes('infantil') || nombreLower.includes('kids') || nombreLower.includes('niño')) {
      return 'Infantiles';
    }
    if (nombreLower.includes('empresarial') || nombreLower.includes('ejecutivo') || nombreLower.includes('corporativo') || nombreLower.includes('conferencia')) {
      return 'Empresariales';
    }
    if (nombreLower.includes('saludable') || nombreLower.includes('light') || nombreLower.includes('vegano')) {
      return 'Saludables';
    }
    if (nombreLower.includes('box lunch')) {
      return 'Box Lunch';
    }
    if (nombreLower.includes('coffee break')) {
      return 'Coffee Break';
    }
    return 'Otros';
  };

  // Filtrar productos
  const productosFiltrados = useMemo(() => {
    return productos.filter(producto => {
      if (selectedTypes.length > 0) {
        const productType = getProductType(producto);
        if (!selectedTypes.includes(productType)) return false;
      }

      if (minPrice && producto.precio < parseInt(minPrice) * 1000) return false;
      if (maxPrice && producto.precio > parseInt(maxPrice) * 1000) return false;

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return producto.nombre.toLowerCase().includes(searchLower) ||
          producto.descripcion.toLowerCase().includes(searchLower);
      }

      return true;
    });
  }, [productos, selectedTypes, minPrice, maxPrice, searchTerm]);

  const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productosPaginados = productosFiltrados.slice(startIndex, endIndex);

  const scrollToTop = () => {
    const catalogSection = document.getElementById('catalog-section');
    if (catalogSection) {
      const offset = 100;
      const elementPosition = catalogSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToTop();
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, minPrice, maxPrice]);

  const Pagination = () => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const showEllipsis = totalPages > 7;

      if (!showEllipsis) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        if (currentPage <= 3) {
          pages.push(1, 2, 3, '...', totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
        } else {
          pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
      }
      return pages;
    };

    return (
      <nav className="flex items-center justify-center gap-2 mt-12" role="navigation" aria-label="Paginación de refrigerios">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-vane-50 hover:border-vane-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Página anterior"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {getPageNumbers().map((page, index) => (
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                currentPage === page
                  ? 'bg-vane-500 text-white shadow-md'
                  : 'border border-gray-300 text-gray-700 hover:bg-vane-50 hover:border-vane-300'
              }`}
              aria-label={`Ir a página ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-2 text-gray-400" aria-hidden="true">{page}</span>
          )
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-vane-50 hover:border-vane-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Página siguiente"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </nav>
    );
  };

  return (
    <>
      <Head>
        <title>Refrigerios para Eventos en Medellín | Refrigerios Vane - Empresariales e Infantiles</title>
        <meta
          name="description"
          content="Refrigerios frescos para eventos corporativos, fiestas infantiles y reuniones en Medellín. Sándwiches, frutas y bebidas. Pedido mínimo 15 unidades. ¡Desde $5.000!"
        />
        <meta
          name="keywords"
          content="refrigerios medellín, refrigerios eventos medellín, refrigerios empresariales medellín, refrigerios fiestas infantiles, box lunch medellín, catering medellín, lunch empresarial medellín, refrigerios el poblado, refrigerios para conferencias"
        />
        <link rel="canonical" href="https://creacionesvane.com/refrigerios" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creacionesvane.com/refrigerios" />
        <meta property="og:title" content="Refrigerios para Eventos en Medellín | Refrigerios Vane" />
        <meta property="og:description" content="Sabor en cada evento. Refrigerios frescos y deliciosos para eventos corporativos, fiestas infantiles y reuniones en Medellín." />
        <meta property="og:image" content="https://creacionesvane.com/banner-refrigerios.png" />
        <meta property="og:locale" content="es_CO" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://creacionesvane.com/refrigerios" />
        <meta property="twitter:title" content="Refrigerios para Eventos en Medellín | Refrigerios Vane" />
        <meta property="twitter:description" content="Refrigerios frescos con ingredientes de calidad para tus eventos en Medellín. Entrega puntual garantizada." />
        <meta property="twitter:image" content="https://creacionesvane.com/banner-refrigerios.png" />

        {/* Geo tags - Barrio Pablo VI */}
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
              "@type": "FoodEstablishment",
              "@id": "https://creacionesvane.com/refrigerios",
              "name": "Refrigerios Vane",
              "description": "Servicio de refrigerios para eventos corporativos, fiestas infantiles y reuniones en Medellín con ingredientes frescos",
              "url": "https://creacionesvane.com/refrigerios",
              "telephone": "+573128235654",
              "priceRange": "$-$$",
              "servesCuisine": "Refrigerios, Box Lunch, Catering",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Carrera 50 #120-13",
                "addressLocality": "Medellín",
                "addressRegion": "Antioquia",
                "addressCountry": "CO",
                "postalCode": "050034"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 6.297486,
                "longitude": -75.553924
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "areaServed": [
                { "@type": "City", "name": "Medellín" },
                { "@type": "City", "name": "El Poblado" },
                { "@type": "City", "name": "Laureles" },
                { "@type": "City", "name": "Envigado" },
                { "@type": "City", "name": "Sabaneta" },
                { "@type": "City", "name": "Itagüí" }
              ],
              "hasMenu": {
                "@type": "Menu",
                "hasMenuSection": [
                  {
                    "@type": "MenuSection",
                    "name": "Refrigerios Infantiles",
                    "description": "Refrigerios para fiestas infantiles con sándwiches, frutas y bebidas",
                    "hasMenuItem": {
                      "@type": "MenuItem",
                      "name": "Refrigerio Chispas de Queso",
                      "description": "Sándwich de jamón, queso, lechuga y salsas de la casa",
                      "offers": {
                        "@type": "Offer",
                        "priceCurrency": "COP",
                        "price": "6000",
                        "availability": "https://schema.org/InStock"
                      }
                    }
                  },
                  {
                    "@type": "MenuSection",
                    "name": "Refrigerios Corporativos",
                    "description": "Box lunch y refrigerios para eventos empresariales",
                    "hasMenuItem": {
                      "@type": "MenuItem",
                      "name": "Lunch Corporativo Tradición & Calidad",
                      "description": "Sándwich artesanal, fruta entera y acompañamiento gourmet",
                      "offers": {
                        "@type": "Offer",
                        "priceCurrency": "COP",
                        "price": "15000",
                        "availability": "https://schema.org/InStock"
                      }
                    }
                  },
                  {
                    "@type": "MenuSection",
                    "name": "Refrigerios Saludables",
                    "description": "Opciones con frutas frescas y néctares naturales",
                    "hasMenuItem": {
                      "@type": "MenuItem",
                      "name": "Refrigerio Vitalidad: Fruta & Néctar Natural",
                      "description": "Frutas tropicales, néctar artesanal y sándwich clásico",
                      "offers": {
                        "@type": "Offer",
                        "priceCurrency": "COP",
                        "price": "13000",
                        "availability": "https://schema.org/InStock"
                      }
                    }
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "93"
              }
            })
          }}
        />

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
                  "name": "Refrigerios",
                  "item": "https://creacionesvane.com/refrigerios"
                }
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
            src="/banner-refrigerios.png"
            alt="Refrigerios para eventos en Medellín - Corporativos e infantiles"
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

        {/* Catálogo con filtros */}
        <section id="catalog-section" className="py-16 bg-gradient-to-b from-white to-vane-50 overflow-x-hidden" aria-label="Catálogo de refrigerios">
          <div className="container mx-auto px-3 sm:px-4 max-w-full">
            {/* Modal filtros móvil */}
            {mobileFiltersOpen && (
              <aside 
                className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-start" 
                onClick={() => setMobileFiltersOpen(false)}
                role="dialog"
                aria-modal="true"
                aria-label="Filtros de refrigerios"
              >
                <div className="bg-white w-full rounded-b-2xl p-6 max-h-[85vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Filtros</h3>
                    <button 
                      onClick={() => setMobileFiltersOpen(false)} 
                      className="text-gray-500 hover:text-gray-700"
                      aria-label="Cerrar filtros"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <FilterSidebar
                    theme="refrigerios"
                    selectedTypes={selectedTypes}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    searchTerm={searchTerm}
                    tiposUnicos={tiposUnicos}
                    totalEncontrados={productosFiltrados.length}
                    onToggleType={toggleType}
                    onSetMinPrice={setMinPrice}
                    onSetMaxPrice={setMaxPrice}
                    onSetSearchTerm={setSearchTerm}
                    onClearAll={clearAllFilters}
                  />
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full mt-6 bg-vane-500 hover:bg-vane-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                  >
                    Ver {productosFiltrados.length} productos
                  </button>
                </div>
              </aside>
            )}

            <div className="flex gap-8 max-w-full overflow-x-hidden">
              {/* Sidebar filtros desktop */}
              <aside className="hidden lg:block w-80 flex-shrink-0" aria-label="Filtros de búsqueda">
                <ScrollReveal direction="left">
                  <FilterSidebar
                    theme="refrigerios"
                    selectedTypes={selectedTypes}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    searchTerm={searchTerm}
                    tiposUnicos={tiposUnicos}
                    totalEncontrados={productosFiltrados.length}
                    onToggleType={toggleType}
                    onSetMinPrice={setMinPrice}
                    onSetMaxPrice={setMaxPrice}
                    onSetSearchTerm={setSearchTerm}
                    onClearAll={clearAllFilters}
                  />
                </ScrollReveal>
              </aside>

              {/* Grid de productos */}
              <div className="flex-1 min-w-0 max-w-full overflow-x-hidden">
                <ScrollReveal direction="up">
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                      Nuestros Refrigerios
                    </h2>
                    <p className="text-lg text-gray-600" role="status" aria-live="polite">
                      Mostrando {startIndex + 1}-{Math.min(endIndex, productosFiltrados.length)} de {productosFiltrados.length} refrigerios
                    </p>
                  </div>
                </ScrollReveal>

                <div className="lg:hidden mb-6">
                  <button
                    onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                    className="w-full bg-vane-500 hover:bg-vane-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
                    aria-label="Abrir filtros"
                    aria-expanded={mobileFiltersOpen}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filtros ({selectedTypes.length + (minPrice ? 1 : 0) + (maxPrice ? 1 : 0) + (searchTerm ? 1 : 0)})
                  </button>
                </div>

                {productosPaginados.length > 0 ? (
                  <>
                    <div 
                      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-full w-full"
                      role="list"
                      aria-label="Lista de refrigerios"
                    >
                      {productosPaginados.map((producto, index) => (
                        <ScrollReveal key={producto.id} direction="up" delay={index * 0.1}>
                          <article className="h-full w-full min-w-0 max-w-full" role="listitem">
                            <ProductCard product={producto} />
                          </article>
                        </ScrollReveal>
                      ))}
                    </div>
                    <Pagination />
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200" role="alert">
                    <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-6" aria-hidden="true">
                      <span className="text-5xl">🔍</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
                      ¡Vaya! No encontramos coincidencias
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg leading-relaxed">
                      No te preocupes, podemos crear el <span className="text-vane-600 font-semibold">refrigerio personalizado</span> que necesitas.
                    </p>
                    <a
                      href="https://wa.me/573128235654?text=¡Hola!%20Quiero%20cotizar%20refrigerios%20para%20mi%20evento%20🍱"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-200 bg-vane-500 rounded-full hover:bg-vane-600 shadow-lg"
                      aria-label="Contactar por WhatsApp"
                    >
                      <span className="mr-2">Contáctanos por WhatsApp</span>
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="relative py-16 md:py-18 overflow-hidden">
          <div className="absolute inset-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/images/fallback-food.jpg"
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
            >
              <source
                src="/videos/food-background.mp4"
                type="video/mp4"
              />
              Tu navegador no soporta videos.
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-vane-600/80 via-vane-500/60 to-vane-700/90"></div>
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
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}