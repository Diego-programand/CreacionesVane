import { MetadataRoute } from 'next';

/**
 * ===== SITEMAP.XML OPTIMIZADO =====
 * 
 * Prioridad de indexación:
 * 1.0 → Home (landing principal)
 * 0.9 → Categorías de venta (Detalles, Decoraciones, Refrigerios)
 * 0.7 → Páginas informativas (Política, Términos)
 * 
 * changeFrequency optimizado:
 * - 'daily' para Home (contenido fresco, productos destacados)
 * - 'weekly' para categorías (catálogo cambia frecuentemente)
 * - 'monthly' para páginas estáticas
 * 
 * lastModified: fecha real para señalar frescura a Google
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://creacionesvane.com';
    const lastModified = new Date();

    // ===== RUTAS PRINCIPALES — Orden de prioridad comercial =====
    const routes: MetadataRoute.Sitemap = [
        // HOME — Máxima prioridad, contenido diario
        {
            url: baseUrl,
            lastModified,
            changeFrequency: 'daily',
            priority: 1.0,
        },

        // CATEGORÍA: Detalles de Amor (producto estrella)
        // Ruta: /creaciones-vane → Anchetas, Desayunos Sorpresa, Ramos, Peluches
        {
            url: `${baseUrl}/creaciones-vane`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.9,
        },

        // CATEGORÍA: Decoraciones de Eventos
        // Ruta: /decoraciones → Bodas, Cumpleaños, Baby Shower, Quinceañeras
        {
            url: `${baseUrl}/decoraciones`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.9,
        },

        // CATEGORÍA: Refrigerios para Eventos
        // Ruta: /refrigerios → Corporativos, Infantiles, Box Lunch
        {
            url: `${baseUrl}/refrigerios`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.9,
        },

        // PÁGINA: Política de Privacidad
        {
            url: `${baseUrl}/politica-de-privacidad`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.3,
        },

        // PÁGINA: Términos y Condiciones
        {
            url: `${baseUrl}/terminos-y-condiciones`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.3,
        },
    ];

    return routes;
}