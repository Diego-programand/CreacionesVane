'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import type { Product } from '../data/mockData';

// ============================================
// TIPOS
// ============================================

export type CatalogTheme = 'detalles' | 'refrigerios' | 'decoraciones';

export interface CatalogConfig {
  theme: CatalogTheme;
  categoria: 'Detalles' | 'Refrigerios' | 'Decoraciones';
  getProductType: (product: Product) => string;
  shuffleOnLoad?: boolean; // Por defecto true
}

export interface UseCatalogReturn {
  // Productos
  productosPaginados: Product[];
  productosFiltrados: Product[];
  totalProductos: number;
  
  // Paginación
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  handlePageChange: (page: number) => void;
  
  // Filtros
  selectedTypes: string[];
  minPrice: string;
  maxPrice: string;
  searchTerm: string;
  tiposUnicos: string[];
  mobileFiltersOpen: boolean;
  
  // Acciones de filtros
  toggleType: (tipo: string) => void;
  setMinPrice: (price: string) => void;
  setMaxPrice: (price: string) => void;
  setSearchTerm: (term: string) => void;
  setMobileFiltersOpen: (open: boolean) => void;
  clearAllFilters: () => void;
  
  // Utilidades
  scrollToTop: () => void;
  activeFiltersCount: number;
}

// ============================================
// UTILIDADES
// ============================================

/**
 * Algoritmo Fisher-Yates para shuffle
 * Usa una semilla basada en la sesión para consistencia durante la navegación
 */
const shuffleArray = <T>(array: T[], seed?: number): T[] => {
  const shuffled = [...array];
  
  // Si no hay semilla, usar Math.random
  let random = seed ? seededRandom(seed) : Math.random;
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};

/**
 * Generador de números aleatorios con semilla
 * Permite reproducibilidad durante la sesión
 */
const seededRandom = (seed: number) => {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
};

/**
 * Obtiene o genera una semilla de sesión
 * La semilla se mantiene durante la sesión del navegador
 */
const getSessionSeed = (): number => {
  if (typeof window === 'undefined') return Date.now();
  
  const storageKey = 'creaciones-vane-session-seed';
  let seed = sessionStorage.getItem(storageKey);
  
  if (!seed) {
    seed = Date.now().toString();
    sessionStorage.setItem(storageKey, seed);
  }
  
  return parseInt(seed, 10);
};

// ============================================
// HOOK PRINCIPAL
// ============================================

