import React, { useEffect, useState, useRef } from 'react';
import { useContractedServiceStore, useUserStore, useSupportStore } from '../store';

const AdminDashboard = () => {
  const { contractedServices, fetchContractedServices, updateContractedService, isLoading: servicesLoading } = useContractedServiceStore();
  const { users, fetchUsers, isLoading: usersLoading } = useUserStore();
  const { unreadCounts, fetchUnreadCounts, fetchUserMessages, messages, sendMessage } = useSupportStore();
  
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'users' | 'active_clients'
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [selectedUserForChat, setSelectedUserForChat] = useState(null);
  const [adminReply, setAdminReply] = useState('');
  const chatScrollRef = useRef(null);

  useEffect(() => {
    fetchContractedServices();
    fetchUsers();
    fetchUnreadCounts();
    const interval = setInterval(() => {
      fetchUnreadCounts();
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

  const handleSave = async (id) => {
    try {
      await updateContractedService(id, editData);
      setEditingId(null);
    } catch (error) {
      alert("Error al actualizar: " + error);
    }
  };

  const handleEdit = (service) => {
    setEditingId(service.id);
    setEditData({
      progress: service.progress,
      status: service.status,
      website_url: service.website_url || ''
    });
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
                        {editingId === service.id ? (
                          <input type="number" value={editData.progress} onChange={(e) => setEditData({...editData, progress: e.target.value})} className="w-20 p-2 border rounded-lg" />
                        ) : (
                          <span className="font-black text-secondary">{service.progress}%</span>
                        )}
                      </td>
                      <td className="p-8">
                        {editingId === service.id ? (
                          <select value={editData.status} onChange={(e) => setEditData({...editData, status: e.target.value})} className="p-2 border rounded-lg">
                            <option value="desarrollo">Desarrollo</option>
                            <option value="revision">Revisión</option>
                            <option value="finalizado">Finalizado</option>
                          </select>
                        ) : (
                          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">{service.status_display}</span>
                        )}
                      </td>
                      <td className="p-8 text-right">
                        {editingId === service.id ? (
                          <button onClick={() => handleSave(service.id)} className="text-primary font-bold">Guardar</button>
                        ) : (
                          <button onClick={() => handleEdit(service)} className="text-secondary font-bold">Editar</button>
                        )}
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
    </div>
  );
};

export default AdminDashboard;
