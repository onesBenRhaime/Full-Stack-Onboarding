/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from '../cart/cart.module';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]), // Register the Order entity
    CartModule, // Import CartModule if it provides necessary services
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
