import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CreateProductPipe implements PipeTransform {
  transform(value: any, _) {
    console.log(value);
    const { price, catalogid } = value;
    let newValue = parseInt(price);
    let newCatalogid = parseInt(catalogid);
    if (!newValue || !newCatalogid) {
      console.log('trig');
      throw new BadRequestException('catalog and price must number');
    } else value.price = newValue;
    value.catalogid = newCatalogid;
    return value;
  }
}
