'use client';

export type FilterTheme = 'detalles' | 'refrigerios' | 'decoraciones';

interface FilterConfig {
  title: string;
  searchLabel: string;
  placeholder: string;
  itemLabel: string;
  priceLabel: string;
  accentClass: string;
  borderClass: string;
  ringClass: string;
  buttonClass: string;
  hoverTextClass: string;
}

const THEME_CONFIGS: Record<FilterTheme, FilterConfig> = {
  detalles: {
    title: 'Filtros Detalles',
    searchLabel: 'Buscar producto',
    placeholder: 'Ej: Ancheta, ramo, desayuno...',
    itemLabel: 'Tipo de detalle',
    priceLabel: 'Rango de precio (miles COP)',
    accentClass: 'text-primary-600',
    borderClass: 'border-primary-100',
    ringClass: 'focus:ring-primary-500',
    buttonClass: 'bg-primary-600',
    hoverTextClass: 'hover:text-primary-700',
  },
  refrigerios: {
    title: 'Filtros',
    searchLabel: 'Buscar refrigerio',
    placeholder: 'Ej: Box lunch, infantil...',
    itemLabel: 'Tipo de refrigerio',
    priceLabel: 'Rango de precio (miles COP)',
    accentClass: 'text-vane-600',
    borderClass: 'border-vane-200',
    ringClass: 'focus:ring-vane-500',
    buttonClass: 'bg-vane-500',
    hoverTextClass: 'hover:text-vane-700',
  },
  decoraciones: {
    title: 'Filtros',
    searchLabel: 'Buscar temática',
    placeholder: 'Ej: Boda, Grado...',
    itemLabel: 'Tipo de decoración',
    priceLabel: 'Rango de precio (miles COP)',
    accentClass: 'text-decoraciones-purple',
    borderClass: 'border-decoraciones-purple-border/30',
    ringClass: 'focus:ring-decoraciones-purple',
    buttonClass: 'bg-decoraciones-purple',
    hoverTextClass: 'hover:text-decoraciones-purple/80',
  },
};

interface FilterSidebarProps {
  theme: FilterTheme;
  selectedTypes: string[];
  minPrice: string;
  maxPrice: string;
  searchTerm: string;
  tiposUnicos: string[];
  totalEncontrados: number;
  onToggleType: (tipo: string) => void;
  onSetMinPrice: (value: string) => void;
  onSetMaxPrice: (value: string) => void;
  onSetSearchTerm: (value: string) => void;
  onClearAll: () => void;
}

export default function FilterSidebar({ 
  theme, 
  selectedTypes,
  minPrice,
  maxPrice,
  searchTerm,
  tiposUnicos,
  totalEncontrados,
  onToggleType,
  onSetMinPrice,
  onSetMaxPrice,
  onSetSearchTerm,
  onClearAll,
}: FilterSidebarProps) {
  const config = THEME_CONFIGS[theme];
  const hasFilters = selectedTypes.length > 0 || minPrice || maxPrice || searchTerm;

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 border ${config.borderClass} sticky top-24 h-fit`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <svg className={`w-5 h-5 ${config.accentClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {config.title}
        </h3>
        {hasFilters && (
          <button onClick={onClearAll} className={`text-sm ${config.accentClass} ${config.hoverTextClass} font-semibold underline`}>
            Limpiar todo
          </button>
        )}
      </div>

      {/* Buscador */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">{config.searchLabel}</label>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSetSearchTerm(e.target.value)}
            placeholder={config.placeholder}
            className={`w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 ${config.ringClass} focus:border-transparent`}
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Tipos (Badges) */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-3">{config.itemLabel}</label>
        <div className="flex flex-wrap gap-2">
          {tiposUnicos.map(tipo => (
            <button
              key={tipo}
              onClick={() => onToggleType(tipo)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedTypes.includes(tipo)
                  ? `${config.buttonClass} text-white shadow-sm`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tipo}
            </button>
          ))}
        </div>
      </div>

      {/* Precios */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">{config.priceLabel}</label>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => onSetMinPrice(e.target.value)}
            placeholder="Min"
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 ${config.ringClass} text-sm`}
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => onSetMaxPrice(e.target.value)}
            placeholder="Max"
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 ${config.ringClass} text-sm`}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Ejemplo: 50 = $50.000 COP
        </p>
      </div>

      <div className="pt-4 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-600">
          <span className={`font-bold ${config.accentClass}`}>{totalEncontrados}</span> resultados
        </p>
      </div>
    </div>
  );
}