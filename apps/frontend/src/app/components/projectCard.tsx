import { Heart, MessageSquare, Share2 } from 'lucide-react';
import Image from 'next/image';

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    likes: number;
    comments: number;
    image: string;
  };
  onLike: (id: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onLike }) => {
  return (
    <div className="bg-zinc-800 p-4 rounded-lg shadow hover:shadow-lg transition">
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
            onClick={() => onLike(project.id)}
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
  );
};

export default ProjectCard;
