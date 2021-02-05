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
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/user/decorator/roles.decorator';
import { JwtUserGaurd } from 'src/user/jwt-user.gaurd';
import { UserRole } from 'src/user/role.enum';
import { RolesGaurd } from 'src/user/roles.gaurd';
import { Catalog } from './catalog.entity';
import { CatalogService } from './catalog.service';
import { CatalogDto } from './dto/catalog.dto';

@ApiTags('Catalog')
@UseGuards(JwtUserGaurd, RolesGaurd)
@Controller('catalog')
export class CatalogController {
  constructor(private catalogService: CatalogService) {}
  @Get()
  async getCatalog(): Promise<Catalog[]> {
    return await this.catalogService.getCatalog();
  }

  @Post()
  @Roles(UserRole.Emplyee, UserRole.Admin)
  @ApiBody({ type: CatalogDto })
  async createCatalog(@Body() catalogDto: CatalogDto): Promise<void> {
    if (!catalogDto.title) {
      throw new BadRequestException();
    }
    await this.catalogService.createCatalog(catalogDto.title);
  }

  @Patch('/:id')
  @Roles(UserRole.Emplyee, UserRole.Admin)
  @ApiBody({ type: CatalogDto })
  async updateCatalog(
    @Body() @Body() catalogDto: CatalogDto,
    @Param('id') id: string,
  ): Promise<void> {
    await this.catalogService.updateCatalog(id, catalogDto.title);
  }

  @Delete('/:id')
  @Roles(UserRole.Emplyee, UserRole.Admin)
  async deleteCatalog(@Param('id') id: number): Promise<void> {
    this.catalogService.deleteCatalog(id);
  }
}
