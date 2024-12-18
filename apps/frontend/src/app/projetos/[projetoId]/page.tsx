'use client';

import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import api from '@/services/api';
import { CircleArrowLeft, ClipboardPen, IdCard, Info } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

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

export default function ProjetoPage({
  params,
}: {
  params: { projetoId: string };
}) {
  interface Project {
    title: string;
    image?: string;
    description?: string;
    technologies?: { [key: string]: string[] };
    user: string;
  }

  const [project, setProject] = React.useState<Project | null>(null); // Para armazenar os dados do projeto
  const [projetoId, setProjetoId] = React.useState<string | null>(null);
  // Desestruturação de params e controle com React.use()
  React.useEffect(() => {
    if (params.projetoId) {
      setProjetoId(params.projetoId); // Armazena o projetoId assim que está disponível
    }
  }, [params]);

  // Carrega o projeto ao montar o componente
  React.useEffect(() => {
    const loadProject = async () => {
      if (!projetoId) return; // Verifica se o projetoId foi resolvido
      const projectData = await fetchProject(projetoId);
      if (!projectData) {
        notFound(); // Mostra a página 404 se o projeto não for encontrado
      }
      setProject(projectData);
    };

    loadProject();
  }, [projetoId]);

  // Redireciona para login caso o projeto não esteja disponível
  if (!project) return null; // Renderiza nada até que o projeto seja carregado

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-950 text-white py-10 mt-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <Link href={`/projetos/${projetoId}/editar`}>
              <button
                aria-label="Editar projeto" // Melhorando a acessibilidade
                className="flex items-center space-x-2 bg-zinc-700 text-white px-4 py-2 rounded-lg hover:bg-zinc-600"
              >
                <ClipboardPen className="w-5 h-5" />
                <span>Editar</span>
              </button>
            </Link>
          </div>
          <div>
            <div className="flex items-center justify-left gap-2 mb-4">
              <Info className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Informações do Projeto:</h2>
            </div>
            <div className="flex items-center justify-left gap-2">
              <IdCard className="w-6 h-6" />
              <p className="text-zinc-200">ID do Projeto: {projetoId}</p>
            </div>
            <div className="flex items-center justify-left gap-2">
              <IdCard className="w-6 h-6" />
              <p className="text-zinc-200">ID do Usuário: {project.user}</p>
            </div>
          </div>
          <Image
            src={project.image || '/default-image.png'}
            alt={project.title}
            width={512}
            height={512}
            className="rounded-md mt-4"
          />

          {/* Exibe descrição do projeto com texto de fallback */}
          <p className="text-zinc-300 mt-6">
            {project.description || 'Descrição não disponível.'}
          </p>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">Tecnologias Utilizadas:</h2>
            <ul className="text-zinc-400 mt-4 space-y-4">
              {Object.entries(project.technologies || {}).map(
                ([category, techs]) => (
                  <li key={category}>
                    <span className="font-bold">{category}:</span>
                    <ul className="list-disc ml-5 mt-2">
                      {(techs || []).map((tech, index) => (
                        <li key={index}>{tech}</li>
                      ))}
                    </ul>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="flex justify-center items-center text-center">
          <Button className="flex justify-center items-center pt-8 pb-8 pr-22 pl-22">
            <Link
              href="/projetos/"
              className="flex items-center gap-1 text-base"
            >
              <CircleArrowLeft className="w-6 h-6" />
              Voltar
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
