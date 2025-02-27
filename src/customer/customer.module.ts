import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { customerProvider } from './customer.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from './entities/customer.entity';
import { Order } from 'src/order/entities/order.entity';
import { OrderModule } from 'src/order/order.module';
import { PaymentsModule } from 'src/payments/payments.module';
import { ProductsModule } from 'src/products/products.module';
import { Product } from 'src/products/entities/product.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { orderProvider } from 'src/order/order.provider';
import { paymentProvider } from 'src/payments/payment.provider';
import { orderProductProvider } from 'src/order-product/order-product.provider';
import { productProvider } from 'src/products/products.provider';
import { userProvider } from 'src/users/user.provider';

@Module({
  imports: [SequelizeModule.forFeature([Customer, Order, Product, Payment])],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    ...customerProvider,
    ...orderProvider,
    ...paymentProvider,
    ...orderProductProvider,
    ...productProvider,
    ...userProvider,
  ],
})
export class CustomerModule {}
