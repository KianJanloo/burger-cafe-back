import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const reservation = this.reservationRepository.create(createReservationDto);
    return this.reservationRepository.save(reservation);
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
    });
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }
    return reservation;
  }

  async findByDate(date: string): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: { date: new Date(date) },
    });
  }

  async update(
    id: number,
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    await this.reservationRepository.update(id, updateReservationDto);
    return this.findOne(id);
  }

  async updateStatus(id: number, status: string): Promise<Reservation> {
    await this.reservationRepository.update(id, { status });
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
    });
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }
    await this.reservationRepository.delete(reservation);
    return {
      message: 'Reservation deleted successfully',
    };
  }
}
