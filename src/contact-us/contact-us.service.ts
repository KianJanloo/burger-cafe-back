import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactUs } from './entities/contact-us.entity';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { UpdateContactUsDto } from './dto/update-contact-us.dto';

@Injectable()
export class ContactUsService {
  constructor(
    @InjectRepository(ContactUs)
    private contactUsRepository: Repository<ContactUs>,
  ) {}

  async create(createContactUsDto: CreateContactUsDto): Promise<ContactUs> {
    const contactUs = this.contactUsRepository.create(createContactUsDto);
    return this.contactUsRepository.save(contactUs);
  }

  async findAll(): Promise<ContactUs[]> {
    return this.contactUsRepository.find();
  }

  async findOne(id: number): Promise<ContactUs> {
    const contactUs = await this.contactUsRepository.findOne({ where: { id } });
    if (!contactUs) {
      throw new NotFoundException('Contact message not found');
    }
    return contactUs;
  }

  async findByStatus(status: string): Promise<ContactUs[]> {
    return this.contactUsRepository.find({ where: { status } });
  }

  async update(id: number, updateContactUsDto: UpdateContactUsDto): Promise<ContactUs> {
    await this.contactUsRepository.update(id, updateContactUsDto);
    return this.findOne(id);
  }

  async updateStatus(id: number, status: string): Promise<ContactUs> {
    await this.contactUsRepository.update(id, { status });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.contactUsRepository.delete(id);
  }
}
