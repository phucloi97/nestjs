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
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Catalog } from './catalog.entity';
import { CatalogService } from './catalog.service';
import { CatalogDto } from './dto/catalog.dto';

@ApiTags('Catalog')
@Controller('catalog')
export class CatalogController {
  constructor(private catalogService: CatalogService) {}
  @Get()
  async getCatalog(): Promise<Catalog[]> {
    return await this.catalogService.getCatalog();
  }

  @Post()
  @ApiBody({ type: CatalogDto })
  async createCatalog(@Body() catalogDto: CatalogDto): Promise<void> {
    if (!catalogDto.title) {
      throw new BadRequestException();
    }
    await this.catalogService.createCatalog(catalogDto.title);
  }

  @Patch('/:id')
  @ApiBody({ type: CatalogDto })
  async updateCatalog(
    @Body() @Body() catalogDto: CatalogDto,
    @Param('id') id: string,
  ): Promise<void> {
    await this.catalogService.updateCatalog(id, catalogDto.title);
  }

  @Delete('/:id')
  async deleteCatalog(@Param('id') id: number): Promise<void> {
    this.catalogService.deleteCatalog(id);
  }
}
