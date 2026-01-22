import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- PALETA EXISTENTE PARA DETALLES E INICIO (Mauvelous) ---
        primary: {
          50: '#fff1f4',
          100: '#ffe4ea',
          200: '#fecdda',
          300: '#fd96b2',
          400: '#fb7199',
          500: '#f53e79',
          600: '#e21c65',
          700: '#bf1156',
          800: '#9f124e',
          900: '#881348',
          950: '#4c0524',
          DEFAULT: '#e21c65',
        },
        'primary-light': '#fb7199',
        'primary-dark': '#bf1156',
        secondary: {
          DEFAULT: '#f53e79',
          light: '#fecdda',
        },

        // --- NUEVA PALETA (Refrigerios Vane) ---
        // Generada a partir del naranja #E87C24 del logo
        vane: {
          50: '#fff7ed',
          100: '#ffeed5',
          200: '#ffd9aa',
          300: '#ffbc75',
          400: '#fc933c',
          500: '#e87c24', // Color exacto del logo (Naranja)
          600: '#d95d16',
          700: '#b44514',
          800: '#8f3817',
          900: '#732f16',
          950: '#3e150a',
          DEFAULT: '#e87c24',
          // Colores complementarios del logo
          cream: '#F9F7F2',
          bread: '#D99C52',
          green: '#92BC4C',
          red: '#D14B33',
        },

        // --- NUEVA PALETA (Decoraciones Vane) ---
        decoraciones: {
          purple: {
            light: '#FFD1DC', // Globos rosa claro
            DEFAULT: '#800080', // Color del texto principal (Fucsia oscuro)
            border: '#FF85A2', // Borde circular del logo
          },
          blue: {
            light: '#A0E7E5', // Globo cian claro
            DEFAULT: '#00B4D8', // Globo azul brillante
          },
          yellow: {
            DEFAULT: '#FFD633', // Globo amarillo
            soft: '#FFEC99',
          },
          green: {
            DEFAULT: '#95E06C', // Globo verde lima
          },
          lila: {
            DEFAULT: '#B39DDB', // Globo lila
          },
          // Color de fondo para tarjetas de esta sección
          surface: '#FFF9FB',
        },

        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        // MODIFICACIÓN AQUÍ:
        // Usamos las variables CSS que definiste en el layout.tsx
        sans: ['var(--font-poppins)', 'sans-serif'],
        script: ['var(--font-pacifico)', 'cursive'],
      },
    },
  },
  plugins: [],
} satisfies Config;