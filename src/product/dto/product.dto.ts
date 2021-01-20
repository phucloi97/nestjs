import { Catalog } from 'src/catalog/catalog.entity';

export class ProductDto {
  title: string;
  description: string;
  price: number;
  catalogid: number;
  catalog: Catalog;
}
