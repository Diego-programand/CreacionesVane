import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
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
        {/*
          Hero responsive: usa min-h en vez de h fija para que el contenido
          nunca quede cortado. Padding generoso arriba para no quedar tapado
          por el navbar sticky (~70-80px). Logo y tipografía escalan
          progresivamente para evitar overflow en mobile.
        */}
        <header className="relative min-h-[500px] sm:min-h-[520px] md:min-h-[560px] flex items-center justify-center overflow-hidden pt-24 sm:pt-20 pb-16 sm:pb-20">
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
                className="mx-auto mb-3 sm:mb-4 rounded-full shadow-2xl bg-white p-2 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px]"
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              {/*
                H1 deliberadamente diferente al del home: aquí "Catálogo" señala intent
                de exploración del catálogo, no de marca. Evita canibalización con la home
                que apunta a "Creaciones Vane" como marca.
              */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-script text-white mb-3 drop-shadow-lg leading-tight">
                Catálogo de Anchetas y Desayunos Sorpresa
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-white/95 mb-4 font-script drop-shadow-md">
                Entrega a domicilio el mismo día en Medellín
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.6}>
              <p className="text-sm sm:text-base md:text-lg text-white/95 max-w-2xl mx-auto drop-shadow-md leading-relaxed">
                Anchetas personalizadas, desayunos sorpresa, peluches, ramos de rosas y detalles de amor con entrega el mismo día en El Poblado, Envigado, Sabaneta e Itagüí.
              </p>
            </ScrollReveal>
          </div>
        </header>

        {/*
          Cross-link al spoke transaccional de anchetas a domicilio. Aprovecha
          la autoridad del hub para enrutar al usuario a una landing con
          paquetes claros y cobertura el mismo día.
        */}
        <section
          aria-label="Landing especializada"
          className="bg-white border-y border-stone-200 py-10 px-4"
        >
          <div className="max-w-5xl mx-auto">
            <p className="text-xs text-[#D81B60] font-semibold uppercase tracking-[0.2em] mb-5 text-center md:text-left">
              ¿Necesitas la ancheta hoy mismo?
            </p>
            <Link
              href="/anchetas-medellin-domicilio"
              className="group flex items-center justify-between gap-4 border border-stone-200 hover:border-stone-900 rounded-2xl p-5 transition-colors"
            >
              <div>
                <p className="text-stone-900 font-semibold text-base md:text-lg mb-1">
                  Anchetas a domicilio en Medellín
                </p>
                <p className="text-stone-500 text-sm">
                  Desde $50.000 — entrega el mismo día si confirmas antes de las 2:00 PM
                </p>
              </div>
              <svg className="w-5 h-5 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </section>

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
