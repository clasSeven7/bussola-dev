'use client';

import Navbar from '@/components/navbar';
import api from '@/services/api';
import { Activity, Folder, UserCircle } from 'lucide-react';
import React from 'react';

export default function Dashboard() {
  const [totalProjetos, setTotalProjetos] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects'); // Supondo que esta rota retorna os projetos
        const data = response.data;

        // Verifique se `data` é um array ou possui uma propriedade que contém os projetos
        const projects = data.count;

        // Calcula o total de projetos e os projetos ativos
        const total = projects;
        setTotalProjetos(total);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-950 text-zinc-200 mt-24">
        <header className="bg-zinc-900 py-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">
              Dashboard - bussola.dev
            </h1>
          </div>
        </header>

        <section id="dashboard" className="py-8">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6">Resumo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-zinc-800 p-4 rounded-lg shadow flex items-center">
                <Activity className="text-blue-500 h-10 w-10 mr-4" />
                <div>
                  <h3 className="text-lg font-bold">Projetos Ativos</h3>
                  <p>7</p>
                </div>
              </div>
              <div className="bg-zinc-800 p-4 rounded-lg shadow flex items-center">
                <Folder className="text-green-500 h-10 w-10 mr-4" />
                <div>
                  <h3 className="text-lg font-bold">Total de Projetos</h3>
                  <p>{totalProjetos}</p>
                </div>
              </div>
              <div className="bg-zinc-800 p-4 rounded-lg shadow flex items-center">
                <UserCircle className="text-yellow-500 h-10 w-10 mr-4" />
                <div>
                  <h3 className="text-lg font-bold">Conexões</h3>
                  <p>45</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
