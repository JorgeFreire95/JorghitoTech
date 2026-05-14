import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore, useSupportStore, useContractedServiceStore } from '../store';

const Dashboard = () => {
  const { user } = useAuthStore();
  const { messages, fetchMessages, sendMessage, isAdminOnline, fetchAdminStatus, isLoading: messagesLoading, tickets, fetchTickets, createTicket } = useSupportStore();
  const { contractedServices, fetchContractedServices, isLoading: servicesLoading } = useContractedServiceStore();
  const [newMessage, setNewMessage] = useState('');
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketData, setTicketData] = useState({
    subject: '',
    description: '',
    priority: 'medium'
  });
  const messageContainerRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    fetchAdminStatus();
    fetchContractedServices();
    fetchTickets();
    const interval = setInterval(() => {
      fetchMessages();
      fetchAdminStatus();
      fetchContractedServices();
      fetchTickets();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Solo desplazar el scroll del chat, no de la página
  useEffect(() => {
    if (messageContainerRef.current) {
      const scrollContainer = messageContainerRef.current;
      // Scroll instantáneo primero, luego suave para asegurar
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
      setTimeout(() => {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth'
        });
      }, 50);
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      await sendMessage(newMessage);
      setNewMessage('');
    } catch (err) {
      console.error("Error sending message", err);
    }
  };

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTicket(ticketData);
      setIsTicketModalOpen(false);
      setTicketData({ subject: '', description: '', priority: 'medium' });
      alert('Ticket creado exitosamente');
    } catch (err) {
      console.error("Error creating ticket", err);
      alert('Error al crear el ticket');
    }
  };


  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-secondary text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full filter blur-[100px] opacity-10 -mr-48 -mt-48"></div>
        <div className="container relative z-10">
          <h1 className="text-5xl font-extrabold mb-4">Bienvenido, {user?.first_name || user?.username || 'Usuario'}</h1>
          <p className="text-gray-400 text-xl">Gestiona tus servicios y mantente al tanto de tus proyectos.</p>
        </div>
      </section>

      <section className="py-12 -mt-10 relative z-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Services Status */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-secondary mb-8 flex items-center gap-3">
                  <span className="text-primary text-3xl">🚀</span>
                  Estado de mis Servicios
                </h2>
                
                <div className="space-y-8">
                  {contractedServices.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                      <p className="text-gray-400 font-medium">Aún no tienes servicios activos.</p>
                      <p className="text-gray-400 text-sm mt-1">Explora nuestros planes para comenzar.</p>
                    </div>
                  ) : (
                    contractedServices.map((service) => (
                      <div key={service.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 group hover:shadow-md transition">
                        <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                          <div>
                            <h3 className="text-xl font-bold text-secondary">{service.name}</h3>
                            <span className={`inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              service.status === 'finalizado' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${service.status === 'finalizado' ? 'bg-green-500' : 'bg-blue-500'}`}></span>
                              {service.status_display}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-gray-400 uppercase font-bold tracking-widest block mb-1">Progreso</span>
                            <span className="text-3xl font-black text-secondary">{service.progress}%</span>
                          </div>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
                          <div 
                            className="bg-primary h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(0,209,255,0.5)]" 
                            style={{ width: `${service.progress}%` }}
                          ></div>
                        </div>

                        {service.delivery_instructions && (
                          <div className="mt-6 p-4 bg-secondary text-white rounded-2xl border-l-4 border-primary shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-primary text-lg">💡</span>
                              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Instrucciones de Entrega</h4>
                            </div>
                            <p className="text-xs opacity-90 leading-relaxed italic">
                              "{service.delivery_instructions}"
                            </p>
                          </div>
                        )}

                        {service.website_url && (
                          <div className="mt-6 flex justify-end">
                            <a 
                              href={service.website_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-secondary text-white px-8 py-3.5 rounded-xl font-black hover:shadow-2xl hover:bg-primary hover:text-secondary hover:-translate-y-1 transition-all flex items-center gap-3 border border-white/10 active:scale-95 group/btn"
                            >
                              <span className="text-lg group-hover/btn:rotate-12 transition-transform">🚀</span>
                              <span>{service.status === 'finalizado' ? 'Descargar / Visitar Proyecto' : 'Ver Avance en Vivo'}</span>
                            </a>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col h-[450px]">
                  <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-secondary flex items-center gap-2">
                      <span className="text-primary text-2xl">💬</span>
                      Chat con Soporte
                    </h3>
                    <div className="flex items-center gap-2">
                      {isAdminOnline && <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider animate-pulse">Administrador Activo</span>}
                      <div className={`w-3 h-3 rounded-full ${isAdminOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                    </div>
                  </div>
                  
                  <div 
                    ref={messageContainerRef}
                    className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50/50"
                  >
                    {Array.isArray(messages) && messages.length === 0 ? (
                      <div className="text-center py-10">
                        <p className="text-gray-400 italic">No hay mensajes anteriores.</p>
                        <p className="text-gray-400 text-sm">¡Escríbenos si tienes dudas!</p>
                      </div>
                    ) : (
                      Array.isArray(messages) && messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.is_admin_reply ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${msg.is_admin_reply ? 'bg-white text-secondary rounded-tl-none border border-gray-100' : 'bg-primary text-secondary rounded-tr-none font-medium'}`}>
                            <p className="text-sm">{msg.body}</p>
                            <span className="text-[10px] opacity-50 mt-2 block text-right">
                              {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
                    <input 
                      type="text" 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Escribe un mensaje..."
                      className="flex-grow bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-primary outline-none text-sm transition"
                    />
                    <button type="submit" className="bg-primary text-secondary p-2 rounded-xl hover:bg-opacity-90 transition">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </form>
                </div>
                
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 h-[450px] flex flex-col">
                  <div className="flex-grow flex flex-col justify-center text-center">
                    <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                      🛠️
                    </div>
                    <h3 className="text-xl font-bold text-secondary mb-2">Soporte Técnico</h3>
                    <p className="text-gray-500 text-sm mb-6">¿Necesitas ayuda formal o tienes una emergencia?</p>
                    <button 
                      onClick={() => setIsTicketModalOpen(true)}
                      className="bg-secondary text-white px-8 py-4 rounded-xl font-bold hover:bg-opacity-90 transition inline-block mb-4"
                    >
                      Enviar Ticket
                    </button>
                  </div>

                  {/* List of recent tickets */}
                  <div className="mt-4 pt-4 border-t border-gray-100 text-left overflow-y-auto max-h-[150px]">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Mis Tickets Recientes</h4>
                    <div className="space-y-2">
                      {tickets.length === 0 ? (
                        <p className="text-xs text-gray-400 italic text-center py-2">No tienes tickets abiertos.</p>
                      ) : (
                        tickets.slice(0, 3).map(ticket => (
                          <div key={ticket.id} className="space-y-1 group">
                            <div className="bg-white p-3 rounded-2xl border border-gray-100 flex justify-between items-center hover:border-primary/30 hover:shadow-md transition-all duration-300">
                              <div className="overflow-hidden">
                                <p className="text-[11px] font-black text-secondary truncate group-hover:text-primary transition-colors">{ticket.subject}</p>
                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">#{ticket.id} • {new Date(ticket.created_at).toLocaleDateString()}</span>
                              </div>
                              <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-lg border ${
                                ticket.status === 'open' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                                ticket.status === 'in_progress' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                                'bg-gray-50 text-gray-400 border-gray-100'
                              }`}>
                                {ticket.status === 'open' ? 'Abierto' : ticket.status === 'in_progress' ? 'En Proceso' : 'Cerrado'}
                              </span>
                            </div>
                            {ticket.admin_reply && (
                              <div className="p-3 bg-secondary text-white rounded-2xl border-l-4 border-primary ml-2 shadow-sm animate-in slide-in-from-left-2 duration-300">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <span className="text-[10px]">✨</span>
                                  <p className="text-[9px] font-black uppercase tracking-widest text-primary">Respuesta JorghitoTech</p>
                                </div>
                                <p className="text-[10px] opacity-90 leading-relaxed font-medium">{ticket.admin_reply}</p>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Payments */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 border-t-8 border-t-primary">
                <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
                  <span className="text-primary text-3xl">💳</span>
                  Mantenciones
                </h2>
                
                <div className="space-y-6">
                  {contractedServices.length === 0 ? (
                    <p className="text-gray-400 text-center py-4 text-sm italic">No hay pagos pendientes.</p>
                  ) : (
                    contractedServices.map((service) => {
                      const checkExpiring = (dateStr) => {
                        if (!dateStr) return false;
                        const nextPayment = new Date(dateStr);
                        const today = new Date();
                        // Reset hours to compare only dates
                        today.setHours(0, 0, 0, 0);
                        nextPayment.setHours(0, 0, 0, 0);
                        
                        const diffTime = nextPayment - today;
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        
                        return { 
                          isExpiring: diffDays >= 0 && diffDays <= 5, 
                          isExpired: diffDays < 0,
                          daysLeft: diffDays 
                        };
                      };
                      const { isExpiring, isExpired, daysLeft } = checkExpiring(service.next_payment);

                      return (
                        <div key={service.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start mb-2">
                            <p className="font-bold text-secondary text-sm">{service.name}</p>
                            <span className="font-bold text-secondary text-sm">${parseFloat(service.monthly_fee).toLocaleString()}</span>
                          </div>
                          
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-400 text-[10px] uppercase font-black tracking-widest">Próximo pago:</span>
                            <span className={`text-[11px] font-black ${isExpired ? 'text-red-600' : isExpiring ? 'text-amber-500 animate-pulse' : 'text-secondary'}`}>
                              {service.next_payment ? new Date(service.next_payment + 'T00:00:00').toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Pendiente de cálculo'}
                            </span>
                          </div>
                          
                          {isExpired && !service.is_maintenance_paid && (
                            <div className="mb-4 p-4 bg-red-600 text-white rounded-xl flex items-center gap-3 animate-bounce shadow-lg shadow-red-200">
                              <span className="text-2xl">🚫</span>
                              <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-red-100">Servicio Vencido</p>
                                <p className="text-[11px] font-bold">Tu servicio ha expirado. Paga ahora para reactivarlo.</p>
                              </div>
                            </div>
                          )}

                          {isExpiring && !isExpired && !service.is_maintenance_paid && (
                            <div className="mb-4 p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-center gap-3 animate-in fade-in zoom-in duration-300">
                              <span className="text-xl">⚠️</span>
                              <div>
                                <p className="text-[10px] font-black text-amber-600 uppercase">¡Atención!</p>
                                <p className="text-[10px] text-amber-500 font-medium">Vence en {daysLeft} días. Evita la suspensión.</p>
                              </div>
                            </div>
                          )}
                          
                          {service.is_maintenance_paid ? (
                            <div className="bg-green-50 text-green-600 p-3 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2 border border-green-100 shadow-sm">
                              <span className="text-lg">✓</span> Pagado
                            </div>
                          ) : (
                            <button className={`w-full py-3 rounded-xl font-black transition-all hover:-translate-y-0.5 active:scale-95 ${
                              isExpired 
                                ? 'bg-red-600 text-white hover:bg-red-700 shadow-xl shadow-red-100' 
                                : 'bg-primary text-secondary hover:shadow-lg'
                            }`}>
                              {isExpired ? 'Reactivar Servicio' : 'Pagar Mantención'}
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-secondary to-blue-900 rounded-3xl shadow-xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">¡Nuevos Planes!</h3>
                <p className="text-gray-300 mb-6 text-sm">Expandimos nuestros servicios de desarrollo móvil. ¡Échales un vistazo!</p>
                <button className="w-full bg-white text-secondary py-3 rounded-xl font-bold hover:bg-gray-100 transition">Ver más servicios</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Ticket Modal */}
      {isTicketModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-secondary/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="bg-primary p-6 text-secondary flex justify-between items-center">
              <h3 className="text-2xl font-black">Levantar Ticket</h3>
              <button 
                onClick={() => setIsTicketModalOpen(false)}
                className="text-secondary hover:scale-110 transition p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleTicketSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Asunto del Ticket</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej. Problema con mi dominio, Error en el despliegue..."
                  value={ticketData.subject}
                  onChange={(e) => setTicketData({...ticketData, subject: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-primary outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Prioridad</label>
                <div className="grid grid-cols-3 gap-3">
                  {['low', 'medium', 'high'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setTicketData({...ticketData, priority: p})}
                      className={`py-2 rounded-xl text-xs font-bold border-2 transition ${
                        ticketData.priority === p 
                          ? 'border-primary bg-primary/10 text-secondary' 
                          : 'border-gray-100 text-gray-400 hover:border-gray-200'
                      }`}
                    >
                      {p === 'low' ? 'Baja' : p === 'medium' ? 'Media' : 'Alta'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Descripción del Problema</label>
                <textarea 
                  required
                  rows="4"
                  placeholder="Describe detalladamente tu problema..."
                  value={ticketData.description}
                  onChange={(e) => setTicketData({...ticketData, description: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-primary outline-none transition resize-none"
                ></textarea>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsTicketModalOpen(false)}
                  className="flex-1 px-6 py-4 rounded-xl font-bold text-gray-400 hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-[2] bg-primary text-secondary px-6 py-4 rounded-xl font-black shadow-lg shadow-primary/20 hover:shadow-xl transition active:scale-95"
                >
                  Crear Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
