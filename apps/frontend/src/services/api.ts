import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Base URL da API
});

// Adicionar o token JWT automaticamente ao cabeçalho de autorização
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Obtenha o token do localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
