import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(item: ProductDto) {
    const { title, description, price, catalog } = item;
    const product = new Product();
    product.title = title;
    product.description = description;
    product.price = price;
    product.catalogs = catalog;
    await product.save();
    delete product.catalogs;
    return product;
  }
  async updateProduct(id: number, item: ProductDto): Promise<void> {
    try {
      await Product.update(id, {
        title: item.title,
        description: item.description,
        price: item.price,
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
