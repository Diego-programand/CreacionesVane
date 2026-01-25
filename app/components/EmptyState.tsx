'use client';

import type { CatalogTheme } from '../hooks/useProductCatalog';

interface EmptyStateProps {
  theme: CatalogTheme;
  whatsappMessage?: string;
}

const themeConfig: Record<CatalogTheme, {
  accentColor: string;
  buttonBg: string;
  buttonHover: string;
  productType: string;
}> = {
  detalles: {
    accentColor: 'text-primary-600',
    buttonBg: 'bg-primary-600',
    buttonHover: 'hover:bg-primary-700',
    productType: 'detalle personalizado',
  },
  refrigerios: {
    accentColor: 'text-vane-600',
    buttonBg: 'bg-vane-500',
    buttonHover: 'hover:bg-vane-600',
    productType: 'refrigerio personalizado',
  },
  decoraciones: {
    accentColor: 'text-decoraciones-purple',
    buttonBg: 'bg-decoraciones-purple',
    buttonHover: 'hover:bg-decoraciones-purple/90',
    productType: 'decoración personalizada',
  },
};

const defaultMessages: Record<CatalogTheme, string> = {
  detalles: '¡Hola!%20Quiero%20conocer%20más%20sobre%20sus%20servicios',
  refrigerios: '¡Hola!%20Quiero%20cotizar%20refrigerios%20para%20mi%20evento%20🍱',
  decoraciones: '¡Hola!%20Quiero%20cotizar%20una%20decoración%20para%20mi%20evento%20🎈',
};

export default function EmptyState({ theme, whatsappMessage }: EmptyStateProps) {
  const config = themeConfig[theme];
  const message = whatsappMessage || defaultMessages[theme];

  return (
    <div
      className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200"
      role="alert"
    >
      <div
        className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mb-6"
        aria-hidden="true"
      >
        <span className="text-5xl">🔍</span>
      </div>
      
      <h3 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
        ¡Vaya! No encontramos coincidencias
      </h3>
      
      <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg leading-relaxed">
        No te preocupes, podemos crear el{' '}
        <span className={`${config.accentColor} font-semibold`}>
          {config.productType}
        </span>{' '}
        que tienes en mente.
      </p>
      
      <a
        href={`https://wa.me/573128235654?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-200 ${config.buttonBg} rounded-full ${config.buttonHover} shadow-lg`}
        aria-label="Contactar por WhatsApp"
      >
        <span className="mr-2">Contáctanos por WhatsApp</span>
        <svg
          className="w-5 h-5 transition-transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </a>
    </div>
  );
}