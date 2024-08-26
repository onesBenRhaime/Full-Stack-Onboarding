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
  // async getCart(user: User): Promise<Cart> {
  //   // return les cart dans un json avec les items et les produits
  //   const data = this.cartRepository.findOne({
  //     where: { user },
  //     relations: ['items', 'items.product'],
  //   });
  //   console.log('from service : ');

  //   return data;
  // }

  // async addItemToCart(
  //   user: User,
  //   productId: number,
  //   quantity: number,
  // ): Promise<Cart> {
  //   console.log('from service : ', user);

  //   const cart = await this.getCart(user);
  //   const product = await this.productRepository.findOne({
  //     where: { id: productId },
  //   });

  //   if (!product) {
  //     throw new NotFoundException('Product not found');
  //   }

  //   let cartItem = await this.cartItemRepository.findOne({
  //     where: { cart, product },
  //   });

  //   if (cartItem) {
  //     cartItem.quantity += quantity;
  //   } else {
  //     cartItem = this.cartItemRepository.create({ cart, product, quantity });
  //   }

  //   await this.cartItemRepository.save(cartItem);
  //   return this.getCart(user);
  // }

  // async removeItemFromCart(user: User, cartItemId: number): Promise<Cart> {
  //   const cartItem = await this.cartItemRepository.findOne({
  //     where: { id: cartItemId },
  //     relations: ['cart'],
  //   });

  //   if (!cartItem || cartItem.cart.user.id !== user.id) {
  //     throw new UnauthorizedException('You cannot remove this item');
  //   }

  //   await this.cartItemRepository.remove(cartItem);
  //   return this.getCart(user);
  // }
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

    // Retrieve the cart for the current user, including its items and the associated products
    let cart = await this.cartRepository.findOne({
      where: { user },
      relations: ['items', 'items.product'],
    });

    console.log('Initial Cart:', cart);

    // If no cart exists, create a new one for the user
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

    // If the product doesn't exist, throw an error
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Check if the product is already in the cart
    let cartItem = cart.items.find((item) => item.product.id === productId);

    if (cartItem) {
      // If the product exists in the cart, update the quantity by adding the new quantity
      console.log('Existing CartItem:', cartItem);
      cartItem.quantity += quantity;
      console.log('Updated CartItem Quantity:', cartItem.quantity);

      // Save the updated cart item
      await this.cartItemRepository.save(cartItem);
      console.log('Saved Updated CartItem:', cartItem);
    } else {
      // If the product does not exist in the cart, create a new cart item
      cartItem = this.cartItemRepository.create({ cart, product, quantity });
      cart.items.push(cartItem);
      console.log('Added New CartItem:', cartItem);

      // Save the new cart item
      await this.cartItemRepository.save(cartItem);
    }

    // Save the updated cart with the new/updated items
    await this.cartRepository.save(cart);
    console.log('Saved Cart:', cart);

    // Retrieve and return the updated cart for the user
    const updatedCart = await this.getCart(user);
    console.log('Updated Cart:', updatedCart);

    return updatedCart;
  }

  async removeItemFromCart(user: User, cartItemId: number): Promise<Cart> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: cartItemId },
      relations: ['cart'],
    });
    // console.log('cartItem : ', cartItem);

    // if (!cartItem || cartItem.cart.user.id !== user.id) {
    //   throw new UnauthorizedException('You cannot remove this item');
    // }

    await this.cartItemRepository.remove(cartItem);
    return this.getCart(user);
  }

  // Edit the quantity of the product in the cart
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
    // Assuming you have a method to find the user's cart and clear its items
    const cart = await this.getCart(user);
    cart.items = [];
    await this.cartRepository.save(cart);
  }
}
