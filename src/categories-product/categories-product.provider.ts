import { CATEGORY_PRODUCT_REPOSITORY } from '../../utils/constants';
import { CategoriesProduct } from './entities/categories-product.entity';

export const categoryProductProvider = [
  {
    provide: CATEGORY_PRODUCT_REPOSITORY,
    useValue: CategoriesProduct,
  },
];
