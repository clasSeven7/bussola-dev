import { useState } from 'react';

export function useFeedProjects() {
  const [feedProjects, setFeedProjects] = useState([
    {
      id: 1,
      likes: 125,
      comments: 20,
    },
    {
      id: 2,
      likes: 98,
      comments: 15,
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
