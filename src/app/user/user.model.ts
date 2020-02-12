import {Role} from './role.model';

export interface  User {
  id: number;
  username: string;
  actived: boolean;
  roles: Role[];
}
