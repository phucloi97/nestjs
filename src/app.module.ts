import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductModule } from './product/product.module';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ProductModule, CatalogModule],
})
export class AppModule {}
