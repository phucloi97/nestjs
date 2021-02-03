import { ApiProperty } from '@nestjs/swagger';

export class PriceDto {
  @ApiProperty({ type: 'number' })
  minprice: number;
  @ApiProperty({ type: 'number' })
  maxprice: number;
}
