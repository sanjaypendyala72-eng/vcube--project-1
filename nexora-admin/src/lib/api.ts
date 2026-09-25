import axios from 'axios';

// Connect to the configured server endpoint
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/nexora',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for session cookies
});

// Interceptor for handling global errors (like 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear local state if unauthorized, redirect to login
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
