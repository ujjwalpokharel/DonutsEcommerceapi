import { ADMIN_REPOSITORY } from '../../utils/constants';
import { Admin } from './entities/admin.entity';

export const adminProvider = [
  {
    provide: ADMIN_REPOSITORY,
    useValue: Admin,
  },
];
