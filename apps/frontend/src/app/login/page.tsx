'use client';

import axios from 'axios';
import { KeyRound, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Importe o useRouter
import { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const router = useRouter(); // Inicialize o router

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Enviar as credenciais para o backend Django
      const response = await axios.post('http://localhost:8000/api/token/', {
        username: formData.username,
        password: formData.password,
      });
      // Salvar o token no localStorage
      localStorage.setItem('token', response.data.access);
      console.log('Login bem-sucedido:', response.data);

      // Redirecionar para a página inicial após login bem-sucedido
      router.push('/'); // Isso leva o usuário para a página '/'
    } catch (error) {
      setError('Credenciais inválidas.');
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="flex align-center items-center justify-left text-center text-sm font-medium text-zinc-300"
            >
              <Mail width={18} className="mr-1" aria-hidden="true" />
              Username
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border border-zinc-700 rounded-md bg-zinc-900 text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="flex align-center items-center justify-left text-center text-sm font-medium text-zinc-300"
            >
              <KeyRound width={18} className="mr-1" aria-hidden="true" />
              Senha
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border border-zinc-700 rounded-md bg-zinc-900 text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 rounded-md text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            >
              Entrar
            </button>
          </div>

          <div className="mt-4 text-center text-sm text-zinc-400">
            Não tem uma conta?{' '}
            <Link
              href="/cadastro"
              className="text-indigo-400 hover:text-indigo-500"
            >
              Crie uma conta
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
