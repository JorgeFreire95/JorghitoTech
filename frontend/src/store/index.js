import { create } from 'zustand';
import { authService } from '../services';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(username, password);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      const userResponse = await authService.getCurrentUser();
      set({
        user: userResponse.data,
        isAuthenticated: true,
        isLoading: false,
      });
      return userResponse.data;
    } catch (error) {
      set({
        error: error.response?.data?.detail || 'Error al iniciar sesión',
        isLoading: false,
      });
      throw error;
    }
  },

  register: async (fullName, email, password, phone) => {
    set({ isLoading: true, error: null });
    try {
      await authService.register(fullName, email, password, phone);
      return await useAuthStore.getState().login(email, password);
    } catch (error) {
      set({
        error: error.response?.data?.detail || 'Error al registrarse',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    });
  },

  clearError: () => set({ error: null }),
}));

export const useServiceStore = create((set) => ({
  services: [],
  isLoading: false,
  error: null,

  fetchServices: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      // Simular datos si no hay conexión a la API
      const mockServices = [
        {
          id: 1,
          title: 'Desarrollo Web Responsivo',
          description: 'Sitios web modernos y adaptables a todos los dispositivos',
          service_type: 'web',
          icon: 'globe',
          price: '2000.00',
        },
        {
          id: 2,
          title: 'Aplicaciones Desktop',
          description: 'Aplicaciones de escritorio robustas y eficientes',
          service_type: 'desktop',
          icon: 'monitor',
          price: '3000.00',
        },
        {
          id: 3,
          title: 'Desarrollo Móvil',
          description: 'Apps móviles nativas y multiplataforma',
          service_type: 'mobile',
          icon: 'smartphone',
          price: '2500.00',
        },
      ];
      set({ services: mockServices, isLoading: false });
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
    }
  },
}));

export const useProjectStore = create((set) => ({
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,

  fetchProjects: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const mockProjects = [
        {
          id: 1,
          title: 'E-commerce Platform',
          description: 'Plataforma de e-commerce completa con React y Django',
          image: null,
          technologies: 'React, Django, PostgreSQL, Tailwind CSS',
          technologies_list: ['React', 'Django', 'PostgreSQL', 'Tailwind CSS'],
          github_url: 'https://github.com',
          live_url: 'https://example.com',
          featured: true,
          views_count: 150,
          comments: [],
        },
        {
          id: 2,
          title: 'Task Management App',
          description: 'Aplicación para gestionar tareas en equipo',
          image: null,
          technologies: 'React, Node.js, MongoDB',
          technologies_list: ['React', 'Node.js', 'MongoDB'],
          github_url: 'https://github.com',
          live_url: null,
          featured: true,
          views_count: 120,
          comments: [],
        },
      ];
      set({ projects: mockProjects, isLoading: false });
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
    }
  },

  fetchProjectById: async (id) => {
    set({ isLoading: true });
    try {
      // Mock data
      set({
        currentProject: {
          id,
          title: 'Project',
          description: 'Description',
        },
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export const useContractedServiceStore = create((set, get) => ({
  contractedServices: [],
  isLoading: false,
  error: null,

  fetchContractedServices: async () => {
    set({ isLoading: true, error: null });
    try {
      const { serviceService } = await import('../services');
      const response = await serviceService.getContractedServices();
      set({ contractedServices: response.data.results || response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.detail || 'Error al cargar servicios', isLoading: false });
    }
  },

  updateContractedService: async (id, data) => {
    set({ isLoading: true });
    try {
      const { serviceService } = await import('../services');
      const response = await serviceService.updateContractedService(id, data);
      const updated = get().contractedServices.map(s => s.id === id ? response.data : s);
      set({ contractedServices: updated, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.detail || 'Error al actualizar servicio', isLoading: false });
      throw error;
    }
  },

  createContractedService: async (data) => {
    set({ isLoading: true });
    try {
      const { serviceService } = await import('../services');
      const response = await serviceService.createContractedService(data);
      set({ contractedServices: [...get().contractedServices, response.data], isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.detail || 'Error al crear servicio', isLoading: false });
      throw error;
    }
  },
}));

export const useUserStore = create((set) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const { userService } = await import('../services');
      const response = await userService.getUsers();
      set({ users: response.data.results || response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.detail || 'Error al cargar usuarios', isLoading: false });
    }
  },
}));

export const useSupportStore = create((set, get) => ({
  messages: [],
  unreadCounts: {}, // { userId: count }
  isAdminOnline: false,
  isLoading: false,
  error: null,

  fetchAdminStatus: async () => {
    try {
      const { supportService } = await import('../services');
      const response = await supportService.getAdminStatus();
      set({ isAdminOnline: response.data.is_online });
    } catch (error) {
      console.error("Error fetching admin status", error);
    }
  },

  fetchUnreadCounts: async () => {
    try {
      const { supportService } = await import('../services');
      const response = await supportService.getUnreadCounts();
      const counts = {};
      response.data.forEach(item => {
        counts[item.sender] = item.count;
      });
      set({ unreadCounts: counts });
    } catch (error) {
      console.error("Error fetching unread counts", error);
    }
  },

  fetchMessages: async () => {
    set({ isLoading: true });
    try {
      const { supportService } = await import('../services');
      const response = await supportService.getMessages();
      // Si la respuesta está paginada, los datos están en results
      const messagesData = response.data.results || response.data;
      set({ messages: Array.isArray(messagesData) ? messagesData : [], isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchUserMessages: async (userId) => {
    set({ isLoading: true });
    try {
      const { supportService } = await import('../services');
      const response = await supportService.getUserMessages(userId);
      set({ messages: response.data, isLoading: false });
      // Limpiar conteo localmente
      const newCounts = { ...get().unreadCounts };
      delete newCounts[userId];
      set({ unreadCounts: newCounts });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  sendMessage: async (body, recipientId = null) => {
    try {
      const { supportService } = await import('../services');
      const payload = { body };
      if (recipientId) {
        payload.recipient = recipientId;
        payload.is_admin_reply = true;
      }
      const response = await supportService.sendMessage(payload);
      // Forzar recarga inmediata para sincronizar con el servidor
      if (recipientId) {
        await get().fetchUserMessages(recipientId);
      } else {
        await get().fetchMessages();
      }
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  tickets: [],
  fetchTickets: async () => {
    set({ isLoading: true });
    try {
      const { supportService } = await import('../services');
      const response = await supportService.getTickets();
      const ticketsData = response.data.results || response.data;
      set({ tickets: Array.isArray(ticketsData) ? ticketsData : [], isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false, tickets: [] });
    }
  },

  createTicket: async (data) => {
    set({ isLoading: true });
    try {
      const { supportService } = await import('../services');
      const response = await supportService.createTicket(data);
      set({ tickets: [response.data, ...get().tickets], isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateTicket: async (id, data) => {
    set({ isLoading: true });
    try {
      const { supportService } = await import('../services');
      const response = await supportService.updateTicket(id, data);
      const updated = get().tickets.map(t => t.id === id ? response.data : t);
      set({ tickets: updated, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
}));
