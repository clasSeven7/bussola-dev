'use client';

import Navbar from '@/components/navbar';

const portfolios = [
  {
    name: 'Take Care',
    description: 'Aplicativo para cuidar do bem-estar de idosos.',
    link: '/portifolio/1',
  },
  {
    name: 'Bússola Dev',
    description: 'Rede social para desenvolvedores e recrutadores.',
    link: '/portifolio/2',
  },
  // Adicione mais portfólios aqui
];

export default function PortfolioHome() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-950 text-white p-8 mt-24">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold">Meu Portfólio</h1>
          <p className="text-zinc-400">
            Explore meus projetos e contribuições.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Projetos</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolios.map((portfolio, index) => (
              <div
                key={index}
                className="p-4 bg-zinc-800 rounded-lg shadow-md hover:bg-zinc-700"
              >
                <h3 className="text-xl font-bold">{portfolio.name}</h3>
                <p className="text-zinc-400">{portfolio.description}</p>
                <a
                  href={portfolio.link}
                  className="mt-3 inline-block text-indigo-400 hover:text-indigo-500"
                >
                  Ver Mais
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
