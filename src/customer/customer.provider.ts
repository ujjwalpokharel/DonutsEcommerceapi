import { CUSTOMER_REPOSITORY } from 'utils/constants';
import { Customer } from './entities/customer.entity';

export const customerProvider = [
  {
    provide: CUSTOMER_REPOSITORY,
    useValue: Customer,
  },
];
