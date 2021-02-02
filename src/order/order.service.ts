import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { ProductRepository } from 'src/product/product.repository';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: OrderRepository,
    @InjectRepository(Product) private productRepository: ProductRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
  async createOrder(
    ids: string[],
    userInfo: { user_name: string; role: number },
  ) {
    const items = await this.productRepository.findByIds([...ids]);
    const user: User = await this.userRepository.findOne({ ...userInfo });
    // console.log(user.code);
    return user;
  }
}
