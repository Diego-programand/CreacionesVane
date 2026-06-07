import { Metadata } from 'next';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollReveal from '../components/ScrollReveal';
import ProductCatalog from '../components/ProductCatalog';
import { sanityClient } from '../lib/sanity.client';
import { PRODUCTS_BY_CATEGORY_QUERY } from '../lib/sanity.queries';
import { toProduct, type SanityProduct } from '../lib/sanity.types';
import { BUSINESS, postalAddress, geoCoordinates } from '../lib/business';
import { breadcrumbSchema, pageMetadata } from '../lib/seo';

/**
 * Catálogo de detalles, anchetas y desayunos sorpresa.
 *
 * Decisión estratégica: esta página NO compite con el home en query "creaciones vane"
 * (eso lo gana la home). Aquí el foco es la query transaccional con catálogo:
 * "anchetas medellín domicilio" (pos 1.0 en GSC), "desayunos sorpresa domicilio".
 *
 * Diferenciador clave vs home: H1 y title se enfocan en "Catálogo / Tienda",
 * no en la marca.
 */
export const metadata: Metadata = pageMetadata({
  title:
    'Catálogo de Anchetas y Desayunos Sorpresa a Domicilio en Medellín',
  description: `Mira nuestro catálogo completo de anchetas, desayunos sorpresa, peluches y ramos de rosas con entrega el mismo día en Medellín. Pide ahora por WhatsApp ${BUSINESS.phoneDisplay}.`,
  path: '/creaciones-vane',
  ogImage: `${BUSINESS.url}/banner-detalles.webp`,
  keywords: [
    'anchetas medellín',
    'anchetas medellin domicilio',
    'catálogo anchetas medellín',
    'desayunos sorpresa medellín',
    'desayunos sorpresa a domicilio medellín',
    'peluches con flores medellín',
    'ramos de rosas a domicilio medellín',
    'cajas de chocolates medellín',
    'detalles de amor medellín',
    'regalos personalizados medellín',
    'anchetas el poblado',
    'desayunos sorpresa laureles',
    'regalos envigado',
    'anchetas con globos medellín',
    'desayunos románticos medellín',
    'anchetas cumpleaños medellín',
  ],
});

export default async function CreacionesVanePage() {
  const sanityProducts = await sanityClient.fetch<SanityProduct[]>(
    PRODUCTS_BY_CATEGORY_QUERY,
    { valor: 'Detalles' },
    { next: { tags: ['product'] } }
  );
  const products = sanityProducts.map(toProduct);

  /*
   * Store schema específico para esta vista de catálogo.
   * NO repite los campos NAP, solo referencia el nodo organization vía @id.
   */
  const jsonLdStore = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': `${BUSINESS.url}/creaciones-vane#store`,
    name: 'Creaciones Vane — Catálogo de Detalles, Anchetas y Desayunos Sorpresa',
    description:
      'Catálogo de anchetas personalizadas, desayunos sorpresa, peluches, ramos de rosas y cajas de chocolates a domicilio en Medellín. Entrega el mismo día.',
    url: `${BUSINESS.url}/creaciones-vane`,
    telephone: BUSINESS.phoneE164,
    priceRange: BUSINESS.priceRange,
    address: postalAddress(),
    geo: geoCoordinates(),
    /* Referencia a la organización canónica del sitio, sin duplicar info */
    parentOrganization: { '@id': `${BUSINESS.url}/#organization` },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Detalles de Amor',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Anchetas Personalizadas',
            description: 'Anchetas con snacks, dulces, globos y mensaje personalizado',
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'COP',
              lowPrice: BUSINESS.priceRanges.detalles.low,
              highPrice: BUSINESS.priceRanges.detalles.high,
              availability: 'https://schema.org/InStock',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Desayunos Sorpresa',
            description: 'Desayunos a domicilio con frutas, jugos, sándwich y decoración',
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'COP',
              lowPrice: BUSINESS.priceRanges.desayunos.low,
              highPrice: BUSINESS.priceRanges.desayunos.high,
              availability: 'https://schema.org/InStock',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Ramos de Rosas',
            description: 'Ramos de rosas frescas con entrega el mismo día',
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'COP',
              lowPrice: BUSINESS.priceRanges.ramos.low,
              highPrice: BUSINESS.priceRanges.ramos.high,
              availability: 'https://schema.org/InStock',
            },
          },
        },
      ],
    },
  };

  const breadcrumb = breadcrumbSchema([
    { name: 'Inicio', url: BUSINESS.url },
    { name: 'Catálogo de Anchetas y Desayunos', url: `${BUSINESS.url}/creaciones-vane` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdStore) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <Header />

      <main className="min-h-screen">
        <header className="relative h-[380px] flex items-center justify-center overflow-hidden">
          <Image
            src="/banner-detalles.webp"
            alt="Catálogo de anchetas personalizadas y desayunos sorpresa a domicilio en Medellín — Creaciones Vane"
            fill
            className="object-cover object-center blur-[2px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-600/80 via-primary-500/70 to-primary-700/80" />

          <div className="relative z-10 text-center px-4 max-w-4xl w-full">
            <ScrollReveal direction="down" delay={0.2}>
              <Image
                src="/logo.png"
                alt="Logo Creaciones Vane — Tienda de anchetas y regalos en Medellín"
                width={120}
                height={120}
                className="mx-auto mb-3 rounded-full shadow-2xl bg-white p-2"
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              {/*
                H1 deliberadamente diferente al del home: aquí "Catálogo" señala intent
                de exploración del catálogo, no de marca. Evita canibalización con la home
                que apunta a "Creaciones Vane" como marca.
              */}
              <h1 className="text-4xl md:text-5xl font-sm font-script text-white mb-3 drop-shadow-lg">
                Catálogo de Anchetas y Desayunos Sorpresa
              </h1>
              <p className="text-2xl md:text-3xl text-white/95 mb-4 font-script drop-shadow-md">
                Entrega a domicilio el mismo día en Medellín
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.6}>
              <p className="text-base md:text-lg text-white/95 max-w-2xl mx-auto drop-shadow-md">
                Anchetas personalizadas, desayunos sorpresa, peluches, ramos de rosas y detalles de amor con entrega el mismo día en El Poblado, Envigado, Sabaneta e Itagüí.
              </p>
            </ScrollReveal>
          </div>
        </header>

        <ProductCatalog
          theme="detalles"
          title="Nuestros Detalles de Amor"
          products={products}
          shuffleOnLoad={true}
        />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
