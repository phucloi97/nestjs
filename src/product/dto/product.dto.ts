import { ApiProperty } from '@nestjs/swagger';
import { Catalog } from 'src/catalog/catalog.entity';

export class ProductDto {
  @ApiProperty({
    description: 'name of product',
  })
  title: string;
  @ApiProperty({
    description: 'description of product',
  })
  description: string;
  @ApiProperty({
    type: Number,
  })
  price: number;
  @ApiProperty()
  catalogid: number;
  catalog: Catalog;
}
