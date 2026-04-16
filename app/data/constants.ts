// app/data/constants.ts
// Constantes extraídas de mockData.ts para desacoplar de los datos mock.

// 🎨 Opciones personalizables por categoría
export const opcionesPersonalizablesPorCategoria = {
  Detalles: [
    'Cambio de colores y cintas',
    'Mensaje personalizado en tarjeta de lujo',
    'Adición de globos o peluches extra',
    'Elección de frutas o snacks preferidos',
    'Selección de flores según preferencia',
    'Selección para los colores de las flores',
    'Empaque especial para regalo',
  ],
  Refrigerios: [
    'Opciones vegetarianas disponibles',
    'Adaptación para dietas especiales',
    'Personalización del empaque con logo',
    'Bebidas alternativas (jugos, té, café)',
    'Cantidad ajustable según evento',
    'Transporte hasta el lugar del evento',
  ],
  Decoraciones: [
    'Adaptación a colores corporativos o temática',
    'Tamaño del montaje según espacio',
    'Inclusión de elementos personalizados',
    'Ajuste de cantidad de globos y flores',
    'Diseño de backing personalizado',
    'Iluminación decorativa adicional',
    'Transporte y montaje en sitio',
  ]
};

// Configuración de Cloudinary para video
const CLOUDINARY_BASE_VIDEO = 'https://res.cloudinary.com/dw7zhnbho/video/upload';

export const getCldVideoUrl = (filename: string) => {
  return `${CLOUDINARY_BASE_VIDEO}/f_auto,q_auto,vc_auto/${filename}.mp4`;
};
