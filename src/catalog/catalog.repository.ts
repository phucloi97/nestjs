import { Any, EntityRepository, Repository } from 'typeorm';
import { Catalog } from './catalog.entity';

@EntityRepository(Catalog)
export class CatalogRepository extends Repository<Catalog> {
  async createCatalog(title: string): Promise<Catalog> {
    const catalog = new Catalog();
    catalog.title = title;
    await catalog.save();
    return catalog;
  }
  async getCatalog() {
    return await this.find();
    // const a = await this.find({id : 1})
    // this.remove(a); //using remove
  }
  async getCatalogById(id) {
    return await Catalog.findOne(id);
  }
  async updateCatalog(id: number, title: string) {
    console.log(`${id} + ${title}`);
    return await this.update({ id }, { title });
  }
  async deleteCatalog(id: number) {
    await this.delete(id);
  }
}
