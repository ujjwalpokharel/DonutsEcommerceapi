import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { paymentProvider } from './payment.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './entities/payment.entity';

@Module({
  imports: [SequelizeModule.forFeature([Payment])],
  controllers: [PaymentsController],
  providers: [PaymentsService, ...paymentProvider],
  exports: [PaymentsModule],
})
export class PaymentsModule {}
