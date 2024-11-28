import { Project } from './project';
import { User } from './user';

export interface Portfolio {
  user: User;
  projects: Project[];
  image: string;
}
