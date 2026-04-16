import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityClient } from '@/app/lib/sanity.client';
import { PRODUCT_BY_SLUG_QUERY, ALL_PRODUCTS_SLUGS_QUERY } from '@/app/lib/sanity.queries';
import { toProduct, type SanityProduct } from '@/app/lib/sanity.types';
import ProductDetailClient from './ProductDetailClient';

// Generate static params for all products using their semantic slug
export async function generateStaticParams() {
  const products = await sanityClient.fetch<{ slug: string }[]>(
    ALL_PRODUCTS_SLUGS_QUERY,
    {},
    { next: { tags: ['product'] } }
  );

  return products.map(p => ({
    slug: p.slug,
  }));
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// SEO: Generate dynamic metadata per product
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const sanityProduct = await sanityClient.fetch<SanityProduct | null>(
    PRODUCT_BY_SLUG_QUERY,
    { slug },
    { next: { tags: ['product'] } }
  );

  if (!sanityProduct) return {};

  const imageUrl = `https://res.cloudinary.com/dw7zhnbho/image/upload/${sanityProduct.cloudinaryPublicId}.jpg`;
  const description = sanityProduct.descripcion.length > 155
    ? sanityProduct.descripcion.substring(0, 152) + '...'
    : sanityProduct.descripcion;

  return {
    title: `${sanityProduct.nombre} | Creaciones Vane Medellín`,
    description,
    openGraph: {
      title: `${sanityProduct.nombre} - Creaciones Vane`,
      description,
      url: `https://creacionesvane.com/producto/${sanityProduct.slug.current}`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: `${sanityProduct.nombre} - Creaciones Vane Medellín`,
        },
      ],
      locale: 'es_CO',
      siteName: 'Creaciones Vane',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${sanityProduct.nombre} | Creaciones Vane`,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://creacionesvane.com/producto/${sanityProduct.slug.current}`,
    },
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

  return <ProductDetailClient product={product} />;
}
