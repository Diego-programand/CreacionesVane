'use client';

import type { CatalogTheme } from '../hooks/useProductCatalog';
import FilterSidebar from './FilterSidebar';

interface MobileFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: CatalogTheme;
  totalProductos: number;
  
  // Props para FilterSidebar
  selectedTypes: string[];
  minPrice: string;
  maxPrice: string;
  searchTerm: string;
  tiposUnicos: string[];
  onToggleType: (tipo: string) => void;
  onSetMinPrice: (price: string) => void;
  onSetMaxPrice: (price: string) => void;
  onSetSearchTerm: (term: string) => void;
  onClearAll: () => void;
}

const themeButtonStyles: Record<CatalogTheme, string> = {
  detalles: 'bg-primary-600 hover:bg-primary-700',
  refrigerios: 'bg-vane-500 hover:bg-vane-600',
  decoraciones: 'bg-decoraciones-purple hover:bg-decoraciones-purple/90',
};

export default function MobileFiltersModal({
  isOpen,
  onClose,
  theme,
  totalProductos,
  selectedTypes,
  minPrice,
  maxPrice,
  searchTerm,
  tiposUnicos,
  onToggleType,
  onSetMinPrice,
  onSetMaxPrice,
  onSetSearchTerm,
  onClearAll,
}: MobileFiltersModalProps) {
  if (!isOpen) return null;

  const buttonStyle = themeButtonStyles[theme];

  return (
    <aside
      className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-start"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Filtros de productos"
    >
      <div
        className="bg-white w-full rounded-b-2xl p-6 max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Filtros</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Cerrar filtros"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Filtros */}
        <FilterSidebar
          theme={theme}
          selectedTypes={selectedTypes}
          minPrice={minPrice}
          maxPrice={maxPrice}
          searchTerm={searchTerm}
          tiposUnicos={tiposUnicos}
          totalEncontrados={totalProductos}
          onToggleType={onToggleType}
          onSetMinPrice={onSetMinPrice}
          onSetMaxPrice={onSetMaxPrice}
          onSetSearchTerm={onSetSearchTerm}
          onClearAll={onClearAll}
        />

        {/* Botón de ver productos */}
        <button
          onClick={onClose}
          className={`w-full mt-6 ${buttonStyle} text-white px-6 py-3 rounded-lg font-semibold transition-all`}
        >
          Ver {totalProductos} productos
        </button>
      </div>
    </aside>
  );
}