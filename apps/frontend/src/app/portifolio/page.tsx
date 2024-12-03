'use client';

import Navbar from '@/components/navbar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    technologies: string[];
  }[];
};

export default function PortfolioHome() {
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

        // Verifica se response.data e response.data.results existem e são arrays
        const fetchedPortfolios = Array.isArray(response.data?.results)
          ? response.data.results
          : [];
        setPortfolios(fetchedPortfolios);
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
              <Card key={portfolio.id} className="bg-zinc-800">
                <CardHeader className="flex flex-col items-center">
                  {/* Avatar do Usuário */}
                  <Avatar className="mb-4">
                    <AvatarImage
                      src={portfolio.user.image || '/default-avatar.png'}
                      alt={portfolio.user.name}
                    />
                    <AvatarFallback>
                      {portfolio.user.name?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg font-bold text-zinc-200">
                    {portfolio.user.name}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  {/* Imagem do Portfólio */}
                  <div className="mb-4 relative h-40 w-full rounded-md overflow-hidden">
                    <Image
                      src={portfolio.image || '/default-portfolio.png'}
                      alt={`Imagem do portfólio de ${portfolio.user.name}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>

                  {/* Projetos */}
                  <h3 className="text-md font-semibold text-zinc-300 mb-2">
                    Projetos:
                  </h3>
                  <ul className="text-sm text-zinc-400 space-y-1">
                    {portfolio.projects.length > 0 ? (
                      portfolio.projects.map((project) => (
                        <li key={project.id}>{project.title}</li>
                      ))
                    ) : (
                      <p>Nenhum projeto adicionado.</p>
                    )}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
