// app/lib/sanity.types.ts

/**
 * Tipos y utilidades para la integración con Sanity CMS.
 * El tipo `Product` normalizado es compatible con los componentes existentes
 * que antes usaban `Product` de mockData.ts.
 */

// Categoría tal como viene de Sanity
export interface SanityCategory {
  _id: string;
  nombre: string;
  valor: 'Detalles' | 'Refrigerios' | 'Decoraciones';
  slug: { current: string };
  subtitulo?: string;
  descripcion?: string;
  icono?: string;
  ruta?: string;
}

// Producto tal como viene de Sanity (con categoría dereferenciada)
export interface SanityProduct {
  _id: string;
  nombre: string;
  slug: { current: string };
  descripcion: string;
  precio: number;
  cloudinaryPublicId: string;
  destacado: boolean;
  legacyId?: string;
  categoria: SanityCategory;
}

// Tipo normalizado compatible con los componentes existentes del frontend.
// Replica la interfaz Product original de mockData.ts.
export interface Product {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: 'Detalles' | 'Refrigerios' | 'Decoraciones';
  destacado: boolean;
}

/**
 * Convierte un SanityProduct en el tipo Product normalizado.
 * Construye la URL de Cloudinary a partir del `cloudinaryPublicId`.
 */
export function toProduct(p: SanityProduct): Product {
  return {
    id: p.legacyId ?? p._id,
    slug: p.slug.current,
    nombre: p.nombre,
    descripcion: p.descripcion,
    precio: p.precio,
    imagen: `https://res.cloudinary.com/dw7zhnbho/image/upload/${p.cloudinaryPublicId}.jpg`,
    categoria: p.categoria.valor,
    destacado: p.destacado,
  };
}
