/**
 * Contenido editorial del blog.
 *
 * Vive en el repo y no en Sanity a propósito: los artículos son piezas SEO con
 * una estructura muy específica (respuesta directa citable, H2 en forma de
 * pregunta, tablas de datos, FAQ) que se rompe con facilidad desde un editor
 * de texto libre. Si el negocio necesita publicar sin tocar código, migrar a
 * una colección blogPost en Sanity replicando el tipo BlogBlock.
 *
 * Ruta elegida: /blog/[slug] en vez de /blog/[categoria]/[slug]. Con este
 * volumen de artículos una carpeta intermedia solo añade profundidad de clic
 * sin aportar señal de categoría a Google.
 *
 * Cada artículo nace de evidencia del export de GSC del 2026-08-09, no de
 * intuición: la consulta que lo justifica está anotada en `origenGsc`.
 */

export type BlogBlock =
  | { type: 'parrafo'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'lista'; items: string[]; ordenada?: boolean }
  | { type: 'tabla'; encabezados: string[]; filas: string[][]; nota?: string }
  | { type: 'destacado'; titulo: string; text: string };

export interface BlogPost {
  slug: string;
  /** H1 de la página. Puede ser largo y natural. */
  titulo: string;
  /** <title> del SERP. Máximo ~60 caracteres, se emite como absolute. */
  tituloSeo: string;
  descripcion: string;
  /**
   * Respuesta directa de 40–60 palabras que abre el artículo. Es el bloque que
   * los motores de IA extraen: debe responder la consulta por completo sin
   * depender del resto del texto.
   */
  respuestaDirecta: string;
  publicado: string;
  actualizado: string;
  categoria: string;
  lecturaMin: number;
  keywords: string[];
  /** Consulta de GSC que justifica el artículo. Documental, no se renderiza. */
  origenGsc: string;
  bloques: BlogBlock[];
  faqs: { q: string; a: string }[];
  /** Landing comercial a la que el artículo debe enrutar. */
  cta: { titulo: string; texto: string; label: string; path: string };
}

