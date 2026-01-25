'use client';

import type { CatalogTheme } from '../hooks/useProductCatalog';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  theme: CatalogTheme;
  ariaLabel?: string;
}

// Estilos por tema
const themeStyles: Record<CatalogTheme, {
  activeButton: string;
  hoverButton: string;
}> = {
  detalles: {
    activeButton: 'bg-primary-600 text-white shadow-md',
    hoverButton: 'hover:bg-primary-50 hover:border-primary-300',
  },
  refrigerios: {
    activeButton: 'bg-vane-500 text-white shadow-md',
    hoverButton: 'hover:bg-vane-50 hover:border-vane-300',
  },
  decoraciones: {
    activeButton: 'bg-decoraciones-purple text-white shadow-md',
    hoverButton: 'hover:bg-decoraciones-purple-light/30 hover:border-decoraciones-purple-border',
  },
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  theme,
  ariaLabel = 'Paginación de productos',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const styles = themeStyles[theme];

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
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
    <nav
      className="flex items-center justify-center gap-2 mt-12"
      role="navigation"
      aria-label={ariaLabel}
    >
      {/* Botón Anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg border border-gray-300 text-gray-700 ${styles.hoverButton} disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
        aria-label="Página anterior"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Números de página */}
      {getPageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              currentPage === page
                ? styles.activeButton
                : `border border-gray-300 text-gray-700 ${styles.hoverButton}`
            }`}
            aria-label={`Ir a página ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2 text-gray-400" aria-hidden="true">
            {page}
          </span>
        )
      ))}

      {/* Botón Siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg border border-gray-300 text-gray-700 ${styles.hoverButton} disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
        aria-label="Página siguiente"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}