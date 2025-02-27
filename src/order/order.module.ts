import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { orderProvider } from './order.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import { productProvider } from 'src/products/products.provider';
import { orderProductProvider } from 'src/order-product/order-product.provider';
import { ProductsModule } from 'src/products/products.module';
import { OrderProductModule } from 'src/order-product/order-product.module';

@Module({
  imports: [SequelizeModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    OrderService,
    ...orderProvider,
    ...productProvider,
    ...orderProductProvider,
  ],
  exports: [OrderModule],
})
export class OrderModule {}
