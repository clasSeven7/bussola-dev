'use client';

import Navbar from '@/components/navbar';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

const projects = [
  { name: 'Portfolio Website', difficulty: 2 },
  { name: 'E-commerce Platform', difficulty: 4 },
  { name: 'Social Media App', difficulty: 5 },
];

const languagesUsed = ['JavaScript', 'Python', 'C#'];

const SkillTree = () => {
  const [developerRank, setDeveloperRank] = useState('Iniciante');
  const [bestLanguage, setBestLanguage] = useState('JavaScript');
  const [trendingLanguages, setTrendingLanguages] = useState<string[]>([]);

  // Calcula o rank com base nos projetos
  useEffect(() => {
    const totalDifficulty = projects.reduce(
      (sum, project) => sum + project.difficulty,
      0
    );
    if (totalDifficulty >= 10) {
      setDeveloperRank('Avançado');
    } else if (totalDifficulty >= 5) {
      setDeveloperRank('Intermediário');
    } else {
      setDeveloperRank('Iniciante');
    }
  }, []);

  // Pesquisa linguagens em alta (simulado com dados estáticos)
  useEffect(() => {
    const fetchTrendingLanguages = async () => {
      // Simular uma API que retorna as linguagens mais populares
      const trending = ['TypeScript', 'Rust', 'Python', 'Go', 'Kotlin'];
      setTrendingLanguages(trending);
    };

    fetchTrendingLanguages();
  }, []);

  const skills = [
    { id: 1, name: 'HTML', unlocked: true },
    { id: 2, name: 'CSS', unlocked: true },
    { id: 3, name: 'JavaScript', unlocked: true },
    { id: 4, name: 'React', unlocked: developerRank !== 'Iniciante' },
    { id: 5, name: 'Node.js', unlocked: developerRank === 'Avançado' },
    { id: 6, name: 'Docker', unlocked: developerRank === 'Avançado' },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-950 text-white p-8 mt-20">
        <h1 className="text-3xl font-bold text-center mb-8">
          Árvore de Habilidades
        </h1>

        {/* Nível Atual */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Nível Atual:</h2>
          <Progress value={70} className="w-full" />
          <p className="text-zinc-400 mt-2">Você está no nível 7</p>
        </div>

        {/* Rank de Desenvolvedor */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Rank de Desenvolvedor:</h2>
          <p className="text-lg mt-2">{developerRank}</p>
        </div>

        {/* Melhor Linguagem Atual */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Melhores Linguagens e Frameworks Atuais:
          </h2>
          <ul className="list-disc ml-6 text-zinc-300">
            {trendingLanguages.map((lang) => (
              <li key={lang}>
                {lang} {languagesUsed.includes(lang) ? '(Você usa!)' : ''}
              </li>
            ))}
          </ul>
        </div>

        {/* Árvore de Habilidades */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          {skills.map((skill) => (
            <Card
              key={skill.id}
              className={`${
                skill.unlocked
                  ? 'bg-green-600 text-white'
                  : 'bg-zinc-800 text-zinc-500'
              }`}
            >
              <CardContent className="p-5">
                <CardTitle>{skill.name}</CardTitle>
                {skill.unlocked ? (
                  <p className="text-sm mt-2">Desbloqueado!</p>
                ) : (
                  <p className="text-sm mt-2">Bloqueado</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default SkillTree;
