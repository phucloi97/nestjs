import { UserRole } from './role.enum';

export interface Payload {
  user_name: string;
  role: UserRole;
}
