'use client';

import { Save, UserCircle } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

export default function EditUser() {
  const existingUser = useMemo(
    () => ({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      icon: null as File | null,
      typename: 'Desenvolvedor',
    }),
    []
  );

  const [formData, setFormData] = useState<typeof existingUser>(existingUser);

  useEffect(() => {
    // Atualiza os dados iniciais do usuário
    setFormData(existingUser);
  }, [existingUser]);

  useEffect(() => {
    return () => {
      if (formData.icon)
        URL.revokeObjectURL(URL.createObjectURL(formData.icon));
    };
  }, [formData.icon]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, icon: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    console.log('Updated User Data: ', formData);
    // Aqui você pode integrar com a API ou back-end para salvar as alterações
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-950 pt-14 pb-14">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 shadow-md rounded-lg p-6 sm:p-8 w-full max-w-md"
      >
        <div className="flex items-center gap-2 mb-6">
          <UserCircle className="h-8 w-8 text-zinc-500" />
          <h2 className="text-xl font-bold text-zinc-200">Editar Usuário</h2>
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-400"
          >
            Nome
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-zinc-600 bg-zinc-900 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-3"
            placeholder="Digite o nome completo"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-400"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-zinc-600 bg-zinc-900 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-3"
            placeholder="Digite um email válido"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-zinc-400"
          >
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-zinc-600 bg-zinc-900 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-3"
            placeholder="Digite uma senha segura"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="icon"
            className="block text-sm font-medium text-zinc-400"
          >
            Ícone (Imagem de Perfil)
          </label>
          {formData.icon && (
            <Image
              src={URL.createObjectURL(formData.icon)}
              alt="User Icon"
              width={64}
              height={64}
              className="mb-2 w-16 h-16 rounded-full object-cover"
            />
          )}
          <input
            type="file"
            id="icon"
            name="icon"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 p-3"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="typename"
            className="block text-sm font-medium text-zinc-400"
          >
            Tipo de Usuário
          </label>
          <select
            id="typename"
            name="typename"
            value={formData.typename}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-zinc-600 bg-zinc-900 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-3"
          >
            <option value="Desenvolvedor">Desenvolvedor</option>
            <option value="Recrutador">Recrutador</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!formData.name || !formData.email || !formData.password}
          className={`flex items-center justify-center w-full py-2 px-4 rounded-md shadow transition-colors ${
            !formData.name || !formData.email || !formData.password
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <Save className="h-5 w-5 mr-2" />
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
