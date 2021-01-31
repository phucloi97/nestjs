import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  totalPrice: number;
  @ManyToOne(() => User, (user) => user.orders)
  user: User;
  @ManyToMany(() => Product)
  products: Product[];
}
