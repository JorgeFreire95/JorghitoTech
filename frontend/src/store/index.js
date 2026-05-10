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

  register: async (username, email, password) => {
    set({ isLoading: true, error: null });
    try {
      await authService.register(username, email, password);
      return await set.login(username, password);
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
