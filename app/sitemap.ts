import { MetadataRoute } from 'next';
import { sanityClient } from './lib/sanity.client';
import { ALL_PRODUCTS_SLUGS_QUERY } from './lib/sanity.queries';
import { BUSINESS } from './lib/business';

/**
 * Sitemap dinámico.
 *
 * Incluye:
 *  - Rutas estáticas con changeFrequency y priority calibradas según GSC.
 *  - Productos de Sanity con su URL y, cuando disponible, image entry para
 *    SEO de imágenes en Google Images.
 *
 * Preparado para añadir /blog/[categoria]/[slug] cuando se publique la línea
 * editorial — basta con descomentar el bloque correspondiente y conectar la
 * query GROQ de blogPosts.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = BUSINESS.url;
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: 'daily', priority: 1.0 },
    {
      url: `${baseUrl}/creaciones-vane`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/anchetas-medellin-domicilio`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/decoraciones`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/decoracion-bodas-medellin`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/decoracion-primera-comunion-medellin`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/refrigerios`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/refrigerios-empresariales-medellin`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/politica-de-privacidad`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terminos-y-condiciones`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await sanityClient.fetch<{ slug: string; image?: string }[]>(
      ALL_PRODUCTS_SLUGS_QUERY,
      {},
      { next: { tags: ['product'] } }
    );
    productRoutes = products.map((p) => {
      const entry: MetadataRoute.Sitemap[number] = {
        url: `${baseUrl}/producto/${p.slug}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
      if (p.image) entry.images = [p.image];
      return entry;
    });
  } catch {
    /* Si Sanity no responde durante el build, no rompemos el sitemap. */
  }

  /*
    TODO blog — descomentar cuando exista la colección blogPost en Sanity:

    let blogRoutes: MetadataRoute.Sitemap = [];
    try {
      const posts = await sanityClient.fetch<{ slug: string; categoria: string; updatedAt: string }[]>(
        ALL_BLOG_POSTS_QUERY,
        {},
        { next: { tags: ['blogPost'] } }
      );
      blogRoutes = posts.map((p) => ({
        url: `${baseUrl}/blog/${p.categoria}/${p.slug}`,
        lastModified: new Date(p.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
    } catch {}
  */

  return [...staticRoutes, ...productRoutes];
}
