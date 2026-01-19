import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-primary-400 to-primary-600 text-white mt-0">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y Descripción */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Creaciones Vane"
                width={60}
                height={60}
                className="rounded-full bg-white p-1"
              />
              <div>
                <h3 className="font-script text-2xl">Creaciones Vane</h3>
                <p className="text-sm text-white/90">Cómplice que endulza</p>
              </div>
            </div>
            <p className="text-white/80 text-sm">
              Desde 2019 creando momentos especiales con amor y dedicación.
              Tu aliado perfecto para sorprender y celebrar.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h4 className="font-bold text-lg mb-4">Nuestros Servicios</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/creaciones-vane" className="text-white/80 hover:text-white transition-colors">
                  Detalles de Amor
                </Link>
              </li>
              <li>
                <Link href="/refrigerios" className="text-white/80 hover:text-white transition-colors">
                  Refrigerios
                </Link>
              </li>
              <li>
                <Link href="/decoraciones" className="text-white/80 hover:text-white transition-colors">
                  Decoraciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contáctanos</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="https://wa.me/573128235654" className="text-white/80 hover:text-white transition-colors">
                  +57 312 823 5654
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-white/80">WhatsApp para pedidos</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/80"> Cra.50 #120-13 Medellín, Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-6 pt-6 text-center text-white/70 text-sm">
            <p>© {currentYear} Creaciones Vane. Todos los derechos reservados.</p>
            <p className="mt-1">Hecho con amor en Colombia</p><br />

          <a href="https://tiktok.com/@owlydev" className="mt-1">Pagina web: OwlyDev</a><br />
          <a href="https://iconscout.com/" className="mt-1">Iconos: IconScout</a>
        </div>
      </div>
    </footer>
  );
}