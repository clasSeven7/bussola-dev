'use client';

import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import api from '@/services/api';
import { ClipboardPen, FileText } from 'lucide-react'; // Adiciona os ícones
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// Função para buscar o projeto no banco de dados via API
async function fetchProject(projetoId: string) {
  try {
    const response = await api.get(`/projects/${projetoId}`);
    return response.data; // Retorna os dados do projeto
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    return null;
  }
}

// Função para atualizar o projeto na API
async function updateProject(projetoId: string, updatedData: any) {
  try {
    const response = await api.put(`/projects/${projetoId}`, updatedData);
    return response.data; // Retorna os dados do projeto atualizado
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
    githubUrl?: string;
    documentationUrl?: string;
  }

  const router = useRouter();
  const { projetoId } = params; // Acessando o param corretamente
  const [project, setProject] = useState<Project | null>(null); // Para armazenar os dados do projeto
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [technologies, setTechnologies] = useState('');

  // Carrega o projeto ao montar o componente
  useEffect(() => {
    const loadProject = async () => {
      if (!projetoId) return; // Verifica se o projetoId foi resolvido
      const projectData = await fetchProject(projetoId);
      if (!projectData) {
        notFound(); // Mostra a página 404 se o projeto não for encontrado
      } else {
        setProject(projectData);
        setTitle(projectData.title || '');
        setDescription(projectData.description || '');
        setTechnologies(JSON.stringify(projectData.technologies || {}));
      }
    };

    console.log(projetoId);

    loadProject();
  }, [projetoId]);

  // Função para salvar as edições
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedProject = {
      title,
      description,
      technologies: JSON.parse(technologies),
      image: image ? await convertToBase64(image) : project?.image,
    };

    try {
      await updateProject(projetoId, updatedProject);
      alert('Projeto atualizado com sucesso!');
      router.push(`/projetos/${projetoId}`); // Redireciona para a página do projeto
    } catch (error) {
      alert('Erro ao atualizar o projeto.');
      console.error(error);
    }
  };

  // Função auxiliar para converter imagem em base64
  const convertToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  if (!project) return null; // Renderiza nada até que o projeto seja carregado

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-950 text-white py-10 mt-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">
              Editar Projeto: {project.title}
            </h1>
            <Link href={`/projetos/${projetoId}`}>
              <button
                aria-label="Voltar para o projeto"
                className="flex items-center space-x-2 bg-zinc-700 text-white px-4 py-2 rounded-lg hover:bg-zinc-600"
              >
                <ClipboardPen className="w-5 h-5" />
                <span>Cancelar</span>
              </button>
            </Link>
          </div>

          {/* Exibe a imagem do projeto */}
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

          {/* Formulário para editar o projeto */}
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
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
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
                onChange={(e) => setTechnologies(e.target.value)}
                className="w-full h-32 p-3 rounded-md bg-zinc-800 text-white border border-zinc-700"
                required
              />
            </div>

            {/* Exibe os ícones de GitHub e Documentação */}
            <div className="mb-6 flex space-x-4">
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  className="flex items-center space-x-2 text-blue-500"
                  target="_blank"
                >
                  <span>GitHub</span>
                </Link>
              )}
              {project.documentationUrl && (
                <Link
                  href={project.documentationUrl}
                  className="flex items-center space-x-2 text-blue-500"
                  target="_blank"
                >
                  <FileText className="w-6 h-6" />
                  <span>Documentação</span>
                </Link>
              )}
            </div>

            <div className="mt-6 flex justify-between">
              <Button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-500"
              >
                Salvar Alterações
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
