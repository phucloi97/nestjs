import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilterProductDto } from './dto/filter-product.dto';
import { PriceDto } from './dto/price.dto';
import { ProductDto } from './dto/product.dto';
import { CreateProductPipe } from './pipes/create-product.pipe';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('')
  async getProduct(
    @Query() filterDto: PriceDto,
    @Query() df: FilterProductDto,
  ) {
    console.table({ filterDto });
    // return this.productService.getProduct();
    return 'ok';
  }

  @Post()
  @UsePipes(new CreateProductPipe())
  @ApiBody({ type: ProductDto })
  async createProduct(@Body() item: ProductDto) {
    await this.productService.createProduct(item);
  }
  @Patch('/:id')
  @ApiBody({ type: ProductDto })
  async updateProcuct(
    @Body(CreateProductPipe) item: ProductDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.productService.updateProduct(id, item);
  }
  @Delete('/:id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    this.productService.deleteProduct(id);
  }
}
