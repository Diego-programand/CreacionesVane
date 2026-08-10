# Análisis SEO Completo — Creaciones Vane

**Fuente de datos:** Export de Google Search Console `creacionesvane.com-Performance-on-Search-2026-08-09` (7 archivos CSV)
**Período:** Últimos 12 meses (datos reales desde 2026-02-08 hasta 2026-08-07)
**Tipo de búsqueda:** Web
**Fecha del análisis:** 2026-08-09
**Metodología:** Análisis archivo por archivo cruzado con el estado actual del código del sitio (Next.js 15, App Router), aplicando criterios de SEO Local (Whitespark 2026, BrightLocal 2026) y GEO/AI Search (Ahrefs 2025, Seer Interactive).

---

## 0. Estado de ejecución — actualizado 2026-08-10

### Implementado en código (build verificado, 91 páginas generadas)

| Acción | Archivos | Estado |
|---|---|---|
| Crawlers de IA declarados explícitos (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot) | `public/robots.txt` | Hecho |
| Sección "Arreglos para bodas en Medellín" por zona del evento + 3 FAQ nuevas + H1/title/schema con "arreglos" y Envigado | `app/decoracion-bodas-medellin/page.tsx` | Hecho |
| Landing nueva `/desayunos-sorpresa-medellin` (8 bloques, 10 FAQ, LocalBusiness + Service + AggregateOffer + BreadcrumbList + FAQPage, bloque citable por IA) | `app/desayunos-sorpresa-medellin/page.tsx` | Hecho |
| Descanibalización: `/creaciones-vane` cede la intención "desayunos sorpresa" a la landing nueva | `app/creaciones-vane/page.tsx` | Hecho |
| Enlaces internos: footer sitewide con las 5 landings, cross-links recíprocos catálogo ↔ anchetas ↔ desayunos | `app/components/Footer.tsx`, landings | Hecho |
| Sitemap + llms.txt actualizados con la landing nueva y la sección de arreglos | `app/sitemap.ts`, `public/llms.txt` | Hecho |
| Titles acortados en las 10 páginas del sitio para no truncarse en el SERP | todas las `page.tsx`, `app/lib/seo.ts` | Hecho |
| SEO de las 76 fichas de producto: tipo + ciudad en title, precio y entrega en description | `app/producto/[slug]/page.tsx` | Hecho |
| Imágenes 404 corregidas en schemas y OG | `app/lib/seo.ts`, `app/anchetas-medellin-domicilio/page.tsx`, `app/creaciones-vane/page.tsx` | Hecho |
| Jerga anglo eliminada de metadatos ("box lunch", "catering corporativo", "backdrop") | `app/refrigerios/page.tsx`, `app/decoraciones/page.tsx` | Hecho |
| Verificación redirect http→https | — | Ya correcto: devuelve 308 (permanente, equivalente a 301 para Google) |

### Hallazgos nuevos, no visibles en los CSV

Aparecieron al cruzar los datos con el código. Los tres primeros ya están corregidos; el cuarto necesita una decisión del negocio.

**H1 — Imágenes 404 en Open Graph y schema (corregido).** `/images/anchetasMedellinDomicilio.webp` y `/banner-detalles.webp` no existen en `public/`, pero estaban referenciados como imagen OG de la landing de anchetas (73 clics, la página más visitada), como imagen OG del catálogo y dentro del `image[]` del Organization schema del sitio entero. Efecto: al compartir esas URLs por WhatsApp — el canal de conversión del negocio — la vista previa salía sin imagen. Corregido apuntando a `/banner-anchetas.webp` y al OG por defecto, que sí existen y tienen las dimensiones declaradas.

**H2 — Todos los titles del sitio se truncaban en el SERP (corregido).** El template `%s | Creaciones Vane` del layout añade 18 caracteres a cada title de página. Con eso, los 10 titles del sitio medían entre 68 y 103 caracteres cuando Google muestra ~60. La home llegaba a 103 y el catálogo a 82: la keyword quedaba fuera de la parte visible. Esto explica buena parte del déficit de CTR documentado en P6 y P8 (home 3,97% en posición 5,95; catálogo 3,61%). Todos los titles quedaron entre 50 y 61 caracteres, con los ganchos de CTR (precio, "entrega el mismo día") movidos a la description, que dispone de ~155. Se añadió `titleAbsolute` a `pageMetadata()` para la home y las fichas de producto, donde el sufijo de marca sobraba.

**H3 — Metadatos con jerga que el propio canon del proyecto prohíbe (corregido).** El title de `/refrigerios` decía "Box Lunch y Catering Corporativo" y el de `/decoraciones` usaba "backdrop", pese a que los comentarios de las landings establecen explícitamente usar el lenguaje del cliente ("refrigerios", "cajas", "backings de madera"). Los CSV confirman que el canon tenía razón: las consultas reales son "refrigerios para eventos", "cajas de refrigerio", "refrigerios para capacitaciones" — ninguna en jerga anglo. Reescritos con el vocabulario real.

**H4 — Precios de anchetas inconsistentes entre la página y el schema (corregido).** En `app/anchetas-medellin-domicilio/page.tsx` los paquetes declaraban `precio: 50_000` con `precioLabel: '$80.000'`, y `precio: 110_000` con `precioLabel: '$130.000'`. El campo `precio` alimenta el JSON-LD que lee Google; el `precioLabel` es lo que ve el usuario. Es decir, **el sitio le declaraba a Google $50.000 mientras mostraba $80.000 en pantalla**, y Google penaliza los rich results de producto cuyo precio no coincide con el visible. La contradicción estaba repartida: `llms.txt` y `BUSINESS.priceRanges.detalles` usaban las cifras bajas, el cross-link del catálogo y las FAQ usaban las altas. El negocio confirmó que los precios reales son **$80.000 (Detalle) y $130.000 (Clásica)**; se alinearon `precio`, `llms.txt`, `BUSINESS.priceRanges.detalles` y la descripción del LocalBusiness schema. Verificado en el HTML renderizado: el JSON-LD emite 80000 / 130000 / 180000 y la página muestra $80.000 / $130.000 / $180.000.

### Pendiente — requiere acceso o decisión del negocio

| Pendiente | Por qué no puedo hacerlo yo |
|---|---|
| Foto propia de desayunos → `/images/desayunosSorpresaMedellin.webp` | La landing usa `banner-anchetas.webp` como provisional |
| Precios exactos por tramo de desayuno | Hoy la landing publica solo el rango real ($55.000–$190.000) para no inventar cifras |
| Fase 2 completa: GBP, reseñas, Bing Places, Apple Business Connect, citaciones | Requieren credenciales y gestión externa |
| Decisión sobre ofrecer recordatorios/detalles de matrimonio (P5, 46 impresiones/mes) | Decisión de catálogo; no añadí el servicio al sitio sin confirmación |
| Colección Amor y Amistad (septiembre) | Productos en Sanity |

