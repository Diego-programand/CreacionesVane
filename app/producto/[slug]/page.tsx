import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityClient } from '@/app/lib/sanity.client';
import { PRODUCT_BY_SLUG_QUERY, ALL_PRODUCTS_SLUGS_QUERY } from '@/app/lib/sanity.queries';
import { toProduct, type SanityProduct } from '@/app/lib/sanity.types';
import { BUSINESS } from '@/app/lib/business';
import { breadcrumbSchema, productSchema } from '@/app/lib/seo';
import ProductDetailClient from './ProductDetailClient';

export async function generateStaticParams() {
  const products = await sanityClient.fetch<{ slug: string }[]>(
    ALL_PRODUCTS_SLUGS_QUERY,
    {},
    { next: { tags: ['product'] } }
  );

  return products.map((p) => ({ slug: p.slug }));
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const sanityProduct = await sanityClient.fetch<SanityProduct | null>(
    PRODUCT_BY_SLUG_QUERY,
    { slug },
    { next: { tags: ['product'] } }
  );

  if (!sanityProduct) return {};

  const product = toProduct(sanityProduct);
  const url = `${BUSINESS.url}/producto/${product.slug}`;

  /*
    Los nombres del catálogo son creativos ("Jardín de Gala Explosión de
    Girasoles") y no contienen ninguna keyword buscable, por eso las 76 fichas
    sumaban 0 clics con 47 impresiones en GSC pese a rankear en posición 6–8.
    El sufijo por categoría añade tipo + ciudad al title, y la description
    ancla precio y entrega — que es lo que decide el clic en el SERP.
  */
  const seoPorCategoria = {
    Detalles: {
      sufijoTitle: 'Detalle en Medellín',
      fraseDescription: 'Ancheta a domicilio en Medellín, confirmando con 24 horas',
    },
    Refrigerios: {
      sufijoTitle: 'Refrigerio en Medellín',
      fraseDescription: 'Caja de refrigerio para eventos y empresas en Medellín',
    },
    Decoraciones: {
      sufijoTitle: 'Decoración en Medellín',
      fraseDescription: 'Decoración con montaje y desmontaje en Medellín',
    },
  }[product.categoria];

  /*
    absolute: los nombres del catálogo ya son largos; añadir el sufijo de marca
    del layout empujaría el title muy por encima de los ~60 caracteres que
    Google muestra, dejando la keyword fuera de la vista.
  */

  const precioFormateado = `$${product.precio.toLocaleString('es-CO')}`;

  /*
    Google muestra ~160 caracteres de description. El resumen se recorta para
    que la parte que decide el clic — tipo de producto, ciudad y precio —
    sobreviva al truncado en lugar de quedar fuera.
  */
  const resumen =
    product.descripcion.length > 62
      ? product.descripcion.substring(0, 59).trimEnd() + '...'
      : product.descripcion;

  const description =
    `${resumen} ${seoPorCategoria.fraseDescription} desde ${precioFormateado} COP.`.substring(
      0,
      160
    );

  return {
    title: { absolute: `${product.nombre} — ${seoPorCategoria.sufijoTitle}` },
    description,
    openGraph: {
      title: `${product.nombre} — Creaciones Vane`,
      description,
      url,
      images: [
        {
          url: product.imagen,
          width: 800,
          height: 800,
          alt: `${product.nombre} — Creaciones Vane Medellín`,
        },
      ],
      locale: 'es_CO',
      siteName: BUSINESS.name,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.nombre} | Creaciones Vane`,
      description,
      images: [product.imagen],
    },
    alternates: { canonical: url },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const sanityProduct = await sanityClient.fetch<SanityProduct | null>(
    PRODUCT_BY_SLUG_QUERY,
    { slug },
    { next: { tags: ['product'] } }
  );

  if (!sanityProduct) notFound();

  const product = toProduct(sanityProduct);
  const url = `${BUSINESS.url}/producto/${product.slug}`;

  /**
   * Product schema enriquecido: shippingDetails + hasMerchantReturnPolicy son
   * requeridos por Google para product rich results desde 2023. brand referencia
   * la Organization canónica del sitio (declarada en layout.tsx) vía @id.
   */
  const jsonLdProduct = productSchema({
    id: product.id,
    name: product.nombre,
    description: product.descripcion,
    image: product.imagen,
    priceCOP: product.precio,
    category: product.categoria,
    url,
  });

  /*
   * Breadcrumb: Inicio > Categoría correspondiente > Producto.
   *
   * categoryRouteMap también se pasa al cliente para construir el botón
   * "Volver al catálogo" como <Link href> determinista. Antes se usaba
   * router.back(), que fallaba cuando el usuario aterrizaba directamente
   * desde Google (sin historial dentro del sitio).
   *
   * Una landing transaccional asociada a cada categoría sirve como
   * cross-link al final del detalle del producto. Refuerza PageRank
   * interno y mantiene al usuario dentro del sitio aunque entre por
   * orgánico al detalle.
   */
  const categoryRouteMap: Record<
    typeof product.categoria,
    { name: string; path: string; landing: { label: string; path: string; lead: string } }
  > = {
    Detalles: {
      name: 'Catálogo de Anchetas y Desayunos',
      path: '/creaciones-vane',
      landing: {
        label: 'Anchetas a domicilio en Medellín',
        path: '/anchetas-medellin-domicilio',
        lead: 'Confirma con 24 horas y elegimos el día y la hora de entrega',
      },
    },
    Refrigerios: {
      name: 'Refrigerios para Eventos',
      path: '/refrigerios',
      landing: {
        label: 'Refrigerios empresariales en Medellín',
        path: '/refrigerios-empresariales-medellin',
        lead: 'Desde $7.000 por persona — pedido mínimo 10 unidades',
      },
    },
    Decoraciones: {
      name: 'Decoración de Eventos',
      path: '/decoraciones',
      landing: {
        label: 'Decoración de bodas en Medellín',
        path: '/decoracion-bodas-medellin',
        lead: 'Aros con forros, backings de madera y mesas reloj',
      },
    },
  };
  const cat = categoryRouteMap[product.categoria];

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Inicio', url: BUSINESS.url },
    { name: cat.name, url: `${BUSINESS.url}${cat.path}` },
    { name: product.nombre, url },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <ProductDetailClient product={product} categoryRoute={cat} />
    </>
  );
}
