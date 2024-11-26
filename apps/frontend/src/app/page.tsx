'use client';

import { Heart, MessageSquare, Share2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Navbar from './components/navbar';

export default function Home() {
  const [feedProjects, setFeedProjects] = useState([
    {
      id: 1,
      title: 'Bússola Dev',
      description: 'Rede social para desenvolvedores e recrutadores.',
      likes: 125,
      comments: 20,
      image: '/images/bussola-dev.png', // Exemplo de imagem (substitua pela sua)
    },
    {
      id: 2,
      title: 'Take Care',
      description: 'Aplicativo para cuidar de idosos e promover bem-estar.',
      likes: 98,
      comments: 15,
      image: '/images/take-care.png',
    },
    // Adicione mais projetos aqui
  ]);

  const [comments] = useState([
    { id: 1, user: 'João Dev', content: 'Projeto incrível! 👏' },
    { id: 2, user: 'Ana Codes', content: 'Mal posso esperar para usar isso.' },
  ]);

  const handleLike = (id: number) => {
    setFeedProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, likes: project.likes + 1 } : project
      )
    );
  };
  return (
    <>
      <Navbar />
      <main className="mt-24">
        {/* Feed Section */}
        <section id="feed" className="py-8 bg-zinc-900">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6">Feed de Projetos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {feedProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-zinc-800 p-4 rounded-lg shadow hover:shadow-lg transition"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={200}
                    className="rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-zinc-400 mb-4">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleLike(project.id)}
                        className="flex items-center text-blue-500 hover:text-blue-400"
                      >
                        <Heart className="h-5 w-5 mr-1" />
                        {project.likes}
                      </button>
                      <div className="flex items-center text-zinc-400">
                        <MessageSquare className="h-5 w-5 mr-1" />
                        {project.comments}
                      </div>
                    </div>
                    <button className="text-zinc-400 hover:text-zinc-200 flex items-center">
                      <Share2 className="h-5 w-5 mr-1" />
                      Compartilhar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Comments Section */}
        <section id="comments" className="py-8">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Comentários da Comunidade
            </h2>
            <div className="bg-zinc-800 p-6 rounded-lg">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-b border-zinc-700 py-4 last:border-0"
                >
                  <p className="text-zinc-200">
                    <span className="font-bold">{comment.user}:</span>{' '}
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="bg-zinc-800 py-4 text-center text-zinc-400">
          <p>&copy; 2024 DevDashboard. Todos os direitos reservados.</p>
        </footer>
        );
      </main>
    </>
  );
}
