import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/user/decorator/roles.decorator';
import { JwtUserGaurd } from 'src/user/jwt-user.gaurd';
import { UserRole } from 'src/user/role.enum';
import { RolesGaurd } from 'src/user/roles.gaurd';
import { FilterProductDto } from './dto/filter-product.dto';
import { ProductDto } from './dto/product.dto';
import { CreateProductPipe } from './pipes/create-product.pipe';
import { FilterProductPipe } from './pipes/filter-product.pipe';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
@UseGuards(JwtUserGaurd, RolesGaurd)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @UsePipes(FilterProductPipe)
  async getProduct(@Query() filterDto: FilterProductDto): Promise<Product[]> {
    console.table({ filterDto });
    const { min, max } = filterDto;
    if ((min === max && !(min === 0)) || min > max) {
      throw new BadRequestException();
    }
    return await this.productService.getProduct(filterDto);
  }

  @Post()
  @Roles(UserRole.Emplyee, UserRole.Admin)
  @UsePipes(new CreateProductPipe())
  @ApiBody({ type: ProductDto })
  async createProduct(@Body() item: ProductDto) {
    await this.productService.createProduct(item);
  }
  @Patch('/:id')
  @Roles(UserRole.Emplyee, UserRole.Admin)
  @ApiBody({ type: ProductDto })
  async updateProcuct(
    @Body(CreateProductPipe) item: ProductDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.productService.updateProduct(id, item);
  }
  @Delete('/:id')
  @Roles(UserRole.Emplyee, UserRole.Admin)
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    await this.productService.deleteProduct(id);
  }
}
