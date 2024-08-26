/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column('json')
  items: { productId: number; quantity: number }[];

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ default: new Date() })
  orderDate: Date;

  @Column({ default: 'pending' })
  status: string;

  @Column({ default: 'cash' })
  paymentMethod: string;
}
