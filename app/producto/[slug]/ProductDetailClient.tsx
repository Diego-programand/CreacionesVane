'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Product } from '@/app/lib/sanity.types';
import { opcionesPersonalizablesPorCategoria } from '@/app/data/constants';
import Watermark from '@/app/components/WaterMark';
import {
  CheckCircle,
  MessageCircle,
  Calendar,
  User,
  Info,
  ArrowLeft,
  ShieldCheck,
  Lock,
  Sparkles,
  ZoomIn,
  X,
} from 'lucide-react';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({ nombre: '', fecha: '' });
  const [step, setStep] = useState<'details' | 'form'>('details');
  const [imageFullscreen, setImageFullscreen] = useState(false);

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const baseMessage = `¡Hola Creaciones Vane! 👋%0A%0AMe interesa este servicio:%0A*${product.nombre}*%0A%0A*Mis Datos:*%0A👤 Nombre: ${formData.nombre}%0A📅 Fecha deseada: ${formData.fecha}%0A🖼️ Ref: ${window.location.href}`;
    window.open(`https://wa.me/573128235654?text=${baseMessage}`, '_blank');
  };

  const handleImageClick = () => {
    if (window.innerWidth < 768) {
      setImageFullscreen(true);
    }
  };

  // 🎨 Colores dinámicos por categoría (replica ProductModal)
  const getColors = () => {
    switch (product.categoria) {
      case 'Detalles':
        return {
          badge: 'bg-primary-100 text-primary-700',
          badgeBorder: 'border-primary-200',
          price: 'text-primary-600',
          accent: 'text-primary-500',
          button: 'bg-primary-600 hover:bg-primary-700',
          buttonShadow: 'shadow-primary-200',
          focus: 'focus:border-primary-500',
          icon: 'text-primary-500',
          glow: 'from-primary-400 to-primary-600',
        };
      case 'Refrigerios':
        return {
          badge: 'bg-vane-100 text-vane-700',
          badgeBorder: 'border-vane-200',
          price: 'text-vane-600',
          accent: 'text-vane-500',
          button: 'bg-vane-500 hover:bg-vane-600',
          buttonShadow: 'shadow-vane-200',
          focus: 'focus:border-vane-500',
          icon: 'text-vane-500',
          glow: 'from-vane-400 to-vane-600',
        };
      case 'Decoraciones':
        return {
          badge: 'bg-decoraciones-purple/10 text-decoraciones-purple',
          badgeBorder: 'border-decoraciones-purple/20',
          price: 'text-decoraciones-purple',
          accent: 'text-decoraciones-purple',
          button: 'bg-decoraciones-purple hover:bg-decoraciones-purple/90',
          buttonShadow: 'shadow-decoraciones-purple/20',
          focus: 'focus:border-decoraciones-purple',
          icon: 'text-decoraciones-purple',
          glow: 'from-decoraciones-purple/40 to-decoraciones-purple/60',
        };
      default:
        return {
          badge: 'bg-primary-100 text-primary-700',
          badgeBorder: 'border-primary-200',
          price: 'text-primary-600',
          accent: 'text-primary-500',
          button: 'bg-primary-600 hover:bg-primary-700',
          buttonShadow: 'shadow-primary-200',
          focus: 'focus:border-primary-500',
          icon: 'text-primary-500',
          glow: 'from-primary-400 to-primary-600',
        };
    }
  };

  const colors = getColors();
  const opcionesPersonalizables = opcionesPersonalizablesPorCategoria[product.categoria] ?? [];

  return (
    <>
      {/* 🖼️ VISOR FULLSCREEN MÓVIL CON PROTECCIÓN */}
      {imageFullscreen && (
        <div
          className="fixed inset-0 z-[200] bg-black flex items-center justify-center select-none"
          onClick={() => setImageFullscreen(false)}
        >
          <button
            onClick={() => setImageFullscreen(false)}
            className="absolute top-4 right-4 z-[210] bg-white/20 backdrop-blur-md p-3 rounded-full text-white"
          >
            <X size={28} />
          </button>
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={product.imagen}
              alt={product.nombre}
              fill
              className="object-contain pointer-events-none"
              priority
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
            <div
              className="absolute inset-0 z-[205]"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
            <Watermark text="CreacionesVane" showCenter={true} />
          </div>
        </div>
      )}

      <main className="min-h-screen bg-white pb-20">
        {/* Botón ← Volver */}
        <div className="container mx-auto px-4 pt-24 pb-2">
          <button
            onClick={() => router.back()}
            className={`flex items-center gap-2 ${colors.accent} font-bold text-sm group`}
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Volver al catálogo
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* COLUMNA IZQUIERDA: Imagen con protección anti-pirateo */}
            <div className="relative group">
              <div className={`absolute -inset-1 bg-gradient-to-r ${colors.glow} rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000`}></div>
              <div
                className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-2xl cursor-pointer select-none"
                onClick={handleImageClick}
              >
                <Image
                  src={product.imagen}
                  alt={`${product.nombre} en Medellín - Creaciones Vane`}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  priority
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
                {/* Capa de protección */}
                <div
                  className="absolute inset-0 z-[5]"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
                <Watermark />
                {/* Indicador zoom móvil */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white md:hidden flex items-center gap-2 z-10">
                  <ZoomIn size={14} />
                  <span className="text-[10px] font-bold">VER IMAGEN AMPLIADA</span>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: Contenido con flujo de 2 pasos */}
            <div className="flex flex-col">

              {step === 'details' ? (
                /* ═══════ PASO 1: DETALLES DEL PRODUCTO ═══════ */
                <div>
                  {/* Badge de categoría */}
                  <span className={`${colors.badge} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block`}>
                    {product.categoria}
                  </span>

                  <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-2">
                    {product.nombre}
                  </h1>

                  {/* Precio con color dinámico */}
                  <p className={`text-3xl font-bold ${colors.price} mb-6 italic`}>
                    $ {product.precio.toLocaleString('es-CO')}
                    {product.categoria === 'Refrigerios' && (
                      <span className="text-base font-normal text-gray-500 ml-2">
                        por unidad
                      </span>
                    )}
                  </p>

                  <div className="space-y-6 mb-8">
                    {/* Descripción */}
                    <section>
                      <h4 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                        <Info size={14} /> Sobre el servicio
                      </h4>
                      <p className={`text-gray-600 leading-relaxed border-l-2 ${colors.badgeBorder} pl-4`}>
                        {product.descripcion}
                      </p>
                    </section>

                    {/* Opciones personalizables (de constants.ts) */}
                    {opcionesPersonalizables.length > 0 && (
                      <section>
                        <h4 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                          <CheckCircle size={14} /> Tener en cuenta
                        </h4>
                        <ul className="grid grid-cols-1 gap-2">
                          {opcionesPersonalizables.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                              <div className={`w-1 h-1 ${colors.button.split(' ')[0]} rounded-full mt-2 flex-shrink-0`} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}
                  </div>

                  {/* Botón CTA → Ir al formulario */}
                  <button
                    onClick={() => setStep('form')}
                    className={`w-full ${colors.button} text-white py-4 rounded-xl font-bold shadow-lg ${colors.buttonShadow} transition-transform active:scale-95 flex items-center justify-center gap-3`}
                  >
                    {product.categoria === 'Refrigerios' ? 'Cotizar' : 'Comprar'} ahora
                    <MessageCircle size={20} />
                  </button>
                </div>
              ) : (
                /* ═══════ PASO 2: FORMULARIO DE CONTACTO ═══════ */
                <div className="flex flex-col">
                  {/* Botón volver a detalles */}
                  <button
                    onClick={() => setStep('details')}
                    className={`flex items-center gap-2 ${colors.accent} font-bold text-sm mb-6 group w-fit`}
                  >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Volver a detalles
                  </button>

                  <h3 className="text-2xl font-black text-gray-900 mb-2">
                    Ya casi está listo <Sparkles size={20} className={`${colors.accent} inline-block`} />
                  </h3>
                  <p className="text-gray-500 text-sm mb-8">
                    Vane necesita estos datos para confirmarte disponibilidad.
                  </p>

                  <form onSubmit={handleWhatsApp} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <User size={16} className={colors.icon} /> ¿A nombre de quién?
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.nombre}
                        placeholder="Tu nombre completo"
                        className={`w-full p-4 bg-gray-50 border border-gray-100 ${colors.focus} focus:bg-white rounded-xl outline-none transition-all shadow-sm`}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Calendar size={16} className={colors.icon} /> ¿Para qué fecha?
                      </label>
                      <input
                        required
                        type="date"
                        value={formData.fecha}
                        className={`w-full p-4 bg-gray-50 border border-gray-100 ${colors.focus} focus:bg-white rounded-xl outline-none transition-all shadow-sm`}
                        onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                      />
                    </div>

                    {/* Sección de seguridad */}
                    <div className="bg-green-50 border border-green-100 p-4 rounded-xl flex items-start gap-3 mt-4">
                      <ShieldCheck className="text-green-600 flex-shrink-0" size={20} />
                      <div>
                        <p className="text-green-800 text-xs font-bold uppercase tracking-tighter">Tu información es privada</p>
                        <p className="text-green-700 text-[11px] leading-tight mt-0.5">
                          Los datos ingresados solo se enviarán a nuestra cuenta de WhatsApp oficial para procesar tu pedido.
                        </p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-black rounded-xl shadow-xl shadow-green-100 transition-all flex items-center justify-center gap-3 active:scale-95 mt-4"
                    >
                      CONFIRMAR EN WHATSAPP <MessageCircle size={22} />
                    </button>

                    <div className="flex items-center justify-center gap-2 text-gray-400 py-4">
                      <Lock size={12} />
                      <span className="text-[10px] uppercase tracking-widest font-medium">Conexión Segura y Cifrada</span>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
