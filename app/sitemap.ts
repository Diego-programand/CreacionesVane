import { MetadataRoute } from 'next';
import { sanityClient } from './lib/sanity.client';
import { ALL_PRODUCTS_SLUGS_QUERY } from './lib/sanity.queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://creacionesvane.com';
    const lastModified = new Date();

    // Static routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/creaciones-vane`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/decoraciones`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/refrigerios`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.9,
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

    // Dynamic product routes from Sanity
    let productRoutes: MetadataRoute.Sitemap = [];
    try {
        const products = await sanityClient.fetch<{ slug: string }[]>(
            ALL_PRODUCTS_SLUGS_QUERY,
            {},
            { next: { tags: ['product'] } }
        );
        productRoutes = products.map((p) => ({
            url: `${baseUrl}/producto/${p.slug}`,
            lastModified,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));
    } catch {
        // If Sanity is unavailable during build, skip product routes
    }

    return [...staticRoutes, ...productRoutes];
}
