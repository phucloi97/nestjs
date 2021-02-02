import { Injectable } from '@nestjs/common';
import { Catalog } from './catalog.entity';
import { CatalogRepository } from './catalog.repository';

@Injectable()
export class CatalogService {
  constructor(private catalogRepository: CatalogRepository) {}

  async createCatalog(title: string): Promise<void> {
    this.catalogRepository.createCatalog(title);
  }
  async getCatalog(): Promise<Catalog[]> {
    return await this.catalogRepository.find();
  }
  async getCatalogById(id: number): Promise<Catalog> {
    return await this.catalogRepository.findOne(id);
  }
  async updateCatalog(id: number, title: string): Promise<void> {
    return await this.catalogRepository.updateCatalog(id, title);
  }
  async deleteCatalog(id: number): Promise<void> {
    return await this.deleteCatalog(id);
  }
}
