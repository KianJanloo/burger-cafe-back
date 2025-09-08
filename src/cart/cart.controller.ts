import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  findBySessionId(@Query('sessionId') sessionId: string) {
    return this.cartService.findBySessionId(sessionId);
  }

  @Get('total')
  getCartTotal(@Query('sessionId') sessionId: string) {
    return this.cartService.getCartTotal(sessionId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Patch(':id/quantity')
  updateQuantity(@Param('id') id: string, @Body('quantity') quantity: number) {
    return this.cartService.updateQuantity(+id, quantity);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }

  @Delete('session/:sessionId')
  clearSession(@Param('sessionId') sessionId: string) {
    return this.cartService.clearSession(sessionId);
  }
}
