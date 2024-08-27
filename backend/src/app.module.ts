import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { WishlistModule } from './wishlist/wishlist.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // url: 'postgres://default:fItLpgyb8R5Q@ep-purple-bread-a4ahcd9u.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
      url: process.env.POSTGRES_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: false,
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    CartModule,
    OrderModule,
    WishlistModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
