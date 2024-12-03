'use client';

import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import api from '@/services/api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CreatePortfolio() {
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [projects, setProjects] = useState<{ id: string; title: string }[]>([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [portfolioImage, setPortfolioImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('Você precisa estar autenticado para criar um portfólio.');
        router.push('/login');
        return;
      }

      try {
        const [usersResponse, projectsResponse] = await Promise.all([
          api.get('/users', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get('/projects', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUsers(usersResponse.data || []);
        setProjects(projectsResponse.data.results || []);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        alert('Erro ao carregar usuários ou projetos. Tente novamente.');
      }
    };

    fetchData();
  }, [router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPortfolioImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('userId', selectedUser);
    formData.append('projectId', selectedProject);
    if (portfolioImage) formData.append('image', portfolioImage);

    const token = localStorage.getItem('token');

    try {
      await api.post('/portfolios', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Portfólio criado com sucesso!');
    } catch (error) {
      alert('Erro ao criar portfólio.');
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto py-10 mt-16">
        <h1 className="text-zinc-200 text-2xl font-bold mb-6">
          Criar Portfólio
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Campo Usuário */}
          <div className="mb-4">
            <label className="text-zinc-200 block text-lg font-semibold mb-2">
              Usuário
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="block w-full px-3 py-2 border rounded-md text-zinc-200 bg-zinc-800"
            >
              <option value="" disabled>
                Selecione um usuário
              </option>
              {users.length > 0 ? (
                users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))
              ) : (
                <option disabled>Nenhum usuário encontrado</option>
              )}
            </select>
          </div>

          {/* Foto do Portfólio */}
          <div className="mb-4">
            <label className="text-zinc-200 block text-lg font-semibold mb-2">
              Foto
            </label>
            {imagePreview && (
              <div className="mb-2">
                <Image
                  src={imagePreview}
                  alt="Pré-visualização da imagem"
                  className="w-full h-auto max-w-xs object-cover"
                />
              </div>
            )}
            <input
              type="file"
              className="text-zinc-200"
              onChange={handleImageChange}
            />
          </div>

          {/* Campo Projeto */}
          <div className="mb-4">
            <label className="text-zinc-200 block text-lg font-semibold mb-2">
              Projeto
            </label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="block w-full px-3 py-2 border rounded-md text-zinc-200 bg-zinc-800"
            >
              <option value="" disabled>
                Selecione ou crie um projeto
              </option>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))
              ) : (
                <option disabled>Nenhum projeto encontrado</option>
              )}
            </select>
          </div>

          {/* Botão para Criar Novo Projeto */}
          <Button
            type="button"
            className="mt-4"
            onClick={() => router.push('/projetos/criar')}
          >
            Criar Novo Projeto
          </Button>

          {/* Botão de Criar Portfólio */}
          <Button type="submit" className="w-full mt-6">
            Criar Portfólio
          </Button>
        </form>
      </div>
    </>
  );
}