export function useProductCatalog(
  allProducts: Product[],
  config: CatalogConfig
): UseCatalogReturn {
  const { categoria, getProductType, shuffleOnLoad = true } = config;
  
  // Filtrar productos por categoría y aleatorizar
  const productosCategoria = useMemo(() => {
    const filtered = allProducts.filter(p => p.categoria === categoria);
    
    if (shuffleOnLoad && typeof window !== 'undefined') {
      const seed = getSessionSeed();
      // Usamos una semilla diferente por categoría para variedad
      const categoriaSeed = seed + categoria.charCodeAt(0);
      return shuffleArray(filtered, categoriaSeed);
    }
    
    return filtered;
  }, [allProducts, categoria, shuffleOnLoad]);

  // ============================================
  // ESTADOS
  // ============================================
  
  // Filtros
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);

  // ============================================
  // EFECTOS
  // ============================================
  
  // Detectar tamaño de ventana para paginación responsive
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset página cuando cambian filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, minPrice, maxPrice, selectedTypes]);

  // ============================================
  // CÁLCULOS MEMOIZADOS
  // ============================================
  
  // Items por página según tamaño de pantalla
  const itemsPerPage = useMemo(() => {
    if (windowWidth === 0) return 9;
    if (windowWidth < 768) return 5;  // Mobile
    if (windowWidth < 1280) return 6; // Tablet
    return 9; // Desktop
  }, [windowWidth]);

  // Extraer tipos únicos de productos
  const tiposUnicos = useMemo(() => {
    const tipos = new Set<string>();
    productosCategoria.forEach(p => {
      tipos.add(getProductType(p));
    });
    return Array.from(tipos).sort();
  }, [productosCategoria, getProductType]);

  // Filtrar productos
  const productosFiltrados = useMemo(() => {
    return productosCategoria.filter(producto => {
      // Filtro por tipo
      if (selectedTypes.length > 0) {
        const productType = getProductType(producto);
        if (!selectedTypes.includes(productType)) return false;
      }

      // Filtro por precio (precio está en COP)
      const minPriceNum = minPrice ? parseInt(minPrice) * 1000 : 0;
      const maxPriceNum = maxPrice ? parseInt(maxPrice) * 1000 : Infinity;
      
      if (producto.precio < minPriceNum) return false;
      if (producto.precio > maxPriceNum) return false;

      // Filtro por búsqueda
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesNombre = producto.nombre.toLowerCase().includes(searchLower);
        const matchesDescripcion = producto.descripcion.toLowerCase().includes(searchLower);
        if (!matchesNombre && !matchesDescripcion) return false;
      }

      return true;
    });
  }, [productosCategoria, selectedTypes, minPrice, maxPrice, searchTerm, getProductType]);

  // Paginación
  const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, productosFiltrados.length);
  const productosPaginados = productosFiltrados.slice(startIndex, endIndex);

  // Contador de filtros activos
  const activeFiltersCount = useMemo(() => {
    let count = selectedTypes.length;
    if (minPrice) count++;
    if (maxPrice) count++;
    if (searchTerm) count++;
    return count;
  }, [selectedTypes, minPrice, maxPrice, searchTerm]);

  // ============================================
  // ACCIONES
  // ============================================
  
  const toggleType = useCallback((tipo: string) => {
    setSelectedTypes(prev =>
      prev.includes(tipo) ? prev.filter(t => t !== tipo) : [...prev, tipo]
    );
  }, []);

  const clearAllFilters = useCallback(() => {
    setSelectedTypes([]);
    setMinPrice('');
    setMaxPrice('');
    setSearchTerm('');
    setCurrentPage(1);
  }, []);

  const scrollToTop = useCallback(() => {
    const catalogSection = document.getElementById('catalog-section');
    if (catalogSection) {
      const offset = 100;
      const elementPosition = catalogSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    scrollToTop();
  }, [scrollToTop]);

  // ============================================
  // RETURN
  // ============================================
  
  return {
    // Productos
    productosPaginados,
    productosFiltrados,
    totalProductos: productosFiltrados.length,
    
    // Paginación
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    handlePageChange,
    
    // Filtros
    selectedTypes,
    minPrice,
    maxPrice,
    searchTerm,
    tiposUnicos,
    mobileFiltersOpen,
    
    // Acciones
    toggleType,
    setMinPrice,
    setMaxPrice,
    setSearchTerm,
    setMobileFiltersOpen,
    clearAllFilters,
    
    // Utilidades
    scrollToTop,
    activeFiltersCount,
  };
}

// ============================================
// CONFIGURACIONES PRE-DEFINIDAS
// ============================================

export const catalogConfigs: Record<CatalogTheme, Omit<CatalogConfig, 'shuffleOnLoad'>> = {
  detalles: {
    theme: 'detalles',
    categoria: 'Detalles',
    getProductType: (product: Product): string => {
      const nombreLower = product.nombre.toLowerCase();
      if (nombreLower.includes('ancheta')) return 'Anchetas';
      if (nombreLower.includes('desayuno')) return 'Desayunos';
      if (nombreLower.includes('ramo') && !nombreLower.includes('ramillete')) return 'Ramos';
      if (nombreLower.includes('ramillete')) return 'Ramilletes';
      return 'Otros';
    },
  },
  refrigerios: {
    theme: 'refrigerios',
    categoria: 'Refrigerios',
    getProductType: (product: Product): string => {
      const nombreLower = product.nombre.toLowerCase();
      if (nombreLower.includes('infantil') || nombreLower.includes('kids') || nombreLower.includes('niño')) {
        return 'Infantiles';
      }
      if (nombreLower.includes('empresarial') || nombreLower.includes('ejecutivo') || 
          nombreLower.includes('corporativo') || nombreLower.includes('conferencia')) {
        return 'Empresariales';
      }
      if (nombreLower.includes('saludable') || nombreLower.includes('light') || nombreLower.includes('vegano')) {
        return 'Saludables';
      }
      if (nombreLower.includes('box lunch')) return 'Box Lunch';
      if (nombreLower.includes('coffee break')) return 'Coffee Break';
      return 'Otros';
    },
  },
  decoraciones: {
    theme: 'decoraciones',
    categoria: 'Decoraciones',
    getProductType: (product: Product): string => {
      const nombreLower = product.nombre.toLowerCase();
      if (nombreLower.includes('infantil') || nombreLower.includes('cumpleaños') || nombreLower.includes('princesa')) {
        return 'Infantiles';
      }
      if (nombreLower.includes('boda') || nombreLower.includes('baby shower') || nombreLower.includes('quinceañera')) {
        return 'Eventos Especiales';
      }
      if (nombreLower.includes('corporativo') || nombreLower.includes('empresarial')) {
        return 'Corporativos';
      }
      return 'Otros';
    },
  },
};