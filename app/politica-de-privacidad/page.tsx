
import React from 'react';
import Link from 'next/link';
export const metadata = {
    title: 'Política de Privacidad | Creaciones Vane',
    description: 'Política de privacidad y tratamiento de datos personales de Creaciones Vane.',
};

export default function PrivacidadPage() {
    return (
        <main className="min-h-screen bg-neutral-50 pb-20">
            {/* Header */}
            <div className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white py-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <svg width="100%" height="100%"><pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="currentColor" /></pattern><rect width="100%" height="100%" fill="url(#pattern)" /></svg>
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="font-script text-5xl md:text-6xl mb-4">Política de Privacidad</h1>
                    <p className="text-primary-100 max-w-2xl mx-auto">
                        Tu privacidad es importante para nosotros. Conoce cómo protegemos y utilizamos tus datos.
                    </p>
                    <Link href="/" className="mt-4 inline-block bg-primary-100 text-primary-600 font-bold py-2 px-4 rounded-xl hover:bg-primary-700 hover:text-primary-100 transition-colors shadow-lg">
                        Volver a Inicio
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 -mt-10 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto prose prose-primary prose-lg">
                    <p className="lead text-gray-600">
                        En Creaciones Vane, nos comprometemos a proteger la privacidad y la seguridad de la información personal de nuestros clientes. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos tu información cuando utilizas nuestros servicios.
                    </p>

                    <h3 className='text-primary-700 font-bold mt-8 mb-4'>1. Responsable del Tratamiento</h3>
                    <p className='text-gray-600'>
                        <strong>Nombre:</strong> Creaciones Vane
                        <br />
                        <strong>Domicilio:</strong> Cra. 50 #120-13, Medellín, Colombia.
                        <br />
                        <strong>Contacto:</strong> +57 312 823 5654
                    </p>

                    <h3 className='text-primary-700 font-bold mt-8 mb-4'>2. Información que Recopilamos</h3>
                    <p className='text-gray-600'>
                        Podemos recopilar la siguiente información personal necesaria para procesar tus pedidos y brindarte un mejor servicio:
                    </p>
                    <ul className='text-gray-600 list-disc pl-5 space-y-2 mt-2'>
                        <li><strong>Datos de Identificación:</strong> Nombre completo.</li>
                        <li><strong>Datos de Contacto:</strong> Número de teléfono (WhatsApp), dirección de correo electrónico, dirección de entrega.</li>
                        <li><strong>Información del Pedido:</strong> Detalles de los productos solicitados, fechas de entrega, mensajes personalizados para tarjetas.</li>
                        <li><strong>Datos de Pago:</strong> No almacenamos datos completos de tarjetas de crédito. Los pagos se gestionan a través de plataformas seguras o transferencias directas.</li>
                    </ul>

                    <h3 className='text-primary-700 font-bold mt-8 mb-4'>3. Uso de la Información</h3>
                    <p className='text-gray-600'>
                        Utilizamos tus datos personales para las siguientes finalidades:
                    </p>
                    <ul className='text-gray-600 list-disc pl-5 space-y-2 mt-2'>
                        <li>Procesar, preparar y entregar tus pedidos.</li>
                        <li>Contactarte para coordinar detalles de la entrega o resolver dudas sobre tu compra.</li>
                        <li>Enviar información sobre promociones, nuevos productos o eventos especiales (solo si has aceptado recibir comunicaciones).</li>
                        <li>Mejorar nuestros servicios y experiencia en el sitio web.</li>
                    </ul>

                    <h3 className='text-primary-700 font-bold mt-8 mb-4'>4. Protección de Datos</h3>
                    <p className='text-gray-600'>
                        Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales contra acceso no autorizado, pérdida o alteración. Solo el personal autorizado tiene acceso a la información necesaria para cumplir con sus funciones.
                    </p>

                    <h3 className='text-primary-700 font-bold mt-8 mb-4'>5. Compartir Información</h3>
                    <p className='text-gray-600'>
                        Creaciones Vane no vende, alquila ni comparte tus datos personales con terceros para fines comerciales. Solo compartimos información estrictamente necesaria con proveedores de servicios de logística (mensajeros) para realizar la entrega de tu pedido.
                    </p>

                    <h3 className='text-primary-700 font-bold mt-8 mb-4'>6. Tus Derechos</h3>
                    <p className='text-gray-600'>
                        De acuerdo con la legislación colombiana (Ley 1581 de 2012) y regulaciones aplicables, tienes derecho a:
                    </p>
                    <ul className='text-gray-600 list-disc pl-5 space-y-2 mt-2'>
                        <li>Conocer, actualizar y rectificar tus datos personales.</li>
                        <li>Solicitar la supresión de tus datos cuando no sean necesarios para la relación comercial vigente.</li>
                        <li>Revocar la autorización para el tratamiento de datos.</li>
                    </ul>
                    <p className='text-gray-600 mt-2'>
                        Para ejercer estos derechos, puedes contactarnos a través de nuestro WhatsApp o correo electrónico.
                    </p>

                    <h3 className='text-primary-700 font-bold mt-8 mb-4'>7. Cookies</h3>
                    <p className='text-gray-600'>
                        Nuestro sitio web puede utilizar cookies para mejorar tu experiencia de navegación. Puedes configurar tu navegador para rechazar las cookies, aunque esto podría afectar algunas funcionalidades del sitio.
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
    );
}
