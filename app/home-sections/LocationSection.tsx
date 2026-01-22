import ScrollReveal from '../components/ScrollReveal';

export default function LocationSection() {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      url: 'https://instagram.com/complice_que_endulza',
      color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400'
    },
    {
      name: 'TikTok',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
      url: 'https://tiktok.com/@creacionesvane01',
      color: 'hover:bg-black'
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      url: 'https://facebook.com/creaciones2927',
      color: 'hover:bg-blue-600'
    }
  ];

  return (
    <section id="location" className="relative py-16 md:py-20 bg-gradient-to-br from-primary-90 via-white to-primary-100 overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">

          {/* Columna Izquierda: Mapa */}
          <ScrollReveal direction="left" className="order-1">
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                {/* MEJORA SEO: Título con palabra clave */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                  Anchetas en Medellín - Nuestra Tienda
                </h2>
                <div className="w-20 h-1 bg-primary-500 mx-auto lg:mx-0 mb-4 rounded-full"></div>
                <p className="text-gray-600 text-base md:text-lg mb-6">
                  Visítanos en el Barrio Pablo VI y conoce nuestros desayunos sorpresa.
                </p>
              </div>

              {/* Información de dirección */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-primary-100">
                <div className="flex items-start gap-4">
                  {/* ... (icono igual) */}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg mb-2">Creaciones Vane - Detalles de Amor</h3>
                    <p className="text-gray-600 mb-4">
                      Carrera 50 #120-13<br />
                      Barrio Pablo VI, Medellín<br />
                      Antioquia, Colombia
                    </p>
                    <a
                      href="https://maps.google.com/?q=Carrera+50+%23120-13+Medellin" // Enlace real
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                    >
                      <span>Cómo llegar en Google Maps</span>
                      {/* ... (icono igual) */}
                    </a>
                  </div>
                </div>
              </div>

              {/* Mapa embebido */}
              {/* Mapa embebido corregido sin errores de TypeScript */}
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.6534608331346!2d-75.55611262521192!3d6.30920499368007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e442f1f50125651%3A0x6d91f24d9c42023!2sCarrera%2050%20%23120-13%2C%20Medell%C3%ADn%2C%20Antioquia!5e0!3m2!1ses!2sco!4v1700000000000"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  title="Ubicación de Creaciones Vane en Medellín, Barrio Pablo VI"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-[30%] contrast-[1.1]"
                ></iframe>
              </div>
            </div>
          </ScrollReveal>

          {/* Redes Sociales - Derecha en desktop, abajo en móvil */}
          <ScrollReveal direction="right" className="order-2">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-primary-100">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                  ¿Prefieres el online?
                </h2>
                <div className="w-20 h-1 bg-primary-500 mx-auto mb-4 rounded-full"></div>
                <p className="text-gray-600 text-base md:text-lg">
                  ¡Síguenos en nuestras redes sociales y mantente al día con nuestras novedades!
                </p>
              </div>

              {/* Iconos sociales - Desktop (hover con tooltip) */}
              <div className="hidden md:flex justify-center gap-6 mb-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                  >
                    <div className={`w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${social.color} hover:text-white`}>
                      {social.icon}
                    </div>

                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-3 py-1.5 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                      {social.name}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Botones completos - Móvil */}
              <div className="md:hidden space-y-3 mb-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-all duration-300 shadow-sm hover:shadow-md group"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-700 shadow-sm group-hover:scale-110 transition-transform">
                      {social.icon}
                    </div>
                    <span className="font-semibold text-gray-800 text-lg">{social.name}</span>
                    <svg className="w-5 h-5 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>

              {/* Mensaje adicional */}
              <div className="text-center pt-6 border-t border-gray-100">
                <p className="text-gray-500 text-sm mb-4">
                  O escríbenos directamente
                </p>
                <a
                  href="https://wa.me/573128235654?text=¡Hola!%20Quiero%20conocer%20más%20sobre%20sus%20servicios%20💝"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chatear por WhatsApp
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}