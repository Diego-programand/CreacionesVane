import { config } from 'dotenv'
config({ path: '.env' })
import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'nh1i4g00',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_MIGRATION_TOKEN,
    useCdn: false,
})

// ============================================================
// DATOS DEL MOCKDATA (copiados directamente)
// ============================================================

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dw7zhnbho/image/upload'

const getCldUrl = (filename: string) => `${CLOUDINARY_BASE}/${filename}.jpg`

type CategoriaValor = 'Detalles' | 'Refrigerios' | 'Decoraciones'

interface ProductoMock {
    id: string
    nombre: string
    descripcion: string
    precio: number
    imagen: string
    categoria: CategoriaValor
    destacado: boolean
}

const categoriasData = [
    {
        _id: 'category-detalles',
        _type: 'category',
        nombre: 'Creaciones Vane',
        valor: 'Detalles',
        slug: { _type: 'slug', current: 'creaciones-vane' },
        subtitulo: 'Cómplice que endulza',
        descripcion: 'Detalles de amor que alegran el corazón',
        icono: '/images/corazon.svg',
        ruta: '/creaciones-vane',
    },
    {
        _id: 'category-refrigerios',
        _type: 'category',
        nombre: 'Refrigerios Vane',
        valor: 'Refrigerios',
        slug: { _type: 'slug', current: 'refrigerios-vane' },
        subtitulo: 'Sabor en cada evento',
        descripcion: 'Refrigerios para fiestas, eventos y reuniones',
        icono: '/images/refrigerio.svg',
        ruta: '/refrigerios',
    },
    {
        _id: 'category-decoraciones',
        _type: 'category',
        nombre: 'Decoraciones Vane',
        valor: 'Decoraciones',
        slug: { _type: 'slug', current: 'decoraciones-vane' },
        subtitulo: 'Espacios que inspiran',
        descripcion: 'Decoración profesional para toda ocasión',
        icono: '/images/decoracion.svg',
        ruta: '/decoraciones',
    },
]

// Map para resolver referencias por valor de categoría
const categoryRefMap: Record<CategoriaValor, string> = {
    Detalles: 'category-detalles',
    Refrigerios: 'category-refrigerios',
    Decoraciones: 'category-decoraciones',
}

// Extrae el public_id de una URL de Cloudinary
// Ej: https://res.cloudinary.com/dw7zhnbho/image/upload/ancheta1_sya5pl.jpg → ancheta1_sya5pl
const extractPublicId = (url: string): string => {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/)
    return match ? match[1] : url
}

const slugify = (text: string): string =>
    text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .substring(0, 96)

