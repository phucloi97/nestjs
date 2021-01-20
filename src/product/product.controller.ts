import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { CreateProductPipe } from './pipes/create-product.pipe';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  //create Product:
  // role: admin
  // @Post()
  // @UsePipes(new CreateProductPipe())
  // createProduct(@Body() item: ProductDto) {
  //   console.log(item);
  //   return this.productService.createProduct(item);
  // }
  @Patch('/:id')
  updateProcuct(
    @Body(CreateProductPipe) item: ProductDto,
    @Param('id') id: number,
  ) {
    console.log(id);
    return this.productService.updateProduct(id, item);
  }
  @Delete('/:id')
  deleteProduct(@Param('id') id: number) {}
  @Get()
  getProduct() {}
}
