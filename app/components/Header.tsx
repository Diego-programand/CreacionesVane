'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-primary-100"
    >
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* GIF en móvil (izquierda) */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="lg:hidden"
          >
            <Image
              src="/videos/cat-kiss.gif"
              alt="Cat kiss"
              width={45}
              height={45}
              className=""
              unoptimized
            />
          </motion.div>

          {/* Logo (centro en móvil, izquierda en desktop) */}
          <Link href="/" className="flex items-center gap-3 group lg:flex-1">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="relative"
            >
              <Image 
                src="/logo.png" 
                alt="Creaciones Vane" 
                width={55} 
                height={55}
                className="rounded-full transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute -top-1 -right-1 text-lg opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-opacity">
                💗
              </div>
            </motion.div>
            <div className="hidden sm:flex items-center gap-3">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <h1 className="font-script text-2xl text-primary-600 group-hover:text-primary-700 transition-colors">
                  Creaciones Vane
                </h1>
                <p className="text-xs text-primary-800 font-script">Cómplice que endulza</p>
              </motion.div>
              {/* Separador y GIF en Desktop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="hidden lg:flex items-center gap-3"
              >
                <div className="h-10 w-px bg-primary-300"></div>
                <Image
                  src="/videos/cat-kiss.gif"
                  alt="Cat kiss"
                  width={40}
                  height={40}
                  className=""
                  unoptimized
                />
              </motion.div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="hidden lg:flex items-center gap-8"
          >
            <Link 
              href="/" 
              className={`relative transition-colors font-medium py-2 group ${
                isActive('/') 
                  ? 'text-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Inicio
              <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-600 transition-all duration-300 ${
                isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              href="/creaciones-vane" 
              className={`relative transition-colors font-medium py-2 group ${
                isActive('/creaciones-vane') 
                  ? 'text-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Detalles
              <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-600 transition-all duration-300 ${
                isActive('/creaciones-vane') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              href="/refrigerios" 
              className={`relative transition-colors font-medium py-2 group ${
                isActive('/refrigerios') 
                  ? 'text-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Refrigerios
              <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-600 transition-all duration-300 ${
                isActive('/refrigerios') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              href="/decoraciones" 
              className={`relative transition-colors font-medium py-2 group ${
                isActive('/decoraciones') 
                  ? 'text-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Decoraciones
              <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-600 transition-all duration-300 ${
                isActive('/decoraciones') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>

            <a
              href="https://wa.me/573128235654?text=¡Hola!%20Quiero%20conocer%20más%20sobre%20sus%20servicios%20💝"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="hidden xl:inline">Contáctanos</span>
              <span className="xl:hidden">Chat</span>
            </a>
          </motion.div>

          {/* Mobile Menu Button (derecha) */}
          <motion.button 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative text-primary-600 p-2 hover:bg-primary-50 rounded-lg transition-colors"
            aria-label="Menu"
          >
            <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
            {menuOpen && (
              <div className="absolute -top-2 -right-2 animate-ping">
                <span className="text-xs">💕</span>
              </div>
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mt-4 relative h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent overflow-hidden">
            <div 
              className={`absolute inset-0 bg-gradient-to-r from-transparent via-primary-600 to-transparent transition-transform duration-700 ${
                menuOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            ></div>
          </div>

          <div className="pb-4 pt-4 space-y-1">
            <div className="relative">
              {menuOpen && (
                <>
                  <span className="absolute top-0 left-[10%] text-xl animate-[fall_2s_ease-in_infinite] opacity-60">💗</span>
                  <span className="absolute top-0 left-[30%] text-lg animate-[fall_2.5s_ease-in_infinite_0.3s] opacity-50">💕</span>
                  <span className="absolute top-0 left-[50%] text-xl animate-[fall_2.2s_ease-in_infinite_0.5s] opacity-70">💖</span>
                  <span className="absolute top-0 left-[70%] text-lg animate-[fall_2.8s_ease-in_infinite_0.2s] opacity-60">💗</span>
                  <span className="absolute top-0 left-[90%] text-xl animate-[fall_2.4s_ease-in_infinite_0.7s] opacity-50">💗</span>
                </>
              )}
            </div>

            <Link 
              href="/" 
              onClick={() => setMenuOpen(false)}
              className={`block transition-all font-medium py-3 px-4 rounded-lg transform hover:translate-x-2 duration-300 ${
                isActive('/') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-primary-400">🏠</span>
                Inicio
              </span>
            </Link>
            <Link 
              href="/creaciones-vane" 
              onClick={() => setMenuOpen(false)}
              className={`block transition-all font-medium py-3 px-4 rounded-lg transform hover:translate-x-2 duration-300 ${
                isActive('/creaciones-vane') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-primary-400">💝</span>
                Detalles de Amor
              </span>
            </Link>
            <Link 
              href="/refrigerios" 
              onClick={() => setMenuOpen(false)}
              className={`block transition-all font-medium py-3 px-4 rounded-lg transform hover:translate-x-2 duration-300 ${
                isActive('/refrigerios') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-primary-400">🍱</span>
                Refrigerios
              </span>
            </Link>
            <Link 
              href="/decoraciones" 
              onClick={() => setMenuOpen(false)}
              className={`block transition-all font-medium py-3 px-4 rounded-lg transform hover:translate-x-2 duration-300 ${
                isActive('/decoraciones') 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-primary-400">🎈</span>
                Decoraciones
              </span>
            </Link>

            <a
              href="https://wa.me/573128235654?text=¡Hola!%20Quiero%20conocer%20más%20sobre%20sus%20servicios%20💝"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg mt-4 mx-4"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contáctanos por WhatsApp
            </a>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(300px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </motion.header>
  );
}