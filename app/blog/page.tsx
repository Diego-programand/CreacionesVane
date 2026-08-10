import { Metadata } from 'next';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollReveal from '../components/ScrollReveal';
import { BUSINESS } from '../lib/business';
import { breadcrumbSchema, pageMetadata } from '../lib/seo';
import { getPostsOrdenados } from '../lib/blog';

const PAGE_PATH = '/blog';
const PAGE_URL = `${BUSINESS.url}${PAGE_PATH}`;

export const metadata: Metadata = pageMetadata({
  title: 'Guías de Eventos, Regalos y Refrigerios en Medellín',
  titleAbsolute: true,
  description:
    'Guías prácticas sobre precios, organización y logística de refrigerios, decoración de eventos y regalos a domicilio en Medellín. Escritas por Creaciones Vane.',
  path: PAGE_PATH,
  keywords: [
    'blog eventos medellín',
    'guía refrigerios medellín',
    'precios eventos medellín',
    'consejos organización eventos medellín',
  ],
});

export default function BlogIndexPage() {
  const posts = getPostsOrdenados();

  const breadcrumb = breadcrumbSchema([
    { name: 'Inicio', url: BUSINESS.url },
    { name: 'Blog', url: PAGE_URL },
  ]);

  /**
   * Blog + ItemList: le da a Google y a los motores de IA la lista completa de
   * artículos en un solo nodo, sin depender de que rastreen cada enlace.
   */
  const jsonLdBlog = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${PAGE_URL}#blog`,
    name: 'Blog de Creaciones Vane',
    description:
      'Guías sobre precios, organización y logística de eventos, refrigerios y regalos en Medellín.',
    url: PAGE_URL,
    inLanguage: 'es-CO',
    publisher: { '@id': `${BUSINESS.url}/#organization` },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.titulo,
      description: p.descripcion,
      url: `${BUSINESS.url}/blog/${p.slug}`,
      datePublished: p.publicado,
      dateModified: p.actualizado,
      author: { '@id': `${BUSINESS.url}/#organization` },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBlog) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <Header />

      <main className="min-h-screen bg-[#FBF7F4] text-stone-900">
        <header className="px-5 sm:px-8 pt-28 sm:pt-36 pb-12 sm:pb-16 bg-white border-b border-stone-200">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-4">
                Blog
              </p>
              <h1 className="text-[2rem] leading-[1.1] sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-5 max-w-3xl">
                Guías de eventos, regalos y refrigerios en Medellín
              </h1>
              <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed">
                Lo que aprendimos organizando eventos y entregando detalles en el Valle de Aburrá desde 2019: precios reales, tiempos de anticipación y los errores que se repiten.
              </p>
            </ScrollReveal>
          </div>
        </header>

        <section className="px-5 sm:px-8 py-14 sm:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
              {posts.map((p, idx) => (
                <ScrollReveal key={p.slug} direction="up" delay={0.08 * idx}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group h-full flex flex-col bg-white border border-stone-200 hover:border-stone-900 rounded-2xl p-7 sm:p-8 transition-colors"
                  >
                    <p className="text-[#D81B60] text-xs uppercase tracking-[0.15em] font-semibold mb-4">
                      {p.categoria}
                    </p>
                    <h2 className="text-xl sm:text-2xl font-semibold text-stone-900 leading-snug mb-4">
                      {p.titulo}
                    </h2>
                    <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-6 flex-1">
                      {p.descripcion}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-stone-500">
                      <time dateTime={p.publicado}>
                        {new Date(`${p.publicado}T12:00:00`).toLocaleDateString('es-CO', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <span aria-hidden="true" className="w-1 h-1 rounded-full bg-stone-300" />
                      <span>{p.lecturaMin} min</span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
