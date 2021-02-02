import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(item: ProductDto): Promise<void> {
    const { title, description, price, catalog } = item;
    const product = new Product();
    product.title = title;
    product.description = description;
    product.price = price;
    product.catalog = catalog;
    await product.save();
    delete product.catalog;
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
  async getProduct(): Promise<Product[]> {
    const query = this.createQueryBuilder('product');
    query.leftJoinAndSelect('product.catalog', 'catalog'); //tham so thu 2 la bien dai bieu cho cai relation co the su dung truy van tiep theo
    query.where('catalog.id=:id', { id: 1 }); //o day su dung vao truy vasn tiep theo ne @@
    query.andWhere('product.price BETWEEN :start AND :end', {
      start: 4,
      end: 27,
    });
    return await query.getMany();
  }
}