---

## 1. Resumen ejecutivo

El sitio pasó de ser **invisible** (3 clics/mes en febrero) a un **crecimiento sostenido real**: 144 clics y 2.279 impresiones en julio. La inflexión ocurrió a mediados de junio de 2026, consistente con la maduración de la auditoría SEO e indexación de las landings locales creadas en mayo. **El motor funciona; ahora el problema es de escala y de captura.**

Los tres hallazgos más importantes:

1. **La página de bodas está atrapada en la página 2 de Google.** `decoracion-bodas-medellin` es la 3.ª página con más impresiones (782) pero tiene la peor posición media (12,66). La consulta con más impresiones de todo el sitio — *"arreglos para bodas medellín"*, 204 impresiones — genera **0 clics** porque el sitio aparece en posición 20. Ahí hay más demanda desperdiciada que en cualquier otro punto del sitio.

2. **La huella de impresiones es minúscula frente a la demanda real.** *"desayunos sorpresa"* — uno de los términos de mayor volumen del nicho — muestra al sitio en posición 1,67 con CTR del 66%… pero solo 3 impresiones en 12 meses. Google confía en el sitio para ese término pero casi nunca lo muestra, porque **no existe una landing dedicada a desayunos sorpresa**. Es la página que falta más rentable de construir.

3. **El sitio ya aparece en búsquedas conversacionales de IA.** Consultas como *"cual es el contacto"*, *"dame valores"*, *"necesito mas opciones"*, *"necesito telefono"*, *"gemini"* y *"si"* son prompts de seguimiento de Google AI Mode/Gemini donde el sitio fue citado. La inversión en llms.txt y schema ya está dando señales medibles; hay que capitalizarla.

**Métricas globales del período:** 261 clics · 4.351 impresiones · CTR 6,00% · posición media ~7,9.
**Últimos 30 días vs. 30 anteriores:** clics +74% (88 → 153), impresiones +61% (1.473 → 2.377). Momentum claramente positivo.

---

## 2. Análisis archivo por archivo

### 2.1 `Filtros.csv` — Contexto del export

| Filtro | Valor |
|---|---|
| Tipo de búsqueda | Web |
| Fecha | Últimos 12 meses |

**Implicaciones:** El export **no incluye** búsqueda por Imágenes ni por Noticias, y GSC **anonimiza las consultas poco frecuentes**: las consultas visibles suman ~41 clics de los 261 totales (≈16%). El **84% de los clics viene de long-tail que Google no muestra** — señal de que el sitio captura muchas búsquedas hiperespecíficas ("ancheta con peluche y globos medellín", etc.). Esto refuerza la estrategia de contenido de cola larga más abajo.

Dato revelador: aunque el filtro pide 12 meses, **los datos solo empiezan el 2026-02-08**. Antes de febrero de 2026 el sitio no tenía presencia medible en Google. Todo lo logrado tiene ~6 meses de vida — el dominio aún está construyendo autoridad.

### 2.2 `Gráfico.csv` — Tendencia temporal (182 días)

Agregado mensual calculado a partir del CSV diario:

| Mes | Clics | Impresiones | CTR | Posición media (ponderada) |
|---|---|---|---|---|
| 2026-02 | 3 | 46 | 6,52% | 5,8 |
| 2026-03 | 3 | 68 | 4,41% | 5,5 |
| 2026-04 | 4 | 128 | 3,12% | 5,7 |
| 2026-05 | 6 | 199 | 3,02% | 7,4 |
| 2026-06 | 58 | 945 | 6,14% | 7,2 |
| 2026-07 | **144** | **2.279** | 6,32% | 8,1 |
| 2026-08 (7 días) | 43 | 686 | 6,27% | 9,8 |

**Lecturas:**

- **La inflexión es el 9–10 de junio de 2026.** Hasta el 8 de junio el sitio promediaba <10 impresiones/día; desde el 10 de junio salta a 30–120/día. Esto es el patrón clásico de "Google terminó de evaluar el contenido nuevo": las landings locales de mayo entraron en rotación plena tras ~4 semanas de periodo de prueba. **No fue suerte — fue la auditoría de mayo surtiendo efecto.**
- **Agosto proyecta ~184 clics y ~2.940 impresiones** si mantiene el ritmo de los primeros 7 días. Sería el mejor mes histórico.
- **La posición media "empeora" (7,2 → 8,1 → 9,8) mientras las impresiones crecen. Esto NO es una caída.** Es expansión de huella: Google está probando el sitio en consultas nuevas donde entra en posiciones 10–20 (bodas, arreglos, recordatorios). La posición media baja por dilución matemática, no porque las consultas ganadoras hayan caído. La métrica a vigilar es la posición **por consulta clave**, no la global.
- **Patrón semanal:** los picos de clics caen en lunes–miércoles (21-jul: 10 clics; 5-ago: 10). Coherente con compras de regalos/refrigerios empresariales planificadas entre semana. Útil para programar publicaciones de GBP y contenido los domingos/lunes.
- El 2026-08-07 (último día) muestra 1 clic con 86 impresiones — dato parcial típico del retraso de GSC, no una caída real.

### 2.3 `Consultas.csv` — 110 consultas visibles

Agrupadas por clúster de intención (análisis propio):

#### Clúster A — Marca (problema serio de captura)

| Consulta | Clics | Impr. | CTR | Posición |
|---|---|---|---|---|
| creaciones vane | 13 | 83 | 15,66% | **4,45** |
| creaciones | 0 | 63 | 0% | 8,86 |
| vane | 0 | 22 | 0% | 10,86 |
| ancheticas con amor medellin | 0 | 45 | 0% | 8,73 |
| cotillon creaciones vane | 0 | 9 | 0% | 28,67 |
| vaneessences / vane art / t-uvanevane / creasiones / creciones | 0 | 24 | 0% | 2,4–11 |

**Error detectado:** El sitio está en **posición 4,45 para su propia marca**. Un negocio debe estar en posición 1 para su nombre exacto, con CTR de 40–60% (aquí: 15,66%). **Causas probables:** (a) existen otros negocios/perfiles llamados "Creaciones Vane" (hay "creaciones vane" en otras ciudades y perfiles sociales homónimos) que compiten en el SERP de marca; (b) el perfil de Google Business Profile y las redes propias (Instagram `@complice_que_endulza`, TikTok `@creacionesvane01`, Facebook `creaciones2927`) usan **handles que no contienen "Creaciones Vane"**, debilitando la entidad de marca ante Google; (c) el dominio tiene solo 6 meses de señales. Nota: *"ancheticas con amor medellin"* (45 impresiones) parece ser la marca de un **competidor** por cuya búsqueda Google muestra a Creaciones Vane — oportunidad de captura competitiva, no un error.

#### Clúster B — Anchetas (el caballo de batalla, funcionando)

