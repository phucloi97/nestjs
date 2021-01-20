import { Injectable } from '@nestjs/common';
import { CatalogRepository } from './catalog.repository';

@Injectable()
export class CatalogService {
  constructor(private catalogRepository: CatalogRepository) {}

  async createCatalog(title: string) {
    return this.catalogRepository.createCatalog(title);
  }
  async getCatalog() {
    return await this.catalogRepository.find();
  }
  async getCatalogById(id: number) {
    return await this.catalogRepository.findOne(id);
  }
  async updateCatalog(id: number, title: string) {
    return await this.catalogRepository.updateCatalog(id, title);
  }
  async deleteCatalog(id: number) {
    return await this.deleteCatalog(id);
  }
}
