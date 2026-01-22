import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'WhatsApp', href: 'https://wa.me/573128235654', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 4.991l-.001.001h-.001L10 22l.061-.307c.301-1.529-.367-3.111-1.621-4.141C7.158 16.511 6 14.811 6 13c0-3.859 3.14-7 7-7s7 3.141 7 7c0 3.858-3.14 7-7 7-1.231 0-2.389-.319-3.391-.874z' },
    // Puedes agregar más aquí (Instagram, Facebook)
  ];

  return (
    <footer className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white overflow-hidden">
      {/* Elemento decorativo de fondo */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg width="100%" height="100%"><pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="currentColor" /></pattern><rect width="100%" height="100%" fill="url(#pattern)" /></svg>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Logo y Branding */}
          <div className="space-y-6 col-span-1 lg:col-span-1">
            <div className="flex items-center gap-4 group">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="Creaciones Vane"
                  width={70}
                  height={70}
                  className="rounded-full bg-white p-1 shadow-xl transition-transform duration-500 group-hover:rotate-12"
                />
              </div>
              <div>
                <h3 className="font-script text-3xl leading-none">Creaciones Vane</h3>
                <p className="text-primary-100 text-sm italic">Cómplice que endulza</p>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              Desde 2019 creando momentos mágicos con amor. Tu aliado perfecto para transformar cualquier ocasión en un recuerdo inolvidable.
            </p>
          </div>

          {/* Enlaces Rápidos con Hover Animado */}
          <div>
            <h4 className="font-bold text-xl mb-6 border-b border-white/20 pb-2 inline-block">Servicios</h4>
            <ul className="space-y-4">
              {['Detalles de Amor', 'Refrigerios', 'Decoraciones'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="group flex items-center text-white/80 hover:text-white transition-all"
                  >
                    <span className="h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-4 group-hover:mr-2"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto con mejor legibilidad */}
          <div>
            <h4 className="font-bold text-xl mb-6 border-b border-white/20 pb-2 inline-block">Hablemos</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <div>
                  <p className="text-xs text-primary-200">WhatsApp</p>
                  <a href="https://wa.me/573128235654" className="text-white hover:underline">+57 312 823 5654</a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div>
                  <p className="text-xs text-primary-200">Ubicación</p>
                  <span className="text-sm text-white/90">Cra. 50 #120-13<br/>Medellín, Colombia</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter o CTA pequeño */}
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
            <h4 className="font-bold text-lg mb-2">¿Quieres algo especial?</h4>
            <p className="text-sm text-white/70 mb-4">Escríbenos y personalizamos tu regalo hoy mismo.</p>
            <a 
              href="https://wa.me/573128235654"
              className="block text-center bg-white text-primary-600 font-bold py-2 px-4 rounded-xl hover:bg-primary-50 transition-colors shadow-lg"
            >
              Pedir ahora
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-16 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-white/60 text-sm">
                © {currentYear} <span className="text-white font-medium">Creaciones Vane</span>. Todos los derechos reservados.
              </p>
              <p className="text-xs text-white/70 mt-1 flex items-center justify-center md:justify-start gap-1">
                Hecho con <span className="text-red-400">❤</span> en Colombia
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-xs text-white/50">
              <a href="https://tiktok.com/@owlydev" className="hover:text-white transition-colors flex items-center gap-1">
                Web por <span className="font-bold text-white/80">OwlyDev</span>
              </a>
              <a href="https://iconscout.com/" className="hover:text-white transition-colors">
                Iconos: IconScout
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}