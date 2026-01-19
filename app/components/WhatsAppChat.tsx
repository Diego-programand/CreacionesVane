'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface WhatsAppChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: string;
  isError?: boolean;
}

// Palabras prohibidas (puedes agregar más)
const PALABRAS_PROHIBIDAS = [
  'puto', 'puta', 'mierda', 'cabrón', 'cabron', 'pendejo', 'idiota',
  'gonorrea', 'hijueputa', 'malparido', 'imbecil', 'estúpido', 'estupido'
];

// Rangos de presupuesto por servicio
const RANGOS_PRESUPUESTO: Record<string, { min: number; max: number; unidad?: string }> = {
  'Ancheta personalizada': { min: 30, max: 350 },
  'Desayuno sorpresa': { min: 100, max: 300 }, 
  'Caja con detalles': { min: 30, max: 350 },
  'Refrigerios para evento': { min: 10, max: 35, unidad: 'por unidad' },
  'Decoracion de evento': { min: 150, max: 2000 },
  'Ramo de flores': { min: 100, max: 350 },
  'Ramilletes': { min: 50, max: 350 }
};

const MAX_STRIKES = 3; // Máximo de intentos antes de bloqueo
const COOLDOWN_TIME = 300000; // 5 minutos en milisegundos
const BLOCK_TIME = 1800000; // 30 minutos en milisegundos

