import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogService } from 'src/catalog/catalog.service';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: ProductRepository,
    private catalogService: CatalogService,
  ) {}
  async createProduct(item: ProductDto): Promise<Product> {
    // return this.productRepository.createProduct(item);
    item.catalog = await this.catalogService.getCatalogById(item.catalogid);
    console.log(item.catalog);
    return this.productRepository.createProduct(item);
  }
  async updateProduct(id: number, item: ProductDto) {
    return this.productRepository.updateProduct(id, item);
  }
  async deleteProduct(id: number) {
    return await this.productRepository.delete(id);
  }
  async getProduct() {
    return this.productRepository.getProduct();
  }
}
