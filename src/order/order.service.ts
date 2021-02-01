import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { ProductRepository } from 'src/product/product.repository';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: OrderRepository,
    @InjectRepository(Product) private productRepository: ProductRepository,
  ) {}
  async createOrder(ids: string[]) {
    const items = await this.productRepository.findByIds([...ids]);
    return items;
  }
}
