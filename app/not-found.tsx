import Link from 'next/link';
import Image from 'next/image';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: 'Página no encontrada | Creaciones Vane',
  description: 'La página que buscas no existe. Vuelve al inicio y encuentra anchetas, desayunos sorpresa y regalos a domicilio en Medellín.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 flex items-center justify-center py-20 px-4">
        <div className="max-w-lg w-full text-center">
          <div className="mb-8">
            <Image
              src="/logo.png"
              alt="Logo Creaciones Vane - Regalos y anchetas en Medellín"
              width={100}
              height={100}
              className="mx-auto rounded-full shadow-lg bg-white p-2"
            />
          </div>

          <h1 className="text-8xl font-black text-primary-600 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ¡Ups! Esta página no existe
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Parece que te perdiste buscando el regalo perfecto. No te preocupes, tenemos anchetas, desayunos sorpresa y decoraciones esperándote.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-md hover:shadow-lg hover:scale-105"
            >
              Volver al inicio
            </Link>
            <a
              href="https://wa.me/573128235654?text=¡Hola!%20Necesito%20ayuda%20💝"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-bold transition-all shadow-md hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Contactar por WhatsApp
            </a>
          </div>

          <nav className="mt-12" aria-label="Páginas principales">
            <p className="text-sm text-gray-500 mb-4 font-medium uppercase tracking-wide">O explora nuestros servicios</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/creaciones-vane" className="text-primary-600 hover:text-primary-700 font-semibold text-sm border border-primary-200 px-4 py-2 rounded-full hover:bg-primary-50 transition-all">
                Anchetas y Desayunos
              </Link>
              <Link href="/decoraciones" className="text-primary-600 hover:text-primary-700 font-semibold text-sm border border-primary-200 px-4 py-2 rounded-full hover:bg-primary-50 transition-all">
                Decoraciones
              </Link>
              <Link href="/refrigerios" className="text-primary-600 hover:text-primary-700 font-semibold text-sm border border-primary-200 px-4 py-2 rounded-full hover:bg-primary-50 transition-all">
                Refrigerios
              </Link>
            </div>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
