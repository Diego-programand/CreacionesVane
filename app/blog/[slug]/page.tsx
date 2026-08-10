import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import ScrollReveal from '../../components/ScrollReveal';
import { waUrl } from '../../lib/whatsapp';
import { BUSINESS } from '../../lib/business';
import { breadcrumbSchema, faqSchema, pageMetadata } from '../../lib/seo';
import {
  BLOG_POSTS,
  getPostBySlug,
  getPostsOrdenados,
  type BlogBlock,
  type BlogPost,
} from '../../lib/blog';

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return pageMetadata({
    title: post.tituloSeo,
    titleAbsolute: true,
    description: post.descripcion,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
  });
}

/** Renderiza un bloque de contenido según su tipo. */
function Bloque({ bloque }: { bloque: BlogBlock }) {
  switch (bloque.type) {
    case 'h2':
      return (
        <h2 className="text-2xl sm:text-3xl font-semibold text-stone-900 tracking-tight mt-12 mb-5 leading-snug">
          {bloque.text}
        </h2>
      );

    case 'h3':
      return (
        <h3 className="text-xl sm:text-2xl font-semibold text-stone-900 mt-9 mb-4 leading-snug">
          {bloque.text}
        </h3>
      );

    case 'parrafo':
      return (
        <p className="text-base sm:text-lg text-stone-700 leading-relaxed mb-5">
          {bloque.text}
        </p>
      );

    case 'lista': {
      const items = bloque.items.map((item, i) => (
        <li key={i} className="text-base sm:text-lg text-stone-700 leading-relaxed pl-1">
          {item}
        </li>
      ));
      return bloque.ordenada ? (
        <ol className="list-decimal marker:text-[#D81B60] marker:font-semibold pl-6 space-y-3 mb-6">
          {items}
        </ol>
      ) : (
        <ul className="list-disc marker:text-[#D81B60] pl-6 space-y-3 mb-6">{items}</ul>
      );
    }

    case 'tabla':
      return (
        <figure className="my-8">
          {/* overflow-x-auto: las tablas de precios no caben en móvil y el
              cuerpo de la página nunca debe desplazarse en horizontal. */}
          <div className="overflow-x-auto border border-stone-200 rounded-2xl">
            <table className="w-full text-left border-collapse min-w-[32rem]">
              <thead>
                <tr className="bg-stone-50">
                  {bloque.encabezados.map((h) => (
                    <th
                      key={h}
                      className="px-5 py-4 text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold border-b border-stone-200"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bloque.filas.map((fila, i) => (
                  <tr key={i} className="border-b border-stone-100 last:border-0">
                    {fila.map((celda, j) => (
                      <td
                        key={j}
                        className={
                          j === 0
                            ? 'px-5 py-4 text-sm font-semibold text-stone-900 align-top'
                            : 'px-5 py-4 text-sm text-stone-700 align-top leading-relaxed'
                        }
                      >
                        {celda}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {bloque.nota && (
            <figcaption className="mt-3 text-xs text-stone-500 leading-relaxed">
              {bloque.nota}
            </figcaption>
          )}
        </figure>
      );

    case 'destacado':
      return (
        <aside className="my-8 border-l-2 border-[#D81B60] bg-white rounded-r-2xl p-6 sm:p-7">
          <p className="text-[#D81B60] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            {bloque.titulo}
          </p>
          <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
            {bloque.text}
          </p>
        </aside>
      );
  }
}

function formatearFecha(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${BUSINESS.url}/blog/${post.slug}`;
  const relacionados = getPostsOrdenados()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  /**
   * Article schema. author e publisher apuntan a la Organization canónica
   * declarada en layout.tsx: el contenido lo produce el negocio, no una
   * persona con perfil propio, así que no se inventa un autor individual.
   */
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: post.titulo,
    description: post.descripcion,
    articleSection: post.categoria,
    inLanguage: 'es-CO',
    datePublished: post.publicado,
    dateModified: post.actualizado,
    author: { '@id': `${BUSINESS.url}/#organization` },
    publisher: { '@id': `${BUSINESS.url}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: [`${BUSINESS.url}/og-image-main.webp`],
    about: post.keywords.slice(0, 5),
  };

  const breadcrumb = breadcrumbSchema([
    { name: 'Inicio', url: BUSINESS.url },
    { name: 'Blog', url: `${BUSINESS.url}/blog` },
    { name: post.titulo, url },
  ]);

  const faq = faqSchema(post.faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />

      <Header />

      <main className="min-h-screen bg-[#FBF7F4] text-stone-900">
        {/* ============================================================== */}
        {/* CABECERA                                                        */}
        {/* ============================================================== */}
        <header className="px-5 sm:px-8 pt-28 sm:pt-36 pb-10 sm:pb-14 bg-white border-b border-stone-200">
          <div className="max-w-3xl mx-auto">
            <nav aria-label="Ruta de navegación" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                <li>
                  <Link href="/" className="hover:text-stone-900 transition-colors">
                    Inicio
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/blog" className="hover:text-stone-900 transition-colors">
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-stone-700">{post.categoria}</li>
              </ol>
            </nav>

            <ScrollReveal direction="up">
              <p className="text-[#D81B60] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] mb-4">
                {post.categoria}
              </p>
              <h1 className="text-[2rem] leading-[1.12] sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-6">
                {post.titulo}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-stone-500">
                <time dateTime={post.publicado}>
                  Publicado el {formatearFecha(post.publicado)}
                </time>
                {post.actualizado !== post.publicado && (
                  <>
                    <span aria-hidden="true" className="w-1 h-1 rounded-full bg-stone-300" />
                    <time dateTime={post.actualizado}>
                      Actualizado el {formatearFecha(post.actualizado)}
                    </time>
                  </>
                )}
                <span aria-hidden="true" className="w-1 h-1 rounded-full bg-stone-300" />
                <span>{post.lecturaMin} min de lectura</span>
                <span aria-hidden="true" className="w-1 h-1 rounded-full bg-stone-300" />
                <span>Por {BUSINESS.name}</span>
              </div>
            </ScrollReveal>
          </div>
        </header>

        {/* ============================================================== */}
        {/* RESPUESTA DIRECTA — bloque citable por IA                       */}
        {/* ============================================================== */}
        <section className="px-5 sm:px-8 py-10 sm:py-12 bg-[#FBF7F4]">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg sm:text-xl text-stone-800 leading-relaxed font-medium border-l-2 border-[#D81B60] pl-5 sm:pl-6">
              {post.respuestaDirecta}
            </p>
          </div>
        </section>

        {/* ============================================================== */}
        {/* CUERPO                                                          */}
        {/* ============================================================== */}
        <article className="px-5 sm:px-8 pb-16 sm:pb-20 bg-[#FBF7F4]">
          <div className="max-w-3xl mx-auto">
            {post.bloques.map((bloque, i) => (
              <Bloque key={i} bloque={bloque} />
            ))}
          </div>
        </article>

        {/* ============================================================== */}
        {/* FAQ                                                             */}
        {/* ============================================================== */}
        <section className="px-5 sm:px-8 py-16 sm:py-20 bg-white border-y border-stone-200">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight mb-8 sm:mb-10">
              Preguntas frecuentes
            </h2>
            <div className="divide-y divide-stone-200 border-t border-b border-stone-200">
              {post.faqs.map((item, idx) => (
                <details key={idx} className="group">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer py-5 sm:py-6 list-none">
                    <span className="text-base sm:text-lg font-medium text-stone-900 leading-snug pr-2">
                      {item.q}
                    </span>
                    <span className="flex-shrink-0 w-7 h-7 rounded-full border border-stone-300 flex items-center justify-center text-stone-500 group-open:bg-stone-900 group-open:border-stone-900 group-open:text-white transition-colors">
                      <svg
                        className="w-3.5 h-3.5 transition-transform group-open:rotate-45"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <div className="pb-6 text-sm sm:text-base text-stone-600 leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* CTA A LA LANDING COMERCIAL                                      */}
        {/* ============================================================== */}
        <section className="px-5 sm:px-8 py-16 sm:py-20 bg-[#D81B60] text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-5">
              {post.cta.titulo}
            </h2>
            <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-9 max-w-xl mx-auto">
              {post.cta.texto}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
              <a
                id={`blog-${post.slug}-whatsapp`}
                href={waUrl(
                  `Hola Vane, llegué desde el artículo "${post.titulo}" y quiero cotizar. ¿Me ayudan?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white text-[#D81B60] hover:bg-stone-50 px-7 py-4 rounded-full font-semibold text-base transition-colors duration-200"
              >
                Cotizar por WhatsApp
              </a>
              <Link
                href={post.cta.path}
                className="inline-flex items-center justify-center gap-2 border border-white/40 text-white hover:bg-white/10 px-7 py-4 rounded-full font-medium text-base transition-colors duration-200"
              >
                {post.cta.label}
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* RELACIONADOS                                                    */}
        {/* ============================================================== */}
        {relacionados.length > 0 && (
          <section className="px-5 sm:px-8 py-16 sm:py-20 bg-[#FBF7F4]">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-semibold text-stone-900 tracking-tight mb-8">
                Seguir leyendo
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {relacionados.map((p: BlogPost) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group block bg-white border border-stone-200 hover:border-stone-900 rounded-2xl p-6 transition-colors"
                  >
                    <p className="text-[#D81B60] text-xs uppercase tracking-[0.15em] font-semibold mb-3">
                      {p.categoria}
                    </p>
                    <p className="text-base font-semibold text-stone-900 leading-snug mb-2">
                      {p.titulo}
                    </p>
                    <p className="text-sm text-stone-500">{p.lecturaMin} min de lectura</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
