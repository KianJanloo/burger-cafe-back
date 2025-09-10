import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Footer } from './entities/footer.entity';
import { CreateFooterDto } from './dto/create-footer.dto';
import { UpdateFooterDto } from './dto/update-footer.dto';

@Injectable()
export class FooterService {
  constructor(
    @InjectRepository(Footer)
    private footerRepository: Repository<Footer>,
  ) {}

  async create(createFooterDto: CreateFooterDto): Promise<Footer> {
    const footer = this.footerRepository.create(createFooterDto);
    return this.footerRepository.save(footer);
  }

  async findAll(): Promise<Footer[]> {
    return this.footerRepository.find();
  }

  async findOne(id: number): Promise<Footer> {
    const footer = await this.footerRepository.findOne({ where: { id } });
    if (!footer) {
      throw new NotFoundException('Footer not found');
    }
    return footer;
  }

  async update(id: number, updateFooterDto: UpdateFooterDto): Promise<Footer> {
    await this.footerRepository.update(id, updateFooterDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const footer = await this.findOne(id);
    if (!footer) {
      throw new NotFoundException('Footer not found');
    }
    await this.footerRepository.delete(id);
    return {
      message: 'Footer deleted successfully',
    };
  }
}