const POSTS_REFRIGERIOS: BlogPost[] = [
  {
    slug: 'cuanto-cuestan-los-refrigerios-para-eventos-en-medellin',
    titulo:
      '¿Cuánto cuestan los refrigerios para eventos en Medellín? Guía de precios 2026',
    tituloSeo: 'Precios de Refrigerios para Eventos en Medellín 2026',
    descripcion:
      'Cuánto cuesta un refrigerio para eventos en Medellín en 2026: precios por persona según el tipo de caja, qué incluye cada una, pedido mínimo y qué factores suben el costo.',
    respuestaDirecta:
      'Un refrigerio para eventos en Medellín cuesta entre $5.000 y $15.000 COP por persona en 2026. La caja básica con sándwich, fruta, jugo y postre está en $5.000; la empresarial con jugo natural y snack salado en $9.000; y la premium con ensalada de fruta y dos bebidas en $15.000. El pedido mínimo habitual es de 10 unidades.',
    publicado: '2026-08-10',
    actualizado: '2026-08-10',
    categoria: 'Refrigerios',
    lecturaMin: 6,
    origenGsc:
      '"refrigerios para eventos" (116 impresiones, pos. 4,45, CTR 4,31%), "refrigerios para eventos precios", "refrigerios economicos para eventos", "cajas para refrigerios"',
    keywords: [
      'precio refrigerios eventos medellín',
      'cuánto cuesta un refrigerio medellín',
      'refrigerios para eventos precios',
      'refrigerios económicos para eventos',
      'cajas de refrigerio precios medellín',
      'refrigerios por persona medellín',
      'cotizar refrigerios medellín',
    ],
    bloques: [
      {
        type: 'h2',
        text: '¿Qué precio tiene cada tipo de caja de refrigerio?',
      },
      {
        type: 'parrafo',
        text: 'El precio de un refrigerio se cotiza por persona, no por evento. Esto confunde a quien organiza por primera vez: no existe una tarifa fija de "refrigerio para 50 personas", sino un valor unitario que se multiplica por la cantidad de asistentes. En Medellín ese valor unitario se mueve en tres tramos bastante definidos según lo que lleve la caja.',
      },
      {
        type: 'tabla',
        encabezados: ['Tipo de caja', 'Precio por persona', 'Qué incluye'],
        filas: [
          [
            'Básica',
            '$5.000',
            'Sándwich del día, una fruta de temporada, jugo en caja y un postre pequeño',
          ],
          [
            'Empresarial',
            '$9.000',
            'Sándwich gourmet, fruta, snack salado, jugo natural en botella, postre artesanal, agua o té',
          ],
          [
            'Premium',
            '$15.000',
            'Sándwich gourmet o wrap, ensalada de fruta, dos snacks, jugo natural y agua, postre de la casa',
          ],
        ],
        nota: 'Precios de Creaciones Vane vigentes en agosto de 2026 para Medellín y el Valle de Aburrá. Pedido mínimo de 10 unidades en todas las cajas.',
      },
      {
        type: 'parrafo',
        text: 'La diferencia entre la caja básica y la empresarial no es solo cantidad de comida: es el jugo. La caja de $5.000 lleva jugo en caja industrial y la de $9.000 lleva jugo natural en botella. Si el evento tiene clientes externos o gente de otras empresas, esa diferencia de $4.000 por persona es la que se nota en la mesa.',
      },
      {
        type: 'h2',
        text: '¿Cuánto cuesta un refrigerio para 30, 50 o 100 personas?',
      },
      {
        type: 'parrafo',
        text: 'Multiplicando el valor unitario por la cantidad de asistentes se llega al presupuesto total. Estos son los tres escenarios más frecuentes en eventos corporativos y académicos de Medellín.',
      },
      {
        type: 'tabla',
        encabezados: ['Asistentes', 'Caja básica', 'Caja empresarial', 'Caja premium'],
        filas: [
          ['30 personas', '$150.000', '$270.000', '$450.000'],
          ['50 personas', '$250.000', '$450.000', '$750.000'],
          ['100 personas', '$500.000', '$900.000', '$1.500.000'],
        ],
        nota: 'A partir de 50 unidades aplica descuento por volumen, así que el valor real suele quedar por debajo de estas cifras. Conviene pedir la cotización con la cantidad exacta.',
      },
      {
        type: 'destacado',
        titulo: 'El error más común al presupuestar',
        text: 'Pedir refrigerios solo para los asistentes confirmados. En capacitaciones y jornadas académicas siempre aparecen entre un 5% y un 10% de personas adicionales: el conferencista, el equipo de logística, alguien que se sumó a última hora. Quedarse corto en una sola caja se nota mucho más que sobrar dos.',
      },
      {
        type: 'h2',
        text: '¿Qué factores hacen subir el precio de un refrigerio?',
      },
      {
        type: 'parrafo',
        text: 'Dos cotizaciones para el mismo número de personas pueden diferir bastante. Estas son las variables que mueven el valor, ordenadas por el impacto que tienen en la factura final.',
      },
      {
        type: 'lista',
        items: [
          'Tipo de bebida. Pasar de jugo en caja a jugo natural en botella es el salto de precio más grande dentro de una misma caja.',
          'Personalización de la caja. Imprimir el logo de la empresa o poner etiqueta con el nombre del evento se cotiza aparte del valor por persona.',
          'Zona de entrega. En Medellín, El Poblado, Laureles, Belén, Envigado, Sabaneta, Itagüí y Bello la entrega va incluida. La Estrella, Caldas, Copacabana, Girardota y Barbosa suman un adicional según distancia.',
          'Hora de entrega. Las entregas antes de las 7:00 de la mañana o en fines de semana pueden tener recargo por la logística de producción.',
          'Restricciones alimentarias. Las opciones vegetarianas y sin gluten no deberían costar más; si una cotización se las cobra aparte, vale la pena preguntar por qué.',
        ],
      },
      {
        type: 'h2',
        text: '¿Con cuánta anticipación hay que pedir los refrigerios?',
      },
      {
        type: 'parrafo',
        text: 'Para pedidos de hasta 30 unidades, 48 horas es suficiente. Por encima de 30 unidades conviene confirmar con 72 horas, porque la producción de sándwiches y el corte de fruta se hacen el mismo día de la entrega y hay un límite de capacidad diaria. Los pedidos urgentes a veces se resuelven el mismo día, pero depende de lo que ya esté agendado esa jornada.',
      },
      {
        type: 'parrafo',
        text: 'Hay dos épocas en las que este margen se estira: diciembre, por los cierres de año corporativos, y la temporada de inducciones de enero y febrero. En esos meses conviene reservar con una semana de anticipación.',
      },
      {
        type: 'h2',
        text: '¿Qué debe incluir una cotización bien hecha?',
      },
      {
        type: 'parrafo',
        text: 'Antes de aprobar un presupuesto, revisa que la cotización responda estas cinco cosas. Si falta alguna, es probable que aparezca como costo adicional después.',
      },
      {
        type: 'lista',
        ordenada: true,
        items: [
          'El valor por persona y el valor total, separados.',
          'Si el transporte hasta el sitio del evento está incluido o se cobra aparte.',
          'La hora exacta de entrega comprometida.',
          'Cuántas unidades vegetarianas o sin gluten van incluidas y si tienen sobrecosto.',
          'Si se emite factura electrónica y qué datos de la empresa se necesitan para ello.',
        ],
      },
      {
        type: 'parrafo',
        text: 'Ese último punto importa más de lo que parece en eventos corporativos: si el proveedor no factura electrónicamente, el área contable no puede procesar el pago y el pedido se traba aunque la comida haya llegado perfecta.',
      },
    ],
    faqs: [
      {
        q: '¿Cuál es el precio mínimo de un refrigerio para eventos en Medellín?',
        a: 'La caja más económica está en $5.000 COP por persona e incluye sándwich del día, una fruta de temporada, jugo en caja y un postre pequeño. Por debajo de ese valor es difícil mantener la calidad y la presentación individual en caja.',
      },
      {
        q: '¿Cuántas unidades hay que pedir como mínimo?',
        a: 'El pedido mínimo habitual es de 10 unidades. Por debajo de esa cantidad no se garantiza producción puntual ni el mismo nivel de presentación, porque la preparación se organiza por lotes.',
      },
      {
        q: '¿Los refrigerios para eventos incluyen el transporte?',
        a: 'En zona cercana del Valle de Aburrá (Medellín, El Poblado, Laureles, Belén, Envigado, Sabaneta, Itagüí y Bello) el transporte va incluido en el precio por persona. En La Estrella, Caldas, Copacabana, Girardota y Barbosa se cotiza un adicional según la distancia y la hora de entrega.',
      },
      {
        q: '¿Hay descuento si pido muchos refrigerios?',
        a: 'Sí, a partir de 50 unidades aplica descuento por volumen. Conviene pedir la cotización con la cantidad exacta de asistentes para que el descuento quede reflejado desde el principio.',
      },
      {
        q: '¿Se puede pedir refrigerios con opciones vegetarianas o sin gluten?',
        a: 'Sí, y no debería tener costo adicional. Solo hay que confirmar cuántas unidades especiales se necesitan al momento del pedido para incluirlas en la preparación del lote.',
      },
    ],
    cta: {
      titulo: '¿Necesitas cotizar refrigerios para tu evento?',
      texto:
        'Cuéntanos la fecha, la hora de entrega y cuántas personas son. Te respondemos el mismo día con opciones y precio final, con factura electrónica si la necesitas.',
      label: 'Ver cajas y precios de refrigerios',
      path: '/refrigerios-empresariales-medellin',
    },
  },

  {
    slug: 'refrigerios-para-capacitaciones-y-reuniones-que-incluir',
    titulo:
      'Refrigerios para capacitaciones y reuniones: qué incluir según la duración',
    tituloSeo: 'Refrigerios para Capacitaciones y Reuniones',
    descripcion:
      'Qué refrigerio elegir para una capacitación, reunión o jornada de trabajo según cuánto dura, a qué hora es y quién asiste. Guía práctica para organizadores en Medellín.',
    respuestaDirecta:
      'Para una reunión de menos de dos horas basta con un refrigerio ligero de sándwich, fruta y bebida. Entre dos y cuatro horas conviene una caja con snack salado y jugo natural. En jornadas de más de cuatro horas se necesitan dos momentos de refrigerio, uno en la mañana y otro en la tarde, o una caja premium más completa.',
    publicado: '2026-08-10',
    actualizado: '2026-08-10',
    categoria: 'Refrigerios',
    lecturaMin: 5,
    origenGsc:
      '"refrigerios para capacitaciones", "refrigerio para reuniones" y "refrigerios para eventos empresariales" — todas en posición 1–2,25 con 0 clics por falta de contenido',
    keywords: [
      'refrigerios para capacitaciones',
      'refrigerios para reuniones',
      'refrigerios para eventos empresariales',
      'refrigerios para empresas medellín',
      'qué incluir en un refrigerio de capacitación',
      'refrigerios para jornadas de trabajo',
    ],
    bloques: [
      {
        type: 'h2',
        text: '¿Por qué la duración de la jornada define el refrigerio?',
      },
      {
        type: 'parrafo',
        text: 'El refrigerio de una capacitación no cumple la misma función que el de una reunión corta. En una sesión de dos horas es un gesto de cortesía; en una jornada de ocho es lo que sostiene la atención de la gente después del almuerzo. Elegir la caja por precio, sin mirar cuánto dura el evento, es la causa más común de que sobren refrigerios en un caso y falten en el otro.',
      },
      {
        type: 'tabla',
        encabezados: ['Duración', 'Momentos de refrigerio', 'Tipo de caja recomendada'],
        filas: [
          ['Menos de 2 horas', '1 (al inicio o al cierre)', 'Básica'],
          ['2 a 4 horas', '1 (a mitad de jornada)', 'Empresarial'],
          ['4 a 6 horas', '2 (mañana y tarde)', 'Básica + Empresarial'],
          ['Jornada completa', '2 más almuerzo aparte', 'Empresarial o Premium'],
        ],
      },
      {
        type: 'h2',
        text: '¿A qué hora conviene entregar el refrigerio?',
      },
      {
        type: 'parrafo',
        text: 'La hora de entrega importa tanto como el contenido de la caja. La regla práctica: el refrigerio debe estar en el sitio quince minutos antes del receso, no en el momento exacto en que la gente se para. Si llega justo a la hora, se pierde la mitad del descanso repartiendo cajas y la sesión se retrasa.',
      },
      {
        type: 'lista',
        items: [
          'Jornadas de mañana: entrega entre 7:30 y 8:00 a. m. si el refrigerio es de apertura, o hacia las 9:45 a. m. si el receso es a las 10:00.',
          'Jornadas de tarde: entrega hacia las 2:45 p. m. para un receso a las 3:00.',
          'Jornada completa: dos entregas, o una sola en la mañana si las cajas se conservan bien a temperatura ambiente. Conviene preguntarlo, porque no todas lo hacen.',
        ],
      },
      {
        type: 'destacado',
        titulo: 'Un detalle que casi nadie coordina',
        text: 'Dónde se van a poner las cajas. En auditorios y salones de capacitación no siempre hay una mesa libre en la entrada, y terminar apilando refrigerios en el piso o en la mesa del conferencista arruina la presentación. Vale la pena decidirlo el día anterior y avisarle al proveedor dónde debe dejarlos.',
      },
      {
        type: 'h2',
        text: '¿Qué cambia si asisten clientes externos?',
      },
      {
        type: 'parrafo',
        text: 'Cuando en la sala hay gente de fuera de la empresa —clientes, aliados, candidatos en un proceso de selección— el refrigerio deja de ser logística y pasa a ser imagen de marca. En esos casos tienen sentido tres cosas que en una reunión interna serían innecesarias.',
      },
      {
        type: 'lista',
        items: [
          'Jugo natural en botella en lugar de jugo en caja: es el detalle que más se nota visualmente en la mesa.',
          'Etiqueta con el logo de la empresa o el nombre del evento en la caja.',
          'Preguntar por restricciones alimentarias con antelación, en lugar de asumir. Ofrecerle a un invitado externo una opción que no puede comer deja peor impresión que no ofrecer nada.',
        ],
      },
      {
        type: 'h2',
        text: '¿Cómo calcular la cantidad para una capacitación?',
      },
      {
        type: 'parrafo',
        text: 'La cantidad se calcula sobre los inscritos, no sobre los confirmados, y se suma un margen. En capacitaciones internas la asistencia real suele quedar entre el 85% y el 95% de los inscritos, pero aparecen personas no previstas: el instructor, alguien de sistemas que vino a montar el equipo, el jefe del área que pasa a saludar.',
      },
      {
        type: 'parrafo',
        text: 'La fórmula que funciona en la práctica es pedir sobre el número de inscritos y sumar entre tres y cinco unidades. En jornadas escolares o pedagógicas el margen conviene subirlo, porque suele haber acompañantes.',
      },
      {
        type: 'h2',
        text: '¿Y si la capacitación es para niños?',
      },
      {
        type: 'parrafo',
        text: 'En jornadas pedagógicas, colegios y eventos infantiles hay tres ajustes que marcan la diferencia: porciones más pequeñas, sabores conocidos en lugar de propuestas gourmet, y ausencia total de frutos secos por seguridad ante alergias. Una caja pensada para adulto en un evento infantil termina, casi siempre, a medio comer.',
      },
    ],
    faqs: [
      {
        q: '¿Cuántos refrigerios se necesitan en una jornada de trabajo completa?',
        a: 'Dos momentos de refrigerio, uno a media mañana y otro a media tarde, además del almuerzo que se maneja aparte. Si el presupuesto solo alcanza para uno, conviene ubicarlo en la tarde: es cuando la atención de los asistentes más lo necesita.',
      },
      {
        q: '¿Qué refrigerio es mejor para una reunión de dos horas?',
        a: 'Una caja básica con sándwich, fruta, bebida y postre pequeño es suficiente. En reuniones cortas el refrigerio funciona como cortesía y no como sustento, así que una caja más completa suele terminar a medio consumir.',
      },
      {
        q: '¿Con cuánta anticipación se pide un refrigerio para capacitación?',
        a: 'Con 48 horas para pedidos de hasta 30 unidades y 72 horas por encima de esa cantidad. Si la capacitación es en diciembre o en temporada de inducciones de enero y febrero, conviene reservar con una semana.',
      },
      {
        q: '¿Se puede poner el logo de la empresa en las cajas?',
        a: 'Sí. Se puede imprimir el logo en la caja, poner una etiqueta con el nombre del evento o incluir una tarjeta con mensaje. Se cotiza como adicional al valor por persona y conviene confirmarlo con varios días de anticipación para alcanzar a producirlo.',
      },
    ],
    cta: {
      titulo: '¿Tienes una capacitación o reunión próxima?',
      texto:
        'Cuéntanos cuántas personas son, la fecha y la hora del receso. Te armamos la cotización el mismo día, con opciones vegetarianas y factura electrónica si la necesitas.',
      label: 'Ver cajas de refrigerios empresariales',
      path: '/refrigerios-empresariales-medellin',
    },
  },
];

