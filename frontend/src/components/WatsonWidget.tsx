import { useState } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { authService } from '../services/authService';

export default function WatsonWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const user = authService.getCurrentUser();
  const primerNombre = user ? user.nombre.split(' ')[0] : 'Usuario';

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hola, ${primerNombre}. Soy el asistente virtual de Aisell. ¿En qué puedo ayudarte hoy?`
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Respuestas automáticas simuladas de Watson
    setTimeout(() => {
      let botResponse = 'Entendido. Estoy consultando la base de datos de Aisell...';
      const q = query.toLowerCase();

      if (q.includes('stock') || q.includes('critico')) {
        botResponse = 'Actualmente tienes 3 productos en stock crítico: Audífonos Air (4 und.), Teclado Compact (2 und.) y Mug Térmico (8 und.).';
      } else if (q.includes('pedido') || q.includes('envio')) {
        botResponse = 'Tienes 12 pedidos en ruta hoy. El más próximo a entregar es Distribuidora San Martín (11:30 am).';
      } else if (q.includes('venta')) {
        botResponse = 'Las ventas de hoy suman S/ 8,420.50, lo que representa un +12.5% superior al día de ayer.';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botón Flotante */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 cursor-pointer relative"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="w-3 h-3 bg-emerald-400 border-2 border-white rounded-full absolute top-1 right-1"></span>
        </button>
      ) : (
        /* Ventana del Chat de Watson */
        <div className="w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-blue-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center font-bold text-xs">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xs font-bold">Watson Assistant</h3>
                <p className="text-[10px] text-blue-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span> En línea
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white border border-slate-100 text-slate-800 shadow-xs rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Sugerencias Rápidas */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto">
            <button
              onClick={() => handleSend('Consultar stock crítico')}
              className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap cursor-pointer"
            >
              Consultar stock crítico
            </button>
            <button
              onClick={() => handleSend('Estado de pedidos')}
              className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap cursor-pointer"
            >
              Estado de pedidos
            </button>
          </div>

          {/* Input de Texto */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              placeholder="Escribe tu consulta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-slate-50 py-1 text-center text-[9px] text-slate-400 border-t border-slate-100">
            Powered by IBM watsonx Assistant
          </div>
        </div>
      )}
    </div>
  );
}