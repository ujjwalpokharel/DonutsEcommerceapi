import { ORDER_REPOSITORY } from '../../utils/constants';
import { Order } from './entities/order.entity';
export const orderProvider = [
  {
    provide: ORDER_REPOSITORY,
    useValue: Order,
  },
];
