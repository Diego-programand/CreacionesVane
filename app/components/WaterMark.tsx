'use client';

// app/components/Watermark.tsx
import React from 'react';

interface WatermarkProps {
  text?: string;
  className?: string;
  showCenter?: boolean;
}

export default function Watermark({ 
  text = "CreacionesVane", 
  className = "",
  showCenter = true 
}: WatermarkProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}>
      {/* 🔐 PATRÓN DIAGONAL REPETIDO */}
      <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-16 p-4 opacity-15 md:opacity-10">
        {Array.from({ length: 16 }).map((_, index) => (
          <span
            key={index}
            className="text-2xl md:text-3xl font-medium tracking-widest whitespace-nowrap -rotate-[35deg] text-white md:text-black"
            style={{ fontFamily: 'Pacifico, cursive' }}
          >
            {text}
          </span>
        ))}
      </div>

      {/* 🔐 MARCA CENTRAL REFORZADA */}
      {showCenter && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
            className="text-white/25 md:text-black/10 text-5xl md:text-7xl font-bold -rotate-12 border-4 border-current p-6 rounded-full uppercase tracking-tighter opacity-20"
            style={{ fontFamily: 'sans-serif' }}
          >
            Original
          </span>
        </div>
      )}
    </div>
  );
}