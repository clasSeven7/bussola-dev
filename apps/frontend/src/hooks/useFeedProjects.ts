import { useState } from 'react';

export function useFeedProjects() {
  const [feedProjects, setFeedProjects] = useState([
    {
      id: 1,
      title: 'Bússola Dev',
      description: 'Rede social para desenvolvedores e recrutadores.',
      likes: 125,
      comments: 20,
      image: '/image.png',
    },
    {
      id: 2,
      title: 'Take Care',
      description: 'Aplicativo para cuidar de idosos e promover bem-estar.',
      likes: 98,
      comments: 15,
      image: '/image.png',
    },
  ]);

  const handleLike = (id: number) => {
    setFeedProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, likes: project.likes + 1 } : project
      )
    );
  };

  return { feedProjects, handleLike };
}
