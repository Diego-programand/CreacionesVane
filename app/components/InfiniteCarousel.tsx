'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '@/app/data/mockData';
import { ChevronLeft, ChevronRight, MoveHorizontalIcon } from 'lucide-react';

interface InfiniteCarouselProps {
  products: Product[];
}

export default function InfiniteCarousel({ products }: InfiniteCarouselProps) {
  // Triple buffer para asegurar que nunca se vea el final
  const extendedProducts = [...products, ...products, ...products];
  const startIndex = products.length;

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    // Reset silencioso de posición
    if (currentIndex >= startIndex + products.length) {
      setCurrentIndex(currentIndex - products.length);
    } else if (currentIndex < startIndex) {
      setCurrentIndex(currentIndex + products.length);
    }
  };

  const moveNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const movePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, [isTransitioning]);

  // Autoplay suave cada 5 segundos
  useEffect(() => {
    const timer = setInterval(moveNext, 5000);
    return () => clearInterval(timer);
  }, [moveNext]);

  const getCardMetrics = () => {
    if (windowWidth < 640) return { width: windowWidth * 0.75, gap: 12 };
    if (windowWidth < 1024) return { width: 300, gap: 20 };
    return { width: 320, gap: 24 };
  };

  const { width: cardWidth, gap } = getCardMetrics();

  if (!isMounted) return <div className="h-96" />;

  const offset = `calc(50% - ${cardWidth / 2}px - ${currentIndex * (cardWidth + gap)}px)`;

  return (
    <div className="relative w-full overflow-visible group">
      
      {/* BOTONES DE NAVEGACIÓN - Visibles en móvil y desktop */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 md:-mx-8 z-40 pointer-events-none">
        <button
          onClick={movePrev}
          className="pointer-events-auto bg-white/90 p-2 md:p-3 rounded-full shadow-lg border border-primary-200 text-primary-600 hover:bg-primary-600 hover:text-white transition-all active:scale-90"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={moveNext}
          className="pointer-events-auto bg-white/90 p-2 md:p-3 rounded-full shadow-lg border border-primary-200 text-primary-600 hover:bg-primary-600 hover:text-white transition-all active:scale-90"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* VIEWPORT */}
      <div className="relative overflow-hidden cursor-grab active:cursor-grabbing py-6">
        <div
          ref={carouselRef}
          className="flex will-change-transform items-center"
          style={{
            gap: `${gap}px`,
            transform: `translateX(${offset})`,
            // Transición más elástica y menos "pesada"
            transition: isTransitioning 
              ? 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)' 
              : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
          onTouchStart={(e) => {
            startX.current = e.touches[0].clientX;
            isDragging.current = true;
          }}
          onTouchMove={(e) => {
            if (!isDragging.current) return;
            const currentX = e.touches[0].clientX;
            const diff = startX.current - currentX;
            // Sensibilidad del swipe mejorada
            if (Math.abs(diff) > 40) {
              isDragging.current = false;
              diff > 0 ? moveNext() : movePrev();
            }
          }}
        >
          {extendedProducts.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="flex-shrink-0 transition-all duration-500"
              style={{ 
                width: `${cardWidth}px`,
                // Efecto de enfoque: el central es más grande y nítido
                transform: currentIndex === index ? 'scale(1.05)' : 'scale(0.95)',
                opacity: currentIndex === index ? 1 : 0.6,
                filter: currentIndex === index ? 'none' : 'blur(1px)',
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* INDICADOR DE AYUDA VISUAL (Solo móvil) */}
      <div className="flex md:hidden items-center justify-center gap-2 mt-2 text-primary-400 text-s font-medium animate-pulse">
        <MoveHorizontalIcon size={18} />
        Desliza para explorar
      </div>

      {/* PAGINACIÓN MEJORADA */}
      <div className="flex justify-center items-center gap-3 mt-8">
        {products.map((_, index) => {
          const isActive = (currentIndex % products.length) === index;
          return (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(startIndex + index);
              }}
              className={`transition-all duration-500 rounded-full ${
                isActive 
                ? 'w-10 h-2 bg-primary-600 shadow-[0_0_8px_rgba(219,39,119,0.4)]' 
                : 'w-2 h-2 bg-gray-300 hover:bg-primary-300'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}