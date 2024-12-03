import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // URL da API
  // baseURL: '0.0.0.0:8000/api', // docker
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.error('Token não encontrado');
  }
  return config;
});

export default api;
