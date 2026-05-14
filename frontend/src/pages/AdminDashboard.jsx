import React, { useEffect, useState, useRef } from 'react';
import { useContractedServiceStore, useUserStore, useSupportStore } from '../store';

const AdminDashboard = () => {
  const { contractedServices, fetchContractedServices, updateContractedService, isLoading: servicesLoading } = useContractedServiceStore();
  const { users, fetchUsers, isLoading: usersLoading } = useUserStore();
   const { unreadCounts, fetchUnreadCounts, fetchUserMessages, messages, sendMessage, tickets, fetchTickets } = useSupportStore();
   
   const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'users' | 'active_clients' | 'tickets'
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [selectedUserForChat, setSelectedUserForChat] = useState(null);
  const [adminReply, setAdminReply] = useState('');
  const [selectedTicketForReply, setSelectedTicketForReply] = useState(null);
  const [selectedProjectForEdit, setSelectedProjectForEdit] = useState(null);
  const [ticketReplyData, setTicketReplyData] = useState({
    admin_reply: '',
    status: 'open'
  });
  const chatScrollRef = useRef(null);

  useEffect(() => {
    fetchContractedServices();
    fetchUsers();
    fetchUnreadCounts();
    fetchTickets();
    const interval = setInterval(() => {
      fetchUnreadCounts();
      fetchTickets();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Polling específico para el chat abierto del admin
  useEffect(() => {
    if (!selectedUserForChat) return;
    
    const chatInterval = setInterval(() => {
      fetchUserMessages(selectedUserForChat.id);
    }, 4000);
    
    return () => clearInterval(chatInterval);
  }, [selectedUserForChat]);

  useEffect(() => {
    if (chatScrollRef.current) {
      const scrollContainer = chatScrollRef.current;
      setTimeout(() => {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [messages]);

  const usersWithPlans = users.filter(u => 
    contractedServices.some(s => s.user === u.id)
  );

  const handleOpenChat = (user) => {
    setSelectedUserForChat(user);
    fetchUserMessages(user.id);
  };

  const handleSendAdminReply = async (e) => {
    e.preventDefault();
    if (!adminReply.trim() || !selectedUserForChat) return;
    try {
      await sendMessage(adminReply, selectedUserForChat.id);
      setAdminReply('');
    } catch (err) {
      alert("Error al enviar mensaje");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedProjectForEdit) return;
    try {
      await updateContractedService(selectedProjectForEdit.id, editData);
      setSelectedProjectForEdit(null);
      alert("Proyecto actualizado correctamente");
    } catch (error) {
      alert("Error al actualizar: " + error);
    }
  };

  const handleEdit = (service) => {
    setSelectedProjectForEdit(service);
    setEditData({
      progress: service.progress,
      status: service.status,
      website_url: service.website_url || '',
      delivery_instructions: service.delivery_instructions || '',
      next_payment: service.next_payment || ''
    });
  };

  const handleTicketReplySubmit = async (e) => {
    e.preventDefault();
    if (!selectedTicketForReply) return;
    try {
      const { updateTicket } = useSupportStore.getState();
      await updateTicket(selectedTicketForReply.id, ticketReplyData);
      setSelectedTicketForReply(null);
      setTicketReplyData({ admin_reply: '', status: 'open' });
      alert("Ticket actualizado correctamente");
    } catch (err) {
      alert("Error al actualizar ticket");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="container">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-black text-secondary mb-2">Panel de Administración</h1>
            <p className="text-gray-500">Gestiona proyectos y usuarios de JorghitoTech.</p>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-white px-6 py-4 rounded-3xl shadow-xl border border-gray-100 flex items-center gap-4">
              <div className="text-center">
                <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest block">Proyectos</span>
                <span className="text-2xl font-black text-primary">{contractedServices.length}</span>
              </div>
              <div className="w-px h-8 bg-gray-100"></div>
              <div className="text-center">
                <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest block">C. Activos</span>
                <span className="text-2xl font-black text-green-500">{usersWithPlans.length}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-gray-200/50 p-1.5 rounded-2xl w-fit">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`px-6 md:px-8 py-3 rounded-xl font-bold transition text-sm md:text-base ${activeTab === 'projects' ? 'bg-white text-secondary shadow-md' : 'text-gray-500 hover:text-secondary'}`}
          >
            📋 Proyectos
          </button>
          <button 
            onClick={() => setActiveTab('active_clients')}
            className={`px-6 md:px-8 py-3 rounded-xl font-bold transition text-sm md:text-base ${activeTab === 'active_clients' ? 'bg-white text-secondary shadow-md' : 'text-gray-500 hover:text-secondary'}`}
          >
            💎 Clientes con Plan
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-6 md:px-8 py-3 rounded-xl font-bold transition text-sm md:text-base ${activeTab === 'users' ? 'bg-white text-secondary shadow-md' : 'text-gray-500 hover:text-secondary'}`}
          >
            👥 Todos los Usuarios
          </button>
          <button 
            onClick={() => setActiveTab('tickets')}
            className={`px-6 md:px-8 py-3 rounded-xl font-bold transition text-sm md:text-base ${activeTab === 'tickets' ? 'bg-white text-secondary shadow-md' : 'text-gray-500 hover:text-secondary'}`}
          >
            🎫 Tickets {tickets.filter(t => t.status === 'open').length > 0 && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full ml-1">{tickets.filter(t => t.status === 'open').length}</span>}
          </button>
        </div>

        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
          {activeTab === 'projects' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-secondary text-white">
                    <th className="p-8 font-bold uppercase text-xs tracking-widest">Cliente</th>
                    <th className="p-8 font-bold uppercase text-xs tracking-widest">Servicio</th>
                    <th className="p-8 font-bold uppercase text-xs tracking-widest">Progreso</th>
                    <th className="p-8 font-bold uppercase text-xs tracking-widest">Estado</th>
                    <th className="p-8 font-bold uppercase text-xs tracking-widest text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {contractedServices.map(service => (
                    <tr key={service.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="p-8">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-secondary font-bold">
                            {service.user_email[0].toUpperCase()}
                          </div>
                          <div>
                            <span className="font-bold text-secondary block">{service.user_email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-8 text-secondary font-semibold">{service.name}</td>
                      <td className="p-8">
                        <span className="font-black text-secondary">{service.progress}%</span>
                      </td>
                      <td className="p-8">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${
                          service.status === 'finalizado' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {service.status_display}
                        </span>
                      </td>
                      <td className="p-8 text-right">
                        <button onClick={() => handleEdit(service)} className="text-secondary font-bold hover:text-primary transition-colors">
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'active_clients' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary text-secondary">
                    <th className="p-8 font-bold uppercase text-xs tracking-widest">Cliente</th>
                    <th className="p-8 font-bold uppercase text-xs tracking-widest">Planes</th>
                    <th className="p-8 font-bold uppercase text-xs tracking-widest">Email</th>
                    <th className="p-8 font-bold uppercase text-xs tracking-widest text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {usersWithPlans.map(user => (
                    <tr key={user.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="p-8 font-bold text-secondary flex items-center gap-3">
                        {user.first_name}
                        {unreadCounts[user.id] && (
                          <span className="bg-red-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                            {unreadCounts[user.id]}
                          </span>
                        )}
                      </td>
                      <td className="p-8">
                        <div className="flex flex-wrap gap-1">
                          {contractedServices.filter(s => s.user === user.id).map(s => (
                            <span key={s.id} className="bg-white border text-[10px] px-2 py-0.5 rounded shadow-sm">{s.name}</span>
                          ))}
                        </div>
                      </td>
                      <td className="p-8 text-secondary">{user.email}</td>
                      <td className="p-8 text-right">
                        <button 
                          onClick={() => handleOpenChat(user)}
                          className="bg-secondary text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-opacity-90 transition"
                        >
                          💬 Chat
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-secondary text-white">
                    <th className="p-8 font-bold uppercase text-xs tracking-widest">Nombre</th>
                    <th className="p-8 font-bold uppercase text-xs tracking-widest">Email</th>
                    <th className="p-8 font-bold uppercase text-xs tracking-widest text-right">Rol</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-8 font-bold text-secondary flex items-center gap-3">
                        {user.first_name || 'Sin nombre'}
                        {unreadCounts[user.id] && (
                          <span className="bg-red-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">
                            {unreadCounts[user.id]}
                          </span>
                        )}
                      </td>
                      <td className="p-8 text-secondary font-medium">{user.email}</td>
                      <td className="p-8 text-right">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${user.is_staff ? 'bg-primary/20 text-primary' : 'bg-gray-100 text-gray-400'}`}>
                          {user.is_staff ? 'Admin' : 'Cliente'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'tickets' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-secondary text-white">
                    <th className="p-8 font-bold uppercase text-[10px] tracking-[0.2em] opacity-70">ID / Fecha</th>
                    <th className="p-8 font-bold uppercase text-[10px] tracking-[0.2em] opacity-70">Cliente</th>
                    <th className="p-8 font-bold uppercase text-[10px] tracking-[0.2em] opacity-70">Asunto</th>
                    <th className="p-8 font-bold uppercase text-[10px] tracking-[0.2em] opacity-70 text-center">Prioridad</th>
                    <th className="p-8 font-bold uppercase text-[10px] tracking-[0.2em] opacity-70 text-center">Estado</th>
                    <th className="p-8 font-bold uppercase text-[10px] tracking-[0.2em] opacity-70 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {tickets.map(ticket => (
                    <tr key={ticket.id} className="hover:bg-gray-50/80 transition-all duration-300 group">
                      <td className="p-8">
                        <span className="font-black text-secondary block text-lg mb-1">#{ticket.id}</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{new Date(ticket.created_at).toLocaleDateString()}</span>
                      </td>
                      <td className="p-8">
                        <span className="font-bold text-secondary block group-hover:text-primary transition-colors">{ticket.user_name}</span>
                        <span className="text-xs text-gray-400 font-medium">{ticket.user_email}</span>
                      </td>
                      <td className="p-8">
                        <p className="text-secondary font-bold mb-1">{ticket.subject}</p>
                        <p className="text-xs text-gray-400 line-clamp-1 max-w-[200px]">{ticket.description}</p>
                      </td>
                      <td className="p-8 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          ticket.priority === 'high' ? 'bg-red-50 text-red-600 border border-red-100' :
                          ticket.priority === 'medium' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                          'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        }`}>
                          {ticket.priority === 'high' ? 'Alta' : ticket.priority === 'medium' ? 'Media' : 'Baja'}
                        </span>
                      </td>
                      <td className="p-8 text-center">
                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter ${
                          ticket.status === 'open' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' :
                          ticket.status === 'in_progress' ? 'bg-amber-400 text-secondary shadow-lg shadow-amber-100' :
                          'bg-gray-100 text-gray-400'
                        }`}>
                          {ticket.status === 'open' ? 'Abierto' : ticket.status === 'in_progress' ? 'En Proceso' : 'Cerrado'}
                        </span>
                      </td>
                      <td className="p-8 text-right">
                        <button 
                          onClick={() => {
                            setSelectedTicketForReply(ticket);
                            setTicketReplyData({ 
                              admin_reply: ticket.admin_reply || '', 
                              status: ticket.status 
                            });
                          }}
                          className="inline-flex items-center gap-2 bg-secondary text-white px-5 py-2.5 rounded-xl text-xs font-black hover:bg-primary hover:text-secondary transition-all duration-300 transform group-hover:scale-105 active:scale-95 shadow-md"
                        >
                          <span>✍️</span> Atender
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {tickets.length === 0 && (
                <div className="p-32 text-center">
                  <div className="text-5xl mb-4 opacity-20">🎫</div>
                  <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs">No hay tickets de soporte registrados</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Chat Modal */}
      {selectedUserForChat && (
        <div className="fixed inset-0 bg-secondary/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col h-[600px]">
            <div className="p-6 bg-secondary text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Chat con {selectedUserForChat.first_name}</h3>
                <p className="text-xs text-gray-400">{selectedUserForChat.email}</p>
              </div>
              <button onClick={() => setSelectedUserForChat(null)} className="text-2xl hover:text-primary transition">×</button>
            </div>
            
            <div ref={chatScrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.is_admin_reply ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl ${msg.is_admin_reply ? 'bg-primary text-secondary rounded-tr-none' : 'bg-white text-secondary border rounded-tl-none shadow-sm'}`}>
                    <p className="text-sm">{msg.body}</p>
                    <span className="text-[10px] opacity-50 block mt-1">
                      {new Date(msg.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendAdminReply} className="p-6 bg-white border-t flex gap-4">
              <input 
                type="text" 
                value={adminReply}
                onChange={(e) => setAdminReply(e.target.value)}
                placeholder="Escribe una respuesta..."
                className="flex-grow p-4 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="bg-primary text-secondary px-8 py-4 rounded-2xl font-black hover:shadow-lg transition">
                Enviar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Ticket Reply Modal */}
      {selectedTicketForReply && (
        <div className="fixed inset-0 bg-secondary/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 bg-primary text-secondary flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black">Atender Ticket #{selectedTicketForReply.id}</h3>
                <p className="text-xs font-bold opacity-70">{selectedTicketForReply.subject}</p>
              </div>
              <button onClick={() => setSelectedTicketForReply(null)} className="text-2xl hover:scale-110 transition p-2">×</button>
            </div>
            
            <div className="p-8 bg-gray-50 border-b">
              <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest block mb-2">Descripción del Cliente</span>
              <p className="text-sm text-secondary bg-white p-4 rounded-xl border border-gray-100 italic">
                "{selectedTicketForReply.description}"
              </p>
            </div>

            <form onSubmit={handleTicketReplySubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Actualizar Estado</label>
                <div className="flex gap-3">
                  {[
                    {id: 'open', label: 'Abierto', color: 'blue'},
                    {id: 'in_progress', label: 'En Proceso', color: 'yellow'},
                    {id: 'closed', label: 'Cerrado/Solucionado', color: 'green'}
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setTicketReplyData({...ticketReplyData, status: s.id})}
                      className={`flex-1 py-3 rounded-xl text-xs font-black border-2 transition ${
                        ticketReplyData.status === s.id 
                          ? `border-${s.color}-500 bg-${s.color}-50 text-${s.color}-700` 
                          : 'border-gray-100 text-gray-400 hover:border-gray-200 bg-white'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Respuesta / Solución</label>
                <textarea 
                  rows="5"
                  value={ticketReplyData.admin_reply}
                  onChange={(e) => setTicketReplyData({...ticketReplyData, admin_reply: e.target.value})}
                  placeholder="Escribe aquí la respuesta para el cliente..."
                  className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-primary outline-none transition resize-none text-sm"
                ></textarea>
              </div>

              <div className="flex gap-4 pt-2">
                <button 
                  type="button"
                  onClick={() => setSelectedTicketForReply(null)}
                  className="flex-1 px-6 py-4 rounded-xl font-bold text-gray-400 hover:bg-gray-100 transition"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="flex-[2] bg-secondary text-white px-6 py-4 rounded-xl font-black shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition active:scale-95"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Edit Modal */}
      {selectedProjectForEdit && (
        <div className="fixed inset-0 bg-secondary/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 bg-secondary text-white flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black italic tracking-tighter">Gestionar Entrega</h3>
                <p className="text-xs font-bold opacity-60 uppercase tracking-widest">{selectedProjectForEdit.name}</p>
              </div>
              <button onClick={() => setSelectedProjectForEdit(null)} className="text-3xl hover:rotate-90 transition-transform duration-300">×</button>
            </div>

            <form onSubmit={handleSave} className="p-10 space-y-8">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Estado del Proyecto</label>
                <select 
                  value={editData.status} 
                  onChange={(e) => setEditData({...editData, status: e.target.value})}
                  className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-primary outline-none transition font-bold text-secondary"
                >
                  <option value="desarrollo">En Desarrollo (25%)</option>
                  <option value="revision">En Revisión (50%)</option>
                  <option value="finalizado">Finalizado (100%)</option>
                  <option value="mantenimiento">En Mantenimiento</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Fecha de Próximo Pago</label>
                <input 
                  type="date" 
                  value={editData.next_payment}
                  onChange={(e) => setEditData({...editData, next_payment: e.target.value})}
                  className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-primary outline-none transition font-bold text-secondary"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Link de Entrega (Web / Descarga)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔗</span>
                  <input 
                    type="url" 
                    placeholder="https://tu-proyecto.com o link de drive"
                    value={editData.website_url}
                    onChange={(e) => setEditData({...editData, website_url: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-primary outline-none transition text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Instrucciones de Uso / Funcionamiento</label>
                <textarea 
                  rows="5"
                  placeholder="Explica cómo usar el software, credenciales de prueba, etc."
                  value={editData.delivery_instructions}
                  onChange={(e) => setEditData({...editData, delivery_instructions: e.target.value})}
                  className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-[2rem] focus:border-primary outline-none transition resize-none text-sm leading-relaxed"
                ></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setSelectedProjectForEdit(null)}
                  className="flex-1 px-8 py-5 rounded-2xl font-bold text-gray-400 hover:bg-gray-100 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="flex-[2] bg-primary text-secondary px-8 py-5 rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95"
                >
                  Guardar y Sincronizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
