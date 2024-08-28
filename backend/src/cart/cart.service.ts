/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import { CartItem } from './cart-item.entity';
import { Cart } from './cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getCart(user: User): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { user },
      relations: ['items', 'items.product'],
    });

    if (!cart) {
      throw new NotFoundException('Cart not found for this user.');
    }

    return cart;
  }

  async addItemToCart(
    user: User,
    productId: number,
    quantity: number = 1, // Default quantity to 1 if not provided
  ): Promise<Cart> {
    console.log('User:', user);
    console.log('Product ID:', productId);
    console.log('Quantity:', quantity);

    let cart = await this.cartRepository.findOne({
      where: { user },
      relations: ['items', 'items.product'],
    });

    console.log('Initial Cart:', cart);

    if (!cart) {
      cart = this.cartRepository.create({ user, items: [] });
      console.log('Created New Cart:', cart);
      await this.cartRepository.save(cart);
    }

    // Retrieve the product to be added to the cart
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    console.log('Product:', product);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let cartItem = cart.items.find((item) => item.product.id === productId);

    if (cartItem) {
      cartItem.quantity += quantity;

      await this.cartItemRepository.save(cartItem);
    } else {
      cartItem = this.cartItemRepository.create({ cart, product, quantity });
      cart.items.push(cartItem);
      console.log('Added New CartItem:', cartItem);

      // Save the new cart item
      await this.cartItemRepository.save(cartItem);
    }

    await this.cartRepository.save(cart);
    console.log('Saved Cart:', cart);

    const updatedCart = await this.getCart(user);
    console.log('Updated Cart:', updatedCart);

    return updatedCart;
  }

  async removeItemFromCart(user: User, cartItemId: number): Promise<Cart> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: cartItemId },
      relations: ['cart'],
    });

    await this.cartItemRepository.remove(cartItem);
    return this.getCart(user);
  }

  async editItemInCart(
    user: User,
    cartItemId: number,
    quantity: number,
  ): Promise<Cart> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: cartItemId },
      relations: ['cart'],
    });

    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    cartItem.quantity = quantity;
    await this.cartItemRepository.save(cartItem);

    return this.getCart(user);
  }

  async clearCart(user: User): Promise<void> {
    const cart = await this.getCart(user);
    cart.items = [];
    await this.cartRepository.save(cart);
  }
}
