import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://creacionesvane.com';
    const lastModified = new Date();

    // Rutas principales
    const routes = [
        {
            url: baseUrl,
            lastModified,
            changeFrequency: 'daily' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/creaciones-vane`,
            lastModified,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/refrigerios`,
            lastModified,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/decoraciones`,
            lastModified,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
    ];

    return routes;
}