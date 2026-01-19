'use client';

import { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '@/app/data/mockData';

interface InfiniteCarouselProps {
    products: Product[];
}

export default function InfiniteCarousel({ products }: InfiniteCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const extendedProducts = [...products, ...products, ...products];
    const startIndex = products.length;

    useEffect(() => {
        setIsMounted(true);
        setCurrentIndex(startIndex);
        setWindowWidth(window.innerWidth);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (transitionTimeoutRef.current) {
                clearTimeout(transitionTimeoutRef.current);
            }
        };
    }, [startIndex]);

    const handleNext = () => {
        // Permitir múltiples clicks sin esperar
        if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current);
        }
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
    };

    const handlePrev = () => {
        // Permitir múltiples clicks sin esperar
        if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current);
        }
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev - 1);
    };

    const handleTransitionEnd = () => {
        // Usar timeout para asegurar suavidad
        transitionTimeoutRef.current = setTimeout(() => {
            setIsTransitioning(false);

            // Reset instantáneo para loop infinito (sin transición)
            if (currentIndex >= startIndex + products.length) {
                setCurrentIndex(startIndex);
            } else if (currentIndex < startIndex) {
                setCurrentIndex(startIndex + products.length - 1);
            }
        }, 50);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        isDragging.current = true;
        touchStartX.current = e.touches[0].clientX;
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging.current) return;
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!isDragging.current) return;
        isDragging.current = false;

        const diff = touchStartX.current - touchEndX.current;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                handleNext();
            } else {
                handlePrev();
            }
        }
    };

    if (!isMounted) {
        return <div className="h-96"></div>;
    }

    const isMobile = windowWidth < 768;
    const gap = isMobile ? 16 : 24;
    const cardWidth = isMobile ? windowWidth * 0.80 : 340;

    return (
        <div className="relative max-w-7xl mx-auto">
            {/* Botón Anterior */}
            <button
                onClick={handlePrev}
                className="absolute left-2 md:left-4 top-1/3 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-primary-600 rounded-full p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm active:scale-95"
                aria-label="Anterior"
            >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Contenedor del carrousel con sombras laterales */}
            <div className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-primary-100 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-primary-100 to-transparent z-10 pointer-events-none"></div>

                <div
                    ref={carouselRef}
                    className="flex gap-4 md:gap-6 touch-pan-y"
                    style={{
                        transform: `translateX(calc(50vw - 50% - ${currentIndex * (cardWidth + gap)}px))`,
                        transition: isTransitioning ? 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                        paddingLeft: isMobile ? '0' : '64px',
                        paddingRight: isMobile ? '0' : '64px',
                        willChange: isTransitioning ? 'transform' : 'auto',
                    }}
                    onTransitionEnd={handleTransitionEnd}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {extendedProducts.map((product, index) => (
                        <div
                            key={`${product.id}-${index}`}
                            className="flex-shrink-0"
                            style={{ width: `${cardWidth}px` }}
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Botón Siguiente */}
            <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 top-1/3 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-primary-600 rounded-full p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm active:scale-95"
                aria-label="Siguiente"
            >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Indicadores de posición */}
            <div className="flex justify-center gap-2 mt-6">
                {products.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (transitionTimeoutRef.current) {
                                clearTimeout(transitionTimeoutRef.current);
                            }
                            setIsTransitioning(true);
                            setCurrentIndex(startIndex + index);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${(currentIndex - startIndex) % products.length === index
                                ? 'w-8 bg-primary-600'
                                : 'w-2 bg-gray-300 hover:bg-gray-400'
                            }`}
                        aria-label={`Ir a producto ${index + 1}`}
                    />
                ))}
            </div>

            {/* Hint de swipe para móvil */}
            <div className="md:hidden text-center mt-4">
                <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Desliza para ver más
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </p>
            </div>
        </div>
    );
}