'use client';

import { useEffect } from 'react';
import { sendGAEvent } from '@next/third-parties/google';

/**
 * Listener delegado a nivel documento que captura clicks en anchors hacia
 * wa.me y dispara los eventos GA4 necesarios para medir leads.
 *
 * Estrategia:
 *  - Un solo listener montado una vez. Captura clicks de elementos existentes
 *    y futuros sin necesidad de refactorizar cada botón individualmente.
 *  - Resuelve el botón más cercano hacia arriba con .closest('a[href*="wa.me"]')
 *    para que funcione también cuando el click cae sobre un hijo (svg, span).
 *  - Dispara 2 eventos por click:
 *      1. `whatsapp_click` — para conteo crudo en GA4 (debug/exploración)
 *      2. `generate_lead`  — evento de conversión estándar de GA4 (usar para
 *         marcar como conversión clave en la propiedad)
 *  - Adjunta `source` (path actual) y `cta_location` (id del botón o sección
 *    más cercana con id/data-section) para segmentar de dónde vienen los leads.
 */
export default function WhatsAppTracker() {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const link = target.closest<HTMLAnchorElement>('a[href*="wa.me"]');
      if (!link) return;

      const source = typeof window !== 'undefined' ? window.location.pathname : 'unknown';
      const ctaLocation =
        link.id ||
        link.closest('[data-section]')?.getAttribute('data-section') ||
        link.closest('section')?.getAttribute('aria-label') ||
        'unknown';

      const payload = {
        source,
        cta_location: ctaLocation,
        channel: 'whatsapp',
        link_url: link.href,
      };

      try {
        sendGAEvent('event', 'whatsapp_click', payload);
        sendGAEvent('event', 'generate_lead', payload);
      } catch {
        /* No bloqueamos la navegación si GA4 falla por algún motivo. */
      }
    };

    document.addEventListener('click', handler, { capture: true });
    return () => document.removeEventListener('click', handler, { capture: true });
  }, []);

  return null;
}
