import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    return this.foodRepository.save({
      ...createMenuDto,
    });
  }

  async findAll() {
    return this.foodRepository.find();
  }

  async findOne(id: number) {
    const food = await this.foodRepository.findOne({ where: { id } });
    if (!food) {
      throw new NotFoundException('Food not found');
    }
    return food;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const food = await this.foodRepository.findOne({ where: { id } });
    if (!food) {
      throw new NotFoundException('Food not found');
    }
    return this.foodRepository.save({ ...food, ...updateMenuDto });
  }

  async remove(id: number) {
    const food = await this.foodRepository.findOne({ where: { id } });
    if (!food) {
      throw new NotFoundException('Food not found');
    }
    await this.foodRepository.delete(food);
    return {
      message: 'Food deleted successfully',
    };
  }
}
