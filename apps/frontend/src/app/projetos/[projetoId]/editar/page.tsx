'use client';

import Navbar from '@/app/components/navbar';
import { CirclePlus, ClipboardPen, Trash } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

async function fetchProject(projetoId: string) {
  const projects = [
    {
      id: '1',
      title: 'Meu Projeto 1',
      description: 'Descrição detalhada do projeto 1.',
      imageUrl: '/image.png',
      technologies: {
        frontend: ['React', 'Tailwind CSS'],
        backend: ['Django', 'PostgreSQL'],
      },
      githubUrl: 'https://github.com/exemplo/projeto1',
      documentationUrl: 'https://docs.projeto1.com',
    },
  ];

  return projects.find((project) => project.id === projetoId);
}

export default function EditarProjetoPage({
  params,
}: {
  params: { projetoId: string };
}): JSX.Element {
  const router = useRouter();
  interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    technologies: {
      frontend: string[];
      backend: string[];
    };
    githubUrl: string;
    documentationUrl: string;
  }

  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      if (params.projetoId) {
        const fetchedProject = await fetchProject(params.projetoId);
        if (fetchedProject) {
          setProject(fetchedProject);
        } else {
          console.error('Project not found');
        }
      }
    };

    // Unwrap params using React.use() here if it's a Promise.
    loadProject();
  }, [params?.projetoId]); // Ensure you're referencing params correctly.

  if (!project) {
    return <div>Carregando...</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enviando dados do projeto', project);
    router.push(`/projetos/${params.projetoId}`);
  };

  const addTechnology = (category: 'frontend' | 'backend') => {
    const newTech = '';
    setProject({
      ...project,
      technologies: {
        ...project.technologies,
        [category]: [...project.technologies[category], newTech],
      },
    });
  };

  const removeTechnology = (
    category: 'frontend' | 'backend',
    index: number
  ) => {
    const updatedTechs = [...project.technologies[category]];
    updatedTechs.splice(index, 1);
    setProject({
      ...project,
      technologies: {
        ...project.technologies,
        [category]: updatedTechs,
      },
    });
  };

  const handleTechChange = (
    category: 'frontend' | 'backend',
    index: number,
    value: string
  ) => {
    const updatedTechs = [...project.technologies[category]];
    updatedTechs[index] = value;
    setProject({
      ...project,
      technologies: {
        ...project.technologies,
        [category]: updatedTechs,
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-950 text-white py-10 mt-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">
              Editar Projeto: {project.title}
            </h1>
            <Link href={`/projetos/${params.projetoId}`}>
              <button className="flex items-center space-x-2 bg-zinc-700 text-white px-4 py-2 rounded-lg hover:bg-zinc-600">
                <ClipboardPen className="w-5 h-5" />
                <span>Cancelar</span>
              </button>
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="title" className="block text-lg font-semibold">
                Título do Projeto
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={project.title}
                onChange={(e) =>
                  setProject({ ...project, title: e.target.value })
                }
                className="mt-2 w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-lg font-semibold"
              >
                Descrição
              </label>
              <textarea
                id="description"
                name="description"
                value={project.description}
                onChange={(e) =>
                  setProject({ ...project, description: e.target.value })
                }
                className="mt-2 w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold">Tecnologias Utilizadas:</h2>

              <div className="mt-4">
                <label className="font-bold">Frontend:</label>
                <ul className="mt-2">
                  {project.technologies.frontend.map((tech, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) =>
                          handleTechChange('frontend', index, e.target.value)
                        }
                        className="mt-1 w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeTechnology('frontend', index)}
                        className="ml-2 text-red-500 hover:text-red-400"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => addTechnology('frontend')}
                  className="mt-2 flex items-center space-x-2 text-blue-500 hover:underline"
                >
                  <CirclePlus className="w-5 h-5" />
                  <span>Adicionar mais</span>
                </button>
              </div>

              <div className="mt-4">
                <label className="font-bold">Backend:</label>
                <ul className="mt-2">
                  {project.technologies.backend.map((tech, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) =>
                          handleTechChange('backend', index, e.target.value)
                        }
                        className="mt-1 w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeTechnology('backend', index)}
                        className="ml-2 text-red-500 hover:text-red-400"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => addTechnology('backend')}
                  className="mt-2 flex items-center space-x-2 text-blue-500 hover:underline"
                >
                  <CirclePlus className="w-5 h-5" />
                  <span>Adicionar mais</span>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="githubUrl"
                className="block text-lg font-semibold"
              >
                URL do GitHub
              </label>
              <input
                type="url"
                id="githubUrl"
                name="githubUrl"
                value={project.githubUrl}
                onChange={(e) =>
                  setProject({ ...project, githubUrl: e.target.value })
                }
                className="mt-2 w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="documentationUrl"
                className="block text-lg font-semibold"
              >
                URL da Documentação
              </label>
              <input
                type="url"
                id="documentationUrl"
                name="documentationUrl"
                value={project.documentationUrl}
                onChange={(e) =>
                  setProject({ ...project, documentationUrl: e.target.value })
                }
                className="mt-2 w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-400"
            >
              Salvar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