| Consulta | Clics | Impr. | CTR | Posición |
|---|---|---|---|---|
| anchetas medellín domicilio | 2 | 35 | 5,71% | 9,14 |
| anchetas en medellin | 1 | 24 | 4,17% | 9,83 |
| anchetas medellin | 2 | 14 | 14,29% | 18,57* |
| anchetas medellín | 2 | 11 | 18,18% | 9,73 |
| anchetas de cumpleaños medellín a domicilio | 1 | 18 | 5,56% | 8,33 |
| anchetas en medellin a domicilio | 0 | 27 | 0% | 8,85 |
| anchetas a domicilio | 0 | 22 | 0% | 18,59 |
| anchetas de cumpleaños medellin | 0 | 12 | 0% | 9,08 |
| anchetas personalizadas | 0 | 7 | 0% | 10,57 |

*\*La posición 18,57 con CTR 14,29% en "anchetas medellin" indica posiciones volátiles: a veces top 10 (donde consigue los clics), a veces página 2.*

**Diagnóstico:** El clúster funciona pero está **estancado en posiciones 8–10**: la parte baja de la página 1, justo debajo del map pack y de competidores consolidados. El salto de posición 9 → 4 multiplicaría el CTR por ~3–4x. Lo que falta no es on-page (ya está bien) sino **autoridad y señales locales**: reseñas GBP, citaciones y enlaces locales.

#### Clúster C — Refrigerios (mejor conversión del sitio)

| Consulta | Clics | Impr. | CTR | Posición |
|---|---|---|---|---|
| refrigerios para eventos | 5 | 116 | 4,31% | 4,45 |
| refrigerios empresariales | 0 | 63 | 0% | 8,22 |
| refrigerios medellin | 1 | 7 | 14,29% | 31 |
| refrigerios empresariales medellin | 1 | 3 | 33,33% | 17 |
| refrigerios para fiestas infantiles | 1 | 5 | 20% | 4,6 |
| cajas para refrigerios / cajas de refrigerios / caja de refrigerio | 1 | 15 | ~7% | 1–8 |
| refrigerios para eventos empresariales / para empresas / para reuniones / para capacitaciones | 0 | 11 | 0% | 1–2,25 |
| refrigerios para eventos precios / económicos | 0 | 2 | 0% | 6–12 |

**Diagnóstico:** *"refrigerios para eventos"* (116 impresiones, posición 4,45) es la **2.ª consulta más mostrada del sitio** y solo captura el 4,31%. En posición 4–5 el CTR esperado es 7–12%: hay un **déficit de CTR** — el título/descripción no destaca en el SERP frente a competidores que muestran precios. Además, hay múltiples consultas en **posición 1–2,25 con 0 clics** ("refrigerios para eventos empresariales", "refrigerios para capacitaciones") — posiciones ganadoras con volumen bajo pero intención de compra altísima; el clúster necesita **más superficie de contenido** (precios, guías) para multiplicar sus impresiones.

#### Clúster D — Bodas (la mayor fuga de demanda del sitio)

| Consulta | Clics | Impr. | CTR | Posición |
|---|---|---|---|---|
| **arreglos para bodas medellín** | **0** | **204** | **0%** | **20,08** |
| arreglos para bodas envigado | 0 | 55 | 0% | 20,33 |
| listas de boda medellín | 0 | 54 | 0% | 7,78 |
| recordatorios matrimonio medellín | 0 | 46 | 0% | 21,76 |
| invitaciones matrimonio medellín | 0 | 27 | 0% | 16,81 |
| decoracion bodas | 1 | 1 | 100% | 4 |
| decoradores de bodas | 0 | 14 | 0% | 28 |
| bodas medellin / bodas en medellin / recepciones para bodas medellín | 0 | 4 | 0% | 26–44 |

**Diagnóstico — el hallazgo más valioso del análisis:** Este clúster acumula **~405 impresiones con 1 clic**. Dos problemas distintos:

1. **Problema de posición:** *"arreglos para bodas medellín"* (204 impr., posición 20) es la consulta con más impresiones de TODO el sitio. La página `decoracion-bodas-medellin` está optimizada para "decoración de bodas" pero Google la asocia débilmente con "arreglos para bodas". El contenido actual no tiene una sección que hable explícitamente de "arreglos" (centros de mesa, arreglos florales, arreglos del altar). Subir de posición 20 → 5–8 en esta consulta vale por sí solo **15–25 clics/mes** de intención comercial pura.
2. **Problema de intención (intent mismatch):** *"listas de boda"* (54 impr., posición 7,78, 0 clics), *"recordatorios matrimonio"* (46 impr.) e *"invitaciones matrimonio"* (27 impr.) son servicios que **Creaciones Vane no ofrece** (o no comunica). Google muestra la página por proximidad semántica, el usuario ve que no es lo que busca y no hace clic. Dos caminos: ofrecer recordatorios/detalles para matrimonio como línea de producto (encaja con el negocio de detalles) y capturar esa demanda, o aceptar esas impresiones como ruido. **Recomendación: capturarla — recordatorios de matrimonio es un producto natural para este negocio.**

#### Clúster E — Desayunos sorpresa (posición ganada, cero visibilidad)

| Consulta | Clics | Impr. | CTR | Posición |
|---|---|---|---|---|
| desayunos sorpresa | 2 | 3 | 66,67% | **1,67** |
| desayunos sorpresas en medellín | 1 | 1 | 100% | 1 |
| desayunos sorpresa medellin | 0 | 3 | 0% | 1 |
| desayuno sorpresa / cerca de mi / desayunos medellin domicilio | 0 | 4 | 0% | 1–2 |
| desayunos empresariales medellin | 0 | 1 | 0% | 22 |

**Diagnóstico:** Posiciones 1–2 y CTR excelente, pero **solo ~12 impresiones en 12 meses** para un término cuyo volumen real en Medellín es de cientos de búsquedas mensuales. La razón: **no existe una URL dedicada** — el término lo atiende parcialmente `/creaciones-vane` (catálogo general). Google solo muestra el sitio en variantes muy exactas. Una landing `/desayunos-sorpresa-medellin` con la misma calidad que la de anchetas desbloquearía la franja completa de consultas ("desayuno sorpresa novia", "desayuno sorpresa cumpleaños medellín", "desayuno sorpresa a domicilio", etc.). **Es la página nueva con mejor relación esfuerzo/retorno de todo el plan.**

#### Clúster F — Decoración general y primera comunión

| Consulta | Clics | Impr. | CTR | Posición |
|---|---|---|---|---|
| decoraciones medellin | 2 | 11 | 18,18% | 8,91 |
| decoracion cumpleaños medellin | 1 | 5 | 20% | 9,6 |
| decoracion primera comunion | 0 | 14 | 0% | 5,64 |
| decoración/decoraciones primera comunión (variantes) | 0 | 7 | 0% | 4–8,5 |
| adornos/regalos/accesorios/paquetes primera comunión | 0 | 11 | 0% | 5,33–11 |
| decoradores de fiestas medellín / decoración fiestas medellín | 0 | 6 | 0% | 9–9,5 |
| baby shower medellin | 0 | 2 | 0% | 7 |
| decoraciones con globos / tienda de globos cerca de mi / balloon decoration near me | 0 | 4 | 0% | 1–5 |

