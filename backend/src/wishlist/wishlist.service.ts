/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import { WishlistItem } from './wishlist-item.entity';
import { Wishlist } from './wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,

    @InjectRepository(WishlistItem)
    private readonly wishlistItemRepository: Repository<WishlistItem>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getWishlist(user: User): Promise<Wishlist> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { user },
      relations: ['items', 'items.product', 'user'],
    });

    if (!wishlist) {
      const newWishlist = this.wishlistRepository.create({ user });
      return this.wishlistRepository.save(newWishlist);
    }

    return wishlist;
  }

  async addItemToWishlist(user: User, productId: number): Promise<Wishlist> {
    const wishlist = await this.getWishlist(user);
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let wishlistItem = await this.wishlistItemRepository.findOne({
      where: { wishlist, product },
    });

    if (!wishlistItem) {
      wishlistItem = this.wishlistItemRepository.create({ wishlist, product });
      await this.wishlistItemRepository.save(wishlistItem);
    }

    return this.getWishlist(user);
  }
  async removeItemFromWishlist(
    user: User,
    productId: number,
  ): Promise<Wishlist> {
    // Find the wishlist item by product ID and user ID
    const wishlistItem = await this.wishlistItemRepository.findOne({
      where: {
        product: { id: productId }, // Assuming you have a 'product' relation
        wishlist: { user: { id: user.id } },
      },
      relations: ['wishlist', 'wishlist.user', 'product'],
    });

    if (!wishlistItem) {
      throw new NotFoundException('Wishlist item not found');
    }

    if (wishlistItem.wishlist.user.id !== user.id) {
      throw new NotFoundException('You cannot remove this item');
    }

    await this.wishlistItemRepository.remove(wishlistItem);
    return this.getWishlist(user);
  }
}
