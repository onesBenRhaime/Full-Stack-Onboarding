/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../user/user.entity';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  placeOrder(@Req() req, @Body() body): Promise<Order> {
    const method = body.method;
    return this.orderService.placeOrder(req.user as User, method as string);
  }

  @Get()
  getOrders(@Req() req): Promise<Order[]> {
    return this.orderService.getOrders(req.user as User);
  }
  //addmin can get all orders
  @Get('all')
  getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  //accrept order
  @Post('accept/:id')
  async acceptOrder(
    @Req() req,
    @Body() body,
    @Param('id') id: number,
  ): Promise<Order> {
    return this.orderService.acceptOrder(id);
  }

  //reject order
  @Post('reject/:id')
  async rejectOrder(
    @Req() req,
    @Body() body,
    @Param('id') id: number,
  ): Promise<Order> {
    return this.orderService.rejectOrder(id);
  }
  
}