export default function WhatsAppChat({ isOpen, onClose }: WhatsAppChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userResponses, setUserResponses] = useState({
    servicio: '',
    detalles: '',
    fecha: '',
    presupuesto: '',
    contacto: '',
    cantidadRefrigerios: ''
  });
  const [inputValue, setInputValue] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [strikes, setStrikes] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockEndTime, setBlockEndTime] = useState<number | null>(null);
  const [lastStrikeTime, setLastStrikeTime] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const phoneNumber = '573128235654';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Verificar si el usuario está bloqueado
  useEffect(() => {
    const checkBlockStatus = () => {
      if (blockEndTime && Date.now() < blockEndTime) {
        setIsBlocked(true);
      } else if (blockEndTime && Date.now() >= blockEndTime) {
        // Desbloquear y resetear strikes
        setIsBlocked(false);
        setBlockEndTime(null);
        setStrikes(0);
        setLastStrikeTime(null);
      }
    };

    checkBlockStatus();
    const interval = setInterval(checkBlockStatus, 1000);
    return () => clearInterval(interval);
  }, [blockEndTime]);

  // Resetear strikes después del cooldown
  useEffect(() => {
    if (lastStrikeTime && Date.now() - lastStrikeTime > COOLDOWN_TIME && strikes < MAX_STRIKES) {
      setStrikes(0);
      setLastStrikeTime(null);
    }
  }, [lastStrikeTime, strikes]);

  useEffect(() => {
    if (isOpen && messages.length === 0 && !isBlocked) {
      setTimeout(() => {
        addBotMessage('Hola! Bienvenido a Creaciones Vane');
      }, 500);
      setTimeout(() => {
        addBotMessage('Estoy aqui para ayudarte a crear el detalle perfecto');
      }, 1500);
      setTimeout(() => {
        addBotMessage('Para brindarte la mejor atencion, que servicio te interesa?');
        setCurrentStep(1);
      }, 2500);
    } else if (isOpen && isBlocked) {
      showBlockedMessage();
    }
  }, [isOpen, isBlocked]);

  const addBotMessage = (text: string, isError: boolean = false) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
      isError
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const showBlockedMessage = () => {
    const remainingTime = blockEndTime ? Math.ceil((blockEndTime - Date.now()) / 60000) : 30;
    addBotMessage(
      `Lo sentimos, has sido bloqueado temporalmente por comportamiento inapropiado. Por favor intenta nuevamente en ${remainingTime} minutos.`,
      true
    );
    addBotMessage(
      'Si necesitas asistencia inmediata, puedes contactarnos directamente al telefono que aparece en nuestro sitio web.',
      false
    );
  };

  const addStrike = (razon: string) => {
    const newStrikes = strikes + 1;
    setStrikes(newStrikes);
    setLastStrikeTime(Date.now());

    if (newStrikes >= MAX_STRIKES) {
      // Bloquear usuario
      const blockUntil = Date.now() + BLOCK_TIME;
      setBlockEndTime(blockUntil);
      setIsBlocked(true);
      addBotMessage(
        'Has excedido el numero de intentos permitidos. Has sido bloqueado temporalmente por 30 minutos.',
        true
      );
      addBotMessage(
        'Para asistencia inmediata, puedes llamarnos directamente.',
        false
      );
    } else {
      const remainingStrikes = MAX_STRIKES - newStrikes;
      addBotMessage(
        `${razon} Te quedan ${remainingStrikes} ${remainingStrikes === 1 ? 'intento' : 'intentos'} antes de ser bloqueado temporalmente.`,
        true
      );
    }
  };

  // Validación de palabras prohibidas
  const contienePalabrasProhibidas = (texto: string): boolean => {
    const textoLower = texto.toLowerCase();
    return PALABRAS_PROHIBIDAS.some(palabra => textoLower.includes(palabra));
  };

  // Validación de fecha
  const validarFecha = (fecha: string): { valida: boolean; mensaje?: string } => {
    const formatosPermitidos = [
      /^\d{1,2}\s+de\s+\w+$/i,
      /^\d{1,2}\/\d{1,2}(\/\d{2,4})?$/,
      /^\d{1,2}-\d{1,2}(-\d{2,4})?$/,
      /^(hoy|mañana|pasado mañana)$/i,
      /^(lunes|martes|miercoles|jueves|viernes|sabado|domingo)\s+(proximo|siguiente|que viene)?$/i,
      /^en\s+\d+\s+(dia|dias|semana|semanas|mes|meses)$/i
    ];

    const cumpleAlgunFormato = formatosPermitidos.some(regex => regex.test(fecha.trim()));
    
    if (!cumpleAlgunFormato) {
      return {
        valida: false,
        mensaje: 'Por favor ingresa una fecha valida. Ejemplos: "14 de febrero", "proximo sabado", "en 5 dias", "25/12"'
      };
    }

    const matchDia = fecha.match(/^(\d{1,2})/);
    if (matchDia) {
      const dia = parseInt(matchDia[1]);
      if (dia > 31 || dia < 1) {
        return {
          valida: false,
          mensaje: 'El dia debe estar entre 1 y 31. Por favor corrige la fecha.'
        };
      }
    }

    const mesesValidos = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const matchMes = fecha.match(/de\s+(\w+)/i);
    if (matchMes) {
      const mes = matchMes[1].toLowerCase();
      if (!mesesValidos.includes(mes)) {
        return {
          valida: false,
          mensaje: 'Por favor ingresa un mes valido. Ejemplo: "14 de febrero"'
        };
      }

      const dia = parseInt(fecha.match(/^(\d{1,2})/)?.[1] || '0');
      const mesesCon30 = ['abril', 'junio', 'septiembre', 'noviembre'];
      
      if (mes === 'febrero' && dia > 29) {
        return {
          valida: false,
          mensaje: 'Febrero no puede tener mas de 29 dias. Por favor corrige la fecha.'
        };
      }
      
      if (mesesCon30.includes(mes) && dia > 30) {
        return {
          valida: false,
          mensaje: `${mes.charAt(0).toUpperCase() + mes.slice(1)} no puede tener mas de 30 dias. Por favor corrige la fecha.`
        };
      }
    }

    return { valida: true };
  };

  // Validación de contacto
  const validarContacto = (contacto: string): { valido: boolean; mensaje?: string } => {
    const textoLimpio = contacto.trim();
    
    if (textoLimpio.length < 3) {
      return {
        valido: false,
        mensaje: 'Por favor proporciona al menos tu nombre o numero de telefono.'
      };
    }

    const tieneNumeros = /\d/.test(textoLimpio);
    if (tieneNumeros) {
      const soloNumeros = textoLimpio.replace(/\D/g, '');
      if (soloNumeros.length < 7 || soloNumeros.length > 15) {
        return {
          valido: false,
          mensaje: 'El numero de telefono no parece valido. Por favor verificalo.'
        };
      }
    }

    return { valido: true };
  };

  const handleQuickReply = (option: string, field: keyof typeof userResponses) => {
    if (isBlocked) return;
    
    setUserResponses(prev => ({ ...prev, [field]: option }));
    addUserMessage(option);
    proceedToNextStep(field, option);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isBlocked) return;

    // Validar palabras prohibidas
    if (contienePalabrasProhibidas(inputValue)) {
      addStrike('Por favor mantengamos una conversacion respetuosa.');
      setInputValue('');
      return;
    }

    const currentField = getCurrentField();
    if (currentField) {
      // Validaciones específicas por campo
      if (currentField === 'fecha') {
        const validacion = validarFecha(inputValue);
        if (!validacion.valida) {
          addBotMessage(validacion.mensaje!, true);
          setInputValue('');
          return;
        }
      }

      if (currentField === 'contacto') {
        const validacion = validarContacto(inputValue);
        if (!validacion.valido) {
          addBotMessage(validacion.mensaje!, true);
          setInputValue('');
          return;
        }
      }

      if (currentField === 'detalles' && inputValue.length < 10) {
        addBotMessage('Por favor cuentame un poco mas de detalles (al menos 10 caracteres) para poder ayudarte mejor.', true);
        setInputValue('');
        return;
      }

      if (currentField === 'cantidadRefrigerios') {
        const cantidad = parseInt(inputValue);
        if (isNaN(cantidad) || cantidad < 1) {
          addBotMessage('Por favor ingresa un numero valido de unidades (minimo 1).', true);
          setInputValue('');
          return;
        }
        if (cantidad > 1000) {
          addBotMessage('Para pedidos mayores a 1000 unidades, por favor contactanos directamente por telefono.', true);
          setInputValue('');
          return;
        }
      }

      const newResponses = { ...userResponses, [currentField]: inputValue };
      setUserResponses(newResponses);
      addUserMessage(inputValue);
      proceedToNextStep(currentField, inputValue, newResponses);
      setInputValue('');
    }
  };

  const getCurrentField = (): keyof typeof userResponses | null => {
    if (currentStep === 1) return 'servicio';
    if (currentStep === 2) return 'detalles';
    if (currentStep === 3) return 'fecha';
    if (currentStep === 4) return 'cantidadRefrigerios';
    if (currentStep === 5) return 'presupuesto';
    if (currentStep === 6) return 'contacto';
    return null;
  };

  const proceedToNextStep = (
    field: keyof typeof userResponses, 
    value: string,
    updatedResponses?: typeof userResponses
  ) => {
    const responses = updatedResponses || userResponses;
    
    setTimeout(() => {
      if (field === 'servicio') {
        addBotMessage('Perfecto!');
        setTimeout(() => {
          addBotMessage('Cuentame mas detalles sobre lo que tienes en mente. Por ejemplo: tematica, colores, si es para alguien especial, etc.');
          setCurrentStep(2);
        }, 1000);
      } else if (field === 'detalles') {
        addBotMessage('Me encanta!');
        setTimeout(() => {
          addBotMessage('Para que fecha lo necesitas? Puedes escribir: "14 de febrero", "proximo sabado", "en 5 dias", etc.');
          setCurrentStep(3);
        }, 1000);
      } else if (field === 'fecha') {
        if (responses.servicio === 'Refrigerios para evento') {
          addBotMessage('Anotado');
          setTimeout(() => {
            addBotMessage('Cuantas unidades de refrigerios necesitas?');
            setCurrentStep(4);
          }, 1000);
        } else {
          addBotMessage('Anotado');
          setTimeout(() => {
            addBotMessage('Tienes un presupuesto aproximado en mente? Esto nos ayuda a crear la mejor propuesta para ti');
            setCurrentStep(5);
          }, 1000);
        }
      } else if (field === 'cantidadRefrigerios') {
        addBotMessage('Perfecto!');
        setTimeout(() => {
          addBotMessage('Tienes un presupuesto aproximado por unidad? Esto nos ayuda a crear la mejor propuesta para ti');
          setCurrentStep(5);
        }, 1000);
      } else if (field === 'presupuesto') {
        addBotMessage('Excelente');
        setTimeout(() => {
          addBotMessage('Por ultimo, como te gustaria que te contactemos? (nombre y/o numero de telefono)');
          setCurrentStep(6);
        }, 1000);
      } else if (field === 'contacto') {
        setIsRedirecting(true);
        addBotMessage('Listo! Tengo toda la informacion');
        setTimeout(() => {
          addBotMessage('Ahora te llevare a WhatsApp con tu mensaje listo para enviar. Nos vemos alla!');
          setTimeout(() => {
            sendToWhatsApp(responses);
          }, 3000);
        }, 1000);
      }
    }, 800);
  };

  const sendToWhatsApp = (responses: typeof userResponses) => {
    let message = `Hola Creaciones Vane!

Me gustaria solicitar mas informacion:

Servicio: ${responses.servicio}

Detalles:
${responses.detalles}

Fecha necesaria: ${responses.fecha}`;

    if (responses.servicio === 'Refrigerios para evento' && responses.cantidadRefrigerios) {
      message += `

Cantidad: ${responses.cantidadRefrigerios} unidades`;
    }

    message += `

Presupuesto aproximado: ${responses.presupuesto}

Contacto: ${responses.contacto}

Espero su respuesta!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const getQuickReplies = () => {
    if (currentStep === 1) {
      return [
        'Ancheta personalizada',
        'Desayuno sorpresa',
        'Caja con detalles',
        'Refrigerios para evento',
        'Decoracion de evento',
        'Ramo de flores',
        'Ramilletes'
      ];
    }
    
    if (currentStep === 5) {
      const servicio = userResponses.servicio;
      const rango = RANGOS_PRESUPUESTO[servicio];
      
      if (!rango) {
        return ['No tengo presupuesto definido'];
      }

      const { min, max, unidad } = rango;
      const unidadTexto = unidad ? ` ${unidad}` : '';
      const opciones: string[] = [];
      
      if (max <= 100) {
        opciones.push(`$${min}.000 - $${min + 10}.000${unidadTexto}`);
        opciones.push(`$${min + 10}.000 - $${min + 20}.000${unidadTexto}`);
        opciones.push(`$${min + 20}.000 - $${max}.000${unidadTexto}`);
      } else if (max <= 500) {
        const tercio = Math.round((max - min) / 3);
        opciones.push(`$${min}.000 - $${min + tercio}.000${unidadTexto}`);
        opciones.push(`$${min + tercio}.000 - $${min + tercio * 2}.000${unidadTexto}`);
        opciones.push(`$${min + tercio * 2}.000 - $${max}.000${unidadTexto}`);
      } else {
        opciones.push(`$${min}.000 - $300.000`);
        opciones.push(`$300.000 - $600.000`);
        opciones.push(`$600.000 - $1.000.000`);
        opciones.push(`$1.000.000 - $${max}.000`);
      }
      
      opciones.push(`Mas de $${max}.000${unidadTexto}`);
      opciones.push('No tengo presupuesto definido');
      
      return opciones;
    }
    
    return [];
  };

  const getRemainingTime = () => {
    if (!blockEndTime) return '';
    const remaining = Math.ceil((blockEndTime - Date.now()) / 60000);
    return remaining > 1 ? `${remaining} minutos` : '1 minuto';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md max-h-[85vh] sm:max-h-[600px] flex flex-col shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center gap-3">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image 
                src="/logo.png" 
                alt="Creaciones Vane" 
                width={48} 
                height={48}
                className="rounded-full object-cover border-2 border-white/20"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#075E54]"></div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Creaciones Vane</h3>
              <p className="text-xs text-green-200 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                {isBlocked ? `Bloqueado (${getRemainingTime()})` : 'En linea'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/10 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-[#E5DDD5] space-y-3">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-[#DCF8C6] text-gray-800'
                      : message.isError
                      ? 'bg-red-50 text-red-800 border border-red-200 shadow-sm'
                      : 'bg-white text-gray-800 shadow-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className="text-[10px] text-gray-500 mt-1 text-right">
                    {message.timestamp}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Strike indicator */}
            {strikes > 0 && strikes < MAX_STRIKES && !isBlocked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-center"
              >
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 text-xs text-yellow-800 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Advertencia {strikes}/{MAX_STRIKES}
                </div>
              </motion.div>
            )}

            {/* Quick Replies */}
            {getQuickReplies().length > 0 && !isRedirecting && !isBlocked && (
              <div className="flex flex-col gap-2 mt-4">
                {getQuickReplies().map((reply, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleQuickReply(reply, getCurrentField()!)}
                    className="bg-white hover:bg-gray-50 text-gray-800 text-sm py-2 px-4 rounded-full border border-gray-200 transition-colors text-left shadow-sm"
                  >
                    {reply}
                  </motion.button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-[#F0F0F0] border-t border-gray-200">
            <div className="flex gap-2 items-center">
              <button 
                className="text-gray-500 hover:text-gray-700 p-2 transition-colors"
                disabled={isBlocked}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isRedirecting && !isBlocked && handleSendMessage()}
                placeholder={isBlocked ? 'Chat bloqueado temporalmente' : 'Escribe tu respuesta...'}
                disabled={isRedirecting || isBlocked}
                className="flex-1 bg-white rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] border border-gray-200 disabled:bg-gray-100 disabled:text-gray-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isRedirecting || isBlocked}
                className="bg-[#25D366] hover:bg-[#20BA5A] disabled:bg-gray-300 text-white rounded-full p-2.5 transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}