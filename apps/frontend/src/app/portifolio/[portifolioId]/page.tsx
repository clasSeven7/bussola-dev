'use client';

import { Bar } from 'react-chartjs-2';

import Navbar from '@/components/navbar';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';

// Registrar as escalas e outros elementos necessários
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Portfolio() {
  const projects = [
    {
      name: 'Take Care',
      description: 'Aplicativo para cuidar do bem-estar de idosos.',
      technologies: ['React', 'Django', 'PostgreSQL'],
      link: 'https://github.com/seu-repo/take-care',
      hoursWorked: 120,
    },
    {
      name: 'Bússola Dev',
      description: 'Rede social para desenvolvedores e recrutadores.',
      technologies: ['Next.js', 'Node.js', 'MongoDB'],
      link: 'https://github.com/seu-repo/bussola-dev',
      hoursWorked: 200,
    },
  ];

  const favoriteLanguages = ['JavaScript', 'Python', 'TypeScript'];
  const favoriteFrameworks = ['React', 'Django', 'Next.js'];

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Horas de Uso de Linguagens',
      },
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Linguagens',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Horas de Uso',
        },
        beginAtZero: true,
      },
    },
  };

  const languageUsage = {
    labels: ['JavaScript', 'Python', 'TypeScript', 'HTML/CSS'],
    datasets: [
      {
        label: 'Horas de uso',
        data: [300, 200, 150, 100],
        backgroundColor: ['#F7DF1E', '#3776AB', '#3178C6', '#E34C26'],
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-950 text-white p-8 mt-24">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold">Meu Portfólio</h1>
          <p className="text-zinc-400">
            Aqui você encontra meus projetos e preferências.
          </p>
        </header>

        {/* Projetos */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Meus Projetos</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project, index) => (
              <div
                key={index}
                className="p-4 bg-zinc-800 rounded-lg shadow-md hover:bg-zinc-700"
              >
                <h3 className="text-xl font-bold">{project.name}</h3>
                <p className="text-zinc-400">{project.description}</p>
                <ul className="mt-2 text-sm text-zinc-300">
                  {project.technologies.map((tech, i) => (
                    <li key={i}>- {tech}</li>
                  ))}
                </ul>
                <a
                  href={project.link}
                  className="mt-3 inline-block text-indigo-400 hover:text-indigo-500"
                >
                  Ver Repositório
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Linguagens e Frameworks */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Preferências</h2>
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium text-lg">Linguagens Favoritas</h3>
              <ul className="mt-2">
                {favoriteLanguages.map((lang, index) => (
                  <li key={index} className="text-zinc-300">
                    - {lang}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-lg">Frameworks Favoritos</h3>
              <ul className="mt-2">
                {favoriteFrameworks.map((fw, index) => (
                  <li key={index} className="text-zinc-300">
                    - {fw}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Gráfico */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Análise de Linguagens</h2>
          <div className="bg-zinc-800 p-4 rounded-lg shadow-md">
            <Bar data={languageUsage} options={options} />
          </div>
        </section>
      </div>
    </>
  );
}
