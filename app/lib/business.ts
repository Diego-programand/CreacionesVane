/**
 * SINGLE SOURCE OF TRUTH del negocio.
 *
 * Toda metadata, schema JSON-LD y texto público que muestre datos del negocio
 * (NAP, geo, social, áreas servidas, catálogo, horarios) debe consumir esta
 * constante. Mantenerla centralizada elimina:
 *   - coordenadas geo inconsistentes entre páginas
 *   - aggregateRating fake repetido en múltiples schemas
 *   - emails desactualizados (Gmail personal vs Gmail oficial del negocio)
 *
 * Ver memoria: business_details.md
 */

export const BUSINESS = {
  name: 'Creaciones Vane',
  legalName: 'Creaciones Vane',
  slogan: 'Cómplice que endulza',
  foundingDate: '2019-05',

  url: 'https://creacionesvane.com',
  logo: 'https://creacionesvane.com/logo.png',

  /** Email oficial del negocio (Gmail comercial). No existe corporativo @creacionesvane.com */
  email: 'creacionesvane10@gmail.com',

  /** Teléfono en formato E.164 para schema */
  phoneE164: '+573128235654',
  /** Teléfono formateado para mostrar */
  phoneDisplay: '+57 312 8235654',

  priceRange: '$$',
  currenciesAccepted: 'COP',
  paymentAccepted: 'Efectivo, Nequi, Daviplata, Transferencia Bancaria',

  address: {
    /** Para schema PostalAddress.streetAddress */
    streetAddress: 'Carrera 50 #120-13',
    /** Solo para texto display, no campo schema oficial */
    neighborhood: 'Pablo VI',
    /** Comuna 2 nororiental de Medellín */
    comuna: 'Santa Cruz',
    addressLocality: 'Medellín',
    addressRegion: 'Antioquia',
    postalCode: '050001',
    addressCountry: 'CO',
  },

  /** Coordenadas reales del iframe oficial de Google Maps en LocationSection */
  geo: {
    latitude: 6.30920,
    longitude: -75.55611,
  },

  /** Shortlink oficial de Google Maps proporcionado por el negocio */
  mapsShortLink: 'https://maps.app.goo.gl/rEWGEgev6pe1dWv59',

  /**
   * URL del Knowledge Panel/SERP de Google Business Profile.
   * Útil como sameAs adicional para reforzar la entidad de marca y reducir
   * confusión con "vane art" / "vaneessences" detectada en GSC.
   */
  gbpKnowledgePanelUrl:
    'https://www.google.com/search?q=Creaciones+Vane&stick=H4sIAAAAAAAAAONgU1I1qLBINTExSks1MzU0NkkzTUyzMqhIMjMwTDVPM7SwMLQwMDBJW8TK71yUmpicmZ-XWqwQlpiXCgAil-PSOwAAAA',

  /**
   * Redes sociales del negocio.
   * Nota: NO existe cuenta de Twitter/X. No agregar handle hasta que se cree.
   */
  social: {
    instagram: 'https://instagram.com/complice_que_endulza',
    instagramHandle: '@complice_que_endulza',
    tiktok: 'https://tiktok.com/@creacionesvane01',
    tiktokHandle: '@creacionesvane01',
    facebook: 'https://facebook.com/creaciones2927',
    whatsapp: 'https://wa.me/573128235654',
  },

  /** Horarios de atención al público */
  openingHours: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '15:00',
    },
  ] as const,

  /** Cobertura de entrega — Valle de Aburrá */
  areasServed: [
    { name: 'Medellín', lat: 6.2476, lng: -75.5658, sameAs: 'https://es.wikipedia.org/wiki/Medell%C3%ADn' },
    { name: 'Envigado', lat: 6.1711, lng: -75.5906 },
    { name: 'Itagüí', lat: 6.1848, lng: -75.5993 },
    { name: 'Bello', lat: 6.3383, lng: -75.5559 },
    { name: 'Sabaneta', lat: 6.1517, lng: -75.6165 },
    { name: 'La Estrella', lat: 6.1572, lng: -75.6308 },
    { name: 'Copacabana', lat: 6.3504, lng: -75.5115 },
    { name: 'Caldas', lat: 6.0891, lng: -75.6364 },
    { name: 'Barbosa', lat: 6.4386, lng: -75.3315 },
    { name: 'Girardota', lat: 6.3791, lng: -75.4476 },
  ] as const,

  /** Para text-display: zonas principales con domicilio garantizado el mismo día */
  primaryDeliveryZones: ['El Poblado', 'Laureles', 'Envigado', 'Sabaneta', 'Itagüí', 'Bello'],

  /** Rangos de precio por categoría (COP) */
  priceRanges: {
    detalles: { low: 50_000, high: 200_000 },
    desayunos: { low: 55_000, high: 190_000 },
    peluches: { low: 35_000, high: 120_000 },
    ramos: { low: 50_000, high: 160_000 },
    chocolates: { low: 25_000, high: 80_000 },
    refrigerios: { low: 5_000, high: 15_000 },
    decoracion: { low: 300_000, high: 650_000 },
  },
} as const;

// =============================================================================
// Builders reutilizables de fragmentos JSON-LD
// =============================================================================

/** PostalAddress consistente para todos los schemas */
export function postalAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.address.streetAddress,
    addressLocality: BUSINESS.address.addressLocality,
    addressRegion: BUSINESS.address.addressRegion,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.addressCountry,
  };
}

/** GeoCoordinates consistente */
export function geoCoordinates() {
  return {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS.geo.latitude,
    longitude: BUSINESS.geo.longitude,
  };
}

/** Array areaServed (City[]) listo para schema */
export function areaServedCities() {
  return BUSINESS.areasServed.map((c) => {
    const base: Record<string, unknown> = {
      '@type': 'City',
      name: c.name,
      geo: { '@type': 'GeoCoordinates', latitude: c.lat, longitude: c.lng },
    };
    if ('sameAs' in c && c.sameAs) base.sameAs = c.sameAs;
    return base;
  });
}

/** OpeningHoursSpecification array */
export function openingHoursSpec() {
  return BUSINESS.openingHours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.dayOfWeek,
    opens: h.opens,
    closes: h.closes,
  }));
}

/**
 * Array sameAs para Organization/LocalBusiness.
 *
 * Incluye perfiles sociales activos + Google Business Profile (Maps shortlink y
 * Knowledge Panel SERP). El GBP fortalece la entidad de marca y combate la
 * confusión con marcas similares ("vane art", "vaneessences") detectada en GSC.
 *
 * NO incluye Twitter/X — la cuenta no existe.
 */
export function sameAsLinks() {
  return [
    BUSINESS.social.instagram,
    BUSINESS.social.facebook,
    BUSINESS.social.tiktok,
    BUSINESS.social.whatsapp,
    BUSINESS.mapsShortLink,
    BUSINESS.gbpKnowledgePanelUrl,
  ];
}