const POST_DESAYUNOS: BlogPost = {
  slug: 'ideas-de-desayuno-sorpresa-en-medellin-segun-la-ocasion',
  titulo: 'Ideas de desayuno sorpresa en Medellín según la ocasión',
  tituloSeo: 'Ideas de Desayuno Sorpresa en Medellín',
  descripcion:
    'Qué desayuno sorpresa elegir según la ocasión y a quién se lo envías: cumpleaños, aniversario, Día de la Madre o un gracias. Con precios reales y horarios de entrega en Medellín.',
  respuestaDirecta:
    'Un desayuno sorpresa se elige por la ocasión y por la hora en que la persona lo recibe. Para cumpleaños funciona la entrega a primera hora con decoración temática; para aniversarios, una presentación con rosas frescas; y para agradecer, algo neutro que se pueda recibir en la oficina. En Medellín cuestan entre $90.000 y $190.000.',
  publicado: '2026-08-16',
  actualizado: '2026-08-16',
  categoria: 'Desayunos sorpresa',
  lecturaMin: 6,
  origenGsc:
    '"desayunos sorpresa" (pos. 1,67, CTR 66,67%), "desayunos sorpresa medellin" (pos. 1), "desayuno sorpresa cerca de mi", "desayunos medellin domicilio" — todas con posición ganadora y volumen de impresiones mínimo por falta de superficie',
  keywords: [
    'ideas desayuno sorpresa medellín',
    'qué incluir en un desayuno sorpresa',
    'desayuno sorpresa cumpleaños',
    'desayuno sorpresa aniversario',
    'desayuno sorpresa para mamá',
    'desayuno sorpresa para novio',
    'desayuno sorpresa para novia',
    'a qué hora entregar un desayuno sorpresa',
    'cuánto cuesta un desayuno sorpresa medellín',
  ],
  bloques: [
    { type: 'h2', text: '¿Qué lleva un desayuno sorpresa?' },
    {
      type: 'parrafo',
      text: 'La base es siempre la misma: fruta fresca cortada el día de la entrega, jugo natural en botella, sándwich gourmet y una presentación decorada con tarjeta. Lo que cambia entre un desayuno de $90.000 y uno de $190.000 no es esa base, sino lo que se le suma alrededor: globos, peluche, ramo de rosas, chocolates o postre.',
    },
    {
      type: 'parrafo',
      text: 'Conviene tenerlo claro antes de pedir, porque a veces se paga más esperando más comida cuando en realidad lo que crece es el componente decorativo. Si lo que importa es que la persona desayune bien, el tramo bajo cumple; si lo que importa es la escena al abrir la puerta, ahí sí tiene sentido subir.',
    },
    { type: 'h2', text: '¿Cuál elegir según la ocasión?' },
    {
      type: 'tabla',
      encabezados: ['Ocasión', 'Qué priorizar', 'Hora de entrega ideal'],
      filas: [
        ['Cumpleaños', 'Decoración temática, nombre en la presentación, vela', 'Primera hora de la mañana'],
        ['Aniversario', 'Rosas frescas, presentación cuidada, tarjeta larga', 'Antes de salir a trabajar'],
        ['Día de la Madre', 'Porción generosa, opción para dos personas', 'Media mañana'],
        ['Agradecimiento', 'Presentación neutra, sin temática romántica', 'Media mañana, en la oficina'],
        ['Reconciliación', 'Tarjeta manuscrita larga, sin exceso de decoración', 'Temprano, entre semana'],
      ],
    },
    { type: 'h2', text: '¿A qué hora conviene que llegue?' },
    {
      type: 'parrafo',
      text: 'Este es el detalle que más cambia el resultado y el que más gente pasa por alto. Un desayuno sorpresa que llega a las once de la mañana ya no es un desayuno: es un almuerzo temprano y pierde toda la gracia.',
    },
    {
      type: 'lista',
      items: [
        'Entre 6:00 y 7:00 a. m. si la persona sale temprano a trabajar. Hay que confirmar que alguien pueda abrir la puerta.',
        'Entre 7:00 y 9:00 a. m. es la franja más pedida y la que mejor funciona en general.',
        'Media mañana si la entrega es en una oficina: llega cuando la persona ya está instalada y hay público para la sorpresa.',
        'Fines de semana, más tarde: entregar a las 6:00 a. m. un domingo rara vez se agradece.',
      ],
    },
    {
      type: 'destacado',
      titulo: 'El dato que hay que confirmar antes de pedir',
      text: 'Que haya alguien que pueda recibir. Suena obvio, pero es la causa número uno de entregas fallidas en desayunos sorpresa: se coordina para las 6:30 a. m. y la persona ya salió, o vive sola y está dormida sin escuchar el timbre. Un número de contacto alterno resuelve el 90% de estos casos.',
    },
    { type: 'h2', text: '¿Cuánto hay que gastar para que se vea bien?' },
    {
      type: 'parrafo',
      text: 'Con $90.000 se resuelve un desayuno completo, bien presentado y con globos: es el punto donde la foto ya se ve como la gente imagina un desayuno sorpresa. El siguiente salto que más se nota está alrededor de los $120.000, cuando entra el peluche o el ramo de rosas. Por encima de $150.000 lo que crece es el tamaño del peluche, la cantidad de rosas y los chocolates.',
    },
    {
      type: 'parrafo',
      text: 'Una forma práctica de pedirlo: decir el presupuesto exacto desde el principio en lugar de preguntar qué opciones hay. Con la cifra sobre la mesa se puede armar la mejor combinación dentro de ella, en vez de mostrar opciones que se salen.',
    },
    { type: 'h2', text: '¿Y si la persona tiene alguna restricción?' },
    {
      type: 'parrafo',
      text: 'El sándwich se cambia por versión vegetariana sin costo adicional, y se puede adaptar para personas sin lactosa, sin gluten o con alergia a frutos secos. Lo importante es avisarlo al hacer el pedido y no el día anterior, porque la preparación se organiza con antelación. Un desayuno sorpresa que la persona no puede comer es peor que no enviar nada.',
    },
  ],
  faqs: [
    {
      q: '¿Cuánto cuesta un desayuno sorpresa en Medellín?',
      a: 'Entre $90.000 y $190.000 COP según el tamaño y los extras. Todos incluyen fruta fresca, jugo natural, sándwich gourmet, decoración temática y tarjeta con mensaje. Los globos, el peluche, el ramo de rosas y los chocolates son los que mueven el precio dentro de ese rango.',
    },
    {
      q: '¿A qué hora entregan los desayunos sorpresa?',
      a: 'La mayoría se entrega entre las 6:00 y las 9:00 de la mañana para que la persona lo reciba antes de empezar el día. También se hacen entregas a media mañana cuando la sorpresa es en la oficina. La hora exacta se coordina al confirmar el pedido.',
    },
    {
      q: '¿Con cuánta anticipación hay que pedir un desayuno sorpresa?',
      a: 'Confirmando antes de las 12:00 del mediodía se entrega al día siguiente sin problema. Para fechas marcadas como San Valentín, Día de la Madre, Amor y Amistad o diciembre conviene reservar con una semana porque la agenda de entregas tempranas se llena.',
    },
    {
      q: '¿La persona se entera de que le van a llevar un desayuno?',
      a: 'No. La coordinación se hace contigo por WhatsApp y la entrega es directa en la dirección que indiques, sin adelantar nada. Si quieres, se te envía una foto del momento de la entrega para que veas la reacción.',
    },
  ],
  cta: {
    titulo: '¿Ya sabes a quién quieres sorprender?',
    texto:
      'Cuéntanos la ocasión, tu presupuesto y la dirección. Armamos la mejor opción dentro de esa cifra y coordinamos la hora exacta de entrega.',
    label: 'Ver desayunos sorpresa a domicilio',
    path: '/desayunos-sorpresa-medellin',
  },
};

export const BLOG_POSTS: BlogPost[] = [...POSTS_REFRIGERIOS, POST_DESAYUNOS];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** Posts ordenados del más reciente al más antiguo. */
export function getPostsOrdenados(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => b.publicado.localeCompare(a.publicado));
}
