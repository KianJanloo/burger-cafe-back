import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CafeDetails } from './entities/cafe-details.entity';
import { CreateCafeDetailsDto } from './dto/create-cafe-details.dto';
import { UpdateCafeDetailsDto } from './dto/update-cafe-details.dto';

@Injectable()
export class CafeDetailsService {
  constructor(
    @InjectRepository(CafeDetails)
    private cafeDetailsRepository: Repository<CafeDetails>,
  ) {}

  async create(
    createCafeDetailsDto: CreateCafeDetailsDto,
  ): Promise<CafeDetails> {
    const cafeDetails = this.cafeDetailsRepository.create(createCafeDetailsDto);
    return this.cafeDetailsRepository.save(cafeDetails);
  }

  async findAll(): Promise<CafeDetails[]> {
    return this.cafeDetailsRepository.find();
  }

  async findOne(id: number): Promise<CafeDetails> {
    const cafeDetails = await this.cafeDetailsRepository.findOne({
      where: { id },
    });
    if (!cafeDetails) {
      throw new NotFoundException('Cafe details not found');
    }
    return cafeDetails;
  }

  async update(
    id: number,
    updateCafeDetailsDto: UpdateCafeDetailsDto,
  ): Promise<CafeDetails> {
    await this.cafeDetailsRepository.update(id, updateCafeDetailsDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const cafeDetails = await this.findOne(id);
    if (!cafeDetails) {
      throw new NotFoundException('Cafe details not found');
    }
    await this.cafeDetailsRepository.delete(id);
    return {
      message: 'Cafe details deleted successfully',
    };
  }
}
