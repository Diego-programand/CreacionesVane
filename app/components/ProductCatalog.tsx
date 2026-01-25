'use client';

import { useMemo } from 'react';
import ScrollReveal from './ScrollReveal';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';
import Pagination from './Pagination';
import EmptyState from './EmptyState';
import MobileFiltersModal from './MobileFiltersModal';
import { useProductCatalog, catalogConfigs, type CatalogTheme } from '../hooks/useProductCatalog';
import { productosMock } from '../data/mockData';

// ============================================
// TIPOS
// ============================================

interface ProductCatalogProps {
  theme: CatalogTheme;
  title: string;
  shuffleOnLoad?: boolean;
}

// ============================================
// ESTILOS POR TEMA
// ============================================

const themeStyles: Record<CatalogTheme, {
  sectionBg: string;
  filterButton: string;
  paginationLabel: string;
}> = {
  detalles: {
    sectionBg: 'bg-gradient-to-b from-white to-primary-50',
    filterButton: 'bg-primary-600 hover:bg-primary-700',
    paginationLabel: 'Paginación de productos',
  },
  refrigerios: {
    sectionBg: 'bg-gradient-to-b from-white to-vane-50',
    filterButton: 'bg-vane-500 hover:bg-vane-600',
    paginationLabel: 'Paginación de refrigerios',
  },
  decoraciones: {
    sectionBg: 'bg-gradient-to-b from-white to-decoraciones-surface',
    filterButton: 'bg-decoraciones-purple hover:bg-decoraciones-purple/90',
    paginationLabel: 'Paginación de decoraciones',
  },
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function ProductCatalog({
  theme,
  title,
  shuffleOnLoad = true,
}: ProductCatalogProps) {
  // Obtener configuración del catálogo
  const config = useMemo(() => ({
    ...catalogConfigs[theme],
    shuffleOnLoad,
  }), [theme, shuffleOnLoad]);

  // Usar el hook centralizado
  const {
    productosPaginados,
    productosFiltrados,
    totalProductos,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    handlePageChange,
    selectedTypes,
    minPrice,
    maxPrice,
    searchTerm,
    tiposUnicos,
    mobileFiltersOpen,
    toggleType,
    setMinPrice,
    setMaxPrice,
    setSearchTerm,
    setMobileFiltersOpen,
    clearAllFilters,
    activeFiltersCount,
  } = useProductCatalog(productosMock, config);

  const styles = themeStyles[theme];

  return (
    <section
      id="catalog-section"
      className={`py-16 ${styles.sectionBg} overflow-x-hidden`}
      aria-label={`Catálogo de ${title.toLowerCase()}`}
    >
      <div className="container mx-auto px-3 sm:px-4 max-w-full">
        {/* Modal de filtros móvil */}
        <MobileFiltersModal
          isOpen={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          theme={theme}
          totalProductos={totalProductos}
          selectedTypes={selectedTypes}
          minPrice={minPrice}
          maxPrice={maxPrice}
          searchTerm={searchTerm}
          tiposUnicos={tiposUnicos}
          onToggleType={toggleType}
          onSetMinPrice={setMinPrice}
          onSetMaxPrice={setMaxPrice}
          onSetSearchTerm={setSearchTerm}
          onClearAll={clearAllFilters}
        />

        <div className="flex gap-8 max-w-full overflow-x-hidden">
          {/* Sidebar de filtros (desktop) */}
          <aside
            className="hidden lg:block w-80 flex-shrink-0"
            aria-label="Filtros de búsqueda"
          >
            <ScrollReveal direction="left">
              <FilterSidebar
                theme={theme}
                selectedTypes={selectedTypes}
                minPrice={minPrice}
                maxPrice={maxPrice}
                searchTerm={searchTerm}
                tiposUnicos={tiposUnicos}
                totalEncontrados={totalProductos}
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
            {/* Header */}
            <ScrollReveal direction="up">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                  {title}
                </h2>
                <p className="text-lg text-gray-600" role="status" aria-live="polite">
                  Mostrando {startIndex + 1}-{Math.min(endIndex, totalProductos)} de{' '}
                  {totalProductos}{' '}
                  {theme === 'detalles' ? 'detalles' : theme === 'refrigerios' ? 'refrigerios' : 'decoraciones'}
                </p>
              </div>
            </ScrollReveal>

            {/* Botón de filtros móvil */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className={`w-full ${styles.filterButton} text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-md`}
                aria-label="Abrir filtros"
                aria-expanded={mobileFiltersOpen}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filtros ({activeFiltersCount})
              </button>
            </div>

            {/* Grid de productos o estado vacío */}
            {productosPaginados.length > 0 ? (
              <>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-full w-full"
                  role="list"
                  aria-label={`Lista de ${title.toLowerCase()}`}
                >
                  {productosPaginados.map((producto, index) => (
                    <ScrollReveal key={producto.id} direction="up" delay={index * 0.1}>
                      <article className="h-full w-full min-w-0 max-w-full" role="listitem">
                        <ProductCard product={producto} />
                      </article>
                    </ScrollReveal>
                  ))}
                </div>

                {/* Paginación */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  theme={theme}
                  ariaLabel={styles.paginationLabel}
                />
              </>
            ) : (
              <EmptyState theme={theme} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}