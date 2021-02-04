import { ApiProperty } from '@nestjs/swagger';

export class FilterProductDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  catalogid: number;
  @ApiProperty({ description: 'min price of product filter', default: 0 })
  min: number;
  @ApiProperty({ description: 'max price of product filter', default: 0 })
  max: number;
}
