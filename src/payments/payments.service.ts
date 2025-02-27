import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PAYMENT_REPOSITORY } from 'utils/constants';
import { Payment } from './entities/payment.entity';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(PAYMENT_REPOSITORY) private readonly paymentModel: typeof Payment,
  ) {}
  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = await this.paymentModel.create(createPaymentDto);
    return payment;
  }

  async findAll(): Promise<Payment[]> {
    const payments = await this.paymentModel.findAll({ include: [Order] });
    if (!payments) {
      throw new InternalServerErrorException('Error fetching payments');
    }
    return payments;
  }

  async findOne(id: number) {
    const payment = await this.paymentModel.findByPk(id, {
      include: [Order],
    });
    if (!payment) {
      throw new NotFoundException(`payment with ID ${id} not found`);
    }
    return payment;
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    const payment = await this.paymentModel.findOne({
      where: { id },
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    await this.paymentModel.update(updatePaymentDto, { where: { id } });
    return this.paymentModel.findOne({ where: { id } });
  }

  async remove(id: number): Promise<String> {
    const payment = await this.paymentModel.findOne({
      where: { id },
    });
    if (!payment) {
      throw new NotFoundException(
        `payment with ID ${id} not found. so can't be deleted`,
      );
    }
    await this.paymentModel.destroy({ where: { id } });
    return 'payment is sucessfully deleted ';
  }
}
