import { User } from './user';

export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: {
    frontend: [name: string];
    backend: [name: string];
  };
  user: User;
}
