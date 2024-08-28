/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartService } from '../cart/cart.service';
import { User } from '../user/user.entity';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>, // Inject OrderRepository
    private readonly cartService: CartService, // Inject CartService
  ) {}

  async placeOrder(user: User, method: string): Promise<Order> {
    const cart = await this.cartService.getCart(user);
    const orderItems = cart.items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));
    const totalAmount = cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );

    const order = this.orderRepository.create({
      user,
      items: orderItems,
      totalAmount,
      paymentMethod: method,
      status: 'pending',
    });

    await this.orderRepository.save(order);
    // Clear the user's cart
    await this.cartService.clearCart(user);
    return order;
  }

  async getOrders(user: User): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user },
      order: { orderDate: 'DESC' },
    });
  }

  // get all order
  async getAllOrders(): Promise<Order[]> {
    // return it with user information

    return this.orderRepository.find({
      relations: ['user'],
    });
  }
  //acept order
  async acceptOrder(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.status = 'accepted';
    return this.orderRepository.save(order);
  }
  //reject order
  async rejectOrder(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.status = 'rejected';
    return this.orderRepository.save(order);
  }
}