**Diagnóstico:** Primera comunión rankea top 5–8 con 0 clics — el CSV es de temporada baja (las comuniones pican en mayo–junio y el sitio recién despegó en junio; la landing se creó tarde para la temporada 2026). **La temporada 2027 (búsquedas desde febrero–marzo) es la cita clave** — la página ya está posicionada para capitalizarla. "Decoración cumpleaños medellín" aparece sin landing dedicada — candidata a página nueva (menor prioridad que desayunos). Nótese *"balloon decoration near me"* y otras consultas en inglés: hay demanda de expatriados/turistas en El Poblado sin atender.

#### Clúster G — Consultas conversacionales / IA (señal estratégica)

| Consulta | Impr. | Posición |
|---|---|---|
| cual es el contacto | 1 (1 clic) | 2 |
| necesito mas opciones / dame más opciones | 2 | 1–3 |
| dame valores | 1 | 2 |
| necesito telefono | 1 | 4 |
| si | 1 | 12 |
| gemini | 1 | 19 |
| pictures | 1 | 6 |

**Diagnóstico:** Estas no son búsquedas normales: son **prompts de seguimiento dentro de Google AI Mode/Gemini**. Alguien preguntó por anchetas o decoración en el chat de IA, la IA le mostró Creaciones Vane, y el usuario siguió preguntando "dame valores", "necesito telefono" — y el sitio siguió siendo citado. **El sitio ya es fuente de respuestas de IA en Google.** Esto valida la inversión en llms.txt + schema y justifica la fase GEO del plan (sección 6). También implica algo práctico: el sitio debe responder "contacto", "precios" y "opciones" de forma extraíble e inmediata (lo hace parcialmente; se puede reforzar).

### 2.4 `Páginas.csv` — Rendimiento por URL

