// app/components/ProductModal.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Watermark from './WaterMark';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, 
    CheckCircle, 
    MessageCircle, 
    Calendar, 
    User, 
    Info, 
    ZoomIn, 
    ArrowLeft, 
    ShieldCheck, 
    Lock ,
    Sparkles,
} from 'lucide-react';
import { useModal } from '@/app/context/ModalContext';
import { opcionesPersonalizablesPorCategoria } from '@/app/data/mockData';

export default function ProductModal() {
    const { selectedProduct, closeModal } = useModal();
    const [formData, setFormData] = useState({ nombre: '', fecha: '' });
    const [step, setStep] = useState<'details' | 'form'>('details');
    const [imageFullscreen, setImageFullscreen] = useState(false);
    
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [step]);

    useEffect(() => {
        if (selectedProduct) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
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

    const handleImageClick = () => {
        if (window.innerWidth < 768) {
            setImageFullscreen(true);
        }
    };

    // 🎨 OBTENER COLORES SEGÚN CATEGORÍA
    const getColors = () => {
        if (!selectedProduct) return {
            badge: 'bg-primary-100 text-primary-700',
            badgeBorder: 'border-primary-200',
            price: 'text-primary-600',
            accent: 'text-primary-500',
            button: 'bg-primary-600 hover:bg-primary-700',
            buttonShadow: 'shadow-primary-200',
            focus: 'focus:border-primary-500',
            icon: 'text-primary-500',
        };

        switch (selectedProduct.categoria) {
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
                };
        }
    };

    const colors = getColors();

    const opcionesPersonalizables = selectedProduct
        ? opcionesPersonalizablesPorCategoria[selectedProduct.categoria]
        : [];

    return (
        <>
            {/* 🖼️ VISOR DE IMAGEN FULLSCREEN (SOLO MÓVIL) */}
            <AnimatePresence>
                {imageFullscreen && selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
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
                                src={selectedProduct.imagen}
                                alt={selectedProduct.nombre}
                                fill
                                className="object-contain"
                                priority
                            />
                            <Watermark text="CreacionesVane" showCenter={true} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 🏁 MODAL PRINCIPAL */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-0 md:p-6"
                        onClick={handleClose}
                    >
                        {/* Botón cerrar escritorio */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-white hover:scale-110 transition-transform hidden md:block z-[110]"
                        >
                            <X size={40} strokeWidth={2.5} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-white w-full h-full md:h-[90vh] md:w-[95vw] lg:w-[85vw] md:max-w-5xl md:max-h-[650px] md:rounded-2xl overflow-hidden flex flex-col md:row shadow-2xl relative md:flex-row"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Botón cerrar móvil */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 z-50 bg-black/40 backdrop-blur-sm p-2.5 rounded-full text-white md:hidden"
                            >
                                <X size={20} strokeWidth={2.5} />
                            </button>

                            {/* COLUMNA IZQUIERDA: Imagen */}
                            <div
                                className="w-full md:w-1/2 h-72 md:h-full relative flex-shrink-0 bg-gray-100 overflow-hidden cursor-pointer"
                                onClick={handleImageClick}
                            >
                                <Image
                                    src={selectedProduct.imagen}
                                    alt={selectedProduct.nombre}
                                    fill
                                    className="object-cover md:object-contain xl:object-cover"
                                    priority
                                />
                                <Watermark />
                                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white md:hidden flex items-center gap-2">
                                    <ZoomIn size={14} />
                                    <span className="text-[10px] font-bold">VER IMAGEN AMPLIADA</span>
                                </div>
                            </div>

                            {/* COLUMNA DERECHA: Contenido con Scroll Controlado */}
                            <div
                                ref={scrollContainerRef}
                                className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto flex flex-col bg-white"
                            >
                                <AnimatePresence mode="wait">
                                    {step === 'details' ? (
                                        <motion.div
                                            key="details"
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {/* 🎨 Badge con color dinámico */}
                                            <span className={`${colors.badge} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block`}>
                                                {selectedProduct.categoria}
                                            </span>
                                            
                                            <h2 className="text-3xl font-black text-gray-900 leading-tight mb-2">
                                                {selectedProduct.nombre}
                                            </h2>
                                            
                                            {/* 🎨 Precio con color dinámico */}
                                            <p className={`text-3xl font-bold ${colors.price} mb-6 italic`}>
                                                $ {selectedProduct.precio.toLocaleString('es-CO')}
                                                {selectedProduct.categoria === 'Refrigerios' && (
                                                    <span className="text-base font-normal text-gray-500 ml-2">
                                                        por unidad
                                                    </span>
                                                )}
                                            </p>

                                            <div className="space-y-6 mb-8">
                                                <section>
                                                    <h4 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                                                        <Info size={14} /> Sobre el servicio
                                                    </h4>
                                                    {/* 🎨 Borde izquierdo con color dinámico */}
                                                    <p className={`text-gray-600 leading-relaxed border-l-2 ${colors.badgeBorder} pl-4`}>
                                                        {selectedProduct.descripcion}
                                                    </p>
                                                </section>

                                                {opcionesPersonalizables.length > 0 && (
                                                    <section>
                                                        <h4 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                                                            <CheckCircle size={14} /> Personalización
                                                        </h4>
                                                        <ul className="grid grid-cols-1 gap-2">
                                                            {opcionesPersonalizables.map((item, i) => (
                                                                <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                                                                    {/* 🎨 Bullet con color dinámico */}
                                                                    <div className={`w-1 h-1 ${colors.button.split(' ')[0]} rounded-full mt-2 flex-shrink-0`} />
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </section>
                                                )}
                                            </div>

                                            {/* 🎨 Botón con color dinámico */}
                                            <button
                                                onClick={() => setStep('form')}
                                                className={`w-full ${colors.button} text-white py-4 rounded-xl font-bold shadow-lg ${colors.buttonShadow} transition-transform active:scale-95 flex items-center justify-center gap-3`}
                                            >
                                                {selectedProduct.categoria === 'Refrigerios' ? 'Cotizar' : 'Comprar'} ahora
                                                <MessageCircle size={20} />
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="form"
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex flex-col"
                                        >
                                            {/* 🎨 Botón volver con color dinámico */}
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
                                                    {/* 🎨 Label con icono de color dinámico */}
                                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                                        <User size={16} className={colors.icon} /> ¿A nombre de quién?
                                                    </label>
                                                    {/* 🎨 Input con focus de color dinámico */}
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

                                                {/* SECCIÓN DE SEGURIDAD */}
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