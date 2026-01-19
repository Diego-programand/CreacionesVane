# 🌸 Creaciones Vane - Landing Page

Landing page tipo portafolio para **Creaciones Vane**, empresa colombiana con 3 líneas de negocio:
- 💝 **Creaciones Vane**: Detalles de amor (anchetas, desayunos sorpresa, cajas de dulces)
- 🍱 **Refrigerios Vane**: Refrigerios para eventos y fiestas
- 🎈 **Decoraciones Vane**: Decoración profesional de eventos

## 🚀 Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Optimización de imágenes**: Next.js Image
- **Fuentes**: Google Fonts (Pacifico, Poppins)

## 📋 Estado Actual: PROTOTIPO

Este es un **prototipo funcional** con:
- ✅ Datos mockeados (imágenes de Unsplash)
- ✅ Diseño responsive completo
- ✅ 4 páginas navegables
- ✅ Botón WhatsApp flotante
- ✅ Paleta de colores de la marca

## 🎨 Estructura de Páginas

```
/                    → Landing principal (hero + servicios + destacados)
/creaciones-vane     → Catálogo detalles de amor (6 productos)
/refrigerios         → Catálogo refrigerios (6 productos)
/decoraciones        → Catálogo decoraciones (6 productos)
```

## 🛠️ Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+ instalado
- npm o yarn

### Instalación

```bash
# Clonar repositorio (si está en Git)
git clone [url-del-repo]
cd creaciones-vane

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📱 Contacto

- **WhatsApp**: +57 312 823 5654
- **Ubicación**: Medellín, Colombia

## 📁 Estructura del Proyecto

```
creaciones-vane/
├── app/
│   ├── components/          # Componentes React reutilizables
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── WhatsAppButton.tsx
│   │   └── ProductCard.tsx
│   ├── data/
│   │   └── mockData.ts      # Datos temporales del prototipo
│   ├── creaciones-vane/     # Página catálogo detalles
│   │   └── page.tsx
│   ├── refrigerios/         # Página catálogo refrigerios
│   │   └── page.tsx
│   ├── decoraciones/        # Página catálogo decoraciones
│   │   └── page.tsx
│   ├── globals.css          # Estilos globales + Tailwind
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Home/Landing
├── public/
│   ├── logo.png             # Logo circular de la marca
│   └── banner-pattern.png   # Banner con patrón de corazones
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎨 Paleta de Colores

```css
primary: #D81B60      /* Fucsia principal */
primary-light: #F48FB1  /* Rosa claro */
primary-dark: #AD1457   /* Fucsia oscuro */
secondary: #EC407A      /* Rosa intermedio */
secondary-light: #F8BBD0 /* Rosa pastel */
```

## 🔜 Próximos Pasos (Producción)

1. **Integración CMS Sanity**
   - Crear esquemas de productos
   - Configurar Sanity Studio
   - Conectar con API de Sanity

2. **Contenido Real**
   - Reemplazar imágenes mock con fotos reales
   - Agregar productos reales (20-30 por categoría)
   - Subir imágenes al CDN de Sanity

3. **Deploy**
   - Subir a Vercel
   - Configurar dominio personalizado
   - Configurar variables de entorno

4. **Capacitación**
   - Entrenar a administradora en Sanity Studio
   - Documentar flujo de trabajo

## 📝 Notas de Desarrollo

- Las imágenes actuales son de Unsplash (solo para prototipo)
- Los precios son referenciales
- El número de WhatsApp está activo
- Diseño optimizado para mobile-first

## 👨‍💻 Desarrollador

Proyecto desarrollado por Diego
- Especialidad: Laravel, PHP, MySQL
- Explorando: Next.js, Sanity CMS, Headless Architecture

---

**Creaciones Vane** - Desde 2019 endulzando momentos especiales 💝
