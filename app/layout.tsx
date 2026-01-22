import type { Metadata } from "next";
import "./globals.css";
import PageTransition from "./components/PageTransition";
import { ModalProvider } from './context/ModalContext';
import ProductModal from './components/ProductModal';

export const metadata: Metadata = {
  metadataBase: new URL("https://creacionesvane.com"), // Cambia por tu dominio real
  title: {
    default: "Creaciones Vane | Anchetas, Desayunos Sorpresa y Decoraciones en Medellin",
    template: "%s | Creaciones Vane"
  },
  description: "Somos tu complice que endulza: Anchetas, desayunos sorpresa, cajas personalizadas, refrigerios y decoraciones para toda ocasión. Hacemos tus momentos inolvidables.",
  keywords: [
    "anchetas", "desayunos sorpresa", "regalos personalizados", "cajas sorpresa",
    "refrigerios empresariales", "decoración de eventos", "detalles de amor", 
    "regalos de cumpleaños", "arreglos florales", "globos personalizados"
  ],
  authors: [{ name: "Creaciones Vane" }],
  creator: "Creaciones Vane",
  publisher: "Creaciones Vane",
  formatDetection: {
    email: false,
    address: false,
    telephone: true, // En regalos es vital que puedan contactarse fácilmente
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://creacionesvane.com",
    siteName: "Creaciones Vane",
    title: "Creaciones Vane - Complice que endulza tus momentos",
    description: "Anchetas, desayunos sorpresa y las mejores decoraciones para tus celebraciones.",
    images: [
      {
        url: "/og-image.jpg", // PENDIENTE: Crear imagen OG personalizada
        width: 1200,
        height: 630,
        alt: "Muestra de productos Creaciones Vane",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creaciones Vane - Detalles que Enamoran",
    description: "Expertos en crear sonrisas con desayunos sorpresa y detalles personalizados.",
    images: ["/og-image.jpg"],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-[Poppins,sans-serif] bg-white">
        <PageTransition>
          <ModalProvider>
            {children}
            {/* Modal global - se renderiza una sola vez */}
            <ProductModal />
          </ModalProvider>
        </PageTransition>
      </body>
    </html>
  );
}