// app/lib/sanity.queries.ts
import { groq } from 'next-sanity';

// Fragmento reutilizable para los campos de producto
const productFields = `
  _id,
  nombre,
  slug,
  descripcion,
  precio,
  cloudinaryPublicId,
  imagen {
    secure_url,
    public_id
  },
  destacado,
  legacyId,
  categoria->{nombre, valor, slug, ruta}
`;

// Todos los productos, ordenados por nombre ascendente
export const ALL_PRODUCTS_QUERY = groq`
  *[_type == "product"] | order(nombre asc) {
    ${productFields}
  }
`;

// Solo productos destacados
export const FEATURED_PRODUCTS_QUERY = groq`
  *[_type == "product" && destacado == true] | order(nombre asc) {
    ${productFields}
  }
`;

// Productos filtrados por categoría (recibe parámetro $valor)
export const PRODUCTS_BY_CATEGORY_QUERY = groq`
  *[_type == "product" && categoria->valor == $valor] | order(nombre asc) {
    ${productFields}
  }
`;

// Un producto por slug
export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    ${productFields}
  }
`;

// Un producto por legacyId
export const PRODUCT_BY_LEGACY_ID_QUERY = groq`
  *[_type == "product" && legacyId == $id][0] {
    ${productFields}
  }
`;

// Todas las categorías ordenadas por nombre
export const ALL_CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(nombre asc) {
    _id,
    nombre,
    valor,
    slug,
    subtitulo,
    descripcion,
    icono,
    ruta
  }
`;

// Solo slugs de productos — para generateStaticParams (ligero)
export const ALL_PRODUCTS_SLUGS_QUERY = groq`
  *[_type == "product" && defined(slug.current)] {
    "slug": slug.current
  }
`;
