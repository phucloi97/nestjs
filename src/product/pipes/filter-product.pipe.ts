import { PipeTransform } from '@nestjs/common';
import { FilterProductDto } from '../dto/filter-product.dto';

export class FilterProductPipe implements PipeTransform {
  transform(value: FilterProductDto, _) {
    value.max = Number(value.max);
    value.min = Number(value.min);
    value.catalogid = Number(value.catalogid);
    return value;
  }
}
