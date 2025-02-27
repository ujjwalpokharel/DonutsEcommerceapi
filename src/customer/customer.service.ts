import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import {
  CUSTOMER_REPOSITORY,
  ORDER_PRODUCT_REPOSITORY,
  ORDER_REPOSITORY,
  PAYMENT_REPOSITORY,
  PRODUCT_REPOSITORY,
  USER_REPOSITORY,
} from 'utils/constants';
import { Order } from 'src/order/entities/order.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Sequelize } from 'sequelize-typescript';
import { Customer } from './entities/customer.entity';
import { Product } from 'src/products/entities/product.entity';
import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerModel: typeof Customer,
    @Inject(USER_REPOSITORY)
    private readonly userModel: typeof User,
    @Inject(ORDER_REPOSITORY) private readonly orderModel: typeof Order,
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentModel: typeof Payment,
    @Inject(PRODUCT_REPOSITORY) private readonly productModel: typeof Product,
    @Inject(ORDER_PRODUCT_REPOSITORY)
    private readonly orderProductModel: typeof OrderProduct,
    private sequelize: Sequelize,
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const { orderDetails, paymentDetails } = createCustomerDto;
    const transaction = await this.sequelize.transaction();
    try {
      const customer = await this.customerModel.create(
        {
          first_name: createCustomerDto.first_name,
          last_name: createCustomerDto.last_name,
          email: createCustomerDto.email,
          company: createCustomerDto.company,
          postal_code: createCustomerDto.postalcode,
          city: createCustomerDto.city,
          address: createCustomerDto.address,
          appartment: createCustomerDto.appartment,
        },
        { transaction: transaction },
      );

      const user = await this.userModel.create(
        {
          first_name: createCustomerDto.first_name,
          last_name: createCustomerDto.last_name,
          email: createCustomerDto.email,
          postal_code: createCustomerDto.postalcode,
          city: createCustomerDto.city,
          username: createCustomerDto.first_name,
          appartment: createCustomerDto.appartment,
          address: createCustomerDto.address,
        },
        { transaction: transaction },
      );

      const order = await this.orderModel.create(
        {
          status: 'pending',
          order_date: createCustomerDto.order_date,
          customer_id: customer.id,
          total_amount: 0,
          user_id: user.id,
        },
        { transaction: transaction },
      );

      let totalAmount = 0;
      for (const item of orderDetails) {
        const product = await this.productModel.findOne({
          where: {
            id: item.productId,
          },
        });
        totalAmount += product.price * item.quantity;

        await this.orderProductModel.create(
          {
            order_id: order.id,
            product_id: item.productId,
            quantity: item.quantity,
          },
          { transaction: transaction },
        );
        await order.update(
          {
            total_amount: totalAmount,
          },
          { transaction: transaction },
        );
      }

      const payment = await this.paymentModel.create(
        {
          payment_method: 'online',
          status: 'pending',
          amount_paid: paymentDetails.amount_paid,
          card_number: paymentDetails.card_number,
          card_name: paymentDetails.card_name,
          expiry_date: paymentDetails.expiry_date,
          cvc: paymentDetails.cvc,
          order_id: order.id,
        },
        { transaction: transaction },
      );
      if (Math.floor(totalAmount) === Math.floor(paymentDetails.amount_paid)) {
        await order.update(
          {
            status: 'completed',
          },
          {
            transaction: transaction,
          },
        );
        await payment.update(
          {
            status: 'completed',
          },
          { transaction: transaction },
        );
      } else {
        throw new BadRequestException(
          'Total amount does not match the amount paid',
        );
      }

      await transaction.commit();
      return customer;
    } catch (error) {
      console.error('Transaction failed:', error);
      await transaction.rollback();
      throw new BadRequestException('Failed to create customer order');
    }
  }

  async findAll() {
    const allCustomer = await this.customerModel.findAll({
      include: [
        {
          model: Order,
          include: [
            {
              model: Product,
            },
          ],
        },
      ],
    });
    return allCustomer;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  async remove(id: number) {
    await this.customerModel.destroy({
      where: {
        id,
      },
    });
    return `customer deleted sucessfully`;
  }
}
