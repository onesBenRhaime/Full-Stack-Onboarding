/* eslint-disable prettier/prettier */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../user/user.entity';
import { Wishlist } from './wishlist.entity';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Get()
  getWishlist(@Req() req): Promise<Wishlist> {
    return this.wishlistService.getWishlist(req.user as User);
  }

  @Post('add')
  addItemToWishlist(
    @Req() req,
    @Body() addItemDto: { productId: number },
  ): Promise<Wishlist> {
    return this.wishlistService.addItemToWishlist(
      req.user as User,
      addItemDto.productId,
    );
  }

  @Delete('remove/:productId')
  async removeItemFromWishlist(
    @Req() req,
    @Param('productId') productId: number,
  ): Promise<Wishlist> {
    const user = req.user as User;
    return this.wishlistService.removeItemFromWishlist(user, productId);
  }
}
