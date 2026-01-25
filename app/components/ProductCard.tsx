'use client';

import Image from 'next/image';
import type { Product } from '@/app/data/mockData';
import { useModal } from '@/app/context/ModalContext';
import { Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const getCloudinaryUrl = (imagePath: string) => {
  if (!imagePath) return '/placeholder.jpg';
  const uploadIndex = imagePath.indexOf('/upload/');
  if (uploadIndex === -1) return imagePath;

  const baseUrl = imagePath.substring(0, uploadIndex + 8);
  const imageSuffix = imagePath.substring(uploadIndex + 8);
  // Ajustamos a 3:4 para mantener consistencia visual
  const transformations = 'c_fill,ar_3:4,w_800,g_auto,q_auto,f_auto';

  return `${baseUrl}${transformations}/${imageSuffix}`;
};

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export default function ProductCard({ product }: ProductCardProps) {
  const { openModal } = useModal();

  const getColors = () => {
    switch (product.categoria) {
      case 'Detalles':
        return {
          badge: 'bg-primary-600',
          hoverText: 'group-hover:text-primary-600',
          price: 'text-primary-600',
          button: 'bg-primary-600 hover:bg-primary-700',
        };
      case 'Refrigerios':
        return {
          badge: 'bg-vane-500',
          hoverText: 'group-hover:text-vane-600',
          price: 'text-vane-600',
          button: 'bg-vane-500 hover:bg-vane-600',
        };
      case 'Decoraciones':
        return {
          badge: 'bg-decoraciones-purple',
          hoverText: 'group-hover:text-decoraciones-purple',
          price: 'text-decoraciones-purple',
          button: 'bg-decoraciones-purple hover:bg-decoraciones-purple',
        };
      default:
        return {
          badge: 'bg-primary-600',
          hoverText: 'group-hover:text-primary-600',
          price: 'text-primary-600',
          button: 'bg-primary-600 hover:bg-primary-700',
        };
    }
  };

  const colors = getColors();
  const optimizedImageUrl = getCloudinaryUrl(product.imagen);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100 flex flex-col h-full max-w-sm mx-auto w-full">
      
      {/* Contenedor de Imagen Optimizado con PROTECCIÓN ANTI-PIRATEO */}
      <div className="relative overflow-hidden bg-gray-100 flex-shrink-0
        h-64 sm:h-72 
        md:h-60 lg:h-64 xl:h-72 2xl:h-80
        select-none">  {/* ← Previene selección de texto/imagen */}
        
        {product.imagen ? (
          <>
            <Image
              src={optimizedImageUrl}
              alt={`${product.nombre} en Medellín - Creaciones Vane Complice que endulza`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={product.destacado}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
            {/* Capa invisible de protección sobre la imagen */}
            <div 
              className="absolute inset-0 z-10"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
             <Eye size={48} className="text-gray-300" />
          </div>
        )}

        {product.destacado && (
          <div className={`absolute top-2 right-2 ${colors.badge} text-white px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold shadow-md z-10`}>
            ⭐ Destacado
          </div>
        )}
      </div>

      {/* Contenido con Flex-Grow para igualar alturas */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className={`font-bold text-base md:text-lg text-gray-800 mb-2 ${colors.hoverText} transition-colors line-clamp-1`}>
          {product.nombre}
        </h3>
        
        <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2 flex-grow">
          {product.descripcion}
        </p>

        <div className="mt-auto">
          {product.precio && (
            <p className={`${colors.price} font-bold text-lg mb-3`}>
              {formatPrice(product.precio)}
              {product.categoria === 'Refrigerios' && (
                <span className="text-xs font-normal text-gray-400 ml-1">/ud</span>
              )}
            </p>
          )}

          <button
            onClick={() => openModal(product)}
            className={`group/btn relative flex items-center justify-center gap-2 w-full ${colors.button} text-white py-2.5 rounded-lg font-bold transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 overflow-hidden`}
          >
            <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-20deg] -translate-x-full group-hover/btn:animate-shine" />
            <Eye size={16} />
            <span className="text-sm">Ver Detalles</span>
          </button>
        </div>
      </div>
    </div>
  );
}