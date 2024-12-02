'use client';

import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import api from '@/services/api';
import { Save, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// Função para buscar o projeto no banco de dados via API
async function fetchProject(projetoId: string) {
  try {
    const response = await api.get(`/projects/${projetoId}/`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    return null;
  }
}

// Função para atualizar o projeto na API
async function updateProject(projetoId: string, updatedData: FormData) {
  try {
    const response = await api.put(`/projects/${projetoId}/`, updatedData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
    throw error;
  }
}

export default function EditProjectPage({
  params,
}: {
  params: { projetoId: string };
}) {
  interface Project {
    title: string;
    image?: string;
    description?: string;
    technologies?: { [key: string]: string[] };
    user?: string;
  }

  const router = useRouter();
  const { projetoId } = params;
  const [project, setProject] = useState<Project | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [technologies, setTechnologies] = useState('');
  const [isJsonValid, setIsJsonValid] = useState(true); // Estado para validação de JSON
  const [user, setUser] = useState('');

  // Carrega o projeto ao montar o componente
  useEffect(() => {
    const loadProject = async () => {
      if (!projetoId) return;
      const projectData = await fetchProject(projetoId);
      if (!projectData) {
        notFound();
      } else {
        setProject(projectData);
        setTitle(projectData.title || '');
        setDescription(projectData.description || '');
        setTechnologies(
          JSON.stringify(projectData.technologies || {}, null, 2)
        );
        setUser(projectData.user || '');
      }
    };

    loadProject();
  }, [projetoId]);

  // Validação e atualização do campo de tecnologias
  const handleTechnologiesChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setTechnologies(value);

    // Valida se o JSON é válido
    try {
      JSON.parse(value);
      setIsJsonValid(true);
    } catch {
      setIsJsonValid(false);
    }
  };

  // Função para salvar as edições
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isJsonValid) {
      alert('O campo Tecnologias deve conter um JSON válido.');
      return;
    }

    try {
      const updatedProject = new FormData();
      updatedProject.append('title', title);
      updatedProject.append('description', description);
      updatedProject.append('technologies', technologies);

      if (image) {
        updatedProject.append('image', image);
      }

      updatedProject.append('user', user);

      await updateProject(projetoId, updatedProject);

      alert('Projeto atualizado com sucesso!');
      router.push(`/projetos/${projetoId}/`);
    } catch (error) {
      alert(
        'Erro ao atualizar o projeto. Verifique os dados e tente novamente.'
      );
      console.error(error);
    }
  };

  // Função para atualizar a imagem e mostrar o preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file || null);
  };

  if (!project) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-950 text-white py-10 mt-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">
              Editar Projeto: {project.title}
            </h1>
            <Link href={`/projetos/${projetoId}/`}>
              <Button
                aria-label="Voltar para o projeto"
                className="flex items-center bg-zinc-700 text-white rounded-lg hover:bg-red-600"
              >
                <X className="w-5 h-5" />
                <span>Cancelar</span>
              </Button>
            </Link>
          </div>

          <div className="mb-4">
            <Image
              src={
                image
                  ? URL.createObjectURL(image)
                  : project.image || '/default-image.png'
              }
              alt={project.title}
              width={128}
              height={128}
              className="rounded-md"
            />
          </div>

          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-lg font-semibold mb-2"
              >
                Título
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-lg font-semibold mb-2"
              >
                Descrição
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-lg font-semibold mb-2"
              >
                Imagem
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="technologies"
                className="block text-lg font-semibold mb-2"
              >
                Tecnologias
              </label>
              <textarea
                id="technologies"
                value={technologies}
                onChange={handleTechnologiesChange}
                className={`w-full h-32 p-3 rounded-md bg-zinc-800 text-white border ${
                  isJsonValid ? 'border-zinc-700' : 'border-red-500'
                }`}
                required
              />
              {!isJsonValid && (
                <span className="text-red-500 text-sm mt-2">
                  O campo deve conter um JSON válido.
                </span>
              )}
            </div>

            <div>
              <label htmlFor="user">
                <span className="block text-lg font-semibold mb-2">
                  Usuário
                </span>
                <input
                  type="text"
                  id="user"
                  value={project.user}
                  className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700"
                  readOnly
                />
              </label>
            </div>

            <div className="mt-6 flex justify-between">
              <Button
                type="submit"
                className="bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                <Save className="w-5 h-5" />
                Salvar Alterações
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
