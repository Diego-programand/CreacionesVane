import type { Metadata } from "next";
import "./globals.css";
import { ModalProvider } from './context/ModalContext';
import ProductModal from './components/ProductModal';
import { Poppins, Pacifico } from 'next/font/google';

// Configuración optimizada de fuentes
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap', // CRÍTICO: Mejora performance
  preload: true,
});

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pacifico',
  display: 'swap',
  preload: true,
});

// METADATA GLOBAL
export const metadata: Metadata = {
  metadataBase: new URL("https://www.creacionesvane.com"),

  // Google Search Console Verification
  verification: {
    google: "XTvk3yuFvCppM_D7PfCLFrTk_3p4VnI93O6GKY7CxVs",
    // Añade otros cuando los tengas:
    // yandex: "yandex-verification-code",
    // bing: "bing-verification-code",
  },

  // Title Template para todas las páginas
  title: {
    default: "Creaciones Vane | Anchetas, Desayunos Sorpresa y Decoraciones en Medellín - Entrega el Mismo Día",
    template: "%s | Creaciones Vane" // Usado en páginas secundarias
  },

  // Description optimizada con CTA
  description: "Tu cómplice que endulza momentos especiales en Medellín. Anchetas personalizadas, desayunos sorpresa, ramos de rosas, decoraciones para eventos y refrigerios desde $5.000. Entrega el mismo día en El Poblado, Laureles, Envigado y Sabaneta. ¡Más de 5 años endulzando corazones! WhatsApp 312 823 5654",

  // Keywords estratégicas (solo las TOP)
  keywords: [
    // Brand keywords
    "creaciones vane",
    "creaciones vane medellín",

    // Primary keywords
    "anchetas medellín",
    "desayunos sorpresa medellín",
    "regalos a domicilio medellín",
    "decoración eventos medellín",
    "refrigerios medellín",

    // Location-based
    "anchetas el poblado",
    "desayunos sorpresa laureles",
    "regalos envigado",
    "decoración sabaneta",

    // High-intent
    "anchetas entrega el mismo día medellín",
    "desayunos sorpresa whatsapp medellín",
    "regalos personalizados medellín",
  ],

  // Authors y Creator
  authors: [
    { name: "Creaciones Vane", url: "https://creacionesvane.com" }
  ],
  creator: "Creaciones Vane",
  publisher: "Creaciones Vane",

  // Categoría del sitio
  category: "Shopping",

  // Robots optimizados
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Detección de formato
  formatDetection: {
    email: false,
    address: false,
    telephone: true, // CRÍTICO para negocios locales
  },

  // Open Graph COMPLETO
  openGraph: {
    type: "website",
    locale: "es_CO",
    alternateLocale: ["es_ES", "es"], // Para otros hispanohablantes
    url: "https://creacionesvane.com",
    siteName: "Creaciones Vane",
    title: "Creaciones Vane - Tu Cómplice que Endulza Momentos Especiales en Medellín",
    description: "Anchetas personalizadas, desayunos sorpresa, decoraciones y refrigerios con entrega el mismo día en Medellín. ¡Más de 5 años creando sonrisas!",
    images: [
      {
        url: "/og-image-main.jpg", // PENDIENTE: Crear imagen 1200x630
        width: 1200,
        height: 630,
        alt: "Creaciones Vane - Anchetas y Desayunos Sorpresa en Medellín",
        type: "image/jpeg",
      },
      {
        url: "/logo.png",
        width: 400,
        height: 400,
        alt: "Logo Creaciones Vane",
        type: "image/png",
      }
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@creacionesvane", // PENDIENTE: Crear cuenta Twitter/X
    creator: "@creacionesvane",
    title: "Creaciones Vane - Anchetas y Desayunos Sorpresa en Medellín",
    description: "Tu cómplice que endulza. Entrega el mismo día. WhatsApp 312 823 5654",
    images: ["/og-image-main.jpg"],
  },

  // Manifest PWA
  manifest: "/site.webmanifest",

  // Iconos optimizados (ya los tienes)
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon.svg",
        color: "#e91e63",
      },
    ],
  },

  // App Links (para compartir en redes)
  appLinks: {
    web: {
      url: "https://creacionesvane.com",
      should_fallback: true,
    },
  },

  // Geo tags y otros metadata
  other: {
    // Geo tags para SEO local
    "geo.region": "CO-ANT",
    "geo.placename": "Medellín, Antioquia",
    "geo.position": "6.297486;-75.553924",
    "ICBM": "6.297486, -75.553924",

    // Rating para edad
    "rating": "general",

    // Mobile optimization
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Creaciones Vane",

    // Microsoft
    "msapplication-TileColor": "#e91e63",
    "msapplication-config": "/browserconfig.xml",

    // Theme color
    "theme-color": "#e91e63",

    // Facebook App ID
    // "fb:app_id": "tu-facebook-app-id",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-CO"
      className={`${poppins.variable} ${pacifico.variable}`}
    >
      <head>
        {/* Preconnect a recursos externos CRÍTICOS */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload critical assets */}
        <link
          rel="preload"
          as="image"
          href="/logo.png"
          type="image/png"
        />
      </head>
      <body className={`${poppins.className} antialiased bg-white`}>
        {/* Schema Organization a nivel global */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://creacionesvane.com/#organization",
              "name": "Creaciones Vane",
              "legalName": "Creaciones Vane",
              "url": "https://creacionesvane.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://creacionesvane.com/logo.png",
                "width": 400,
                "height": 400
              },
              "description": "Empresa especializada en anchetas personalizadas, desayunos sorpresa, decoraciones para eventos y refrigerios en Medellín desde 2019",
              "foundingDate": "2019",
              "slogan": "Tu cómplice que endulza",
              "email": "du.rleyc8@gmail.com",
              "telephone": "+57-312-823-5654",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Carrera 50 #120-13",
                "addressLocality": "Medellín",
                "addressRegion": "Antioquia",
                "postalCode": "050001",
                "addressCountry": "CO"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+57-312-823-5654",
                  "contactType": "customer service",
                  "areaServed": ["CO", "CO-ANT"],
                  "availableLanguage": ["Spanish", "es"],
                  "contactOption": "TollFree"
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+57-312-823-5654",
                  "contactType": "sales",
                  "areaServed": "CO-ANT",
                  "availableLanguage": "es"
                }
              ],
              "sameAs": [
                "https://www.instagram.com/complice_que_endulza",
                "https://www.facebook.com/creaciones2927",
                "https://wa.me/573128235654",
                "https://www.tiktok.com/@creacionesvane01"
              ],
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "6.297486",
                  "longitude": "-75.553924"
                },
                "geoRadius": "15000" // 15km de radio
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Productos y Servicios",
                "itemListElement": [
                  {
                    "@type": "OfferCatalog",
                    "name": "Detalles de Amor",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Product",
                          "name": "Anchetas Personalizadas"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Product",
                          "name": "Desayunos Sorpresa"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Product",
                          "name": "Ramos de Rosas"
                        }
                      }
                    ]
                  },
                  {
                    "@type": "OfferCatalog",
                    "name": "Refrigerios",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Product",
                          "name": "Refrigerios para Eventos"
                        }
                      }
                    ]
                  },
                  {
                    "@type": "OfferCatalog",
                    "name": "Decoraciones",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Decoración de Eventos"
                        }
                      }
                    ]
                  }
                ]
              }
            })
          }}
        />

        {/* WebSite Schema con SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://creacionesvane.com/#website",
              "url": "https://creacionesvane.com",
              "name": "Creaciones Vane",
              "alternateName": ["Creaciones Vane Medellín", "Anchetas Vane"],
              "description": "Anchetas personalizadas, desayunos sorpresa, decoraciones y refrigerios en Medellín",
              "publisher": {
                "@id": "https://creacionesvane.com/#organization"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://creacionesvane.com/?s={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              },
              "inLanguage": "es-CO"
            })
          }}
        />

        <ModalProvider>
          {children}
          <ProductModal />
        </ModalProvider>
      </body>
    </html>
  );
}