import { ApiProperty } from '@nestjs/swagger';

export class CatalogDto {
  @ApiProperty()
  title: string;
}
