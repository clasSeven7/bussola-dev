/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/services/api';
import { Heart, MessageSquare, Share2 } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface LocalData {
  likes: number;
  comments: number;
}

const ProjectCard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [localData, setLocalData] = useState<Record<number, LocalData>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para carregar curtidas do localStorage
  const loadLikesFromLocalStorage = () => {
    const savedLikes = localStorage.getItem('projectLikes');
    if (savedLikes) {
      return JSON.parse(savedLikes);
    }
    return {};
  };

  // Função para salvar curtidas no localStorage
  const saveLikesToLocalStorage = (likes: Record<number, LocalData>) => {
    localStorage.setItem('projectLikes', JSON.stringify(likes));
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects/');
        setProjects(response.data.results);

        // Carregar as curtidas do localStorage
        const savedLikes = loadLikesFromLocalStorage();

        const initialData = response.data.results.reduce(
          (acc: Record<number, LocalData>, project: Project) => {
            acc[project.id] = savedLikes[project.id] || {
              likes: 0,
              comments: 0,
            };
            return acc;
          },
          {}
        );
        setLocalData(initialData);
      } catch (error: any) {
        if (error.response?.status === 401) {
          alert('Sessão expirada. Faça login novamente.');
          localStorage.removeItem('token');
        } else {
          setError('Erro ao buscar projetos. Tente novamente mais tarde.');
          console.error('Erro ao buscar projetos:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleLike = (id: number) => {
    const newLikes = {
      ...localData,
      [id]: { ...localData[id], likes: localData[id].likes + 1 },
    };
    setLocalData(newLikes);
    saveLikesToLocalStorage(newLikes); // Salvar as curtidas no localStorage
  };

  if (loading) return <div>Carregando...</div>;

  if (error) return <div>{error}</div>;

  if (!projects.length) return <div>Nenhum projeto encontrado.</div>;

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-zinc-900 p-4 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
        >
          {/* Cabeçalho do usuário */}
          <div className="flex items-center space-x-4 mb-4">
            <div>
              <p className="text-sm text-zinc-500">Publicado há 5 minutos</p>
            </div>
          </div>

          {/* Imagem do projeto */}
          <div className="relative h-56 w-full mb-4">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Título e descrição */}
          <h3 className="text-xl font-bold text-zinc-200 mb-2">
            {project.title}
          </h3>
          <p className="text-zinc-600 text-sm mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Interações */}
          <div className="flex justify-between items-center text-zinc-600">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleLike(project.id)}
                className="flex items-center text-blue-500 hover:text-blue-400 transition"
              >
                <Heart className="h-5 w-5 mr-1" />
                <span>{localData[project.id]?.likes || 0}</span>
              </button>
              <div className="flex items-center text-zinc-500">
                <MessageSquare className="h-5 w-5 mr-1" />
                <span>{localData[project.id]?.comments || 0}</span>
              </div>
            </div>
            <button
              className="text-zinc-500 hover:text-zinc-200 flex items-center transition"
              onClick={() => alert('Compartilhar em breve!')}
            >
              <Share2 className="h-5 w-5 mr-1" />
              Compartilhar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectCard;
