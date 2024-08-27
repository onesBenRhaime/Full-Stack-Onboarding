/* eslint-disable prettier/prettier */

import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product/product.entity';
import { Wishlist } from './wishlist.entity';

@Entity()
export class WishlistItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Wishlist, (wishlist) => wishlist.items)
  wishlist: Wishlist;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  product: Product;
}
