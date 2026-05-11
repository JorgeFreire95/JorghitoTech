import api from './api';

export const authService = {
  login: (username, password) =>
    api.post('/token/', { username, password }),
  
  register: (fullName, email, password) =>
    api.post('/users/register/', { fullName, email, password }),
  
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
    
  getUsers: () =>
    api.get('/users/'),
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
    
  getContractedServices: () =>
    api.get('/services/contracted/'),
    
  updateContractedService: (id, data) =>
    api.put(`/services/contracted/${id}/`, data),
    
  createContractedService: (data) =>
    api.post('/services/contracted/', data),
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

export const supportService = {
  getMessages: () =>
    api.get('/support/messages/'),
  
  sendMessage: (data) =>
    api.post('/support/messages/', data),

  getAdminStatus: () =>
    api.get('/support/messages/admin_status/'),

  getUnreadCounts: () =>
    api.get('/support/messages/unread_counts/'),

  getUserMessages: (userId) =>
    api.get(`/support/messages/${userId}/user_messages/`),
};
