import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Catalog } from './catalog.entity';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private catalogService: CatalogService) {}
  @Post()
  async createCatalog(@Body('title') title: string): Promise<Catalog> {
    return await this.catalogService.createCatalog(title);
  }
  @Get()
  async getCatalog() {
    console.log(await this.catalogService.getCatalog());
    return await this.catalogService.getCatalog();
  }
  @Patch('/:id')
  async updateCatalog(
    @Body('title') title: string,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    this.catalogService.updateCatalog(id, title);
  }
  @Delete('/:id')
  async deleteCatalog(@Param('id') id: number) {
    this.catalogService.deleteCatalog(id);
  }
}
