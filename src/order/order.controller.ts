import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/user/decorator/roles.decorator';
import { GetUser } from 'src/user/decorator/user.decorator';
import { JwtUserGaurd } from 'src/user/jwt-user.gaurd';
import { UserRole } from 'src/user/role.enum';
import { RolesGaurd } from 'src/user/roles.gaurd';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('order')
@UseGuards(JwtUserGaurd, RolesGaurd)
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @Roles(UserRole.Emplyee, UserRole.Admin, UserRole.Customer)
  createOrder(
    @Body('ids') ids: string,
    @GetUser() userInfo: { user_name: string; role: number },
  ) {
    const idItems: string[] = ids.split(',');
    return this.orderService.createOrder(idItems, userInfo);
  }
  //id
  @Get()
  @Roles(UserRole.Emplyee, UserRole.Admin, UserRole.Customer)
  getOrder() {
    return 'get id ok';
  }
}
