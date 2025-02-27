import { PAYMENT_REPOSITORY } from '../../utils/constants';
import { Payment } from './entities/payment.entity';
export const paymentProvider = [
  {
    provide: PAYMENT_REPOSITORY,
    useValue: Payment,
  },
];
