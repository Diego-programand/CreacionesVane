'use client';

import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { productosMock } from '@/app/data/mockData';
import { CheckCircle, MessageCircle, Calendar, User, Info } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = productosMock.find((p) => p.id === id);

  const [formData, setFormData] = useState({ nombre: '', fecha: '' });
  const [showModal, setShowModal] = useState(false);

  if (!product) notFound();

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const baseMessage = `¡Hola Creaciones Vane! 👋%0A%0AMe interesa este servicio:%0A*${product.nombre}*%0A%0A*Mis Datos:*%0A👤 Nombre: ${formData.nombre}%0A📅 Fecha deseada: ${formData.fecha}%0A🖼️ Ref: ${window.location.href}`;
    
    window.open(`https://wa.me/573128235654?text=${baseMessage}`, '_blank');
    setShowModal(false);
  };

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="max-w-7xl mx-auto px-4 pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Lado Izquierdo: Visual (Boom!) */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-2xl">
              <Image
                src={product.imagen}
                alt={product.nombre}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>

          {/* Lado Derecho: Información */}
          <div className="flex flex-col">
            <nav className="flex mb-4 text-sm text-gray-500 gap-2">
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium">
                {product.categoria}
              </span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {product.nombre}
            </h1>

            <p className="text-3xl font-light text-primary-600 mb-8 italic">
              $ {product.precio.toLocaleString('es-CO')} COP
            </p>

            <div className="bg-primary-50 border-l-4 border-primary-500 p-6 mb-8 rounded-r-xl">
              <h3 className="font-bold text-primary-800 mb-2 flex items-center gap-2">
                <Info size={18} /> Descripción del Servicio
              </h3>
              <p className="text-gray-700 leading-relaxed italic">
                "{product.descripcion}"
              </p>
            </div>

            {/* Lista de Personalización según Servicio */}
            <div className="space-y-4 mb-10">
              <h4 className="font-bold text-gray-800 uppercase tracking-wider text-sm">Garantías de Creaciones Vane:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Personalización de colores',
                  'Tarjeta con mensaje impreso',
                  'Productos 100% frescos',
                  'Entrega garantizada en Medellín',
                  'Opción de añadir globos extra',
                  'Foto del resultado antes del envío'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                    <CheckCircle size={16} className="text-green-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="mt-auto w-full bg-primary-600 hover:bg-primary-700 text-white py-5 rounded-2xl font-bold text-xl shadow-xl hover:shadow-primary-200 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              <MessageCircle /> Agendar por WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* MODAL PROFESIONAL (POPUP) */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Casi listo!</h3>
            <p className="text-gray-500 mb-6">Completa estos datos para que Vane pueda atenderte personalmente.</p>
            
            <form onSubmit={handleWhatsApp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <User size={16}/> ¿Cómo es tu nombre?
                </label>
                <input
                  required
                  type="text"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Ej: Juan Pérez"
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <Calendar size={16}/> ¿Para qué fecha lo necesitas?
                </label>
                <input
                  required
                  type="date"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                  onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 text-gray-500 font-medium hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  Confirmar en WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}