import { MetadataRoute } from 'next';
import { sanityClient } from './lib/sanity.client';
import { ALL_PRODUCTS_SLUGS_QUERY } from './lib/sanity.queries';
import { BUSINESS } from './lib/business';
import { getPostsOrdenados } from './lib/blog';

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
      url: `${baseUrl}/desayunos-sorpresa-medellin`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      /*
        Landing estacional de Amor y Amistad. Prioridad alta de forma
        permanente: la página no se despublica fuera de temporada, mantiene
        autoridad todo el año y se reactiva cada septiembre actualizando
        FECHA_CELEBRACION.
      */
      url: `${baseUrl}/regalos-amor-y-amistad-medellin`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
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
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
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
    Artículos del blog. El contenido vive en app/lib/blog.ts (no en Sanity),
    así que no hay fetch que pueda fallar durante el build. lastModified usa la
    fecha de actualización real del artículo, no la del build: así Google no
    reprocesa artículos que no han cambiado.
  */
  const blogRoutes: MetadataRoute.Sitemap = getPostsOrdenados().map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(`${p.actualizado}T12:00:00`),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...productRoutes];
}
