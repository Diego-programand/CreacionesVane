
import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
    title: 'Términos y Condiciones | Creaciones Vane',
    description: 'Términos y condiciones de uso para los servicios y productos de Creaciones Vane en Medellín. Pedidos, entregas y política de cancelación.',
    alternates: { canonical: 'https://creacionesvane.com/terminos-y-condiciones' },
    robots: { index: false, follow: true },
};

export default function TerminosPage() {
    return (
        <>
        <Header />
        <main className="min-h-screen bg-neutral-50 pb-20">
            <div className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white py-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <svg width="100%" height="100%"><pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="currentColor" /></pattern><rect width="100%" height="100%" fill="url(#pattern)" /></svg>
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="font-script text-5xl md:text-6xl mb-4">Términos y Condiciones</h1>
                    <p className="text-primary-100 max-w-2xl mx-auto">
                        Por favor, lee detenidamente nuestras condiciones de servicio antes de realizar tu pedido.
                    </p>
                    <Link href="/" className="mt-4 inline-block bg-primary-100 text-primary-600 font-bold py-2 px-4 rounded-xl hover:bg-primary-700 hover:text-primary-100 transition-colors shadow-lg">
                        Volver a Inicio
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-10 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto prose prose-primary prose-lg">
                    <p className="lead text-gray-600">
                        Bienvenido a Creaciones Vane. Al acceder a nuestro sitio web y realizar pedidos, aceptas cumplir con los siguientes términos y condiciones. Estos términos se aplican a todos los visitantes, usuarios y otras personas que accedan o utilicen nuestros servicios.
                    </p>

                    <h2 className='text-primary-700 font-bold mt-8 mb-4 text-xl'>1. Información General</h2>
                    <p className='text-gray-600'>
                        Creaciones Vane es una empresa dedicada a la elaboración de detalles, desayunos sorpresa, decoraciones y refrigerios en la ciudad de Medellín, Colombia.
                        <br />
                        <strong>Ubicación:</strong> Cra. 50 #120-13, Medellín, Colombia.
                        <br />
                        <strong>Contacto:</strong> +57 312 8235654
                    </p>

                    <h2 className='text-primary-700 font-bold mt-8 mb-4 text-xl'>2. Pedidos y Reservas</h2>
                    <ul className='text-gray-600 list-disc pl-5 space-y-2'>
                        <li>Para garantizar la disponibilidad y calidad de nuestros productos, recomendamos realizar los pedidos con al menos <strong>2 a 3 días de anticipación</strong>.</li>
                        <li>En fechas especiales (Día de la Madre, Amor y Amistad, etc.), sugerimos reservar con mayor antelación debido a la alta demanda.</li>
                        <li>Los pedidos se confirman únicamente tras verificar el pago del anticipo o del valor total, según lo acordado.</li>
                    </ul>

                    <h2 className='text-primary-700 font-bold mt-8 mb-4 text-xl'>3. Precios y Pagos</h2>
                    <p className='text-gray-600'>
                        Todos los precios están expresados en pesos colombianos (COP). Nos reservamos el derecho de modificar los precios en cualquier momento sin previo aviso, aunque se respetarán los precios de los pedidos ya confirmados.
                    </p>
                    <p className='text-gray-600 mt-2'>
                        Aceptamos transferencias bancarias a través de Bancolombia, Nequi y pagos en efectivo (según disponibilidad).
                    </p>

                    <h2 className='text-primary-700 font-bold mt-8 mb-4 text-xl'>4. Entregas y Domicilios</h2>
                    <p className='text-gray-600'>
                        Realizamos entregas en el área metropolitana de Medellín. El costo del domicilio varía según la zona de entrega y no está incluido en el precio del producto, salvo indicación contraria.
                    </p>
                    <ul className='text-gray-600 list-disc pl-5 space-y-2 mt-2'>
                        <li>Es responsabilidad del cliente proporcionar la dirección exacta y un número de contacto disponible.</li>
                        <li>Creaciones Vane no se hace responsable por retrasos debidos a información incorrecta o situaciones de fuerza mayor (clima, tráfico inusual, protestas).</li>
                    </ul>

                    <h2 className='text-primary-700 font-bold mt-8 mb-4 text-xl'>5. Política de Cancelación y Reembolsos</h2>
                    <p className='text-gray-600'>
                        Entendemos que pueden surgir imprevistos. Sin embargo, dado que nuestros productos son personalizados y perecederos:
                    </p>
                    <ul className='text-gray-600 list-disc pl-5 space-y-2 mt-2'>
                        <li>Las cancelaciones realizadas con más de 48 horas de antelación podrán recibir un reembolso parcial o un bono para una compra futura, descontando gastos administrativos y de insumos ya adquiridos.</li>
                        <li>No se realizarán reembolsos por cancelaciones con menos de 24 horas de antelación.</li>
                    </ul>

                    <h2 className='text-primary-700 font-bold mt-8 mb-4 text-xl'>6. Propiedad Intelectual</h2>
                    <p className='text-gray-600'>
                        Todo el contenido de este sitio web, incluyendo imágenes, logotipos, textos y diseños, es propiedad de Creaciones Vane y está protegido por las leyes de derechos de autor. No está permitida su reproducción sin autorización expresa.
                    </p>

                    <h2 className='text-primary-700 font-bold mt-8 mb-4 text-xl'>7. Cambios en los Términos</h2>
                    <p className='text-gray-600'>
                        Nos reservamos el derecho de actualizar estos términos y condiciones en cualquier momento. Te recomendamos revisarlos periódicamente.
                    </p>

                    <div className="mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-500">
                        <p>Última actualización: Febrero 2026</p>
                        <Link href="/" className="mt-4 inline-block bg-primary-100 text-primary-600 font-bold py-2 px-4 rounded-xl hover:bg-primary-700 hover:text-primary-100 transition-colors shadow-lg">
                            Volver a Inicio
                        </Link>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
        </>
    );
}
