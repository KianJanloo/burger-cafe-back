import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const totalPrice = createCartDto.foodPrice * createCartDto.quantity;
    const cart = this.cartRepository.create({
      ...createCartDto,
      totalPrice,
    });
    return this.cartRepository.save(cart);
  }

  async findBySessionId(sessionId: string): Promise<Cart[]> {
    return this.cartRepository.find({ where: { sessionId } });
  }

  async findOne(id: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { id } });
    if (!cart) {
      throw new NotFoundException('Cart item not found');
    }
    return cart;
  }

  async update(id: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    const cart = await this.findOne(id);
    if (cart) {
      const totalPrice = updateCartDto.foodPrice 
        ? updateCartDto.foodPrice * (updateCartDto.quantity || cart.quantity)
        : cart.totalPrice;
      
      await this.cartRepository.update(id, {
        ...updateCartDto,
        totalPrice,
      });
    }
    return this.findOne(id);
  }

  async updateQuantity(id: number, quantity: number): Promise<Cart> {
    const cart = await this.findOne(id);
    if (cart) {
      const totalPrice = cart.foodPrice * quantity;
      await this.cartRepository.update(id, { quantity, totalPrice });
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.cartRepository.delete(id);
  }

  async clearSession(sessionId: string): Promise<void> {
    await this.cartRepository.delete({ sessionId });
  }

  async getCartTotal(sessionId: string): Promise<number> {
    const carts = await this.findBySessionId(sessionId);
    return carts.reduce((total, cart) => total + cart.totalPrice, 0);
  }
}
