import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserRole } from './role.enum';
import * as bcrypt from 'bcrypt';
@Entity()
// @Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  user_name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  salt: string;
  @Column({ default: () => false })
  active: boolean;
  @Column()
  code?: number | null;
  @Column()
  role: UserRole;

  async validatePassword(password: string): Promise<boolean> {
    const match = await bcrypt.hash(password, this.salt);
    return match === this.password;
  }
}
