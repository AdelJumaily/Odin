import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:6789';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Request interceptor to add API key
api.interceptors.request.use((config) => {
  const apiKey = localStorage.getItem('odin_api_key');
  if (apiKey) {
    config.headers['X-API-Key'] = apiKey;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear API key and redirect to login
      localStorage.removeItem('odin_api_key');
      localStorage.removeItem('odin_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const apiService = {
  // Health check
  health: () => api.get('/health'),

  // Authentication
  setApiKey: (apiKey) => {
    localStorage.setItem('odin_api_key', apiKey);
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('odin_user');
    return user ? JSON.parse(user) : null;
  },

  setCurrentUser: (user) => {
    localStorage.setItem('odin_user', JSON.stringify(user));
  },

  logout: () => {
    localStorage.removeItem('odin_api_key');
    localStorage.removeItem('odin_user');
  },

  // File operations
  uploadFile: (file, projectId, ownerUserId) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('project_id', projectId);
    formData.append('owner_user_id', ownerUserId);
    
    return api.post('/api/ingest', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  downloadFile: (docId) => {
    return api.get(`/api/download/${docId}`, {
      responseType: 'blob',
    });
  },

  listFiles: (projectId = null) => {
    const params = projectId ? { project_id: projectId } : {};
    return api.get('/api/list', { params });
  },

  // Search operations
  searchText: (query) => {
    return api.get('/api/search/text', { params: { q: query } });
  },

  searchEntity: (type, value) => {
    return api.get('/api/search/entity', { 
      params: { type, value } 
    });
  },

  searchConnected: (fromType, fromId, rel) => {
    return api.get('/api/search/connected', { 
      params: { from_type: fromType, from_id: fromId, rel } 
    });
  },
};

export default api;
