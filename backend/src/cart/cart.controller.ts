/* eslint-disable prettier/prettier */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../user/user.entity';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@Req() req): Promise<Cart> {
    console.log('get cart by user : ', req.user);

    return this.cartService.getCart(req.user as User);
  }

  @Post('add')
  addItemToCart(
    @Req() req,
    @Body() addItemDto: { productId: number; quantity: number },
  ): Promise<Cart> {
    console.log('add item to cart by user : ', req.user);

    return this.cartService.addItemToCart(
      req.user as User,
      addItemDto.productId,
      addItemDto.quantity,
    );
  }

  @Delete('remove/:id')
  removeItemFromCart(
    @Req() req,
    @Param('id') cartItemId: number,
  ): Promise<Cart> {
    return this.cartService.removeItemFromCart(req.user as User, cartItemId);
  }
  //edit quantity of item in cart

  @Patch('edit/:id')
  editItemQuantity(
    @Req() req,
    @Param('id') cartItemId: number,
    @Body() editItemDto: { quantity: number },
  ): Promise<Cart> {
    return this.cartService.editItemInCart(
      req.user as User,
      cartItemId,
      editItemDto.quantity,
    );
  }
}
