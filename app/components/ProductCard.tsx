import Image from 'next/image';
import type { Product } from '@/app/data/mockData';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappMessage = encodeURIComponent(
    `¡Hola! Me interesa el producto: *${product.nombre}*. ¿Podrían darme más información? 💝`
  );

  // Determinar colores según la categoría
  const getColors = () => {
    switch (product.categoria) {
      case 'detalles':
        return {
          badge: 'bg-primary-600',
          hoverText: 'group-hover:text-primary-600',
          price: 'text-primary-600',
          button: 'bg-primary-600 hover:bg-primary-700',
        };
      case 'refrigerios':
        return {
          badge: 'bg-vane-500',
          hoverText: 'group-hover:text-vane-600',
          price: 'text-vane-600',
          button: 'bg-vane-500 hover:bg-vane-600',
        };
      case 'decoraciones':
        return {
          badge: 'bg-decoraciones-pink',
          hoverText: 'group-hover:text-decoraciones-pink',
          price: 'text-decoraciones-pink',
          button: 'bg-decoraciones-pink hover:bg-decoraciones-pink-DEFAULT',
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

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group border border-gray-100 max-w-full">
      {/* Imagen - MÁS PEQUEÑA EN MÓVIL */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
        <Image
          src={product.imagen}
          alt={product.nombre}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.destacado && (
          <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 ${colors.badge} text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg`}>
            ⭐ Destacado
          </div>
        )}
      </div>

      {/* Contenido - MÁS COMPACTO EN MÓVIL */}
      <div className="p-3 sm:p-4 md:p-5">
        <h3 className={`font-bold text-base sm:text-lg md:text-xl text-gray-800 mb-1.5 sm:mb-2 ${colors.hoverText} transition-colors line-clamp-2`}>
          {product.nombre}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
          {product.descripcion}
        </p>

        {product.precio && (
          <p className={`${colors.price} font-bold text-sm sm:text-base md:text-lg mb-3 sm:mb-4`}>
            {product.precio}
          </p>
        )}

        <a
          href={`https://wa.me/573128235654?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`block w-full ${colors.button} text-white text-center py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 text-xs sm:text-sm md:text-base`}
        >
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  );
}