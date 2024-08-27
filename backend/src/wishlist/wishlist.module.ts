/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product/product.entity';
import { WishlistItem } from './wishlist-item.entity';
import { WishlistController } from './wishlist.controller';
import { Wishlist } from './wishlist.entity';
import { WishlistService } from './wishlist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist, WishlistItem, Product])],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
