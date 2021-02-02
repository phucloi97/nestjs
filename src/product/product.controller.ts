import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { CreateProductPipe } from './pipes/create-product.pipe';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  @UsePipes(new CreateProductPipe())
  createProduct(@Body() item: ProductDto) {
    this.productService.createProduct(item);
  }
  @Patch('/:id')
  updateProcuct(
    @Body(CreateProductPipe) item: ProductDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.productService.updateProduct(id, item);
  }
  @Delete('/:id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    this.productService.deleteProduct(id);
  }
  @Get()
  async getProduct(): Promise<Product[]> {
    return this.productService.getProduct();
  }
}
