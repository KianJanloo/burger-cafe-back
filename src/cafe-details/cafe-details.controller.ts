import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CafeDetailsService } from './cafe-details.service';
import { CreateCafeDetailsDto } from './dto/create-cafe-details.dto';
import { UpdateCafeDetailsDto } from './dto/update-cafe-details.dto';

@Controller('cafe-details')
export class CafeDetailsController {
  constructor(private readonly cafeDetailsService: CafeDetailsService) {}

  @Post()
  create(@Body() createCafeDetailsDto: CreateCafeDetailsDto) {
    return this.cafeDetailsService.create(createCafeDetailsDto);
  }

  @Get()
  findAll() {
    return this.cafeDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cafeDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCafeDetailsDto: UpdateCafeDetailsDto) {
    return this.cafeDetailsService.update(+id, updateCafeDetailsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cafeDetailsService.remove(+id);
  }
}
