import api from './api';

export const authService = {
  login: (username, password) =>
    api.post('/users/token/', { username, password }),
  
  register: (username, email, password) =>
    api.post('/users/register/', { username, email, password }),
  
  getCurrentUser: () =>
    api.get('/users/me/'),
  
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
};

export const userService = {
  getProfile: () =>
    api.get('/users/profiles/my_profile/'),
  
  updateProfile: (data) =>
    api.put('/users/profiles/update_profile/', data),
};

export const serviceService = {
  getServices: (params) =>
    api.get('/services/', { params }),
  
  createService: (data) =>
    api.post('/services/', data),
  
  updateService: (id, data) =>
    api.put(`/services/${id}/`, data),
  
  deleteService: (id) =>
    api.delete(`/services/${id}/`),
};

export const projectService = {
  getProjects: (params) =>
    api.get('/projects/', { params }),
  
  getProject: (id) =>
    api.get(`/projects/${id}/`),
  
  createProject: (data) =>
    api.post('/projects/', data),
  
  updateProject: (id, data) =>
    api.put(`/projects/${id}/`, data),
  
  deleteProject: (id) =>
    api.delete(`/projects/${id}/`),
  
  addComment: (projectId, content) =>
    api.post(`/projects/${projectId}/add_comment/`, { content }),
  
  incrementViews: (projectId) =>
    api.get(`/projects/${projectId}/increment_views/`),
};
