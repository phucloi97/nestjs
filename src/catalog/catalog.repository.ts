import { BadRequestException } from '@nestjs/common';
import { Any, EntityRepository, Repository } from 'typeorm';
import { Catalog } from './catalog.entity';

@EntityRepository(Catalog)
export class CatalogRepository extends Repository<Catalog> {
  async createCatalog(title: string): Promise<void> {
    const catalog = new Catalog();
    catalog.title = title;
    await catalog.save();
  }
  async getCatalog(): Promise<Catalog[]> {
    return await this.find();
  }
  async getCatalogById(id): Promise<Catalog> {
    return await Catalog.findOne(id);
  }
  async updateCatalog(id: string, title: string): Promise<void> {
    const catalog = await this.findOne(id);
    if (!catalog || !title) {
      throw new BadRequestException();
    }
    await this.update(id, { title });
  }
  async deleteCatalog(id: number) {
    await this.delete(id);
  }
}
