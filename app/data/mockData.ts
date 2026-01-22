// app/data/mockData.ts

export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number; // Ahora es número en COP (pesos colombianos)
  imagen: string;
  categoria: 'Detalles' | 'Refrigerios' | 'Decoraciones';
  destacado: boolean;
  opcionesPersonalizables?: string[]; // 🔥 NUEVO
}

// 🎨 Opciones personalizables por categoría
export const opcionesPersonalizablesPorCategoria = {
  Detalles: [
    'Cambio de colores y cintas',
    'Mensaje personalizado en tarjeta de lujo',
    'Adición de globos o peluches extra',
    'Elección de frutas o snacks preferidos',
    'Selección de flores según preferencia',
    'Empaque especial para regalo'
  ],
  Refrigerios: [
    'Opciones vegetarianas disponibles',
    'Adaptación para dietas especiales',
    'Personalización del empaque con logo',
    'Bebidas alternativas (jugos, té, café)',
    'Cantidad ajustable según evento',
    'Etiquetas con nombres personalizados'
  ],
  Decoraciones: [
    'Adaptación a colores corporativos o temática',
    'Tamaño del montaje según espacio',
    'Inclusión de elementos personalizados',
    'Ajuste de cantidad de globos y flores',
    'Diseño de backdrop personalizado',
    'Iluminación decorativa adicional'
  ]
};


// Configuración de Cloudinary
const CLOUDINARY_BASE = 'https://res.cloudinary.com/dw7zhnbho/image/upload';

// Helper para construir URLs de Cloudinary
const getCldUrl = (filename: string) => {
  return `${CLOUDINARY_BASE}/${filename}.jpg`;
};

