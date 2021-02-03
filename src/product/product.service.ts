import { BadRequestException, Injectable } from '@nestjs/common';
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
  async createProduct(item: ProductDto): Promise<void> {
    item.catalog = await this.catalogService.getCatalogById(item.catalogid);
    if (!item.catalog) {
      throw new BadRequestException();
    }
    await this.productRepository.createProduct(item);
  }
  async updateProduct(id: number, item: ProductDto) {
    item.catalog = await this.catalogService.getCatalogById(item.catalogid);
    if (!item.catalog) {
      throw new BadRequestException();
    }
    return this.productRepository.updateProduct(id, item);
  }
  async deleteProduct(id: number) {
    return await this.productRepository.delete(id);
  }
  async getProduct(): Promise<Product[]> {
    return await this.productRepository.getProduct();
  }
}
