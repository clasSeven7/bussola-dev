'use client';

import Navbar from '@/components/navbar';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';

const SkillTree = () => {
  const [developerRank, setDeveloperRank] = React.useState('Iniciante');
  const [bestLanguage, setBestLanguage] = React.useState('JavaScript');

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
          <Select onValueChange={setDeveloperRank} defaultValue={developerRank}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Selecione seu rank" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Iniciante">Iniciante</SelectItem>
              <SelectItem value="Intermediário">Intermediário</SelectItem>
              <SelectItem value="Avançado">Avançado</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-zinc-400 mt-2">Rank atual: {developerRank}</p>
        </div>

        {/* Melhor Linguagem Atual */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Melhor Linguagem Atual:
          </h2>
          <Select onValueChange={setBestLanguage} defaultValue={bestLanguage}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Selecione sua linguagem favorita" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="JavaScript">JavaScript</SelectItem>
              <SelectItem value="Python">Python</SelectItem>
              <SelectItem value="Java">Java</SelectItem>
              <SelectItem value="C#">C#</SelectItem>
              <SelectItem value="Ruby">Ruby</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-zinc-400 mt-2">
            Linguagem favorita: {bestLanguage}
          </p>
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
              <CardContent>
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
