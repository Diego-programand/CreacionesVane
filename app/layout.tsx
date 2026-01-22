import type { Metadata } from "next";
import "./globals.css";
import PageTransition from "./components/PageTransition";
import { ModalProvider } from './context/ModalContext';
import ProductModal from './components/ProductModal';

export const metadata: Metadata = {
  title: "Creaciones Vane - Detalles que enamoran",
  description: "Anchetas, desayunos sorpresa, refrigerios y decoraciones para eventos en Medellín. Endulza momentos especiales desde 2019.",
  keywords: ["anchetas", "desayunos sorpresa", "refrigerios", "decoraciones", "eventos", "Medellin"],
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