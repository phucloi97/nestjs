import { ApiProperty } from '@nestjs/swagger';

export class FilterProductDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  catalog: string;
}
