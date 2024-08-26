import { Cart } from 'src/src/cart/cart.entity';
import { Order } from 'src/src/order/order.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../role/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: false })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'default-image.png' })
  image: string;

  @Column({ default: 'active' })
  status: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  //step 4
  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
