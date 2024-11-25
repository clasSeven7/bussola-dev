'use client';

import { CheckCircle, Folder } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CreateProject() {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    technologies: string;
    image: File | null;
  }>({
    title: '',
    description: '',
    technologies: '',
    image: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para submeter o formulário (pode envolver uma requisição para a API)
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <Folder className="mr-2" /> Criar Projeto
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-zinc-300"
            >
              Título
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 border border-zinc-700 rounded-md bg-zinc-900 text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-zinc-300"
            >
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 border border-zinc-700 rounded-md bg-zinc-900 text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="technologies"
              className="block text-sm font-medium text-zinc-300"
            >
              Tecnologias
            </label>
            <input
              id="technologies"
              name="technologies"
              type="text"
              value={formData.technologies}
              onChange={handleChange}
              required
              placeholder="Ex: React, Node.js, Django"
              className="block w-full px-3 py-2 border border-zinc-700 rounded-md bg-zinc-900 text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-zinc-300"
            >
              Imagem
            </label>
            <input
              id="image"
              name="image"
              type="file"
              onChange={handleFileChange}
              className="block w-full text-zinc-300"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 rounded-md text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            >
              <CheckCircle className="mr-2 inline" /> Criar Projeto
            </button>
          </div>

          <div className="mt-4 text-center text-sm text-zinc-400">
            <Link
              href="/projetos"
              className="text-indigo-400 hover:text-indigo-500"
            >
              Ver projetos
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
