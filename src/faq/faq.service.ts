import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faq } from './entities/faq.entity';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq)
    private faqRepository: Repository<Faq>,
  ) {}

  async create(createFaqDto: CreateFaqDto): Promise<Faq> {
    const faq = this.faqRepository.create(createFaqDto);
    return this.faqRepository.save(faq);
  }

  async findAll(): Promise<Faq[]> {
    return this.faqRepository.find({ 
      where: { isActive: true },
      order: { order: 'ASC' }
    });
  }

  async findAllAdmin(): Promise<Faq[]> {
    return this.faqRepository.find({ 
      order: { order: 'ASC' }
    });
  }

  async findOne(id: number): Promise<Faq> {
    const faq = await this.faqRepository.findOne({ where: { id } });
    if (!faq) {
      throw new NotFoundException('FAQ not found');
    }
    return faq;
  }

  async update(id: number, updateFaqDto: UpdateFaqDto): Promise<Faq> {
    await this.faqRepository.update(id, updateFaqDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const faq = await this.findOne(id);
    if (!faq) {
      throw new NotFoundException('FAQ not found');
    }
    await this.faqRepository.delete(id);
    return {
      message: 'FAQ deleted successfully',
    };
  }
}