export const productosMock: Product[] = [
  // ==================== DETALLES DE AMOR ====================
  {
    id: 'det-ramo-002',
    nombre: 'Majestic Red: Ramo de Rosas Imperial',
    descripcion: 'Impactante ramo de rosas rojas premium seleccionadas, decorado con delicadas mariposas doradas y una corona de cristal que simboliza la elegancia. Un detalle diseñado para cautivar y demostrar un amor profundo. Envuelto en cintas de seda roja, es el regalo perfecto para aniversarios o propuestas inolvidables.',
    precio: 135000,
    imagen: getCldUrl('ramo1_pt_2_gkjfsv'),
    categoria: 'Detalles',
    destacado: false,
  },
  {
    id: 'det-ram-001',
    nombre: 'Ramillete Ternura Cow: Rosas y Peluche',
    descripcion: '¡El regalo más tierno para un feliz cumpleaños! Este exclusivo ramillete combina 24 rosas blancas y negras premium con un adorable peluche de vaquita. Incluye una carta de mensaje personalizado y detalles temáticos. Ideal para quienes buscan un detalle original, divertido y lleno de dulzura que robe una sonrisa al instante.',
    precio: 130000,
    imagen: getCldUrl('ramillete1_ieegys'),
    categoria: 'Detalles',
    destacado: false,
  },
  {
    id: 'det-ram-002',
    nombre: 'Pasión Clásica: Ramillete de 24 Rosas',
    descripcion: 'La elegancia hecha flores. Ramillete de 24 rosas rojas intensas, símbolo universal del amor, con un follaje decorativo fresco y una envoltura sofisticada en contraste blanco y negro. Su diseño minimalista y moderno resalta la belleza natural de cada flor. Perfecto para sorprender en cualquier momento del día.',
    precio: 100000,
    imagen: getCldUrl('ramillete3_ot9lnt'),
    categoria: 'Detalles',
    destacado: true,
  },
  {
    id: 'det-ram-003',
    nombre: 'Sinfonía Rosada: Ramillete Dulce Amor',
    descripcion: 'Un degradado de sentimientos en un solo ramo. Combinación de 36 rosas en tonos rosados, fucsia y blanco, que transmiten gratitud y admiración. Incluye follaje suave, una envoltura delicada en tonos pastel y una tarjeta para tu mensaje personalizado. Es el detalle ideal para celebrar a mamá o un amor joven y vibrante.',
    precio: 140000,
    imagen: getCldUrl('ramillete4_fob1od'),
    categoria: 'Detalles',
    destacado: false,
  },

  {
    id: 'det-ram-004',
    nombre: 'Sol Radiante: Ramillete de Girasol y Esperanza',
    descripcion: 'Ilumina el día de esa persona especial con este vibrante ramillete. Protagonizado por un girasol majestuoso y complementado con flores amarillas silvestres, follaje premium y una envoltura transparente moderna. Es el detalle perfecto para desear éxito, alegría o simplemente decir "estoy pensando en ti". Un regalo lleno de energía positiva.',
    precio: 50000,
    imagen: getCldUrl('ramillete5_x2asdp'),
    categoria: 'Detalles',
    destacado: false,
  },
  {
    id: 'det-ram-005',
    nombre: 'Realeza Rosa: Ramillete Premium con Corona',
    descripcion: 'Haz que se sienta como una reina. Este exclusivo ramillete combina 15 rosas en tonos rosado pastel con flores blancas de ensueño. Incluye una corona dorada brillante, una mariposa decorativa y un mensaje personalizado. Ideal para cumpleaños de abuelas, madres o esa persona que merece un trato real. Elegancia y delicadeza en cada pétalo.',
    precio: 120000,
    imagen: getCldUrl('ramillete6_kqsgtx'),
    categoria: 'Detalles',
    destacado: true,
  },
  {
    id: 'det-ram-006',
    nombre: 'Burbuja de Amor: Ramillete con Globo Personalizado',
    descripcion: 'Un regalo que flota sobre lo ordinario. Incluye 24 rosas premium en tonos suaves, acompañadas de un globo burbuja personalizado con un mensaje de "Te Amo" y un diseño de puntos sutil. Con su envoltura de diseño "Love" y un moño decorativo artesanal, es la máxima expresión de romanticismo para aniversarios o sorpresas inolvidables.',
    precio: 120000,
    imagen: getCldUrl('ramillete7_qrilnq'),
    categoria: 'Detalles',
    destacado: false,
  },
  {
    id: 'det-ram-007',
    nombre: 'Éxito y Dulzura: Ramillete Especial de Graduación',
    descripcion: 'Celebra sus logros con un detalle a su altura. Este ramillete de 10 rosas en tonos fucsia y durazno viene decorado con mariposas vibrantes, follaje dorado y un tierno peluche de oso graduado con birrete. Incluye un listón personalizado para "La Graduada más Linda". El equilibrio perfecto entre orgullo, felicitación y ternura.',
    precio: 140000,
    imagen: getCldUrl('ramillete8_peijyf'),
    categoria: 'Detalles',
    destacado: false,
  },
  {
    id: 'det-ram-008',
    nombre: 'Dulce Compañía: Ramillete Exótico con Peluche',
    descripcion: 'Un detalle que lo tiene todo para enamorar. Combina 5 rosas premium con claveles seleccionados en un diseño compacto y armonioso. Incluye un tierno peluche de vaquita, una mariposa decorativa dorada y un globo festivo que eleva la sorpresa. Perfecto para aniversarios o para alegrar un día cualquiera con un gesto inolvidable.',
    precio: 88000,
    imagen: getCldUrl('ramillete9_wnvws0'),
    categoria: 'Detalles',
    destacado: false,
  },
  {
    id: 'det-ram-009',
    nombre: 'Logro Soñado: Ramillete Mini Graduación',
    descripcion: 'El reconocimiento perfecto para un esfuerzo cumplido. Este ramillete cuenta con 5 rosas rojas vibrantes y claveles blancos, coronado por un tierno oso graduado con birrete. Incluye un elegante listón dorado personalizado con la frase "Para la Graduada más Linda", convirtiéndolo en un tesoro memorable de su gran día.',
    precio: 95000,
    imagen: getCldUrl('ramillete10_nfp8bu'),
    categoria: 'Detalles',
    destacado: false,
  },

  // ==================== DESAYUNOS CON FLORES (16 productos) ====================
  {
    id: 'det-des-001',
    nombre: 'Festín de Gratitud: Arreglo de Frutas y Rosas Premium',
    descripcion: 'La combinación perfecta entre salud, belleza y afecto. Este imponente arreglo incluye 24 rosas rojas y naranjas de exportación, acompañadas de 6 variedades de frutas frescas seleccionadas (piña, manzanas, fresas y más). Incluye un mensaje personalizado y un oso de peluche ultra suave. Es el regalo ideal para dar las gracias o celebrar una recuperación con estilo.',
    precio: 160000,
    imagen: getCldUrl('desayunoflorez1_t5v6wb'),
    categoria: 'Detalles',
    destacado: true,
  },
  {
    id: 'det-des-002',
    nombre: 'Dulce Despertar: Ramo de Frutas y Rosas',
    descripcion: '¿Por qué elegir uno si puedes darle todo? Este imponente arreglo combina la pasión de 10 rosas rojas con la frescura de 13 variedades de frutas seleccionadas. Acompañado de un adorable patito de peluche con gafas y mensaje personalizado, es el detalle ideal para decir "recupérate pronto" o "feliz cumpleaños" con un toque de ternura y salud.',
    precio: 160000,
    imagen: getCldUrl('desayunoflorez2_ibbt78'),
    categoria: 'Detalles',
    destacado: false,
  },
  {
    id: 'det-des-003',
    nombre: 'Celebración Real: Rosas, Baileys & Hershey\'s',
    descripcion: 'Para los que brindan por la vida y el amor. Un exclusivo diseño en caja cilíndrica que incluye 17 rosas premium, una botella de Baileys para un brindis inolvidable, una chocolatina Hershey\'s y un tierno oso Lotso de peluche. Coronado con un globo de corazón metalizado, es la definición de un "Feliz Día" con clase y mucho sabor.',
    precio: 175000,
    imagen: getCldUrl('desayunoflorez3_scaqwc'),
    categoria: 'Detalles',
    destacado: false,
  },
  {
    id: 'det-des-004',
    nombre: 'Reina de la Casa: Ramo Gourmet Primaveral',
    descripcion: 'Ella se merece el mundo, comienza dándole la mañana más hermosa. Este ramo primaveral es un festival de color con rosas rojas, frutas tropicales (piña, manzana, papaya) y una selección de snacks premium como Ferrero Rocher, M&M y barquillos. Incluye un globo con mensaje "Para la Reina de la Casa" que hará latir su corazón con fuerza.',
    precio: 170000,
    imagen: getCldUrl('desayunoflorez4_qgawll'),
    categoria: 'Detalles',
    destacado: false,
  },
  {
    id: 'det-des-005',
    nombre: 'Elegancia: Ramo Hermoso Floral',
    descripcion: 'La sofisticación hecha detalle. Cajas de madera artesanal que equilibran la sobriedad del follaje verde con el romance de las rosas rojas. Incluye frutas frescas y snacks de barquillos Piazza, ideal para un gesto corporativo elegante o para sorprender a esa persona con gustos refinados que valora la armonía y la naturaleza.',
    precio: 120000,
    imagen: getCldUrl('desayunoflorez5_yrgpt6'),
    categoria: 'Detalles',
    destacado: false,
  },
  {
    id: 'det-des-006',
    nombre: 'Amor Infinito: Explosión Tropical y Stitch',
    descripcion: 'Un detalle tan vibrante como tu amor. Este arreglo tropical es una obra de arte con rosas en degradé fucsia y lila, flores de relleno blancas y un toque de champaña JP. Chenet para celebrar. Lo acompaña un tierno peluche de Stitch y un imponente globo burbuja personalizado con la frase "Te Amo". Diseñado para quienes no temen expresar sus sentimientos en grande.',
    precio: 190000,
    imagen: getCldUrl('desayunoflorez6_ow4bmm'),
    categoria: 'Detalles',
    destacado: false,
  },
  {
    id: 'det-des-007',
    nombre: 'Amanecer Dorado: Arreglo de Girasoles y Baileys',
    descripcion: 'Para los que iluminan tu vida como el sol. Este imponente arreglo cuenta con 12 girasoles radiantes, símbolos de lealtad y alegría, acompañados de una botella de Baileys para un brindis dulce. Incluye una selección premium de chocolates (MontBlanc, Ferrero Rocher, Jet), globos metalizados y mariposas doradas. Un regalo diseñado para dejar una huella imborrable en aniversarios o fechas memorables.',
    precio: 190000,
    imagen: getCldUrl('desayunoflorez7_spd5cb'),
    categoria: 'Detalles',
    destacado: false,
  },
  {
    id: 'det-des-008',
    nombre: 'Jardín de Amoroso: Girasoles, Rosas y Globos',
    descripcion: 'La combinación perfecta entre la fuerza del girasol y la delicadeza de la rosa roja. Este exuberante arreglo floral se eleva con tres globos premium: un globo burbuja personalizado y dos globos de "Feliz Cumpleaños" y "Te Amo". Acompañado de frutas frescas y un follaje verde vibrante, es el mensajero ideal para expresar los sentimientos más profundos en una gran celebración.',
    precio: 105000,
    imagen: getCldUrl('desayunoflorez8_hdd08q'),
    categoria: 'Detalles',
    destacado: false,
  },
  {
    id: 'det-des-009',
    nombre: 'Abrazo de Rosas: Arreglo Amor con Peluche y Chocolates',
    descripcion: 'Más que un ramo, es una experiencia de ternura. Un diseño vertical único donde rosas rojas de tallo largo rodean un suave oso de peluche que sostiene una elegante caja de chocolates Ferrero Rocher en forma de corazón. Adornado con follaje tipo helecho y flores de relleno blancas, es el detalle "destronador" para conquistar o reafirmar un amor puro.',
    precio: 118000,
    imagen: getCldUrl('desayunoflorez9_falawe'),
    categoria: 'Detalles',
    destacado: false,
  },
  {
    id: 'det-des-016',
    nombre: 'Jardín de Gala: Explosión de Girasoles',
    descripcion: 'Para cuando las palabras no bastan y quieres regalar el mundo entero. Este imponente arreglo Deluxe combina la energía de los girasoles con la pasión de las frutas frescas premium en una base artesanal. Decorado con frutas frescas seleccionadas, una tarjeta personalizada y un espectacular globo de "Feliz Cumpleaños", es una obra de arte floral que llenará cualquier espacio de luz, color y gratitud.',
    precio: 175000,
    imagen: getCldUrl('desayunoflorez16_d2qo30'),
    categoria: 'Detalles',
    destacado: false,
  },

  // ==================== ANCHETAS DE AMOR (12 productos) ====================
  {
    id: 'det-anc-001',
    nombre: 'Explosión de Ternura: Edición Capibara Infantil',
    descripcion: 'Celebra la dulzura con nuestro desayuno infantil temática de Capibara. Esta ancheta única incluye un peluche ultra suave, deliciosos snacks seleccionados, bebidas refrescantes y un imponente globo burbuja personalizado. Decorada con mariposas doradas y un arco orgánico de globos, es el regalo perfecto para derretir el corazón de esa persona especial en su cumpleaños.',
    precio: 150000,
    imagen: getCldUrl('ancheta1_njae6z'),
    categoria: 'Detalles',
    destacado: false,
  },
  {
    id: 'det-anc-002',
    nombre: 'Mundo Rosa: Especial Hello Kitty',
    descripcion: 'Haz realidad el sueño de cualquier fan con esta espectacular ancheta de Hello Kitty. Incluye un peluche original, variedad de dulces, jugos y un diseño de globos en tonos fucsia y blanco que roban miradas. Ideal para niñas y coleccionistas que aman el detalle y la delicadeza. ¡Un regalo que se convierte en un recuerdo inolvidable!',
    precio: 150000,
    imagen: getCldUrl('ancheta2_i7wvef'),
    categoria: 'Detalles',
    destacado: true,
  },
  {
    id: 'det-anc-003',
    nombre: 'Aventura Tropical: Moana Edition',
    descripcion: '¡Lleva la magia del océano a su celebración! Nuestra ancheta de Moana destaca por su impresionante arco circular de globos azul cielo con mariposas monarca. Incluye una selección premium de snacks, postres decorados y un globo de cristal con mensaje personalizado. Perfecta para quienes buscan un detalle temático impactante y lleno de color.',
    precio: 140000,
    imagen: getCldUrl('ancheta3_gdta3g'),
    categoria: 'Detalles',
    destacado: false,
  },
  {
    id: 'det-anc-004',
    nombre: 'Noche Mágica: Kuromi Style',
    descripcion: 'Para las personalidades con más estilo, llega nuestra ancheta de Kuromi. Con una estética rebelde en tonos morados y negros, este detalle incluye un peluche de alta calidad, dulces importados y un globo metalizado gigante del número de tu elección. Es la combinación perfecta entre lo tierno y lo cool para un cumpleaños inolvidable.',
    precio: 160000,
    imagen: getCldUrl('ancheta4_m4yrqu'),
    categoria: 'Detalles',
    destacado: true,
  },
  {
    id: 'det-anc-005',
    nombre: 'Ohana: Especial Lilo & Stitch',
    descripcion: 'Porque la familia nunca se olvida, regala esta vibrante ancheta inspirada en el mundo de Lilo & Stitch. Colores tropicales, globos decorados a mano con arte de tablas de surf y una selección de golosinas que encantará a chicos y grandes. Un detalle lleno de alegría y frescura tropical que celebra la unión y el amor.',
    precio: 150000,
    imagen: getCldUrl('ancheta5_pqt7ls'),
    categoria: 'Detalles',
    destacado: true,
  },
  {
    id: 'det-anc-006',
    nombre: 'Amanecer Galáctico con Stitch',
    descripcion: '¡Haz que su mañana sea de otro planeta! Este desayuno temático de Stitch es pura alegría azul. Incluye un tierno peluche original, globos metalizados con destellos estelares y una deliciosa combinación de snacks y bebidas frescas. Es el detalle ideal para fans de Lilo & Stitch que buscan una sorpresa llena de color y ternura desde temprano.',
    precio: 135000,
    imagen: getCldUrl('ancheta6_kebhuz'),
    categoria: 'Detalles',
    destacado: false, // Lo marqué como true por el impacto visual del peluche y globos
  },
  {
    id: 'det-anc-007',
    nombre: 'Mi Primera Gran Sorpresa: Pocoyó',
    descripcion: 'Diseñado para los más pequeñitos de la casa. Este desayuno infantil de Pocoyó transforma el despertar en una fiesta. Viene cargado de colores primarios, globos juguetones y una selección de alimentos nutritivos y deliciosos que les encantarán. Personalizado con el nombre del cumpleañero para que se sienta el verdadero protagonista de su día.',
    precio: 55000,
    imagen: getCldUrl('ancheta7_z0aa3b'),
    categoria: 'Detalles',
    destacado: false,
  },
  {
    id: 'det-anc-008',
    nombre: 'Despertar Natural: Girasoles & Fruta',
    descripcion: 'La elegancia de la naturaleza en su mesa. Este desayuno premium combina la energía de los girasoles y la pasión de las rosas rojas con una selección de frutas frescas de temporada, yogurt y panadería artesanal. Un detalle sofisticado y saludable, coronado con un globo personalizado que lleva bendiciones y amor en cada palabra.',
    precio: 100000,
    imagen: getCldUrl('ancheta8_t3ftdl'),
    categoria: 'Detalles',
    destacado: false,
  },
  {
    id: 'det-anc-009',
    nombre: 'Banquete Romántico: Edition Deluxe',
    descripcion: 'Para el amor de tu vida, solo lo mejor. Este es nuestro desayuno más completo y apasionado: un espectacular bouquet de rosas rojas frescas, chocolates Ferrero Rocher, frutas seleccionadas y waffles con Nutella. Acompañado de globos en tonos rose gold (oro rosa) y rojo, es la declaración de amor perfecta para aniversarios o mañanas inolvidables.',
    precio: 145000,
    imagen: getCldUrl('ancheta9_kizbr5'),
    categoria: 'Detalles',
    destacado: false, // Por la cantidad de elementos y las rosas, suele ser el favorito para parejas
  },
  {
    id: 'det-anc-010',
    nombre: 'Desayuno "Te Adoro" con Rosas & Pasión',
    descripcion: 'Diseñado para quienes no temen decir lo que sienten. Este imponente desayuno incluye un bouquet de rosas rojas frescas, chocolates Ferrero Rocher y un globo metalizado de gran formato con la frase "Te Adoro". Personalizado con un mensaje que llega al alma y detalles en rojo vibrante, es la sorpresa definitiva para reconquistar o celebrar un amor intenso.',
    precio: 190000,
    imagen: getCldUrl('ancheta10_vs00xg'),
    categoria: 'Detalles',
    destacado: false, // Por su alto impacto emocional y elegancia
  },
  {
    id: 'det-anc-011',
    nombre: 'Amanecer de Reina: Rose Gold & Corona',
    descripcion: 'Haz que se sienta como la realeza desde el primer minuto del día. Este desayuno destaca por su sofisticación en tonos rosa y oro rosa, incluyendo una corona decorativa, globo de burbuja y una selección gourmet de yogurt, frutas y repostería fina. Es el regalo ideal para una mujer que merece ser consentida con elegancia y distinción en su cumpleaños.',
    precio: 145000,
    imagen: getCldUrl('ancheta11_wcr0ih'),
    categoria: 'Detalles',
    destacado: true,
  },
  {
    id: 'det-anc-012',
    nombre: 'Tributo de Amor: Especial para Mamá',
    descripcion: 'Porque no hay amor como el de ella. Este desayuno es una caricia al corazón, decorado con rosas delicadas, globos dorados y una carta de agradecimiento que le recordará lo especial que es. Incluye delicias artesanales, jugos naturales y una presentación impecable en madera. El detalle perfecto para decirle "Gracias, Mamá" de la manera más dulce y elegante.',
    precio: 140000,
    imagen: getCldUrl('ancheta12_ljru12'),
    categoria: 'Detalles',
    destacado: false,
  },

  // ==================== REFRIGERIOS (9 productos) ====================
  {
    id: 'ref-001',
    nombre: 'Refrigerio Chispas de queso',
    descripcion: 'Sanduche de jamón, queso, lechuga y salsas de la casa. El refrierio clásico que encanta los momentos más especiales, ideal para eventos familiares infantiles.',
    precio: 6000,
    imagen: getCldUrl('refrigerio10_jvg3nv'),
    categoria: 'Refrigerios',
    destacado: true,
  },
  {
    id: 'ref-002',
    nombre: 'Refrigerio Chispas de queso',
    descripcion: 'Sanduche de jamón, queso, lechuga y salsas de la casa. El refrierio clásico que nunca falla en los momentos inolvidables.',
    precio: 7000,
    imagen: getCldUrl('refrigerio2_d5sdy7'),
    categoria: 'Refrigerios',
    destacado: false,
  },
  {
    id: 'ref-003',
    nombre: 'Refrigerio Vitalidad: Fruta & Néctar Natural',
    descripcion: 'Una opción refrescante que incluye una porción generosa de frutas tropicales picadas (mango y sandía), acompañada de un néctar de fruta artesanal en botella de cristal y un sándwich clásico de jamón y queso. Es el equilibrio perfecto entre frescura y sabor; ese toque secreto que mantendrá la energía de tus invitados al máximo y demostrará tu atención a cada detalle del evento.',
    precio: 13000,
    imagen: getCldUrl('refrigerio3_xsohqv'),
    categoria: 'Refrigerios',
    destacado: false,
  },
  {
    id: 'ref-004',
    nombre: 'Eventos de Oro: Sándwich & Fruta',
    descripcion: 'Nuestra solución estrella para eventos masivos. Contiene un sándwich gourmet con lechuga fresca, una combinación de frutas de temporada perfectamente seleccionadas y una bebida frutal refrescante con tapa de seguridad. Presentado de forma impecable en empaques individuales, este refrigerio garantiza que cada asistente reciba una experiencia deliciosa y profesional, convirtiendo una pausa simple en el momento favorito de la jornada.',
    precio: 13000,
    imagen: getCldUrl('refrigerio4_yzgtsl'),
    categoria: 'Refrigerios',
    destacado: false,
  },
  {
    id: 'ref-005',
    nombre: 'Lunch Corporativo: Tradición & Calidad',
    descripcion: 'Caja individual de alta resistencia que protege un sándwich de receta artesanal, una fruta entera seleccionada por su madurez ideal y un acompañamiento sorpresa. Diseñado específicamente para reuniones de negocios o conferencias donde la practicidad no debe sacrificar el sabor. Al elegir este lunch, aseguras un estándar de calidad que hablará muy bien de tu organización y dejará un excelente sabor de boca en todos los presentes.',
    precio: 15000,
    imagen: getCldUrl('refrigerio5_c6yvyh'),
    categoria: 'Refrigerios',
    destacado: false,
  },
  {
    id: 'ref-006',
    nombre: 'Croissant edición especial: Delicia & Frescura',
    descripcion: 'Una presentación que enamora a primera vista. Incluye un croissant artesanal premium relleno de jamón y queso madurado, acompañado de una refrescante botella de jugo 100% natural y una porción de fruta seleccionada. El detalle de la servilleta decorativa y el cubierto de madera biodegradable no solo es eco-amigable, sino que es el toque de distinción que hará que tus invitados se sientan verdaderamente valorados.',
    precio: 15000,
    imagen: getCldUrl('refrigerio6_eeheq4'),
    categoria: 'Refrigerios',
    destacado: false,
  },
  {
    id: 'ref-007',
    nombre: 'Sándwich Express "Spider-Man"',
    descripcion: 'Diseñado para los pequeños grandes fans. Este refrigerio infantil consta de un sándwich nutritivo envuelto en papel grado alimentario con temática del Hombre Araña y sellado con un sticker personalizado del personaje. Es la solución perfecta para fiestas escolares o eventos infantiles donde la higiene y la temática son la clave del éxito; un detalle que garantiza sonrisas y orden en tu celebración.',
    precio: 5000,
    imagen: getCldUrl('refrigerio7_wpif0j'),
    categoria: 'Refrigerios',
    destacado: false,
  },
  {
    id: 'ref-008',
    nombre: 'Máxima Eficiencia Corporativa',
    descripcion: 'Nuestra solución para eventos de alto volumen sin sacrificar la frescura. Este pack destaca por su logística impecable: sándwiches perfectamente sellados, botellas de néctar con tapa de seguridad y postres individuales. La uniformidad en la entrega y el empaque reforzado aseguran que, desde el primer hasta el último invitado, todos disfruten de un producto fresco, seguro y con un sabor casero inigualable.',
    precio: 10000,
    imagen: getCldUrl('refrigerio8_wbywhj'),
    categoria: 'Refrigerios',
    destacado: true,
  },
  {
    id: 'ref-009',
    nombre: 'Lunch Picnic Tradicional',
    descripcion: 'La combinación clásica que nunca falla, presentada con un estilo rústico encantador. Este box incluye un sándwich envuelto en papel a cuadros rojo (estilo picnic), una ensalada de frutas frescas con kiwi y mango, y un dulce artesanal de cortesía. Ideal para integraciones al aire libre o jornadas de trabajo dinámicas. Es el toque secreto que transforma un almuerzo rápido en una experiencia reconfortante y deliciosa.',
    precio: 12000,
    imagen: getCldUrl('refrigerio9_axxbk5'),
    categoria: 'Refrigerios',
    destacado: false,
  },

  // ==================== DECORACIONES ====================
  // Por ahora sin imágenes, se agregarán después
  {
    id: 'dec-001',
    nombre: 'Decoración Cumpleaños Infantil',
    descripcion: 'Temática personalizada con globos, centros de mesa y piñata',
    precio: 500000,
    imagen: getCldUrl('decoracion1_rp0efz'), // Sin imagen aún
    categoria: 'Decoraciones',
    destacado: true,
  },
  {
    id: 'dec-002',
    nombre: 'Decoración Princesas Disney',
    descripcion: 'Mágica decoración inspirada en princesas favoritas',
    precio: 300000,
    imagen: getCldUrl('decoracion2_g4lqtm'),
    categoria: 'Decoraciones',
    destacado: true,
  },
  {
    id: 'dec-003',
    nombre: 'Decoración Baby Shower',
    descripcion: 'Decoración completa con globos, mesa dulce y backdrop',
    precio: 650000,
    imagen: getCldUrl('decoracion3_saclrf'),
    categoria: 'Decoraciones',
    destacado: true,
  },
  {
    id: 'dec-004',
    nombre: 'Decoración Boda Elegante',
    descripcion: 'Decoración sofisticada para ceremonia y recepción',
    precio: 480000,
    imagen: getCldUrl('decoracion4_vbr48z'),
    categoria: 'Decoraciones',
    destacado: true,
  },
  {
    id: 'dec-005',
    nombre: 'Decoración Quinceañera',
    descripcion: 'Elegante y sofisticada para la celebración de 15 años',
    precio: 320000,
    imagen: getCldUrl('decoracion5_pkxkrg'),
    categoria: 'Decoraciones',
    destacado: false,
  },
  {
    id: 'dec-006',
    nombre: 'Decoración Quinceañera',
    descripcion: 'Elegante y sofisticada para la celebración de 15 años',
    precio: 400000,
    imagen: getCldUrl('decoracion6_h89sqb'),
    categoria: 'Decoraciones',
    destacado: false,
  },
  {
    id: 'dec-007',
    nombre: 'Decoración Quinceañera',
    descripcion: 'Elegante y sofisticada para la celebración de 15 años',
    precio: 310000,
    imagen: getCldUrl('decoracion7_wkggsl'),
    categoria: 'Decoraciones',
    destacado: false,
  },
];

export const categorias = [
  {
    id: 'detalles',
    nombre: 'Creaciones Vane',
    subtitulo: 'Cómplice que endulza',
    descripcion: 'Detalles de amor que alegran el corazón',
    icono: '/images/corazon.svg',
    ruta: '/creaciones-vane',
  },
  {
    id: 'refrigerios',
    nombre: 'Refrigerios Vane',
    subtitulo: 'Sabor en cada evento',
    descripcion: 'Refrigerios para fiestas, eventos y reuniones',
    icono: '/images/refrigerio.svg',
    ruta: '/refrigerios',
  },
  {
    id: 'decoraciones',
    nombre: 'Decoraciones Vane',
    subtitulo: 'Espacios que inspiran',
    descripcion: 'Decoración profesional para toda ocasión',
    icono: '/images/decoracion.svg',
    ruta: '/decoraciones',
  },
];