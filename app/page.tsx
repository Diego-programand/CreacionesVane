import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HeroSection from './home-sections/HeroSection';
import ServicesSection from './home-sections/ServicesSection';
import OcasionesSection from './home-sections/OcasionesSection';
import LocationSection from './home-sections/LocationSection';
import { sanityClient } from './lib/sanity.client';
import { FEATURED_PRODUCTS_QUERY, ALL_CATEGORIES_QUERY } from './lib/sanity.queries';
import { toProduct, type SanityProduct, type SanityCategory } from './lib/sanity.types';
import { BUSINESS } from './lib/business';
import { breadcrumbSchema, faqSchema, pageMetadata } from './lib/seo';

const FeaturedProductsSection = dynamic(() => import('./home-sections/FeaturedProductsSection'), {
  loading: () => <div className="py-12 md:py-20 bg-primary-100 min-h-[400px]" />,
});

const CTASection = dynamic(() => import('./home-sections/CTASection'), {
  loading: () => <div className="py-20 md:py-24 bg-primary-600 min-h-[300px]" />,
});

const ExperienceSection = dynamic(() => import('./home-sections/ExperienceSection'), {
  loading: () => <div className="py-20 bg-primary-50 min-h-[400px]" />,
});

/**
 * HOME — Creaciones Vane
 *
 * Estrategia SEO Local Medellín:
 *  - Title brandeado para dominar query "creaciones vane" (pos GSC actual: 4.76)
 *  - H1 transaccional con geo en HeroSection
 *  - Schema: usa Organization+LocalBusiness ya declarado en layout (no duplica)
 *           Solo emite BreadcrumbList y FAQPage específicos de la home.
 */
export const metadata: Metadata = pageMetadata({
  title:
    'Creaciones Vane — Anchetas, Desayunos Sorpresa y Decoración en Medellín | Entrega Hoy',
  description: `Anchetas, desayunos sorpresa, decoración y refrigerios a domicilio en Medellín. Entrega el mismo día en El Poblado, Envigado y Sabaneta. Desde $50.000 — WhatsApp ${BUSINESS.phoneDisplay}.`,
  path: '/',
  ogImage: `${BUSINESS.url}/og-image-main.webp`,
  keywords: [
    'creaciones vane',
    'creaciones vane medellín',
    'anchetas medellín',
    'anchetas medellin domicilio',
    'desayunos sorpresa a domicilio medellín',
    'regalos a domicilio medellín',
    'detalles de amor medellín',
    'decoración eventos medellín',
    'refrigerios medellín',
    'anchetas el poblado',
    'desayunos sorpresa envigado',
    'regalos cumpleaños medellín',
    'detalles san valentín medellín',
    'anchetas día de la madre medellín',
    'desayunos románticos medellín',
    'anchetas entrega el mismo día medellín',
    'mejor tienda de regalos en medellín',
  ],
});

export default async function Home() {
  const [sanityFeatured, sanityCategories] = await Promise.all([
    sanityClient.fetch<SanityProduct[]>(FEATURED_PRODUCTS_QUERY, {}, { next: { tags: ['product'] } }),
    sanityClient.fetch<SanityCategory[]>(ALL_CATEGORIES_QUERY, {}, { next: { tags: ['category'] } }),
  ]);

  const featuredProducts = sanityFeatured.map(toProduct);

  const categoriasMap: Record<
    string,
    { id: string; nombre: string; subtitulo?: string; descripcion?: string; icono?: string; ruta?: string }
  > = {
    Detalles: { id: 'detalles', nombre: '', ruta: '/creaciones-vane' },
    Refrigerios: { id: 'refrigerios', nombre: '', ruta: '/refrigerios' },
    Decoraciones: { id: 'decoraciones', nombre: '', ruta: '/decoraciones' },
  };

  const categorias = sanityCategories.map((c) => ({
    ...categoriasMap[c.valor],
    nombre: c.nombre,
    subtitulo: c.subtitulo,
    descripcion: c.descripcion,
    icono: c.icono,
    ruta: c.ruta ?? categoriasMap[c.valor]?.ruta,
  }));

  /* Breadcrumb home (referencia al nodo organization) */
  const breadcrumb = breadcrumbSchema([{ name: 'Inicio', url: BUSINESS.url }]);

  /* FAQ con preguntas alineadas a queries reales detectadas en GSC */
  const faq = faqSchema([
    {
      q: '¿Hacen entregas de regalos a domicilio en Medellín el mismo día?',
      a: `Sí. En Creaciones Vane realizamos entregas el mismo día en todo Medellín y el área metropolitana: El Poblado, Laureles, Envigado, Sabaneta, Itagüí, Bello y La Estrella. Contáctanos por WhatsApp al ${BUSINESS.phoneDisplay} antes de las 2:00 PM para garantizar entrega el mismo día.`,
    },
    {
      q: '¿Cuánto cuesta un desayuno sorpresa en Medellín?',
      a: 'Nuestros desayunos sorpresa van desde $55.000 hasta $190.000 COP. Incluyen frutas frescas, jugos naturales, sándwich gourmet y decoración temática personalizada. El precio varía según el tamaño y acompañamientos como peluches, globos o ramos de rosas.',
    },
    {
      q: '¿Qué zonas de Medellín cubren para entregas?',
      a: 'Cubrimos todo el Valle de Aburrá: Medellín (El Poblado, Laureles, Belén, Robledo, Centro), Envigado, Sabaneta, Itagüí, Bello, La Estrella, Copacabana y Caldas. El costo del domicilio varía según la zona.',
    },
    {
      q: '¿Puedo personalizar las anchetas y los regalos?',
      a: `Por supuesto. Cada ancheta y regalo es 100% personalizable: productos, colores, mensaje y acompañamientos (peluches, globos, chocolates, ramos). Escríbenos por WhatsApp al ${BUSINESS.phoneDisplay} con tu idea.`,
    },
    {
      q: '¿Qué métodos de pago aceptan?',
      a: 'Aceptamos efectivo contra entrega, transferencia bancaria, Nequi y Daviplata. Para garantizar tu pedido solicitamos un anticipo del 50% al confirmar.',
    },
    {
      q: '¿Tienen refrigerios para fiestas infantiles?',
      a: 'Sí. Manejamos refrigerios individuales para fiestas infantiles desde $5.000 por unidad, con pedido mínimo de 10 unidades. Empaque higiénico y opciones temáticas disponibles.',
    },
    {
      q: '¿Dónde está ubicada la tienda física?',
      a: `Estamos en ${BUSINESS.address.streetAddress}, Pablo VI, Medellín. Atendemos lunes a viernes 8:00 AM – 6:00 PM y sábados 9:00 AM – 3:00 PM.`,
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />

      <Header />

      <main>
        <HeroSection />
        <ServicesSection categorias={categorias} />
        <FeaturedProductsSection products={featuredProducts} />
        <OcasionesSection />
        <LocationSection />
        <CTASection />
        <ExperienceSection />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
