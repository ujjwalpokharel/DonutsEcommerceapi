import { ORDER_PRODUCT_REPOSITORY } from '../../utils/constants';
import { OrderProduct } from './entities/order-product.entity';
export const orderProductProvider = [
  {
    provide: ORDER_PRODUCT_REPOSITORY,
    useValue: OrderProduct,
  },
];
