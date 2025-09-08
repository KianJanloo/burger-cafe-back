import { PartialType } from '@nestjs/mapped-types';
import { CreateCafeDetailsDto } from './create-cafe-details.dto';

export class UpdateCafeDetailsDto extends PartialType(CreateCafeDetailsDto) {}
