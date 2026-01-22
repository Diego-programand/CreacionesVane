'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    // Marcamos que ya pasó el primer render para activar las animaciones
    setIsFirstRender(false);
  }, []);

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={pathname}
        initial={isFirstRender ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{
          type: 'tween', // 'tween' es más predecible que 'spring' para navegación
          ease: 'easeInOut',
          duration: 0.2, // Reducimos a 200ms para que sea ultra rápido
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}