const productosMock: ProductoMock[] = [
    { id: 'det-anc-001', nombre: 'Celebración Radiante: Magia en Rosa', descripcion: 'Un detalle vibrante diseñado para cautivar corazones en Medellín y sus alrededores.', precio: 115000, imagen: getCldUrl('ancheta1_sya5pl'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-002', nombre: 'Elegancia Dorada: Homenaje a Mamá', descripcion: 'Una sofisticada combinación de sabores y texturas diseñada para celebrar a lo grande.', precio: 145000, imagen: getCldUrl('ancheta2_hqnqxq'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-003', nombre: 'Dulce Amanecer: Encanto y Rosas', descripcion: 'Un detalle delicado y lleno de luz para sorprender en la capital antioqueña.', precio: 100000, imagen: getCldUrl('ancheta3_rwkhrt'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-004', nombre: 'Festín de Colores: Desayuno VIP', descripcion: 'Una explosión de alegría y sabor para celebrar fechas especiales en el Valle de Aburrá.', precio: 150000, imagen: getCldUrl('ancheta4_i77aiq'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-005', nombre: 'Noche de Gala: Peluche y Sorpresas', descripcion: 'Un detalle imponente y sofisticado para quienes buscan impacto en el Valle de Aburrá.', precio: 170000, imagen: getCldUrl('ancheta5_antutb'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-006', nombre: 'Jardín de Sabores: Bouquet Premium', descripcion: 'Una experiencia sensorial de lujo para celebrar momentos únicos en Medellín.', precio: 180000, imagen: getCldUrl('ancheta6_i28kzj'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-007', nombre: 'Azul Infinito: Sorpresa Caballero', descripcion: 'Un detalle con estilo y distinción para celebrar a los hombres más especiales.', precio: 145000, imagen: getCldUrl('ancheta7_sly8nj'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-008', nombre: 'Clásico Romántico: Rosas y Ternura', descripcion: 'La expresión máxima del cariño diseñada para impactar en la capital de la montaña.', precio: 180000, imagen: getCldUrl('ancheta8_fvpvsd'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-009', nombre: 'Azul Infinito: Mi Amor Bonito', descripcion: 'Una expresión de cariño vibrante y moderna para sorprender a tu persona favorita.', precio: 150000, imagen: getCldUrl('ancheta9_qunebh'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-010', nombre: 'Mundo Kawaii: Especial Hello Kitty', descripcion: 'El regalo soñado para las fanáticas de la ternura en la capital antioqueña.', precio: 135000, imagen: getCldUrl('ancheta10_b42djt'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-011', nombre: 'Pasión y Brindis: Especial San Valentín', descripcion: 'Un detalle cargado de romance y buen gusto para celebrar el amor.', precio: 155000, imagen: getCldUrl('ancheta11_rjcgv3'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-012', nombre: 'Declaración Romántica: Oso y Nutella', descripcion: 'Un detalle diseñado para derretir corazones en la capital antioqueña.', precio: 160000, imagen: getCldUrl('ancheta12_ymkzk3'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-013', nombre: 'Nubes de Ternura: Cinnamoroll Edition', descripcion: 'Un detalle mágico y soñador para las fans de Sanrio en la ciudad.', precio: 140000, imagen: getCldUrl('ancheta13_c0lgl6'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-014', nombre: 'Dulce Encanto: Gala de Rosas y Peluche', descripcion: 'Una composición de lujo diseñada para cautivar en Medellín y sus alrededores.', precio: 145000, imagen: getCldUrl('ancheta14_gdm7tz'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-015', nombre: 'Destello Rosa: Homenaje a Mamá', descripcion: 'Un detalle cargado de ternura y gratitud para la mujer más especial.', precio: 150000, imagen: getCldUrl('ancheta15_dfq9xz'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-016', nombre: 'Brindis de Amor: Rojo Pasión', descripcion: 'Una elegante sorpresa diseñada para celebrar el romance en la ciudad.', precio: 135000, imagen: getCldUrl('ancheta16_kpz7be'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-017', nombre: 'Violeta Imperial: Sorpresa de Cumpleaños', descripcion: 'Un detalle cargado de distinción y color para celebrar la vida.', precio: 145000, imagen: getCldUrl('ancheta17_qtubmg'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-018', nombre: 'Amanecer Dorado: Mi Hermosa Sorpresa', descripcion: 'Un detalle radiante y sofisticado diseñado para iluminar el día de esa mujer especial.', precio: 160000, imagen: getCldUrl('ancheta18_qohsrh'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-019', nombre: 'Pasión Verdolaga: Especial Atlético Nacional', descripcion: 'El regalo definitivo para los verdaderos hinchas en la ciudad de la eterna primavera.', precio: 130000, imagen: getCldUrl('ancheta19_c96jn5'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-020', nombre: 'Mis Dulces 15: Edición Angel', descripcion: 'Un detalle mágico y tierno diseñado especialmente para celebrar el quinceañero soñado.', precio: 160000, imagen: getCldUrl('ancheta20_zru0s8'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-021', nombre: 'Celebración Pastel: Dulces 20', descripcion: 'Un detalle encantador y lleno de frescura para celebrar una década más de vida.', precio: 160000, imagen: getCldUrl('ancheta21_dyjqsf'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-022', nombre: 'Dulce Amanecer: Rosa Encanto', descripcion: 'Un detalle delicado y vibrante para iluminar el día de alguien especial en Medellín.', precio: 120000, imagen: getCldUrl('ancheta22_hv4m3l'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-023', nombre: 'Destello Lila: Especial Sofi', descripcion: 'Un detalle delicado y lleno de luz para celebrar momentos especiales en el Valle de Aburrá.', precio: 100000, imagen: getCldUrl('ancheta23_rvpcia'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-024', nombre: 'Aventura Stitch: Azul y Oro Rosa', descripcion: 'Una sorpresa monumental diseñada para los amantes del carismático Stitch.', precio: 175000, imagen: getCldUrl('ancheta24_g2dqlq'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-025', nombre: 'Celebración Plateada: Azul y Rojo', descripcion: 'Un detalle impactante y festivo diseñado para conmemorar grandes hitos.', precio: 150000, imagen: getCldUrl('ancheta25_bpazur'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-026', nombre: 'Huerto de Bendiciones: Frutal Premium', descripcion: 'Una explosión de frescura y salud para celebrar la vida en Medellín.', precio: 150000, imagen: getCldUrl('ancheta26_aeggzq'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-027', nombre: 'Grado de Honor: Edición Púrpura', descripcion: 'Un reconocimiento elegante y lleno de color para celebrar los logros académicos.', precio: 100000, imagen: getCldUrl('ancheta27_gwx1nd'), categoria: 'Detalles', destacado: false },
    { id: 'det-anc-028', nombre: 'Aventura Angry Birds: Especial Juan David', descripcion: 'Una explosión de diversión y color para celebrar un cumpleaños número 11 inolvidable.', precio: 135000, imagen: getCldUrl('ancheta28_w7ebpb'), categoria: 'Detalles', destacado: false },
    { id: 'det-ramo-002', nombre: 'Majestic Red: Ramo de Rosas Imperial', descripcion: 'Ramo de rosas rojas premium en Medellín que conquista corazones.', precio: 135000, imagen: getCldUrl('ramo1_pt_2_gkjfsv'), categoria: 'Detalles', destacado: false },
    { id: 'det-ram-001', nombre: 'Ramillete Ternura Cow: Rosas y Peluche', descripcion: 'Ramillete de cumpleaños original en Medellín con diseño de vaquita.', precio: 130000, imagen: getCldUrl('ramillete1_ieegys'), categoria: 'Detalles', destacado: false },
    { id: 'det-ram-002', nombre: 'Pasión Clásica: Ramillete de 24 Rosas', descripcion: 'Ramillete de 24 rosas rojas en Medellín, el símbolo universal del amor verdadero.', precio: 100000, imagen: getCldUrl('ramillete3_ot9lnt'), categoria: 'Detalles', destacado: true },
    { id: 'det-ram-003', nombre: 'Sinfonía Rosada: Ramillete Dulce Amor', descripcion: 'Arreglo floral con 36 rosas en degradé rosado, fucsia y blanco para Medellín.', precio: 140000, imagen: getCldUrl('ramillete4_fob1od'), categoria: 'Detalles', destacado: false },
    { id: 'det-ram-004', nombre: 'Sol Radiante: Ramillete de Girasol y Esperanza', descripcion: 'Ramillete de girasoles vibrantes en Medellín que ilumina cualquier espacio.', precio: 50000, imagen: getCldUrl('ramillete5_x2asdp'), categoria: 'Detalles', destacado: false },
    { id: 'det-ram-005', nombre: 'Realeza Rosa: Ramillete Premium con Corona', descripcion: 'Ramillete de rosas con corona dorada en Medellín para cumpleaños de reinas.', precio: 120000, imagen: getCldUrl('ramillete6_kqsgtx'), categoria: 'Detalles', destacado: true },
    { id: 'det-ram-006', nombre: 'Burbuja de Amor: Ramillete con Globo Personalizado', descripcion: 'Ramo de rosas con globo burbuja personalizado en Medellín.', precio: 120000, imagen: getCldUrl('ramillete7_qrilnq'), categoria: 'Detalles', destacado: false },
    { id: 'det-ram-007', nombre: 'Éxito y Dulzura: Ramillete Especial de Graduación', descripcion: 'Ramillete de graduación en Medellín con oso y rosas elegantes.', precio: 140000, imagen: getCldUrl('ramillete8_peijyf'), categoria: 'Detalles', destacado: false },
    { id: 'det-ram-008', nombre: 'Dulce Compañía: Ramillete Exótico con Peluche', descripcion: 'Arreglo floral con peluche y globo en Medellín que enamora.', precio: 88000, imagen: getCldUrl('ramillete9_wnvws0'), categoria: 'Detalles', destacado: false },
    { id: 'det-ram-009', nombre: 'Logro Soñado: Ramillete Mini Graduación', descripcion: 'Mini ramillete de graduación en Medellín con oso graduado.', precio: 95000, imagen: getCldUrl('ramillete10_nfp8bu'), categoria: 'Detalles', destacado: false },
    { id: 'det-df-001', nombre: 'Festín de Gratitud: Arreglo de Frutas y Rosas Premium', descripcion: 'Arreglo de frutas con flores en Medellín que combina salud y belleza.', precio: 160000, imagen: getCldUrl('desayunoflorez1_t5v6wb'), categoria: 'Detalles', destacado: true },
    { id: 'det-df-002', nombre: 'Dulce Despertar: Ramo de Frutas y Rosas', descripcion: 'Desayuno sorpresa con frutas y flores en Medellín.', precio: 160000, imagen: getCldUrl('desayunoflorez2_ibbt78'), categoria: 'Detalles', destacado: false },
    { id: 'det-df-003', nombre: "Celebración Real: Rosas, Baileys & Hershey's", descripcion: 'Desayuno con Baileys y chocolates en Medellín para celebraciones especiales.', precio: 175000, imagen: getCldUrl('desayunoflorez3_scaqwc'), categoria: 'Detalles', destacado: false },
    { id: 'det-df-004', nombre: 'Reina de la Casa: Ramo Gourmet Primaveral', descripcion: 'Desayuno sorpresa gourmet en Medellín para la reina del hogar.', precio: 170000, imagen: getCldUrl('desayunoflorez4_qgawll'), categoria: 'Detalles', destacado: false },
    { id: 'det-df-005', nombre: 'Elegancia: Ramo Hermoso Floral', descripcion: 'Arreglo floral corporativo elegante en Medellín con caja de madera artesanal.', precio: 120000, imagen: getCldUrl('desayunoflorez5_yrgpt6'), categoria: 'Detalles', destacado: false },
    { id: 'det-df-006', nombre: 'Amor Infinito: Explosión Tropical y Stitch', descripcion: 'Desayuno de amor con Stitch y champaña en Medellín.', precio: 190000, imagen: getCldUrl('desayunoflorez6_ow4bmm'), categoria: 'Detalles', destacado: false },
    { id: 'det-df-007', nombre: 'Amanecer Dorado: Arreglo de Girasoles y Baileys', descripcion: 'Desayuno de girasoles con Baileys en Medellín para celebraciones radiantes.', precio: 190000, imagen: getCldUrl('desayunoflorez7_spd5cb'), categoria: 'Detalles', destacado: false },
    { id: 'det-df-008', nombre: 'Jardín de Amoroso: Girasoles, Rosas y Globos', descripcion: 'Arreglo floral con globos en Medellín para grandes celebraciones.', precio: 105000, imagen: getCldUrl('desayunoflorez8_hdd08q'), categoria: 'Detalles', destacado: false },
    { id: 'det-df-009', nombre: 'Abrazo de Rosas: Arreglo Amor con Peluche y Chocolates', descripcion: 'Arreglo de rosas con chocolates Ferrero en Medellín.', precio: 118000, imagen: getCldUrl('desayunoflorez9_falawe'), categoria: 'Detalles', destacado: false },
    { id: 'det-df-016', nombre: 'Jardín de Gala: Explosión de Girasoles', descripcion: 'Arreglo Deluxe de girasoles con frutas en Medellín.', precio: 175000, imagen: getCldUrl('desayunoflorez16_d2qo30'), categoria: 'Detalles', destacado: false },
    { id: 'det-des-001', nombre: 'Explosión de Ternura: Edición Capibara Infantil', descripcion: 'Desayuno sorpresa infantil de Capibara en Medellín.', precio: 150000, imagen: getCldUrl('desayuno1_xsabij'), categoria: 'Detalles', destacado: false },
    { id: 'det-des-002', nombre: 'Mundo Rosa: Especial Hello Kitty', descripcion: 'Desayuno de Hello Kitty en Medellín para fanáticas soñadoras.', precio: 150000, imagen: getCldUrl('desayuno2_ux6k4h'), categoria: 'Detalles', destacado: true },
    { id: 'det-des-003', nombre: 'Aventura Tropical: Moana Edition', descripcion: 'Desayuno sorpresa de Moana en Medellín.', precio: 140000, imagen: getCldUrl('desayuno3_gdta3g'), categoria: 'Detalles', destacado: false },
    { id: 'det-des-004', nombre: 'Noche Mágica: Kuromi Style', descripcion: 'Desayuno de Kuromi en Medellín para personalidades con estilo único.', precio: 160000, imagen: getCldUrl('desayuno4_t8zxke'), categoria: 'Detalles', destacado: true },
    { id: 'det-des-005', nombre: 'Ohana: Especial Lilo & Stitch', descripcion: 'Desayuno de Lilo & Stitch en Medellín que celebra la familia.', precio: 150000, imagen: getCldUrl('desayuno5_gbff7t'), categoria: 'Detalles', destacado: true },
    { id: 'det-des-006', nombre: 'Amanecer Galáctico con Stitch', descripcion: 'Desayuno sorpresa de Stitch en Medellín azul radiante.', precio: 135000, imagen: getCldUrl('desayuno6_hklskh'), categoria: 'Detalles', destacado: false },
    { id: 'det-des-007', nombre: 'Mi Primera Gran Sorpresa: Pocoyó', descripcion: 'Desayuno infantil de Pocoyó en Medellín para los más pequeñitos.', precio: 55000, imagen: getCldUrl('desayuno7_olop8r'), categoria: 'Detalles', destacado: false },
    { id: 'det-des-008', nombre: 'Despertar Natural: Girasoles & Fruta', descripcion: 'Desayuno saludable con girasoles en Medellín.', precio: 100000, imagen: getCldUrl('desayuno8_jqik80'), categoria: 'Detalles', destacado: false },
    { id: 'det-des-009', nombre: 'Banquete Romántico: Edition Deluxe', descripcion: 'Desayuno sorpresa romántico en Medellín más completo y apasionado.', precio: 145000, imagen: getCldUrl('desayuno9_tqyxqm'), categoria: 'Detalles', destacado: false },
    { id: 'det-des-010', nombre: 'Desayuno "Te Adoro" con Rosas & Pasión', descripcion: 'Desayuno romántico con rosas en Medellín para declaraciones de amor.', precio: 190000, imagen: getCldUrl('desayuno10_dhwqwg'), categoria: 'Detalles', destacado: false },
    { id: 'det-des-011', nombre: 'Amanecer de Reina: Rose Gold & Corona', descripcion: 'Desayuno de reina en Medellín con elegancia rose gold.', precio: 145000, imagen: getCldUrl('desayuno11_xqt7er'), categoria: 'Detalles', destacado: true },
    { id: 'det-des-012', nombre: 'Tributo de Amor: Especial para Mamá', descripcion: 'Desayuno para mamá en Medellín que es caricia al corazón.', precio: 140000, imagen: getCldUrl('desayuno12_kknynu'), categoria: 'Detalles', destacado: false },
    { id: 'ref-001', nombre: 'Refrigerio Chispas de queso', descripcion: 'Refrigerio para eventos infantiles en Medellín.', precio: 6000, imagen: getCldUrl('refrigerio10_jvg3nv'), categoria: 'Refrigerios', destacado: true },
    { id: 'ref-002', nombre: 'Refrigerio Chispas de queso', descripcion: 'Refrigerio económico para eventos en Medellín.', precio: 7000, imagen: getCldUrl('refrigerio2_d5sdy7'), categoria: 'Refrigerios', destacado: false },
    { id: 'ref-003', nombre: 'Refrigerio Vitalidad: Fruta & Néctar Natural', descripcion: 'Refrigerio saludable con frutas en Medellín.', precio: 13000, imagen: getCldUrl('refrigerio3_xsohqv'), categoria: 'Refrigerios', destacado: false },
    { id: 'ref-004', nombre: 'Eventos de Oro: Sándwich & Fruta', descripcion: 'Refrigerio para eventos masivos en Medellín.', precio: 13000, imagen: getCldUrl('refrigerio4_yzgtsl'), categoria: 'Refrigerios', destacado: false },
    { id: 'ref-005', nombre: 'Lunch Corporativo: Tradición & Calidad', descripcion: 'Refrigerio corporativo premium en Medellín.', precio: 15000, imagen: getCldUrl('refrigerio5_c6yvyh'), categoria: 'Refrigerios', destacado: false },
    { id: 'ref-006', nombre: 'Croissant edición especial: Delicia & Frescura', descripcion: 'Refrigerio gourmet con croissant en Medellín.', precio: 15000, imagen: getCldUrl('refrigerio6_eeheq4'), categoria: 'Refrigerios', destacado: false },
    { id: 'ref-007', nombre: 'Sándwich Express "Spider-Man"', descripcion: 'Refrigerio infantil de Spider-Man en Medellín.', precio: 5000, imagen: getCldUrl('refrigerio7_wpif0j'), categoria: 'Refrigerios', destacado: false },
    { id: 'ref-008', nombre: 'Máxima Eficiencia Corporativa', descripcion: 'Refrigerio para eventos de alto volumen en Medellín.', precio: 10000, imagen: getCldUrl('refrigerio8_wbywhj'), categoria: 'Refrigerios', destacado: true },
    { id: 'ref-009', nombre: 'Lunch Picnic Tradicional', descripcion: 'Refrigerio estilo picnic en Medellín.', precio: 12000, imagen: getCldUrl('refrigerio9_axxbk5'), categoria: 'Refrigerios', destacado: false },
    { id: 'dec-001', nombre: 'Capibara Party Premium - Medellín', descripcion: '¡Celebra con la tendencia más tierna del momento!', precio: 450000, imagen: getCldUrl('decoracion1_rp0efz'), categoria: 'Decoraciones', destacado: true },
    { id: 'dec-002', nombre: 'Paw Patrol Girls Adventure - Medellín', descripcion: '¡Llamando a todas las pequeñas heroínas de Medellín!', precio: 300000, imagen: getCldUrl('decoracion2_g4lqtm'), categoria: 'Decoraciones', destacado: true },
    { id: 'dec-003', nombre: 'Toy Story Adventure Premium - Medellín', descripcion: '¡Hay un amigo en mí y en tu próxima fiesta!', precio: 650000, imagen: getCldUrl('decoracion3_saclrf'), categoria: 'Decoraciones', destacado: true },
    { id: 'dec-004', nombre: 'Bosque Mágico Masha y el Oso - Medellín', descripcion: '¡Vive una aventura encantada en el bosque!', precio: 480000, imagen: getCldUrl('decoracion4_vbr48z'), categoria: 'Decoraciones', destacado: true },
    { id: 'dec-005', nombre: 'CR7 Soccer Star - Medellín', descripcion: '¡Lleva la emoción del estadio a tu fiesta!', precio: 320000, imagen: getCldUrl('decoracion5_pkxkrg'), categoria: 'Decoraciones', destacado: false },
    { id: 'dec-006', nombre: 'Sonic Super Speed Adventure - Medellín', descripcion: '¡Lleva la fiesta a la velocidad de la luz!', precio: 400000, imagen: getCldUrl('decoracion6_h89sqb'), categoria: 'Decoraciones', destacado: false },
    { id: 'dec-007', nombre: 'Paw Patrol Rescue Mission - Medellín', descripcion: '¡Llamando a toda la patrulla en Medellín para una celebración inolvidable!', precio: 310000, imagen: getCldUrl('decoracion7_wkggsl'), categoria: 'Decoraciones', destacado: false },
]

// ============================================================
// MIGRACIÓN
// ============================================================

async function migrate() {
    console.log('🚀 Iniciando migración a Sanity...\n')

    // 1. Crear categorías
    console.log('📁 Creando categorías...')
    for (const cat of categoriasData) {
        await client.createOrReplace(cat)
        console.log(`  ✅ ${cat.nombre}`)
    }

    // 2. Crear productos en lotes de 10
    console.log('\n📦 Creando productos...')
    const transaction = client.transaction()

    for (const p of productosMock) {
        const publicId = extractPublicId(p.imagen)
        const slugValue = slugify(p.nombre)

        const doc = {
            _id: `product-${p.id}`,
            _type: 'product',
            nombre: p.nombre,
            slug: { _type: 'slug', current: slugValue },
            descripcion: p.descripcion,
            precio: p.precio,
            cloudinaryPublicId: publicId,
            categoria: {
                _type: 'reference',
                _ref: categoryRefMap[p.categoria],
            },
            destacado: p.destacado,
            legacyId: p.id,
        }

        transaction.createOrReplace(doc)
    }

    await transaction.commit()
    console.log(`  ✅ ${productosMock.length} productos migrados`)
    console.log('\n🎉 Migración completada exitosamente!')
}

migrate().catch(err => {
    console.error('❌ Error en migración:', err)
    process.exit(1)
})