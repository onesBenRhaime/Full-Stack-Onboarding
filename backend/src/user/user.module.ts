import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';

import { ProductModule } from '../product/product.module';
import { RoleModule } from '../role/role.module';
import { UserController } from './user.controller';
import { User } from './user.entity';

@Module({
  imports: [ProductModule, TypeOrmModule.forFeature([User]), RoleModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
