// app/components/ProductModal.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Watermark from './WaterMark';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, MessageCircle, Calendar, User, Info, ZoomIn } from 'lucide-react';
import { useModal } from '@/app/context/ModalContext';
import { opcionesPersonalizablesPorCategoria } from '@/app/data/mockData';


export default function ProductModal() {
    const { selectedProduct, closeModal } = useModal();
    const [formData, setFormData] = useState({ nombre: '', fecha: '' });
    const [step, setStep] = useState<'details' | 'form'>('details');
    const [imageFullscreen, setImageFullscreen] = useState(false); // 🔥 NUEVO

    // 🔒 PREVENIR SCROLL DEL BODY
    useEffect(() => {
        if (selectedProduct) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '0px';
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        };
    }, [selectedProduct]);

    const handleWhatsApp = (e: React.FormEvent) => {
        e.preventDefault();
        const baseMessage = `¡Hola Creaciones Vane! 👋%0A%0AMe interesa este servicio:%0A*${selectedProduct?.nombre}*%0A%0A*Mis Datos:*%0A👤 Nombre: ${formData.nombre}%0A📅 Fecha deseada: ${formData.fecha}`;
        window.open(`https://wa.me/573128235654?text=${baseMessage}`, '_blank');
        closeModal();
    };

    const handleClose = () => {
        setStep('details');
        setFormData({ nombre: '', fecha: '' });
        closeModal();
    };

    // 🔥 ABRIR IMAGEN EN FULLSCREEN (SOLO MÓVIL)
    const handleImageClick = () => {
        if (window.innerWidth < 768) { // Solo en móvil
            setImageFullscreen(true);
        }
    };

    // 🎨 OBTENER OPCIONES SEGÚN CATEGORÍA
    const opcionesPersonalizables = selectedProduct
        ? opcionesPersonalizablesPorCategoria[selectedProduct.categoria]
        : [];

    return (
        <>
            {/* 🖼️ VISOR DE IMAGEN FULLSCREEN CON MARCA DE AGUA */}
            <AnimatePresence>
                {imageFullscreen && selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
                        onClick={() => setImageFullscreen(false)}
                    >
                        {/* Botón cerrar */}
                        <button
                            onClick={() => setImageFullscreen(false)}
                            className="absolute top-4 right-4 z-[210] bg-white/20 backdrop-blur-md p-3 rounded-full text-white"
                            aria-label="Cerrar vista de imagen"
                        >
                            <X size={28} strokeWidth={2.5} />
                        </button>

                        {/* Contenedor de imagen con marca de agua en Fullscreen */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            <Image
                                src={selectedProduct.imagen}
                                alt={selectedProduct.nombre}
                                fill
                                className="object-contain"
                                priority
                            />

                            {/* USANDO EL MISMO COMPONENTE MODULAR AQUÍ TAMBIÉN */}
                            <Watermark text="CreacionesVane" showCenter={true} />

                            {/* Instrucción de cerrar */}
                            <div className="absolute bottom-8 left-0 right-0 text-center text-white/70 text-sm">
                                Toca para cerrar
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MODAL PRINCIPAL */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-0 md:p-6"
                        onClick={handleClose}
                        onWheel={(e) => e.stopPropagation()}
                        onTouchMove={(e) => e.stopPropagation()}
                    >
                        {/* Botón de cerrar para escritorio (fuera del modal) */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:scale-110 transition-transform hidden md:block z-[110]"
                            aria-label="Cerrar modal"
                        >
                            <X size={40} strokeWidth={2.5} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-white w-full h-full md:h-[90vh] md:w-[95vw] lg:w-[85vw] md:max-w-5xl md:max-h-[650px] md:rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                            onWheel={(e) => e.stopPropagation()}
                        >
                            {/* Botón de cerrar para móvil */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 z-50 bg-black/40 backdrop-blur-sm p-2.5 rounded-full text-white md:hidden hover:bg-black/60 transition-colors"
                                aria-label="Cerrar modal"
                            >
                                <X size={24} strokeWidth={2.5} />
                            </button>
                            {/* COLUMNA IZQUIERDA: Imagen con marca de agua fija */}
                            <div
                                className="w-full md:w-1/2 h-80 md:h-full relative flex-shrink-0 group cursor-pointer md:cursor-default bg-gray-100 overflow-hidden"
                                onClick={handleImageClick}
                            >
                                <Image
                                    src={selectedProduct.imagen}
                                    alt={selectedProduct.nombre}
                                    fill
                                    className="object-cover md:object-contain xl:object-cover bg-gray-100 group-hover:scale-105 transition-transform duration-700"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />

                                {/* USANDO EL COMPONENTE MODULAR */}
                                <Watermark />

                            </div>

                            {/* COLUMNA DERECHA: Contenido con scroll controlado */}
                            <div
                                className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto flex flex-col"
                                onTouchStart={(e) => e.stopPropagation()}
                            >
                                <AnimatePresence mode="wait">
                                    {step === 'details' ? (
                                        <motion.div
                                            key="details"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <span className="hidden md:inline-block bg-primary-100 text-primary-700 px-3 py-1.5 rounded-full text-xs font-bold mb-4 uppercase">
                                                {selectedProduct.categoria}
                                            </span>
                                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
                                                {selectedProduct.nombre}
                                            </h2>
                                            <p className="text-2xl md:text-3xl font-bold text-primary-600 mb-6 italic">
                                                $ {selectedProduct.precio.toLocaleString('es-CO')}
                                                {selectedProduct.categoria === 'Refrigerios' && (
                                                    <span className="text-base md:text-lg font-normal text-gray-500 ml-2">
                                                        por unidad
                                                    </span>
                                                )}
                                            </p>

                                            <div className="space-y-6">
                                                <section>
                                                    <h4 className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
                                                        <Info size={16} /> Sobre este {selectedProduct.categoria === 'Refrigerios' ? 'refrigerio' : 'producto'}
                                                    </h4>
                                                    <p className="text-gray-700 leading-relaxed text-base md:text-lg border-l-4 border-primary-200 pl-4">
                                                        {selectedProduct.descripcion}
                                                    </p>
                                                </section>

                                                {/* 🎨 OPCIONES PERSONALIZABLES DINÁMICAS */}
                                                {opcionesPersonalizables.length > 0 && (
                                                    <section>
                                                        <h4 className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
                                                            <CheckCircle size={16} /> Lo que puedes personalizar
                                                        </h4>
                                                        <ul className="grid grid-cols-1 gap-2.5">
                                                            {opcionesPersonalizables.map((item, i) => (
                                                                <li key={i} className="flex items-start gap-2.5 text-gray-600 text-sm md:text-base">
                                                                    <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 flex-shrink-0" />
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </section>
                                                )}
                                            </div>

                                            <button
                                                onClick={() => setStep('form')}
                                                className="mt-8 w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-bold text-base md:text-lg shadow-lg shadow-primary-200 transition-all active:scale-95 flex items-center justify-center gap-3"
                                            >
                                                {selectedProduct.categoria === 'Refrigerios' ? 'Cotizar Ahora' : 'Comprar Ahora'}
                                                <MessageCircle size={20} />
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="form"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <button
                                                onClick={() => setStep('details')}
                                                className="text-primary-600 font-bold mb-6 flex items-center gap-2 hover:gap-3 transition-all"
                                            >
                                                ← Volver a detalles
                                            </button>
                                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                                Datos para tu {selectedProduct.categoria === 'Refrigerios' ? 'cotización' : 'pedido'}
                                            </h3>
                                            <p className="text-gray-500 mb-8 text-sm md:text-base">
                                                Vane necesita esta información para confirmarte disponibilidad.
                                            </p>

                                            <form onSubmit={handleWhatsApp} className="space-y-6">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                                        <User size={18} className="text-primary-500" /> ¿A nombre de quién?
                                                    </label>
                                                    <input
                                                        required
                                                        type="text"
                                                        value={formData.nombre}
                                                        className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-primary-500 rounded-xl outline-none transition-all"
                                                        placeholder="Tu nombre completo"
                                                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                                        <Calendar size={18} className="text-primary-500" /> ¿Para qué fecha?
                                                    </label>
                                                    <input
                                                        required
                                                        type="date"
                                                        value={formData.fecha}
                                                        className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-primary-500 rounded-xl outline-none transition-all"
                                                        onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95"
                                                >
                                                    Confirmar en WhatsApp <MessageCircle size={22} />
                                                </button>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}