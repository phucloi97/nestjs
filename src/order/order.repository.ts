import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Order } from './order.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async createOrder(price: number, items: Product[], user: User) {
    console.log('trig');
    console.log(user);
    const order = new Order();
    order.totalPrice = price;
    order.products = items;
    order.user = user;
    await order.save();
    delete order.user;
  }
}