| Página | Clics | Impr. | CTR | Posición | Lectura |
|---|---|---|---|---|---|
| /anchetas-medellin-domicilio | 73 | 1.121 | 6,51% | 7,50 | Motor principal. Estancada en pos. 7–8, necesita autoridad. |
| /refrigerios-empresariales-medellin | 49 | 597 | 8,21% | **5,12** | La mejor página: mejor posición y 2.º mejor CTR. Modelo a replicar. |
| /decoracion-bodas-medellin | 32 | 782 | **4,09%** | **12,66** | Atrapada en pág. 2. Máxima prioridad de rescate. |
| / (home) | 31 | 781 | 3,97% | 5,95 | **CTR deficitario**: en pos. ~6 debería capturar 6–9%. Título/meta del SERP de marca a revisar. |
| /refrigerios | 30 | 380 | 7,89% | 7,07 | Sana. Canibaliza levemente con la empresarial (ver §3). |
| /decoraciones | 24 | 406 | 5,91% | 9,35 | Hub genérico, correcto. |
| /creaciones-vane | 15 | 415 | 3,61% | 7,80 | Catálogo; absorbe las búsquedas de desayunos sin ser landing de eso. |
| /decoracion-primera-comunion-medellin | 8 | 187 | 4,28% | 7,09 | Estacional; lista para temporada 2027. |
| http://creacionesvane.com/ | 0 | 15 | 0% | 2,93 | **Versión http indexada** — verificar redirect 301 y propiedad GSC. |
| /producto/* (7 URLs) | **0** | 47 | 0% | 6,25–8 | **Todo el catálogo de productos: 0 clics.** Títulos/fichas no compiten en SERP. |
| /images/refrigeriosEmpresariales.webp | 0 | 1 | 0% | 13 | Imagen indexada como página; ruido menor. |

**Hallazgos adicionales:**

- **Concentración de riesgo:** las 4 primeras URLs concentran el 71% de los clics. Sano por ahora, pero el sitio no tiene ninguna página informacional (blog) generando superficie de impresiones — el TODO del blog en `sitemap.ts` sigue sin ejecutarse y es la palanca de crecimiento de huella más importante que queda.
- **Productos invisibles:** 7 fichas de producto suman 47 impresiones y 0 clics pese a posiciones 6–8. Sus impresiones son tan bajas porque solo aparecen en búsquedas ultraespecíficas; sus títulos ("Jardín de Gala Explosión de Girasoles") son nombres creativos **sin keyword + ciudad** ("ancheta de girasoles Medellín"), así que no rankean para nada buscable. Los "Fragmentos de productos" (§2.7) demuestran que el schema Product funciona — lo que falla es el naming/SEO de las fichas.
- **http:// con 15 impresiones y posición 2,93:** o falta un 301 a nivel de servidor/DNS o Google conserva memoria histórica. Verificar en Vercel que http→https redirige con 301 (no 307/308 encadenados) y que la propiedad de dominio en GSC cubre ambos protocolos.

### 2.5 `Dispositivos.csv`

| Dispositivo | Clics | Impr. | CTR | Posición |
|---|---|---|---|---|
| Móviles | 174 (67%) | 2.829 (65%) | 6,15% | 7,68 |
| Ordenador | 86 (33%) | 1.474 (34%) | 5,83% | 8,35 |
| Tablet | 1 | 48 | 2,08% | 15,6 |

**Lectura:** Negocio mobile-first confirmado (67% de clics). CTR y posición móviles son *mejores* que en desktop — la optimización de rendimiento móvil de mayo (score 64 → mejoras LCP/TBT) está alineada con donde ocurre el negocio. El CTR desktop 5,83% sugiere que las búsquedas de escritorio son más corporativas (refrigerios empresariales desde oficinas) — coherente con el pico de clics lunes–miércoles. No hay acción correctiva necesaria aquí; solo mantener el presupuesto de rendimiento móvil.

### 2.6 `Países.csv`

| País | Clics | Impr. | CTR | Posición |
|---|---|---|---|---|
| Colombia | 230 (88%) | 3.626 (83%) | 6,34% | 8,23 |
| Estados Unidos | 11 | 351 | 3,13% | 6,79 |
| España | 8 | 83 | 9,64% | 7,41 |
| Otros (43 países) | 12 | ~290 | — | — |

**Lectura:** El 88% de los clics es de Colombia — correcto para un negocio local. Pero hay una señal de negocio infrautilizada: **EE. UU. genera 351 impresiones y 11 clics, y España 83 impresiones con el mejor CTR del reporte (9,64%)**. Es el patrón clásico de la **diáspora colombiana comprando regalos para familiares en Medellín** — un segmento con ticket alto y cero fricción de precio. El sitio no tiene ningún mensaje para este comprador ("¿Estás fuera de Colombia? Envía una ancheta a tu familia en Medellín — pagas por transferencia internacional/tarjeta"). Es contenido de una sección, no un proyecto.

### 2.7 `Aparición en búsquedas.csv`

| Apariencia | Clics | Impr. | CTR | Posición |
|---|---|---|---|---|
| Fragmentos de productos | 19 | 362 | 5,25% | 7,96 |

**Lectura:** El schema Product (con Offer, shipping y return policy) está generando rich results reales: el 7,3% de los clics del sitio llega vía fragmentos de producto. Es la validación de que Google lee y premia el structured data del sitio. Ausencias notables: no aparecen **FAQ rich results** ni **reseñas con estrellas** — las estrellas requieren `aggregateRating` con reseñas reales (correctamente omitido hasta tener fuente verificable: esto se desbloquea con la estrategia de reseñas GBP de la fase 2).

---

## 3. Diagnóstico consolidado: errores, causas y evidencia

| # | Problema | Evidencia | Causa probable | Gravedad |
|---|---|---|---|---|
| P1 | Bodas atrapada en página 2 | Pos. 12,66 de la página; "arreglos para bodas medellín" 204 impr./0 clics en pos. 20 | Contenido no cubre semánticamente "arreglos" (centros de mesa, arreglos florales, altar); competidores del nicho bodas (floristerías, wedding planners) tienen más autoridad temática | **Crítica** |
| P2 | Sin landing de desayunos sorpresa | Pos. 1–1,67 con solo ~12 impr. en el clúster | La URL que responde es el catálogo general; Google no tiene página que expandir a las variantes del término | **Crítica** |
| P3 | Marca en posición 4,45 | "creaciones vane" 83 impr., CTR 15,66% | Entidad de marca débil: 6 meses de historia, homónimos, handles sociales que no dicen "Creaciones Vane", posible GBP sin optimizar | **Alta** |
| P4 | Estancamiento generalizado en pos. 7–10 | Anchetas 8–10, refrigerios 8,22, decoraciones 9,35 | Déficit de señales off-page: reseñas, citaciones locales, enlaces locales. El on-page ya no es el cuello de botella | **Alta** |
| P5 | Intent mismatch en bodas | "listas de boda" 54 impr., "recordatorios matrimonio" 46, "invitaciones" 27 — todo 0 clics | El sitio no ofrece (ni menciona) esos servicios; Google lo muestra por proximidad semántica | **Alta** (es también oportunidad de producto) |
| P6 | CTR de home deficitario | 3,97% en posición 5,95 (esperado: 6–9%) | Título largo genérico en el SERP; sin sitelinks consolidados; sin estrellas de reseñas | **Media** |
| P7 | Catálogo de productos invisible | 7 fichas: 47 impr., 0 clics | Nombres creativos sin keyword+ciudad; sin enlazado interno fuerte desde las landings | **Media** |
| P8 | Déficit de CTR en "refrigerios para eventos" | 4,31% en pos. 4,45 (esperado 7–12%) | Meta description sin precio ancla ("desde COP 5.000") ni diferenciales visibles en SERP | **Media** |
| P9 | Versión http indexada | 15 impr. en `http://` | Redirect o memoria de índice; verificar 301 en Vercel | **Baja** |
| P10 | Cero superficie informacional | 0 páginas de blog; consultas informacionales ("precios", "económicos", "catering para…") con impresiones mínimas | Blog planificado en `sitemap.ts` pero nunca ejecutado | **Alta** (limita el techo de crecimiento) |
| P11 | Diáspora sin atender | EE. UU. 351 impr., España CTR 9,64% | Sin mensaje ni flujo de compra internacional | **Media** |

### Lo que ya está bien (no tocar)

- **Arquitectura de landings locales** (una URL por servicio+ciudad): es el factor #1 de SEO local orgánico según Whitespark 2026, y ya está implementado y funcionando (`refrigerios-empresariales-medellin` en pos. 5,12 lo demuestra).
- **Schema JSON-LD**: Organization+LocalBusiness canónico con `@id` referenciado, Product con shipping/returns (generando rich results), FAQPage, BreadcrumbList. Correctamente sin `aggregateRating` sintético.
- **llms.txt** conforme a llmstxt.org con NAP, precios, cobertura y FAQ — ya rinde frutos (clúster G).
- **Rendimiento móvil** optimizado donde está el 67% del negocio.
- **Canonicals, OG, geo-tags, sitemap dinámico** con prioridades calibradas.

---

## 4. Potencial cuantificado (estimaciones propias)

Basado en curvas CTR estándar (pos. 1: ~28%, pos. 3: ~11%, pos. 5: ~7%, pos. 8: ~3%, pos. 15+: <1%) aplicadas a las impresiones ya observadas — es decir, **sin asumir demanda nueva, solo capturando mejor la actual**:

| Acción | Situación actual | Escenario a 90 días | Clics/mes incrementales |
|---|---|---|---|
| Rescate bodas ("arreglos…" pos. 20 → 6–8) | 0 clics / ~34 impr. mes | 4–6% CTR sobre impresiones crecientes | +8–15 |
| Landing desayunos sorpresa (nueva) | ~1 impr./mes visible | posicionamiento 3–8 en 5–10 variantes | +15–30 |
| Anchetas pos. 8 → 5 (reseñas+citaciones) | ~10 clics/mes | CTR 6,5% → 9–10% | +6–10 |
| CTR home + refrigerios (metas con precio) | CTR 4,0–4,3% | CTR 6–8% | +5–8 |
| Recordatorios/detalles matrimonio (nueva sección) | 0 clics / ~11 impr. mes | captura parcial | +3–6 |
| Blog (4–6 artículos, cola larga) | 0 | crecimiento compuesto | +10–25 (a 90 días) |

**Proyección conservadora:** de ~150 clics/mes (hoy) a **300–380 clics/mes en 90 días** y **500+ en 6 meses** si se ejecuta el plan completo incluida la temporada de primera comunión 2027. Cada clic aquí es un lead de WhatsApp potencial con ticket de COP 50.000–650.000.

---

## 5. Hoja de ruta paso a paso

Ordenada por impacto/esfuerzo. Cada acción indica **qué**, **dónde**, **cómo** y **cómo se mide el éxito**.

### FASE 0 — Quick wins técnicos (Semana 1, ~1 día de trabajo)

**0.1. Verificar y cerrar la variante http.**
- Comprobar `curl -I http://creacionesvane.com/` → debe devolver `301` directo a `https://creacionesvane.com/`.
- En GSC, confirmar que la propiedad es de tipo **Dominio** (cubre http/https/www). Si es de prefijo URL, añadir la propiedad de dominio.
- Éxito: la fila `http://` desaparece del reporte de páginas en 4–8 semanas.

**0.2. Declarar explícitamente los crawlers de IA en `public/robots.txt`.**
Hoy el `User-agent: *` ya los permite, pero la declaración explícita elimina ambigüedad y es señal de intención. Añadir antes del bloque de bots bloqueados:

```
# ===== CRAWLERS DE IA — Visibilidad en ChatGPT, Claude, Perplexity =====
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /
```
- Nota: la directiva `Host:` actual solo la lee Yandex (inofensiva, puede quedarse). `Crawl-delay` es ignorada por Google (también inofensiva).

**0.3. Alta en Bing Webmaster Tools + IndexNow.**
- Bing alimenta a **ChatGPT, Copilot y Alexa**. Importar la propiedad desde GSC (un clic), enviar el sitemap.
- Activar IndexNow (Next.js: ping a `api.indexnow.org` en cada publicación, o vía el panel de Bing).
- Éxito: sitio indexado en Bing en <2 semanas; aparición en respuestas de Copilot/ChatGPT con búsqueda web.

**0.4. Metas con precio ancla para subir CTR (P6, P8).**
- `/refrigerios-empresariales-medellin` y `/refrigerios`: incluir en la meta description "desde COP 5.000 por persona · mínimo 10 unidades · factura electrónica".
- Home: title del SERP más corto y diferenciado: `Creaciones Vane 🎁 Anchetas y Desayunos Sorpresa Medellín | Entrega Hoy` (probar sin emoji si la marca prefiere sobriedad; medir).
- Éxito: CTR de home >5,5% y de refrigerios >7% en 6 semanas (comparar en GSC mismo rango).

**0.5. Renombrar SEO de fichas de producto (P7).**
- Patrón: `<title>` = "Nombre creativo — Ancheta [tipo] a Domicilio en Medellín | Creaciones Vane". Ej.: "Jardín de Gala — Ancheta de Girasoles a Domicilio en Medellín".
- Mantener el nombre creativo visible en la página (h1 puede seguir siendo el creativo; el title y la meta cambian).
- Añadir desde cada landing un bloque "Los más pedidos" enlazando 3–4 productos con anchor descriptivo ("ancheta de rosas y Baileys").
- Éxito: primeras fichas con clics en 8 semanas.

### FASE 1 — Rescate de bodas + landing de desayunos (Semanas 2–4)

**1.1. Rescatar `decoracion-bodas-medellin` (P1) — la acción individual más valiosa.**
- Añadir una sección H2 **"Arreglos para bodas en Medellín"** con contenido real: centros de mesa, arreglos del altar/ceremonia, arreglos con flores naturales vs. artificiales, arreglos para la mesa principal. 300–500 palabras, fotos propias con alt descriptivo, precios orientativos.
- Añadir H2 "Arreglos y decoración para bodas en Envigado y el sur del Valle de Aburrá" (captura las 55 impresiones de "arreglos para bodas envigado" — sin crear página doorway, es una sección con información de cobertura y adicional de transporte que ya existe en llms.txt).
- FAQ nuevas: "¿Cuánto cuestan los arreglos para una boda en Medellín?", "¿Hacen solo los arreglos o toda la decoración?" (con respuestas de 40–60 palabras, extraíbles por IA).
- Enlazado interno: desde home y desde `/decoraciones` con anchors "arreglos para bodas en Medellín" (hoy el anchor probable es solo "decoración de bodas").
- Actualizar llms.txt con la nueva sección.
- Éxito: "arreglos para bodas medellín" de pos. 20 a <10 en 8 semanas; página de pos. 12,66 a <9.

**1.2. Crear `/desayunos-sorpresa-medellin` (P2).**
- Replicar la estructura de la landing de anchetas (la plantilla ganadora): paquetes con precios (COP 55.000–190.000 según llms.txt), zonas de entrega el mismo día, proceso por WhatsApp, galería, FAQ, BreadcrumbList + Service schema + FAQPage.
- Variantes semánticas a cubrir en H2/contenido: desayuno sorpresa para novia/novio, cumpleaños, aniversario, día de la madre, a domicilio, empresarial.
- Añadir al sitemap con priority 0.85, a llms.txt, y enlazar desde home (sección hero/categorías), desde `/creaciones-vane` y desde la landing de anchetas ("¿Prefieres un desayuno sorpresa?").
- **Canonicalización de intención:** en `/creaciones-vane`, el título debe dejar de competir por "desayunos sorpresa" como término principal para que la nueva landing lo herede sin canibalización.
- Éxito: 50+ impresiones/mes del clúster desayunos en 6 semanas; top 5 en "desayunos sorpresa medellín" en 10 semanas.

**1.3. Decidir y ejecutar sobre el clúster matrimonio (P5).**
- Decisión de negocio (recomendada: sí): ofrecer **recordatorios y detalles para matrimonio** (encaja con capacidad actual de detalles/anchetas).
- Si sí: sección en la landing de bodas "Recordatorios y detalles para matrimonio en Medellín" + productos en Sanity + FAQ. Si no: no hacer nada (las impresiones sin clic no penalizan).
- Éxito: primeras conversiones de "recordatorios matrimonio medellín" (46 impr./mes esperando).

### FASE 2 — Autoridad local: reseñas, GBP y citaciones (Semanas 3–8, en paralelo)

Esto ataca P3 y P4 — el estancamiento en posiciones 7–10 **no se resuelve con más on-page**, se resuelve con señales externas. Según Whitespark 2026: GBP = 32% del peso del local pack, reseñas ~20%.

**2.1. Google Business Profile (requiere acceso al perfil; no verificable desde los CSV).**
- Categoría principal: "Tienda de regalos" (o "Servicio de cestas de regalo" si disponible); secundarias (hasta 4): Decorador, Servicio de catering, Tienda de globos, Servicio de desayunos.
- Nombre del perfil EXACTO: "Creaciones Vane" (sin keywords añadidas — riesgo de suspensión).
- Productos cargados en GBP con precios (se muestran en el perfil), fotos semanales (los perfiles con fotos reciben 45% más solicitudes de indicaciones), publicaciones 1×/semana (novedades, temporadas).
- Enlace del sitio en GBP: usar la **home**, no la landing más fuerte (Sterling Sky: enlazar la página más fuerte puede suprimir su ranking orgánico).
- URL con UTM: `https://creacionesvane.com/?utm_source=gbp&utm_medium=organic` para medir en GA4.
- **Vincular el perfil en `sameAs`** del organizationSchema una vez confirmado su URL público (hoy solo está el maps.app.goo.gl como `hasMap`).

**2.2. Sistema de reseñas con cadencia (la regla de los 18 días).**
- Sterling Sky documenta caída de rankings tras ~3 semanas sin reseñas nuevas. Meta: **2–4 reseñas/mes, sostenidas**, no 20 en una semana.
- Mecánica: mensaje de WhatsApp post-entrega (el canal ya existe y es el flujo natural del negocio) con el enlace corto de reseña de Google + QR en las tarjetas que acompañan anchetas/desayunos. **Nunca filtrar por satisfacción antes de pedir la reseña** (prohibido por Google y multable por normas de consumo).
- Responder el 100% de las reseñas (88% de consumidores prefiere negocios que responden).
- Al llegar a 10+ reseñas reales: añadir `aggregateRating` al LocalBusiness schema con los datos reales de GBP → desbloquea estrellas en el SERP → sube CTR de todas las páginas (ataca P6 estructuralmente).
- Éxito: 10 reseñas en 90 días; estrellas visibles en SERP de marca.

**2.3. Citaciones NAP (consistencia exacta con `lib/business.ts`).**
- Tier 1 Colombia: Cívico Medellín, Páginas Amarillas de Colombia (paginasamarillas.com.co), Fenalco Antioquia (si aplica membresía), Computrabajo/empresa no aplica — sustituir por directorios de eventos: **Matrimonio.com.co** (crítico para el clúster bodas — es el marketplace dominante de bodas en Colombia y rankea top 3 para casi todo "bodas medellín"), Zankyou, guías locales de eventos.
- Tier 1 global que alimenta IA: **Bing Places** (fuente de ChatGPT/Copilot), **Apple Business Connect** (uso duplicado al 27%), Facebook page actualizada, Foursquare/Data Axle.
- NAP idéntico en todos: "Creaciones Vane · Carrera 50 #120-13, Barrio Pablo VI, Medellín · +57 312 8235654".
- Éxito: 8–12 citaciones consistentes en 60 días.

**2.4. Enlaces locales (5–10/trimestre, calidad sobre cantidad).**
- Perfil en Matrimonio.com.co con enlace (doble valor: cita + lead gen del clúster bodas).
- Colaboraciones con venues/salones de eventos de Medellín (intercambio de recomendación con enlace), blogs locales de "planes en Medellín", prensa local (El Colombiano/Vivir en El Poblado publican notas de emprendimiento — un pitch de historia: "la emprendedora detrás de las anchetas que…").
- Listas "mejores anchetas/desayunos sorpresa en Medellín": identificar las que ya rankean y solicitar inclusión — **estar en listas "best of" es el factor #1 de visibilidad en IA** (Whitespark 2026).

### FASE 3 — Superficie de contenido: blog y cola larga (Semanas 6–12)

Ataca P10. El sitio captura 84% de sus clics de long-tail anonimizada **sin tener contenido editorial** — con blog, esa cola se multiplica. Activar el bloque `/blog/[categoria]/[slug]` ya previsto en `sitemap.ts`.

Artículos priorizados por evidencia en los CSV (no por intuición):

1. **"¿Cuánto cuestan los refrigerios para eventos en Medellín? Guía de precios 2026"** — evidencia: "refrigerios para eventos precios", "refrigerios economicos para eventos", y el clúster C entero. Tabla de precios por tipo de caja (extraíble por IA), mínimos, anticipación.
2. **"Refrigerios para capacitaciones y reuniones empresariales: qué incluir"** — evidencia: 4 consultas en posición 1–2,25 con 0 clics por falta de superficie.
3. **"Ideas de desayuno sorpresa en Medellín: 15 opciones según la ocasión"** — apoya la nueva landing (1.2) con enlazado interno.
4. **"Decoración de primera comunión: guía completa + checklist"** — publicar en enero–febrero 2027, antes de temporada (evidencia: clúster F estacional).
5. **"Arreglos para bodas: precios y tendencias en Medellín 2026"** — apoya el rescate de bodas (1.1).
6. **"Catering para fiestas infantiles en Medellín"** — evidencia: "catering para fiestas infantiles", "fun food catering", "catering for kids", "refrigerios para fiestas infantiles" (20% CTR).

Formato de cada artículo (optimizado para IA a la vez que para Google): respuesta directa en las primeras 40–60 palabras, H2 en forma de pregunta, párrafos de 2–4 frases, una tabla de datos/precios, FAQ final, fecha de publicación y actualización visibles, autora con nombre real (E-E-A-T), 2–5 enlaces internos a landings/productos.

- Cadencia: 2 artículos/mes (sostenible > ambicioso).
- Éxito: +300 impresiones/mes por artículo maduro (mes 3 de vida); las landings comerciales reciben autoridad temática interna.

**3.1. Sección diáspora (P11, esfuerzo mínimo).**
- Bloque en home + FAQ: "¿Estás fuera de Colombia? Envía regalos a tu familia en Medellín" — métodos de pago internacionales, proceso por WhatsApp, fotos de la entrega como confirmación (ya se ofrece "foto de la entrega" según llms.txt — es el argumento perfecto para este segmento).
- Evidencia: 351 impr. EE. UU. + mejor CTR del reporte en España (9,64%).

### FASE 4 — GEO: dominar las búsquedas de IA (Semanas 6–12, en paralelo)

El sitio ya aparece en respuestas de IA (clúster G). Plan para consolidarlo, por plataforma:

**4.1. Google AI Overviews / AI Mode (ya hay tracción).**
- El 92% de las citas de AI Overviews sale del top 10 tradicional → **las fases 1–3 son también la estrategia de AIO**. No hay atajo separado.
- Reforzar respuestas extraíbles: cada landing debe tener un bloque de 40–60 palabras que responda "qué, cuánto, dónde, cómo pedir" de forma autocontenida (patrón que ya premió al sitio con las consultas conversacionales).
- Mantener llms.txt actualizado con cada cambio de precios/páginas (ya es el hábito correcto; formalizarlo como checklist de cada deploy).

**4.2. ChatGPT / Copilot (vía Bing).**
- ChatGPT NO lee Google Business Profile; se alimenta de **Bing, Yelp, TripAdvisor, BBB y Reddit**. Acciones: Bing Places (fase 0.3), perfil de Facebook/Instagram actualizados (Bing los indexa), y las citaciones de fase 2.3.
- Prueba mensual manual: preguntar a ChatGPT/Copilot "¿dónde pido una ancheta a domicilio en Medellín?" y documentar si aparece la marca (baseline hoy, medir evolución).

**4.3. Perplexity (vía Reddit y comunidad).**
- Perplexity cita Reddit en ~47% de respuestas locales. En r/medellin y r/Colombia aparecen hilos recurrentes de "regalos a domicilio", "desayunos sorpresa", "decoración de eventos". Participación **orgánica y transparente** (responder como el negocio cuando alguien pregunta, sin spam) o mediante clientes satisfechos que mencionen la marca. Una mención útil en un hilo bien posicionado vale meses de citas de IA.

**4.4. Señal de marca multimedia (correlación más fuerte con citas de IA: YouTube ~0,737).**
- El negocio ya produce el contenido (TikTok de montajes) — republicar como **YouTube Shorts** con títulos buscables ("Decoración de boda en Medellín — montaje completo", "Así entregamos un desayuno sorpresa en El Poblado"). Coste marginal ~0; crea la señal de entidad que los LLM ponderan más.
- Unificar la entidad: bio de Instagram/TikTok/Facebook debe decir "Creaciones Vane" textualmente (los handles actuales no lo dicen — ataca P3), enlazar el sitio en todas, y añadir todos los perfiles a `sameAs` en `lib/business.ts`.

**4.5. Contenido con datos propios únicos (citabilidad).**
- Los LLM citan datos que no existen en otra parte. Publicar 1–2 piezas con datos propios: "Precios reales de decoración de eventos en Medellín 2026 (datos de 200+ eventos)" o "Las 10 anchetas más pedidas en Medellín este año". Nadie más tiene estos datos; toda IA que responda sobre el tema tendrá que citar la fuente.

### FASE 5 — Preparación de temporadas (calendario permanente)

| Temporada | Búsquedas pican | Preparar desde | Activo |
|---|---|---|---|
| Amor y Amistad (sept) | ago–sept | **YA (agosto)** | Landing anchetas + productos temáticos + posts GBP |
| Navidad/anchetas navideñas | oct–dic | septiembre | Productos + artículo "anchetas navideñas empresariales" |
| Día de la Madre | abr–may | marzo | Desayunos sorpresa + anchetas |
| Primera comunión 2027 | feb–jun | enero | Landing existente + artículo guía + fotos frescas |
| Bodas (todo el año, pico dic–ene) | — | continuo | Fase 1.1 |

Amor y Amistad 2026 es **el mes próximo**: el pico comercial de anchetas más grande del semestre. Publicar la colección temática y los posts GBP en agosto es la acción estacional más urgente del plan.

---

## 6. KPIs y cadencia de medición

| KPI | Baseline (hoy) | 90 días | 180 días |
|---|---|---|---|
| Clics orgánicos/mes | ~150 | 300–380 | 500+ |
| Impresiones/mes | ~2.400 | 5.000 | 9.000 |
| Posición "creaciones vane" | 4,45 | ≤2 | 1 |
| Posición "arreglos para bodas medellín" | 20,08 | ≤10 | ≤6 |
| Posición media clúster anchetas | 8–10 | 6–7 | 4–5 |
| Clúster desayunos: impresiones/mes | ~1 | 50+ | 200+ |
| Reseñas Google | ? (verificar) | 10+ | 25+ |
| Citaciones NAP consistentes | ? | 8–12 | 15+ |
| Aparición en ChatGPT/Perplexity (test manual mensual) | baseline agosto | citado en 1+ plataforma | citado consistentemente |
| Leads WhatsApp desde orgánico (GA4 `generate_lead`) | medir ahora | +80% | +200% |

**Cadencia:** revisión GSC quincenal (consultas nuevas + posiciones de las 8 consultas KPI), export mensual comparable a este, test de IA mensual (mismas 5 preguntas a ChatGPT, Perplexity y Gemini, documentando si citan la marca).

---

## 7. Qué NO hacer (riesgos)

1. **No crear páginas doorway por barrio/municipio** ("anchetas envigado", "anchetas sabaneta"…) con contenido intercambiable. El helper `geoLandingMetadata` existe en el código — usarlo solo si cada página tendrá >60% contenido único (testimonios de la zona, fotos de entregas reales allí, cobertura/tarifas específicas). Un HVAC en EE. UU. perdió 80% de rankings por este patrón (Core Update marzo 2024). Con secciones de cobertura dentro de las landings actuales basta por ahora.
2. **No añadir `aggregateRating` sin reseñas verificables** — el comentario en `seo.ts` ya lo advierte correctamente. Primero las reseñas reales de GBP, luego el schema.
3. **No comprar enlaces ni reseñas, no incentivar reseñas con descuentos** — para un negocio local pequeño una penalización de Google es letal, y la cadencia natural (2–4/mes) rankea mejor que un pico artificial.
4. **No añadir keywords al nombre del GBP** ("Creaciones Vane Anchetas Medellín") — motivo #1 de suspensión de perfiles.
5. **No sobre-optimizar las landings ganadoras** — `/refrigerios-empresariales-medellin` (pos. 5,12) está funcionando; los cambios ahí se limitan a la meta description (0.4). Reescrituras profundas de páginas que rankean = riesgo innecesario.
6. **No dividir "refrigerios" en más páginas** — `/refrigerios` y `/refrigerios-empresariales-medellin` ya se reparten el clúster sin conflicto grave (intención distinta: general vs. empresarial). Una tercera página sí canibalizaría.

---

## 8. Limitaciones de este análisis

- Los CSV no incluyen datos de **Google Business Profile** (impresiones de Maps, llamadas, solicitudes de ruta) — el local pack es probablemente ~50% de la oportunidad local total y aquí no es visible. Verificar GBP Insights directamente.
- No incluyen **búsqueda de imágenes** (relevante para decoración, donde la gente busca visualmente) ni datos de **Discover**.
- GSC anonimiza ~84% de los clics por consulta — los clústeres reales son mayores de lo que muestran las tablas.
- No hay datos de competidores (posiciones relativas de Matrimonio.com.co, floristerías, otros ancheteros) — un análisis SERP en vivo los añadiría.
- La posición media de GSC es un promedio de todas las apariciones; posiciones individuales fluctúan por hora, ubicación del usuario y dispositivo.
- No se auditó aquí el estado en vivo del GBP, Bing Places ni citaciones existentes (requieren acceso o crawling externo).

---

## Apéndice: resumen de acciones por semana

| Semana | Acciones |
|---|---|
| 1 | 0.1 http→301 · 0.2 robots.txt IA · 0.3 Bing+IndexNow · 0.4 metas con precio · Colección Amor y Amistad (¡septiembre está encima!) |
| 2 | 0.5 SEO fichas producto · 1.1 sección "Arreglos para bodas" · auditoría GBP (categorías, fotos, productos) |
| 3 | 1.2 landing `/desayunos-sorpresa-medellin` · 2.2 arranque sistema de reseñas (WhatsApp + QR) |
| 4 | 1.3 recordatorios matrimonio · 2.3 citaciones tier 1 (Bing Places, Apple, Matrimonio.com.co, Cívico) |
| 5–6 | 3.x primer artículo (precios refrigerios) · 3.1 sección diáspora · 4.4 YouTube Shorts + unificación de bios |
| 7–8 | Segundo artículo · 2.4 outreach enlaces locales · 4.2/4.3 baseline de pruebas en IA |
| 9–12 | 2 artículos más · seguimiento posiciones bodas/desayunos · ajuste de metas según CTR observado · export GSC comparativo |

---

*Informe generado a partir del análisis de los 7 CSV del export de GSC del 2026-08-09, cruzado con el código fuente del sitio (layout.tsx, seo.ts, sitemap.ts, robots.txt, llms.txt) y criterios de las skills seo-local (Whitespark/BrightLocal 2026) y seo-geo (Ahrefs/Seer 2025-2026).*
