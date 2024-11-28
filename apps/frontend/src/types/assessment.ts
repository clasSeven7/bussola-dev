import { User } from './user';

export interface Assessment {
  user: User;
  technologie: string;
  note: GLfloat;
  comment: string;
}
