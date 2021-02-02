import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/user/decorator/user.decorator';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  //id[]
  @Post()
  createOrder(
    @Body('ids') ids: string,
    @User() userInfo: { user_name: string; role: number },
  ) {
    const idItems: string[] = ids.split(',');
    return this.orderService.createOrder(idItems, userInfo);
  }
  //id
  @Get()
  getOrder() {
    return 'get id ok';
  }
}
