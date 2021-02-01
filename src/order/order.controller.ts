import { Body, Controller, Get, Injectable, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  //id[]
  @Post()
  createOrder(@Body('ids') ids: string) {
    const idItems: string[] = ids.split(',');
    return this.orderService.createOrder(idItems);
  }
  //id
  @Get()
  getOrder() {
    return 'get id ok';
  }
}
