import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore, useSupportStore, useContractedServiceStore } from '../store';

const Dashboard = () => {
  const { user } = useAuthStore();
  const { messages, fetchMessages, sendMessage, isAdminOnline, fetchAdminStatus, isLoading: messagesLoading } = useSupportStore();
  const { contractedServices, fetchContractedServices, isLoading: servicesLoading } = useContractedServiceStore();
  const [newMessage, setNewMessage] = useState('');
  const messageContainerRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    fetchAdminStatus();
    fetchContractedServices();
    const interval = setInterval(() => {
      fetchMessages();
      fetchAdminStatus();
      fetchContractedServices();
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

                        {service.progress === 100 && service.website_url && (
                          <div className="mt-6 flex justify-end">
                            <a 
                              href={service.website_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-secondary text-primary px-6 py-3 rounded-xl font-black hover:shadow-xl hover:-translate-y-0.5 transition flex items-center gap-2 border border-primary border-opacity-30 active:scale-95"
                            >
                              <span>🌐</span> Ver Sitio Web
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
                
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 h-[450px] flex flex-col justify-center text-center">
                  <div className="w-20 h-20 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                    🛠️
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-4">Soporte Técnico</h3>
                  <p className="text-gray-500 mb-8">¿Necesitas ayuda con alguno de tus servicios o tienes una emergencia?</p>
                  <a href="mailto:soporte@jorghitotech.com" className="bg-secondary text-white px-8 py-4 rounded-xl font-bold hover:bg-opacity-90 transition inline-block">
                    Enviar Ticket
                  </a>
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
                    contractedServices.map((service) => (
                      <div key={service.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                        <p className="font-bold text-secondary text-sm mb-1">{service.name}</p>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-500 text-sm">Próximo pago: {service.next_payment || 'N/A'}</span>
                          <span className="font-bold text-secondary">${parseFloat(service.monthly_fee).toLocaleString()}</span>
                        </div>
                        
                        {service.is_maintenance_paid ? (
                          <div className="bg-green-50 text-green-600 p-3 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2">
                            <span className="text-lg">✓</span> Pagado
                          </div>
                        ) : (
                          <button className="w-full bg-primary text-secondary py-3 rounded-xl font-bold hover:shadow-lg transition">
                            Pagar Mantención
                          </button>
                        )}
                      </div>
                    ))
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
    </div>
  );
};

export default Dashboard;
