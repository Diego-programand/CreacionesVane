'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollReveal from '../components/ScrollReveal';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { productosMock } from '../data/mockData';
import type { Product } from '../data/mockData';

export default function CreacionesVanePage() {
  const productos = productosMock.filter(p => p.categoria === 'Detalles');

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
      if (nombreLower.includes('ancheta')) tipos.add('Anchetas');
      else if (nombreLower.includes('desayuno')) tipos.add('Desayunos');
      else if (nombreLower.includes('ramo')) tipos.add('Ramos');
      else if (nombreLower.includes('ramillete')) tipos.add('Ramilletes');
      else tipos.add('Otros');
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
    if (nombreLower.includes('ancheta')) return 'Anchetas';
    if (nombreLower.includes('desayuno')) return 'Desayunos';
    if (nombreLower.includes('ramo') && !nombreLower.includes('ramillete')) return 'Ramos';
    if (nombreLower.includes('ramillete')) return 'Ramilletes';
    return 'Otros';
  };

  // Filtrar productos (precio ahora es number)
  const productosFiltrados = useMemo(() => {
    return productos.filter(producto => {
      // Filtro por tipo
      if (selectedTypes.length > 0) {
        const productType = getProductType(producto);
        if (!selectedTypes.includes(productType)) return false;
      }

      // Filtro por precio (ahora precio es number directamente)
      if (minPrice && producto.precio < parseInt(minPrice) * 1000) return false;
      if (maxPrice && producto.precio > parseInt(maxPrice) * 1000) return false;

      // Filtro por búsqueda
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
      <div className="flex items-center justify-center gap-2 mt-12">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-primary-50 hover:border-primary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'border border-gray-300 text-gray-700 hover:bg-primary-50 hover:border-primary-300'
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-2 text-gray-400">{page}</span>
          )
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-primary-50 hover:border-primary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[350px] flex items-center justify-center overflow-hidden">
          <Image
            src="/banner-detalles.png"
            alt="Banner Creaciones Vane"
            fill
            className="object-cover object-center blur-[2px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-600/80 via-primary-500/70 to-primary-700/80" />

          <div className="relative z-10 text-center px-4 max-w-4xl w-full">
            <ScrollReveal direction="down" delay={0.2}>
              <Image
                src="/logo.png"
                alt="Creaciones Vane Logo"
                width={120}
                height={120}
                className="mx-auto mb-3 rounded-full shadow-2xl bg-white p-2"
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <h1 className="text-4xl md:text-5xl font-sm font-script text-white mb-3 drop-shadow-lg">
                Creaciones Vane
              </h1>
              <h2 className="text-2xl md:text-3xl text-white/95 mb-4 font-script drop-shadow-md">
                Cómplice que endulza
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.6}>
              <p className="text-base md:text-lg text-white/95 max-w-2xl mx-auto drop-shadow-md">
                Detalles de amor que alegran el corazón. Anchetas, desayunos, ramos y más.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Catálogo con filtros */}
        <section id="catalog-section" className="py-16 bg-gradient-to-b from-white to-primary-50 overflow-x-hidden">
          <div className="container mx-auto px-3 sm:px-4 max-w-full">
            {/* Modal filtros móvil */}
            {mobileFiltersOpen && (
              <div className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-start" onClick={() => setMobileFiltersOpen(false)}>
                <div className="bg-white w-full rounded-b-2xl p-6 max-h-[85vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Filtros</h3>
                    <button onClick={() => setMobileFiltersOpen(false)} className="text-gray-500 hover:text-gray-700">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <FilterSidebar
                    theme="detalles"
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
                    className="w-full mt-6 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                  >
                    Ver {productosFiltrados.length} productos
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-8 max-w-full overflow-x-hidden">
              {/* Sidebar filtros desktop */}
              <aside className="hidden lg:block w-80 flex-shrink-0">
                <ScrollReveal direction="left">
                  <FilterSidebar
                    theme="detalles"
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
                      Nuestros Detalles de Amor
                    </h2>
                    <p className="text-lg text-gray-600">
                      Mostrando {startIndex + 1}-{Math.min(endIndex, productosFiltrados.length)} de {productosFiltrados.length} detalles
                    </p>
                  </div>
                </ScrollReveal>

                <div className="lg:hidden mb-6">
                  <button
                    onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filtros ({selectedTypes.length + (minPrice ? 1 : 0) + (maxPrice ? 1 : 0) + (searchTerm ? 1 : 0)})
                  </button>
                </div>

                {productosPaginados.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-full w-full">
                      {productosPaginados.map((producto, index) => (
                        <ScrollReveal key={producto.id} direction="up" delay={index * 0.1}>
                          <div className="h-full w-full min-w-0 max-w-full">
                            <ProductCard product={producto} />
                          </div>
                        </ScrollReveal>
                      ))}
                    </div>
                    <Pagination />
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                    <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                      <span className="text-5xl">🔍</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
                      ¡Vaya! No encontramos coincidencias
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg leading-relaxed">
                      No te preocupes, podemos crear el <span className="text-primary-600 font-semibold">detalle personalizado</span> que tienes en mente.
                    </p>
                    <a
                      href="https://wa.me/573128235654?text=¡Hola!%20Quiero%20conocer%20más%20sobre%20sus%20servicios"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-200 bg-primary-600 rounded-full hover:bg-primary-700 shadow-lg"
                    >
                      <span className="mr-2">Contáctanos por WhatsApp</span>
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final - (mantén tu código existente) */}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}