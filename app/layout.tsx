import type { Metadata } from 'next';
import { Poppins, Pacifico } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import { ModalProvider } from './context/ModalContext';
import ProductModal from './components/ProductModal';
import WhatsAppTracker from './components/WhatsAppTracker';
import { BUSINESS } from './lib/business';
import { organizationSchema, websiteSchema } from './lib/seo';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
});

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pacifico',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),

  verification: {
    google: 'XTvk3yuFvCppM_D7PfCLFrTk_3p4VnI93O6GKY7CxVs',
  },

  title: {
    default: 'Creaciones Vane | Anchetas, Desayunos Sorpresa y Decoración en Medellín',
    template: '%s | Creaciones Vane',
  },

  description:
    'Anchetas, desayunos sorpresa y decoración a domicilio en Medellín. Entrega el mismo día en El Poblado, Envigado y Sabaneta. Pide por WhatsApp 312 8235654.',

  keywords: [
    'creaciones vane',
    'creaciones vane medellín',
    'anchetas medellín',
    'desayunos sorpresa medellín',
    'regalos a domicilio medellín',
    'decoración eventos medellín',
    'refrigerios medellín',
    'anchetas el poblado',
    'desayunos sorpresa laureles',
    'regalos envigado',
    'decoración sabaneta',
    'anchetas entrega el mismo día medellín',
    'desayunos sorpresa whatsapp medellín',
    'regalos personalizados medellín',
  ],

  authors: [{ name: BUSINESS.name, url: BUSINESS.url }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  category: 'Shopping',

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

  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },

  openGraph: {
    type: 'website',
    locale: 'es_CO',
    alternateLocale: ['es_ES', 'es'],
    url: BUSINESS.url,
    siteName: BUSINESS.name,
    title: 'Creaciones Vane — Anchetas, Desayunos Sorpresa y Decoración en Medellín',
    description:
      'Anchetas personalizadas, desayunos sorpresa, decoración y refrigerios con entrega el mismo día en Medellín, Envigado y Sabaneta.',
    images: [
      {
        url: `${BUSINESS.url}/og-image-main.jpg`,
        width: 1200,
        height: 630,
        alt: 'Creaciones Vane — Anchetas y Desayunos Sorpresa en Medellín',
        type: 'image/jpeg',
      },
      {
        url: BUSINESS.logo,
        width: 400,
        height: 400,
        alt: 'Logo Creaciones Vane — Regalos a domicilio en Medellín',
        type: 'image/png',
      },
    ],
  },

  /*
    Twitter Card sin handles porque la cuenta @creacionesvane no existe.
    El "summary_large_image" igual se renderiza al compartir en X y otros
    lectores que usan twitter:card como fallback (LinkedIn, Discord, Slack).
  */
  twitter: {
    card: 'summary_large_image',
    title: 'Creaciones Vane — Anchetas y Desayunos Sorpresa en Medellín',
    description: `Cómplice que endulza. Entrega el mismo día en Medellín. WhatsApp ${BUSINESS.phoneDisplay}.`,
    images: [`${BUSINESS.url}/banner-detalles.webp`],
  },

  manifest: '/site.webmanifest',

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'mask-icon', url: '/favicon.svg', color: '#e91e63' }],
  },

  appLinks: {
    web: { url: BUSINESS.url, should_fallback: true },
  },

  other: {
    'geo.region': 'CO-ANT',
    'geo.placename': 'Medellín, Antioquia, Colombia',
    'geo.position': `${BUSINESS.geo.latitude};${BUSINESS.geo.longitude}`,
    ICBM: `${BUSINESS.geo.latitude}, ${BUSINESS.geo.longitude}`,
    'DC.title': 'Creaciones Vane — Regalos y Desayunos Sorpresa en Medellín',
    'DC.coverage':
      'Medellín, Envigado, Itagüí, Bello, Sabaneta, Valle de Aburrá, Antioquia, Colombia',
    rating: 'general',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': BUSINESS.name,
    'msapplication-TileColor': '#e91e63',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#e91e63',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO" className={`${poppins.variable} ${pacifico.variable}`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preload" as="image" href="/logo.png" type="image/png" />
      </head>
      <body className={`${poppins.className} antialiased bg-white`}>
        {/*
          Schemas canónicos del sitio. Organization+LocalBusiness se declara UNA SOLA VEZ aquí
          para evitar duplicación entre páginas. Las subpáginas declaran schemas específicos
          (Service, FoodEstablishment, BreadcrumbList, FAQPage) que referencian este nodo
          via @id, sin repetir campos NAP.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />

        <ModalProvider>
          {children}
          <ProductModal />
        </ModalProvider>

        {/*
          Listener delegado que captura clicks en cualquier <a href="https://wa.me/...">
          del sitio y dispara el evento `generate_lead` a GA4. Esto evita tener que
          refactorizar manualmente cada botón de WhatsApp (Header, Hero, CTASection,
          ProductDetail, Footer, etc.) — captura tanto los existentes como los que
          se añadan en el futuro.
        */}
        <WhatsAppTracker />

        {process.env.NEXT_PUBLIC_GA4_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_ID} />
        )}
      </body>
    </html>
  );
}
