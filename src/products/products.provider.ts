import { PRODUCT_REPOSITORY } from '../../utils/constants';
import { Product } from './entities/product.entity';

export const productProvider = [
  {
    provide: PRODUCT_REPOSITORY,
    useValue: Product,
  },
];
