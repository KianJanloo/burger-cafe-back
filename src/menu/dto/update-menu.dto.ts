import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateMenuDto } from './create-menu.dto';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  @ApiProperty({
    description: 'ID of the menu item to update',
    example: 1,
    required: false
  })
  id?: number;
}
