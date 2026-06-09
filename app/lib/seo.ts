import type { Metadata } from 'next';
import {
  BUSINESS,
  postalAddress,
  geoCoordinates,
  areaServedCities,
  openingHoursSpec,
  sameAsLinks,
} from './business';

const BASE_URL = BUSINESS.url;

// =============================================================================
// Metadata helpers
// =============================================================================

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  keywords?: string[];
}

/**
 * Genera Metadata consistente para una página. Aplica canonical, openGraph,
 * twitter, geo tags y locale es_CO.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogImage = `${BASE_URL}/og-image-main.webp`,
  keywords,
}: PageMetadataInput): Metadata {
  const url = `${BASE_URL}${path.startsWith('/') ? path : '/' + path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: BUSINESS.name,
      title,
      description,
      locale: 'es_CO',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    other: {
      'geo.region': 'CO-ANT',
      'geo.placename': 'Medellín, Antioquia, Colombia',
      'geo.position': `${BUSINESS.geo.latitude};${BUSINESS.geo.longitude}`,
      ICBM: `${BUSINESS.geo.latitude}, ${BUSINESS.geo.longitude}`,
    },
  };
}

// =============================================================================
// Schema builders
// =============================================================================

/**
 * Organization + LocalBusiness ÚNICO y CANÓNICO del sitio.
 * Debe ir solo en layout.tsx para evitar duplicación.
 *
 * Nota importante: NO incluye aggregateRating sintético. Las valoraciones
 * deben venir de fuente verificable (Google Business Profile, Trustpilot,
 * reviews on-page con Review schema) — si no, Google puede penalizar.
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${BASE_URL}/#organization`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    slogan: BUSINESS.slogan,
    foundingDate: BUSINESS.foundingDate,
    url: BUSINESS.url,
    logo: { '@type': 'ImageObject', url: BUSINESS.logo, width: 400, height: 400 },
    image: [
      BUSINESS.logo,
      `${BASE_URL}/banner-detalles.webp`,
      `${BASE_URL}/banner-decoraciones.webp`,
      `${BASE_URL}/banner-refrigerios.webp`,
    ],
    description:
      'Creaciones Vane: anchetas, desayunos sorpresa, peluches, ramos, decoración de eventos y refrigerios a domicilio en Medellín y el Valle de Aburrá. Entrega el mismo día.',
    email: BUSINESS.email,
    telephone: BUSINESS.phoneE164,
    priceRange: BUSINESS.priceRange,
    currenciesAccepted: BUSINESS.currenciesAccepted,
    paymentAccepted: BUSINESS.paymentAccepted,
    address: postalAddress(),
    geo: geoCoordinates(),
    openingHoursSpecification: openingHoursSpec(),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS.phoneE164,
        contactType: 'customer service',
        areaServed: areaServedCities(),
        availableLanguage: ['Spanish', 'es'],
      },
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS.phoneE164,
        contactType: 'sales',
        areaServed: 'CO-ANT',
        availableLanguage: 'es',
      },
    ],
    sameAs: sameAsLinks(),
    areaServed: areaServedCities(),
    hasMap: BUSINESS.mapsShortLink,
  };
}

/** WebSite con SearchAction */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BUSINESS.url,
    name: BUSINESS.name,
    alternateName: ['Creaciones Vane Medellín', 'Anchetas Vane'],
    description:
      'Anchetas, desayunos sorpresa, decoraciones y refrigerios a domicilio en Medellín.',
    publisher: { '@id': `${BASE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/?s={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'es-CO',
  };
}

/** BreadcrumbList sencillo: pasarle el path como array [{name,url}] */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** FAQPage builder. Recibe array de Q&A. */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/**
 * Product schema enriquecido: incluye shippingDetails y hasMerchantReturnPolicy,
 * requisitos actuales de Google para product rich results.
 */
export function productSchema(p: {
  id: string;
  name: string;
  description: string;
  image: string;
  priceCOP: number;
  category?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    image: [p.image],
    sku: p.id,
    mpn: p.id,
    category: p.category,
    brand: {
      '@type': 'Brand',
      name: BUSINESS.name,
      logo: BUSINESS.logo,
    },
    offers: {
      '@type': 'Offer',
      url: p.url,
      priceCurrency: 'COP',
      price: p.priceCOP,
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'LocalBusiness',
        '@id': `${BASE_URL}/#organization`,
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'CO',
        returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
        merchantReturnDays: 0,
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '8000',
          currency: 'COP',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'CO',
          addressRegion: 'Antioquia',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'd',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'd',
          },
        },
      },
    },
  };
}

// =============================================================================
// Geo-landings helper (para landings por barrio futuras)
// =============================================================================

interface GeoLandingMetaInput {
  service: string;
  neighborhood: string;
  slug: string;
}

export function geoLandingMetadata({
  service,
  neighborhood,
  slug,
}: GeoLandingMetaInput): Metadata {
  const title = `${service} en ${neighborhood} | ${BUSINESS.name} Medellín`;
  const description = `${service} a domicilio en ${neighborhood}, Medellín. Entrega el mismo día. WhatsApp ${BUSINESS.phoneDisplay}.`;
  return pageMetadata({ title, description, path: slug });
}
