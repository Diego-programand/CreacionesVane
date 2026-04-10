'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsAppChat from './WhatsAppChat';

/**
 * ===== BOTÓN FLOTANTE DE WHATSAPP =====
 * 
 * Optimizado para CONVERSIÓN MÓVIL (70% del tráfico):
 * - Tamaño de tap zone ≥ 48px (Google Mobile-Friendly)
 * - Bottom: 24px (zona del pulgar en móviles)
 * - Mensaje predefinido geo-localizado para Medellín
 * - Tooltip contextual con CTA claro
 * - Badge de notificación con pulso animado
 * - aria-labels descriptivos para accesibilidad
 * 
 * MENSAJE PREDEFINIDO:
 * "¡Hola Creaciones Vane! 💝 Quiero hacer un pedido para entrega 
 *  a domicilio en Medellín. ¿Me pueden ayudar?"
 */
export default function WhatsAppButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Mostrar tooltip después de 2s para captar atención sin molestar
    const showTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 2000);

    // Ocultar tooltip tras 8s para no obstruir contenido
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleOpenChat = () => {
    setIsChatOpen(true);
    setShowTooltip(false);
  };

  return (
    <>
      {/* ===== TOOLTIP INFORMATIVO — Aparece 2s después de carga =====
           Diseño mobile-first con mensaje de pedido para Medellín */}
      <AnimatePresence>
        {showTooltip && !isChatOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 20, y: 10 }}
            className="fixed bottom-24 right-6 z-40"
          >
            <div className="relative">
              {/* Flecha visual apuntando al botón */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 shadow-lg"></div>
              
              {/* Contenido del mensaje tooltip */}
              <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-[280px] relative">
                {/* Botón cerrar tooltip */}
                <button
                  onClick={() => setShowTooltip(false)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Cerrar mensaje de WhatsApp"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <div className="flex items-start gap-3 pr-4">
                  {/* Icono WhatsApp */}
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm mb-1">
                      ¡Hola! 👋 Soy de Medellín
                    </p>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      ¿Quieres enviar un regalo sorpresa a domicilio? Te ayudo a armar el detalle perfecto con entrega hoy.
                    </p>
                    {/* CTA iniciar chat */}
                    <button
                      onClick={handleOpenChat}
                      className="mt-2 text-green-600 hover:text-green-700 font-semibold text-xs flex items-center gap-1 transition-colors min-h-[44px]"
                      aria-label="Iniciar chat de WhatsApp para pedir regalo en Medellín"
                    >
                      Pedir ahora
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== BOTÓN FLOTANTE PRINCIPAL =====
           Tamaño: 56px (>48px mínimo para tap zones móviles)
           Posición: bottom-6 right-6 (zona del pulgar)
           Ping animado para llamar la atención */}
      <motion.button
        onClick={handleOpenChat}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 z-50 group"
        style={{ minWidth: '56px', minHeight: '56px' }}
        aria-label="Abrir chat de WhatsApp para pedir regalos a domicilio en Medellín"
        id="whatsapp-floating-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Icono WhatsApp */}
        <svg 
          className="w-8 h-8" 
          fill="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        
        {/* Badge de notificación con pulso */}
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            1
          </motion.span>
        </motion.span>

        {/* Efecto de pulso verde animado */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></span>
      </motion.button>

      {/* ===== MODAL DE CHAT WHATSAPP ===== */}
      <WhatsAppChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </>
  );
}