'use client';

import Navbar from '@/components/navbar';
import ProjectCard from '@/components/projectCard';
import useAuth from '@/hooks/useAuth';
import { useFeedProjects } from '@/hooks/useFeedProjects';

export default function Home() {
  useAuth(); // Verifica se o usuário está autenticado ao carregar a página
  const { feedProjects, handleLike } = useFeedProjects(); // Obtém os projetos e a função de curtir

  return (
    <>
      <Navbar />
      <main className="mt-24">
        {/* Feed Section */}
        <section id="feed" className="py-8 bg-zinc-950">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-zinc-200">
              Feed de Projetos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Mapeia os projetos para renderizar o ProjectCard */}
              {feedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onLike={handleLike}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
