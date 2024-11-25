import Navbar from '@/app/components/navbar';
import { ClipboardPen, FileText, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock para buscar dados do projeto (substituir com sua API real)
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
    // Adicionar outros projetos aqui
  ];

  return projects.find((project) => project.id === projetoId);
}

export default async function ProjetoPage({
  params,
}: {
  params: { projetoId: string };
}) {
  const project = await fetchProject(params.projetoId);

  if (!project) {
    return notFound();
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-950 text-white py-10 mt-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <Link href={`/projetos/${params.projetoId}/editar`}>
              <button className="flex items-center space-x-2 bg-zinc-700 text-white px-4 py-2 rounded-lg hover:bg-zinc-600">
                <ClipboardPen className="w-5 h-5" />
                <span>Editar</span>
              </button>
            </Link>
          </div>
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={128}
            height={128}
            className="rounded-md"
          />
          <p className="text-zinc-300 mt-6">{project.description}</p>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">Tecnologias Utilizadas:</h2>
            <ul className="text-zinc-400 mt-4 space-y-4">
              {Object.entries(project.technologies).map(([category, techs]) => (
                <li key={category}>
                  <span className="font-bold">{category}:</span>
                  <ul className="list-disc ml-5 mt-2">
                    {techs.map((tech, index) => (
                      <li key={index}>{tech}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex space-x-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white"
              >
                <Github className="w-6 h-6" />
              </a>
            )}
            {project.documentationUrl && (
              <a
                href={project.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white"
              >
                <FileText className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
