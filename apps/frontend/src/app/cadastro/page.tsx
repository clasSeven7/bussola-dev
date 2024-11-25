'use client';

import { Milestone } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    typename: 'Desenvolvedor', // Valor padrão
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para cadastrar o usuário
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="flex item-center justify-start text-2xl font-semibold mb-6">
          <Milestone className="w-8 h-8 mr-2" />
          Cadastro
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-300"
            >
              Nome
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border border-zinc-700 rounded-md bg-zinc-900 text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-300"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border border-zinc-700 rounded-md bg-zinc-900 text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-300"
            >
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

          <div>
            <label
              htmlFor="typename"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              Tipo de Usuário
            </label>
            <select
              id="typename"
              name="typename"
              value={formData.typename}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 border border-zinc-700 rounded-md bg-zinc-900 text-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Desenvolvedor">Desenvolvedor</option>
              <option value="Recrutador">Recrutador</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 rounded-md text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            >
              Criar Conta
            </button>
          </div>

          <div className="mt-4 text-center text-sm text-zinc-400">
            Já tem uma conta?{' '}
            <Link
              href="/login"
              className="text-indigo-400 hover:text-indigo-500"
            >
              Faça login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
