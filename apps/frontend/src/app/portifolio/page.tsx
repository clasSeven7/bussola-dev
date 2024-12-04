'use client';

import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import api from '@/services/api';
import { CirclePlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Portfolio = {
  id: string;
  user: {
    image: string;
    id: string;
    name: string;
  };
  image: string;
  projects: {
    id: string;
    title: string;
    technologies: string[]; // Garante que é um array de strings
  }[];
};

export default function Portfolios() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast({
            title: 'Autenticação necessária',
            description: 'Faça login para visualizar seus portfólios.',
            variant: 'destructive',
          });
          return;
        }

        const response = await api.get('/portfolios', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedPortfolios = Array.isArray(response.data?.results)
          ? response.data.results
          : [];
        setPortfolios(fetchedPortfolios);
        console.log('Portfólios carregados:', fetchedPortfolios);
      } catch (error) {
        console.error('Erro ao carregar portfólios:', error);
        setHasError(true);
        toast({
          title: 'Erro ao carregar portfólios',
          description: 'Tente novamente mais tarde.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-950 text-white px-6 py-12 mt-24">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Portfólios</h1>
          <Link href="/portifolio/criar">
            <Button>
              <CirclePlus className="mr-2" />
              Criar Portfólio
            </Button>
          </Link>
        </div>

        {/* Conteúdo */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-zinc-400"></div>
          </div>
        ) : hasError ? (
          <p className="text-zinc-400">
            Ocorreu um erro ao carregar os portfólios.
          </p>
        ) : portfolios.length === 0 ? (
          <p className="text-zinc-400">Nenhum portfólio encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio) => (
              <div
                key={portfolio.id || portfolio.user.id} // chave única
                className="bg-zinc-800 p-6 rounded-lg shadow-md"
              >
                {/* Avatar do Usuário */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-4">
                    <Image
                      src={portfolio.user?.image || '/default-avatar.png'}
                      alt={portfolio.user?.name || 'Avatar do Usuário'}
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-zinc-200">
                    {portfolio.user?.name || 'Nome do Usuário'}
                  </h2>
                </div>

                {/* Imagem do Portfólio */}
                <div className="mb-4 relative h-40 w-full rounded-md overflow-hidden">
                  <Image
                    src={portfolio.image || '/default-portfolio.png'}
                    alt={`Imagem do portfólio de ${portfolio.user?.name}`}
                    width={300}
                    height={200}
                    objectFit="cover"
                  />
                </div>

                {/* Projetos */}
                <h3 className="text-md font-semibold text-zinc-300 mb-2">
                  Projetos:
                </h3>
                <ul className="text-sm text-zinc-400 space-y-1">
                  {Array.isArray(portfolio.projects) &&
                  portfolio.projects.length > 0 ? (
                    portfolio.projects.map((project) => (
                      <li key={project.id} className="mb-2">
                        <strong>{project.title}</strong>
                        <div className="text-xs text-zinc-500 mt-1">
                          {Array.isArray(project.technologies) &&
                          project.technologies.length
                            ? project.technologies.join(', ')
                            : 'Tecnologias não disponíveis'}
                        </div>
                      </li>
                    ))
                  ) : (
                    <p className="text-zinc-500">Nenhum projeto adicionado.</p>
                  )}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
