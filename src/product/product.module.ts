import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogModule } from 'src/catalog/catalog.module';
import { CatalogRepository } from 'src/catalog/catalog.repository';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository, CatalogRepository]),
    CatalogModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
