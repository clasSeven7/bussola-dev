import { User } from './user';

export interface Recommendation {
  user: User;
  technologies: string;
  typename: string;
}
