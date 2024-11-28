// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // URL base da sua API Django
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adicionar o token JWT automaticamente ao cabeçalho de autorização
if (typeof window !== 'undefined') {
  // Somente execute no lado do cliente
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Obtenha o token do localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.error('Token não encontrado');
    }
    return config;
  });
}

export default api;
